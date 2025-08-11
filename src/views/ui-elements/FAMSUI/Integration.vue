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


<template>
  <div>
    <integration-sidebar
      :isSidebarActive="isIntegrationSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="integrationData"
          class="vs-con-loading__container"
        >
          <div
            slot="header"
            class="flex flex-wrap-reverse items-center flex-grow"
          >
            <!-- ADD NEW -->
            <vs-button
              class="rounded-lg mr-2"
              color="warning"
              type="filled"
              @click="GetGrid()"
              icon-pack="feather"
              icon="icon-refresh-ccw"
              >Reload</vs-button
            >
            <!-- <vs-button
              class="rounded-lg mr-2"
              color="success"
              type="filled"
              @click="addVue"
              icon-pack="feather"
              icon="icon-plus-square"
              >Add New</vs-button
            > -->
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="
                  p-4
                  border border-solid border-grey-light
                  rounded-full
                  d-theme-dark-bg
                  cursor-pointer
                  flex
                  items-center
                  justify-between
                  font-medium
                "
              >
                <span class="mr-2"
                  >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                  {{
                    integrationData.length - currentPage * itemsPerPage > 0
                      ? currentPage * itemsPerPage
                      : integrationData.length
                  }}
                  of {{ integrationData.length }}</span
                >
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage = 10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 20">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 50">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 100">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <template slot="thead">
            <vs-th sort-key="Name">Name</vs-th>
            <vs-th sort-key="Integration Name">Integration Name</vs-th>
            <!-- <vs-th sort-key="Account Name">Account Name</vs-th> -->
            <vs-th sort-key="Integration Type">Integration Type</vs-th>
            <vs-th sort-key="Username">Username</vs-th>
            <vs-th sort-key="Password">Password</vs-th>
            <vs-th sort-key="APIURL">APIURL</vs-th>
            <vs-th sort-key="Description">Description</vs-th>
            <vs-th sort-key="Folder">Folder</vs-th>
            <vs-th sort-key="Directory">Directory</vs-th>
            <vs-th sort-key="File Name">File Name</vs-th>
            <vs-th sort-key="SQL Store Proc">SQL Store Proc</vs-th>
            <vs-th sort-key="Spare">Spare</vs-th>
            <vs-th sort-key="APIUserIdGuid">APIUserIdGuid</vs-th>
            <vs-th sort-key="APISessionId">APISessionId</vs-th>
            <vs-th sort-key="APISessionExpire">APISessionExpire</vs-th>
            <vs-th sort-key="EmailTo">EmailTo</vs-th>
            <vs-th sort-key="EmailCC">EmailCC</vs-th>
            <vs-th sort-key="Enable">Enable</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.integration">{{ tr.integration }}</vs-td>
              <!-- <vs-td :data="tr.accountName">{{ tr.accountName }}</vs-td> -->
              <vs-td :data="tr.integrationType">{{ tr.integrationType }}</vs-td>
              <vs-td :data="tr.username">{{ tr.username }}</vs-td>
              <vs-td :data="tr.password">{{ tr.password }}</vs-td>
              <vs-td :data="tr.apiurl">{{ tr.apiurl }}</vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td :data="tr.folder">{{ tr.folder }}</vs-td>
              <vs-td :data="tr.directory">{{ tr.directory }}</vs-td>
              <vs-td :data="tr.fileName">{{ tr.fileName }}</vs-td>
              <vs-td :data="tr.sqlStoreProc">{{ tr.sQLStoreProc }}</vs-td>
              <vs-td :data="tr.spare">{{ tr.spare }}</vs-td>
              <vs-td :data="tr.apiUserIdGuid">{{ tr.apiUserIdGuid }}</vs-td>
              <vs-td :data="tr.apiSessionId">{{ tr.apiSessionId }}</vs-td>
              <vs-td :data="tr.apiSessionExpire">{{ tr.apiSessionExpire == null ? "N/A" : formatDate(tr.apiSessionExpire.replace("T", " ").split('.')[0]) }}</vs-td>
              <vs-td :data="tr.emailTo">{{ tr.emailTo }}</vs-td>
              <vs-td :data="tr.emailCC">{{ tr.emailCC }}</vs-td>
              <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Delete Integration">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
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
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import integrationSidebar from "./IntegrationSidebar.vue";
import moment from "moment";
export default {
  data() {
    return {
      title: "FAMS - new Cost Centre Wizard!!",
      subtitle: "Please complete each tab to add new Cost Centre",

      isListHidden: false,
      isInfoHidden: true,

      itemsPerPage: 10,
      // integrationSidebar: false,
      selected: [],
      integrationData: [],
      sidebarData: {},
      isIntegrationSidebarActive: false,
      isMounted: false,
      formData: {
        id: 0,
        accountID: 0,
        accountName: "",
        integrationID: 0,
        integration: "",
        enable: false,
      },
      showPopup: false,
      popupData: {
        editName: "",
        id: 0
      },
      integrations: [],
      selectedIntegration: {},
      accountList: [],
      selectedAccount: {},
    };
  },
  components: {
    flatPickr,
    integrationSidebar,
    "v-select": vSelect,
    FormWizard,
    TabContent,
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
    this.GetGrid();
    this.isMounted = true;
  },
  methods: {
    //********************* System related*/
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully added | updated | removed",
        color: "success",
      });
    },
    FailedNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Item not added",
        color: "danger",
      });
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },

    editDataSidebar(data) {
      const self = this;
      self.sidebarData = data;
      self.toggleDataSidebar(true);
    },
    toggleDataSidebar(val){
        if (val){
          this.isIntegrationSidebarActive = true;
        }
        else{
          this.isIntegrationSidebarActive = false;
          this.GetGrid();
        }
        
    },
    cancelAdd() {
      (this.isListHidden = false), (this.isInfoHidden = true);
      this.initValues();
      this.GetGrid();
    },
    addVue() {
      this.initValues();
      this.GetIntegrationDropDown();
      this.GetAccountDropDown();
      this.isInfoHidden = false;
      this.isListHidden = true;
      // this.$refs.wizard.navigateToTab(0)
    },

    initValues() {
      var self = this;
      self.formData.name = "";
      self.showPopup = false;
      self.popupData.editName = "";
      self.popupData.id = 0;
    },
    //********************* SQL events */
    formSubmitted() {
      var self = this;
      
      var myobject = {
        id: 0,
        accountID: self.selectedAccount.value,
        accountName: self.selectedAccount.label,
        integrationID: self.selectedIntegration.value,
        integration: self.selectedIntegration.label,
        enable: true,
      };
      
        self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        (self.isListHidden = false), (self.isInfoHidden = true);
        // self.initValues();
        self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "Integrations/PostPerIntegrationAccount",
        myobject,
        onSuccess,
        onFinally
      );
    },

    updateGrid() {
      const self = this;
      
      var myobject = {
        id: self.popupData.id,
        name: self.popupData.editName
      };
      //var myobject = self.popupData;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.closePopup();
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "Integrations/PostIntegration",
        myobject,
        onSuccess,
        onFinally
      );
    },

    closePopup(){
      var self = this;
      self.showPopup = false;
    },

    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "Integrations/DeletePerIntegrationAdmin/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetIntegrationDropDown(){
      var self = this;
      var onSuccess = response =>{
        self.integrations = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
    
      var onFinally = response =>{
      }
    
      self.$ajaxGet(self,"Integrations/GetIntegrationDropdown", onSuccess);
    },
    GetAccountDropDown(){
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
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.integrationData = response.data;
        
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      var onFinally = function () {
      };
      self.$ajaxGet(self,"Integrations/GetIntegrationAccount", onSuccess);
    },
  },
};
</script>
<style>
#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>