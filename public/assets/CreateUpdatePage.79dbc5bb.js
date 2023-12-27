import { Q as QInput } from "./QInput.761f16c6.js";
import { c as computed, k as createComponent, r as ref, w as watch, n as onBeforeUnmount, h, al as Transition, l as hSlot, aw as QSpinner, ay as useQuasar, S as openBlock, U as createBlock, V as withCtx, a1 as createBaseVNode, f as createVNode, W as QIcon, I as withDirectives, az as vShow, Y as createTextVNode, Z as toDisplayString, aq as renderSlot, aA as normalizeClass, a2 as postStore, ah as useRoute, ai as useRouter, o as onMounted, _ as createElementBlock, a3 as QBtn, F as Fragment, a4 as renderList, X as createCommentVNode, aB as withModifiers, $ as pushScopeId, a0 as popScopeId } from "./index.3eb8dcca.js";
import { c as QCard, Q as QPage, b as QCardActions, a as QCardSection } from "./QCard.c5055d40.js";
import { Q as QDialog, C as ClosePopup } from "./ClosePopup.29ff04d5.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
import "./use-dark.bba63d00.js";
import "./use-timeout.53f7577c.js";
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer = null, isDestroyed = false;
    const images = [
      ref(null),
      ref(getPlaceholderSrc())
    ];
    const position = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function getPlaceholderSrc() {
      return props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null;
    }
    function addImage(imgProps) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[position.value ^ 1].value = getPlaceholderSrc();
      } else {
        isLoading.value = true;
      }
      images[position.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (isDestroyed === true) {
        return;
      }
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (isDestroyed === true || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          loadTimer = null;
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (isDestroyed === true) {
        return;
      }
      position.value = position.value ^ 1;
      images[position.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      isLoading.value = false;
      hasError.value = true;
      images[position.value].value = null;
      images[position.value ^ 1].value = getPlaceholderSrc();
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position.value === index) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      {
        addImage(getCurrentSrc());
      }
      onBeforeUnmount(() => {
        isDestroyed = true;
        if (loadTimer !== null) {
          clearTimeout(loadTimer);
          loadTimer = null;
        }
      });
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
var FilePreview_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = ["for"];
const _hoisted_2$1 = { class: "top" };
const _hoisted_3$1 = { class: "text" };
const _hoisted_4$1 = ["id", "name"];
const _sfc_main$1 = {
  __name: "FilePreview",
  props: ["modelValue", "items", "error", "size"],
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const {
      items,
      modelValue,
      error,
      size = 300
    } = __props;
    const emit = __emit;
    const $q = useQuasar();
    const image = computed(
      {
        get() {
          return modelValue;
        },
        set(value) {
          emit("update:modelValue", value);
        }
      },
      { dep: true }
    );
    const handleFileUpload = (note, id) => {
      const file = note.target.files[0];
      console.dir(note.target.value);
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          var _a;
          if (file.size > size * 1024) {
            const count = Math.round(file.size / 1024);
            setNotify(
              `${count} \u043A\u0431. \u0420\u043E\u0437\u043C\u0456\u0440 \u0444\u0430\u0439\u043B\u0443 \u0431\u0456\u043B\u044C\u0448\u0438\u0439 \u0437\u0430 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0438\u0439 (${size} \u043A\u0431) \u0434\u043B\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F.`
            );
            return;
          }
          image.value.url = reader.result;
          image.value.size = file.size || 0;
          image.value.file = file;
          const filename = (_a = image.value) == null ? void 0 : _a.filename;
          if (filename) {
            image.value.filename = `${image.value.id}changed-${filename}`;
          }
        }.bind(this),
        false
      );
      if (file) {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          reader.readAsDataURL(file);
        }
      }
    };
    const setNotify = (message = "", type = "warning") => {
      $q.notify({
        position: "top-right",
        color: type,
        message
      });
    };
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createBlock(QCard, {
        class: normalizeClass(["component", __props.error && !!!((_a = image.value) == null ? void 0 : _a.url) ? "error" : ""])
      }, {
        default: withCtx(() => {
          var _a2, _b, _c;
          return [
            createBaseVNode("label", {
              for: `file-${image.value.id}`,
              class: "chous"
            }, [
              createVNode(QIcon, {
                name: "cloud_download",
                class: "upload_icon"
              }),
              withDirectives(createVNode(QImg, {
                class: "image",
                position: "100% 20%",
                src: (_a2 = image.value) == null ? void 0 : _a2.url
              }, null, 8, ["src"]), [
                [vShow, !!((_b = image.value) == null ? void 0 : _b.url)]
              ]),
              createBaseVNode("div", _hoisted_2$1, [
                createBaseVNode("span", _hoisted_3$1, [
                  createTextVNode("\u0420\u043E\u0437\u043C\u0456\u0440 "),
                  createBaseVNode("strong", null, toDisplayString(Math.floor((((_c = image.value) == null ? void 0 : _c.size) || 0) / 1024)) + " kb", 1)
                ]),
                renderSlot(_ctx.$slots, "action", {}, void 0, true)
              ])
            ], 8, _hoisted_1$1),
            createBaseVNode("input", {
              onChange: _cache[0] || (_cache[0] = ($event) => handleFileUpload($event, image.value.id)),
              type: "file",
              class: "input",
              id: `file-${image.value.id}`,
              name: `file-${image.value.id}`,
              multiple: "multiple"
            }, null, 40, _hoisted_4$1)
          ];
        }),
        _: 3
      }, 8, ["class"]);
    };
  }
};
var AppFilePreview = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-582f60a7"]]);
var CreateUpdatePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-c9da4532"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "text-h5 text-center q-pb-lg" };
const _hoisted_2 = ["onSubmit", "onReset"];
const _hoisted_3 = { class: "row justify-between" };
const _hoisted_4 = { class: "add_button_wrap" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "\u0423\u0432\u0430\u0433\u0430!", -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text" }, "\u0412\u0438 \u0434\u0456\u0439\u0441\u043D\u043D\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0430\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F ?", -1));
const _sfc_main = {
  __name: "CreateUpdatePage",
  setup(__props) {
    const $q = useQuasar();
    const store = postStore();
    const route = useRoute();
    const router = useRouter();
    const dialog = ref(false);
    const imageRemoveId = ref(null);
    const imagesKey = ref(new Date().getTime());
    const title = ref("Title");
    const titleRef = ref(null);
    const description = ref(
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt sit, veniam, recusandae deserunt reprehenderit laudantium repudiandae, mollitia a deleniti ullam commodi molestiae! Labore, rem tempora! Culpa accusantium nemo nobis dolore!"
    );
    const descriptionRef = ref(null);
    const price = ref(100);
    const priceRef = ref(null);
    const images = ref(setImages([]));
    const { idCard } = route.params;
    const id = ref(idCard || null);
    onMounted(async () => {
      if (!idCard)
        return;
      const item = await store.apiGetByProducts(idCard);
      if (!item)
        return;
      title.value = item.title;
      description.value = item.description;
      price.value = item.price;
      images.value = setImages(item.images);
    });
    const imageRemove = () => {
      const id2 = imageRemoveId.value;
      if (id2) {
        images.value = setImages(images.value.filter((img) => img.id !== id2));
        store.setImageRemove(id2);
      }
    };
    const titleRules = [
      (val) => val && val.length >= 3 || "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043D\u0435 \u043F\u043E\u0432\u0438\u043D\u043D\u0435\u043D \u043C\u0430\u0442\u0438 \u043C\u0435\u043D\u0448\u0435 \u0442\u0440\u0435\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432."
    ];
    const priceRules = [(val) => val && val != 0 || "\u0426\u0456\u043D\u0430 \u043D\u0435 \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043D\u0443\u043B\u044C\u0432\u043E\u044E."];
    const descriptionRules = [
      (val) => val && val.length >= 3 || "\u041E\u043F\u0438\u0441 \u043D\u0435 \u043F\u043E\u0432\u0438\u043D\u043D\u0435\u043D \u043C\u0430\u0442\u0438 \u043C\u0435\u043D\u0448\u0435 \u0442\u0440\u0435\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432."
    ];
    const onSubmit = async () => {
      var _a;
      titleRef.value.validate();
      descriptionRef.value.validate();
      priceRef.value.validate();
      if (!images.value.length) {
        setNotify("\u0412\u0438 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 \u0436\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F");
        return;
      }
      if (images.value.isEmpty()) {
        images.value.validate();
        imagesKey.value = new Date().getTime();
        setNotify("\u041D\u0435 \u0437\u0430\u043F\u043E\u0432\u043D\u0435\u043D\u0435 \u043F\u043E\u043B\u0435 \u0456\u0437 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F\u043C");
        return;
      }
      if (titleRef.value.hasError || descriptionRef.value.hasError || priceRef.value.hasError || ((_a = images.value) == null ? void 0 : _a.isEmpty())) {
        setNotify("\u0412\u0438 \u043D\u0435 \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u043B\u0438 \u043E\u044C\u043E\u0432\u044F\u0437\u043A\u043E\u0432\u0456 \u043F\u043E\u043B\u044F.");
      } else {
        const data = {
          title: title.value,
          price: price.value,
          description: description.value,
          images: images.value
        };
        send(data);
      }
      async function send(data) {
        let result = null;
        if (id.value) {
          result = await store.apiUpdateByProduct(data, id.value);
          router.push("/");
        } else {
          result = await store.apiCreateProduct(data);
          if (result.success) {
            setNotify("\u0412\u0438 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442.", "info");
            onReset();
          }
        }
      }
    };
    function onReset() {
      var _a;
      title.value = null;
      description.value = null;
      price.value = null;
      titleRef.value.resetValidation();
      descriptionRef.value.resetValidation();
      priceRef.value.resetValidation();
      images.value = setImages(((_a = store.getProduct) == null ? void 0 : _a.images) || []);
      imagesKey.value = new Date().getTime();
      store.resetImageRemove();
    }
    const addImage = () => {
      if (!images.value.isEmpty() || images.value.length === 0) {
        images.value.unshift({ id: new Date().getTime() });
      } else {
        images.value.validate();
        imagesKey.value = new Date().getTime();
        setNotify("\u041D\u0435 \u0437\u0430\u043F\u043E\u0432\u043D\u0435\u043D\u0435 \u043F\u043E\u043B\u0435 \u0456\u0437 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F\u043C");
      }
    };
    const setNotify = (message = "", type = "warning") => {
      $q.notify({
        position: "top-right",
        color: type,
        message
      });
    };
    function setImages(images2) {
      const items = JSON.parse(JSON.stringify(images2));
      items.isEmpty = () => !!items.find((item) => !!!item.url);
      items.validate = () => {
        items.forEach((_, idx) => {
          delete items[idx].error;
          if (!!!items[idx].url) {
            items[idx].error = !!!items[idx].url;
          }
        });
      };
      return items;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { class: "flex items-center" }, {
        default: withCtx(() => [
          createVNode(QCard, { class: "q-pa-md page" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, toDisplayString(id.value ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0442\u043E\u0432\u0430\u0440\u0443" : "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0442\u043E\u0432\u0430\u0440\u0443"), 1),
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
                    label: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0442\u043E\u0432\u0430\u0440\u0443 *",
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
                Array.isArray(images.value) ? (openBlock(), createElementBlock("div", {
                  class: "row images_block",
                  key: imagesKey.value
                }, [
                  createBaseVNode("div", _hoisted_4, [
                    createVNode(QBtn, {
                      class: "add_button",
                      onClick: _cache[3] || (_cache[3] = ($event) => addImage())
                    }, {
                      default: withCtx(() => [
                        createVNode(QIcon, {
                          class: "icon",
                          name: "add_box"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image, idx) => {
                    return openBlock(), createBlock(AppFilePreview, {
                      class: "image_component",
                      key: `image-${image.id}`,
                      error: image == null ? void 0 : image.error,
                      size: 350,
                      modelValue: images.value[idx],
                      "onUpdate:modelValue": ($event) => images.value[idx] = $event
                    }, {
                      action: withCtx(() => [
                        createVNode(QBtn, {
                          flat: "",
                          round: "",
                          color: "silver",
                          onClick: ($event) => {
                            imageRemoveId.value = image.id;
                            dialog.value = true;
                          },
                          size: "sm",
                          icon: "delete"
                        }, null, 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1032, ["error", "modelValue", "onUpdate:modelValue"]);
                  }), 128))
                ])) : createCommentVNode("", true),
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
          }),
          createVNode(QDialog, {
            modelValue: dialog.value,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => dialog.value = $event)
          }, {
            default: withCtx(() => [
              createVNode(QCard, null, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      _hoisted_5
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      _hoisted_6
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, { class: "row justify-between" }, {
                    default: withCtx(() => [
                      createVNode(QBtn, {
                        onClick: _cache[4] || (_cache[4] = ($event) => dialog.value = false),
                        label: "\u041D\u0456",
                        color: "primary"
                      }),
                      withDirectives(createVNode(QBtn, {
                        label: "\u0422\u0430\u043A",
                        color: "warning",
                        onClick: _cache[5] || (_cache[5] = ($event) => imageRemove())
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
var CreateUpdatePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c9da4532"]]);
export { CreateUpdatePage as default };
