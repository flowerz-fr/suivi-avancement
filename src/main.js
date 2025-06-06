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

// because data such as image name or coordinates are not included inside csv input files and are constant through time so they are hardcoded here
const workshopCoordinates = [
  { // MAU
    x: -1.8832,
    y: 49.6796,
    scalex: 0.17,
    scaley: 0.2,
    image: "mau",
    color: "green"
  },
  { // MAPu
    x: -1.8838,
    y: 49.67965,
    scalex: 0.17,
    scaley: 0.2,
    image: "mapu",
    color: "green"
  },
  { // HADE
    x: -1.8802, // + goes left
    y: 49.6789, // + goes up
    scalex: 0.25,
    scaley: 0.25,
    image: "hade",
    color: "green"
  },
]

fetch("/data/actuel.csv")
  .then(response => response.text())
  .then(data => {
    var i = 0
    const rows = data.split("\n")
    rows.shift()
    rows.forEach(row => {
      const columns = row.split(",")
      useWorkshopStore().addWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[6], columns[7], columns[4], columns[5], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], workshopCoordinates[i].x, workshopCoordinates[i].y, workshopCoordinates[i].image, workshopCoordinates[i].color))
      i++
    })
  })
fetch("/data/ancien.csv")
  .then(response => response.text())
  .then(data => {
    var i = 0
    const rows = data.split("\n")
    rows.shift()
    rows.forEach(row => {
      const columns = row.split(",")
      useWorkshopStore().addOldWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[6], columns[7], columns[4], columns[5], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], workshopCoordinates[i].x, workshopCoordinates[i].y, workshopCoordinates[i].image, workshopCoordinates[i].color))
      i++
    })
  })

app.mount('#app')
