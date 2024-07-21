import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/client.js";
import { R as Root, T as Tabs_list, a as Tabs_trigger } from "../../../../../chunks/index11.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
const Gantt_chart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M8 6h10" }],
    ["path", { "d": "M6 12h9" }],
    ["path", { "d": "M11 18h7" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "gantt-chart" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const GanttChart = Gantt_chart;
const Grid_2x2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    ["path", { "d": "M3 12h18" }],
    ["path", { "d": "M12 3v18" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "grid-2x2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Grid2X2 = Grid_2x2;
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["circle", { "cx": "9", "cy": "9", "r": "2" }],
    [
      "path",
      {
        "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "image" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Image$1 = Image;
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
      }
    ],
    ["path", { "d": "M7 7h.01" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "tag" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Tag$1 = Tag;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  value = data.url.split("/").pop();
  return `<div class="w-full p-8 flex flex-col items-center h-full"><h2 class="pb-2 italic font-light text-lg">${escape(data.productBasics.name)}</h2> ${validate_component(Root, "Tabs.Root").$$render($$result, { value, class: "pb-4" }, {}, {
    default: () => {
      return `${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "basics" }, {}, {
            default: () => {
              return `${validate_component(GanttChart, "GanttChart").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} basics`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "images" }, {}, {
            default: () => {
              return `${validate_component(Image$1, "Image").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}images`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "tags" }, {}, {
            default: () => {
              return `${validate_component(Tag$1, "Tag").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} tags`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "sizes" }, {}, {
            default: () => {
              return `${validate_component(Grid2X2, "Grid2X2").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} sizes`;
            }
          })}`;
        }
      })}`;
    }
  })} ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
