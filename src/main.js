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
  {
    x: 500,
    y: 500
  },
  {
    x: 400,
    y: 500
  }
]

fetch("/data/actuel.csv")
  .then(response => response.text())
  .then(data => {
    var i = 0
    const rows = data.split("\n")
    rows.shift()
    rows.forEach(row => {
      const columns = row.split(",")
      useWorkshopStore().addWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6], columns[7], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], workshopCoordinates[i].x, workshopCoordinates[i].y, 0.25, 0.25, "hade"))
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
      useWorkshopStore().addOldWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6], columns[7], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], workshopCoordinates[i].x, workshopCoordinates[i].y, 0.25, 0.25, "hade"))
      i++
    })
  })

app.mount('#app')
