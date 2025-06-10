import './assets/main.css'
import Workshop from '@/stores/Workshop'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useWorkshopStore } from "@/stores/workshops"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// because data such as image name or coordinates are not included inside csv input files and are constant through time they are hardcoded here
const workshopCoordinates = [
  { // MAPu
    x: -1.8838,
    y: 49.6796,
    image: "MAPu",
    color: "green"
  },
  { // MAU
    x: -1.8832,
    y: 49.6796,
    image: "MAU",
    color: "green"
  },
  { // HADE
    x: -1.8802, // + goes left
    y: 49.6789, // + goes up
    image: "HADE",
    color: "green"
  },
  { // HAPF
    x: -1.882,
    y: 49.6789,
    image: "HAPF",
    color: "green"
  },
  { // DEG
    x: -1.88015,
    y: 49.6784,
    image: "DEG",
    color: "green"
  },
  { // HAO SUD
    x: -1.879425,
    y: 49.67868,
    image: "HAO SUD",
    color: "orange"
  },
  { // HAO SILO
    x: -1.879,
    y: 49.67835,
    image: "HAO SILO",
    color: "orange"
  },
  { // HAO NORD
    x: -1.87924,
    y: 49.679,
    image: "HAO NORD",
    color: "orange"
  },
  { // HAO NV FILT
    x: 0,
    y: 0,
    image: "HAO NV FILT",
    color: "blue"
  },
  { // DFG
    x: -1.88075,
    y: 49.67819,
    image: "DFG",
    color: "green"
  },
  { // STE2
    x: -1.8861,
    y: 49.6787,
    image: "STE2",
    color: "blue"
  },
  { // SILO 130
    x: -1.89632,
    y: 49.6829,
    image: "SILO 130",
    color: "blue"
  },
  { // SILO 115
    x: -1.8881,
    y: 49.6783,
    image: "SILO 115",
    color: "blue"
  },
  { // ELAN IIB
    x: -1.88155,
    y: 49.6775,
    image: "ELAN IIB",
    color: "red"
  },
  { // RCB
    x: -1.886,
    y: 49.6785,
    image: "RCB",
    color: "blue"
  },
]

fetch("/data/actuel.csv")
  .then(response => response.text())
  .then(data => {
    var i
    const rows = data.split("\n")
    rows.shift()
    rows.forEach(row => {
      i = 0
      const columns = row.split(",")
      if(columns.length == 0)
        return
      workshopCoordinates.every(workshop => {
        if(workshop.image == columns[0])
          return false
        i++
        return true
      })
      useWorkshopStore().addWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6], columns[7], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], columns[14], workshopCoordinates[i].x, workshopCoordinates[i].y, workshopCoordinates[i].image, workshopCoordinates[i].color))
    })
  })
fetch("/data/ancien.csv")
  .then(response => response.text())
  .then(data => {
    var i
    const rows = data.split("\n")
    rows.shift()
    rows.forEach(row => {
      i = 0
      const columns = row.split(",")
      if(columns.length == 0)
        return
      workshopCoordinates.every((workshop) => {
        if(workshop.image == columns[0])
          return false
        i++
        return true
      })
      useWorkshopStore().addOldWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6], columns[7], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], columns[14], workshopCoordinates[i].x, workshopCoordinates[i].y, workshopCoordinates[i].image, workshopCoordinates[i].color))
    })
  })

app.mount('#app')
