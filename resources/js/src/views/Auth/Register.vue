<script setup>
import logo from '/public/assets/images/logo.png';
import { reactive } from 'vue';
import router from '../../router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { RouterLink } from 'vue-router';


const toast = useToast();

const form = reactive({
    name: '',
    email: '',
    password: ''
});


const handleForm = async () => {

    const newUser = {
        name: form.name,
        email: form.email,
        password: form.password
    }

    try {
        const response = await axios.post('/api/auth/register', newUser);
        // Set Access token. 
        sessionStorage.setItem('auth_token', response.data.accessToken);

        toast.success('Signup Successful');
        router.push('/dashboard');
    } catch (error) {

    }

};


</script>
<template>
    <section class="text-gray-900 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <a href="/">
                    <img :src="logo" width="75" alt="">
                </a>
            </div>

            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <form @submit.prevent="handleForm">

                    <!-- Name -->
                    <div class="mb-4">
                        <label for="name" class="block font-medium text-sm text-gray-700 mb-1">Name</label>
                        <input v-model="form.name" type="text" name="name"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full">
                    </div>


                    <!-- Email Address -->
                    <div>
                        <label for="email" class="block font-medium text-sm text-gray-700 mb-1">Email</label>
                        <input v-model="form.email" type="email" name="email"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full">
                    </div>

                    <!-- Password -->
                    <div class="my-4">

                        <label for="password" class="block font-medium text-sm text-gray-700 mb-1">
                            Password
                        </label>
                        <input v-model="form.password" type="password" name="password"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full">
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        <RouterLink class="underline text-sm text-gray-600 hover:text-gray-900" to="/login">
                            Already User? Login Now
                        </RouterLink>

                        <button class="ms-3 inline-flex items-center px-4
                            py-2 bg-indigo-800 border border-transparent rounded-md font-semibold text-xs text-white
                            uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition
                            ease-in-out duration-150" type="submit">
                            Register
                        </button>

                    </div>


                </form>
            </div>
        </div>
    </section>



</template>