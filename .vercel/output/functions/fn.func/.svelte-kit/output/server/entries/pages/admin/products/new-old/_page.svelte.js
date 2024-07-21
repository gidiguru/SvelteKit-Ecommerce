import { c as create_ssr_component, v as validate_component, o as each, a as add_attribute } from "../../../../../chunks/ssr.js";
import "devalue";
import "../../../../../chunks/client.js";
import { C as CldImage } from "../../../../../chunks/CldImage.js";
import { C as CldUploadButton } from "../../../../../chunks/CldUploadButton.js";
import { L as Label, I as Input } from "../../../../../chunks/label.js";
import { T as Textarea } from "../../../../../chunks/textarea.js";
import { B as Button } from "../../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images = [];
  return `<form class="w-full h-full p-4 flex flex-col gap-y-6" method="post"><h2 class="text-gray-200 text-3xl font-bold" data-svelte-h="svelte-6e3l0s">Create New Product</h2> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
    default: () => {
      return `Name`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "name",
      required: true,
      id: "name",
      class: "w-1/3",
      type: "text",
      placeholder: "My Product"
    },
    {},
    {}
  )}</div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "stripeProductId" }, {}, {
    default: () => {
      return `Stripe Product Id`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "stripeProductId",
      required: true,
      type: "text",
      id: "stripeProductId",
      placeholder: "prod_10AF...",
      class: "w-1/3"
    },
    {},
    {}
  )} <p class="text-sm text-muted-foreground w-1/3" data-svelte-h="svelte-1ooq47m">The id of the product you created in Stripe, make sure you get this from the dashboard!</p></div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "stripePriceId" }, {}, {
    default: () => {
      return `Stripe Price Id`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "stripePriceId",
      required: true,
      id: "stripePriceId",
      class: "w-1/3",
      type: "text",
      placeholder: "price_10AF..."
    },
    {},
    {}
  )} <p class="text-sm text-muted-foreground w-1/3" data-svelte-h="svelte-kusw2b">The price id, not product id of your product in Stripe. This is found lower on the page.</p></div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "price" }, {}, {
    default: () => {
      return `Price`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "price",
      required: true,
      type: "number",
      id: "price",
      class: "w-1/3",
      placeholder: "1000"
    },
    {},
    {}
  )} <p class="text-sm text-muted-foreground w-1/3" data-svelte-h="svelte-gbad2g">Enter the number of cents your product costs. This is done to stay in line with Stripe.</p></div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "desc" }, {}, {
    default: () => {
      return `Description`;
    }
  })} ${validate_component(Textarea, "Textarea").$$render(
    $$result,
    {
      name: "desc",
      id: "desc",
      class: "w-1/3",
      required: true,
      placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {},
    {}
  )}</div>  <div class="flex flex-row items-center">${each(images, (image, i) => {
    return `<div class="relative w-[168px] h-[100px] rounded-lg overflow-hidden">${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        src: image.publicId,
        width: 168 * 2,
        height: 100 * 2,
        objectFit: "cover"
      },
      {},
      {}
    )} <button class="absolute w-full h-full items-center flex justify-center inset-0 bg-opacity-0 hover:bg-opacity-70 bg-gray-900 z-30 text-white text-opacity-0 hover:text-opacity-100 hover:cursor-pointer" type="button" data-svelte-h="svelte-19v6w39">Delete</button>  <input${add_attribute("value", JSON.stringify(image), 0)} class="hidden" name="images"> </div>`;
  })}</div> <div class="w-full flex justify-start items-center gap-x-4">${validate_component(CldUploadButton, "CldUploadButton").$$render(
    $$result,
    {
      uploadPreset: "admin-upload",
      class: "px-4 py-2 rounded-lg border-gray-900 bg-white text-gray-900 border font-semibold hover:bg-gray-200",
      onUpload: (res) => {
        if (res.event === "success")
          ;
      }
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
    default: () => {
      return `Create`;
    }
  })}</div></form> `;
});
export {
  Page as default
};
