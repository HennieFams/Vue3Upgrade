<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card
        class="pb-3"
        title="FAMS Filters - Allocation"
      >
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Begin date</label>
            <datepicker
              class="w-full"
              id="FromDate"
              placeholder="From Date"
              v-model="formData.startdate"
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
              v-model="formData.enddate"
              format="yyyy-MM-dd"
              name="To Date"
              v-validate="'required'"
            ></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{
              errors.first("To Date")
            }}</span>
          </div>
        </div>
        <br>
        <div class="vx-row">
          <div class="vx-col w-full mb-base">
            <label>Store</label>
            <v-select
              ref="storeDropdown"
              class="w-full"
              placeholder="Search / Select Store"
              :options="storeData"
              v-model="storeDropDown"
            ></v-select>
          </div>  
          <div class="vx-col w-full mb-base">
            <label>Corrrect Group</label>
            <v-select 
              ref="allocationGroup" 
              class="w-full" 
              placeholder="Search / Select Allocation Group"
              
              :options="allocationGroupData"
              v-model="allocationGroupDropDown">>>
            </v-select>
          </div>
        </div>  
        <div class="vx-row">
          <div class="vx-col w-full mb-base">
            <vs-button
              ref="reloadb"
              class="rounded-lg w-full vs-con-loading__container"
              @click="getUsagePerAllocationPerStore"
              >Reload</vs-button>
          </div>
          <div class="vx-col w-full mb-base">
            <vs-button
              ref="cButton"
              class="rounded-lg w-full vs-con-loading__container"
              @click="correctionGroup"
              >Correction</vs-button>
          </div>
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
              <vs-th sort-key="Registration">Registration</vs-th>
              <vs-th sort-key="Date">Date</vs-th>
              <vs-th sort-key="Measurement">Measurement</vs-th>
              <vs-th sort-key="KMHour">KMHour</vs-th>
              <vs-th sort-key="Volume">Volume(L)</vs-th>
              <vs-th sort-key="Allocation1">Allocation1</vs-th>
              <vs-th sort-key="Allocation2">Allocation2</vs-th>
              <vs-th sort-key="Allocation3">Allocation3</vs-th>
              <vs-th sort-key="Allocation4">Allocation4</vs-th>
              <vs-th sort-key="Operator">Fuel Attendant</vs-th>
              <vs-th sort-key="Driver">Driver</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr>
                <vs-td></vs-td>
                <vs-td>
                  <vs-input
                    v-model="fRegistration"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fDate"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fMeasurement"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fKMHour"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fVolume"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fAllocation1"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fAllocation2"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fAllocation3"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fAllocation4"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fFuelAttendant"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="fDriver"
                    class="w-full"
                  />
                </vs-td>
              </vs-tr>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.store">{{ tr.store}}</vs-td>
                <vs-td :data="tr.registration">{{ tr.registration}}</vs-td>
                <vs-td :data="tr.date">{{   formatDate(tr.date.replace("T", " ").split('.')[0])}}</vs-td>
                <vs-td :data="tr.measurement">{{ tr.measurement }}</vs-td>
                <vs-td :data="tr.kmHour">{{ tr.kmHour }}</vs-td>
                <vs-td :data="tr.volume">{{ tr.volume }}</vs-td>
                <vs-td :data="tr.allocation1">{{ tr.allocation1 }}</vs-td>
                <vs-td :data="tr.allocation2">{{ tr.allocation2 }}</vs-td>
                <vs-td :data="tr.allocation3">{{ tr.allocation3 }}</vs-td>
                <vs-td :data="tr.allocation4">{{ tr.allocation4 }}</vs-td>
                <vs-td :data="tr.operator">{{ tr.operator }}</vs-td>
                <vs-td :data="tr.driver">{{ tr.driver }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
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

      isVisible:false,
      dispensingFilterData: [],
      origDispensingFilterData: [],
      itemsPerPage: 10,
      isMounted: false,

      storeDropDown: 0,
      allocationGroupDropDown: 0,
      storeData: [],
      allocationGroupData:[],

      formData: {
        startdate: "",
        enddate: "",
        storeId: "",
        allocationGroupId:""
      },
      fRegistration: "",
      fDate: "",
      fMeasurement: "",
      fKMHour: "",
      fVolume: "",
      fAllocation1: "",
      fAllocation2: "",
      fAllocation3: "",
      fAllocation4: "",
      fFuelAttendant: "",
      fDriver: "",
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VxCard
  },
  watch: {
    fRegistration(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.registration.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fDate(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.date.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fMeasurement(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.measurement.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fKMHour(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.kmHour == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fVolume(val){
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
    fAllocation1(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocation1.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fAllocation2(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocation2.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fAllocation3(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocation3.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fAllocation4(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocation4.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fFuelAttendant(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.operator.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    fDriver(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.driver.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  mounted() {
    this.isMounted = true;
    var date = new Date();
    this.formData.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getStore();
    this.getAllocations();
  },
  methods: {
    getUsagePerAllocationPerStore(){
      var self = this;
      self.isVisible = false;
      if(!self.storeDropDown){
        self.$vs.notify({
        title: "Attention",
        text: "Please select a Store",
        color: "warning",
      });
      }else{
        self.formData.storeId = self.storeDropDown ? parseInt(self.storeDropDown.value) : 0;
        self.showLoadingOnElement("reloadb", 1, "radius");
        var onSuccess = function (response) {
          self.dispensingFilterData = response.data;
          self.origDispensingFilterData = response.data;
          
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.reloadb.$el);
          self.isVisible = true;
        };
        self.$ajaxGet(
          self,
          `PerAllocationStores/GetUsagePerAllocationPerStore?storeId=${self.formData.storeId}&fromDate=${self.dateFormat(
            self.formData.startdate
          )}&toDate=${self.dateFormat(self.formData.enddate)}`,
          onSuccess,
          onFinally
        );
      }
    },
    getStore(){
      var self = this;
      var onSuccess = function(response) {
        self.storeData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function(){
      };
      self.$ajaxGet(self,"Stores/GetStoreForManualEntry",onSuccess,onFinally);
    },
    getAllocations(){
      var self = this;
      var onSuccess = function(response) {
          self.allocationGroupData = response.data.map((item) => {return {label: item.name, value: item.id}});
        };
      self.$ajaxGet(self,`AllocationTypes/GetAllocationTypedropdown`, onSuccess);
    },
    correctionGroup(){
      var self = this;
      if(!self.storeDropDown)
      {
            self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a Store`,
          });
      }else if(!self.allocationGroupDropDown){
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a Allocation Group`,
          });
      }else{
        self.formData.storeId = self.storeDropDown ? parseInt(self.storeDropDown.value) : 0;
        self.formData.allocationGroupId = self.allocationGroupDropDown ? parseInt(self.allocationGroupDropDown.value) : 0;
        self.showLoadingOnElement("cButton", 1, "radius");
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
          self.$vs.loading.close(self.$refs.cButton.$el);
        };
        self.$ajaxPost(self, `Allocations/AllocationFilter?storeId=${self.formData.storeId}&allocationGroupId=${self.formData.allocationGroupId}&startdate=${self.formatDateAlloc(self.formData.startdate)}&enddate=${self.formatDateAlloc(self.formData.enddate)}`, onSuccess, onFinally);   
      }
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    formatDateAlloc: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
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
  },
};
</script>