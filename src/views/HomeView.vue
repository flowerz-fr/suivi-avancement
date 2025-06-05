<script setup>
import { ref } from "vue"
import CanvasComponent from '../components/CanvasComponent.vue'
import UiComponent from '../components/UiComponent.vue'
import MapComponent from "@/components/MapComponent.vue"

const isDrawerOpen = ref(false)
const canvas = ref(null)

const currentWorkshop = ref(null)

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  canvas.value.resetObjectSelection()
}

const selectWorkshop = (workshop) => {
  currentWorkshop.value = workshop
}
</script>

<template>
  <main>
    <!--<CanvasComponent @open-drawer="openDrawer" @close-drawer="closeDrawer" ref="canvas" />-->
    <MapComponent />
    <UiComponent :is-drawer-open="isDrawerOpen" @close-drawer="closeDrawer" />
  </main>
</template>
