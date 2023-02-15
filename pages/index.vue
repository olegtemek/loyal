<template>
  <div v-if="getInfoUser()" class="profile">
    <div class="profile__wrapper profile">
      <div class="profile__wrapper-top two">
        <img src="@/assets/img/logo.png" alt="" />
        <router-link to="/edit"
          ><nuxt-icon name="general/setting" filled></nuxt-icon
        ></router-link>
      </div>

      <div class="profile__wrapper-card index">
        <h1>
          {{ hello() }}, <span>{{ getInfoUser().name }}!</span>
        </h1>
        <span>{{ getInfoUser().number }}</span>
      </div>

      <div class="profile__wrapper-info">
        <div class="profile__wrapper-info-total">
          <p>
            У Вас: <span>{{ getInfoUser().info[0].bonuses }} бонусов</span>
          </p>
        </div>
        <div class="profile__wrapper-info-total cache">
          <p>
            Ваш кешбек составляет:
            <span>{{ getInfoUser().info[0].procent }} %</span>
          </p>
        </div>
        <p>
          Вы можете уже сейчас оплатить <span>30%</span> от стоимости услуг за
          бонусы
        </p>

        <a href="#" class="btn green"
          ><nuxt-icon name="general/zapis" filled></nuxt-icon>Записаться</a
        >
        <a href="#" class="btn"
          ><nuxt-icon name="general/maps" filled></nuxt-icon>Найти нас</a
        >
      </div>

      <div class="profile__wrapper-bottom">
        <p v-if="getInfoUser().info[0].where">
          Наш кешбек так же распространяется на магазин с автозапчастями
        </p>
        <p v-else>loh</p>
        <a href="#" class="btn"
          ><nuxt-icon name="general/gears" filled></nuxt-icon>Автозапчасти</a
        >
      </div>

      <div class="profile__wrapper-social">
        <a href="#"><nuxt-icon name="general/instgram"></nuxt-icon></a>
        <a href="#"><nuxt-icon name="general/whatsapp"></nuxt-icon></a>
        <a href="#"><nuxt-icon name="general/telegram"></nuxt-icon></a>
      </div>
    </div>
  </div>
</template>



<script setup>
const { hello, getInfoUser } = useUser();
</script>