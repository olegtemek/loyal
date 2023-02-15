<template>
  <div class="admin__wrapper">
    <AdminTop />
    <AdminFilters />
    <AdminTable />
  </div>
</template>



<script setup>
definePageMeta({
  layout: "admin",
});
</script>