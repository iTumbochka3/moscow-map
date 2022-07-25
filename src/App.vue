<template>
  <div class="main-container">
    <div class="toolbar">
      <button class='custom-btn' @click='generateMarks'>Генерация координат</button>
      <PieChartComponent />
    </div>
    <MapComponent :markers='markers' />
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
  data() {
    return {
      markers: [],
    }
  },
  mounted() {
    this.generateMarkers();
  },
  methods: {
    generateMarkers() {
      this.markers = Array.from({ length: 100 }, () => {
        const lng = this.getRandomInRange(37.37, 37.84);
        const lat = this.getRandomInRange(55.57, 55.9);
        return { position: { lat: lat, lng: lng } };
      });
    },
    getRandomInRange(from, to) {
      return +(Math.random() * (to - from) + from).toFixed(6);
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
  margin: 8px;
}

.custom-btn {
  height: 30px;
}
</style>
