<script setup>
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue';

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
    <div class="bg-white m-4 p-4 shadow-md rounded-lg border border-zinc-300 w-64">
        <h3>{{ props.title }}</h3>
        <h2>{{ props.value }}</h2>
        <div class="flex items-center">
            <p class="grow text-xs">Évolution</p>
            <div class="flex">
                <span class="text-xs"
                    :class="props.evolution.charAt(0) == '+' ? 'text-success-500' : 'text-danger-500'">{{
                        props.evolution }}</span>
                <EvolutionIndicatorComponent :has-changed="true" :is-better="true" />
            </div>
        </div>
    </div>
</template>