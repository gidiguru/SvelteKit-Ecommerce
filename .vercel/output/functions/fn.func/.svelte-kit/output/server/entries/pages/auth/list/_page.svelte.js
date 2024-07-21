import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/index3.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../../chunks/card-title.js";
import "clsx";
import { L as Label, I as Input } from "../../../../chunks/label.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-[400px]" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `email list`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `get updates and deals from the sediment team`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<form method="POST"><div class="grid w-full items-center gap-4"><div class="flex flex-col space-y-1.5">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
            default: () => {
              return `email`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "email",
              placeholder: "you@mail.com",
              name: "email"
            },
            {},
            {}
          )}</div></div> <div class="flex justify-end pt-4">${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
            default: () => {
              return `join`;
            }
          })}</div></form>`;
        }
      })}`;
    }
  })}`;
});
export {
  Page as default
};
