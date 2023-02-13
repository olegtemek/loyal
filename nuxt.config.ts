// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,



  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],

  nitro: {
    devProxy: {
      '/api/': {
        target: 'http://127.0.0.1:8001/api',
        changeOrigin: true
      }
    },
  },



})
