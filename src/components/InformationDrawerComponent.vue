<script setup>
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'
import CloseButtonComponent from './CloseButtonComponent.vue'
import BarGraphComponent from './BarGraphComponent.vue'

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
            <div class="px-8 pt-4 border-r border-r-zinc-300 w-full h-full">
                <CloseButtonComponent @action="onCloseButtonClicked" />
                <h1>Informations</h1>
                <p class="text-xs">Fin de chantier le {{ props.currentWorkshop.date }}</p>
                <div class="my-6 border-t border-gray-100">
                    <dl class="divide-y divide-gray-100">
                        <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 sm:col-span-2 font-semibold">Assainissement</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                <h6 class="grow">{{ props.currentWorkshop.indicator1 }}% </h6>
                                <EvolutionIndicatorComponent :has-changed="true" :is-better="false" />
                            </dd>
                        </div>
                        <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 sm:col-span-2 font-semibold">Caractérisation</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                <h6 class="grow">{{ props.currentWorkshop.indicator2 }}% </h6>
                                <EvolutionIndicatorComponent :has-changed="false" :is-better="true" />
                            </dd>
                        </div>
                        <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 sm:col-span-2 font-semibold">Démentèlement</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                <h6 class="grow">{{ props.currentWorkshop.indicator3 }}% </h6>
                                <EvolutionIndicatorComponent :has-changed="true" :is-better="true" />
                            </dd>
                        </div>
                        <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                            <dt class="text-sm/6 sm:col-span-2 font-semibold">Déclassement radiologique</dt>
                            <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                <h6 class="grow">{{ props.currentWorkshop.indicator4 }}% </h6>
                                <EvolutionIndicatorComponent :has-changed="true" :is-better="true" />
                            </dd>
                        </div>
                    </dl>
                </div>
                <h1>Avancement</h1>
                <BarGraphComponent />
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