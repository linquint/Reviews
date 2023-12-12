<template>
  <div class="home">
    <main>
      <SearchInput fullWidth placeholder="Movie search" />
      <div class="d-flex gap-20 align-c justify-sb flex-wrap">
        <nuxt-link to="/keywords" type="button" class="button bigger link">
          Search by keywords
        </nuxt-link>
        <div v-if="!$store.searchResults" />
        <button v-else type="button" class="button bigger" @click="clear">
          Reset search
        </button>
      </div>

      <template v-if="$store.searchResultsPending || $store.landingPagePending">
        <Spinner />
      </template>
      <template v-else>
        <template v-if="!$store.searchResults">
          <h2>Keywords</h2>
          <h3>Popular</h3>
          <div class="keyword--list">
            <Keyword v-for="keyword, id in $store.landingPage?.top || []" :key="`pop-keyword-${id}`" :title="keyword.word" />
          </div>

          <h3>Random</h3>
          <div class="keyword--list">
            <Keyword v-for="keyword, id in $store.landingPage?.random || []" :key="`rand-keyword-${id}`" :title="keyword.word" />
          </div>

          <h2>Discover new movies</h2>
          <div class="movie--list">
            <Movie v-for="movie, id in $store.landingPage?.movies || []" :key="`discover-${id}`" :movie="movie" />
          </div>
        </template>

        <template v-else>
          <div class="d-flex flex-row align-c gap-10 mt-10">
            <h2>Search results</h2>
            <span class="results">{{ $store.searchResults.count || 0 }} results</span>
          </div>
          <div v-if="($store.searchResults.search || []).length > 0" class="movie--list">
            <Movie v-for="movie, id in $store.searchResults.search || []" :key="`search-${id}`" :movie="movie" />
          </div>
          <div v-else>
            <p class="no-results">No results found.</p>
          </div>
          <div v-if="$store.searchResults.count > ($store.searchResults?.search || []).length" class="d-flex flex-row justify-c mt-20">
            <Spinner v-if="$store.moreResultsPending" />
            <button v-else type="button" class="button" @click="$store.loadMoreSearchResults()">
              Load more
            </button>
          </div>
        </template>
      </template>
    </main>
  </div>
</template>

<script lang="ts" setup>
const $store = useStore();
const screenWidth = ref(0);

onMounted(async () => {
  window.addEventListener('resize', resize);
  if (!$store.landingPage) {
    await $store.loadLandingPage();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
});

function resize() {
  screenWidth.value = window.innerWidth;
}

function clear() {
  $store.search = '';
  $store.searchResults = null;
  $store.searchPage = 1;
}
</script>
