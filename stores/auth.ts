import { defineStore } from 'pinia';
import { IUser } from '~/types/types';

interface IAuthStoreState {
  token: string | null;
  refreshToken: string | null;
  user: IUser | null;
  likedMovies: string[];
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): IAuthStoreState => ({
    token: null,
    refreshToken: null,
    user: null,
    likedMovies: [],
  }),
  actions: {
    async login(username: string, password: string): Promise<void|string> {
      try {
        const body = new FormData();
        body.append('username', username);
        body.append('password', password);
        const res = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          body,
        });
        if (!res.ok) {
          throw new Error((await res.json()).detail);
        }
        const { token, refreshToken, user } = await res.json();
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = user;
        const ctx = useNuxtApp();
        ctx.$router.push('/');
      } catch(err) {
        console.error(err);
        return (err as Error).message;
      }
    },
    async register(username: string, password: string, password_verify: string): Promise<boolean> {
      try {
        const res = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, password_verify }),
        });
        if (res.ok) {
          return true;
        }
      } catch(err) {
        console.error(err);
        return false;
      }
      return false;
    },
  },
});
