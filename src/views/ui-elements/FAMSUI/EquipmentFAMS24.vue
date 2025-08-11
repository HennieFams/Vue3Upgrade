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
                            <vs-input maxlength="18" @keydown="nameKeydown($event)" label="Registration (Alfanumeric Only with Spaces and Underscores('_'))" v-model="formDataEqp.registration" class="w-full" name="registration" v-validate="'required'" />
                           <span class="text-danger text-sm" v-show="errors.has('registration')">{{ errors.first('registration') }}</span>
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input label="Equipment Description"  v-model="formDataEqp.name" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input maxlength="20" @keydown="nameKeydown($event)" label="Equipment Tag"  v-model="formDataEqp.tag" class="w-full" />
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
                   <div>
                    <vs-button v-show="!showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:38%; top:1rem;" @click="moreDetail"  icon-pack="feather" icon="icon-edit">More Detail</vs-button>
                    <vs-button v-show="showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:38%; top:1rem;" @click="lessDetail"  icon-pack="feather" icon="icon-edit">Less Detail</vs-button>
                  </div>
                  <br>
                  <div v-show="showMore">
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>Vin Number</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-hash"
                          placeholder="Vin Number"
                          name="Vin Number"
                          v-validate="'numeric'"
                          type="numeric"
                          v-model="equipmentDetail.vin"
                          class="w-full"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('Vin Number')">{{ errors.first('Vin Number') }}</span>
                      </div>
                      <div class="vx-col flex-1">
                        <label>Engine Number</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-hash"
                          placeholder="Engine Number"
                          name="Engine Number"
                          v-model="equipmentDetail.engineNumber"
                          class="w-full"
                          v-validate="'numeric'"
                          type="numeric"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('Engine Number')">{{ errors.first('Engine Number') }}</span>
                      </div>
                      <div class="vx-col flex-1">
                        <label>Series Name</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-file-text"
                          placeholder="Series Name"
                          v-model="equipmentDetail.seriesName"
                          class="w-full"
                          name="SeriesName"
                        />
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>Service Interval</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-hash"
                          v-model="equipmentDetail.serviceInterval"
                          class="w-full"
                          v-validate="'numeric'"
                          type="numeric"
                          name="Service Interval"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('Service Interval')">{{ errors.first('Service Interval') }}</span>
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-2">
                        <label>Service Date</label>
                        <div id="datepick" >
                          <flat-pickr
                            class="w-full"
                            icon-pack="feather"
                            icon="icon-calendar"
                            v-model="equipmentDetail.serviceDate"
                            :format="'YYYY-MM-DD'"
                            placeholder="Select Service Date"
                            name="Service Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>License</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-file-text"
                          placeholder="License"
                          v-model="equipmentDetail.license"
                          class="w-full"
                          name="License"
                        />
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>License</label>
                        <v-select class="w-full"  placeholder="Search / Select License Type"  :options="licenseTypeData"  
                        v-model="licenseTypeSelect"  @search:blur="populateDataLicenseType"   
                        name ="Search / Select License Type" />
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-2">
                        <label>License Expire Date</label>
                        <div id="datepick">
                          <flat-pickr
                            class="w-full"
                            v-model="equipmentDetail.licenseExpiryDate"
                            :format="'YYYY-MM-DD'"
                            icon-pack="feather"
                            icon="icon-calendar"
                            placeholder="Select Expiration Date"
                            name="License Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>Odometer Reading</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-file-text"
                          v-model="equipmentDetail.odometerReading"
                          class="w-full"
                          v-validate="'numeric'"
                          type="numeric"
                          name="Odometer Reading"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('Odometer Reading')">{{ errors.first('Odometer Reading') }}</span>
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-2">
                        <label>Odometer Reading Date</label>
                        <div id="datepick">
                          <flat-pickr
                            class="w-full"
                            v-model="equipmentDetail.odometerReadingDate"
                            :format="'YYYY-MM-DD'"
                            placeholder="Select Reading Date"
                            name="Reading Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>Owner</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-user"
                          placeholder="Owner"
                          v-model="equipmentDetail.owner"
                          class="w-full"
                          name="Owner"
                        />
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>Assigned Driver</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-user"
                          placeholder="Driver"
                          v-model="equipmentDetail.assignedDriver"
                          class="w-full"
                          name="Driver"
                        />
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>Burn Rate High</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-hash"
                          v-model="equipmentDetail.burnRateHigh"
                          class="w-full"
                          v-validate="'numeric'"
                          type="numeric"
                          name="Burn Rate High"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('Burn Rate High')">{{ errors.first('Burn Rate High') }}</span>
                      </div>
                    </div>
                    <div class="vx-row px-4 pb-3">
                      <div class="vx-col flex-1">
                        <label>Burn Rate Low</label>
                        <vs-input
                          icon-pack="feather"
                          icon="icon-hash"
                          v-model="equipmentDetail.burnRateLow"
                          class="w-full"
                          v-validate="'numeric'"
                          type="numeric"
                          name="Burn Rate Low"
                        />
                        <span class="text-danger text-sm" v-show="errors.has('Burn Rate Low')">{{ errors.first('Burn Rate Low') }}</span>
                      </div>
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
            <vs-button class="rounded-lg mr-2" color="warning"  @click="GetGrid()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success"  @click="addVue"  icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
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
          <template slot-scope="{ data }">
            <vs-tr>
              <vs-td>
                <vs-input
                  v-model="eqp24Registration"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24Description"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24Tag"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24Measurement"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24Rebate"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24MaxLitre"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24Consumption"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24CostCentre"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="eqp24MasterGroup"
                  class="w-full"
                />
              </vs-td>
              <vs-td></vs-td>
            </vs-tr>
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
              <vs-td class="whitespace-no-wrap" id="iconContainer">
                <vx-tooltip class="flex" text="Edit Equipment">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDataSidebar(tr)"
                  />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Equipment">
                  <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2"
                    @click.stop="deleteGrid(tr)"
                  />
                </vx-tooltip>
                
              </vs-td>
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
        
        eqp24Registration: "",
        eqp24Description: "",
        eqp24Tag: "",
        eqp24Measurement: "",
        eqp24Rebate: "",
        eqp24MaxLitre: "",
        eqp24Consumption: "",
        eqp24CostCentre: "",
        eqp24MasterGroup: "",
        original24List: [],



     // allocationSelect: { id: 0, name: 'Search / Select Allocation' },
      allocationSelect: { value: 0, label: 'Search / Select Allocation' },
      allocationData:[],

      itemsPerPage: 10,
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
        maxLitres :0,
        consumption:1,
        enable:true
      },

       
        statusPromptActive: false,
        statusPromptActiveAllocation: false,
        manaulselect:0,

        
        equipmentDetail:{
          vin: "", 
          engineNumber: "", 
          seriesName: "", 
          licenseTypeId: 0, 
          license: "", 
          licenseExpiryDate: "", 
          serviceInterval: "", 
          serviceDate: "", 
          odometerReading: "", 
          odometerReadingDate: "", 
          owner: "", 
          assignedDriver: "", 
          burnRateHigh: "", 
          burnRateLow: "",
        },
        showMore: false,
        licenseTypeData: [],
        licenseTypeSelect: { value: 0, label: 'Search / Select License Type' },
        
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
    },
  },
  
  watch: {
    name(val) {
      this.name = val.replace(/\W/g, "");
    },
    eqp24Registration(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.registration.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24Description(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24Tag(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24Measurement(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.equipmentMeasurementName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24Rebate(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.equipmentRebateName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24MaxLitre(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.maxLitres.toLowerCase().indexOf(val.toLowerCase()) > -1;0
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24Consumption(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.consumption.toLowerCase().indexOf(val.toLowerCase()) > -1;0
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24CostCentre(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.ec.costCentreName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
    eqp24MasterGroup(val){
      var self = this;
      
      if(val != ""){
        self.famsdata = self.original24List.filter(item => {
          return item.em.masterGroupName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else{
        self.famsdata = self.original24List;
      }
    },
  },
  mounted() {
    this.GetGrid();
    this.GetDropdownLicenseType();
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
nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        if(e.which === 32){}
        else e.preventDefault();
      }
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
          
          self.formDataEqp.Id = 0;
          self.formDataEqp.accountId=localStorage.getItem('userAccountId');
          self.formDataEqp.name='';
          self.formDataEqp.registration='';
          self.formDataEqp.equipmentMeasurementId = 1;
          self.formDataEqp.equipmentMeasurement='';
          self.formDataEqp.tag='0000000000';
          self.formDataEqp.maxLitres = 0;
          self.formDataEqp.enable = 1;
          self.formDataEqp.consumption = 0;
          self.formDataEqp.equipmentRebateId = 0;
          self.formDataEqp.equipmentRebate = '';
          self.formDataEqp.CID =0;
          self.formDataEqp.CCName ='';
          self.formDataEqp.MEName='';
          self.formDataEqp.MEID=0;
          self.formDataEqp.equipmentTypeId=0;
          self.formDataEqp.equipmentType='';
          self.formDataEqp.maxLitres =100;
          self.formDataEqp.consumption =1;
          self.formDataEqp.enable=true;

          self.equipmentDetail.vin = "";
          self.equipmentDetail.engineNumber = "";
          self.equipmentDetail.seriesName = "";
          self.equipmentDetail.licenseTypeId = 0;
          self.equipmentDetail.license = "";
          self.equipmentDetail.serviceInterval = 0;
          self.equipmentDetail.odometerReading = 0;
          self.equipmentDetail.owner = "";
          self.equipmentDetail.assignedDriver = "";
          self.equipmentDetail.burnRateHigh = 0;
          self.equipmentDetail.burnRateLow = 0;

          var date = new Date();
          self.equipmentDetail.licenseExpiryDate = new Date( date.getFullYear(), date.getMonth(), date.getDate());
          self.equipmentDetail.serviceDate = new Date( date.getFullYear(), date.getMonth(), date.getDate());
          self.equipmentDetail.odometerReadingDate = new Date( date.getFullYear(), date.getMonth(), date.getDate());
          

          self.EquipmentMeasurementSelect=0,
          self.equipmentTypeSelect=0,
          self.masterequipmentSelect=0,
          self.costcentreSelect=0,
          self.equipmentRebateSelect=0,
          self.dropdownSelect =0,
          self.allocationSelect=0,
          self.selected=0
         
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
          myobject.vin = self.equipmentDetail.vin;
          myobject.engineNumber = self.equipmentDetail.engineNumber;
          myobject.seriesName = self.equipmentDetail.seriesName;
          myobject.licenseTypeId = self.equipmentDetail.licenseTypeId;
          myobject.license = self.equipmentDetail.license;
          myobject.licenseExpiryDate = self.equipmentDetail.licenseExpiryDate;
          myobject.serviceInterval = self.equipmentDetail.serviceInterval;
          myobject.serviceDate = self.equipmentDetail.serviceDate;
          myobject.odometerReading = self.equipmentDetail.odometerReading;
          myobject.odometerReadingDate = self.equipmentDetail.odometerReadingDate;
          myobject.owner = self.equipmentDetail.owner;
          myobject.assignedDriver = self.equipmentDetail.assignedDriver;
          myobject.burnRateHigh = self.equipmentDetail.burnRateHigh;
          myobject.burnRateLow = self.equipmentDetail.burnRateLow;
          
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
        "Equipments/" + data.Id,
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
        self.original24List = response.data;
        if(self.eqp24Registration != "" && self.eqp24Registration != null && self.eqp24Registration != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.registration.toLowerCase().indexOf(self.eqp24Registration.toLowerCase()) > -1;
          });
        }
        else if(self.eqp24Description != "" && self.eqp24Description != null && self.eqp24Description != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.name.toLowerCase().indexOf(self.eqp24Description.toLowerCase()) > -1;
          });
        }
        else if(self.eqp24Tag != "" && self.eqp24Tag != null && self.eqp24Tag != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.tag.toLowerCase().indexOf(self.eqp24Tag.toLowerCase()) > -1;
          });
        }
        else if(self.eqp24Measurement != "" && self.eqp24Measurement != null && self.eqp24Measurement != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.equipmentMeasurementName.toLowerCase().indexOf(self.eqp24Measurement.toLowerCase()) > -1;
          });
        }
        else if(self.eqp24Rebate != "" && self.eqp24Rebate != null && self.eqp24Rebate != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.equipmentRebateName.toLowerCase().indexOf(self.eqp24Rebate.toLowerCase()) > -1;
          });
        }
        else if(self.eqp24MaxLitre != "" && self.eqp24MaxLitre != null && self.eqp24MaxLitre != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.maxLitres.toLowerCase().indexOf(self.eqp24MaxLitre.toLowerCase()) > -1;
          });
        }
        else if(self.eqp24Consumption != "" && self.eqp24Consumption != null && self.eqp24Consumption != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.consumption.toLowerCase().indexOf(self.eqp24Consumption.toLowerCase()) > -1;
          });
        }
        else if(self.eqp24CostCentre != "" && self.eqp24CostCentre != null && self.eqp24CostCentre != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.ec.costCentreName.toLowerCase().indexOf(self.eqp24Consumption.toLowerCase()) > -1;
          });
        }
        else if(self.eqpMasterGroup != "" && self.eqpMasterGroup != null && self.eqpMasterGroup != undefined){
          self.famsdata = self.original24List.filter(item => {
            return item.em.masterGroupName.toLowerCase().indexOf(self.eqpMasterGroup.toLowerCase()) > -1;
          });
        }
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
    GetDropdownLicenseType() { 
          const self = this;
          var onSuccess = function(response) {
              self.licenseTypeData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.submit.$el);
          };
          self.$ajaxGet(
            self,
            "Equipments/GetLicenseTypeDropDown",
            onSuccess,
            onFinally
          );    
        },

        populateDataLicenseType() {
        var self = this;
        if (self.licenseTypeSelect) {
          self.equipmentDetail.licenseTypeId = self.licenseTypeSelect.value;
        }
      },
  
    moreDetail(){
      this.showMore = true;
    },
    lessDetail(){
      this.showMore = false;
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

  #iconContainer span{
    display: flex;
    justify-content: space-evenly;
  }
</style>

