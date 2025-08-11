<template>
  <v-select
    placeholder="Select From Operator"
    :options="operators"
    v-model="operator"
    style="margin-top:5px;margin-bottom:5px;"
    @search:blur="selectedOperator">
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
      operators: [],
      operator: 0,
    };
  },
  // props: ["value"],

  computed: {
    
  },
  mounted() {
    var self = this;
    self.GetOperatorsDropdown();
  },
  methods: {
    GetOperatorsDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.operators = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Operators/GetOperatordropdownAll", onSuccess, onFinally);
    },
    selectedOperator(){
      var self = this;
      self.$emit("operatorPicked", self.operator);
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
