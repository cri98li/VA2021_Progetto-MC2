<template>
  <Plotly :data="data" :layout="layout"></Plotly>
</template>

<script>
const d3 = require('d3');

import crossfilter from 'crossfilter';
import { Plotly } from 'vue-plotly'


let cf; // crossfilter instance
let dID; // dimension for Id

export default {
  name: "sunburst",

  components: {
    Plotly
  },

  props: {
    users: {default: () => []},
    colors: {default: () => {}}
  },

  data: function () {
    return {
      data: [
        {
          type: "sunburst",
          maxdepth: 3,
          ids: ["1", "2", "3"],
          labels: ["a", "b", "c"],
          parents: ["", "1", "1"],
        }
      ],
      layout: {},
      options: {}
    }
  },

  mounted() {
    d3.csv("/transazioni.csv", data => {
      /*data.forEach((d)=>  {
        id_to_car_map.set(parseInt(d.id), parseInt(d.CarID))
      })*/

      cf = crossfilter(data)
      dID = cf.dimension(d => d.id);
    });
  },

  methods: {
    unpack(rows, key){
      return rows.map(function(row) { return row[key]; });
    }
  },

  watch: {
    users: {
      handler(nv){
        dID.filter(d => nv.indexOf(d) > -1);
      }
    }
  }
}
</script>

<style scoped>

</style>