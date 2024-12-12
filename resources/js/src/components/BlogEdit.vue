<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const title = ref('');
        const content = ref('');
        const router = useRouter();
        const route = useRoute();

        const fetchPost = async () => {
            const response = await axios.get(`/api/posts/${route.params.id}`);
            title.value = response.data.title;
            content.value = response.data.content;
        };

        const updatePost = async () => {
            await axios.put(`/api/posts/${route.params.id}`, { title: title.value, content: content.value });
            router.push('/');
        };

        onMounted(fetchPost);

        return { title, content, updatePost };
    },
};
</script>

<template>
    <div>
        <h1>Edit Post</h1>
        <form @submit.prevent="updatePost">
            <input v-model="title" placeholder="Title" />
            <textarea v-model="content" placeholder="Content"></textarea>
            <button type="submit">Update</button>
        </form>
    </div>
</template>


