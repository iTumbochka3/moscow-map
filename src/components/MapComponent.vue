<template>
  <GMapMap class="map-div" :center="defaultCenter" :zoom="defaultZoom" map-type-id="terrain">
    <GMapMarker v-for="(m, index) in markers" :key="m + index" :position="m.position" @click="openInfoWindow(m)" />
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
  methods: {
    openInfoWindow(event) {
      this.polygons.forEach((polygon) => {
        console.log(polygon.name, this.inside(JSON.parse(JSON.stringify(event)), JSON.parse(JSON.stringify(polygon.paths))));
      });
    },

    inside(marker, polygon) {
      let result = false;
      const x = marker.position.lat;
      const y = marker.position.lng;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].lat;
        let yi = polygon[i].lng;
        let xj = polygon[j].lat;
        let yj = polygon[j].lng;

        const intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) result = !result;
      }

      return result;
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
