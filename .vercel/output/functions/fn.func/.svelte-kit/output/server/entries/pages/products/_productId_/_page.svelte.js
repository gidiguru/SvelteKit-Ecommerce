import { c as create_ssr_component, e as escape, a as add_attribute, o as each, v as validate_component, p as null_to_empty } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/index3.js";
import { C as CldImage } from "../../../../chunks/CldImage.js";
import "../../../../chunks/getCldImageUrl.js";
import "../../../../chunks/cart.js";
const css = {
  code: ".slides.svelte-1srnmqy::-webkit-scrollbar-thumb{background:black;border-radius:10px}.slides.svelte-1srnmqy::-webkit-scrollbar-track,.no-scroll.svelte-1srnmqy::-webkit-scrollbar-track{background:transparent}.slides.svelte-1srnmqy::-webkit-scrollbar,.no-scroll.svelte-1srnmqy::-webkit-scrollbar{display:none}.slides.svelte-1srnmqy,.no-scroll.svelte-1srnmqy{-ms-overflow-style:none;scrollbar-width:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let selectedSizeIdx = 0;
  while (selectedSizeIdx < data.product.sizes.length && !data.product.sizes[selectedSizeIdx].isAvailable)
    selectedSizeIdx++;
  let curIdx = 0;
  let scrollSection;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-12vwun3_START -->${$$result.title = `<title>${escape(data.product.name)} | Synergetics Shop</title>`, ""}<meta name="description"${add_attribute("content", data.product.desc, 0)}><!-- HEAD_svelte-12vwun3_END -->`, ""} <div class="grow flex flex-col sm:pt-10 w-full"> <div class="w-full flex flex-col justify-center items-center gap-y-2 overflow-hidden sm:hidden"> <div class="w-screen overflow-hidden relative"><div class="overflow-x-auto snap-x snap-mandatory scroll-smooth flex slides w-full svelte-1srnmqy"${add_attribute("this", scrollSection, 0)}>${each(data.product.images, (image) => {
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
  })}</div> <div class="absolute bottom-3 left-1/2 translate-x-[-50%] flex gap-x-2">${each(data.product.images, (_, i) => {
    return `<button class="${escape(null_to_empty(`w-[10px] h-[10px] ${i === curIdx && "bg-white"} rounded-full border border-white`), true) + " svelte-1srnmqy"}"></button>`;
  })}</div></div></div>  <div class="h-full sm:mx-10 mx-4 sm:grid sm:grid-cols-4 flex flex-col"><div class="col-span-3 p-4 relative h-[85vh] hidden sm:flex">${each(data.product.images, (im, i) => {
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
  })} <div class="absolute bottom-8 left-1/2 translate-x-[-50%] flex gap-x-2">${each(data.product.images, (_, i) => {
    return `<button class="${escape(null_to_empty(`w-[10px] h-[10px] ${i === curIdx && "bg-white"} rounded-full border border-white`), true) + " svelte-1srnmqy"}"></button>`;
  })}</div> <button class="absolute cursor-pointer right-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center" data-svelte-h="svelte-nto17j"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.29492 16.59L12.8749 12L8.29492 7.41L9.70492 6L15.7049 12L9.70492 18L8.29492 16.59Z" fill="black"></path></svg></button> <button class="absolute cursor-pointer left-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center" data-svelte-h="svelte-hktccl"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z" fill="black"></path></svg></button></div> <div class="sm:p-4 py-6 flex flex-col gap-4 sm:h-[85vh] sm:overflow-scroll no-scroll svelte-1srnmqy"><div class="${escape(null_to_empty(`text-4xl font-jura text-transparent bg-clip-text`), true) + " svelte-1srnmqy"}"${add_attribute("style", `background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`, 0)}>${escape(data.product.name)}</div> <div class="text-lg text-gray-500 font-light">${escape(data.product.desc)}</div> <div><span class="${escape(null_to_empty(`text-3xl font-jura   text-transparent bg-clip-text`), true) + " svelte-1srnmqy"}"${add_attribute("style", `background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`, 0)}>Sizes.</span> </div> ${each(data.product.sizes, (size, i) => {
    return `<div class="${escape(null_to_empty(`${size.isAvailable ? "" : "opacity-50 pointer-events-none"} w-full rounded-lg p-[2px]`), true) + " svelte-1srnmqy"}"${add_attribute("style", `${selectedSizeIdx === i && `background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`}`, 0)}><button class="${escape(
      null_to_empty(`${selectedSizeIdx != i && size.isAvailable ? "border-neutral-600/50 border-[1px]" : ""} w-full cursor-pointer p-6 bg-white rounded-md flex flex-row justify-between items-center hover:bg-neutral-50  border-solid`),
      true
    ) + " svelte-1srnmqy"}"><div class="flex flex-col items-start"><div class="text-lg font-semibold">${escape(size.name)}</div> <div class="text-sm font-light">${escape(size.width)} x ${escape(size.height)}</div></div> <div>$${escape(size.price / 100)}</div></button> </div>`;
  })} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: `drop-shadow-md hover:bg-black text-lg p-7 font-light`,
      disabled: data.isSoldOut
    },
    {},
    {
      default: () => {
        return `<div class="${escape(null_to_empty(` text-lg bg-clip-text `), true) + " svelte-1srnmqy"}"${add_attribute("style", `background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`, 0)}>${data.isSoldOut ? `Sold Out` : `Add to Cart $${escape((data.product.sizes[selectedSizeIdx].price / 100).toFixed(2))}`}</div>`;
      }
    }
  )} </div></div>    <script async src="//www.instagram.com/embed.js" data-svelte-h="svelte-r8y9j6"><\/script> </div>`;
});
export {
  Page as default
};
