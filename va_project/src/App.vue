<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" class="shadow">
      <b-navbar-brand>Home</b-navbar-brand>
    </b-navbar>


    <b-overlay :show="loading">
      <b-container fluid="xl">

        <b-row>
          <b-col xl="8" style="text-align: center" class="xl-no-padding">
              <Map
                  :featureCollection="pointCollection"
              />
          </b-col>
          <b-col xl="4" class="xl-no-padding">
            <idSelector
                :colorSet="colorbrewer_colors"
                @changeCars="updateCar($event)"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
          <TimeControls
              @changeTime="updateDate($event)"
              :ts="ts"
              :carColors="usersColor"
          />
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>
  </div>
</template>

<script>
import IdSelector from "@/components/idSelector";
const d3 = require('d3');

import crossfilter from 'crossfilter';
import BiMap from 'bidirectional-map'


import Map from '@/components/Map';
import TimeControls from "@/components/TimeControls";

let cf; // crossfilter instance
let dID; // dimension for Id
let dTimestamp;

let id_to_car_map = new BiMap()

export default {
  name: 'App',
  components: {
    IdSelector,
    TimeControls,
    Map,
    //TimeControls
  },
  data() {
    return {
      pointCollection: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: 'Default point',
            },
            geometry: {
              type: 'LineString',
              coordinates: [[1, 1], [1, 2]]
            },
          },
        ],
      },

      CarID: [],

      ts: [],

      colorbrewer_colors: ['#e41a1c','#377eb8','#4daf4a',
        '#984ea3','#ff7f00',//'#ffff33',
        '#a65628','#f781bf'],

      usersColor: {},

      TimeControls: {
        mapTimeStart: new Date("2014-01-06 00:00:00 GMT").getTime(),
        mapTimeStop: new Date("2014-01-06 00:01:00 GMT").getTime(),
        mapDate: new Date("2014-01-06 00:00:00 GMT").getTime()
      },

      loading: true
    }
  },

  mounted(){

    fetch('./gps.json')
        .then(data => data.json())
        .then((data) => {
          const gps = data.map((d) => {
            const r = {
              Timestamp: +new Date(d.Timestamp+" GMT").getTime(), //timestamp, lo stesso di sopra
              id: +d.id,
              lat: +d.lat,
              long: +d.long
            };
            return r;
          });

          cf = crossfilter(gps);
          dID = cf.dimension(d => d.id);
          dTimestamp = cf.dimension(d => d.Timestamp);

          this.loading = false
        });



    d3.csv("/macchine.csv").then( data => {
      data.forEach((d)=>  {
        id_to_car_map.set(parseInt(d.id), parseInt(d.CarID))
      })

      this.loading = false;
    });
  },
  methods: {
    refresh(cfDimension) {
      //la filter qui perchè i controlli potrebbero essere pronti prima della crossfilter
      dTimestamp.filterRange([parseInt(this.TimeControls.mapTimeStart), parseInt(this.TimeControls.mapTimeStop)]);

      this.pointCollection = this.getGeoJsonFromReports(cfDimension.top(Infinity));
    },

    updateDate(newVal) {
      this.TimeControls.mapTimeStart = newVal.start;
      this.TimeControls.mapTimeStop = newVal.stop;
      if(newVal.day != null) {
        this.TimeControls.mapDate = newVal.day
        dTimestamp.filterRange([parseInt(this.TimeControls.mapDate), parseInt(this.TimeControls.mapDate)+ (1000*60*60*24)]);
        this.ts = this.getTimestampList(dTimestamp.top(Infinity))
      }

      this.refresh(dTimestamp);
    },

    updateCar(newVal) {
      this.carIds = newVal.map(d => id_to_car_map.get(d));

      if(this.carIds.includes(0))
        this.$bvToast.toast('Sono stati selezionati dipendenti senza auto associata', {
          title: 'Attenzione',
          autoHideDelay: 5000,
        })

      this.updateColor(newVal);
      dID.filter(d => this.carIds.indexOf(d) > -1);
      this.updateDate({start: this.TimeControls.mapTimeStart, stop: this.TimeControls.mapTimeStop, day: this.TimeControls.mapDate})
      this.refresh(dID);
    },

    updateColor(ids){
      this.usersColor = []
      ids.forEach((d) => {
        this.usersColor[d] = this.colorbrewer_colors[d%this.colorbrewer_colors.length]
      })
    },

    getTimestampList(cf_result){
      const ts = Array.from(d3.group(cf_result, c => c.id)).map((d) => {
        return {
          id: id_to_car_map.getKey(d[0]),
          timestamp: d[1].sort((a, b) => a.Timestamp - b.Timestamp).map(p => (p.Timestamp)),
        };
      });

      return ts;
    },

    getGeoJsonFromReports(coordinates) {
      const trs = Array.from(d3.group(coordinates, c => c.id)).map((d) => {
        return {
          id: d[0],
          trajs: d[1].sort((a, b) => a.Timestamp - b.Timestamp).map(p => ([ p.long, p.lat ])),
        };
      });


      const fc = {
        type: 'FeatureCollection',
        features: trs
            .map(d => ({ // for each entry
                  type: 'Feature',
                  properties: {
                    id: id_to_car_map.getKey(d.id),
                    color: this.usersColor[id_to_car_map.getKey(d.id)]
                  },
                  geometry: {
                    type: 'LineString',
                    coordinates: d.trajs,
                  }
                })
            )
      };
      return fc;
    }
  },
  watch: {
  }
}
</script>

<style>
nav{
  margin-bottom: 24px;
}

.row{
  margin-bottom: 16px;
}

.xl-no-padding{
  padding: 0px !important;
}

@media only screen and (max-width: 1200px) {
  .xl-no-padding{
    padding: 16px !important;
  }
}


</style>
