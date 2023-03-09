import { useAlertStore } from '@/store/alert.js'
import { useTableStore } from "@/store/table.js";
export const useAdminStore = defineStore('admin', {

  actions: {
    async userTransaction(data) {

      try {
        let res = await $fetch('/api/admin/transaction', {
          method: "POST",
          body: data
        })

        useTableStore().changeModal({
          success: res.message,
        });
        useTableStore().fetchAll()


      } catch (e) {
        useAlertStore().init(e.data.message, true)
      }
    }
  }
})