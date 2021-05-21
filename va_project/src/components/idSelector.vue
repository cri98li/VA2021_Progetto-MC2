<template>
  <b-overlay :show="loading">
  <b-form-group>
    <h4>Select a Person</h4>
    <div id="carList">
      <vue-good-table
          select-mode="multi"
          :rows="carIds"
          :columns="fields"
          @on-selected-rows-change="onRowSelected"
          max-height="calc(500px - 36px)"
          :fixed-header="true"
          ref="ids"
          compact-mode
          :sort-options="{
            enabled: true,
            initialSortBy: {field: 'name', type: 'asc'}
          }"
          :select-options="{
            enabled: true,
            disableSelectInfo: true,
          }"
          :search-options="{enabled: true}"
          :group-options="{
            enabled: true,
            headerPosition: 'top'
          }"
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
        type: "Loading",
        children: [{
          value: 0,
          name: "Loading",
          title: "Loading",
          disabled: true,
        }]
      }],


      loading: true,
      selected: [],
      fields: [{
        label: 'Name',
        field: 'name'
      },
        {
          label: 'Title',
          field: 'title'
        }]
    }
  },

  mounted() {
    d3.csv("/car-assignments.csv").then( data => {
      this.carIds = [];

      let c = 0;
      let map ={};

      data.forEach((d)=>  {
        let value = parseInt(d.CarID);
        let disabled = false;
        if(d.CarID == "") {
          value = null;
          disabled = true;
        }

        let prop = {
          value: value,
          name: d.LastName + " " + d.FirstName,
          title: d.CurrentEmploymentTitle,
          disabled: disabled
        }

        if(map[d.CurrentEmploymentType] != undefined){
          this.carIds[map[d.CurrentEmploymentType]].children.push(prop)
        }else{
          map[d.CurrentEmploymentType] = c++;
          let list = [prop]
          this.carIds[map[d.CurrentEmploymentType]] = {name: d.CurrentEmploymentType}
          this.carIds[map[d.CurrentEmploymentType]].children = list
        }
      })

      this.loading = false;
      this.$set(this.carIds[2], 'vgtSelected', true);

    });
  },

  watch: {
    selected: {
      handler(newVal){
        this.$emit('changeCars', newVal);
      }
    }
  },

  methods: {
    onRowSelected(items) {
      this.selected = items.selectedRows.map(d => d.value).filter(d => d != null)

      if(this.selected.length != items.selectedRows.length)
        this.$bvToast.toast('Sono stati selezionati dipendenti senza auto associata', {
          title: 'Attenzione',
          //autoHideDelay: 5000,
          //appendToast: true
        })

    },
  }
}
</script>

<style scoped>

</style>