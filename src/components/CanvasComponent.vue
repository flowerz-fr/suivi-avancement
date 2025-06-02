<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(["openDrawer", "closeDrawer", "selectWorkshop"])

// Credits: https://roblouie.com/article/617
class CanvasObject {
  constructor(id, x, y, scale, image, indicator1, indicator2, indicator3, indicator4, date) {
    this.id = id
    this.x = x + window.innerWidth / 2
    this.y = y + window.innerHeight / 2
    this.width = 302 * scale
    this.height = 302 * scale
    this.isSelected = false
    this.image = image
    this.indicator1 = indicator1
    this.indicator2 = indicator2
    this.indicator3 = indicator3
    this.indicator4 = indicator4
    this.date = date
  }

  getGlobalCoordinates() {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
  }
}

const objects = [
  new CanvasObject("orange", 975, -230, 0.25, "hade", 1, 2, 3, 4, "01/02/2023"),
  new CanvasObject("red", 792, -145, 0.25, "hade", 1, 15, 3, 4, "01/10/2023"),
  new CanvasObject("green", 840, -280, 0.4, "hade", 1, 65, 3, 4, "01/06/2023"),
  new CanvasObject("green", 670, -240, 0.3, "mau", 1, 19, 3, 4, "01/02/2023"),
  new CanvasObject("green", 472, -292, 0.43, "mau", 1, 1, 3, 4, "01/02/2023"),
  new CanvasObject("blue", 293, -130, 0.25, "mapu", 1, 9, 3, 4, "01/02/2023"),
  new CanvasObject("blue", -7, -147, 0.28, "mapu", 1, 94, 3, 4, "01/02/2023"),
  new CanvasObject("blue", -7, -147, 0.28, "mapu", 1, 36, 3, 4, "01/02/2023"),
]
var canvas
var context
var background = new Image()
var isMouseDown = false
var isMoving = false
var dragStartPosition = { x: 0, y: 0 }
var currentTransformedCursor
var outlineSpacing = 3

function updateDisplay() {
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
  context.drawImage(background, 0, 0, 2183, 805)
  objects.forEach((object) => {
    context.strokeStyle = object.isSelected ? "rgb(230, 230, 0)" : "rgb(255, 255, 255)"
    context.beginPath()
    context.roundRect(object.x - outlineSpacing, object.y - outlineSpacing, object.width + outlineSpacing * 2, object.height + outlineSpacing * 2, [15])
    context.stroke()
  })
}

function getTransformedPoint(x, y) {
  const originalPoint = new DOMPoint(x, y)
  return context.getTransform().invertSelf().transformPoint(originalPoint)
}

function isObjectHovered(object, mouseCoordinates) {
  return (
    mouseCoordinates.x > (object.x) &&
    mouseCoordinates.x < (object.x + object.width) &&
    mouseCoordinates.y > (object.y) &&
    mouseCoordinates.y < (object.y + object.height)
  )
}

function onMouseDown(event) {
  isMouseDown = true
  isMoving = false // defaulting to false to compare if onMouseMove sets it to true in the meantime
  dragStartPosition = getTransformedPoint(event.offsetX, event.offsetY)
  // waiting between the moment of click and .005s after to see if mouse has moved to see if click is dragged or not
  setTimeout(function () {
    if (!isMoving) {
      // is not dragged
      emit("closeDrawer")
      objects.forEach((object) => {
        if (isObjectHovered(object, dragStartPosition)) {
          object.isSelected = true
          emit("openDrawer")
          emit("selectWorkshop", object.image, object.indicator1, object.indicator2, object.indicator3, object.indicator4, object.date)
        }
        else {
          object.isSelected = false
        }
      })
    }
    updateDisplay()
  }, 50)
}

function onMouseMove(event) {
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
    updateDisplay()
  }
}

function onMouseUp() {
  isMouseDown = false
}

function onWheel(event) {
  const zoom = event.deltaY < 0 ? 1.1 : 0.9
  context.translate(currentTransformedCursor.x, currentTransformedCursor.y)
  context.scale(zoom, zoom)
  context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y)
  updateDisplay()
  event.preventDefault()
}

onMounted(() => {
  background.src = "/src/assets/images/background.jpg"
  canvas = document.getElementById("canvas")
  context = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context.imageSmoothingEnabled = false // See individual pixels when zooming
  canvas.addEventListener("mousedown", onMouseDown)
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mouseup", onMouseUp)
  canvas.addEventListener("wheel", onWheel)
  setTimeout(function () {
    updateDisplay()
  }, 1)
})
</script>

<template>
  <canvas id="canvas" class="w-screen h-screen cursor-move"></canvas>
</template>
