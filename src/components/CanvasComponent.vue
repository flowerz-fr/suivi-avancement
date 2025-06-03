<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(["openDrawer", "closeDrawer", "selectWorkshop"])

class CanvasObject {
  constructor(id, x, y, scalex, scaley, image, a, c, d, dr, end) {
    this.id = id
    this.width = 302 * scalex
    this.height = 302 * scaley
    this.x = x - this.width / 2
    this.y = y - this.height / 2
    this.isSelected = false
    this.image = image
    this.a = a // assainissement
    this.c = c // caracterisation
    this.d = d // dementelement
    this.dr = dr // declassement radiologique
    this.end = end // fin de chantier
  }
  
  getGlobalCoordinates() {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
  }
}

const objects = [
  new CanvasObject("blue", 280, 270, 0.62, 0.2, "silo130", 1, 2, 3, 4, "01/02/2023"),
  new CanvasObject("blue", 914, 370, 0.91, 0.32, "hade", 5, 6, 7, 8, "04/05/2023"),
  new CanvasObject("green", 1205, 275, 0.93, 0.28, "hade", 9, 10, 11, 12, "05/06/2023"),
  new CanvasObject("red", 1390, 274, 0.2905, 0.32, "hade", 13, 14, 15, 16, "06/07/2023"),
  new CanvasObject("orange", 1286, 344, 0.18, 0.18, "hade", 13, 14, 15, 16, "06/07/2023"),
]
var canvas
var context
var background = new Image()
var isMouseDown = false
var isMoving = false
var dragStartPosition = { x: 0, y: 0 }
var currentTransformedCursor

// Credits: https://roblouie.com/article/617
const upendDisplay = () => {
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
  context.lineWidth = 2
  context.drawImage(background, 0, 0, 2200, 622)
  objects.forEach((object) => {
    context.strokeStyle = object.isSelected ? "oklch(86.5% 0.127 207.078)" : "rgba(255, 255, 255, 0.7)"
    context.beginPath()
    context.roundRect(object.x, object.y, object.width, object.height, [15])
    context.stroke()
  })
}

const resetObjectSelection = () => {
  objects.forEach((object) => {
    object.isSelected = false
  })
  upendDisplay()
}

const getTransformedPoint = (x, y) => {
  const originalPoint = new DOMPoint(x, y)
  return context.getTransform().invertSelf().transformPoint(originalPoint)
}

const isObjectHovered = (object, mouseCoordinates) => {
  return (
    mouseCoordinates.x > (object.x) &&
    mouseCoordinates.x < (object.x + object.width) &&
    mouseCoordinates.y > (object.y) &&
    mouseCoordinates.y < (object.y + object.height)
  )
}

const onMouseDown = (event) => {
  isMouseDown = true
  isMoving = false // defaulting to false to compare if onMouseMove sets it to true in the meantime
  dragStartPosition = getTransformedPoint(event.offsetX, event.offsetY)
  // waiting between the moment of click and .005s after to see if mouse has moved to see if click is dragged or not
  setTimeout(() => {
    if (!isMoving) {
      // is not dragged
      emit("closeDrawer")
      objects.forEach((object) => {
        if (isObjectHovered(object, dragStartPosition)) {
          object.isSelected = true
          emit("openDrawer")
          emit("selectWorkshop", object.image, object.a, object.c, object.d, object.dr, object.end)
        }
        else {
          object.isSelected = false
        }
      })
    }
    upendDisplay()
  }, 50)
}

const onMouseMove = (event) => {
  isMoving = true
  currentTransformedCursor = getTransformedPoint(event.offsetX, event.offsetY)
  objects.forEach((object) => {
    if (isObjectHovered(object, dragStartPosition)) {
      canvas.style.cursor = "pointer"
    }
    else {
      canvas.style.cursor = "move"
    }
  })
  if (isMouseDown) {
    context.translate(
      currentTransformedCursor.x - dragStartPosition.x,
      currentTransformedCursor.y - dragStartPosition.y
    )
    upendDisplay()
  }
}

const onMouseUp = () => {
  isMouseDown = false
}

const onWheel = (event) => {
  const zoom = event.deltaY < 0 ? 1.1 : 0.9
  context.translate(currentTransformedCursor.x, currentTransformedCursor.y)
  context.scale(zoom, zoom)
  context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y)
  upendDisplay()
  event.preventDefault()
}

defineExpose({ resetObjectSelection })
onMounted(() => {
  background.src = "/src/assets/images/plan.jpg"
  canvas = document.getElementById("canvas")
  context = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context.imageSmoothingEnabled = false // See individual pixels when zooming
  canvas.addEventListener("mousedown", onMouseDown)
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mouseup", onMouseUp)
  canvas.addEventListener("wheel", onWheel)
  setTimeout(() => {
    upendDisplay()
  }, 1)
})
</script>

<template>
  <canvas id="canvas" class="w-screen h-screen cursor-move"></canvas>
</template>
