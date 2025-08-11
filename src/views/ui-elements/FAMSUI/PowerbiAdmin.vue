<template>
  <div>
    <powerbiAdmin-sidebar
      :isSidebarActive="isPowerbiSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vs-tabs v-model="activeTab" style="width: auto min-height:500px" v-show="isInfoHidden">
      <vs-tab label="Analytic Information" style="min-height:500px">
        <vx-card ref="MainCard" class="pb-3"  title="FAMS Analytics Setup" v-show="!isListHidden">
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
                <vs-th>Assign</vs-th>
                <vs-th sort-key="Report">Analytics</vs-th>
                <vs-th sort-key="FAMSUrl">Powerbi URL</vs-th>
              </template>
              <template slot-scope="{data}">            
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td class="whitespace-no-wrap">
                    <vx-tooltip class="flex" text="View Report">
                      <feather-icon
                      icon="EyeIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click.stop="PBISelected(tr)"/>
                    </vx-tooltip>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vx-tooltip class="flex" text="Assign to Account">
                      <feather-icon
                      icon="SaveIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click.stop="handleSelectedPowerBi(tr)"/>
                    </vx-tooltip>
                    
                  </vs-td>
                  <vs-td :data="tr.name" >{{tr.name}}</vs-td>
                  <vs-td :data="tr.embedUrl">{{tr.embedUrl}}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <vs-popup
            title="Assign to Account"
            :active.sync="popupActive"
          >
            <div class="vx-col md:w-full w-full mt-5">
              <label class="w-full" >Select Account</label>
              <v-select class="w-full"  placeholder="Search / Select Account"  :options="accountDataList"  
                v-model="accountDropdown" name="Search / Select Account" />
            </div>
            <div class="vx-col md:w-full w-full mt-5">   
              <label class="w-full" >Analytic's Name</label>
              <vs-input class="w-full" v-model="formData.name"
                name ="Analytic's Name" v-validate="'required'"/>
              <span class="text-danger text-sm" v-show="errors.has('Analytics Name')" >{{ errors.first('Analytics Name') }}</span>
            </div>
            <div class="vx-col md:w-full w-full mt-5">
              <div class="vx-col w-full">
                <label>Analytics Type</label>
                <v-select
                  ref="reportDropDown"
                  class="w-full"
                  placeholder="Select a Type"
                  :options="powerbiTypesData"
                  v-model="powerbiTypesDropdown"
                ></v-select>
              </div>
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <div class="vx-col">
                <vs-checkbox v-model="formData.enable">Enable</vs-checkbox>
              </div>
            </div>
            <div class="vx-row flex flex-wrap items-center">
              <vs-spacer />
              <div class="vx-col">
                <vs-button
                  ref="saveButton"
                  class="rounded-lg mr-3 vs-con-loading__container"
                  color="success"
                  type="border"
                  @click="assignToAccount()"
                  >Save</vs-button
                >
                <vs-button
                  class="rounded-lg mr-3"
                  color="warning"
                  type="border"
                  @click="closePopup()"
                  >Cancel</vs-button
                >
              </div>
            </div>
          </vs-popup>
        </vx-card>
      </vs-tab>
      <vs-tab label="Account Analytics Infomation" style="min-height:500px">
        <vx-card ref="MainCard" class="pb-3"  title="FAMS Analytics Setup">
          <div>
            <vs-table
              ref="crudTable"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="PowerBiAPICrud"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGridCrud()" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ PowerBiAPICrud.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : PowerBiAPICrud.length }} of {{ PowerBiAPICrud.length }}</span>
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
                <vs-th sort-key="Report">Account</vs-th>
                <vs-th sort-key="Report">Analytic Name</vs-th>
                <vs-th sort-key="FAMSUrl">Powerbi URL</vs-th>
                <vs-th>Action</vs-th>            
              </template>
              <template slot-scope="{data}">            
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.accountName">{{tr.accountName}}</vs-td>
                  <vs-td :data="tr.name" >{{tr.name}}</vs-td>
                  <vs-td :data="tr.url">{{tr.url}}</vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vx-tooltip id="iconContainer" class="flex" text="Edit Report Information">
                      <feather-icon
                    icon="EditIcon"
                    ref="edit"
                    svgClasses="w-5 h-5 hover:text-success stroke-current"
                    @click="handleSelectedPowerBi(tr)"
                  />
                    </vx-tooltip>
                  <vx-tooltip class="flex" text="Delete Report">
                    <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2"
                    @click="deletePowerBi(tr)"
                  />
                  </vx-tooltip>
                  
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </vs-tab>
    </vs-tabs>
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
        <div style="height:80vh; width:80vw" id="container" ref="container"></div> 

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
import PowerbiAdminSidebar from './PowerbiAdminSidebar.vue';
import vSelect from "vue-select";

