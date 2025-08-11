<template>
  <div>
    <h3 class="p-3"> Quick Chart View </h3>
    <vs-tabs style="width: auto; min-height:500px">
      <vs-tab @click="initValues()" label="Usage Per Month" style="min-height:500px">
        <label> Select <b>Month</b></label>
        <datepicker format="MMM-yyyy" :minimumView="'month'" :maximumView="'month'" class="mt-1 w-1/2"  placeholder="Select Date" v-model="formData.selectedDate"></datepicker>
        <vs-button ref="usage_per_month_Button" class="rounded-lg mt-3 mb-3 vs-con-loading__container" color="warning" type="filled" @click="getUsagePerMonth">Submit</vs-button>
        <div v-if="!hasData"><h3 class="pl-3">No Data Found</h3></div><div v-if="famsDBData.length > 0" style="overflow-x: scroll;">
          <div style="min-height:500px"  :style="{width: famsDBData.length < 8 ?  'auto' : famsDBData.length < 10 ?  '1300px' : famsDBData.length < 15 ?  '2000px' : famsDBData.length < 25 ?  '3000px' : famsDBData.length > 40 ?  '7000px' : 'auto'}" id="usage_per_month"></div>
        </div>
        
      </vs-tab>
      <vs-tab @click="initValues()" label="Usage Per Equipment" style="min-height:500px">
        <label> Select <b>Month</b></label>
        <datepicker format="MMM-yyyy" :minimumView="'month'" :maximumView="'month'" class="mt-1 w-1/2"  placeholder="Select Date" v-model="formData.selectedDate"></datepicker>
        <vs-button ref="usage_per_eqp_Button" class="rounded-lg mt-3 mb-3 vs-con-loading__container" color="warning" @click="getUsagePerEquipment" type="filled">Submit</vs-button>
        <div v-if="!hasData"><h3 class="pl-3">No Data Found</h3></div><div v-if="famsDBData.length > 0" style="overflow-x: scroll;">
          <div style="min-height:500px " v-bind:style="{width: famsDBData.length < 8 ?  'auto' : famsDBData.length < 10 ?  '1300px' : famsDBData.length < 15 ?  '2000px' : famsDBData.length < 25 ?  '3000px' : famsDBData.length > 40 ?  '7000px' : 'auto'}" id="usage_per_eqp"></div>
        </div>
      </vs-tab>
      <vs-tab @click="initValues()" label="Usage Per Driver" style="min-height:500px">
        <label> Select <b>Month</b></label>
        <datepicker format="MMM-yyyy" :minimumView="'month'" :maximumView="'month'" class="mt-1 w-1/2"  placeholder="Select Date" v-model="formData.selectedDate"></datepicker>
        <vs-button ref="usage_per_driver_Button" class="rounded-lg mt-3 mb-3 vs-con-loading__container" color="warning" type="filled" @click="getUsagePerDriver">Submit</vs-button>
        <div v-if="!hasData"><h3 class="pl-3">No Data Found</h3></div><div v-if="famsDBData.length > 0" style="overflow-x: scroll;">
          <div style="min-height:500px" v-bind:style="{width: famsDBData.length < 8 ?  'auto' : famsDBData.length < 10 ?  '1300px' : famsDBData.length < 15 ?  '2000px' : famsDBData.length < 25 ?  '3000px' : famsDBData.length > 40 ?  '7000px' : 'auto'}" id="usage_per_driver"></div>
        </div>
      </vs-tab>
      <vs-tab @click="initValues()" label="Usage Per Fuel Attendant" style="min-height:500px">
        <label> Select <b>Month</b></label>
        <datepicker format="MMM-yyyy" :minimumView="'month'" :maximumView="'month'" class="mt-1 w-1/2"  placeholder="Select Date" v-model="formData.selectedDate"></datepicker>
        <vs-button ref="usage_per_fuel_attendant_Button" class="rounded-lg mt-3 mb-3 vs-con-loading__container" color="warning" type="filled" @click="getUsagePerFuelAttendant">Submit</vs-button>
        <div v-if="!hasData"><h3 class="pl-3">No Data Found</h3></div><div v-if="famsDBData.length > 0" style="overflow-x: scroll;">
          <div style="min-height:500px" v-bind:style="{width: famsDBData.length < 8 ?  'auto' : famsDBData.length < 10 ?  '1300px' : famsDBData.length < 15 ?  '2000px' : famsDBData.length < 25 ?  '3000px' : famsDBData.length > 40 ?  '7000px' : 'auto'}" id="usage_per_fuel_attendant"></div>
        </div>
      </vs-tab>
    </vs-tabs>

    <vs-popup
        fullscreen
        class="calendar-event-dialog vs-con-loading__container"
        title="Quick Chart View Detail"
        :active.sync="activeUsagePerMonth"
        ref="gridTable">

        <div id="ChartPGrid">
          <div id="Grid" ref='grid'></div>  
        </div>

    </vs-popup>

  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as venn from "@amcharts/amcharts4/plugins/venn";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import moment from "moment";
