<template>
  <v-select
    placeholder="Select From Store"
    :options="stores"
    v-model="store"
    style="margin-top:5px;margin-bottom:5px;"
    @search:blur="selectedStore">
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
      stores: [],
      store: 0,
    };
  },
  // props: ["value"],

  computed: {
    
  },
  mounted() {
    var self = this;
    self.GeStoresDropdown();
  },
  methods: {
    GeStoresDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.stores = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Stores/GetStoredropdownAll", onSuccess, onFinally);
    },
    selectedStore(){
      var self = this;
      self.$emit("storePicked", self.store);
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
