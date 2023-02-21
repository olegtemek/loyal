<template>
  <div class="admin__filter">
    <div class="admin__filter-item">
      <input
        type="text"
        v-model="filterAt.name"
        placeholder="Фильтр по ФИО"
        @keyup="filtered"
      />
      <nuxt-icon name="admin/search" filled> </nuxt-icon>
    </div>
    <div class="admin__filter-item">
      <input
        type="text"
        v-model="filterAt.number"
        v-maska
        data-maska="+7 ###-###-##-##"
        placeholder="Поиск по телефону"
        @keyup="filtered"
      />

      <nuxt-icon name="admin/search" filled> </nuxt-icon>
    </div>

    <div class="admin__filter-item">
      <div :class="isActive && 'active'" @click="changeSelect">
        <h4>{{ pickedText }}</h4>

        <div>
          <div @click.stop="pick(1)">Стоматология</div>
          <div @click.stop="pick(0)">Crystal auto</div>
        </div>
      </div>
      <nuxt-icon name="admin/arrow" filled> </nuxt-icon>
    </div>
  </div>
</template>



<script setup>
const filterAt = ref({
  name: null,
  number: null,
  where: 1,
});

const isActive = ref(false);
const pickedText = ref("Фильтр по категории");

const changeSelect = () => {
  isActive.value = !isActive.value;
};

const pick = (bool) => {
  isActive.value = false;
  if (bool) {
    pickedText.value = "Стоматология";
  } else {
    pickedText.value = "Crystal auto";
  }
  filterAt.value.where = bool;

  filtered();
};

import { useTableStore } from "@/store/table.js";
const filtered = () => {
  useTableStore().filterAt(filterAt.value);
};
</script>