<template>
  <div class="home">
    <main>
      <SearchInput fullWidth placeholder="Keyword search" keywords />
      <div class="d-flex gap-20 align-c justify-sb flex-wrap">
        <nuxt-link to="/" type="button" class="button bigger link">
          Search by query
        </nuxt-link>
        <div v-if="$store.moviesByKeywords.length === 0" />
        <button v-else type="button" class="button bigger" @click="clear">
          Reset search
        </button>
      </div>

      <Spinner v-if="$store.keywordsPending" />
      <div v-else class="d-flex flex-row gap-10 flex-wrap">
        <Keyword
          v-for="keyword, id in availableKeywords || []"
          :key="`keyword-${id}`"
          :title="keyword.word"
          append
          @clicked="addToSearch(keyword)"
        />
      </div>

      <h3>Selected keywords</h3>
      <div class="d-flex flex-row gap-10 flex-wrap">
        <Keyword
          v-for="keyword, id in $store.selectedKeywords || []"
          :key="`selected-${id}`"
          :title="keyword.word"
          removable
          @clicked="removeFromSearch(keyword)"
        />
      </div>

      <template v-if="$store.searchResultsPending">
        <Spinner />
      </template>
      <template v-else-if="$store.selectedKeywords.length > 0">
        <div class="d-flex flex-row align-c gap-10 mt-30">
          <h2>Search results</h2>
          <span class="results">{{ $store.moviesByKeywords.length }} results</span>
        </div>
        <div v-if="($store.moviesByKeywords || []).length > 0" class="movie--list">
          <Movie v-for="movie, id in $store.moviesByKeywords || []" :key="`search-${id}`" :movie="movie" />
        </div>
        <div v-else>
          <p class="no-results">No results found.</p>
        </div>
        <div v-if="$store.moviesByKeywords.length >= $store.keywordsPage * 12" class="d-flex flex-row justify-c mt-20">
          <Spinner v-if="$store.moreResultsPending" />
          <button v-else type="button" class="button" @click="$store.loadMoreKeywordResults()">
            Load more
          </button>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { IKeyword } from '~/types/types';

const $store = useStore();

const availableKeywords = computed(() => {
  return $store.keywords.filter((k) => !$store.selectedKeywords.find((sk) => sk.id === k.id));
});

onMounted(() => {
  $store.search = '';
});

async function addToSearch(keyword: IKeyword) {
  $store.selectedKeywords.push(keyword);
  await $store.searchMoviesByKeywords();
}

async function removeFromSearch(keyword: IKeyword) {
  $store.selectedKeywords = $store.selectedKeywords.filter((k) => k.id !== keyword.id);
  await $store.searchMoviesByKeywords();
}

function clear() {
  $store.keywords = [];
  $store.selectedKeywords = [];
  $store.moviesByKeywords = [];
  $store.search = '';
  $store.keywordsPage = 1;
}
</script>
