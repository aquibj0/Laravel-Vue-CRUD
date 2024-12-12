<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const postId = route.params.id;

const router = useRouter();

const state = reactive({
    post: [],
    isLoading: true
});

const fetchPost = async () => {

    try {
        const response = await axios.get(`/api/posts/${postId}`);
        state.post = response.data;
    } catch (error) {
        console.error('Error fetching post ', error);
    } finally {
        state.isLoading = false
    }

};

const deletePost = async () => {
    try {
        const confirm = window.confirm('Are you sure you want to delete');
        if (confirm) {
            await axios.delete(`/api/posts/${postId}`);
            // toast.success('Job Deleted Successfully');
            router.push('/');
        }

    } catch (error) {
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
                <div class="flex gap-6 conte">
                    <div class="col-span-4	">
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
                    <div class="col-span-8">
                        <!-- Manage -->                        
                        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 class="text-xl font-bold mb-6">Manage Post</h3>
                            <RouterLink :to="`/posts/edit/${state.post.id}`"
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