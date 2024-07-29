import { g as github } from "../../../../../chunks/auth.js";
import { generateState } from "arctic";
import { r as redirect } from "../../../../../chunks/index2.js";
async function GET(event) {
  const state = generateState();
  const url = await github.createAuthorizationURL(state, {
    scopes: ["user:email"]
  });
  event.cookies.set("github_oauth_state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });
  return redirect(302, url.toString());
}
export {
  GET
};
