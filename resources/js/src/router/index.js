import { createRouter, createWebHistory } from "vue-router";
import BlogIndex from "../components/BlogIndex.vue";
import BlogCreate from "../components/BlogCreate.vue";
import BlogEdit from "../components/BlogEdit.vue";
import BlogPost from "../components/BlogPost.vue";
import HomeView from "../views/Home.vue"
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },

    {
        path: "/login",
        name: "login",
        component: Login,
    },

    {
        path: "/register",
        name: "register",
        component: Register,
    },

    { path: "/create", component: BlogCreate },
    { path: "/post/:id", component: BlogPost },
    { path: "/edit/:id", component: BlogEdit, props: true },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
