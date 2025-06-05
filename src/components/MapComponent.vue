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

var map

onMounted(() => {
    map = new maplibregl.Map({
        container: 'map',
        maxZoom: 20,
        minZoom: 15,
        style:
            `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
        center: [-1.881001, 49.678638], // lon, lat
        zoom: 15,
        pitch: 45,
        bounds: [[-1.881001, 49.678638], [-1.881001, 49.678638]]
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
                        15,
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
    })
})
</script>

<template>
    <div id="map" class="w-full"></div>
</template>