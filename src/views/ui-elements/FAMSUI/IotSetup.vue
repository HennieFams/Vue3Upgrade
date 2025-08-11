<template>
  <div>
    <iot-setup-sidebar
      :isSidebarActive="isDeviceSidebarActive"
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
          :data="deviceData"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="getDevicesList" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="showSidebar" icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ deviceData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : deviceData.length }} of {{ deviceData.length }}</span>
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
            <vs-th sort-key="deviceID">Device Id</vs-th>
            <vs-th sort-key="deviceName">Device Name</vs-th>
            <vs-th sort-key="iotType">IOT Type</vs-th>
            <vs-th sort-key="name">Name</vs-th>
            <vs-th sort-key="description">Description</vs-th>
            <vs-th sort-key="storeID">Store (If linked)</vs-th>
            <vs-th sort-key="tankID">Tank (If linked)</vs-th>
            <vs-th sort-key="equipmentID">Equipment (If linked)</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.deviceID">{{tr.deviceID}}</vs-td>
              <vs-td :data="tr.deviceName">{{tr.deviceName}}</vs-td>
              <vs-td :data="tr.iotType">{{tr.iotType}}</vs-td>
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
              <vs-td :data="tr.store">{{tr.store}}</vs-td>
              <vs-td :data="tr.tank">{{tr.tank}}</vs-td>
              <vs-td :data="tr.equipment">{{tr.equipment}}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Device Information">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-success stroke-current"
                  @click.stop="handelSelectedDevice(tr)"
                />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Device">
                  <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="deleteDevice(tr.id)"
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
import IotSetupSidebar from "./IotSetupSidebar.vue";
export default {
  data() {
    return {
      title:'FAMS - new Employee Wizard!!',
      subtitle:'Please complete each tab to add new Employee (operator/driver)',

      isListHidden: false,
      isInfoHidden: true,
      isDeviceSidebarActive: false,
      canChangePassword: false,
      sidebarData: {},


      itemsPerPage: 10,
      deviceData: [],
      isMounted: false,


      // formData: {
      //    id:0,
      //    devicename: "",
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
    IotSetupSidebar
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
    handelSelectedDevice(tr) {
      this.sidebarData = tr;
      // this.canChangePassword = false;
      this.initValues();
      this.toggleDataSidebar(true);
    },
    cancelSidebar() {
      this.isListHidden = false,
      this.isInfoHidden = true;
      this.initValues();
      this.getDevicesList();
    },
    showSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
      this.canChangePassword = true;
    },
    toggleDataSidebar(val){
        if (val)
        this.isDeviceSidebarActive = true;
        else{
          this.isDeviceSidebarActive = false;
          this.getDevicesList();
        }

    },
    getDevicesList() {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function(response) {
        self.deviceData = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "FAMSIoT/GetIOTDeviceAll",
        onSuccess,
        onFinally
      );
    },
    deleteDevice(id) {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function(response) {
        self.getDevicesList();
        self.successNotify();

      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
         `FAMSIoT/${id}`,//&accountId=${localStorage.getItem('userAccountId')}`,
        onSuccess,
        onFinally
      );
    },
  },
  mounted() {
    this.getDevicesList();
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
