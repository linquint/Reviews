import { useAuthStore } from '@/stores/auth';
import { Pinia } from '@pinia/nuxt/dist/runtime/composables';

export default defineNuxtPlugin(async ctx => {
  const refreshToken = useCookie('refreshToken');
  const $auth = useAuthStore(ctx.$pinia as Pinia);
  $auth.setRefreshToken(refreshToken.value || null);
  setTimeout(async () => {
    if (!!$auth.refreshToken && !$auth.user) {
      await $auth.refresh();
      const route = useRoute();
      if (route.name === 'login') {
        navigateTo('/');
      }
      if ($auth.user) {
        await $auth.getLikedMovies();
      }
    }
  }, 10);
});
