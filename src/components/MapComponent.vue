<script setup>
import { onMounted } from 'vue';
import { useWorkshopStore } from '@/stores/workshops'

const emit = defineEmits(["openDrawer", "closeDrawer"])
const store = useWorkshopStore()
const MAPTILER_KEY = "EDqsUDjya9TWEYog9EpZ"

var isDragging = false
var map
var markerElList = []

const resetObjectSelection = () => {
    markerElList.forEach((markerEl) => {
        markerEl.children[0].classList.remove("bg-selected", "text-selected")
    })
}

const onMouseDown = () => {
    isDragging = false
}

const onMouseMove = () => {
    isDragging = true
}

const onMouseUp = () => {
    setTimeout(() => {
        if(!isDragging) {
            emit("closeDrawer")
            resetObjectSelection()
            store.dismountWorkshop()
        }
    }, 10)
}

const onWheel = () => {}

onMounted(() => {
    const switchButton = document.getElementById("switch-perspective")
    map = new maplibregl.Map({
        container: 'map',
        zoom: 15,
        maxZoom: 19, // close
        minZoom: 15, // far
        style:
            `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
        center: [-1.878, 49.678638], // lon, lat
        pitch: 55
    })
    map.on('load', () => {
        switchButton.addEventListener("mouseup", () => {
            var pitch = map.transform.pitch
            pitch == 0 ? map.setPitch(55) : map.setPitch(0)
            switchButton.innerHTML = pitch == 0 ? "2D" : "3D" 
        })
        const layers = map.getStyle().layers
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break
            }
        }
        map.addLayer(
            {
                'id': '3d-buildings',
                'source': 'openmaptiles',
                'source-layer': 'building',
                'type': 'fill-extrusion',
                'minzoom': 14,
                'filter': ['!=', ['get', 'hide_3d'], true],
                'paint': {
                    'fill-extrusion-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'render_height'], 0, 'lightgray', 200, 'royalblue', 400, 'lightblue'
                    ],
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        5,
                        16,
                        ['get', 'render_height']
                    ],
                    'fill-extrusion-base': ['case',
                        ['>=', ['get', 'zoom'], 16],
                        ['get', 'render_min_height'], 0
                    ]
                }
            },
            labelLayerId
        )
        store.workshops.forEach((workshop) => {
            if(workshop.zone != "4")
                return
            const el = document.createElement('div')
            el.classList = `text-${workshop.color}`
            el.innerHTML = `
            <div class="px-2 py-1 rounded-lg text-white pointer-events-auto cursor-pointer shadow-lg bg-${!workshop.isSelected ? workshop.color : "selected"} text-${!workshop.isSelected ? workshop.color : "selected"}" style="transform: translate(0, -55%)">
                <div class="font-sm font-bold marker-label text-white">${workshop.workshop}</div>
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="absolute bottom-0 mt-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="transform: translate(-50%, 50%); left: 50%" aria-hidden="true"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
            </div>`
            el.addEventListener('click', () => {
                resetObjectSelection()
                emit("openDrawer")
                store.mountWorkshop(workshop)
                el.children[0].classList.add("bg-selected", "text-selected")
            })
            markerElList.push(el)
            new maplibregl.Marker({ element: el })
                .setLngLat([workshop.x, workshop.y])
                .addTo(map)
        })
        const mapEl = document.getElementsByClassName("maplibregl-canvas")[0]
        mapEl.addEventListener("mousedown", onMouseDown)
        mapEl.addEventListener("mousemove", onMouseMove)
        mapEl.addEventListener("mouseup", onMouseUp)
        mapEl.addEventListener("wheel", onWheel)
    })
})
</script>

<template>
    <div id="map" class="w-full"></div>
</template>