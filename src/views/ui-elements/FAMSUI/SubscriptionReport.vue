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
  <div class="vx-row">
    <vs-tabs v-model="activeTab" ref="subscriptionReport" class="vs-con-loading__container"
      style="width: auto min-height:auto">
      <vs-tab label="Expired Monthly Subscription" style="min-height: 500px">
        <div class="vx-col w-full mb-base ">
          <vx-card class="pb-3" title="Expired Monthly Subscriptions" refresh-content-action
            @refresh="closeCardAnimationDemo" collapse-action>
            <!-- <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>From date</label>
                <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="formData.fromDate"
                  format="yyyy-MM-dd" name="From Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>To date</label>
                <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="formData.toDate" format="yyyy-MM-dd"
                  name="To Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
              </div>
            </div> -->
            <!-- <br>
            <div class="vx-col w-full mb-base">
              <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container"
                @click="GetMonthlyGrid">Submit</vs-button>
            </div> -->
          </vx-card>
          <div id="EMGrid">
            <div id="MonthlyGrid" ref='emgrid'></div>
          </div>
        </div>
      </vs-tab>
      <vs-tab label="Expired Yearly Subscription" style="min-height: 500px">
        <div class="vx-col w-full mb-base ">
          <vx-card class="pb-3" title="Expired Yearly Subscriptions" refresh-content-action
            @refresh="closeCardAnimationDemo" collapse-action>
            <!-- <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>From date</label>
                <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="formData.fromDate"
                  format="yyyy-MM-dd" name="From Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>To date</label>
                <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="formData.toDate" format="yyyy-MM-dd"
                  name="To Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
              </div>
            </div> -->
            <!-- <br>
            <div class="vx-col w-full mb-base">
              <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container"
                @click="GetMonthlyGrid">Submit</vs-button>
            </div> -->
          </vx-card>
          <div id="EYGrid">
            <div id="YearlyGrid" ref='eygrid'></div>
          </div>
        </div>
      </vs-tab>
      <vs-tab label="Expired Subscription" style="min-height: 500px">
        <div class="vx-col w-full mb-base ">
          <vx-card class="pb-3" title="Expired Subscriptions" refresh-content-action @refresh="closeCardAnimationDemo"
            collapse-action>
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>From date</label>
                <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="formData.fromDate"
                  format="yyyy-MM-dd" name="From Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>To date</label>
                <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="formData.toDate" format="yyyy-MM-dd"
                  name="To Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
              </div>
            </div>
            <br>
            <div class="vx-col w-full mb-base">
              <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container"
                @click="GetGrid">Submit</vs-button>
            </div>
          </vx-card>
          <div id="EGrid">
            <div id="ExpiredGrid" ref='egrid'></div>
          </div>
        </div>
      </vs-tab>
      <vs-tab label="Expiring Subscription" style="min-height: 500px">
        <div class="vx-col w-full mb-base ">
          <vx-card class="pb-3" title="Expiring Subscriptions" refresh-content-action @refresh="closeCardAnimationDemo"
            collapse-action>
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>From date</label>
                <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="formData.fromDate"
                  format="yyyy-MM-dd" name="From Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>To date</label>
                <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="formData.toDate" format="yyyy-MM-dd"
                  name="To Date" v-validate="'required'"></datepicker>
                <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
              </div>
            </div>
            <br>
            <div class="vx-col w-full mb-base">
              <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container"
                @click="GetExportGrid">Submit</vs-button>
            </div>
          </vx-card>
          <div id="E2Grid">
            <div id="ExportGrid" ref='e2grid'></div>
          </div>
        </div>
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

