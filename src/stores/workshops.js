import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWorkshopStore = defineStore("workshops", () => {
  const workshops = ref([])
  const oldWorkshops = ref([])
  const currentWorkshop = ref(null)
  const currentOldWorkshop = ref(null)

  function mountWorkshop(toBeMountedWorkshop) {
    currentWorkshop.value = toBeMountedWorkshop
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.workshop == toBeMountedWorkshop.workshop) {
        currentOldWorkshop.value = workshop
      }
    })
  }

  function addWorkshop(workshop) {
    workshops.value.push(workshop)
  }

  function addOldWorkshop(workshop) {
    oldWorkshops.value.push(workshop)
  }

  return { workshops, oldWorkshops, currentWorkshop, currentOldWorkshop, mountWorkshop, addWorkshop, addOldWorkshop }
})
