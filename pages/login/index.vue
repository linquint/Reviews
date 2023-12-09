<template>
  <div class="login">
    <h1>Please login or register</h1>

    <div class="d-flex flex-row gap-20 align-c justify-c">
      <button type="button" class="button bigger w-13" :class="{ 'inactive': !loginForm }" @click="loginForm = true">Login</button>
      <span class="login--or">or</span>
      <button type="button" class="button bigger w-13" :class="{ 'inactive': loginForm }" @click="loginForm = false">Register</button>
    </div>

    <form class="login--form mt-20" @submit.prevent="">
      <label for="username">Username</label>
      <div class="search--wrapper full-width">
        <div class="icon-wrapper">
          <Icon name="iconamoon:profile-fill" class="icon small" />
        </div>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Username"
          class="input search"
          required
        >
      </div>

      <label for="password">Password</label>
      <div class="search--wrapper full-width">
        <div class="icon-wrapper">
          <Icon name="iconamoon:shield-bold" class="icon small" />
        </div>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          class="input search"
          required
        >
      </div>

      <template v-if="!loginForm">
        <label for="passwordVerify">Confirm password</label>
        <div class="search--wrapper full-width">
          <div class="icon-wrapper">
            <Icon name="iconamoon:shield-bold" class="icon small" />
          </div>
          <input
            id="passwordVerify"
            v-model="passwordVerify"
            type="password"
            placeholder="passwordVerify"
            class="input search"
            required
          >
        </div>
      </template>

      <button v-if="loginForm" type="submit" class="button bigger" @click.prevent="login">Login</button>
      <button v-else type="submit" class="button bigger" @click.prevent="register">Register</button>

      <div v-if="!!error" class="error">
        <span>{{ error }}</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const $auth = useAuthStore();
const username = ref('');
const password = ref('');
const passwordVerify = ref('');
const loginForm = ref(true);
const error = ref('');

async function login() {
  const res = await $auth.login(username.value, password.value);
  if (res) {
    error.value = res;
  }
}

async function register() {
  const res = await $auth.register(username.value, password.value, passwordVerify.value);
  if (res) {
    loginForm.value = true;
    error.value = 'You can now login';
  }
}
</script>
