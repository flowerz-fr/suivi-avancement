import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWorkshopStore = defineStore("workshops", () => {
  const workshops = ref([])
  const oldWorkshops = ref([])
  const zoneOptions = ref([])
  const currentWorkshop = ref(null)
  const currentOldWorkshop = ref(null)

  function mountWorkshop(toBeMountedWorkshop) {
    currentWorkshop.value = toBeMountedWorkshop
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.workshop == toBeMountedWorkshop.workshop && workshop.zone == "4") {
        currentOldWorkshop.value = workshop
      }
    })
    var options = []
    workshops.value.forEach((workshop) => {
      if(workshop.workshop == toBeMountedWorkshop.workshop && !options.includes(workshop.zone))
        options.push(workshop.zone)
    })
    zoneOptions.value = options
  }

  function dismountWorkshop() {
    currentWorkshop.value = null
    currentOldWorkshop.value = null
  }

  // for mounted workshop
  function changeZoneMountedWorkshop(zone) {
    var changed = false
    workshops.value.forEach((workshop) => {
      if(workshop.workshop == currentWorkshop.value.workshop && workshop.zone == zone) {
        currentWorkshop.value = workshop
        changed = true
      }
    })
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.workshop == currentOldWorkshop.value.workshop && workshop.zone == zone) {
        currentOldWorkshop.value = workshop
      }
    })
    if(!changed)
      alert("Aucune donnée pour cet atelier en zone " + zone)
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
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.a)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.a)
    })
    return { current: sum, old: sumOld }
  }

  function getCompletionC() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.c)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.c)
    })
    return { current: sum, old: sumOld }
  }

  function getCompletionD() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.d)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.d)
    })
    return { current: sum, old: sumOld }
  }

  function getCompletionDr() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.dr)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.dr)
    })
    return { current: sum, old: sumOld }
  }

  function getTotalA() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.ta)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.ta)
    })
    return { current: sum, old: sumOld }
  }
  
  function getTotalC() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.tc)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.tc)
    })
    return { current: sum, old: sumOld }
  }

  function getTotalD() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.td)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.td)
    })
    return { current: sum, old: sumOld }
  }

  function getTotalDr() {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(workshop.tdr)
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sumOld += parseInt(workshop.tdr)
    })
    return { current: sum, old: sumOld }
  }

  return {
    workshops,
    oldWorkshops,
    currentWorkshop,
    currentOldWorkshop,
    zoneOptions,
    mountWorkshop,
    dismountWorkshop,
    changeZoneMountedWorkshop,
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
