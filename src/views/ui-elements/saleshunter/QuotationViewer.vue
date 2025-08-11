<!-- =========================================================================================
    File Name: LoadingDefault.vue
    Description: Add default loading to your application
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
    CRUD_Account_Get CRUD_Account_Get
    https://localhost:44341/api/FAMS/SP_JsonResult?storeproc=CRUD_Account_Get&parameters=1
========================================================================================== -->


<template>
  
      <!-- <vue-friendly-iframe src="www.fams.co.za"></vue-friendly-iframe> -->
      <iframe src="http://localhost:62620/ReportViewer.aspx?quoteID=0" style="height: 100%; width: 100%;  min-height: 1000px;" frameborder=0 allowfullscreen="true" />

</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  data() {
    return {
      selected: [],
      products: [],
      productserror: [],
      categorieserrors: [],
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y/m/d h:m"
      },
      date2: null
    };
  },
  components: {
    flatPickr,
  },
  mounted() {
    this.wasSidebarOpen = this.$store.state.reduceButton;
    this.$store.commit("TOGGLE_REDUCE_BUTTON", true);
  },
  methods: {
    onLoad(){

    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    }
  },
  beforeDestroy() {
    if (!this.wasSidebarOpen) this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
  }
};
</script>
