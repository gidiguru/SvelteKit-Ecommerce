import { c as create_ssr_component, v as validate_component, e as escape, f as each, a as add_attribute } from "../../chunks/ssr.js";
import { j as null_to_empty } from "../../chunks/lifecycle.js";
import { C as CldImage } from "../../chunks/CldImage.js";
import "../../chunks/analytics.js";
import { I as Icon } from "../../chunks/Icon.js";
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronRight = Chevron_right;
const css = {
  code: ".image-hover.svelte-8dz69.svelte-8dz69{position:absolute;top:0;right:0;left:0;bottom:0;-o-object-fit:contain;object-fit:contain;opacity:0;transition:opacity 0.4s}.productImg.svelte-8dz69:hover .image-hover.svelte-8dz69{opacity:1}",
  map: null
};
const ImageCollection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { collectionData } = $$props;
  if ($$props.collectionData === void 0 && $$bindings.collectionData && collectionData !== void 0)
    $$bindings.collectionData(collectionData);
  $$result.css.add(css);
  {
    {
      console.log("Collection data changed:", collectionData);
    }
  }
  return `<div class="${"flex flex-col " + escape(
    collectionData.dark ? "bg-gray-950 text-white" : "bg-neutral-100 text-black",
    true
  ) + " px-2 sm:px-4 pt-6 pb-4 sm:py-10 sm:items-center"}"><div><span class="font-jura sm:text-4xl text-3xl">${escape(collectionData.name)}.</span> <span class="font-jura sm:text-3xl text-2xl">${escape(collectionData.tagLine)}.</span></div> <a href="${"/products?tag=" + escape(collectionData.collectionTag, true)}" class="pb-4 sm:pb-8 flex flex-row items-center"><span class="font-jura sm:text-xl text-lg opacity-60" data-svelte-h="svelte-fwj7xy">Shop collection</span> ${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "opacity-60" }, {}, {})}</a> <div class="flex flex-row w-full sm:overflow-x-hidden flex-wrap gap-2 sm:justify-center">${each(collectionData.productInfo.sort((a, b) => a.name.localeCompare(b.name)), (product) => {
    let productLog = `Product: ${product.name}, Available sizes: ${product.availableSizes.join(", ")}, Sold out sizes: ${product.soldOutSizes.join(", ")}`;
    return ` ${escape(console.log(productLog))} <a${add_attribute("href", product.link, 0)} class="flex flex-col lg:w-[22%] md:w-[30%] sm:w-[40%] w-full sm:p-3 rounded-md cursor-pointer"><div class="productImg relative svelte-8dz69"><div>${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        width: 350 * 2,
        height: 500 * 2,
        src: product.cloudinaryId || "https://via.placeholder.com/355x200",
        alt: "Description of my image",
        class: "shadow-md",
        sizes: "100vw"
      },
      {},
      {}
    )}</div> <div class="image-hover svelte-8dz69">${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        width: 350 * 2,
        height: 500 * 2,
        src: product.secondaryCloudinary || "https://via.placeholder.com/355x200",
        alt: "Description of my image",
        class: "shadow-md",
        sizes: "100vw"
      },
      {},
      {}
    )} </div></div> <div class="py-4"><div class="${escape(null_to_empty(`font-jura ${collectionData.dark ? "text-gray-100" : "text-gray-950"} text-xl text-center`), true) + " svelte-8dz69"}">${escape(product.name)}</div> <div class="${escape(null_to_empty(`flex flex-row gap-2 justify-center font-light ${collectionData.dark ? "text-gray-500" : "text-gray-700"}`), true) + " svelte-8dz69"}">${each(product.availableSizes, (size) => {
      return `<span>${escape(size)}</span>`;
    })} ${each(product.soldOutSizes, (size) => {
      return `<span class="line-through">${escape(size)}</span>`;
    })} </div></div> </a>`;
  })}</div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="grow"><div class="w-full relative"><div class="z-10 absolute top-[40%] left-0 text-white w-full flex justify-center items-center flex-col gap-y-2" data-svelte-h="svelte-137bro3"><div class="flex flex-row gap-4 items-center bg-black"><h2 class="sm:text-5xl text-3xl font-jura">Synergetics Shop</h2></div> <h4 class="font-light sm:text-3xl text-xl font-jura bg-black">Cutting the edge of Technology</h4> <a class="uppercase bg-black mt-14 px-7 py-3 font-light" href="/products" aria-label="Shop now for the latest tech products">shop now</a></div> ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: "cld-sample-2",
      width: 1920,
      height: 900,
      sizes: "100vw",
      class: "object-cover w-full h-[80vh] hidden sm:block transition-all ease-in-out duration-300 bg-black",
      alt: "home banner"
    },
    {},
    {}
  )} ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: "cld-sample-2",
      width: 700,
      height: 1e3,
      sizes: "100vw",
      class: "object-cover w-full h-[80vh] sm:hidden block transition-all ease-in-out duration-300 bg-black",
      alt: "home banner"
    },
    {},
    {}
  )}</div> ${each(data.collections, (collection) => {
    return `${validate_component(ImageCollection, "ImageCollection").$$render($$result, { collectionData: collection }, {}, {})}`;
  })}</main>`;
});
export {
  Page as default
};
