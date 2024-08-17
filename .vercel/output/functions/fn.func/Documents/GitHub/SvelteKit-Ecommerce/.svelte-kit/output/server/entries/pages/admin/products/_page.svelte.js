import { c as create_ssr_component, v as validate_component, f as each, e as escape } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/index6.js";
import { T as Table, b as Table_body, a as Table_row, c as Table_cell } from "../../../../chunks/table-row.js";
import "clsx";
import "../../../../chunks/index4.js";
import { R as Root, T as Trigger, A as Alert_dialog_content, a as Alert_dialog_header, b as Alert_dialog_title, c as Alert_dialog_description, d as Alert_dialog_footer, e as Alert_dialog_cancel, f as Alert_dialog_action } from "../../../../chunks/index9.js";
import { I as Input } from "../../../../chunks/input.js";
import { L as Label } from "../../../../chunks/label.js";
import { E as Edit } from "../../../../chunks/square-pen.js";
import { T as Trash } from "../../../../chunks/trash.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Square_plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2"
      }
    ],
    ["path", { "d": "M8 12h8" }],
    ["path", { "d": "M12 8v8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "square-plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const PlusSquare = Square_plus;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="p-4 flex flex-col justify-between h-full">${validate_component(Table, "Table.Root").$$render($$result, { class: "max-h-9/10 overflow-auto" }, {}, {
    default: () => {
      return `${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
        default: () => {
          return `${each(data.products, (product, i) => {
            return `${validate_component(Table_row, "Table.Row").$$render(
              $$result,
              {
                class: "flex justify-between items-center"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-bold" }, {}, {
                    default: () => {
                      return `${escape(product.name)} - ${escape(product.id)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render(
                    $$result,
                    {
                      class: "flex flex-row items-center gap-x-4"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Button, "Button").$$render(
                          $$result,
                          {
                            class: "",
                            href: `/admin/products/${product.id}/basics`
                          },
                          {},
                          {
                            default: () => {
                              return `${validate_component(Edit, "Edit").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}
							Edit
						`;
                            }
                          }
                        )} ${validate_component(Root, "AlertDialog.Root").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Trigger, "AlertDialog.Trigger").$$render($$result, { asChild: true }, {}, {
                              default: ({ builder }) => {
                                return `${validate_component(Button, "Button").$$render($$result, { class: " ", builders: [builder] }, {}, {
                                  default: () => {
                                    return `${validate_component(Trash, "Trash").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}
									Delete`;
                                  }
                                })} `;
                              }
                            })} ${validate_component(Alert_dialog_content, "AlertDialog.Content").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Alert_dialog_header, "AlertDialog.Header").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${validate_component(Alert_dialog_title, "AlertDialog.Title").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Are you absolutely sure?`;
                                      }
                                    })} ${validate_component(Alert_dialog_description, "AlertDialog.Description").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `This action cannot be undone. This will permanently delete your product.
									`;
                                      }
                                    })} `;
                                  }
                                })} ${validate_component(Alert_dialog_footer, "AlertDialog.Footer").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${validate_component(Alert_dialog_cancel, "AlertDialog.Cancel").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Cancel`;
                                      }
                                    })} ${validate_component(Alert_dialog_action, "AlertDialog.Action").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Continue`;
                                      }
                                    })} `;
                                  }
                                })} `;
                              }
                            })} `;
                          }
                        })} `;
                      }
                    }
                  )} `;
                }
              }
            )}`;
          })}`;
        }
      })}`;
    }
  })} <div class="h-1/10 w-full flex items-center flex-row justify-end">${validate_component(Button, "Button").$$render($$result, { href: "/admin/products/new", class: " " }, {}, {
    default: () => {
      return `${validate_component(PlusSquare, "PlusSquare").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
			New Product`;
    }
  })}</div> <form method="post" enctype="multipart/form-data"><div class="grid w-full max-w-sm items-center gap-1.5">${validate_component(Label, "Label").$$render($$result, { for: "prices" }, {}, {
    default: () => {
      return `Upload Prices CSV`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      id: "prices",
      type: "file",
      name: "prices",
      accept: ".csv",
      required: true
    },
    {},
    {}
  )}</div> ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
    default: () => {
      return `Submit`;
    }
  })}</form></div> ${``}`;
});
export {
  Page as default
};
