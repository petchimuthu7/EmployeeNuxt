import { defineNuxtConfig } from 'nuxt'
// eslint-disable-next-line nuxt/no-cjs-in-config
const config = require('./config.js')
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  env: {
    config,
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: ["@nuxtjs/axios", '@pinia/nuxt'],

  axios: {
    baseURL: 'http://localhost:4897/',
    Proxy: false // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://localhost:4897/',
      proxyHeaders: false,
    },
  },

  vite: {
    define: {
      'process.env.DEBUG': true,
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
})
