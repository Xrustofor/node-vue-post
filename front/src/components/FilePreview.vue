<template>
  <q-card class="component" :class="error && !!!image?.url ? 'error' : ''">
    <label :for="`file-${image.id}`" class="chous">
      <q-icon name="cloud_download" class="upload_icon"></q-icon>
      <q-img
        class="image"
        position="100% 20%"
        v-bind:src="image?.url"
        v-show="!!image?.url"
      ></q-img>
      <div class="top">
        <span class="text"
          >Розмір
          <strong>{{ Math.floor((image?.size || 0) / 1024) }} kb</strong></span
        >
        <slot name="action"></slot>
      </div>
    </label>
    <input
      @change="handleFileUpload($event, image.id)"
      type="file"
      class="input"
      :id="`file-${image.id}`"
      :name="`file-${image.id}`"
      multiple="multiple"
    />
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
const {
  items,
  modelValue,
  error,
  size = 300,
} = defineProps(["modelValue", "items", "error", "size"]);
const emit = defineEmits(["update:modelValue", "change"]);
const $q = useQuasar();

const image = computed(
  {
    get() {
      return modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  },
  { dep: true }
);
const handleFileUpload = (note, id) => {
  const file = note.target.files[0];
  let reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      if (file.size > size * 1024) {
        const count = Math.round(file.size / 1024);
        setNotify(
          `${count} кб. Розмір файлу більший за допустимий (${size} кб) для завантаження.`
        );
        return;
      }
      image.value.url = reader.result;
      image.value.size = file.size || 0;
      image.value.file = file;
      const filename = image.value?.filename;
      if (filename) {
        image.value.filename = `${image.value.id}changed-${filename}`;
      }
    }.bind(this),
    false
  );

  if (file) {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      reader.readAsDataURL(file);
    }
  }
};

const setNotify = (message = "", type = "warning") => {
  $q.notify({
    position: "top-right",
    color: type,
    message,
  });
};
</script>

<style lang="scss" scoped>
.component {
  display: flex;
  flex: 1;
}
.chous {
  flex: 1;
  border-radius: 4px;
  text-align: center;
  position: relative;
  height: 250px;
  min-width: 200px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 14px/50px Tahoma;
  font-size: 34px;
  transition: all 0.18s ease-in-out;
  background: linear-gradient(
      to top right,
      #1976d2,
      #8dbbe8 20%,
      rgba(25, 118, 210, 0) 80%,
      rgba(141, 187, 232, 0)
    )
    top right/500% 500%;
  color: #1976d2;
}

.image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 25%,
    rgba(0, 0, 0, 1) 100%
  );
}

.chous:hover {
  color: white;
  background-position: bottom left;
}

.input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
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
