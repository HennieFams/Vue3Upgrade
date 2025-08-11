<style>
/* @import "https://cdn.syncfusion.com/18.1.0.42/js/web/flat-saffron/ej.web.all.min.css"; */
  @import "https://cdn.boldreports.com/4.2.54/content/material/bold.reports.all.min.css";
</style>
<template>
  <div    class="vs-con-loading__container">
    <h3 class="p-3"> FAMS' Standard | Custom | System Report Viewer Page </h3>
    <vs-tabs v-model="activeTab" style="width: auto min-height:500px" >
      <vs-tab  label="Standard Report" style="min-height:500px" >
       <template>
          <div>
            <vx-card ref="MainCardStandard" class="vs-con-loading__container pb-3"  v-show="!isListHiddenMainCard">
              <div>
                <vs-table
                  ref="gridTable"
                  v-model="selected"
                  pagination
                  :max-items="itemsPerPage"
                  search
                  :data="reportData"
                   class="vs-con-loading__container"
                >
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <!-- ADD NEW -->
                    <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click.stop="GetGrid()"  icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                    <!-- ITEMS PER PAGE -->
                   
                  </div>
                  <template slot="thead">
                    <vs-th>View</vs-th>
                    <vs-th sort-key="Name">Report</vs-th>
                    <vs-th sort-key="reportype">Report Type</vs-th>
                
                  </template>
                  <!-- visible: false --   v-show="$acl.check('admin')" --> 
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td class="whitespace-no-wrap">
                          <vx-tooltip class="flex" text="View Standard Report">
                            <feather-icon
                              icon="EyeIcon"
                              svgClasses="w-5 h-5 hover:text-primary stroke-current"
                              @click.stop="editDataSidebarStandard(tr)"
                            />
                          </vx-tooltip>
                      </vs-td>
                      <vs-td :data="tr.name">{{tr.name}}</vs-td>
                      <vs-td :data="tr.reportType">{{tr.reportType}}</vs-td>
                    
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </vx-card>
            <vs-spacer></vs-spacer>
              <div>
              <vx-card id="reportViewerCard" ref="reportInfo" v-show="!isInfoHiddenreportViewerCard">
                <div class="vx-row">
                  <vs-spacer></vs-spacer>
                  <div class="vx-col">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click.stop="cancelReportViewer">Close</vs-button>
                  </div>
                </div>
                <!-- Creating a div tag which will act as a container for boldReportViewer widget.-->
                <!-- <div id="QDPGrid" style="height: 100%; width: 99.85%; min-height: 750px">
                  <div style="height: 100%; width: 99.85%; min-height: 750px" id="viewerStandard" ref="viewerviewerStandard"></div>
                </div> -->
                <div style="height: 100%; width: 99.85%; min-height: 750px" class="viewerStandard" id="viewerStandard" ref="viewerviewerStandard"></div>
                <vs-divider class="mb-6 pt-0"></vs-divider>
                <div class="vx-row">
                  <vs-spacer></vs-spacer>
                  <div class="vx-col">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click.stop="cancelReportViewer">Close</vs-button>
                  </div>
                </div>
              </vx-card>

            </div>
          </div>
       </template>
        
      </vs-tab>
      <vs-tab label="Custom Report" style="min-height:500px" > 
            <template>
              <div>
                <vx-card ref="MainCardCustom" class="vs-con-loading__container pb-3"  v-show="!isListHiddenCustom">
                  <div>
                    <vs-table
                      ref="gridTable2"
                      v-model="selectedCustom"
                      pagination
                      :max-items="itemsPerPageCustom"
                      search
                      :data="reportDataCustom"
                      class="vs-con-loading__container"
                    >
                      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                        <!-- ADD NEW -->
                        <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click.stop="GetGridCustom()" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                        <!-- ITEMS PER PAGE -->
                      </div>
                      <template slot="thead">
                        <vs-th>View</vs-th>
                        <vs-th sort-key="Name">Report</vs-th>
                        <vs-th sort-key="reportype">Report Type</vs-th>
                    
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td class="whitespace-no-wrap">
                              <vx-tooltip class="flex" text="View Custom Report">
                                <feather-icon
                                  icon="EyeIcon"
                                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                                  @click.stop="editDataSidebarCustom(tr)"
                                />
                              </vx-tooltip>
                          </vs-td>
                          <vs-td :data="tr.name">{{tr.name}}</vs-td>
                          <vs-td :data="tr.reportype">{{tr.reportype}}</vs-td>
                        
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </vx-card>
                <vs-spacer></vs-spacer>
                  <div>
                  <vx-card id="reportViewerCardCustom" ref="reportInfo" v-show="!isInfoHiddenreportViewerCustom">
                    <div class="vx-row">
                      <vs-spacer></vs-spacer>
                      <div class="vx-col">
                        <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelReportViewer">Close</vs-button>
                      </div>
                    </div>
                    <!-- Creating a div tag which will act as a container for boldReportViewer widget.-->
                    <div style="height: 100%; width: 99.85%; min-height: 750px" id="viewerCustom" ref="viewerviewerCustom"></div>

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

      </vs-tab>
      <vs-tab  label="System Report" style="min-height:500px">
            <template>
              <div>
                <vx-card ref="MainCardSystem" class="vs-con-loading__container pb-3"   v-show="!isListHiddenSystem">
                  <div>
                    <vs-table
                      ref="gridTable3"
                      v-model="selected"
                      pagination
                      :max-items="itemsPerPage"
                      search
                      :data="reportDataSystem"
                      class="vs-con-loading__container"
                    >
                      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                        <!-- ADD NEW -->
                        <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click.stop="GetGridSystem()" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                        <!-- ITEMS PER PAGE -->
               
                      </div>
                      <template slot="thead">
                        <vs-th>View</vs-th>
                        <vs-th sort-key="Name">Report</vs-th>
                        <vs-th sort-key="reportype">Report Type</vs-th>
                    
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td class="whitespace-no-wrap">
                              <vx-tooltip class="flex" text="View System Report">
                                <feather-icon
                                  icon="EyeIcon"
                                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                                  @click.stop="editDataSidebarSystem(tr)"
                                />
                              </vx-tooltip>
                            
                          </vs-td>
                          <vs-td :data="tr.name">{{tr.name}}</vs-td>
                          <vs-td :data="tr.reportype">{{tr.reportype}}</vs-td>
                        
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </vx-card>
                <vs-spacer></vs-spacer>
                  <div>
                  <vx-card id="reportViewerCard" ref="reportInfo" v-show="!isInfoHiddenreportViewerCardSystem">
                    <div class="vx-row">
                      <vs-spacer></vs-spacer>
                      <div class="vx-col">
                        <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelReportViewer">Close</vs-button>
                      </div>
                    </div>
                    <!-- Creating a div tag which will act as a container for boldReportViewer widget.-->
                    <div style="height: 100%; width: 99.85%; min-height: 750px" id="viewerSystem" ref="viewerSystem"></div>

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

      </vs-tab>
    </vs-tabs>

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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";


