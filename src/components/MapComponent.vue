<template>
  <GMapMap class="map-div" :center="defaultCenter" :zoom="defaultZoom" map-type-id="terrain">
    <GMapMarker v-for="(m, index) in markers" :key="m + index" :position="m.position" />
    <GMapPolygon v-for="p in polygons" :key="p.type" :paths="p.paths" />
  </GMapMap>
</template>

<script>

export default {
  name: 'MapComponent',
  data() {
    return {
      defaultCenter: { lat: 55.751244, lng: 37.618423 },
      defaultZoom: 10,
    }
  },
  computed: {
    polygons() {
      return this.$store.getters.getPolygons;
    },
    markers() {
      return this.$store.getters.getMarkers;
    },
  },
}
</script>

<style scoped>
.map-div {
  height: 500px;
  margin: 8px;
}
</style>
