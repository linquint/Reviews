<template>
  <div class="main-layout">
    <nav class="navigation">
      <div>
        <div class="title--wrapper">
          <Icon name="ri:movie-2-line" class="icon large" />
          <span class="title">Movies</span>
        </div>
        <div class="nav-left">
          <nuxt-link to="/login" class="button bigger link">
            Account
          </nuxt-link>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>
