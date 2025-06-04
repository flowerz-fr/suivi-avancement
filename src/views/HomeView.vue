<script setup>
import { ref } from "vue"
import CanvasComponent from '../components/CanvasComponent.vue'
import UiComponent from '../components/UiComponent.vue'

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
    <CanvasComponent @open-drawer="openDrawer" @close-drawer="closeDrawer" @select-workshop="selectWorkshop"
      ref="canvas" />
    <UiComponent :is-drawer-open="isDrawerOpen" :current-workshop="currentWorkshop" @close-drawer="closeDrawer" />
  </main>
</template>
