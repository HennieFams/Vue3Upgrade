<!-- =========================================================================================
    File Name: LoadingDefault.vue
    Description: Add default loading to your application
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
    CRUD_Account_Get CRUD_Account_Get
    https://localhost:44341/api/FAMS/SP_JsonResult?storeproc=CRUD_Account_Get&parameters=1
========================================================================================== -->

<style>
/* @import "https://cdn.syncfusion.com/18.1.0.42/js/web/flat-saffron/ej.web.all.min.css"; */
  @import "https://cdn.boldreports.com/4.2.54/content/material/bold.reports.all.min.css";
</style>

<template>
  <div>
    <vx-card ref="MainCard" class="pb-3"  title="FAMS Standard - Manager view (Remove/View reports from account)"  v-show="!isListHidden">
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
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ reportData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : reportData.length }} of {{ reportData.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <vs-th>View</vs-th>
            <vs-th sort-key="Name">Report</vs-th>
            <vs-th sort-key="reportype">Report Type</vs-th>
         
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td id="iconContainer" class="whitespace-no-wrap">
                  <vx-tooltip class="flex" text="View Report">
                    <feather-icon
                  icon="EyeIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editDataSidebar(tr)"
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";


export default {
  data() {
    return {

      operatorTypeSelect:0,
      operatorTypeData:[],

      isListHidden: false,   
      isInfoHidden: true,

      itemsPerPage: 10,
      selected: [],
      reportData: [],
    
      isMounted: false,
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
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  ready()
  {
   

    
  },
  created() {
    document.addEventListener('beforeunload', this.handler)
  },
  mounted() {
    // alert($acl.check('admin'));
    this.GetGrid();
    this.isMounted = true;

  },
  methods: {
    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
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

    acceptAlert(){
      var self = this;
      // var id = self.selected.id;
      self.showLoadingOnElement("gridTable", 0.65, "radius");
      
      var onSuccess = function (response) {
         var tmp = response.data;
         self.successNotifyLoadCustom(tmp.message);
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      var onFinally = function () {
        self.GetGrid();
      };
      
      self.$ajaxDelete(
        self,
        `PerReportStandardAccounts/${self.selected.id}`,
        onSuccess,
        onFinally
      );
    },
    deleteReport(tr){
       this.selected = tr;
       this.$vs.dialog({
        type:'confirm',
        color: 'primary',
        title: `Confirm`,
        text: 'You are about to remove the report:' + tr.name + ' from this account ',
        accept:this.acceptAlert
      });
    },
    editDataSidebar(data) {
      //debugger;
      var self = this;
      self.isInfoHidden = false;
      self.isListHidden = true
        $("#viewer").boldReportViewer({ 
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
      cancelAdd() {
        this.isListHidden = false,
        this.isInfoHidden = true;
        this.initValues();
        this.GetGrid();
    },
    addVue() {
        this.initValues();
        this.isInfoHidden = false;
        this.isListHidden = true
        this.GetDropdownOperatorType();
        // this.$refs.wizard.navigateToTab(0)

    },

    saveOperatorParameters(data)
    {
    },
    initValues() {
          var self = this;
          self.$refs.wizard.navigateToTab(0)
    },
    //********************* SQL events */
    formSubmitted() {
          var self = this;
          var myobject={};
    },
      
    GetGrid() {
      const self = this;
      self.isInfoHidden = true;
      // if (!ej.isNullOrUndefined($("#viewer").ejReportViewer("instance"))) 
      //               $("#viewer").ejReportViewer('destroy'); 

      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.reportData = response.data;
        self.$refs.gridTable.currentx = 1;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
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
    
        // let jQuery = document.createElement('script');
    // jQuery.setAttribute('src','./bold_scripts/jquery-1.10.2.min.js');
    // document.head.appendChild(jQuery);

    // let boldcommon = document.createElement('script');
    // boldcommon.setAttribute('src','https://cdn.boldreports.com/4.2.54/scripts/common/bold.reports.common.min.js');
    // document.head.appendChild(boldcommon);

    // let boldwidgets = document.createElement('script');
    // boldwidgets.setAttribute('src','https://cdn.boldreports.com/4.2.54/scripts/common/bold.reports.widgets.min.js');
    // document.head.appendChild(boldwidgets);

    // let boldchart = document.createElement('script');
    // boldchart.setAttribute('src','https://cdn.boldreports.com/4.2.54/scripts/data-visualization/ej.chart.min.js');
    // document.head.appendChild(boldchart);

    // let boldReportViewer = document.createElement('script');
    // boldReportViewer.setAttribute('src','https://cdn.boldreports.com/4.2.54/scripts/bold.report-viewer.min.js');
    // document.head.appendChild(boldReportViewer);

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