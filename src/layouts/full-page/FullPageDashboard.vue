<!-- =========================================================================================
  File Name: FullPageDashboard.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="layout--full-page">
    <vs-tabs
      v-model="activeDashTab"
      ref="fullPageDashboard"
      class="vs-con-loading__container"
      style="width: auto min-height:auto"
    >
      <vs-tab label="ATG" style="min-height: auto">
        <component
          :is="scrollbarTag"
          ref="scroller"
          id="scroller"
          @ps-scroll-y="onScroll"
          class="scroll-area--data-list-add-new"
          :settings="settings"
          :key="$vs.rtl"
          suppressScrollX="true"
        >
          <div class="vx-col w-full mb-base">
            <vx-card
              ref="MainCard"
              class="pb-3 vs-con-loading__container"
              title="FAMS Quick ATG View"
            >
              <div class="vx-row">
                <div
                  class="vx-row w-2/5 pl-10 mb-2"
                  style="min-width: 20vw; padding-left: 1vw; bottom: 0.4vw"
                >
                  <label>Select Account: </label>
                  <v-select
                    id="account_dropdown"
                    vs-custom-content
                    vs-trigger-click
                    class="w-1/3 style-chooser vx-navbar-dropdown"
                    ref="accountGroup"
                    style="min-width: 25vw; padding-left: 1vw; bottom: 0.6vw"
                    :options="accountDataList"
                    v-model="accountDropdown"
                    placeholder="All"
                    :on-change="getTankData"
                  >
                  </v-select>
                </div>
                <div class="vx-col w-2/5 mb-2">
                  <vs-checkbox
                    class="float-left"
                    style="width: fit-content"
                    name="cbCrit"
                    v-model="showCrit"
                    >Show Only Criticals
                  </vs-checkbox>
                  <vs-checkbox
                    class="float-left"
                    style="width: fit-content"
                    name="cbGrid"
                    v-model="showGrid"
                    >Grid/Graphics
                  </vs-checkbox>
                  <vs-checkbox
                    class="float-left"
                    style="width: fit-content"
                    name="cbAutoScroll"
                    v-model="scrollable"
                    >Auto Scroll
                  </vs-checkbox>
                </div>
                <div class="vx-col w-1/5 float-right">
                  <vs-checkbox
                    class="float-left"
                    style="width: fit-content"
                    name="cbRefresh"
                    v-model="autoRefresh"
                    >Auto Refresh
                  </vs-checkbox>
                  <vs-button
                    ref="reload"
                    type="filled"
                    color="warning"
                    class="rounded-lg mb-2 "
                    style="bottom: 0.5vw"
                    @click="refresh()"
                    >Reload</vs-button
                  >
                  <vs-button
                    ref="reload"
                    type="filled"
                    color="primary"
                    class="rounded-lg mb-2 "
                    style="bottom: 0.5vw"
                    @click="openPivotPopup()"
                    >Send Email</vs-button
                  >
                </div>
              </div>
              <br />
              <div class="vx-row pb-3" v-show="!showGrid">
                <div
                  class="vx-col xs:w-full sm:w-full md:w-1/2lg:w-1/3 xl:w-1/4 mb-2"
                  style="
                    padding: 10px;
                    background: #eeeeee;
                    border-top: solid white 2px;
                    border-bottom: solid white 2px;
                    border-left: solid white 4px;
                    border-right: solid white 4px;
                  "
                  ref="tanksList"
                  id="tanksList"
                  v-for="(tank, index) in tankInfo"
                  :key="index"
                >
                  <vs-button
                    @click="popupHistoryView(tank.tankID)"
                    class="rounded-lg ml-3"
                    type="filled"
                    >View Historical</vs-button
                  >

                  <div style="height: 500px" :id="`chartdiv${index}`"></div>
                  <div class="pl-3">
                    <b>Product:</b> {{ tank.product }} <br />
                    <b>Dip:</b> {{ tank.mm }} mm <br />
                    <b>Current Level:</b> {{ tank.volume }} Liters <br />
                    <b>Water Level (if applicable):</b> {{ tank.water }} mm
                    <br />
                    <b>Temp (if applicable):</b> {{ tank.temp }} °C <br />
                    <b>Date of reading:</b>
                    {{ tank.createDate.replace("T", " ").split('.')[0] }} <br />
                    <b>Capacity:</b> {{ tank.capacity }} <br />
                  </div>
                </div>
              </div>
              <div class="vx-col w-full mb-base" v-show="showGrid">
                <vs-table
                  ref="gridTable"
                  pagination
                  :max-items="itemsPerPage"
                  search
                  :data="tankInfo"
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
                          >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }}
                          -
                          {{
                            tankInfo.length - currentPage * itemsPerPage > 0
                              ? currentPage * itemsPerPage
                              : tankInfo.length
                          }}
                          of {{ tankInfo.length }}</span
                        >
                        <feather-icon
                          icon="ChevronDownIcon"
                          svgClasses="h-4 w-4"
                        />
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
                    <vs-th sort-key="account">Account</vs-th>
                    <vs-th sort-key="tankName">Tank Name</vs-th>
                    <vs-th sort-key="date">Date of Reading</vs-th>
                    <vs-th sort-key="tankCapacity">Tank Capacity</vs-th>
                    <vs-th sort-key="mm">Dip</vs-th>
                    <vs-th sort-key="l">Current Level</vs-th>
                    <vs-th sort-key="ullage">Ullage</vs-th>
                    <vs-th>View Historical</vs-th>
                  </template>
                  <template slot-scope="{ data }">
                    <vs-tr
                      :data="tr"
                      :key="indextr"
                      v-for="(tr, indextr) in data"
                      :style="'background: ' + color(tr)"
                    >
                      <vs-td :data="tr.accountName">{{ tr.accountName }}</vs-td>
                      <vs-td :data="tr.tankName">{{ tr.tankName }}</vs-td>
                      <vs-td :data="tr.createDate">{{ tr.createDate.replace("T", " ").replace("/", "-").split(".")[0].replace("/", "-") }}</vs-td>
                      <vs-td :data="tr.capacity">{{ tr.capacity }}</vs-td>
                      <vs-td :data="tr.mm">{{ tr.mm }} mm</vs-td>
                      <vs-td :data="tr.volume">{{ tr.volume }} L</vs-td>
                      <vs-td :data="Math.round(tr.capacity - tr.volume)"
                        >{{ Math.round(tr.capacity - tr.volume) }} L</vs-td
                      >
                      <vs-td class="whitespace-no-wrap">
                        <feather-icon
                          icon="MoreHorizontalIcon"
                          ref="history"
                          svgClasses="w-5 h-5 hover:text-success stroke-current"
                          @click.stop="popupHistoryView(tr.tankID)"
                      /></vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
              <vs-popup
                fullscreen
                title="View Historical"
                :active.sync="popupActive"
              >
                <div class="mt-3">
                  <vs-tabs
                    v-model="activeHistoryTab"
                    style="width: auto min-height:500px"
                  >
                    <vs-tab
                      label="Chart"
                      @click="displayLineChart()"
                      style="min-height: 500px"
                    >
                      <h3 v-show="isEmpty">No data for tank</h3>
                      <div>
                        <div
                          id="linechartdiv"
                          ref="linechartdiv"
                          v-show="!isInfoHiddenChart"
                        ></div>
                      </div>
                    </vs-tab>
                    <vs-tab
                      label="Grid"
                      @click="getTankHistory()"
                      style="min-height: 500px"
                    >
                      <vs-button
                        ref="gridButton"
                        class="rounded-lg mt-3 mb-3 vs-con-loading__container"
                        color="warning"
                        type="filled"
                        @click="getTankHistory"
                        >Load Grid</vs-button
                      >
                      <div>
                        <div id="PGridATG" v-show="!isInfoHidden">
                          <div id="fullpageGrid" ref="fullpageGrid"></div>
                        </div>
                      </div>
                    </vs-tab>
                  </vs-tabs>
                </div>
              </vs-popup>
              <vs-popup title="Export Data via email"
                :active.sync="popupPivotActive">
                <div class="vx-col md:w-full w-full mb-5">
                  <div class="m-2">
                    <label class="w-full">Enter receiptients Email (Press Enter to add new email)</label>
                    <vs-chips id="emails" class="vx-col w-full pt-2" placeholder="Add Email" v-model="emailChip" v-validate="'required|email'" name="Email" style="justify">
                      <vs-chip
                        class="glow-effect_primary"
                        :key="chip"
                        @click="removeEmail(chip)"
                        v-for="chip in emailChip"
                        closable>
                        {{ chip }}
                      </vs-chip>
                    </vs-chips>
                  </div>
                  <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
                    @click="sendPivotData()">Save
                  </vs-button>
                  <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closePivotPopup()">Cancel
                  </vs-button>
                </div>
              </vs-popup>
            </vx-card>
          </div>
        </component>
      </vs-tab>
      <vs-tab label="QuickMap" style="min-height: auto">
        <div>
          <dashboardStoreLocator-sidebar
            :isSidebarActive="isStoreLocatorSidebarActive"
            @closeSidebar="toggleDataSidebar"
            :data="sidebarData"
          />

          <div id="app">
            <vs-tabs
              v-model="activeMapTab"
              ref="mapDiv"
              class="vs-con-loading__container"
              style="width: auto min-height:auto"
            >
              <vs-tab label="ATG" @click="getATG()" style="min-height: auto">
                <div id="mapDivATG">
                  <GmapMap
                    :center="center"
                    :zoom="3"
                    map-style-id="roadmap"
                    :options="mapOptions"
                    style="width: 100%; height: 80vh"
                    ref="mapRef"
                    id="mapRef"
                  >
                    <GmapMarker
                      v-for="(m, index) in markers"
                      :key="index"
                      :position="m.position"
                      :clickable="true"
                      :draggable="false"
                      :icon="m.icon"
                      @click="viewSelectedStore(m)"
                    />
                  </GmapMap>
                </div>
              </vs-tab>

              <vs-tab
                label="Fuel Movement"
                @click="getFuelUsage()"
                style="min-height: auto"
              >
                <div
                  id="mapDivFM"
                  ref="mapDiv3"
                  class="vs-con-loading__container"
                >
                  <GmapMap
                    :center="center"
                    :zoom="3"
                    map-style-id="roadmap"
                    :options="mapOptions"
                    style="width: 100%; height: 80vh"
                    ref="mapRef3"
                    id="mapRef3"
                    class="vs-con-loading__container"
                  >
                    <GmapMarker
                      v-for="(m, index) in markers"
                      :key="index"
                      :position="m.position"
                      :clickable="true"
                      :draggable="false"
                      :icon="m.icon"
                      @click="viewSelectedStore(m)"
                    />
                  </GmapMap>
                </div>
              </vs-tab>
            </vs-tabs>
          </div>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
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
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import moment from "moment";
import GoogleMaps from 'google-maps';
import DashboardStoreLocatorSidebar from './DashboardStoreLocatorSidebar.vue';
import Datepicker from "vuejs-datepicker";
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
      toolbarOptions: [ "ExcelExport", "CsvExport"],
      pageSettings: { pageCount: 10 },
      grid: "",
      columns: [],
      activeDashTab: 0,
      activeHistoryTab: 0,
      activeMapTab: 0,
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
      tankId:0,
      isMounted: false,
      selectionOptions: { mode: "Row" },

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
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },

      isEmpty:false,
      isDone:false,
      famsDBData: [],
      // formData: {
      //   fromDate: "",
      //   toDate: "",
      // },
      accountDataList: [],
      accountDropdown: 0,
      showCrit: false,
      showGrid: true,
      scrollable: false,
      refreshInterval: null,
      originalList: [],
      currentTankData: [],
      autoRefresh: false,
      itemsPerPage: 20,
      timer: null,

      center: { lat: 0, lng: 0 },
      mapOptions:{
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      formData: {
        lat: 0,
        long: 0,
        label: "",
        position: {lat: 0, lng: 0},
        icon: "",
        fromDate: "",
        toDate: ""
      },
      markers: [],
      isStoreLocatorSidebarActive: false,
      sidebarData: {},
      sidebarTankInfo: {},
      picked: 0,
      popupViewActive: false,
      popupPivotActive: false,
      emailChip: [],
    };
  },
  provide : {
    grid: [ExcelExport, Page, Group,Selection, Toolbar,Search,Reorder,Sort ]
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    VuePerfectScrollbar,
    GoogleMaps,
    DashboardStoreLocatorSidebar,
  },
  watch: {
    accountDropdown : function(){
      this.getTankData();
    },
    showGrid: function(){
      if(this.showGrid){
        this.isMounted = true;
      }
      else{
        this.isMounted = false;
      }
    },
    autoRefresh: function (val) {
      var self = this;
      if (self.refreshInterval) {
        clearInterval(self.refreshInterval);
      }
      if (val) {
        self.refresh();
        self.refreshInterval = setInterval(function () {
          self.refresh();
        }, 600000);
      }
      else{
        clearInterval(self.refreshInterval);
      }
    },
    showCrit: function (val) {
      var self = this;
      // if(self.showGrid){
        // self.showLoadingOnElement("MainCard", 1, "radius");
      // }
      // else{
        self.showLoadingOnElement("MainCard", 1, "radius");
      // }
      if(val){
        self.showOnlyCrit();

        setTimeout(function(){
          // if(self.showGrid){
            // self.$vs.loading.close(self.$refs.gridTable.$el);
          // }
          // else{
            self.$vs.loading.close(self.$refs.MainCard.$el);
          // }
        },1000);
      }
      else{
        self.tankInfo = self.originalList;
        setTimeout(function(){
          self.diplayChart(self.tankData);
        },1000);

        setTimeout(function(){
          // if(self.showGrid){
            // self.$vs.loading.close(self.$refs.gridTable.$el);
          // }
          // else{
            self.$vs.loading.close(self.$refs.MainCard.$el);
          // }
        },1000);
      }

    },
    activeDashTab: function(val){
      if(val == 0){
        this.getTankData();
      }
      else if(val == 1){
        this.getATG();
      }
    },
    scrollable: function () {
      var self = this;
      if(self.scrollable){
        self.autoScroll(true)
      }
      else{
        self.autoScroll(false);
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
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
    showOnlyCrit(){
      var self = this;

      if(self.showCrit){
        self.tankInfo = self.tankInfo.filter(x => ((x.volume / x.capacity) * 100) < 30);
        self.currentTankData = self.tankInfo.map((item) => {
          return {
            category: item.tankName,
            value1: (item.volume / item.capacity) * 100,
            value2: 100 - (item.volume / item.capacity) * 100,
            max: item.capacity,
            mm: item.mm,
            volume: item.volume,
            ullage: Math.round(item.capacity - item.volume)
          };
        });
        self.diplayChart(self.currentTankData);
      }
      else if(!self.showCrit){
        self.diplayChart(self.tankData);
      }
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    refresh(){
      this.getTankData();
      if(this.showCrit){
        this.showOnlyCrit();
        this.diplayChart(this.currentTankData, this.scrollable);
      }
    },
    getTankData() {
      var self = this;
      var temp = self.scrollable;
      var tempData = [];
      // if(self.showGrid){
        // self.showLoadingOnElement("gridTable", 1, "radius");
      // }
      // else{
        self.showLoadingOnElement("fullPageDashboard", 1, "radius");
      // }

      var onSuccess = function (response) {
        debugger
        if(self.accountDropdown){
          tempData = response.data.filter(x => x.accountID == self.accountDropdown.value);
          self.tankInfo = response.data.filter(y => y.accountID == self.accountDropdown.value);
          self.originalList = response.data.filter(y => y.accountID == self.accountDropdown.value);
        }
        else{
          tempData = response.data;
          self.tankInfo = response.data;
          self.originalList = response.data;
        }

        const startIndex = self.currentPage * self.itemsPerPage;
        const endIndex = startIndex + self.itemsPerPage;

        self.tankData = tempData.slice(startIndex, endIndex).map((item) => {
          return {
            category: item.tankName,
            value1: (item.volume / item.capacity) * 100,
            value2: 100 - (item.volume / item.capacity) * 100,
            max: item.capacity,
            mm: item.mm,
            volume: item.volume,
            ullage: Math.round(item.capacity - item.volume),
            lat: item.lat,
            long: item.long,
            tankID: item.tankID,
            storeName: item.storeName,
            storeID: item.storeID,
          };
        });
      };

      var onFinally = function () {
        self.isMounted = true;
        if(self.showCrit){
          self.showOnlyCrit();
        }
        else{
          self.diplayChart(self.tankData);
        }

        self.scrollable = temp;
        self.$vs.loading.close(self.$refs.fullPageDashboard.$el);
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "FullPageDashboard/GetFullPageATG", onSuccess, onFinally);
    },
    // getTankData() {
    //   var self = this;
    //   var temp = self.scrollable;

    //   if(self.showGrid){
    //     self.showLoadingOnElement("gridTable", 1, "radius");
    //   }
    //   else{
    //     self.showLoadingOnElement("fullPageDashboard", 1, "radius");
    //   }

    //   var onSuccess = function (response) {
    //     if(self.accountDropdown){
    //       self.tankData = response.data.filter(x => x.accountID == self.accountDropdown.value).map((item) => {
    //         return {
    //           category: item.tankName,
    //           value1: (item.volume / item.capacity) * 100,
    //           value2: 100 - (item.volume / item.capacity) * 100,
    //           max: item.capacity,
    //           mm: item.mm,
    //           volume: item.volume,
    //           ullage: Math.round(item.capacity - item.volume),
    //           lat: item.lat,
    //           long: item.long,
    //           tankID: item.tankID,
    //           storeName: item.storeName,
    //           storeID: item.storeID,
    //         };
    //       });
    //       self.tankInfo = response.data.filter(y => y.accountID == self.accountDropdown.value);
    //       self.originalList = response.data.filter(y => y.accountID == self.accountDropdown.value);
    //     }
    //     else{
    //       self.tankData = response.data.map((item) => {
    //         return {
    //           category: item.tankName,
    //           value1: (item.volume / item.capacity) * 100,
    //           value2: 100 - (item.volume / item.capacity) * 100,
    //           max: item.capacity,
    //           mm: item.mm,
    //           volume: item.volume,
    //           ullage: Math.round(item.capacity - item.volume),
    //           lat: item.lat,
    //           long: item.long,
    //           tankID: item.tankID,
    //           storeName: item.storeName,
    //           storeID: item.storeID,
    //         };
    //       });
    //       self.tankInfo = response.data;
    //       self.originalList = response.data;
    //     }
    //   };

    //   var onFinally = function () {
    //     if(self.showCrit){
    //       self.showOnlyCrit();
    //     }
    //     else{
    //       self.diplayChart(self.tankData);
    //     }

    //     self.scrollable = temp;
    //     self.$vs.loading.close(self.$refs.fullPageDashboard.$el);
    //     self.$vs.loading.close(self.$refs.gridTable.$el);
    //   };
    //   self.$ajaxGet(self, "FullPageDashboard/GetFullPageATG", onSuccess, onFinally);
    // },
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

        }else{
          self.isEmpty = true;
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

      // self.$ajaxGet(
      //   self,
      //   `FAMSlegacy/GetTankHistory?&accountID=${localStorage.getItem(
      //     "userAccountId"
      //   )}&id=${self.tankId}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`,
      //   onSuccess,
      //   onFinally
      // );
    },
    formatDate(pad, dateTime)
    {
      if (typeof dateTime === 'undefined')
        return pad;

      return (pad + dateTime).slice(-pad.length);
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
    diplayChart(data) {
      var self = this;

      am4core.useTheme(am4themes_animated);
      for (var index = 0; index < data.length; index++) {
        var chart = am4core.create(`chartdiv${index}`, am4charts.XYChart3D);

        // let title = chart.titles.create();
        // title.text = "Sales, $M";
        // title.fontSize = 12;
        // title.tooltipText = "Sales in millions of US$ during selected period";

        chart.data = data.filter((item, indexx) => indexx == index);
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
        series1.columns.template.tooltipText = "{categoryX} : " + data[index].volume +" L";

        if (data[index].value1 < 30) {
          series1.columns.template.strokeWidth = 2;
          series1.columns.template.fill = am4core.color("#FF6961");
          series1.columns.template.stroke = am4core.color("#FF6961");
        } else if (
          data[index].value1 >= 30 &&
          data[index].value1 <= 60
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
        series2.columns.template.tooltipText = "Tank Ullage : " + data[index].ullage +" L";
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
      self.showLoadingOnElement("fullpageGrid", 1, "radius");
      self.clearFields();
      setTimeout(function(){
        self.populateData();
      },500);
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;
      var onSuccess = function (response) {
        self.isInfoHidden = false;
        self.famsDBData = response.data;
          //Grid.Inject(Page);
          self.grid = new Grid({
            excelExportComplete: "excelExportComplete",
            pdfExportComplete: "pdfExportComplete",
            allowPaging: true,
            allowExcelExport: true,
            allowSorting:true,
            selectionSettings: self.selectionOptions,
            pageSettings: self.pageSettings,
            // rowSelected: self.rowSelected,
            scrollSettings: { width: 886, height: 300 },
            // formatSettings: [{ name: 'date', format: 'yyyy-MM-dd hh:mm:ss', type: 'date' }],
            toolbar: ["ExcelExport", "CsvExport", "Print",'Search'],
            toolbarClick: self.toolbarClick,
            dataSource: self.famsDBData,
            columns: self.localColforGrid,
          });
          self.flag = false;
          self.grid.appendTo("#fullpageGrid");
          self.grid.refresh();
          self.isDone = true;
          //this.grid.dataSource = this.famsDBData;

          self.$vs.loading.close(self.$refs.fullpageGrid.$el);
      };
      var onFinally = function () {
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

      if(this.activeHistoryTab == 0){
        self.displayLineChart();
      }
      else{
        self.getTankHistory();
      }
    },
    getTab(id){
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;

      if(this.activeHistoryTab == 0){
        this.displayLineChart();
      }
      else if(this.activeHistoryTab == 1){
        this.getTankHistory();
      }
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    getDropdownAccountList() {
      var self = this;
      var onSuccess = function (response) {
        self.accountDataList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(
        self,
        "FullPageDashboard/GetAccountsDropdown",
        onSuccess,
        onFinally
      );
    },
    color(tr){
      if((tr.volume / tr.capacity) * 100 < 30){
        return 'rgb(255, 174, 174)';
      }
      else if(((tr.volume / tr.capacity) * 100 >= 30) && ((tr.volume / tr.capacity) * 100 <= 60)){
        return 'rgb(255, 224, 174)';
      }
      else{
        return 'rgb(153, 255, 153)';
      }
    },
    autoScroll(val){
      var element = document.getElementById("scroller");

      if(val){
        this.timer = setInterval(function(){
          if((element.clientHeight + element.scrollTop) >= element.scrollHeight){
            element.scrollTo(0, 0);
          }
          else
          {
            element.scrollBy(0, 1, 'smooth');
          }
        } , 50);
      }
      else{
        clearInterval(this.timer);
      }
    },
    onScroll(){
      if(this.scrollable){
        this.scrollable = false;
      }
    },
    clear(){
      this.initValues();
      switch(this.activeMapTab){
        case 0:
          this.getATG();
          break;
        case 1:
          this.getFuelUsage();
          break;
      }
    },
    getIcons(value){
      try {
        if(value < 30){
          return "https://iconsplace.com/wp-content/uploads/_icons/ff6961/256/png/database-icon-256.png";
        }
        else if(value >= 30 && value <= 60){
          return "https://iconsplace.com/wp-content/uploads/_icons/ffc356/256/png/database-icon-256.png";
        }
        else{
          return "https://iconsplace.com/wp-content/uploads/_icons/87dd7a/256/png/database-icon-256.png";
        }
      } catch (e) {
        return null;
      }
    },
    getATG() {
      const self = this;
      self.initValues();
      setTimeout(function(){
        self.showLoadingOnElement("mapDiv", 1, "radius");
        var onSuccess = function(response) {
          if(!response.data.length == 0){
            for(var i = 0; i < response.data.length; i++)
            {
              if(self.markers.filter(x=>x.storeID == response.data[i].storeID).length > 0) continue
              var allTanksForThisStore = response.data.filter(x=>x.storeID == response.data[i].storeID);

              self.markers.push({
                picked: self.activeMapTab,
                position: { lat: parseFloat(response.data[i].lat), lng: parseFloat(response.data[i].long) },
                title: response.data[i].tankName,
                icon: {
                  url: self.getIcons(Math.min.apply(Math,allTanksForThisStore.map(x=>(x.volume / x.capacity)*100))),
                  scaledSize:  new google.maps.Size(22,25)
                },
                tankData: allTanksForThisStore.map((item) => {
                  return {
                    category: item.tankName,
                    value1: (item.volume / item.capacity) * 100,
                    value2: 100 - (item.volume / item.capacity) * 100,
                    max: item.capacity,
                    mm: item.mm,
                    volume: item.volume,
                    ullage: Math.round(item.capacity - item.volume),
                    lat: item.lat ? parseFloat(item.lat) : 0,
                    long: item.long ? parseFloat(item.long) : 0,
                    tankID: item.tankID,
                    storeName: item.storeName,
                    storeID: item.storeID,
                  };
                }),
                storeName: response.data[i].storeName,
                storeID: response.data[i].storeID,
                tankInfo: response.data
              });
            }
            self.center = self.markers[0].position;
            return self.markers;
          }
          else{
            self.FailedCustomNotify("No Valid Store Locations Found");
          }

        };
        var onFinally = function() {
          setTimeout(function(){
            self.$vs.loading.close(self.$refs.mapDiv.$el);
          },1000);

        };
        self.$ajaxGet(
          self,
          "FullPageDashboard/GetFullPageATG",
          onSuccess,
          onFinally
        );
      },100)
    },
    showMap(){
      this.mapVisible = true;
      this.popupActive = true;
    },
    toggleDataSidebar(val){
        if (val)
        this.isStoreLocatorSidebarActive = true;
        else{
          this.isStoreLocatorSidebarActive = false;
          this.clear();
        }
    },
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Warning',
        text: msg,
        color: 'warning'
      })
    },
    initValues()
    {
      this.formData.lat = 0;
      this.formData.long = 0;
      this.formData.label = "";
      this.formData.position = {lat: 0, lng: 0};
      this.center = {lat: 0, lng: 0};
      this.zoomControl
      this.markers = [];
      this.sidebarTankInfo = {};
      this.popupViewActive = false;
    },
    getFuelUsage(){
      const self = this;
      self.initValues();
      self.showLoadingOnElement("mapDiv", 1, "radius");
      let details = `&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`
      self.popupViewActive = false;
      var onSuccess = function(response) {
        if(!response.data.length == 0){
          for(var i = 0; i < response.data.length; i++)
          {
            if(self.markers.filter(x=>x.storeID == response.data[i].sid).length > 0) continue

            var allFuelUsageForThisStore = response.data.filter(x=>x.sid == response.data[i].sid);

            self.markers.push({
              picked: self.activeMapTab,
              position: { lat: parseFloat(response.data[i].lat), lng: parseFloat(response.data[i].long) },
              title: response.data[i].tankName,
              icon: {
                url: "https://icon-library.net/images/fuel-pump-icon/fuel-pump-icon-15.jpg",
                scaledSize:  new google.maps.Size(22,25)
              },
              tankData: allFuelUsageForThisStore.map((item) => {
                return {
                  pid: item.pid,
                  sid: item.sid,
                  product: item.product,
                  lat: item.lat,
                  long: item.long,
                  volume: item.volume,
                  storeName: item.store,
                  storeID: item.sid,
                  fromDate: item.fromDate,
                  toDate: item.toDate
                };
              }),
              storeName: response.data[i].store,
              storeID: response.data[i].sid,
              tankInfo: response.data
            });
          }
          self.center = self.markers[0].position;
          return self.markers;
        }
        else{
          self.FailedCustomNotify("No Fuel Dispensing Details Found");
        }

      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.mapDiv.$el);
      };
      self.$ajaxGet(
        self,
        `FullPageDashboard/GetFuelMovementPerUser?${details}`,
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
		viewSelectedStore(data){
			this.sidebarData = data;

      this.toggleDataSidebar(true);
		},
    sendPivotData(){
      var self = this;

      var blankEmail = self.emailChip.filter(item => {
        return item == "";
      });

      if((blankEmail.length > 0 && self.emailChip.length > 0) || self.emailChip.length == 0){
        self.FailedCustomNotify("No Emails or Blank Email found");
      }
      else{
        self.$validator.validateAll().then((result) => {
          if (result) {
            var emails = self.emailChip.join(';');
            console.log(self.emailChip);
            console.log(emails);

            var obj = {
              Name: "Hennie",
              "Email Recipient": emails,
              Title: "DummyEmail"
            }
            var toSend = self.tankInfo.map((item) => {
              return {
                  capacity: item.capacity,
                  createDate: item.createDate,
                  mm: item.mm,
                  product: item.product,
                  store: item.store,
                  tankName: item.tankName,
                  temp: item.temp,
                  volume: item.volume,
                  water: item.water
              }
            });

            var data = JSON.stringify(toSend);
            var object = {
              subject: "Test Email",
              message: "This is a test message to see if this email works fine.",
              objectValues: obj,
              jsondata: JSON.stringify(toSend)
            };
            // Send POST request to the API

            var onSuccess = function(response) {
              console.warn(response)
              self.closePivotPopup();
            };
            var onFinally = function() {

            };
            self.$ajaxPost(
              self,
              `Subscription/SendJsonEmail`,
              object,
              onSuccess,
              onFinally
            );
          }
          else {
            self.FailedCustomNotify(self.$validator.errors.items[0].msg);
          }
        });
      }
    },
    openPivotPopup(){
      var self = this;
      self.emailChip = [];
      self.popupPivotActive = true;

    },
    closePivotPopup(){
      var self = this;
      self.emailChip = [];
      self.popupPivotActive = false;
    },
    removeEmail(chip) {
        this.emailChip.splice(this.emailChip.indexOf(chip), 1)
    },
  },
  mounted() {
    var date = new Date();
    this.formData.fromDate =  new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getDropdownAccountList();
    this.getTankData();
    // this.pivotData();
    // this.isMounted = true;
  },
};
</script>
<style lang="scss">
.ps__scrollbar-x-rail {
  display: none !important;
}

.scroll-area--data-list-add-new {
  height: 100vh;

  &:not(.ps) {
    overflow-y: auto;
  }
}

.yellow {
  background-color: "rgb(253, 253, 74)";
}

.green {
  background-color: "rgb(135, 221, 122)";
}

.red {
  background-color: "rgb(255, 105, 97)";
}
</style>
<style>
/* @import './ejStyles/material.css'; */
@import "https://cdn.syncfusion.com/ej2/material.css";

#linechartdiv {
  width: 100%;
  height: 500px;
}
</style>
