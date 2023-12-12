<template>
  <div class="home">
    <main class="no-background">
      <div v-if="!movie">
        <Spinner />
      </div>
      <div v-else class="movie--inner">
        <div class="header">
          <img
            class="poster"
            :src="movie.poster.replace('SX300', 'SX720')"
            :alt="movie.title"
          />
          <div class="details">
            <p class="title">{{ movie.title }}</p>

            <div class="d-flex gap-10 flex-wrap tagline">
              <span>{{ movie.genres?.replaceAll(", ", " / ") }}</span>
              |
              <span>{{ runtime }}</span>
              |
              <span>{{ movie.releaseYear }}</span>
            </div>

            <div class="d-flex flex-row gap-40 flex-wrap align-c">
              <div class="d-flex flex-row gap-10">
                <div class="rating-circle" :style="`border-color: ${ratingColor}`">
                  <p class="rating" :style="`color: ${ratingColor}`">
                    {{ movie.ratingIMDB }}
                  </p>
                </div>
                <div class="tagline d-flex flex-col gap-5 justify-c">
                  <span class="fs-20">IMDB Rating</span>
                  <span class="fs-16 weight-200">{{ votesSimplified }}</span>
                </div>
              </div>

              <button
                v-if="!!$auth.user"
                type="button"
                class="button like-btn"
                :class="{ 'dislike': likedStatus && likeBtnHover }"
                @mouseover="likeBtnHover = true"
                @mouseleave="likeBtnHover = false"
                @click="toggleLike"
              >
                <template v-if="!likedStatus">
                  <Icon name="iconamoon:heart-bold" class="icon large" />
                  <span class="fs-20">Add</span>
                </template>
                <template v-else-if="!likeBtnHover">
                  <Icon name="iconamoon:heart-fill" class="icon large" />
                  <span class="fs-20">Added</span>
                </template>
                <template v-else>
                  <Icon name="iconamoon:heart-off" class="icon large" />
                  <span class="fs-20">Remove</span>
                </template>
              </button>
              <nuxt-link v-else to="/login" class="button like-btn link">
                <span class="fs-20">Login</span>
              </nuxt-link>
            </div>

            <p v-if="movie.directors" class="tagline fs-18">Directed by {{ movie.directors }}</p>
            <p v-if="movie.actors" class="tagline fs-18">Actors: {{ movie.actors }}</p>
          </div>
        </div>

        <section class="mt-30">
          <h3>Plot summary</h3>
          <p class="plot fs-16">{{ movie.plot }}</p>
        </section>

        <section class="mt-30">
          <h3>Keywords</h3>
          <div class="keyword--list">
            <Keyword
              v-for="keyword, id in movie.keywords || []"
              :key="`keyword-${id}`"
              :title="keyword"
            />
          </div>
        </section>

        <section class="mt-30">
          <h3>User reviews</h3>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import { IMovieFull } from '~/types/types';

const $route = useRoute();
const $auth = useAuthStore();

const movie = ref<IMovieFull>();
const likeBtnHover = ref(false);

const runtime = computed(() => {
  if (!movie.value?.runtime) {
    return 0;
  }
  return Math.floor(movie.value.runtime / 60) + 'h ' + (movie.value.runtime % 60) + 'm';
});

const ratingColor = computed(() => {
  if (!movie.value?.ratingIMDB) {
    return '';
  }
  const rating = movie.value.ratingIMDB;
  if (rating >= 9) {
    return '#9BFF7A';
  } else if (rating >= 7.5) {
    return '#D1FF84';
  } else if (rating >= 6) {
    return '#FFF099';
  } else if (rating >= 4) {
    return '#FFD299';
  } else {
    return '#FFA2A2';
  }
});

const likedStatus = computed(() => {
  if (!movie.value?.imdbID) {
    return false;
  }
  return $auth.likedMovies.find(likedID => likedID === movie.value!.imdbID) === movie.value.imdbID;
});

const votesSimplified = computed(() => {
  if (!movie.value?.imdbVotes) {
    return '0 votes';
  }
  const votes = movie.value.imdbVotes;
  if (votes >= 1_000_000) {
    return `${(votes / 1000000).toFixed(1)}m votes`;
  }
  if (votes >= 100_000) {
    return `${Math.round(votes / 1000)}k votes`;
  }
  if (votes >= 10_000) {
    return `${(votes / 1000).toFixed(1)}k votes`;
  }
  return `${votes} votes`;
});

onMounted(async () => {
  try {
    const id = $route.params.id;
    if (id) {
      const response = await fetch(`https://movies.linquint.dev/api/movie/${id}`);
      movie.value = (await response.json()) as IMovieFull;
    }
  } catch (error) {
    console.error(error);
  }
});

async function toggleLike() {
  if (!movie.value?.imdbID) {
    return;
  }
  if (!likedStatus.value) {
    await $auth.likeMovie(movie.value.imdbID);
  } else {
    await $auth.dislikeMovie(movie.value.imdbID);
  }
}
</script>
