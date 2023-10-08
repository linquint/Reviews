<template>
  <button type="button" class="keyword">
    {{ props.title }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