export default {
  data() {
    return {

      operatorTypeSelect:0,
      operatorTypeData:[],

      isListHiddenMainCard: false, 
      isListHiddenCustom: false,
      isListHiddenSystem:false,   
      isInfoHiddenreportViewerCard: true,
      isInfoHiddenreportViewerCustom: true,
      isInfoHiddenreportViewerCardSystem:true,

      itemsPerPage: 10,
      itemsPerPageCustom: 10,
      selected: [],
      selectedCustom: [],
      reportData: [],
      reportDataCustom: [],
      reportDataSystem: [],
      isMounted: false,
      isMountedCustom: false,
      isMountedSystem: false,
      activeTab: 0,
      formData: {
        id:0,
        accountId:0,
        operatorTypeId:0,
        operatorType: "None",
        name:"None",
        enable:true,
        description:"None",
        account:"",       
        tag  :"",       
        perOperatorDataStore:
          [{
            id:0,
            storeId:0,
            operatorId:0,
            download:0,
          }]
        }   
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,

  },
  computed: {
    currentPage() {
      var self = this;
      if (self.isMounted) {
        if(self.activeTab == 0){
          return self.$refs.gridTable.currentx;
        }
        else if(self.activeTab == 1){
          return self.$refs.gridTable2.currentx;
        }
        else if(self.activeTab == 2){
          return self.$refs.gridTable3.currentx;
        }
        
      }
      return 0;
    },
    // currentPageTab2() {
    //   var self = this;
    //   if (self.isMountedCustom) {
    //     return self.$refs.gridTable2.currentx;
    //   }
    //   return 0;
    // }
  },
  watch:{
    activeTab: function(val){
      var self = this;
      if(val == 0){
        setTimeout(function(){
          self.GetGrid();
          self.isMounted = true;
        }, 100);
      }
      else if(val == 1){
        setTimeout(function(){
          self.GetGridCustom();
          self.isMounted = true;
        }, 100);
      }
      else if(val == 2){
        setTimeout(function(){
          self.GetGridSystem();
          self.isMounted = true;
        }, 100);
      }
    },
  },
  ready()
  {
   
  },
  created() {
    document.addEventListener('beforeunload', this.handler)
  },
  mounted() {
    var self = this;
    setTimeout(function(){
      self.GetGrid();
      self.isMounted = true;
    }, 100);
    // self.GetGridCustom();
    // self.GetGridSystem();
    // alert($acl.check('admin'));
    //this.GetGrid();
    // this.isMounted = true;
    // this.isMountedCustom = true;
  },
  methods: {
    totalRows(rowCount){
      var self = this;
      self.itemsPerPage = rowCount;
      self.$refs.gridTable.currentx = 1;
    },
    totalRowsCustom(rowCount){
      var self = this;
      self.itemsPerPageCustom = rowCount;
      self.$refs.gridTable2.currentx = 1;
    },

    handler: function handler(event) {
            if (!ej.isNullOrUndefined($("#viewerSystem").boldReportViewer("instance"))) 
              $("#viewerSystem").boldReportViewer('destroy'); 
            if (!ej.isNullOrUndefined($("#viewerCustom").boldReportViewer("instance"))) 
              $("#viewerCustom").boldReportViewer('destroy'); 
            if (!ej.isNullOrUndefined($("#viewerStandard").boldReportViewer("instance"))) 
              $("#viewerStandard").boldReportViewer('destroy'); 
      },

    cancelReportViewer() {
        var self = this;
        self.isListHiddenMainCard = false
        self.isListHiddenCustom = false;
        self.isListHiddenSystem = false;
        self.isInfoHiddenreportViewerCard = true;
        self.isInfoHiddenreportViewerCustom = true;
        self.isInfoHiddenreportViewerCardSystem = true;
         if(self.$refs.gridTable){
          self.$vs.loading.close(self.$refs.gridTable.$el);
        }
        else if(self.$refs.gridTable2){
          self.$vs.loading.close(self.$refs.gridTable2.$el);
        }
        else if(self.$refs.gridTable3){
          self.$vs.loading.close(self.$refs.gridTable3.$el);
        }
      },

      

  //********************* System related*/
    successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
     successNotifyLoadCustom(msg) {
      this.$vs.notify({
        title: 'Successfully',
        text : msg,
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

    editDataSidebarSystem(data) {
      var self = this;
      self.isInfoHiddenreportViewerCardSystem = false;
      self.isListHiddenSystem = true;
        $("#viewerSystem").boldReportViewer({ 
          reportServiceUrl: self.$buildUrl('ReportApi'),
          enablePageCache: false ,
          parameters: [
              { name: 'ReportName', labels: ['ReportName'], values: [data.id] },
              { name: 'Account', labels: ['Account'], values: [localStorage.getItem("userAccountKey")] },
              { name: 'Username', labels: ['Username'], values: [localStorage.getItem('userKey')] },
              { name: 'ReportType', labels: ['ReportType'], values: [data.reportype == "None" ? "0" : data.reportype == "Custom" ? "1" : data.reportype == "System" ? "2" : data.reportype == "Standard" ? "3" : null] },
              ],
          processingMode: ej.ReportViewer.ProcessingMode.remote,
          ajaxBeforeLoad: self.ajaxBeforeLoad,
          toolbarSettings:{ items: ej.ReportViewer.ToolbarItems.All },
          printMode: true,
          reportPath: 'FAMS',
          PrintOptions: ej.ReportViewer.PrintOptions.newTab,
          exportSettings: { exportOptions: ej.ReportViewer.ExportOptions.All & ~ej.ReportViewer.ExportOptions.Html & ~ej.ReportViewer.ExportOptions.Word },
          // reportExport: self.onReportExport,
          exportProgressChanged: self.onExportProgressChangedSystem
        });
    },


    editDataSidebarCustom(data) {
      var self = this;
      self.isInfoHiddenreportViewerCustom = false;
      self.isListHiddenCustom = true;
        $("#viewerCustom").boldReportViewer({ 
          reportServiceUrl: self.$buildUrl('ReportApi'),
          enablePageCache: false ,
          parameters: [
              { name: 'ReportName', labels: ['ReportName'], values: [data.id] },
              { name: 'Account', labels: ['Account'], values: [localStorage.getItem("userAccountKey")] },
              { name: 'Username', labels: ['Username'], values: [localStorage.getItem('userKey')] },
              ],
          processingMode: ej.ReportViewer.ProcessingMode.remote,
          ajaxBeforeLoad: self.ajaxBeforeLoad,
          toolbarSettings:{ items: ej.ReportViewer.ToolbarItems.All },
          printMode: true,
          reportPath: 'FAMS',
          PrintOptions: ej.ReportViewer.PrintOptions.newTab,
         	exportSettings: { exportOptions: ej.ReportViewer.ExportOptions.All & ~ej.ReportViewer.ExportOptions.Html & ~ej.ReportViewer.ExportOptions.Word },
          // reportExport: self.onReportExport,
           exportProgressChanged: self.onExportProgressChangedCustom
        });
    },

    editDataSidebarStandard(data) {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      self.isListHiddenMainCard = true;
      setTimeout(() => {
        $("#viewerStandard").boldReportViewer({ 
          reportServiceUrl: self.$buildUrl('ReportApi'),
          enablePageCache: false ,
          parameters: [
              { name: 'ReportName', labels: ['ReportName'], values: [data.reportStandardId] },
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
            exportSettings: { exportOptions: ej.ReportViewer.ExportOptions.All & ~ej.ReportViewer.ExportOptions.Html & ~ej.ReportViewer.ExportOptions.Word },
            exportProgressChanged: self.onExportProgressChangedStandard
          //reportExport: self.onReportExport,
          //exportProgressChanged: self.onExportProgressChanged,
        });
        self.isInfoHiddenreportViewerCard = false;
      }, 1000);

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
      onExportProgressChangedSystem (args) {
          if (args.stage == "beginExport") {
                  console.log(args.stage);
                  args.format =
                      $('#viewerSystem').ejWaitingPopup({ showOnInit: true, cssClass: "customStyle", text: "Preparing exporting document.. Please wait..." });
              }
              else if (args.stage == "exportStarted") {
                  console.log(args.stage);
                  var popupObj = $('#viewerSystem').data('ejWaitingPopup');
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
                              var popupObj = $('#viewerSystem').data('ejWaitingPopup');
                              popupObj.setModel({ text: "Preparing exporting document.." + progressPercentage + " % completed.. Please wait..." });
                          }
                      }
                  }
              }

                args.handled = true;
      },
     onExportProgressChangedCustom (args) {
          if (args.stage == "beginExport") {
                  console.log(args.stage);
                  args.format =
                      $('#viewerCustom').ejWaitingPopup({ showOnInit: true, cssClass: "customStyle", text: "Preparing exporting document.. Please wait..." });
              }
              else if (args.stage == "exportStarted") {
                  console.log(args.stage);
                  var popupObj = $('#viewerCustom').data('ejWaitingPopup');
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
                              var popupObj = $('#viewerCustom').data('ejWaitingPopup');
                              popupObj.setModel({ text: "Preparing exporting document.." + progressPercentage + " % completed.. Please wait..." });
                          }
                      }
                  }
              }

                args.handled = true;
      },
    onExportProgressChangedStandard (args) {
          if (args.stage == "beginExport") {
                  console.log(args.stage);
                  args.format =
                      $('#viewerStandard').ejWaitingPopup({ showOnInit: true, cssClass: "customStyle", text: "Preparing exporting document.. Please wait..." });
              }
              else if (args.stage == "exportStarted") {
                  console.log(args.stage);
                  var popupObj = $('#viewerStandard').data('ejWaitingPopup');
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
                              var popupObj = $('#viewerStandard').data('ejWaitingPopup');
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

    //********************* SQL events */
    formSubmitted() {
          var self = this;
          var myobject={};
    },
     GetGridSystem() {
      var self = this;
      self.showLoadingOnElement("gridTable3", 1, "radius");
      self.isInfoHiddenreportViewerCard = true;   
      self.isInfoHiddenreportViewerCustom = true;
      self.isInfoHiddenreportViewerCardSystem = true;  

      var onSuccess = function(response) {
        self.reportDataSystem = response.data;
      };
      var onFinally = function() {
        if(self.$refs.gridTable3){
          self.$vs.loading.close(self.$refs.gridTable3.$el);
        }
        // self.$vs.loading.close(self.$refs.gridTable3.$el);
      };
      self.$ajaxGet(
        self,
          "Reports/GetSystemReportdropdown",
        onSuccess,
        onFinally
      );
    },
    GetGridCustom() {
      var self = this;
      self.showLoadingOnElement("gridTable2", 1, "radius");
      self.isInfoHiddenreportViewerCard = true;   
      self.isInfoHiddenreportViewerCustom = true;
      self.isInfoHiddenreportViewerCardSystem = true;  
      var onSuccess = function(response) {
        self.reportDataCustom = response.data;
      };
      var onFinally = function() {
        if(self.$refs.gridTable2){
          self.$vs.loading.close(self.$refs.gridTable2.$el);
        }
};
      self.$ajaxGet(
        self,
          "Reports/GetReportdropdown",
        onSuccess,
        onFinally
      );
    }  ,
    GetGrid() {
      var self = this;
     self.showLoadingOnElement("gridTable", 1, "radius");
      self.isInfoHiddenreportViewerCard = true;   
      self.isInfoHiddenreportViewerCustom = true; 
      self.isInfoHiddenreportViewerCardSystem = true; 
      var onSuccess = function(response) {
        self.reportData = response.data;
        if(self.$refs.gridTable){
          self.$vs.loading.close(self.$refs.gridTable.$el);
        }
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
          "PerReportStandardAccounts/GetReports",
        onSuccess,
        onFinally
      );
    }
  }
};

</script>

<style>
 .bold-report-parameter-row .parameter-value {
    display: inline-block;
    width: auto;
    margin-right: 5200px; /* Adjust as needed */
}
.bold-report-parameter-row .parameter-icon {
    display: inline-block;
    margin-left: 10px; /* Adjust as needed */
}
.bold-report-parameter-row .parameter-label {
    display: inline-block;
    margin-right: 5px; /* Adjust as needed */
}

</style>