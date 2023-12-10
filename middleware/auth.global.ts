import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(to => {
  const $auth = useAuthStore();
  const protectedRoutes = [ 'account', 'recommendations' ];

  if (protectedRoutes.includes(to.name as string) && !$auth.token) {
    return navigateTo('/login');
  }

  if (to.name === 'login' && $auth.token) {
    return navigateTo('/');
  }

});
