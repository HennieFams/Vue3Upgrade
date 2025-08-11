<template>
  <div>
    <vs-tabs v-model="activeTab" style="width: auto; min-height:500px">
      <vs-tab class="p-6" label="SAP Information" style="min-height:500px">
        <div class="vx-row">
          <div class="vx-col w-full mb-base ">
            <vx-card class="pb-3" title="SAP Information" refresh-content-action @refresh="closeCardAnimationDemo"
              collapse-action>
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>From date</label>
                  <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="formData.fromDate"
                    format="yyyy-MM-dd" name="From Date" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date')
                  }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>To date</label>
                  <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="formData.toDate"
                    format="yyyy-MM-dd" name="To Date" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>From Time</label>
                  <vue-timepicker class="w-full" id="FromTime" format="HH:mm:ss" v-model="formData.fromTime" manual-input placeholder="From Time" name="From Time"></vue-timepicker>
                  <!-- <datepicker class="w-full" id="FromTime" placeholder="From Time" v-model="formData.fromTime"
                    format="yyyy-MM-dd" name="From Time" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('From Time')">{{ errors.first('From Time')
                  }}</span> -->
                </div>
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>To Time</label>
                  <vue-timepicker class="w-full" id="ToTime" format="HH:mm:ss" v-model="formData.toTime" manual-input placeholder="To Time" name="To Time"></vue-timepicker>
                  <!-- <datepicker class="w-full" id="ToTime" placeholder="To Time" v-model="formData.toTime"
                    format="yyyy-MM-dd" name="To Time" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('To Time')">{{ errors.first('To Time') }}</span> -->
                </div>
              </div>
              <br>
              <!-- <div class="vx-col w-full mb-base">
              <v-select class="w-full" placeholder="Search / Select Account" :options="accountDropdown"
                @search:blur="populateStore" v-model="selectedAccount" name="Account" />
            </div> -->
              <div class="vx-col w-full mb-base">
                <v-select class="w-full" placeholder="Search / Select product" :options="productsDropdown"
                  v-model="selectedProduct" name="Product" />
              </div>
              <div class="vx-col w-full mb-base">
                <v-select class="w-full" placeholder="Search / Select store" :options="storeDropdown"
                  v-model="selectedStore" name="Store" />
              </div>
              <div class="vx-col w-full mb-base">
                <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary"
                  @click="GetGridSimple()">Submit</vs-button>
              </div>
            </vx-card>
            <div v-show="isVisible" id="QDPGrid" ref='sapgrid' class="vs-con-loading__container">
              <div id="SGrid"></div>
            </div>
          </div>
        </div>
        </vs-tab>
        <vs-tab label="Page 2" style="min-height:500px">
          <h1>The Force is strong in this one.</h1>
        </vs-tab>
      </vs-tabs>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import { GridPlugin, Grid, DetailRow, Aggregate, ExcelExport, PdfExport, Page, RowDD, Selection, Group, Toolbar, Search, Reorder, Sort, Filter } from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
