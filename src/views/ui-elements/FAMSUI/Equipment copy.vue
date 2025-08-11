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
    <equipment-sidebar
      :isSidebarActive="equipmentSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @update="updateGrid"
    />

   <vx-card ref="MainCard2" v-show="!isInfoHidden">
        <div class="mt-5">
          <div class="vx-row">
              <div class="vx-col md:w-1/6 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelAdd">Return</vs-button>
               </div>
                <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="initValues">Restart</vs-button>
               </div>
          </div>
           
            <form-wizard  ref="wizard" color="rgba(var(--vs-primary), 1)"  errorColor="rgba(var(--vs-danger), 1)" :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="formSubmitted">  
                <tab-content title="Step 1" class="mb-5" icon="feather icon-home" :before-change="validateStep1">
                    <!-- tab 1 content -->
                  <form data-vv-scope="step-1">
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mt-5">
                              <!-- <vs-input size="large" v-validate="'required|alpha'" placeholder="First Name" name="first_name" v-model="first_name" class="mt-5" /> -->
                            <vs-input label="Registration" v-model="formDataEqp.registration" class="w-full" name="first_name" v-validate="'required'" />
                           <span class="text-danger text-sm" v-show="errors.has('first_name')">{{ errors.first('first_name') }}</span>
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input label="Equipment Description"  v-model="formDataEqp.name" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input label="Equipment Tag"  v-model="formDataEqp.tag" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <label class="w-full" size="small">Equipment Rebate</label>
                            <v-select class="w-full"  placeholder="Search / Select Equipment Rebate"  :options="equipmentRebateData"  
                            v-model="equipmentRebateSelect"  @search:blur="populateDataEquipmentRebate"    name ="Search / Select Equipment Rebate" v-validate="'required'"/>
                            <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Rebate')" >{{ errors.first('Search / Select Equipment Rebate') }}</span>
                        </div>
                        <div class="vx-col md:w-1/2 w-full md:mt-8">
                            <div class="demo-alignment">
                                <span>Equipment Download (No | Yes):</span>
                                <div class="flex">
                                  <vs-switch class="rounded-pill" color="success" v-model="formDataEqp.enable"></vs-switch>
                                </div>
                            </div>
                        </div>
                    </div>
                 </form>
                </tab-content>

                <!-- tab 2 content -->
                <tab-content title="Equipment - level 2" class="mb-5" icon="feather icon-briefcase">                 
                   <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                          <label class="w-full">Equipment Max litres</label>
                          <vs-input-number v-model="formDataEqp.maxLitres" label="Capacity:" :step="5"/>
                      </div>
                      <br>
                      <br>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                          <label class="w-full">Equipment Consumption</label>
                          <vs-input-number v-model="formDataEqp.consumption" label="Consumption:" :step="5"/>
                      </div>
                       <br>
                       <br>
                      <div class="vx-col md:w-1/2 w-full">
                           <label class="w-full">Equipment Measurement</label>
                           <br>
                            <v-select class="w-full"  placeholder="Search / Select Equipment Measurement"  :options="EquipmentMeasurementData"  
                            v-model="EquipmentMeasurementSelect"  @search:blur="populateDataEquipmentMeasurement"    name ="Search / Select Equipment Measurement" v-validate="'required'"/>
                            <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Measurement')" >{{ errors.first('Search / Select Equipment Measurement') }}</span>
                      </div>
                      <br>
                      <br>
                        <div class="vx-col md:w-1/2 w-full">
                           <label class="w-full">Equipment Type</label>
                           <br>
                            <v-select class="w-full" placeholder="Search / Select Equipment Type"  :options="equipmentTypeData"  
                            v-model="equipmentTypeSelect"  @search:blur="populateDataEquipmentType"    name ="Search / Select Equipment Type" v-validate="'required'"/>
                            <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Type')" >{{ errors.first('Search / Select Equipment Type') }}</span>                        
                      </div>
                   </div>
                </tab-content>

                <!-- tab 3 content -->
                <tab-content title="Equipment - Level 3 (Optional)" class="mb-5" icon="feather icon-image">
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full">
                            <label class="w-full">Cost Centre</label>
                            <v-select class="w-full"  placeholder="Search / Select Cost Centre"  :options="costcentreData"  
                            v-model="costcentreSelect"  @search:blur="populateDataCostCentre"    name ="Search / Select Cost Centre" v-validate="'required'"/>
                            <span class="text-danger text-sm" v-show="errors.has('Search / Select Cost Centre')" >{{ errors.first('Search / Select Cost Centre') }}</span>
                        </div>
                        <div class="vx-col md:w-1/2 w-full">
                            <label class="w-full">Master Equipment</label>
                            <v-select class="w-full" placeholder="Search / Select Master Equipment"  :options="masterequipmentData"  
                            v-model="masterequipmentSelect"  @search:blur="populateDataMasterEquipment"  name ="Search / Select Master Equipment" v-validate="'required'"/>
                            <span class="text-danger text-sm" v-show="errors.has('Search / Select Master Equipment')" >{{ errors.first('Search / Select Master Equipment') }}</span>
                        </div>

                    </div>
                </tab-content>
                  <!-- tab 4 content -->
                <tab-content title="Equipment - Level 4 (Equipment Parameter)" class="mb-5" icon="feather icon-save">
                        <div class="vx-row">
                        <div class="vx-col w-full">
                          <div class="flex items-end px-3">
                            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
                            <span class="font-medium text-lg leading-none">Equipment Parameters</span>
                          </div>
                          <vs-divider />
                        </div>
                      </div>
                      <!-- <vx-card class="mt-base" no-shadow card-border> -->
                          <div class="vx-row">   
                              <div class="vx-col">
                                   <span>Download</span>
                                      <vs-switch class="rounded-pill" v-model="pes.download" color="danger">
                                        <span slot="on">Yes</span>
                                        <span slot="off">No</span>
                                      </vs-switch>
                              </div>
                                <div class="vx-col">
                                  <span>Driver</span>
                                  <vs-checkbox v-model="pes.requireDriver" color="#720ea8" />
                               </div>
                               <div class="vx-col">
                                  <span>Operator</span>
                                  <vs-checkbox v-model="pes.requireOperator" color="#720ea8" />
                              </div>   
                              <div class="vx-col">
                                 <span>Authentication</span>
                                  <vs-checkbox v-model="pes.requireAuthentication" color="#720ea8" />
                              </div>
                                <div class="vx-col">
                                   <span>KM</span>
                                  <vs-checkbox v-model="pes.requireKM" color="#720ea8"  />
                               </div>
                               <div class="vx-col" >
                                  <span>Hours</span>
                                  <vs-checkbox v-model="pes.requireHours" color="#720ea8" />
                              </div>
                              <div class="vx-col">
                                  <span>Allocation</span>
                                  <v-select  style='font-size:10px' placeholder="select type" :options="allocationData" v-model="allocationSelect" @input="populatedropdownAllocation"></v-select>
                              </div>
                              <div class="vx-col">
                                  <span>Manual</span>
                                  <v-select style='font-size:10px' placeholder="select type" :options="DropdownData" v-model="dropdownSelect" @input="populatedropdownManual"></v-select>
                              </div>
                              
                              <div class="vx-col">
                                 <span>JobOrder</span>
                                  <vs-checkbox v-model="pes.requireJobOrder" color="#720ea8" />
                              </div>
                              <div class="vx-col">
                                 <span>Product1</span>
                                  <vs-checkbox v-model="pes.product1" color="primary" />
                              </div>
                              <div class="vx-col">
                                 <span>Maxlitre1</span>
                                  <vs-input-number style='font-size:12px' v-model="pes.maxlitres1" label="Litre:" :step="5" color="success"/>
                              </div>
                              <div class="vx-col">
                                 <span>Product2</span>
                                  <vs-checkbox v-model="pes.product2" color="primary"/>
                              </div>
                              <div class="vx-col">
                                 <span>Maxlitre2</span>
                                  <vs-input-number style='font-size:12px' v-model="pes.maxlitres2" label="Litre:" :step="5" color="success"/>
                              </div>
                          </div>
                      <!-- </vx-card> -->
                    <!-- <br>
                    <br>
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full">
                          <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelAdd">Cancel the process and return to equipmen list</vs-button>
                        </div>
                    </div> -->
                </tab-content>
            </form-wizard>
              
        </div> 
    </vx-card>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="famsdata"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="#720ea8"  @click="GetGrid()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(38, 187, 174)"  @click="addVue"  icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <!-- <vs-button color="dark" type="gradient" @click="addDataSidebar"  icon-pack="feather" icon="icon-plus-square">Assign Cost Centre</vs-button>
            <vs-button color="primary" type="gradient" @click="addDataSidebar"  icon-pack="feather" icon="icon-plus-square">Assign Master Group</vs-button> -->
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ famsdata.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : famsdata.length }} of {{ famsdata.length }}</span>
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
            <vs-th sort-key="Registration">Registration</vs-th>
            <vs-th sort-key="Description">Description</vs-th>
            <vs-th sort-key="tag">tag</vs-th> 
            <vs-th sort-key="Measurement">Measurement</vs-th>               
            <vs-th sort-key="Rebate">Rebate</vs-th>
            <vs-th sort-key="Capacity">max-Litres</vs-th>
            <vs-th sort-key="consumption">consumption</vs-th>
            <vs-th sort-key="CostCentre">CostCentre</vs-th>
            <vs-th sort-key="MasterGroup">MasterGroup</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td :data="tr.allocationType.groupName">{{tr.allocationType.groupName}}</vs-td> -->
              <vs-td :data="tr.registration">{{tr.registration}}</vs-td>
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.tag">{{tr.tag}}</vs-td>
              <vs-td :data="tr.equipmentMeasurementName">{{tr.equipmentMeasurementName}}</vs-td>
              <vs-td :data="tr.equipmentRebateName">{{tr.equipmentRebateName}}</vs-td>
              <vs-td :data="tr.maxLitres">{{tr.maxLitres}}</vs-td>
              <vs-td :data="tr.consumption">{{tr.consumption}}</vs-td>
              <vs-td :data="tr.ec.costCentreName">{{tr.ec.costCentreName}}</vs-td>
              <vs-td :data="tr.em.masterGroupName">{{tr.em.masterGroupName}}</vs-td> 
              <vs-td class="whitespace-no-wrap">
                
                <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editDataSidebar(tr)"
                />
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="deleteGrid(tr)"
                />
              </vs-td>

           <template class="expand-user" slot="expand" >
              <div class="con-expand-users w-full" >
                  <div>
                      <!-- Permissions -->
                      <vx-card class="mt-base" no-shadow card-border>

                        <div >
                           <vs-table
                              ref="gridTable2"
                              v-model="selected"
                              :data="tr.eps"
                          
                            >
                              <template slot="thead">
                                <vs-th>Action</vs-th>
                                <vs-th>Dwn</vs-th>  
                                <vs-th>store</vs-th>  
                                <vs-th>Tag</vs-th>         
                                <vs-th>ReqDriver</vs-th>   
                                <vs-th>ReqOper</vs-th>   
                                <vs-th>ReqAuth</vs-th>   
                                <vs-th>ReqKM</vs-th>   
                                <vs-th>ReqHrs</vs-th>   
                                <vs-th>ReqAlloc</vs-th>   
                                <vs-th>ReqManual</vs-th>   
                                <vs-th>ReqJobOrd</vs-th>   
                                <vs-th>Prod1</vs-th>   
                                <vs-th>Maxltr1</vs-th>   
                                <vs-th>Prod2</vs-th>   
                                <vs-th>Maxltr2</vs-th>   
                                
                              </template>
                              <!-- visible: false -->
                              <template slot-scope="{data}">
                                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                
                                  <vs-td class="whitespace-no-wrap">
                                    <feather-icon
                                      icon="SaveIcon"
                                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                                      @click.stop="updatePerEquipmentStore(tr)"
                                    />
                                    <feather-icon
                                      icon="TrashIcon"
                                      svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                      class="ml-2"
                                      @click.stop="DeletePerEquipmentStore(tr)"
                                    />
                                  </vs-td>
                                    <vs-td :data="tr.download">
                                       
                                        <!-- <vs-switch class="rounded-pill" v-model="tr.download">
                                        <span slot="1">yes</span>
                                        <span slot="0">no</span>
                                       </vs-switch> -->
                                  <vs-switch class="rounded-pill" v-model="tr.download">
                                        <span slot="on">Yes</span>
                                        <span slot="off">No</span>
                                      </vs-switch>
                                  </vs-td>
                                  <vs-td :data="tr.storeName">{{tr.storeName}}</vs-td>
                                  <vs-td :data="tr.tag">{{tr.tag}}</vs-td>
                                  <vs-td :data="tr.requireDriver"> <vs-checkbox v-model="tr.requireDriver" /></vs-td>
                                  <vs-td :data="tr.requireOperator"> <vs-checkbox v-model="tr.requireOperator"  /></vs-td>
                                  <vs-td :data="tr.requireAuthentication"><vs-checkbox v-model="tr.requireAuthentication"  /></vs-td>
                                  <vs-td :data="tr.requireKM"><vs-checkbox v-model="tr.requireKM"/></vs-td>
                                  <vs-td :data="tr.requireHours"><vs-checkbox v-model="tr.requireHours"  /></vs-td>
                                   <vs-td :data="tr.requireAllocation">
                                      <vs-button class="rounded-lg " color="rgb(62, 201, 214)" size='small' v-model="selected" @click="showStatusPromptAllocation(tr)">{{tr.allocation }}</vs-button>
                                  </vs-td>
                                  <vs-td :data="tr.requireManual">
                                      <vs-button class="rounded-lg " color="rgb(187, 138, 200)" size='small' v-model="selected"  @click="showStatusPromptManual(tr)">{{tr.manual }}</vs-button>
                                  </vs-td>
                                
                                  <vs-td :data="tr.requireJobOrder"><vs-checkbox v-model="tr.requireJobOrder"  /></vs-td>
                                  <vs-td :data="tr.product1"><vs-checkbox v-model="tr.product1"  /></vs-td>
                                  <vs-td :data="tr.maxlitres1">{{tr.maxlitres1}}</vs-td>
                                  <vs-td :data="tr.product2"><vs-checkbox v-model="tr.product2"  /></vs-td>
                                  <vs-td :data="tr.maxlitres2">{{tr.maxlitres2}}</vs-td>
                                
                                </vs-tr>
                              </template>
                            </vs-table>
                        </div>
                      </vx-card>
                  </div>
              </div>
          </template>



            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
      <vs-prompt
        ref="statusPrompt"
        title="Select item"
        acceptText="Update Eqp"
        cancelText="Cancel"
        @cancel="dropdownSelect=0"
        @accept="populateDataClickManual"
        :active.sync="statusPromptActive">
        <div class="con-exemple-prompt">
          <div>
            <label>Equipment Manual information</label>
            <v-select placeholder="select type" :options="DropdownData" v-model="dropdownSelect"></v-select>
          </div>
        </div>
      </vs-prompt>
      <!-- This prompt is called to update expanding equipment allocation -->
   <vs-prompt  
        ref="statusPrompt"
        title="Select/Update Allocation requirement"
        acceptText="Submit"
        cancelText="Cancel"
        @cancel="allocationSelect=0"
        @accept="populateDataClickAllocation"
        :active.sync="statusPromptActiveAllocation">
        <div class="con-exemple-prompt">
          <div>
            <label>Equipment Allocation information</label>
            <v-select placeholder="select type" :options="allocationData"
            v-model="allocationSelect"></v-select>
          </div>
        </div>
      </vs-prompt>


      
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import equipmentSidebar from "./EquipmentSidebar.vue";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { Validator } from 'vee-validate'; // For custom error message

