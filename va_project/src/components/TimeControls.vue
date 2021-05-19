<template>
  <b-overlay :show="loading">
  <b-form-group>
    <h4>Time Settings</h4>
    <!-- ______________________SELETTORE DATA __________________________ -->
    <b-row>
      <b-col cols="3">
        <label>Choose a date:</label>
      </b-col>

      <b-col>
        <b-form-datepicker id="datepicker" v-model="pickedDate" min="2014-01-06" max="2014-01-19" locale="en"></b-form-datepicker>
      </b-col>

      <b-col cols="2" class="debug">
        <div>{{ datePrettyPrint(pickedDate) }}</div>
      </b-col>
    </b-row>


    <b-row>
      <b-col cols="3">
        <label>Step size [s]: </label>
      </b-col>
      <b-col>
        <b-form-input type="number" v-model="mapTimeStep"  min="0"></b-form-input>
      </b-col>
      <b-col cols="2" class="debug">
        <label>{{ mapTimeStep }}</label>
      </b-col>
    </b-row>


    <b-row>
      <b-col cols="3">
        <label>Sticky</label>
      </b-col>
      <b-col>
        <b-checkbox v-model="sticky"></b-checkbox>
      </b-col>
      <b-col cols="2" class="debug">
        <div>{{ sticky }}</div>
      </b-col>
    </b-row>


    <b-row>
      <b-col cols="3">
        <label>Start</label>
      </b-col>
      <b-col>
        <b-form-input id="timeStart" v-model="start" type="range" :min="pickedDateSliderMin" :max="pickedDateSliderMax" step="1000" class="w-100"></b-form-input>
      </b-col>
      <b-col cols="2" class="debug">
        <div>{{ timePrettyPrint(start) }}</div>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
      </b-col>
      <b-col>
          <!--<b-form-input type="range" v-model="currTime" :min="pickedDateSliderMin" :max="pickedDateSliderMax" step="1000" class="w-100"></b-form-input>-->
        <b-progress :animated="playState" :max="pickedDateSliderMax - pickedDateSliderMin">
          <b-progress-bar :value="currTime - pickedDateSliderMin">
            <span>{{ timePrettyPrint(currTime) }}</span>
          </b-progress-bar>
        </b-progress>
      </b-col>
      <b-col cols="2">
        {{timePrettyPrint(currTime)}}
      </b-col>
    </b-row>


    <b-row>
      <b-col cols="3">
        <label>Stop</label>
      </b-col>
      <b-col>
        <b-form-input id="timeStart" v-model="stop" type="range" :min="pickedDateSliderMin" :max="pickedDateSliderMax" step="1000" class="w-100"></b-form-input>
      </b-col>
      <b-col cols="2" class="debug">
        <div>{{ timePrettyPrint(stop) }}</div>
      </b-col>
    </b-row>

    <b-row>
      <b-button-group>
        <b-button v-on:click="indietro()">indietro</b-button>
        <b-button :pressed.sync="playState">play</b-button>
        <b-button v-on:click="avanti()">avanti</b-button>
      </b-button-group>
    </b-row>

    <b-row>
      <svg ref="start"></svg>
    </b-row>

    <b-row>
      <svg ref="stop"></svg>
    </b-row>


  </b-form-group>
  </b-overlay>
</template>

<script>
export default {
  name: "TimeControls",

  props: {
    mapTimeStart: {default: () => new Date("2014-01-06 00:00:00").getTime()},
    mapTimeStop: {default: () => new Date("2014-01-06 00:01:00").getTime()},

    ts: {default: []}
  },

  data(){
    return {
      pickedDate: "2014-01-13",
      pickedDateSliderMin: new Date("2014-01-06 00:00:00").getTime(),
      pickedDateSliderMax: new Date("2014-01-06 23:59:59").getTime(),
      mapTimeMinDistance: 60, //seconds
      sticky: false,
      mapTimeStep: 1,

      start: new Date("2014-01-06 00:00:00").getTime(),
      stop: new Date("2014-01-06 00:01:00").getTime(),

      playState: false,
      currTime: new Date("2014-01-06 00:00:00").getTime(),

      loading: true
    };
  },

  mounted() {
    //TODO: codice per trovare automaticamente l'intervallo di date

    //TODO: MAYBE svg che mostra dove ci sono sopostamenti o meno, o selettore intervallo spostamenti se possiamo rielaborare i dati

    this.loading = false;
  },

  computed: {
  },

  methods: {
    datePrettyPrint(YYYY_MM_DD){
      return YYYY_MM_DD;
    },

    timePrettyPrint(timestamp){
      let date = new Date(parseInt(timestamp));
      return date.toLocaleTimeString();
    },

    animate(inizio, fine){
      if(inizio > fine || !this.playState)
        return;

      console.log(inizio);
      this.currTime = inizio + 60 * 1000; //mostra i 30 secondi successivi

      this.$emit('changeTime', {
        start: inizio,
        stop: this.currTime
      });

      setTimeout(() => {this.animate(inizio+1*10000, fine)}, 1000/30); //vai avanti di 1 secondi a 30 Hz
    },

    indietro(){
      this.currTime = this.start
    },

    avanti(){
      this.currTime = this.stop
    }
  },

  watch: {
    playState: {
      handler(v){
        if(!v)
          this.$emit('changeTime', {
            start: this.start,
            stop: this.stop
          });
        this.animate(parseInt(this.currTime), parseInt(this.stop));
      }
    },

    start: {
      handler(_){
        let start = parseInt(_);
        let stop = parseInt(this.stop);
        let step = parseInt(this.mapTimeMinDistance);

        if(this.currTime < start)
          this.currTime = start;

        if (start + (1000*step) > stop || this.sticky) {
          stop = start + (1000 * step);
          this.stop = stop;
        }

        this.$emit('changeTime', {
          start: start,
          stop: stop
        });
      }
    },

    stop: {
      handler(_){
        let start = parseInt(this.start);
        let stop = parseInt(_);
        let step = parseInt(this.mapTimeMinDistance);

        if(this.currTime > stop)
          this.currTime = stop;

        if (stop - (1000*step) < start || this.sticky) {
          start = stop - (1000 * step);
          this.start = start;
        }

        this.$emit('changeTime', {
          start: start,
          stop: stop
        });
      }
    },

    pickedDate: {
      handler(newVal){
        this.pickedDateSliderMin = new Date(newVal+" 00:00:00").getTime();
        this.start = this.pickedDateSliderMin;
        this.pickedDateSliderMax = new Date(newVal+" 23:59:59").getTime();
        this.stop = this.pickedDateSliderMax;
      }
    },

    ts: {
      handler(){
        console.log(this.ts);
      }
    }
  }
}
</script>

<style scoped>
.debug{
  /*display: none;*/
}

</style>