import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWorkshopStore = defineStore("workshops", () => {
  const workshops = ref([])
  function addWorkshop(workshop) {
    workshops.value.push(workshop)
  }

  return { workshops, addWorkshop }
})
