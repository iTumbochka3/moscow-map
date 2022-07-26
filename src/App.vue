<template>
  <div class="main-container">
    <div class="toolbar">
      <button class='custom-btn' @click='generateMarkers'>Генерация координат</button>
      <PieChartComponent />
    </div>
    <MapComponent />
  </div>
</template>

<script>
import { toRaw } from 'vue';
import MapComponent from './components/MapComponent.vue';
import PieChartComponent from './components/PieChartComponent.vue';

export default {
  name: 'App',
  components: {
    MapComponent,
    PieChartComponent
  },
  computed: {
    polygons() {
      return this.$store.getters.getPolygons;
    },
  },
  mounted() {
    this.$store.dispatch('drawPolygons');
    this.generateMarkers();
  },
  methods: {
    generateMarkers() {
      this.$store.dispatch('clearActiveZones');
      this.$store.dispatch('generateMarkers', Array.from({ length: 100 }, () => {
        let lng, lat, district;
        while (!district) {
          lng = this.getRandomInRange(37.18, 37.94);
          lat = this.getRandomInRange(55.47, 56);
          this.polygons.forEach(polygon => {
            if (this.getDistrictCode(lat, lng, toRaw(polygon.paths))) {
              district = polygon.code
            }
          });
        }
        return {
          district: district,
          position: { lat: lat, lng: lng }
        };
      }));
    },

    getRandomInRange(from, to) {
      return +(Math.random() * (to - from) + from).toFixed(6);
    },
    
    getDistrictCode(x, y, polygon) {
      let n = polygon.length;
      let count = 0;

      for (let i = 0; i < n - 1; ++i) {
        let side = {
          a: {
            x: polygon[i].lat,
            y: polygon[i].lng
          },
          b: {
            x: polygon[i + 1].lat,
            y: polygon[i + 1].lng
          }
        }

        let x1 = side.a.x;
        let x2 = side.b.x;
        let y1 = side.a.y;
        let y2 = side.b.y;
        if (y < y1 != y < y2 && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) {
          count += 1;
        }
      }
      return count % 2 == 0 ? false : true;
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
}

.custom-btn {
  height: 30px;
}
</style>
