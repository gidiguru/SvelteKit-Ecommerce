import dotenv__default from "dotenv";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { r as redirect } from "./index2.js";
import { GitHub } from "arctic";
import { Lucia } from "lucia";
import { d as db, s as session, u as user } from "./index.js";
dotenv__default.config();
const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173";
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (data) => {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      isAdmin: data.isAdmin,
      stripeCustomerId: data.stripeCustomerId
    };
  }
});
function ensureAdmin(locals) {
  if (!locals.user || !locals.session) {
    redirect(303, "/auth/login");
  }
  if (!locals.user.isAdmin) {
    redirect(303, "/");
  }
}
export {
  ensureAdmin as e,
  github as g,
  lucia as l
};
