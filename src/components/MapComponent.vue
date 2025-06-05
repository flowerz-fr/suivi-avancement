<script setup>
import { onMounted } from 'vue';
import { useWorkshopStore } from '@/stores/workshops'

const emit = defineEmits(["openDrawer", "closeDrawer"])
const store = useWorkshopStore()
const MAPTILER_KEY = "EDqsUDjya9TWEYog9EpZ"

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                'iconSize': [60, 60]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-66.324462890625, -16.024695711685304]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Bar',
                'iconSize': [50, 50]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-61.2158203125, -15.97189158092897]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Baz',
                'iconSize': [40, 40]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-63.29223632812499, -18.28151823530889]
            }
        }
    ]
}

const onMouseDown = () => {}

const onMouseMove = () => {}

const onMouseUp = () => {}

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
    /*store.workshops.forEach((workshop) => {
        // create a DOM element for the marker
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.backgroundImage =
            `url(/src/assets/images/${workshop.image}.jpg)`
        el.style.width = "50px"
        el.style.height = "50px"

        el.addEventListener('click', () => {
            emit("openDrawer")
            store.mountWorkshop(workshop)
        })

        // add marker to map
        new maplibregl.Marker({ element: el })
            .setLngLat([-1.881001, 49.678638])
            .addTo(map)
    })*/
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