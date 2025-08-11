<template>
  <div>
		<reportSchedule-sidebar
      :isSidebarActive="isReportScheduleSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table 
          ref="gridTable"
          pagination
          :max-items="itemsPerPage"
          search
          :data="reportSchedules"
          class="vs-con-loading_container"
        >
          <div
            slot="header"
            class="flex flex-wrap-reverse items-center flex-grow"
          >
            <vs-button
              class="rounded-lg mr-2"
              color="warning"
              type="filled"
              @click="getReportSchedules"
              icon-pack="feather"
              icon="icon-refresh-ccw">
              Reload
            </vs-button>
            <vs-button
              class="rounded-lg mr-2"
              color="success"
              type="filled"
              @click.stop="showSidebar"
              icon-pack="feather"
              icon="icon-plus-square">
              Add New
            </vs-button>
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
            <div
              class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                {{
                  reportSchedules.length - currentPage * itemsPerPage > 0
                    ? currentPage * itemsPerPage
                    : reportSchedules.length
                }}
                of {{ reportSchedules.length }}</span
              >
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
          <vs-th sort-key="Name">Schedule</vs-th>
          <vs-th sort-key="Report">Report</vs-th>
          <vs-th sort-key="Email">Email</vs-th>
          <vs-th sort-key="File">File</vs-th>
          <vs-th sort-key="DayOfMonth">Day Of Month</vs-th>
          <vs-th sort-key="DayOfWeek">Day Of Week</vs-th>
          <vs-th sort-key="LastDayMonth">Last Day Month</vs-th>
          <vs-th sort-key="TimeOfDay">Time Of Day</vs-th>
          <vs-th sort-key="enable">Enable</vs-th>
          <vs-th>Action</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.name">{{ tr.name }}</vs-td>
            <vs-td :data="tr.reportName">{{ tr.reportName }}</vs-td>
            <vs-td :data="tr.email">{{ tr.email.substring(0, 50)}}</vs-td>
            <vs-td :data="tr.file">{{ tr.file }}</vs-td>
            <vs-td :data="tr.dayOfMonth">{{ tr.dayOfMonth }}</vs-td>
            <vs-td :data="tr.dayOfWeek">{{ tr.dayOfWeek }}</vs-td>
            <vs-td :data="tr.lastDayMonth">{{ tr.lastDayMonth }}</vs-td>
            <vs-td :data="tr.timeOfDay">{{ tr.timeOfDay }}</vs-td>
             <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
            <vs-td id="iconContainer" class="whitespace-no-wrap">
              <vx-tooltip class="flex" text="Run Report">
                <feather-icon
                icon="PlayCircleIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                @click.stop="RunReportNow(tr)"
              />
              </vx-tooltip>
              <vx-tooltip class="flex" text="Edit Report Info">
                <feather-icon
                icon="EditIcon"
                ref="edit"
                class="ml-2"
                svgClasses="w-5 h-5 hover:text-success stroke-current"
                @click.stop="handleSelectedReport(tr)"
              />
              </vx-tooltip>
              <vx-tooltip class="flex" text="Delete Report">
                <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click.stop="deleteReportSchedule(tr)"
              />
              </vx-tooltip>
              
            </vs-td>

              <template class="expand-user" slot="expand" >
                <div class="con-expand-users w-full" >
                    <div>
                      
                        <vx-card class="mt-base" no-shadow card-border>
                          <div >
                             <vs-table
                              ref="gridTable2"
                               v-model="selected"
                              :data="tr.rsl"
                            >
                            <template slot="thead">
                              <vs-th>Report</vs-th>
                              <vs-th>Date In Qeue</vs-th>  
                              <vs-th>Date Process</vs-th>                 
                              <vs-th>Status</vs-th>  
                            </template>
                             
                              <template slot-scope="{data}">
                                   <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">                      
                                      <vs-td :data="tr.reportName">{{tr.reportName}}</vs-td>
                                      <vs-td :data="tr.createdateIn">{{tr.createdateIn}}</vs-td>
                                      <vs-td :data="tr.createdate">{{tr.createdate}}</vs-td>
                                      <vs-td :data="tr.status">{{tr.status}}</vs-td>                            
                                  </vs-tr>
                                </template>
                              </vs-table>
                          </div>
                        </vx-card>
                    </div>
                </div>
            </template>
          </vs-tr>
        </template>
        </vs-table>
      </div>
    </vx-card>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "flatpickr/dist/flatpickr.css";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import ReportScheduleSidebar from './ReportScheduleSidebar.vue';