import { GridPlugin, Grid, PdfExport, ExcelExport, Page, RowDD, Selection, Group, Toolbar, Search, Sort, Filter } from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
Vue.use(GridPlugin);
Grid.Inject(Sort, Search, Page, Toolbar, PdfExport, ExcelExport);
export default {
  data() {
    return {
      tank: [],
      famsURL: '',
      _famsURL: '',
      DropdownData: [],
      toolbarOptions: ['PdfExport', 'ExcelExport', 'CsvExport'],
      //pageSettings: { pageCount: 10 },
      pageSettings: 20,
      activeTab: 0,
      grid: "",
      flag: true,
      isTankHidden: false,
      pid: 0,
      columns: [],
      columnsSelecteds: [],
      activePrompt: false,
      activePromptSubGrid: false,
      fileName: "",
      formats: ["xlsx", "csv", "txt"],
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      headerTitle: ["Allocation", "Description", "Group"],
      headerVal: ["allocation", "description", "allocationGroupName"],
      report: "",

      itemsPerPage: 10,
      componentKey: 0,
      selected: [],
      famsDBData: [],
      famsHeaders: [],
      famsDBDataSelected: [],
      sidebarData: {},
      isMounted: false,
      isVisible: false,
      formData: {
        fromDate: '',
        toDate: '',
      },
      selectionOptions: { mode: 'Row' },

      localColforGrid: [],
      aggregateColumn: [],
      monthlyExpiredSubs: [{
        field: "account",
        headerText: "Account",
        textAlign: "Right",
        width: 120,
        type: "string"
      },
      {
        field: "storeName",
        headerText: "Store Name",
        textAlign: "Left",
        width: 180,
        type: "string"
      },
      {
        field: "macaddress",
        headerText: "Macaddress",
        textAlign: "Left",
        width: 180,
        type: "string"
      },
      {
        field: "famsEqp",
        headerText: "FAMS Eqp",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionName",
        headerText: "Subscription Name",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionType",
        headerText: "Subscription Type",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionInterval",
        headerText: "Subscription Interval",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionRenewedDate",
        headerText: "Subscription Renewed Date",
        textAlign: "Left",
        width: 200,
        type: "string"
      },
      {
        field: "subscriptionDays",
        headerText: "Subscription Days",
        textAlign: "Left",
        width: 100,
        type: "number"
      },
      {
        field: "subscriptionIntervalDays",
        headerText: "Subscription Interval Days",
        textAlign: "Left",
        width: 100,
        type: "number"
      },
      {
        field: "unitPrice",
        headerText: "Unit Price",
        textAlign: "Left",
        width: 100,
        type: "number"
      },
      {
        field: "price",
        headerText: "Price(Monthly)",
        textAlign: "Left",
        width: 100,
        type: "number"
      }
      ],
      yearlyExpiredSubs: [{
        field: "account",
        headerText: "Account",
        textAlign: "Right",
        width: 120,
        type: "string"
      },
      {
        field: "storeName",
        headerText: "Store Name",
        textAlign: "Left",
        width: 180,
        type: "string"
      },
      {
        field: "macaddress",
        headerText: "Macaddress",
        textAlign: "Left",
        width: 180,
        type: "string"
      },
      {
        field: "famsEqp",
        headerText: "FAMS Eqp",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionName",
        headerText: "Subscription Name",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionType",
        headerText: "Subscription Type",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionInterval",
        headerText: "Subscription Interval",
        textAlign: "Left",
        width: 100,
        type: "string"
      },
      {
        field: "subscriptionRenewedDate",
        headerText: "Subscription Renewed Date",
        textAlign: "Left",
        width: 200,
        type: "string"
      },
      {
        field: "subscriptionDays",
        headerText: "Subscription Days",
        textAlign: "Left",
        width: 100,
        type: "number"
      },
      {
        field: "subscriptionIntervalDays",
        headerText: "Subscription Interval Days",
        textAlign: "Left",
        width: 100,
        type: "number"
      },
      {
        field: "unitPrice",
        headerText: "Unit Price",
        textAlign: "Left",
        width: 100,
        type: "number"
      },
      {
        field: "price",
        headerText: "Price(Yearly)",
        textAlign: "Left",
        width: 100,
        type: "number"
      }
      ],
      expiredSubs: [{
        field: "account",
        headerText: "Account",
        textAlign: "Right",
        width: 120,
        type: "string"
      },
      {
        field: "storeName",
        headerText: "Store Name",
        textAlign: "Left",
        width: 120,
        type: "string"
      },
      {
        field: "macaddress",
        headerText: "Macaddress",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "famsEqp",
        headerText: "FAMS Eqp",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "subscriptionName",
        headerText: "Subscription Name",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "subscriptionType",
        headerText: "Subscription Type",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "subscriptionInterval",
        headerText: "Subscription Interval",
        textAlign: "Left",
        width: 120,
        type: "string"
      },
      {
        field: "subscriptionRenewedDate",
        headerText: "Subscription Renewed Date",
        textAlign: "Left",
        width: 200,
        type: "string"
      },
      {
        field: "subscriptionDays",
        headerText: "Subscription Days",
        textAlign: "Left",
        width: 150,
        type: "number"
      },
      {
        field: "subscriptionIntervalDays",
        headerText: "Subscription Interval Days",
        textAlign: "Left",
        width: 150,
        type: "number"
      },
      {
        field: "unitPrice",
        headerText: "Unit Price",
        textAlign: "Left",
        width: 100,
        type: "number"
      },
      {
        field: "price",
        headerText: "Price",
        textAlign: "Left",
        width: 100,
        type: "number"
      }
      ],
      expiringSubs: [{
        field: "account",
        headerText: "Account",
        textAlign: "Right",
        width: 150,
        type: "string"
      },
      {
        field: "storeName",
        headerText: "Store Name",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "macaddress",
        headerText: "Macaddress",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "hardwareType",
        headerText: "Hardware Type",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "subscriptionName",
        headerText: "Subscription Name",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "subscriptionType",
        headerText: "Subscription Type",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "subscriptionCreateDate",
        headerText: "Subscription Create Date",
        textAlign: "Left",
        width: 200,
        type: "string"
      },
      {
        field: "subscriptionExpiredDate",
        headerText: "Subscription Expire Date",
        textAlign: "Left",
        width: 200,
        type: "string"
      },
      {
        field: "subscriptionInterval",
        headerText: "Subscription Interval",
        textAlign: "Left",
        width: 150,
        type: "string"
      },
      {
        field: "price",
        headerText: "Price",
        textAlign: "Left",
        width: 100,
        type: "number"
      }
      ],
    };
  },
  props: {

  },
  provide: {
    grid: [PdfExport, ExcelExport, Page, Group, Selection, Toolbar, Search, Sort]
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker
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
    activeTab: function (val) {
      var self = this;
      
      if (val == 0) {
        self.flag = true;
        self.GetMonthlyGrid();
      } else if (val == 1) {
        self.flag = true;
        self.GetYearlyGrid();
      } else if (val == 2) {
        setTimeout(function () {
          self.flag = true;
          var date = new Date();
          self.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
          self.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }, 100);
      } else if (val == 3) {
        setTimeout(function () {
          self.flag = true;
          var date = new Date();
          self.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
          self.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }, 100);
      }
    },
  },
  mounted() {
    this.GetMonthlyGrid();
    this.isMounted = true;
  },
  methods: {
    expanded() {
      alert(this.isActive);
    },
    formatDate(parsedDate) {
      const year = parsedDate.getFullYear();
      const month = ("0" + (parsedDate.getMonth() + 1)).slice(-2);
      const day = ("0" + parsedDate.getDate()).slice(-2);

      // Return the formatted date string
      return `${year}-${month}-${day}`;
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
      }))
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
    rowSelected(args) {

      //let selectedrowindex = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
      // alert(selectedrowindex); // To alert the selected row indexes.
      let selectedrecords = this.grid.getSelectedRecords();  // Get the selected records.
      // alert(JSON.stringify(selectedrecords[0]))  
      //alert(selectedrecords[0].pid + ',' + selectedrecords[0].product + ',' + selectedrecords[0].volume);
    },

    toolbarClick(args) {
      switch (args['item'].text) {
        case 'PDF Export':
          //this.grid.showSpinner();
          this.grid.pdfExport({ fileName: "new.pdf" });
          break;
        case 'Excel Export':
          //this.grid.showSpinner();
          this.grid.excelExport({ fileName: "new.xlsx" });
          break;
        case 'CSV Export':
          //this.grid.showSpinner();
          this.grid.csvExport({ fileName: "new.csv" });
          break;
      }
    },
    GetGrid() {
      const self = this;
      self.isVisible = false;
      var myobject = {};
      // myobject.ClientKey = localStorage.getItem('userKey')
      // myobject.AccountKey = localStorage.getItem('userAccountKey')
      myobject.fromDate = self.formatDate(self.formData.fromDate);
      myobject.toDate = self.formatDate(self.formData.toDate);
      // myobject.id = 0;
      self.clearFields();

      self.showLoadingOnElement("subscriptionReport", 0.45, "radius");
      
      var onSuccess = function (response) {
        self.famsDBData = response.data;
        self.localColforGrid = self.expiredSubs;
        self.aggregateColumn = [{
          columns: [
            {
              type: 'Sum',
              field: '1',
              textAlign: "Left",
              footerTemplate: 'Total Volume: ${Sum}'
            }
          ]
        },
        ];

        if (self.flag) {
          //Grid.Inject(Page);
          self.grid = new Grid({
            excelExportComplete: 'excelExportComplete',
            pdfExportComplete: 'pdfExportComplete',
            allowPaging: true,
            allowSorting: true,
            allowExcelExport: true,
            allowPdfExport: true,
            selectionSettings: self.selectionOptions,
            pageSettings: self.pageSettings,
            rowSelected: self.rowSelected,
            scrollSettings: { width: 886, height: 300 },
            // formatSettings: [{ name: 'date', format: 'yyyy-MM-dd HH:mm:ss', type: 'date' }],
            toolbar: ['ExcelExport', 'CsvExport', 'Print', 'Search'],
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
            // aggregates: self.aggregateColumn,

          });
          self.flag = false;
          self.grid.appendTo("#EGrid");
          self.grid.refresh()
          //this.grid.dataSource = this.famsDBData;
        }
        else self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.subscriptionReport.$el);
        self.isVisible = true;
      };

      self.$ajaxPost(
        self,
        'Subscription/GetSubscriptionReportExpired',
        myobject,
        onSuccess,
        onFinally
      );
    },
    GetExportGrid() {
      const self = this;
      self.isVisible = false;
      var myobject = {};
      // myobject.ClientKey = localStorage.getItem('userKey')
      // myobject.AccountKey = localStorage.getItem('userAccountKey')
      myobject.fromDate = self.formatDate(self.formData.fromDate);
      myobject.toDate = self.formatDate(self.formData.toDate);
      // myobject.id = 0;
      self.clearFields();

      self.showLoadingOnElement("subscriptionReport", 0.45, "radius");
      
      var onSuccess = function (response) {
        self.famsDBData = response.data;
        self.localColforGrid = self.expiringSubs;
        self.aggregateColumn = [{
          columns: [
            {
              type: 'Sum',
              field: '1',
              textAlign: "Left",
              footerTemplate: 'Total Volume: ${Sum}'
            }
          ]
        },
        ];

        if (self.flag) {
          //Grid.Inject(Page);
          self.grid = new Grid({
            excelExportComplete: 'excelExportComplete',
            pdfExportComplete: 'pdfExportComplete',
            allowPaging: true,
            allowSorting: true,
            allowExcelExport: true,
            allowPdfExport: true,
            selectionSettings: self.selectionOptions,
            pageSettings: self.pageSettings,
            rowSelected: self.rowSelected,
            scrollSettings: { width: 886, height: 300 },
            // formatSettings: [{ name: 'date', format: 'yyyy-MM-dd HH:mm:ss', type: 'date' }],
            toolbar: ['ExcelExport', 'CsvExport', 'Print', 'Search'],
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
            // aggregates: self.aggregateColumn,

          });
          self.flag = false;
          self.grid.appendTo("#E2Grid");
          self.grid.refresh()
          //this.grid.dataSource = this.famsDBData;
        }
        else self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.subscriptionReport.$el);
        self.isVisible = true;
      };

      self.$ajaxPost(
        self,
        'Subscription/GetSubscriptionReportExpiring',
        myobject,
        onSuccess,
        onFinally
      );
    },
    GetMonthlyGrid() {
      const self = this;
      self.isVisible = false;
      var myobject = {};
      // myobject.ClientKey = localStorage.getItem('userKey')
      // myobject.AccountKey = localStorage.getItem('userAccountKey')
      // myobject.fromDate = self.formatDate(self.formData.fromDate);
      // myobject.toDate = self.formatDate(self.formData.toDate);
      // myobject.id = 0;
      self.clearFields();

      self.showLoadingOnElement("subscriptionReport", 0.45, "radius");
      var onSuccess = function (response) {
        self.famsDBData = response.data;
        self.localColforGrid = self.monthlyExpiredSubs;
        self.aggregateColumn = [{
          columns: [
            {
              type: 'Sum',
              field: '1',
              textAlign: "Left",
              footerTemplate: 'Total Volume: ${Sum}'
            }
          ]
        },
        ];
        
        if (self.flag) {
          //Grid.Inject(Page);
          self.grid = new Grid({
            excelExportComplete: 'excelExportComplete',
            pdfExportComplete: 'pdfExportComplete',
            allowPaging: true,
            allowSorting: true,
            allowExcelExport: true,
            allowPdfExport: true,
            selectionSettings: self.selectionOptions,
            pageSettings: self.pageSettings,
            rowSelected: self.rowSelected,
            scrollSettings: { width: 886, height: 300 },
            // formatSettings: [{ name: 'date', format: 'yyyy-MM-dd HH:mm:ss', type: 'date' }],
            toolbar: ['ExcelExport', 'CsvExport', 'Print', 'Search'],
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
            // aggregates: self.aggregateColumn,
            
          });

          self.flag = false;
          self.grid.appendTo("#EMGrid");
          self.grid.refresh()
          //this.grid.dataSource = this.famsDBData;
        }
        else self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.subscriptionReport.$el);
        self.isVisible = true;
      };

      self.$ajaxGet(
        self,
        'Subscription/GetSubscriptionReportMonthly',
        onSuccess,
        onFinally
      );
    },
    GetYearlyGrid() {
      const self = this;
      self.isVisible = false;
      // var myobject = {};
      // myobject.ClientKey = localStorage.getItem('userKey')
      // myobject.AccountKey = localStorage.getItem('userAccountKey')
      // myobject.fromDate = self.formatDate(self.formData.fromDate);
      // myobject.toDate = self.formatDate(self.formData.toDate);
      // myobject.id = 0;
      self.clearFields();

      // self.showLoadingOnElement("subscriptionReport", 0.45, "radius");
      var onSuccess = function (response) {
        self.famsDBData = response.data;
        self.localColforGrid = self.yearlyExpiredSubs;
        self.aggregateColumn = [{
          columns: [
            {
              type: 'Sum',
              field: '1',
              textAlign: "Left",
              footerTemplate: 'Total Volume: ${Sum}'
            }
          ]
        },
        ];

        if (self.flag) {
          //Grid.Inject(Page);
          self.grid = new Grid({
            excelExportComplete: 'excelExportComplete',
            pdfExportComplete: 'pdfExportComplete',
            allowPaging: true,
            allowSorting: true,
            allowExcelExport: true,
            allowPdfExport: true,
            selectionSettings: self.selectionOptions,
            pageSettings: self.pageSettings,
            rowSelected: self.rowSelected,
            scrollSettings: { width: 886, height: 300 },
            // formatSettings: [{ name: 'date', format: 'yyyy-MM-dd HH:mm:ss', type: 'date' }],
            toolbar: ['ExcelExport', 'CsvExport', 'Print', 'Search'],
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
            // aggregates: self.aggregateColumn,

          });
          self.flag = false;
          self.grid.appendTo("#EYGrid");
          self.grid.refresh()
          //this.grid.dataSource = this.famsDBData;
        }
        else self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.subscriptionReport.$el);
        self.isVisible = true;
      };

      self.$ajaxGet(
        self,
        'Subscription/GetSubscriptionReportYearly',
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

/* @import './ejStyles/material.css'; */
//@import "https://cdn.syncfusion.com/ej2/material.css";
</style>
<style>
/* @import './ejStyles/material.css'; */
@import "material.css";
</style>

