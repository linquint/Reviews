import { defineStore } from 'pinia';
import { IKeywordWithUsage, IMovieReduced, IUser } from '~/types/types';

interface IAuthStoreState {
  token: string | null;
  refreshToken: string | null;
  user: IUser | null;
  likedMovies: string[];
  recommendationsPending: boolean;
  profilePending: boolean;
  recommendations: IMovieReduced[];
  profile: {
    movies: IMovieReduced[];
    keywords: IKeywordWithUsage[]
  }
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): IAuthStoreState => ({
    token: null,
    refreshToken: null,
    user: null,
    likedMovies: [],
    recommendationsPending: false,
    profilePending: false,
    recommendations: [],
    profile: {
      movies: [],
      keywords: [],
    },
  }),
  actions: {
    setRefreshToken(refreshToken: string | null): void {
      this.refreshToken = refreshToken;
      const cookie = useCookie('refreshToken', {
        path: '/',
        expires: new Date(+new Date() + 1000 * 60 * 60 * 24 * 30),
      });
      cookie.value = refreshToken;
    },
    async login(username: string, password: string): Promise<void|string> {
      try {
        const body = new FormData();
        body.append('username', username);
        body.append('password', password);
        const res = await fetch('https://movies.linquint.dev/api/login', {
          method: 'POST',
          body,
        });
        if (!res.ok) {
          throw new Error((await res.json()).detail);
        }
        const cookieToken = useCookie('token', {
          path: '/',
          expires: new Date(+new Date() + 1000 * 60 * 60 + 1000 * 60 * 60 * 3),
        });
        const cookieRefresh = useCookie('refreshToken', {
          path: '/',
          expires: new Date(+new Date() + 1000 * 60 * 60 * 24 * 30),
        });
        const { access_token, refresh_token, user } = await res.json();
        this.token = access_token;
        this.refreshToken = refresh_token;
        this.user = user;
        cookieToken.value = access_token;
        cookieRefresh.value = refresh_token;
        await this.getLikedMovies();

        const ctx = useNuxtApp();
        ctx.$router.push('/');
      } catch(err) {
        console.error(err);
        return (err as Error).message;
      }
    },
    async register(username: string, password: string, passwordVerify: string): Promise<string> {
      try {
        const res = await fetch('https://movies.linquint.dev/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, passwordVerify }),
        });
        if (!res.ok) {
          throw new Error((await res.json()).detail);
        }
        return '';
      } catch (err) {
        console.error(err);
        return (err as Error).message;
      }
    },
    async refresh(): Promise<void> {
      try {
        const res = await fetch('https://movies.linquint.dev/api/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: this.refreshToken || '' }),
        });
        if (!res.ok) {
          throw new Error((await res.json()).detail);
        }
        const cookieToken = useCookie('token');
        const { access_token, user } = await res.json();
        this.token = access_token;
        this.user = user;
        cookieToken.value = access_token;
      } catch(err) {
        this.token = null;
        this.refreshToken = null;
        this.user = null;
        console.error(err);
      }
    },
    async logout(): Promise<void> {
      this.token = null;
      this.refreshToken = null;
      this.user = null;
      useCookie('token').value = null;
      useCookie('refreshToken').value = null;
      const ctx = useNuxtApp();
      ctx.$router.push('/');
    },
    async getLikedMovies(): Promise<void> {
      try {
        const res = await fetch('https://movies.linquint.dev/api/likes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail);
        }
        this.likedMovies = data.likes as string[];
      } catch(err) {
        console.error(err);
      }
    },
    async likeMovie(movieId: string): Promise<void> {
      try {
        const res = await fetch(`https://movies.linquint.dev/api/movies/like/${movieId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail);
        }
        this.likedMovies = data.likes as string[];
      } catch(err) {
        console.error(err);
      }
    },
    async dislikeMovie(movieId: string): Promise<void> {
      try {
        const res = await fetch(`https://movies.linquint.dev/api/movies/dislike/${movieId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error((await res.json()).detail);
        }
        this.likedMovies = data.likes as string[];
      } catch(err) {
        console.error(err);
      }
    },
    async getRecommendations(): Promise<void> {
      if (this.recommendationsPending) {
        return;
      }
      this.recommendationsPending = true;
      try {
        const res = await fetch('https://movies.linquint.dev/api/recommendations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail);
        }
        this.recommendations = data.recommendations as IMovieReduced[];
      } catch(err) {
        console.error(err);
      } finally {
        this.recommendationsPending = false;
      }
    },
    async getProfile(): Promise<void> {
      if (this.profilePending) {
        return;
      }
      this.profilePending = true;
      try {
        const res = await fetch('https://movies.linquint.dev/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail);
        }
        this.profile.movies = data.movies as IMovieReduced[];
        this.profile.keywords = data.keywords as IKeywordWithUsage[];
      } catch (err) {
        console.error(err);
      } finally {
        this.profilePending = false;
      }
    },
  },
});
