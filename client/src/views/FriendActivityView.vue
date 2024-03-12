<template>
  <main v-if="isLoggedIn()">
    <h1 class="title">Friend's Activity</h1>
    <div class="buttons">
      <button @click="modalActive = true" class="button is-medium is-primary">Add Activity</button>
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
          <button @click="addActivity()" class="button is-success">Save changes</button>
          <button @click="modalActive = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
    <div v-for="(activity, index) in friendsActivites" :key="index">
      <div class="columns">
        <div class="column is-1">
          <figure v-if="session.user?.firstName == 'Michael'" class="image">
            <img src="../assets/Michael.jpg" />
          </figure>
          <figure v-else-if="session.user?.firstName == 'Serena'" class="image">
            <img src="../assets/SerenaPic1.jpg" />
          </figure>
          <figure v-if="session.user?.firstName == 'Jeiss'" class="image">
            <img src="../assets/Jeiss.jpg" />
          </figure>
        </div>
        <div class="column is-4">
          <p>
            <span class="has-text-weight-semibold">{{ session.user.firstName }}</span>
            <span class="has-text-weight-light">{{ activity.date }}</span>
          </p>
          <p>{{ activity.title }}</p>
          <figure class="image is-square">
            <img :src="activity.pictureUrl" />
          </figure>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-1">
        <figure class="image">
          <img src="../assets/Jeiss.jpg" />
        </figure>
      </div>
      <div class="column is-4">
        <p>
          <span class="has-text-weight-semibold">Jeiss Varghese</span>
          <span class="has-text-weight-light">Thursday, October 20, 2022</span>
        </p>
        <p>Playing Chess</p>
        <figure class="image is-square">
          <img src="../assets/JeissPic1.jpg" />
        </figure>
      </div>
    </div>
    <div class="columns">
      <div class="column is-1">
        <figure class="image">
          <img src="../assets/Serena.jpg" />
        </figure>
      </div>
      <div class="column is-4">
        <p>
          <span class="has-text-weight-semibold">Serena Williams</span>
          <span class="has-text-weight-light">Sunday, October 23, 2022</span>
        </p>
        <p>Did some Weights</p>
        <figure class="image is-square">
          <img src="../assets/SerenaPic1.jpg" />
        </figure>
      </div>
    </div>
    <div class="columns">
      <div class="column is-1">
        <figure class="image">
          <img src="../assets/Michael.jpg" />
        </figure>
      </div>
      <div class="column is-4">
        <p>
          <span class="has-text-weight-semibold">Michael Phelps</span>
          <span class="has-text-weight-light">Saturday, October 22, 2022</span>
        </p>
        <p>Swimming</p>
        <figure class="image is-square">
          <img src="../assets/MichaelPic1.jpg" />
        </figure>
      </div>
    </div>
  </main>
  <main v-else>
    <h1 class="title">User needs to Login</h1>
  </main>
</template>

<script setup lang="ts">
import session, { isLoggedIn } from '../stores/session'
import { ref, computed } from 'vue'
const modalActive = ref(false)
const newActivity = ref({
  title: '',
  date: '',
  pictureUrl: ''
})
const friendsActivites = ref([])
const addActivity = () => {
  friendsActivites.value.push({
    title: newActivity.value.title,
    date: newActivity.value.date,
    pictureUrl: newActivity.value.pictureUrl
  })
  console.log(friendsActivites);
  newActivity.value.title = ''
  newActivity.value.date = ''
  newActivity.value.pictureUrl = ''
  modalActive.value = false
}
</script>

<style scoped></style>
