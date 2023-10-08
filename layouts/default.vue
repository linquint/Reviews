<template>
  <div class="main-layout">
    <nav class="navigation">
      <div>
        <div class="title--wrapper">
          <Icon name="ri:movie-2-line" class="icon large" />
          <span class="title">Movies Reviews</span>
        </div>
        <div class="nav-left">
          <SearchInput />
          <button type="button" class="button bigger">
            Log in
          </button>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>
