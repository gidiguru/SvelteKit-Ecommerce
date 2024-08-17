import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M12 2v4" }],
    ["path", { "d": "m16.2 7.8 2.9-2.9" }],
    ["path", { "d": "M18 12h4" }],
    ["path", { "d": "m16.2 16.2 2.9 2.9" }],
    ["path", { "d": "M12 18v4" }],
    ["path", { "d": "m4.9 19.1 2.9-2.9" }],
    ["path", { "d": "M2 12h4" }],
    ["path", { "d": "m4.9 4.9 2.9 2.9" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "loader" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Loader$1 = Loader;
export {
  Loader$1 as L
};
