<template>
  <div class="admin__wrapper">
    <AdminTop />
    <AdminFilters />
    <AdminTable />
    <AdminModals
      v-if="
        useTableStore().getModal.active && useTableStore().getModal.type < 4
      "
      :user="useTableStore().getModal.user"
      :type="useTableStore().getModal.type"
      :success="useTableStore().getModal.success"
    />
    <AdminModalEdit
      v-if="
        useTableStore().getModal.active && useTableStore().getModal.type == 4
      "
      :user="useTableStore().getModal.user"
    />
    <AdminModalView
      v-if="
        useTableStore().getModal.active && useTableStore().getModal.type == 5
      "
      :user="useTableStore().getModal.user"
    />
    <AdminModalUser
      v-if="
        useTableStore().getModal.active && useTableStore().getModal.type == 6
      "
    />
    <AdminModalCash
      v-if="
        useTableStore().getModal.active && useTableStore().getModal.type == 8
      "
      :cashback="useCashbackStore().getCashback"
    />
    <AdminModalSender
      v-if="
        useTableStore().getModal.active && useTableStore().getModal.type == 9
      "
    />
  </div>
</template>



<script setup>
definePageMeta({
  layout: "admin",
});
import { useTableStore } from "@/store/table.js";

import { useCashbackStore } from "@/store/cashback.js";

await useCashbackStore().fetchCashback();
</script>