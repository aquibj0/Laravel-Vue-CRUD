
<script setup>
import { isAuthenticated } from '../../../../auth';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const toast = useToast();

const route = useRoute();

const postId = route.params.id;

const router = useRouter();

const state = reactive({
    post: [],
    isLoading: true
});


const getUser = async () => {
    console.log(sessionStorage.getItem('auth_token'));
    try {
        const response = await axios.get('/api/user', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
            }
        });
        state.user = response.data

    } catch (error) {
        toast.error('Unable to fetch user');
        console.log(error);
    }
}


const fetchPost = async () => {

    try {
        const response = await axios.get(`/api/posts/${postId}`);
        state.post = response.data;
        console.log(state.post);
        
        
    } catch (error) {

        if (error.response && error.response.status === 404) {
            router.push('/404'); 
        } else {
            console.error(err);
        }

    } finally {
        state.isLoading = false
    }

};

const deletePost = async () => {
    try {
        const confirm = window.confirm('Are you sure you want to delete');
        if (confirm) {
            await axios.delete(`/api/posts/${postId}`);
            toast.success('Job Deleted Successfully');
            router.push('/');
        }

    } catch (error) {

        console.log(error.response.staus);
        


        


        console.error('Error deleting Post', error);
        // toast.error('Post not deleted')
    }
}

onMounted(fetchPost);

</script>
<template>
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

        <section v-if="!state.isLoading" class="">
            <div class="container m-auto py-10 px-6">
                <div class="grid grid-cols-3 gap-4e">
                    <div class="col-span-3">
                        <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                            <h1 class="text-3xl font-bold mb-4">{{ state.post.title }}</h1>
                        </div>

                        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                            <p class="mb-4">
                                {{ state.post.content }}
                            </p>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div v-if="isAuthenticated" class="col-span-6">
                        <!-- Manage -->
                        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 class="text-xl font-bold mb-6">Manage Post</h3>
                            <RouterLink :to="`/dashboard/post/edit/${state.post.id}`"
                                class="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                                Edit
                                Post
                            </RouterLink>
                            <button @click="deletePost"
                                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                                Delete Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div v-else class="text-center text-gray-500 py-6">
            <PulseLoader />
        </div>

    </div>
</template>