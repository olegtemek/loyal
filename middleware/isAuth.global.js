import { useAuthStore } from '@/store/auth.js'


export default defineNuxtRouteMiddleware((to, from) => {
  if (useCookie('token').value) {
    useAuthStore().check(to.name)
  } else {
    if (to.name != 'login' && to.name != 'registration') {
      return navigateTo('/login')
    } else {
      useAuthStore().check(to.name)
    }
  }


})