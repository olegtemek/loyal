<template>
  <div class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal__wrapper">
      <span @click="closeModal">&#9587;</span>
      <h2>Whatsapp рассылка</h2>

      <div class="modal__item">
        <h2>Кому отправить</h2>
        <div class="select" :class="isActive && 'active'" @click="changeSelect">
          <h4>{{ pickedText }}</h4>

          <div>
            <div @click.stop="pick(0)">Crystal auto</div>
            <div @click.stop="pick(1)">Crystal dent</div>
          </div>
          <nuxt-icon name="admin/arrow" filled></nuxt-icon>
        </div>
      </div>

      <div class="modal__btns">
        <button @click="save" class="blue">Отправить</button>
        <button @click="closeModal" class="red">Отменить</button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { useTableStore } from "@/store/table.js";
import { useSendStore } from "@/store/sender.js";

const closeModal = () => {
  useTableStore().changeModal();
};
const type = ref(0);
const changeSelect = () => {
  isActive.value = !isActive.value;
};
const isActive = ref(false);
const pickedText = ref("Crystal auto");
const pick = (bool) => {
  if (bool) {
    pickedText.value = "Crystal dent";
  } else {
    pickedText.value = "Crystal auto";
  }

  type.value = bool;
  isActive.value = false;
};

const save = async () => {
  useSendStore().send(type.value);
  useTableStore().changeModal();
};
</script>