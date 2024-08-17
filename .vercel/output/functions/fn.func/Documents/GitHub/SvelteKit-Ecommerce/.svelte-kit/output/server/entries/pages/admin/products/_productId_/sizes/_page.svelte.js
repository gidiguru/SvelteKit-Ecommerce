import { c as create_ssr_component, v as validate_component, f as each, e as escape, a as add_attribute } from "../../../../../../chunks/ssr.js";
import { B as Button } from "../../../../../../chunks/index6.js";
import { T as Table, a as Table_row, b as Table_body, c as Table_cell } from "../../../../../../chunks/table-row.js";
import "clsx";
import { T as Table_header, a as Table_head } from "../../../../../../chunks/table-header.js";
import { R as Root, T as Trigger, D as Dropdown_menu_content, G as Group, a as Dropdown_menu_label, b as Dropdown_menu_separator, c as Dropdown_menu_item } from "../../../../../../chunks/index7.js";
import { R as Root$1, T as Trigger$1, S as Sheet_content, a as Sheet_header, b as Sheet_title } from "../../../../../../chunks/index10.js";
import { I as Input } from "../../../../../../chunks/input.js";
import { L as Label } from "../../../../../../chunks/label.js";
import "../../../../../../chunks/client.js";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { E as Edit } from "../../../../../../chunks/square-pen.js";
import { T as Trash } from "../../../../../../chunks/trash.js";
const Circle_plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M8 12h8" }],
    ["path", { "d": "M12 8v8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const PlusCircle = Circle_plus;
const Ellipsis_vertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "1" }],
    ["circle", { "cx": "12", "cy": "5", "r": "1" }],
    ["circle", { "cx": "12", "cy": "19", "r": "1" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "ellipsis-vertical" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MoreVertical = Ellipsis_vertical;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let createOpen = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="w-full h-full flex flex-col p-4"><div class="grow">${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "w-[100px]" }, {}, {
                  default: () => {
                    return `Code`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Width`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Height`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Price`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Stripe Price ID`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Stripe Product ID`;
                  }
                })}`;
              }
            })}`;
          }
        })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
          default: () => {
            return `${each(data.sizes, (size, i) => {
              return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                    default: () => {
                      return `${escape(size.code)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(size.width)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(size.height)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(`$${(size.price / 100).toFixed(2)}`)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(size.stripePriceId)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(size.stripeProductId)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-right" }, {}, {
                    default: () => {
                      return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, {}, {}, {
                            default: () => {
                              return `${validate_component(MoreVertical, "MoreVertical").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
                            }
                          })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
                            default: () => {
                              return `${validate_component(Group, "DropdownMenu.Group").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `Manage`;
                                    }
                                  })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `${validate_component(Edit, "Edit").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}Edit
										`;
                                    }
                                  })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `<form method="POST" action="?/delete"><input type="text" name="code" id="code"${add_attribute("value", size.code, 0)} class="hidden"> <button type="submit" class="flex flex-row items-center w-full h-full">${validate_component(Trash, "Trash").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}Delete
												</button></form> `;
                                    }
                                  })} `;
                                }
                              })} `;
                            }
                          })} `;
                        }
                      })} `;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}</div> <div class="w-full flex flex-row justify-end">${validate_component(Root$1, "Sheet.Root").$$render(
      $$result,
      { open: createOpen },
      {
        open: ($$value) => {
          createOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Trigger$1, "Sheet.Trigger").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { class: "text-white bg-green-600" }, {}, {
                default: () => {
                  return `${validate_component(PlusCircle, "PlusCircle").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}Create New Size`;
                }
              })}`;
            }
          })} ${validate_component(Sheet_content, "Sheet.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Sheet_header, "Sheet.Header").$$render($$result, { class: "mb-4" }, {}, {
                default: () => {
                  return `${validate_component(Sheet_title, "Sheet.Title").$$render($$result, {}, {}, {
                    default: () => {
                      return `Create New Size`;
                    }
                  })}`;
                }
              })} <form class="flex flex-col gap-y-6" method="POST" action="?/create"><div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "code" }, {}, {
                default: () => {
                  return `Code`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "code",
                  required: true,
                  id: "code",
                  class: "w-full",
                  type: "text",
                  placeholder: "code_12_12"
                },
                {},
                {}
              )}</div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "width" }, {}, {
                default: () => {
                  return `Width`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "width",
                  required: true,
                  id: "width",
                  class: "w-full",
                  type: "number",
                  placeholder: "12"
                },
                {},
                {}
              )}</div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "height" }, {}, {
                default: () => {
                  return `Height`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "height",
                  required: true,
                  id: "height",
                  class: "w-full",
                  type: "number",
                  placeholder: "12"
                },
                {},
                {}
              )}</div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "price" }, {}, {
                default: () => {
                  return `Price`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "price",
                  required: true,
                  id: "price",
                  class: "w-full",
                  type: "number",
                  placeholder: "5999"
                },
                {},
                {}
              )}</div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "stripePriceId" }, {}, {
                default: () => {
                  return `Stripe Price Id`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "stripePriceId",
                  required: true,
                  id: "stripePriceId",
                  class: "w-full",
                  type: "text",
                  placeholder: "stripe1234..."
                },
                {},
                {}
              )}</div> <div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "stripeProductId" }, {}, {
                default: () => {
                  return `Stripe Product Id`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "stripeProductId",
                  required: true,
                  id: "stripeProductId",
                  class: "w-full",
                  type: "text",
                  placeholder: "stripe1234..."
                },
                {},
                {}
              )}</div> <div class="flex flex-row justify-end">${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
                default: () => {
                  return `${validate_component(PlusCircle, "PlusCircle").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
							Create`;
                }
              })}</div></form>`;
            }
          })}`;
        }
      }
    )}</div></div>  ${``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
