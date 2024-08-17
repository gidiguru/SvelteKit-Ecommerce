import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/client.js";
import { I as Input } from "../../../../../chunks/input.js";
import { L as Label } from "../../../../../chunks/label.js";
import { T as Textarea } from "../../../../../chunks/textarea.js";
import { B as Button } from "../../../../../chunks/index6.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<form class="h-full p-4 flex flex-col gap-y-6 w-full items-center justify-center" method="post"><h2 class="text-gray-200 text-3xl font-bold" data-svelte-h="svelte-6e3l0s">Create New Product</h2> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
    default: () => {
      return `Name`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "name",
      required: true,
      id: "name",
      class: "w-[600px]",
      type: "text",
      placeholder: "My Product"
    },
    {},
    {}
  )}</div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "desc" }, {}, {
    default: () => {
      return `Description`;
    }
  })} ${validate_component(Textarea, "Textarea").$$render(
    $$result,
    {
      name: "desc",
      id: "desc",
      class: "w-[600px]",
      required: true,
      placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {},
    {}
  )}</div> <div class="w-full flex justify-center items-center gap-x-4">${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
    default: () => {
      return `Create`;
    }
  })}</div></form>`;
});
export {
  Page as default
};
