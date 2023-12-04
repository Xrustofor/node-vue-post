<template>
  <q-page class="flex flex-center column">
    <app-card
      class="q-ma-md"
      v-for="item of items"
      :key="`card-${item.id}`"
      :item="item"
    >
      <template #actions>
        <q-space />
        <router-link :to="`/post/${item.id}`">
          <q-btn color="primary" label="Переглянути"></q-btn>
        </router-link>
      </template>
    </app-card>
    <div class="q-gutter-md" v-if="meta">
      <q-pagination
        v-if="meta.pages"
        v-model="page"
        :max="meta.pages"
        direction-links
        flat
        color="grey"
        active-color="primary"
      ></q-pagination>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { postStore } from "../stores/post.store";
import AppCard from "../components/AppCard.vue";

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

const setQueryPage = async (page) => {
  await router.push({ query: { page } });
};
</script>
