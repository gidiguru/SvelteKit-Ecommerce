import { c as create_ssr_component, v as validate_component, f as each, e as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import { B as Button } from "../../../../chunks/index6.js";
import { T as Table, a as Table_row, b as Table_body, c as Table_cell } from "../../../../chunks/table-row.js";
import "clsx";
import { T as Table_header, a as Table_head } from "../../../../chunks/table-header.js";
import { R as Root, T as Trigger, D as Dropdown_menu_content, G as Group, a as Dropdown_menu_label, b as Dropdown_menu_separator, c as Dropdown_menu_item } from "../../../../chunks/index7.js";
import { D as Drawer, a as Drawer_content, b as Drawer_header, c as Drawer_title, d as Drawer_description, e as Drawer_footer, C as Close } from "../../../../chunks/index8.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Ellipsis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "1" }],
    ["circle", { "cx": "19", "cy": "12", "r": "1" }],
    ["circle", { "cx": "5", "cy": "12", "r": "1" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "ellipsis" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MoreHorizontal = Ellipsis;
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}
function isCustomerDetails(customer) {
  return customer && typeof customer.name === "string";
}
function isPaystackCustomer(customer) {
  return customer && typeof customer.email === "string" && (typeof customer.first_name === "string" || typeof customer.last_name === "string");
}
function getCustomerName(order) {
  const customer = order.customerDetails;
  if (isCustomerDetails(customer)) {
    return customer.name || "N/A";
  } else if (isPaystackCustomer(customer)) {
    return `${customer.first_name || ""} ${customer.last_name || ""}`.trim() || "N/A";
  }
  return "N/A";
}
function getCustomerEmail(order) {
  if (order.email) {
    return order.email;
  }
  const customer = order.customerDetails;
  if (isCustomerDetails(customer) || isPaystackCustomer(customer)) {
    return customer.email || "N/A";
  }
  return "N/A";
}
function getCustomerAddress(order) {
  const customer = order.customerDetails;
  if (isCustomerDetails(customer) && customer.address) {
    const { line1, line2, city, state, postal_code, country } = customer.address;
    return [line1, line2, city, state, postal_code, country].filter(Boolean).join(", ") || "N/A";
  }
  return "N/A";
}
function getCustomerPhone(order) {
  const customer = order.customerDetails;
  if (isCustomerDetails(customer) || isPaystackCustomer(customer)) {
    return customer.phone || "N/A";
  }
  return "N/A";
}
function getOrderId(order) {
  return order.paymentGateway === "stripe" ? order.stripeOrderId : order.paystackTransactionId;
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
                    return `ID`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Status`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Email`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Date`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Gateway`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-right" }, {}, {
                  default: () => {
                    return `Amount`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                  default: () => {
                    return `Actions`;
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
                      return `${escape(truncateString(getOrderId(order), 10))}`;
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
                                      return `Set status`;
                                    }
                                  })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${each(["new", "placed", "packaged", "sent"], (status) => {
                                    return `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `${escape(status)} `;
                                      }
                                    })}`;
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
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(order.paymentGateway)}`;
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
                                      return `Copy Order ID
									`;
                                    }
                                  })} `;
                                }
                              })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `View customer
								`;
                                }
                              })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `View payment details`;
                                }
                              })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `View products`;
                                }
                              })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                default: () => {
                                  return `Order details
								`;
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
                      return `${customerViewOpen && data.orders[openCustomerViewIdx] ? (() => {
                        let order = data.orders[openCustomerViewIdx];
                        return ` <h2><b data-svelte-h="svelte-yuqj23">Name:</b> ${escape(getCustomerName(order))}</h2> <h2><b data-svelte-h="svelte-1rvsz9u">Email:</b> ${escape(getCustomerEmail(order))}</h2> <h2><b data-svelte-h="svelte-1cgtn0a">Address:</b> ${escape(getCustomerAddress(order))}</h2> <h2><b data-svelte-h="svelte-onawim">Phone:</b> ${escape(getCustomerPhone(order))}</h2>`;
                      })() : ``}`;
                    }
                  })}`;
                }
              })} ${validate_component(Drawer_footer, "Drawer.Footer").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Close, "Drawer.Close").$$render($$result, { class: "w-[300px]" }, {}, {
                    default: () => {
                      return `Close`;
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
