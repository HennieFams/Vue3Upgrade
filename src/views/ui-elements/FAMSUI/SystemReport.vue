<style>
/* @import "https://cdn.syncfusion.com/18.1.0.42/js/web/flat-saffron/ej.web.all.min.css"; */
  @import "https://cdn.boldreports.com/4.2.54/content/material/bold.reports.all.min.css";
</style>

<template>
  <div>
		<standardSystemReport-sidebar
      :isSidebarActive="isStandardSystemReportSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vx-card ref="MainCard" class="pb-3"  title="FAMS System Report View."  v-show="!isListHidden">
      <div>
        <vs-table 
          ref="gridTable"
          pagination
          :max-items="itemsPerPage"
          search
          :data="reports"
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
              @click="getReports"
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
                  reports.length - currentPage * itemsPerPage > 0
                    ? currentPage * itemsPerPage
                    : reports.length
                }}
                of {{ reports.length }}</span
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
          <vs-th sort-key="Name">Name</vs-th>
          <vs-th>Action</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.name">{{ tr.name }}</vs-td>
            <vs-td id="iconContainer" class="whitespace-no-wrap">
              <vx-tooltip class="flex" text="Edit Report Information">
                <feather-icon
                icon="EditIcon"
                ref="edit"
                svgClasses="w-5 h-5 hover:text-success stroke-current"
                @click.stop="handleSelectedReport(tr)"
              />
              </vx-tooltip>
              <vx-tooltip class="flex" text="Delete Report">
                <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click.stop="deleteReport(tr)"
              />
              </vx-tooltip>
              <vx-tooltip class="flex" text="View Report">
                <feather-icon
                icon="EyeIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                class="ml-2"
                @click.stop="editDataSidebar(tr)"
                />
              </vx-tooltip>
              
            </vs-td>
          </vs-tr>
        </template>
        </vs-table>
      </div>
    </vx-card>
    <vs-spacer></vs-spacer>
      <div>
      <vx-card id="reportViewerCard" class="vs-con-loading__container" ref="reportInfo" v-show="!isInfoHidden">
         <div class="vx-row">
          <vs-spacer></vs-spacer>
          <div class="vx-col">
            <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelReportViewer">Close</vs-button>
          </div>
        </div>
         <!-- Creating a div tag which will act as a container for boldReportViewer widget.-->
        <div style="height: 100%; width: 99.85%; min-height: 750px" id="viewer" ref="viewer"></div>

        <vs-divider class="mb-6 pt-0"></vs-divider>
        <div class="vx-row">
          <vs-spacer></vs-spacer>
          <div class="vx-col">
            <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelReportViewer">Close</vs-button>
          </div>
        </div>
      </vx-card>

    </div>
  </div>
</template>

<script>
import * as jQuery            from './bold_scripts/jquery-1.10.2.min.js';
import * as ej2base           from '@boldreports/javascript-reporting-controls/Scripts/common/ej2-base.min.js';
import * as ej2data           from '@boldreports/javascript-reporting-controls/Scripts/common/ej2-data.min.js';
import * as ej2pdfexport      from '@boldreports/javascript-reporting-controls/Scripts/common/ej2-pdf-export.min.js';
import * as ej2svgbase        from '@boldreports/javascript-reporting-controls/Scripts/common/ej2-svg-base.min.js';
import * as ej2lineargauge    from '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej2-lineargauge.min.js';
import * as ej2circulargauge  from '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej2-circulargauge.min.js';
import * as ej2maps             from '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej2-maps.min.js';
import * as ejchart           from '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min.js';
import * as boldcommon        from '@boldreports/javascript-reporting-controls/Scripts/common/bold.reports.common.min.js';
import * as boldwidgets       from '@boldreports/javascript-reporting-controls/Scripts/common/bold.reports.widgets.min.js';
import * as boldReportViewer  from '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min.js';

import axios from "axios";
import vSelect from "vue-select";
import "flatpickr/dist/flatpickr.css";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import StandardSystemReportSidebar from './SystemReportSidebar.vue';

