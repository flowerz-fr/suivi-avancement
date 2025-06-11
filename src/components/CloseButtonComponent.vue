<script setup>
const emit = defineEmits(["action"])

const onButtonClicked = () => {
    emit("action")
}
</script>

<template>
    <button type="button" @click="onButtonClicked"
        class="absolute top-3 right-3 rounded-lg p-1 inline-flex items-center justify-center border border-zinc-300 text-zinc-900 hover:text-zinc-500 hover:bg-zinc-100/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-800 shadow-md hover:cursor-pointer">
        <span class="sr-only">Close menu</span>
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</template>