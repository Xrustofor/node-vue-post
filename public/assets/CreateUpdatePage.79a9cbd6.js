import { Q as QInput } from "./QInput.32c0f6a5.js";
import { as as useQuasar, ae as postStore, af as useRoute, r as ref, o as onMounted, S as openBlock, U as createBlock, V as withCtx, f as createVNode, a0 as createBaseVNode, Z as toDisplayString, $ as QBtn, at as withModifiers } from "./index.51795816.js";
import { Q as QPage, a as QCardActions, b as QCard } from "./QCard.ab0a852d.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
import "./use-dark.fc61f357.js";
var CreateUpdatePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h5 text-center q-pb-lg" };
const _hoisted_2 = ["onSubmit", "onReset"];
const _hoisted_3 = { class: "row justify-between" };
const _sfc_main = {
  __name: "CreateUpdatePage",
  setup(__props) {
    const $q = useQuasar();
    const store = postStore();
    const route = useRoute();
    const title = ref(null);
    const titleRef = ref(null);
    const description = ref(null);
    const descriptionRef = ref(null);
    const price = ref(null);
    const priceRef = ref(null);
    const { idCard } = route.params;
    const id = ref(idCard || null);
    onMounted(async () => {
      if (!idCard)
        return;
      const item = await store.apiGetByPost(idCard);
      if (!item)
        return;
      title.value = item.title;
      description.value = item.description;
      price.value = item.price;
    });
    const titleRules = [
      (val) => val && val.length >= 3 || "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043D\u0435 \u043F\u043E\u0432\u0438\u043D\u043D\u0435\u043D \u043C\u0430\u0442\u0438 \u043C\u0435\u043D\u0448\u0435 \u0442\u0440\u0435\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432."
    ];
    const priceRules = [(val) => val && val != 0 || "\u0426\u0456\u043D\u0430 \u043D\u0435 \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043D\u0443\u043B\u044C\u0432\u043E\u044E."];
    const descriptionRules = [
      (val) => val && val.length >= 3 || "\u041E\u043F\u0438\u0441 \u043D\u0435 \u043F\u043E\u0432\u0438\u043D\u043D\u0435\u043D \u043C\u0430\u0442\u0438 \u043C\u0435\u043D\u0448\u0435 \u0442\u0440\u0435\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432."
    ];
    const onSubmit = async () => {
      titleRef.value.validate();
      descriptionRef.value.validate();
      priceRef.value.validate();
      if (titleRef.value.hasError || descriptionRef.value.hasError || priceRef.value.hasError) {
        $q.notify({
          position: "top-right",
          color: "warning",
          message: "\u0412\u0438 \u043D\u0435 \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u043B\u0438 \u043E\u044C\u043E\u0432\u044F\u0437\u043A\u043E\u0432\u0456 \u043F\u043E\u043B\u044F."
        });
      } else {
        const data = {
          title: title.value,
          price: price.value,
          description: description.value
        };
        send(data);
      }
      async function send(data) {
        let result = null;
        if (id.value) {
          result = await store.apiUpdateByPost(data, id.value);
        } else {
          result = await store.apiCreatePost(data);
          if (result)
            onReset();
        }
      }
    };
    function onReset() {
      title.value = null;
      description.value = null;
      price.value = null;
      titleRef.value.resetValidation();
      descriptionRef.value.resetValidation();
      priceRef.value.resetValidation();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "flex items-center q-mt-lg column" }, {
        default: withCtx(() => [
          createVNode(QCard, { class: "component q-pa-md" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, toDisplayString(id.value ? "\u0420\u0435\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u0430\u0440\u0442\u043A\u0438" : "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043A\u0430\u0440\u0442\u043A\u0438"), 1),
              createBaseVNode("form", {
                onSubmit: withModifiers(onSubmit, ["prevent", "stop"]),
                onReset: withModifiers(onReset, ["prevent", "stop"]),
                class: "q-gutter-md"
              }, [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(QInput, {
                    class: "col-sm-8 col-12 q-mb-sm",
                    ref_key: "titleRef",
                    ref: titleRef,
                    filled: "",
                    clearable: "",
                    modelValue: title.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => title.value = $event),
                    label: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043A\u0430\u0440\u0442\u043A\u0438 *",
                    hint: "\u041F\u043E\u043B\u0435 \u043D\u0435 \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043F\u0443\u0441\u0442\u0438\u043C.",
                    "lazy-rules": "",
                    rules: titleRules
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    class: "col-sm-3 col-12 q-mb-sm",
                    ref_key: "priceRef",
                    ref: priceRef,
                    filled: "",
                    clearable: "",
                    modelValue: price.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => price.value = $event),
                    label: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0446\u0456\u043D\u0443 *",
                    mask: "#.##",
                    "fill-mask": "0",
                    "reverse-fill-mask": "",
                    "lazy-rules": "",
                    hint: "Mask: #.##",
                    "input-class": "text-right",
                    rules: priceRules
                  }, null, 8, ["modelValue"])
                ]),
                createVNode(QInput, {
                  ref_key: "descriptionRef",
                  ref: descriptionRef,
                  filled: "",
                  clearable: "",
                  autogrow: "",
                  type: "textarea",
                  modelValue: description.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => description.value = $event),
                  label: "\u041E\u043F\u0438\u0441 \u043A\u0430\u0440\u0442\u043A\u0438 *",
                  hint: "\u041F\u043E\u043B\u0435 \u043D\u0435 \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043F\u0443\u0441\u0442\u0438\u043C.",
                  "lazy-rules": "",
                  rules: descriptionRules
                }, null, 8, ["modelValue"]),
                createBaseVNode("div", null, [
                  createVNode(QCardActions, { class: "row justify-between" }, {
                    default: withCtx(() => [
                      createVNode(QBtn, {
                        label: "Submit",
                        type: "submit",
                        color: "primary"
                      }),
                      createVNode(QBtn, {
                        label: "Reset",
                        type: "reset",
                        color: "primary",
                        flat: "",
                        class: "q-ml-sm"
                      })
                    ]),
                    _: 1
                  })
                ])
              ], 40, _hoisted_2)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var CreateUpdatePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb68f6d0"]]);
export { CreateUpdatePage as default };
