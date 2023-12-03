<template>
  <q-page class="flex items-center q-mt-lg column">
    <q-card class="component q-pa-md">
      <div class="text-h5 text-center q-pb-lg">Створення посту</div>
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
            label="Введіть заголовок посту *"
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
          label="Опис посту *"
          hint="Поле не має бути пустим."
          lazy-rules
          :rules="descriptionRules"
        ></q-input>

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
      <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">

    </q-img>
    <q-card-section>
      {{ item.description }}
    </q-card-section>
    -->
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { postStore } from "../stores/post.store";
const $q = useQuasar();
const store = postStore();
const title = ref(null);
const titleRef = ref(null);
const description = ref(null);
const descriptionRef = ref(null);
const price = ref(null);
const priceRef = ref(null);

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

  if (
    titleRef.value.hasError ||
    descriptionRef.value.hasError ||
    priceRef.value.hasError
  ) {
    $q.notify({
      position: "top-right",
      color: "warning",
      message: "Ви не заповнили оьовязкові поля.",
    });
  } else {
    const data = {
      title: title.value,
      price: price.value,
      description: description.value,
    };
    const result = await store.apiCreatePost(data);
    if (result) {
      title.value = null;
      description.value = null;
      price.value = null;
    }
  }
};

const onReset = () => {
  title.value = null;
  description.value = null;
  price.value = null;
  titleRef.value.resetValidation();
  descriptionRef.value.resetValidation();
  priceRef.value.resetValidation();
};
</script>

<style lang="scss" scoped>
.component {
  max-width: 700px;
  width: 100%;
}
</style>