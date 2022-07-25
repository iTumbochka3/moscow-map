<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  name: 'PieChartComponent',
  computed: {
    markers() {
      return this.$store.getters.getMarkers;
    },
  },
  methods: {
    createChart() {
      const chart = am4core.create("chartdiv", am4charts.PieChart);

      const series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "marks";
      series.dataFields.category = "district";

      chart.data = [{
        "district": "Центральный",
        "marks": 0
      }, {
        "district": "Северный",
        "marks": 0
      }, {
        "district": "Северо-Восточный",
        "marks": 0
      }, {
        "district": "Восточный",
        "marks": 0
      }, {
        "district": "Юго-Восточный",
        "marks": 0
      }, {
        "district": "Южный",
        "marks": 0
      }, {
        "district": "Юго-Западный",
        "marks": 0
      }, {
        "district": "Западный",
        "marks": 0
      }, {
        "district": "Северо-Западный",
        "marks": 0
      }, {
        "district": "Зеленоградский",
        "marks": 0
      }, 
      // {
      //   "district": "Троицкий",
      //   "marks": 0
      // }, {
      //   "district": "Новомосковский",
      //   "marks": 0
      // }
      ];
    },

    chooseDistrict() {
    },
  },
  mounted() {
    this.createChart();
  },
}
</script>

<style scoped>
#chartdiv {
  flex-grow: 1;
  height: 300px;
}
</style>
