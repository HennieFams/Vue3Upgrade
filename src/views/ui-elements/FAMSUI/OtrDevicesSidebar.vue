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
            <vs-input v-show="!hideTxtBx" autocomplete="off" icon-no-border onClick="this.select();" class="w-full"
              name="name" icon-pack="feather" icon="icon-user" v-model="formData.name" />
            <!-- <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span> -->
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Serial Number</label>
            <vs-input autocomplete="off" icon-no-border onClick="this.select();" class="w-full" name="serialNumber"
              icon-pack="feather" icon="icon-user" v-model="formData.serialNumber" />
            <!-- <span class="text-danger text-sm" v-show="errors.has('serialNumber')">{{ errors.first("serialNumber") }}</span> -->
          </div>
        </div>
        <div class="vx-row pt-3 ml-2 mr-2 pb-6">
          <div class="vx-col w-full">
            <span>Select Virtual Store To Link</span>
            <v-select class="w-full" placeholder="Select Virtual Store To Link" :options="formData.storeList"
              v-model="formData.selectedStore"></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="bindEqp">Bind Equipment</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="bindOpr">Bind Employee</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="noBind">No Bind</vs-checkbox>
          </div>
        </div>
        <div class="vx-row pt-3 ml-2 mr-2 pb-6">
          <div class="vx-col w-full" v-show="bindEqp">
            <span>Select Equipment To Link</span>
            <v-select class="w-full" placeholder="Select Equipment To Link" :options="formData.equipmentList"
              v-model="formData.selectedEqp"></v-select>
          </div>
          <div class="vx-col w-full" v-show="bindOpr">
            <span>Select Employee To Link</span>
            <v-select class="w-full" placeholder="Select Employee To Link" :options="formData.driversList"
              v-model="formData.selectedEmp"></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.hourReq">Hour Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.kmReq">KM Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.pickReq">Picture Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.scanReq">Scan Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.gpsReq">GPS Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.alloc1">Allocation 1 Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.alloc2">Allocation 2 Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.alloc3">Allocation 3 Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.alloc4">Allocation 4 Required</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="otrOnly">OTR Only</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="fullSystem">Full System</vs-checkbox>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="systemWithoutOTR">System Without OTR</vs-checkbox>
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
      type: Object,
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
        name: '',
        serialNumber: '',
        storeList: [],
        equipmentList: [],
        selectedEqp: null,
        eqpId: 0,
        driversList: [],
        selectedEmp: null,
        empId: 0,
        selectedStore: null,
        storeId: 0,
        hourReq: false,
        kmReq: false,
        pickReq: false,
        scanReq: false,
        gpsReq: false,
        alloc1: false,
        alloc2: false,
        alloc3: false,
        alloc4: false,
        id: 0,
      },
      bindEqp: false,
      bindOpr: false,
      noBind: false,
      otrOnly: false,
      fullSystem: false,
      systemWithoutOTR: false,
      hideDropdown: false,
      hideTxtBx: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },
  watch: {
    fullSystem(val) {
      var self = this;
      if (val) {
        self.otrOnly = false;
        self.systemWithoutOTR = false;
      }
    },
    otrOnly(val) {
      var self = this;
      if (val) {
        self.fullSystem = false;
        self.systemWithoutOTR = false;
      }
    },
    systemWithoutOTR(val) {
      var self = this;
      if (val) {
        self.otrOnly = false;
        self.fullSystem = false;
      }
    },
    bindEqp(val) {
      var self = this;
      if (val) {
        self.bindOpr = false;
        self.noBind = false;
      }
    },
    bindOpr(val) {
      var self = this;
      if (val) {
        self.bindEqp = false;
        self.noBind = false;
      }
    },
    noBind(val) {
      var self = this;
      if (val) {
        self.bindEqp = false;
        self.bindOpr = false;
      }
    },
    async isSidebarActive(val) {
      var self = this;
      await self.getEquipments();
      await self.getStores();
      await self.getDrivers();
      if (Object.entries(self.data).length === 0) {
        self.initValues();
        self.getEquipments();
        self.getDrivers();
        self.getStores();
      } else {
        self.formData.name = self.data.name;
        self.formData.serialNumber = self.data.macaddress;
        self.formData.hourReq = self.data.hourRequired;
        self.formData.kmReq = self.data.kmrequired;
        self.formData.pickReq = self.data.pictureRequired;
        self.formData.scanReq = self.data.scanRequired;
        self.formData.gpsReq = self.data.gpsrequired;
        self.formData.alloc1 = self.data.allocation1Required;
        self.formData.alloc2 = self.data.allocation2Required;
        self.formData.alloc3 = self.data.allocation3Required;
        self.formData.alloc4 = self.data.allocation4Required;
        self.formData.id = self.data.id;
        self.otrOnly = self.data.otrOnly;
        self.fullSystem = self.data.fullSystem;
        self.systemWithoutOTR = self.data.systemWithoutOTR;
        self.formData.storeId = self.data.storeId;
        self.formData.eqpId = self.data.equipmentId;
        
        if(self.data.type == "Equipment"){
          self.bindEqp = true;
        }
        else{
          self.bindEqp = false;
        }

        if(self.data.type == "Employee"){
          self.bindOpr = true;
        }
        else{
          self.bindOpr = false;
        }

        if(self.data.type == "Dynamic"){
          self.noBind = true;
        }
        else{
          self.noBind = false;
        }
        
        self.formData.selectedEqp = self.formData.equipmentList.filter(function (item) {
          return item.value == self.data.equipmentId;
        })[0];
        self.formData.selectedEmp = self.formData.driversList.filter(function (item) {
          return item.value == self.data.empployeeId;
        })[0];
        self.formData.selectedStore = self.formData.storeList.filter(function (item) {
          return item.value == self.data.storeId;
        })[0];


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

    initValues() {
      this.formData.name = '';
      this.formData.serialNumber = '';
      this.formData.deviceUsers = [];
      this.formData.selectedDeviceUser = {};
      this.formData.equipmentList = [];
      this.formData.storeList = [];
      this.formData.selectedEqp = null;
      this.formData.selectedStore = null;
      this.formData.eqpId = 0;
      this.formData.storeId = 0;
      this.formData.hourReq = false;
      this.formData.kmReq = false;
      this.formData.pickReq = false;
      this.formData.scanReq = false;
      this.formData.gpsReq = false;
      this.formData.alloc1 = false;
      this.formData.alloc2 = false;
      this.formData.alloc3 = false;
      this.formData.alloc4 = false;
      this.formData.id = 0;
      this.otrOnly = false;
      this.fullSystem = false;
      this.systemWithoutOTR = false;
      this.noBind = false;
      this.bindEqp = false;
      this.bindOpr = false;
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

    getUserDeviceDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.formData.deviceUsers = response.data.map((item) => { return { label: item.name + " - " + item.deviceSerial, value: item.id } });

      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "OTR/GetUserDeviceDropdown",
        onSuccess,
        onFinally
      );
    },
    getEquipments() {
      const self = this;
      var onSuccess = function (response) {
        self.formData.equipmentList = response.data.map((item) => { return { label: item.name, value: item.id } });
        if(self.formData.eqpId > 0){
          self.formData.selectedEqp = self.formData.equipmentList.filter(function (item) {
          return item.value == self.formData.eqpId;
        })[0];
        }
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "Equipments/GetEquipmentDropDown",
        onSuccess,
        onFinally
      );
    },
    getDrivers() {
      const self = this;
      var onSuccess = function (response) {
        self.formData.driversList = response.data.map((item) => { return { label: item.name, value: item.id } });
        if(self.formData.empId > 0){
          self.formData.selectedEmp = self.formData.driversList.filter(function (item) {
          return item.value == self.formData.eqpId;
        })[0];
        }
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "Operators/GetDriversdropdown",
        onSuccess,
        onFinally
      );
    },
    getStores() {
      const self = this;
      var onSuccess = function (response) {
        self.formData.storeList = response.data.map((item) => { return { label: item.name, value: item.id } });
        if(self.formData.storeId > 0){
          self.formData.selectedStore = self.formData.storeList.filter(function (item) {
          return item.value == self.formData.storeId;
        })[0];
        }
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "Stores/GetVirtualStoresDropdown",
        onSuccess,
        onFinally
      );
    },
    saveEditConfig() {
      var self = this;
      
      var obj = {
        id: self.formData.id,
        equipmentId: self.noBind == true ? 0 : self.bindEqp == false ? 0 : self.formData.selectedEqp.value,
        operatorId: self.noBind == true ? 0 : self.bindOpr == false ? 0 : self.formData.selectedEmp.value,
        name: self.formData.name,
        macaddress: self.formData.serialNumber,
        hourRequired: self.formData.hourReq == true ? 1 : 0,
        kmrequired: self.formData.kmReq == true ? 1 : 0,
        pictureRequired: self.formData.pickReq == true ? 1 : 0,
        scanRequired: self.formData.scanReq == true ? 1 : 0,
        gpsrequired: self.formData.gpsReq == true ? 1 : 0,
        allocation1Required: self.formData.alloc1 == true ? 1 : 0,
        allocation2Required: self.formData.alloc2 == true ? 1 : 0,
        allocation3Required: self.formData.alloc3 == true ? 1 : 0,
        allocation4Required: self.formData.alloc4 == true ? 1 : 0,
        OTROnly: self.otrOnly,
        FullSystem: self.fullSystem,
        SystemWithoutOTR: self.systemWithoutOTR,
        accountId: self.data.accountId,
        BlobStorageAddress: self.data.blobStorageAddress,
        Enable: self.data.enable,
        Createdate: self.data.createdate,
        storeId: self.formData.selectedStore.value,
        noBind: self.noBind,
        bindEqp: self.bindEqp,
        bindOpr: self.bindOpr,
      };
      
      self.$emit("saveConfig", obj);
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
