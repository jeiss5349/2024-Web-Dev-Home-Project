<template>
  <main v-if="isLoggedIn()">
    <h1 class="title">My Activity</h1>

    <div class="buttons">
      <button @click="modalActive = true" class="button is-medium is-primary">Add Activity</button>
    </div>

    <div v-if="modalActive" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Activity</p>

          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input v-model="newActivity.title" class="input" type="text" placeholder="Text input" />
              <p v-if="titleError" class="help is-danger">{{ titleError }}</p>

            </div>
          </div>
          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input v-model="newActivity.date" class="input" type="date" placeholder="Date input" />
              <p v-if="dateError" class="help is-danger">{{ dateError }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Picture</label>
            <div class="control">
              <input v-model="newActivity.picture" class="input" type="text" placeholder="Text input" />
              <p v-if="pictureError" class="help is-danger">{{ pictureError }}</p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="addActivity()" class="button is-success">Save changes</button>
          <button @click="modalActive = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
    <!-- <div v-if="session.user?.firstName == 'Jeiss'">
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
    </div>
    <div v-if="session.user?.firstName == 'Serena'">
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
    </div>
    <div v-if="session.user?.firstName == 'Michael'">
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
    </div> -->
    <div v-for="(activity, index) in userActivities" :key="index">
      <div class="columns">
        <!-- <div class="column is-1">
          <figure v-if="session.user?.firstName == 'Michael'" class="image">
            <img src="../assets/Michael.jpg" />
          </figure>
          <figure v-else-if="session.user?.firstName == 'Serena'" class="image">
            <img src="../assets/SerenaPic1.jpg" />
          </figure>
          <figure v-if="session.user?.firstName == 'Jeiss'" class="image">
            <img src="../assets/Jeiss.jpg" />
          </figure>
        </div> -->
        <div class="column is-4">
          <p>
            <span class="has-text-weight-semibold">{{ session.user?.userName }}</span>
            <span class="has-text-weight-light">{{ formatDate(activity.date) }}</span>
          </p>
          <p>{{ activity.title }}</p>
          <figure class="image is-square">
            <img :src="activity.picture" />
          </figure>
        </div>
      </div>
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<script setup lang="ts">
import session, { isLoggedIn } from '../stores/session'
import LoginView from './LoginView.vue';
import { ref, computed, onMounted } from 'vue'
import { getUserActivity, addUserActivity } from "@/stores/avtivity";
import dayjs from 'dayjs';

const modalActive = ref(false)
const newActivity = ref({
  title: '',
  date: '',
  picture: ''
});

const titleError = ref('');
const dateError = ref('');
const pictureError = ref('');

const userActivities = ref();

const closeModal = () => {
  modalActive.value = false;
  resetForm();
};

const resetForm = () => {
  newActivity.value.title = '';
  newActivity.value.date = '';
  newActivity.value.picture = '';
};

onMounted(async () => {
  if (session.user) {
    try {
      const activities = await getUserActivity(session.user._id);
      userActivities.value = activities;
    } catch (error) {
      console.error('Error fetching user activities:', error);
    }
  }
});

const addActivity = async () => {
  let isValid = true;
    if (!newActivity.value.title) {
        titleError.value = 'Please enter a title';
        isValid = false;
    }
    if (!newActivity.value.date) {
        dateError.value = 'Please select a date';
        isValid = false;
    }
    if (!newActivity.value.picture) {
        pictureError.value = 'Please enter a picture URL';
        isValid = false;
    }

    if (!isValid) {
        return;
    }
    addUserActivity({
      title: newActivity.value.title,
      date: new Date(newActivity.value.date) ?? new Date(),
      picture: newActivity.value.picture,
      userId: session.user._id
    }).then(async (res)  => {
      userActivities.value = await getUserActivity(session.user._id);
    });
    closeModal();
};

function formatDate(dateString: Date) {
  const date = dayjs(dateString);
  return date.format('dddd MMMM D, YYYY');
}
</script>

<style scoped></style>
