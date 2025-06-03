<script setup>
import { useWorkshopStore } from '@/stores/workshops'
import { onMounted, ref } from 'vue'

const emit = defineEmits(["openDrawer", "closeDrawer", "selectWorkshop"])

var objects = ref(null)
var canvas
var context
var background = new Image()
var isMouseDown = false
var isMoving = false
var dragStartPosition = { x: 0, y: 0 }
var currentTransformedCursor

// Credits: https://roblouie.com/article/617
const updateDisplay = () => {
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
  context.lineWidth = 2
  context.drawImage(background, 0, 0, 2200, 622)
  objects.value.forEach((object) => {
    context.strokeStyle = object.isSelected ? "oklch(86.5% 0.127 207.078)" : "rgba(255, 255, 255, 0.7)"
    context.beginPath()
    context.roundRect(object.x, object.y, object.width, object.height, [15])
    context.stroke()
  })
}

const resetObjectSelection = () => {
  objects.value.forEach((object) => {
    object.isSelected = false
  })
  updateDisplay()
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
      objects.value.forEach((object) => {
        if (isObjectHovered(object, dragStartPosition)) {
          object.isSelected = true
          emit("openDrawer")
          emit("selectWorkshop", object)
        }
        else {
          object.isSelected = false
        }
      })
    }
    updateDisplay()
  }, 50)
}

const onMouseMove = (event) => {
  isMoving = true
  currentTransformedCursor = getTransformedPoint(event.offsetX, event.offsetY)
  objects.value.forEach((object) => {
    if (isObjectHovered(object, dragStartPosition)) {
      document.body.style.cursor = "pointer"
      console.log("oeee")
    }
    else {
      document.body.style.cursor = "move"
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

const onMouseUp = () => {
  isMouseDown = false
}

const onWheel = (event) => {
  const zoom = event.deltaY < 0 ? 1.1 : 0.9
  context.translate(currentTransformedCursor.x, currentTransformedCursor.y)
  context.scale(zoom, zoom)
  context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y)
  updateDisplay()
  event.preventDefault()
}

defineExpose({ resetObjectSelection })
var store = useWorkshopStore()
onMounted(() => {
  objects.value = store.workshops
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
    updateDisplay()
  }, 1)
})
</script>

<template>
  <canvas id="canvas" class="w-screen h-screen cursor-move"></canvas>
</template>
