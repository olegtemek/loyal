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
            <span>{{ getInfoUser().procent }} %</span>
          </p>
        </div>
        <p>
          Вы можете уже сейчас оплатить <span>30%</span> от стоимости услуг за
          бонусы
        </p>

        <a
          href="https://wa.me/+77052228880?text=Здравствуйте"
          class="btn green"
          target="_blank"
          v-if="getInfoUser().info[0].where"
          ><nuxt-icon name="general/zapis" filled></nuxt-icon>Записаться</a
        >
        <a
          href="https://wa.me/+77052228889?text=Здравствуйте"
          class="btn green"
          target="_blank"
          v-else
          ><nuxt-icon name="general/zapis" filled></nuxt-icon>Записаться</a
        >
        <a
          href="https://2gis.kz/almaty/geo/70000001025644603"
          target="_blank"
          class="btn"
          v-if="getInfoUser().info[0].where"
          ><nuxt-icon name="general/maps" filled></nuxt-icon>Найти нас</a
        >
        <a
          href="https://2gis.kz/almaty/geo/70000001031758568"
          target="_blank"
          class="btn"
          v-else
          ><nuxt-icon name="general/maps" filled></nuxt-icon>Найти нас</a
        >
      </div>

      <div class="profile__wrapper-bottom">
        <p v-if="getInfoUser().info[0].where">
          Наш кешбек так же распространяется на магазин с автозапчастями
        </p>
        <p v-else>Наш кешбек так же распространяется на стоматологию</p>

        <a
          href="https://kristall-auto.kz"
          class="btn"
          v-if="getInfoUser().info[0].where"
          ><nuxt-icon name="general/gears" filled></nuxt-icon>Автозапчасти</a
        >
        <a href="https://kristall-dent.kz" class="btn" v-else
          ><nuxt-icon name="general/gears" filled></nuxt-icon>Стоматология</a
        >
      </div>

      <div class="profile__wrapper-social" v-if="getInfoUser().info[0].where">
        <a
          href="https://instagram.com/kristalldentalmaty?igshid=YmMyMTA2M2Y="
          target="_blank"
          ><nuxt-icon name="general/instagram"></nuxt-icon
        ></a>
        <a href="https://wa.me/+77052228880?text=Здравствуйте" target="_blank"
          ><nuxt-icon name="general/whatsapp"></nuxt-icon
        ></a>
        <a href="https://t.me/+77052228880" target="_blank"
          ><nuxt-icon name="general/telegram"></nuxt-icon
        ></a>
      </div>
      <div class="profile__wrapper-social" v-else>
        <a
          href="https://instagram.com/kristallautoalmaty?igshid=YmMyMTA2M2Y="
          target="_blank"
          ><nuxt-icon name="general/instagram"></nuxt-icon
        ></a>
        <a href="https://wa.me/+77052228889?text=Здравствуйте" target="_blank"
          ><nuxt-icon name="general/whatsapp"></nuxt-icon
        ></a>
        <a href="https://t.me/kristall_auto" target="_blank"
          ><nuxt-icon name="general/telegram"></nuxt-icon
        ></a>
      </div>
    </div>
  </div>
</template>



<script setup>
const { hello, getInfoUser } = useUser();

import { useCashbackStore } from "@/store/cashback.js";
await useCashbackStore().fetchCashback();

if (getInfoUser().role == 1) {
  useRouter().push({ path: "/admin" });
}
</script>