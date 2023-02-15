export const useAlertStore = defineStore('alert', {

  state: () => {
    return {
      text: null,
      error: false,
      timer: null
    }
  },


  actions: {
    async init(text, error = false) {
      clearTimeout(this.timer)
      this.text = text ? text : 'Ошибка сервера попробуйте снова';
      this.error = error
      this.timer = setTimeout(() => {
        this.text = null
      }, 2000)
    }
  }
})