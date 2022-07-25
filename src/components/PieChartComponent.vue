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
      chartData: [],
    }
  },
  computed: {
    markers() {
      return this.$store.getters.getMarkers;
    },
    districtsInfo() {
      return this.$store.getters.getDistrictsInfo;
    },
  },
  watch: {
    markers() {
      this.chartData.forEach(chart => { chart.markers = 0; });
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
      series.slices.template.stroke = am4core.color("black");
      series.slices.template.propertyFields.fill = "color";

      this.chartData = Object.entries(this.districtsInfo).map(([key, value]) => {
        return {
          district: value.name,
          code: key,
          markers: 0,
          color: am4core.color(value.color)
        }
      });

      series.slices.template.events.on("hit", (ev) => {
        this.$store.dispatch('toggleActiveZones', ev.target.dataItem.dataContext.code);
      });
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