import { GridPlugin, Grid,PdfExport ,Aggregate,ExcelExport, Page,RowDD, Selection, Group, Toolbar,Search,Sort,Filter  } from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
//Vue.use(GridPlugin);
Grid.Inject(Sort,Search,Aggregate,Page,Toolbar,PdfExport,ExcelExport);
export default {
  data() {
    return {
      title: "FAMS - new Employee Wizard!!",

      activeUsagePerMonth:false,

      hasData:true,

      flag: true,
      pageSettings: { pageCount: 20 },
      aggregateColumn : [],
      aggregate: null,
      toolbar: ['ExcelExport','CsvExport','Print','Search'],
      localColforGrid:[
          {
            field: "accountID",
            headerText: "accountID",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "day",
            headerText: "day",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "month",
            headerText: "month",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "year",
            headerText: "year",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "eqpTag",
            headerText: "eqpTag",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "string"
          },
          {
            field: "dateOnly",
            headerText: "dateOnly",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "string"
          },
            {
            field: "allocation1",
            headerText: "allocation1",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "string"
          },
          {
            field: "allocation2",
            headerText: "allocation2",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "string"
          },
          {
            field: "allocation3",
            headerText: "allocation3",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "string"
          },
          {
            field: "allocation4",
            headerText: "allocation4",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "string"
          },
          {
            field: "date",
            headerText: "Date",

            width: 180,
            format: 'yyyy-MM-dd hh:mm:ss',
            type: "date"
          },
          {
            field: "store",
            headerText: "Store",

            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "Registration",

            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",

            width: 180,
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
  
            width: 180,
            type: "number"
          },        
          {
            field: "driver",
            headerText: "Driver",

            width: 180,
            type: "string"
          },
          {
            field: "fuelAttendant",
            headerText: "FuelAttendant",

            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",

            width: 120,
            type: "string"
          },
          {
            field: "hour",
            headerText: "hour",

            width: 120,
            type: "number"
          },
          {
            field: "km",
            headerText: "Km",

            width: 120,
            type: "number"
          },
          {
            field: "rebate",
            headerText: "Eqp Rebate",

            width: 180,
            type: "number"
          },
          {
            field: "costCentre",
            headerText: "CostCentre",
            width: 180,
            type: "string"
          },
              {
            field: "masterEquipment",
            headerText: "Mst Eqp",
            width: 180,
            type: "string"
          },
        ],

      famsDBData: [],
      famsDBDataDetail:[],
      formData: {
        selectedDate: "",
        toDate: "",
      },
    };
  },
  provide : {
    grid: [PdfExport, ExcelExport, Page, Group,Selection, Toolbar,Search,Sort ]
  }, 
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  methods: {
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    initValues(){
      this.hasData = true;
      this.famsDBData = [];
      var date = new Date();
      this.formData.selectedDate =  new Date(date.getFullYear(), date.getMonth(), 1);
    },
    populateData() {
        var self = this;
        self.flag = true 
        var element = document.getElementById('Grid');
        if(element) element.remove();

        var p = document.getElementById('ChartPGrid');
        var newElement = document.createElement('Div');
        newElement.setAttribute('id', 'Grid');
        p.appendChild(newElement);
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
    displayBarChart(dataObj, xAxis, yAxis, chartId, usagePerClick, ){
      var self = this;
      am4core.useTheme(am4themes_animated);

      var chart = am4core.create(chartId, am4charts.XYChart);

      chart.data = dataObj;
  
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = xAxis;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
          return dy + 25;
        }
        return dy;
      });
      
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = yAxis;
      series.dataFields.categoryX = xAxis;
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.events.on("hit", usagePerClick, this);

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
    },
    getUsagePerMonth() {
      var self = this;
      self.hasData = true;
      self.showLoadingOnElement("usage_per_month_Button", 0.45, "radius");
      var onSuccess = function (response) {
        self.famsDBData = response.data;

      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.usage_per_month_Button.$el); 
        if (self.famsDBData.length > 0)
          self.displayBarChart(self.famsDBData,"dateOnly","volume","usage_per_month", function columnClick(ev) {self.getUsagePerMonthDetail(ev.target.dataItem.categories.categoryX)
        self.activeUsagePerMonth = true;
      });
      else self.hasData = false;
      };
      self.$ajaxGet(
            self,
            `QuickViewCalendar/GetQuickViewCalendar?&date=${self.dateFormat(self.formData.selectedDate)}`,
            onSuccess,
            onFinally
          );

    },
    getUsagePerMonthDetail(date) {
      var self = this;
      self.famsDBDataDetail = [];
      var day = new Date(date);
      day = day.getDate();
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.famsDBDataDetail = response.data; 
        self.aggregateColumn =  [{ 
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
              excelExportComplete:'excelExportComplete'  ,
              allowSorting:true,
              allowPaging: true,
              allowExcelExport:true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick:self.toolbarClick,
              dataSource: self.famsDBDataDetail,
              columns: self.localColforGrid,
              height: 500,
              PageSettings: 20,
              aggregates:self.aggregateColumn

            });
              self.flag = false;
              self.grid.appendTo("#Grid");
              self.grid.refresh()
        } 
        else  self.grid.dataSource = self.famsDBDataDetail;
        self.successNotifyDataLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);

      };
      self.$ajaxGet(
            self,
            `QuickViewCalendar/GetQuickViewCalendarDetail?&date=${date}&day=${day}`,
            onSuccess,
            onFinally
          );

    },
    getUsagePerEquipment() {
      var self = this;
      self.hasData = true;
      self.showLoadingOnElement("usage_per_eqp_Button", 0.45, "radius");
      var onSuccess = function (response) {
        self.famsDBData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.usage_per_eqp_Button.$el); 
        if (self.famsDBData.length > 0)
          self.displayBarChart(self.famsDBData,"registration","volume","usage_per_eqp", function columnClick(ev) {self.getUsagePerEquipmentDetail(ev.target.dataItem.dataContext.equipmentId)
        self.activeUsagePerMonth = true;});
        else
          self.hasData = false;
      };
      self.$ajaxGet(
            self,
            `QuickViewChart/GetEquipmentChart?&date=${self.dateFormat(self.formData.selectedDate)}`,
            onSuccess,
            onFinally
          );
    },  
    getUsagePerEquipmentDetail(id) {
      var self = this;
      self.famsDBDataDetail = [];
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.famsDBDataDetail = response.data; 
        self.aggregateColumn =  [{ 
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
              excelExportComplete:'excelExportComplete'  ,
              allowSorting:true,
              allowPaging: true,
              allowExcelExport:true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick:self.toolbarClick,
              dataSource: self.famsDBDataDetail,
              columns: self.localColforGrid,
              height: 500,
              PageSettings: 20,
              aggregates:self.aggregateColumn

            });
              self.flag = false;
              self.grid.appendTo("#Grid");
              self.grid.refresh()
        } 
        else  self.grid.dataSource = self.famsDBDataDetail;
        self.successNotifyDataLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
            self,
            `QuickViewChart/GetEquipmentChartDetail?&date=${self.dateFormat(self.formData.selectedDate)}&EquipmentId=${id}`,
            onSuccess,
            onFinally
          );
    },  
    getUsagePerDriver() {
      var self = this;
      self.hasData = true;
      self.showLoadingOnElement("usage_per_driver_Button", 0.45, "radius");
      var onSuccess = function (response) {
        self.famsDBData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.usage_per_driver_Button.$el);
        if (self.famsDBData.length > 0)
          self.displayBarChart(self.famsDBData,"driver","volume","usage_per_driver", function columnClick(ev) {self.getUsagePerDriverDetail(ev.target.dataItem.dataContext.driverId);
          self.activeUsagePerMonth = true;
      });
      else
        self.hasData = false;
      };
      self.$ajaxGet(
            self,
            `QuickViewChart/GetDriverChart?&date=${self.dateFormat(self.formData.selectedDate)}`,
            onSuccess,
            onFinally
          );
    },    
    getUsagePerDriverDetail(id) {
      var self = this;
      self.famsDBDataDetail = [];
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.famsDBDataDetail = response.data; 
        self.aggregateColumn =  [{ 
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
              excelExportComplete:'excelExportComplete'  ,
              allowSorting:true,
              allowPaging: true,
              allowExcelExport:true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick:self.toolbarClick,
              dataSource: self.famsDBDataDetail,
              columns: self.localColforGrid,
              height: 500,
              PageSettings: 20,
              aggregates:self.aggregateColumn

            });
              self.flag = false;
              self.grid.appendTo("#Grid");
              self.grid.refresh()
        } 
        else  self.grid.dataSource = self.famsDBDataDetail;
        self.successNotifyDataLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
            self,
            `QuickViewChart/GetDriveChartDetail?&date=${self.dateFormat(self.formData.selectedDate)}&DriverId=${id}`,
            onSuccess,
            onFinally
          );
    },
    getUsagePerFuelAttendant() {
      var self = this;
      self.hasData = true;
      self.showLoadingOnElement("usage_per_fuel_attendant_Button", 0.45, "radius");
      var onSuccess = function (response) {
        self.famsDBData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.usage_per_fuel_attendant_Button.$el);
        if (self.famsDBData.length > 0)
          self.displayBarChart(self.famsDBData,"fuelAttendant","volume","usage_per_fuel_attendant", function columnClick(ev) {self.getUsagePerFuelAttendantDetail(ev.target.dataItem.dataContext.fuelAttendantId);
        self.activeUsagePerMonth = true;
      });
        else
          self.hasData = false;
      };
      self.$ajaxGet(
            self,
            `QuickViewChart/GetFuelAttendantChart?&date=${self.dateFormat(self.formData.selectedDate)}`,
            onSuccess,
            onFinally
          );
    },
    getUsagePerFuelAttendantDetail(id) {
      var self = this;
      self.famsDBDataDetail = [];
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.famsDBDataDetail = response.data; 
        self.aggregateColumn =  [{ 
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
              excelExportComplete:'excelExportComplete'  ,
              allowSorting:true,
              allowPaging: true,
              allowExcelExport:true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick:self.toolbarClick,
              dataSource: self.famsDBDataDetail,
              columns: self.localColforGrid,
              height: 500,
              PageSettings: 20,
              aggregates:self.aggregateColumn

            });
              self.flag = false;
              self.grid.appendTo("#Grid");
              self.grid.refresh()
        } 
        else  self.grid.dataSource = self.famsDBDataDetail;
        self.successNotifyDataLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
            self,
            `QuickViewChart/GetFuelAttendantChartDetail?&date=${self.dateFormat(self.formData.selectedDate)}&FuelAttendnantId=${id}`,
            onSuccess,
            onFinally
          );
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

    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
  },
  mounted() {
    var date = new Date();
    this.formData.selectedDate =  new Date(date.getFullYear(), date.getMonth(), 1);
  },
};
</script>
<style>
  @import "material.css";
</style>