<script setup>
import { onMounted, watch } from 'vue'
import ApexCharts from 'apexcharts'
import Workshop from '@/stores/Workshop'
import { useWorkshopStore } from '@/stores/workshops'

const props = defineProps({
    currentWorkshop: {
        type: Workshop,
        required: true
    }
})

const store = useWorkshopStore()

const chartConfig = {
    series: [
        {
            name: "Précédente mise à jour",
            data: [
                props.currentWorkshop.a * 100 / props.currentWorkshop.ta - 10,
                props.currentWorkshop.c * 100 / props.currentWorkshop.tc - 10,
                props.currentWorkshop.d * 100 / props.currentWorkshop.td - 10,
                props.currentWorkshop.dr * 100 / props.currentWorkshop.tdr - 10
            ],
        }
    ],
    chart: {
        type: "bar",
        height: 300,
        toolbar: {
            show: false,
        },
        stacked: true,
        zoom: {
            enabled: true
        }
    },
    title: {
        show: "",
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        fontFamily: 'inherit'
    },
    colors: ["#020617", "#039855"],
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: 2
        },
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        labels: {
            style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
            },
        },
        categories: [
            "Assainissement",
            "Caractérisation",
            "Démantèlement",
            "Déclassement radio",
        ],
    },
    yaxis: {
        labels: {
            style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
            },
        },
        min: 0,
        max: 100,
        decimalsInFloat: 0
    },
    grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            top: 5,
            right: 20,
        },
    },
    fill: {
        opacity: 0.8,
    },
    tooltip: {
        theme: "light",
        custom: (series, seriesIndex, dataPointIndex, w) => {
            var properties = Object.values(props.currentWorkshop)
            var value = properties[4 + 2 * series.dataPointIndex] // indicators start at [4] and there is the total of each indicator after each one
            var total = properties[5 + 2 * series.dataPointIndex]
            return "<span class=\"px-1\">" + Math.round(value * 100 / total) + "%</span>"
        }
    },
}

const formatToPercent = (value) => {
    return Math.ceil(Math.min(Math.max(value, 0), 100))
}

const refresh = () => {
    chart.updateSeries([
        {
            data: [
                formatToPercent(props.currentWorkshop.a * 100 / props.currentWorkshop.ta - 10),
                formatToPercent(props.currentWorkshop.c * 100 / props.currentWorkshop.tc - 10),
                formatToPercent(props.currentWorkshop.d * 100 / props.currentWorkshop.td - 10),
                formatToPercent(props.currentWorkshop.dr * 100 / props.currentWorkshop.tdr - 10)
            ]
        }
    ])
    chart.appendSeries({
        name: "Dernière mise à jour",
        data: [
            formatToPercent(props.currentWorkshop.a * 100 / props.currentWorkshop.ta - formatToPercent(props.currentWorkshop.a * 100 / props.currentWorkshop.ta - 10)),
            formatToPercent(props.currentWorkshop.c * 100 / props.currentWorkshop.tc - formatToPercent(props.currentWorkshop.c * 100 / props.currentWorkshop.tc - 10)),
            formatToPercent(props.currentWorkshop.d * 100 / props.currentWorkshop.td - formatToPercent(props.currentWorkshop.d * 100 / props.currentWorkshop.td - 10)),
            formatToPercent(props.currentWorkshop.dr * 100 / props.currentWorkshop.tdr - formatToPercent(props.currentWorkshop.dr * 100 / props.currentWorkshop.tdr - 10))
        ]
    })
}

var chart
onMounted(() => {
    chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig)
    chart.render()
    refresh()
})

watch(props, (o, n) => {
    refresh()
    console.log("current")
    console.log(store.currentWorkshop)
    console.log("old")
    console.log(store.currentOldWorkshop)
})
</script>

<template>
    <div class="relative flex flex-col bg-clip-border text-gray-700">
        <div class="pb-0">
            <div id="bar-chart"></div>
        </div>
    </div>
</template>