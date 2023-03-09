<template>
  <div class="auth">
    <div class="auth__wrapper">
      <div class="auth__top">
        <router-link to="/" class="auth__top-logo">
          <img src="@/assets/img/logo.png" alt="" />
        </router-link>
        <div class="auth__top-nav">
          <router-link to="reset">Восстановить пароль</router-link>
        </div>
      </div>

      <div class="auth__item">
        <h2>Номер телефона</h2>
        <input
          type="text"
          v-maska
          data-maska="+7 ###-###-##-##"
          v-model="number"
        />
        <span>Мы вышлем вам ссылку на изменение пароля</span>
      </div>

      <div class="auth__item">
        <UiMyButton :title="'Восстановить'" @onClick="resetClick" />
        <span><router-link to="/">Назад</router-link></span>
      </div>
    </div>
  </div>
</template>



<script setup>
const number = ref(null);
const { reset } = useAuth();
const resetClick = () => {
  reset(number.value);
};
</script>