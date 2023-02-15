<template>
  <div class="admin__top">
    <div class="admin__top-left">
      <h1>{{ hello() }}, {{ getInfoUser().name }}</h1>
    </div>

    <div class="admin__top-right">
      <div class="admin__top-right-senders" v-if="getInfoUser().role == 2">
        rasilki
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
</script>