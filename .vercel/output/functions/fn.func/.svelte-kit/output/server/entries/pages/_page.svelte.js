import { c as create_ssr_component, v as validate_component, e as escape, o as each, a as add_attribute, p as null_to_empty } from "../../chunks/ssr.js";
import { C as CldImage } from "../../chunks/CldImage.js";
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
const MobileLogo = "data:image/png;base64,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";
const css = {
  code: ".image-hover.svelte-8dz69.svelte-8dz69{position:absolute;top:0;right:0;left:0;bottom:0;-o-object-fit:contain;object-fit:contain;opacity:0;transition:opacity 0.4s}.productImg.svelte-8dz69:hover .image-hover.svelte-8dz69{opacity:1}",
  map: null
};
const ImageCollection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { collectionData } = $$props;
  if ($$props.collectionData === void 0 && $$bindings.collectionData && collectionData !== void 0)
    $$bindings.collectionData(collectionData);
  $$result.css.add(css);
  return `<div class="${"flex flex-col " + escape(
    collectionData.dark ? "bg-gray-950 text-white" : "bg-neutral-100 text-black",
    true
  ) + " px-2 sm:px-4 pt-6 pb-4 sm:py-10 sm:items-center"}"><div><span class="font-jura sm:text-4xl text-3xl">${escape(collectionData.name)}.</span> <span class="font-jura sm:text-3xl text-2xl">${escape(collectionData.tagLine)}.</span></div> <a href="${"/products?tag=" + escape(collectionData.collectionTag, true)}" class="pb-4 sm:pb-8 flex flex-row items-center"><span class="font-jura sm:text-xl text-lg opacity-60" data-svelte-h="svelte-fwj7xy">Shop collection</span> ${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "opacity-60" }, {}, {})}</a> <div class="flex flex-row w-full sm:overflow-x-hidden flex-wrap gap-2 sm:justify-center">${each(collectionData.productInfo.sort((a, b) => a.name.localeCompare(b.name)), (product) => {
    return `<a${add_attribute("href", product.link, 0)} class="flex flex-col lg:w-[22%] md:w-[30%] sm:w-[40%] w-full sm:p-3 rounded-md cursor-pointer"><div class="productImg relative svelte-8dz69"><div>${validate_component(CldImage, "CldImage").$$render(
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
  return `<main class="grow"><div class="w-full relative"><div class="z-10 absolute top-[40%] left-0 text-white w-full flex justify-center items-center flex-col gap-y-2" data-svelte-h="svelte-1vbkdyx"><div class="flex flex-row gap-4 items-center"><img${add_attribute("src", MobileLogo, 0)} alt="Sediment" class="h-[40px] sm:hidden flex"> <h2 class="sm:text-5xl text-3xl font-jura">Sediment Collection</h2></div> <h4 class="font-light sm:text-3xl text-xl font-jura">Beauty. Crystallized.</h4> <a class="uppercase bg-black mt-14 px-7 py-3 font-light" href="/products?tag=Sediment Collection">shop now</a></div>  <div class="object-cover w-full h-[80vh] hidden sm:flex transition-all ease-in-out duration-300 bg-black"> ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: "products/kmqvpskg70djyzlv6l0x",
      width: 1920,
      height: 900,
      objectFit: "cover",
      alt: "home banner",
      opacity: 90
    },
    {},
    {}
  )}</div> <div${add_attribute("class", `object-cover w-full h-[80vh] sm:hidden flex transition-all ease-in-out duration-300 bg-black`, 0)}> ${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: "products/qz1ekcqehcdqze9ahg5w",
      width: 700,
      height: 1e3,
      objectFit: "cover",
      alt: "home banner",
      opacity: 80
    },
    {},
    {}
  )}</div> </div> <div class="w-full flex flex-col py-4 px-2 bg-black text-white" data-svelte-h="svelte-1ofio3z"><h3 class="text-center font-jura text-5xl pb-8 px-3">What is Sediment Art?</h3> <p class="text-center text-lg font-light pb-4 px-3">We take photos of the natural beauty in nature and the world, and print them onto glass for
			you to display in your home or office.</p> <p class="text-center text-lg font-light pb-8">We sell made to order prints, and have them delivered right to your door.</p></div> <div class="w-full md:w-3/4 m-auto" data-svelte-h="svelte-9s234d"><h2 class="font-jura sm:text-4xl text-3xl text-center pt-8 pb-4">Natural Beauty in Glass</h2> <p class="text-lg text-center px-4 md:px-16 font-light">What is this stunning artwork? They are photographs of rocks that are <span class="italic">millions</span>
			of years old, found in the United States,
			<span class="italic">sliced and polished by hand.</span> Each rock has a unique story to tell.
			James Cunningham Photography has turned them into works of art for your home.</p> <h2 class="font-jura sm:text-4xl text-3xl text-center pt-8 pb-4">Our Process</h2> <p class="text-lg text-center px-4 md:px-16 font-light pb-8">Each piece is made to order, so once you order we will create your piece, get it packaged,
			then have it sent out.</p></div> ${each(data.collections, (collection) => {
    return `${validate_component(ImageCollection, "ImageCollection").$$render($$result, { collectionData: collection }, {}, {})}`;
  })}   <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/sediment.art/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style="background:#fff; border:0; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); min-width:326px; padding:0; width:100%;" data-svelte-h="svelte-s12ssa"><div style="padding:16px;"><a href="https://www.instagram.com/sediment.art/?utm_source=ig_embed&utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"><div style="display: flex; flex-direction: row; align-items: center;"><div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"><div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div> <div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div> <div style="padding-top: 8px;"><div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this profile on Instagram</div></div> <div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div><div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div> <div style="margin-left: 8px;"><div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div> <div style="margin-left: auto;"><div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"><div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a> <p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/sediment.art/?utm_source=ig_embed&utm_campaign=loading" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank">Sediment Art</a>
				(@<a href="https://www.instagram.com/sediment.art/?utm_source=ig_embed&utm_campaign=loading" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank">sediment.art</a>) • Instagram photos and videos</p></div></blockquote> <script async src="//www.instagram.com/embed.js" data-svelte-h="svelte-r8y9j6"><\/script></main>`;
});
export {
  Page as default
};
