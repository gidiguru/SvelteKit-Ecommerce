import { s as subscribe, h as compute_rest_props } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_attribute_value, d as escape_object, v as validate_component } from "./ssr.js";
import { y as setCtx, z as getCtx, A as getAttrs, B as disabledAttrs, C as setGroupCtx, D as getGroupLabel, E as getContent, a as cn, n as flyAndScale } from "./utils.js";
import { i as is_void } from "./names.js";
import { c as createDispatcher } from "./events.js";
import { d as derived } from "./index3.js";
import "clsx";
const DropdownMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { forceVisible = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { arrowSize = void 0 } = $$props;
  let { positioning = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { typeahead = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { disableFocusFirstItem = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible,
    defaultOpen: open,
    preventScroll,
    arrowSize,
    positioning,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.forceVisible === void 0 && $$bindings.forceVisible && forceVisible !== void 0)
    $$bindings.forceVisible(forceVisible);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0)
    $$bindings.preventScroll(preventScroll);
  if ($$props.arrowSize === void 0 && $$bindings.arrowSize && arrowSize !== void 0)
    $$bindings.arrowSize(arrowSize);
  if ($$props.positioning === void 0 && $$bindings.positioning && positioning !== void 0)
    $$bindings.positioning(positioning);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0)
    $$bindings.dir(dir);
  if ($$props.typeahead === void 0 && $$bindings.typeahead && typeahead !== void 0)
    $$bindings.typeahead(typeahead);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0)
    $$bindings.closeFocus(closeFocus);
  if ($$props.disableFocusFirstItem === void 0 && $$bindings.disableFocusFirstItem && disableFocusFirstItem !== void 0)
    $$bindings.disableFocusFirstItem(disableFocusFirstItem);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("forceVisible", forceVisible);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("arrowSize", arrowSize);
  }
  {
    updateOption("positioning", positioning);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("dir", dir);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("disableFocusFirstItem", disableFocusFirstItem);
  }
  {
    updateOption("typeahead", typeahead);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const DropdownMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["href", "asChild", "disabled"]);
  let $item, $$unsubscribe_item;
  let { href = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { disabled = false } = $$props;
  const { elements: { item } } = getCtx();
  $$unsubscribe_item = subscribe(item, (value) => $item = value);
  createDispatcher();
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  builder = $item;
  attrs = {
    ...getAttrs("item"),
    ...disabledAttrs(disabled)
  };
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        { href: escape_attribute_value(href) },
        escape_object(builder),
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder, attrs }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}`}`;
});
const DropdownMenuGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $group, $$unsubscribe_group;
  let { asChild = false } = $$props;
  const { group, id } = setGroupCtx();
  $$unsubscribe_group = subscribe(group, (value) => $group = value);
  const attrs = getAttrs("group");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $group(id);
  $$unsubscribe_group();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>`}`;
});
const DropdownMenuLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $groupLabel, $$unsubscribe_groupLabel;
  let { asChild = false } = $$props;
  const { groupLabel, id } = getGroupLabel();
  $$unsubscribe_groupLabel = subscribe(groupLabel, (value) => $groupLabel = value);
  const attrs = getAttrs("label");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $groupLabel(id);
  $$unsubscribe_groupLabel();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>`}`;
});
const DropdownMenuContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "sideOffset",
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id"
  ]);
  let $menu, $$unsubscribe_menu;
  let $open, $$unsubscribe_open;
  let { sideOffset = 5 } = $$props;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  const { elements: { menu }, states: { open }, ids } = getContent(sideOffset);
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("content");
  createDispatcher();
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
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
      ids.menu.set(id);
    }
  }
  builder = $menu;
  $$unsubscribe_menu();
  $$unsubscribe_open();
  return ` ${asChild && $open ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && $open ? `<div${spread(
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
const DropdownMenuTrigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  const { elements: { trigger }, ids } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
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
const DropdownMenuSeparator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $separator, $$unsubscribe_separator;
  let { asChild = false } = $$props;
  const { elements: { separator } } = getCtx();
  $$unsubscribe_separator = subscribe(separator, (value) => $separator = value);
  const attrs = getAttrs("separator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $separator;
  $$unsubscribe_separator();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object($separator), escape_object($$restProps), escape_object(attrs)], {})}></div>`}`;
});
const Dropdown_menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0)
    $$bindings.inset(inset);
  return `${validate_component(DropdownMenuItem, "DropdownMenuPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0)
    $$bindings.inset(inset);
  return `${validate_component(DropdownMenuLabel, "DropdownMenuPrimitive.Label").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(DropdownMenuContent, "DropdownMenuPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(DropdownMenuSeparator, "DropdownMenuPrimitive.Separator").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("-mx-1 my-1 h-px bg-muted", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Root = DropdownMenu;
const Trigger = DropdownMenuTrigger;
const Group = DropdownMenuGroup;
export {
  Dropdown_menu_content as D,
  Group as G,
  Root as R,
  Trigger as T,
  Dropdown_menu_label as a,
  Dropdown_menu_separator as b,
  Dropdown_menu_item as c
};
