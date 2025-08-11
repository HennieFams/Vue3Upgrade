<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base ">
        <vx-card class="pb-3"  title="Subscription Report" refresh-content-action @refresh="closeCardAnimationDemo" collapse-action>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-2">
              <label>From date</label>
              <datepicker
                class="w-full"
                id="FromDate"
                placeholder="From Date"
                v-model="formData.fromDate"
                format="yyyy-MM-dd"
                name ="From Date" v-validate="'required'"
              ></datepicker>
              <span class="text-danger text-sm" v-show="errors.has('From Date')" >{{ errors.first('From Date') }}</span>
            </div>
            <div class="vx-col md:w-1/2 w-full mt-2">
                <label>To date</label>
                <datepicker
                    class="w-full"
                    id="ToDate"
                    placeholder="To Date"
                    v-model="formData.toDate"
                    format="yyyy-MM-dd"
                    name ="To Date" v-validate="'required'"
              ></datepicker>
              <span class="text-danger text-sm" v-show="errors.has('To Date')" >{{ errors.first('To Date') }}</span>
            </div>   
          </div>
          <br>
          <div class="vx-col w-full mb-base">
            <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary" @click="loadFamsInformation">Submit</vs-button>
          </div> 
        </vx-card>  
          <div id="SRPGrid" ref='fgrid' class="vs-con-loading__container">
              <div id="SRGrid" ></div>  
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
import { GridPlugin, Grid,DetailRow ,Aggregate , ExcelExport, Page,RowDD, Selection, Group, Toolbar,Search,Reorder,Sort,Filter  } from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
import { DataManager, ODataAdaptor } from "@syncfusion/ej2-data";
Vue.use(GridPlugin);
Grid.Inject(Sort,Page,Toolbar,Aggregate ,ExcelExport,DetailRow,Search);
export default {
  data() {
    return {
      aggregateColumn : [],
      aggregate: null,
      toolbar: ['ExcelExport','CsvExport','Print','Search'],
      pageSettings: { pageCount: 20 },
      grid: "", 
      flag: true,
      SimpleDetailGrid:0,
      queryString:"",
      pid:0,
      columns: [],
      columnsSelecteds: [],
      activePrompt: false,
      activePromptSubGrid: false,
      fileName: "",
      formats:["xlsx", "csv", "txt"] ,
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      
      report: [],
      
      componentKey:0,
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
      localColforGrid:[],
      localColforGridChild:[],
      DetialUsageReceiveFAMS:[],
      Subscriptions: [
        {
          field: "AccountName",
          headerText: "Account",
          textAlign: "Left",
          width: 160,
          type: "string"
        },
        {
          field: "StoreName",
          headerText: "Store",
          textAlign: "Left",
          width: 160,
          type: "string"
        },
        {
          field: "StoreType",
          headerText: "Store Type",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "MacAddress",
          headerText: "Mac",
          textAlign: "Left",
          width: 150,
          type: "string"
        },
        {
          field: "IPAddress",
          headerText: "IP",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
        {
          field: "CreateDate",
          headerText: "Create Date",
          textAlign: "Left",
          width: 200,
          format: 'yyyy-MM-dd hh:mm:ss',
          type: "date"
        },
        {
          field: "RenewDate",
          headerText: "Renew Date",
          textAlign: "Left",
          width: 200,
          format: 'yyyy-MM-dd hh:mm:ss',
          type: "date"
        },
        {
          field: "DateDiff",
          headerText: "Date Diff",
          textAlign: "Left",
          width: 120,
          type: "number"
        } 
      ],
    };
  },
    props: {
    
    },
  provide : {
    grid: [DetailRow, ExcelExport, Page, Group,Selection, Toolbar,Search,Reorder,Sort ]
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
    this.formData.fromDate =  new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
 populateData() {
      var self = this;
          self.flag = true 
          var element = document.getElementById('SRGrid');
          if(element) element.remove();

          var p = document.getElementById('SRPGrid');
          var newElement = document.createElement('Div');
          newElement.setAttribute('id', 'SRGrid');
          p.appendChild(newElement);
      },
    expanded () {
      alert(this.isActive);
    },
    formatDate(pad, dateTime)
    {
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
    loadFamsInformation(){
      const self = this;
      const empty = {};
      let details = `&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`
      let famsURL = `GetSubscriptionReport?${details}`;
      
      self.isVisible = false;
      self.clearFields();

      self.showLoadingOnElement("submit", 0.45, "radius");
      var onSuccess = function(response) {
        self.famsDBData = response.data;
        
        if (self.flag) {
            self.grid = new Grid({
              excelExportComplete:'excelExportComplete'  ,
              allowSorting:true,
              allowPaging: true,
              allowExcelExport:true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick:self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.localColforGrid,
              height: 500,
              PageSettings: 20
            });
              self.flag = false;
              self.grid.appendTo("#SRGrid");
              self.grid.refresh()
        } 
        else  self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.submit.$el);   
      };
      self.$ajaxGet(
        self,
        'Subscription/' + famsURL,
        onSuccess,
        onFinally
      );
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
                this.grid.pdfExport({fileName:"new.pdf"}); 
                break; 
            case 'Excel Export': 
                this.grid.excelExport({fileName:"new.xlsx" }); 
                break; 
            case 'CSV Export': 
                this.grid.csvExport({fileName:"new.csv"}); 
                break; 
        } 
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

  #dispensing-card{
    .vx-card__collapsible-content {
      .vx-card__body{
        height: 100vh;
      }
    }
  }
  
</style>
<style>
    @import "material.css";

</style>

