<template>
  <div class="search--wrapper" :class="{ 'full-width': fullWidth }">
    <div class="icon-wrapper">
      <Icon name="iconamoon:search-bold" class="icon small" />
    </div>
    <input
      v-model="$store.search"
      :placeholder="placeholder"
      class="input search"
      @input="searchKeywords"
      @keydown.enter="search"
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  keywords: {
    type: Boolean,
    default: false,
  },
});

const $store = useStore();
const timeout = ref<NodeJS.Timeout>();

function searchKeywords() {
  if (!props.keywords) {
    return;
  }
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(async () => {
    await $store.searchKeywords();
  }, 500);
}

async function search() {
  if (props.keywords) {
    await $store.searchKeywords();
    return;
  }
  await $store.searchMovies();
}
</script>
