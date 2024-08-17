import { c as create_ssr_component, s as spread, d as escape_object, v as validate_component, b as escape_attribute_value, e as escape, a as add_attribute } from "../../../../chunks/ssr.js";
import { R as Root, T as Tabs_list, a as Tabs_trigger } from "../../../../chunks/index12.js";
import { h as compute_rest_props, s as subscribe } from "../../../../chunks/lifecycle.js";
import { B as Button } from "../../../../chunks/index6.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../../chunks/card-title.js";
import { o as setCtx, p as getAttrs, q as getCtx, a as cn } from "../../../../chunks/utils.js";
import { s as superForm } from "../../../../chunks/superForm.js";
import "../../../../chunks/formData.js";
import "../../../../chunks/index2.js";
import { z } from "zod";
import { I as Icons } from "../../../../chunks/index11.js";
import { A as AlertTriangle } from "../../../../chunks/triangle-alert.js";
import { L as Loader } from "../../../../chunks/loader.js";
import "clsx";
import { L as Label } from "../../../../chunks/label.js";
import { c as createDispatcher } from "../../../../chunks/events.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as Tabs_content } from "../../../../chunks/tabs-content.js";
const Checkbox$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["checked", "disabled", "name", "required", "value", "onCheckedChange", "asChild"]);
  let $root, $$unsubscribe_root;
  let { checked = false } = $$props;
  let { disabled = void 0 } = $$props;
  let { name = void 0 } = $$props;
  let { required = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onCheckedChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  const { elements: { root }, states: { checked: localChecked }, updateOption } = setCtx({
    defaultChecked: checked,
    disabled,
    name,
    required,
    value,
    onCheckedChange: ({ next }) => {
      if (checked !== next) {
        onCheckedChange?.(next);
        checked = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  createDispatcher();
  const attrs = getAttrs("root");
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onCheckedChange === void 0 && $$bindings.onCheckedChange && onCheckedChange !== void 0)
    $$bindings.onCheckedChange(onCheckedChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  checked !== void 0 && localChecked.set(checked);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("name", name);
  }
  {
    updateOption("required", required);
  }
  {
    updateOption("value", value);
  }
  builder = $root;
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<button${spread(
    [
      escape_object(builder),
      { type: "button" },
      escape_object($$restProps),
      escape_object(attrs),
      {
        disabled: (disabled ? true : void 0) || null
      }
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</button>`}`;
});
const CheckboxIndicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let $isChecked, $$unsubscribe_isChecked;
  let $isIndeterminate, $$unsubscribe_isIndeterminate;
  const { helpers: { isChecked, isIndeterminate } } = getCtx();
  $$unsubscribe_isChecked = subscribe(isChecked, (value) => $isChecked = value);
  $$unsubscribe_isIndeterminate = subscribe(isIndeterminate, (value) => $isIndeterminate = value);
  const attrs = getAttrs("indicator");
  $$unsubscribe_isChecked();
  $$unsubscribe_isIndeterminate();
  return `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({
    isChecked: $isChecked,
    isIndeterminate: $isIndeterminate
  }) : ``}</div>`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Check$1 = Check;
const Minus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "minus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Minus$1 = Minus;
const Card_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex items-center p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const SigninCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSubmitDisabled;
  let $$restProps = compute_rest_props($$props, ["data", "class"]);
  let $form, $$unsubscribe_form;
  let $delayed, $$unsubscribe_delayed;
  let $errors, $$unsubscribe_errors;
  let { data } = $$props;
  z.object({
    email: z.string().email(),
    password: z.string().min(8)
  });
  const { form, errors, enhance, delayed } = superForm(data.signinForm, { taintedMessage: null, delayMs: 0 });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  let { class: className = void 0 } = $$props;
  let validationErrors = {};
  function getFirstError(field) {
    return validationErrors[field]?.[0];
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  isSubmitDisabled = $delayed;
  $$unsubscribe_form();
  $$unsubscribe_delayed();
  $$unsubscribe_errors();
  return `<form method="POST" action="?/signin">${validate_component(Card, "Card.Root").$$render($$result, { class: "w-[400px]" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `${escape("signin")}`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Enter your email below to sign in.`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "space-y-4" }, {}, {
        default: () => {
          return `<div${spread(
            [
              {
                class: escape_attribute_value(cn("grid gap-4", className))
              },
              escape_object($$restProps)
            ],
            {}
          )}><label class="grid gap-1"><span class="sr-only">${escape("email")}</span> <input id="signinEmail" name="email" type="email" autocomplete="email" class="${["input", validationErrors.email ? "input-error" : ""].join(" ").trim()}" autocapitalize="none" autocorrect="off" ${isSubmitDisabled ? "disabled" : ""}${add_attribute("value", $form.email, 0)}> ${validationErrors.email ? `<small class="text-red-600">${escape(getFirstError("email"))}</small>` : ``}</label> <label class="grid gap-1"><span class="sr-only">${escape("password")}</span> <input id="signinPassword" name="password" type="password" class="${["input", validationErrors.password ? "input-error" : ""].join(" ").trim()}" ${isSubmitDisabled ? "disabled" : ""}${add_attribute("value", $form.password, 0)}> ${validationErrors.password ? `<small class="text-red-600">${escape(getFirstError("password"))}</small>` : ``}</label> ${$errors._errors ? `<div class="alert variant-filled-error mt-4 content-center"><div class="alert-message text-center flex items-center justify-center gap-2">${validate_component(AlertTriangle, "AlertTriangle").$$render($$result, { size: "24", class: "text-red-600" }, {}, {})} <p class="text-red-600">${escape($errors._errors)}</p></div></div>` : ``} <input hidden name="type" value="signin"> ${validate_component(Button, "Button").$$render(
            $$result,
            {
              disabled: isSubmitDisabled,
              type: "submit",
              class: "btn variant-filled-primary w-full"
            },
            {},
            {
              default: () => {
                return `${$delayed ? `${validate_component(Loader, "Loader").$$render($$result, { class: "mr-2 h-4 w-4 animate-spin" }, {}, {})}` : `${``}`} ${escape("Sign In")}`;
              }
            }
          )} <div class="text-center"><a href="/auth/password/reset" class="font-semibold">${escape("Forgot Password")}</a></div></div> <div class="relative" data-svelte-h="svelte-vy185j"><div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div> <div class="relative flex justify-center text-xs uppercase"><span class="bg-background px-2 text-muted-foreground">Or continue with</span></div></div> ${validate_component(Button, "Button").$$render(
            $$result,
            {
              href: "/auth/login/google",
              variant: "outline"
            },
            {},
            {
              default: () => {
                return `${`${validate_component(Icons.google, "Icons.google").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}`}
				Google`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outline",
              href: "/auth/login/github"
            },
            {},
            {
              default: () => {
                return `${`${validate_component(Icons.gitHub, "Icons.gitHub").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}`}
				Github`;
              }
            }
          )} <p class="text-center text-sm text-muted-foreground" data-svelte-h="svelte-1ph7y1n">By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">Terms of Service</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.</p>`;
        }
      })}`;
    }
  })}</form>`;
});
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "checked"]);
  let { class: className = void 0 } = $$props;
  let { checked = false } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Checkbox$1, "CheckboxPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50", className)
        },
        $$restProps,
        { checked }
      ),
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(CheckboxIndicator, "CheckboxPrimitive.Indicator").$$render(
            $$result,
            {
              class: cn("flex h-4 w-4 items-center justify-center text-current")
            },
            {},
            {
              default: ({ isChecked, isIndeterminate }) => {
                return `${isChecked ? `${validate_component(Check$1, "Check").$$render($$result, { class: "h-3.5 w-3.5" }, {}, {})}` : `${isIndeterminate ? `${validate_component(Minus$1, "Minus").$$render($$result, { class: "h-3.5 w-3.5" }, {}, {})}` : ``}`}`;
              }
            }
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const SignupCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $delayed, $$unsubscribe_delayed;
  let $errors, $$unsubscribe_errors;
  let { data } = $$props;
  z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions"
    })
  });
  const { form, errors, enhance, delayed } = superForm(data.signinForm, { taintedMessage: null, delayMs: 0 });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    !$form.terms || $delayed;
    $$rendered = `<form method="POST" action="?/signup">${validate_component(Card, "Card.Root").$$render($$result, { class: "w-[400px]" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "space-y-1 items-center" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {})} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "grid gap-4" }, {}, {
          default: () => {
            return `<div class="flex flex-col space-y-2 text-center"><h1 class="text-2xl font-semibold tracking-tight">${escape("signup")}</h1> <p class="text-sm text-muted-foreground" data-svelte-h="svelte-1kah0o4">Enter your email below to create your account</p></div> <div class="grid gap-4"><div class="grid gap-2"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><span class="sr-only">${escape("First Name")}</span> <input id="firstName" name="firstName" type="text"${add_attribute("placeholder", "FirstName", 0)} autocomplete="given-name"${add_attribute("data-invalid", $errors.firstName, 0)} class="${[
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              $errors.firstName ? "input-error" : ""
            ].join(" ").trim()}"${add_attribute("value", $form.firstName, 0)}> ${$errors.firstName ? `<small class="text-red-600">${escape($errors.firstName)}</small>` : ``}</label></div> <div class="grid gap-2"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><span class="sr-only">${escape("lastName")}</span> <input id="lastName" name="lastName" type="text"${add_attribute("placeholder", "LastName", 0)} autocomplete="family-name"${add_attribute("data-invalid", $errors.lastName, 0)} class="${[
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              $errors.lastName ? "input-error" : ""
            ].join(" ").trim()}"${add_attribute("value", $form.lastName, 0)}> ${$errors.lastName ? `<small class="text-red-600">${escape($errors.lastName)}</small>` : ``}</label></div> <div class="grid gap-2"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><span class="sr-only">${escape("email")}</span> <input id="signupEmail" name="email" type="email"${add_attribute("placeholder", "Email", 0)} autocomplete="email"${add_attribute("data-invalid", $errors.email, 0)} class="${[
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              $errors.email ? "input-error" : ""
            ].join(" ").trim()}"${add_attribute("value", $form.email, 0)}> ${$errors.email ? `<small class="text-red-600">${escape($errors.email)}</small>` : ``}</label></div> <div class="grid gap-2"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><span class="sr-only">${escape("Password")}</span> <input id="signupPassword" name="password" type="password"${add_attribute("placeholder", "password", 0)}${add_attribute("data-invalid", $errors.password, 0)} class="${[
              "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              $errors.password ? "input-error" : ""
            ].join(" ").trim()}"${add_attribute("value", $form.password, 0)}> ${$errors.password ? `<small class="text-red-600">${escape($errors.password)}</small>` : ``}</label></div> <div class="grid gap-2"><div class="flex items-center space-x-2">${validate_component(Checkbox, "Checkbox").$$render(
              $$result,
              {
                id: "terms",
                name: "terms",
                class: "checkbox",
                "aria-labelledby": "terms-label",
                checked: $form.terms
              },
              {
                checked: ($$value) => {
                  $form.terms = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Label, "Label").$$render(
              $$result,
              {
                id: "terms-label",
                for: "terms",
                class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              },
              {},
              {
                default: () => {
                  return `<span class="ml-1" data-svelte-h="svelte-1gxximy">I accept the
								<a href="/terms" class="text-primaryHover underline">terms</a>
								and
								<a href="/privacy" class="text-primaryHover underline">privacy policy</a></span>`;
                }
              }
            )}</div></div> <div class="grid pt-4">${validate_component(Button, "Button").$$render(
              $$result,
              {
                type: "submit",
                disabled: !$form.terms,
                class: "btn variant-filled-primary w-full"
              },
              {},
              {
                default: () => {
                  return `${$delayed ? `<div class="w-4 h-4 bg-amber-600"></div>` : `${escape("signup")}`}`;
                }
              }
            )}</div></div> <div class="relative" data-svelte-h="svelte-1v71zax"><div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div> <div class="relative flex justify-center text-xs uppercase"><span class="bg-card px-2 text-muted-foreground">Or continue with</span></div></div> <div class="grid grid-cols-2 gap-6">${validate_component(Button, "Button").$$render(
              $$result,
              {
                href: "/auth/login/google",
                variant: "outline"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Icons.google, "Icons.google").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}
					Google`;
                }
              }
            )} ${validate_component(Button, "Button").$$render(
              $$result,
              {
                href: "/auth/login/github",
                variant: "outline"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Icons.gitHub, "Icons.gitHub").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}
					Github`;
                }
              }
            )}</div>`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {})}`;
      }
    })}</form>`;
  } while (!$$settled);
  $$unsubscribe_form();
  $$unsubscribe_delayed();
  $$unsubscribe_errors();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="p-4 sm:p-8"><div class="min-w-[300px] max-w-sm mx-auto">${validate_component(Root, "Tabs.Root").$$render($$result, { value: "signin", class: "w-full" }, {}, {
    default: () => {
      return `${validate_component(Tabs_list, "Tabs.List").$$render($$result, { class: "grid w-full grid-cols-2" }, {}, {
        default: () => {
          return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "signin" }, {}, {
            default: () => {
              return `${escape("signin")}`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "signup" }, {}, {
            default: () => {
              return `${escape("signup")}`;
            }
          })}`;
        }
      })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "signin" }, {}, {
        default: () => {
          return `${validate_component(SigninCard, "SigninCard").$$render($$result, { data }, {}, {})}`;
        }
      })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "signup" }, {}, {
        default: () => {
          return `${validate_component(SignupCard, "SignupCard").$$render($$result, { data }, {}, {})}`;
        }
      })}`;
    }
  })}</div></div>`;
});
export {
  Page as default
};
