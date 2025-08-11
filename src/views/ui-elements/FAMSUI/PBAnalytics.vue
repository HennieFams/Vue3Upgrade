<template>
  <div>

    <vx-card ref="MainCard" class="pb-3"  title="FAMS Analytics View" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="PowerBiAPI"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ PowerBiAPI.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : PowerBiAPI.length }} of {{ PowerBiAPI.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage=10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=20">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=50">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=100">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <template slot="thead">
            <vs-th>View</vs-th>
            <vs-th sort-key="Report">Analytics</vs-th>
            <vs-th sort-key="PowerBi" v-show="!isInfoHiddenPB">PowerBi</vs-th>       
            <vs-th sort-key="PowerType">AnalyticsType</vs-th>                        
          </template>
          <template slot-scope="{data}">

            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td class="whitespace-no-wrap">
                  <vx-tooltip text="Show Report">
                    <feather-icon
                      icon="EyeIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click.stop="PBISelected(tr)"
                    />
                  </vx-tooltip>
                
              </vs-td>
              <vs-td :data="tr.pb[0].name"  >{{tr.pb[0].name}}</vs-td>
              <vs-td :data="tr.pb[0].url" v-show="!isInfoHiddenPB">{{tr.pb[0].url}}</vs-td>
              <vs-td :data="tr.pb[0].powerType"  >{{tr.pb[0].powerType}}</vs-td>

            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vs-spacer></vs-spacer>
    <br>
      <div>
      <vx-card id="reportPowerbiCard"  ref="reportInfo" v-show="!isInfoHidden">
        <div class="vx-row">
          <vs-spacer></vs-spacer>
          <div class="vx-col">
            
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
              <h1><span>{{mreport}}</span></h1>
              <vs-spacer></vs-spacer>
              <h3><span>{{"(Token valid - " + resultInMinutes + " mins!)"}}</span></h3>
          </div>
          <div class="vx-col flex-2">
          <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelReportViewer">Close</vs-button>
          </div>
        </div>
        <vs-divider class="mb-6 pt-0"></vs-divider>
        <div style="height:78vh; width:80vw" id="container" ref="container"></div> 

      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import * as pbi from "powerbi-client";
import { debug } from 'util';
import moment from "moment";

export default {
  data() {
    return {
      resultInMinutes : 0,
      accesstoken:"",
      expiredate : "",
      itemsPerPage: 10,
      selected: [],
      PowerBiAPI: [],
      PowerBiInfo: [],
      isMounted: false,
      mtoken : "",
      mid: "",
      mreport: "",
      isListHidden: false,   
      isInfoHidden: true,
      isInfoHiddenPB: true,
    };
  },
  components: {
    flatPickr
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  mounted() {
    this.GetGrid();
    this.GetAccess_Token()
    this.isMounted = true;
  },
  methods: {
    PBISelected(tr) {
      var self = this;
      self.isInfoHidden = false;
      self.isListHidden = true;
      self.mreport = tr.pb[0].name;
      self.GetAccess_Token();
      var embedConfiguration = {
          type: 'report',
          accessToken: this.accesstoken,
          embedUrl: tr.pb[0].url,
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
    cancelReportViewer() {
        var self = this;
        self.isListHidden = false,
        self.isInfoHidden = true;
    },
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
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.PowerBiAPI = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "PowerBiAPI/GetPowerbi",
        onSuccess,
        onFinally
      );
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
  }
};
</script>
