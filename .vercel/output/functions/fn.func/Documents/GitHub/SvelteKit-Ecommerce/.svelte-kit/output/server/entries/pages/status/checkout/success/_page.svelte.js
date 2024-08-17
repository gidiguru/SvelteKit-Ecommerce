import { s as subscribe } from "../../../../../chunks/lifecycle.js";
import { c as create_ssr_component, a as add_attribute } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/cart.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let formElement;
  $$unsubscribe_page();
  return `<form id="purchaseSuccessForm" method="POST" action="?/handlePurchaseSuccess"${add_attribute("this", formElement, 0)}><input type="hidden" name="session_id"${add_attribute("value", $page.url.searchParams.get("session_id") || "", 0)}></form> <div class="h-[80vh] flex items-center justify-center flex-col md:w-3/5 m-auto gap-4 px-4" data-svelte-h="svelte-1ctet2e"><h2 class="font-jura sm:text-4xl text-3xl text-center py-3">Thank You for Ordering!</h2> <p class="font-jura">You are one of our most valued customers.</p> <p class="font-jura">We&#39;re thrilled to be getting one of our products in your hands. We&#39;ll keep you updated as we get
		your order fulfilled.</p> <p class="font-jura">We will inform you when your order has shipped to you.</p> <p class="font-jura">Keep an eye on your email, we&#39;ll send you updates!</p></div>`;
});
export {
  Page as default
};
