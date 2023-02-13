<template>
  <div class="auth">
    <div class="container">
      <div class="auth__wrapper">
        <div class="auth__item">
          <h2>Ваш номер</h2>
          <input
            type="text"
            placeholder="Номер"
            v-maska
            data-maska="+7 ###-###-##-##"
            v-model="user.number"
          />
        </div>
        <div class="auth__item">
          <h2>Ваш пароль</h2>
          <input type="password" placeholder="пароль" v-model="user.password" />
        </div>

        <div class="auth__item">
          <button @click="auth">Войти</button>
        </div>
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