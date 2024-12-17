<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const router = useRouter();

const toast = useToast();

const route = useRoute();
const postId = route.params.id;


const form = reactive({
    title: '',
    content: '',
});

const state = reactive({
    post: [],
    user: null
});

// const getUser = async () => {
//     console.log(sessionStorage.getItem('auth_token'));
//     try {
//         const response = await axios.get('/api/user', {
//             headers: {
//                 'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
//             }
//         });
//         state.user = response.data

//     } catch (error) {
//         toast.error('Unable to fetch user');
//         console.log(error);
//     }
// }

const getPost = async () => {
    try {
        const response = await axios.get(`/api/posts/${postId}`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
            }
        });

        state.post = response.data;
        
        // Populate Inputs
        form.title = state.post.title;
        form.content = state.post.content;
        

    } catch (error) {
        console.error('Error fetching', error)
    }
    
}

const updatePost = async () => {
    const post = {
        title: form.title,
        content: form.content
    };

    const response = await axios.put(`/api/posts/${postId}`, post, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token')
        }
    });

    toast.success('Post Updated');

    console.log(response.data.title);

    router.push(`/dashboard/post/${response.data.id}`)
};

onMounted(getPost(), state)

</script>


<template>

    <section class="bg-indigo-50">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="updatePost">
                    <h2 class="text-3xl text-center font-semibold mb-6">Edit Post</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Title</label>
                        <input v-model="form.title" type="text" id="name" name="name"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="eg. Beautiful Apartment In Miami"
                            required />
                    </div>                    
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Content</label>
                        <textarea v-model="form.content" id="description" name="description"
                            class="border rounded w-full py-2 px-3" rows="12"
                            placeholder="Add any job duties, expectations, requirements, etc"></textarea>
                    </div>
                    <div>
                        <button
                            class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