import { DataManager, ODataAdaptor } from "@syncfusion/ej2-data";
import VueTimepicker from 'vuejs-timepicker';
// import { VueTimepicker } from "vue2-timepicker";
Vue.use(VueTimepicker)
Vue.use(GridPlugin);
Grid.Inject(Sort, Page, Toolbar, Aggregate, ExcelExport, PdfExport, DetailRow, Search);
export default {
  data() {
    return {
      aggregateColumn: [],
      aggregate: null,
      toolbar: ['TxtExport', 'PdfExport', 'ExcelExport', 'CsvExport', 'Print', 'Search'],
      pageSettings: { pageCount: 20 },
      grid: "",
      flag: true,
      SimpleDetailGrid: 0,
      queryString: "",
      pid: 0,
      columns: [],
      columnsSelecteds: [],
      activePrompt: false,
      activePromptSubGrid: false,
      fileName: "",
      formats: ["pdf", "xlsx", "csv", "txt"],
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      headerTitle: ["Allocation", "Description", "Group"],
      headerVal: ["allocation", "description", "allocationGroupName"],
      selectedStore: 0,
      selectedProduct: 0,
      selectedAccount: 0,
      storeDropdown: [],
      productsDropdown: [],
      accountDropdown: [],

      componentKey: 0,
      selected: [],
      famsDBDataChild: [],
      famsDBData: [],
      isMounted: false,
      isVisible: false,
      formData: {
        fromDate: '',
        toDate: '',
        store: '',
        fromTime: {
          HH: "00",
          mm: "00",
          ss: "00"
        },
        toTime: {
          HH: "23",
          mm: "59",
          ss: "59"
        },
      },
      selectionOptions: { mode: 'Row' },
      localColforGrid: [],
      localColforGridChild: [],
      DetialUsageReceiveFAMS: [],
      activeTab: 0,
      sapData: [
        {
          field: "sap",
          headerText: "SAP",
          textAlign: "Left",
          width: 150,
          visible: true,
          type: "string",
          disableHtmlEncode: false,
        },
      ],
    };
  },
  props: {

  },
  provide: {
    grid: [DetailRow, ExcelExport, PdfExport, Page, Group, Selection, Toolbar, Search, Reorder, Sort]
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VueTimepicker
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
    activeTab: function(val){
      var self = this;
      if(val == 0){
        setTimeout(function(){
          self.clearFields();
          self.isMounted = true;
          var date = new Date();
          self.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
          self.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          // this.GeStoresDropdown();
          self.GeStoresDropdown();
          self.GetProductsDropdown();
        }, 100);
      }
      else if(val == 1){
        setTimeout(function(){
          // self.isMounted = false;
        }, 100);
      }
    },
  },
  mounted() {
    this.clearFields();
    this.isMounted = true;
    var date = new Date();
    this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // this.GeStoresDropdown();
    this.GeStoresDropdown();
    this.GetProductsDropdown();
  },
  methods: {
    populateStore() {
      const self = this;
      self.selectedStore = 0;
      if (self.selectedAccount && self.selectedAccount.value) {
        var onSuccess = function (response) {
          self.storeDropdown = response.data.map((item) => {
            return { label: item.name, value: item.id };
          });
        };
        var onFinally = function () { };
        self.$ajaxGet(self, `Stores/GetStoredropdownForAccount/${self.selectedAccount.value}`, onSuccess, onFinally);
      }
    },
    populateData() {
      var self = this;
      self.flag = true
      var element = document.getElementById('SGrid');
      if (element) element.remove();

      var p = document.getElementById('SAPGrid');
      var newElement = document.createElement('Div');
      newElement.setAttribute('id', 'SGrid');
      p.appendChild(newElement);
    },
    expanded() {
      alert(this.isActive);
    },
    formatDate(pad, dateTime) {
      if (typeof dateTime === 'undefined')
        return pad;

      return (pad + dateTime).slice(-pad.length);
    },
    GeStoresDropdown() {
      const self = this;
      var accountid = parseInt(localStorage.getItem('userAccountId'));
      self.selectedStore = 0;
      if (accountid > 0) {
        var onSuccess = function (response) {
          self.storeDropdown = response.data.map((item) => {
            return { label: item.name, value: item.id };
          });
        };
        var onFinally = function () { };
        self.$ajaxGet(self, `Stores/GetStoredropdownForAccount/${accountid}`, onSuccess, onFinally);
      }
    },
    GetProductsDropdown() {
      const self = this;
      var accountid = parseInt(localStorage.getItem('userAccountId'));
      self.selectedProduct = 0;
      var firstArray = [{label: "All", value: 0}]
      if (accountid > 0) {
        var onSuccess = function (response) {
          self.productsDropdown = firstArray.concat(response.data.map((item) => {
            return { label: item.name, value: item.id };
          }));
        };
        var onFinally = function () { };
        self.$ajaxGet(self, `Products/GetProductDropDownAll`, onSuccess, onFinally);
      }
    },
    GetAccountsDropdown() {
      const self = this;
      var ls = localStorage.getItem('userAccountId');
      var onSuccess = function (response) {
        self.accountDropdown = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () { };
      self.$ajaxGet(self, "Accounts/GetAccountdropdown", onSuccess, onFinally);
    },
    dateFormat(date) {
      var month = '';
      var year = '';
      var day = '';

      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [year, month, day].join('-');
    },

    forceRerender() {
      this.componentKey += 1;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }));
    },
    clearFields() {
      this.filename = "",
        this.cellAutoWidth = true,
        this.selectedFormat = "csv"
    },
    closeCardAnimationDemo(card) {
      this.clearFields();
      card.removeRefreshAnimation(3000);
    },
    pdfExportComplete(args) {
      this.grid.hideSpinner();
    },
    excelExportComplete(args) {
      this.grid.hideSpinner();
    },

    async toolbarClick(args) {
      switch (args['item'].text) {
        case 'TxtExport':
          this.exportToTxt(args);
          break;
        case 'PDF Export':
          await this.grid.pdfExport({ fileName: "Export.pdf", dataSource: this.famsDBData, pageOrientation: "Landscape" });
          break;
        case 'Excel Export':
          this.grid.excelExport({ fileName: "new.xlsx" });
          break;
        case 'CSV Export':
          this.grid.csvExport({ fileName: "new.csv" });
          break;
      }
    },
    sumTemplate: function () {
      return {
        template: Vue.component('sumTemplate', {
          template: `<span>Sum: {{ self.famsDBData.volume }}</span>`,
          data() { return { data: {} }; }
        })
      }
    },
    GetGridSimple() {
      const self = this;

      var toTime = `${self.formData.toTime.HH}:${self.formData.toTime.mm}:${self.formData.toTime.ss}`;
      var fromTime = `${self.formData.fromTime.HH}:${self.formData.fromTime.mm}:${self.formData.fromTime.ss}`;
      
      // self.famsDBData = [];
      // self.isVisible = false;
      let url = 'Diagnostic/'
      if (self.selectedStore && self.selectedStore.value) {
        let accountid = localStorage.getItem('userAccountId');
        let storeID = self.selectedStore ? self.selectedStore.value : 0;
        url = url + `ProcessSAPPMCFormat2?accountid=${accountid}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}&storeID=${storeID}`
        var obj = {
          accountid: localStorage.getItem('userAccountId'),
          fromdate: self.dateFormat(self.formData.fromDate),
          todate: self.dateFormat(self.formData.toDate),
          storeID: self.selectedStore ? self.selectedStore.value : 0,
        }
      }
      else {
        let accountid = localStorage.getItem('userAccountId');
        // let storeID = self.selectedStore ? self.selectedStore.value : 0;
        let productID = self.selectedProduct ? self.selectedProduct.value : 0;
        if(productID == 0){
          url = url + `ProcessSAPPMCFormat22?accountid=${accountid}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}&fromtime=${fromTime}&totime=${toTime}`
        }
        else{
          url = url + `ProcessSAPPMCFormat22?accountid=${accountid}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}&fromtime=${fromTime}&totime=${toTime}&productid=${productID}`
        }
        // url = url + 'ProcessSAPPMCFormat22';
      }

      self.clearFields();

      self.showLoadingOnElement("submit", 0.45, "radius");
      var onSuccess = function (response) {
        
        if (response.data && response.data.length > 0) {
          self.famsDBData = [];
          self.isVisible = false;
          self.famsDBData = response.data;
          self.aggregateColumn = [{
            columns: [
              {
                type: 'Sum',
                field: 'volume',
                textAlign: "Left",
                footerTemplate: 'Total Volume: ${Sum}'
              }
            ]
          },
          ];

          if (self.flag) {
            self.grid = new Grid({
              excelExportComplete: 'excelExportComplete',
              allowSorting: true,
              allowPaging: true,
              allowExcelExport: true,
              allowPdfExport: true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick: self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.sapData,
              height: 500,
              PageSettings: 20,
              aggregates: self.aggregateColumn

            });
            self.flag = false;
            self.grid.appendTo("#SGrid");
            self.grid.refresh()
          }
          else self.grid.dataSource = self.famsDBData;

          self.isVisible = true;
        }
        else {
          // self.isVisible = false;
        }
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
      };
      self.$ajaxGet(
        self,
        url,
        onSuccess,
        onFinally
      );
    },
    successNotifyGridExpanded() {
      this.$vs.notify({
        title: 'Grid - Successfully',
        text: 'Grid expanded / closed',
        color: 'warning'
      })
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Information successfully loaded',
        color: 'success'
      })
    },
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
    exportToTxt(args) {
      // Get the grid data
      const gridData = this.grid.getCurrentViewRecords();

      // Convert the data to a text format
      const txtData = this.convertToTxt(gridData);

      // Create a Blob from the text data
      const blob = new Blob([txtData], { type: 'text/plain' });

      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'SAPData.txt';

      // Trigger a click on the link to initiate the download
      link.click();
    },
    convertToTxt(data) {
      // Implement your logic to convert the data to a text format
      return data.map(value => value.sap).join('\n');
    },
  }
}

</script>

<style lang="scss">
#dispensing-card {
  .vx-card__collapsible-content {
    .vx-card__body {
      height: 100vh;
    }
  }
}
</style>
<style>
@import "material.css";
</style>

