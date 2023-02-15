<template>
  <transition-group name="alert" tag="div">
    <div
      class="alert"
      v-if="alertStore.text"
      :class="alertStore.error ? 'error' : ''"
    >
      {{ alertStore.text }}
    </div>
  </transition-group>
</template>



<script setup>
import { useAlertStore } from "@/store/alert.js";

const alertStore = useAlertStore();
</script>