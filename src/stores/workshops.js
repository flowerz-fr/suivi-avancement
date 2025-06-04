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

  function getCompletionA() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.a)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.a)
    })
    return { current: sum, old: sumOld }
  }

  function getCompletionC() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.c)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.c)
    })
    return { current: sum, old: sumOld }
  }

  function getCompletionD() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.d)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.d)
    })
    return { current: sum, old: sumOld }
  }

  function getCompletionDr() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.dr)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.dr)
    })
    return { current: sum, old: sumOld }
  }

  function getTotalA() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.ta)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.ta)
    })
    return { current: sum, old: sumOld }
  }
  
  function getTotalC() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.tc)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.tc)
    })
    return { current: sum, old: sumOld }
  }

  function getTotalD() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.td)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.td)
    })
    return { current: sum, old: sumOld }
  }

  function getTotalDr() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      sum += parseInt(workshop.tdr)
    })
    oldWorkshops.value.forEach((workshop) => {
      sumOld += parseInt(workshop.tdr)
    })
    return { current: sum, old: sumOld }
  }

  return {
    workshops,
    oldWorkshops,
    currentWorkshop,
    currentOldWorkshop,
    mountWorkshop,
    addWorkshop,
    addOldWorkshop,
    getCompletionA,
    getCompletionC,
    getCompletionD,
    getCompletionDr,
    getTotalA,
    getTotalC,
    getTotalD,
    getTotalDr
  }
})
