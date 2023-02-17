import { useAlertStore } from '@/store/alert.js'

export const useTableStore = defineStore('table', {

  state: () => {
    return {
      users: null,
      modal: {
        active: null,
        user: null,
        type: null,
        success: null
      }
    }
  },


  actions: {
    async fetchAll() {
      try {
        let res = await $fetch('/api/admin/get');
        this.users = res.users
      } catch (e) {
        return useAlertStore().init(e.data.message, true)
      }
    },

    async changeModal(data) {
      if (data) {
        if (data.success) {
          this.modal.active = true;
          this.modal.type = 3;
          this.modal.success = data.success
        }
        this.modal.user = data.user;
        this.modal.type = data.type;
        this.modal.active = true;
      } else {
        this.modal = {
          active: false,
          user: null,
          type: null
        }
      }

    },
    async pay(data) {
      console.log(data);
    }
  },

  getters: {
    getUsers(state) {
      return state.users
    },
    getModal(state) {
      return state.modal
    }
  }
})