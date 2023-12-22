import { a2 as postStore, ah as useRoute, ai as useRouter, c as computed, r as ref, o as onMounted, R as resolveComponent, S as openBlock, U as createBlock, V as withCtx, f as createVNode, a3 as QBtn, a1 as createBaseVNode, Z as toDisplayString, I as withDirectives } from "./index.5639b01a.js";
import { Q as QPage, c as QCard, a as QCardSection } from "./QCard.ca72fca8.js";
import { Q as QDialog, C as ClosePopup } from "./ClosePopup.e6b28bf3.js";
import { A as AppCard } from "./AppCard.66648c2b.js";
import "./use-dark.1ba393d1.js";
import "./use-timeout.1cdabcc9.js";
import "./selection.209d231d.js";
import "./plugin-vue_export-helper.21dcd24c.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "\u0423\u0432\u0430\u0433\u0430!", -1);
const _hoisted_2 = { class: "text" };
const _sfc_main = {
  __name: "CardPage",
  setup(__props) {
    const store = postStore();
    const route = useRoute();
    const router = useRouter();
    const { idCard } = route.params;
    const item = computed(() => store.getProduct);
    const dialog = ref(false);
    onMounted(async () => {
      await store.apiGetByProducts(idCard);
    });
    const remove = async () => {
      const result = await store.apiDeleteByProduct(idCard);
      if (result.success) {
        router.push("/");
      }
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
        default: withCtx(() => [
          createVNode(AppCard, { item: item.value }, {
            actions: withCtx(() => [
              createVNode(_component_router_link, {
                to: `/post/${item.value.id}/update`
              }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    color: "primary",
                    label: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
                  })
                ]),
                _: 1
              }, 8, ["to"]),
              createVNode(_component_router_link, {
                to: `/post/${item.value.id}`
              }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    color: "warning",
                    label: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
                    onClick: _cache[0] || (_cache[0] = ($event) => dialog.value = true)
                  })
                ]),
                _: 1
              }, 8, ["to"])
            ]),
            _: 1
          }, 8, ["item"]),
          createVNode(QDialog, {
            modelValue: dialog.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dialog.value = $event)
          }, {
            default: withCtx(() => [
              createVNode(QCard, null, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      _hoisted_1
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_2, "\u0412\u0438 \u0434\u0456\u0439\u0441\u043D\u043D\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0430\u0434\u0430\u043B\u0438\u0442\u0438: " + toDisplayString(item.value.title) + " ?", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, { class: "row justify-between" }, {
                    default: withCtx(() => [
                      createVNode(QBtn, {
                        onClick: _cache[1] || (_cache[1] = ($event) => dialog.value = false),
                        label: "\u041D\u0456",
                        color: "primary"
                      }),
                      withDirectives(createVNode(QBtn, {
                        label: "\u0422\u0430\u043A",
                        color: "warning",
                        onClick: _cache[2] || (_cache[2] = ($event) => remove())
                      }, null, 512), [
                        [ClosePopup]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
