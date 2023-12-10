<template>
  <div class="main-layout">
    <nav class="navigation">
      <div>
        <nuxt-link to="/" class="title--wrapper">
          <Icon name="ri:movie-2-line" class="icon large" />
          <span class="title">Movies</span>
        </nuxt-link>
        <div class="nav-left">
          <div v-if="!!$auth.user" class="d-flex gap-10">
            <nuxt-link to="/account" class="button bigger link">
              Hi, {{ $auth.user.username }}
            </nuxt-link>
            <button type="button" class="button bigger d-flex align-c" @click="$auth.logout">
              <Icon name="iconamoon:exit" class="icon" />
            </button>
          </div>
          <nuxt-link v-else to="/login" class="button bigger link">
            Login
          </nuxt-link>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
const $auth = useAuthStore();
</script>
