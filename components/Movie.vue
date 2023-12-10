<template>
  <nuxt-link
    :to="`/movie/${movie.imdbID}`"
    class="movie"
    :class="{ 'z-1000': hovering }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <img :src="movie.poster" />
    <div class="movie-details">
      <p class="title ellipsis">{{ movie.title }}</p>
      <div v-if="'ratingIMDB' in movie" class="d-flex flex-row gap-10">
        <Icon name="iconamoon:star-fill" class="icon small" />
        <span class="rating">{{ movie.ratingIMDB.toFixed(1) }}</span>
      </div>
      <div v-if="'releaseYear' in movie" class="d-flex flex-row gap-10">
        <Icon name="iconamoon:calendar-2-bold" class="icon small" />
        <span class="rating">{{ movie.releaseYear }}</span>
      </div>
      <Icon v-if="$auth.likedMovies.find(m => m === movie.imdbID)" name="iconamoon:heart-fill" class="icon small" />
    </div>
    <div v-if="hovering" class="open">
      <Icon name="iconamoon:arrow-right-2-bold" class="icon large" />
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { IMovieMain, IMovieReduced } from '@/types/types';

defineProps({
  movie: {
    type: Object as PropType<IMovieReduced | IMovieMain>,
    required: true,
  },
});

const $auth = useAuthStore();
const hovering = ref(false);
</script>
