<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card
        v-show="!isInfoHidden"
        class="pb-3"
        title="FAMS Filters - Transfer"

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
            @click="getDispensingFilter"
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
              <vs-th sort-key="Store">From Store</vs-th>
              <vs-th sort-key="Equipment">To Equipment</vs-th>
              <vs-th sort-key="Product">Product</vs-th>
              <vs-th sort-key="Date">Date</vs-th>
              <vs-th sort-key="Km">Km</vs-th>
              <vs-th sort-key="Hour">Hour</vs-th>
              <vs-th sort-key="Volume">Volume</vs-th>
              <vs-th sort-key="FuelAttendant">Fuel Attendant</vs-th>
              <vs-th sort-key="Driver">Driver</vs-th>
              <vs-th sort-key="Authorization">Authorization</vs-th>
              <vs-th>Action</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr>
                <vs-td>
                  <vs-input
                    v-model="tFromStore"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tToEquipment"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tProduct"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tDate"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tKm"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tHour"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tVolume"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tFuelAttendant"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tDriver"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="tAuthorization"
                    class="w-full"
                  />
                </vs-td>
                <vs-td></vs-td>
              </vs-tr>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.storeName">{{ tr.storeName }}</vs-td>
                <vs-td :data="tr.equipmentName">{{ tr.equipmentName }}</vs-td>
                <vs-td :data="tr.productName">{{ tr.productName }}</vs-td>
                <vs-td :data="tr.createdate">{{   formatDate(tr.createdate.replace("T", " ").split('.')[0])}}</vs-td>
                <vs-td :data="tr.km">{{ tr.km }}</vs-td>
                <vs-td :data="tr.hour">{{ tr.hour }}</vs-td>
                <vs-td :data="tr.volume">{{ tr.volume }}</vs-td>
                <vs-td :data="tr.operatorName">{{ tr.operatorName }}</vs-td>
                <vs-td :data="tr.driverName">{{ tr.driverName }}</vs-td>
                <vs-td :data="tr.authorizationName">{{ tr.authorizationName }}</vs-td>
                <vs-td id="iconContainer" class="whitespace-no-wrap">
                  <vx-tooltip class="flex" text="Edit Transfers">
                    <feather-icon
                      icon="EditIcon"
                      ref="edit"
                      svgClasses="w-5 h-5 hover:text-success stroke-current"
                      @click.stop="handelSelectedDispensing(tr)"
                    />
                  </vx-tooltip>
                  <vx-tooltip class="flex" text="Delete Transfers">
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
        title="FAMS Filters - Transfer Edit">
        <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button ref="saveButton" class="rounded-lg vs-con-loading__container mr-2"  color="success" type="filled" @click="saveDispensingFilter">Save</vs-button>
            <vs-button ref="deleteButton" color="danger" type="filled" class="rounded-lg mr-6 vs-con-loading__container"  @click="activePopUp=true">Delete</vs-button>
            <vs-button  color="warning" type="filled" class="rounded-lg " @click="cancelAddCard">Cancel</vs-button>
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
            <label>Equipment</label>
            <v-select
              ref="equipmentDropdown"
              class="w-full"
              placeholder="Search / Select Equipment"
              :options="equipmentData"
              v-model="equipmentDropDown"
            ></v-select>
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
        <div class="vx-row pb-3">
          <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
            <label>Fuel Attendant</label>
            <v-select 
              ref="operator" 
              class="w-full"
              placeholder="Search / Select Fuel Attendant"
              :options="operatorsData"
              v-model="operatorsDropDown">
            </v-select>
        </div>
          <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
            <label>Driver</label>
            <v-select 
              ref="driver" 
              class="w-full"
              placeholder="Search / Select Driver"
              :options="driversData"
              v-model="driversDropDown">
            </v-select>
          </div>
        </div>
        <div class="vx-row pb-3">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Authorization</label>
            <v-select
              ref="authorizationDropdown"
              class="w-full"
              placeholder="Search / Select Authorization"
              :options="authorizationData"
              v-model="authorizationDropDown"
            ></v-select>
          </div>
        </div>
        <div class="vx-row pb-3">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>KM</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="kmInput"
              onClick="this.select();"
              name="Kilometers"
              class="w-full"
              v-model="formData.km"
            />
            <span class="text-danger text-sm" v-show="errors.has('Kilometers')">{{ errors.first('Kilometers') }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Hour</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="hour"
              onClick="this.select();"
              name="Hour"
              class="w-full"
              v-model="formData.hour"
            />
            <span class="text-danger text-sm" v-show="errors.has('Hour')">{{ errors.first('Hour') }}</span>
          </div>
        </div>
        <div class="vx-row pb-3">
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
            <vs-button  color="success" class="rounded-lg mr-2" type="filled"  @click="deleteEntry">Yes</vs-button>
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
export default {
  data() {
    return {
      configdateTimePicker: {
      enableTime: true,
      enableSeconds: true,
      },

      getStoreDone:false,
      getProductsDone:false,
      getEquipmentsDone:false,
      getOperatorsDone :false,

      dispensingFilterData: [],
      origDispensingFilterData: [],
      columns: "",
      itemsPerPage: 10,
      isMounted: false,
      isVisible: false,
      isInfoHidden: false,
      isUpdateCardHidden: true,
      activePopUp:false,
      activeTransferPopUp:false,

      storeDropDown: 0,
      productDropDown: 0,
      equipmentDropDown: 0,
      authorizationDropDown:0,
      operatorsDropDown:0,
      driversDropDown:0,

      productData: [],
      storeData: [],
      equipmentData: [],
      operatorsData:[],
      driversData:[],
      authorizationData:[],


      formData: {
        fromDate: "",
        toDate: "",
        storeId: "",
        productId: "",
        operatorId: "",
        driverId: "",
        authorizationId: "",
        equipmentId:"",
        DispenseId:'',
        date:"",
        km:"",
        hour:"",
        fuelPrice:'',
        description: '',
        volume:'',
      },
      tFromStore: "",
      tToEquipment: "",
      tProduct: "",
      tDate: "",
      tKm: "",
      tHour: "",
      tVolume: "",
      tFuelAttendant: "",
      tDriver: "",
      tAuthorization: "",
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
    tFromStore(val){
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
    tToEquipment(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.equipmentName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    tProduct(val){
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
    tDate(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.createdate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    tKm(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.km == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    tHour(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.hour == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    tVolume(val){
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
    tFuelAttendant(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.operatorName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    tDriver(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.driverName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    tAuthorization(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.authorizationName.toLowerCase().indexOf(val.toLowerCase()) > -1;
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
    initValues(){
      this.storeDropDown = 0;
      this.productDropDown = 0;
      this.equipmentDropDown = 0;
      this.authorizationDropDown = 0;
      this.operatorsDropDown = 0;
      this.driversDropDown = 0;

      this.formData.storeId = "";
      this.formData.productId = "";
      this.formData.operatorId = "";
      this.formData.driverId = "";
      this.formData.authorizationId = "";
      this.formData.equipmentId = "";
      this.formData.DispenseId = '';
      this.formData.date = "";
      this.formData.km = "";
      this.formData.hour = "";
      this.formData.fuelPrice = '';
      this.formData.description = '';
      this.formData.volume = '';

      this.productData = [];
      this.storeData = [];
      this.equipmentData = [];
      this.operatorsData = [];
      this.driversData = [];
      this.authorizationData = [];
    },
    getDispensingFilter() {
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
        `Dispensing/GetDispensingDataFilterTransfer?&fromDate=${self.dateFormat(
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
    getOperators(tr){
      var self =this;

      var onSuccess = function(response) {
        self.operatorsData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.operatorsDropDown = self.operatorsData.filter((item) => {return item.value == tr.operatorID})[0];        
        
        self.driversData = self.operatorsData;
        self.driversDropDown = self.driversData.filter((item) => {return item.value == tr.driverID})[0];

        self.authorizationData = self.operatorsData;
        self.authorizationDropDown = self.authorizationData.filter((item) => {return item.value == tr.authorizationID})[0];
      };      
      var onFinally = function(){
        self.getOperatorsDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Operators/GetOperatordropdown", onSuccess, onFinally);
    },
    getEquipments(id){
      var self = this;
      var onSuccess = function(response) {
          self.equipmentData = response.data.map((item) => {return {label: item.registration, value: item.id}});
          self.equipmentDropDown = self.equipmentData.filter((item) => {return item.value == id})[0];
        };      
      var onFinally = function(){
        self.getEquipmentsDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Equipments/GetEquipmentDropDown", onSuccess, onFinally);
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
    handelSelectedDispensing(tr) {
      this.formData.DispenseId = tr.id;
      this.getStore(tr.storeID);
      this.getProducts(tr.productID);
      this.getEquipments(tr.equipmentID);
      this.getOperators(tr);
      this.formData.km = tr.km;
      this.formData.hour = tr.hour;
      this.formData.volume = tr.volume;
      this.formData.fuelPrice = tr.fuelPrice;
      this.formData.date = tr.createdate;
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
      this.getDispensingFilter();
    },
    saveDispensingFilter(){
      var self = this;
      self.showLoadingOnElement("saveButton", 1, "radius");

      self.formData.storeId = self.storeDropDown ? parseInt(self.storeDropDown.value) : 0;
      self.formData.productId = self.productDropDown ? parseInt(self.productDropDown.value) : 0;
      self.formData.operatorId = self.operatorsDropDown ? parseInt(self.operatorsDropDown.value) : 0;
      self.formData.driverId = self.driversDropDown ? parseInt(self.driversDropDown.value) : 0;
      self.formData.equipmentId = self.equipmentDropDown ? parseInt(self.equipmentDropDown.value) : 0;
      self.formData.authorizationId = self.authorizationDropDown ? parseInt(self.authorizationDropDown.value) : 0;

      var onSuccess = response => { 
        self.$vs.notify({
          title: "Information",
          color: "success",
          text: `Saved`,
          position: "top-right",
          iconPack: "feather",
          icon: "icon-save"
        });
      };
      var onFinally = function (){
        self.$vs.loading.close(self.$refs.saveButton.$el);
        self.cancelAddCard();
      };

      self.$ajaxPost(self, "Dispensing/DispensingFilterTransferSaveEdit", self.formData, onSuccess, onFinally);   

    },
    deleteEntry(){
      var self =this;
      self.showLoadingOnElement("deleteButton", 1, "radius");
      self.activePopUp = false;

      var onSuccess = function(response) {
        self.cancelAddCard();
        self.getDispensingFilter();
      };
      var onFinally = function(){
        self.$vs.loading.close(self.$refs.deleteButton.$el);
      };
      self.$ajaxDelete(self,`Dispensing/TransferRemoveDispensingDataFilter?id=${self.formData.DispenseId}`,onSuccess,onFinally);
    },    
    transferDispensing(){
      var self =this;
      self.showLoadingOnElement("transferButton", 1, "radius");
      self.activeTransferPopUp = false;

      var onSuccess = function(response) {
        self.cancelAddCard();
        self.getDispensingFilter();
      };
      var onFinally = function(){
        self.$vs.loading.close(self.$refs.transferButton.$el);
      };
      self.$ajaxDelete(self,`Dispensing/RemoveTransferDispensingDataFilter?id=${self.formData.DispenseId}`,onSuccess,onFinally);
    },
    checkLoadingDone(){
      var self = this;
      self.getStoreDone && self.getProductsDone && self.getEquipmentsDone && self.getOperatorsDone  ? self.$vs.loading.close(self.$refs.updateCard.$el) : null
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
    },
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