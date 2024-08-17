import { g as github, l as lucia } from "../../../../../chunks/auth.js";
import { OAuth2RequestError } from "arctic";
import { d as db, u as user } from "../../../../../chunks/index.js";
import { and, eq } from "drizzle-orm";
import { generateId } from "lucia";
async function GET(event) {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response("Invalid OAuth state", { status: 400 });
  }
  event.cookies.delete("github_oauth_state", { path: "/" });
  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUser = await githubUserResponse.json();
    if (!githubUser.id) {
      return new Response("Invalid GitHub user data", { status: 400 });
    }
    const existingUser = await db.query.user.findFirst({
      where: and(eq(user.provider, "github"), eq(user.providerId, githubUser.id.toString()))
    });
    let userId;
    if (existingUser) {
      userId = existingUser.id;
    } else {
      const githubEmailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });
      const githubEmails = await githubEmailResponse.json();
      const primaryEmail = githubEmails.find((entry) => entry.primary && entry.verified);
      if (!primaryEmail) {
        return new Response("No verified primary email found", { status: 400 });
      }
      let firstName = (githubUser.name ? githubUser.name.split(" ")[0] : githubUser.login).substring(0, 100);
      let lastName = (githubUser.name ? githubUser.name.split(" ").slice(1).join(" ") : "").substring(0, 100);
      userId = generateId(40);
      const newUser = {
        id: userId,
        provider: "github",
        providerId: githubUser.id.toString().substring(0, 255),
        email: primaryEmail.email.substring(0, 100),
        firstName,
        lastName,
        isAdmin: false,
        stripeCustomerId: null
      };
      try {
        await db.insert(user).values(newUser);
      } catch (dbError) {
        console.error("Error inserting new user:", dbError);
        return new Response("Error creating user", { status: 500 });
      }
    }
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      console.error("OAuth2RequestError:", e);
      return new Response("OAuth request error", { status: 400 });
    }
    console.error("Unexpected error during GitHub OAuth:", e);
    return new Response("Internal server error", { status: 500 });
  }
}
export {
  GET
};
