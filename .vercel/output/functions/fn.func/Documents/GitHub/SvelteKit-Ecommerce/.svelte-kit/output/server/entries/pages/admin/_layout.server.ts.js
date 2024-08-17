import { e as ensureAdmin } from "../../../chunks/auth.js";
const load = async ({ url, locals }) => {
  ensureAdmin(locals);
  return {
    url: url.pathname
  };
};
export {
  load
};
