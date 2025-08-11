<template>
  <div>
    <otr-devices-sidebar
      :isSidebarActive="isOtrDevicesSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @saveConfig="saveEditGrid"
    />
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          pagination
          :max-items="itemsPerPage"
          search
          :data="devicesList"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <vs-button
              class="rounded-lg mr-2"
              color="warning"
              type="filled"
              @click="getConfigsList"
              icon-pack="feather"
              icon="icon-refresh-ccw"
              >Reload</vs-button
            >
            <vs-button
              class="rounded-lg mr-2"
              color="success"
              type="filled"
              @click="showSidebar"
              icon-pack="feather"
              icon="icon-plus-square"
              >Add New</vs-button
            >
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span class="mr-2"
                  >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                  {{
                    devicesList.length - currentPage * itemsPerPage > 0
                      ? currentPage * itemsPerPage
                      : devicesList.length
                  }}
                  of {{ devicesList.length }}</span
                >
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
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
            <vs-th sort-key="account">Account</vs-th>
            <vs-th sort-key="name">Store</vs-th>
            <vs-th sort-key="name">Name</vs-th>
            <vs-th sort-key="blobStorageAddress">Image Storage Address</vs-th>
            <vs-th sort-key="macaddress">Serial NUmber</vs-th>
            <vs-th sort-key="hourRequired">Hour Required</vs-th>
            <vs-th sort-key="kmrequired">KM Required</vs-th>
            <vs-th sort-key="gpsrequired">GPS Required</vs-th>
            <vs-th sort-key="pictureRequired">Picture Required</vs-th>
            <vs-th sort-key="scanRequired">Scan Required</vs-th>
            <vs-th sort-key="allocation1Required">Allocation 1 Required</vs-th>
            <vs-th sort-key="allocation2Required">Allocation 2 Required</vs-th>
            <vs-th sort-key="allocation3Required">Allocation 3 Required</vs-th>
            <vs-th sort-key="allocation4Required">Allocation 4 Required</vs-th>
            <vs-th sort-key="otrOnly">OTROnly</vs-th>
            <vs-th sort-key="fullSystem">FullSystem</vs-th>
            <vs-th sort-key="systemWithoutOTR">SystemWithoutOTR</vs-th>
            <vs-th sort-key="createdate">Create Date</vs-th>
            <vs-th sort-key="enable">Enable</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.account">{{ tr.account }}</vs-td>
              <vs-td :data="tr.storeName">{{ tr.storeName }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.blobStorageAddress">{{ tr.blobStorageAddress }}</vs-td>
              <vs-td :data="tr.macaddress">{{ tr.macaddress }}</vs-td>
              <vs-td :data="tr.hourRequired">{{ tr.hourRequired }}</vs-td>
              <vs-td :data="tr.kmrequired">{{ tr.kmrequired }}</vs-td>
              <vs-td :data="tr.gpsrequired">{{ tr.gpsrequired }}</vs-td>
              <vs-td :data="tr.pictureRequired">{{ tr.pictureRequired }}</vs-td>
              <vs-td :data="tr.scanRequired">{{ tr.scanRequired }}</vs-td>
              <vs-td :data="tr.allocation1Required">{{ tr.allocation1Required }}</vs-td>
              <vs-td :data="tr.allocation2Required">{{ tr.allocation2Required }}</vs-td>
              <vs-td :data="tr.allocation3Required">{{ tr.allocation3Required }}</vs-td>
              <vs-td :data="tr.allocation4Required">{{ tr.allocation4Required }}</vs-td>
              <vs-td :data="tr.otrOnly">{{ tr.otrOnly }}</vs-td>
              <vs-td :data="tr.fullSystem">{{ tr.fullSystem }}</vs-td>
              <vs-td :data="tr.systemWithoutOTR">{{ tr.systemWithoutOTR }}</vs-td>
              <vs-td :data="tr.createdate">{{ tr.createdate }}</vs-td>
              <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Config Information">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-success stroke-current"
                    @click.stop="handelSelectedConfig(tr)"
                  />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Config">
                  <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2"
                    @click.stop="deleteConfig(tr.id)"
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
import Datepicker from "vuejs-datepicker";
import OtrDevicesSidebar from "./OtrDevicesSidebar.vue";
export default {
  data() {
    return {
      title: "FAMS - new Employee Wizard!!",
      subtitle: "Please complete each tab to add new Employee (operator/driver)",

      isListHidden: false,
      isInfoHidden: true,
      isOtrDevicesSidebarActive: false,
      canChangePassword: false,
      sidebarData: {},

      itemsPerPage: 10,
      devicesList: [],
      isMounted: false,

      // formData: {
      //    id:0,
      //    configname: "",
      //   //  email:"",
      //   //  enable:true,
      //   //  password:"",
      //   }
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    Datepicker,
    OtrDevicesSidebar,
    OtrDevicesSidebar,
  },

  mounted() {
    this.getConfigsList();
    // this.getFuelStationDropdown();
    // this.getUserDeviceDropdown();
    this.isMounted = true;
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  methods: {
    initValues() {
      var self = this;
      // this.formData.id = 0;
      // this.formData.configname = "";

      // this.formData.email = "";
      // this.formData.enable = true;
      // this.formData.password = "";
    },
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
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    handelSelectedConfig(tr) {
      this.sidebarData = tr;
      // this.canChangePassword = false;
      this.initValues();
      this.toggleDataSidebar(true);
    },
    cancelSidebar() {
      (this.isListHidden = false), (this.isInfoHidden = true);
      this.initValues();
      this.getConfigsList();
    },
    showSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
      this.canChangePassword = true;
    },
    toggleDataSidebar(val) {
      if (val) this.isOtrDevicesSidebarActive = true;
      else {
        this.isOtrDevicesSidebarActive = false;
        this.getConfigsList();
      }
    },
    getConfigsList() {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.devicesList = [
          ...response.data.equipments, 
          ...response.data.employeesList, 
          ...response.data.dynamic
        ];

      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "OTR", onSuccess, onFinally);
    },
    deleteConfig(id) {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.getConfigsList();
        self.successNotify();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
        `OTR/${id}`, //&accountId=${localStorage.getItem('userAccountId')}`,
        onSuccess,
        onFinally
      );
    },
    getUserDeviceDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.storesData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Stores/GetStoredropdown", onSuccess, onFinally);
    },
    saveEditGrid(data) {
      var self = this;
      
      var obj = {
        id: data.id,
        equipmentId: data.equipmentId,
        employeeId: data.operatorId,
        name: data.name,
        macaddress: data.macaddress,
        hourRequired: data.hourRequired == true ? 1 : 0,
        kmrequired: data.kmrequired == true ? 1 : 0,
        pictureRequired: data.pictureRequired == true ? 1 : 0,
        scanRequired: data.scanRequired == true ? 1 : 0,
        gpsrequired: data.gpsrequired == true ? 1 : 0,
        allocation1Required: data.allocation1Required == true ? 1 : 0,
        allocation2Required: data.allocation2Required == true ? 1 : 0,
        allocation3Required: data.allocation3Required == true ? 1 : 0,
        allocation4Required: data.allocation4Required == true ? 1 : 0,
        OTROnly: data.OTROnly,
        FullSystem: data.FullSystem,
        SystemWithoutOTR: data.SystemWithoutOTR,
        accountId: data.accountId,
        BlobStorageAddress: data.BlobStorageAddress,
        Enable: data.Enable,
        Createdate: data.Createdate,
        StoreId: data.storeId,   
        noBind: data.noBind,
        bindEqp: data.bindEqp,
        bindOpr: data.bindOpr,
      };
      // self.showLoadingOnElement("saveEditButton", 0.65, "radius");

      var onSuccess = (response) => {
        self.toggleDataSidebar(false);
        self.$vs.notify({
          title: "Information",
          color: "success",
          text: `Saved`,
          position: "top-right",
          iconPack: "feather",
          icon: "icon-save",
        });
      };
      var onFinally = function (res) {
        console.warn(res)
        // self.$vs.loading.close(self.$refs.saveEditButton.$el);
      };

      self.$ajaxPost(self, "OTR", obj, onSuccess, onFinally);
    },
  },
};
</script>
<style lang="scss">
.num-input_transparent {
  background-color: transparent !important;
  width: 90px !important;
}

#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>
