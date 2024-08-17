import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/client.js";
import { I as Input } from "../../../../../../chunks/input.js";
import { L as Label } from "../../../../../../chunks/label.js";
import { T as Textarea } from "../../../../../../chunks/textarea.js";
import { B as Button } from "../../../../../../chunks/index6.js";
import "../../../../../../chunks/index4.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let disableUpdate = true;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<form class="h-full p-4 flex flex-col gap-y-6 w-full items-center justify-center" method="post"><h2 class="text-neutral-900 text-3xl font-bold" data-svelte-h="svelte-glba32">Update Product</h2> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
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
      placeholder: "My Product",
      value: data.productBasics.name
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
      placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      value: data.productBasics.desc
    },
    {},
    {}
  )}</div> <div class="w-full flex justify-center items-center gap-x-4">${validate_component(Button, "Button").$$render($$result, { type: "submit", disabled: disableUpdate }, {}, {
    default: () => {
      return `Update`;
    }
  })}</div></form> ${``}`;
});
export {
  Page as default
};
