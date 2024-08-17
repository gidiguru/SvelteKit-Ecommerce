import { s as subscribe } from "../../../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute, m as missing_component } from "../../../../../chunks/ssr.js";
import { s as superForm } from "../../../../../chunks/superForm.js";
import "../../../../../chunks/formData.js";
import "../../../../../chunks/index2.js";
import { u as userUpdatePasswordSchema } from "../../../../../chunks/zod-schemas.js";
import { z as zod } from "../../../../../chunks/zod.js";
import { g as goto } from "../../../../../chunks/client.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { L as Loader } from "../../../../../chunks/loader.js";
import { A as AlertTriangle } from "../../../../../chunks/triangle-alert.js";
const Eye = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "eye" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
function getPasswordStrength(password) {
  const score = password.length >= 8 ? password.length >= 12 ? 3 : 2 : 1;
  const feedback = score === 3 ? "Strong" : score === 2 ? "Moderate" : "Weak";
  console.log("Password strength calculated:", { score, feedback });
  return { score, feedback };
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let passwordStrength;
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let $message, $$unsubscribe_message;
  let $submitting, $$unsubscribe_submitting;
  let $delayed, $$unsubscribe_delayed;
  let { data } = $$props;
  const { form, errors, enhance, delayed, submitting, message } = superForm(data.form, {
    taintedMessage: null,
    validators: zod(userUpdatePasswordSchema),
    delayMs: 500,
    onResult: ({ result }) => {
      console.log("Form submission result:", result);
      if (result.type === "failure") {
        console.error("Form validation failed:", result.data);
      } else if (result.type === "error") {
        console.error("Form submission error:", result.error);
      }
      if (result.type === "success") {
        if (result.data && result.data.success === true) {
          console.log("Password updated successfully, redirecting...");
          goto();
        } else {
          console.log("Form submission was successful, but password update failed");
        }
      } else {
        console.log("Form submission was not successful");
        if (result.type === "error") {
          console.error("Form submission error:", result.error);
        } else if (result.type === "failure") {
          console.error("Form validation failed:", result.data);
        }
      }
    }
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => $submitting = value);
  $$unsubscribe_message = subscribe(message, (value) => $message = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    {
      console.log("Form data changed:", $form);
      console.log("Form errors:", $errors);
    }
  }
  passwordStrength = getPasswordStrength($form.password);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  $$unsubscribe_message();
  $$unsubscribe_submitting();
  $$unsubscribe_delayed();
  return `<h3 data-svelte-h="svelte-l2u0a1">Change Password</h3> <hr class="!border-t-2 mt-2 mb-6"> <form method="POST">${$errors._errors ? `<aside class="alert variant-filled-error mt-6" role="alert">${validate_component(AlertTriangle, "AlertTriangle").$$render($$result, { size: "24" }, {}, {})} <div class="alert-message"><h3 class="h3" data-svelte-h="svelte-mr6em0">Password Problem</h3> <p>${escape($errors._errors)}</p></div></aside>` : ``} ${$message ? `<aside class="alert variant-filled-success mt-6" role="alert"><div class="alert-message"><p>${escape($message)}</p></div></aside>` : ``} <div class="mt-6"><label class="label" for="password"><span data-svelte-h="svelte-1kvjhoz">Password</span> <div class="relative">${`<input id="password" name="password" type="password" placeholder="Password"${add_attribute("data-invalid", $errors.password, 0)} class="${["input pr-10", $errors.password ? "input-error" : ""].join(" ").trim()}" autocomplete="new-password" aria-describedby="password-strength"${add_attribute("value", $form.password, 0)}>`} <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center"${add_attribute("aria-label", "Show password", 0)}>${validate_component(Eye || missing_component, "svelte:component").$$render($$result, { class: "h-5 w-5 text-gray-400" }, {}, {})}</button></div> ${$errors.password ? `<small class="text-error">${escape($errors.password)}</small>` : ``} <div id="password-strength" class="mt-2"><div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"><div class="bg-blue-600 h-2.5 rounded-full" style="${"width: " + escape(passwordStrength.score * 33.33, true) + "%"}"></div></div> <small>Password Strength: ${escape(passwordStrength.feedback)}</small></div></label></div> <div class="mt-6"><label class="label" for="confirmPassword"><span data-svelte-h="svelte-icktzz">Confirm Password</span> <div class="relative">${`<input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password"${add_attribute("data-invalid", $errors.confirmPassword, 0)} class="${["input pr-10", $errors.confirmPassword ? "input-error" : ""].join(" ").trim()}" autocomplete="new-password"${add_attribute("value", $form.confirmPassword, 0)}>`} <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center"${add_attribute(
    "aria-label",
    "Show confirm password",
    0
  )}>${validate_component(Eye || missing_component, "svelte:component").$$render($$result, { class: "h-5 w-5 text-gray-400" }, {}, {})}</button></div> ${$errors.confirmPassword ? `<small class="text-error">${escape($errors.confirmPassword)}</small>` : ``}</label></div> <div class="mt-6"><button type="submit" class="btn variant-filled-primary w-full" ${$submitting ? "disabled" : ""}>${$delayed ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `Update Password`}</button></div></form>`;
});
export {
  Page as default
};
