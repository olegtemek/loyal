<template>
  <div>
    <input type="text" placeholder="code" v-model="code" />
    <button @click="check">send</button>

    <button @click="retry">retry</button>
  </div>
</template>



<script setup>
import { useAuthStore } from "@/store/auth.js";
const code = ref(null);

const check = () => {
  useAuthStore().confirmCode(code.value);
};

const retry = () => {
  useAuthStore().sendCode();
};
</script>