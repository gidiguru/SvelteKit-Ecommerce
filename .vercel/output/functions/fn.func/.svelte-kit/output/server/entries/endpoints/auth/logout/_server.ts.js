import { l as lucia } from "../../../../chunks/auth.js";
import { r as redirect } from "../../../../chunks/index2.js";
const GET = async (event) => {
  if (!event.locals.session)
    ;
  const session = event.locals.session;
  if (session) {
    lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
  return redirect(302, "/auth/login");
};
export {
  GET
};
