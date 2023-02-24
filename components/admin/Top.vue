<template>
  <div class="admin__top">
    <div class="admin__top-left">
      <h1>{{ hello() }}, {{ getInfoUser().name }}</h1>
    </div>

    <div class="admin__top-right">
      <div class="admin__top-right-senders" v-if="getInfoUser().role == 2">
        <!-- <button>Загрузка excel</button>
        <button class="green">SMS рассылка</button> -->
        <button class="red" @click="addUser">Добавить пользователя</button>
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
</script>