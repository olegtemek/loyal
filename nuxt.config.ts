// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  css: ['@/assets/scss/app.scss'],

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
    'nuxt-icons',
  ],

  nitro: {
    devProxy: {
      '/api/': {
        target: 'http://127.0.0.1:8001/api',
        changeOrigin: true
      }
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },



})
