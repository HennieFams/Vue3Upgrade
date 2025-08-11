<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base ">
      <vs-tabs v-model="activeTab" ref="atgTabs" class="vs-con-loading__container" style="width: auto min-height:auto">
        <vs-tab label="ATG Grid" style="min-height: auto">
          <vx-card ref="MainCard" class="pb-3" title="FAMS Quick ATG View">
            <div class="vx-col w-full mb-base">
              <vs-table ref="gridTable" pagination :max-items="itemsPerPage" search :data="tankInfo"
                class="vs-con-loading__container">
                <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                  <vs-button ref="reload" type="filled" color="warning" class="rounded-lg mb-2" @click="getTankData()">
                    Reload
                  </vs-button>
                  <div class="vx-col w-2/5 mb-2">
                    <vs-checkbox class="float-left mb-2" style="width: fit-content" name="cbExpiredStores"
                      v-model="showAll">
                      Show All Tanks
                    </vs-checkbox>
                    <vs-checkbox class="float-left" style="width: fit-content" name="cbBlockedAccounts"
                      v-model="showActive">
                      Show Only Active Tanks
                    </vs-checkbox>
                  </div>
                  <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                    <div
                      class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                      <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }}
                        -
                        {{
                          tankInfo.length - currentPage * itemsPerPage > 0
                          ? currentPage * itemsPerPage
                          : tankInfo.length
                        }}
                        of {{ tankInfo.length }}</span>
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
                  <vs-th sort-key="tankName">Tank Name</vs-th>
                  <vs-th sort-key="date">Date of Reading</vs-th>
                  <vs-th sort-key="tankCapacity">Tank Capacity</vs-th>
                  <vs-th sort-key="mm">Dip (mm)</vs-th>
                  <vs-th sort-key="l">Current Level (L)</vs-th>
                  <vs-th sort-key="water">Water Level (mm)</vs-th>
                  <vs-th sort-key="temp">Temp (°C)</vs-th>
                  <vs-th sort-key="ullage">Ullage (L)</vs-th>
                  <vs-th>View Historical</vs-th>
                </template>
                <template slot-scope="{ data }">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :style="'background: ' + color(tr)">
                    <vs-td :data="tr.tankName">{{ tr.tankName }}</vs-td>
                    <vs-td :data="tr.createDate">{{ formatDateMoment(tr.createDate) }}</vs-td>
                    <vs-td :data="tr.capacity">{{ tr.capacity }}</vs-td>
                    <vs-td :data="tr.mm">{{ tr.mm }} mm</vs-td>
                    <vs-td :data="tr.volume">{{ tr.volume }} L</vs-td>
                    <vs-td :data="tr.volume">{{ tr.water }} mm</vs-td>
                    <vs-td :data="tr.volume">{{ tr.temp }} °C</vs-td>
                    <vs-td :data="Math.round(tr.capacity - tr.volume)">{{ Math.round(tr.capacity - tr.volume) }} L</vs-td>
                    <vs-td class="whitespace-no-wrap">
                      <feather-icon icon="EyeIcon" ref="history" svgClasses="w-5 h-5 hover:text-success stroke-current"
                        @click.stop="popupHistoryView(tr.tankID)" /></vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </vx-card>
        </vs-tab>
        <vs-tab label="ATG Chart" style="min-height: auto">
          <vx-card ref="MainCard" class="pb-3" title="FAMS Quick ATG View">
            <div class="vx-row pb-3">
              <div class="vx-col flex-2">
                <vs-button ref="reload" type="filled" color="warning" class="rounded-lg mb-2 vs-con-loading__container"
                  @click="getTankData()">
                  Reload
                </vs-button>
              </div>
              <div class="vx-col w-2/5 mb-2">
                <vs-checkbox class="float-left mb-2" style="width: fit-content" name="cbExpiredStores" v-model="showAll">
                  Show All Tanks
                </vs-checkbox>
                <vs-checkbox class="float-left" style="width: fit-content" name="cbBlockedAccounts" v-model="showActive">
                  Show Only Active Tanks
                </vs-checkbox>
              </div>
            </div>
            <div class="vx-row pb-3">
              <div class="vx-col xs:w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-2" style="
          padding: 10px;
          background: #eeeeee;
          border-top: solid white 2px;
          border-bottom: solid white 2px;
          border-left: solid white 4px;
          border-right: solid white 4px;
        " v-for="(tank, index) in tankInfo" :key="index">
                <vs-button @click="popupHistoryView(tank.tankID)" class="rounded-lg ml-3" type="filled">View
                  Historical</vs-button>
                <vs-button @click="popupInformation(tank.tankID)" class="rounded-lg ml-3 vs-con-loading__container"
                  ref="gpsInfo" type="filled" color="rgb(125, 51, 255)" v-show="tank.sensorType == 6">Latest GPS
                  Info</vs-button>

                <div style="height: 500px" :id="`chartdiv${index}`"></div>
                <div class="pl-3">
                  <b>Product:</b> {{ tank.product }} <br />
                  <b>Dip:</b> {{ tank.mm }} mm <br />
                  <b>Current Level:</b> {{ tank.volume }} Liters <br />
                  <b>Water Level (if applicable):</b> {{ tank.water }} mm <br />
                  <b>Temp (if applicable):</b> {{ tank.temp }} °C <br />
                  <b>Date of reading:</b> {{ formatDateMoment(tank.createDate) }} <br />
                  <b>Capacity:</b> {{ tank.capacity }} <br />
                </div>
              </div>

            </div>
          </vx-card>
        </vs-tab>
      </vs-tabs>
      <vs-popup fullscreen title="View Historical" :active.sync="popupActive">
        <div class="mt-3">
          <vs-tabs style="width: auto min-height:500px">
            <vs-tab label="Chart" style="min-height:500px">
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>From Date</label>
                  <datepicker class="w-full" placeholder="From Date" v-model="formData.fromDate" format="yyyy-MM-dd"
                    name="From Date" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first("From Date")
                  }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>To Date</label>
                  <datepicker class="w-full" placeholder="To Date" v-model="formData.toDate" format="yyyy-MM-dd"
                    name="To Date" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first("To Date")
                  }}</span>
                </div>
              </div>

              <vs-button ref="chartButton" class="rounded-lg mt-3 mb-3 vs-con-loading__container" color="warning"
                type="filled" @click="displayLineChart">Load Chart</vs-button>
              <h3 v-show="isEmpty">No data for tank</h3>
              <div>
                <div id="linechartdiv" v-show="!isInfoHiddenChart"></div>
              </div>
            </vs-tab>

            <vs-tab label="Grid" style="min-height:500px">
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>From Date</label>
                  <datepicker class="w-full" placeholder="From Date" v-model="formData.fromDate" format="yyyy-MM-dd"
                    name="From Date" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first("From Date")
                  }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>To Date</label>
                  <datepicker class="w-full" placeholder="To Date" v-model="formData.toDate" format="yyyy-MM-dd"
                    name="To Date" v-validate="'required'"></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first("To Date")
                  }}</span>
                </div>
              </div>

              <vs-button ref="gridButton" class="rounded-lg mt-3 mb-3 vs-con-loading__container" color="warning"
                type="filled" @click="getTankHistory">Load Grid</vs-button>
              <div>
                <div id="PGridATG" v-show="!isInfoHidden">
                  <div id="Grid" ref="grid"></div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>
        </div>
      </vs-popup>
    </div>
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
  data() {
    return {
      isInfoHidden: true,
      isInfoHiddenChart: true,
      title: "FAMS - new Employee Wizard!!",
      subtitle:
        "Please complete each tab to add new Employee (operator/driver)",
      toolbarOptions: ["ExcelExport", "CsvExport"],
      pageSettings: { pageCount: 10 },
      grid: "",
      columns: [],
      activeTab: 0,
      columnsSelecteds: [],
      activePrompt: false,
      activePromptSubGrid: false,
      fileName: "",
      formats: ["xlsx", "csv", "txt"],
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      headerTitle: ["Allocation", "Description", "Group"],
      headerVal: ["allocation", "description", "allocationGroupName"],
      tankData: [],
      tankInfo: [],
      activeTab: 0,
      popupActive: false,
      flag: true,
      tankId: 0,
      selectionOptions: { mode: "Row" },

      localColforGrid: [
        {
          field: "productID",
          headerText: "productID",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number"
        },
        {
          field: "tankID",
          headerText: "tankID",
          textAlign: "Left",
          width: 150,
          visible: false,
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
          format: 'yyyy-MM-dd HH:mm',
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
        },
        {
          field: "temp",
          headerText: "temp",
          width: 120,
          type: "number"
        }
      ],

      isEmpty: false,
      isDone: false,
      famsDBData: [],
      formData: {
        fromDate: "",
        toDate: "",
      },
      showAll: false,
      showActive: true,
      itemsPerPage: 10,
      isMounted: false,
      tankDataInterval: null,
    };
  },
  provide: {
    grid: [ExcelExport, Page, Group, Selection, Toolbar, Search, Reorder, Sort]
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
  watch: {
    showAll: function (val) {
      var self = this;
      self.showActive == val ? self.showActive = !val : self.showAll = val;
      setTimeout(() => {
          this.getTankData();
        }, 1000);

      // if(val){
      //   self.type = 1;
      // }
    },
    activeTab(val) {
      // Clear previous interval if it exists
      if (this.tankDataInterval) {
        clearInterval(this.tankDataInterval);
        this.tankDataInterval = null;
      }
      if (val == 0) {
        if (this.tankDataInterval) {
          clearInterval(this.tankDataInterval);
          this.tankDataInterval = null;
        }

        setTimeout(() => {
          this.getTankData();
        }, 1000);
        // this.isMounted = true;
      }
      else if (val === 1) {
        // Start new interval
        this.getTankData(); // Optional immediate call
        this.tankDataInterval = setInterval(() => {
          this.getTankData();
        }, 4000);
      } else {
        // Optional: stop updates on other tabs
        if (this.tankDataInterval) {
          clearInterval(this.tankDataInterval);
          this.tankDataInterval = null;
        }
      }
    },
    // activeTab: function (val) {
    //   if (val == 0) {
    //     setTimeout(() => {
    //       this.getTankData();
    //     }, 1000);
    //     // this.isMounted = true;
    //   }
    //   else if (val == 1) {
    //     setTimeout(() => {
    //       this.getTankData();
    //     }, 1000);
    //     // this.isMounted = false;
    //   }
    // },
    showActive: function (val) {
      var self = this;
      self.showAll == val ? self.showAll = !val : self.showActive = val;
      if (self.activeTab == 1) {
        self.getTankData();
      }
      // if(val){
      //   self.type = 2;
      // }
    },
  },
  methods: {
    totalRows(rowCount) {
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },

    getTankData() {
      var self = this;
      var type = 0;
      if (self.showActive) {
        type = 2;
      }
      else if (self.showAll) {
        type = 1;
      }

      if (self.activeTab == 0) {
        self.showLoadingOnElement("gridTable", 1, "radius");
      }
      else if (self.activeTab == 1) {
        self.showLoadingOnElement("reload", 1, "radius");
      }
      var onSuccess = function (response) {
        if(response.data && response.data.length > 0){
          self.tankData = response.data.map((item) => {
            return {
              category: item.tankName,
              value1: (item.volume / item.capacity) * 100,
              value2: 100 - (item.volume / item.capacity) * 100,
              max: item.capacity,
              mm: item.mm,
              volume: item.volume,
              ullage: Math.round(item.capacity - item.volume),
              date: item.createDate,
              sensorType: item.sensorType,
              tankId: item.tankID,
              storeId: item.storeID
            };
          });

          if (self.activeTab == 0) {
            if(response.data[0]){
              self.isMounted = true;
            }
            self.$vs.loading.close(self.$refs.gridTable.$el);
          }
          else if (self.activeTab == 1) {
            self.diplayChart();
            self.$vs.loading.close(self.$refs.reload.$el);
            self.isMounted = false;
          }
          self.tankInfo = response.data;
        }
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.Tanks.$el);
        if (self.activeTab == 0) {
          self.$vs.loading.close(self.$refs.gridTable.$el);
        }
        else if (self.activeTab == 1) {
          self.$vs.loading.close(self.$refs.reload.$el);
        }
      };

      //self.$ajaxGet(self, `QuickViewATG/GetQuickViewATG/${type}`,  onSuccess, onFinally);
      self.$ajaxGet(self, 'QuickViewATG/GetQuickViewATG_EF?type=' + type, onSuccess, onFinally);
    },
    color(tr) {
      if ((tr.volume / tr.capacity) * 100 < 30) {
        return 'rgb(255, 174, 174)';
      }
      else if (((tr.volume / tr.capacity) * 100 >= 30) && ((tr.volume / tr.capacity) * 100 <= 60)) {
        return 'rgb(255, 224, 174)';
      }
      else {
        return 'rgb(153, 255, 153)';
      }
    },
    displayLineChart() {

      var self = this;
      self.isEmpty = false;
      // self.showLoadingOnElement("linechartdiv", 1, "radius");
      var onSuccess = function (response) {
        self.isInfoHiddenChart = false;
        self.famsDBData = response.data;
        // self.$vs.loading.close(self.$refs.linechartdiv.$el);
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.chartButton.$el);
        self.successNotifyDataLoad();
        if (self.famsDBData.length > 0) {
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

          // axis ranges\


        } else {
          self.isEmpty = true;
        }
      };

      var myobject = {};
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

      // self.$ajaxGet(
      //   self,
      //   `FAMSlegacy/GetTankHistory?&accountID=${localStorage.getItem(
      //     "userAccountId"
      //   )}&id=${self.tankId}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`,
      //   onSuccess,
      //   onFinally
      // );
    },
    formatDate(pad, dateTime) {
      if (typeof dateTime === 'undefined')
        return pad;

      return (pad + dateTime).slice(-pad.length);
    },

    formatDateMoment: function (value) {
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
    dateWithTime(date, index) {
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
      var t = [hours, minutes, seconds].join(':');
      return dt = [dt, t].join(' ');
    },
    diplayChart() {
      var self = this;
      am4core.useTheme(am4themes_animated);
      for (var index = 0; index < self.tankData.length; index++) {
        var chart = am4core.create(`chartdiv${index}`, am4charts.XYChart3D);

        // let title = chart.titles.create();
        // title.text = "Sales, $M";
        // title.fontSize = 12;
        // title.tooltipText = "Sales in millions of US$ during selected period";

        chart.data = self.tankData.filter((item, indexx) => indexx == index);
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

        //      series1.columns.template.tooltipText = "{categoryX}:" + self.tankData[index].volume +" L ; {valueY}%";
        series1.columns.template.tooltipText = "{categoryX} : " + self.tankData[index].volume + " L";

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
        series2.columns.template.tooltipText = "Tank Ullage : " + self.tankData[index].ullage + " L";
      }
    },
    toolbarClick(args) {
      switch (args["item"].text) {
        case "PDF Export":
          //this.grid.showSpinner();
          this.grid.pdfExport({ fileName: "new.pdf" });
          break;
        case "Excel Export":
          //this.grid.showSpinner();
          this.grid.excelExport({ fileName: "new.xlsx" });
          break;
        case "CSV Export":
          //this.grid.showSpinner();
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
        //const data = this.formatJson(this.headerVal, list)
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
        //const data = this.formatJson(this.headerVal, list)
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
      // newElement.innerHTML = "ref='grid'";
      p.appendChild(newElement);
    },
    clearFields() {
      (this.filename = ""),
        (this.cellAutoWidth = true),
        (this.selectedFormat = "csv");
    },
    getTankHistory() {
      const self = this;
      self.clearFields();
      self.populateData();
      self.showLoadingOnElement("gridButton", 0.45, "radius");
      var onSuccess = function (response) {
        self.isInfoHidden = false;
        self.famsDBData = response.data;
        //Grid.Inject(Page);
        self.grid = new Grid({
          excelExportComplete: "excelExportComplete",
          pdfExportComplete: "pdfExportComplete",
          allowPaging: true,
          allowExcelExport: true,
          allowSorting: true,
          selectionSettings: self.selectionOptions,
          pageSettings: self.pageSettings,
          // rowSelected: self.rowSelected,
          scrollSettings: { width: 886, height: 300 },
          // formatSettings: [{ name: 'date', format: 'yyyy-MM-dd hh:mm:ss', type: 'date' }],
          toolbar: ["ExcelExport", "CsvExport", "Print", 'Search'],
          toolbarClick: self.toolbarClick,
          dataSource: self.famsDBData,
          columns: self.localColforGrid,
        });
        self.flag = false;
        self.grid.appendTo("#Grid");
        self.grid.refresh();
        self.isDone = true;
        //this.grid.dataSource = this.famsDBData;

      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridButton.$el);
        self.successNotifyDataLoad();
      };
      var myobject = {};
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
      // self.$ajaxGet(
      //   self,
      //   `FAMSlegacy/GetTankHistory?&accountID=${localStorage.getItem(
      //     "userAccountId"
      //   )}&id=${self.tankId}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`,
      //   onSuccess,
      //   onFinally
      // );
    },
    am4themes_chartTheme(target) {
      if (target instanceof am4core.ColorSet) {
        target.list = [
          am4core.color("#0098E7"),
          am4core.color("#C91C04"),
          am4core.color("#6524FF"),
          am4core.color("#459B02")
        ];
      }
    },
    popupHistoryView(id) {
      var self = this;
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;
      self.tankId = id;
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    popupInformation(id) {
      var self = this;
      self.showLoadingOnElement("gpsInfo", 0.65, "radius");
      var onSuccess = response => {
        self.$vs.notify({
          title: "Successfully",
          text: "Information successfully Updated",
          color: "success",
        });
      }

      var onFinally = response => {
        self.$vs.loading.close(self.$refs.gpsInfo.$el);
      }
      self.$ajaxGet(self, `Integration3dtracking/Get3DTrackingTankReading?tankID=${id}`, onSuccess, onFinally);
    },
  },
  mounted() {
    var date = new Date();
    this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.showActive = true;
    this.showAll = false;
    this.activeTab = 0;
    setTimeout(() => {
      this.getTankData();
    }, 1000);
    this.isMounted = true;
  },
};
</script>
<style lang="scss"></style>
<style>
/* @import './ejStyles/material.css'; */
@import "https://cdn.syncfusion.com/ej2/material.css";

#linechartdiv {
  width: 100%;
  height: 500px;
}
</style>
