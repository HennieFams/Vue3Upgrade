<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary"
    class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>
        {{ Object.entries(this.data).length === 0 ? "ADD" : "UPDATE" }} Config
      </h4>
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-3">General Information</vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div>

        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Name</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full"
              name="name" icon-pack="feather" icon="icon-user" v-model="formData.name" />
            <!-- <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span> -->
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Serial Number</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full"
              name="serialNumber" icon-pack="feather" icon="icon-user" v-model="formData.serialNumber" />
            <!-- <span class="text-danger text-sm" v-show="errors.has('serialNumber')">{{ errors.first("serialNumber") }}</span> -->
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>API URL</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full"
              name="apiurl" icon-pack="feather" icon="icon-user" v-model="formData.apiurl" />
            <!-- <span class="text-danger text-sm" v-show="errors.has('apiurl')">{{ errors.first("apiurl") }}</span> -->
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Verification Type</label>
            <v-select
                  :options="verificationTypeData"
                  placeholder="Search / Select Verification Type"
                  v-model="selectedVerification"
                  @search:blur="populateVerification"
            />
          </div>
          <div class="vx-col w-full">
            <label>Integration Type</label>
            <v-select
                  :options="integrationData"
                  placeholder="Search / Select Integration Type"
                  v-model="selectedIntegration"
                  @search:blur="populateIntegration"
            />
          </div>
        </div>
        <!-- <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Account</label>
            <v-select :options="accountList" placeholder="Search / Select Account" v-model="accountSelect"
              @search:blur="populateStore" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Store</label>
            <v-select :options="storesList" placeholder="Search / Select Store" v-model="storeSelect" />
          </div>
        </div> -->
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.isRegisteredFms">Is Registered Fms</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.isRegisteredQr">Is Registered QR</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.isRegisteredTagScan">Is Registered Tag Scan</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.isRegisteredTagScanFms">Is Registered Tag Scan Fms</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.remoteIo1enabled">Remote IO 1 Enabled</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 1 IP</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo1ip"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo1ip" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 1 ISSID</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo1issid"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo1issid" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 1 Password</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo1password"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo1password" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.remoteIo2enabled">Remote IO 2 Enabled</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 2 IP</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo2ip"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo2ip" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 2 ISSID</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo2issid"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo2issid" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 2 Password</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo2password"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo2password" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.remoteIo3enabled">Remote IO 3 Enabled</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 3 IP</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo3ip"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo3ip" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 3 ISSID</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo3issid"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo3issid" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Remote IO 3 Password</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="remoteIo3password"
              icon-pack="feather" icon="icon-user" v-model="formData.remoteIo3password" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>VPN IP</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="vpnip"
              icon-pack="feather" icon="icon-user" v-model="formData.vpnip" />
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>No Flow Timeout(Enter time in seconds)</label>
            <vs-input autocomplete="off" type="number" icon-no-border onClick="this.select();" class="w-full" name="noFlowTimeout"
              icon-pack="feather" icon="icon-user" v-model="formData.noFlowTimeout" />
          </div>
        </div>
      </div>
    </component>
    <div class="vx-row flex flex-wrap items-center">
      <vs-spacer />
      <div class="vx-col">
        <vs-button ref="saveEditButton" class="rounded-lg mr-3" color="success" type="border"
          @click="saveEditConfig">Save</vs-button>
        <vs-button class="rounded-lg mr-3" color="warning" type="border" @click="closeSidebar">Cancel</vs-button>
      </div>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      default: () => { },
    },
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
  },
  mounted() { },
  data() {
    return {
      formData: {
        accountId: 0,
        id: 0,
        deviceID: "",
        deviceName: "",
        iotType: "",
        iotTypeDesc: "",
        iotTypeBrand: "",
        iotTypeID: 0,
        name: "",
        description: "",
        storeID: 0,
        tankID: 0,
        equipmentID: 0,
        equipment: "",
        store: "",
        tank: "",
      },



      integrationData: [],
      verificationTypeData: [],

      selectedVerification: 0,
      selectedIntegration: 0,

      accountList: [],
      storesList: [],
      accountSelect: {},
      storeSelect: {},
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },
  watch: {
    isSidebarActive(val) {
      var self = this;
      self.getVerificationData();
      self.getIntegrationData();
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        // this.$validator.reset();
        // this.getAccountsList();
      } else {
        debugger
        self.formData.accountId = this.data.accountId;
        self.formData.id = this.data.id;
        self.formData.deviceID = this.data.deviceID;
        self.formData.deviceName = this.data.deviceName;
        self.formData.iotType = this.data.iotType;
        self.formData.iotTypeDesc = this.data.iotTypeDesc;
        self.formData.iotTypeBrand = this.data.iotTypeBrand;
        self.formData.iotTypeID = this.data.iotTypeID;
        self.formData.name = this.data.name;
        self.formData.description = this.data.description;
        self.formData.storeID = this.data.storeID;
        self.formData.tankID = this.data.tankID;
        self.formData.equipmentID = this.data.equipmentID;
        self.formData.equipment = this.data.equipment;
        self.formData.store = this.data.store;
        self.formData.tank = this.data.tank;

        // this.selectedIntegration = { label: this.data.integrationType, value: this.data.integrationTypeID }
        // this.selectedVerification = { label: this.data.verificationType, value: this.data.verificationTypeId }
        // this.getAccountsList();
      }
    },
  },
  computed: {
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
    isFormValid() {
      return !this.errors.any();
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    closeSidebar() {
      this.initValues();
      this.isSidebarActiveLocal = false;
    },

    // getAccountsList(){
    //   var self = this;

    //   var onSuccess = function(response) {
    //     self.accountList = response.data.map((item) => {return {label: item.name, value: item.id} });
    //   };
    //   self.$ajaxGet(self,"Accounts/GetAccountDropdown",onSuccess);
    // },
    initValues() {
      this.formData.accountId = 0;
      this.formData.id = 0;
      this.formData.deviceID = "";
      this.formData.deviceName = "";
      this.formData.iotType = "";
      this.formData.iotTypeDesc = "";
      this.formData.iotTypeBrand = "";
      this.formData.iotTypeID = 0;
      this.formData.name = "";
      this.formData.description = "";
      this.formData.storeID = 0;
      this.formData.tankID = 0;
      this.formData.equipmentID = 0;
      this.formData.equipment = "";
      this.formData.store = "";
      this.formData.tank = "";
    },
    // populateStore() {
    //   var self = this;
    //   var data = self.accountSelect;

    //   var onSuccess = function(response) {
    //       self.storesList = response.data.map((item) => {return {label: item.name, value: item.id} });
    //       // self.storeSelect = self.stores.filter(function (item) {
    //       //   return item.value == self.selectedStoreDD.value;
    //       // })[0];
    //   };
    //   var onFinally = function() {
    //   };
    //   self.$ajaxGet(
    //     self,
    //     "Stores/GetStoredropdownForAccount/" + self.accountSelect.Value,
    //     onSuccess,
    //     onFinally
    //   );
    // },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },

    saveEditConfig() {
      var self = this;

      // self.$validator.validateAll().then((result) => {
        // if (result) {
          var obj = {
            accountId: self.formData.accountId,
            apiurl: self.formData.apiurl,
            id: self.formData.id,
            isRegisteredFms: self.formData.isRegisteredFms == true ? 1 : 0,
            isRegisteredQr: self.formData.isRegisteredQr == true ? 1 : 0,
            isRegisteredTagScan: self.formData.isRegisteredTagScan == true ? 1 : 0,
            isRegisteredTagScanFms: self.formData.isRegisteredTagScanFms == true ? 1 : 0,
            macaddress: self.formData.macaddress,
            name: self.formData.name,
            remoteIo1enabled: self.formData.remoteIo1enabled,
            remoteIo1ip: self.formData.remoteIo1ip,
            remoteIo1issid: self.formData.remoteIo1issid,
            remoteIo1password: self.formData.remoteIo1password,
            remoteIo2enabled: self.formData.remoteIo2enabled,
            remoteIo2ip: self.formData.remoteIo2ip,
            remoteIo2issid: self.formData.remoteIo2issid,
            remoteIo2password: self.formData.remoteIo2password,
            remoteIo3enabled: self.formData.remoteIo3enabled,
            remoteIo3ip: self.formData.remoteIo3ip,
            remoteIo3issid: self.formData.remoteIo3issid,
            remoteIo3password: self.formData.remoteIo3password,
            serialNumber: self.formData.serialNumber,
            storeId: self.formData.storeId,
            vpnip: self.formData.vpnip,
            perIntegrationAccountId: self.formData.integrationTypeID,
            verificationTypeId: self.formData.verificationTypeId,
            noFlowTimeout: self.formData.noFlowTimeout / 3,
          };
          // self.formData.isRegisteredFms = self.formData.isRegisteredFms == true ? 1 : 0;
          // self.formData.isRegisteredQr = self.formData.isRegisteredQr == true ? 1 : 0;
          // self.formData.isRegisteredTagScan = self.formData.isRegisteredTagScan == true ? 1 : 0;
          // self.formData.isRegisteredTagScanFms = self.formData.isRegisteredTagScanFms == true ? 1 : 0;
          self.showLoadingOnElement("saveEditButton", 0.65, "radius");

          // self.formData.accountIds = self.selectedAccounts.map(function (item) { return item.value; });

          var onSuccess = (response) => {
            self.closeSidebar();
            self.$vs.notify({
              title: "Information",
              color: "success",
              text: `Saved`,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-save",
            });
          };
          var onFinally = function () {
            self.$vs.loading.close(self.$refs.saveEditButton.$el);
          };

          self.$ajaxPost(self, "SunmiConfigs/PostSunmiConfig", obj, onSuccess, onFinally);
        // } else {
          // self.$vs.notify({
            // title: "Attention",
            // color: "warning",
            // text: self.$validator.errors.items[0].msg,
            // position: "top-right",
            // iconPack: "feather",
            // icon: "icon-info",
          // });
        // }
      // });
    },
    getVerificationData(){
      const self = this;
        var onSuccess = function(response) {
          self.verificationTypeData = response.data.map(function(item) {
            return { label: item.name, value: item.id };

          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
           "SunmiConfigs/GetVerificationDropdown",
          onSuccess,
          onFinally
        );
    },
    getIntegrationData(){
      const self = this;
        var onSuccess = function(response) {
          self.integrationData = response.data.map(function(item) {
            return { label: item.name, value: item.id };

          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
           "SunmiConfigs/GetIntegrationsDropdown",
          onSuccess,
          onFinally
        );
    },
    populateVerification(){
      this.formData.verificationTypeId = this.selectedVerification.value;
      this.formData.verificationType = this.selectedVerification.label;
    },
    populateIntegration(){
      this.formData.integrationTypeID = this.selectedIntegration.value;
      this.formData.integrationType = this.selectedIntegration.label;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

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
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
