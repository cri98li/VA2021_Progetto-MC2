<template>
  <svg width="100%" height="70px" class="rangeSelector" ref="rangeSelector">
  </svg>
</template>

<script>
import RangeSelector from "@/assets/rangeSelectorJS";

const rs = RangeSelector();
const d3 = require('d3')

export default {
  name: "rangeSelector",

  created() {
    window.addEventListener("resize", this.pageResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.pageResize);
  },

  props: {
    timestamps: {default: () => {}},
    currTime: {default: () => 0},
    playState: {default: () => false},
    carColors: {default: () => ['red', 'blue']}
  },

  data() {
    return {
      min: 0,
      max: 86400000,
      step: 60 * 1000 *5
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
        values: this.timestamps.map((a)=>{
          return {
            id: a.id,
            ts: a.timestamp.map((d) => d%this.max)
          }
      }),
        min: this.min,
        max: this.max,
        step: this.step, //intervalli di 1 s
        colors: this.carColors
      }
    },

    pageResize(){
      d3.select(this.$refs.rangeSelector)
          .call(rs);
    }
  },

  watch: {
    timestamps: {
      handler(){
        d3.select(this.$refs.rangeSelector)
            .datum(this.makeConfig())
            .call(rs);
      }
    },
    currTime: {
      handler(newVal){
        if(this.playState)
          rs.updateCircle(newVal%this.max)
        else rs.updateCircle(null)
      }
    }
  },
}
</script>

<style scoped>
.rangeSelector{
}
</style>