<template>
  <div class="map-div">
    {{ marks }}
  </div>
</template>

<script>
export default {
  name: 'MapComponent',
  props: {
    marks: []
  },
}
</script>

<style scoped>
.map-div {
  margin: 8px;
}
</style>
