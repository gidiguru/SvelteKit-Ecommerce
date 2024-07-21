import { c as create_ssr_component, s as subscribe, j as compute_rest_props, k as spread, m as escape_object, v as validate_component, o as each, e as escape } from "../../../../../../chunks/ssr.js";
import { d as deserialize } from "../../../../../../chunks/forms.js";
import { L as Label, I as Input } from "../../../../../../chunks/label.js";
import { T as Table, a as Table_row, b as Table_body, c as Table_cell } from "../../../../../../chunks/table-row.js";
import "clsx";
import { T as Table_header, a as Table_head } from "../../../../../../chunks/table-header.js";
import "../../../../../../chunks/client.js";
import { B as Button } from "../../../../../../chunks/index3.js";
import "dequal";
import { k as setCtx, l as getCtx, m as getAttrs, a as cn, n as flyAndScale } from "../../../../../../chunks/utils.js";
import { d as derived } from "../../../../../../chunks/index4.js";
import { c as createDispatcher } from "../../../../../../chunks/events.js";
import { R as Root$2, T as Trigger$1, A as Alert_dialog_content, a as Alert_dialog_header, b as Alert_dialog_title, c as Alert_dialog_description, d as Alert_dialog_footer, e as Alert_dialog_cancel, f as Alert_dialog_action } from "../../../../../../chunks/index9.js";
import { R as Root$1, S as Sheet_content, a as Sheet_header, b as Sheet_title } from "../../../../../../chunks/index10.js";
import { T as Textarea } from "../../../../../../chunks/textarea.js";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { T as Trash } from "../../../../../../chunks/trash.js";
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { positioning = void 0 } = $$props;
  let { arrowSize = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { closeOnPointerDown = void 0 } = $$props;
  let { openDelay = void 0 } = $$props;
  let { closeDelay = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { forceVisible = true } = $$props;
  let { disableHoverableContent = void 0 } = $$props;
  let { group = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    positioning,
    arrowSize,
    closeOnEscape,
    portal,
    closeOnPointerDown,
    openDelay,
    closeDelay,
    forceVisible,
    defaultOpen: open,
    disableHoverableContent,
    group,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.positioning === void 0 && $$bindings.positioning && positioning !== void 0)
    $$bindings.positioning(positioning);
  if ($$props.arrowSize === void 0 && $$bindings.arrowSize && arrowSize !== void 0)
    $$bindings.arrowSize(arrowSize);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.closeOnPointerDown === void 0 && $$bindings.closeOnPointerDown && closeOnPointerDown !== void 0)
    $$bindings.closeOnPointerDown(closeOnPointerDown);
  if ($$props.openDelay === void 0 && $$bindings.openDelay && openDelay !== void 0)
    $$bindings.openDelay(openDelay);
  if ($$props.closeDelay === void 0 && $$bindings.closeDelay && closeDelay !== void 0)
    $$bindings.closeDelay(closeDelay);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.forceVisible === void 0 && $$bindings.forceVisible && forceVisible !== void 0)
    $$bindings.forceVisible(forceVisible);
  if ($$props.disableHoverableContent === void 0 && $$bindings.disableHoverableContent && disableHoverableContent !== void 0)
    $$bindings.disableHoverableContent(disableHoverableContent);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("positioning", positioning);
  }
  {
    updateOption("arrowSize", arrowSize);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("closeOnPointerDown", closeOnPointerDown);
  }
  {
    updateOption("openDelay", openDelay);
  }
  {
    updateOption("closeDelay", closeDelay);
  }
  {
    updateOption("forceVisible", forceVisible);
  }
  {
    updateOption("group", group);
  }
  {
    updateOption("disableHoverableContent", disableHoverableContent);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const TooltipContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "sideOffset",
    "id"
  ]);
  let $content, $$unsubscribe_content;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { sideOffset = 4 } = $$props;
  let { id = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids } = getCtx(sideOffset);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps), escape_object(attrs)], {})}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${inTransition && $open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${outTransition && $open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : `${$open ? `<div${spread(
    [
      escape_object(builder),
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const TooltipTrigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  const { elements: { trigger }, ids } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $trigger;
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder, attrs }) : ``}` : `<button${spread(
    [
      escape_object(builder),
      { type: "button" },
      escape_object($$restProps),
      escape_object(attrs)
    ],
    {}
  )}>${slots.default ? slots.default({ builder, attrs }) : ``}</button>`}`;
});
const Minus_circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M8 12h8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "minus-circle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MinusCircle = Minus_circle;
const Pencil = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
      }
    ],
    ["path", { "d": "m15 5 4 4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pencil" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Pencil$1 = Pencil;
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Plus$1 = Plus;
const Tooltip_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = { y: 8, duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(TooltipContent, "TooltipPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root = Tooltip;
const Trigger = TooltipTrigger;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let selectedEditTagIdx = -1;
  let debounceTimer;
  let searchQuery = "";
  let searchedTagsResult = [];
  function handleInputChange(query) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(
      () => {
        handleSearch(query);
      },
      400
    );
  }
  async function handleSearch(query) {
    const formData = new FormData();
    formData.append("query", query);
    const response = await fetch(`/admin/products/${data.productId}/tags?/search`, { method: "POST", body: formData });
    const result = deserialize(await response.text());
    if (result.type === "success") {
      const { tags } = result.data;
      searchedTagsResult = tags;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    searchQuery !== "" && handleInputChange(searchQuery);
    $$rendered = `<div class="w-full h-full flex flex-col"><div class="gap-1.5 grid w-full relative pb-8">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
      default: () => {
        return `add a tag`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        name: "name",
        required: true,
        id: "name",
        type: "text",
        placeholder: "My Tag",
        value: searchQuery
      },
      {
        value: ($$value) => {
          searchQuery = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${searchQuery !== "" ? `<div class="absolute top-20 left-0 z-40 w-full bg-black rounded-lg border border-neutral-400 overflow-hidden">${each(searchedTagsResult, (tagRes) => {
      return `<button class="flex w-full flex-row items-center justify-between p-4 hover:bg-neutral-900"><h3 class="text-sm font-semibold text-neutral-100 flex flex-row items-center">${escape(tagRes.tagName)}</h3> </button>`;
    })} <button class="flex w-full flex-row items-center justify-between p-4 hover:bg-neutral-900"><h3 class="text-sm font-semibold text-neutral-100 flex flex-row items-center">${validate_component(Plus$1, "Plus").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} Create New Tag</h3></button></div>` : ``}</div> ${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "w-[250px]" }, {}, {
                  default: () => {
                    return `tag name`;
                  }
                })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "" }, {}, {
                  default: () => {
                    return `tag description`;
                  }
                })}`;
              }
            })}`;
          }
        })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
          default: () => {
            return `${each(data.tagsSelected, (tagSelected, i) => {
              return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                    default: () => {
                      return `${escape(tagSelected.name)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(tagSelected.desc)}`;
                    }
                  })} ${validate_component(Table_cell, "Table.Cell").$$render(
                    $$result,
                    {
                      class: "text-right flex flex-row gap-x-3 justify-end items-center"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Root, "Tooltip.Root").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, { asChild: true }, {}, {
                              default: ({ builder }) => {
                                return `${validate_component(Button, "Button").$$render($$result, { builders: [builder], class: "" }, {}, {
                                  default: () => {
                                    return `${validate_component(Pencil$1, "Pencil").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
                                  }
                                })} ${validate_component(Root$1, "Sheet.Root").$$render(
                                  $$result,
                                  {
                                    open: selectedEditTagIdx === i,
                                    onOpenChange: (open) => {
                                      if (!open) {
                                        selectedEditTagIdx = -1;
                                      }
                                    }
                                  },
                                  {},
                                  {
                                    default: () => {
                                      return `${validate_component(Sheet_content, "Sheet.Content").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(Sheet_header, "Sheet.Header").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${validate_component(Sheet_title, "Sheet.Title").$$render($$result, {}, {}, {
                                                default: () => {
                                                  return `edit the tag description`;
                                                }
                                              })} `;
                                            }
                                          })} <form class="mt-8" action="?/editTag" method="post"><div class="gap-1.5 grid">${validate_component(Label, "Label").$$render($$result, { for: "tagNameShow" }, {}, {
                                            default: () => {
                                              return `tag name`;
                                            }
                                          })} ${validate_component(Input, "Input").$$render(
                                            $$result,
                                            {
                                              name: "tagName",
                                              required: true,
                                              id: "tagName",
                                              class: "hidden",
                                              value: tagSelected.name
                                            },
                                            {},
                                            {}
                                          )} ${validate_component(Input, "Input").$$render(
                                            $$result,
                                            {
                                              name: "tagNameShow",
                                              id: "tagNameShow",
                                              class: "w-full",
                                              placeholder: "tag name",
                                              disabled: true,
                                              value: tagSelected.name
                                            },
                                            {},
                                            {}
                                          )}</div> <div class="gap-1.5 grid mt-4">${validate_component(Label, "Label").$$render($$result, { for: "tagDesc" }, {}, {
                                            default: () => {
                                              return `tag description`;
                                            }
                                          })} ${validate_component(Textarea, "Textarea").$$render(
                                            $$result,
                                            {
                                              placeholder: "Tag description here...",
                                              id: "tagDesc",
                                              name: "tagDesc",
                                              required: true,
                                              class: "w-full",
                                              value: tagSelected.desc
                                            },
                                            {},
                                            {}
                                          )}</div> <div class="w-full flex flex-row justify-end mt-6">${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
                                            default: () => {
                                              return `${validate_component(Pencil$1, "Pencil").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}edit
												`;
                                            }
                                          })} </div></form> `;
                                        }
                                      })} `;
                                    }
                                  }
                                )} `;
                              }
                            })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, {}, {}, {
                              default: () => {
                                return `<p data-svelte-h="svelte-y9i848">Edit Tag</p> `;
                              }
                            })} `;
                          }
                        })} ${validate_component(Root, "Tooltip.Root").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, { asChild: true }, {}, {
                              default: ({ builder }) => {
                                return `${validate_component(Button, "Button").$$render($$result, { builders: [builder] }, {}, {
                                  default: () => {
                                    return `${validate_component(MinusCircle, "MinusCircle").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
                                  }
                                })} `;
                              }
                            })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, {}, {}, {
                              default: () => {
                                return `<p data-svelte-h="svelte-15op1wf">Remove Tag From Product</p> `;
                              }
                            })} `;
                          }
                        })} ${validate_component(Root, "Tooltip.Root").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Root$2, "AlertDialog.Root").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, { asChild: true }, {}, {
                                  default: ({ builder }) => {
                                    return `${validate_component(Trigger$1, "AlertDialog.Trigger").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `${validate_component(Button, "Button").$$render($$result, { builders: [builder] }, {}, {
                                          default: () => {
                                            return `${validate_component(Trash, "Trash").$$render($$result, { class: "w-4 h-4" }, {}, {})} `;
                                          }
                                        })} `;
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
                                            return `This action cannot be undone. This will permanently delete your tag and remove
											this tag from our servers.
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
                                            return `Delete`;
                                          }
                                        })} `;
                                      }
                                    })} `;
                                  }
                                })} `;
                              }
                            })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, {}, {}, {
                              default: () => {
                                return `<p data-svelte-h="svelte-18tll25">Delete Tag</p> `;
                              }
                            })} `;
                          }
                        })} `;
                      }
                    }
                  )} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
