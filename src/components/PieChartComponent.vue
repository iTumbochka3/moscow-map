<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  name: 'PieChartComponent',
  props: ['marks'],
  methods: {
    chooseDistrict() {
      const data = [];
      this.$emit('chooseDistrict', data);
    },
  },
  mounted() {
    const chart = am4core.create("chartdiv", am4charts.PieChart);

    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "marks";
    series.dataFields.category = "district";

    chart.data = [{
      "district": "Центральный",
      "marks": 20
    }, {
      "district": "Северный",
      "marks": 5
    }, {
      "district": "Северо-Восточный",
      "marks": 5
    }, {
      "district": "Восточный",
      "marks": 5
    }, {
      "district": "Юго-Восточный",
      "marks": 5
    }, {
      "district": "Южный",
      "marks": 5
    }, {
      "district": "Юго-Западный",
      "marks": 5
    }, {
      "district": "Западный",
      "marks": 10
    }, {
      "district": "Северо-Западный",
      "marks": 10
    }, {
      "district": "Зеленоградский",
      "marks": 10
    }, {
      "district": "Троицкий",
      "marks": 10
    }, {
      "district": "Новомосковский",
      "marks": 10
    }];
  },
}
</script>

<style scoped>
#chartdiv {
  flex-grow: 1;
  height: 300px;
}
</style>
