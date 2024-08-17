import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/index6.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div data-svelte-h="svelte-2x90jr">profile page coming soon!</div> ${validate_component(Button, "Button").$$render($$result, { href: "/auth/logout" }, {}, {
    default: () => {
      return `Logout`;
    }
  })}`;
});
export {
  Page as default
};
