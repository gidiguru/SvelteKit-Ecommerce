import { c as create_ssr_component, s as subscribe, j as compute_rest_props, k as spread, m as escape_object, v as validate_component } from "./ssr.js";
import { d as derived } from "./index4.js";
import { h as setCtx, i as getCtx, j as getAttrs } from "./utils.js";
import { i as is_void } from "./names.js";
import "dequal";
import { c as createDispatcher } from "./events.js";
import { I as Icon } from "./Icon.js";
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { preventScroll = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { forceVisible = true } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnEscape,
    preventScroll,
    closeOnOutsideClick,
    portal,
    forceVisible,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
    content: $contentId,
    description: $descriptionId,
    title: $titleId
  }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0)
    $$bindings.preventScroll(preventScroll);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.forceVisible === void 0 && $$bindings.forceVisible && forceVisible !== void 0)
    $$bindings.forceVisible(forceVisible);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0)
    $$bindings.openFocus(openFocus);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0)
    $$bindings.closeFocus(closeFocus);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("forceVisible", forceVisible);
  }
  {
    updateOption("openFocus", openFocus);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const DialogTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild", "id"]);
  let $title, $$unsubscribe_title;
  let { level = "h2" } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  const { elements: { title }, ids } = getCtx();
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  const attrs = getAttrs("title");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    if (id) {
      ids.title.set(id);
    }
  }
  builder = $title;
  $$unsubscribe_title();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `${((tag) => {
    return tag ? `<${level}${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder, attrs }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(level)}`}`;
});
const DialogClose = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $close, $$unsubscribe_close;
  let { asChild = false } = $$props;
  const { elements: { close } } = getCtx();
  $$unsubscribe_close = subscribe(close, (value) => $close = value);
  createDispatcher();
  const attrs = getAttrs("close");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $close;
  $$unsubscribe_close();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<button${spread(
    [
      escape_object(builder),
      { type: "button" },
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</button>`}`;
});
const DialogPortal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $portalled, $$unsubscribe_portalled;
  let { asChild = false } = $$props;
  const { elements: { portalled } } = getCtx();
  $$unsubscribe_portalled = subscribe(portalled, (value) => $portalled = value);
  const attrs = getAttrs("portal");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $portalled;
  $$unsubscribe_portalled();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>`}`;
});
const DialogContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id"
  ]);
  let $content, $$unsubscribe_content;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids } = getCtx();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && $open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${outTransition && $open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${$open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const DialogOverlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild"
  ]);
  let $overlay, $$unsubscribe_overlay;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  const { elements: { overlay }, states: { open } } = getCtx();
  $$unsubscribe_overlay = subscribe(overlay, (value) => $overlay = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("overlay");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $overlay;
  $$unsubscribe_overlay();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}></div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}></div>` : `${inTransition && $open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}></div>` : `${outTransition && $open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}></div>` : `${$open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}></div>` : ``}`}`}`}`}`}`;
});
const DialogTrigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  const { elements: { trigger } } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $trigger;
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<button${spread(
    [
      escape_object(builder),
      { type: "button" },
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</button>`}`;
});
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const X$1 = X;
export {
  DialogPortal as D,
  X$1 as X,
  DialogOverlay as a,
  DialogContent as b,
  DialogClose as c,
  DialogTitle as d,
  Dialog as e,
  DialogTrigger as f
};
