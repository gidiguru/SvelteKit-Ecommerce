import { j as null_to_empty, s as subscribe } from "../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape, f as each } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { C as CldImage } from "../../../chunks/CldImage.js";
import "../../../chunks/analytics.js";
import { B as Button } from "../../../chunks/index6.js";
import "../../../chunks/cart.js";
import { D as Drawer, T as Trigger, a as Drawer_content, b as Drawer_header, c as Drawer_title, d as Drawer_description, e as Drawer_footer, C as Close } from "../../../chunks/index8.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { p as page } from "../../../chunks/stores.js";
import { R as Root, T as Tabs_list, a as Tabs_trigger } from "../../../chunks/index12.js";
import Page$1 from "./_productId_/_page.svelte.js";
import { T as Tabs_content } from "../../../chunks/tabs-content.js";
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      }
    ],
    [
      "path",
      {
        "d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "link" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Link$1 = Link;
const css = {
  code: ".size-selection.svelte-1b1hc7d:hover .pre-text.svelte-1b1hc7d{display:none}.size-selection.svelte-1b1hc7d:hover .post-text.svelte-1b1hc7d{display:flex;flex-direction:column}",
  map: null
};
const ProductCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { itemData } = $$props;
  let { displayMode = "lg" } = $$props;
  let selectedSizeIdx = itemData.types.findIndex((type) => type.isAvailable);
  if (selectedSizeIdx === -1)
    selectedSizeIdx = 0;
  const primaryImage = itemData.images.find((img) => img.isPrimary) || itemData.images[0];
  if ($$props.itemData === void 0 && $$bindings.itemData && itemData !== void 0)
    $$bindings.itemData(itemData);
  if ($$props.displayMode === void 0 && $$bindings.displayMode && displayMode !== void 0)
    $$bindings.displayMode(displayMode);
  $$result.css.add(css);
  return ` <div class="rounded-lg w-1/2 hidden sm:flex p-2 relative hover:scale-[102%] transition-all duration-[400ms] cursor-pointer"><a${add_attribute("href", "/products/" + itemData.id, 0)}><div class="${"absolute w-full h-full top-2 left-2 bg-gradient-to-br from-0% to-40% " + escape(itemData.gradientColorStart, true) + " " + escape(itemData.gradientColorVia, true) + " " + escape(itemData.gradientColorStop, true) + " rounded-lg"}"></div> ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      width: 355 * 4,
      height: 200 * 4,
      crop: "fill",
      src: primaryImage?.cloudinaryId || "https://via.placeholder.com/355x200",
      alt: itemData.name,
      sizes: "100vw",
      class: "sm:rounded-lg shadow-md hidden sm:flex w-full"
    },
    {},
    {}
  )}</a> <div class="absolute top-5 left-5 font-jura w-full"><div class="text-gray-300 text-md">${escape(itemData.tags[0]?.name)}</div> <div class="text-white text-4xl">${escape(itemData.name)}</div></div> <div class="absolute bottom-5 left-5 flex flex-row items-end">${each(itemData.types, (type, i) => {
    return `<button ${!type.isAvailable ? "disabled" : ""} class="${escape(
      null_to_empty(`${type.isAvailable ? "bg-neutral-100/60 hover:bg-neutral-100/90 hover:drop-shadow-lg hover:scale-110 transition-all duration-[200ms] size-selection hover:px-10 hover:py-3" : "bg-neutral-300/40 line-through text-gray-800"}  px-3 py-2 mx-1 rounded-full text-sm `),
      true
    ) + " svelte-1b1hc7d"}"><div class="pre-text transition-all duration-300 svelte-1b1hc7d">${escape(type.name)}</div> <div class="post-text hidden transition-all duration-300 svelte-1b1hc7d"><div>Buy <span class="font-bold font-lg">${escape(type.name)}</span></div> <div class="font-light text-xs">${escape(type.width)} x ${escape(type.height)}&quot;</div></div> </button>`;
  })}</div></div>  <div class="${escape(null_to_empty(`flex sm:hidden flex-col sm:items-center sm:gap-x-8 sm:gap-y-0 gap-y-2 p-1 sm:p-4 ${displayMode == "sm" ? "w-1/2" : "w-full"} sm:w-full`), true) + " svelte-1b1hc7d"}"><div class="sm:w-[355px] w-full sm:h-[200px] flex justify-center items-center relative"><div class="absolute top-1 left-1 rounded-full w-[40px] h-[40px] bg-gray-600/70 flex flex-col items-center justify-center sm:hidden">${validate_component(Drawer, "Drawer.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "Drawer.Trigger").$$render($$result, {}, {}, {
        default: () => {
          return `<svg class="-translate-y-[1px]" width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>`;
        }
      })} ${validate_component(Drawer_content, "Drawer.Content").$$render($$result, { class: "px-2" }, {}, {
        default: () => {
          return `${validate_component(Drawer_header, "Drawer.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Drawer_title, "Drawer.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(itemData.name)}`;
                }
              })} ${validate_component(Drawer_description, "Drawer.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(itemData.desc)}`;
                }
              })}`;
            }
          })} ${validate_component(CldImage, "CldImage").$$render(
            $$result,
            {
              width: 355 * 2,
              height: 200 * 4,
              crop: "fill",
              src: primaryImage?.cloudinaryId || "https://via.placeholder.com/355x200",
              alt: itemData.name,
              sizes: "100vw",
              class: "sm:rounded-lg shadow-md sm:hidden p-0"
            },
            {},
            {}
          )} <div class="flex flex-row flex-wrap justify-center gap-x-2">${each(itemData.types, (type, i) => {
            return `<button class="${escape(
              null_to_empty(`text-sm h-[50px] mt-2 text-nowrap ${type.isAvailable ? selectedSizeIdx == i ? "bg-black text-white" : "bg-neutral-200" : "line-through opacity-55"} rounded-full px-6 py-2`),
              true
            ) + " svelte-1b1hc7d"}"><div class="font-bold">${escape(type.name)}</div> <div class="flex flex-row gap-4 text-xs"><div>${escape(type.width)} x ${escape(type.height)}</div> <div class="text-xs">${escape(type.currency)} ${escape(type.price / 100)}</div></div> </button>`;
          })}</div> ${validate_component(Drawer_footer, "Drawer.Footer").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
                default: () => {
                  return `Add to cart ${escape(itemData.types[selectedSizeIdx].currency)} ${escape((itemData.types[selectedSizeIdx].price / 100).toFixed(2))}`;
                }
              })} ${validate_component(Close, "Drawer.Close").$$render($$result, {}, {}, {
                default: () => {
                  return `Cancel`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}</div> <a${add_attribute("href", `/products/${itemData.id}`, 0)}>${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      width: 355 * 4,
      height: 200 * 8,
      crop: "fill",
      src: primaryImage?.cloudinaryId || "https://via.placeholder.com/355x200",
      alt: itemData.name,
      sizes: "100vw",
      class: `sm:rounded-lg shadow-md sm:hidden ${displayMode == "sm" && "hidden"}`
    },
    {},
    {}
  )} ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      width: 355 * 2,
      height: 200 * 4,
      crop: "fill",
      src: primaryImage?.cloudinaryId || "https://via.placeholder.com/355x200",
      alt: itemData.name,
      sizes: "100vw",
      class: `sm:rounded-lg shadow-md sm:hidden ${displayMode == "lg" && "hidden"}`
    },
    {},
    {}
  )}</a></div>  <div class="grow flex flex-col items-center"><h2 class="${escape(null_to_empty(`sm:text-2xl ${displayMode == "sm" ? "text-md" : "text-xl"} font-light text-black sm:pb-2`), true) + " svelte-1b1hc7d"}">${escape(itemData.name)}</h2> <div class="flex flex-row items-center gap-x-2">${each(itemData.tags, (tag) => {
    return `<div class="${escape(null_to_empty(`${displayMode == "sm" ? "text-xs" : "text-md"} text-neutral-600 font-light`), true) + " svelte-1b1hc7d"}">${escape(tag.name)} </div>`;
  })}</div> <div class="w-full flex flex-row flex-wrap justify-center py-1 gap-[2px]">${each(itemData.types, (type, i) => {
    return `${type.isAvailable ? `${validate_component(Drawer, "Drawer.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger, "Drawer.Trigger").$$render($$result, {}, {}, {
          default: () => {
            return `<button class="text-xs bg-white rounded-full px-2 py-1">${escape(type.width)} x ${escape(type.height)}</button> `;
          }
        })} ${validate_component(Drawer_content, "Drawer.Content").$$render($$result, { class: "px-2" }, {}, {
          default: () => {
            return ` `;
          }
        })} `;
      }
    })}` : `<span class="text-xs line-through opacity-55 rounded-full px-2 py-1">${escape(type.width)} x ${escape(type.height)} </span>`}`;
  })}</div></div> <div class="sm:flex flex-col hidden gap-y-2 items-center justify-center sm:w-[175px] w-full">${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: `/products/${itemData.id}`,
      variant: "outline",
      class: "w-full"
    },
    {},
    {
      default: () => {
        return `${validate_component(Link$1, "Link").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
			More Information`;
      }
    }
  )}</div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  selected = $page.state.selected;
  $$unsubscribe_page();
  return ` ${selected ? `<button class="w-screen h-screen flex justify-center absolute top-0 left-0 z-40 bg-black bg-opacity-30"><div class="w-3/5 mt-24 rounded-t-lg overflow-hidden z-50">${validate_component(Page$1, "ProductPage").$$render($$result, { data: selected }, {}, {})}</div></button>` : ``} <main class="w-full sm:p-6 flex flex-col sm:gap-4"><div class="flex flex-row w-full sm:hidden gap-2 pt-6 px-2 justify-center">${validate_component(Root, "Tabs").$$render($$result, { class: "w-full pb-0" }, {}, {
    default: () => {
      return `${validate_component(Tabs_list, "TabsList").$$render(
        $$result,
        {
          class: "flex flex-row rounded-full  bg-neutral-200"
        },
        {},
        {
          default: () => {
            return `${validate_component(Tabs_trigger, "TabsTrigger").$$render(
              $$result,
              {
                class: "rounded-full w-1/2",
                value: "account"
              },
              {},
              {
                default: () => {
                  return `<svg width="18" height="23" viewBox="0 0 18 23"${add_attribute("fill", "black", 0)} xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="7" height="10" rx="0.5" stroke="black"></rect><rect x="10.5" y="0.5" width="7" height="10" rx="0.5" stroke="black"></rect><rect x="10.5" y="12.5" width="7" height="10" rx="0.5" stroke="black"></rect><rect x="0.5" y="12.5" width="7" height="10" rx="0.5" stroke="black"></rect></svg>`;
                }
              }
            )} ${validate_component(Tabs_trigger, "TabsTrigger").$$render(
              $$result,
              {
                value: "password",
                class: "rounded-full w-1/2"
              },
              {},
              {
                default: () => {
                  return `<svg width="18" height="23" viewBox="0 0 18 23"${add_attribute("fill", "none", 0)} xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="17" height="22" rx="0.5" stroke="black"></rect></svg>`;
                }
              }
            )}`;
          }
        }
      )} ${validate_component(Tabs_content, "TabsContent").$$render($$result, { value: "account" }, {}, {})} ${validate_component(Tabs_content, "TabsContent").$$render($$result, { value: "password" }, {}, {})}`;
    }
  })}</div> <div class="font-jura p-2"><span class="sm:text-3xl text-2xl text-black">${escape(data.collectionInfo.name)}.</span> <span class="sm:text-2xl text-xl text-gray-800">${escape(data.collectionInfo.tagline)}</span></div> ${data.products.length > 0 ? `<div class="flex flex-row items-left sm:col-span-4 flex-wrap sm:place-content-start px-1">${each(data.products, (product) => {
    return `${validate_component(ProductCard, "ProductCard").$$render(
      $$result,
      {
        itemData: {
          id: product.id,
          name: product.name,
          desc: product.desc,
          baseCurrency: product.baseCurrency,
          gradientColorStart: product.gradientColorStart,
          gradientColorVia: product.gradientColorVia,
          gradientColorStop: product.gradientColorStop,
          tags: product.tags.map((tag) => ({ name: tag.tagId, desc: "" })),
          images: product.images
        }
      },
      {},
      {}
    )}`;
  })}</div>` : `<div data-svelte-h="svelte-3fkmet"><h2>coming soon...</h2></div>`}</main>`;
});
export {
  Page as default
};
