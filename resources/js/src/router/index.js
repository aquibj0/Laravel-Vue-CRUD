import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../../auth";
import HomeView from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import NotFound from "../views/Error/404.vue";
import Dashboard from "../views/User/Dashboard.vue";
import PostCreate from "../views/User/Post/Create.vue";
import PostEdit from "../views/User/Post/Edit.vue";
import PostShow from "../views/User/Post/Show.vue";
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
        meta: { requiresAuth: true },
    },
    {
        path: "/dashboard/create",
        component: PostCreate,
        meta: { requiresAuth: true },
    },
    {
        path: "/dashboard/post/:id",
        component: PostShow,
        meta: { requiresAuth: false },
    },
    {
        path: "/dashboard/post/edit/:id",
        component: PostEdit,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/:catchAll(.*)",
        name: "not-found",
        component: NotFound,
    },

    // {
    //     path: "/404",
    //     name: "NotFound",
    //     component: NotFound,
    // },
    // { path: "/:pathMatch(.*)*", redirect: "/404" }, // Catch-all route for undefined paths
];

const toast = useToast();

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && (isAuthenticated.value == false)) {
        toast.error("You must log in to access this page");
        // Redirect to login if not authenticated
        next({
            name: "login",
            query: { redirect: to.fullPath },
        });
    } else {
        next(); // Proceed to the route
    }
});

export default router;
