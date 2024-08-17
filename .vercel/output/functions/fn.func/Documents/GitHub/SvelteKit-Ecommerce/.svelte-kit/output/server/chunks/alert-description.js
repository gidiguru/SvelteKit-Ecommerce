import { h as compute_rest_props } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_attribute_value, d as escape_object } from "./ssr.js";
import { a as cn } from "./utils.js";
import { a as alertVariants } from "./index4.js";
const Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn(alertVariants({ variant }), className))
      },
      escape_object($$restProps),
      { role: "alert" }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Alert_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("text-sm [&_p]:leading-relaxed", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Alert as A,
  Alert_description as a
};
