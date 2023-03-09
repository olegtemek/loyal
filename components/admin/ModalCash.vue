<template>
  <div class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal__wrapper">
      <span @click="closeModal">&#9587;</span>
      <h2>Смена бонусной системы</h2>

      <div class="modal__item row">
        <div>
          <h2>% кешбека</h2>
          <input
            type="text"
            v-model.number="system[0].cashback"
            @input="
              () => {
                if (system[0].cashback > 100 || system[0].cashback < 0) {
                  system[0].cashback = 20;
                }
              }
            "
          />
        </div>
        <div>
          <h2>Потрачено</h2>
          <input
            type="text"
            v-model.number="system[0].counter"
            @input="
              () => {
                if (system[0].counter > 1000000000 || system[0].counter < 0) {
                  system[0].counter = 20;
                }
              }
            "
          />
        </div>
      </div>
      <div class="modal__item row">
        <div>
          <h2>% кешбека</h2>
          <input
            type="text"
            v-model.number="system[1].cashback"
            @input="
              () => {
                if (system[1].cashback > 100 || system[1].cashback < 0) {
                  system[1].cashback = 20;
                }
              }
            "
          />
        </div>
        <div>
          <h2>Потрачено</h2>
          <input
            type="text"
            v-model.number="system[1].counter"
            @input="
              () => {
                if (system[1].counter > 1000000000 || system[1].counter < 0) {
                  system[1].counter = 20;
                }
              }
            "
          />
        </div>
      </div>
      <div class="modal__item row">
        <div>
          <h2>% кешбека</h2>
          <input
            type="text"
            v-model.number="system[2].cashback"
            @input="
              () => {
                if (system[2].cashback > 100 || system[2].cashback < 0) {
                  system[2].cashback = 20;
                }
              }
            "
          />
        </div>
        <div>
          <h2>Потрачено</h2>
          <input
            type="text"
            v-model.number="system[2].counter"
            @input="
              () => {
                if (system[2].counter > 1000000000 || system[2].counter < 0) {
                  system[2].counter = 20;
                }
              }
            "
          />
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
import { useAlertStore } from "@/store/alert.js";

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
  if (
    !system.value[0].cashback ||
    !system.value[1].cashback ||
    !system.value[2].cashback
  ) {
    return useAlertStore().init("Одно из полей не заполнено", true);
  }

  useCashbackStore().save(system.value);
  useTableStore().changeModal();
};
</script>