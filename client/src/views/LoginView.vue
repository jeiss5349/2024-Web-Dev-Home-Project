<script setup lang="ts">
import router from "@/router";
import { isLoggedIn } from "@/stores/session";
import { login } from "@/stores/users";
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";


let userName = ref("");
let password = ref("");

const isFormValid = computed(() => {
  return userName.value !== "" && password.value !== "";
});

const handleLogin = () => {
  if (isFormValid.value) {
    login(userName.value, password.value)
  } else {
    console.log("Please fill in all fields");
  }
};
</script>

<template>
  <!-- <div class="container-fluid"> -->
  <div class="columns mt-6">
    <div class="column is-3"></div>
    <div class="column is-6">
      <h3 class="subtitle is-3">Login</h3>
      <div class="field">
        <label class="has-text-weight-bold" for="username"
          >Username or Email</label
        >
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Username or Email"
            v-model="userName"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="has-text-weight-bold" for="password">Password</label>
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            class="button is-danger is-fullwidth has-text-weight-bold"
            @click="handleLogin"
            :disabled="!isFormValid"
          >
            <span class="is-size-5">Login</span>
          </button>
        </p>
      </div>
      <span id="secondLink"
        >Don't have an account?
        <RouterLink to="/sign-up">Sign up now!</RouterLink></span
      >
    </div>
    <div class="column is-3"></div>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}

#firstLink {
  float: left;
}

#secondLink {
  float: right;
}

button {
  border-radius: 0.7rem;
}
</style>
