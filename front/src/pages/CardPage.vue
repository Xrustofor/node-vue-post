<template>
  <q-page class="flex flex-center">
    <app-card :item="item">
      <template #actions>
        <router-link :to="`/post/${item.id}/update`">
          <q-btn color="primary" label="Редагувати"></q-btn>
        </router-link>
        <router-link :to="`/post/${item.id}`">
          <q-btn
            color="warning"
            label="Видалити"
            @click="dialog = true"
          ></q-btn>
        </router-link>
      </template>
    </app-card>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Увага!</div>
        </q-card-section>
        <q-card-section>
          <div class="text">Ви дійснно хочете вадалити: {{ item.title }} ?</div>
        </q-card-section>
        <q-card-section class="row justify-between">
          <q-btn @click="dialog = false" label="Ні" color="primary"></q-btn>
          <q-btn
            v-close-popup
            label="Так"
            color="warning"
            @click="remove()"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { postStore } from "../stores/post.store";
import AppCard from "../components/AppCard.vue";

const store = postStore();
const route = useRoute();
const router = useRouter();
const { idCard } = route.params;
const item = computed(() => store.getProduct);
const dialog = ref(false);

onMounted(async () => {
  await store.apiGetByProducts(idCard);
});

const remove = async () => {
  const result = await store.apiDeleteByProduct(idCard);
  if (result.success) {
    router.push("/");
  }
};
</script>
