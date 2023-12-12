import { IKeyword, ILandingPageRes, IMovieReduced, IMovieSearchRes } from '@/types/types';

interface IStoreState {
  search: string;
  landingPage: ILandingPageRes | null,
  landingPagePending: boolean;
  searchResults: IMovieSearchRes | null;
  searchResultsPending: boolean;
  moreResultsPending: boolean;
  searchPage: number;
  keywordsPage: number;
  keywordsPending: boolean;
  keywords: IKeyword[];
  selectedKeywords: IKeyword[];
  moviesByKeywords: IMovieReduced[];
}

export const useStore = defineStore('store', {
  state: (): IStoreState => ({
    search: '',
    landingPage: null,
    landingPagePending: false,
    searchResults: null,
    searchResultsPending: false,
    moreResultsPending: false,
    searchPage: 1,
    keywordsPage: 1,
    keywordsPending: false,
    keywords: [],
    selectedKeywords: [],
    moviesByKeywords: [],
  }),
  actions: {
    async loadLandingPage(): Promise<void> {
      this.landingPagePending = true;
      try {
        const landingRes = await fetch('https://movies.linquint.dev/api/home');
        this.landingPage = (await landingRes.json()) as ILandingPageRes;
      } catch(err) {
        console.error(err);
      } finally {
        this.landingPagePending = false;
      }
    },
    async searchMovies(): Promise<void> {
      this.searchResultsPending = true;
      try {
        const searchRes = await fetch(`https://movies.linquint.dev/api/search/${this.search}/${this.searchPage}`);
        this.searchResults = (await searchRes.json()) as IMovieSearchRes;
      } catch(err) {
        console.error(err);
      } finally {
        this.searchResultsPending = false;
      }
    },
    async searchKeywords(): Promise<void> {
      if (!this.search || this.keywordsPending) {
        return;
      }
      this.keywordsPending = true;
      try {
        const searchRes = await fetch(`https://movies.linquint.dev/api/keywords/autocomplete?query=${this.search}`);
        this.keywords = (await searchRes.json()) as IKeyword[];
      } catch(err) {
        console.error(err);
      } finally {
        this.keywordsPending = false;
      }
    },
    async searchMoviesByKeywords(): Promise<void> {
      if (!this.selectedKeywords.length || this.searchResultsPending) {
        return;
      }
      this.searchResultsPending = true;
      try {
        const searchRes = await fetch(`https://movies.linquint.dev/api/keywords/${this.keywordsPage}?${this.selectedKeywords.map(k => `keywords=${k.word}`).join('&')}`);
        this.moviesByKeywords = (await searchRes.json()) as IMovieReduced[];
      } catch(err) {
        console.error(err);
      } finally {
        this.searchResultsPending = false;
      }
    },
    async loadMoreSearchResults(): Promise<void> {
      if (this.moreResultsPending) {
        return;
      }
      this.moreResultsPending = true;
      this.searchPage++;
      try {
        const searchRes = await fetch(`https://movies.linquint.dev/api/search/${this.searchResults!.query}/${this.searchPage}`);
        const searchResults = (await searchRes.json()) as IMovieSearchRes;
        this.searchResults!.search.push(...searchResults.search);
      } catch(err) {
        console.error(err);
      } finally {
        this.moreResultsPending = false;
      }
    },
    async loadMoreKeywordResults(): Promise<void> {
      if (this.moreResultsPending) {
        return;
      }
      this.moreResultsPending = true;
      this.keywordsPage++;
      try {
        const searchRes = await fetch(`https://movies.linquint.dev/api/keywords/${this.keywordsPage}?${this.selectedKeywords.map(k => `keywords=${k.word}`).join('&')}`);
        const searchResults = (await searchRes.json()) as IMovieReduced[];
        this.moviesByKeywords.push(...searchResults);
      } catch(err) {
        console.error(err);
      } finally {
        this.moreResultsPending = false;
      }
    },
  },
});
