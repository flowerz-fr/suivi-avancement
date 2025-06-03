<script setup>
import InformationDrawerComponent from "./InformationDrawerComponent.vue"
import BottomFloatingComponent from "./BottomFloatingComponent.vue"
import TopFloatingComponent from "./TopFloatingComponent.vue"
import DataCardComponent from "./DataCardComponent.vue"

const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    },
    currentWorkshop: {
        type: {
            image: String,
            a: Number,
            c: Number,
            d: Number,
            dr: Number,
            date: String,
            ta: Number,
            tc: Number,
            td: Number,
            tdr: Number,
        },
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
        <InformationDrawerComponent :is-drawer-open="props.isDrawerOpen" :current-workshop="props.currentWorkshop"
            @close-drawer="closeDrawer" />
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