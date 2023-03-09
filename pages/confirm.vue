<template>
  <div class="auth">
    <div class="auth__wrapper container">
      <div class="auth__top">
        <router-link class="auth__top-logo" to="/">
          <img src="@/assets/img/logo.png" alt="" />
        </router-link>
      </div>
      <div class="auth__item">
        <h2>Код подтверждения</h2>
        <input type="text" v-model="code" @keyup.enter="check" />
        <span>Мы отправили код Вам на почту</span>
      </div>
      <div class="auth__item">
        <UiMyButton :title="'Проверить'" @onClick="check" />

        <span>
          <UiMyButton
            :title="'Не пришло письмо?'"
            :isMain="false"
            class="retry"
            @onClick="retry"
          />
        </span>
        <span
          ><router-link to="/login" @click="logout">Выход</router-link></span
        >
      </div>
    </div>
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
const logout = () => {
  useCookie("token").value = null;
  return navigateTo("/login");
};
</script>