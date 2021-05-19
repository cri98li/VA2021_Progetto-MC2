<template>
  <b-overlay :show="loading">
  <b-form-group>
    <h4>Select a Person</h4>
    <!--<b-form-checkbox-group
        size="lg"
        v-model="selected"
        :options="carIds"
        value-field="value"
        text-field="name"
        disabled-field="disabled"
        name="buttonsCarId"
        buttons
        stacked
        style="width: 100%"
    ></b-form-checkbox-group>-->

    <div id="carList">
      <b-table
          select-mode="multi"
          :items="carIds"
          :fields=fields
          selectable
          @row-selected="onRowSelected"
          ref="ids"
      />
    </div>
  </b-form-group>
  </b-overlay>
</template>

<script>

const d3 = require('d3');

export default {
  name: "idSelector",

  data(){
    return {
      carIds: [{
        value: 0,
        name: "Loading",
        disabled: true
      }],


      loading: true,
      selected: [],
      fields: ["name", "type", "title"],


      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' }
      ]
    }
  },

  mounted() {
    d3.csv("/car-assignments.csv").then( data => {
      this.carIds = [];

      data.forEach((d)=> {
        let value = parseInt(d.CarID);
        let disabled = false;
        if(d.CarID == "") {
          value = null;
          disabled = true;
        }

        this.carIds.push({
          value: value,
          name: d.LastName + " " + d.FirstName,
          type : d.CurrentEmploymentType,
          title: d.CurrentEmploymentTitle,
          disabled: disabled
        })
      })

      this.loading = false;
    });
  },

  watch: {
    selected: {
      handler(newVal, oldVal){

        /*newVal.forEach(e => {
          if(e.value == null){
            this.$refs.ids.unselectRow(this.carIds.map(d => d.value).indexOf(e.value))

            this.$emit('warning', {
              title: "ERR",
              body: "Azione non permessa"
            });
            return;
          }
        });*/

        if(newVal.length > 2){
          newVal.filter(v => !oldVal.includes(v)).forEach(e => {
            this.$refs.ids.unselectRow(this.carIds.map(d => d.value).indexOf(e.value))
            /*this.$emit('warning', {
              title: "Errore",
              body: "Azione non permessa"
            });*/

            this.$bvToast.toast('Errore', {
              title: 'Azione non permessa',
              //autoHideDelay: 5000,
              //appendToast: true
            })
          })

          return;
        }
        this.$emit('changeCars', newVal.map((d) => d.value));
      }
    }
  },

  methods: {
    onRowSelected(items) {
      this.selected = items
    },
  }
}
</script>

<style scoped>

</style>