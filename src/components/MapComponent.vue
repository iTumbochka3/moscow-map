<template>
  <GMapMap class="map-div" :center="defaultCenter" :zoom="defaultZoom" map-type-id="terrain">
    <GMapMarker :key="m + index" v-for="(m, index) in markers" :position="m.position" @click="openInfoWindow(m)" />
    <GMapPolygon v-for="p in polygons" :key="p.type" :paths="p.paths" />
  </GMapMap>
</template>

<script>
import * as districtsJson from '../assets/districts.json';

export default {
  name: 'MapComponent',
  props: ['markers'],
  data() {
    return {
      defaultCenter: { lat: 55.751244, lng: 37.618423 },
      defaultZoom: 10,
      polygons: [],
      moscow: [],
    }
  },
  methods: {
    drawDistrictsPolygons(file) {
      this.polygons = [];
      Object.entries(file).filter((item) => item[0] !== 'default').forEach((item) => {
        const paths = [];
        item[1].geometry.coordinates.forEach(el1 => {
          el1.forEach(el2 => {
            paths.push(el2.map((c) => { return { lat: c[1], lng: c[0] } }));
          });
        });
        this.polygons.push(...paths.map((path, index) => {
          return {
            name: item[0],
            type: item[0] + '_' + index,
            paths: path,
          }
        }));
      });
    },

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
  mounted() {
    this.drawDistrictsPolygons(districtsJson);
  },
}
</script>

<style scoped>
.map-div {
  height: 500px;
  margin: 8px;
}
</style>