export default {
  data(){
    return{
      selected: null,
      itemsPerPage: 10,
      isVisible: false,
      isListHidden: false,
      isMounted: false,

			isListHidden: false,   
      isInfoHidden: true,
      isReportScheduleSidebarActive: false,
      sidebarData: {},

			reportSchedules: [],
      formData: {
        id: 0,
				reportId: 0,
				dayOfMonth: 0,
				dayOfWeek: 0,
				timeOfDay: "",
				name: "",
				email: "",
				reportFileTypeId: 0,
				enable: false,
        lastDayMonth: false,
				reportTypeId: 0,
        reportName: "",
        file: ""
			}
		};
	},
	components: {
		"v-select": vSelect,
    ReportScheduleSidebar
	},
	computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
	mounted() {
    this.getReportSchedules();
    this.isMounted = true;
  },
	methods: {
		initValues(){
				this.formData.id = 0,
				this.formData.reportId = 0,
				this.formData.dayOfMonth = 0,
				this.formData.dayOfWeek = 0,
				this.formData.timeOfDay = "",
				this.formData.name = "",
				this.formData.email = "",
				this.formData.reportFileTypeId = 0,
				this.formData.enable = false,
        this.formData.lastDayMonth = false,
				this.formData.reportTypeId = 0,
        this.formData.reportName = "",
        this.formData.file = ""
		},
    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
		getReportSchedules(){
			var self = this;
			self.initValues();
			self.showLoadingOnElement("gridTable", 0.65, "radius");
			
			var onSuccess = function (response) {
        self.$refs.gridTable.currentx = 1;
        self.reportSchedules = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "ReportSchedules/GetReportSchedules", onSuccess, onFinally);
		},
		handleSelectedReport(tr){
			this.sidebarData = tr;
      this.initValues();
      this.toggleDataSidebar(true);
		},
		showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    cancelSidebar() {
      this.isListHidden = false,
      this.isInfoHidden = true;
      this.initValues();
      this.getReportSchedules();
    },
    showSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val){
        if (val)
        this.isReportScheduleSidebarActive = true;
        else{
          this.isReportScheduleSidebarActive = false;
          this.getReportSchedules();
        }
        
    },
      successNotifyLoadCustom(msg) {
      this.$vs.notify({
        title: "Successfully",
        text: msg,
        color: "success",
      });
    },
      successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully Emailed',
        color: 'success'
      })
    },

    RunReportNow(tr){
      var self = this;
      self.showLoadingOnElement("gridTable", 0.65, "radius");
      var accountID = "accountID=" + localStorage.getItem('userAccountId');
      var reportID = "&ReportID=" + tr.reportId;
      var EmailAddress = "&EmailAddress=" + tr.email;
      var ReportExtension = "&ReportExtension=" + tr.extension;
      var ReportScheduleId = "&ReportScheduleId=" + tr.id;
      var ReportTypeId = "&ReportTypeId=" + tr.reportTypeId;

      var urlLink =accountID +  reportID + EmailAddress + ReportExtension + ReportScheduleId + ReportTypeId;

      var onSuccess = function (response) {
          self.successNotify();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "SendGrid/RunSendGridNow?" + urlLink, onSuccess, onFinally);
    },

    deleteReportSchedule(tr){
      var self = this;
      self.showLoadingOnElement("gridTable", 0.65, "radius");
      
         var onSuccess = function (response) {
         if(response.status == 200)
            {
             
                self.successNotifyLoadCustom("Succesfully removed");
                self.getReportSchedules();
            }  
            else
            {
              self.FailedCustomNotify("Oops - couldn't remove report schedule");
            }      
      
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      
      self.$ajaxDelete(
        self,
        `ReportSchedules/${tr.id}`,
        onSuccess,
        onFinally
      );
    }
	}
}
</script>
<style>
#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>