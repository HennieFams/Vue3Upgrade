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
    <vx-card>
      <div>
        <vs-table
          ref="gridTable"
          id="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="accountsData"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <!--<vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addVue"         icon-pack="feather" icon="icon-plus-square">Add New</vs-button>-->
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ accountsData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : accountsData.length }} of {{ accountsData.length }}</span>
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
            <div class="vx-col w-2/5 mb-2">
              <vs-checkbox
                class="float-left mb-2"
                style="width: fit-content"
                name="cbExpiredStores"
                v-model="showExpiredStores"
                >Show Only Expired Stores
              </vs-checkbox>
              <vs-checkbox
                class="float-left"
                style="width: fit-content"
                name="cbBlockedAccounts"
                v-model="showBlockedAccounts"
                >Show Only Blocked Accounts
              </vs-checkbox>
            </div>
          </div>
          <template slot="thead">
            <vs-th sort-key="accountName">Account Name</vs-th>
            <vs-th sort-key="Month End">Month End</vs-th>
            <vs-th sort-key="Month Start">Month Start</vs-th>
            <vs-th>Block</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" id="tableRow" style="border: solid white 1px">
              <vs-td :data="tr.accountName">{{tr.accountName}}</vs-td>
              <vs-td :data="tr.monthEnd">{{tr.monthEnd}}</vs-td>
              <vs-td :data="tr.monthStart">{{tr.monthStart}}</vs-td>
              <vs-td>
                <div class="vx-col">
                  <vs-switch class="rounded-pill" @change="blockAccount(tr)" v-model="tr.blocked" color="danger">
                    <span slot="off">No</span>
                    <span slot="on">Yes</span>
                  </vs-switch>
                </div>
              </vs-td>
              <template class="expand-user" slot="expand" >
                <div class="con-expand-users w-full" >
                  <div>
                    <vs-table
                      ref="gridTable2"
                      v-model="selected"
                      :data="tr.stores"              
                    >
                      <template slot="thead">
                        <vs-th>storeName  </vs-th>
                        <vs-th>Created</vs-th>  
                        <vs-th>Renew Date</vs-th> 
                        <vs-th>Subscription Remaining</vs-th>  
                        <vs-th>Store Type</vs-th>
                        <vs-th>MAC Adress</vs-th>
                        <vs-th>Active</vs-th>
                        <vs-th>Renew</vs-th>
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">                              
                          <vs-td :data="tr.storeName">{{tr.storeName}}</vs-td>
                          <vs-td :data="tr.createDate">{{tr.createDate}}</vs-td>
                          <vs-td :data="tr.renewDate">{{tr.renewDate}}</vs-td>
                          <vs-td :style="getColor(tr)" :data="tr.dateDiff">{{tr.dateDiff}}</vs-td>
                          <vs-td :data="tr.storeType">{{tr.storeType}}</vs-td>
                          <vs-td :data="tr.macAddress">{{tr.macAddress}}</vs-td>
                          <vs-td :data="tr.storeActive">{{tr.storeActive}}</vs-td>
                          <vs-td class="whitespace-no-wrap">
                            <vx-tooltip class="flex" text="Renew Subscription">
                              <feather-icon
                              icon="EditIcon"
                              svgClasses="w-5 h-5 hover:text-primary stroke-current"
                              @click.stop="EditSubscription(tr)"
                            />
                            </vx-tooltip>
                            
                            <!--<feather-icon
                              icon="TrashIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                              @click.stop="deleteSubscription(tr)"
                            />-->
                          </vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
            </template>
            </vs-tr>
          </template>
        </vs-table>
        <vs-popup id="renewPop" title="Renew Subscription"  :active.sync="renewPopupActive">
          <div>
            <div class="vx-row px-4 pb-3">
              <div class="vx-col flex-2">
                <label>Renew Date</label>
                <div >
                  <flat-pickr
                    id="datepick" 
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-calendar"
                    v-model="renewDate"
                    :format="'YYYY-MM-DD'"
                    placeholder="Select Renew Date"
                    name="Renew Date"
                  />
                </div>
              </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button id="submit" ref="submit" class="rounded-lg mr-3 mb-2 vs-con-loading__container" @click="saveSubscription">Submit</vs-button>
                  <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelEdit">Close</vs-button>
                </div>
              </div>
          </div>
        </vs-popup>
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
      accountsData: [],
      itemsPerPage: 10,
      selected: [],
      isMounted: false,
      renewPopupActive: false,
      renewDate: "",
      currStore: {},
      color: "rgb(0,0,0)",
      blocked: true,
      showExpiredStores: false,
      showBlockedAccounts: false,
      expiredStores: [],
      blockedAccountList: [],
      originalList: [],
    };
  },
  
  components: {
    flatPickr,
    "v-select": vSelect,
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
    showExpiredStores: function (val) {
      var self = this;
      if(val){
        self.showOnlyExpiredStores();
      }
      else if(self.showBlockedAccounts){
        self.accountsData = self.originalList;
        self.showOnlyBlockedAccounts();
      }
      else{
        self.accountsData = self.originalList;
      }
    },
    showBlockedAccounts: function (val) {
      var self = this;
      if(val){
        self.showOnlyBlockedAccounts();
      }
      else if(self.showExpiredStores){
        self.accountsData = self.originalList;
        self.showOnlyExpiredStores();
      }
      else{
        self.accountsData = self.originalList;
      }
    }
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
    initValues(){
      var self = this;
      self.accountsData = [];
      self.originalList = [];
      self.renewPopupActive = false;
      self.currStore = {};
      
      self.showExpiredStores = false;
      self.showBlockedAccounts = false;
      self.expiredStores = [];
      self.blockedAccountList = [];
      self.originalList = [];
    },
    GetGrid(){
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.accountsData = response.data;
        self.originalList = response.data;
      };
      var onFinally = function() {
        self.successNotify();
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "Subscription",
        onSuccess,
        onFinally
      );
    },
    deleteSubscription(data){
    },
    getColor(tr){
      if(tr.dateDiff < 30){
        return 'background: rgb(254, 138, 131)';
      }
      else if(tr.dateDiff >= 30 && tr.dateDiff <= 100){
        return 'background: rgb(254, 212, 52)';
      }
      else{
        return 'background: rgb(153, 255, 153)';
      }
    },
    saveSubscription(){
      var self = this;
      self.currStore.renewDate = self.renewDate;
      self.showLoadingOnElement("submit",1,"radius");
      var onSuccess = response =>{
        self.$vs.loading.close(self.$refs.submit.$el);
        self.renewPopupActive = false
        self.GetGrid();
      }
    
      var onFinally = response =>{
      }
    
      self.$ajaxPost(self, "Subscription" , self.currStore , onSuccess, onFinally);
    },
    showOnlyExpiredStores(){
      var self = this;
      
      if(self.showExpiredStores){
        self.expiredStores = self.accountsData.map((item) =>{
          return{
            accountActive: item.accountActive,
            accountId: item.accountId,
            accountName: item.accountName,
            blocked: item.blocked,
            enable: item.enable,
            id: item.id,
            monthEnd: item.monthEnd,
            monthStart: item.monthStart,
            stores: item.stores.filter(x => x.dateDiff <= 0),
          };
        });

        self.accountsData = [];
        self.expiredStores.forEach((item, index) => {
          if(item.stores.length > 0){
            self.accountsData.push(item);
          }
        });
      }
      else if(!self.showExpiredStores && !self.showBlockedAccounts){
        self.GetGrid();
      }
      else if(!self.showExpiredStores && self.showBlockedAccounts){
        self.accountsData = self.originalList;
        self.showOnlyBlockedAccounts();
      }
    },
    showOnlyBlockedAccounts(){
      var self = this;

      if(self.showBlockedAccounts){
        self.blockedAccountList = self.accountsData.filter(item => item.blocked == true);
        self.accountsData = [];

        self.blockedAccountList.forEach((item, index) => {
          if(item.blocked == true){
            self.accountsData.push(item);
          }
        });
      }
      else if(!self.showBlockedAccounts && !self.showExpiredStores){
        self.GetGrid();
      }
      else if(!self.showBlockedAccounts && self.showExpiredStores){
        self.accountsData = self.originalList;
        self.showOnlyExpiredStores();
      }
    },
    EditSubscription(data){
      this.currStore = data;
      this.renewDate = data.renewDate;
      this.renewPopupActive = true;

    },
    cancelEdit(){
      this.renewDate = "";
      this.renewPopupActive = false;
      this.GetGrid();
    },
    blockAccount(data){
      var self = this;
      var obj = {
        accountId: data.accountId,
        blocked: data.blocked
      };

      var onSuccess = response =>{
        self.GetGrid();
      }
    
      var onFinally = response =>{
      }
    
      self.$ajaxPost(self, "Subscription/BlockAccount" , obj, onSuccess, onFinally);
    },
  }
};

</script>
<style lang="scss">
#tableRow{
  border: 3px,black;
}
</style>