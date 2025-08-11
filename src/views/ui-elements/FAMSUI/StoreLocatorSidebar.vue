<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
      suppressScrollX="true" 
      v-if='picked == 0'
      >
      
      <div class="vx-col w-full mb-base ">
        <vx-card ref="MainCard" class="pb-3" :title="`Store Name: ${title}`" >
          <div class="vx-row pb-3">
            <div
              class="vx-col xs:w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/2 mb-2 vs-con-loading__container"
              style="
                padding: 10px;
                background: #eeeeee;
                border-top: solid white 2px;
                border-bottom: solid white 2px;
                border-left: solid white 4px;
                border-right: solid white 4px;
              "
              
              v-for="(tank, index) in tankInfo"
              :key="index"
            >
              <vs-button @click="popupHistoryView(tank.tankID)" class="rounded-lg ml-3" type="filled"
                >View Historical</vs-button
              >
              <div style="height: 500px" :id="`chartdiv${index}`"></div>
              <div class="pl-3">
                <b>Product:</b> {{ tank.product }} <br />
                <b>Dip:</b> {{ tank.mm }} mm <br />
                <b>Current Level:</b> {{ tank.volume }} Liters <br />
                <b>Water Level (if applicable):</b> {{ tank.water }} mm <br />
                <b>Temp (if applicable):</b> {{ tank.temp }} °C <br />
                <b>Date of reading:</b> {{tank.createDate.replace("T", " ").split('.')[0] }} <br />
                <b>Capacity:</b> {{ tank.capacity }} <br />
                
              </div>
          </div>
          
        </div>
        <vs-popup fullscreen title="View Historical" :active.sync="popupActive">
            <div class="mt-3">
              <vs-tabs v-model="activeTab" style="width: auto min-height:500px">
                <vs-tab label="Chart" @click="displayLineChart()" style="min-height:500px">
                  <h3 v-show="isEmpty">No data for tank</h3>
                  <div>
                    <div id="linechartdiv" ref="linechartdiv" v-show="!isInfoHiddenChart"></div>
                  </div>
                </vs-tab>
                
                <vs-tab label="Grid" @click="getTankHistory()" style="min-height:500px">
                  <!--<div class="vx-row">
                    <div class="vx-col md:w-1/2 w-full mt-2">
                    <label>From Date</label>
                      <datepicker
                        class="w-full"
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
                    <label>To Date</label>
                      <datepicker
                        class="w-full"
                        placeholder="To Date"
                        v-model="formData.toDate"
                        format="yyyy-MM-dd"
                        name="To Date"
                        v-validate="'required'"
                      ></datepicker>
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('To Date')"
                        >{{ errors.first("To Date") }}</span
                      >
                    </div>
                  </div>
                  
                  <vs-button ref="gridButton" class="rounded-lg mt-3 mb-3 vs-con-loading__container" color="warning" type="filled" @click="getTankHistory" >Load Grid</vs-button>-->
                  <div>
                    <div  id="PGridATG" v-show="!isInfoHidden">
                      <div  id="Grid" ref="Grid"></div>
                    </div>
                  </div>
                </vs-tab>
              </vs-tabs>
            </div>
          </vs-popup>
        </vx-card>
      </div>
    </component>
    <component
      :is="scrollbarTag"
      class="scroll-area "
      :settings="settings"
      :key="$vs.rtl"
      suppressScrollX="true" 
      v-if='picked == 2'
      >
      <div class="vx-col w-full mb-base ">
        <vx-card ref="MainCard" :title="`Store Name: ${title}`">
      <div>
        <vs-table
              ref="gridTable"
              pagination
              :max-items="itemsPerPage"
              search
              :data="tankInfo"
              class="vs-con-loading__container"
            >
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
          </div>
            <template slot="thead">
            <vs-th sort-key="exceptionName">Exception</vs-th>
            <vs-th sort-key="tankName">Tank</vs-th>
            <vs-th sort-key="storeName">Store</vs-th>
            <vs-th sort-key="exceptionType">Exception Type</vs-th>
            <vs-th sort-key="trigger">Trigger</vs-th>
            <vs-th sort-key="timeIn">Time</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.exceptionName">{{tr.exceptionName}}</vs-td>
              <vs-td :data="tr.tankName">{{tr.tankName}}</vs-td>
              <vs-td :data="tr.storeName">{{tr.storeName}}</vs-td>
              <vs-td :data="tr.exceptionType">{{tr.exceptionType}}</vs-td>
              <vs-td :data="tr.trigger">{{ tr.trigger}}</vs-td>
              <vs-td :data="tr.timeIn">{{  formatDate(tr.timeIn.replace("T", " ").split('.')[0])}}</vs-td>
            </vs-tr>
          </template>
          </vs-table>
        </div>
      </vx-card>
      </div>
    </component>
    <component
      :is="scrollbarTag"
      class="scroll-area "
      :settings="settings"
      :key="$vs.rtl"
      suppressScrollX="true" 
      v-if='picked == 1'
      >
      <div class="vx-col w-full mb-base ">
        <vx-card ref="FuelUsageCard" :title="`Store Name: ${title}`">
      <div>
        <vs-table
              ref="fgrid"
              pagination
              :max-items="itemsPerPage"
              search
              :data="famsDBDataChild"
              class="vs-con-loading__container"
            >
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
          </div>
            <template slot="thead">
            <vs-th sort-key="registration">Registration</vs-th>
            <vs-th sort-key="timeIn">Date</vs-th>
            <vs-th sort-key="driver">Driver</vs-th>
            <vs-th sort-key="operator">Fuel Attedant</vs-th>
            <vs-th sort-key="measurement">Type</vs-th>
            <vs-th sort-key="kmHour"> kmHour</vs-th>
            <vs-th sort-key="volume">volume</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.registration">{{tr.registration}}</vs-td>
              <vs-td :data="tr.date">{{  tr.date.replace("T", " ").split('.')[0]}}</vs-td>
              <vs-td :data="tr.driver">{{tr.driver}}</vs-td>
              <vs-td :data="tr.operator">{{tr.operator}}</vs-td>
              <vs-td :data="tr.measurement">{{tr.measurement}}</vs-td>
              <vs-td :data="tr.kmHour">{{tr.kmHour}}</vs-td>
              <vs-td :data="tr.volume">{{tr.volume}}</vs-td>
            </vs-tr>
          </template>
          </vs-table>
        </div>
      </vx-card>
      </div>
    </component>
  </vs-sidebar>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as venn from "@amcharts/amcharts4/plugins/venn";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import VxCard from "../../../components/vx-card/VxCard.vue";
