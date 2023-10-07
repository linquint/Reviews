<template>
  <div class="home">
    <main>
      <h1>Yaah</h1>
      <pre>{{ store.search }}</pre>
    </main>
  </div>
</template>

<script lang="ts" setup>
const store = useStore();

onMounted(() => {
  console.log('allo');
});
</script>
