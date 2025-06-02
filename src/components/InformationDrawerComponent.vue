<script setup>
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

const onCloseButtonClicked = () => {
    emit("closeDrawer")
}
</script>

<template>
    <Transition>
        <div v-if="props.isDrawerOpen"
            class="absolute top-0 left-0 h-screen bg-white w-1/5 shadow-md pointer-events-auto">
            <img :src="'/src/assets/images/' + props.currentWorkshop.image + '.jpg'" class="w-full "
                :alt="props.currentWorkshop.image">
            <div class="px-8 pt-8 border-r border-r-zinc-300 w-full h-full">
                <h1 class="text-2xl font-bold">Informations</h1>
                <button type="button" @click="onCloseButtonClicked"
                    class="absolute top-3 right-3 rounded-lg p-1 inline-flex items-center justify-center border border-zinc-300 text-zinc-600 hover:text-zinc-500 hover:bg-zinc-100/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-800 shadow-md hover:cursor-pointer">
                    <span class="sr-only">Close menu</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="mt-6 border-t border-gray-100">
                    <dl class="divide-y divide-gray-100">
                        <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 font-semibold">Indicateur 1</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700">{{
                                props.currentWorkshop.indicator1 }}%</dd>
                        </div>
                        <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 font-semibold">Indicateur 2</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700">{{
                                props.currentWorkshop.indicator2 }}%</dd>
                        </div>
                        <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 font-semibold">Indicateur 3</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700">{{
                                props.currentWorkshop.indicator3 }}%</dd>
                        </div>
                        <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 font-semibold">Indicateur 4</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700">{{
                                props.currentWorkshop.indicator4 }}%</dd>
                        </div>
                        <p class="pt-2 text-xs">Fin de chantier le {{ props.currentWorkshop.date }}</p>
                    </dl>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: left 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    left: -20vw;
}
</style>