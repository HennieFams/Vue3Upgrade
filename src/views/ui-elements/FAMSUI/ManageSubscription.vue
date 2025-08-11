<!-- =========================================================================================
    File Name: Subscription.vue
    Description: Add default loading to your application
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
    CRUD_Account_Get CRUD_Account_Get
    https://localhost:44341/api/FAMS/SP_JsonResult?storeproc=CRUD_Account_Get&parameters=1
========================================================================================== -->


<template>
  <div>
    <manageSubscription-sidebar
      :isSidebarActive="isManageSubscriptionSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          id="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="accountsData"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addSub"         icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="openParamView" icon-pack="feather" icon="icon-edit" >Subscription Parameter View</vs-button
            >
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ accountsData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : accountsData.length }} of {{ accountsData.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <div class="vx-col w-2/5 mb-2">
              <vs-checkbox
                class="float-left mb-2"
                style="width: fit-content"
                name="cbExpiredStores"
                v-model="showExpiredStores"
                >Show Only Expired Subscriptions
              </vs-checkbox>
              <vs-checkbox
                class="float-left"
                style="width: fit-content"
                name="cbBlockedAccounts"
                v-model="showBlockedAccounts"
                >Show Only Blocked Accounts
              </vs-checkbox>
            </div>
          </div>
          <template slot="thead">
            <vs-th sort-key="accountName">Account Name</vs-th>
            <vs-th>Block</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" id="tableRow" style="border: solid white 1px">
              <vs-td :data="tr.accountName">{{tr.accountName}}</vs-td>
              <vs-td>
                <div class="vx-col">
                  <vs-switch class="rounded-pill" @change="blockAccount(tr)" v-model="tr.blocked" color="danger">
                    <span slot="off">No</span>
                    <span slot="on">Yes</span>
                  </vs-switch>
                </div>
              </vs-td>
              <template class="expand-user" slot="expand" >
                <div class="con-expand-users w-full" >
                  <div>
                    <vs-table
                      ref="gridTable2"
                      v-model="selected"
                      :data="tr.perSubscriptionAccount"              
                    >
                      <template slot="thead">
                        <vs-th>Subscription Name  </vs-th>
                        <vs-th>Subscription Type</vs-th>  
                        <vs-th>Subscription Interval</vs-th> 
                        <!-- <vs-th>Sub Id</vs-th>   -->
                        <vs-th>TableName</vs-th>
                        <vs-th>Subscription Create Date</vs-th>
                        <vs-th>Subscription Renewed Date</vs-th>
                        <vs-th>Subscription Expire Date</vs-th>
                        <vs-th>Price(R)</vs-th>
                        <vs-th>Action</vs-th>
                      </template>
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">                              
                          <vs-td :data="tr.subscriptionName">{{tr.subscriptionName}}</vs-td>
                          <vs-td :data="tr.subscriptionType">{{tr.subscriptionType}}</vs-td>
                          <vs-td :data="tr.subscriptionInterval">{{tr.subscriptionInterval}}</vs-td>
                          <!-- <vs-td :data="tr.subId">{{tr.subId}}</vs-td> -->
                          <vs-td :data="tr.tableName">{{tr.tableName}}</vs-td>
                          <vs-td :data="tr.subscriptionCreateDate">{{tr.subscriptionCreateDate}}</vs-td>
                          <vs-td :data="tr.subscriptionRenewedDate">{{tr.subscriptionRenewedDate}}</vs-td>
                          <vs-td :data="tr.subscriptionExpireDate">{{tr.subscriptionExpireDate}}</vs-td>
                          <vs-td :data="tr.price">{{tr.price}}</vs-td>
                          <vs-td id="expandIconContainer" class="whitespace-no-wrap">
                            <vx-tooltip class="flex" text="Renew Subscription">
                              <feather-icon
                              icon="EditIcon"
                              svgClasses="w-5 h-5 hover:text-primary stroke-current"
                              @click.stop="EditSubscription(tr)"
                            />
                            </vx-tooltip>
                            <vx-tooltip class="flex" text="Delete Subscription">
                              <feather-icon
                                icon="TrashIcon"
                                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                class="ml-2"
                                @click.stop="deleteSubscription(tr)"
                              />
                            </vx-tooltip>
                            
                            
                          </vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
            </template>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vx-card ref="ParamCard" v-show="!isDetailListHidden">
      <div>
        <vs-table
          ref="gridTable2"
          id="gridTable2"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="accountsDataParam"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" type="filled" @click="openParamView" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="warning" @click="cancelAdd" icon-pack="feather" icon="icon-plus-square" >Return</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" @click="exportCSV" icon-pack="feather" icon="icon-edit" >Export To CSV</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="showExportPopup" icon-pack="feather" icon="icon-edit">Export To Email</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ accountsDataParam.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : accountsDataParam.length }} of {{ accountsDataParam.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <vs-th>Account </vs-th>
            <vs-th>Subscription Name  </vs-th>
            <vs-th>Subscription Type</vs-th>
            <vs-th>Subscription Interval</vs-th>
            <vs-th>TableName</vs-th>
            <vs-th>Subscription Create Date</vs-th>
            <vs-th>Subscription Renewed Date</vs-th>
            <vs-th>Subscription Expire Date</vs-th>
            <vs-th>Account Blocked</vs-th>
            <vs-th>Days Remaining </vs-th>
            <vs-th>Price(R)</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr>
              <vs-td>
                <vs-input
                  v-model="queryAccount"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="querySubName"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryType"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryInterval"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryTable"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryCreate"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryRenew"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryExpire"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryBlocked"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryRemaining"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="queryPrice"
                  class="w-full"
                />
              </vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
              <!-- <vs-td id="expandIconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Renew Subscription">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="EditSubscription(tr)"
                />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Subscription">
                  <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2"
                    @click.stop="deleteSubscription(tr)"
                  />
                </vx-tooltip>
              </vs-td> -->
              <vs-td :data="tr.account">{{tr.account}}</vs-td>
              <vs-td :data="tr.subscriptionName">{{tr.subscriptionName}}</vs-td>
              <vs-td :data="tr.subscriptionType">{{tr.subscriptionType}}</vs-td>
              <vs-td :data="tr.subscriptionInterval">{{tr.subscriptionInterval}}</vs-td>
              <!-- <vs-td :data="tr.subId">{{tr.subId}}</vs-td> -->
              <vs-td :data="tr.tableName">{{tr.tableName}}</vs-td>
              <vs-td :data="tr.subscriptionCreateDate">{{tr.subscriptionCreateDate}}</vs-td>
              <vs-td :data="tr.subscriptionRenewedDate">{{tr.subscriptionRenewedDate}}</vs-td>
              <vs-td :data="tr.subscriptionExpireDate">{{tr.subscriptionExpireDate}}</vs-td>
              <vs-td :data="tr.blocked">{{tr.blocked}}</vs-td>
              <vs-td :style="getColor(tr)" :data="tr.dayRemaining">{{tr.dayRemaining}}</vs-td>
              <vs-td :data="tr.price">{{tr.price}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <!-- Form Wizard Card -->
    <vx-card ref="MainCard2" v-show="!isInfoHidden">
      <div class="mt-5">
        <div class="vx-row">
          <div class="vx-col md:w-1/6 w-full">
            <vs-button
              color="warning"
              type="border"
              class="rounded-lg mb-2"
              @click="cancelAdd"
              >Return</vs-button
            >
          </div>
          <div class="vx-col md:w-1/8 w-full">
            <vs-button
              color="warning"
              type="border"
              class="rounded-lg mb-2"
              @click="initValues"
              >Restart</vs-button
            >
          </div>
        </div>

        <form-wizard
          ref="wizard"
          color="rgba(var(--vs-primary), 1)"
          errorColor="rgba(var(--vs-danger), 1)"
          :title="title"
          :subtitle="subtitle"
          finishButtonText="Save entry"
          @on-complete="formSubmitted"
        >
          <tab-content
            title="Step 1"
            class="mb-5"
            icon="feather icon-home"
            :before-change="validateStep1"
          >
            <!-- tab 1 content  -->
            <form data-vv-scope="step-1">
              <div class="vx-row px-4 pb-3">
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input
                    label="Subscription Name"
                    v-model="formData.name"
                    class="w-full"
                    disabled
                  />
                  <label class="w-full" size="small">Account</label>
                  <v-select
                    class="w-full"
                    placeholder="Search / Select Account"
                    :options="accountList"
                    v-model="selectedAccount"
                    @search:blur="populateType"
                    name="Search / Select Account"
                    v-validate="'required'"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('Search / Select Account')"
                    >{{
                      errors.first("Search / Select Account")
                    }}</span
                  >
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <label class="w-full">Subscription Type</label>
                  <v-select
                    class="w-full"
                    placeholder="Search / Select Subscription Type"
                    :options="typeList"
                    v-model="selectedType"
                    @search:blur="populateType"
                    name="Search / Select Subscription Type"
                    v-validate="'required'"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('Search / Select Equipment Rebate')"
                    >{{
                      errors.first("Search / Select Equipment Rebate")
                    }}</span
                  >
                  <label class="w-full" size="small">Subscription Interval</label>
                  <v-select
                    class="w-full"
                    placeholder="Search / Select Interval"
                    :options="intervalList"
                    v-model="selectedInterval"
                    @search:blur="populateType"
                    name="Search / Select Subscription Interval"
                    v-validate="'required'"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('Search / Select Equipment Rebate')"
                    >{{
                      errors.first("Search / Select Equipment Rebate")
                    }}</span
                  >
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input
                    label="Custom Price(R)"
                    v-model="formData.customPrice"
                    class="w-full"
                    @input="customPriceDown()"
                  />
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input
                    label="Subscription Price(R)"
                    v-model="formData.viewPrice"
                    class="w-full"
                    disabled
                  />
                </div>
                <div v-show="showStores" class="vx-col md:w-1/2 w-full mt-5">
                  <label class="w-full" size="small">Store</label>
                  <v-select
                    class="w-full"
                    placeholder="Search / Select Store"
                    :options="stores"
                    v-model="selectedStore"
                    @search:blur="populateName"
                    name="Search / Select Store"
                  />
                </div>
                <div class="vx-row md:w-full w-full mt-5" style="padding: 0 1rem">
                  <div class="vx-col flex-1">
                    <label>Created Date</label>
                    <div id="datepick">
                      <flat-pickr
                        class="w-full"
                        icon-pack="feather"
                        icon="icon-calendar"
                        v-model="formData.createdDate"
                        :format="'YYYY-MM-DD'"
                        placeholder="Select Created Date"
                        name="Created Date"
                      />
                    </div>
                  </div>
                  <div class="vx-col flex-1">
                    <label>Expiry Date</label>
                    <div id="datepick">
                      <flat-pickr
                        class="w-full"
                        icon-pack="feather"
                        icon="icon-calendar"
                        v-model="formData.expiryDate"
                        :format="'YYYY-MM-DD'"
                        placeholder="Select Expiry Date"
                        name="Expiry Date"
                      />
                    </div>
                  </div>
                  <div class="vx-col flex-1">
                    <label>Renew Date</label>
                    <div id="datepick">
                      <flat-pickr
                        class="w-full"
                        icon-pack="feather"
                        icon="icon-calendar"
                        v-model="formData.renewDate"
                        :format="'YYYY-MM-DD'"
                        placeholder="Select Renew Date"
                        name="Renew Date"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </tab-content>

        </form-wizard>
      </div>
    </vx-card>

    <vs-popup
      class="export-email"
      title="Export Email"
      :active.sync="exportPopup">
      <div id="popupMessage">
        <div class="vx-col">
          <label>Email</label>
          <vs-chips id="emails" class="vx-col w-full pt-2" placeholder="Add Email" v-model="chips" v-validate="'required|email'" name="Email" style="justify">
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
        <div class="vx-row flex flex-wrap items-center pt-4">
          <vs-button class="rounded-lg mr-2 ml-3" color="warning" type="filled" @click="closeExportPopup"        icon-pack="feather" icon="icon-refresh-ccw">Cancel</vs-button>
          <vs-button class="rounded-lg mr-2 ml-2 vs-con-loading__container" ref="submitButon" color="success" type="filled" @click="exportEmail"         icon-pack="feather" icon="icon-plus-square">Submit</vs-button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { color } from '@amcharts/amcharts4/core';
import manageSubscriptionSidebar from './ManageSubscriptionSidebar.vue';

export default {
  data() {
    return {
      title: "FAMS - new Subscription  Wizard!!",
      subtitle: "Please complete form to add new subscription",
      
      accountsData: [],
      accountsDataParam: [],
      itemsPerPage: 10,
      selected: [],
      isMounted: false,
      currStore: {},
      editPopupActive: false,
      color: "rgb(0,0,0)",
      blocked: true,
      showExpiredStores: false,
      showBlockedAccounts: false,

      accountList: [],
      formData: {
        id: 0,
        accountId: 0,
        createdDate: "",
        subInterval: 0,
        store: 0,
        subType: 0,
        renewDate: "",
        expiryDate: "",
        name: "",
        customPrice: 0,
        viewPrice: 0,
      },
      stores: [],
      selectedStore: 0,
      accountList: [],
      selectedAccount: 0,
      typeList: [],
      selectedType: 0,
      intervalList: [],
      selectedInterval: 0,
      isInfoHidden: true,
      isListHidden : false,
      isDetailListHidden : true,
      showStores: false,
      isManageSubscriptionSidebarActive: false,
      sidebarData: {},
      expiredStores: [],
      blockedAccountList: [],
      originalList: [],
      originalListParam: [],
      queryAccount: "",
      queryBlocked: "",
      querySubName: "",
      queryType: "",
      queryInterval: "",
      queryTable: "",
      queryCreate: "",
      queryRenew: "",
      queryExpire: "",
      queryRemaining: "",
      queryPrice: "",
      dataString: '',
      exportPopup: false,
      chips : [],
    };
  },
  
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    manageSubscriptionSidebar,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  watch: {
    showExpiredStores: function (val) {
      var self = this;
      if(val){
        self.showOnlyExpiredStores();
      }
      else if(self.showBlockedAccounts){
        self.accountsData = self.originalList;
        self.showOnlyBlockedAccounts();
      }
      else{
        self.accountsData = self.originalList;
      }
    },
    showBlockedAccounts: function (val) {
      var self = this;
      if(val){
        self.showOnlyBlockedAccounts();
      }
      else if(self.showExpiredStores){
        self.accountsData = self.originalList;
        self.showOnlyExpiredStores();
      }
      else{
        self.accountsData = self.originalList;
      }
    },
    queryAccount(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.account.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryBlocked(val){
      var self = this;
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.blocked.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    querySubName(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.subscriptionName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryType(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.subscriptionType.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryInterval(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.subscriptionInterval.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryTable(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.tableName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryCreate(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.subscriptionCreateDate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryRenew(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.subscriptionRenewedDate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryExpire(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.subscriptionExpireDate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryRemaining(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.dayRemaining == parseInt(val);
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
    queryPrice(val){
      var self = this;
      
      if(val != ""){
        self.accountsDataParam = self.originalListParam.filter(item => {
          return item.price == parseInt(val);
        });
        return self.accountsDataParam;
      }
      else{
        self.accountsDataParam = self.originalListParam;
      }
    },
  },
  mounted() {
    this.GetGrid();
    this.getTypesList();
    this.getIntervalList();
    this.getAccountList();
    this.exportPopup = false;
    this.isMounted = true;
  },
  methods: {
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

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    initValues(){
      var self = this;
      self.formData.subInterval = 0;
      self.formData.store = 0;
      self.formData.subType = 0;
      self.formData.customPrice = 0;
      self.formData.viewPrice = 0;
      self.formData.name = "";

      self.stores = [];
      self.typeList = [];
      self.intervalList = [];
      self.accountList = [];
      self.selectedStore = 0;
      self.selectedAccount = 0;
      self.selectedType = 0;
      self.selectedInterval = 0;

      var date = new Date();
      self.formData.createdDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.formData.expiryDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.formData.renewDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      // self.GetGrid();
      self.getAccountList();
      self.getTypesList();
      self.getIntervalList();

    },
    
    customPriceDown(){
      var self = this;

      if(self.formData.customPrice > 0){
        if(self.selectedInterval.value == 1){
          self.formData.viewPrice = (self.formData.customPrice * 12);
        }
        else if(self.selectedInterval.value == 2){
          self.formData.viewPrice = self.formData.customPrice;
        }
        else if(self.selectedInterval.value == 3){
          self.formData.viewPrice = (self.formData.customPrice * 4);
        }
        else if(self.selectedInterval.value == 4){
          self.formData.viewPrice = (self.formData.customPrice * 6);
        }
      }
      else{
        if(self.selectedType && self.selectedInterval.value == 1){
          self.formData.viewPrice = (self.selectedType.price * 12);
        }
        else if(self.selectedType && self.selectedInterval.value == 2){
          self.formData.viewPrice = self.selectedType.price;
        }
        else if(self.selectedType && self.selectedInterval.value == 3){
          self.formData.viewPrice = (self.selectedType.price * 4);
        }
        else if(self.selectedType && self.selectedInterval.value == 4){
          self.formData.viewPrice = (self.selectedType.price * 6);
        }
        else{
          self.formData.viewPrice = self.selectedType.price;
        }

      }
    },
    populateType(){
      const self = this;

      if(self.selectedType && self.selectedInterval.value == 1 && self.formData.customPrice == 0){
        self.formData.viewPrice = (self.selectedType.price * 12);
      }
      else if(self.selectedType && self.selectedInterval.value == 2 && self.formData.customPrice == 0){
        self.formData.viewPrice = self.selectedType.price;
      }
      else if(self.selectedType && self.selectedInterval.value == 3 && self.formData.customPrice == 0){
        self.formData.viewPrice = (self.selectedType.price * 4);
      }
      else if(self.selectedType && self.selectedInterval.value == 4 && self.formData.customPrice == 0){
        self.formData.viewPrice = (self.selectedType.price * 6);
      }
      else if(self.selectedType && self.selectedInterval.value == 1 && self.formData.customPrice > 0){
        self.formData.viewPrice = (self.formData.customPrice * 12);
      }
      else if(self.selectedType && self.selectedInterval.value == 2 && self.formData.customPrice > 0){
        self.formData.viewPrice = self.formData.customPrice;
      }
      else if(self.selectedType && self.selectedInterval.value == 3 && self.formData.customPrice > 0){
        self.formData.viewPrice = (self.formData.customPrice * 4);
      }
      else if(self.selectedType && self.selectedInterval.value == 4 && self.formData.customPrice > 0){
        self.formData.viewPrice = (self.formData.customPrice * 6);
      }

      if(self.selectedType && self.selectedAccount){
        if(self.selectedType.value == 1 || self.selectedType.value == 2){
          self.showStores = true;
          self.getStores(self.selectedAccount.value);
        }
        else{
          self.populateName();
          self.showStores = false;
        }
      }
      
    },
    populateName(){
      var self = this;
      if(self.selectedType && self.selectedAccount){
        if(self.selectedType.value == 1 || self.selectedType.value == 2 && self.selectedStore){
          self.formData.name = self.selectedType.label + "_" + self.selectedStore.label;
        }
        else{
          self.formData.name = self.selectedType.label + "_" + self.selectedAccount.label;
        }
      }
    },
    GetGrid(){
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.accountsData = response.data;
        self.originalList = response.data;
      };
      var onFinally = function() {
        self.successNotify();
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "Subscription/GetSubscriptionsAdmin",
        onSuccess,
        onFinally
      );
    },
    addSub(){
      this.isInfoHidden = false;
      this.isListHidden = true;
      this.initValues();
    },
    deleteSubscription(tr){
      const self = this;
      var onSuccess = function (response) {
        self.GetGrid();
      };
      var onFinally = function () {
        // self.closePopup();
      };
      self.$ajaxDelete(
        self,
        "Subscription/" + tr.id,
        onSuccess,
        onFinally
      );
    },
    formSubmitted(){
      var self = this;

      self.formData.accountId = self.selectedAccount.value;
      self.formData.subInterval = self.selectedInterval.value;
      self.formData.subType = self.selectedType.value;
      self.formData.store = self.selectedStore.value;

      const obj = {};

      obj.Name = self.formData.name;
      obj.Id = 0;
      obj.AccountId = self.formData.accountId;
      obj.SubscriptionIntervalId = self.formData.subInterval;
      obj.SubscriptionTypeId = self.formData.subType;
      obj.SubId = self.formData.store;
      obj.CreateDate = self.formData.createdDate;
      obj.ExpriryDate = self.formData.expiryDate;
      obj.RenewDate = self.formData.renewDate;
      obj.customPrice = self.formData.customPrice;
      
      var onSuccess = response =>{
        self.isListHidden = false;
        self.isInfoHidden = true;
        self.GetGrid();
      }
    
      var onFinally = response =>{
        
      }
    
      self.$ajaxPost(self, "Subscription/PostSubscription" , obj , onSuccess, onFinally);
    },
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-1").then((result) => {
          if (result) {
            resolve(true);
          } else {
            this.ValidateNotify();
            reject("correct all values");
          }
        });
      });
    },
    EditSubscription(data){
      const self = this;
      self.sidebarData = data;
      self.toggleDataSidebar(true);
    },
    toggleDataSidebar(val){
        if (val){
          this.isManageSubscriptionSidebarActive = true;
        }
        else{
          this.isManageSubscriptionSidebarActive = false;
          this.GetGrid();
        }
        
    },
    cancelAdd(){
      this.isListHidden = false;
      this.isDetailListHidden = true;
      this.isInfoHidden = true;
      this.GetGrid();
    },
    getAccountList(){
      var self = this;
      
      var onSuccess = response =>{
        self.accountList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
    
      var onFinally = response =>{

      }
    
      self.$ajaxGet(self, "Accounts/GetAccountdropdown" , onSuccess, onFinally);
    },
    getTypesList(){
      var self = this;
      var onSuccess = response =>{
        self.typeList = response.data.map((item) => {
          return { label: item.name, value: item.id, price: item.price };
        });
      }
    
      var onFinally = response =>{

      }
    
      self.$ajaxGet(self, "Subscription/GetSubscriptionTypes" , onSuccess, onFinally);
    },
    getIntervalList(){
      var self = this;
      var onSuccess = response =>{
        self.intervalList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
    
      var onFinally = response =>{

      }
    
      self.$ajaxGet(self, "Subscription/GetSubscriptionIntervals" , onSuccess, onFinally);
    },
    getStores(id) { 
      const self = this;
      var onSuccess = function(response) {
          self.stores = response.data.map((item) => {return {label: item.name, value: item.id} });
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "Stores/GetStoredropdownForAccount/" + id,
        onSuccess,
        onFinally
      );    
    },
    blockAccount(data){
      var self = this;
      
      var obj = {
        accountId: data.accountId,
        blocked: data.blocked
      };

      var onSuccess = response =>{
        self.GetGrid();
      }
    
      var onFinally = response =>{
      }
    
      self.$ajaxPost(self, "Subscription/BlockAccount" , obj, onSuccess, onFinally);
    },
    showOnlyExpiredStores(){
      var self = this;
      
      if(self.showExpiredStores){
        self.expiredStores = self.accountsData.map((item) =>{
          return{
            accountId: item.accountId,
            accountName: item.accountName,
            blocked: item.blocked,
            id: item.id,
            perSubscriptionAccount: item.perSubscriptionAccount.filter(x => x.dayRemaining <= 0),
          };
        });

        self.accountsData = [];
        self.expiredStores.forEach((item, index) => {
          if(item.perSubscriptionAccount.length > 0){
            self.accountsData.push(item);
          }
        });
      }
      else if(!self.showExpiredStores && !self.showBlockedAccounts){
        self.GetGrid();
      }
      else if(!self.showExpiredStores && self.showBlockedAccounts){
        self.accountsData = self.originalList;
        self.showOnlyBlockedAccounts();
      }
    },
    showOnlyBlockedAccounts(){
      var self = this;

      if(self.showBlockedAccounts){
        self.blockedAccountList = self.accountsData.filter(item => item.blocked == true);
        self.accountsData = [];

        self.blockedAccountList.forEach((item, index) => {
          if(item.blocked == true){
            self.accountsData.push(item);
          }
        });
      }
      else if(!self.showBlockedAccounts && !self.showExpiredStores){
        self.GetGrid();
      }
      else if(!self.showBlockedAccounts && self.showExpiredStores){
        self.accountsData = self.originalList;
        self.showOnlyExpiredStores();
      }
    },
    openParamView(){
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.accountsDataParam = response.data;
        self.originalListParam = response.data;
        
        // self.queryBlocked = "false";
        self.isListHidden = true;
        self.isDetailListHidden = false;
      };
      var onFinally = function() {
        self.successNotify();
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "Subscription/GetSubscriptionsAdminDetail",
        onSuccess,
        onFinally
      );
    },
    exportCSV(){
      var self = this;
      self.showLoadingOnElement("gridTable2", 1, "radius");
      
      var onSuccess = function (response) {
        self.dataString = response.data;
      }
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable2.$el);
        self.downloadFile('Subscriptions', self.dataString);
      };
      self.$ajaxPost(
        self,
        "Subscription/ExportToCSV",
        self.accountsDataParam,
        onSuccess,
        onFinally
      )
    },
    showExportPopup(){
      this.chips = [];
      this.exportPopup = true;
    },
    exportEmail(){
      var self = this;
      self.showLoadingOnElement("submitButon", 0.65, "radius");

      var obj = {
        emailList: self.chips.join(';'),
        exportFormats: self.accountsDataParam
      }
      var emails = self.chips.join(';');
      var onSuccess = function (response) {
        self.exportPopup = false;
        self.$vs.notify({
          title: 'Successfully',
          text: 'Email Successfully Send',
          color: 'success'
        });
      }
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submitButon.$el);
      };
      self.$ajaxPost(
        self,
        "Subscription/ExportToEmail",
        obj,//self.accountsDataParam, emails,
        onSuccess,
        onFinally
      )
    },
    removeEmail(chip) {
        this.chips.splice(this.chips.indexOf(chip), 1)
    },
    downloadFile(fileName, data){
      var blob = new Blob([data], {type: 'text/plain'});
      var anchor = document.createElement('a');

      anchor.download = fileName + (new Date()).getMilliseconds() + ".CSV";
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
      anchor.click();
    },
    closeExportPopup(){
      var self = this;
      self.exportPopup = false;
    },
    getColor(tr){
      if(tr.dayRemaining <= 30){
        return 'background: rgb(254, 138, 131)';
      }
      else if(tr.dayRemaining > 30 && tr.dayRemaining <= 90){
        return 'background: rgb(254, 212, 52)';
      }
      else{
        return 'background: rgb(153, 255, 153)';
      }
    },
  }
};

</script>
<style lang="scss">
#tableRow{
  border: 3px,black;
}
#expandIconContainer span{
  display: flex;
  justify-content: space-evenly;
}
#expandIconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}

    .con-chips{
        justify-content: unset;
      }
</style>