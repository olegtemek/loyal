<template>
  <div class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal__wrapper">
      <span @click="closeModal">&#9587;</span>
      <h2>Смена бонусной системы</h2>

      <div class="modal__item row">
        <div>
          <h2>% кешбека</h2>
          <input type="text" v-model.number="system[0].cashback" />
        </div>
        <div>
          <h2>Потрачено у пользователя</h2>
          <input type="text" v-model.number="system[0].counter" />
        </div>
      </div>
      <div class="modal__item row">
        <div>
          <h2>% кешбека</h2>
          <input type="text" v-model.number="system[1].cashback" />
        </div>
        <div>
          <h2>Потрачено у пользователя</h2>
          <input type="text" v-model.number="system[1].counter" />
        </div>
      </div>
      <div class="modal__item row">
        <div>
          <h2>% кешбека</h2>
          <input type="text" v-model.number="system[2].cashback" />
        </div>
        <div>
          <h2>Потрачено у пользователя</h2>
          <input type="text" v-model.number="system[2].counter" />
        </div>
      </div>

      <div class="modal__btns">
        <button @click="save" class="blue">Сохранить</button>
        <button @click="closeModal" class="red">Отменить</button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { useTableStore } from "@/store/table.js";
import { useCashbackStore } from "@/store/cashback.js";

const props = defineProps({
  cashback: Array,
});

const closeModal = () => {
  useTableStore().changeModal();
};

const system = ref([
  {
    cashback: props.cashback[0].cashback,
    counter: props.cashback[0].counter,
  },
  {
    cashback: props.cashback[1].cashback,
    counter: props.cashback[1].counter,
  },
  {
    cashback: props.cashback[2].cashback,
    counter: props.cashback[2].counter,
  },
]);

const save = async () => {
  useCashbackStore().save(system.value);
  useTableStore().changeModal();
};
</script>