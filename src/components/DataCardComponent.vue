<script setup>
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'

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
</script>

<template>
    <div class="bg-white m-2 p-4 shadow-md rounded-xl border border-zinc-300 w-64">
        <h3>{{ props.title }}</h3>
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