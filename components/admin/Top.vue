<template>
  <div class="admin__top">
    <div class="admin__top-left">
      <h1>{{ hello() }}, {{ getInfoUser().name }}</h1>
    </div>

    <div class="admin__top-right">
      <div class="admin__top-right-senders" v-if="getInfoUser().role == 2">
        <button class="blue" @click="changeSender">Рассылка</button>
        <button class="green" @click="changeProcent">Кешбек</button>
        <button class="red" @click="addUser">Пользователь</button>
      </div>

      <div class="admin__top-right-logout">
        <button @click="logout">
          <nuxt-icon name="admin/logout" filled></nuxt-icon>
          Выход
        </button>
      </div>
    </div>
  </div>
</template>



<script setup>
const { getInfoUser, hello } = useUser();

const logout = () => {
  useCookie("token").value = null;
  return navigateTo("/login");
};
import { useTableStore } from "@/store/table.js";
const addUser = () => {
  useTableStore().changeModal({
    type: 6,
  });
};

const changeProcent = () => {
  useTableStore().changeModal({
    type: 8,
  });
};

const changeSender = () => {
  useTableStore().changeModal({
    type: 9,
  });
};
</script>