const dict = {
  custom: {
    first_name: {
      required: 'First name is required',
      alpha: "First name may only contain alphabetic characters"
    }
  }
};

Validator.localize('en', dict);

export default {
  data() {
    return {
      title:'FAMS - new Equipment Wizard!!',
      subtitle:'Please complete each tab to add new equipment',
      equipmentRebateSelect:0,
      equipmentRebateData:[],

      EquipmentMeasurementSelect:0,
      EquipmentMeasurementData:[],

      equipmentTypeSelect:0,
      equipmentTypeData:[],

      masterequipmentSelect:0,
      masterequipmentData: [],

      costcentreSelect:0,
      costcentreData: [],

      isListHidden: false,   
      isInfoHidden: true,

      DropdownData: [],
      dropdownSelect:0,
      selected: null,



     // allocationSelect: { id: 0, name: 'Search / Select Allocation' },
      allocationSelect: { value: 0, label: 'Search / Select Allocation' },
      allocationData:[],

      itemsPerPage: 15,
      equipmentSidebar: false,
      
      famsdata: [],
      sidebarData: {},
      isMounted: false,
      formDataEqp: {
        Id : 0,
        accountId: 0,
        name:'',
        registration:'',
        equipmentMeasurementId : 1,
        equipmentMeasurement:'',
        tag:'0000000000',
        maxLitres : 0,
        enable : 0,
        consumption : 0,
        equipmentRebateId : 0,
        equipmentRebate:'',
        CID :0,
        CCName :'',
        MEName:'',
        MEID:0,
        equipmentTypeId:0,
        equipmentType:'',
        maxLitres :100,
        consumption:1,
        enable:true
      },

        pes :{
          id: 0,
          storeId: 0,
          storeEquipmentID: 0,
          storeName  : "",
          equipment  : "",
          tag        : "0000000000",
          requireDriver : 0,
          requireOperator : 0,
          requireAuthentication : 0,
          requireKM : 0,
          requireHours : 0,
          requireAllocation : 0,
          requireManual: 0,
          requireJobOrder : 0,
          product1: 0,
          maxlitres1 : 0,
          product2 : 0,
          maxlitres2 : 0,
          product3 : 0,
          maxlitres3: 0,
          product4: 0,
          maxlitres4 : 0,
          product5 : 0,
          maxlitres5 : 0,
          product6 : 0,
          maxlitres6: 0,
          download : 0,
          blacklist: 0,
          requireTankNozzle:0,
          upload:0
        },
        statusPromptActive: false,
        statusPromptActiveAllocation: false,
        manaulselect:0,

    };
  },
  components: {
    flatPickr,
    equipmentSidebar,
    "v-select": vSelect,
     FormWizard,
     TabContent
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
    this.GetGridPerEquipmentStoreManual();
    this.GetGridPerEquipmentStoreAllocation();
    this.isMounted = true;
  },
  methods: {
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          if (result) {            
            resolve(true)
          } else {
            this.ValidateNotify();
            reject("correct all values");
          }
        })
      })
    },

    populateDataCostCentre() {
        var self = this;
        if (self.costcentreSelect) {
            self.formDataEqp.CID = self.costcentreSelect.value;
            self.formDataEqp.CCName = self.costcentreSelect.label;
          }
      },
    populateDataMasterEquipment() {
        var self = this;
        if (self.masterequipmentSelect) {
            self.formDataEqp.MEID = self.masterequipmentSelect.value;
            self.formDataEqp.MEName = self.masterequipmentSelect.label;
          }
      },
    populateDataEquipmentType() {
        var self = this;
        if (self.equipmentTypeSelect) {
            self.formDataEqp.equipmentTypeId = self.equipmentTypeSelect.value;
            self.formDataEqp.equipmentType = self.equipmentTypeSelect.label;
          }
      },
    populateDataEquipmentMeasurement() {
        var self = this;
        if (self.EquipmentMeasurementSelect) {
            self.formDataEqp.equipmentMeasurementId = self.EquipmentMeasurementSelect.value;
            self.formDataEqp.equipmentMeasurement = self.EquipmentMeasurementSelect.label;
          }
      },
    populateDataEquipmentRebate() {
        var self = this;
        if (self.equipmentRebateSelect) {
            self.formDataEqp.equipmentRebateId = self.equipmentRebateSelect.value;
            self.formDataEqp.equipmentRebate = self.equipmentRebateSelect.label;
          }
      },

     initValues() {
          var self = this;
          self.$refs.wizard.navigateToTab(0)
          
          self.formDataEqp.Id = 0,
          self.formDataEqp.accountId=12,
          self.formDataEqp.name='',
          self.formDataEqp.registration='',
          self.formDataEqp.equipmentMeasurementId = 1,
          self.formDataEqp.equipmentMeasurement='',
          self.formDataEqp.tag='0000000000',
          self.formDataEqp.maxLitres = 0,
          self.formDataEqp.enable = 1,
          self.formDataEqp.consumption = 0,
          self.formDataEqp.equipmentRebateId = 0,
          self.formDataEqp.equipmentRebate = '',
          self.formDataEqp.CID =0,
          self.formDataEqp.CCName ='',
          self.formDataEqp.MEName='',
          self.formDataEqp.MEID=0,
          self.formDataEqp.equipmentTypeId=0,
          self.formDataEqp.equipmentType='' 
          self.formDataEqp.maxLitres =100,
          self.formDataEqp.consumption =1,
          self.formDataEqp.enable=true

          self.EquipmentMeasurementSelect=0,
          self.equipmentTypeSelect=0,
          self.masterequipmentSelect=0,
          self.costcentreSelect=0,
          self.equipmentRebateSelect=0,
          self.dropdownSelect =0,
          self.allocationSelect=0,
          self.selected=0,
          self.pes.id=0,
          self.pes.storeId=0,
          self.pes.storeEquipmentID=0,
          self.pes.requireDriver=0,
          self.pes.requireOperator =1,
          self.pes.requireAuthentication =0,
          self.pes.requireKM =0,
          self.pes.requireHours =0,
          self.pes.requireAllocation =0,
          self.pes.requireManual=0,
          self.pes.requireJobOrder =0,
          self.pes.product1=1,
          self.pes.maxlitres1 =100,
          self.pes.product2 =0,
          self.pes.maxlitres2 =0,
          self.pes.product3 =0,
          self.pes.maxlitres3=0,
          self.pes.product4=0,
          self.pes.maxlitres4 =0,
          self.pes.product5 =0,
          self.pes.maxlitres5 =0,
          self.pes.product6 =0,
          self.pes.maxlitres6=0,
          self.pes.download =1,
          self.pes.blacklist=0,
          self.pes.requireTankNozzle=0,
          self.pes.upload =0
      },
    cancelAdd() {
        this.isListHidden = false,
        this.isInfoHidden = true;
        this.initValues();
        this.GetGrid();
    },
  addVue() {
        this.initValues();
        this.GetDropdownCostCentre();
        this.GetDropdownMasterEquipment();
        this.GetDropdownEquipmentType() ;
        this.GetDropdownequipmentMeasurement();
        this.GetDropdownequipmentRebate();
        this.isInfoHidden = false;
        this.isListHidden = true
        // this.$refs.wizard.navigateToTab(0)

    },
     populatedropdownAllocation() 
    {   
      var self = this;
      if(self.allocationSelect){
        self.pes.requireAllocation  = self.allocationSelect.value; 
      }
    },
    populatedropdownManual()
    {   
      var self = this;
      if(self.dropdownSelect){
        self.pes.requireManual  = self.dropdownSelect.value; 
      }
    },
    // This function is called when the update allocation prompt update button is clicked
    populateDataClickAllocation()
    {
      var self = this;
      if(self.allocationSelect){
        self.selected.requireAllocation = self.allocationSelect.value; 
        self.selected.allocation = self.allocationSelect.label; 
      }
    },
    //This function is called when equipment is expand and want to change allocation
    showStatusPromptAllocation(data) {
        var self = this;
        self.allocationSelect = self.allocationData.filter(function (item) { return item.value == data.requireAllocation; })[0];
        self.statusPromptActiveAllocation = true;
    },
    populateDataClickManual()
    {   
      var self = this;
      if(self.dropdownSelect){
        self.selected.requireManual = self.dropdownSelect.value; 
        self.selected.manual = self.dropdownSelect.label; 
      }
    },
    showStatusPromptManual(data) {
        var self = this;
        self.dropdownSelect = self.DropdownData.filter(function (item) { return item.value == data.requireManual; })[0];
        self.statusPromptActive = true;
    },
  successNotifyLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
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
  ValidateNotify() {
      this.$vs.notify({
        title: 'Not Successfull',
        text: 'Please ensure all the fields are completed',
        color: 'danger'
      })
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
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

    //********************* SQL events */
    //update
    Bool2Int (data)
    {
      if(data == false) return 0;
      else if ( data  === true) return 1;
      else return data;      
    },
formSubmitted() {
          var self = this;
          var myobject={};
          myobject.Id = 0;
          myobject.AccountId = self.formDataEqp.accountId;
          myobject.Name = self.formDataEqp.name;
          myobject.Registration = self.formDataEqp.registration;
          myobject.Tag = self.formDataEqp.tag;
          myobject.MaxLitres = self.formDataEqp.maxLitres;
          myobject.Enable = self.formDataEqp.enable;
          myobject.Consumption = self.formDataEqp.consumption;
          myobject.EquipmentTypeId = self.formDataEqp.equipmentTypeId;
          myobject.EquipmentMeasurementId = self.formDataEqp.equipmentMeasurementId;
          myobject.EquipmentRebateId = self.formDataEqp.equipmentRebateId;
          myobject.PerEquipmentStoreId = 0;
          if(self.formDataEqp.CID === undefined) myobject.PerEquipmentCostCentreId =''
          else myobject.PerEquipmentCostCentreId = self.formDataEqp.CID
          if(self.formDataEqp.MEID === undefined) myobject.PerEquipmentMasterGroupId =''
          else myobject.PerEquipmentMasterGroupId = self.formDataEqp.MEID
        
          myobject.StoreId = 0;
          myobject.RequireDriver = self.Bool2Int(self.pes.requireDriver);
          myobject.RequireOperator = self.Bool2Int(self.pes.requireOperator);
          myobject.RequireAuthentication = self.Bool2Int(self.pes.requireAuthentication);
          myobject.RequireKm = self.Bool2Int(self.pes.requireKM);
          myobject.RequireHours = self.Bool2Int(self.pes.requireHours);
          myobject.RequireAllocation = self.pes.requireAllocation;
          myobject.RequireManual = self.pes.requireManual;
          myobject.RequireTankNozzle = 0;
          myobject.RequireJobOrder = self.Bool2Int(self.pes.requireDriver);
          myobject.Blacklist = 0;
          myobject.Product1 = self.Bool2Int(self.pes.product1);
          myobject.Maxlitres1 = self.pes.maxlitres1;
          myobject.Product2 = self.Bool2Int(self.pes.product2);
          myobject.Maxlitres2 = self.pes.maxlitres2;
          myobject.Download = self.Bool2Int(self.pes.download);
          myobject.Product3 = 0;
          myobject.Maxlitres3= 0;
          myobject.Product4 = 0;
          myobject.Maxlitres4 = 0;
          myobject.Product5 = 0;
          myobject.Maxlitres5 = 0;
          myobject.Product6 = 0;
          myobject.Maxlitres6 = 0;
          myobject.Upload = 0;
      
          self.showLoadingOnElement("gridTable", 1, "radius");
              var onSuccess = function(response) {
                self.isListHidden = false,
                self.isInfoHidden = true;
                self.initValues();
                self.GetGrid();
              };
              var onFinally = function() {
                self.$vs.loading.close(self.$refs.gridTable.$el);
              };
              self.$ajaxPost(
                self,
                "Equipments",
                myobject,
                onSuccess,
                onFinally
              );

    },
    DeletePerEquipmentStore(data)
    {
      const self = this;
      var onSuccess = function(response) {
        self.GetGrid();
      };
      var onFinally = function() {
      };
      self.$ajaxDelete(
        self,
        "PerEquipmentStores/" + data.perId,
        onSuccess,
        onFinally
      );
    },

    updatePerEquipmentStore(data)
    {
        const self = this;
        var myobject ={};
        myobject.Id= data.perId,
        myobject.StoreId= data.perStoreId,
        myobject.EquipmentID= data.perStoreEquipmentID,
        myobject.RequireDriver = self.Bool2Int(data.requireDriver),    
        myobject.RequireOperator = self.Bool2Int(data.requireOperator),
        myobject.RequireAuthentication = self.Bool2Int(data.requireAuthentication),
        myobject.RequireKM = self.Bool2Int(data.requireKM),
        myobject.RequireHours = self.Bool2Int(data.requireHours),
        myobject.RequireAllocation = self.Bool2Int(data.requireAllocation),
        myobject.RequireManual= self.Bool2Int(data.requireManual),
        myobject.RequireJobOrder = self.Bool2Int(data.requireJobOrder),
        myobject.Product1= self.Bool2Int(data.product1),
        myobject.Maxlitres1 = data.maxlitres1
        myobject.Product2 = self.Bool2Int(data.product2),
        myobject.Maxlitres2 = data.maxlitres2
        myobject.Product3 = self.Bool2Int(data.product3),
        myobject.Maxlitres3= data.maxlitres3,
        myobject.Product4= 0,
        myobject.Maxlitres4 = 0,
        myobject.Product5 = 0,
        myobject.Maxlitres5 = 0,
        myobject.Product6 = 0,
        myobject.Maxlitres6= 0,
        myobject.Download = self.Bool2Int(data.download),
        myobject.Blacklist = 0,
        myobject.Upload = 0
        myobject.RequireTankNozzle = 0
        self.showLoadingOnElement("gridTable2", 1, "radius");
        var onSuccess = function(response) {
        self.successNotify();
          //self.GetGrid();
        };
        var onFinally = function() {
          self.$vs.loading.close(self.$refs.gridTable2.$el);
        };
        self.$ajaxPut(
          self,
          "PerEquipmentStores/" + data.perId,
          myobject,
          onSuccess,
          onFinally
        );
    },
     updateGrid(data) {
      const self = this;

      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxPut(
        self,
        "Equipments/" + data.id,
        data,
        onSuccess,
        onFinally
      );
    },

    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
        "Equipments/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.famsdata = response.data;
        self.successNotifyLoad();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "Equipments/GetEquipment",
        onSuccess,
        onFinally
      );
    },
    GetGridPerEquipmentStoreManual(whenDone) {
      const self = this;
      var onSuccess = function(response) {
          self.DropdownData = response.data.map((item) => {return {label: item.name, value: item.id} });
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {
       // self.$vs.loading.close(self.$refs.gridTable.$el);
     
      };
      self.$ajaxGet(
        self,
         "PerEquipmentStores/GetPerEquipmentStoreManualTypedropdown",
        onSuccess,
        onFinally
      );    
    },
    GetGridPerEquipmentStoreAllocation(whenDone) {
      const self = this;
      var onSuccess = function(response) {
          self.allocationData = response.data.map((item) => {return {label: item.name, value: item.id} });
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {
        //self.$vs.loading.close(self.$refs.gridTable.$el);
     
      };
      self.$ajaxGet(
        self,
         "PerEquipmentStores/CRUD_PerEquipmentStoreAllocations_Get",
        onSuccess,
        onFinally
      );    
    },

    GetDropdownCostCentre() {
          const self = this;
          var onSuccess = function(response) {
              self.costcentreData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxGet(
            self,
            "EquipmentCostCentres/GetEquipmentCostCentresdropdown",
            onSuccess,
            onFinally
          );    
        },

    GetDropdownMasterEquipment() {
          const self = this;
          var onSuccess = function(response) {
              self.masterequipmentData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxGet(
            self,
            "EquipmentMasterGroups/GetEquipmentMasterGroupdropdown",
            onSuccess,
            onFinally
          );    
        },
    GetDropdownEquipmentType() { 
          const self = this;
          var onSuccess = function(response) {
              self.equipmentTypeData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxGet(
            self,
            "EquipmentTypes/GetEquipmentTypedropdown",
            onSuccess,
            onFinally
          );    
        },
    GetDropdownequipmentMeasurement() { 
          const self = this;
          var onSuccess = function(response) {
              self.EquipmentMeasurementData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxGet(
            self,
            "EquipmentMeasurements/GetEquipmentMeasurementdropdown",
            onSuccess,
            onFinally
          );    
        },
    GetDropdownequipmentRebate() { 
          const self = this;
          var onSuccess = function(response) {
              self.equipmentRebateData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxGet(
            self,
            "EquipmentRebates/GetEquipmentRebatesdropdown",
            onSuccess,
            onFinally
          );    
        },

    toggleDataSidebar(val = false) {
      this.equipmentSidebar = val;
    },
   
  }
};
</script>
<style>
    .v-select.v-input--is-dirty input {
      display: none;
    }

    .v-select__selection {
      max-width: none;
    }
</style>

