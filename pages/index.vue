<template>
  <div>hello {{ useAuthStore().getUser.name }}</div>
</template>



<script setup>
import { useAuthStore } from "@/store/auth.js";
</script>