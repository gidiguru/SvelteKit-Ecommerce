import { a as google } from "../../../../../chunks/auth.js";
import { generateState, generateCodeVerifier } from "arctic";
import { r as redirect } from "../../../../../chunks/index2.js";
async function GET(event) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"]
  });
  event.cookies.set("state", state, {
    secure: true,
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10
    // 10 min
  });
  event.cookies.set("code_verifier", codeVerifier, {
    secure: true,
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10
    // 10 min
  });
  return redirect(302, url.toString());
}
export {
  GET
};
