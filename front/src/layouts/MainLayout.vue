<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Введеня товарів </q-toolbar-title>

        <div>Promo v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Навігація </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="page_layout">
        <router-view />
        <AppLoading :show="loading" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { postStore } from "../stores/post.store";
import EssentialLink from "components/EssentialLink.vue";
import AppLoading from "components/AppLoading.vue";

const store = postStore();
const loading = computed(() => store.getLoading);

const essentialLinks = [
  {
    title: "Список кврток",
    caption: "Показати картки",
    icon: "home",
    link: "/",
  },
  {
    title: "Створити",
    caption: "Створити картку",
    icon: "add",
    link: "/post/create",
  },
];

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
<style lang="scss" scoped>
.page_layout {
  position: relative;
}
</style>
