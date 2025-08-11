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
  <div class="vs-con-loading__container">
    <div>
      <vx-card ref="MainCard2" v-show="!isInfoHidden">
        <div class="mt-5">
          <div class="vx-row">
            <div class="vx-col md:w-1/6 w-full">
              <vs-button color="warning" type="border" class="rounded-lg mb-2"
                @click="cancelAdd">Return</vs-button>
            </div>
            <div class="vx-col md:w-1/8 w-full">
              <vs-button color="warning" type="border" class="rounded-lg mb-2"
                @click="initValues">Restart</vs-button>
            </div>
          </div>

          <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
            :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="saveContactInfo">
            <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
              <!-- tab 1 content -->
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="User Name" v-model="formData.name" class="w-full" />
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="User Surname" v-model="formData.surname" class="w-full" />
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="Mobile Phone Number(With international code e.g. +27123456789)" placeholder="+27123456789" v-model="formData.phoneNumber" class="w-full" />
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="Email Address" v-model="formData.emailaddress" class="w-full" />
                </div>
              </div>
            </tab-content>
          </form-wizard>
        </div>
      </vx-card>
      <vx-card ref="MainCard" v-show="!isListHidden">
        <div>
          <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search :data="contactInfoData"
            class="vs-con-loading__container">
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
              <!-- ADD NEW -->
              <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetContactInfo()"
                icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
              <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addContactInfo"
                icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
              <!-- ITEMS PER PAGE -->
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div
                  class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{
                    contactInfoData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage :
                      contactInfoData.length }} of {{ contactInfoData.length }}</span>
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
              <vs-th sort-key="name">Name</vs-th>
              <vs-th sort-key="surname">Surname</vs-th>
              <vs-th sort-key="emailaddress">Email</vs-th>
              <vs-th sort-key="phoneNumber">Phone Number</vs-th>
              <vs-th>Action</vs-th>
            </template>
            <!-- visible: false -->
            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                <vs-td :data="tr.surname">{{ tr.surname }}</vs-td>
                <vs-td :data="tr.emailaddress">{{ tr.emailaddress }}</vs-td>
                <vs-td :data="tr.phoneNumber">{{ tr.phoneNumber }}</vs-td>
                <vs-td id="iconContainer" class="whitespace-no-wrap">
                  <vx-tooltip class="flex" text="Edit Contact Info">
                    <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="openContactInfoPopup(tr)" />
                  </vx-tooltip>
                  <vx-tooltip class="flex" text="Delete Contact Info">
                    <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2" @click.stop="deleteContactInfo(tr)" />
                  </vx-tooltip>
                  <vx-tooltip text="Generate QR Code">
                    <feather-icon icon="GridIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                      @click.stop="generateQR()" />
                  </vx-tooltip>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vx-card>
      <vs-popup title="Edit Contact Information" :active.sync="popupContactInfo">
        <div class="vx-col md:w-full w-full mb-5">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="User Name" v-model="formData.name" class="w-full" />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="User Surname" v-model="formData.surname" class="w-full" />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Mobile Phone Number(With international code e.g. +27123456789)" placeholder="+27123456789" v-model="formData.phoneNumber" class="w-full" />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input label="Email Address" v-model="formData.emailaddress" class="w-full" />
            </div>
          </div>
          <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
            @click="saveContactInfo()">Save
          </vs-button>
          <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeContactInfoPopup()">Cancel
          </vs-button>
        </div>
      </vs-popup>
      <vs-popup title="Equipment QR Code" :active.sync="popupGenerateQR">
      <div class="vx-col md:w-full w-full mb-5">
        <div id="qrCode" ref="qrCode" name="qrCode" class="m-1/2 md-full ml-3">
          <label class="w-full">Scan to open on WhatsApp and send the typed message</label>
          <br/>
          <div class="vx-row px-4 pb-3">
            <qr-code :size="150" text="https://wa.me/message/WFEK2G3TR2FKO1"></qr-code>
          </div>
          <div class="vx-row px-4 pb-3" style="flex-flow: column;">
            <p><a style="color: black;" href="https://wa.me/message/WFEK2G3TR2FKO1" target="_blank" class="w-full mt-3 mr-3">Or click here to open on WhatsApp Desktop</a></p>
            <span style="white-space: pre;"></span>
          </div>
        </div>
        <!-- <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="printQR()">Print QR
        </vs-button>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="saveQR()">Save QR
        </vs-button> -->
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeQRPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import VueQRCodeComponent from 'vue-qrcode-component';
export default {
  data() {
    return {

      title: 'FAMS - new Information Wizard!!',
      subtitle: 'Please complete each field to add new Information',

      itemsPerPage: 10,
      selected: [],
      isMounted: false,
      isListHidden: false,
      isInfoHidden: true,

      formData: {
        id: 0,
        name: '',
        surname: '',
        phoneNumber: '',
        emailaddress: '',
        enabled: false
      },

      selected: [],
      contactInfoData: [],

      popupContactInfo: false,
      popupGenerateQR: false,
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    qrCode: VueQRCodeComponent,
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

  },
  mounted() {
    this.GetContactInfo();
    this.isMounted = true;
  },
  methods: {
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
    cancelAdd() {
      this.isListHidden = false;
      this.isInfoHidden = true;
      this.initValues();
      this.GetContactInfo();
    },
    addContactInfo() {
      this.initValues();
      this.isInfoHidden = false;
      this.isListHidden = true;
    },

    initValues() {
      var self = this;

      self.formData.id = 0;
      self.formData.name = '';
      self.formData.surname = '';
      self.formData.phoneNumber = '';
      self.formData.emailaddress = '';
      self.formData.enabled = false;
    },
    GetContactInfo() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.contactInfoData = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "UserContactInfo",
        onSuccess,
        onFinally
      );
    },
    saveContactInfo() {
      var self = this;
      var myobject = {};
      myobject.Id = self.formData.id;
      myobject.name = self.formData.name;
      myobject.surname = self.formData.surname;
      myobject.phoneNumber = self.formData.phoneNumber.replace("+", "");
      myobject.emailaddress = self.formData.emailaddress;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        if(self.popupContactInfo == true){
          self.isListHidden = false;
          self.isInfoHidden = true;
          self.initValues();
          self.popupContactInfo = false;
          self.GetContactInfo();
        }
        else{
          self.isListHidden = false;
          self.isInfoHidden = true;
          self.initValues();
          self.GetContactInfo();
        }
        // self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "UserContactInfo",
        myobject,
        onSuccess,
        onFinally
      );
    },
    deleteContactInfo(data){
      var self = this;

      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetContactInfo();
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "UserContactInfo/" + data.id,
        onSuccess,
        onFinally
      );
    },
    openContactInfoPopup(data){
      var self = this;
      self.formData.id = data.id;
      self.formData.name = data.name;
      self.formData.surname = data.surname;
      self.formData.phoneNumber = data.phoneNumber;
      self.formData.emailaddress = data.emailaddress;
      self.formData.enabled = data.enabled;

      self.popupContactInfo = true;
    },
    closeContactInfoPopup(){
      var self = this;
      self.popupContactInfo = false;
      self.initValues();
    },
    generateQR(){
      this.popupGenerateQR = true;
    },
  }
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
