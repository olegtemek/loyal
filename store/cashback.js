import { useAlertStore } from '@/store/alert.js'
import { useTableStore } from "@/store/table.js";
export const useCashbackStore = defineStore('cashback', {

  state: () => {
    return {
      cashback: null,
    }
  },


  actions: {
    async fetchCashback() {
      try {
        let res = await $fetch('/api/admin/get-cashback');
        this.cashback = res.data

      } catch (e) {
        return useAlertStore().init(e.data.message, true)
      }
    },

    async save(data) {
      try {
        let res = await $fetch('/api/admin/save-cashback', {
          method: "POST",
          body: {
            data: data
          }
        })

        useTableStore().fetchAll()
        useAlertStore().init(res.message, false)
        this.fetchCashback()
      } catch (e) {
        return useAlertStore().init(e.data.message, true)
      }
    }
  },

  getters: {
    getCashback(state) {
      return state.cashback
    }
  }
})