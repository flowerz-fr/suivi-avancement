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

const workshopCoordinates = [
  { // MAU
    x: 0, // -1.878
    y: 0, // 49.678638
    scalex: 0.17,
    scaley: 0.2,
    image: "mau"
  },
  { // MAPu
    x: -1.8832, // -1.878
    y: 49.6795, // 49.678638
    scalex: 0.17,
    scaley: 0.2,
    image: "mapu"
  },
  { // HADE
    x: -1.8802, // + goes left
    y: 49.67875, // + goes up
    scalex: 0.25,
    scaley: 0.25,
    image: "hade"
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
      useWorkshopStore().addWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[6], columns[7], columns[4], columns[5], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], workshopCoordinates[i].x, workshopCoordinates[i].y, workshopCoordinates[i].scalex, workshopCoordinates[i].scaley, workshopCoordinates[i].image))
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
      useWorkshopStore().addOldWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[6], columns[7], columns[4], columns[5], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], workshopCoordinates[i].x, workshopCoordinates[i].y, workshopCoordinates[i].scalex, workshopCoordinates[i].scaley, workshopCoordinates[i].image))
      i++
    })
  })

app.mount('#app')
