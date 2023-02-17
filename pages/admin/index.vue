<template>
  <div class="admin__wrapper">
    <AdminTop />
    <AdminFilters />
    <AdminTable />
    <AdminModals
      v-if="useTableStore().getModal.active"
      :user="useTableStore().getModal.user"
      :type="useTableStore().getModal.type"
      :success="useTableStore().getModal.success"
    />
  </div>
</template>



<script setup>
definePageMeta({
  layout: "admin",
});
import { useTableStore } from "@/store/table.js";
</script>