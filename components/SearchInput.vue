<template>
  <div class="search--wrapper">
    <div class="icon-wrapper">
      <Icon name="iconamoon:search-bold" class="icon small" />
    </div>
    <input v-model="store.search" class="input search">
  </div>
</template>

<script lang="ts" setup>
const store = useStore();
</script>
