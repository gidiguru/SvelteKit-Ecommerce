import { c as create_ssr_component, a as add_attribute } from "../../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="w-full h-full grow flex p-5"> <div class="w-full grow flex flex-row gap-x-4"><div class="bg-neutral-200 shadow-xl w-1/6 rounded-md p-4 flex flex-col gap-y-3 items-start"><a${add_attribute("class", `text-lg font-bold w-full text-start p-2 rounded-md ${data.url.includes("/admin/products") && "bg-neutral-100"}`, 0)} href="/admin/products">Products</a> <a${add_attribute("class", `text-lg font-bold w-full text-start p-2 rounded-md ${data.url.includes("/admin/orders") && "bg-neutral-100"}`, 0)} href="/admin/orders">Orders</a></div>  <div class="bg-neutral-200 shadow-xl grow h-full rounded-md">${slots.default ? slots.default({}) : ``}</div></div></div>`;
});
export {
  Layout as default
};
