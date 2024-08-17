import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "../../../chunks/analytics.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="grow flex md:flex-row px-8 flex-col"><div class="p-12 grow flex items-center justify-center">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export {
  Layout as default
};
