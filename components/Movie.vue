<template>
  <div class="movie">
    <img :src="movie.poster">
    <div class="movie-details">
      <p class="title ellipsis">{{ movie.title }}</p>
      <div class="d-flex flex-row gap-10">
        <Icon name="ph:star" class="icon small" />
        <span>{{ movie.rating_imdb }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { MovieAPIResponse } from '~/types/types';

const props = defineProps({
  movie: {
    type: Object as PropType<MovieAPIResponse>,
    required: true,
  },
});
</script>
