import { useAlertStore } from '@/store/alert.js'


function validation(data) {

  let reEmail = /\S+@\S+\.\S+/;
  let emailCheck = reEmail.test(data.email);

  if (!data.email) {
    return { message: 'Поле email обязательное поле' }
  }
  if (!emailCheck) {
    return { message: 'Проверьте правильность поля email' }
  }

  if (!data.password) {
    return { message: 'Поле пароль обязательное поле' }
  }
  return true
}

export const useAuthStore = defineStore('auth', {

  state: () => {
    return {
      user: null,
    }
  },


  actions: {
    async login(user) {

      if (!user.number) {
        return useAlertStore().init('Поле номер обязательно для заполнения', true)
      }
      if (!user.password) {
        return useAlertStore().init('Поле пароль обязательно для заполнения', true)
      }

      try {
        let res = await $fetch('/api/login', {
          method: "POST",
          body: {
            number: user.number,
            password: user.password
          }
        })
        this.user = res.user
        if (res.user.status) {
          return navigateTo('/')
        } else {
          return navigateTo('/confirm')
        }
      } catch (e) {
        return useAlertStore().init(e.data.message, true)
      }

    },


    async check(pageName) {
      try {
        await $fetch('/api/check-token', { method: "POST" }).then(data => {

          this.user = data.user
          if (pageName == 'login' || pageName == 'registration') {
            location.replace('/')
          }
          if (!data.user.status) {
            if (pageName != 'confirm' && pageName != 'reset-code') {
              location.replace('/confirm')
            }
          } else {
            if (pageName == 'confirm' && pageName != 'reset-code') {
              location.replace('/')
            } else if (pageName == 'reset-code') {
              return
            }
            return
          }
        }).catch(e => {
          if (pageName == 'login' || pageName == 'registration' || pageName == 'reset' || to.name == 'reset-code') {
            return
          }
          useCookie('token').value = null
          location.replace('/')
        })

      } catch (e) {
        if (pageName == 'login' || pageName == 'registration' || pageName == 'reset' || to.name == 'reset-code') {
          return
        }

        useCookie('token').value = null
        location.replace('/login')
      }
    },
    async registration(data) {
      try {
        let result = validation(data);


        if (result.message) {
          return useAlertStore().init(result.message, true)
        }



        let res = await $fetch('/api/registration', {
          method: 'POST',
          body: {
            email: data.email,
            password: data.password,
            name: data.name,
            number: data.number,
            where: useRoute().query.from ? useRoute().query.from : 1
          }
        })

        return navigateTo('/confirm')

      } catch (e) {
        useAlertStore().init(e.data.message)
      }
    },


    async confirmCode(code) {
      if (!code) {
        return useAlertStore().init('Поле код не должно быть пустым', true)
      }

      try {
        let res = await $fetch('/api/user-confirm', {
          method: 'POST',
          body: {
            code: code,
            email: this.user.email
          }
        })

        navigateTo('/')

      } catch (e) {
        useAlertStore().init(e.data.message, true)

      }
    },

    async sendCode() {
      try {
        let res = await $fetch('/api/retry-code', {
          method: 'POST',
          body: {
            email: this.user.email
          }
        })

        useAlertStore().init('Письмо успешно отправлено, проверьте вашу почту')

      } catch (e) {
        useAlertStore().init(e.data.message, true)
      }
    },


    async reset(number) {
      if (!number) {
        return useAlertStore().init('Поле номер не должно быть пустым', true)
      }

      try {
        let res = await $fetch('/api/reset', {
          method: "POST",
          body: {
            number: number
          }
        })

        useAlertStore().init('Код подтверждения отправлен Вам на почту!')
        setTimeout(() => {
          return navigateTo('/login')
        }, 2000);

      } catch (e) {
        useAlertStore().init(e.data.message, true)
      }

    },
    async checkCode(code) {
      try {
        let res = await $fetch('/api/reset-code', {
          method: "POST",
          body: {
            code: code
          }
        })
      } catch (e) {
        useAlertStore().init(e.data.message, true)
        return navigateTo('/login')
      }
    }
  },

  getters: {
    getUser(state) {
      return state.user
    }
  }
})