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
  bonuses: props.user.info[0].bonuses,
  lost: props.user.info[0].lost,
  email: props.user.email,
  role: props.user.role,
  procent: props.user.procent,
});

const { userUpdate } = useUser();

const isActive = ref(false);

const save = async () => {
  userUpdate({
    email: tmpUser.value.email,
    role: tmpUser.value.role,
    more: {
      lost: tmpUser.value.lost,
      bonuses: tmpUser.value.bonuses,
    },
  });

  useTableStore().changeModal();
};
</script>