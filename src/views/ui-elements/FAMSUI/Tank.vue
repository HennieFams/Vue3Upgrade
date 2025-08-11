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
    <tank-sidebar
      :isSidebarActive="tankSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @update="updateGrid"
    />
       <vx-card ref="MainCard2" v-show="!isInfoHidden">
        <div class="mt-5">
          <div class="vx-row">
              <div class="vx-col md:w-1/6 w-full">
                    <vs-button  color="warning" type="border" class="rounded-lg mb-2"  @click="cancelAdd">Return</vs-button>
               </div>
                <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="initValues">Restart</vs-button>
               </div>
          </div>
           
            <form-wizard  ref="wizard" color="rgba(var(--vs-primary), 1)"  errorColor="rgba(var(--vs-danger), 1)" :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="formSubmitted">  
                <tab-content title="Step 1" class="mb-5" icon="feather icon-home" >
                    <!-- tab 1 content -->
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <label>FAMS Store</label>  
                              <v-select
                                    :options="dropdownStoreData"
                                    placeholder="Search / Select Store"
                                    v-model="dropdownStoreSelect" 
                                    @search:blur="populateStoreData"   
                              />   
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <label>FAMS Product</label>  
                              <v-select
                                    :options="dropdownProductData"
                                    placeholder="Search / Select Product"
                                    v-model="dropdownProductSelect" 
                                    @search:blur="populateproductData"   
                              />   
                        </div>

                          <div class="vx-col md:w-1/2 w-full mt-5">
                           <label>FAMS Sensor Type</label>  
                          <v-select
                                  :options="dropdownSensorTypeData"
                                  placeholder="Search / Select Sensor"
                                  v-model="dropdownSensorTypeSelect"
                                  @search:blur="populateSensorTypeData"   
                            />         
                        </div>


                        <div class="vx-col md:w-1/2 w-full mt-5">
                              <vs-input label="Tank Name"  v-model="formData.tankName" class="w-full" />
                        </div>
                        
                          <div class="vx-col md:w-1/2 w-1/2 mt-5" v-show="showSpares">
                            <vs-input label="Spare 1 (UID)"  v-model="formData.spare1" class="w-full" />
                          </div>
                          <div class="vx-col md:w-1/2 w-1/2 mt-5" v-show="showSpares">
                            <vs-input label="Spare 2 (IMEI)"  v-model="formData.spare2" class="w-full" />
                          </div>
                        <div class="vx-col md:w-1/2 w-full md:mt-8">
                            <div class="demo-alignment">
                                <span>Tank Active (No | Yes):</span>
                                <div class="flex">
                                  <vs-switch class="rounded-pill" color="success" v-model="formData.enable"></vs-switch>
                                </div>
                            </div>
                        </div>

                        <div class="vx-col md:w-1/2 w-full mt-5" v-show="showSpares">
                            <label>Interval (Minutes)</label>
                            <vs-input-number class="num-input_transparent" :min="0" v-model="formData.interval"/>
                        </div>

                    </div>
                </tab-content>

                
                  <!-- tab 4 content -->
                <tab-content title="Step 2" class="mb-5" icon="feather icon-save">
                      <!-- <vx-card class="mt-base" no-shadow card-border> -->
                     <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mt-5">
                          <vs-input label="Tank Calculation"  v-model="formData.math" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                          <vs-input label="Sensor Serial Number"  v-model="formData.sensorSn" class="w-full" />
                        </div>
                         <div class="vx-col md:w-1/2 w-full mt-5">
                                  <label>Tank Capacity</label>
                                  <vs-input-number class="num-input_transparent" :min="250" :max="9999999999" v-model="formData.capacity"/>
                          </div>
                         <div class="vx-col md:w-1/2 w-full mt-5">
                                  <label>Tank Nr/Index</label>
                                  <vs-input-number class="num-input_transparent" :min="1" :max="16" v-model="formData.nr"/>
                          </div>
                      </div>
                </tab-content>
            </form-wizard>
              
        </div> 
    </vx-card>
    <vx-card ref="MainCard"  v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="tankData"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addVue"  icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ tankData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : tankData.length }} of {{ tankData.length }}</span>
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
            <vs-th sort-key="Store">FAMS Store</vs-th>
            <vs-th sort-key="name">TankName</vs-th>
            <vs-th sort-key="product">Product</vs-th>
            <vs-th sort-key="capacity">Capacity</vs-th>    
            <vs-th sort-key="Calc">Calc</vs-th>
            <vs-th sort-key="TankNr">TankNr</vs-th>
            <vs-th sort-key="tankSensor">TankSensor</vs-th>
            <vs-th sort-key="sensorSn">SensorSn</vs-th>            
            <vs-th sort-key="enable">Active</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.store">{{tr.store}}</vs-td>
              <vs-td :data="tr.tankName">{{tr.tankName}}</vs-td>
              <vs-td :data="tr.product">{{tr.product}}</vs-td>
              <vs-td :data="tr.capacity">{{tr.capacity}}</vs-td> 
              <vs-td :data="tr.math">{{tr.math}}</vs-td>
              <vs-td :data="tr.nr">{{tr.nr}}</vs-td>
              <vs-td :data="tr.tankSensorType">{{tr.tankSensorType}}</vs-td>
              <vs-td :data="tr.sensorSn">{{tr.sensorSn}}</vs-td>
              <vs-td :data="tr.enable">{{tr.enable}}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Tank Info">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editDataSidebar(tr)"
                />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Tank">
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
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import tankSidebar from "./TankSidebar.vue";
export default {
  data() {
    return {

      title:'FAMS - new Tank Wizard!!',
      subtitle:'Please complete each tab to add new Tank',

      dropdownStoreData:[],
      dropdownStoreSelect:[],
      dropdownProductData:[],
      dropdownProductSelect:[],

      dropdownSensorTypeData:[],
      dropdownSensorTypeSelect: [],

      isListHidden: false,   
      isInfoHidden: true,

      itemsPerPage: 10,
      tankSidebar: false,
      selected: [],
      tankData: [],
      sidebarData: {},
      isMounted: false,
      formData: {
          tankId:0,
          accountId:localStorage.getItem('userAccountId'),
          storeId:0,
          store:"",
          productId:0,
          product:"",
          tankId:0,
          tankName:"new Tank",
          capacity:23000,
          nr:1,
          math:"+ 0",
          enable:true,
          sensorSn:"0000",
          tanksensortypeId: "0",
          tanksensortype:"",
          spare1: "",
          spare2: "",
          interval: 0,
        },
      showSpares: false,
    };
  },
  components: {
    flatPickr,
    tankSidebar,
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
    //********************* Event functions */
     populateStoreData() {
      var self = this;
      if (self.dropdownStoreSelect) {
          self.formData.storeId = self.dropdownStoreSelect.value;
          self.formData.store = self.dropdownStoreSelect.label;
        }
      },
     
      populateSensorTypeData() {
      var self = this;
      if (self.dropdownSensorTypeSelect) {
          self.formData.tanksensortypeId = self.dropdownSensorTypeSelect.value;
          self.formData.tanksensortype = self.dropdownSensorTypeSelect.label;
          
          if(self.dropdownSensorTypeSelect.value == 6){
            self.showSpares = true;
          }
          else{
            self.showSpares = false;
          }
        }
      },

      populateproductData() {
      var self = this;
      if (self.dropdownProductSelect) {
          self.formData.productId = self.dropdownProductSelect.value;
          self.formData.product = self.dropdownProductSelect.label;
        }
      },

     cancelAdd() {
        this.isListHidden = false,
        this.isInfoHidden = true;
        this.initValues();
        this.GetGrid();
    },
   addVue() {
        this.initValues();
        this.isInfoHidden = false;
        this.isListHidden = true;
        
        this.showSpares = false;
        this.GetStoreDropdown();
        this.GetProductDropdown();
        this.GetSensorTypeDropdown();
        // this.$refs.wizard.navigateToTab(0)

    },

     initValues() {
          var self = this;
          self.$refs.wizard.navigateToTab(0);
            
          self.formData.tankId=0;
          self.formData.accountId=localStorage.getItem('userAccountId');
          self.formData.storeId=0;
          self.formData.store="";
          self.formData.productId=0;
          self.formData.product="";
          self.formData.tankId=0;
          self.formData.tankName="new Tank";
          
          self.formData.capacity=23000;
          self.formData.nr=1;
          self.formData.math="+ 0";
          self.formData.enable=true;
          self.formData.sensorSn="0000";
          self.dropdownProductSelect = 0;
          self.dropdownSensorTypeSelect = 0;
          self.dropdownStoreSelect = 0;
          self.formData.tanksensortypeId  = 0;

     },
    //********************* SQL events */
    formSubmitted() {
          var self = this;
          var myobject={};
          myobject.Id = 0;
          myobject.accountId =localStorage.getItem('userAccountId');
          myobject.storeId=self.formData.storeId;
          myobject.productId=self.formData.productId;
          myobject.tankName=self.formData.tankName;
          myobject.capacity =self.formData.capacity;
          myobject.nr =self.formData.nr;
          myobject.math =self.formData.math;
          myobject.enable =self.formData.enable;
          myobject.sensorSn =self.formData.sensorSn;
          myobject.tankSensorTypeId = self.formData.tanksensortypeId;
          myobject.spare1 = self.formData.spare1;
          myobject.spare2 = self.formData.spare2;
          myobject.interval = self.formData.interval;

          self.showLoadingOnElement("gridTable", 1, "radius");
              var onSuccess = function(response) {
                self.isListHidden = false;
                self.isInfoHidden = true;
                self.showSpares = false;
                self.initValues();
                self.GetGrid();
                //self.GetGrid();
              };
              var onFinally = function() {
                self.$vs.loading.close(self.$refs.gridTable.$el);
                self.successNotify(); 
              };
             self.$ajaxPost(
                self,
                "Tanks",
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
         self.successNotify();
      };
      self.$ajaxPut(
        self,
        "Tanks/" + data.Id,
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
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "Tanks/" + data.tankId,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.tankData = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Tanks/GetTank",
        onSuccess,
        onFinally
      );
    },

     GetSensorTypeDropdown() {
        const self = this;
        var onSuccess = function(response) {
          self.dropdownSensorTypeData = response.data.map(function(item) {
            return { label: item.name, value: item.id};
            
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "Products/GetTankSensorType",
          onSuccess,
          onFinally
        );
    },


    GetProductDropdown() { 
        const self = this;
        var onSuccess = function(response) {
          self.dropdownProductData = response.data.map(function(item) {
            return { label: item.name, value: item.id };
            
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "Products",
          onSuccess,
          onFinally
        );
    },

    GetStoreDropdown() {
        const self = this;
        var onSuccess = function(response) {
          self.dropdownStoreData = response.data.map(function(item) {
            return { label: item.name, value: item.id };
            
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
           "Stores/GetStoredropdown",
          onSuccess,
          onFinally
        );
    },

    toggleDataSidebar(val = false) {
      this.tankSidebar = val;
    },
  }
};
     
</script>
<style>

#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>