<template>
  <div class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal__wrapper">
      <span @click="closeModal">&#9587;</span>
      <h2>{{ props.user.name }}</h2>

      <div class="modal__item">
        <h2>Откуда</h2>
        <input
          type="text"
          :value="props.user.info[0].where ? 'Стоматология' : 'Crystal Auto'"
          readonly
        />
      </div>
      <div class="modal__item">
        <h2>Номер телефона</h2>
        <input type="text" :value="props.user.number" readonly />
      </div>
      <div class="modal__item">
        <h2>Роль</h2>
        <input
          type="text"
          :value="props.user.role ? 'Модератор' : 'Пользователь'"
          readonly
        />
      </div>
      <div class="modal__item">
        <h2>Потрачено</h2>
        <input type="text" :value="props.user.info[0].lost" readonly />
      </div>
      <div class="modal__item">
        <h2>Кол-во бонусов</h2>
        <input type="text" :value="props.user.info[0].bonuses" readonly />
      </div>
      <div class="modal__item">
        <h2>Доступный кэшбек</h2>
        <input type="text" :value="props.user.procent + ' %'" readonly />
      </div>

      <div class="modal__btns">
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
</script>