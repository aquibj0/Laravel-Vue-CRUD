<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const title = ref('');
        const content = ref('');
        const router = useRouter();

        const createPost = async () => {
            await axios.post('/api/posts', { title: title.value, content: content.value });
            router.push('/');
        };

        return { title, content, createPost };
    },
};
</script>


<template>
    <div>
        <h1>Create Post</h1>
        <form @submit.prevent="createPost">
            <input v-model="title" placeholder="Title" />
            <textarea v-model="content" placeholder="Content"></textarea>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

