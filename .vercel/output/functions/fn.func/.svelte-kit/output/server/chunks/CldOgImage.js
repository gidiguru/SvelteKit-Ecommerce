import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
import { g as getCldImageUrl } from "./CldImage.js";
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
export {
  CldOgImage as C
};
