<script setup>
import logo from '/public/assets/images/logo.png'
import { useToast } from 'vue-toastification';
import { reactive } from 'vue';
import router from '../../router';
import axios from 'axios';

const toast = useToast();

const form = reactive({
    email: '',
    password: '',
    remember_me: ''
});



const handleLogin = async () => {    
    
    const user = {
        email: form.email,
        password: form.password,
        remember_me: form.remember_me
    };

    try {
        const response = await axios.post('/api/auth/login', user);
        sessionStorage.setItem('auth_token', response.data.token);
        toast.success('Login Successfull')
        router.push(`/dashboard`);
    } catch (error) {
        toast.error('Wrong Credentials');
        console.error('Something went wrong', error);
    }
}






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
                <form @submit.prevent="handleLogin">
                    

                    <!-- Email Address -->
                    <div>
                        <label for="email" class="block font-medium text-sm text-gray-700 mb-1">Email</label>
                        <input 
                            v-model="form.email" 
                            type="email" 
                            name="email"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full">
                    </div>
                    <div class="my-4">

                        <label for="password" class="block font-medium text-sm text-gray-700 mb-1">
                            Password
                        </label>
                        <input 
                            v-model="form.password" 
                            type="password" 
                            name="password"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full">
                    </div>

                    <!-- Remember Me -->
                    <div class="block">
                        <label for="remember_me" class="inline-flex items-center">
                            <input 
                                v-model="form.remember_me"    
                                id="remember_me" 
                                type="checkbox"
                                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                name="remember_me" value="true">
                            <span class="ms-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            href="3">
                            Forgot your password?
                        </a>

                        <button class="ms-3 inline-flex items-center px-4
                            py-2 bg-indigo-800 border border-transparent rounded-md font-semibold text-xs text-white
                            uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition
                            ease-in-out duration-150"
                            type="submit"
                            >
                            Login
                        </button>

                    </div>


                </form>
            </div>
        </div>
    </section>



</template>