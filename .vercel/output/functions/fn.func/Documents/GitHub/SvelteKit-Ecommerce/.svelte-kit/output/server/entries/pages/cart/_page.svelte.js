import { c as create_ssr_component, s as spread, d as escape_object, v as validate_component, b as escape_attribute_value, e as escape, f as each } from "../../../chunks/ssr.js";
import { g as getCart } from "../../../chunks/cart.js";
import "../../../chunks/client.js";
import { C as CldImage } from "../../../chunks/CldImage.js";
import "../../../chunks/analytics.js";
import { B as Button } from "../../../chunks/index6.js";
import { i as getCtx, j as getAttrs, a as cn, n as flyAndScale } from "../../../chunks/utils.js";
import { d as DialogTitle, D as DialogPortal, a as DialogOverlay, b as DialogContent, c as DialogClose, X, e as Dialog, f as DialogTrigger } from "../../../chunks/x.js";
import "clsx";
import { h as compute_rest_props, s as subscribe } from "../../../chunks/lifecycle.js";
import { f as fade } from "../../../chunks/index5.js";
const DialogDescription = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id"]);
  let $description, $$unsubscribe_description;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  const { elements: { description }, ids } = getCtx();
  $$unsubscribe_description = subscribe(description, (value) => $description = value);
  const attrs = getAttrs("description");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    if (id) {
      ids.description.set(id);
    }
  }
  builder = $description;
  $$unsubscribe_description();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>`}`;
});
const Dialog_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(DialogTitle, "DialogPrimitive.Title").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-lg font-semibold leading-none tracking-tight", className)
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
const Dialog_portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(DialogPortal, "DialogPrimitive.Portal").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Dialog_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 text-center sm:text-left", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Dialog_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = fade } = $$props;
  let { transitionConfig = { duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(DialogOverlay, "DialogPrimitive.Overlay").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      {
        class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Dialog_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = { duration: 200 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Dialog_portal, "Dialog.Portal").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Dialog_overlay, "Dialog.Overlay").$$render($$result, {}, {}, {})} ${validate_component(DialogContent, "DialogPrimitive.Content").$$render(
        $$result,
        Object.assign(
          {},
          { transition },
          { transitionConfig },
          {
            class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``} ${validate_component(DialogClose, "DialogPrimitive.Close").$$render(
              $$result,
              {
                class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              },
              {},
              {
                default: () => {
                  return `${validate_component(X, "X").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1pewzs3">Close</span>`;
                }
              }
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Dialog_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(DialogDescription, "DialogPrimitive.Description").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm text-muted-foreground", className)
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
const Root = Dialog;
const Trigger = DialogTrigger;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cart;
  let total;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  cart = getCart();
  total = cart.length > 0 ? cart.reduce((sum, item) => sum + item.productType.price * item.quantity, 0) / 100 : 0;
  return `<div class="w-full flex md:px-20 md:py-4 md:gap-x-16 bg-white flex-col gap-3 px-2 grow"><div class="md:text-4xl text-3xl font-semibold text-black" data-svelte-h="svelte-sucyab">Review Shopping Cart</div> ${total < 125 ? `<div class="flex flex-row items-center gap-1 text-neutral-500 md:text-2xl sm:text-xl sm:font-light" data-svelte-h="svelte-jf21tx"><div>All orders over $125.00 will receive free shipping!</div></div>` : `<div class="flex flex-row items-center gap-1 text-neutral-500 md:text-2xl sm:text-xl sm:font-light" data-svelte-h="svelte-glm5gr"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="green"></path></svg> <div>Your order qualifies for <span class="text-green-600">FREE shipping!</span></div></div>`} ${cart.find((el) => el.productType.width >= 11) != void 0 ? `<div class="flex flex-row gap-1 items-center text-neutral-500 md:text-2xl sm:text-xl sm:font-light" data-svelte-h="svelte-1r2510l"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="green"></path></svg> <div><span class="text-green-600">Your order qualifies</span> for an exclusive FREE print</div></div>` : `<div class="flex flex-row items-center gap-1 text-neutral-500 md:text-2xl sm:text-xl sm:font-light" data-svelte-h="svelte-thxuf0">All orders which include a Medium print (11x14 or 11x11) will include an exclusive free print,
			add one now!</div>`} <div class="flex flex-row justify-center items-center sm:justify-end sm:top-[77px] w-full sticky top-[62px] bg-white p-3"><div class="text-xl font-light text-neutral-600 px-3">Subtotal <span class="text-xl font-semibold text-black">$${escape(cart.length > 0 ? (cart.reduce((sum, el) => sum + el.productType.price * el.quantity, 0) / 100).toFixed(2) : "0.00")}</span></div> <form method="POST">${data.isSoldOut ? `${validate_component(Button, "Button").$$render($$result, { type: "submit", disabled: true }, {}, {
    default: () => {
      return `Sold out`;
    }
  })}` : `${data.user ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "submit",
      disabled: cart.length == 0,
      class: "bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
    },
    {},
    {
      default: () => {
        return `${escape(cart.length > 0 ? `Check Out (${cart.length} item${cart.length === 1 ? "" : "s"})` : "Please pick an item first")}`;
      }
    }
  )}` : `${cart.length == 0 ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      disabled: cart.length == 0,
      class: "bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
    },
    {},
    {
      default: () => {
        return `${escape(cart.length > 0 ? `Check Out (${cart.length} items)` : "Please pick an item first")}`;
      }
    }
  )}` : `${validate_component(Root, "Dialog.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Dialog.Trigger").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render(
            $$result,
            {
              class: "bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
            },
            {},
            {
              default: () => {
                return `${escape(cart.length > 0 ? `Check Out (${cart.length} item${cart.length == 1 ? "" : "s"})` : "Please pick an item first")}`;
              }
            }
          )}`;
        }
      })} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "sm:max-w-[425px]" }, {}, {
        default: () => {
          return `${validate_component(Dialog_header, "Dialog.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Dialog_title, "Dialog.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `Account`;
                }
              })} ${validate_component(Dialog_description, "Dialog.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `Would you like to create an account to save your information, manage your orders,
								and get special offers?`;
                }
              })}`;
            }
          })} <form class="flex flex-row justify-center gap-x-5 w-full" method="post">${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full" }, {}, {
            default: () => {
              return `Continue as guest`;
            }
          })}</form> ${validate_component(Button, "Button").$$render(
            $$result,
            {
              type: "button",
              class: "w-full",
              variant: "outline"
            },
            {},
            {
              default: () => {
                return `Create account`;
              }
            }
          )}`;
        }
      })}`;
    }
  })}`}`}`}</form></div> <div class="bg-neutral-300 h-[1px] w-full"></div> <div class="md:rounded-lg"><div class="flex flex-col md:flex-row flex-wrap">${each(cart, (cartItem, i) => {
    return `<div class="w-full md:mx-auto py-2 justify-center flex flex-row gap-2 md:gap-10 p-2"><div class="w-1/2 md:w-[200px] rounded-lg overflow-hidden h-full">${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        src: cartItem.productImage,
        width: 400,
        height: 400,
        objectFit: "cover"
      },
      {},
      {}
    )}</div> <div class="flex flex-col gap-1 sm:gap-3 w-1/2"><div class="flex flex-col sm:flex-row sm:items-center justify-between"><div class="text-2xl md:text-4xl font-jura">${escape(cartItem.productName)}</div> <div class="text-xl font-bold">$${escape((cartItem.productType.price * cartItem.quantity / 100).toFixed(2))} </div></div> <div class="text-xl text-neutral-600">${escape(cartItem.productType.width)}&quot; x ${escape(cartItem.productType.height)}&quot;</div> <div class="flex flex-row items-center gap-3">${validate_component(Button, "Button").$$render(
      $$result,
      {
        variant: "outline",
        disabled: cartItem.quantity == 1
      },
      {},
      {
        default: () => {
          return `-`;
        }
      }
    )} ${escape(cartItem.quantity)} ${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
      default: () => {
        return `+`;
      }
    })}</div> <button class="text-blue-600 text-left" data-svelte-h="svelte-1c0c8da">Remove</button>  </div></div> <div class="bg-neutral-300 h-[1px] w-2/3 mx-auto"></div>`;
  })}</div></div></div>`;
});
export {
  Page as default
};
