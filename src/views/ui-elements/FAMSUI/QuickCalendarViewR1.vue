<template>
  <div id="simple-calendar-app">
    
    <div class="vx-card no-scroll-content">
      <calendar-view
        ref="calendar"
        :displayPeriodUom="calendarView"
        :show-date="showDate"
        :events="myEvents"
        :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
        eventBorderHeight="0px"
        eventContentHeight="1.65rem"
        class="theme-default vs-con-loading__container"
        @click-event="getViewCalendarDetail">

        <div slot="header" class="mb-4">
          <h3 class="mb-3">FAMS Quick Calendar View - Fuel Movement</h3>
          <!-- <label >Select Calendar Date</label> -->
          <!-- <datepicker :minimumView="'month'" :maximumView="'month'" class="mt-1"  placeholder="Select Date" v-model="showDate"></datepicker> -->
          <div class="vx-row mt-3">
            <div class="vx-col">
              <div class="flex items-center">
                <feather-icon
                  :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                  @click="updateMonth(-1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />

                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate | month }}</span>

                <feather-icon
                  :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                  @click="updateMonth(1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </calendar-view>
    </div>

    <vs-popup
        fullscreen
        class="calendar-event-dialog"
        title="Dispensing Grid"
        :active.sync="activePromptAddEvent">

        <div>
        <vs-table
          ref="gridTable"
          pagination
          :max-items="8"
          search
          :data="dispensingData"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
          </div>
          <template slot="thead">
            <vs-th sort-key="accountid">AccountID</vs-th>
            <vs-th sort-key="dateOnly">Date Only</vs-th>
            <vs-th sort-key="date">Date</vs-th>
            <vs-th sort-key="year">Year</vs-th>
            <vs-th sort-key="month">Month</vs-th>
            <vs-th sort-key="day">Day</vs-th>
            <vs-th sort-key="Store">Store</vs-th>
            <vs-th sort-key="Registration">Registration</vs-th>
            <vs-th sort-key="eqpTag">Equipment Tag</vs-th>
            <vs-th sort-key="product">Product</vs-th>
            <vs-th sort-key="measurement">Measurement</vs-th>
            <vs-th sort-key="km">KM</vs-th>
            <vs-th sort-key="hour">Hour</vs-th>
            <vs-th sort-key="rebate">Rebate</vs-th>
            <vs-th sort-key="volume">Volume</vs-th>
            <vs-th sort-key="driver">Driver</vs-th>
            <vs-th sort-key="fuelAttendant">Fuel Attendant</vs-th>
            <vs-th sort-key="masterEquipment">Master Equipment</vs-th>
            <vs-th sort-key="costCenter">Cost Center</vs-th>
            <vs-th sort-key="allocation1">Allocation 1</vs-th>
            <vs-th sort-key="allocation2">Allocation 2</vs-th>
            <vs-th sort-key="allocation3">Allocation 3</vs-th>
            <vs-th sort-key="allocation4">Allocation 4</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.accountID">{{tr.accountID}}</vs-td>
              <vs-td :data="tr.dateOnly">{{tr.dateOnly}}</vs-td>
              <vs-td :data="tr.date">{{formatDateMoment(tr.date)}}</vs-td>
              <vs-td :data="tr.year">{{tr.year}}</vs-td>
              <vs-td :data="tr.month">{{tr.month}}</vs-td>
              <vs-td :data="tr.day">{{tr.day}}</vs-td>
              <vs-td :data="tr.store">{{tr.store}}</vs-td>
              <vs-td :data="tr.registration">{{tr.registration}}</vs-td>
              <vs-td :data="tr.eqpTag">{{tr.eqpTag}}</vs-td>
              <vs-td :data="tr.product">{{tr.product}}</vs-td>
              <vs-td :data="tr.measurement">{{tr.measurement}}</vs-td>
              <vs-td :data="tr.km">{{tr.km}}</vs-td>
              <vs-td :data="tr.hour">{{tr.hour}}</vs-td>
              <vs-td :data="tr.rebate">{{tr.rebate}}</vs-td>
              <vs-td :data="tr.volume">{{tr.volume}}</vs-td>
              <vs-td :data="tr.driver">{{tr.driver}}</vs-td>
              <vs-td :data="tr.fuelAttendant">{{tr.fuelAttendant}}</vs-td>
              <vs-td :data="tr.masterEquipment">{{tr.masterEquipment}}</vs-td>
              <vs-td :data="tr.costCenter">{{tr.costCenter}}</vs-td>
              <vs-td :data="tr.allocation1">{{tr.allocation1}}</vs-td>
              <vs-td :data="tr.allocation2">{{tr.allocation2}}</vs-td>
              <vs-td :data="tr.allocation3">{{tr.allocation3}}</vs-td>
              <vs-td :data="tr.allocation4">{{tr.allocation4}}</vs-td>
              <vs-td class="whitespace-no-wrap">

              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import moduleCalendar from '@/store/calendar/moduleCalendar.js'
