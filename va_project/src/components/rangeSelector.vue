<template>
  <svg width="100%" height="30px" class="rangeSelector" ref="rangeSelector">
    <!--<g class="rangeSelectorG" ref="rangeSelectorG"></g>-->
  </svg>
</template>

<script>
import RangeSelector from "@/assets/rangeSelectorJS";

const rs = RangeSelector();
const d3 = require('d3')

export default {
  name: "rangeSelector",

  props: {
    timestamps: {default: () => []}
  },

  data() {
    return {
      min: 0,
      max: 86400000,
      step: 60 * 1000
    }
  },

  mounted() {
    d3.select(this.$refs.rangeSelector)
    .datum(this.makeConfig())
    .call(rs);

    rs.on("interval", (d) => {
      this.$emit('changeTime', {
        start: d[0],
        stop: d[1]
      });
    })
  },

  methods: {
    makeConfig() {
      return {
        values: this.timestamps.map((d)=>d%this.max),
        min: this.min,
        max: this.max,
        step: this.step //intervalli di 1 s
      }
    }
  },

  watch: {
    timestamps: {
      handler(){
        d3.select(this.$refs.rangeSelector)
            .datum(this.makeConfig())
            .call(rs);
      }
    }
  },
}
</script>

<style scoped>
.rangeSelector{
  border: 1px solid red;
}
</style>