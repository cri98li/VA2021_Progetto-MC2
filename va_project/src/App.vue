<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" class="shadow">
      <b-navbar-brand>Home</b-navbar-brand>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col>
            <Map
                :featureCollection="pointCollection"
            />
        </b-col>
        <b-col cols="4">
          <idSelector @changeCars="updateCar($event)"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
        <TimeControls
            @changeTime="updateDate($event)"
            :ts="ts"
        />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import IdSelector from "@/components/idSelector";
const d3 = require('d3');

import crossfilter from 'crossfilter';

import Map from '@/components/Map';
import TimeControls from "@/components/TimeControls";

let cf; // crossfilter instance
let dID; // dimension for Id
let dTimestamp;

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

      TimeControls: {
        mapTimeStart: new Date("2014-01-06 00:00:00").getTime(),
        mapTimeStop: new Date("2014-01-06 00:01:00").getTime(),
        mapDate: new Date("2014-01-06 00:00:00").getTime()
      }
    }
  },
  mounted(){

    fetch('./gps.json')
        .then(data => data.json())
        .then((data) => {
          const gps = data.map((d) => {
            const r = {
              Timestamp: +new Date(d.Timestamp).getTime(), //timestamp, lo stesso di sopra
              id: +d.id,
              lat: +d.lat,
              long: +d.long
            };
            return r;
          });

          cf = crossfilter(gps);
          dID = cf.dimension(d => d.id);
          dTimestamp = cf.dimension(d => d.Timestamp);

          this.refresh(dID.filter(false));
        });

  },
  methods: {
    refresh(cfDimension) {
      //la filter qui perchè i controlli potrebbero essere pronti prima della crossfilter
      dID.filter(d => this.carIds.indexOf(d) > -1);
      dTimestamp.filterRange([parseInt(this.TimeControls.mapTimeStart), parseInt(this.TimeControls.mapTimeStop)]);

      this.pointCollection = this.getGeoJsonFromReports(cfDimension.top(Infinity));
    },
    getGeoJsonFromReportsPoint(coordinates) {
      const fc = {
        type: 'FeatureCollection',
        features:
            coordinates
                .filter(
                    d => (d.Timestamp <= this.TimeControls.mapTimeStop) && (d.Timestamp >= this.TimeControls.mapTimeStart)
                )
                .map(d => ({ // for each entry
                      type: 'Feature',
                      properties: {
                        Timestamp: d.Timestamp,
                        id: d.id
                      },
                      geometry: {
                        type: 'Point',
                        coordinates: [d.long, d.lat],
                      },
                    }),
                )
      };

      return fc;
    },

    updateDate(newVal) {
      this.TimeControls.mapTimeStart = newVal.start;
      this.TimeControls.mapTimeStop = newVal.stop;
      if(newVal.day != null) {
        this.TimeControls.mapDate = newVal.day
        dTimestamp.filterRange([parseInt(this.TimeControls.mapDate), parseInt(this.TimeControls.mapDate)+ (1000*60*60*24)]);
        this.ts = this.getTimestampList(dTimestamp.top(Infinity))
      }

      console.log(newVal)

      this.refresh(dTimestamp);
    },

    updateCar(newVal) {
      this.carIds = newVal
      this.refresh(dID);
    },

    getTimestampList(cf_result){
      const list = cf_result.map((d) => {
        return d.Timestamp
      });


      return list;
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
</style>
