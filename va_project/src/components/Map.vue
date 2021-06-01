<template>
  <b-overlay :show="loading">
    <svg height="500" width="730" class="map">
      <image href="MC2-tourist.jpg" height="500" width="100%"/>
      <g class="abila" ref="abila"></g>
      <g class="routes" ref="routes"></g>
    </svg>
  </b-overlay>
</template>

<script>

import MapJS from "@/assets/MapJS";

const map = MapJS()
    .featureClass('id'); //component to handle the map

const d3 = require('d3');

export default {
  name: "Map",
  props: {
    featureCollection: {
      type: Object,
      default: () => ({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [[0, 0], [1, 1]],
            },
          },
        ],
      }),
    },
  },

  data() {
    return {
      loading: true
    }
  },

  mounted(){
    const gAbila = d3.select(this.$refs.abila);
    const gRoutes = d3.select(this.$refs.routes);

    d3.json('/Abila_geo.json')
        .then((data) => {
          gAbila.datum(data)
              .call(map);
        });

    const trajs = d3.group(this.featureCollection.features, d => d.id); // group by id
    const trs = Array.from(trajs).map((d) => {
      return {
        id: d[0],
        trajs: d[1].map(p => ([ p.long, p.lat ])),
      };
    });

    gRoutes.datum(this.getGeoJsonFromReports(trs))
        .call(map);

    this.loading = false
  },

  methods: {
    getGeoJsonFromReports(coordinates) {
      const fc = {
        type: 'FeatureCollection',
        features: coordinates
            .map(d => ({ // for each entry
                  type: 'Feature',
                  properties: {
                    Timestamp: d.Timestamp,
                    id: d.id
                  },
                  geometry: {
                    type: 'LineString',
                    coordinates: d.trajs,
                  }
                })
            )
      };

      return fc;
    },
  },

  watch: {
    featureCollection(newFc){
      this.loading = true;
      const gRoutes = d3.select(this.$refs.routes);

      gRoutes.datum(newFc).
      call(map);

      const gAbila = d3.select(this.$refs.abila);
      gAbila.call(map);
      this.loading = false;
    }
  }
}
</script>

<style>

g.abila path{
  fill: transparent;
  stroke: rgba(204, 185, 153, .4);
}

g.routes path{
  stroke: rgba(255, 0, 0, 0.45);
  fill: transparent;
  stroke-width: 5;
}

g.routes path._0{
  stroke: rgba(0, 255, 0, 0.45);
  fill: transparent;
  stroke-width: 5;
}

g.routes path._1{
  stroke: rgba(0, 0, 255, 0.45);
  fill: transparent;
  stroke-width: 5;
}

svg > image{
  y: -5px;
  x: 4px;
  transform:  scaleX(.984)
              scaleY(1.032);
}


</style>