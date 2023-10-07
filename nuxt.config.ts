/* eslint-disable */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/pages', pathPrefix: false },
    { path: '~/layouts', pathPrefix: false },
  ],
  css: [ '~/assets/main.sass' ],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/_colors.sass" as *\n'
        }
      }
    }
  },
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['stores']
  },
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  }
})
