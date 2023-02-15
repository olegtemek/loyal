import { useAuthStore } from '@/store/auth.js'


export default defineNuxtRouteMiddleware(async (to, from) => {
  if (useCookie('token').value) {

    await useAuthStore().check(to.name)

  } else {
    if (to.name != 'login' && to.name != 'registration' && to.name != 'reset' && to.name != 'reset-code') {
      return navigateTo('/login')
    } else {
      await useAuthStore().check(to.name)
    }
  }


}) 