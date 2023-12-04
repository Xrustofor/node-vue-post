<template>
  <router-view />
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed, watch } from "vue";
import { postStore } from "./stores/post.store";

const store = postStore();
const $q = useQuasar();
const errors = computed(() => store.getErrors);
const message = computed(() => store.getMessage);
watch(errors, (newErrors) => {
  if (Array.isArray(newErrors)) {
    newErrors.forEach((error) => {
      $q.notify({
        position: "top-right",
        color: "negative",
        message: error.message,
      });
    });
  }
});
watch(message, (newMessage) => {
  if (newMessage) {
    $q.notify({
      position: "top-right",
      color: "primary",
      message: newMessage,
    });
  }
});
</script>
