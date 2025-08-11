<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base ">
      <vx-card class="pb-3" title="FAMS Quick Dispensing View" refresh-content-action @refresh="closeCardAnimationDemo"
        collapse-action>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
            <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="formData.fromDate"
              format="yyyy-MM-dd" name="From Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('From Date')">{{  errors.first('From Date')  }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>To date</label>
            <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="formData.toDate" format="yyyy-MM-dd"
              name="To Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{  errors.first('To Date')  }}</span>
          </div>
        </div>
        <br>
        <div class="vx-col w-full mb-base">
          <v-select class="w-full" placeholder="Search / Select report" :options="reportDropdown" v-model="report"
            @search:blur="populateData" name="Report" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('Report')">{{  errors.first('Report')  }}</span>
        </div>
        <div class="vx-col w-full mb-base">
          <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary"
            @click="loadFamsInformation">Submit</vs-button>
        </div>
      </vx-card>
      <div id="QDPGrid" ref='fgrid' class="vs-con-loading__container">
        <div id="Grid"></div>
      </div>
    </div>
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
import { GridPlugin, Grid, DetailRow, Aggregate, ExcelExport, Page, RowDD, Selection, Group, Toolbar, Search, Reorder, Sort, Filter, Scroll } from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
import { DataManager, ODataAdaptor } from "@syncfusion/ej2-data";
Vue.use(GridPlugin);
Grid.Inject(Sort, Page, Toolbar, Aggregate, ExcelExport, DetailRow, Search, Scroll);
export default {
  data() {
    return {
      aggregateColumn: [],
      aggregate: null,
      toolbar: ['ExcelExport', 'CsvExport', 'Print', 'Search'],
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
      formats: ["xlsx", "csv", "txt"],
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      headerTitle: ["Allocation", "Description", "Group"],
      headerVal: ["allocation", "description", "allocationGroupName"],
      report: [],
      reportDropdown: [
        { value: 1, label: 'F24 Validation' },
        { value: 2, label: 'F24 Complete Fuel Transaction' },
        { value: 3, label: 'F24 Complete Fuel Transaction Holstic' }//,
        // { value: 4, label: 'Usage per Equipment' },
        // { value: 5, label: 'Elig / Non Elig Equipment' },
        // { value: 6, label: 'Usage per Allocations' },
        // { value: 7, label: 'Elig / Non Elig Allocations' },
        // { value: 8, label: 'Usage per Master Equipment' },
        // { value: 9, label: 'Usage per CostCentres' },
        // { value: 9, label: 'Usage per Driver' },
        // { value: 9, label: 'Usage per Fuel Attendant' },
        // { value: 10, label: 'Fuel Transfers' },
        // { value: 11, label: 'KPI' },
        // { value: 16, label: 'SARS/Logbook' },
        // { value: 12, label: 'Stock Received (FAMS)' },
        // { value: 13, label: 'Stock Received (MANUAL)' },
        // { value: 15, label: 'Usage - Manual Added' }
      ],

      componentKey: 0,
      selected: [],
      famsDBDataChild: [],
      famsDBData: [],
      isMounted: false,
      isVisible: false,
      formData: {
        fromDate: '',
        toDate: '',
        report: ''
      },
      selectionOptions: { mode: 'Row' },
      localColforGrid: [],
      localColforGridChild: [],
      DetialUsageReceiveFAMS: [],
      f24VerificationGrid: [
        {
          field: "createDate",
          headerText: "Create Date",
          textAlign: "Left",
          width: 180,
          format: 'yyyy-MM-dd HH:mm:ss',
          type: "date"
        },
        {
          field: "famsCode",
          headerText: "Registration",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "driver",
          headerText: "Driver",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "token",
          headerText: "Token",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "liters",
          headerText: "Liters",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "feedback",
          headerText: "Feedback",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "jsonRecord",
          headerText: "Json Record",
          textAlign: "Left",
          width: 1300,
          type: "string"
        },
      ],
      f24FuelComplete: [
        {
          field: "createDate",
          headerText: "Create Date",
          textAlign: "Left",
          width: 180,
          format: 'yyyy-MM-dd HH:mm:ss',
          type: "date"
        },
        {
          field: "famsCode",
          headerText: "Registration",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "token",
          headerText: "Token",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "litrStr",
          headerText: "Liters Str",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "litrEnd",
          headerText: "Liters End",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "literBalance",
          headerText: "Liters",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "transactionID",
          headerText: "Transaction Id",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "jsonRecord",
          headerText: "Json Record",
          textAlign: "Left",
          width: 1300,
          type: "string"
        },
      ],
      f24FuelCompleteHolstic: [
      {
          field: "vDate",
          headerText: "VDate",
          textAlign: "Left",
          width: 180,
          format: 'yyyy-MM-dd HH:mm:ss',
          type: "date"
        },
        {
          field: "registration",
          headerText: "Registration",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "token",
          headerText: "Token",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "driver",
          headerText: "Driver",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "liters",
          headerText: "Liters",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "vJsonRecord",
          headerText: "VJson Record (Json feedback from the Validation Process)",
          textAlign: "Left",
          width: 1300,
          type: "string"
        },
        {
          field: "transactionID",
          headerText: "Transaction Id",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "litrStr",
          headerText: "Liters Str",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "litrEnd",
          headerText: "Liters End",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "literBalance",
          headerText: "Liters",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "cJsonRecord",
          headerText: "CJson Record",
          textAlign: "Left",
          width: 1300,
          type: "string"
        },
      ],
    };
  },
  props: {

  },
  provide: {
    grid: [DetailRow, ExcelExport, Page, Group, Selection, Toolbar, Search, Reorder, Sort, Scroll]
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
  mounted() {
    this.clearFields();
    this.isMounted = true;
    var date = new Date();
    this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
    populateData() {
      var self = this;
      self.flag = true
      var element = document.getElementById('Grid');
      if (element) element.remove();

      var p = document.getElementById('QDPGrid');
      var newElement = document.createElement('Div');
      newElement.setAttribute('id', 'Grid');
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
    loadFamsInformation() {
      const self = this;
      const empty = {};
      let famsURL = '';
      if (!self.report || self.report.length == 0) {
        self.$vs.notify({
          title: "Attention",
          color: "warning",
          text: `Please select a report`,
          position: "top-right",
          iconPack: "feather",
          icon: "icon-x"
        });
      } else {
        let details = `&clientKey=${localStorage.getItem('userKey')}&accountkey=${localStorage.getItem('userAccountKey')}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`

        if (self.report.value == 1) {
          self.localColforGrid = self.f24VerificationGrid;
          famsURL = `Get_F24Validation?${details}`;
        }
        else if (self.report.value == 2) {
          self.localColforGrid = self.f24FuelComplete;
          famsURL = `Get_F24CompleteFuelTransaction?${details}`;
        }
        else if (self.report.value == 3) {
          self.localColforGrid = self.f24FuelCompleteHolstic;
          famsURL = `Get_F24CompleteFuelTransactionHolstic?${details}`;
        }

        self.GetGridSimple(famsURL)

      }
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

    toolbarClick(args) {
      switch (args['item'].text) {
        case 'PDF Export':
          this.grid.pdfExport({ fileName: "new.pdf" });
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
    GetGridSimple(famsURL) {
      const self = this;
      self.isVisible = false;
      self.clearFields();

      self.showLoadingOnElement("submit", 0.45, "radius");
      var onSuccess = function (response) {
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
            scrollSettings: { width: 886, height: 500 },
            toolbar: self.toolbar,
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
            height: 500,
            PageSettings: 20,
            aggregates: self.aggregateColumn,

          });
          self.flag = false;
          self.grid.appendTo("#Grid");
          self.grid.refresh()
        }
        else self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
      };
      self.$ajaxGet(
        self,
        'QuickViewDispensing/' + famsURL,
        onSuccess,
        onFinally
      );
    },

    onDetailDataBound(args) {
      const self = this;
      let _Id1 = 0;
      let _Id2 = 0;
      let famsURL = '';
      self.showLoadingOnElement("fgrid", 0.45, "radius");
      if (self.report.label == 'Usage per Product') {
        _Id1 = args.data.pid
        famsURL = `Get_OverviewDetail?clientKey=${localStorage.getItem('userKey')}
        &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}
        &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Usage per Store') {
        _Id1 = args.data.pid
        _Id2 = args.data.sid
        famsURL = `Get_UsagePerStoreDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Usage per Equipment') {
        _Id1 = args.data.pid
        _Id2 = args.data.eid
        famsURL = `Get_UsagePerEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Usage per Allocations') {
        _Id1 = args.data.pid
        _Id2 = 0
        famsURL = `Get_UsagePerAllocationDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Usage per Master Equipment') {
        _Id1 = args.data.pid
        _Id2 = args.data.mid
        famsURL = `Get_UsagePerMasterEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Usage per CostCentres') {
        _Id1 = args.data.pid
        _Id2 = args.data.cid
        famsURL = `Get_UsagePerCostCentreDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Fuel Transfers') {
        _Id1 = args.data.pid
        _Id2 = args.data.eid
        famsURL = `Get_TransfersPerEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Stock Received (FAMS)') {
        _Id1 = args.data.pid
        _Id2 = args.data.eid
        famsURL = `Get_RecievingPerEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Elig / Non Elig Equipment') {
        _Id1 = args.data.eneid
        _Id2 = args.data.pid
        famsURL = `Get_EligibleNonEligibleEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Elig / Non Elig Allocations') {
        _Id1 = args.data.arbid
        _Id2 = args.data.pid
        famsURL = `Get_EligibleNonEligibleAllocationDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Usage per Driver') {
        _Id1 = args.data.did
        _Id2 = args.data.pid
        famsURL = `Get_UsagePerDriverDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }
      else if (self.report.label == 'Usage per Fuel Attendant') {
        _Id1 = args.data.fid
        _Id2 = args.data.pid
        famsURL = `Get_UsagePerFuelAttDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
      }



      var onSuccess = function (response) {
        self.famsDBDataChild = response.data;
        args.detailElement.querySelector('.e-grid').ej2_instances[0].dataSource = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.fgrid.$el);

      };
      self.$ajaxGet(
        self,
        'QuickViewDispensing/' + famsURL,
        onSuccess,
        onFinally
      );
    },

    GetGrid(famsURL) {
      const self = this;
      self.isVisible = false;
      self.clearFields();
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
      self.showLoadingOnElement("submit", 0.45, "radius");
      var onSuccess = function (response) {
        self.famsDBData = response.data;
        if (self.flag) {
          //Grid.Inject(Page);
          self.grid = new Grid({
            excelExportComplete: 'excelExportComplete',
            allowSorting: true,
            allowPaging: true,
            allowExcelExport: true,
            scrollSettings: { width: 886, height: 500 },
            toolbar: self.toolbar,
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
            detailDataBound: self.onDetailDataBound,
            aggregates: self.aggregateColumn,
            childGrid: {
              queryString: self.queryString,
              columns: self.localColforGridChild,
              allowSorting: true,
              allowExcelExport: true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: ['Print', 'Search'],
              aggregates: self.aggregateColumn
            },

          });
          self.flag = false;
          self.grid.appendTo("#Grid");
          self.grid.refresh()
        }
        else self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
        self.isVisible = true;
      };
      self.$ajaxGet(
        self,
        'QuickViewDispensing/' + famsURL,
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
</style>
<style>
@import "material.css";
</style>

