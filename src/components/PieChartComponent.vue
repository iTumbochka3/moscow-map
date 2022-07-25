<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  name: 'PieChartComponent',
  data() {
    return {
      chart: {},
      chartData: [
        {
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
      ],
    }
  },
  computed: {
    markers() {
      return this.$store.getters.getMarkers;
    },
  },
  watch: {
    markers() {
      this.markers.forEach(marker => {
        this.chartData.forEach(chart => {
          if (marker.district === chart.code) {
            chart.markers++;
          }
        });
      });
      this.chart.data = this.chartData;
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      this.chart = am4core.create("chartdiv", am4charts.PieChart);

      const series = this.chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "markers";
      series.dataFields.category = "district";
    },

    chooseDistrict() {
    },
  },
}
</script>

<style scoped>
#chartdiv {
  flex-grow: 1;
  height: 300px;
}
</style>
