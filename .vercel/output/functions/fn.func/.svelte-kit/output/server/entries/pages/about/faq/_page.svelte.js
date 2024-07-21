import { c as create_ssr_component, j as compute_rest_props, s as subscribe, k as spread, m as escape_object, v as validate_component } from "../../../../chunks/ssr.js";
import "dequal";
import { o as setCtx, p as getAttrs, q as setItem, r as getCtx, t as getTrigger, u as getContent, a as cn } from "../../../../chunks/utils.js";
import "clsx";
import { c as createDispatcher } from "../../../../chunks/events.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { s as slide } from "../../../../chunks/index6.js";
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["multiple", "value", "onValueChange", "disabled", "asChild"]);
  let $root, $$unsubscribe_root;
  let { multiple = false } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption } = setCtx({
    multiple,
    disabled,
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs("root");
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  {
    localValue.set(value);
  }
  {
    updateOption("multiple", multiple);
  }
  {
    updateOption("disabled", disabled);
  }
  builder = $root;
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>`}`;
});
const AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { asChild = false } = $$props;
  const { item, props } = setItem({ value, disabled });
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  const attrs = getAttrs("item");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $item(props);
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>`}`;
});
const AccordionHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild"]);
  let $header, $$unsubscribe_header;
  let { level = 3 } = $$props;
  let { asChild = false } = $$props;
  const { elements: { heading: header } } = getCtx();
  $$unsubscribe_header = subscribe(header, (value) => $header = value);
  const attrs = getAttrs("header");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $header(level);
  $$unsubscribe_header();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>`}`;
});
const AccordionTrigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  const { trigger, props } = getTrigger();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  builder = $trigger(props);
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
const AccordionContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let $content, $$unsubscribe_content;
  let $isSelected, $$unsubscribe_isSelected;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  const { content, isSelected, props } = getContent();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_isSelected = subscribe(isSelected, (value) => $isSelected = value);
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
  builder = $content(props);
  $$unsubscribe_content();
  $$unsubscribe_isSelected();
  return `${asChild && $isSelected(props) ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `${transition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && outTransition && $isSelected(props) ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && $isSelected(props) ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${outTransition && $isSelected(props) ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${$isSelected(props) ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronDown = Chevron_down;
const Accordion_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = slide } = $$props;
  let { transitionConfig = { duration: 200 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(AccordionContent, "AccordionPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("overflow-hidden text-sm transition-all", className)
      },
      { transition },
      { transitionConfig },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="pb-4 pt-0">${slots.default ? slots.default({}) : ``}</div>`;
      }
    }
  )}`;
});
const Accordion_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(AccordionItem, "AccordionPrimitive.Item").$$render($$result, Object.assign({}, { value }, { class: cn("border-b", className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Accordion_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "level"]);
  let { class: className = void 0 } = $$props;
  let { level = 3 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  return `${validate_component(AccordionHeader, "AccordionPrimitive.Header").$$render($$result, { level, class: "flex" }, {}, {
    default: () => {
      return `${validate_component(AccordionTrigger, "AccordionPrimitive.Trigger").$$render(
        $$result,
        Object.assign(
          {},
          {
            class: cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``} ${validate_component(ChevronDown, "ChevronDown").$$render(
              $$result,
              {
                class: "h-4 w-4 transition-transform duration-200"
              },
              {},
              {}
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Root = Accordion;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col md:flex-row md:p-16 bg-white grow min-h-screen"><div class="md:w-1/3 md:flex flex-col gap-2 hidden" data-svelte-h="svelte-vrk0i2"><h2 class="text-4xl font-jura">FAQ</h2> <h4>Answers to common questions.</h4></div> <div class="grow px-4"><div class="w-full flex flex-col pt-4 px-2" data-svelte-h="svelte-14i0nh5"><h3 class="text-center font-jura text-5xl pb-8">What is Sediment Art?</h3> <p class="text-center text-lg font-light pb-4">We take photos of the natural beauty in nature and the world, and print them onto glass for
				you to display in your home or office.</p> <p class="text-center text-lg font-light pb-8">We sell made to order prints, and have them delivered right to your door.</p></div> ${validate_component(Root, "Accordion.Root").$$render($$result, { class: "w-full" }, {}, {
    default: () => {
      return `${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "q-1" }, {}, {
        default: () => {
          return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "md:text-2xl font-jura text-xl" }, {}, {
            default: () => {
              return `What are you selling?`;
            }
          })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, { class: " font-light" }, {}, {
            default: () => {
              return `Sediment Art is an online store, selling world class glass prints of in house custom made
					art. We take, produce, and edit all of our own images.`;
            }
          })}`;
        }
      })} ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "q-2" }, {}, {
        default: () => {
          return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "md:text-2xl font-jura text-xl" }, {}, {
            default: () => {
              return `Where do your images come from?`;
            }
          })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
            default: () => {
              return `All of our images are our own. We take, process, light, and develop all of our images in
					house.`;
            }
          })}`;
        }
      })} ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "q-3" }, {}, {
        default: () => {
          return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "md:text-2xl font-jura text-xl" }, {}, {
            default: () => {
              return `What are these pictures of?`;
            }
          })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
            default: () => {
              return `These are all (currently) rocks. Each millions of years old, often the size of a coin.`;
            }
          })}`;
        }
      })} ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "q-5" }, {}, {
        default: () => {
          return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "md:text-2xl font-jura text-xl" }, {}, {
            default: () => {
              return `How do you make your pieces?`;
            }
          })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
            default: () => {
              return `We use <a href="https://fractureme.com/" target="_blank" class="underline" data-svelte-h="svelte-stsvzj">Fracture</a> for
					our pieces. They create world class glass pieces, and were perfect for fulfilling our art.`;
            }
          })}`;
        }
      })} ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "q-6" }, {}, {
        default: () => {
          return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "md:text-2xl font-jura text-xl" }, {}, {
            default: () => {
              return `Do you offer returns?`;
            }
          })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
            default: () => {
              return `Yes, contact our support email and we will make it right!`;
            }
          })}`;
        }
      })} ${validate_component(Accordion_item, "Accordion.Item").$$render($$result, { value: "q-7" }, {}, {
        default: () => {
          return `${validate_component(Accordion_trigger, "Accordion.Trigger").$$render($$result, { class: "md:text-2xl font-jura text-xl" }, {}, {
            default: () => {
              return `Can I use the images on this site?`;
            }
          })} ${validate_component(Accordion_content, "Accordion.Content").$$render($$result, {}, {}, {
            default: () => {
              return `No. All images and art pieces on Sediment Art are copywritten.`;
            }
          })}`;
        }
      })}`;
    }
  })}</div></div>`;
});
export {
  Page as default
};
