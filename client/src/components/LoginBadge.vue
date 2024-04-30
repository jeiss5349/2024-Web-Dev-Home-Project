<script setup lang="ts">
    import session, { login, logout } from '../stores/session'
</script>

<template>
     <div class="navbar-item" v-if="session.user == null">
      <router-link to="sign-up" class="button is-danger">
      <strong>Sign up</strong>
      &nbsp;
    </router-link>
    <router-link to="/login" class="button is-light">Log in</router-link>
      </div>
    <div v-else>
        Welcome {{session.user.firstName}} {{session.user.lastName}}
        (<a @click="logout()">
            Log out
        </a>)
    </div>

</template>


<style scoped>
</style>