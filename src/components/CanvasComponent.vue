<script setup>
import { onMounted } from 'vue'
// Credits: https://roblouie.com/article/617
class CanvasObject {
  constructor(id, color, x, y, scale) {
    this.id = id
    this.image = new Image()
    this.image.src = color == "green" ? "/src/assets/images/green.png" : "/src/assets/images/red.png"
    this.x = x + window.innerWidth / 2
    this.y = y + window.innerHeight / 2
    this.width = this.image.width * scale
    this.height = this.image.height * scale
    this.isSelected = false
  }

  getGlobalCoordinates() {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
  }
}

class CanvasLink {
  constructor(startId, endId) {
    this.startId = startId
    this.endId = endId
  }
}

var canvas
var context
const objects = [
  new CanvasObject("1", "red", 0, 0, 0.25),
  new CanvasObject("2", "green", 200, 200, 0.25)
]
const links = [
  new CanvasLink("1", "2")
]
var isMouseDown = false
var isMoving = false
var dragStartPosition = { x: 0, y: 0 }
var currentTransformedCursor
var outlineSpacing = 3

function getCanvasObjectById(id) {
  var res = null
  objects.forEach((object) => {
    if (object.id == id) res = object
  })
  return res
}

function updateDisplay() {
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
  links.forEach((link) => {
    context.beginPath()
    context.setLineDash([15, 5])
    context.strokeStyle = "black"
    var startCoordinates = getCanvasObjectById(link.startId).getGlobalCoordinates()
    var endCoordinates = getCanvasObjectById(link.endId).getGlobalCoordinates()
    context.moveTo(startCoordinates.x, startCoordinates.y)
    context.lineTo(endCoordinates.x, endCoordinates.y)
    context.stroke()
    context.setLineDash([])
  })
  objects.forEach((object) => {
    context.shadowBlur = 10
    context.shadowColor = "rgb(128, 128, 128)"
    context.drawImage(
      object.image,
      object.x,
      object.y,
      object.width,
      object.height
    )
    if (object.isSelected) {
      context.strokeStyle = "rgb(255, 255, 255)"
      context.beginPath()
      context.roundRect(object.x - outlineSpacing, object.y - outlineSpacing, object.width + outlineSpacing * 2, object.height + outlineSpacing * 2, [15])
      context.stroke()
    }
    context.shadowBlur = 0
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
      objects.forEach((object) => {
        if (isObjectHovered(object, dragStartPosition)) {
          object.isSelected = true
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
