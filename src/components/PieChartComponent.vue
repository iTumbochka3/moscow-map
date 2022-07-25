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
      series.dataFields.value = "markers";
      series.dataFields.category = "district";

      chart.data = [{
        "district": "Центральный",
        "code": "CentralAdministrativeOkrug",
        "markers": 0
      }, {
        "district": "Северный",
        "code": "NorthernAdministrativeOkrug",
        "markers": 0
      }, {
        "district": "Северо-Восточный",
        "code": "North-EasternAdministrativeOkr",
        "markers": 0
      }, {
        "district": "Восточный",
        "code": "EasternAdministrativeOkrug",
        "markers": 0
      }, {
        "district": "Юго-Восточный",
        "code": "South-EasternAdministrativeOkr",
        "markers": 0
      }, {
        "district": "Южный",
        "code": "SouthernAdministrativeOkrug",
        "markers": 0
      }, {
        "district": "Юго-Западный",
        "code": "South-WesternAdministrativeOkr",
        "markers": 0
      }, {
        "district": "Западный",
        "code": "WesternAdministrativeOkrug",
        "markers": 0
      }, {
        "district": "Северо-Западный",
        "code": "North-WesternAdministrativeOkr",
        "markers": 0
      }, {
        "district": "Зеленоградский",
        "code": "ZelenogradskyAdministrativeOkr",
        "markers": 0
      },
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
