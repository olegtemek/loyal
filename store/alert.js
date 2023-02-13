export const useAlertStore = defineStore('alert', {

  state: () => {
    return {
      text: null,
      error: false,
      timer: null
    }
  },


  actions: {
    async init(text, error) {
      console.log(text);
      clearTimeout(this.timer)
      this.text = text;
      this.error = error
      this.timer = setTimeout(() => {
        this.text = null
      }, 2000)
    }
  }
})