<template>
  <button v-if="!!props.title" type="button" class="keyword d-flex gap-5 align-c" @click="emit('clicked')">
    <span>{{ props.title.replaceAll(' ', '&nbsp;') }}</span>
    <Icon v-if="props.removable" name="iconamoon:trash-simple" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  removable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([ 'clicked' ]);
</script>
