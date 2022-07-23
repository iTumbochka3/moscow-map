<template>
  <div class="pie-chart-div">
    pie-chart-div
  </div>
</template>

<script>
export default {
  name: 'PieChartComponent',
  props: {
    marks: [],
  },
  methods: {
    chooseDistrict() {
      const data = [];
      this.$emit('chooseDistrict', data);
    },
  },
}
</script>

<style scoped>
.pie-chart-div {
  background: red;
}
</style>
