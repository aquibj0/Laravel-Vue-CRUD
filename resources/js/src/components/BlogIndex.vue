<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BlogCard from './PostCard.vue';

const state = reactive({
    posts: [],
    isLoading: true
});

const getPost = async () => {
    try {
        const response = await axios.get('/api/posts');
        state.posts = response.data;
    } catch (error) {
        console.error('Something went wrong', error);
    } finally {
        state.isLoading = false
    }
}

onMounted(getPost);

</script>

<template>
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex flex-row items-center justify-between	 gap-6 my-5">
            
            <div class="flex-initial">
                <h1 class="text-4xl">Blog Posts</h1>
            </div>

            <div class="flex-initial">
                <RouterLink to="/dashboard/create"
                    class="px-4 py-2 bg-indigo-500 text-white border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    Create New Post
                </RouterLink>
            </div>
            
        </div>

        <!-- Show Loading Spinner while loading is true -->
        <div v-if="state.isLoading" class="text-center gray-text-500">
            <PulseLoader />
        </div>

        <!-- Show job listing when done loading  -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogCard v-for="post in state.posts" :key="post.id" :post="post" />
        </div>


    </div>
</template>
