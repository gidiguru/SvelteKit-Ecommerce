import { c as create_ssr_component, e as escape } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex flex-col h-screen container items-center justify-center">${data?.user ? `<p>${escape(data.user.email)}</p>` : ``} <h1 data-svelte-h="svelte-i0q2oz">Confirm Your Email Address</h1> <hr class="!border-t-2 mt-2 mb-6">

	Please check your email account for a message to confirm your email address
	for Techshop. If you did not receive the email,
	<a href="${"/auth/verify/resend-email-" + escape(data.user.token, true)}" class="hover:underline font-bold">click here</a> to resend it.</div>`;
});
export {
  Page as default
};
