<template>
  <div class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal__wrapper">
      <span @click="closeModal">&#9587;</span>
      <h2>Добавить пользователя</h2>
      <div class="modal__item">
        <h2>ФИО</h2>
        <input type="text" v-model="tmpUser.name" />
      </div>
      <div class="modal__item">
        <h2>Откуда</h2>
        <div class="select" :class="isActive && 'active'" @click="changeSelect">
          <h4>{{ pickedText }}</h4>

          <div>
            <div @click.stop="pick(1)">Стоматология</div>
            <div @click.stop="pick(0)">Crystal auto</div>
          </div>
          <nuxt-icon name="admin/arrow" filled> </nuxt-icon>
        </div>
      </div>
      <div class="modal__item">
        <h2>Номер телефона</h2>
        <input
          type="text"
          v-model="tmpUser.number"
          v-maska
          data-maska="+7 ###-###-##-##"
        />
      </div>
      <div class="modal__item">
        <h2>E-mail</h2>
        <input type="text" v-model="tmpUser.email" />
      </div>
      <div class="modal__item">
        <h2>Пароль</h2>
        <input type="password" v-model="tmpUser.password" />
      </div>
      <div class="modal__item">
        <h2>Роль</h2>
        <div
          class="select"
          :class="isActiveRole && 'active'"
          @click="changeSelectRole"
        >
          <h4>{{ pickedTextRole }}</h4>

          <div>
            <div @click.stop="pickRole(1)">Модератор</div>
            <div @click.stop="pickRole(0)">Пользователь</div>
          </div>
          <nuxt-icon name="admin/arrow" filled> </nuxt-icon>
        </div>
      </div>

      <div class="modal__btns">
        <button class="blue" @click="addUser">Добавить</button>
        <button @click="closeModal" class="red">Отменить</button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { useTableStore } from "@/store/table.js";

const closeModal = () => {
  useTableStore().changeModal();
};
const pickedText = ref("Откуда");

const tmpUser = ref({
  email: null,
  number: null,
  password: null,
  where: null,
  role: 0,
  name: null,
});
const isActive = ref(false);
const changeSelect = () => {
  isActive.value = !isActive.value;
};
const pick = (bool) => {
  if (bool) {
    pickedText.value = "Стоматология";
  } else {
    pickedText.value = "Crystal auto";
  }

  tmpUser.value.where = bool;
  isActive.value = false;
};

const pickedTextRole = ref(tmpUser.value.role ? "Модератор" : "Пользователь");
const isActiveRole = ref(false);

const changeSelectRole = (e) => {
  isActiveRole.value = !isActiveRole.value;
};
const pickRole = (bool) => {
  if (bool) {
    pickedTextRole.value = "Модератор";
  } else {
    pickedTextRole.value = "Пользователь";
  }

  tmpUser.value.role = bool;
  isActiveRole.value = false;
};
const { createUserAdmin } = useAuth();
const addUser = () => {
  createUserAdmin(tmpUser.value);
};
</script>