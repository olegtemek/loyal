<template>
  <div class="auth" v-if="status">
    <div class="auth__wrapper">
      <div class="auth__top">
        <router-link class="auth__top-logo" to="/">
          <img src="@/assets/img/logo.png" alt="" />
        </router-link>
      </div>
      <div class="auth__item">
        <h2>Новый пароль</h2>
        <input type="password" v-model="password" @keyup.enter="save" />
        <span>Введите новый пароль</span>
      </div>
      <div class="auth__item">
        <UiMyButton :title="'Сохранить'" @onClick="save" />
      </div>
    </div>
  </div>
</template>



<script setup>
const password = ref(null);
const { checkCode } = useAuth();
const { userUpdate } = useUser();
const status = ref(false);
onMounted(() => {
  const code = useRoute().query.code;
  if (!code) {
    return navigateTo("/login");
  } else {
    checkCode(code);
    status.value = true;
  }
});
const save = () => {
  userUpdate({ password: password.value });
};
</script>