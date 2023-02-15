<template>
  <div class="auth">
    <div class="auth__wrapper">
      <UiTopAuth />
      <div class="auth__item">
        <h2>Ваш номер</h2>
        <input
          type="text"
          v-maska
          data-maska="+7 ###-###-##-##"
          v-model="user.number"
        />
      </div>
      <div class="auth__item">
        <h2>Ваш пароль</h2>
        <input type="password" v-model="user.password" @keyup.enter="auth" />
      </div>

      <div class="auth__item">
        <UiMyButton :title="'Войти'" @onClick="auth" />
        <span><router-link to="/reset">Забыли пароль?</router-link></span>
      </div>
    </div>
  </div>
</template>



<script setup>
const { login } = useAuth();
const user = ref({
  number: null,
  password: null,
});
const auth = () => {
  login(user.value);
};
</script>