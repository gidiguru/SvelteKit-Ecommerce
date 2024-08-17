import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
const Trash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trash" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash$1 = Trash;
export {
  Trash$1 as T
};
