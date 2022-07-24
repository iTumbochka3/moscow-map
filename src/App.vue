<template>
  <div class="main-container">
    <div class="toolbar">
      <button class='custom-btn' @click='generateMarks'>Генерация координат</button>
      <PieChartComponent @chooseDistrict='chooseDistrict' />
    </div>
    <MapComponent :markers='marks' />
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
      marks: [],
    }
  },
  mounted() {
    this.generateMarks();
  },
  methods: {
    generateMarks() {
      this.marks = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
    },
    chooseDistrict() {

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
