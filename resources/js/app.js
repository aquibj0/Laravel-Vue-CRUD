import './bootstrap';
// import Alpine from 'alpinejs';

// window.Alpine = Alpine;

// Alpine.start();


import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import router from './src/router/index.js';

const app = createApp(App);
app.use(router);
app.mount("#app");


