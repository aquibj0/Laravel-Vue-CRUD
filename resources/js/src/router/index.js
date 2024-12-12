import { createRouter, createWebHistory } from "vue-router";
import BlogIndex from "../components/BlogIndex.vue";
import BlogCreate from "../components/BlogCreate.vue";
import BlogEdit from "../components/BlogEdit.vue";
import BlogPost from "../components/BlogPost.vue";


const routes = [
    { path: "/", component: BlogIndex },
    { path: "/create", component: BlogCreate },
    { path: "/post/:id", component: BlogPost },
    { path: "/edit/:id", component: BlogEdit, props: true },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
