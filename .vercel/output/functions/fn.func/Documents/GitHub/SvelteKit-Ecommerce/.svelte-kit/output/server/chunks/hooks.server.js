import { l as lucia } from "./auth.js";
const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
  } else {
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    }
    event.locals.user = user;
    event.locals.session = session;
  }
  event.locals.auth = {
    validate: async () => {
      if (event.locals.session) {
        return { session: event.locals.session, user: event.locals.user };
      }
      return null;
    },
    setSession: async (newSession) => {
      event.locals.session = newSession;
      event.locals.user = newSession ? await event.locals.user : null;
      if (newSession) {
        const sessionCookie = lucia.createSessionCookie(newSession.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
          path: ".",
          ...sessionCookie.attributes
        });
      } else {
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
          path: ".",
          ...sessionCookie.attributes
        });
      }
    }
  };
  return resolve(event);
};
export {
  handle
};
