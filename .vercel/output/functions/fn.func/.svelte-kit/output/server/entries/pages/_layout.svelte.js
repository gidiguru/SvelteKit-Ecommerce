import { c as create_ssr_component, s as subscribe, e as escape, p as null_to_empty, v as validate_component, o as each, a as add_attribute, j as compute_rest_props, k as spread, l as escape_attribute_value, m as escape_object } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/index3.js";
import { C as CldImage } from "../../chunks/CldImage.js";
import { c as cartLengthStore } from "../../chunks/cart.js";
import { I as Icon } from "../../chunks/Icon.js";
import "style-object-to-css-string";
import "../../chunks/client.js";
import { n as navigating } from "../../chunks/stores.js";
import { C as CldOgImage } from "../../chunks/CldOgImage.js";
import { a as alertVariants } from "../../chunks/index5.js";
import { a as cn } from "../../chunks/utils.js";
import { i as is_void } from "../../chunks/names.js";
const Logo = "/_app/immutable/assets/logo_light.moxNqieN.png";
const MobileLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAEYCAYAAADiRkzaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVsSURBVHgB7d3NcVtVGMfhv8OGZehAQwMJFcCSVWIaQKIC6MCqALsFaCBQQRIaiGkgdpYsSLKEjc09I2fGI5KIBF3dj/d5Zt5V4vGHfjq+1yOdk7zd3W6+7+ZRNxfdXH/gPLv52GVgIo67eZUPj/1d0544ngCM2mn2F/z2nARGqIV53fOcBkZklf6jfzPHgZG4yOHCb/cPdwMDW+Vw0b+ZHwIDutPNwxzeV4GBXeTwK/5FYEBH2YQ41OeGQdwJFCR8ShI+JQmfkoRPScKnJOFTkvApSfiUJHxKEj4ltfAvc3jngQG18IeI8EVgQC38pzm8R4GBtbcB7nM7Ea/FZzLaG8APFf4yMCJn6T/6dWCE1ukv+rPAiK2y3/fhtvsHe+kwGats/vrSNoD9mBvY9rFt41l76AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA5Nzt5vtuHnVz0c11T/Ps5nMsAwP7pptX6S/2d83zeAIwgKNuTnP44G/PVTcngQNaZ9job8+PgQP4LuOJ/s3KfxzoUbvEuci4wm/zMpub7Fm4E8Zm1c0i49OiX2UmhD8ubbV/kHFqX9uXmQnhj88i43UvM3EUxqQ9HlcZr3atP4vF0opPScKnJOFTkvApSfiUJHxKEj4lCZ+ShE9Jwqck4VOS8ClJ+JQkfEoSPiUJn5KET0nCpyThU5LwKUn4lCT88bnMeJ1nJoQ/PmOO60VmQvjj0vat+S3j1L62XwI9+SzDHASxa54HetZOQRlT9G13t2WgZ20rwbOMJ/x14IDWGT7608AAVhnmoIh2EIRTUBjcKpujONuRnH3FfnHzOdrRorM5/QQAAAAAAAAAAAAAAAAAAAAAAABgHo7y/y0ynNc3A71reyqedPM4h9/I9G3z6uZrWWbYJyEz1oIf42kdtzc9XQb2pK3ybVUda/DbY0939qLPranFzyidZFrB3x4HG/BRFplW6NtzEXiLXefcrjJti26+CmzZFf7DTN8ysGVX+PczfXP4Htiz94W/yDw4xIx/2bXiwywJn5KET0nCpyThU5LwKUn4lCR8ShI+JQmfkoRPScKnJOFTkvApSfiUJHxKEj4lCZ+ShE9Jwqck4VOS8ClJ+JQkfEoSPiUJn5KET0nCpyThU5LwKUn4lPS+8C8zj1PDLwNbdq3455m+3wNbdoX/a6bvl8AHasfovMq0jvh03Cc7fbLj3//q5u9uvs40fZF53KcwkLNMa6Vvsw7swTrTif6HwB6tsrluHmvwj+Mkc/6Do3yc45u5l+HPkW3X8E+z+evNkwAAAAAAAAAAAAAM6WNfncm0tVfULrN5Cff9bhaZl7ZJwmU2r9j9KdD5JtN+H/WHzvNsnuQU1X67n2Za0e5rrro5CSWtM61Y+5gfQynfZVqB9jVt5W/vHHRzW0B7jNt17iI07f7m81376jB9bbVfhjc+7eYPuyXPW1vtH4Tb2s/kS+HP3/2w7Z5r/Hlrj+9V2HZtxack4VOS8ClJ+JQkfEoSPiUJn5KET0nCpyThU5LwKUn4lCR8ShI+JQmfkoRPScKnJOFTkvApSfiUJHxKEj4lCZ+ShE9Jwqck4VOS8ClJ+JQkfEoSPiUJn5KET0nCpyThU5LwKUn4lCR8ShI+JQmfkoRPScKnJOFTkvApSfiUJHxKEj4lCZ+ShE9Jwqck4VOS8ClJ+PN3GbadC3/+zsO2F8Kft+tunobb2s/kUZi9z7p5mc0DbpLnoYzjTCvOvuaqm29DGUfdnGVakfYR/UkoaZ1NAFOJdZ/Rn4bSVtlc51Z4ArTv8c9uHm7/EI5CVatuHnRzv5tF5uUymz/jPunm525eb/+HfwDWHQmSzi81gAAAAABJRU5ErkJggg==";
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
  return `<nav class="${escape(null_to_empty(`sm:flex sm:flex-row items-center justify-between grid grid-cols-3 sm:px-12 p-4 sm:py-1 w-full text-black z-20 sticky top-0 bg-white`), true) + " svelte-14epx6l"}"><button class="sm:hidden flex" data-svelte-h="svelte-nqhjn4"><svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H21" stroke="#444444" stroke-width="1" stroke-linecap="round"></path><path d="M1 10H21" stroke="#444444" stroke-width="1" stroke-linecap="round"></path></svg></button> <div class="h-[400px] bg-white absolute drop-shadow-md border-t-[1px] border-solid border-neutral-300 w-full -mx-12 top-[78px] text-center z-50 grid grid-cols-3 hidden no-scroll svelte-14epx6l" id="drop-menu"><div class="col-span-1 w-full overflow-hidden"> ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      width: 500 * 2,
      height: 400 * 2,
      src: "products/a3mazygrqkbbcoqnjszp",
      alt: "Description of my image",
      class: "shadow-md",
      sizes: "100vw"
    },
    {},
    {}
  )}</div> <div class="flex flex-col p-6 overflow-y-scroll"><div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm" data-svelte-h="svelte-17z12e9">Pieces</div> ${each(pieces, (piece) => {
    return `<a${add_attribute("href", `/products/${piece.id}`, 0)} class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">${escape(piece.name)}</a>`;
  })}</div> <div class="flex flex-col p-6 overflow-y-scroll" data-svelte-h="svelte-s42qgs"><div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm">Collections</div> <a href="/products" class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">All Pieces</a> <a href="/products?tag=Sediment Collection" class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">Sediment Collection</a> <a href="/products?tag=Honor Collection" class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">Honor Collection</a></div></div> <a class="text-4xl font-light mx-auto sm:mx-0" href="/" data-svelte-h="svelte-1htc8jq"><img${add_attribute("src", Logo, 0)} alt="Sediment" class="h-[70px] hidden sm:flex"> <img${add_attribute("src", MobileLogo, 0)} alt="Sediment" class="h-[30px] sm:hidden flex"></a> <div class="flex-row items-center hidden sm:flex gap-6"><a href="/products" class="text-black uppercase font-jura flex flex-row items-center" data-svelte-h="svelte-1ff2ans">Collections
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
  return `<footer class="bg-white text-neutral-800 py-6"><div class="container mx-auto flex flex-wrap justify-center"> <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-0" data-svelte-h="svelte-1smpafo"><h3 class="font-semibold mb-2">Navigation</h3> <ul><li><a href="/" class="hover:text-neutral-300 text-sm">Home</a></li> <li><a href="/products" class="hover:text-neutral-300 text-sm">Products</a></li> <li><a href="/auth/list" class="hover:text-neutral-300 text-sm">Email List</a></li></ul></div>  <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-0" data-svelte-h="svelte-13khxe8"><h3 class="font-semibold mb-2">Contact Us</h3> <p>Email: bmd.yt.channel@gmail.com</p></div>  <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4"><h3 class="font-semibold mb-2" data-svelte-h="svelte-1l8rg64">Connect With Us</h3> <div class="flex space-x-4"> <a href="https://www.instagram.com/sediment.art" class="text-neutral-800 hover:text-neutral-300">${validate_component(Instagram$1, "Instagram").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a></div></div></div></footer>`;
});
const SpecialOffer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isSoldOut } = $$props;
  let { remaining } = $$props;
  if ($$props.isSoldOut === void 0 && $$bindings.isSoldOut && isSoldOut !== void 0)
    $$bindings.isSoldOut(isSoldOut);
  if ($$props.remaining === void 0 && $$bindings.remaining && remaining !== void 0)
    $$bindings.remaining(remaining);
  return `<button type="button" class="bg-gray-950 text-center text-white font-jura uppercase p-1 sm:text-lg text-sm sticky w-full top-[-100px]">${isSoldOut ? `Sold Out, Sign up to receive updates on when we will be back in stock!` : `Launch event, only ${escape(remaining)} pieces available, order now!`}</button> ${``}`;
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
  return `${$$result.head += `<!-- HEAD_svelte-1p3ttje_START -->${$$result.title = `<title>Sediment Art</title>`, ""}<meta name="description" content="Sediment Art, beauty crystalized and shipped straight to you."><!-- HEAD_svelte-1p3ttje_END -->`, ""} ${validate_component(CldOgImage, "CldOgImage").$$render(
    $$result,
    {
      src: "zuciphtmipytgdxgdkdu",
      alt: "Sediment Art, Beauty Crystalized",
      twitterTitle: "Sediment Art, Beauty Crystalized"
    },
    {},
    {}
  )} <body class="flex justify-between w-full flex-col min-h-screen"><div class="opacity-0 h-[100vh] w-[100vw] fixed top-0 left-0 bg-black z-[100] text-white p-6 transition-all duration-500 pointer-events-none flex flex-col gap-6 font-jura text-2xl" id="mobile-nav"><button data-svelte-h="svelte-1ckr543"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"></path></svg></button> <a href="/products" data-svelte-h="svelte-3l4u6l">All Pieces</a> ${each(data.collections, (collection) => {
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
  )}</div> ${validate_component(SpecialOffer, "SpecialOffer").$$render(
    $$result,
    {
      isSoldOut: data.isSoldOut,
      remaining: data.numberLeft
    },
    {},
    {}
  )} ${validate_component(NavBar, "NavBar").$$render($$result, { user: data.user, pieces: data.pieces }, {}, {})}  <span class="grow bg-neutral-100">${slots.default ? slots.default({}) : ``}</span> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</body>`;
});
export {
  Layout as default
};
