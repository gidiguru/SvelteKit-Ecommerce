import { j as null_to_empty } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, e as escape, a as add_attribute, f as each, v as validate_component } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/index6.js";
import { C as CldImage } from "../../../../chunks/CldImage.js";
import "../../../../chunks/analytics.js";
import "../../../../chunks/cart.js";
const css = {
  code: ".slides.svelte-1srnmqy::-webkit-scrollbar-thumb{background:black;border-radius:10px}.slides.svelte-1srnmqy::-webkit-scrollbar-track,.no-scroll.svelte-1srnmqy::-webkit-scrollbar-track{background:transparent}.slides.svelte-1srnmqy::-webkit-scrollbar,.no-scroll.svelte-1srnmqy::-webkit-scrollbar{display:none}.slides.svelte-1srnmqy,.no-scroll.svelte-1srnmqy{-ms-overflow-style:none;scrollbar-width:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedSizeIdx;
  let { data } = $$props;
  function getSelectedProductType() {
    if (data.product && Array.isArray(data.product.types) && selectedSizeIdx !== -1) {
      return data.product.types[selectedSizeIdx];
    }
    return null;
  }
  let curIdx = 0;
  let scrollSection;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  selectedSizeIdx = data.product?.types?.findIndex((type) => type.isAvailable) ?? -1;
  {
    {
      console.log("Selected product type:", getSelectedProductType());
      console.log("Current isSoldOut status:", data.isSoldOut);
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-1dy89cy_START -->${$$result.title = `<title>${escape(data.product?.name || "Product")} | Synergetics Shop</title>`, ""}<meta name="description"${add_attribute("content", data.product?.desc || "", 0)}><!-- HEAD_svelte-1dy89cy_END -->`, ""} <div class="grow flex flex-col sm:pt-10 w-full"> <div class="w-full flex flex-col justify-center items-center gap-y-2 overflow-hidden sm:hidden"> <div class="w-screen overflow-hidden relative"><div class="overflow-x-auto snap-x snap-mandatory scroll-smooth flex slides w-full svelte-1srnmqy"${add_attribute("this", scrollSection, 0)}>${each(data.productImages || [], (image) => {
    return `<div class="snap-start w-full transform origin-center shrink-0">${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        src: image.cloudinaryId,
        width: 1e3,
        height: 1e3,
        objectFit: "cover"
      },
      {},
      {}
    )} </div>`;
  })}</div> <div class="absolute bottom-3 left-1/2 translate-x-[-50%] flex gap-x-2">${each(data.productImages || [], (_, i) => {
    return `<button class="${escape(null_to_empty(`w-[10px] h-[10px] ${i === curIdx ? "bg-white" : ""} rounded-full border border-white`), true) + " svelte-1srnmqy"}"></button>`;
  })}</div></div></div>  <div class="h-full sm:mx-10 mx-4 sm:grid sm:grid-cols-4 flex flex-col"><div class="col-span-3 p-4 relative h-[85vh] hidden sm:flex">${each(data.productImages || [], (im, i) => {
    return `${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        src: im.cloudinaryId,
        width: 1500,
        height: 1200,
        objectFit: "cover",
        class: `rounded-lg h-full ${curIdx == i ? "flex" : "hidden"}`
      },
      {},
      {}
    )}`;
  })} </div> <div class="sm:p-4 py-6 flex flex-col gap-4 sm:h-[85vh] sm:overflow-scroll no-scroll svelte-1srnmqy"> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "drop-shadow-md hover:bg-black text-lg p-7 font-light",
      disabled: data.isSoldOut || !getSelectedProductType()
    },
    {},
    {
      default: () => {
        return `<div class="text-lg bg-clip-text"${add_attribute("style", `background-image: linear-gradient(to right bottom, ${data.product?.gradientColorStart || ""}, ${data.product?.gradientColorVia || ""}, ${data.product?.gradientColorStop || ""} );`, 0)}>${data.isSoldOut || !getSelectedProductType() ? `Sold Out` : `Add to Cart $${escape((getSelectedProductType()?.price ?? 0 / 100).toFixed(2))}`}</div>`;
      }
    }
  )}</div></div> <script async src="//www.instagram.com/embed.js" data-svelte-h="svelte-r8y9j6"><\/script> </div>`;
});
export {
  Page as default
};
