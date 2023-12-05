<template>
  <q-item>
    <router-link
      exact-active-class="active"
      teg="div"
      :to="link"
      class="link"
      exect
    >
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </router-link>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
<style lang="scss" scoped>
.link {
  color: #394551;
  display: flex;
  flex: 1;
  opacity: 1;
  transition: color 0.3s;
  font-size: 16px;
  font-weight: 600;
  align-content: center;
  padding: 10px;
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    background: #dceaf8;
  }
  &.active {
    background: #a6caee;
  }
}
</style>
