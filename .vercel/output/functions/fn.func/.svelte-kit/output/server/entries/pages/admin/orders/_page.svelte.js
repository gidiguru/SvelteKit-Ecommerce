import { c as create_ssr_component, v as validate_component, o as each, e as escape } from "../../../../chunks/ssr.js";
import "devalue";
import "../../../../chunks/client.js";
import { B as Button } from "../../../../chunks/index3.js";
import { T as Table, a as Table_row, b as Table_body, c as Table_cell } from "../../../../chunks/table-row.js";
import "clsx";
import { T as Table_header, a as Table_head } from "../../../../chunks/table-header.js";
import { R as Root, T as Trigger, D as Dropdown_menu_content, G as Group, a as Dropdown_menu_label, b as Dropdown_menu_separator, c as Dropdown_menu_item } from "../../../../chunks/index7.js";
import { D as Drawer, a as Drawer_content, b as Drawer_header, c as Drawer_title, d as Drawer_description, e as Drawer_footer, C as Close } from "../../../../chunks/index8.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const More_horizontal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "1" }],
    ["circle", { "cx": "19", "cy": "12", "r": "1" }],
    ["circle", { "cx": "5", "cy": "12", "r": "1" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "more-horizontal" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MoreHorizontal = More_horizontal;
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let customerViewOpen;
  let { data } = $$props;
  let openCustomerViewIdx = -1;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    customerViewOpen = openCustomerViewIdx >= 0;
    $$rendered = `<div class="rounded-md grow p-4">${validate_component(Table, "Table.Root").$$render($$result, { class: "border-0" }, {}, {
      default: () => {
        return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "w-[100px]" }, {}, {
                  default: () => {
                    return `id`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `status`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `email`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `date`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-right" }, {}, {
                  default: () => {
                    return `amount`;
                  }
                })}`;
              }
            })}`;
          }
        })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
          default: () => {
            return `${each(data.orders, (order, i) => {
              return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                    default: () => {
                      return `${escape(truncateString(order.stripeOrderId, 10))}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { class: "hover:text-underline" }, {}, {
                            default: () => {
                              return `${escape(order.status)}`;
                            }
                          })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
                            default: () => {
                              return `${validate_component(Group, "DropdownMenu.Group").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `set status`;
                                    }
                                  })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `new`;
                                    }
                                  })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `placed`;
                                    }
                                  })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `packaged`;
                                    }
                                  })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `sent`;
                                    }
                                  })} `;
                                }
                              })} `;
                            }
                          })} `;
                        }
                      })} `;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(order.email)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(order.timestamp.toLocaleDateString())}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-right" }, {}, {
                    default: () => {
                      return `$${escape((order.totalPrice / 100).toFixed(2))}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
                            default: ({ builder }) => {
                              return `${validate_component(Button, "Button").$$render(
                                $$result,
                                {
                                  variant: "ghost",
                                  builders: [builder],
                                  size: "icon",
                                  class: "relative w-8 h-8 p-0"
                                },
                                {},
                                {
                                  default: () => {
                                    return `<span class="sr-only" data-svelte-h="svelte-rsbkxi">Open menu</span> ${validate_component(MoreHorizontal, "MoreHorizontal").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
                                  }
                                }
                              )} `;
                            }
                          })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
                            default: () => {
                              return `${validate_component(Group, "DropdownMenu.Group").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `Actions`;
                                    }
                                  })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `Copy Stripe ID
									`;
                                    }
                                  })} `;
                                }
                              })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})}  ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `view customer
								`;
                                }
                              })}  ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `view payment details`;
                                }
                              })}  ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `view products`;
                                }
                              })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `order details`;
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
    })}</div> ${validate_component(Drawer, "Drawer.Root").$$render(
      $$result,
      {
        onClose: () => openCustomerViewIdx = -1,
        open: customerViewOpen
      },
      {
        open: ($$value) => {
          customerViewOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Drawer_content, "Drawer.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Drawer_header, "Drawer.Header").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Drawer_title, "Drawer.Title").$$render($$result, {}, {}, {
                    default: () => {
                      return `Customer Info`;
                    }
                  })} ${validate_component(Drawer_description, "Drawer.Description").$$render($$result, {}, {}, {
                    default: () => {
                      return `<h2><b data-svelte-h="svelte-yuqj23">Name:</b> ${escape(data.orders[openCustomerViewIdx].customerInfo.name)}</h2> <h2><b data-svelte-h="svelte-1rvsz9u">Email:</b> ${escape(data.orders[openCustomerViewIdx].customerInfo.email)}</h2> <h2><b data-svelte-h="svelte-1cgtn0a">Address:</b> ${escape(data.orders[openCustomerViewIdx].customerInfo.address?.line1)}</h2> <h2><b data-svelte-h="svelte-12cl3jz">City:</b> ${escape(data.orders[openCustomerViewIdx].customerInfo.address?.city)}</h2> <h2><b data-svelte-h="svelte-mb4bxv">State:</b> ${escape(data.orders[openCustomerViewIdx].customerInfo.address?.state)}</h2> <h2><b data-svelte-h="svelte-16ml6it">Zip:</b> ${escape(data.orders[openCustomerViewIdx].customerInfo.address?.postal_code)}</h2> <h2><b data-svelte-h="svelte-8l0lf0">Country:</b> ${escape(data.orders[openCustomerViewIdx].customerInfo.address?.country)}</h2>`;
                    }
                  })}`;
                }
              })} ${validate_component(Drawer_footer, "Drawer.Footer").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Close, "Drawer.Close").$$render($$result, { class: "w-[300px]" }, {}, {
                    default: () => {
                      return `Cancel`;
                    }
                  })}`;
                }
              })}`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
