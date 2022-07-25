<template>
  <GMapMap class="map-div" :center="defaultCenter" :zoom="defaultZoom" map-type-id="terrain">
    <GMapMarker v-for="(m, index) in markers" :key="m + index" :position="showMarker(m)" />
    <GMapPolygon v-for="p in polygons" :key="p.type" :paths="p.paths" :options="p.options" />
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
    activeZones() {
      return this.$store.getters.getActiveZones;
    }
  },
  methods: {
    showMarker(marker) {
      if (this.activeZones.length > 0 && this.activeZones.indexOf(marker.district) < 0) {
        return null;
      }
      return marker.position;
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
