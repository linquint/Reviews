<template>
  <div class="home">
    <main>
      <h2>Recommendations</h2>
      <div v-if="$auth.likedMovies.length < 5">
        <h3>
          You need to have at least 5 liked movies to get recommendations.
        </h3>
      </div>
      <div v-else class="movie--list">
        <div v-if="$auth.recommendationsPending">
          <Spinner />
        </div>
        <template v-else>
          <Movie
            v-for="movie in $auth.recommendations"
            :key="`movie-${movie.id}`"
            :movie="movie"
          />
        </template>
      </div>

      <h1>Profile</h1>
      <Spinner v-if="$auth.profilePending" />
      <template v-else-if="!!$auth.profile">
        <h2>Favourite keywords</h2>
        <div class="keyword--list">
          <Keyword
            v-for="keyword, id in $auth.profile.keywords || []"
            :key="`keyword-${id}`"
            :title="keyword.word"
          />
        </div>
        <h2>Liked movies</h2>
        <div class="movie--list">
          <Movie
            v-for="movie in $auth.profile.movies || []"
            :key="`movie-${movie.id}`"
            :movie="movie"
          />
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
const $auth = useAuthStore();

onMounted(async () => {
  const promises: Promise<void>[] = [
    $auth.getProfile(),
  ];
  if ($auth.likedMovies.length >= 5) {
    promises.push($auth.getRecommendations());
  }
  await Promise.all(promises);
});
</script>
