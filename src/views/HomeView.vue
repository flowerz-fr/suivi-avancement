<script setup>
import { ref } from "vue"
import UiComponent from '../components/UiComponent.vue'
import MapComponent from "@/components/MapComponent.vue"

const isDrawerOpen = ref(false)
const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

</script>

<template>
  <main>
    <MapComponent @open-drawer="openDrawer" @close-drawer="closeDrawer" />
    <UiComponent :is-drawer-open="isDrawerOpen" @close-drawer="closeDrawer" />
  </main>
</template>
