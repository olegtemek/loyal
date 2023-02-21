import { useAlertStore } from '@/store/alert.js'
import { useTableStore } from '@/store/table.js'

export const useUserStore = defineStore('user', {

  state: () => {
    return {
      user: null,
    }
  },


  actions: {
    async update(data) {
      try {
        let res = await $fetch('/api/user-update', {
          method: "POST",
          body: { user: data }
        })

        await useAlertStore().init(res.message)

        if (useRoute().name == 'admin') {
          useTableStore().fetchAll()

          console.log(res, data);
        }
        if (useRoute().name == 'reset-code') {
          return navigateTo('/login')
        }
      } catch (e) {
        return useAlertStore().init(e.data.message, true)
      }
    }
  },

  getters: {
    getUser(state) {
      return state.user
    }
  }
})