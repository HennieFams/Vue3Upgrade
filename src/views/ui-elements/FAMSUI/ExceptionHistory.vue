<template>
  <div>
    <h3 class="p-3"> Exception History </h3>
    <vs-tabs style="width: auto min-height:500px">
      <vs-tab label="Exception Per Month" style="min-height:500px">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
                <div>
                    <datepicker
                      class="w-full"
                      id="FromDate"
                      placeholder="From Date"
                      v-model="formData.startDate"
                      format="yyyy-MM-dd"
                      name ="From Date" v-validate="'required'"
                    ></datepicker>
                </div>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>To date</label>
            <div>
                 <datepicker
                    class="w-full"
                    id="ToDate"
                    placeholder="To Date"
                    v-model="formData.endDate"
                    format="yyyy-MM-dd"
                    name ="To Date" v-validate="'required'"
              ></datepicker>
            </div>       
          </div> 
        </div>
        <br>

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
              <vs-th sort-key="exception">Exception</vs-th>
              <vs-th sort-key="emailSend">Date Processed</vs-th>
              <vs-th sort-key="email">Recipient email</vs-th>
              <vs-th sort-key="message">Message</vs-th>
              <vs-th sort-key="serviceProvider">service Provider Message</vs-th>
            
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.exception">{{ tr.exception 	}}</vs-td>
                <vs-td :data="tr.emailSend">{{ tr.emailSend.replace("T"," ") 	}}</vs-td>
                <vs-td :data="tr.email">{{ tr.email }}</vs-td>
                <vs-td :data="tr.message">{{ tr.message }}</vs-td>
                <vs-td :data="tr.serviceProvider">{{ tr.serviceProvider }}</vs-td>
            
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
      itemsPerPage: 10,
      isMounted: false,
      exceptionData: [],
      
      formData:{
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
    var date = new Date();
    this.formData.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
    initValues(){

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
    cleanString(string) {
      return string.replace(/[\s\/]/g, '')
    },
    GetGrid(){
      var self = this;
      self.isVisible = false;
      self.showLoadingOnElement("submit", 1, "radius");
      
      var tempstartDate = self.cleanString(self.dateFormat(self.formData.startDate));
      var tempendDate   = self.cleanString(self.dateFormat(self.formData.endDate));
      
      var onSuccess = function (response) {
        self.isMounted = true;
        self.$refs.gridTable.currentx = 1;
        self.exceptionQueueData = response.data;
        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
        self.isVisible = true;
      };
      self.$ajaxGet(
        self,
        `ExceptionQueue/GetExceptionHistory?&fromdate=${tempstartDate}
          &toDate=${tempendDate}`,
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

  },
};
</script>
<style lang="scss">

</style>