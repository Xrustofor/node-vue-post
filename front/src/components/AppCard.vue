<template>
  <q-card class="component" v-if="item">
    <q-carousel v-model="slide" animated thumbnails>
      <q-carousel-slide
        position="bottom"
        v-for="(img, index) of item.images"
        :key="`img-${img.name}`"
        :name="index + 1"
        :img-src="img.url"
      ></q-carousel-slide>
    </q-carousel>
    <q-card-section>
      <div class="title_price row justify-between">
        <div class="text-h6 title">{{ item.title }}</div>
        <div class="text-subtitle2">{{ `Ціна: ${item.price} грн.` }}</div>
      </div>
    </q-card-section>

    <q-card-section>
      {{ item.description }}
    </q-card-section>
    <q-card-actions class="row justify-between q-mb-sm">
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
const { item } = defineProps(["item"]);

const slide = ref(1);
</script>

<style lang="scss" scoped>
.component {
  max-width: 700px;
  width: 100%;
}
.title_price {
  flex-wrap: wrap;
  align-items: center;
  div {
    display: flex;
    margin: 10px 0;
  }
  .title {
    min-width: 200px;
    padding-right: 15px;
    flex: 1;
  }
}
</style>
