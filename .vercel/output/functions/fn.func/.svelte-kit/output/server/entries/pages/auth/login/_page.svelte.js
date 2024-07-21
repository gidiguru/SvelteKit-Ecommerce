import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../../chunks/card-title.js";
import "clsx";
import { B as Button } from "../../../../chunks/index3.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Chrome = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    [
      "line",
      {
        "x1": "21.17",
        "x2": "12",
        "y1": "8",
        "y2": "8"
      }
    ],
    [
      "line",
      {
        "x1": "3.95",
        "x2": "8.54",
        "y1": "6.06",
        "y2": "14"
      }
    ],
    [
      "line",
      {
        "x1": "10.88",
        "x2": "15.46",
        "y1": "21.94",
        "y2": "14"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chrome" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chrome$1 = Chrome;
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }
    ],
    ["path", { "d": "M9 18c-4.51 2-5-2-7-2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "github" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Github$1 = Github;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-[400px]" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `Login/Signup`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Sign in to view your orders and make more!`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="flex flex-col justify-center items-center w-full gap-4">${validate_component(Button, "Button").$$render($$result, { class: "w-full bg-neutral-700" }, {}, {
            default: () => {
              return `${validate_component(Chrome$1, "Chrome").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}
				Coming Soon...`;
            }
          })} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              href: "/auth/login/github",
              class: "w-full"
            },
            {},
            {
              default: () => {
                return `${validate_component(Github$1, "Github").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}
				Sign In With Github`;
              }
            }
          )}</div>`;
        }
      })}`;
    }
  })}`;
});
export {
  Page as default
};
