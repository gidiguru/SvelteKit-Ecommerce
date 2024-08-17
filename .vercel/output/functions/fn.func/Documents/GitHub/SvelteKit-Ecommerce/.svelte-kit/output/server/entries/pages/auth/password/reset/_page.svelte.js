import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape } from "../../../../../chunks/ssr.js";
import { s as superForm } from "../../../../../chunks/superForm.js";
import "../../../../../chunks/formData.js";
import "../../../../../chunks/index2.js";
import "../../../../../chunks/zod-schemas.js";
import { s as subscribe, o as onDestroy } from "../../../../../chunks/lifecycle.js";
import { B as Button } from "../../../../../chunks/index6.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../../../chunks/card-title.js";
import { a as cn } from "../../../../../chunks/utils.js";
import { I as Icons } from "../../../../../chunks/index11.js";
import { A as AlertTriangle } from "../../../../../chunks/triangle-alert.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
const Circle_check_big = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M21.801 10A10 10 0 1 1 17 3.335" }],
    ["path", { "d": "m9 11 3 3L22 4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-check-big" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const CheckCircle = Circle_check_big;
const ResetPasswordCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let success;
  let $form, $$unsubscribe_form;
  let $message, $$unsubscribe_message;
  let $submitting, $$unsubscribe_submitting;
  let $errors, $$unsubscribe_errors;
  const i = (key) => key;
  let { data } = $$props;
  console.log("ResetPasswordCard: Component initialized", { data });
  const { form, errors, enhance, submitting, message } = superForm(data.form, {
    resetForm: true,
    onUpdated: (event) => {
      console.log("ResetPasswordCard: Form updated", event);
    }
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => $submitting = value);
  $$unsubscribe_message = subscribe(message, (value) => $message = value);
  let { class: className = "" } = $$props;
  onDestroy(() => {
    console.log("ResetPasswordCard: Component destroyed");
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  success = $message !== null && $message !== void 0 && $message !== "";
  {
    console.log("ResetPasswordCard: Form state", {
      formData: $form,
      errors: $errors,
      submitting: $submitting,
      message: $message,
      success
    });
  }
  $$unsubscribe_form();
  $$unsubscribe_message();
  $$unsubscribe_submitting();
  $$unsubscribe_errors();
  return `<form method="POST"${add_attribute("class", className, 0)}>${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(i("Password Reset"))}`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(i("Reset your Password"))}`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "space-y-4" }, {}, {
        default: () => {
          return `${$errors._errors ? `<aside class="alert variant-filled-error"><div>${validate_component(AlertTriangle, "AlertTriangle").$$render($$result, { size: "24" }, {}, {})}</div> <div class="alert-message"><p>${escape($errors._errors[0])}</p></div></aside>` : ``} ${success ? `<aside class="alert variant-filled-success"><div>${validate_component(CheckCircle, "CheckCircle").$$render($$result, { size: "24" }, {}, {})}</div> <div class="alert-message"><p>${escape($message)}</p></div></aside>` : ``} <div class="space-y-2"><label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">${escape(i("email"))}</label> <input id="email" name="email" type="email"${add_attribute("placeholder", i("email"), 0)} autocomplete="email"${add_attribute("data-invalid", $errors.email, 0)}${add_attribute("class", cn("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", $errors.email && "input-error"), 0)} autocapitalize="none" autocorrect="off" ${$submitting ? "disabled" : ""}${add_attribute("value", $form.email, 0)}> ${$errors.email ? `<small class="text-error">${escape($errors.email[0])}</small>` : ``}</div> ${validate_component(Button, "Button").$$render(
            $$result,
            {
              disabled: $submitting,
              type: "submit",
              class: "btn variant-filled-primary w-full"
            },
            {},
            {
              default: () => {
                return `${$submitting ? `${validate_component(Icons.spinner, "Icons.spinner").$$render($$result, { class: "mr-2 h-4 w-4 animate-spin" }, {}, {})} ${escape(i("Submitting"))}` : `${escape(i("Submit"))}`}`;
              }
            }
          )}`;
        }
      })}`;
    }
  })}</form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log("ResetPasswordPage: Component initialized", { data });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="w-[350px] mx-auto py-10">${validate_component(ResetPasswordCard, "ResetPasswordCard").$$render($$result, { data }, {}, {})}</div>`;
});
export {
  Page as default
};
