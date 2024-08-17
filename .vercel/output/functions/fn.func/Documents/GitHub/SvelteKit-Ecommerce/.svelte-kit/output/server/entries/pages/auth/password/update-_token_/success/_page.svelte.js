import { s as subscribe } from "../../../../../../chunks/lifecycle.js";
import { c as create_ssr_component, e as escape } from "../../../../../../chunks/ssr.js";
import { p as page } from "../../../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let message = "";
  $$unsubscribe_page();
  return `<h1 data-svelte-h="svelte-1nd748z">Password Updated Successfully</h1> <p>${escape(message)}</p> ${``} <a href="/auth/login" data-svelte-h="svelte-mmsw8z">Return to Login</a>`;
});
export {
  Page as default
};
