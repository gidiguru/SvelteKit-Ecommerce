import { g as github, l as lucia } from "../../../../../chunks/auth.js";
import { OAuth2RequestError } from "arctic";
import { d as db, u as user } from "../../../../../chunks/index2.js";
import { and, eq } from "drizzle-orm";
import { generateId } from "lucia";
async function GET(event) {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }
  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUser = await githubUserResponse.json();
    const existingUser = await db.query.user.findFirst({
      where: and(eq(user.provider, "github"), eq(user.providerId, githubUser.id))
    });
    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else {
      const githubEmailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });
      const githubEmail = await githubEmailResponse.json();
      const primary = githubEmail.find((entry) => entry.primary);
      if (primary) {
        const nameParts = githubUser.name.split(" ");
        const userId = generateId(40);
        await db.insert(user).values({
          id: userId,
          provider: "github",
          providerId: githubUser.id,
          email: primary.email,
          firstName: nameParts[0] ?? "",
          lastName: nameParts[1] ?? "",
          isAdmin: false
        });
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
          path: ".",
          ...sessionCookie.attributes
        });
      }
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
}
export {
  GET
};
