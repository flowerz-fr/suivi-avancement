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
        <div v-show="!props.isDrawerOpen" class="absolute right-0 flex flex-column">
            <slot></slot>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: right 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    right: 120vw;
}
</style>