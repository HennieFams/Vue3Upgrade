<template>
  <div>
    <config-sidebar
      :isSidebarActive="isConfigSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          pagination
          :max-items="itemsPerPage"
          search
          :data="configData"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="getConfigsList" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="showSidebar" icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ configData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : configData.length }} of {{ configData.length }}</span>
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
            <vs-th sort-key="AccountName">AccountName</vs-th>
            <vs-th sort-key="ApiUrl">Api Url</vs-th>
            <vs-th sort-key="IsRegisteredFms">Is Registered Fms</vs-th>
            <vs-th sort-key="IsRegisteredQr">Is Registered Qr</vs-th>
            <vs-th sort-key="IsRegisteredTagScan">Is Registered Tag Scan</vs-th>
            <vs-th sort-key="IsRegisteredTagScanFms">Is Registered Tag Scan Fms</vs-th>
            <vs-th sort-key="SerialNumber">Serial Number</vs-th>
            <vs-th sort-key="Name">Name</vs-th>
            <vs-th sort-key="RemoteIo1enabled">Remote IO 1 Enabled</vs-th>
            <vs-th sort-key="RemoteIo1ip">Remote IO 1 IP</vs-th>
            <vs-th sort-key="RemoteIo1issid">Remote IO 1 ISSID</vs-th>
            <vs-th sort-key="RemoteIo1password">Remote IO 1 Password</vs-th>
            <vs-th sort-key="RemoteIo2enabled">Remote IO 2 Enabled</vs-th>
            <vs-th sort-key="RemoteIo2ip">Remote IO 2 IP</vs-th>
            <vs-th sort-key="RemoteIo2issid">Remote IO 2 ISSID</vs-th>
            <vs-th sort-key="RemoteIo2password">Remote IO 2 Password</vs-th>
            <vs-th sort-key="RemoteIo3enabled">Remote IO 3 Enabled</vs-th>
            <vs-th sort-key="RemoteIo3ip">Remote IO 3 IP</vs-th>
            <vs-th sort-key="RemoteIo3issid">Remote IO 3 ISSID</vs-th>
            <vs-th sort-key="RemoteIo3password">Remote IO 3 Password</vs-th>
            <vs-th sort-key="Store">Store</vs-th>
            <vs-th sort-key="VPNIP">VPNIP</vs-th>
            <vs-th sort-key="verificationType">Verification Type</vs-th>
            <vs-th sort-key="integrationType">Integration Type</vs-th>
            <vs-th sort-key="noFlowTimeout">No Flow Timeout</vs-th>
            <vs-th sort-key="signatureRequired">Signature Required</vs-th>
            <vs-th sort-key="bluetoothEnabled">Bluetooth Enabled</vs-th>
            <vs-th sort-key="bluetoothMac">Bluetooth Mac</vs-th>
            <vs-th sort-key="bluetoothService">Bluetooth Service</vs-th>
            <vs-th sort-key="preVolume">Preset Volume</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.accountName">{{tr.accountName}}</vs-td>
              <vs-td :data="tr.apiurl">{{tr.apiurl}}</vs-td>
              <vs-td :data="tr.isRegisteredFms">{{tr.isRegisteredFms == 0 ? false : true}}</vs-td>
              <vs-td :data="tr.isRegisteredQr">{{tr.isRegisteredQr == 0 ? false : true}}</vs-td>
              <vs-td :data="tr.isRegisteredTagScan">{{tr.isRegisteredTagScan == 0 ? false : true}}</vs-td>
              <vs-td :data="tr.isRegisteredTagScanFms">{{tr.isRegisteredTagScanFms == 0 ? false : true}}</vs-td>
              <vs-td :data="tr.serialNumber">{{tr.serialNumber}}</vs-td>
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.remoteIo1enabled">{{tr.remoteIo1enabled}}</vs-td>
              <vs-td :data="tr.remoteIo1ip">{{tr.remoteIo1ip}}</vs-td>
              <vs-td :data="tr.remoteIo1issid">{{tr.remoteIo1issid}}</vs-td>
              <vs-td :data="tr.remoteIo1password">{{tr.remoteIo1password}}</vs-td>
              <vs-td :data="tr.remoteIo2enabled">{{tr.remoteIo2enabled}}</vs-td>
              <vs-td :data="tr.remoteIo2ip">{{tr.remoteIo2ip}}</vs-td>
              <vs-td :data="tr.remoteIo2issid">{{tr.remoteIo2issid}}</vs-td>
              <vs-td :data="tr.remoteIo2password">{{tr.remoteIo2password}}</vs-td>
              <vs-td :data="tr.remoteIo3enabled">{{tr.remoteIo3enabled}}</vs-td>
              <vs-td :data="tr.remoteIo3ip">{{tr.remoteIo3ip}}</vs-td>
              <vs-td :data="tr.remoteIo3issid">{{tr.remoteIo3issid}}</vs-td>
              <vs-td :data="tr.remoteIo3password">{{tr.remoteIo3password}}</vs-td>
              <vs-td :data="tr.store">{{tr.store}}</vs-td>
              <vs-td :data="tr.vpnip">{{tr.vpnip}}</vs-td>
              <vs-td :data="tr.verificationType">{{tr.verificationType}}</vs-td>
              <vs-td :data="tr.integrationType">{{tr.integrationType}}</vs-td>
              <vs-td :data="tr.noFlowTimeout">{{tr.noFlowTimeout}}</vs-td>
              <vs-td :data="tr.signatureRequired">{{tr.signatureRequired == 0 ? false : true}}</vs-td>
              <vs-td :data="tr.bluetoothEnabled">{{tr.bluetoothEnabled == 0 ? false : true}}</vs-td>
              <vs-td :data="tr.bluetoothMac">{{tr.bluetoothMac}}</vs-td>
              <vs-td :data="tr.bluetoothService">{{tr.bluetoothService}}</vs-td>
              <vs-td :data="tr.preVolume">{{tr.preVolume}}</vs-td>
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
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import Datepicker from 'vuejs-datepicker';
import ConfigSidebar from './SunmiConfigSidebar.vue';
export default {
  data() {
    return {
      title:'FAMS - new Employee Wizard!!',
      subtitle:'Please complete each tab to add new Employee (operator/driver)',

      isListHidden: false,
      isInfoHidden: true,
      isConfigSidebarActive: false,
      canChangePassword: false,
      sidebarData: {},


      itemsPerPage: 10,
      configData: [],
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
     ConfigSidebar
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
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
    handelSelectedConfig(tr) {
      this.sidebarData = tr;
      // this.canChangePassword = false;
      this.initValues();
      this.toggleDataSidebar(true);
    },
    cancelSidebar() {
      this.isListHidden = false,
      this.isInfoHidden = true;
      this.initValues();
      this.getConfigsList();
    },
    showSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
      this.canChangePassword = true;
    },
    toggleDataSidebar(val){
        if (val)
        this.isConfigSidebarActive = true;
        else{
          this.isConfigSidebarActive = false;
          this.getConfigsList();
        }

    },
    getConfigsList() {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function(response) {
        debugger
        self.configData = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "SunmiConfigs/GetSunmiDeviceAll",
        onSuccess,
        onFinally
      );
    },
    deleteConfig(id) {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function(response) {
        self.getConfigsList();
        self.successNotify();

      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
         `SunmiConfigs/${id}`,//&accountId=${localStorage.getItem('userAccountId')}`,
        onSuccess,
        onFinally
      );
    },
  },
  mounted() {
    this.getConfigsList();
    this.isMounted = true;
  },
};

</script>
<style lang="scss">
  .num-input_transparent {
    background-color: transparent !important;
    width: 90px !important;
  }

#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>
