<template>
  <v-select
    placeholder="Select From Equipment"
    :options="equipments"
    v-model="equipment"
    style="margin-top:5px;margin-bottom:5px;"
    @search:blur="selectedEquipment">
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
      equipments: [],
      equipment: 0,
    };
  },
  // props: ["value"],

  computed: {
    
  },
  mounted() {
    var self = this;
    self.GetEquipmentDropdown();
  },
  methods: {
    GetEquipmentDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.equipments = response.data.map((item) => {
          return { label: item.registration, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Equipments/GetEquipmentDropDownAll", onSuccess, onFinally);
    },
    selectedEquipment(){
      var self = this;
      self.$emit("eqpPicked", self.equipment);
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
