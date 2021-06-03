<template>
  <sunburst
      :data="data"
      :colorScale="colorScale"
  class="sunburst">

    <myBreadcrumbTrail slot="legend"
                     slot-scope="{ nodes, colorGetter, width }"
                     :current="nodes.mouseOver"
                     :root="nodes.root"
                     :colorGetter="colorGetter"
                     :from="nodes.clicked"
                     :width="width"
                       :itemWidth="170"/>

    <template slot-scope="{ on, actions }">
      <highlightOnHover v-bind="{ on, actions }"/>
      <zoomOnClick v-bind="{ on, actions }"/>
    </template>

  </sunburst>
</template>

<script>
import {
  highlightOnHover,
  sunburst,
  zoomOnClick
} from 'vue-d3-sunburst'
import crossfilter from 'crossfilter';
import myBreadcrumbTrail from "@/components/vue-d3-sunburst/myBreadcrumbTrail";
import BiMap from 'bidirectional-map'
const d3 = require('d3');

let id_FristLastName = new BiMap()

let cf; // crossfilter instance
let dID; // dimension for Id
let dDate;
let dTime;

export default {
  name: "mySunburst",

  components: {
    myBreadcrumbTrail,
    highlightOnHover,
    //nodeInfoDisplayer,
    sunburst,
    zoomOnClick
  },

  props: {
    usersColor: {
      default: () => {
      }
    },
    TimeControls: {
      default: () => {
        return {
          mapTimeStart: new Date("2014-01-06 00:00:00 GMT").getTime(),
          mapTimeStop: new Date("2014-01-06 00:01:00 GMT").getTime(),
          mapDate: new Date("2014-01-06 00:00:00 GMT").getTime(),
          playState: false
        }
      }
    },

    scaler:{
      default: () =>
        d3.scaleLinear()

    }
  },

  mounted() {
    d3.csv("/transazioni.csv", (row) => {
      let time = null;

      if(row.time != "")
        time = new Date(row.timestamp+" "+row.time+" UTC").getTime()

      return {
        id: row.id,
        date: new Date(row.timestamp+" GMT").getTime(),
        location: row.location,
        price: parseFloat(row.price),
        time: time,
        credit_card: row.credit_card == "True",
        loyalty_card: row.loyalty_card == "True"
      }
    }).then( (data) => {
      console.log(data)

      cf = crossfilter(data)
      dID = cf.dimension(d => d.id);
      dDate = cf.dimension(d => d.date);
      dTime = cf.dimension(d => d.time);

      dID.filter(() => false)
      dDate.filter(d => d ==this.TimeControls.mapDate)

      console.log(dID)
      this.updateData()
    });


    d3.csv("/nomi.csv").then( data => {
      data.forEach((d)=>  {
        id_FristLastName.set(d.id, d.LastName+" "+d.FirstName)
      })

      this.loading = false;
    });
  },

  methods: {
    updateData(){
      let res = dID.top(Infinity)

      const hierarchy = this.list_to_tree(res, ["id", "location"]);

      this.data = hierarchy;
    },

    list_to_tree(data, levels){
      let newData = { name :"root", children : [] };

      data.forEach(function(d){
        var depthCursor = newData.children;
        levels.forEach(function( property, depth )
        {
          var index;
          depthCursor.forEach(function(child,i)
          {
            if ( d[property] == child.name )
              index = i;
          });



          if ( isNaN(index) )
          {
            if(property == "id") {
              console.log(d[property])

              depthCursor.push({name: id_FristLastName.get(d[property]), children: []});
            }else
              depthCursor.push({name : d[property], children : []});
            index = depthCursor.length - 1;
          }

          depthCursor = depthCursor[index].children;

          if ( depth === levels.length - 1 )
          {
            depthCursor.push({size : d.price, name: new Date(d.time).getUTCHours()+":"+new Date(d.time).getUTCMinutes()});
          }
        });
      });

      return newData;
    },
  },

  watch: {
    usersColor: {
      handler(nv){
        dID.filter(d => Object.keys(nv).indexOf(d) > -1);

        this.updateData()
      }
    },

    TimeControls: {
      handler(nv){
        if(nv.playState == true) return;

        dDate.filter(d => {
          return d == nv.mapDate
        });

        dTime.filter(d => {
          if(d == null)
            return true;

          return d > nv.mapTimeStart && d < nv.mapTimeStop

        });

        this.updateData()
      },
      deep: true
    }
  },

   data() {
    return {
      data:  {
        "name": "flare",
        "children": [
          {
            "name": "analytics",
            "children": [
              {
                "name": "cluster",
                "children": [
                  { "name": "AgglomerativeCluster", "size": 3938 }
                ]
              },
              {
                "name": "optimization",
                "children": [
                  { "name": "AspectRatioBanker", "size": 7074 }
                ]
              }
            ]
          }
        ]
      },

      colorScale: d3.scaleOrdinal(tmp(), ['#e41a1c','#377eb8','#4daf4a',
        '#984ea3','#ff7f00',//'#ffff33',
        '#a65628','#f781bf'])
    }
  },
}

function tmp(){
  let tmp = []
  for(let i = 0; i < 59; i++)
    tmp[i] = i
  return tmp
}

</script>

<style>

.sunburst .viewport{
  height: 100%;
}

</style>