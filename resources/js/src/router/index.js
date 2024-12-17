import { createRouter, createWebHistory } from "vue-router";
// import { isAuthenticated } from "../../auth";
import BlogIndex from "../components/BlogIndex.vue";
import BlogCreate from "../components/BlogCreate.vue";
import BlogEdit from "../components/BlogEdit.vue";
import BlogPost from "../components/BlogPost.vue";
import HomeView from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import NotFound from "../views/Error/404.vue";
import Dashboard from "../views/User/Dashboard.vue";
import { useToast } from "vue-toastification";

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
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true}
    },
    { path: "/create", component: BlogCreate },
    { path: "/post/:id", component: BlogPost },
    { path: "/edit/:id", component: BlogEdit, props: true },

    {
        path: "/:catchAll(.*)",
        name: "not-found",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


// Global navigation guard
router.beforeEach((to, from, next) => {

    const isAuthenticated = sessionStorage.getItem("auth_token"); // Check for auth token
    const toast = useToast();

    if (to.meta.requiresAuth && !isAuthenticated) {

        toast.error("You must log in to access this page");

        // Redirect to login if not authenticated
        next({
            name: 'login',
            query: { redirect: to.fullPath }
        });

        // next("/login");
    } else {
        next(); // Proceed to the route
    }
});


export default router;
