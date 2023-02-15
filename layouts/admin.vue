<template>
  <div class="admin">
    <div class="container">
      <NuxtPage />
    </div>
  </div>
</template>



<script setup>
const { getInfoUser } = useUser();
onMounted(() => {
  if (getInfoUser().role == 0) {
    return navigateTo("/");
  }
});
</script>