require('vue-simple-calendar/static/css/default.css')

import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'
import moment from "moment";
export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker
  },
  data () {
    return {
      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      labelLocal: 'none',
      dispensingData:[],
      
      url: '',
      calendarView: 'month',
      myEvents:[],

      activePromptAddEvent: false,
      activePrompt3EditEvent: false,
    }
  }, 
  watch:{
    showDate: function(val) {
      this.getViewCalendar(val);
    },
  },
  props: {
		events: { type: Array, default: () => [] },

	},

  computed: {
    validForm () {
      return this.title !== '' && this.startDate !== '' && this.endDate !== '' && Date.parse(this.endDate) - Date.parse(this.startDate) >= 0 && !this.errors.has('event-url')
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    },
    disabledDatesFrom () {
      return { from: new Date(this.endDate) }
    },
    calendarLabels () {
      return this.$store.state.calendar.eventLabels
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    formatDateMoment: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },

    updateMonth (val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val);
      this.getViewCalendar(this.showDate);
    },
    clearFields () {
      this.title = this.endDate = this.url = ''
      this.id = 0
      this.labelLocal = 'none'
    },
    promptAddNewEvent (date) {
      this.disabledFrom = false
      this.addNewEventDialog(date)
    },
    addNewEventDialog (date) {
      this.clearFields()
      this.startDate = date
      this.endDate = date
      this.activePromptAddEvent = true
    },
    openAddNewEvent (date) {
      this.disabledFrom = true
      this.addNewEventDialog(date)
    },
    openEditEvent (event) {
      const e = this.$store.getters['calendar/getEvent'](event.id)
      this.id = e.id
      this.title = e.title
      this.startDate = e.startDate
      this.endDate = e.endDate
      this.url = e.url
      this.labelLocal = e.label
      this.activePromptEditEvent = true
    },
    removeEvent () {
      this.$store.dispatch('calendar/removeEvent', this.id)
    },
    getViewCalendar(date) {
      var self = this;
      self.showLoadingOnElement("calendar", 1, "radius");
      var onSuccess = function(response) {
        self.myEvents = response.data.map(function (item) {return{ id: item.day,  startDate: item.dateOnly, endDate: item.dateOnly, title: item.volume + "L", style: "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;"}});
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.calendar.$el);
      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewCalendar?&date=${self.dateFormat(date)}`,                             
        onSuccess,
        onFinally
      );
    },
    getViewCalendarDetail(date) {
      var self = this;
      //self.showLoadingOnElement("calendar", 1, "radius");
      var d = new Date(date.startDate);
      d = d.getDate();
      var onSuccess = function(response) {
        self.dispensingData = response.data;
      };
      var onFinally = function() {
        //self.$vs.loading.close(self.$refs.gridTable.$el);
          self.activePromptAddEvent = true
      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewCalendarDetail?&date=${self.dateFormat(date.startDate)}&day=${d}`,                             
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
        showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
  },
  mounted() {
    var date = new Date();
    var d =  new Date(date.getFullYear(), date.getMonth(), 1);
    var j = this.dateFormat(d);
    this.getViewCalendar(j);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
