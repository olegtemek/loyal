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
        return useAlertStore().init('Поле номер обязательно для заполнения', false)
      }
      if (!user.password) {
        return useAlertStore().init('Поле пароль обязательно для заполнения', false)
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
        return useAlertStore().init(e.data.message, false)
      }

    },


    async check(pageName) {

      try {
        await $fetch('/api/check-token', { method: "POST" }).then(data => {

          this.user = data.user
          if (pageName == 'login' || pageName == 'registration') {
            return navigateTo('/')
          }
          if (!data.user.status) {
            if (pageName != 'confirm') {
              return navigateTo('/confirm')
            }
            return
          } else {

            if (pageName == 'confirm') {
              return navigateTo('/')
            }
          }
        }).catch(e => {

          if (pageName == 'login' || pageName == 'registration') {
            return
          }
          useCookie('token').value = ''
          return navigateTo('/')
        })

      } catch (e) {
        if (pageName == 'login' || pageName == 'registration') {
          return
        }
        useCookie('token').value = null
        return navigateTo('/login')
      }
    },
    async registration(data) {
      try {
        let result = validation(data);


        if (result.message) {
          return useAlertStore().init(result.message, false)
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
        useAlertStore().init(e.data.message, false)
      }
    },


    async confirmCode(code) {
      if (!code) {
        return useAlertStore().init('Поле код не должно быть пустым', false)
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
        useAlertStore().init(e.data.message, false)

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

        useAlertStore().init('Письмо успешно отправлено, проверьте вашу почту', true)

      } catch (e) {
        useAlertStore().init(e.data.message, false)
      }
    }
  },

  getters: {
    getUser(state) {
      return state.user
    }
  }
})