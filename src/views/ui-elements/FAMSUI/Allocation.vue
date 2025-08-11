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
    <allocation-sidebar :isSidebarActive="allocationSidebar" @closeSidebar="toggleDataSidebarClose" :data="sidebarData"
      @update="updateGrid" @add="addGrid" />

    <vx-card ref="MainCard3" v-show="showAllocBusiness">
      <div>
        <vs-table ref="gridTableBusiness" v-model="selected" pagination :max-items="itemsPerPage" search
          :data="famsdataBusinessRule" class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <vs-button class="rounded-lg mr-2" color="warning" @click="cancelAdd" icon-pack="feather"
              icon="icon-plus-square">Return</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openBusinessRule" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" @click="PromptActiveAllocationToStoreAdd()"
              icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <vs-button
              class="rounded-lg mr-2"
              color="rgb(62, 201, 214)"
              @click="openAssignPopup"
              icon-pack="feather"
              icon="icon-edit"
              >Business Rule bulk assign</vs-button
            >
            <!-- <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="exportCSV" icon-pack="feather" icon="icon-edit">Export To CSV</vs-button> -->

            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div class="
                  p-4
                  border border-solid border-grey-light
                  rounded-full
                  d-theme-dark-bg
                  cursor-pointer
                  flex
                  items-center
                  justify-between
                  font-medium
                ">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                  {{
                  famsdataBusinessRule.length - currentPage * itemsPerPage > 0
                  ? currentPage * itemsPerPage
                  : famsdataBusinessRule.length
                  }}
                  of {{ famsdataBusinessRule.length }}</span>
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
            <vs-th>Action</vs-th>
            <vs-th sort-key="allocation">Allocation</vs-th>
            <vs-th sort-key="storeName">Store</vs-th>
            <vs-th sort-key="allocDesc">Description</vs-th>
            <vs-th sort-key="allocationRebate">Allocation Rebate</vs-th>
            <vs-th sort-key="allocationGroupName">Group</vs-th>
            <vs-th sort-key="allocationTag">Tag</vs-th>
            <!-- <vs-th sort-key="macaddress">Mac Address</vs-th> -->
            <vs-th sort-key="nr">Nr</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr>
              <vs-td></vs-td>
              <vs-td>
                <vs-input v-model="queryAllocation" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryStore" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryDescription" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryRebate" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryGroup" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryTag" class="w-full" />
              </vs-td>
              <!-- <vs-td>
                <vs-input v-model="queryMac" class="w-full" />
              </vs-td> -->
              <vs-td>
                <vs-input v-model="queryNr" class="w-full" />
              </vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="whitespace-no-wrap" id="iconContainer">
                <vx-tooltip class="flex" text="Delete Equipment Parameter">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deletePerStoreAllocation(tr)" />
                </vx-tooltip>
              </vs-td>
              <vs-td :data="tr.allocation">{{ tr.allocation }}</vs-td>
              <vs-td :data="tr.storeName">{{ tr.storeName }}</vs-td>
              <vs-td :data="tr.allocDesc">{{ tr.allocDesc }}</vs-td>
              <vs-td :data="tr.allocationRebate">{{ tr.allocationRebate }}</vs-td>
              <vs-td :data="tr.allocationGroupName">{{ tr.allocationGroupName }}</vs-td>
              <vs-td :data="tr.allocationTag">{{ tr.allocationTag }}</vs-td>
              <!-- <vs-td :data="tr.macaddress">{{ tr.macaddress }}</vs-td> -->
              <vs-td :data="tr.nr">{{ tr.nr }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vx-card ref="MainCard" v-show="showAllocations">
      <div>
        <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search :data="allocations"
          class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addDataSidebar" icon-pack="feather"
              icon="icon-plus-square">Add New</vs-button>

            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="openBusinessRule" icon-pack="feather"
              icon="icon-edit">Business Rule View (Allocations)</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopup" icon-pack="feather"
             icon="icon-edit" >Business Rule bulk assign</vs-button>

             <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopupAllocation"
              icon-pack="feather" icon="icon-edit">Business Rule (new Allocation to Store)</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="bulkAddAllAlloc()" icon-pack="feather"
              icon="icon-edit">Business Rule (Bulk Add New)</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopupAllocationDelete"
              icon-pack="feather" icon="icon-edit">Business Rule (Bulk Allocation Delete to Store)</vs-button>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ allocations.length -
                currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : allocations.length }} of {{
                  allocations.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <vs-th sort-key="Allocation">Allocation</vs-th>
            <vs-th sort-key="Description">Description</vs-th>
            <vs-th sort-key="AllocationRebate">AllocationRebate</vs-th>
            <vs-th sort-key="Group">Group</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr>
              <vs-td></vs-td>
              <vs-td>
                <vs-input v-model="aAllocation" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="aDescription" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="aAllocationRebate" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="aGroup" class="w-full" />
              </vs-td>
              <vs-td></vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.allocation">{{tr.allocation}}</vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
              <vs-td :data="tr.allocationRebate">{{tr.allocationRebate}}</vs-td>
              <vs-td :data="tr.allocationGroupName">{{tr.allocationGroupName}}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Allocation Information">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDataSidebar(tr)" />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Allocation">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deleteGrid(tr)" />
                </vx-tooltip>

              </vs-td>
              <template class="expand-user" slot="expand">
                <div class="con-expand-users w-full">
                  <div>
                    <vs-button class="rounded-lg mr-2" color="#720ea8" @click="PromptActiveAllocationToStoreAdd(tr)"
                      icon-pack="feather" icon="icon-plus-square">Allocation to Store</vs-button>
                    <vs-table ref="gridTable2" v-model="selected" :data="tr.perStore">
                      <template slot="thead">
                        <vs-th>Remove</vs-th>
                        <vs-th>Store</vs-th>
                        <vs-th>Nr (On FAMS Screen)</vs-th>
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                          <vs-td class="whitespace-no-wrap">
                            <vx-tooltip class="flex" text="Delete Store Per Allocation">
                              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                class="ml-2" @click.stop="deletePerStoreAllocation(tr)" />
                            </vx-tooltip>

                          </vs-td>
                          <vs-td :data="tr.storeName">{{tr.storeName}}</vs-td>
                          <vs-td :data="tr.nr">{{tr.nr}}</vs-td>
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
    <vs-prompt ref="statusPromptAdd" title="Add Store - Allocation" acceptText="Submit" cancelText="Cancel"
      @cancel="dropdownSelectStore=0" @accept="addAllocationStore" :active.sync="statusPromptActiveAdd">
      <div class="vx-row" v-show="showAllocations">
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <vs-input class="w-full" label-placeholder="Allocation Name" disabled v-model="AllocationName"
            name="Allocation Name" />
        </div>
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>Allocation for FAMS store</label>
          <v-select :options="storedropdownValue" placeholder="Search / Select Store" v-model="dropdownSelectStore"
            @search:blur="populateDataStore" />
        </div>
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>Allocation Nr</label>
          <vs-input-number class="num-input_transparent" :min="1" :max="100" v-model="StoreNr" />
        </div>
      </div>
      <div class="vx-row" v-show="showAllocBusiness">
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>Allocation Name</label>
          <v-select :options="allocationsList" placeholder="Search / Select Allocation" v-model="selectedAllocation"
            @search:blur="populateAllocation" />
        </div>
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>Allocation for FAMS store</label>
          <v-select :options="storedropdownValue" placeholder="Search / Select Store" v-model="dropdownSelectStore"
            @search:blur="populateDataStore" />
        </div>
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>Allocation Nr</label>
          <vs-input-number class="num-input_transparent" :min="1" :max="100" v-model="StoreNr" />
        </div>
      </div>
    </vs-prompt>
    <vs-popup
      title="Assign Allocation to Store"
      :active.sync="popupAssignStoreActive"
    >
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">From Store</label>
          <v-select
            placeholder="Select From Store"
            :options="storesFromData"
            v-model="fromStore"
          ></v-select>
        </div>
        <div class="m-2">
          <label class="w-full">To Store</label>
          <v-select
            placeholder="Select To Store"
            :options="storesToData"
            v-model="toStore"
          ></v-select>
        </div>
        <vs-button
          ref="saveButton"
          class="rounded-lg mt-3 mr-3 vs-con-loading__container"
          color="success"
          type="border"
          @click="AssignAllocToStore()"
          >Save
        </vs-button>
        <vs-button
          class="rounded-lg mt-3 mr-3"
          color="warning"
          type="border"
          @click="closeAssignPopup()"
          >Cancel
        </vs-button>
      </div>
    </vs-popup>
    
    <vs-popup title="Assign Allocation to Store (new store)" :active.sync="popupAssignStoreActiveAllocation">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">Store</label>
          <v-select placeholder="Bulk assign Allocation to Store (new)" :options="storesFromData"
            v-model="fromStore"></v-select>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="AssignAllocToStoreNew()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>

    <vs-popup title="Delete Business rules from store (Allocation Parameters)"
      :active.sync="popupAssignStoreActiveAllocationDelete">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">Store</label>
          <v-select placeholder="Bulk delete allocation from Store" :options="storesFromData"
            v-model="fromStore"></v-select>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="DeleteAllocToStore()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
//import axios from "axios";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
// import productSidebar from "../saleshunter/ProductSidebar.vue";
import allocationSidebar from "./AllocationSidebar.vue";
export default {
  data() {
    return {
      itemsPerPage: 10,
      allocationSidebar: false,
      selected: [],
      allocations: [],
      originalAllocations: [],
      sidebarData: {},
      isMounted: false,
      dropdownSelectStore: [],
      storeId: 0,
      StoreNr: 1,
      Store: "",
      AllocationName: "",
      AllocationId: 0,
      storedropdownValue: [],
      statusPromptActiveAdd: false,
      toDelete: {},
      storeAllocations: [],
      aAllocation: "",
      aDescription: "",
      aAllocationRebate: "",
      aGroup: "",
      showAllocBusiness: false,
      showAllocations: true,
      famsdataBusinessRule: [],
      originalBusinessRules: [],
      queryAllocation: "",
      queryStore: "",
      queryDescription: "",
      queryRebate: "",
      queryGroup: "",
      queryTag: "",
      queryMac: "",
      queryNr: "",
      allocationsList: [],
      selectedAllocation: {},

      popupAssignStoreActive : false,
      popupAssignStoreActiveAllocation: false,
      popupAssignStoreActiveAllocationDelete: false,
      storesFromData : [],
      storesToData : [],
      fromStore: { value: 0, label: "Search / Select FROM Store" },
      toStore: { value: 0, label: "Search / Select TO Store" },

    };
  },
  components: {
    flatPickr,
    allocationSidebar,
    "v-select": vSelect
  },
  watch: {
    aAllocation(val) {
      var self = this;

      if (val != "") {
        self.allocations = self.originalAllocations.filter(item => {
          return item.allocation.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.allocations;
      }
      else {
        self.allocations = self.originalAllocations;
      }
    },
    aDescription(val) {
      var self = this;

      if (val != "") {
        self.allocations = self.originalAllocations.filter(item => {
          return item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.allocations;
      }
      else {
        self.allocations = self.originalAllocations;
      }
    },
    aAllocationRebate(val) {
      var self = this;

      if (val != "") {
        self.allocations = self.originalAllocations.filter(item => {
          return item.allocationRebate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.allocations;
      }
      else {
        self.allocations = self.originalAllocations;
      }
    },
    aGroup(val) {
      var self = this;

      if (val != "") {
        self.allocations = self.originalAllocations.filter(item => {
          return item.allocationGroupName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.allocations;
      }
      else {
        self.allocations = self.originalAllocations;
      }
    },
    queryAllocation(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.allocation.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryRebate(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.allocationRebate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryTag(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.allocationTag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryStore(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.storeName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryDescription(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.allocDesc.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryGroup(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.allocationGroupName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryMac(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.macaddress.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryNr(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.nr == parseInt(val);
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
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
    this.GetGrid();
    this.GeStoresDropdown();
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
    successNotifyLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully loaded",
        color: "success",
      });
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
    addDataSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editDataSidebar(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    populateDataStore() {
      var self = this;
      if (self.dropdownSelectStore) {
        self.StoreId = self.dropdownSelectStore.value;
        self.Store = self.dropdownSelectStore.label;
      }
    },
    populateAllocation() {
      var self = this;
      if (self.selectedAllocation) {
        self.AllocationId = self.selectedAllocation.value;
        self.AllocationName = self.selectedAllocation.label;
      }
    },

    PromptActiveAllocationToStoreAdd(data) {
      var self = this;
      self.LoadStoreDropdown();
      if (self.showAllocBusiness) {
        self.selectedAllocation = {};
        self.getAllocationDropdown();
        self.statusPromptActiveAdd = true;
      }
      else {
        self.LoadStoreDropdown();
        self.AllocationId = data.id;
        self.AllocationName = data.allocation;
        self.statusPromptActiveAdd = true;
      }
    },

    addAllocationStore() {
      var self = this;
      const obj = {
        id: 0,
        StoreId: self.StoreId,
        AllocationId: self.AllocationId,
        Nr: self.StoreNr,
        Download: 0
      };
      
      var onSuccess = function () {
        if (self.showAllocations) {
          self.statusPromptActiveAdd = false;
          self.GetGrid();
          self.successNotify();
        }
        else if (self.showAllocBusiness) {
          self.statusPromptActiveAdd = false;
          self.GetGridBusinessRules();
          self.successNotify();
        }
      };
      var onFinally = function () {
        self.StoreNr = 1;
        self.AllocationId = 1;
        self.dropdownSelectStore = 0;

      };
      self.$ajaxPost(
        self,
        "PerAllocationStores",
        obj,
        onSuccess,
        onFinally
      );
    },


    //********************* SQL events */
    addGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function () {

        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "Allocations",
        data,
        onSuccess,
        onFinally
      );
    },
    updateGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      self.storeAllocations = data.perAllocationStore;
      for (var i = 0; i < self.storeAllocations.length; i++) {
        var item = self.storeAllocations.filter(x => x.perstoreID == self.storeAllocations[i].perstoreID);
        if (item[0].checked == false) {
          let c = self.storeAllocations.map(item => item.AllocationId).indexOf(item[0].perstoreID); // find index of your object
          self.storeAllocations.splice(c, 1);
          self.deletePerStoreAllocation(item[0]);
        }
      }
      var onSuccess = function () {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPut(
        self,
        "Allocations/" + data.id,
        data,
        onSuccess,
        onFinally
      );
    },
    getAllocationDropdown() {
      var self = this;
      var onSuccess = function (response) {
        self.allocationsList = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
      };
      self.$ajaxGet(self, "Allocations/GetAllocationdropdown", onSuccess, onFinally);
    },
    deletePerStoreAllocation(data) {
      const self = this;
      var idToDelete = 0;
      if (self.showAllocBusiness) {
        idToDelete = data.perAllocStoreID;
      }
      else if (self.showAllocations) {
        idToDelete = data.perstoreID;
      }
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function () {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "PerAllocationStores/" + idToDelete,
        onSuccess,
        onFinally
      );
    },
    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function () {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "Allocations/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.allocations = response.data;
        self.originalAllocations = response.data;
        if (self.aAllocation != "") {
          self.allocations = self.originalAllocations.filter(item => {
            return item.allocation.toLowerCase().indexOf(self.aAllocation.toLowerCase()) > -1;
          });
        }
        else if (self.aDescription != "") {
          self.allocations = self.originalAllocations.filter(item => {
            return item.description.toLowerCase().indexOf(self.aDescription.toLowerCase()) > -1;
          });
        }
        else if (self.aAllocationRebate != "") {
          self.allocations = self.originalAllocations.filter(item => {
            return item.allocationRebate.toLowerCase().indexOf(self.aAllocationRebate.toLowerCase()) > -1;
          });
        }
        else if (self.aGroup != "") {
          self.allocations = self.originalAllocations.filter(item => {
            return item.allocationGroupName.toLowerCase().indexOf(self.aGroup.toLowerCase()) > -1;
          });
        }
        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Allocations/GetAllocation",
        onSuccess,
        onFinally
      );
    },
    toggleDataSidebarClose(val = false) {
      this.allocationSidebar = val;
      this.GetGrid();
    },

    toggleDataSidebar(val = false) {
      this.allocationSidebar = val;
      //this.GetGrid();
    },
    openBusinessRule() {
      this.showAllocations = false;
      this.showAllocBusiness = true;
      // this.isInfoHiddenEquipmentparameters = false;
      this.GetGridBusinessRules();
    },
    GetGridBusinessRules() {
      const self = this;
      self.showLoadingOnElement("gridTableBusiness", 1, "radius");
      var onSuccess = function (response) {
        self.famsdataBusinessRule = response.data;
        self.originalBusinessRules = response.data;

        if (self.queryStore != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.storeName.toLowerCase().indexOf(self.queryStore.toLowerCase()) > -1;
          });
        }
        else if (self.queryAllocation != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.allocation.toLowerCase().indexOf(self.queryAllocation.toLowerCase()) > -1;
          });
        }
        else if (self.queryTag != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.allocationTag.toLowerCase().indexOf(self.queryTag.toLowerCase()) > -1;
          });
        }
        else if (self.queryDescription != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.allocDesc.toLowerCase().indexOf(self.queryDescription.toLowerCase()) > -1;
          });
        }
        else if (self.queryRebate != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.allocationRebate.toLowerCase().indexOf(self.queryRebate.toLowerCase()) > -1;
          });
        }
        else if (self.queryGroup != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.allocationGroupName.toLowerCase().indexOf(self.queryGroup.toLowerCase()) > -1;
          });
        }
        else if (self.queryMac != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.macaddress.toLowerCase().indexOf(self.queryMac.toLowerCase()) > -1;
          });
        }
        else if (self.queryNr != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.nr == parseInt(self.queryNr);
          });
        }
        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
      };
      self.$ajaxGet(
        self,
        "PerAllocationStores/GetPerAllocationStores",
        onSuccess,
        onFinally
      );
    },
    cancelAdd() {
      this.showAllocBusiness = false;
      this.showAllocations = true;
      this.GetGrid();
    },


    LoadStoreDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.storedropdownValue = response.data.map(function (item) {
          //return { text: item.customer, value: item.id };
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetStoredropdown",
        onSuccess,
        onFinally
      );
    },
    AssignAllocToStore() {
      var self = this;

      if (self.fromStore.value > 0 && self.toStore.value > 0) {
        if (self.fromStore.value == self.toStore.value) {
          this.$vs.notify({
            title: "Not Successfull",
            text: "Can not save to same store",
            color: "danger",
          });
          return;
        }

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();
          self.GetGrid();
          self.GeStoresDropdown();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActive = false;
          self.storesFromData = [];
          self.storesToData = [];
        };
        self.$ajaxPost(
          self,
          `PerAllocationStores/AssignAllocToStore?fromStore=${self.fromStore.value}&toStore=${self.toStore.value}`,
          onSuccess,
          onFinally
        );
      } else {
        this.$vs.notify({
          title: "Not Successfull",
          text: "Not Store(s) / Not all store(s) selected",
          color: "danger",
        });
      }
    },
    openAssignPopup() {
      this.GeStoresDropdown();
      this.popupAssignStoreActive = true;
    },
    closeAssignPopup() {
      this.popupAssignStoreActive = false;
      this.storesFromData = [];
      this.storesToData = [];
      this.popupAssignStoreActiveAllocationDelete = false;
      this.popupAssignStoreActiveAllocation = false
    },
    GeStoresDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.storesFromData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.storesToData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Stores/GetStoredropdown", onSuccess, onFinally);
    },


    openAssignPopupAllocation() {
      this.GeStoresDropdown();
      this.popupAssignStoreActiveAllocation = true;
    },

    openAssignPopupAllocationDelete() {
      this.GeStoresDropdown();
      this.popupAssignStoreActiveAllocationDelete = true;
    },
    AssignAllocToStore() {
      var self = this;

      if (self.fromStore.value > 0 && self.toStore.value > 0) {
        if (self.fromStore.value == self.toStore.value) {
          this.$vs.notify({
            title: "Not Successfull",
            text: "Can not save to same store",
            color: "danger",
          });
          return;
        }

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();
          self.closeAssignPopup();
          self.GetGrid();
          self.GeStoresDropdown();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActive = false;
          self.storesFromData = [];
          self.storesToData = [];
        };
        self.$ajaxPost(
          self,
          `PerAllocationStores/AssignAllocToStore?fromStore=${self.fromStore.value}&toStore=${self.toStore.value}`,
          onSuccess,
          onFinally
        );
      } else {
        this.$vs.notify({
          title: "Not Successfull",
          text: "Not Store(s) / Not all store(s) selected",
          color: "danger",
        });
      }
    },

    AssignAllocToStoreNew() {
      var self = this;
      
      if (self.fromStore.value > 0) {

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

        };
        var onFinally = function () {
          self.GetGrid();
          self.closeAssignPopup();
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActiveAllocation = false;
        };
        self.$ajaxPost(
          self,
          `PerAllocationStores/AssignAllocToStoreNew?Store=${self.fromStore.value}`,
          onSuccess,
          onFinally
        );
      } else {
        this.$vs.notify({
          title: "Not Successfull",
          text: "Not Store(s) / Not all store(s) selected",
          color: "danger",
        });
      }
    },
    bulkAddAllAlloc(data){
      var self = this;

      var obj = {
        eqpId: data ? data : 0
      }

      self.$vs.notify({
        title: "Busy",
        text: "Item(s) Busy Saving/Updating",
        color: "warning",
      });

      var onSuccess = function (response) { };

      var onFinally = function () {
        // self.toggleParameterDataSidebar(false);
        // self.processUpdate();
      };
      
      self.$ajaxPost(
        self,
        `Allocations/BulkAllocationParameterAddEFCore`,
        obj,
        onSuccess,
        onFinally
      );
    },
    DeleteAllocToStore() {
      var self = this;

      if (self.fromStore.value > 0) {

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

        };
        var onFinally = function () {
          self.closeAssignPopup();
          self.GetGrid();
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActiveAllocationDelete = false;
        };
        self.$ajaxPost(
          self,
          `PerAllocationStores/DeleteAllocToStoreNew?Store=${self.fromStore.value}`,
          onSuccess,
          onFinally
        );
      } else {
        this.$vs.notify({
          title: "Not Successfull",
          text: "Not Store(s) / Not all store(s) selected",
          color: "danger",
        });
      }
    },
  }
};

 //created() {
    // var scripts = [
    //   "https://code.jquery.com/jquery-1.10.2.min.js",
    //   "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js",
    //   "https://cdn.syncfusion.com/18.1.0.42/js/web/ej.web.all.min.js"
    // ];
    // scripts.forEach(script => {
    //   let tag = document.createElement("script");
    //   tag.setAttribute("src", script);
    //   document.head.appendChild(tag);
    // });
    //  var link  = [
    //   "https://cdn.syncfusion.com/18.1.0.42/js/web/flat-azure/ej.web.all.min.css"
    // ];
    // link.forEach(script => {
    //   let taglink = document.createElement("link");
    //   taglink.setAttribute("href", link);
    //   document.head.appendChild(taglink);
    // });
 // },

   // formData: {
//          id:0,
//          accountId:0,
//          allocationTypeId:0,
//          name:"None",
//          enable:true,
//          description:"None",
//          account:"",
//          allocationType:0,
//          perAllocationStore:
//           [{
//             id:0,
//             storeId:0,
//             allocationId:0,
//             nr:0,
//             download:0,
//             store:null
//           }],
//           allocationType:
//           [{
//               groupName: "",
//               groupNr: 0,
//               id: 0,
//           }]
//         }

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