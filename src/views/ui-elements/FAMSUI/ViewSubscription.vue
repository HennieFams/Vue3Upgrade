<!-- =========================================================================================
    File Name: Subscription.vue
    Description: Add default loading to your application
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
    CRUD_Account_Get CRUD_Account_Get
    https://localhost:44341/api/FAMS/SP_JsonResult?storeproc=CRUD_Account_Get&parameters=1
========================================================================================== -->


<template>
  <div>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          id="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="subscriptions"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <vs-button
              class="rounded-lg mr-2"
              color="warning"
              @click="GetGrid()"
              icon-pack="feather"
              icon="icon-refresh-ccw"
              >Reload</vs-button
            >
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ subscriptions.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : subscriptions.length }} of {{ subscriptions.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage=10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=20">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=50">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=100">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <template slot="thead">
            <vs-th>Subscription Title</vs-th>  
            <vs-th>Subscription Type</vs-th>  
            <vs-th>Subscription Info</vs-th>
            <vs-th>Subscription Interval</vs-th> 
            <vs-th>Subscription Create Date</vs-th>
            <vs-th>Subscription Renewed Date</vs-th>
            <vs-th>Price(R)</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">                              
              <vs-td :data="tr.subscriptionName">{{tr.subscriptionName}}</vs-td>
              <vs-td :data="tr.subscriptionType">{{tr.subscriptionType}}</vs-td>
              <vs-td :data="tr.tableName">{{tr.tableName}}</vs-td>
              <vs-td :data="tr.subscriptionInterval">{{tr.subscriptionInterval}}</vs-td>
              <vs-td :data="tr.subscriptionCreateDate">{{tr.subscriptionCreateDate}}</vs-td>
              <vs-td :data="tr.subscriptionRenewedDate">{{tr.subscriptionRenewedDate}}</vs-td>
              <vs-td :data="tr.price">{{tr.price}}</vs-td>
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
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { color } from '@amcharts/amcharts4/core';

export default {
  data() {
    return {
      title: "FAMS - new Subscription  Wizard!!",
      subtitle: "Please complete form to add new subscription",
      
      accountsData: [],
      itemsPerPage: 10,
      selected: [],
      isMounted: false,
      currStore: {},
      editPopupActive: false,
      color: "rgb(0,0,0)",
      blocked: true,
      showExpiredStores: false,
      showBlockedAccounts: false,

      subscriptions: [],
      formData: {
        id: 0,
        accountId: 0,
        createdDate: "",
        subInterval: 0,
        store: 0,
        subType: 0,
        renewDate: "",
        expiryDate: "",
        name: "",
      },
      stores: [],
      selectedStore: 0,
      subscriptions: [],
      selectedAccount: 0,
      typeList: [],
      selectedType: 0,
      intervalList: [],
      selectedInterval: 0,
      isInfoHidden: true,
      isListHidden : false,
      showStores: false,

    };
  },
  
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  watch: {
  },
  mounted() {
    this.GetGrid();
    this.isMounted = true;
  },
  methods: {
  //********************* System related*/
  successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
  FailedNotify() {
      this.$vs.notify({
        title: 'Not Successfull',
        text: 'Item not added',
        color: 'danger'
      })
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    
    GetGrid(){
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.subscriptions = response.data;
      };
      var onFinally = function() {
        self.successNotify();
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "Subscription/GetSubscriptionsUser",
        onSuccess,
        onFinally
      );
    },
  }
};

</script>
<style lang="scss">
#tableRow{
  border: 3px,black;
}
#expandIconContainer span{
  display: flex;
  justify-content: space-evenly;
}
#expandIconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>