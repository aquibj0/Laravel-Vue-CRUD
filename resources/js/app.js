import { createApp } from "vue";
import App from "./App.vue";
import router from './src/router/index.js';
import BlogIndex from "./src/components/BlogIndex.vue";
import PrimaryButton from "./src/components/PrimaryButton.vue";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";


const app = createApp(App);
app.component('BlogIndex', BlogIndex);
app.component("primary-button", PrimaryButton);

app.use(router);
app.use(Toast);
app.mount("#app");


