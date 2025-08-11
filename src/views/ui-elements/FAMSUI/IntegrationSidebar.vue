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
        <!-- {{ Object.entries(this.data).length === 0 ? "ADD" : "UPDATE" }} Exception -->
      </h4>
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-3">Edit Subscription</vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
      suppressScrollX="true"
    >
      <div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col md:w-full w-full mt-5">
            <label class="w-full" size="small">Integration Type</label>
            <v-select
              class="w-full"
              placeholder="Search / Select Type"
              :options="integrationTypes"
              v-model="selectedType"
              name="Search / Select Type"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Search / Select Type')"
              >{{
                errors.first("Search / Select Type")
              }}
            </span>
            <vs-input
              label="Integration Name"
              v-model="formData.name"
              class="w-full"
            />
            <vs-input
              label="Username"
              v-model="formData.username"
              class="w-full"
            />
            <vs-input
              label="Password"
              v-model="formData.password"
              class="w-full"
            />
            <vs-input
              label="Email To"
              v-model="formData.emailTo"
              class="w-full"
            />
            <vs-input
              label="Email CC"
              v-model="formData.emailCC"
              class="w-full"
            />
            <vs-input
              label="API URL"
              v-model="formData.apiurl"
              class="w-full"
            />
            <vs-input
              label="API User Guid"
              v-model="formData.apiUserIdGuid"
              class="w-full"
            />
            <vs-input
              label="API Session Id"
              v-validate="'numeric'"
              type="numeric"
              name="Session Id"
              v-model="formData.apiSessionId"
              class="w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Session Id')"
              >{{
                errors.first("Session Id")
              }}
            </span>
            <label>API Session Expire</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                icon-pack="feather"
                icon="icon-calendar"
                v-model="formData.apiSessionExpire"
                :format="'YYYY-MM-DD'"
                placeholder="Select Expiry Date"
                name="API Session Expire"
              />
            </div>
            <vs-input
              label="Folder"
              v-validate="'numeric'"
              type="numeric"
              name="Folder"
              v-model="formData.folder"
              class="w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Folder')"
              >{{
                errors.first("Folder")
              }}
            </span>
            <vs-input
              label="Directory"
              v-model="formData.directory"
              class="w-full"
            />
            <vs-input
              label="File Name"
              v-model="formData.fileName"
              class="w-full"
            />
            <vs-input
              label="Description"
              v-model="formData.description"
              class="w-full"
            />
            <vs-input
              label="SQL Stored Proc"
              v-model="formData.sqlStoreProc"
              class="w-full"
            />
            <vs-input
              label="Spare"
              v-model="formData.spare"
              class="w-full"
            />
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
          @click="SaveEditIntegration"
          >Save</vs-button
        >
        <vs-button
          ref="cancelButton"
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
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { color } from '@amcharts/amcharts4/core';
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import moment from "moment";

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
  data() {
    return {
      title: "FAMS - new Subscription  Wizard!!",
      subtitle: "Please complete form to add new subscription",
      
      integrationTypes: [],
      selectedType: 0,
      formData: {
        id: 0,
        accountID: 0,
        accountName: "",
        integrationID: 0,
        integration: "",
        integrationTypeID: "",
        integrationType: "",
        name: "",
        username: "",
        password: "",
        emailTo: "",
        emailCC: "",
        apiurl: "",
        apiUserIdGuid: "",
        apiSessionId: "",
        apiSessionExpire: "",
        folder: "",
        directory: "",
        fileName: "",
        description: "",
        sqlStoreProc: "",
        spare: "",
        enable: false,
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      

    };
  },
  
  components: {
    flatPickr,
    "v-select": vSelect,
    VuePerfectScrollbar,
  },
  computed: {
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
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
  },
  watch: {
    isSidebarActive(val) {
      if(val){
        var self = this;
        
        self.getTypesList();
        if (Object.entries(self.data).length === 0) {
          self.initValues();
          self.$validator.reset();
        } else{
          self.formData.id = self.data.id;
          self.formData.accountID = self.data.accountID;
          self.formData.accountName = self.data.accountName;
          self.formData.integrationID = self.data.integrationID;
          self.formData.integration = self.data.integration;
          self.formData.integrationTypeID = self.data.integrationTypeID;
          self.formData.integrationType = self.data.integrationType;
          self.formData.name = self.data.name;
          self.formData.username = self.data.username;
          self.formData.password = self.data.password;
          self.formData.emailTo = self.data.emailTo;
          self.formData.emailCC = self.data.emailCC;
          self.formData.apiurl = self.data.apiurl;
          self.formData.apiUserIdGuid = self.data.apiUserIdGuid;
          self.formData.apiSessionId = self.data.apiSessionId;
          self.formData.apiSessionExpire = self.data.apiSessionExpire;
          self.formData.folder = self.data.folder;
          self.formData.directory = self.data.directory;
          self.formData.fileName = self.data.fileName;
          self.formData.description = self.data.description;
          self.formData.sqlStoreProc = self.data.sqlStoreProc;
          self.formData.spare = self.data.spare;
          self.formData.enable = self.data.enable;

          self.selectedType = self.integrationTypes.filter(function (item) {
                return item.value == self.data.integrationTypeID;
              })[0];
        }
      }
      
    },
  },
  mounted() {
    // this.GetGrid();
    this.getTypesList();
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
      self.formData.id = 0;
      self.formData.accountID = 0;
      self.formData.accountName = "";
      self.formData.integrationID = 0;
      self.formData.integration = "";
      self.formData.integrationTypeID = 0;
      self.formData.integrationType = "";
      self.formData.name = "";
      self.formData.username = "";
      self.formData.password = "";
      self.formData.emailTo = "";
      self.formData.emailCC = "";
      self.formData.apiurl = "";
      self.formData.apiUserIdGuid = "";
      self.formData.apiSessionId = 0;
      // self.formData.apiSessionExpire = "";
      self.formData.folder = 0;
      self.formData.directory = "";
      self.formData.fileName = "";
      self.formData.description = "";
      self.formData.sqlStoreProc = "";
      self.formData.spare = "";
      self.formData.enable = "";

      self.integrationTypes = [];


      var date = new Date();
      self.formData.apiSessionExpire = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      self.getTypesList();

    },
    SaveEditIntegration(){
      var self = this;
      
      const obj = {};
      obj.id = self.formData.id;
      obj.accountID = self.formData.accountID;
      obj.accountName = self.formData.accountName;
      obj.integrationID = self.formData.integrationID;
      obj.integration = self.formData.integration;
      obj.integrationTypeID = self.selectedType.value;
      obj.integrationType = self.formData.integrationType;
      obj.name = self.formData.name;
      obj.username = self.formData.username;
      obj.password = self.formData.password;
      obj.emailTo = self.formData.emailTo;
      obj.emailCC = self.formData.emailCC;
      obj.apiurl = self.formData.apiurl;
      obj.apiUserIdGuid = self.formData.apiUserIdGuid;
      obj.apiSessionId = self.formData.apiSessionId;
      obj.apiSessionExpire = self.formData.apiSessionExpire;
      obj.folder = self.formData.folder;
      obj.directory = self.formData.directory;
      obj.fileName = self.formData.fileName;
      obj.description = self.formData.description;
      obj.sqlStoreProc = self.formData.sqlStoreProc;
      obj.spare = self.formData.spare;
      obj.enable = self.formData.enable;
      self.showLoadingOnElement("saveButton",1,"radius");
      var onSuccess = response =>{
        self.$vs.loading.close(self.$refs.saveButton.$el);
        // self.editPopupActive = false
        self.closeSidebar();
      }
    
      var onFinally = response =>{
      }
    
      self.$ajaxPost(self, "Integrations/PostPerIntegrationAccount" , obj , onSuccess, onFinally);
    },
    closeSidebar(){
      this.isSidebarActiveLocal = false;
      // this.initValues();
    },
    getTypesList(){
      var self = this;
      var onSuccess = response =>{
        self.integrationTypes = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
    
      var onFinally = response =>{

      }
    
      self.$ajaxGet(self, "Integrations/GetIntegrationTypeDropDown" , onSuccess, onFinally);
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
</style>

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
