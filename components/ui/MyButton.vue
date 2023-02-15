<template>
  <button
    :disabled="timer != null"
    class="btn"
    v-if="props.isMain"
    @click="click"
  >
    {{ props.title }}
  </button>
  <button :disabled="timer != null" v-else @click="click">
    {{ props.title }}
  </button>
</template>



<script setup>
const props = defineProps({
  isMain: {
    type: Boolean,
    default: true,
  },
  title: String,
});
const emit = defineEmits(["onClick"]);
const timer = ref(null);
const click = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      timer.value = null;
    }, 2000);
  } else {
    timer.value = setTimeout(() => {
      timer.value = null;
    }, 2000);
    emit("onClick");
  }
};
</script>