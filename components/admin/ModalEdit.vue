<template>
  <div class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal__wrapper">
      <span @click="closeModal">&#9587;</span>
      <h2>{{ tmpUser.name }}</h2>

      <div class="modal__item">
        <h2>Потрачено :</h2>
        <input type="text" v-model="tmpUser.lost" />
      </div>
      <div class="modal__item">
        <h2>Кол-во бонусов</h2>
        <input type="text" v-model="tmpUser.bonuses" />
      </div>
      <div class="modal__item">
        <h2>Доступный кэшбек</h2>
        <input type="text" v-model="tmpUser.procent" readonly />
      </div>

      <div class="modal__item">
        <h2>Роль</h2>
        <div class="select" :class="isActive && 'active'" @click="changeSelect">
          <h4>{{ pickedText }}</h4>

          <div>
            <div @click.stop="pick(1)">Модератор</div>
            <div @click.stop="pick(0)">Пользователь</div>
          </div>
          <nuxt-icon name="admin/arrow" filled> </nuxt-icon>
        </div>
      </div>

      <div class="modal__btns">
        <button :disabled="tmpUser.error" @click="save" class="blue">
          Сохранить
        </button>
        <button @click="closeModal" class="red">Отменить</button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { useTableStore } from "@/store/table.js";

const props = defineProps({
  user: Object,
});
const closeModal = () => {
  useTableStore().changeModal();
};

const tmpUser = ref({
  id: props.user.id,
  name: props.user.name,
  procent: props.user.info[0].procent,
  bonuses: props.user.info[0].bonuses,
  lost: props.user.info[0].lost,
  email: props.user.email,
  role: props.user.role,
});

const { userUpdate } = useUser();

const pickedText = ref(tmpUser.value.role ? "Модератор" : "Пользователь");
const isActive = ref(false);

const changeSelect = (e) => {
  isActive.value = !isActive.value;
};
const pick = (bool) => {
  if (bool) {
    pickedText.value = "Модератор";
  } else {
    pickedText.value = "Пользователь";
  }

  tmpUser.value.role = bool;
  isActive.value = false;
};

const save = async () => {
  if (tmpUser.value.lost <= 100000) {
    tmpUser.value.procent = 10;
  } else if (tmpUser.value.lost <= 500000 && tmpUser.value.lost > 100000) {
    tmpUser.value.procent = 20;
  } else if (tmpUser.value.lost > 500000) {
    tmpUser.value.procent = 30;
  }

  userUpdate({
    email: tmpUser.value.email,
    role: tmpUser.value.role,
    more: {
      lost: tmpUser.value.lost,
      bonuses: tmpUser.value.bonuses,
      procent: tmpUser.value.procent,
    },
  });

  useTableStore().changeModal();
};
</script>