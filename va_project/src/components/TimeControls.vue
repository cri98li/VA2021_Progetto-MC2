<template>
  <b-overlay :show="loading">
  <b-form-group>
    <h4>Time Settings</h4>
    <b-row  align-v="center">
      <b-col cols="2">
        <label>Choose a date:</label>
      </b-col>

      <b-col>
        <b-form-datepicker id="datepicker" v-model="pickedDate" min="2014-01-06" max="2014-01-19" locale="en"></b-form-datepicker>
      </b-col>

      <b-col cols="2" class="debug">
        <div>{{ datePrettyPrint(pickedDate) }}</div>
      </b-col>
    </b-row>

    <b-row align-v="center">
      <b-col cols="2">
        <label>Choose a date:</label>
      </b-col>

      <b-col>
        <rangeSelector
            :curr-time="currTime"
            :timestamps="ts"
            :playState="playState"
            @changeTime="updateDate($event)"
        ></rangeSelector>
      </b-col>
      <b-col cols="2" class="debug">
        <div>{{ timePrettyPrint(start) }}<br>{{ timePrettyPrint(stop) }}</div>
      </b-col>
    </b-row>

    <b-row align-v="center" >
      <b-col cols="2" offset="5">
        <b-button-group>
          <b-button v-on:click="indietro()">
            <b-icon icon="skip-start"></b-icon>
          </b-button>
          <b-button :pressed.sync="playState">
            <b-icon :hidden="playState" icon="play"></b-icon>
            <b-icon :hidden="!playState" icon="stop"></b-icon>
          </b-button>
          <b-button v-on:click="avanti()">
            <b-icon icon="skip-end"></b-icon>
          </b-button>
        </b-button-group>
      </b-col>
      <b-col>
        <!--<b-progress :animated="playState" :max="stop - start">
          <b-progress-bar :value="currTime - start">
            <span>{{ timePrettyPrint(currTime) }}</span>
          </b-progress-bar>
        </b-progress>-->
      </b-col>
      <b-col cols="2">
        {{timePrettyPrint(currTime)}}
      </b-col>
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
      pickedDate: "2014-01-06",

      start: new Date("2014-01-06 00:00:00 GMT").getTime(),
      stop: new Date("2014-01-06 23:59:59 GMT").getTime(),

      playState: false,
      currTime: new Date("2014-01-06 00:00:00 GMT").getTime(),

      loading: true
    };
  },

  mounted() {
    //TODO: codice per trovare automaticamente l'intervallo di date

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
      return date.toLocaleTimeString([], { timeZone: 'GMT' });
    },

    animate(inizio, fine){
      if(inizio > fine || !this.playState) {
        this.playState = false;
        this.currTime = this.start;
        return;
      }

      this.currTime = inizio + 60 * 1000; //mostra i 60 secondi successivi

      this.$emit('changeTime', {
        start: inizio,
        stop: this.currTime
      });

      setTimeout(() => {this.animate(inizio+10*1000, fine)}, 1000/30); //vai avanti di 1 secondi a 30 Hz
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

    pickedDate: {
      handler(newVal){
        this.start = new Date(newVal+" 00:00:00 GMT").getTime();
        this.stop = new Date(newVal+" 23:59:59 GMT").getTime();


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