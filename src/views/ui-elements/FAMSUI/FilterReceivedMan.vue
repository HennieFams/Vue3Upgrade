<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card
        v-show="!isInfoHidden"
        class="pb-3"
        title="FAMS Filters - Receiving Manually"

      >
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Begin date</label>
            <datepicker
              class="w-full"
              id="FromDate"
              placeholder="From Date"
              v-model="formData.fromDate"
              format="yyyy-MM-dd"
              name="From Date"
              v-validate="'required'"
            ></datepicker>
            <span
              class="text-danger text-sm"
              v-show="errors.has('From Date')"
              >{{ errors.first("From Date") }}</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>End date</label>
            <datepicker
              class="w-full"
              id="ToDate"
              placeholder="To Date"
              v-model="formData.toDate"
              format="yyyy-MM-dd"
              name="To Date"
              v-validate="'required'"
            ></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{
              errors.first("To Date")
            }}</span>
          </div>
        </div>
        <div class="mt-3 vx-col w-full mb-base">
          <vs-button
            ref="submit"
            class="rounded-lg pt-3 w-full vs-con-loading__container"
            @click="getDatafilterReceiveManual"
            >Submit</vs-button>
        </div>
        <div>
          <vs-table
            ref="gridTable"
            v-show="isVisible"
            pagination
            :max-items="itemsPerPage"
            search
            :data="dispensingFilterData"
            class="vs-con-loading__container"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow"
            >
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div
                  class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                >
                  <span class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                    {{
                      dispensingFilterData.length - currentPage * itemsPerPage >
                      0
                        ? currentPage * itemsPerPage
                        : dispensingFilterData.length
                    }}
                    of {{ dispensingFilterData.length }}</span
                  >
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item @click="itemsPerPage = 10">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="itemsPerPage = 20">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="itemsPerPage = 50">
                    <span>50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="itemsPerPage = 100">
                    <span>100</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <template slot="thead">
              <vs-th sort-key="Store">Store</vs-th>
              <vs-th sort-key="Product">Tank</vs-th>
              <vs-th sort-key="Equipment">Product</vs-th>
              <vs-th sort-key="Date">Date</vs-th>
              <vs-th sort-key="Volume">Volume</vs-th>
              <vs-th sort-key="FuelPrice">Fuel Price</vs-th>
              <vs-th sort-key="Description">Description</vs-th>
              <vs-th>Action</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr>
                <vs-td>
                  <vs-input
                    v-model="rmStore"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="rmTank"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="rmProduct"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="rmDate"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="rmVolume"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="rmFuelPrice"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="rmDescription"
                    class="w-full"
                  />
                </vs-td>
                <vs-td></vs-td>
              </vs-tr>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.storeName">{{ tr.storeName }}</vs-td>
                <vs-td :data="tr.tank">{{ tr.tank }}</vs-td>
                <vs-td :data="tr.productName">{{ tr.productName }}</vs-td>
                <vs-td :data="tr.createDate">{{formatDate(tr.createDate.replace("T", " ").split('.')[0])}}</vs-td>
                <vs-td :data="tr.volume">{{ tr.volume }}</vs-td>
                <vs-td :data="tr.fuelprice">{{ tr.fuelprice }}</vs-td>
                <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                <vs-td id="iconContainer" class="whitespace-no-wrap">
                  <vx-tooltip class="flex" text="Edit Manually Received">
                    <feather-icon
                      icon="EditIcon"
                      ref="edit"
                      svgClasses="w-5 h-5 hover:text-success stroke-current"
                      @click.stop="handelSelectedDispensing(tr)"
                    />
                  </vx-tooltip>
                  <vx-tooltip class="flex" text="Delete Manually Received">
                    <feather-icon
                      icon="TrashIcon"
                      svgClasses="w-5 h-5 hover:text-danger stroke-current"
                      class="ml-2"
                      @click.stop="deleteSelectedDispensing(tr)"
                    />
                  </vx-tooltip>
                  
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vx-card>
      <vx-card
        v-show="!isUpdateCardHidden"
        class="pb-3 vs-con-loading__container"
        ref="updateCard"
        title="FAMS Filters - Receiving Manually Edit">    
      <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button ref="saveButton" class="rounded-lg vs-con-loading__container mr-2"  color="success" type="filled" @click="saveDispensingFilter">Save</vs-button>
            <vs-button ref="deleteButton" color="danger" type="filled" class="rounded-lg mr-6 vs-con-loading__container"  @click="activePopUp=true">Delete</vs-button>
            <vs-button  color="warning" class="rounded-lg " type="filled"  @click="cancelAddCard">Cancel</vs-button>
          </div>
        </div> 
      <div class="vx-row pb-3">
        <div class="vx-col md:w-1/2 w-full mt-2">
          <label>Date</label>
          <div id="datepick">
              <flat-pickr
              class="w-full"
                :config="configdateTimePicker"
                v-model="formData.date"
                :format="'YYYY-MM-DD HH:mm:ss'"
                placeholder="Select Date"
                name="Date"
              />
          </div>
        </div>
        <div class="vx-col md:w-1/2 w-full mt-2">
          <label>Description</label>
          <vs-input placeholder="Description" class="w-full" v-model="formData.description"  />
        </div>
      </div>
      <div class="vx-row pb-3">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Store</label>
            <v-select
              ref="storeDropdown"
              class="w-full"
              placeholder="Search / Select Store"
              :options="storeData"
              v-model="storeDropDown"
            ></v-select>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Volume</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="volInput"
              onClick="this.select();"
              name="Volume"
              class="w-full"
              v-model="formData.volume"
            />
            <span class="text-danger text-sm" v-show="errors.has('Volume')">{{ errors.first('Volume') }}</span>
          </div>
        </div>  
        <div class="vx-row pb-3">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Tank</label>
            <v-select
              ref="tankDropdown"
              class="w-full"
              placeholder="Search / Select Tank"
              :options="tankData"
              v-model="tankDropDown"
            ></v-select>
          </div>
          <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
            <label>FuelPrice(R)</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="fuelPriceInput"
              onClick="this.select();"
              name="FuelPrice"
              class="w-full"
              v-model="formData.fuelPrice"/>
            <span class="text-danger text-sm" v-show="errors.has('FuelPrice')">{{ errors.first('FuelPrice') }}</span>
          </div>
        </div>
        <div class="vx-row pb-3">          
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Product</label>
            <v-select
              ref="productDropdown"
              class="w-full"
              placeholder="Search / Select Product"
              :options="productData"
              v-model="productDropDown"
            ></v-select>
          </div>
        </div>
      </vx-card>
    </div>
    <template>
      <div class="demo-alignment">
        <vs-popup classContent="popup-example" title="Confirm" :active.sync="activePopUp">
          <p>Are you sure?</p>
          <vs-divider></vs-divider>
        <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button  color="success" class="rounded-lg mr-2" type="filled"  @click="deleteReceiving">Yes</vs-button>
            <vs-button  color="warning" class="rounded-lg mr-2" type="filled"  @click="activePopUp=false">No</vs-button>
          </div>
        </div>
        </vs-popup>
      </div>
    </template>   
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import VxCard from "../../../components/vx-card/VxCard.vue";
import moment from "moment";
export default {
  data() {
    return {
      configdateTimePicker: {
      enableTime: true,
      enableSeconds: true,
      },

      getStoreDone:false,
      getProductsDone:false,
      getTankDone:false,

      dispensingFilterData: [],
      origDispensingFilterData: [],
      columns: "",
      itemsPerPage: 10,
      isMounted: false,
      isVisible: false,
      isInfoHidden: false,
      isUpdateCardHidden: true,
      activePopUp:false,

      storeDropDown: 0,
      productDropDown: 0,
      tankDropDown:0,

      productData: [],
      storeData: [],
      tankData: [],

      formData: {
        fromDate: "",
        toDate: "",
        storeId: "",
        productId: "",
        DispenseId:'',
        tankId:'',
        date:"",
        fuelPrice:'',
        description: '',
        volume:'',
      },
      rmStore: "",
      rmTank: "",
      rmProduct: "",
      rmDate: "",
      rmVolume: "",
      rmFuelPrice: "",
      rmDescription: "",
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VxCard
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  watch: {
    rmStore(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.storeName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    rmTank(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.tank.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    rmProduct(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.productName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    rmDate(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.createDate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    rmVolume(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.volume == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    rmFuelPrice(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.fuelprice == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    rmDescription(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
  },
  mounted() {
    this.isMounted = true;
    var date = new Date();
    this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },

    initValues(){
      this.storeDropDown = 0;
      this.productDropDown = 0;
      this.tankDropDown = 0;

      this.formData.storeId = "";
      this.formData.productId = "";
      this.formData.tankId = "";
      this.formData.DispenseId = '';
      this.formData.fuelPrice = '';
      this.formData.description = '';
      this.formData.volume = '';

      this.productData = [];
      this.storeData = [];
      this.tankData = [];
    },    
    getDatafilterReceiveManual() {
      var self = this;
      self.isVisible = false;
      self.showLoadingOnElement("submit", 1, "radius");
      var onSuccess = function (response) {
        self.dispensingFilterData = response.data;
        self.origDispensingFilterData = response.data;
        
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
        self.isVisible = true;
      };
      self.$ajaxGet(
        self,
        `Dispensing/GetDatafilterReceiveManual?fromDate=${self.dateFormat(
          self.formData.fromDate
        )}&toDate=${self.dateFormat(self.formData.toDate)}`,
        onSuccess,
        onFinally
      );
    },
    getStore(id){
      var self = this;

      var onSuccess = function(response) {
        self.storeData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.storeDropDown = self.storeData.filter((item) => {return item.value == id})[0];
      };
      var onFinally = function(){
        self.getStoreDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Stores/GetStoreForManualEntry", onSuccess, onFinally);
    },
    getProducts(id){
      var self = this;
      var onSuccess = function(response) {
        self.productData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.productDropDown = self.productData.filter((item) => {return item.value == id})[0];
      };
      var onFinally = function(){
        self.getProductsDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Products/GetProductDropDownAll", onSuccess, onFinally);
    },    
    getTank(id){
      var self = this;

      var onSuccess = function(response) {
        self.tankData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.tankDropDown = self.tankData.filter((item) => {return item.value == id})[0];
      };
      var onFinally = function(){
        self.getTankDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Tanks/GetTankdropdown", onSuccess, onFinally);
    },
    handelSelectedDispensing(tr) {
      this.formData.DispenseId = tr.id;
      this.getStore(tr.storeID);
      this.getProducts(tr.productID);
      this.getTank(tr.tankID);
      this.formData.description = tr.description;
      this.formData.volume = tr.volume;
      this.formData.fuelPrice = tr.fuelprice;
      this.formData.date = tr.createDate;
      this.showUpdateCard();
    },
    showUpdateCard(){
      this.isInfoHidden = true;
      this.isUpdateCardHidden = false;
      this.showLoadingOnElement("updateCard", 1, "radius");
    },
    cancelAddCard(){
      this.isInfoHidden = false;
      this.isUpdateCardHidden = true;
      this.initValues();
      self.isVisible = false;
      this.getDatafilterReceiveManual();
    },
    saveDispensingFilter(){
      var self = this;

      self.showLoadingOnElement("saveButton", 1, "radius");   

      self.formData.storeId = self.storeDropDown ? parseInt(self.storeDropDown.value) : 0;
      self.formData.productId = self.productDropDown ? parseInt(self.productDropDown.value) : 0;
      self.formData.tankId = self.tankDropDown ? parseInt(self.tankDropDown.value) : 0;
      var onSuccess = function(response) {
        self.cancelAddCard();
      };
      var onFinally = function(){
        self.$vs.loading.close(self.$refs.saveButton.$el);
      };
      self.$ajaxPost(self,"Dispensing/DispensingFilterReceivingSaveEdit",self.formData,onSuccess,onFinally);
    },
    deleteReceiving(){
      var self = this;
      self.activePopUp = false;
      self.showLoadingOnElement("deleteButton", 1, "radius");   
      var onSuccess = function(response) {
        self.cancelAddCard();
      };
      var onFinally = function(){
        self.$vs.loading.close(self.$refs.deleteButton.$el);
      };
      self.$ajaxDelete(self,`Dispensing/RemoveReceivingDataFilter?id=${self.formData.DispenseId}`,onSuccess,onFinally);
    },
    checkLoadingDone(){
      var self = this;
      self.getStoreDone && self.getProductsDone  && self.getTankDone ? self.$vs.loading.close(self.$refs.updateCard.$el) : null
    },
    formatDate(pad, dateTime) {
      if (typeof dateTime === "undefined") return pad;

      return (pad + dateTime).slice(-pad.length);
    },
    dateFormat(date) {
      var month = "";
      var year = "";
      var day = "";

      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    // closeCardAnimationDemo(card) {
    //   this.clearFields();
    //   card.removeRefreshAnimation(3000);
    // },
    successNotifyGridExpanded() {
      this.$vs.notify({
        title: "Grid - Successfully",
        text: "Grid expanded / closed",
        color: "warning",
      });
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully added | updated | removed",
        color: "success",
      });
    },
     successNotifyLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
    },

    FailedNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Item not added",
        color: "danger",
      });
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    deleteSelectedDispensing(tr){
      this.formData.DispenseId = tr.id;
      this.activePopUp=true;
    }
  },
};
</script>
<style lang="scss">
#datepick{
    .flatpickr-input.active
    {
      border: 1px solid #ff9f43 !important;
    }
    }

    
#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>