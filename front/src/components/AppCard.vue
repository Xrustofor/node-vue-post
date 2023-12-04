<template>
  <q-card class="component" v-if="item">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
      <div class="absolute-bottom">
        <div class="text-h6">{{ item.title }}</div>
        <div class="text-subtitle2">{{ `Ціна: ${item.price} грн.` }}</div>
      </div>
    </q-img>
    <q-card-section>
      {{ item.description }}
    </q-card-section>
    <q-card-actions class="row justify-between q-mb-sm">
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";
const { item } = defineProps(["item"]);
</script>

<style lang="scss" scoped>
.component {
  max-width: 700px;
  width: 100%;
}
</style>
