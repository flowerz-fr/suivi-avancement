<script setup>
import { ref } from "vue"
import { useWorkshopStore } from "@/stores/workshops"
import CanvasComponent from '../components/CanvasComponent.vue'
import UiComponent from '../components/UiComponent.vue'
import Workshop from '@/stores/Workshop'

const isDrawerOpen = ref(false)
const canvas = ref(null)
const store = useWorkshopStore()

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

fetch("/data_suivi_avancement.csv")
  .then(response => response.text())
  .then(data => {
    const rows = data.split("\n")
    rows.shift()
    rows.forEach(row => {
      const columns = row.split(",")
      store.addWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6], columns[7], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], 500, 500, 0.25, 0.25, "hade"))
    })
  })
</script>

<template>
  <main>
    <CanvasComponent @open-drawer="openDrawer" @close-drawer="closeDrawer" @select-workshop="selectWorkshop"
      ref="canvas" />
    <UiComponent :is-drawer-open="isDrawerOpen" :current-workshop="currentWorkshop" @close-drawer="closeDrawer" />
  </main>
</template>
