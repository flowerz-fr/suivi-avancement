<script setup>
import InformationDrawerComponent from "./InformationDrawerComponent.vue"
import BottomFloatingComponent from "./BottomFloatingComponent.vue"
import TopFloatingComponent from "./TopFloatingComponent.vue"
import DataCardComponent from "./DataCardComponent.vue"

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
            <h1 class="w-screen text-center">Suivi d'avancement</h1>
        </TopFloatingComponent>
        <TopFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <DataCardComponent :title="'Caractérisation'" :value="'10/23'" :evolution="'+10%'" />
            <DataCardComponent :title="'Assainissement'" :value="'10/23'" :evolution="'+10%'" />
        </TopFloatingComponent>
        <BottomFloatingComponent :is-drawer-open="props.isDrawerOpen">
            <DataCardComponent :title="'Démentèlement'" :value="'10/23'" :evolution="'+10%'" />
            <DataCardComponent :title="'Démentèlement radiologique'" :value="'10/23'" :evolution="'+10%'" />
        </BottomFloatingComponent>
    </div>
</template>