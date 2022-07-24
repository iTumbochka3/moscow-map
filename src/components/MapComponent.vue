<template>
  <GMapMap class="map-div" :center="defaultCenter" :zoom="defaultZoom">
    <GMapMarker :key="index" v-for="(m, index) in markers" />
  </GMapMap>
</template>

<script>
export default {
  name: 'MapComponent',
  props: ['markers'],
  data() {
    return {
      defaultCenter: { lat: 55.751244, lng: 37.618423 },
      defaultZoom: 10,
    }
  },
}
</script>

<style scoped>
.map-div {
  height: 500px;
  margin: 8px;
}
</style>
