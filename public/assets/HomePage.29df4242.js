import { h, k as createComponent, ae as btnDesignOptions, c as computed, r as ref, w as watch, g as getCurrentInstance, af as btnPadding, ag as getBtnDesign, R as isKeyCode, a4 as QBtn, a3 as postStore, ah as useRoute, ai as useRouter, o as onMounted, S as resolveComponent, U as openBlock, V as createBlock, W as withCtx, $ as createElementBlock, a5 as renderList, F as Fragment, Y as createCommentVNode, f as createVNode } from "./index.892b4ed7.js";
import { Q as QInput } from "./QInput.48692ae7.js";
import { u as useDarkProps, a as useDark } from "./use-dark.f61784c2.js";
import { b as between } from "./format.801e7424.js";
import { Q as QPage } from "./QCard.5725e9d7.js";
import { A as AppCard } from "./AppCard.f184151f.js";
import "./plugin-vue_export-helper.21dcd24c.js";
const space = h("div", { class: "q-space" });
var QSpace = createComponent({
  name: "QSpace",
  setup() {
    return () => space;
  }
});
function getBool(val, otherwise) {
  return [true, false].includes(val) ? val : otherwise;
}
var QPagination = createComponent({
  name: "QPagination",
  props: {
    ...useDarkProps,
    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      required: true
    },
    maxPages: {
      type: [Number, String],
      default: 0,
      validator: (v) => (typeof v === "string" ? parseInt(v, 10) : v) >= 0
    },
    inputStyle: [Array, String, Object],
    inputClass: [Array, String, Object],
    size: String,
    disable: Boolean,
    input: Boolean,
    iconPrev: String,
    iconNext: String,
    iconFirst: String,
    iconLast: String,
    toFn: Function,
    boundaryLinks: {
      type: Boolean,
      default: null
    },
    boundaryNumbers: {
      type: Boolean,
      default: null
    },
    directionLinks: {
      type: Boolean,
      default: null
    },
    ellipses: {
      type: Boolean,
      default: null
    },
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    round: Boolean,
    rounded: Boolean,
    flat: Boolean,
    outline: Boolean,
    unelevated: Boolean,
    push: Boolean,
    glossy: Boolean,
    color: {
      type: String,
      default: "primary"
    },
    textColor: String,
    activeDesign: {
      type: String,
      default: "",
      values: (v) => v === "" || btnDesignOptions.includes(v)
    },
    activeColor: String,
    activeTextColor: String,
    gutter: String,
    padding: {
      type: String,
      default: "3px 2px"
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const minProp = computed(() => parseInt(props.min, 10));
    const maxProp = computed(() => parseInt(props.max, 10));
    const maxPagesProp = computed(() => parseInt(props.maxPages, 10));
    const inputPlaceholder = computed(() => model.value + " / " + maxProp.value);
    const boundaryLinksProp = computed(() => getBool(props.boundaryLinks, props.input));
    const boundaryNumbersProp = computed(() => getBool(props.boundaryNumbers, !props.input));
    const directionLinksProp = computed(() => getBool(props.directionLinks, props.input));
    const ellipsesProp = computed(() => getBool(props.ellipses, !props.input));
    const newPage = ref(null);
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        val = parseInt(val, 10);
        if (props.disable || isNaN(val)) {
          return;
        }
        const value = between(val, minProp.value, maxProp.value);
        if (props.modelValue !== value) {
          emit("update:modelValue", value);
        }
      }
    });
    watch(() => `${minProp.value}|${maxProp.value}`, () => {
      model.value = props.modelValue;
    });
    const classes = computed(
      () => "q-pagination row no-wrap items-center" + (props.disable === true ? " disabled" : "")
    );
    const gutterProp = computed(() => props.gutter in btnPadding ? `${btnPadding[props.gutter]}px` : props.gutter || null);
    const gutterStyle = computed(() => gutterProp.value !== null ? `--q-pagination-gutter-parent:-${gutterProp.value};--q-pagination-gutter-child:${gutterProp.value}` : null);
    const icons = computed(() => {
      const ico = [
        props.iconFirst || $q.iconSet.pagination.first,
        props.iconPrev || $q.iconSet.pagination.prev,
        props.iconNext || $q.iconSet.pagination.next,
        props.iconLast || $q.iconSet.pagination.last
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico;
    });
    const attrs = computed(() => ({
      "aria-disabled": props.disable === true ? "true" : "false",
      role: "navigation"
    }));
    const btnDesignProp = computed(() => getBtnDesign(props, "flat"));
    const btnProps = computed(() => ({
      [btnDesignProp.value]: true,
      round: props.round,
      rounded: props.rounded,
      padding: props.padding,
      color: props.color,
      textColor: props.textColor,
      size: props.size,
      ripple: props.ripple !== null ? props.ripple : true
    }));
    const btnActiveDesignProp = computed(() => {
      const acc = { [btnDesignProp.value]: false };
      if (props.activeDesign !== "") {
        acc[props.activeDesign] = true;
      }
      return acc;
    });
    const activeBtnProps = computed(() => ({
      ...btnActiveDesignProp.value,
      color: props.activeColor || props.color,
      textColor: props.activeTextColor || props.textColor
    }));
    const btnConfig = computed(() => {
      let maxPages = Math.max(
        maxPagesProp.value,
        1 + (ellipsesProp.value ? 2 : 0) + (boundaryNumbersProp.value ? 2 : 0)
      );
      const acc = {
        pgFrom: minProp.value,
        pgTo: maxProp.value,
        ellipsesStart: false,
        ellipsesEnd: false,
        boundaryStart: false,
        boundaryEnd: false,
        marginalStyle: {
          minWidth: `${Math.max(2, String(maxProp.value).length)}em`
        }
      };
      if (maxPagesProp.value && maxPages < maxProp.value - minProp.value + 1) {
        maxPages = 1 + Math.floor(maxPages / 2) * 2;
        acc.pgFrom = Math.max(minProp.value, Math.min(maxProp.value - maxPages + 1, props.modelValue - Math.floor(maxPages / 2)));
        acc.pgTo = Math.min(maxProp.value, acc.pgFrom + maxPages - 1);
        if (boundaryNumbersProp.value) {
          acc.boundaryStart = true;
          acc.pgFrom++;
        }
        if (ellipsesProp.value && acc.pgFrom > minProp.value + (boundaryNumbersProp.value ? 1 : 0)) {
          acc.ellipsesStart = true;
          acc.pgFrom++;
        }
        if (boundaryNumbersProp.value) {
          acc.boundaryEnd = true;
          acc.pgTo--;
        }
        if (ellipsesProp.value && acc.pgTo < maxProp.value - (boundaryNumbersProp.value ? 1 : 0)) {
          acc.ellipsesEnd = true;
          acc.pgTo--;
        }
      }
      return acc;
    });
    function set(value) {
      model.value = value;
    }
    function setByOffset(offset) {
      model.value = model.value + offset;
    }
    const inputEvents = computed(() => {
      function updateModel() {
        model.value = newPage.value;
        newPage.value = null;
      }
      return {
        "onUpdate:modelValue": (val) => {
          newPage.value = val;
        },
        onKeyup: (e) => {
          isKeyCode(e, 13) === true && updateModel();
        },
        onBlur: updateModel
      };
    });
    function getBtn(cfg, page, active) {
      const data = {
        "aria-label": page,
        "aria-current": "false",
        ...btnProps.value,
        ...cfg
      };
      if (active === true) {
        Object.assign(data, {
          "aria-current": "true",
          ...activeBtnProps.value
        });
      }
      if (page !== void 0) {
        if (props.toFn !== void 0) {
          data.to = props.toFn(page);
        } else {
          data.onClick = () => {
            set(page);
          };
        }
      }
      return h(QBtn, data);
    }
    Object.assign(proxy, { set, setByOffset });
    return () => {
      const contentStart = [];
      const contentEnd = [];
      let contentMiddle;
      if (boundaryLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: "bls",
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[0]
          }, minProp.value)
        );
        contentEnd.unshift(
          getBtn({
            key: "ble",
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[3]
          }, maxProp.value)
        );
      }
      if (directionLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: "bdp",
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[1]
          }, props.modelValue - 1)
        );
        contentEnd.unshift(
          getBtn({
            key: "bdn",
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[2]
          }, props.modelValue + 1)
        );
      }
      if (props.input !== true) {
        contentMiddle = [];
        const { pgFrom, pgTo, marginalStyle: style } = btnConfig.value;
        if (btnConfig.value.boundaryStart === true) {
          const active = minProp.value === props.modelValue;
          contentStart.push(
            getBtn({
              key: "bns",
              style,
              disable: props.disable,
              label: minProp.value
            }, minProp.value, active)
          );
        }
        if (btnConfig.value.boundaryEnd === true) {
          const active = maxProp.value === props.modelValue;
          contentEnd.unshift(
            getBtn({
              key: "bne",
              style,
              disable: props.disable,
              label: maxProp.value
            }, maxProp.value, active)
          );
        }
        if (btnConfig.value.ellipsesStart === true) {
          contentStart.push(
            getBtn({
              key: "bes",
              style,
              disable: props.disable,
              label: "\u2026",
              ripple: false
            }, pgFrom - 1)
          );
        }
        if (btnConfig.value.ellipsesEnd === true) {
          contentEnd.unshift(
            getBtn({
              key: "bee",
              style,
              disable: props.disable,
              label: "\u2026",
              ripple: false
            }, pgTo + 1)
          );
        }
        for (let i = pgFrom; i <= pgTo; i++) {
          contentMiddle.push(
            getBtn({
              key: `bpg${i}`,
              style,
              disable: props.disable,
              label: i
            }, i, i === props.modelValue)
          );
        }
      }
      return h("div", {
        class: classes.value,
        ...attrs.value
      }, [
        h("div", {
          class: "q-pagination__content row no-wrap items-center",
          style: gutterStyle.value
        }, [
          ...contentStart,
          props.input === true ? h(QInput, {
            class: "inline",
            style: { width: `${inputPlaceholder.value.length / 1.5}em` },
            type: "number",
            dense: true,
            value: newPage.value,
            disable: props.disable,
            dark: isDark.value,
            borderless: true,
            inputClass: props.inputClass,
            inputStyle: props.inputStyle,
            placeholder: inputPlaceholder.value,
            min: minProp.value,
            max: maxProp.value,
            ...inputEvents.value
          }) : h("div", {
            class: "q-pagination__middle row justify-center"
          }, contentMiddle),
          ...contentEnd
        ])
      ]);
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "q-gutter-md"
};
const _sfc_main = {
  __name: "HomePage",
  setup(__props) {
    const store = postStore();
    const route = useRoute();
    const router = useRouter();
    const meta = computed(() => store.getMeta);
    const page = ref(+route.query.page || 1);
    onMounted(async () => {
      if (!+route.query.page) {
        setQueryPage(1);
      }
      getPosts();
    });
    watch(page, async (newPage) => {
      await setQueryPage(+newPage);
      await getPosts();
    });
    const items = computed(() => store.getPosts);
    const getPosts = async () => {
      await store.apiGetPosts(+route.query.page || 1);
    };
    const setQueryPage = async (page2) => {
      await router.push({ query: { page: page2 } });
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createBlock(QPage, { class: "flex flex-center column" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item) => {
            return openBlock(), createBlock(AppCard, {
              class: "q-ma-md",
              key: `card-${item.id}`,
              item
            }, {
              actions: withCtx(() => [
                createVNode(QSpace),
                createVNode(_component_router_link, {
                  to: `/post/${item.id}`
                }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      color: "primary",
                      label: "\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438"
                    })
                  ]),
                  _: 2
                }, 1032, ["to"])
              ]),
              _: 2
            }, 1032, ["item"]);
          }), 128)),
          meta.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
            meta.value.count ? (openBlock(), createBlock(QPagination, {
              key: 0,
              modelValue: page.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => page.value = $event),
              max: meta.value.pages,
              "direction-links": "",
              flat: "",
              color: "grey",
              "active-color": "primary"
            }, null, 8, ["modelValue", "max"])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
