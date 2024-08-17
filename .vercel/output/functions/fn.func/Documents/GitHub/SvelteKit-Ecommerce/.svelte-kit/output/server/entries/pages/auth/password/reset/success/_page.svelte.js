import { c as create_ssr_component, e as escape } from "../../../../../../chunks/ssr.js";
class InlangException extends Error {
}
const error = new InlangException("You need to use the Inlang plugin to be able to use those imports. See https://inlang.com/documentation/sdk/overview");
const i = () => {
  throw error;
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h3>${escape(i())}</h3> <hr class="!border-t-2 mt-2 mb-6"> <p>${escape(i())}</p>`;
});
export {
  Page as default
};
