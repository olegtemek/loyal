<template>
  <div class="modal">
    <div class="bg" @click="closeModal"></div>
    <div class="modal__wrapper" v-if="type == 0">
      <span @click="closeModal">&#9587;</span>
      <h2>{{ tmpUser.name }}</h2>

      <div class="modal__item">
        <h2>Сумма оплаты</h2>
        <input
          type="number"
          v-model.number="tmpUser.sum"
          @keyup="resultBonuses"
        />
      </div>
      <div class="modal__item row">
        <div>
          <h2>% списания</h2>
          <input type="text" v-model="tmpUser.procent" readonly />
        </div>
        <div>
          <h2>Бонусный лимит</h2>
          <input type="text" :value="tmpUser.can" readonly />
        </div>
      </div>
      <div class="modal__item">
        <h2>Введите количество бонусов для списания</h2>
        <input
          type="text"
          :readonly="!tmpUser.sum"
          @keyup="resultBonuses"
          v-model="tmpUser.minus"
        />
      </div>

      <div class="modal__btns">
        <button :disabled="tmpUser.error" @click="pay" class="blue">
          Списать
        </button>
        <button @click="closeModal" class="red">Отменить</button>
        <button :disabled="tmpUser.error" @click="all" class="green">
          Списать все
        </button>
      </div>
    </div>

    <div class="modal__wrapper" v-else-if="type == 1">
      <span @click="closeModal">&#9587;</span>
      <h2>{{ tmpUser.name }}</h2>

      <div class="modal__item">
        <h2>Введите сумму пополнения</h2>
        <input type="number" v-model="tmpUser.sum" @keyup="resultBonuses" />
      </div>
      <div class="modal__btns">
        <button :disabled="tmpUser.error" @click="pay" class="blue">
          Добавить
        </button>
        <button @click="closeModal" class="red">Отменить</button>
      </div>
    </div>

    <div class="modal__wrapper" v-else>
      <span @click="closeModal">&#9587;</span>
      <h2>Операция прошла успешно</h2>
      <p v-html="props.success"></p>
      <div class="modal__btns">
        <button @click="closeModal" class="blue">На главную</button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { useAlertStore } from "@/store/alert.js";
const { userTransaction } = useAdmin();
const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
  type: Number,
  active: false,
  success: String,
});

const tmpUser = ref({
  id: props.user.id,
  name: props.user.name,
  procent: props.user.info[0].procent,
  bonuses: props.user.info[0].bonuses,
  minus: null,
  sum: null,
  can: null,
  all: props.user.info[0].lost,
  error: props.type ? false : true,
});

import { useTableStore } from "@/store/table.js";

const closeModal = () => {
  useTableStore().changeModal();
};

const resultBonuses = () => {
  if (tmpUser.value.sum > 0 && tmpUser.value.sum != "" && tmpUser.value.sum) {
    tmpUser.value.can = Math.floor(
      (tmpUser.value.sum * tmpUser.value.procent) / 100
    );

    if (tmpUser.value.bonuses <= tmpUser.value.can) {
      tmpUser.value.can = tmpUser.value.bonuses;
    }

    if (tmpUser.value.minus > tmpUser.value.can) {
      tmpUser.value.minus = tmpUser.value.can;
    } else {
      tmpUser.value.error = false;
    }
  } else {
    tmpUser.value.error = true;
    tmpUser.value.sum = null;
  }
};

const all = () => {
  tmpUser.value.minus = tmpUser.value.can;
};

const pay = () => {
  if (!tmpUser.value.sum) {
    return useAlertStore().init("Сумма не может быть пустой", true);
  }

  userTransaction(tmpUser.value);
};
</script>