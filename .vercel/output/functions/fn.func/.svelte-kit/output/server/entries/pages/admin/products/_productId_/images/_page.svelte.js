import { c as create_ssr_component, v as validate_component, o as each, a as add_attribute } from "../../../../../../chunks/ssr.js";
import { C as CldImage } from "../../../../../../chunks/CldImage.js";
import "../../../../../../chunks/getCldImageUrl.js";
import { C as CldUploadButton } from "../../../../../../chunks/CldUploadButton.js";
import { i as invalidateAll } from "../../../../../../chunks/client.js";
import { d as deserialize } from "../../../../../../chunks/forms.js";
import { R as Root, T as Trigger, D as Dropdown_menu_content, G as Group, a as Dropdown_menu_label, b as Dropdown_menu_separator, c as Dropdown_menu_item } from "../../../../../../chunks/index7.js";
import { B as Button } from "../../../../../../chunks/index3.js";
import dotenv__default from "dotenv";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { T as Trash } from "../../../../../../chunks/trash.js";
const Crown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "crown" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Crown$1 = Crown;
const Folder_kanban = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      }
    ],
    ["path", { "d": "M8 10v4" }],
    ["path", { "d": "M12 10v2" }],
    ["path", { "d": "M16 10v6" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "folder-kanban" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const FolderKanban = Folder_kanban;
const Toggle_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "12",
        "x": "2",
        "y": "6",
        "rx": "6",
        "ry": "6"
      }
    ],
    ["circle", { "cx": "16", "cy": "12", "r": "2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "toggle-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ToggleRight = Toggle_right;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  dotenv__default.config();
  async function handleSubmit(info) {
    const { public_id, width, height } = info;
    const formData = new FormData();
    formData.append("cloudinaryId", public_id);
    formData.append("width", width.toString());
    formData.append("height", height.toString());
    const response = await fetch(`/admin/products/${data.productId}/images?/create`, { method: "POST", body: formData });
    const result = deserialize(await response.text());
    if (result.type === "success") {
      await invalidateAll();
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="w-full h-full p-8 flex flex-col"><div class="flex flex-row flex-wrap grow gap-4">${each(data.images, (image) => {
    return `<div${add_attribute("class", `w-[300px] ${image.isVertical ? "h-[500px]" : "h-[200px]"} rounded-md overflow-hidden relative border-white ${image.isPrimary && "border-4"}`, 0)}>${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        alt: image.cloudinaryId,
        src: image.cloudinaryId,
        width: 600,
        height: image.isVertical ? 1e3 : 400,
        objectFit: "cover"
      },
      {},
      {}
    )} ${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render(
          $$result,
          {
            class: "w-full h-full absolute top-0 left-0 bg-neutral-800 z-40 hover:opacity-100 opacity-0 bg-opacity-60 flex flex-row items-center justify-center text-white"
          },
          {},
          {
            default: () => {
              return `${validate_component(FolderKanban, "FolderKanban").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
						Manage`;
            }
          }
        )} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Group, "DropdownMenu.Group").$$render($$result, { class: "p-2" }, {}, {
              default: () => {
                return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
                  default: () => {
                    return `Manage Image`;
                  }
                })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { asChild: true }, {}, {
                  default: () => {
                    return `<form method="POST" action="?/markPrimary" class="py-1"><input type="hidden" name="cloudinaryId"${add_attribute("value", image.cloudinaryId, 0)}> ${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        size: "sm",
                        type: "submit",
                        class: "flex w-full justify-start",
                        disabled: image.isPrimary
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Crown$1, "Crown").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
										Set Primary
									`;
                        }
                      }
                    )}</form> `;
                  }
                })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { asChild: true }, {}, {
                  default: () => {
                    return `<form method="POST" action="?/toggleVertical" class="py-1"><input type="hidden" name="cloudinaryId"${add_attribute("value", image.cloudinaryId, 0)}> ${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        size: "sm",
                        type: "submit",
                        class: "flex w-full justify-start"
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(ToggleRight, "ToggleRight").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
										Toggle Vertical
									`;
                        }
                      }
                    )}</form> `;
                  }
                })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { asChild: true }, {}, {
                  default: () => {
                    return `<form method="POST" action="?/delete" class="py-1"><input type="hidden" name="cloudinaryId"${add_attribute("value", image.cloudinaryId, 0)}> ${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        size: "sm",
                        variant: "destructive",
                        type: "submit",
                        class: "flex w-full justify-start"
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Trash, "Trash").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
										Delete
									`;
                        }
                      }
                    )}</form> `;
                  }
                })} `;
              }
            })} `;
          }
        })} `;
      }
    })} </div>`;
  })}</div> <div class="w-full flex flex-row justify-end">${validate_component(CldUploadButton, "CldUploadButton").$$render(
    $$result,
    {
      uploadPreset: process.env.PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      signatureEndpoint: "/api/cloudinary",
      class: "px-4 py-2 rounded-lg border-gray-900 bg-white text-gray-900 border font-semibold hover:bg-gray-200",
      onUpload: (res) => {
        if (res.event === "success") {
          handleSubmit(res.info);
        }
      }
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Page as default
};
