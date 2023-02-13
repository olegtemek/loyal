<template>
  <div class="auth">
    <div class="container">
      <div class="auth__wrapper">
        <div class="auth__item">
          <h2>Ваш ФИО</h2>
          <input type="text" v-model="user.name" placeholder="ФИО" />
        </div>
        <div class="auth__item">
          <h2>Ваш номер</h2>
          <input
            type="text"
            v-model="user.number"
            v-maska
            data-maska="+7 ###-###-##-##"
            placeholder="Номер телефона"
          />
        </div>
        <div class="auth__item">
          <h2>Ваш email</h2>
          <input type="text" v-model="user.email" placeholder="Email" />
        </div>
        <div class="auth__item">
          <h2>Ваш пароль</h2>
          <input type="password" v-model="user.password" placeholder="Пароль" />
        </div>
        <div class="auth__item">
          <button @click="register">Регистрация</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
const { registration } = useAuth();
const user = ref({
  email: null,
  password: null,
  number: null,
  name: null,
});

const register = () => {
  registration(user.value);
};
</script>