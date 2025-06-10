<script setup>
import EvolutionIndicatorComponent from './EvolutionIndicatorComponent.vue'
import CloseButtonComponent from './CloseButtonComponent.vue'
import BarGraphComponent from './BarGraphComponent.vue'
import SelectComponent from './SelectComponent.vue'
import { useWorkshopStore } from '@/stores/workshops'
import { computed, ref } from 'vue'

const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
})
const store = useWorkshopStore()

const emit = defineEmits(["closeDrawer"])

const onCloseButtonClicked = () => {
    emit("closeDrawer")
}

const percentageA = computed(() => {
    var evolution = Math.round(store.currentWorkshop.a * 100 / store.currentWorkshop.ta - store.currentOldWorkshop.a * 100 / store.currentOldWorkshop.ta)
    return Math.round(store.currentWorkshop.a * 100 / store.currentWorkshop.ta) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})

const percentageC = computed(() => {
    var evolution = Math.round(store.currentWorkshop.c * 100 / store.currentWorkshop.tc - store.currentOldWorkshop.c * 100 / store.currentOldWorkshop.tc)
    return Math.round(store.currentWorkshop.c * 100 / store.currentWorkshop.tc) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})

const percentageD = computed(() => {
    var evolution = Math.round(store.currentWorkshop.d * 100 / store.currentWorkshop.td - store.currentOldWorkshop.d * 100 / store.currentOldWorkshop.td)
    return Math.round(store.currentWorkshop.d * 100 / store.currentWorkshop.td) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})

const percentageDr = computed(() => {
    var evolution = Math.round(store.currentWorkshop.dr * 100 / store.currentWorkshop.tdr - store.currentOldWorkshop.dr * 100 / store.currentOldWorkshop.tdr)
    return Math.round(store.currentWorkshop.dr * 100 / store.currentWorkshop.tdr) + "%" + (evolution > 0 ? " (" + (evolution > 0 ? "+" : "") + evolution + "%)" : "")
})
</script>

<template>
    <Transition>
        <div v-if="props.isDrawerOpen" id="testtets"
            class="absolute top-0 left-0 h-screen bg-white w-1/4 shadow-md pointer-events-auto border-r border-r-zinc-300 overflow-y-scroll">
            <img :src="'/src/assets/images/' + store.currentWorkshop.image + '.jpg'" class="w-full"
                :alt="store.currentWorkshop.image">
            <div class="px-8 pt-4 w-full">
                <CloseButtonComponent @action="onCloseButtonClicked" />
                <div class="flex">
                    <h1 class="heading grow">{{ store.currentWorkshop.workshop }}</h1>
                    <SelectComponent :options="store.zoneOptions" />
                </div>
                <div class="my-6">
                    <h1>INB {{ store.currentWorkshop.inb }}, {{ store.currentWorkshop.project }}</h1>
                    <p class="text-sm mb-4">Fin de DEM en {{ store.currentWorkshop.end }}</p>
                </div>
                <div class="my-6">
                    <h1>Évolution sur la période</h1>
                    <p class="text-xs mb-4">Mise à jour le {{ store.currentWorkshop.updateDate }}</p>
                    <span class="text-sm text-zinc-700">{{ store.currentWorkshop.updateContent }}</span>
                </div>
                <div class="my-6">
                    <h1>Avancement</h1>
                    <div class="border-t border-gray-100">
                        <dl class="divide-y divide-gray-100">
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="text-sm/6 sm:col-span-2 font-semibold">Caractérisation</dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.c }}/{{ store.currentWorkshop.tc }}</h6>
                                    <div class="flex justify-end">
                                        <span class="text-xs text-blue-600">{{ percentageC }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.c > store.currentOldWorkshop.c"
                                            :is-better="store.currentWorkshop.c > store.currentOldWorkshop.c" />
                                    </div>
                                </dd>
                            </div>
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="text-sm/6 sm:col-span-2 font-semibold">Assainissement</dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.a }}/{{ store.currentWorkshop.ta }}</h6>
                                    <div class="flex justify-end">
                                        <span class="text-xs text-blue-600">{{ percentageA }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.a > store.currentOldWorkshop.a"
                                            :is-better="store.currentWorkshop.a > store.currentOldWorkshop.a" />
                                    </div>
                                </dd>
                            </div>
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="text-sm/6 sm:col-span-2 font-semibold">Démantèlement</dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.d }}/{{ store.currentWorkshop.td }}</h6>
                                    <div class="flex">
                                        <span class="text-xs text-blue-600">{{ percentageD }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.d > store.currentOldWorkshop.d"
                                            :is-better="store.currentWorkshop.d > store.currentOldWorkshop.d" />
                                    </div>
                                </dd>
                            </div>
                            <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                <dt class="text-sm/6 sm:col-span-2 font-semibold">Déclassement radio.</dt>
                                <dd class="mt-1 text-sm/6 sm:col-span-2 sm:mt-0 text-zinc-700 flex items-center">
                                    <h6 class="grow">{{ store.currentWorkshop.dr }}/{{ store.currentWorkshop.tdr }}</h6>
                                    <div class="flex justify-end">
                                        <span class="text-xs text-blue-600">{{ percentageDr }}</span>
                                        <EvolutionIndicatorComponent
                                            :has-changed="store.currentWorkshop.dr > store.currentOldWorkshop.dr"
                                            :is-better="store.currentWorkshop.dr > store.currentOldWorkshop.dr" />
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="px-3">
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
    left: -25vw;
}
</style>