<template>
  <div class="admin__table">
    <div class="admin__table-top">
      <div>ФИО</div>
      <div>Телефон</div>
      <div>От куда</div>
      <div>E-mail</div>
      <div>
        Потрачено <br />
        в общем Тг.
      </div>
      <div>
        Доступный <br />
        % бонусов
      </div>
      <div>
        Количество <br />
        бонусов
      </div>
      <div>
        Добавить к <br />
        общей стоимости
      </div>
      <div>Снять бонусы</div>
    </div>

    <div class="admin__table-list">
      <div class="admin__table-item" v-for="index of 20" :key="index">
        <div>Полежайкин Александр</div>
        <div>+7-771-208-51-50</div>
        <div>Стоматология</div>
        <div>somename @gmail.com</div>
        <div class="bold">575 000 тг</div>
        <div>Кэшбек: 20%</div>
        <div>25 000 бонусов</div>
        <div><button>add</button></div>
        <div><button>remove</button></div>
      </div>
    </div>
  </div>
</template>



<script setup>
</script>