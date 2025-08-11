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
      <h4>
        <!-- {{ Object.entries(this.data).length === 0 ? "ADD" : "UPDATE" }} ReportSchedule -->
      </h4>
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-3">New Schedule</vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
      suppressScrollX="true"
    >
      <div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Schedule Name</label>
            <vs-input
              autocomplete="off"
              icon-no-border
              onClick="this.select();"
              v-validate="'required'"
              class="w-full"
              name="Name"
              icon-pack="feather"
              icon="icon-file-text"
              v-model="formData.name"
            />
            <span class="text-danger text-sm" v-show="errors.has('name')">{{errors.first("name")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col w-full">
            <label>Email</label>
            <!-- <vs-chips id="emails" class="vx-col w-full pt-2" placeholder="Add Email" v-model="chips" v-validate="'required|email'" name="Email" style="justify"> -->
              <vs-chips id="emails" class="vx-col w-full pt-2" placeholder="Add Email" v-model="chips" v-validate="'required'" name="Email" style="justify">
              <vs-chip
                class="glow-effect_primary"
                :key="chip"
                @click="removeEmail(chip)"
                v-for="chip in chips"
                closable>
                {{ chip }}
              </vs-chip>
            </vs-chips>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Report</label>
            <v-select
            ref="reportDropDown"
            class="w-full"
            placeholder="Select a Report"
            v-validate="'required'"
            name="Report"
            :options="reportData"
            v-model="reportDropDown"
            ></v-select>
          </div>
        </div>
      <!-- <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Report Type</label>
            <v-select
              ref="reportDropDown"
              class="w-full"
              v-validate="'required'"
              name="Report Type"
              placeholder="Select a Type"
              :options="reportTypeData"
              v-model="reportTypeDropDown"
            ></v-select>
          </div>
        </div> -->
      <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Report File Type</label>
            <v-select
              ref="reportDropDown"
              class="w-full"
              v-validate="'required'"
              name="Report File Type"
              placeholder="Select a File Type"
              :options="reportFileTypeData"
              v-model="reportFileTypeDropDown"
            ></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Day Of Week</label>
            <v-select
            ref="dayOfWeekDropDown"
            class="w-full"
            name="Day"
            placeholder="Select a Day"
            :options="dayOfWeekData"
            v-model="dayOfWeekDropDown"
            ></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Day Of Month</label>
            <v-select
            ref="dayOfWeekDropDown"
            class="w-full"
            placeholder="Select a Date"
            name="Day of Month"
            :options="dayOfMonthData"
            v-model="dayOfMonthDropDown"
            ></v-select>
          </div>
        </div>
          <div class="vx-row px-4 pb-6">
              <div class="vx-col">
            <label>Last day of the month</label>  
            <vs-switch class="rounded-pill" v-model="formData.lastDayMonth" color="danger">
              <span slot="on">Yes</span>
              <span slot="off">No</span>
            </vs-switch>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Select Time</label>
            <b-form-timepicker 
              v-model='formData.timeOfDay' 
              class="w-full" 
              locale='en' />
        </div>
      </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
             <label>Enable</label>  
              <vs-switch class="rounded-pill" v-model="enableCheck" color="warning">
              <span slot="on">Yes</span>
              <span slot="off">No</span>
            </vs-switch>

            <!-- <vs-checkbox v-model="enableCheck">Enable</vs-checkbox> -->
          </div>
        </div>
      </div>
    </component>
    <div class="vx-row flex flex-wrap items-center">
      <vs-spacer />
      <div class="vx-col">
        <vs-button
          ref="saveButton"
          class="rounded-lg mr-3 vs-con-loading__container"
          color="success"
          type="border"
          @click="saveReportSchedule"
          >Save</vs-button
        >
        <vs-button
          class="rounded-lg mr-3"
          color="warning"
          type="border"
          @click="closeSidebar"
          >Cancel</vs-button
        >
      </div>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import vSelect from "vue-select";
import { BFormTimepicker } from 'bootstrap-vue';

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      default: () => {},
    },
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
    BFormTimepicker,
  },
  mounted() {
    this.getReportDropDown();
    this.getReportFileTypeDropDown();
    // this.getReportTypeDropDown();
    this.getDayOfWeekDropDown();
    this.getDayOfMonthDropDown();
  },
  data() {
    return {
      chips : [],
      emailToAdd: "",
      reportDropDown: 0,
      reportFileTypeDropDown: 0,
      reportData: [],
      reportFileTypeData: [],
      dayOfWeekData: [],
      dayOfMonthData: [],
      enableCheck: true,
      dayOfWeekDropDown: 0,
      dayOfMonthDropDown: 0,
      reportTypeData:0,
      reportTypeDropDown:0,
      formData: {
        id: 0,
				reportId: 0,
				dayOfMonth: 0,
				dayOfWeek: 0,
        lastDayMonth :0,
				timeOfDay: "",
				name: "",
				email: "",
				reportFileTypeId: 0,
				enable: true,
				reportTypeId: 0,
        accountId: 0
			},
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },
  watch: {
    isSidebarActive(val) {
      
      var self = this;
      if (Object.entries(self.data).length === 0) {
        self.initValues();
        self.$validator.reset();
        self.getReportDropDown();
        self.getReportFileTypeDropDown();
        // self.getReportTypeDropDown();
        self.getDayOfWeekDropDown();
        self.getDayOfMonthDropDown();
      } else{
     //    self.getReportDropDown();
        self.formData.id = self.data.id;
        self.formData.accountId = self.data.accountId;
        self.enableCheck = self.data.enable == 1 ? true : false;
        self.formData.lastDayMonth = self.data.lastDayMonth == 1 ? true : false;
				self.formData.timeOfDay = self.data.timeOfDay;
				self.formData.name = self.data.name;

        self.dayOfWeekDropDown = self.dayOfWeekData.filter(function (item) {
          return item.value == self.data.dayOfWeek;
        })[0];

        self.dayOfMonthDropDown = self.dayOfMonthData.filter(function (item) {
          return item.value == self.data.dayOfMonth;
        })[0];

        self.reportFileTypeDropDown = self.reportFileTypeData.filter(function (item) {
          return item.value == self.data.reportFileTypeId;
        })[0];

        // self.reportTypeDropDown = self.reportTypeData.filter(function (item) {
        //   return item.value == self.data.reportTypeId;
        // })[0];
        self.reportTypeDropDown = 0;

        self.reportDropDown = self.reportData.filter(function (item) {
          return item.value == self.data.reportId;
        })[0];

        self.chips = self.data.email.split(';'); 
      }
    },
  },
  computed: {
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
    isFormValid() {
      return !this.errors.any();
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    
    closeSidebar() {
      this.initValues();
      this.isSidebarActiveLocal = false;
    },
    getReportFileTypeDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.reportFileTypeData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "ReportSchedules/GetReportFileTypeDropDown",
        onSuccess,
        onFinally
      );
    },
    getReportTypeDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.reportTypeData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "ReportSchedules/GetReportTypeDropDown",
        onSuccess,
        onFinally
      );
    },
    getReportDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.reportData = response.data.map((item) => {return {label: item.name, value: item.id, type: item.reportType}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "ReportSchedules/GetReportDropDown",
        onSuccess,
        onFinally
      );
    },
    initValues() {
      this.formData.id = 0;
      this.formData.accountId = 0;
      this.formData.email = "";
      this.formData.enable = true;
      this.formData.reportId = 0;
      this.formData.dayOfMonth = 0;
      this.formData.dayOfWeek = 0;
      this.formData.lastDayMonth = 0;
      this.formData.timeOfDay = null;
      this.formData.name = "";
      this.formData.reportFileTypeId = 0;
      this.formData.reportTypeId = 0;
      
      this.chips = [];
      this.reportDropDown = [];
      this.reportFileTypeDropDown = [];
      this.reportTypeDropDown = [];
      this.dayOfWeekDropDown = [];
      this.dayOfMonthDropDown = [];
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    successNotifyLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
    },
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
    },
    getDayOfWeekDropDown(){
      var self = this;
      var onSuccess = function(response) {
        self.dayOfWeekData = response.data.map((item) => {return {label: item.item1, value: item.item2}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "ReportSchedules/GetDayOfWeekDropDown",
        onSuccess,
        onFinally
      );
    },
    getDayOfMonthDropDown(){
      var self = this;
      var onSuccess = function(response) {
        self.dayOfMonthData = response.data.map((item) => {return {label: item.item1, value: item.item2}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "ReportSchedules/GetDayOfMonthDropDown",
        onSuccess,
        onFinally
      );
    },
    saveReportSchedule() {
      var self = this;
      self.showLoadingOnElement("saveButton", 0.65, "radius");
      
      var blankEmail = self.chips.filter(item => {
        return item == "";
      });

      if((blankEmail.length > 0 && self.chips.length > 0) || self.chips.length == 0){
        self.FailedCustomNotify("No Emails or Blank Email found");
        self.$vs.loading.close(self.$refs.saveButton.$el);
      }
      else{
        self.$validator.validateAll().then((result) => {
          if (result) {
            if(self.dayOfWeekDropDown && self.dayOfWeekDropDown.value != null)
            {
              self.formData.dayOfWeek = self.dayOfWeekDropDown.value;
            } else
            {
              self.formData.dayOfWeek = 0;
            }
            
            if(self.dayOfMonthDropDown && self.dayOfMonthDropDown.value != null)
            {
              self.formData.dayOfMonth = self.dayOfMonthDropDown.value;
            } else
            {
              self.formData.dayOfMonth = 0;
            }
            
            if(self.reportFileTypeDropDown && self.reportFileTypeDropDown.value != null)
            {
              self.formData.reportFileTypeId = self.reportFileTypeDropDown.value;
            } else
            {
              self.formData.reportFileTypeId = 0;
            }
            
            if(self.reportDropDown && self.reportDropDown.value != null)
            {
              self.formData.reportId = self.reportDropDown.value;
              self.formData.reportTypeId = self.reportDropDown.type;
            }else
            {
              self.formData.reportId = 0;
            }
            
            self.formData.email = self.chips.join(';');
            
            self.enableCheck ? self.formData.enable = 1 : self.formData.enable = 0;
            self.formData.lastDayMonth ? self.formData.lastDayMonth = 1 : self.formData.lastDayMonth = 0;
            
            var onSuccess = function () {
              self.closeSidebar();
            };
            var onFinally = function () {
              self.$vs.loading.close(self.$refs.saveButton.$el);
            };
            self.$ajaxPost(self, "ReportSchedules/", self.formData, onSuccess, onFinally);
          } 
          else {
            self.FailedCustomNotify(self.$validator.errors.items[0].msg);
            self.$vs.loading.close(self.$refs.saveButton.$el);
          }
        });
      }
      
    },
    removeEmail(chip) {
        this.chips.splice(this.chips.indexOf(chip), 1)
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
    width: 600px;
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
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
