import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { L as Loader } from "../../../../../chunks/loader.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex flex-col h-screen container items-center justify-center">${data.result?.heading ? `<h3>${escape(data.result.heading)}</h3>` : ``} <hr class="!border-t-2 mt-2 mb-6"> ${data.result?.message ? `<!-- HTML_TAG_START -->${data.result.message}<!-- HTML_TAG_END -->` : `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}</div>`;
});
export {
  Page as default
};
