<script setup>
import { ref } from "vue"
import CanvasComponent from '../components/CanvasComponent.vue'
import UiComponent from '../components/UiComponent.vue'

const isDrawerOpen = ref(false)
const canvas = ref(null)

const currentWorkshop = ref({
  image: "",
  indicator1: 2,
  indicator2: 7,
  indicator3: 0,
  indicator4: 93,
  date: "04/07/2023"
})

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  canvas.value.resetObjectSelection()
}

const selectWorkshop = (image, indicator1, indicator2, indicator3, indicator4, date) => {
  currentWorkshop.value = {
    image: image,
    indicator1: indicator1,
    indicator2: indicator2,
    indicator3: indicator3,
    indicator4: indicator4,
    date: date
  }
}
</script>

<template>
  <main>
    <CanvasComponent @open-drawer="openDrawer" @close-drawer="closeDrawer" @select-workshop="selectWorkshop"
      ref="canvas" />
    <UiComponent :is-drawer-open="isDrawerOpen" :current-workshop="currentWorkshop" @close-drawer="closeDrawer" />
  </main>
</template>
