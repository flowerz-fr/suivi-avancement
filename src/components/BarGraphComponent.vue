<script setup>
import { onMounted, watch } from 'vue'
import ApexCharts from 'apexcharts'
import Workshop from '@/stores/Workshop'

const props = defineProps({
    currentWorkshop: {
        type: Workshop,
        required: true
    }
})

const chartConfig = {
    series: [
        {
            name: "Complétion",
            data: [
                props.currentWorkshop.a * 100 / props.currentWorkshop.ta + "% (" + props.currentWorkshop.a + "/" + props.currentWorkshop.ta + ")",
                props.currentWorkshop.c * 100 / props.currentWorkshop.tc + "% (" + props.currentWorkshop.c + "/" + props.currentWorkshop.tc + ")",
                props.currentWorkshop.d * 100 / props.currentWorkshop.td + "% (" + props.currentWorkshop.d + "/" + props.currentWorkshop.td + ")",
                props.currentWorkshop.dr * 100 / props.currentWorkshop.tdr + "% (" + props.currentWorkshop.dr + "/" + props.currentWorkshop.tdr + ")"
            ],
        },
    ],
    chart: {
        type: "bar",
        height: 240,
        toolbar: {
            show: false,
        },
    },
    title: {
        show: "",
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["#020617"],
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: 2,
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
            return "<span class=\"px-1\">" + series.series[0][series.dataPointIndex] + "%</span>"
        }
    },
}

const formatToPercent = (value) => {
    return Math.ceil(Math.min(Math.max(value, 0), 100))
}

const refresh = () => {
    chart.updateSeries([{
        data: [
            formatToPercent(props.currentWorkshop.a * 100 / props.currentWorkshop.ta),
            formatToPercent(props.currentWorkshop.c * 100 / props.currentWorkshop.tc),
            formatToPercent(props.currentWorkshop.d * 100 / props.currentWorkshop.td),
            formatToPercent(props.currentWorkshop.dr * 100 / props.currentWorkshop.tdr)
        ]
    }])
}

var chart
onMounted(() => {
    chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig)
    chart.render()
    refresh()
})

watch(props, (o, n) => {
    refresh()
})
</script>

<template>
    <div class="relative flex flex-col bg-clip-border text-gray-700">
        <div class="pb-0">
            <div id="bar-chart"></div>
        </div>
    </div>
</template>