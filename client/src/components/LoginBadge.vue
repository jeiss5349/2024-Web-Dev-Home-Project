<script setup lang="ts">
    import session, { login, logout } from '../stores/session'
</script>

<template>
     <div class="navbar-item has-dropdown is-hoverable" v-if="session.user == null">
              <button class="button is-primary">
                <RouterLink to="/login"> Log in</RouterLink>
              </button>
              &nap;
              <!-- <div class="navbar-dropdown">
                <a class="navbar-item button is-light" @click="login('Jeiss', 'Varghese', true)">
                  Jeiss Varghese
                </a>
                <a class="navbar-item button is-light" @click="login('Michael', 'Phelps', false)">
                  Michael Phelps
                </a>
                <a class="navbar-item button is-light" @click="login('Serena', 'Williams', false)">
                  Serena Williams
                </a>
              </div> -->
  
        <a class="button is-primary">
          <RouterLink to="/sign-up">Sign Up</RouterLink>
        </a>
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