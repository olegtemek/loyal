<template>
  <div class="auth reg">
    <div class="auth__wrapper">
      <UiTopAuth />
      <div class="auth__item">
        <h2>ФИО</h2>
        <input type="text" v-model="user.name" />
        <span>Чтобы мы всегда помнили</span>
      </div>
      <div class="auth__item">
        <h2>Ваш номер</h2>
        <input
          type="text"
          v-model="user.number"
          v-maska
          data-maska="+7 ###-###-##-##"
        />
        <span>Чтобы мы знали, что Вы наш частый клиент</span>
      </div>
      <div class="auth__item">
        <h2>Ваш email</h2>
        <input type="text" v-model="user.email" />
        <span>Чтобы Вы знали, что у нас есть акция для Вас</span>
      </div>
      <div class="auth__item">
        <h2>Ваш пароль</h2>
        <input type="password" v-model="user.password" />
        <span>Чтобы Ваши бонусы были только Ваши</span>
      </div>
      <div class="auth__item">
        <UiMyButton :title="'Регистрация'" @onClick="register" />
        <span
          >Нажимая далее вы соглашаетесь на обработку ваших
          <a href="#">персональных данных</a>
        </span>
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