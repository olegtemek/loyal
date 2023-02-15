<template>
  <div v-if="user.email" class="profile">
    <div class="profile__wrapper">
      <router-link to="/" class="profile__wrapper-top">
        <img src="@/assets/img/logo.png" alt="" />
      </router-link>
      <div class="profile__wrapper-card">
        <h1>{{ hello() }}, {{ getInfoUser().name }}!</h1>
      </div>

      <div class="profile__wrapper-item">
        <h2>ФИО</h2>
        <input type="text" v-model="user.name" />
        <span>Чтобы мы всегда помнили</span>
      </div>
      <div class="profile__wrapper-item">
        <h2>Номер</h2>
        <input
          type="text"
          v-maska
          data-maska="+7 ###-###-##-##"
          v-model="user.number"
        />
        <span>Чтобы мы знали, что Вы наш частый клиент</span>
      </div>
      <div class="profile__wrapper-item">
        <h2>E-mail</h2>
        <input type="text" v-model="user.email" />
        <span>Чтобы Вы знали, что у нас есть акция для Вас</span>
      </div>
      <div class="profile__wrapper-item">
        <h2>Новый пароль</h2>
        <input type="password" v-model="user.password" />
        <span>Чтобы Ваши бонусы были только Ваши</span>
      </div>
      <div class="profile__wrapper-item">
        <UiMyButton :title="'Сохранить'" @onClick="save" />
      </div>
    </div>
  </div>
</template>



<script setup>
const { hello, getInfoUser, userUpdate } = useUser();

const user = ref({
  name: getInfoUser().name,
  email: getInfoUser().email,
  number: getInfoUser().number,
  password: null,
});

const save = () => {
  userUpdate(user.value);
};
</script>