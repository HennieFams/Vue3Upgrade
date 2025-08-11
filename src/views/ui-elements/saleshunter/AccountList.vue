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
<div id="data-list-list-view" class="data-list-container">
  <vx-card ref="MainCard" title="">
    <div>
      <vs-table
        ref="productTable"
        v-model="selected"
        pagination
        max-items="20"
        search
        :data="products"
        class="vs-con-loading__container"
      >


       <template slot="thead">
          <vs-th sort-key="QuoteNr">QuoteNr</vs-th>
          <vs-th sort-key="quoteRef">quoteRef</vs-th>
        </template>
        <!-- visible: false -->
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.quoteNr">{{tr.quoteNr}}</vs-td>
            <vs-td :data="tr.quoteRef">{{tr.quoteRef}}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
export default {
  data() {
    return {
      quoteselected:"",
      selected: [],
      quotation: [],
         products: [],
      isMounted: false,
      popupActive: false,
     // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},
    };  
  },
  components: {
     flatPickr
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
 

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },

  loadProducts() {
      const self = this;
      self.showLoadingOnElement("productTable", 1, "radius");

      var onSuccess = function(response) {
        self.products = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.productTable.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/Quotationlist?accountid=1&salesrepid=1",
        onSuccess,
        onFinally
      );
    },
  }
};
</script>
