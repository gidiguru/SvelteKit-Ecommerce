import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import { B as Button } from "../../../../chunks/index6.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../../chunks/card-title.js";
import "clsx";
import { I as Input } from "../../../../chunks/input.js";
import { L as Label } from "../../../../chunks/label.js";
import "../../../../chunks/index4.js";
import { A as Alert, a as Alert_description } from "../../../../chunks/alert-description.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let isSubmitting = false;
  let email = "";
  let message = "";
  let messageType = "default";
  function updateMessage() {
    if (form?.error) {
      message = form.error;
      messageType = "destructive";
    } else if (form?.success) {
      message = "Successfully joined the email list!";
      messageType = "default";
    } else {
      message = "";
      messageType = "default";
    }
    console.log("Updated message:", message);
    console.log("Updated messageType:", messageType);
  }
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        console.log("Form data changed:", form);
        updateMessage();
      }
    }
    {
      {
        console.log("Email input changed:", email);
      }
    }
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-[400px]" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Email List`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
              default: () => {
                return `Get updates and deals from the Techshop team`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<form method="POST"><div class="grid w-full items-center gap-4"><div class="flex flex-col space-y-1.5">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Email`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "email",
                placeholder: "you@example.com",
                name: "email",
                value: email
              },
              {
                value: ($$value) => {
                  email = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div></div> <div class="flex justify-end pt-4">${validate_component(Button, "Button").$$render($$result, { type: "submit", disabled: isSubmitting }, {}, {
              default: () => {
                return `${escape("Join")}`;
              }
            })}</div></form> ${message ? `<div class="mt-4">${validate_component(Alert, "Alert").$$render($$result, { variant: messageType }, {}, {
              default: () => {
                return `${validate_component(Alert_description, "AlertDescription").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(message)}`;
                  }
                })}`;
              }
            })}</div>` : ``}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