import moment from "moment";
import {
  GridPlugin,
  Grid,
  PdfExport,
  ExcelExport,
  Page,
  RowDD,
  Selection,
  Group,
  Toolbar,
  Search,
  Reorder,
  Sort,
  Filter,
} from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
import { DataManager, ODataAdaptor } from "@syncfusion/ej2-data";
Vue.use(GridPlugin);
Grid.Inject(Sort, Page, Toolbar, PdfExport, ExcelExport);
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      default: () => {},
    },
    items: {

    }
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VuePerfectScrollbar,
  },
  mounted(){
    this.initValues();
    this.isMounted = false;
  },
  data() {
    return {
      activeTab: 0,
      isInfoHidden: true,
      isInfoHiddenChart: true,
      famsDBDataChild:[],
      pageSettings: { pageCount: 10 },
      grid: "",
      columns: [],
      columnsSelecteds: [],
      activePrompt: false,
      activePromptSubGrid: false,
      fileName: "",
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      tankData: [],
      tankInfo: [],
      position: {},
      picked: "",
      title: "",
      popupActive: false,
      flag: true,
      tankId:0,
      selectionOptions: { mode: "Row" },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      localColforGrid:[
          {
            field: "productID",
            headerText: "productID",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "tankID",
            headerText: "tankID",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "tank",
            headerText: "Tank",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "productName",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
          field: "createDate",
          headerText: "Date",
          textAlign: "Left",
          width: 180,
          format: 'yyyy-MM-dd hh:mm',
          type: "date"
        },
        {
          field: "mm",
          headerText: "mm",
          width: 120,
          type: "number"
        },
        {
          field: "volume",
          headerText: "Volume",
          width: 120,
          type: "number"
        },
        {
          field: "water",
          headerText: "Water",
          width: 120,
          type: "number"
        }
      ],
      
      isEmpty:false,
      isDone:false,
      famsDBData: [],
      formData: {
        fromDate: "",
        toDate: "",
      },
      itemsPerPage: 10,
      isMounted: false
    };
  },
  watch: {
    isSidebarActive(val) {
      var self = this;
      
      if(val){
        self.storeID = self.data.storeID;
        self.picked = self.data.picked;
        self.tankInfo = self.data.tankInfo.filter(x => x.storeID == self.storeID);
        self.tankData = self.data.tankData;
        self.position = self.data.position;
        self.title = self.data.storeName;

        var date = new Date();
        self.formData.fromDate =  new Date(date.getFullYear(), date.getMonth(), 1);
        self.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        setTimeout(function(){
          if(self.data.picked == 0){
            self.displayChart();
          }
          else if(self.data.picked == 2){            
            self.isMounted = true;
            self.tankInfo = self.data.tankInfo.filter(x => x.storeID == self.storeID)
            self.$refs.gridTable.currentx = 1;
          }
          else if(self.data.picked == 1){
            self.showLoadingOnElement("fgrid", 1, "radius");
            self.displayFuelDetails(self.tankData.filter(x => x.storeID == self.storeID));
          }
        },100);
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
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      },
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  provide : {
    grid: [ExcelExport, Page, Group,Selection, Toolbar,Search,Reorder,Sort ]
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
    am4themes_chartTheme(target){
      if (target instanceof am4core.ColorSet) {
        target.list = [
          am4core.color("#0098E7"),
          am4core.color("#C91C04"),
          am4core.color("#6524FF"),
          am4core.color("#459B02")
        ];
      }
    },
    displayLineChart() {
      var self = this;
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;
      self.isEmpty = false;
      // setTimeout(function(){
        self.showLoadingOnElement("linechartdiv", 1, "radius");
      // },500);
      
      var onSuccess = function (response) {
        self.isInfoHiddenChart = false;
        self.famsDBData = response.data;
        self.$vs.loading.close(self.$refs.linechartdiv.$el);
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.linechartdiv.$el);
        self.successNotifyDataLoad();
        if(self.famsDBData.length > 0)
        {      
          am4core.useTheme(self.am4themes_chartTheme);
        // Themes end

        var chart = am4core.create("linechartdiv", am4charts.XYChart);

        var data = [];

        var newdata = self.famsDBData;
          newdata.forEach(myFunc);
          function myFunc(item, index) {
          var d = new Date(item.createDate);
          
          data.push(
            {
              day: d,
              volume: item.volume,
              water: item.water,
              temp: item.temp,
              dip: item.mm
            });
          }
        chart.data = data;

        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;
        dateAxis.baseInterval = {
          timeUnit: "date",
          count: 1
        }

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;


        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.name = "water";
        series2.dataFields.dateX = "day";
        series2.dataFields.valueY = "water";
        
        series2.tooltipText = "[#000]{valueY.value}[/]";
        series2.tooltip.background.fill = am4core.color("#FFF");
        series2.tooltip.getFillFromObject = false;
        series2.tooltip.getStrokeFromObject = true;
        series2.tooltip.background.strokeWidth = 3;
        series2.fillOpacity = 0.2;
        series2.stacked = false;
        series2.strokeWidth = 2;

        var series3 = chart.series.push(new am4charts.LineSeries());
        series3.name = "temp";
        series3.dataFields.dateX = "day";
        series3.dataFields.valueY = "temp";
        series3.tooltipText = "[#000]{valueY.value}[/]";
        series3.tooltip.background.fill = am4core.color("#FFF");
        series3.tooltip.getFillFromObject = false;
        series3.tooltip.getStrokeFromObject = true;
        series3.tooltip.background.strokeWidth = 3;
        series3.fillOpacity = 0.2;
        series3.stacked = false;
        series3.strokeWidth = 2;


        var series4 = chart.series.push(new am4charts.LineSeries());
        series4.name = "dip";
        series4.dataFields.dateX = "day";
        series4.dataFields.valueY = "dip";
        series4.tooltipText = "[#000]{valueY.value}[/]";
        series4.tooltip.background.fill = am4core.color("#FFF");
        series4.tooltip.getFillFromObject = false;
        series4.tooltip.getStrokeFromObject = true;
        series4.tooltip.background.strokeWidth = 3;
        series4.fillOpacity = 0.2;
        series4.stacked = false;
        series4.strokeWidth = 2;

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "day";
        series.name = "volume";
        series.dataFields.valueY = "volume";
        series.tooltipText = "[#000]{valueY.value}[/]";
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.background.strokeWidth = 3;
        series.tooltip.getFillFromObject = false;
        series.fillOpacity = 0.2;
        series.strokeWidth = 1;
        series.stacked = false;
        am4core.options.autoDispose = true;


        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";

        // axis ranges
        self.$vs.loading.close(self.$refs.linechartdiv.$el);

        }else{
          self.isEmpty = true;
        self.$vs.loading.close(self.$refs.linechartdiv.$el);
        }
      };

      var myobject={};
      myobject.ClientKey = localStorage.getItem('userKey');
      myobject.ClientID = localStorage.getItem('userId');
      myobject.AccountID = localStorage.getItem("userAccountId");
      myobject.AccountKey = localStorage.getItem("userAccountKey");
      myobject.fromdate = self.dateFormat(self.formData.fromDate);
      myobject.todate = self.dateFormat(self.formData.toDate);
      myobject.ID = self.tankId;
      self.$ajaxPost(
            self,
            'QuickViewATG/GetATGHistory',
            myobject,
            onSuccess,
            onFinally
          );
    },
    
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    formatDateMoment: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
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
    dateWithTime(date,index){
      var month = '';
      var year = '';
      var day = '';
      var totalSeconds = index;
      var hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;

      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      minutes = String(minutes).padStart(2, "0");
      hours = String(hours).padStart(2, "0");
      seconds = String(seconds).padStart(2, "0");

      var dt = [year, month, day].join('-');
      var t = [ hours, minutes, seconds].join(':');
      return dt = [dt,t].join(' ');
    },
    displayChart() {
      var self = this;
      setTimeout(function(){
        am4core.useTheme(am4themes_animated);
        for (var index = 0; index < self.tankData.length; index++) {
          var chart = am4core.create(`chartdiv${index}`, am4charts.XYChart3D);
          
          chart.data = [self.tankData[index]];
          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "category";
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.grid.template.strokeOpacity = 0;

          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.grid.template.strokeOpacity = 0;
          valueAxis.min = -15;
          valueAxis.max = 120;
          valueAxis.strictMinMax = true;
          valueAxis.renderer.baseGrid.disabled = true;
          valueAxis.renderer.labels.template.adapter.add("text", function (text) {
            if (text > 100 || text < 0) {
              return "";
            } else {
              return text + "%";
            }
          });

          var series1 = chart.series.push(new am4charts.ConeSeries());
          series1.dataFields.valueY = "value1";
          series1.dataFields.categoryX = "category";
          series1.columns.template.width = am4core.percent(90);
          series1.columns.template.fillOpacity = 0.9;
          series1.columns.template.strokeOpacity = 1;

          series1.columns.template.tooltipText = "{categoryX} : " + self.tankData[index].volume +" L";

          if (self.tankData[index].value1 < 30) {
            series1.columns.template.strokeWidth = 2;
            series1.columns.template.fill = am4core.color("#FF6961");
            series1.columns.template.stroke = am4core.color("#FF6961");
          } else if (
            self.tankData[index].value1 >= 30 &&
            self.tankData[index].value1 <= 60
          ) {
            series1.columns.template.strokeWidth = 2;
            series1.columns.template.fill = am4core.color("#FDFD4A");
            series1.columns.template.stroke = am4core.color("#FDFD4A");
          } else {
            series1.columns.template.strokeWidth = 2;
            series1.columns.template.fill = am4core.color("#87dd7a");
            series1.columns.template.stroke = am4core.color("#87dd7a");
          }

          var series2 = chart.series.push(new am4charts.ConeSeries());
          series2.dataFields.valueY = "value2";
          series2.dataFields.categoryX = "category";
          series2.stacked = true;
          series2.columns.template.width = am4core.percent(90);
          series2.columns.template.fill = am4core.color("#000");
          series2.columns.template.fillOpacity = 0.1;
          series2.columns.template.stroke = am4core.color("#000");
          series2.columns.template.strokeOpacity = 0.2;
          series2.columns.template.strokeWidth = 2;
          series2.columns.template.tooltipText = "Tank Ullage : " + self.tankData[index].ullage +" L";
        }

        },500);
      
        
    },
    toolbarClick(args) {
      switch (args["item"].text) {
        case "PDF Export":
          this.grid.pdfExport({ fileName: "new.pdf" });
          break;
        case "Excel Export":
          this.grid.excelExport({ fileName: "new.xlsx" });
          break;
        case "CSV Export":
          this.grid.csvExport({ fileName: "new.csv" });
          break;
      }
    },
    rowSelected(args) {
      let selectedrecords = this.grid.getSelectedRecords();
      alert(JSON.stringify(selectedrecords[0]));
    },
    pdfExportComplete(args) {
      this.grid.hideSpinner();
    },
    excelExportComplete(args) {
      this.grid.hideSpinner();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
    exportToExcelSubGrid() {
      import("@/vendor/Export2Excel").then((excel) => {
        const list = this.famsDBDataSelected;
        const data = this.formatJson(this.columnsSelecteds, list);
        excel.export_json_to_excel({
          header: this.columnsSelecteds,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat,
        });
        this.clearFields();
      });
    },
    activatePrompt() {
      const self = this;
      self.clearFields();
      self.activePrompt = true;
    },
    activatePromptSubGrid() {
      const self = this;
      self.clearFields();
      self.activePromptSubGrid = true;
    },
    exportToExcel() {
      import("@/vendor/Export2Excel").then((excel) => {
        const list = this.famsDBData;
        const data = this.formatJson(this.columns, list);
        excel.export_json_to_excel({
          header: this.columns,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat,
        });
        this.clearFields();
      });
    },
    populateData() {
      var self = this;
      self.flag = true;
      var element = document.getElementById("Grid");
      if (element) element.remove();

      var p = document.getElementById("PGridATG");
      var newElement = document.createElement("Div");
      newElement.setAttribute("id", "Grid");
      p.appendChild(newElement);
    },
    clearFields() {
      (this.filename = ""),
        (this.cellAutoWidth = true),
        (this.selectedFormat = "csv");
    },
    getTankHistory() {
      const self = this;
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;
      self.clearFields();
      setTimeout(function(){
        self.populateData();
        self.showLoadingOnElement("Grid", 1, "radius");
      },500);
      var onSuccess = function (response) {
        self.isInfoHidden = false;
        self.famsDBData = response.data;
          self.grid = new Grid({
            excelExportComplete: "excelExportComplete",
            pdfExportComplete: "pdfExportComplete",
            allowPaging: true,
            allowExcelExport: true,
            allowSorting:true,
            selectionSettings: self.selectionOptions,
            pageSettings: self.pageSettings,
            scrollSettings: { width: 886, height: 300 },
            toolbar: ["ExcelExport", "CsvExport", "Print",'Search'],
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
          });
          self.flag = false;
          self.grid.appendTo("#Grid");
          self.grid.refresh();
          self.isDone = true;

      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.Grid.$el);
        self.successNotifyDataLoad();
      };

      var myobject={};
      myobject.ClientKey = localStorage.getItem('userKey');
      myobject.ClientID = localStorage.getItem('userId');
      myobject.AccountID = localStorage.getItem("userAccountId");
      myobject.AccountKey = localStorage.getItem("userAccountKey");
      myobject.fromdate = self.dateFormat(self.formData.fromDate);
      myobject.todate = self.dateFormat(self.formData.toDate);
      myobject.ID = self.tankId;
      self.$ajaxPost(
            self,
            'QuickViewATG/GetATGHistory',
            myobject,
            onSuccess,
            onFinally
          );
    },
    popupHistoryView(id) {
      var self = this; 
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;
      self.tankId = id;
      
      if(this.activeTab == 0){
        self.displayLineChart();
      }
      else{
        self.getTankHistory();
      }
      
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    getTab(id){
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;
      
      if(this.activeTab == 0){
        this.displayLineChart();
      }
      else if(this.activeTab == 1){
        this.getTankHistory();
      }
    },
    closeSidebar() {
      this.initValues();
      this.isSidebarActiveLocal = false;
    },
    initValues() {
      this.tankData = [];
      this.tankInfo = [];
      this.famsDBDataChild = [];
      this.title = "";
      this.position = {};
      this.isMounted = false;
    },
    displayFuelDetails(args){
      const self = this;
      let _Id1 = 0;
      let _Id2 = 0;
      let famsURL ='';
      
      _Id1 = args[0].pid;
      _Id2 = args[0].sid;
      famsURL = `Get_UsagePerStoreDetail?clientKey=${localStorage.getItem('userKey')}
        &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
        &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
        
      var onSuccess = function(response) {
        
        self.famsDBDataChild = response.data;
        
        //args.detailElement.querySelector('.e-grid').ej2_instances[0].dataSource = response.data;
      };
      var onFinally = function() {
          self.$vs.loading.close(self.$refs.fgrid.$el);
          
      };
      self.$ajaxGet(
        self,
        'QuickViewDispensing/' + famsURL,
        onSuccess,
        onFinally
      );
      
    },
    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
  },
  
};
</script>
<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 850px;
    max-width: 90vw;

    .ps__scrollbar-x-rail {
      display: none !important;
    }

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
    .con-chips{
        justify-content: unset;
      }
  }
}

.scroll-area--data-list-add-new {
  height: 100vh;

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
<style>
@import "https://cdn.syncfusion.com/ej2/material.css";

#linechartdiv {
  width: 100%;
  height: 500px;
};

</style>
