<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center greet-user w-full" style="height: 350px !important;">
          <div class="fb-like-box-container facebook-like-widget-2 fb_reset" id="fb-root">
            <div class="fb-page fb_iframe_widget" data-href="https://www.facebook.com/FAMS-160637564627126/"
              data-original-width="500" data-width="500" data-adapt-container-width="true" data-small-header="false"
              data-height="320" data-hide-cover="false" data-show-facepile="false" data-tabs="timeline"
              fb-xfbml-state="rendered"
              fb-iframe-plugin-query="adapt_container_width=true&amp;app_id=&amp;container_width=500&amp;height=320&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FFAMS-160637564627126%2F&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=false&amp;small_header=true&amp;tabs=timeline&amp;width=1000">
              <span style="vertical-align: bottom; width: 500px; height: 320px;">
                <iframe name="f29da879ffe371" width="500px" height="320px" data-testid="fb:page Facebook Social Plugin"
                  title="fb:page Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true"
                  scrolling="no" allow="encrypted-media"
                  src="https://www.facebook.com/v8.0/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df2ca68365c2f768%26domain%3Dwww.fams.co.za%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.fams.co.za%252Ff3fd5d5a65c0714%26relation%3Dparent.parent&amp;container_width=500&amp;height=320&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FFAMS-160637564627126%2F&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=false&amp;small_header=true&amp;tabs=timeline&amp;width=500"
                  style="border: none; visibility: visible; width: 500px; height: 320px;" class="">
                </iframe>
              </span>
            </div>
          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/2 mb-base" id="sub">
        <vx-card class="vs-con-loading__container" title="Subscription Remaining" ref="subs"
          style="max-height:350px !important; background-image: linear-gradient(to left top, #ffd981, #ffd4b2, #ffdee5, #fff0ff, #ffffff);">
          <vx-tooltip class="flex" text="Reload">
            <feather-icon icon="RefreshCcwIcon" svgClasses="w-6 h-6 hover:text-primary stroke-current"
              @click.stop="GetSubscriptions()" />
          </vx-tooltip>
          <div id="subsdiv">
            <vs-table ref="gridTable" id="gridTable" v-model="selected" :data="subscriptions"
              class="vs-con-loading__container" style="overflow: scroll; height: 300px">
              <template slot="thead">
                <vs-th>Subscription Title</vs-th>
                <vs-th>Subscription Type</vs-th>
                <!-- <vs-th>Subscription Info</vs-th> -->
                <vs-th>Subscription Interval</vs-th>
                <vs-th>Subscription Remaining (Days)</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.subscriptionName">{{ tr.subscriptionName }}</vs-td>
                  <vs-td :data="tr.subscriptionType">{{ tr.subscriptionType }}</vs-td>
                  <!-- <vs-td :data="tr.tableName">{{tr.tableName}}</vs-td> -->
                  <vs-td :data="tr.subscriptionInterval">{{ tr.subscriptionInterval }}</vs-td>
                  <vs-td :style="getColor(tr)" :data="tr.dayRemaining">{{ tr.dayRemaining }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 mb-base" id="hideFuel">
        <vx-card class="vs-con-loading__container" ref="loadFuel" title="FAMS Analytics (Dispensing only)"
          style="background-image: linear-gradient(to top, #e0d2b9, #f2d9cf, #f8e5e7, #f9f2f7, #ffffff); height:440px;">
          <!-- <vx-tooltip text="Show Report"> -->
            <feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
              @click.stop="PBISelected()" />
            <label style="margin-left: 5px;">Click To Enlarge</label>
          <!-- </vx-tooltip> -->
          <div style="height: 35vh;" id="container2" ref="container2"></div>
          <!-- <div id="fuelusageprev">
          </div> -->
          <vs-popup fullscreen class="calendar-event-dialog" title=""
            :active.sync="activePromptShowReport">
            <div>
              <vx-card id="reportPowerbiCard" ref="reportInfo">
                <div class="vx-row">
                  <vs-spacer></vs-spacer>
                  <div class="vx-col">

                  </div>
                </div>
                <div class="vx-row px-4 pb-3">
                  <div class="vx-col flex-1">
                    <h1><span>FAMS Analytics (Dispensing only)</span></h1>
                    <vs-spacer></vs-spacer>
                    <h3><span>{{ "(Token valid - " + resultInMinutes + " mins!)" }}</span></h3>
                  </div>
                  <div class="vx-col flex-2">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="cancelReportViewer">Close</vs-button>
                  </div>
                </div>
                <vs-divider class="mb-6 pt-0"></vs-divider>
                <div style="height:78vh; width:80vw" id="container" ref="container"></div>

              </vx-card>
            </div>
          </vs-popup>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/2 mb-base" id="calendar">
        <vx-card class="vs-con-loading__container"
          style="background-image: linear-gradient(to top, #e0d2b9, #f2d9cf, #f8e5e7, #f9f2f7, #ffffff);">
          <div class="vx-card no-scroll-content" style="height:400px">
            <calendar-view ref="calendar" id="calendarView" :displayPeriodUom="calendarView" :show-date="showDate"
              :events="myEvents" :eventTop="windowWidth <= 400 ? '2rem' : '1.5rem'" eventBorderHeight="0px"
              eventContentHeight="0.5rem" class="theme-default vs-con-loading__container"
              @click-event="getViewCalendarDetail" style="height: 100px;">

              <div slot="header" class="mb-4">
                <h3 class="mb-3">FAMS Quick Calendar View - Fuel Movement</h3>
                <div class="vx-row mt-3">
                  <div class="vx-col">
                    <div class="flex items-center">
                      <feather-icon :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'" @click="updateMonth(-1)"
                        svgClasses="w-5 h-5 m-1" class="cursor-pointer bg-primary text-white rounded-full" />

                      <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate | month }}</span>

                      <feather-icon :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'" @click="updateMonth(1)"
                        svgClasses="w-5 h-5 m-1" class="cursor-pointer bg-primary text-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </calendar-view>
          </div>

          <vs-popup fullscreen class="calendar-event-dialog" title="Dispensing Grid" :active.sync="activePromptAddEvent">
            <div id="CPGrid">
              <div id="Grid" ref="grid"></div>
            </div>
          </vs-popup>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/4 mb-base" id="fuelMove">
        <vx-card class="vs-con-loading__container" :title="formData.fuelMovementTotal" ref="fuelLoad"
          style="background-image: linear-gradient(to left top, #ffd981, #ffd4b2, #ffdee5, #fff0ff, #ffffff);">
          <div id="chartdiv"></div>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/4 mb-base" id="top5Hide1">
        <vx-card class="vs-con-loading__container" ref="top5Load1" title="Top 5 Equipment usage per month"
        style="background-image: linear-gradient(to left top, #89cff0, #b2d9f8, #d4e3fb, #edf0fd, #ffffff);">
          <div id="horizontalbar"></div>
        </vx-card>
      </div>
      <!-- Change Hier -->
      <div class="vx-col w-full lg:w-1/4 mb-base" id="top5Hide2">
        <vx-card class="vs-con-loading__container" ref="top5Load2" title="Top 5 Equipment usage per Driver"
          style="background-image: linear-gradient(to left top, #89cff0, #b2d9f8, #d4e3fb, #edf0fd, #ffffff);">
          <div id="eqpdriver"></div>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/4 mb-base" id="top5Hide3">
        <vx-card class="vs-con-loading__container" ref="top5Load3" title="Top 5 Equipment usage per Fuel Attendant"
          style="background-image: linear-gradient(to left top, #89cff0, #b2d9f8, #d4e3fb, #edf0fd, #ffffff);">
          <div id="eqpfuel"></div>
        </vx-card>
      </div>
    </div>
    <vs-popup title="Notice" class="w-full pt-4 pb-4" id="popupSubs" :active.sync="showPopup">
      <div id="PMessage">
        <div id="MessagePopup" ref="popupMessage">
          <h4 style="text-align: left" v-if="noSubs">
            <p>Prices for Subscriptions.<br /><br /></p>
          </h4>
          <h4 style="text-align: left" v-else>
            <p>Subscriptions for Account: {{ accountName }}.<br /><br /></p>
          </h4>
          <div id="subsPopupdiv" v-if="noSubs">
            <vs-table ref="gridTable" id="gridTable" v-model="selected" :data="subscriptionPricing"
              class="vs-con-loading__container" style="overflow: scroll; height: 300px">
              <template slot="thead">
                <vs-th>Subscription Title</vs-th>
                <vs-th>Subscription Price</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.subName">{{ tr.subName }}</vs-td>
                  <vs-td :data="tr.subPrice">R {{ tr.subPrice }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div id="subsPopupdiv" v-else>
            <vs-table ref="gridTable" id="gridTable" v-model="selected" :data="subscriptions"
              class="vs-con-loading__container" style="overflow: scroll; height: 300px">
              <template slot="thead">
                <vs-th>Subscription Title</vs-th>
                <vs-th>Subscription Type</vs-th>
                <vs-th>Subscription Interval</vs-th>
                <vs-th>Subscription Remaining (Days)</vs-th>
                <vs-th>Subscription Price</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.subscriptionName">{{ tr.subscriptionName }}</vs-td>
                  <vs-td :data="tr.subscriptionType">{{ tr.subscriptionType }}</vs-td>
                  <vs-td :data="tr.subscriptionInterval">{{ tr.subscriptionInterval }}</vs-td>
                  <vs-td :style="getColor(tr)" :data="tr.dayRemaining">{{ tr.dayRemaining }}</vs-td>
                  <vs-td :data="tr.price">R {{ tr.price }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div>
            <vs-checkbox class="float-left mt-5" style="width: fit-content" name="cbPopup" v-model="stopPopup">Don't show
              again</vs-checkbox>
            <vs-button class="rounded-lg mr-2 mt-2" color="green" style="float: left" type="filled"
              @click="savePref()">Save</vs-button>
            <vs-button class="rounded-lg mr-2 mt-2 vs-con-loading__container" ref="submitButon" color="rgb(0,150, 255)"
              style="float: left" type="filled" @click="requestInvoice()">Request Invoice</vs-button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <vs-button class="rounded-lg mr-2 mt-2" color="black" style="float: right" type="filled"
            @click="closePopup()">Close</vs-button>
        </div>
      </div>
    </vs-popup>
    <vs-popup title="View Notification" class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="showNotification">
      <div id="PMessage">
        <div id="MessagePopup" ref='popupMessage'>
          <h5 v-html="messageToDisplay" style="text-align: left; "></h5>
        </div>
        <div>
          <vs-checkbox class="float-left mt-5" style="width: fit-content" name="cbPopup" v-model="markAsRead">Mark As
            Read</vs-checkbox>
          <vs-button class="rounded-lg mr-2 mt-2" color="black" style="float: right" type="filled"
            @click="closeMessagePopup()">Close</vs-button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "./ui-elements/card/analyticsData.js";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";
import VxTimeline from "@/components/timeline/VxTimeline";
import moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import moduleCalendar from '@/store/calendar/moduleCalendar.js';
import Datepicker from "vuejs-datepicker";
import * as pbi from "powerbi-client";

require('vue-simple-calendar/static/css/default.css');
import {
  GridPlugin,
  Grid,
  PdfExport,
  Aggregate,
  ExcelExport,
  Page,
  RowDD,
  Selection,
  Group,
  Toolbar,
  Search,
  Sort,
  Filter,
} from "@syncfusion/ej2-vue-grids";
am4core.useTheme(am4themes_animated);
Grid.Inject(Sort, Search, Aggregate, Page, Toolbar, PdfExport, ExcelExport);
export default {
  data() {
    return {
      fromDate: "",
      toDate: "",
      details: "",
      userName: "",
      fuelmovementData: {},
      fuelmovementDataDetail: {},
      formData: {
        fuelMovementTotal: "",
        fuelMovementTotalLabel: "",
        fuelMovementTotalDetail: "",
      },
      series: [{ name: [], data: [] }],
      fuelMovementChartData: {
        fuelMovementAmountForToday: 0,
        series: [
          {
            data: [],
            name: "Fuel Movement",
          },
        ],
      },
      sessionsData: {},
      customersData: {},
      checkpointReward: {},
      subscribersGained: {},
      ordersRecevied: {},
      salesBarSession: {},
      supportTracker: {},
      productsOrder: {},
      salesRadar: {},

      timelineData: [
        {
          color: "primary",
          icon: "PlusIcon",
          title: "Client Meeting",
          desc: "Bonbon macaroon jelly beans gummi bears jelly lollipop apple",
          time: "25 mins Ago",
        },
        {
          color: "warning",
          icon: "MailIcon",
          title: "Email Newsletter",
          desc: "Cupcake gummi bears soufflé caramels candy",
          time: "15 Days Ago",
        },
        {
          color: "danger",
          icon: "UsersIcon",
          title: "Plan Webinar",
          desc: "Candy ice cream cake. Halvah gummi bears",
          time: "20 days ago",
        },
        {
          color: "success",
          icon: "LayoutIcon",
          title: "Launch Website",
          desc:
            "Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.",
          time: "25 days ago",
        },
        {
          color: "primary",
          icon: "TvIcon",
          title: "Marketing",
          desc: "Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.",
          time: "28 days ago",
        },
      ],
      fuelMovementForThisMonth: [],
      fuelMovementForPrevMonths: [],
      fuelMovementForMonthChart: [],
      analyticsData: analyticsData,
      dispatchedOrders: [],
      //auditLog:[],

      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      labelLocal: 'none',
      dispensingData: [],

      url: '',
      calendarView: 'month',
      myEvents: [],

      activePromptAddEvent: false,
      activePromptShowReport: false,
      activePrompt3EditEvent: false,
      flag: true,
      localColforGrid: [
        {
          field: "accountID",
          headerText: "accountID",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number"
        },
        {
          field: "day",
          headerText: "day",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number"
        },
        {
          field: "month",
          headerText: "month",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number"
        },
        {
          field: "year",
          headerText: "year",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number"
        },
        {
          field: "eqpTag",
          headerText: "eqpTag",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string"
        },
        {
          field: "dateOnly",
          headerText: "dateOnly",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string"
        },
        {
          field: "allocation1",
          headerText: "allocation1",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string"
        },
        {
          field: "allocation2",
          headerText: "allocation2",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string"
        },
        {
          field: "allocation3",
          headerText: "allocation3",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string"
        },
        {
          field: "allocation4",
          headerText: "allocation4",
          textAlign: "Left",
          width: 150,
          visible: false,
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
      pageSettings: { pageCount: 20 },
      aggregateColumn: [],
      aggregate: null,
      toolbar: ['ExcelExport', 'CsvExport', 'Print', 'Search'],
      itemsPerPage: 10,
      subscriptions: [],
      selected: [],
      isMounted: false,
      showPopup: false,
      subscriptionPricing: [],
      stopPopup: false,
      noSubs: false,
      accountName: "",
      unreadNotifications: [],
      showNotification: false,
      idSpecific: 0,
      messageToDisplay: "",
      lastNtf: {},
      markAsRead: false,
      genericReport: {},
      resultInMinutes : 0,
      accesstoken:"",
      mtoken : "",
      mid: "",
      mreport: "",
    };
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline,
    Datepicker,
    CalendarView,
    CalendarViewHeader,
  },
  mounted() {
    const self = this;
    var date = new Date();
    self.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    self.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var today = new Date();
    self.formData.fuelMovementTotalLabel =
      "Fuel Movement for " +
      self.dateFormatMonth(new Date(today.getFullYear(), today.getMonth(), 1));

    self.details = `&clientKey=${localStorage.getItem(
      "userKey"
    )}&accountkey=${localStorage.getItem(
      "userAccountKey"
    )}&fromdate=${self.dateFormat(self.fromDate)}&todate=${self.dateFormat(
      self.toDate
    )}`;
    if (localStorage.userName) {
      self.userName = localStorage.userName;
    }
    self.accountName = localStorage.userAccount;
    self.GetSubscriptions();
    self.isMounted = true;
    self.GetFuelMovementforMonth();
    self.GetFuelMovementforMonthChart();
    self.getUsagePerEquipment();
    self.getUsagePerDriver();
    self.getUsagePerFuelAttendant();
    self.getUsageMonths();
    self.GetReportUrl();
    // self.PBISelectedMini();
    //self.getPricing();
    //this.getAuditLog();
    self.logUser();

    var d = new Date(date.getFullYear(), date.getMonth(), 1);
    var j = self.dateFormat(d);
    self.getViewCalendar(j);
    // self.getNotification();

  },
  provide: {
    grid: [
      PdfExport,
      ExcelExport,
      Page,
      Group,
      Selection,
      Toolbar,
      Search,
      Sort,
    ],
  },
  watch: {
    userName(newName) {
      localStorage.userName = newName;
    },
    showDate: function (val) {
      this.getViewCalendar(val);
    },
  },
  props: {
    events: { type: Array, default: () => [] },

  },
  computed: {
    validForm() {
      return this.title !== '' && this.startDate !== '' && this.endDate !== '' && Date.parse(this.endDate) - Date.parse(this.startDate) >= 0 && !this.errors.has('event-url')
    },
    disabledDatesTo() {
      return { to: new Date(this.startDate) }
    },
    disabledDatesFrom() {
      return { from: new Date(this.endDate) }
    },
    calendarLabels() {
      return this.$store.state.calendar.eventLabels
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  methods: {
    showPopupMessage() {
      var self = this;
      self.showPopup = false;
    },
    getPricing() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.subscriptionPricing = response.data;
        self.showFirstTimePopup = localStorage.getItem('homeScreenMessage');

        if (self.showFirstTimePopup == "false") {
          self.showPopup = true;
        }
        else {
          self.getNotification();
        }

      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Subscription/GetSubscriptionPricing",
        onSuccess,
        onFinally
      );
    },
    closePopup() {
      var self = this;
      self.showPopup = false;
    },
    displayFuelThisPrev(data, divName) {
      if (data.length) {
        const self = this;
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create(divName, am4charts.XYChart);

        chart.data = data

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "month";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
          if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
          }
          return dy;
        });

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        valueAxis.fontSize = 0;
        categoryAxis.fontSize = 0;
        valueAxis.visible = false;
        categoryAxis.visible = false;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.grid.template.disabled = true;

        categoryAxis.renderer.cellStartLocation = 0;
        categoryAxis.renderer.cellEndLocation = 1;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "volume";
        series.dataFields.categoryX = "month";
        series.name = "Volume";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";

        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.width = am4core.percent(100);
        series.columns.template.fillOpacity = 0.5;
        series.columns.template.fill = am4core.color("#7266f0");
        series.stroke = am4core.color("#7266f0");


        var series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = "volumeThisMonth";
        series2.dataFields.categoryX = "month";
        series2.name = "VolumeThisMonth";
        series2.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";

        series2.columns.template.column.cornerRadiusTopRight = 10;
        series2.columns.template.column.cornerRadiusTopLeft = 10;
        series2.columns.template.width = am4core.percent(100);
        series2.columns.template.fill = am4core.color("#ff9f43");
        series2.stroke = am4core.color("#ff9f43");
      }
      else {
        var x = document.getElementById("fuelusageprev");
        x.style.display = "none";
      }
      // this.$vs.loading.close(this.$refs.loadFuel.$el);
    },
    displayTopEqp(data, divName, yAxis, color) {
      if (data.length > 0) {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create(divName, am4charts.XYChart);

        chart.data = data;

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = yAxis;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.visible = false;
        categoryAxis.fontSize = 0;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.fontSize = 0;
        valueAxis.visible = false;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "volume";
        series.dataFields.categoryY = yAxis;
        series.stroke = am4core.color(color);
        series.columns.template.fill = am4core.color(color);
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.cornerRadiusBottomRight = 10;
        series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";

        let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        categoryLabel.label.text = "{categoryY}";
        categoryLabel.label.fontSize = 12;
        categoryLabel.label.horizontalCenter = "right";
        categoryLabel.label.dx = -10;
        categoryLabel.label.fill = am4core.color("#fff");

        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "{valueX}";
        valueLabel.label.fontSize = 12;
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dx = 5;
      }
      else {
        if (divName == "horizontalbar") {
          var x = document.getElementById("horizontalbar");
          x.style.display = "none";
        }
        else if (divName == "eqpdriver") {
          var x = document.getElementById("eqpdriver");
          x.style.display = "none";
        }
        else if (divName == "eqpfuel") {
          var x = document.getElementById("eqpfuel");
          x.style.display = "none";
        }
      }
      this.$vs.loading.close(this.$refs.top5Load1.$el);
      this.$vs.loading.close(this.$refs.top5Load2.$el);
      this.$vs.loading.close(this.$refs.top5Load3.$el);
    },
    displayLineChart(data) {
      if (data.length > 0) {
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.data = data;

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.visible = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.visible = false;

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "volume";
        series.dataFields.dateX = "date";
        series.tooltipText = "{volume}";
        series.strokeWidth = 5;

        series.stroke = am4core.color("#fe8c12");
        series.tensionX = 0.77;

        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#fe8c12");

        valueAxis.renderer.grid.template.disabled = true;
        dateAxis.renderer.grid.template.disabled = true;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
        chart.cursor.xAxis = dateAxis;
      }
      else {
        var x = document.getElementById("chartdiv");
        x.style.display = "none";
      }
      this.$vs.loading.close(this.$refs.fuelLoad.$el);
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    successLoadFuelMovement() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully loaded",
        color: "success",
      });
    },
    dateFormatMonth(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM");
      }
    },

    dateFormat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },

    GetFuelMovementforMonth() {
      const self = this;
      let famsURL = `Get_Overview?${self.details}`;
      // self.showLoadingOnElement("card2", 1, "radius");
      var onSuccess = function (response) {
        self.formData.fuelMovementTotal = "Fuel Movement: " + response.data.map((item) => item.volume) + " L";
        self.successLoadFuelMovement();
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "QuickViewDispensing/" + famsURL,
        onSuccess,
        onFinally
      );
    },
    getUsageMonths() {
      const self = this;
      // self.showLoadingOnElement("loadFuel", 1, "radius");
      // self.showLoadingOnElement("card2", 1, "radius");
      var onSuccess = function (response) {
        self.fuelMovementForThisMonth = response.data;
        self.fuelMovementForPrevMonths = response.data.slice(0, response.data.length - 1);
        self.fuelMovementForThisMonth = self.fuelMovementForThisMonth[self.fuelMovementForThisMonth.length - 1];
        self.fuelMovementForThisMonth = response.data.map((item) => { return { month: item.month, volumeThisMonth: item.volume } });
        self.fuelMovementForThisMonth = self.fuelMovementForThisMonth[self.fuelMovementForThisMonth.length - 1];
      };
      var onFinally = function () {
        if (self.fuelMovementForThisMonth) {
          self.fuelMovementForPrevMonths.push(self.fuelMovementForThisMonth);
          // self.displayFuelThisPrev(self.fuelMovementForPrevMonths, 'fuelusageprev');
        }
        else {
          // var x = document.getElementById("fuelusageprev");
          x.style.display = "none";
        }

      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewForAllMonths`,
        onSuccess,
        onFinally
      );
    },

    GetFuelMovementforMonthChart() {
      const self = this;
      self.showLoadingOnElement("fuelLoad", 1, "radius");
      var onSuccess = function (response) {
        self.series[0].name = "Fuel Movement per Day";
        self.displayLineChart(response.data.map((item) => { return { volume: item.volume, date: item.dateOnly } })
        );
        self.series[0].data = response.data.map((item) => { return { volume: item.volume, date: item.dateOnly } });

        self.successLoadFuelMovement();
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewCalendar?&date=${self.dateFormat(self.fromDate)}`,
        onSuccess,
        onFinally
      );
    },
    getUsagePerEquipment() {
      var self = this;
      self.showLoadingOnElement("top5Load1", 1, "radius");
      var onSuccess = function (response) {
        var k = response.data.slice(0, 5).reverse();
        self.displayTopEqp(
          k.map((item) => { return { registration: item.registration, volume: item.volume }; }), 'horizontalbar', 'registration', '#0080ff');
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        `QuickViewChart/GetEquipmentDashboard?&date=${self.dateFormat(self.fromDate)}`,
        onSuccess,
        onFinally
      );
    },
    getUsagePerDriver() {
      var self = this;
      self.showLoadingOnElement("top5Load2", 1, "radius");
      var onSuccess = function (response) {
        var k = response.data.slice(0, 5).reverse();
        self.displayTopEqp(k.map((item) => { return { driver: item.driver, volume: item.volume }; }), 'eqpdriver', 'driver', '#0f52ba');
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        `QuickViewChart/GetDriverDashboard?&date=${self.dateFormat(self.fromDate)}`,
        onSuccess,
        onFinally
      );
    },
    getUsagePerFuelAttendant() {
      var self = this;
      self.showLoadingOnElement("top5Load3", 1, "radius");
      var onSuccess = function (response) {
        var k = response.data.slice(0, 5).reverse();
        self.displayTopEqp(k.map((item) => { return { fuelAttendant: item.fuelAttendant, volume: item.volume }; }), 'eqpfuel', 'fuelAttendant', '#008ecc');
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        `QuickViewChart/GetFuelAttendantDashboard?&date=${self.dateFormat(self.fromDate)}`,
        onSuccess,
        onFinally
      );
    },
    // getAuditLog(){
    //   var self = this;
    //   var onSuccess = function (response) {
    //     self.auditLog = response.data;
    //   };
    //   var onFinally = function () {
    //   };
    //   self.$ajaxGet(
    //     self,
    //     `DataIntegrity/GetAuditLog`,
    //     onSuccess,
    //     onFinally
    //   );
    // },
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    GetReportUrl() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.genericReport = response.data[0];
      };
      var onFinally = function () {
        if(self.genericReport != null && self.genericReport.url != "Not Assign"){
          self.PBISelectedMini();
        }
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "PowerBiAPI/GetPowerbiGeneric",
        onSuccess,
        onFinally
      );
    },
    PBISelected() {
      var self = this;
      // debugger
      // self.isInfoHidden = false;
      self.activePromptShowReport = true;
      self.mreport = self.genericReport.name;
      self.GetAccess_Token();
      var embedConfiguration = {
        type: 'report',
        accessToken: this.accesstoken,
        embedUrl: self.genericReport.url,
        pageView: 'fitToWidth',
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: true,
          layoutType: pbi.models.LayoutType.Custom,
          customLayout: {
            displayOption: pbi.models.DisplayOption.ActualSize
          }
        }
      };
      var reportContainer = document.getElementById('container');
      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      var report = powerbi.embedNew(reportContainer, embedConfiguration);

      report.off("loaded");
      report.on("loaded", function () {
        console.log("Loaded");
      });
      report.off("rendered");
    },
    PBISelectedMini() {
      var self = this;
      // debugger/
      // self.isInfoHidden = false;
      // self.activePromptShowReport = true;
      self.mreport = self.genericReport.name;
      self.GetAccess_Token();
      var embedConfiguration = {
        type: 'report',
        accessToken: this.accesstoken,
        embedUrl: self.genericReport.url,
        pageView: 'fitToWidth',
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: true,
          layoutType: pbi.models.LayoutType.Custom,
          customLayout: {
            displayOption: pbi.models.DisplayOption.ActualSize
          }
        }
      };
      var reportContainer = document.getElementById('container2');
      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      var report = powerbi.embedNew(reportContainer, embedConfiguration);

      report.off("loaded");
      report.on("loaded", function () {
        console.log("Loaded");
      });
      report.off("rendered");
    },
    GetAccess_Token() {
      const self = this;
      if ((localStorage.accesstoken != "undefined") && (localStorage.expiredate != "undefined")) {
            try {
                  var startTime = new Date(); 
                  var endTime = new Date(localStorage.expiredate);
                  var difference = endTime.getTime() - startTime.getTime();
                  self.resultInMinutes = Math.round(difference / 60000);
                  if (self.resultInMinutes > 0) {
                      self.accesstoken = localStorage.accesstoken;
                      self.expiredate = localStorage.expiredate;
                  } else {
                      self.refreshToken();
                  }
              } catch (e) {
                self.refreshToken();
              }
        }
        else {
          self.refreshToken();
        }
    },
    refreshToken() {
          const self = this;
          self.GetToken();
          self.accesstoken = localStorage.accesstoken;
          self.expiredate = localStorage.expiredate;
          if(self.resultInMinutes <= 0) self.resultInMinutes = 59;
    },
    GetToken() {     
      const self = this;
      var onSuccess = function(response) {
        self.resultInMinutes = 59;
        localStorage.removeItem('expiredate');
        localStorage.removeItem('accesstoken');
        localStorage.accesstoken = response.data.access_token;
        localStorage.expiredate =  response.data.expire_Date;
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "PowerBiAPI/GetPowerbiAccessToken",
        onSuccess,
        onFinally
      );
    },
    cancelReportViewer() {
        var self = this;
        self.activePromptShowReport = false;
    },
    logUser() {
      const self = this;

      var onSuccess = function (response) {
      };
      var onFinally = function () {


      };
      self.$ajaxPut(
        self,
        `Users/LogUser`,
        onSuccess,
        onFinally
      );
    },
    updateMonth(val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val);
      this.populateData();
      this.getViewCalendar(this.showDate);
    },
    clearFields() {
      this.title = this.endDate = this.url = ''
      this.id = 0
      this.labelLocal = 'none'
    },
    promptAddNewEvent(date) {
      this.disabledFrom = false
      this.addNewEventDialog(date)
    },
    addNewEventDialog(date) {
      this.clearFields()
      this.startDate = date
      this.endDate = date
      this.activePromptAddEvent = true
      this.populateData();
    },
    openAddNewEvent(date) {
      this.disabledFrom = true
      this.addNewEventDialog(date)
    },
    openEditEvent(event) {
      const e = this.$store.getters['calendar/getEvent'](event.id)
      this.id = e.id
      this.title = e.title
      this.startDate = e.startDate
      this.endDate = e.endDate
      this.url = e.url
      this.labelLocal = e.label
      this.activePromptEditEvent = true
    },
    removeEvent() {
      this.$store.dispatch('calendar/removeEvent', this.id)
    },
    getViewCalendar(date) {
      var self = this;
      self.showLoadingOnElement("calendar", 1, "radius");
      var onSuccess = function (response) {
        self.myEvents = response.data.map(function (item) { return { id: item.day, startDate: item.dateOnly, endDate: item.dateOnly, title: item.volume + "L", style: "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;" } });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar.$el);
      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewCalendar?&date=${self.dateFormat(date)}`,
        onSuccess,
        onFinally
      );
    },
    populateData() {
      var self = this;
      self.flag = true
      var element = document.getElementById('Grid');
      if (element) element.remove();

      var p = document.getElementById('PGridDashboard');
      var newElement = document.createElement('Div');
      newElement.setAttribute('id', 'Grid');
      p.appendChild(newElement);
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
    getViewCalendarDetail(date) {
      var self = this;
      var d = new Date(date.startDate);
      var day = "" + d.getDate();

      self.showLoadingOnElement("calendar", 1, "radius");
      var onSuccess = function (response) {
        self.dispensingData = response.data;

        self.aggregateColumn = [{
          columns: [
            {
              type: "Sum",
              field: "volume",
              textAlign: "Left",
              footerTemplate: "Total Volume: ${Sum}",
            },
          ],
        },
        ];

        if (self.flag) {
          self.grid = new Grid({
            excelExportComplete: "excelExportComplete",
            allowSorting: true,
            allowPaging: true,
            allowExcelExport: true,
            scrollSettings: { width: 886, height: 500 },
            toolbar: self.toolbar,
            toolbarClick: self.toolbarClick,
            dataSource: self.dispensingData,
            columns: self.localColforGrid,
            height: 500,
            PageSettings: 20,
            aggregates: self.aggregateColumn,
          });
          self.flag = false;
          self.grid.appendTo("#Grid");
          // self.grid.refresh();
        }
        else self.grid.dataSource = self.dispensingData;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar.$el);
        if (!self.isMounted) self.activePromptAddEvent = true;
        self.activePromptAddEvent = true;

      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewCalendarDetail?&date=${self.formatDateMoment(
          date.startDate
        )}&day=${day}`,
        onSuccess,
        onFinally
      );
    },

    successNotifyDataLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Information successfully loaded',
        color: 'success'
      })
    },

    formatDateMoment: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },

    GetSubscriptions() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.subscriptions = response.data;
        if (self.subscriptions.length > 0) {
          self.noSubs = false;
          self.subscriptionPricing = response.data;
          self.showFirstTimePopup = localStorage.getItem('homeScreenMessage');

          if (self.showFirstTimePopup == "false") {
            self.showPopup = true;
          }
          else {
            self.getNotification();
          }

        }
        else {
          self.noSubs = true;
          self.getPricing();
        }
      };
      var onFinally = function () {
        self.successNotifyDataLoad();
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Subscription/GetSubscriptionDash",
        onSuccess,
        onFinally
      );
    },
    savePref() {
      const self = this;

      if (self.stopPopup) {
        var onSuccess = function (response) {
        };
        var onFinally = function () {
          localStorage.setItem('homeScreenMessage', "true");
          self.closePopup();

        };
        self.$ajaxPost(
          self,
          'Subscription/SavePref',
          onSuccess,
          onFinally
        );
      }
    },
    getColor(tr) {
      if (tr.dayRemaining <= 30) {
        return 'background: rgb(254, 138, 131)';
      }
      else if (tr.dayRemaining > 30 && tr.dayRemaining <= 90) {
        return 'background: rgb(254, 212, 52)';
      }
      else {
        return 'background: rgb(153, 255, 153)';
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
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    getNotification() {
      var self = this;
      var onSuccess = response => {
        self.unreadNotifications = response.data.filter(x => !x.readOn);
        if (self.unreadNotifications.length > 0) {
          var lastone = self.unreadNotifications.length - 1;
          self.lastNtf = self.unreadNotifications[lastone];

          if (self.unreadNotifications) {
            self.handleNtf(self.lastNtf);
          }
        }
        else {
          self.showNotification = false;
        }

      };
      var onFinally = response => {
      };
      self.$ajaxGet(self, "Notification", onSuccess, onFinally);

    },
    handleNtf(ntf) {
      var self = this;
      self.idSpecific = 0;
      var routeData = "";

      var onSuccess = response => {
        if (ntf.notificationTypeId == 1) {
          self.messageToDisplay = response.data[0].text;
        }
        else if (ntf.notificationTypeId == 2) {
          self.messageToDisplay = response.data;
        }

        self.idSpecific = ntf.id;
        if (self.showFirstTimePopup == "true") {
          self.showNotification = true;
        }

      };

      var onFinally = response => {
      };
      self.$ajaxGet(self, `Notification/ViewNotification/?&ntfid=${ntf.id}&notificationTypeId=${ntf.notificationTypeId}`, onSuccess, onFinally);
    },
    closeMessagePopup() {
      var self = this;
      if (self.markAsRead) {
        self.markSingleAsRead()
      }
      self.showNotification = false;
    },
    markSingleAsRead() {
      var self = this;
      var onSuccess = response => {
      };
      self.$ajaxGet(self, "Notification/MarkSingleAsRead/" + self.lastNtf.id, onSuccess);
    },
    requestInvoice() {
      var self = this;
      self.showLoadingOnElement("submitButon", 0.65, "radius");

      var onSuccess = response => {
        self.$vs.notify({
          title: 'Successfully',
          text: 'Email Successfully Send',
          color: 'success'
        });
        self.showPopup = false;
      };

      var onFinally = response => {
        self.$vs.loading.close(self.$refs.submitButon.$el);
      };

      self.$ajaxGet(
        self,
        "Subscription/RequestInvoice",
        onSuccess,
        onFinally
      )
    }
  },
  created() {
    // Sessions By Device
    this.$http
      .get("/api/card/card-analytics/session-by-device")
      .then((response) => {
        this.sessionsData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Customers
    this.$http
      .get("/api/card/card-analytics/customers")
      .then((response) => {
        this.customersData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    //  User Reward Card
    this.$http
      .get("/api/user/checkpoint-reward")
      .then((response) => {
        this.checkpointReward = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Subscribers gained - Statistics
    this.$http
      .get("/api/card/card-statistics/subscribers")
      .then((response) => {
        this.subscribersGained = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Orders - Statistics

    this.$http
      .get("/api/card/card-statistics/orders")
      .then((response) => {
        this.ordersRecevied = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.ordersRecevied);
    // Sales bar - Analytics
    this.$http
      .get("/api/card/card-analytics/sales/bar")
      .then((response) => {
        this.salesBarSession = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Support Tracker
    this.$http
      .get("/api/card/card-analytics/support-tracker")
      .then((response) => {
        this.supportTracker = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Products Order
    this.$http
      .get("/api/card/card-analytics/products-orders")
      .then((response) => {
        this.productsOrder = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Sales Radar
    this.$http
      .get("/api/card/card-analytics/sales/radar")
      .then((response) => {
        this.salesRadar = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Dispatched Orders
    this.$http
      .get("/api/table/dispatched-orders")
      .then((response) => {
        this.dispatchedOrders = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },


};
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user {
    position: relative;
    background-image: url('../assets/images/elements/logo.png') !important;
    background-repeat: no-repeat;
    background-size: 96%;
    background-position: center;
    background-position-x: initial;
    background-position-y: -42px;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }

    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 576px) {

    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}

#chartdiv {
  width: 100%;
  height: 100%;
  height: 200px;
}

#horizontalbar {
  width: 100%;
  height: 100%;
  height: 200px;
}

#eqpdriver {
  width: 100%;
  height: 100%;
  height: 200px;
}

#eqpfuel {
  width: 100%;
  height: 100%;
  height: 200px;
}

#fuelusageprev {
  width: 100%;
  height: 100%;
  height: 350px;
}

#fuelusagethis {
  width: 100%;
  height: 100%;
  height: 200px;
}

#calendarView {
  .cv-weeks {
    .cv-week {
      min-height: 5px;
      max-height: 50px;
    }
  }
}

#popupSubs div.vs-popup {
  width: 800px !important;
}
</style>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
<style>
@import "material.css";
</style>
