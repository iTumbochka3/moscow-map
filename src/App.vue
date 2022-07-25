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
      this.$store.dispatch('generateMarkers', Array.from({ length: 5 }, () => {
        const lng = this.getRandomInRange(37.37, 37.84);
        const lat = this.getRandomInRange(55.57, 55.9);
        return {
          district: this.getDistrictCode(lat, lng),
          position: { lat: lat, lng: lng }
        };
      }));
    },

    getRandomInRange(from, to) {
      return +(Math.random() * (to - from) + from).toFixed(6);
    },

    getDistrictCode(lat, lng,) {
      let result = '';

      this.polygons.forEach(item => {
        const polygon = JSON.parse(JSON.stringify(item.paths));
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          let lat_i = polygon[i].lat;
          let lng_i = polygon[i].lng;
          let lat_j = polygon[j].lat;
          let lng_j = polygon[j].lng;

          const intersect = ((lng_i > lng) != (lng_j > lng))
            && (lat < (lat_j - lat_i) * (lng - lng_i) / (lng_j - lng_i) + lat_i);
          result = intersect ? item.code : result;
        }
      });

      return result;
    },
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
