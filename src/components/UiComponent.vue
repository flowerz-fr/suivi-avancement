<script setup>
import InformationDrawerComponent from "./InformationDrawerComponent.vue"

const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    },
    currentWorkshop: {
        type: {
            image: String,
            indicator1: Number,
            indicator2: Number,
            indicator3: Number,
            indicator4: Number,
            date: String
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
    </div>
</template>