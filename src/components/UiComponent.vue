<script setup>
import InformationDrawerComponent from "./InformationDrawerComponent.vue"
import BottomFloatingComponent from "./BottomFloatingComponent.vue"
import TopFloatingComponent from "./TopFloatingComponent.vue"
import DataCardComponent from "./DataCardComponent.vue"
import { useWorkshopStore } from "@/stores/workshops"
import { computed } from "vue"
import RightFloatingComponent from "./RightFloatingComponent.vue"

const store = useWorkshopStore()
const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(["closeDrawer"])

const closeDrawer = () => {
    emit("closeDrawer")
}

const displayAValue = computed(() => {
    return store.getCompletionA().current + '/' + store.getTotalA().current
})

const displayCValue = computed(() => {
    return store.getCompletionC().current + '/' + store.getTotalC().current
})

const displayDValue = computed(() => {
    return store.getCompletionD().current + '/' + store.getTotalD().current
})

const displayDrValue = computed(() => {
    return store.getCompletionDr().current + '/' + store.getTotalDr().current
})

const displayAEvolution = computed(() => {
    var currentState = store.getCompletionA().current * 100 / store.getTotalA().current
    var oldState = store.getCompletionA().old * 100 / store.getTotalA().old
    var evolution = currentState - oldState
    return Math.round(currentState) + "%" + (evolution > 0 ? " (+" + Math.round(evolution) + "%)" : "")
})

const displayCEvolution = computed(() => {
    var currentState = store.getCompletionC().current * 100 / store.getTotalC().current
    var oldState = store.getCompletionC().old * 100 / store.getTotalC().old
    var evolution = currentState - oldState
    return Math.round(currentState) + "%" + (evolution > 0 ? " (+" + Math.round(evolution) + "%)" : "")
})

const displayDEvolution = computed(() => {
    var currentState = store.getCompletionD().current * 100 / store.getTotalD().current
    var oldState = store.getCompletionD().old * 100 / store.getTotalD().old
    var evolution = currentState - oldState
    return Math.round(currentState) + "%" + (evolution > 0 ? " (+" + Math.round(evolution) + "%)" : "")
})

const displayDrEvolution = computed(() => {
    var currentState = store.getCompletionDr().current * 100 / store.getTotalDr().current
    var oldState = store.getCompletionDr().old * 100 / store.getTotalDr().old
    var evolution = currentState - oldState
    return Math.round(currentState) + "%" + (evolution > 0 ? " (+" + Math.round(evolution) + "%)" : "")
})
</script>

<template>
    <div class="pointer-events-none">
        <div id="start-screen" class="absolute top-0 bg-white w-screen h-screen grid place-content-center z-10">
            <div class="flex w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 my-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>
                <h2 class="my-auto ml-2">Cliquez pour commencer</h2>
            </div>
        </div>
        <InformationDrawerComponent :is-drawer-open="props.isDrawerOpen" @close-drawer="closeDrawer" />
        <TopFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <h1 class="w-screen text-center mt-4">Suivi d'avancement DEM et RCD UP2-400</h1>
        </TopFloatingComponent>
        <RightFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <DataCardComponent :title="'Caractérisation'" :value="displayCValue" :evolution="displayCEvolution" />
            <DataCardComponent :title="'Assainissement'" :value="displayAValue" :evolution="displayAEvolution" />
            <DataCardComponent :title="'Démentèlement'" :value="displayDValue" :evolution="displayDEvolution" />
            <DataCardComponent :title="'Déclassement radiologique'" :value="displayDrValue"
                :evolution="displayDrEvolution" />
        </RightFloatingComponent>
    </div>
</template>