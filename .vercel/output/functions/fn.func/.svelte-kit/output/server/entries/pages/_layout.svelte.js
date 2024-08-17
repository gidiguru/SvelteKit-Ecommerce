import { c as create_ssr_component, a as add_attribute, s as subscribe, e as escape, p as null_to_empty, o as each, v as validate_component, j as compute_rest_props, k as spread, l as escape_attribute_value, m as escape_object } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/index3.js";
import { M as MobileLogo } from "../../chunks/techshopng-logo.js";
import "style-object-to-css-string";
import { g as getCldImageUrl } from "../../chunks/getCldImageUrl.js";
import { c as cartLengthStore } from "../../chunks/cart.js";
import { I as Icon } from "../../chunks/Icon.js";
import "../../chunks/client.js";
import { n as navigating } from "../../chunks/stores.js";
import { a as alertVariants } from "../../chunks/index5.js";
import { a as cn } from "../../chunks/utils.js";
import { i as is_void } from "../../chunks/names.js";
const OG_IMAGE_WIDTH = 2400;
const OG_IMAGE_WIDTH_RESIZE = 1200;
const OG_IMAGE_HEIGHT = 1254;
const TWITTER_CARD = "summary_large_image";
const CldOgImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const options = {
    ...$$props,
    crop: $$props.crop || "fill",
    gravity: $$props.gravity || "center",
    height: $$props.height || OG_IMAGE_HEIGHT,
    src: $$props.src,
    width: $$props.width || OG_IMAGE_WIDTH,
    widthResize: $$props.width || OG_IMAGE_WIDTH_RESIZE
  };
  let width = typeof options.width === "string" ? parseInt(options.width) : options.width;
  let height = typeof options.height === "string" ? parseInt(options.height) : options.height;
  let { alt, excludeTags = [], twitterTitle } = $$props;
  if (typeof height === "number" && typeof width === "number") {
    height = OG_IMAGE_WIDTH_RESIZE / width * height;
  }
  width = OG_IMAGE_WIDTH_RESIZE;
  const ogImageUrl = getCldImageUrl({
    ...options,
    format: $$props.format || "jpg"
  });
  const twitterImageUrl = getCldImageUrl({
    ...options,
    format: $$props.format || "webp"
  });
  return `${$$result.head += `<!-- HEAD_svelte-1ikysa4_START --><meta property="og:image"${add_attribute("content", ogImageUrl, 0)}><meta property="og:image:secure_url"${add_attribute("content", ogImageUrl, 0)}><meta property="og:image:width"${add_attribute("content", `${width}`, 0)}><meta property="og:image:height"${add_attribute("content", `${height}`, 0)}>${alt ? `<meta property="og:image:alt"${add_attribute("content", alt, 0)}>` : ``}${!excludeTags.includes("twitter:title") ? `<meta property="twitter:title"${add_attribute("content", twitterTitle || " ", 0)}>` : ``}<meta property="twitter:card"${add_attribute("content", TWITTER_CARD, 0)}><meta property="twitter:image"${add_attribute("content", twitterImageUrl, 0)}><!-- HEAD_svelte-1ikysa4_END -->`, ""}`;
});
const css = {
  code: ".no-scroll.svelte-14epx6l::-webkit-scrollbar-track{background:transparent}.no-scroll.svelte-14epx6l::-webkit-scrollbar{display:none}.no-scroll.svelte-14epx6l{-ms-overflow-style:none;scrollbar-width:none}",
  map: null
};
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cartLengthStore, $$unsubscribe_cartLengthStore;
  $$unsubscribe_cartLengthStore = subscribe(cartLengthStore, (value) => $cartLengthStore = value);
  let { user } = $$props;
  let { pieces } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.pieces === void 0 && $$bindings.pieces && pieces !== void 0)
    $$bindings.pieces(pieces);
  $$result.css.add(css);
  $$unsubscribe_cartLengthStore();
  return `<nav class="${escape(null_to_empty(`sm:flex sm:flex-row items-center justify-between grid grid-cols-3 sm:px-12 p-4 sm:py-1 w-full text-black z-20 sticky top-0 bg-white`), true) + " svelte-14epx6l"}"><button class="sm:hidden flex" data-svelte-h="svelte-nqhjn4"><svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H21" stroke="#444444" stroke-width="1" stroke-linecap="round"></path><path d="M1 10H21" stroke="#444444" stroke-width="1" stroke-linecap="round"></path></svg></button> <div class="h-[400px] bg-white absolute drop-shadow-md border-t-[1px] border-solid border-neutral-300 w-full -mx-12 top-[78px] text-center z-50 grid grid-cols-3 hidden no-scroll svelte-14epx6l" id="drop-menu"><div class="col-span-1 w-full overflow-hidden" data-svelte-h="svelte-1u3emre"> </div> <div class="flex flex-col p-6 overflow-y-scroll"><div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm" data-svelte-h="svelte-1d80iba">Products</div> ${each(pieces, (piece) => {
    return `<a${add_attribute("href", `/products/${piece.id}`, 0)} class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">${escape(piece.name)}</a>`;
  })}</div> <div class="flex flex-col p-6 overflow-y-scroll" data-svelte-h="svelte-1vvere3"><div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm">Categories</div> <a href="/products" class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">All Products</a> <a href="/products?tag=Power-Station" class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">Power Stations</a> <a href="/products?tag=Hubs" class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">Hubs</a></div></div> <a class="text-4xl font-light mx-auto sm:mx-0" href="/" data-svelte-h="svelte-1htc8jq"><img${add_attribute("src", MobileLogo, 0)} alt="Sediment" class="h-[70px] hidden sm:flex"> <img${add_attribute("src", MobileLogo, 0)} alt="Sediment" class="h-[30px] sm:hidden flex"></a> <div class="flex-row items-center hidden sm:flex gap-6"><a href="/products" class="text-black uppercase font-jura flex flex-row items-center" data-svelte-h="svelte-yccm0d">Categories
			<svg width="24" height="45" viewBox="0 0 24 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 21.7705L12 33.2288L17 21.7705H7Z" fill="black"></path></svg></a> <a href="/about/faq" class="text-black uppercase font-jura flex flex-row items-center" data-svelte-h="svelte-1n20mv4">FAQ</a> ${user ? `<a href="/profile" data-svelte-h="svelte-1lnpnaj"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg></a>` : `<a href="/auth/login" data-svelte-h="svelte-1mqimi8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg></a>`} <a href="/cart" class="relative"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg> <div class="bg-black text-white font-light text-xs rounded-full absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center">${escape($cartLengthStore)}</div></a> ${user?.isAdmin ? `${validate_component(Button, "Button").$$render($$result, { variant: "link", href: "/admin/products" }, {}, {
    default: () => {
      return `admin`;
    }
  })}` : ``}</div> <div class="sm:hidden flex flex-row justify-end gap-3">${user ? `<a href="/profile" data-svelte-h="svelte-b2fk8c"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg></a>` : `<a href="/auth/login" data-svelte-h="svelte-1kyuop5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg></a>`} <a href="/cart" class="relative"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg> <div class="bg-black text-white font-light text-xs rounded-full absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center">${escape($cartLengthStore)}</div></a> ${user?.isAdmin ? `${validate_component(Button, "Button").$$render($$result, { variant: "link", href: "/admin/products" }, {}, {
    default: () => {
      return `admin`;
    }
  })}` : ``}</div> </nav>`;
});
const Instagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "20",
        "x": "2",
        "y": "2",
        "rx": "5",
        "ry": "5"
      }
    ],
    [
      "path",
      {
        "d": "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      }
    ],
    [
      "line",
      {
        "x1": "17.5",
        "x2": "17.51",
        "y1": "6.5",
        "y2": "6.5"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "instagram" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Instagram$1 = Instagram;
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="bg-white text-neutral-800 py-6"><div class="container mx-auto flex flex-wrap justify-center"> <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-0" data-svelte-h="svelte-1smpafo"><h3 class="font-semibold mb-2">Navigation</h3> <ul><li><a href="/" class="hover:text-neutral-300 text-sm">Home</a></li> <li><a href="/products" class="hover:text-neutral-300 text-sm">Products</a></li> <li><a href="/auth/list" class="hover:text-neutral-300 text-sm">Email List</a></li></ul></div>  <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-0" data-svelte-h="svelte-91y7g9"><h3 class="font-semibold mb-2">Contact Us</h3> <p>Email: gidiguru@gmail.com</p></div>  <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4"><h3 class="font-semibold mb-2" data-svelte-h="svelte-1l8rg64">Connect With Us</h3> <div class="flex space-x-4"> <a href="https://www.instagram.com/gidiguru" class="text-neutral-800 hover:text-neutral-300">${validate_component(Instagram$1, "Instagram").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a></div></div></div></footer>`;
});
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
const Alert_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "level"]);
  let { class: className = void 0 } = $$props;
  let { level = "h5" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  return `${((tag) => {
    return tag ? `<${level}${spread(
      [
        {
          class: escape_attribute_value(cn("mb-1 font-medium leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(level)}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  const handleRemoveMenu = () => {
    document.getElementById("drop-menu")?.classList.add("hidden");
  };
  const handleRemoveMobile = () => {
    const menu = document.getElementById("mobile-nav");
    menu?.classList.add("opacity-0");
    menu?.classList.add("pointer-events-none");
    menu?.classList.remove("opacity-100");
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    if ($navigating) {
      handleRemoveMenu();
      handleRemoveMobile();
    }
  }
  $$unsubscribe_navigating();
  return `${$$result.head += `<!-- HEAD_svelte-uyu9vs_START -->${$$result.title = `<title>Synergetics Shop</title>`, ""}<meta name="description" content="Sediment Art, beauty crystalized and shipped straight to you."><!-- HEAD_svelte-uyu9vs_END -->`, ""} ${validate_component(CldOgImage, "CldOgImage").$$render(
    $$result,
    {
      src: "ikbbfslp5lkzzwzghd2h",
      alt: "Sediment Art, Beauty Crystalized",
      twitterTitle: "Sediment Art, Beauty Crystalized",
      height: "1000px"
    },
    {},
    {}
  )} <body class="flex justify-between w-full flex-col min-h-screen"><div class="opacity-0 h-[100vh] w-[100vw] fixed top-0 left-0 bg-black z-[100] text-white p-6 transition-all duration-500 pointer-events-none flex flex-col gap-6 font-jura text-2xl" id="mobile-nav"><button data-svelte-h="svelte-1ckr543"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"></path></svg></button> <a href="/products" data-svelte-h="svelte-ry50ha">All Products</a> ${each(data.collections, (collection) => {
    return `<div><a${add_attribute("href", "/products?tag=" + collection.collection, 0)}>${escape(collection.collection)}</a> <div class="text-lg flex flex-col">${each(collection.products, (prod) => {
      return `<a${add_attribute("href", "/products/" + prod.id, 0)} class="px-6 pt-2">${escape(prod.name)}</a>`;
    })}</div> </div>`;
  })}</div> <div class="fixed sm:bottom-12 sm:right-12 bottom-1 right-0 z-[100] hidden" id="added-to-cart">${validate_component(Alert, "Alert.Root").$$render(
    $$result,
    {
      class: "w-[500px] bg-black text-white max-w-[100vw]"
    },
    {},
    {
      default: () => {
        return `${validate_component(Alert_title, "Alert.Title").$$render($$result, {}, {}, {
          default: () => {
            return `Added to Your Cart!`;
          }
        })} ${validate_component(Alert_description, "Alert.Description").$$render($$result, {}, {}, {
          default: () => {
            return `Please proceed to the cart to checkout.`;
          }
        })}`;
      }
    }
  )}</div>  ${validate_component(NavBar, "NavBar").$$render($$result, { user: data.user, pieces: data.pieces }, {}, {})}  <span class="grow bg-neutral-100">${slots.default ? slots.default({}) : ``}</span> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</body>`;
});
export {
  Layout as default
};
