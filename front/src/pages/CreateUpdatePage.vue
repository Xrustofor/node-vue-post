<template>
  <q-page class="flex items-center">
    <q-card class="q-pa-md page">
      <div class="text-h5 text-center q-pb-lg">
        {{ id ? "Редагування товару" : "Створення товару" }}
      </div>
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class="q-gutter-md"
      >
        <div class="row justify-between">
          <q-input
            class="col-sm-8 col-12 q-mb-sm"
            ref="titleRef"
            filled
            clearable
            v-model="title"
            label="Введіть заголовок товару *"
            hint="Поле не має бути пустим."
            lazy-rules
            :rules="titleRules"
          ></q-input>
          <q-input
            class="col-sm-3 col-12 q-mb-sm"
            ref="priceRef"
            filled
            clearable
            v-model="price"
            label="Введіть ціну *"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            lazy-rules
            hint="Mask: #.##"
            input-class="text-right"
            :rules="priceRules"
          ></q-input>
        </div>

        <q-input
          ref="descriptionRef"
          filled
          clearable
          autogrow
          type="textarea"
          v-model="description"
          label="Опис картки *"
          hint="Поле не має бути пустим."
          lazy-rules
          :rules="descriptionRules"
        ></q-input>

        <div
          class="row images_block"
          :key="imagesKey"
          v-if="Array.isArray(images)"
        >
          <div class="add_button_wrap">
            <q-btn class="add_button" @click="addImage()">
              <q-icon class="icon" name="add_box"></q-icon>
            </q-btn>
          </div>
          <AppFilePreview
            class="image_component"
            v-for="(image, idx) in images"
            :key="`image-${image.id}`"
            :error="image?.error"
            :size="350"
            v-model="images[idx]"
          >
            <template #action>
              <q-btn
                flat
                round
                color="silver"
                @click="
                  imageRemoveId = image.id;
                  dialog = true;
                "
                size="sm"
                icon="delete"
              ></q-btn>
            </template>
          </AppFilePreview>
        </div>
        <div>
          <q-card-actions class="row justify-between">
            <q-btn label="Submit" type="submit" color="primary"></q-btn>
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            ></q-btn>
          </q-card-actions>
        </div>
      </form>
    </q-card>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Увага!</div>
        </q-card-section>
        <q-card-section>
          <div class="text">Ви дійснно хочете вадалити зображення ?</div>
        </q-card-section>
        <q-card-section class="row justify-between">
          <q-btn @click="dialog = false" label="Ні" color="primary"></q-btn>
          <q-btn
            v-close-popup
            label="Так"
            color="warning"
            @click="imageRemove()"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed, onMounted } from "vue";
import { postStore } from "../stores/post.store";
import { useRoute, useRouter } from "vue-router";
import AppFilePreview from "src/components/FilePreview.vue";

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
  if (!idCard) return;
  const item = await store.apiGetByProducts(idCard);
  if (!item) return;
  title.value = item.title;
  description.value = item.description;
  price.value = item.price;
  images.value = setImages(item.images);
});

const imageRemove = () => {
  const id = imageRemoveId.value;
  if (id) {
    images.value = setImages(images.value.filter((img) => img.id !== id));
    store.setImageRemove(id);
  }
};

const titleRules = [
  (val) =>
    (val && val.length >= 3) ||
    "Заголовок не повиннен мати менше трех символів.",
];
const priceRules = [(val) => (val && val != 0) || "Ціна не має бути нульвою."];
const descriptionRules = [
  (val) =>
    (val && val.length >= 3) || "Опис не повиннен мати менше трех символів.",
];

const onSubmit = async () => {
  titleRef.value.validate();
  descriptionRef.value.validate();
  priceRef.value.validate();

  if (!images.value.length) {
    setNotify("Ви не добавили жодного зображення");
    return;
  }
  if (images.value.isEmpty()) {
    images.value.validate();
    imagesKey.value = new Date().getTime();
    setNotify("Не заповнене поле із зображенням");
    return;
  }

  if (
    titleRef.value.hasError ||
    descriptionRef.value.hasError ||
    priceRef.value.hasError ||
    images.value?.isEmpty()
  ) {
    setNotify("Ви не заповнили оьовязкові поля.");
  } else {
    const data = {
      title: title.value,
      price: price.value,
      description: description.value,
      images: images.value,
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
        setNotify("Ви успішно створили продукт.", "info");
        onReset();
      }
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
  images.value = setImages(store.getProduct?.images || []);
  imagesKey.value = new Date().getTime();
  store.resetImageRemove();
}

const addImage = () => {
  if (!images.value.isEmpty() || images.value.length === 0) {
    images.value.unshift({ id: new Date().getTime() });
  } else {
    images.value.validate();
    imagesKey.value = new Date().getTime();
    setNotify("Не заповнене поле із зображенням");
  }
};

const setNotify = (message = "", type = "warning") => {
  $q.notify({
    position: "top-right",
    color: type,
    message,
  });
};

function setImages(images) {
  const items = JSON.parse(JSON.stringify(images));
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
</script>

<style lang="scss" scoped>
.page {
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
}

.images_block {
  .image_component {
    margin: 8px;
  }
}
.add_button_wrap {
  min-height: 215px;
  padding: 7px;
  display: flex;
  flex: 1;
  .add_button {
    display: flex;
    flex: 1;
    border: 1px dashed #ccc;
    .icon {
      display: flex;
      flex: 1;
      color: #ccc;
      height: 100%;
      font-size: 40px;
    }
  }
}

.error {
  box-shadow: 0px 0px 10px red;
  animation: blink 1.3s infinite;
}

@keyframes blink {
  0% {
    box-shadow: none;
  }
  30% {
    box-shadow: 0px 0px 10px red;
  }
  70% {
    box-shadow: 0px 0px 10px red;
  }
  100% {
    box-shadow: none;
  }
}
</style>
