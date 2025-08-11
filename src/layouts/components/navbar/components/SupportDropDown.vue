<template>
  
  <div class="the-navbar__user-meta flex items-center" >
    <div class="text-right leading-tight hidden sm:block">
      <!-- <small>Available</small> -->
    </div>
    <v-select 
      id="account_dropdown"
      vs-custom-content 
      vs-trigger-click 
      :clearable="false"
      class="w-full style-chooser vx-navbar-dropdown"
      ref="accountGroup"
      style="min-width: 400px"
      :options="accountDataList"
      v-model="accountDropdown"
      @search:blur="changeAccount"
      
    >
    </v-select>
    <div v-if="multiAccount" class="flex py-2 px-4 cursor-pointer text-white" @click.stop="openDash">
      <feather-icon class="mr-2 pb-1" icon="PieChartIcon" svgClasses="w-5 h-5" />
      <div v-if="windowWidth >= 800">Dashboard</div>
    </div>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer" v-show="showManualEntries">

      <div class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
        <feather-icon class="mr-2" icon="ToolIcon" svgClasses="w-5 h-5" />
        <div v-if="windowWidth >= 800">Tools</div>
        <feather-icon class="ml-1" icon="ChevronDownIcon" svgClasses="w-4 h-4" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="manualEntries()">
            <feather-icon icon="Edit3Icon" svgClasses="w-5 h-5" />
            
            <span class="ml-2">Manual Entries</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown> 

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
        <feather-icon class="mr-2" icon="UserIcon" svgClasses="w-5 h-5" />
        <div v-if="windowWidth >= 800">Profile</div>
        <feather-icon class="ml-1" icon="ChevronDownIcon" svgClasses="w-4 h-4" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="profile()">
            <feather-icon icon="TableIcon" svgClasses="w-5 h-5" />
            
            <span class="ml-2">Subscriptions</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown> 

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer" >

      <div class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
        <feather-icon class="mr-2" icon="HelpCircleIcon" svgClasses="w-5 h-5" />
        <div v-if="windowWidth >= 800">Support</div>
        <feather-icon class="ml-1" icon="ChevronDownIcon" svgClasses="w-5 h-5" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="navToYoutube">
            <feather-icon icon="YoutubeIcon" svgClasses="w-5 h-5" />
            <span class="ml-2">YouTube Channel</span>
          </li>

          <vs-divider class="m-1" />
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="viewDocuments">
            <feather-icon icon="FolderPlusIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Documents</span>
          </li>
          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="submitTicket">
            <feather-icon icon="Edit3Icon" svgClasses="w-4 h-4" />
            <span class="ml-2">Submit a Ticket</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
    <!-- NOTIFICATIONS -->
    <vs-dropdown id="notificationDropdown" ref="notificationDropdown" vs-custom-content vs-trigger-click class="flex py-2 px-4 cursor-pointer text-white">
      <feather-icon icon="BellIcon" class="cursor-pointer sm:mr-2 feather__button" svgClasses="h-5 w-5" :badge="unreadNotifications.length"></feather-icon>
      <vs-dropdown-menu class="notification-dropdown dropdown-custom">
        <div class="cursor-pointer text-right bg-primary text-white" style="position: absolute; right: 20px; top: 27px; z-index: 99999;">
          <feather-icon @click="refresh" icon="RefreshCwIcon" class="cursor-pointer mb-2"></feather-icon>
        </div>
        <div class="notification-top text-center p-5 bg-primary text-white">
          <h3 class="text-white">{{ allNotifications.length }} New</h3>
          <p class="opacity-75">Notification(s)</p>
        </div>

        <VuePerfectScrollbar v-show="allNotifications.length > 0" ref="mainSidebarPs" class="vs-con-loading__container scroll-area--nofications-dropdown p-0 mb-10" :settings="settings">
          <ul class="bordered-items">
            <li v-for="ntf in allNotifications" :key="ntf.id" class="flex justify-between px-4 py-4 notification cursor-pointer">
              <div class="flex items-start" @click="handleNtfClick(ntf)">
                <!-- <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon> -->
                <div class="mx-2">
                  <span class="font-bold block" v-if="!ntf.readOn" :class="[`text-${ntf.category}`]">{{ ntf.notificationTitle }}</span>
                  <span class="font-medium block" v-else :class="[`text-${ntf.category}`]">{{ ntf.notificationTitle }}</span>
                  <!-- <span class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span> -->
                  <small>{{ ntf.notificationDescription }}</small>
                </div>
              </div>
              <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.createdOn) }}</small>
              <feather-icon v-model="ntf.id" v-show="!showCheck" @mouseover="showCheck = true" id="unReadButton" icon="CircleIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2"></feather-icon>
              <feather-icon v-show="showCheck" @mouseout="showCheck = false" id="readButton" @click.stop.prevent="removeNotification(ntf.id)" icon="XCircleIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2"></feather-icon>
            </li>
          </ul>
        </VuePerfectScrollbar>
        <div v-if="allNotifications.length > 0" @click="markAllAsRead" class="
            checkout-footer
            fixed
            pin-b
            rounded-b-lg
            text-primary
            w-full
            p-2
            font-semibold
            text-center
            border
            border-b-0
            border-l-0
            border-r-0
            border-solid
            border-grey-light
            cursor-pointer">
            <span>Mark All as Read</span>
        </div>
      </vs-dropdown-menu>
    </vs-dropdown>
    <vs-popup title="View Notification" class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="popupActive">
      <div id="PMessage">
        <div id="MessagePopup" ref='popupMessage'>
          <h5 v-html="messageToDisplay" style="text-align: left; "></h5>
        </div>
        <div>
          <vs-button class="rounded-lg mr-2" color="warning" style="float: right" type="filled" @click="removeNotification(idSpecific)">
            Remove from List
          </vs-button>
        </div>  
      </div>
    </vs-popup>
    <vs-popup title="View Subscription" fullscreen class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="showProfilePopup">
      <div id="subsdiv">
        <vs-table
          ref="gridTable"
          id="gridTable"
          v-model="selected"
          :data="subscriptions"
          class="vs-con-loading__container"
          style="overflow-y: scroll; height: 300px;"
        >
          <template slot="thead">
            <vs-th>Subscription Type</vs-th>  
            <vs-th>Subscription Info</vs-th>
            <vs-th>Subscription Interval</vs-th> 
            <vs-th>Subscription Create Date</vs-th>
            <vs-th>Subscription Renewed Date</vs-th>
            <vs-th>Days Remaining</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">                              
              <vs-td :data="tr.subscriptionType">{{tr.subscriptionType}}</vs-td>
              <vs-td :data="tr.tableName">{{tr.tableName}}</vs-td>
              <vs-td :data="tr.subscriptionInterval">{{tr.subscriptionInterval}}</vs-td>
              <vs-td :data="tr.subscriptionCreateDate">{{tr.subscriptionCreateDate}}</vs-td>
              <vs-td :data="tr.subscriptionRenewedDate">{{tr.subscriptionRenewedDate}}</vs-td>
              <vs-td :style="getColor(tr)" :data="tr.dayRemaining">{{tr.dayRemaining}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Vue from 'vue'
import vSelect from "vue-select";
//import { pathToPoints } from '@amcharts/amcharts4/.internal/core/rendering/Path';

export default {
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
  },
  data() {
    return {
      account:'',
      multiAccount: false,
      accountDropdown:0,
      accountData:[],
      settings: {      // perfectScrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed        : 1,
        swipeEasing       : true
      },
      currentAccountName: "",
      accountDataList: [],
      dropdownClosed: true,
      
      showCheck: false,
      unreadNotifications: [],
      readNotifications: [],
      allNotifications: [],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      popupActive: false,
      messageToDisplay: "",
      idSpecific: 0,
      showManualEntries: false,
      showProfile: false,
      showProfilePopup: false,
      selected: {},
      subscriptions: [],
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
    windowWidth(){ return this.$store.state.windowWidth },
    scrollbarTag() { return this.$store.getters.scrollbarTag},
  },
  methods: {
    navToYoutube(){
      window.open('https://www.youtube.com/channel/UCcjd0MRhsembUeWQKFoODyg', '_blank');
    },
    submitTicket(){
      window.open('https://tecmo.freshdesk.com/support/tickets/new', '_blank');
    },
    getAccount(){
      this.account = localStorage.getItem('userAccount')
    },
    getDropdownAccountList() {
      this.accountData = JSON.parse(localStorage.getItem('userInfo')); 
      var userId = localStorage.getItem("userId");
      if(userId == 1){
        this.accountData = this.accountData.sort((a, b) => a.account.accountName > b.account.accountName? 1 : -1)
        this.accountDataList = this.accountData.map((item) => {return {label: item.account.accountName, value: item.account.accountId, key: item.account.accountKey}});
        this.getCurrentAccount();
      }
      else{
        this.accountData = this.accountData.sort((a, b) => a.account.accountName > b.account.accountName? 1 : -1)
        this.accountDataList = this.accountData.filter(x => x.account.blocked == false).map((item) => {return {label: item.account.accountName, value: item.account.accountId, key: item.account.accountKey}});
        this.getCurrentAccount();
      }
    },
    getCurrentAccount() {
      if (this.accountData.length > 0) {
        this.currentAccountName = this.accountData.filter(x => x.account.accountId == localStorage.getItem('userAccountId'))[0].account.accountName;
        this.accountDropdown = this.accountData.filter(x => x.account.accountId == localStorage.getItem('userAccountId'))[0].account.accountName;
      }
    },
    manualEntries() {
      var self = this
      self.$router.push('/DispensingTransfers')
    },
    profile(){
      this.GetSubscriptions();
      this.showProfilePopup = true;
    },
    GetSubscriptions(){
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.subscriptions = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "Subscription/GetSubscriptionDash",
        onSuccess,
        onFinally
      );
    },
    
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    
    getColor(tr){
      if(tr.dayRemaining < 30){
        return 'background: rgb(254, 138, 131)';
      }
      else if(tr.dayRemaining >= 30 && tr.dayRemaining <= 100){
        return 'background: rgb(254, 212, 52)';
      }
      else{
        return 'background: rgb(153, 255, 153)';
      }
    },
    viewDocuments(){
      this.$router.push('/Documents');
    },
    changeAccount() {
      var self = this;
      
      if (self.accountDropdown && self.accountDropdown.key) {
        var selectedAcc = [{
          accountKey: self.accountDropdown.key,
          accountName: self.accountDropdown.label,
          accountId: self.accountDropdown.value
        }];
        
        if(selectedAcc.length < 1) self.$router.push("/pages/login");

        localStorage.setItem("userAccountSelected", JSON.stringify(selectedAcc));
        let temp = localStorage.getItem("userInfo").split(",");
        localStorage.setItem('userAccount',self.accountDropdown.label);
        localStorage.setItem('userAccountId',self.accountDropdown.value);
        localStorage.setItem('userAccountKey',self.accountDropdown.key);

        var userInfo = self.accountData.filter(x => x.account.accountId == localStorage.getItem('userAccountId'))[0];
        sessionStorage.roles = JSON.stringify(userInfo.userRoles);
        var myRoles = JSON.parse(sessionStorage.roles).userRoles.map(x=> x.code)
        
        self.$acl.change(myRoles);

        self.$store.state.accountName = userInfo.account.accountName;
        self.$store.state.accountId = userInfo.account.accountId;
        self.$store.state.accountKey = userInfo.account.accountKey;

        var dropdownEl = document.getElementById("account_dropdown");
        dropdownEl.click();
        location.assign("/dashboard/analytics");
        self.getCurrentAccount();
        self.getDropdownAccountList();

        var dropdownEl = document.getElementById("account_dropdown");
        dropdownEl.click();
        location.assign("/dashboard/analytics");
        self.getCurrentAccount();
        self.getDropdownAccountList();
      }
    },
    openDash(){
      window.open('/fullpagedashboard');
    },
    getMultiAccountUser(){
      var self = this;
      if(self.accountDataList.length > 1){
        self.multiAccount = true;
      }
      else{
        self.multiAccount = false;
      }
    },
    handleNtfClick(ntf){
      var self = this;
      self.idSpecific = 0;
      var routeData = "";

      var onSuccess = response => {
        if(ntf.notificationTypeId == 1){
          self.messageToDisplay = response.data[0].text;
        }
        else if(ntf.notificationTypeId == 2){
          self.messageToDisplay = response.data;
        }
        
        self.idSpecific = ntf.id;
        self.popupActive = true;
        };

        var onFinally = response => {
          self.markSingleAsRead(ntf.id);
        };
        self.$ajaxGet(self, `Notification/ViewNotification/?&ntfid=${ntf.id}&notificationTypeId=${ntf.notificationTypeId}`, onSuccess, onFinally);
    },
    getNotifications() {
      var self = this;
      var onSuccess = response => {
          self.unreadNotifications = response.data.filter(x => !x.readOn);
          self.readNotifications = response.data.filter(x => x.readOn);
          self.allNotifications = response.data;
        };
        var onFinally = response => {
        if (self.$refs.mainSidebarPs) {
          self.$vs.loading.close(self.$refs.mainSidebarPs.$el);
        }
      };
      self.$ajaxGet(self, "Notification", onSuccess, onFinally);
      
    },
    markAllAsRead() {
      var self = this;
      // self.showLoadingOnElement("mainSidebarPs", 0.75, "material");
      var data = {
        ids: self.allNotifications.map(function(item) { return item.id })
      };
      var onSuccess = response => {
        self.getNotifications();
      };
      self.$ajaxPost(self, "Notification/MarkAllAsRead", data, onSuccess);
    },
    markSingleAsRead(ntfId) {
      var self = this;
      //self.showLoadingOnElement("mainSidebarPs", 0.75, "material");
      var onSuccess = response => {
        self.getNotifications();
      };
      self.$ajaxGet(self, "Notification/MarkSingleAsRead/" + ntfId, onSuccess);
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hours " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return (seconds > 50 ? `${seconds} sec ago` : "Just Now");
      }

      return "Just Now";
    },
    refresh() {
      //this.showLoadingOnElement("mainSidebarPs", 0.75, "material");
      this.getNotifications();
    },
    removeNotification(ntfId){
      var self = this;
      //self.showLoadingOnElement("mainSidebarPs", 0.75, "material");
      var onSuccess = response => {
        self.getNotifications();
        self.idSpecific = 0;
      };
      var onFinally = response => {
        if(self.popupActive){
          self.popupActive = false;
        }
        self.getNotifications();
      }
      self.$ajaxGet(self, "Notification/AcknowledgeNotification/" + ntfId, onSuccess, onFinally);
    },
    showToolsDropdown(){
      var self = this;

      var userInfo = self.accountData.filter(x => x.account.accountId == localStorage.getItem('userAccountId'))[0];
      sessionStorage.roles = JSON.stringify(userInfo.userRoles);
      var myRoles = JSON.parse(sessionStorage.roles).userRoles.map(x=> x.code)
      
      var basicM = myRoles.filter(item => item == "basicM");
      var user = myRoles.filter(item => item == "user");
      var userL = myRoles.filter(item => item == "userL");
      var admin = myRoles.filter(item => item == "admin");
      var theBigBoss = myRoles.filter(item => item == "TheBigBoss");
      
      if(basicM.length > 0 || user.length > 0 || userL.length > 0 || admin.length > 0 || theBigBoss.length > 0){
        self.showManualEntries = true;
      }
      else{
        self.showManualEntries = false;
      }
    },
  },
  mounted() {
    var self = this;
    self.getDropdownAccountList();
    self.showToolsDropdown();
    self.getMultiAccountUser();
    self.getNotifications();
  }
}
</script>
<style lang="scss">
#account_dropdown {
  .vs__selected {
    min-width: 50px;
    color: white;
  }
  .vs__search, .vs__search:focus {
    min-width: 50px;
    color: white;
    border-width: 2px;
    border: 1px;
  }
  .vs__dropdown-toggle {
    padding: 0 0 4px 0;
    border: 1px solid #fff;
    border-radius: 4px;
  }
}
</style>
