<template>
  <div class="admin__table">
    <div class="admin__table-top">
      <div></div>
      <div>ФИО</div>
      <div>Телефон</div>
      <div>От куда</div>
      <div>E-mail</div>
      <div>
        Потрачено <br />
        в общем тг.
      </div>
      <div>
        Доступный <br />
        % бонусов
      </div>
      <div>
        Количество <br />
        бонусов
      </div>
      <div>Добавить траты</div>
      <div>Снять бонусы</div>
    </div>

    <div class="admin__table-list">
      <div
        class="admin__table-item"
        v-for="user of tableStore.getUsers"
        :key="user.id"
      >
        <div>
          <button @click="edit(user)" v-if="getInfoUser().role == 2">
            <nuxt-icon name="general/edit"></nuxt-icon>
          </button>
          <button @click="view(user)">
            <nuxt-icon name="general/view"></nuxt-icon>
          </button>
        </div>
        <div>
          <p>{{ user.name }}</p>
        </div>
        <div>
          <p>{{ user.number }}</p>
        </div>
        <div>{{ user.info[0].where ? "Стоматология" : "Crystal Auto" }}</div>
        <div>
          <p>{{ user.email }}</p>
        </div>
        <div class="bold">{{ user.info[0].lost }} тг</div>
        <div>Кэшбек: {{ user.procent }}%</div>
        <div>{{ user.info[0].bonuses }} б.</div>
        <div><button @click="add(user, 1)">Добавить</button></div>
        <div><button @click="add(user)">Снять</button></div>
      </div>
    </div>
  </div>
</template>



<script setup>
const { getInfoUser } = useUser();
import { useTableStore } from "@/store/table.js";
import { useCashbackStore } from "@/store/cashback.js";
await useCashbackStore().fetchCashback();
const tableStore = useTableStore();
await tableStore.fetchAll();

const add = (user, type = 0) => {
  tableStore.changeModal({
    user: user,
    type: type,
  });
};

const edit = (user) => {
  tableStore.changeModal({
    user: user,
    type: 4,
  });
};
const view = (user) => {
  tableStore.changeModal({
    user: user,
    type: 5,
  });
};
</script>