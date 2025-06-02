<script setup>
import { onMounted } from 'vue'
import ApexCharts from 'apexcharts'

const chartConfig = {
    series: [
        {
            name: "Complétion",
            data: [90, 85, 75, 13],
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
            "Caractérisation",
            "Assainissement",
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
        theme: "dark",
    },
}

onMounted(() => {
    var chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig)
    chart.render()
})
</script>

<template>
    <div class="relative flex flex-col bg-clip-border text-gray-700">
        <div class="pb-0">
            <div id="bar-chart"></div>
        </div>
    </div>
</template>