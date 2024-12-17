<script setup>

import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    post: Object
})

const showFullDescription = ref(false)

const truncatedDescription = computed(() => {
    let description = props.post.content;
    if (!showFullDescription.value) {
        description = description.substring(0, 90) + '...';
    }
    return description;
});

const toggleFullDescription = () => {
    showFullDescription.value = !showFullDescription.value
}


</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            
            <div class="mb-6">
                <h3 class="text-xl font-bold">{{ post.title }}</h3>
            </div>

            <div class="mb-5">
                {{ truncatedDescription }}
                <button @click="toggleFullDescription" class="text-indigo-500 hover:text-indigo-600 mb-5">
                    {{ showFullDescription ? 'Less' : 'More' }}
                </button>
            </div>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
                <RouterLink :to="'/dashboard/post/' + post.id"
                    class="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                    Read More
                </RouterLink>
            </div>
            
        </div>
    </div>
</template>