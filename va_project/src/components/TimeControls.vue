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
      </b-col>
      <b-col>
        <b-progress :animated="playState" :max="stop - start">
          <b-progress-bar :value="currTime - start">
            <span>{{ timePrettyPrint(currTime) }}</span>
          </b-progress-bar>
        </b-progress>
      </b-col>
      <b-col cols="2">
        {{timePrettyPrint(currTime)}}
      </b-col>
    </b-row>

    <b-row>
      <range-selector
          :timestamps="ts"
          @changeTime="updateDate($event)"
      ></range-selector>
    </b-row>


    <b-row>
      <b-button-group>
        <b-button v-on:click="indietro()">indietro</b-button>
        <b-button :pressed.sync="playState">play</b-button>
        <b-button v-on:click="avanti()">avanti</b-button>
      </b-button-group>
    </b-row>


  </b-form-group>
  </b-overlay>
</template>

<script>
import RangeSelector from "@/components/rangeSelector";
export default {
  name: "TimeControls",
  components: {RangeSelector},
  props: {
    mapTimeStart: {default: () => new Date("2014-01-06 00:00:00 GMT").getTime()},
    mapTimeStop: {default: () => new Date("2014-01-06 23:59:59 GMT").getTime()},

    ts: {
      required: true,
      type: Array,
      default: () => []
    }
  },

  data(){
    return {
      pickedDate: "",
      pickedDateSliderMin: new Date("2014-01-06 00:00:00 GMT").getTime(),
      pickedDateSliderMax: new Date("2014-01-06 23:59:59 GMT").getTime(),
      mapTimeMinDistance: 60, //seconds
      sticky: false,
      mapTimeStep: 1,

      start: new Date("2014-01-06 00:00:00 GMT").getTime(),
      stop: new Date("2014-01-06 23:59:59 GMT").getTime(),

      playState: false,
      currTime: new Date("2014-01-06 00:00:00 GMT").getTime(),

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
    updateDate(newVal) {
      const dayTimeStamp = new Date(this.pickedDate).getTime()

      this.start = newVal.start +dayTimeStamp
      this.stop = newVal.stop +dayTimeStamp
      this.currTime = this.start

      this.$emit('changeTime', {
        start: this.start,
        stop: this.stop,
        day: dayTimeStamp
      });
    },

    datePrettyPrint(YYYY_MM_DD){
      return YYYY_MM_DD;
    },

    timePrettyPrint(timestamp){
      let date = new Date(parseInt(timestamp));
      return date.toLocaleTimeString();
    },

    animate(inizio, fine){
      if(inizio > fine || !this.playState) {
        this.playState = false;
        return;
      }

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
            stop: this.stop,
            day: null
          });
        this.animate(parseInt(this.currTime), parseInt(this.stop));
      }
    },

    /*start: {
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
    },*/

    pickedDate: {
      handler(newVal){
        this.pickedDateSliderMin = new Date(newVal+" 00:00:00 GMT").getTime();
        this.start = this.pickedDateSliderMin;
        this.pickedDateSliderMax = new Date(newVal+" 23:59:59 GMT").getTime();
        this.stop = this.pickedDateSliderMax;


        this.$emit('changeTime', {
          start: this.start,
          stop: this.stop,
          day: this.start
        });
      }
    },
  }
}
</script>

<style scoped>
.debug{
  /*display: none;*/
}

</style>