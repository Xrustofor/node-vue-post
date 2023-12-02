<template>
  <q-page class="flex flex-center column">
    <app-card
      class="q-ma-md"
      v-for="item of items"
      :key="`card-${item.id}`"
      :item="item"
    ></app-card>
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { postStore } from "../stores/post.store";
import AppCard from "../components/AppCard.vue";

const store = postStore();
store.apiGetPosts();

const items = computed(() => store.getPosts);
</script>
