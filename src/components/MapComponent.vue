<script setup>
import { onMounted } from 'vue';
import { useWorkshopStore } from '@/stores/workshops'

const emit = defineEmits(["openDrawer", "closeDrawer"])
const store = useWorkshopStore()
const MAPTILER_KEY = "EDqsUDjya9TWEYog9EpZ"

var isDragging = false

const onMouseDown = () => {
    isDragging = false
}

const onMouseMove = () => {
    isDragging = true
}

const onMouseUp = () => {
    setTimeout(() => {
        if(!isDragging)
            emit("closeDrawer")
    }, 10)
}

const onWheel = () => {}

var map

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
                'minzoom': 15,
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
                        10,
                        0,
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
            const el = document.createElement('div')
            el.className = 'marker'
            el.style.backgroundImage =
                `url(/src/assets/images/${workshop.image}.jpg)`

            el.addEventListener('click', () => {
                emit("openDrawer")
                store.mountWorkshop(workshop)
            })
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