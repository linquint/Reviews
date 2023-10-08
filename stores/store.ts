import { ILandingPageRes } from '@/types/types';

interface IStoreState {
  search: string;
  landingPage: ILandingPageRes | null,
  landingPagePending: boolean;
}

export const useStore = defineStore('store', {
  state: (): IStoreState => ({
    search: '',
    landingPage: null,
    landingPagePending: false,
  }),
  actions: {
    async loadLandingPage(): Promise<void> {
      this.landingPagePending = true;
      try {
        const landingRes = await fetch('https://movies.linquint.dev/api/landing');
        this.landingPage = (await landingRes.json()) as ILandingPageRes;
      } catch(err) {
        console.error(err);
      } finally {
        this.landingPagePending = false;
      }
    },
  },
});
