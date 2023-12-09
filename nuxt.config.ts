/* eslint-disable */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  security: {
    rateLimiter: false,
    corsHandler: {
      origin: 'movies.linquint.dev',
      methods: '*'
    },
    headers: {
      contentSecurityPolicy: {
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data: *', 'https:'],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'upgrade-insecure-requests': true
      },
      crossOriginEmbedderPolicy: false,
    }
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
    'nuxt-security',
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
  },
});
