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
    <vx-card ref="MainCard" v-show="showList">
      <div>
        <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search
          :data="allocationAssetData" class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addVue" icon-pack="feather"
              icon="icon-plus-square">Add New</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" type="filled" @click="GetBusinessRuleGrid" icon-pack="feather"
              icon="icon-plus-square">Parameter View</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ allocationAssetData.length
      - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : allocationAssetData.length }} of {{
      allocationAssetData.length }}</span>
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
            <vs-th sort-key="assetId">Asset Id</vs-th>
            <vs-th sort-key="asset">Asset Name</vs-th>
            <vs-th sort-key="description">Description</vs-th>
            <vs-th sort-key="operations">Operation</vs-th>
            <vs-th sort-key="locations">Location</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.assetId">{{ tr.assetId }}</vs-td>
              <vs-td :data="tr.asset">{{ tr.asset }}</vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td :data="tr.operations">{{ tr.operations }}</vs-td>
              <vs-td :data="tr.locations">{{ tr.locations }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Allocation Asset">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editVue(tr)"
                />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Allocation Asset">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deleteGrid(tr)" />
                </vx-tooltip>
              </vs-td>
              <!-- <template class="expand-user" slot="expand">
                <div class="con-expand-users w-full">
                  <div>
                    <vs-table ref="gridTable2" v-model="selected" :data="tr.allocations">
                      <template slot="thead">
                        <vs-th>Action</vs-th>
                        <vs-th>Allocation</vs-th>
                      </template>
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                          <vs-td id="iconContainer" class="whitespace-no-wrap">
                            <vx-tooltip class="flex" text="Unlink Allocation">
                              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                class="ml-2" @click.stop="unlinkAlloc(tr)" />
                            </vx-tooltip>
                          </vs-td>
                          <vs-td :data="tr.allocationName">{{ tr.allocationName }}</vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
              </template> -->

            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vx-card ref="ParamViewCard" v-show="showAllocationparameters">
      <div>
        <vs-table ref="gridTable" v-model="selectedParam" pagination :max-items="itemsPerPage" search
          :data="allocationAssetParamsData" class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" @click="cancelAdd" icon-pack="feather"
              icon="icon-plus-square">Return</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" type="filled" @click="GetBusinessRuleGrid" icon-pack="feather"
              icon="icon-plus-square">Reload</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ allocationAssetParamsData.length
      - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : allocationAssetParamsData.length }} of {{
      allocationAssetParamsData.length }}</span>
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
            <vs-th>Action</vs-th>
            <vs-th sort-key="allocation">Allocation</vs-th>
            <vs-th sort-key="assetId">Asset Id</vs-th>
            <vs-th sort-key="assetName">Asset Name</vs-th>
            <vs-th sort-key="description">Description</vs-th>
            <vs-th sort-key="maxLiter">Max Litre</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <!-- <vx-tooltip class="flex" text="Edit Cost Centre">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editDataSidebar(tr)"
                />
                </vx-tooltip> -->
                <vx-tooltip class="flex" text="Delete Allocation Asset">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="unlinkAlloc(tr)" />
                </vx-tooltip>
              </vs-td>
              <vs-td :data="tr.allocation">{{ tr.allocation }}</vs-td>
              <vs-td :data="tr.assetId">{{ tr.assetId }}</vs-td>
              <vs-td :data="tr.assetName">{{ tr.assetName }}</vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td :data="tr.maxLiter">{{ tr.maxLiter }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vs-popup title="Create New Allocation Asset" :active.sync="popupCreateAssetActive">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="vx-row">
          <div class="vx-col md:w-full mt-5">
            <label class="w-full">Asset To Link</label>
            <v-select class="w-full" placeholder="Select Asset" :options="allocationAssetDDData" v-model="selectedAllocationAsset"></v-select>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 mt-5">
            <label class="w-full">Operations</label>
            <v-select placeholder="Select Operation" :options="operationData" v-model="selectedOperation"></v-select>
          </div>
          <div class="vx-col md:w-1/2 mt-5">
            <label class="w-full">Locations</label>
            <v-select class="w-full" placeholder="Select Location" :options="locationData" v-model="selectedLocation"></v-select>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-full mt-5">
            <vs-input label="Asset Description" v-model="formData.desc" class="w-full" />
          </div>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="saveAsset()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="cancelAdd()">Cancel
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
// import costcentreSidebar from "./CostSidebar.vue";
export default {
  data() {
    return {

      title: 'FAMS - new Cost Centre Wizard!!',
      subtitle: 'Please complete each tab to add new Cost Centre',

      isListHidden: false,
      isInfoHidden: true,

      itemsPerPage: 10,
      popupCreateAssetActive: false,
      // costcentreSidebar: false,
      selected: [],
      selectedParam: [],
      allocationAssetData: [],
      allocationAssetDDData: [],
      selectedAllocationAsset: {},
      allocationAssetParamsData: [],
      sidebarData: {},
      allocationRebateData: [],
      selectedAllocationRebate: {},
      operationData: [],
      locationData: [],
      selectedOperation: {},
      selectedLocation: {},
      isMounted: false,
      showList: false,
      showAllocationparameters: false,
      formData: {
        Id: 0,
        accountId: localStorage.getItem('userAccountId'),
        desc: "",
      }
    };
  },
  components: {
    flatPickr,
    // costcentreSidebar,
    "v-select": vSelect,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  mounted() {
    this.showList = true;
    this.GetGrid();
    this.getAllocationAssetDropdown();
    this.getAllocationDropdown();
    this.getLocationDropdown();
    this.popupCreateAssetActive = false;
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

    editDataSidebar(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    //********************* Event functions *

    cancelAdd() {
      this.popupCreateAssetActive = false;
      this.showAllocationparameters = false;
      this.showList = true;
      this.initValues();
      this.GetGrid();
    },
    async addVue() {
      this.initValues();
      await this.GetDropdownallocationRebate();
      this.popupCreateAssetActive = true;
      // this.$refs.wizard.navigateToTab(0)

    },
    async editVue(data) {
      var self = this;
      self.initValues();
      await self.GetDropdownallocationRebate();
      
      self.formData.Id = data.id;
      self.formData.desc = data.description
      
      self.selectedOperation = self.operationData.filter(function (item) {
          return item.value == data.operationsId;
        })[0];
      
        self.selectedLocation = self.locationData.filter(function (item) {
          return item.value == data.locationsId;
        })[0];
        
        self.selectedAllocationAsset = self.allocationAssetDDData.filter(function (item) {
          return item.value == data.eqpAssetId;
        })[0];
        
      self.popupCreateAssetActive = true;
      // this.$refs.wizard.navigateToTab(0)

    },

    initValues() {
      var self = this;
      self.formData.Id = 0;
      self.formData.accountId = localStorage.getItem('userAccountId');
      self.formData.description = "";
    },
    //********************* SQL events */
    saveAsset() {
      var self = this;
      var myobject = {};
      myobject.id = this.formData.Id > 0 ? this.formData.Id : 0;
      myobject.allocationId = this.selectedOperation ? this.selectedOperation.value : 0 ;
      myobject.locationId = this.selectedLocation ? this.selectedLocation.value : 0 ;
      myobject.assetId = this.selectedAllocationAsset ? this.selectedAllocationAsset.value : 0 ;
      myobject.description = this.formData.desc == "" ? 'N/A' : this.formData.desc
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.popupCreateAssetActive = false;
        self.isListHidden = false,
          self.isInfoHidden = true;
        self.initValues();
        self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "EquipmentAssets/PostAllocAsset",
        myobject,
        onSuccess,
        onFinally
      );

    },
    getAllocationAssetDropdown(){
      const self = this;
      var onSuccess = function (response) {
        self.allocationAssetDDData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets/GetEquipmentAssetsdropdown",
        onSuccess,
        onFinally
      );
    },
    getAllocationDropdown(){
      const self = this;
      var onSuccess = function (response) {
        self.operationData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets/GetAllocationsdropdown",
        onSuccess,
        onFinally
      );
    },
    getLocationDropdown(){
      const self = this;
      var onSuccess = function (response) {
        self.locationData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets/GetLocationdropdown",
        onSuccess,
        onFinally
      );
    },
    unlinkAlloc(data) {
      const self = this;

      if(self.showList && !self.showAllocationparameters){
        var obj = {
          assetId: data.id,
          AllocationId: data.allocationId
        }
      }
      else{
        var obj = {
          assetId: data.equipmentAssetId,
          AllocationId: data.allocationId
        }
      }

      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPut(
        self,
        "EquipmentAssets/UnlinkAlloc",
        obj,
        onSuccess,
        onFinally
      );
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
        "EquipmentAssets/DeleteAllocAsset/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.allocationAssetData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets/GetAllocationAssets",
        onSuccess,
        onFinally
      );
    },
    GetBusinessRuleGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.allocationAssetParamsData = response.data;
        self.showList = false;
        self.showAllocationparameters = true;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets/GetAllocationAssetParameterView",
        onSuccess,
        onFinally
      );
    },
    openBusinessRule() {
      this.showList = true;
      this.showAllocationparameters = false;
      this.GetGridBusinessRules();
    },
    closeBusinessRule() {
      this.showList = false;
      this.showAllocationparameters = true;
      this.GetGridBusinessRules();
    },
    GetDropdownallocationRebate() {
      const self = this;
      var onSuccess = function (response) {
        self.allocationRebateData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Allocations/GetAllocationRebatedropdown",
        onSuccess,
        onFinally
      );
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