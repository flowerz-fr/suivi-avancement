<script setup>
const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <Transition>
        <div v-show="!props.isDrawerOpen" class="absolute bottom-0 flex flex-row-reverse w-screen">
            <slot></slot>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: bottom 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    bottom: -20vh;
}
</style>