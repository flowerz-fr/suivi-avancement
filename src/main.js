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
    workshop: "MAPu",
    x: -1.883827326956748,
    y: 49.6795108972554,
    image: "MAPu",
    color: "green"
  },
  { // MAU
    workshop: "MAU",
    x: -1.8832402885417423,
    y: 49.67954101142942,
    image: "MAU",
    color: "green"
  },
  { // HADE
    workshop: "HADE",
    x: -1.8802, // + goes left
    y: 49.6789, // + goes up
    image: "HADE",
    color: "green"
  },
  { // HAPF
    workshop: "HAPF",
    x: -1.8820212273908794,
    y: 49.67867961279319,
    image: "HAPF",
    color: "green"
  },
  { // DEG
    workshop: "DEG",
    x: -1.8801696050909698,
    y: 49.67833007041946,
    image: "DEG",
    color: "green"
  },
  { // HAO SUD
    workshop: "HAO SUD",
    x: -1.8794269145908231,
    y: 49.6786169475036,
    image: "HAO SUD",
    color: "orange"
  },
  { // HAO SILO
    workshop: "HAO SILO",
    x: -1.8789507853151974,
    y: 49.67835459716562,
    image: "HAO",
    color: "orange"
  },
  { // HAO NORD
    workshop: "HAO NORD",
    x: -1.8792494400861983,
    y: 49.678927508185325,
    image: "HAO",
    color: "orange"
  },
  { // HAO NV FILT
    workshop: "HAO NV FILT",
    x: -1.8788788744330702,
    y: 49.67853679626833,
    image: "HAO",
    color: "orange"
  },
  { // DFG
    workshop: "DFG",
    x: -1.8806905440894184,
    y: 49.678038027213205,
    image: "no",
    color: "green"
  },
  { // STE2
    workshop: "STE2",
    x: -1.8861,
    y: 49.6787,
    image: "STE2",
    color: "blue"
  },
  { // SILO 130
    workshop: "SILO 130",
    x: -1.8962946221881225,
    y: 49.68287149293147,
    image: "SILO 130",
    color: "blue"
  },
  { // SILO 115
    workshop: "SILO 115",
    x: -1.8880871795877567,
    y: 49.67821059782776,
    image: "SILO 115",
    color: "blue"
  },
  { // ELAN IIB
    workshop: "ELAN IIB",
    x: -1.8815146014437971,
    y: 49.67742360418538,
    image: "ELAN IIB",
    color: "red"
  },
  { // RCB
    workshop: "RCB",
    x: -1.8854473476890234,
    y: 49.67845069667257,
    image: "no",
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
        if(workshop.workshop == columns[0])
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
        if(workshop.workshop == columns[0])
          return false
        i++
        return true
      })
      useWorkshopStore().addOldWorkshop(new Workshop(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5], columns[6], columns[7], columns[8], columns[9], columns[10], columns[11], columns[12], columns[13], columns[14], workshopCoordinates[i].x, workshopCoordinates[i].y, workshopCoordinates[i].image, workshopCoordinates[i].color))
    })
  })

app.mount('#app')
