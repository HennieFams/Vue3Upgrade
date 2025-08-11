<template>
  <v-select
    placeholder="Select From Tank"
    :options="tanks"
    v-model="tank"
    style="margin-top:5px;margin-bottom:5px;"
    @search:blur="selectedTank">
  </v-select>
</template>

<script>

import vSelect from "vue-select";
//Vue.use(GridPlugin);

export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      tanks: [],
      tank: 0,
    };
  },
  // props: ["value"],

  computed: {
    
  },
  mounted() {
    var self = this;
    self.getTank();
  },
  methods: {
    getTank(){
      var self = this;

      var onSuccess = function(response) {
        self.tanks = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function(){
      };
      self.$ajaxGet(self,"Tanks/GetTankdropdownAll", onSuccess, onFinally);
    },
    selectedTank(){
      var self = this;
      self.$emit("tankPicked", self.tank);
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
<style>
@import "material.css";
</style>
