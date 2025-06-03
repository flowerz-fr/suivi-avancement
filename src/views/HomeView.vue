<script setup>
import { ref } from "vue"
import CanvasComponent from '../components/CanvasComponent.vue'
import UiComponent from '../components/UiComponent.vue'

const isDrawerOpen = ref(false)
const canvas = ref(null)

const currentWorkshop = ref({
  image: "",
  a: 0,
  c: 0,
  d: 0,
  dr: 0,
  date: "01/01/1979",
  ta: 0,
  tc: 0,
  td: 0,
  tdr: 0
})

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  canvas.value.resetObjectSelection()
}

const selectWorkshop = (image, a, c, d, dr, date, ta, tc, td, tdr) => {
  currentWorkshop.value = {
    image: image,
    a: a,
    c: c,
    d: d,
    dr: dr,
    date: date,
    ta: ta,
    tc: tc,
    td: td,
    tdr: tdr
  }
}
</script>

<template>
  <main>
    <CanvasComponent @open-drawer="openDrawer" @close-drawer="closeDrawer" @select-workshop="selectWorkshop"
      ref="canvas" />
    <map name="up2map"><area shape="poly" coords="483,153,489,165,493,164,493,163,498,162,501,167,504,166,503,163,502,160,505,159,508,164,508,167,511,166,511,163,507,157,507,152,502,143,500,143,498,142,497,142,496,142,496,140,492,141,492,144,491,144,491,142,489,143,489,146,483,147" title="STE2" alt="STE2"/><area shape="poly" coords="406,175,407,184,409,189,411,192,417,190,416,187,418,187,424,186,423,175,422,172" title="SILO115" alt="SILO115"/><area shape="poly" coords="405,177,398,178,399,185,401,190,407,188" title="SILO 128" alt="SILO 128"/><area shape="poly" coords="54,88,49,89,48,87,42,88,43,93,45,99,56,98" title="SILO130" alt="SILO130"/><area shape="poly" coords="665,141,665,153,673,159,695,154,695,150,693,148,693,143,687,136" title="ELANIIB" alt="ELANIIB"/><area shape="poly" coords="702,113,730,107,736,114,709,120,703,121,703,131,697,124,698,118,701,118" title="DEG" alt="DEG" href="/sites/CPDM/Pg/P_DEG/SitePages/Accueil.aspx"/><area shape="poly" coords="708,85,702,86,702,89,698,89,696,88,689,89,689,91,688,91,688,96,683,97,682,103,691,114,689,115,690,117,692,121,696,121,696,118,700,117,700,113,726,107,724,106,724,104" href="/sites/CPDM/Pg/P_HADE/SitePages/Accueil.aspx" title="HADE" alt="HADE"/><area shape="poly" coords="765,116,760,118,760,111,758,108,752,102,761,100,766,106" title="HAONVFLT" alt="HAONVFLT"/><area shape="poly" coords="727,89,722,90,721,98,728,106,730,108,742,105,742,103,729,89,729,89" title="HAOSUD" alt="HAOSUD"/><area shape="poly" coords="725,89,725,86,727,86,727,81,739,79,753,95,752,102,751,102,752,103,749,103,748,102,747,104,743,105,743,102,730,88,727,89" title="HAONORD" alt="HAONORD"/><area shape="poly" coords="563,92,566,96,566,100,571,105,572,116,596,111,596,98,595,98,595,96,594,94,592,94,589,88,572,92,571,90" title="MAU" alt="MAU" href="/sites/CPDM/Pg/P_MAU/SitePages/Accueil.aspx"/><area shape="poly" coords="571,118,556,121,552,116,551,108,547,101,548,89,554,88,556,92,560,91,559,88,560,88,563,92,566,96,566,99,571,105" title="MAPu" alt="MAPu" href="/sites/CPDM/Pg/P_MAPU/SitePages/Accueil.aspx"/><area shape="poly" coords="654,127,649,128,649,126,653,131,653,135,649,136,649,138,630,142,628,139,626,139,627,142,628,145,623,145,620,142,620,139,621,139,619,136,619,135,623,134,625,134,625,132,630,131,629,130,633,129,635,128,633,127,628,129,625,126,623,123,620,117,620,115,625,113,625,104,644,100,653,112,653,116,655,118,655,127" title="HAPF" alt="HAPF" href="/sites/CPDM/Pg/P_HAPF/SitePages/Accueil.aspx"/><area shape="poly" coords="733,108,753,103,760,111,760,122,757,122,757,120,752,115,742,118,742,120,740,118,737,115,737,114,733,108" title="HAOSILO" alt="HAOSILO"/> </map>
    <UiComponent :is-drawer-open="isDrawerOpen" :current-workshop="currentWorkshop" @close-drawer="closeDrawer" />
  </main>
</template>
