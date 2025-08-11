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
          :data="equipmentAssetData" class="vs-con-loading__container">
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
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ equipmentAssetData.length
      - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : equipmentAssetData.length }} of {{
      equipmentAssetData.length }}</span>
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
            <vs-th sort-key="costCentre">Asset Id</vs-th>
            <vs-th sort-key="costCentre">Asset Name</vs-th>
            <vs-th sort-key="description">Description</vs-th>
            <vs-th sort-key="costCentreMin">Equipment Rebate</vs-th>
            <vs-th sort-key="costCentreMax">Max Litre</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.assetId">{{ tr.assetId }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td :data="tr.equipmentRebate">{{ tr.equipmentRebate }}</vs-td>
              <vs-td :data="tr.maxLiter">{{ tr.maxLiter }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Equipment Asset">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editDataSidebar(tr)"
                />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Equipment Asset">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deleteGrid(tr)" />
                </vx-tooltip>
              </vs-td>
              <template class="expand-user" slot="expand">
                <div class="con-expand-users w-full">
                  <div>
                    <vs-table ref="gridTable2" v-model="selected" :data="tr.equipments">
                      <template slot="thead">
                        <vs-th>Action</vs-th>
                        <vs-th>Registration</vs-th>
                        <vs-th>Equipment</vs-th>
                        <vs-th>Tag</vs-th>
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                          <vs-td id="iconContainer" class="whitespace-no-wrap">
                            <vx-tooltip class="flex" text="Unlink Equipment">
                              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                class="ml-2" @click.stop="unlinkEqp(tr)" />
                            </vx-tooltip>
                          </vs-td>
                          <vs-td :data="tr.registration">{{ tr.registration }}</vs-td>
                          <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                          <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
              </template>

            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vx-card ref="ParamViewCard" v-show="showEquipmentparameters">
      <div>
        <vs-table ref="gridTable" v-model="selectedParam" pagination :max-items="itemsPerPage" search
          :data="equipmentAssetParamsData" class="vs-con-loading__container">
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
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ equipmentAssetParamsData.length
      - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : equipmentAssetParamsData.length }} of {{
      equipmentAssetParamsData.length }}</span>
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
            <vs-th sort-key="equipment">Equipment</vs-th>
            <vs-th sort-key="equipmentRebate">Equipment Rebate</vs-th>
            <vs-th sort-key="maxLiter">Max Litre</vs-th>
            <vs-th sort-key="tag">Tag</vs-th>
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
                <vx-tooltip class="flex" text="Delete Cost Centre">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deleteGrid(tr)" />
                </vx-tooltip>
              </vs-td>
              <vs-td :data="tr.allocation">{{ tr.allocation }}</vs-td>
              <vs-td :data="tr.assetId">{{ tr.assetId }}</vs-td>
              <vs-td :data="tr.assetName">{{ tr.assetName }}</vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td :data="tr.equipment">{{ tr.equipment }}</vs-td>
              <vs-td :data="tr.equipmentRebate">{{ tr.equipmentRebate }}</vs-td>
              <vs-td :data="tr.maxLiter">{{ tr.maxLiter }}</vs-td>
              <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vs-popup title="Create New Asset" :active.sync="popupCreateAssetActive">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input label="Asset Id" v-model="formData.assetId" class="w-full" />
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <vs-input label="Asset Name" v-model="formData.name" class="w-full" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 mt-5">
            <label class="w-full">Equipment Rebate</label>
            <v-select class="w-full" placeholder="Select Equipment Rebate" :options="equipmentRebateData" v-model="selectedEquipmentRebate"></v-select>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-5">
            <!-- <label>Description</label> -->
            <vs-input label="Asset Description" v-model="formData.description" class="w-full" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2 mt-5">
            <label>Asset Max Litres</label>
            <vs-input-number class="num-input_transparent" :min="0" :max="100000" v-model="formData.max" />
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
      equipmentAssetData: [],
      equipmentAssetParamsData: [],
      sidebarData: {},
      equipmentRebateData: [],
      selectedEquipmentRebate: {},
      isMounted: false,
      showList: false,
      showEquipmentparameters: false,
      formData: {
        Id: 0,
        accountId: localStorage.getItem('userAccountId'),
        name: "",
        description: "",
        min: 0,
        max: 100,
        enable: true,
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

    async editDataSidebar(data) {
      var self = this;
      self.initValues();
      await self.GetDropdownequipmentRebate();
      
      self.formData.Id = data.id
      self.formData.name = data.name;
      self.formData.assetId = data.assetId;
      self.formData.description = data.description;
      self.formData.max = data.maxLiter;
      self.selectedEquipmentRebate = self.equipmentRebateData.filter(function (item) {
          return item.value == data.equipmentRebateId;
        })[0];
      self.popupCreateAssetActive = true;
    },
    //********************* Event functions *

    cancelAdd() {
      this.popupCreateAssetActive = false;
      this.showEquipmentparameters = false;
      this.showList = true;
      this.initValues();
      this.GetGrid();
    },
    async addVue() {
      this.initValues();
      await this.GetDropdownequipmentRebate();
      this.popupCreateAssetActive = true;
      // this.$refs.wizard.navigateToTab(0)

    },

    initValues() {
      var self = this;
      self.formData.Id = 0;
      self.formData.accountId = localStorage.getItem('userAccountId');
      self.formData.name = "";
      self.formData.assetId = "";
      self.formData.min = 0;
      self.formData.description = "";
      self.formData.max = 0;
      self.formData.enable = true;
    },
    //********************* SQL events */
    saveAsset() {
      var self = this;
      
      var myobject = {};
        myobject.Id = self.formData.Id;
        myobject.accountId = parseInt(localStorage.getItem('userAccountId'));
        myobject.name = self.formData.name == "" ? "N/A" : self.formData.name;
        myobject.description = self.formData.description == "" ? "N/A" : self.formData.description;
        myobject.rebateId = self.selectedEquipmentRebate ? self.selectedEquipmentRebate.value : 0;
        myobject.max = self.formData.max == "" ? "N/A" : self.formData.max;
        myobject.assetId = self.formData.assetId == "" ? "N/A" : self.formData.assetId;
        
        self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.popupCreateAssetActive = false;
        self.showEquipmentparameters = false;
        self.showList = true;
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
        "EquipmentAssets",
        myobject,
        onSuccess,
        onFinally
      );

    },
    unlinkEqp(data) {
      const self = this;
      var obj = {
        assetId: data.equipmentAssetId,
        eqpId: data.id
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
        "EquipmentAssets/UnlinkEqp",
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
        "EquipmentAssets/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.equipmentAssetData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets",
        onSuccess,
        onFinally
      );
    },
    GetBusinessRuleGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.equipmentAssetParamsData = response.data;
        self.showList = false;
        self.showEquipmentparameters = true;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets/GetEquipmentAssetsParameterView",
        onSuccess,
        onFinally
      );
    },
    openBusinessRule() {
      this.showList = true;
      this.showEquipmentparameters = false;
      this.GetGridBusinessRules();
    },
    closeBusinessRule() {
      this.showList = false;
      this.showEquipmentparameters = true;
      this.GetGridBusinessRules();
    },
    GetDropdownequipmentRebate() {
      const self = this;
      var onSuccess = function (response) {
        self.equipmentRebateData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentRebates/GetEquipmentRebatesdropdown",
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