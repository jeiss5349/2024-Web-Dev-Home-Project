<script setup lang="ts">
import {
    searchUser,
    addFriend
} from "@/stores/users";
import { json } from "stream/consumers";
import { ref, watch } from "vue";
import session, { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';


const userSearch = ref("");
const results = ref();
const userResult = ref();
const isOpen = ref(false);
const autoCompleted = ref(false);

watch(userSearch, async () => {

});

const Search = async () => {
    if (userSearch.value.length > 0 && !autoCompleted.value) {
        results.value = await searchUser(userSearch.value);
        if (results.value) {
            results.value = results.value
                .filter((item: any) => {
                    if (session.user)
                        return (
                            item.userName.toLowerCase() !== session.user.userName.toLowerCase() &&
                            item.userName.toLowerCase().indexOf(userSearch.value.toLowerCase()) > -1
                        );
                });
        }
        results.value = JSON.parse(JSON.stringify(results.value));
    } else {
        autoCompleted.value = false;
        isOpen.value = false;
    }
}

const OnInputChange = async (value:any) => {
   userSearch.value = value.input;
   Search();
}

const OnSelectUser = async (item: any) => {
    const user = results.value.find((d:any) => d.userName == item);
    userResult.value = [user];
}


</script>

<template>
    <main v-if="isLoggedIn()">
        <div class="container">
            <div class="columns mt-5">
                <div class="column is-3"></div>
                <div class="column">
                    <h3 class="title is-3">Friends</h3>
                    <div class="field has-addons">
                    <vue3-simple-typeahead
	                    id="typeahead_id"
	                    placeholder="Start writing..."
	                    :items="results?.length ? results.map((d:any)=>d.userName) : []"
	                    :minInputLength="1"
                        @onInput="OnInputChange($event)"
                        @selectItem="OnSelectUser"
                        >
                    </vue3-simple-typeahead>
                    </div>
                </div>
            </div>
            <div v-if="results && results.length > 0">
                <div class="table-container column is-6 mx-auto">
        <table class="table is-bordered is-striped is-fullwidth ">
          <thead>
            <tr>
              <th>Email</th>
              <th>User Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(user, index) in userResult" :key="index">
              <td> {{ user?.email }}  </td>
              <td> {{ user?.userName  }} </td>
              <td>
              <div class="buttons">
                <button @click="addFriend(session.user?._id,user._id)"  class="button is-danger is-small">Add Friend</button>
              </div>
            </td>
            </tr>
          </tbody>
        </table>
       </div> 
            </div>
            <div v-else>
                No results found
            </div>
        </div>
    </main>
    <main v-else>
        <LoginView />
    </main>
</template>

<style scoped>
.friend-item {
    display: inline-block;
    vertical-align: middle;
    margin: 1em;
}

.autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    min-height: 1rem;
    max-height: 4rem;
    width: 22rem;
    overflow: auto;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result:hover {
    background-color: #4972f9;
    color: white;
}
</style>
