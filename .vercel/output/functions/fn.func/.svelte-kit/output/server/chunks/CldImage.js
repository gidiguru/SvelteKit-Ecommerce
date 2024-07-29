import { c as create_ssr_component, k as spread, m as escape_object, l as escape_attribute_value, v as validate_component } from "./ssr.js";
import { getTransformations } from "@cloudinary-util/util";
import { transformationPlugins } from "@cloudinary-util/url-loader";
import { transformProps } from "@unpic/core";
import styleToCss from "style-object-to-css-string";
import { g as getCldImageUrl } from "./getCldImageUrl.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let parentStyle;
  let props;
  let alt;
  let styleObj;
  let src;
  let width;
  let height;
  let loading;
  let decoding;
  let srcset;
  let role;
  let sizes;
  let fetchpriority;
  let style;
  ({ style: parentStyle, ...props } = $$props);
  ({ alt, style: styleObj, src, width, height, loading, decoding, srcset, role, sizes, fetchpriority } = transformProps(props));
  style = [styleToCss(styleObj || {}), parentStyle].filter(Boolean).join(";");
  return `<img${spread(
    [
      escape_object($$props),
      { style: escape_attribute_value(style) },
      { loading: escape_attribute_value(loading) },
      { width: escape_attribute_value(width) },
      { height: escape_attribute_value(height) },
      {
        decoding: escape_attribute_value(decoding)
      },
      { role: escape_attribute_value(role) },
      {
        fetchpriority: escape_attribute_value(fetchpriority)
      },
      {
        alt: escape_attribute_value(alt?.toString())
      },
      {
        src: escape_attribute_value(src?.toString())
      },
      {
        srcset: escape_attribute_value(srcset?.toString())
      },
      {
        sizes: escape_attribute_value(sizes?.toString())
      }
    ],
    {}
  )}>`;
});
function cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig = {} }) {
  const options = {
    ...imageProps,
    ...cldOptions
  };
  options.width = typeof options.width === "string" ? parseInt(options.width) : options.width;
  options.height = typeof options.height === "string" ? parseInt(options.height) : options.height;
  let widthResize;
  if (typeof loaderOptions?.width === "number" && typeof options.width === "number" && loaderOptions.width !== options.width) {
    widthResize = loaderOptions.width;
  } else if (typeof loaderOptions?.width === "number" && typeof options?.width !== "number") {
    widthResize = loaderOptions.width;
    options.width = widthResize;
  }
  if (options.width && widthResize && widthResize < options.width) {
    options.widthResize = loaderOptions.width;
  }
  return getCldImageUrl(options, cldConfig);
}
const { Object: Object_1 } = globals;
const CldImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let alt;
  let src;
  let width;
  let height;
  let config;
  let imageProps;
  const CLD_OPTIONS = ["config", "deliveryType", "preserveTransformations"];
  transformationPlugins.forEach(({ props = [] }) => {
    props.forEach((prop) => {
      if (CLD_OPTIONS.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      CLD_OPTIONS.push(prop);
    });
  });
  const cldOptions = {};
  CLD_OPTIONS.forEach((key) => {
    if ($$props[key]) {
      cldOptions[key] = $$props[key] || void 0;
    }
  });
  ({ alt, src, width, height, config } = $$props);
  imageProps = {
    alt,
    src,
    width: typeof width === "string" ? parseInt(width) : width,
    height: typeof height === "string" ? parseInt(height) : height
  };
  {
    if (imageProps) {
      Object.keys($$props).filter((key) => !CLD_OPTIONS.includes(key)).forEach((key) => {
        imageProps[key] = $$props[key];
      });
    }
  }
  {
    if ($$props.preserveTransformations) {
      try {
        const transformations = getTransformations(imageProps.src).map((t) => t.join(","));
        cldOptions.rawTransformations = [...transformations.flat(), ...$$props.rawTransformations || []];
      } catch (e) {
        console.warn(`Failed to preserve transformations: ${e.message}`);
      }
    }
  }
  return `${imageProps.src ? `${validate_component(Image, "Image").$$render(
    $$result,
    Object_1.assign({}, imageProps, { cdn: "cloudinary" }, {
      transformer: (loaderOptions) => {
        return cloudinaryLoader({
          loaderOptions,
          imageProps,
          cldOptions: { ...cldOptions, width: imageProps.width },
          cldConfig: config
        });
      }
    }),
    {},
    {}
  )}` : ``}`;
});
export {
  CldImage as C
};