export default {
  data() {
    return {
      resultInMinutes : 0,
      accesstoken:"",
      expiredate : "",
      itemsPerPage: 10,
      itemsPerPage2: 10,
      selected: [],
      PowerBiAPI: [],
      PowerBiAPICrud: [],
      PowerBiInfo: [],
      isMounted: false,
      isCrudMounted: false,
      mtoken : "",
      mid: "",
      mreport: "",
      isListHidden: false,   
      isInfoHidden: true,
      sidebarData: {},
      isPowerbiSidebarActive: false,
      activeTab: 0,
      accountDataList: [],
      powerbiTypesData: [],
      powerbiTypesDropdown: null,
      enableCheck: false,
      accountDropdown: "",
      popupActive: false,
      formData:{
        accountId: 0,
        name: "",
        analyticTypeId: 0,
        enable: false,
        url: "",
      },
    };
  },
  components: {
    flatPickr,
    PowerbiAdminSidebar,
    vSelect,
  },
  computed: {
    currentPage() {
      if (this.isMounted && !this.isCrudMounted) {
        return this.$refs.gridTable.currentx;
      }
      else if (this.isCrudMounted && !this.isMounted) {
        return this.$refs.crudTable.currentx;
      }
      return 0;
    },
  },
  watch: {
    activeTab: function(val){
      var self = this;
      if(val == 0){
        setTimeout(function(){
        self.GetGrid();
        self.isMounted = true;
        self.isCrudMounted = false;
        }, 100);
      }
      else if(val == 1){
        setTimeout(function(){
          //self.GetGridCrud();
          self.isCrudMounted = true;
          self.isMounted = false;
        }, 100);
      }
    },
  },
  mounted() {
    var self = this;
    setTimeout(function(){
      self.GetGrid();
      self.GetGridCrud();
      self.GetToken();
      self.isMounted = true;
      self.isCrudMounted = false;
      if ((localStorage.accesstoken == "undefined") || (localStorage.expiredate == "undefined") || (localStorage.expiredate <= 0))  self.GetToken();
    },100);
    
  },
  methods: {
    PBISelected(tr) {
      var self = this;
      self.isInfoHidden = false;
      self.isListHidden = true;
      self.mreport = tr.name;
      self.GetAccess_Token();
      var embedConfiguration = {
          type: 'report',
          accessToken: this.accesstoken,
          embedUrl: tr.embedUrl,
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
      if ((localStorage.accesstoken != "undefined") || (localStorage.expiredate != "undefined")) {
            try {
                  var startTime = new Date(); 
                  var endTime = new Date(localStorage.expiredate);
                  var difference = endTime.getTime() - startTime.getTime(); 
                  self.resultInMinutes = Math.round(difference / 60000);
                  if (self.resultInMinutes > 0) {
                    self.accesstoken = localStorage.accesstoken;
                    self.expiredate = localStorage.expiredate;
                    localStorage.resultInMinutes = self.resultInMinutes;
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
          self.resultInMinutes = localStorage.resultInMinutes;
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
        self.getDropdownAccountList();
        self.getPowerbiTypeDropDown();
      };
      self.$ajaxGet(
        self,
        "PowerBiAPI/GetPowerbiReportWithToken",
        onSuccess,
        onFinally
      );
    },
    GetGridCrud() {
      const self = this;
      //self.showLoadingOnElement("crudTable", 1, "radius");
      var onSuccess = function(response) {
        self.PowerBiAPICrud = response.data;
      };
      var onFinally = function() {
        //self.$vs.loading.close(self.$refs.crudTable.$el);
      };
      self.$ajaxGet(
        self,
        "PowerBiAPI/GetPowerbiCrud",
        onSuccess,
        onFinally
      );
    },
    GetToken() {     
      const self = this;
      var onSuccess = function(response) {
        localStorage.removeItem('expiredate');
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('resultInMinutes');
        localStorage.resultInMinutes = 59
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
    cancelSidebar() {
      this.isListHidden = false,
      this.isInfoHidden = true;
      this.initValues();
      this.GetGridCrud();
    },
    showSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val){
        if (val)
        this.isPowerbiSidebarActive = true;
        else{
          this.isPowerbiSidebarActive = false;
          this.GetGridCrud();
        }
    },
    initValues(){
      this.formData.name = "";
      this.formData.url = "";
      this.formData.accountId = 0;
      this.formData.analyticTypeId = 0;
      this.formData.enable = false;
      this.powerbiTypesDropdown = null;
      this.accountDropdown = null;
    },
    handleSelectedPowerBi(data){
      var self = this;
      if(self.activeTab == 0){
        var temp = self.PowerBiAPICrud.filter(function(item) {
          return item.name == data.name;
        })[0];
        self.formData.name = data.name;
        self.formData.url = data.embedUrl;
        
        setTimeout(function(){
          self.powerbiTypesDropdown = self.powerbiTypesData.filter(function (item) {
              return item.value == temp.powerBiTypeId;
          })[0];
          self.accountDropdown = self.accountDataList.filter(function(item) {
            return item.value == temp.accountId;
          })[0];
          self.formData.accountId = temp.accountId;
          self.formData.analyticTypeId = temp.powerBiTypeId;
          self.formData.enable = temp.enable;
          self.formData.url = temp.url;
        }, 300);
        self.popupActive = true;
      }
      else if(self.activeTab == 1){
        self.sidebarData = data;
        //this.initValues();
        self.toggleDataSidebar(true);
      }
    },
    getDropdownAccountList() {
      var self = this;
      var onSuccess = function (response) {
        self.accountDataList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "Accounts/GetAccountdropdown",
        onSuccess,
        onFinally
      );
    },
    successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
    deletePowerBi(tr){
      var self = this;
      var onSuccess = function () {
        self.GetGridCrud();
      };
      var onFinally = function () {
          self.successNotify();
      };
      
      self.$ajaxDelete(
        self,
        `PowerBiAPI/${tr.id}`,
        onSuccess,
        onFinally
      );
    },
    getPowerbiTypeDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.powerbiTypesData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "PowerBiTypes/GetPowerBiTypedropdown",
        onSuccess,
        onFinally
      );
    },
    closePopup(){
      this.popupActive = false;
      this.initValues();
    },
    assignToAccount(){
      var self = this;
      self.formData.analyticTypeId = self.powerbiTypesDropdown.value;
      self.formData.accountId = self.accountDropdown.value;
      var onSuccess = function(){
        self.closePopup();
      }
      var onFinally = function(){}
      self.$ajaxPost(
        self,
        "PowerBiAPI/AssignToAccount",
        self.formData,
        onSuccess,
        onFinally);
    }
  }
};


</script>
<style>
#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 0px 0px 5px;
}
</style>