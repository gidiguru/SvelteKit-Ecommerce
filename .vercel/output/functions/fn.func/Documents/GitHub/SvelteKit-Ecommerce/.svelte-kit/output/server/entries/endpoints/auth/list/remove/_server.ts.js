import { d as db, e as emailList } from "../../../../../chunks/index.js";
import { e as error, r as redirect } from "../../../../../chunks/index2.js";
import { and, eq } from "drizzle-orm";
const GET = async ({ url }) => {
  const key = url.searchParams.get("key");
  const email = url.searchParams.get("email");
  if (!key || !email) {
    error(400, "missing key and/or email...");
  }
  await db.update(emailList).set({
    unsubscribedAt: /* @__PURE__ */ new Date()
  }).where(and(eq(emailList.email, email), eq(emailList.key, key)));
  return redirect(303, "/status/list/removed");
};
export {
  GET
};
