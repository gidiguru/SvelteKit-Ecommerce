import { r as redirect } from "../../../../chunks/index.js";
const load = async (event) => {
  if (event.locals.session) {
    redirect(307, "/profile");
  }
};
export {
  load
};
