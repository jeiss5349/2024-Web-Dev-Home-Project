<template>

    <main v-if="session.user?.adminUser && isLoggedIn()">
      <div class="column has-text-centered">
        <h1 class="title is-1">Admin Page</h1>
    </div>
      
      <div class="buttons is-centered ">
        
          <button class="button is-medium is-primary">Add</button>
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
          <tbody>
            <tr>
              <td> Jeiss </td>
              <td> Varghese </td>
              <td> True</td>
              <td>
                <div class="control">
                    <input type="radio" name="answer">
                  </div>
              </td>
            </tr>
          </tbody>  
          <tbody>
            <tr>
              <td> Micheal  </td>
              <td> Phelps </td>
              <td> False </td>
              <td>
                <div class="control">
                    <input type="radio" name="answer">
                  </div>
              </td>
            </tr>
          </tbody>  
          <tbody>
            <tr>
              <td> Serena </td>
              <td> Williams </td>
              <td> False </td>
              <td>
                <div class="control">
                    <input type="radio" name="answer">
                  </div>
              </td>
            </tr>
          </tbody>  
        </table>
       </div> 
    </main>
    <main v-else>
      <LoginView/>
  
      </main>
  </template>
  
  <script setup lang="ts">
  import session, { isLoggedIn } from '../stores/session';
  import LoginView from './LoginView.vue';
  </script>
  
  <style scoped>
  
  </style>