export default {
  data(){
    return{
      itemsPerPage: 10,
      isVisible: false,
      isListHidden: false,
      isMounted: false,

			isListHidden: false,   
      isInfoHidden: true,
      isStandardSystemReportSidebarActive: false,
      sidebarData: {},

			reports: [],
      formData: {
				id: 0,
				name: "",
				reportTypeId: 0,
        report1: ""
			}
		};
	},
	components: {
		"v-select": vSelect,
    StandardSystemReportSidebar
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
    this.getReports();
    this.isMounted = true;
  },
	methods: {
		initValues(){
				this.formData.id = 0,
				this.formData.name = "",
				this.formData.reportTypeId = 0,
        this.formData.report1 = ""
		},
    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
		getReports(){
			var self = this;
			self.initValues();
			self.showLoadingOnElement("gridTable", 0.65, "radius");
			
			var onSuccess = function (response) {
        self.$refs.gridTable.currentx = 1;
        self.reports = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "StandardSystemReport", onSuccess, onFinally);
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
      this.getReports();
    },
    showSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val){
        if (val)
        this.isStandardSystemReportSidebarActive = true;
        else{
          this.isStandardSystemReportSidebarActive = false;
          this.getReports();
        }
        
    },
    deleteReport(tr){
      var self = this;
      self.showLoadingOnElement("gridTable", 0.65, "radius");
      
      var onSuccess = function () {
      };
      var onFinally = function () {
        self.getReports();
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      
      self.$ajaxDelete(
        self,
        `StandardSystemReport/${tr.id}`,
        onSuccess,
        onFinally
      );
    },
    
     handler: function handler(event) {
            if (!ej.isNullOrUndefined($("#viewer").boldReportViewer("instance"))) 
              $("#viewer").boldReportViewer('destroy'); 
      },

    cancelReportViewer() {
        var self = this;
        self.isListHidden = false
        self.isInfoHidden = true;
        //self.GetGrid();
      },

  //********************* System related*/
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

    editDataSidebar(data) {
       var self = this;
      self.isInfoHidden = false;
      self.isListHidden = true
        $("#viewer").boldReportViewer({ 
          reportServiceUrl: self.$buildUrl('ReportApi'),
          enablePageCache: false ,
          parameters: [
              { name: 'ReportName', labels: ['ReportName'], values: [data.id] },
              { name: 'Account', labels: ['Account'], values: [localStorage.getItem("userAccountKey")] },
              { name: 'Username', labels: ['Username'], values: [localStorage.getItem('userKey')] },
              { name: 'ReportType', labels: ['ReportType'], values: [data.reportTypeId] },
              ],
          processingMode: ej.ReportViewer.ProcessingMode.remote,
          ajaxBeforeLoad: self.ajaxBeforeLoad,
          toolbarSettings:{ items: ej.ReportViewer.ToolbarItems.All },
          printMode: true,
          reportPath: 'FAMS',
          PrintOptions: ej.ReportViewer.PrintOptions.newTab,
          reportExport: self.onReportExport,
          exportProgressChanged: self.onExportProgressChanged,
        });
    },
    //********************* Event functions */
    onReportExport : function(args) {
          var exportName = $(args.exportAction).find('#' + this._id + '_exportfileName');
      return exportName.val('DemoReport_01');
        },
    onReportPrint (args) {
      args.printWind.printDelay = 2000;
      args.isStyleLoad = false;
    },
    onExportProgressChanged (args) {
          if (args.stage == "beginExport") {
                  console.log(args.stage);
                  args.format =
                      $('#viewer').ejWaitingPopup({ showOnInit: true, cssClass: "customStyle", text: "Preparing exporting document.. Please wait..." });
              }
              else if (args.stage == "exportStarted") {
                  console.log(args.stage);
                  var popupObj = $('#viewer').data('ejWaitingPopup');
                  popupObj.hide();
              }
              else if (args.stage == "preparation") {
                  console.log(args.stage);
                  console.log(args.format);
                  console.log(args.preparationStage);
                  if (args.format == "PDF" && args.preparationStage == "documentPreparation") {
                      console.log(args.totalPages);
                      console.log(args.currentPage);
                      if (args.totalPages > 1 && args.currentPage > 1) {
                          var progressPercentage = Math.floor((args.currentPage / args.totalPages) * 100);
                          if (progressPercentage > 0) {
                              var popupObj = $('#viewer').data('ejWaitingPopup');
                              popupObj.setModel({ text: "Preparing exporting document.." + progressPercentage + " % completed.. Please wait..." });
                          }
                      }
                  }
              }

                args.handled = true;
      },

      ajaxBeforeLoad: function  (event) {
          event.data = event.model.parameters;
          return event
      },
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