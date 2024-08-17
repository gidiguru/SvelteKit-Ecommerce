import { r as redirect } from "../../../../../chunks/index2.js";
const load = async (event) => {
  const { user } = await event.locals.auth.validateUser();
  if (!user)
    throw redirect(302, "/auth/signin");
  if (user.verified)
    throw redirect(302, "/profile");
  return {
    user
  };
};
export {
  load
};
