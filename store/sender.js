import { useAlertStore } from '@/store/alert.js'
export const useSendStore = defineStore('sender', {


  actions: {
    async send(type) {
      try {
        let res = await $fetch('/api/admin/send-whatsapp', {
          method: "POST",
          body: {
            type: type
          }
        })

        let filename = '123' + (Math.floor(Date.now() / 1000)) + '.xlsx';
        let url = window.URL.createObjectURL(new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        let link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();

        useAlertStore().init('Успешно, устанавливаю...', false)
      } catch (e) {
        return useAlertStore().init(e.data.message, true)
      }
    }
  }
})