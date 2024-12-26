<script setup>
import { watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import logo from '/public/assets/images/logo.png'
import { isAuthenticated, logout } from '../../auth';

const router = useRouter();

const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path == routePath;
}

const handleLogout = () => {
    logout();
    router.push('/');
};


watch(isAuthenticated, (newValue) => {
    console.log("Authentication state changed to:", newValue);
});


</script>

<template>
    <nav class="bg-indigo-700 border-b border-indigo-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
                        <img class="h-10 w-auto" :src="logo" alt="Vue" />
                        <span class="hidden md:block text-white text-2xl font-bold ml-2">Blog</span>
                    </RouterLink>
                    <div class="md:ml-auto">
                        <div class="flex space-x-2">

                            <RouterLink to="/"
                                :class="[isActiveLink('/') ? 'bg-indigo-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'rounded-md px-3 py-2']">
                                Home</RouterLink>

                            <RouterLink to="/jobs"
                                :class="[isActiveLink('/jobs') ? 'bg-indigo-900' : 'hover:bg-gray-900 hover:text-white', 'text-white rounded-md px-3 py-2']">
                                Blogs</RouterLink>

                            <RouterLink v-if="!isAuthenticated" to="/login"
                                :class="[isActiveLink('/login') ? 'bg-indigo-900' : 'hover:bg-gray-900 hover:text-white', 'text-white rounded-md px-3 py-2']">
                                Login</RouterLink>

                            <RouterLink v-if="!isAuthenticated" to="/register"
                                :class="[isActiveLink('/register') ? 'bg-indigo-900' : 'hover:bg-gray-900 hover:text-white', 'px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300']">
                                Register</RouterLink>

                            <RouterLink v-if="isAuthenticated" to="/dashboard"
                                :class="[isActiveLink('/dashboard') ? 'bg-indigo-900' : 'hover:bg-gray-900 hover:text-white', 'text-white rounded-md px-3 py-2']">
                                Dashboard</RouterLink>

                            <button v-if="isAuthenticated" @click="handleLogout"
                                class="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300">
                                Logout</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>