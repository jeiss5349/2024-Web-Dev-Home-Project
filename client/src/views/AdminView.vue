<template>

    <main v-if="isAdmin()">
      <div class="column has-text-centered">
        <h1 class="title is-1">Admin Page</h1>
    </div>
      
      <div class="buttons is-centered ">
        
          <button  @click="modalActive = true" class="button is-medium is-primary">Add</button>
          <button class="button is-medium is-link">Edit</button>
        </div>
        <div class="table-container column is-6 mx-auto">
        <table class="table is-bordered is-striped is-fullwidth ">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Is Admin</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(user, index) in users" :key="index">
              <td> {{ user?.firstName }}  </td>
              <td> {{ user?.lastName  }} </td>
              <td> {{ user.isAdmin  }} </td>
              <td>
                <div class="control">
                    <input type="radio" name="answer">
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
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
            <label class="label">First Name</label>
            <div class="control">
              <input v-model="newUser.firstName" class="input" type="text" placeholder="Text input" />
              <p v-if="firstNameError" class="help is-danger">{{ firstNameError }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input v-model="newUser.lastName" class="input" type="text" placeholder="Text input" />
              <p v-if="lastNameError" class="help is-danger">{{ lastNameError }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Picture</label>
            <div class="control">
              <input v-model="newUser.profilePicture" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="newUser.email" class="input" type="text" placeholder="Text input" />
              <p v-if="emailError" class="help is-danger">{{ emailError }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">User Name</label>
            <div class="control">
              <input v-model="newUser.userName" class="input" type="text" placeholder="Text input" />
              <p v-if="userNameError" class="help is-danger">{{ userNameError }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="newUser.password" class="input" type="text" placeholder="Text input" />
              <p v-if="passwordError" class="help is-danger">{{ passwordError }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Is Admin</label>
            <div class="control">
              <input type="checkbox" v-model="newUser.isAdmin">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="addUsers()" class="button is-success">Save changes</button>
          <button @click="modalActive = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
    </main>
    <main v-else>
     <p>You don`t have access to this Page Please Login with Admin Account</p>
  
      </main>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
import session, { isLoggedIn , isAdmin } from '../stores/session';
  import LoginView from './LoginView.vue';
import { getUsers , createUser } from '@/stores/users';
  
  const users = ref();
  const modalActive = ref(false);
  const newUser = ref({
  firstName: '',
  lastName: '',
  profilePicture: '',
  userName :'',
  email : '',
  password : '',
  isAdmin : false
});

const firstNameError = ref('');
const lastNameError = ref('');
const userNameError = ref('');
const emailError = ref('');
const passwordError = ref('');

  onMounted(async () => {
  if (session.user) {
    try {
      const usersData = await getUsers();
      users.value = usersData;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
});

const addUsers = async () => {
  let isValid = true;
    if (!newUser.value.firstName) {
        firstNameError.value = 'Please enter first name';
        isValid = false;
    }
    if (!newUser.value.lastName) {
        lastNameError.value = 'Please enter last name';
        isValid = false;
    }
    if (!newUser.value.email) {
        emailError.value = 'Please enter email address';
        isValid = false;
    }
    if (!newUser.value.userName) {
        userNameError.value = 'Please enter user name';
        isValid = false;
    }
    if (!newUser.value.password) {
        passwordError.value = 'Please enter password';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

  createUser(newUser.value).then(async(res) => {
    if(res){
      const usersData = await getUsers();
      users.value = usersData;
    }
    modalActive.value = false;
    resetForm();
  });
}

  const resetForm = () => {
    newUser.value.firstName = '';
    newUser.value.lastName = '';
    newUser.value.email = '';
    newUser.value.password = '';
    newUser.value.userName = '';
    newUser.value.isAdmin = false;
    firstNameError.value = '';
    lastNameError.value = '';
    userNameError.value = '';
    emailError.value = '';
    passwordError.value = '';
  };


  </script>
  
  <style scoped>
  
  </style>