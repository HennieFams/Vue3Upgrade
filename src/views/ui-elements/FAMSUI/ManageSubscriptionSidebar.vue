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
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>
        <!-- {{ Object.entries(this.data).length === 0 ? "ADD" : "UPDATE" }} Exception -->
      </h4>
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-3">Edit Subscription</vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
      suppressScrollX="true"
    >
      <div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Subscription Name"
              v-model="currStore.name"
              class="w-full"
              disabled
            />
            <label class="w-full" size="small">Account</label>
            <v-select
              class="w-full"
              placeholder="Search / Select Account"
              :options="accountList"
              v-model="selectedAccount"
              @search:blur="populateType"
              name="Search / Select Account"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Search / Select Account')"
              >{{
                errors.first("Search / Select Account")
              }}</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <label class="w-full">Subscription Type</label>
            <v-select
              class="w-full"
              placeholder="Search / Select Subscription Type"
              :options="typeList"
              v-model="selectedType"
              @search:blur="populateType"
              name="Search / Select Subscription Type"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Search / Select Equipment Rebate')"
              >{{
                errors.first("Search / Select Equipment Rebate")
              }}</span
            >
            <label class="w-full" size="small">Subscription Interval</label>
            <v-select
              class="w-full"
              placeholder="Search / Select Interval"
              :options="intervalList"
              v-model="selectedInterval"
              @search:blur="populateType"
              name="Search / Select Subscription Interval"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Search / Select Equipment Rebate')"
              >{{
                errors.first("Search / Select Equipment Rebate")
              }}</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Custom Price(R)"
              v-model="currStore.customPrice"
              class="w-full"
              @input="customPriceDown()"
            />
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input
              label="Subscription Price(R)"
              v-model="currStore.viewPrice"
              class="w-full"
              disabled
            />
          </div>
          <div v-show="showStores" class="vx-col md:w-full w-full mt-5">
            <label class="w-full" size="small">Store</label>
            <v-select
              class="w-full"
              placeholder="Search / Select Store"
              :options="stores"
              @search:blur="populateName"
              v-model="selectedStore"
              name="Search / Select Store"
            />
          </div>
          <div class="vx-row md:w-full w-full mt-5" style="padding: 0 1rem">
            <div class="vx-col flex-1">
              <label>Created Date</label>
              <div id="datepick">
                <flat-pickr
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-calendar"
                  v-model="currStore.createdDate"
                  :format="'YYYY-MM-DD'"
                  placeholder="Select Created Date"
                  name="Created Date"
                />
              </div>
            </div>
            <div class="vx-col flex-1">
              <label>Expiry Date</label>
              <div id="datepick">
                <flat-pickr
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-calendar"
                  v-model="currStore.expiryDate"
                  :format="'YYYY-MM-DD'"
                  placeholder="Select Expiry Date"
                  name="Expiry Date"
                />
              </div>
            </div>
            <div class="vx-col flex-1">
              <label>Renew Date</label>
              <div id="datepick">
                <flat-pickr
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-calendar"
                  v-model="currStore.renewDate"
                  :format="'YYYY-MM-DD'"
                  placeholder="Select Renew Date"
                  name="Renew Date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </component>
    <div class="vx-row flex flex-wrap items-center">
      <vs-spacer />
      <div class="vx-col">
        <vs-button
          ref="saveButton"
          class="rounded-lg mr-3 vs-con-loading__container"
          color="success"
          type="border"
          @click="SaveEditSubscription"
          >Save</vs-button
        >
        <vs-button
          ref="cancelButton"
          class="rounded-lg mr-3"
          color="warning"
          type="border"
          @click="closeSidebar"
          >Cancel</vs-button
        >
      </div>
    </div>
  </vs-sidebar>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { color } from '@amcharts/amcharts4/core';
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      default: () => {},
    },
  },
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

      accountList: [],
      currStore: {
        name: "",
        id: 0,
        accountId: 0,
        subInterval: 0,
        subType: 0,
        store: 0,
        createdDate: "",
        expiryDate: "",
        renewDate: "",
        customPrice: 0,
        viewPrice: 0,
      },
      stores: [],
      selectedStore: 0,
      accountList: [],
      selectedAccount: 0,
      typeList: [],
      selectedType: 0,
      intervalList: [],
      selectedInterval: 0,
      isInfoHidden: true,
      isListHidden : false,
      showStores: false,
      
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      

    };
  },
  
  components: {
    flatPickr,
    "v-select": vSelect,
    VuePerfectScrollbar,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      },
    },
  },
  watch: {
    isSidebarActive(val) {
      if(val){
        var self = this;
        self.getTypesList();
        self.getIntervalList();
        self.getAccountList();
        if (Object.entries(self.data).length === 0) {
          self.initValues();
          self.$validator.reset();
        } else{
          self.currStore.name = self.data.subscriptionName;
          self.currStore.id = self.data.id;
          self.currStore.accountId = self.data.accountId;
          self.currStore.createdDate = self.data.subscriptionCreateDate;
          self.currStore.expiryDate = self.data.subscriptionExpireDate;
          self.currStore.renewDate = self.data.subscriptionRenewedDate;
          self.currStore.customPrice = self.data.customPrice;

          self.selectedAccount = self.accountList.filter(function (item) {
                  return item.value == self.data.accountId;
                })[0];
          self.selectedType = self.typeList.filter(function (item) {
                return item.value == self.data.subscriptionTypeId;
              })[0];
          self.selectedInterval = self.intervalList.filter(function (item) {
                return item.value == self.data.subscriptionIntervalId;
              })[0];
          setTimeout(function(){
            if(self.selectedType && self.selectedInterval.value == 1 && self.currStore.customPrice == 0){
              self.currStore.viewPrice = (self.selectedType.price * 12);
            }
            else if(self.selectedType && self.selectedInterval.value == 2 && self.currStore.customPrice == 0){
              self.currStore.viewPrice = self.selectedType.price;
            }
            else if(self.selectedType && self.selectedInterval.value == 3 && self.currStore.customPrice == 0){
              self.currStore.viewPrice = (self.selectedType.price * 4);
            }
            else if(self.selectedType && self.selectedInterval.value == 4 && self.currStore.customPrice == 0){
              self.currStore.viewPrice = (self.selectedType.price * 6);
            }
            else if(self.selectedType && self.selectedInterval.value == 1 && self.currStore.customPrice > 0){
              self.currStore.viewPrice = (self.currStore.customPrice * 12);
            }
            else if(self.selectedType && self.selectedInterval.value == 2 && self.currStore.customPrice > 0){
              self.currStore.viewPrice = self.currStore.customPrice;
            }
            else if(self.selectedType && self.selectedInterval.value == 3 && self.currStore.customPrice > 0){
              self.currStore.viewPrice = (self.currStore.customPrice * 4);
            }
            else if(self.selectedType && self.selectedInterval.value == 4 && self.currStore.customPrice > 0){
              self.currStore.viewPrice = (self.currStore.customPrice * 6);
            }

            if(self.selectedType.value == 1 || self.selectedType.value == 2){
              self.getStores(self.data.accountId);
            }
            else{
              self.showStores = false;
            }
          }, 100);
        }
      }
      
    },
  },
  mounted() {
    // this.GetGrid();
    this.getTypesList();
    this.getIntervalList();
    this.getAccountList();
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
    customPriceDown(){
      var self = this;
      
      if(self.currStore.customPrice > 0){
        if(self.selectedInterval.value == 1){
          self.currStore.viewPrice = (self.currStore.customPrice * 12);
        }
        else if(self.selectedInterval.value == 2){
          self.currStore.viewPrice = self.currStore.customPrice;
        }
        else if(self.selectedInterval.value == 3){
          self.currStore.viewPrice = (self.currStore.customPrice * 4);
        }
        else if(self.selectedInterval.value == 4){
          self.currStore.viewPrice = (self.currStore.customPrice * 6);
        }
      }
      else{
        if(self.selectedType && self.selectedInterval.value == 1){
          self.currStore.viewPrice = (self.selectedType.price * 12);
        }
        else if(self.selectedType && self.selectedInterval.value == 2){
          self.currStore.viewPrice = self.selectedType.price;
        }
        else if(self.selectedType && self.selectedInterval.value == 3){
          self.currStore.viewPrice = (self.selectedType.price * 4);
        }
        else if(self.selectedType && self.selectedInterval.value == 4){
          self.currStore.viewPrice = (self.selectedType.price * 6);
        }
        else{
          self.currStore.viewPrice = self.selectedType.price;
        }

      }
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
      self.currStore.name = "";
      self.currStore.id = 0;
      self.currStore.customPrice = 0;
      self.currStore.viewPrice = 0;
      // self.currStore.accountId = 0;
      self.currStore.createdDate = "";
      self.currStore.expiryDate = "";
      self.currStore.renewDate = "";

      self.stores = [];
      self.typeList = [];
      self.intervalList = [];
      self.accountList = [];


      var date = new Date();
      self.currStore.createdDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.currStore.expiryDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.currStore.renewDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      self.getAccountList();
      self.getTypesList();
      self.getIntervalList();

    },
    populateType(){
      const self = this;

      if(self.selectedType && self.selectedInterval.value == 1){
        self.currStore.viewPrice = (self.selectedType.price * 12);
      }
      else if(self.selectedType && self.selectedInterval.value == 2){
        self.currStore.viewPrice = self.selectedType.price;
      }
      else if(self.selectedType && self.selectedInterval.value == 3){
        self.currStore.viewPrice = (self.selectedType.price * 4);
      }
      else if(self.selectedType && self.selectedInterval.value == 4){
        self.currStore.viewPrice = (self.selectedType.price * 6);
      }
      else{
        self.currStore.viewPrice = self.selectedType.price;
      }

      if(self.selectedType && self.selectedAccount){
        if(self.selectedType.value == 1 || self.selectedType.value == 2){
          self.showStores = true;
          self.getStores(self.selectedAccount.value);
        }
        else{
          self.populateName();
          self.showStores = false;
        }
      }
    },
    populateName(){
      var self = this;
      if(self.selectedType && self.selectedAccount){
        if(self.selectedType.value == 1 || self.selectedType.value == 2 && self.selectedStore){
          self.currStore.name = self.selectedType.label + "_" + self.selectedStore.label;
        }
        else{
          self.currStore.name = self.selectedType.label + "_" + self.selectedAccount.label;
        }
      }
    },
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-1").then((result) => {
          if (result) {
            resolve(true);
          } else {
            this.ValidateNotify();
            reject("correct all values");
          }
        });
      });
    },
    SaveEditSubscription(){
      var self = this;
      
      self.currStore.accountId = self.selectedAccount.value;
      self.currStore.subInterval = self.selectedInterval.value;
      self.currStore.subType = self.selectedType.value;
      self.currStore.store = self.selectedStore.value;

      const obj = {};
      obj.Name = self.currStore.name;
      obj.Id = self.currStore.id;
      obj.AccountId = self.currStore.accountId;
      obj.SubscriptionIntervalId = self.currStore.subInterval;
      obj.SubscriptionTypeId = self.currStore.subType;
      obj.SubId = self.currStore.store;
      obj.CreateDate = self.currStore.createdDate;
      obj.ExpriryDate = self.currStore.expiryDate;
      obj.RenewDate = self.currStore.renewDate;
      obj.customPrice = self.currStore.customPrice;
      
      // self.showLoadingOnElement("submit",1,"radius");
      var onSuccess = response =>{
        // self.$vs.loading.close(self.$refs.submit.$el);
        // self.editPopupActive = false
        self.closeSidebar();
      }
    
      var onFinally = response =>{
      }
    
      self.$ajaxPost(self, "Subscription/PostSubscription" , obj , onSuccess, onFinally);
    },
    closeSidebar(){
      this.isSidebarActiveLocal = false;
      // this.initValues();
    },
    getAccountList(){
      var self = this;
      
      var onSuccess = response =>{
        self.accountList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
    
      var onFinally = response =>{

      }
    
      self.$ajaxGet(self, "Accounts/GetAccountdropdown" , onSuccess, onFinally);
    },
    getTypesList(){
      var self = this;
      var onSuccess = response =>{
        self.typeList = response.data.map((item) => {
          return { label: item.name, value: item.id, price: item.price };
        });
      }
    
      var onFinally = response =>{

      }
    
      self.$ajaxGet(self, "Subscription/GetSubscriptionTypes" , onSuccess, onFinally);
    },
    getIntervalList(){
      var self = this;
      var onSuccess = response =>{
        self.intervalList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
    
      var onFinally = response =>{

      }
    
      self.$ajaxGet(self, "Subscription/GetSubscriptionIntervals" , onSuccess, onFinally);
    },
      getStores(id) {
          const self = this;
          
          var onSuccess = function(response) {
              self.stores = response.data.map((item) => {return {label: item.name, value: item.id} });
              self.showStores = true;
              self.selectedStore = self.stores.filter(function (item) {
                return item.value == self.data.subId;
            })[0];
          };
          var onFinally = function() {
          };
          self.$ajaxGet(
            self,
            "Stores/GetStoredropdownForAccount/" + id,
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

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 600px;
    max-width: 90vw;

    .ps__scrollbar-x-rail {
      display: none !important;
    }

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
      
    }
    .con-chips{
        justify-content: unset;
      }
  }
}

.scroll-area--data-list-add-new {
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
