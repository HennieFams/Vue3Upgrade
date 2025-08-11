<template>
  <div>
    <h3 class="p-3"> Exception History </h3>
    <vs-tabs style="width: auto min-height:500px">
      <vs-tab label="Exception Queue Per Month" style="min-height:500px">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
            <datepicker v-model="formData.startDate" format="yyyy-MM" :minimumView="'month'" :maximumView="'month'" class="w-full"  placeholder="From Date"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('From Date')" >{{ errors.first('From Date') }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>To date</label>
            <datepicker v-model="formData.endDate" format="yyyy-MM" :minimumView="'month'" :maximumView="'month'" class="w-full"  placeholder="To Date"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')" >{{ errors.first('To Date') }}</span>
          </div> 
        </div>
        <br>
        <div class="vx-col w-full mb-base">
          <v-select class="w-full" placeholder="Search / Select exception" :options="exceptionData"  v-model="exceptionDropDown"
            name ="Report" v-validate="'required'" />
            
          </div>
          <div class="vx-col w-full mb-base">
            <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary" @click="GetGrid">Submit</vs-button>
          </div>
          <div>
            <vs-table
              ref="gridTable"
              v-show="isVisible"
              pagination
              :max-items="itemsPerPage"
              search
              :data="exceptionQueueData"
              class="vs-con-loading__container"
            >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow"
            >
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2" >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ exceptionQueueData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : exceptionQueueData.length }} of {{ exceptionQueueData.length }}</span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item @click="totalRows(10)">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="totalRows(20)">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="totalRows(50)">
                    <span>50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="totalRows(100)">
                    <span>100</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <template slot="thead">
              <vs-th sort-key="timeIn">Time In</vs-th>
              <vs-th sort-key="timeOut">Time Out</vs-th>
              <vs-th sort-key="exceptionName">Exception</vs-th>
              <vs-th sort-key="exceptionTrigger">Exception Trigger</vs-th>
              <vs-th sort-key="exceptionType">Type</vs-th>
              <vs-th sort-key="lookUpType">Lookup Type</vs-th>
              <vs-th sort-key="lookUpItem">Name</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.timeIn">{{  formatDate(tr.timeIn.replace("T", " ").split('.')[0])}}</vs-td>
                <vs-td :data="tr.timeOut">{{  formatDate(tr.timeOut.replace("T", " ").split('.')[0])}}</vs-td>
                <vs-td :data="tr.exceptionName">{{ tr.exceptionName 	}}</vs-td>
                <vs-td :data="tr.exceptionTrigger">{{  tr.exceptionTrigger  }}</vs-td>
                <vs-td :data="tr.type">{{ tr.type }}</vs-td>
                <vs-td :data="tr.lookUpType">{{ tr.lookUpType }}</vs-td>
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vs-tab>
    </vs-tabs>
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
      isVisible: false,
      exceptionQueueData: [],
      exceptionDropDown: 0,
      itemsPerPage: 10,
      isMounted: false,
      exceptionData: [],
      
      formData:{
        timeIn: "",
        timeOut: "",
        exceptionName: "",
        exceptionId: 0,
        exceptionTrigger: 0,
        exceptionType: "",
        lookUpType: "",
        lookUpItem: "",
        lookUpItemId: 0,
        startDate: "",
        endDate: "",
      },
    };
  },
  components: {
    Datepicker,
    "v-select": vSelect,
    flatPickr,
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
    this.getExceptions();
    var date = new Date();
    this.formData.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
    initValues(){
      this.exceptionDropDown = 0;
      this.exceptionQueueData = [];
      this.exceptionData = [];
      
      this.formData.timeIn = "";
      this.formData.timeOut = "";
      this.formData.exceptionName = "";
      this.formData.exceptionId = 0;
      this.formData.exceptionTrigger = 0;
      this.formData.exceptionType = "";
      this.formData.lookUpType = "";
      this.formData.name = "";
      this.formData.lookUpItemId = 0;
      this.formData.startDate = "";
      this.formData.endDate = "";

      var date = new Date();
      this.formData.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.formData.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
    GetGrid(){
      var self = this;
      self.isVisible = false;
      self.showLoadingOnElement("submit", 1, "radius");

      var onSuccess = function (response) {
        self.isMounted = true;
        self.$refs.gridTable.currentx = 1;
        if(self.exceptionDropDown){
          self.exceptionQueueData = response.data.filter(x=> x.exceptionName == self.exceptionDropDown.label);
        }
        else{
          self.exceptionQueueData = response.data;
        }
        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
        self.isVisible = true;
      };
      self.$ajaxGet(
        self,
        `ExceptionQueue?&startDate=${self.dateFormat(
          self.formData.startDate)}
          &endDate=${self.dateFormat(self.formData.endDate)}`,
        onSuccess,
        onFinally
      );
    },
    successNotifyLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
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
    getExceptions(){
      var self = this;
      var onSuccess = function(response) {
        self.exceptionData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.exceptionDropDown = self.exceptionData.filter((item) => {return item.value == self.formData.exceptionId})[0];
        };      
      var onFinally = function(){
        
      };
      self.$ajaxGet(self,"ExceptionQueue/GetExceptionDropDown", onSuccess, onFinally);
      },
  },
};
</script>
<style lang="scss">

</style>