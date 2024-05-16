import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "bulma";
import "./assets/main.scss";
import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(SimpleTypeahead)

app.mount('#app')
