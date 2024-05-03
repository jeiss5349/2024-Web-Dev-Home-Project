<template>
  <main v-if="isLoggedIn()">
    <h1 class="title">Friend's Activity</h1>
    <div class="buttons">
    </div>
    <div v-if="modalActive" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Activity</p>

          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                v-model="newActivity.title"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input
                v-model="newActivity.date"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Picture</label>
            <div class="control">
              <input
                v-model="newActivity.pictureUrl"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button  class="button is-success">Save changes</button>
          <button @click="modalActive = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
    <div v-for="(activity, index) in friendsActivites" :key="index">
      <div class="columns">
        <div class="column is-1">
          <figure class="image">
            <img  :src=" activity.userPicture" />
          </figure>
        </div>
        <div class="column is-4">
          <p>
            <span class="has-text-weight-semibold">{{ session.user.firstName }}</span>
            <span class="has-text-weight-light">{{ activity.date }}</span>
          </p>
          <p>{{ activity.title }}</p>
          <figure class="image is-square">
            <img :src="activity.actPicture" />
          </figure>
        </div>
      </div>
    </div>
  </main>
  <main v-else>
    <LoginView/>
  </main>
</template>

<script setup lang="ts">
import { getFriendsActivity } from '@/stores/avtivity';
import session, { isLoggedIn } from '../stores/session'
import LoginView from './LoginView.vue';
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs';
const modalActive = ref(false)
const newActivity = ref({
  title: '',
  date: '',
  pictureUrl: ''
})
const friendsActivites = ref([])

onMounted(async () => {
  if (session.user) {
    try {
      const activities = await getFriendsActivity(session.user._id);
      friendsActivites.value = activities;
    } catch (error) {
      console.error('Error fetching user activities:', error);
    }
  }
});

function formatDate(dateString: Date) {
  const date = dayjs(dateString);
  return date.format('dddd MMMM D, YYYY');
}

</script>

<style scoped></style>
