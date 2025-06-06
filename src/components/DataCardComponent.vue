<script setup>
import { useWorkshopStore } from '@/stores/workshops';
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'
import { computed } from 'vue';

const store = useWorkshopStore()

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    evolution: {
        type: String,
        required: true
    },
})

const inb = computed(() => {
    return store.currentWorkshop != null ? "INB " + store.currentWorkshop.inb : ""
})
</script>

<template>
    <div class="bg-white m-2 p-4 shadow-md rounded-xl border border-zinc-300 w-72">
        <div class="flex w-full ">
            <h3 class="grow">{{ props.title }}</h3>
            <h3 v-if="inb != ''" class="text-zinc-500">{{ inb }}</h3>
        </div>
        <h2>{{ props.value }}</h2>
        <div class="flex items-center">
            <p class="grow text-xs">Avancement</p>
            <div class="flex">
                <span class="text-sm text-blue-600 font-bold">{{ props.evolution }}</span>
                <EvolutionIndicatorComponent :has-changed="props.evolution.charAt(0) == '+'" :is-better="props.evolution.charAt(0) == '+'" />
            </div>
        </div>
    </div>
</template>