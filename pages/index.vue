<template>
  <div class="home">
    <main>
      <template v-if="!store.landingPage || store.landingPagePending">
        Loading....
      </template>
      <template v-else>
        <h2>Recommended movies</h2>
        <div></div>

        <h2>Keywords</h2>
        <h3>Popular</h3>
        <div class="keyword--list">
          <Keyword v-for="keyword, id in store.landingPage?.keywords.top || []" :key="`pop-keyword-${id}`" :title="keyword.word" />
        </div>
        <h3>Personal</h3>
        <div></div>

        <h2>Discover new movies</h2>
        <div class="movie--list">
          <Movie v-for="movie, id in store.landingPage?.movies || []" :key="`discover-${id}`" :movie="movie" />
        </div>
      </template>
    </main>
  </div>
</template>

<script lang="ts" setup>
const store = useStore();
const screenWidth = ref(0);

onMounted(async () => {
  window.addEventListener('resize', resize);
  await store.loadLandingPage();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
});

function resize() {
  screenWidth.value = window.innerWidth;
}
</script>
