import { useAlertStore } from '@/store/alert.js'
import { useCashbackStore } from '@/store/cashback.js'

export const useTableStore = defineStore('table', {

  state: () => {
    return {
      users: null,
      modal: {
        active: null,
        user: null,
        type: null,
        success: null
      },
      filters: {
        name: null,
        number: null,
        where: null
      }
    }
  },




  actions: {
    async fetchAll() {
      try {
        let res = await $fetch('/api/admin/get');
        if (res.users) {
          let procents = useCashbackStore().getCashback;
          res.users.forEach(user => {
            let procent = procents[0].cashback
            procents.forEach(proc => {
              if (proc.counter <= user.info[0].lost) {
                procent = proc.cashback
              }
            });
            user.procent = procent
          })

          return this.users = res.users
        }

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

    async filterAt(data) {
      this.filters.name = data.name;
      this.filters.number = data.number;
      this.filters.where = data.where;
    }
  },

  getters: {
    getUsers(state) {
      let filterUsers = state.users


      if (state.filters.name) {
        filterUsers = filterUsers.filter((item) => item.name.toLowerCase().indexOf(state.filters.name.toLowerCase()) > -1)
      }
      if (state.filters.where != null) {
        filterUsers = filterUsers.filter((item) => item.info[0].where == state.filters.where)
      }

      if (state.filters.number) {
        filterUsers = filterUsers.filter((item) => item.number.indexOf(state.filters.number) > -1)
      }

      return filterUsers
    },
    getModal(state) {
      return state.modal
    }
  }
})