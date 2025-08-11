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
    <operator-sidebar
      :isSidebarActive="operatorSidebar"
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
                            <vs-input maxlength="18" label="Employee (Alfanumeric Only with Spaces and Underscores('_'))" @keydown="nameKeydown($event)" v-model="formData.name" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input label="Description"  v-model="formData.description" class="w-full" />
                        </div>
                    </div>
                </tab-content>

                
                  <!-- tab 4 content -->
                <tab-content title="Step 2" class="mb-5" icon="feather icon-save">
                      <!-- <vx-card class="mt-base" no-shadow card-border> -->
                        <div class="vx-row"> 
                          <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input maxlength="18" label="Employee's FAMS Tag" @keydown="nameKeydown($event)" v-model="formData.tag" class="w-full" />
                          </div>  
                          <div class="vx-col md:w-1/2 w-full mt-5">
                            <label class="w-full" size="small">Employee Type </label>
                            <v-select class="w-full"  placeholder="Search / Select Employee Type"  :options="operatorTypeData"  
                              v-model="operatorTypeSelect"  @search:blur="populateDataOperatorType"    name ="Search / Select Employee Type" />
                          </div>                          
                        </div>
                        <br>
                          <div>
                            <vs-button v-show="!showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:43%;"  @click="moreDetail"  icon-pack="feather" icon="icon-edit">More Detail</vs-button>
                            <vs-button v-show="showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:43%;" @click="lessDetail"  icon-pack="feather" icon="icon-edit">Less Detail</vs-button>
                          </div>
                          <br>
                          <div v-show="showMore">
                            <div class="vx-row px-4 pb-3">
                              <div class="vx-col flex-1">
                                <label>Id Number</label>
                                <vs-input
                                  icon-pack="feather"
                                  icon="icon-phone"
                                  placeholder="Id Number"
                                  v-validate="'numeric'"
                                  v-model="formData.operatorDetail.idNumber"
                                  class="w-full"
                                  name="IdNum"
                                />
                              </div>
                              <div class="vx-col flex-1">
                                <label>Cellphone Number</label>
                                <vs-input
                                  icon-pack="feather"
                                  icon="icon-phone"
                                  v-validate="'digits:10'" 
                                  type="numeric"
                                  name="Cell Number"
                                  placeholder="Cellphone Number"
                                  v-model="formData.operatorDetail.cellphoneNr"
                                  class="w-full"
                                />
                              </div>
                              <div class="vx-col flex-4">
                                <label>Email Address</label>
                                <vs-input
                                  icon-pack="feather"
                                  icon="icon-at-sign"
                                  placeholder="Email Address"
                                  v-model="formData.operatorDetail.email"
                                  class="w-full"
                                  v-validate="'email'"
                                  name="Email"
                                />
                              </div>
                            </div>
                            <div class="vx-row px-4 pb-3">
                              <div class="vx-col flex-1">
                                <label>Residential Address</label>
                                <vs-input
                                  icon-pack="feather"
                                  icon="icon-map-pin"
                                  placeholder="Residential Address"
                                  v-model="formData.operatorDetail.residentialAddress"
                                  class="w-full"
                                  name="ResidentAddress"
                                />
                              </div>
                            </div>
                            <div class="vx-row px-4 pb-3">
                              <div class="vx-col flex-1">
                                <label>Postal Address</label>
                                <vs-input
                                  icon-pack="feather"
                                  icon="icon-map-pin"
                                  placeholder="Postal Address"
                                  v-model="formData.operatorDetail.postalAddress"
                                  :disabled="resandpostal"
                                  class="w-full"
                                  name="PostalAddress"
                                />
                              </div>
                            </div>
                            <div class="vx-row px-4 pb-3">
                              <div class="vx-col flex-4">
                                <label> Postal Address same as Residential Address? (Yes / No)</label>
                                <vs-switch class="rounded-pill" v-model="resandpostal" />
                              </div>
                            </div>
                            <div class="vx-row px-4 pb-3">
                              <div class="vx-col flex-4">
                                <label>PDP (Yes / No)</label>
                                <vs-switch class="rounded-pill" v-model="formData.operatorDetail.pdp" />
                              </div>
                              <div class="vx-col flex-4" v-show="formData.operatorDetail.pdp">
                                <label>PDP Expire Date</label>
                                <div id="datepick">
                                  <flat-pickr
                                    class="w-full"
                                    v-model="formData.operatorDetail.PdpexpiryDate"
                                    :format="'YYYY-MM-DD'"
                                    placeholder="Select Expiration Date"
                                    name="Date"
                                  />
                                </div>
                              </div>
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
          :data="operatorData"
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
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ operatorData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : operatorData.length }} of {{ operatorData.length }}</span>
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
            <vs-th sort-key="Tag">Tag</vs-th>
            <vs-th sort-key="Operator">Employee</vs-th>
            <vs-th sort-key="Type">Type</vs-th>
            <vs-th sort-key="Description">Description</vs-th>    
            <vs-th sort-key="Active">Active</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr>
              <vs-td>
                <vs-input
                  v-model="opr24Tag"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="oprEmployee"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="oprType"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="oprDescription"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <!-- <vs-input
                  v-model="oprActive"
                  class="w-full"
                /> -->
              </vs-td>
              <vs-td></vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.tag">{{tr.tag}}</vs-td>
              <vs-td :data="tr.operator">{{tr.operator}}</vs-td>
              <vs-td :data="tr.operatorType">{{tr.operatorType}}</vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
              <vs-td :data="tr.enable">{{tr.enable}}</vs-td>
              <vs-td class="whitespace-no-wrap" id="iconContainer" >
                <vx-tooltip class="flex" text="Edit Employee">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDataSidebar(tr)"
                  />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Employee">
                  <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    
                    @click.stop="deleteGrid(tr)"
                  />
                </vx-tooltip>
                
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <!-- <vs-prompt
    ref="statusPromptActive"
    title="Add Employee to FAMS Store"
    acceptText="Submit"
    cancelText="Cancel"
    @cancel="dropdownSelectStore=0"
    @accept="addEmployeeStore"
    :active.sync="statusPromptActive">
    <div class="vx-row">
        <div class="vx-col sm:w-1/8 w-full mb-2">  
            <vs-input class="w-full" label-placeholder="Employee" disabled  v-model="Employee"
            name ="Employee" />
        </div> 
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">            
                        <label>FAMS Store</label>  
                        <v-select
                                :options="storedropdownValue"
                                placeholder="Search / Select Store"
                                v-model="dropdownSelectStore"
                                @search:blur="populateDataStore"   
                        />   
        </div>
      <br>
      <div class="vx-col sm:w-1/8 w-full mb-2"> 
              <label>Download to Store</label>
              <vs-switch class="rounded-pill" v-model="Storedownload">
                <span slot="on">Yes</span>
                <span slot="off">No</span>
              </vs-switch>
      </div>
    </div>
  </vs-prompt> -->

  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import operatorSidebar from "./OperatorSidebar.vue";
export default {
  data() {
    return {

      title:'FAMS - new Employee Wizard!!',
      subtitle:'Please complete each tab to add new Employee (fuel attendant /driver)',

      statusPromptActive: false,
      dropdownSelectStore:[],
      storedropdownValue:[],
      storeId:0,
      Storedownload:0,
      Store:"",
      EmployeeId :0,

      showMore: false,
      resandpostal: false,
      
      Employee:"",

      operatorTypeSelect: { value: 0, label: 'Search / Select Employee Type' },
      operatorTypeData:[],

      isListHidden: false,   
      isInfoHidden: true,

      itemsPerPage: 10,
      operatorSidebar: false,
      selected: [],
      operatorData: [],
      sidebarData: {},
      isMounted: false,
      formData: {
        id:0,
        accountId:localStorage.getItem('userAccountId'),
        operatorTypeId:0,
        operatorType: "",
        name:"",
        enable:true,
        description:"",
        account:"",       
        tag  :"0000000000",
        operatorDetail:{
          PdpexpiryDate :"",
          email :"",
          pdp :false,
          residentialAddress :"",
          idNumber :"",
          cellphoneNr :"",
          postalAddress :"" 
        },
      },
      opr24Tag: "",
      oprEmployee: "",
      oprType: "",
      oprDescription: "",
      oprActive: "",
      originalOperatorData: [],
    };
  },
  components: {
    flatPickr,
    operatorSidebar,
    "v-select": vSelect,
    FormWizard,
    TabContent
  },
  
  watch: {
    name(val) {
      this.name = val.replace(/\W/g, "");
    },
    opr24Tag(val){
      var self = this;
      
      if(val != ""){
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else{
        self.operatorData = self.originalOperatorData;
      }
    },
    oprEmployee(val){
      var self = this;
      
      if(val != ""){
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.operator.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else{
        self.operatorData = self.originalOperatorData;
      }
    },
    oprType(val){
      var self = this;
      
      if(val != ""){
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.operatorType.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else{
        self.operatorData = self.originalOperatorData;
      }
    },
    oprDescription(val){
      var self = this;
      
      if(val != ""){
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else{
        self.operatorData = self.originalOperatorData;
      }
    },
    // oprActive(val){
    //   var self = this;
    //   
    //   if(val != ""){
    //     self.operatorData = self.originalOperatorData.filter(item => {
    //       return item.enable.toLowerCase().indexOf(val.toLowerCase()) > -1;
    //     });
    //     return self.operatorData;
    //   }
    //   else{
    //     self.operatorData = self.originalOperatorData;
    //   }
    // },
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  mounted() {
    this.GetGrid();
    this.LoadStoreDropdown();
    this.isMounted = true;
  },
  methods: {
    
    nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        if(e.which === 32){}
        else e.preventDefault();
      }
    },
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
    addDataSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editDataSidebar(data) {
      data.accountId = 12
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    //********************* Event functions */
    populateDataOperatorType() {
        var self = this;
        if (self.operatorTypeSelect) {
            self.formData.operatorTypeId = self.operatorTypeSelect.value;
            self.formData.operatorType = self.operatorTypeSelect.label;
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
        this.isListHidden = true
        this.GetDropdownOperatorType();
        // this.$refs.wizard.navigateToTab(0)

    },
    populateDataStore() {
    var self = this;
      if (self.dropdownSelectStore) {
        self.StoreId = self.dropdownSelectStore.value;
        self.Store = self.dropdownSelectStore.label;
      }

    },
  
    PromptActiveOperatorToStore(data) {
        var self = this; 
        self.LoadStoreDropdown();
        self.EmployeeId = data.id;
        self.Employee = data.operator;
        self.Storedownload = 0;
        self.statusPromptActive = true;   
    },
    
    LoadStoreDropdown() {
        const self = this;
        var onSuccess = function(response) {
          self.storedropdownValue = response.data.map(function(item) {
            //return { text: item.customer, value: item.id };
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

  
    addEmployeeStore(){
        var self = this;
        if(self.Storedownload == true) self.Storedownload = 1
        else if(self.Storedownload == false) self.Storedownload = 0

        const obj = {
            id: 0,
            StoreId : self.StoreId,
            OperatorId: self.EmployeeId,
            Download: self.Storedownload
          };
        //self.showLoadingOnElement("gridTable3", 1, "radius");
        var onSuccess = function(response) {
          self.statusPromptActive = false;  
          self.GetGrid();
          self.successNotify();
        };
        var onFinally = function() {
          self.StoreId = 0
          self.Storedownload=0;
          self.dropdownSelectStore=0;         
        };
        self.$ajaxPost(
          self,
          "PerOperatorStores",
          obj,
          onSuccess,
          onFinally
        );
    },

    saveOperatorParameters(data)
    {
      var self = this;
      if(data.download == true) self.Storedownload = 1
      else if(data.download == false) self.Storedownload = 0

      const obj = {
        id: data.perOperatorStoreId,
        StoreId : data.storeId,
        OperatorId: data.operatorId,
        Download:  self.Storedownload
      };
      //self.showLoadingOnElement("gridTable3", 1, "radius");
      var onSuccess = function(response) {
        self.GetGrid();
        self.successNotify();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.StoreId = 0
        self.Storedownload=0;
        self.dropdownSelectStore=0; 
        
      };
      self.$ajaxPut(
        self,
        "PerOperatorStores/" + data.perOperatorStoreId,
        obj,
        onSuccess,
        onFinally
      );
    },
    deleteOperatorParameters(data)
    {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetGrid();
        self.successNotify();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
        "PerOperatorStores/" + data.perOperatorStoreId ,
        onSuccess,
        onFinally
      );
    },

    initValues() {
      var self = this;
      self.$refs.wizard.navigateToTab(0)
      self.formData.id=0,
      self.formData.accountId=localStorage.getItem('userAccountId'),
      self.formData.operatorTypeId=0,
      self.formData.operatorType= "None",
      self.formData.name="None",
      self.formData.enable=true,
      self.formData.description="None",     
      self.formData.tag  ="0000000000",
      self.operatorTypeSelect = { value: 0, label: 'Search / Select Operator Type' }
      
      self.formData.operatorDetail.PdpexpiryDate = "",
      self.formData.operatorDetail.email = "",
      self.formData.operatorDetail.pdp = false,
      self.formData.operatorDetail.residentialAddress = "",
      self.formData.operatorDetail.idNumber = "",
      self.formData.operatorDetail.cellphoneNr = "",
      self.formData.operatorDetail.postalAddress = ""    
    },
    //********************* SQL events */
    formSubmitted() {
      const self = this;
      self.$validator.validateAll().then((result) => {
        if (result){
          if(self.resandpostal){
            self.formData.operatorDetail.postalAddress = self.formData.operatorDetail.residentialAddress;
          }
          const obj = {
            id: 0,
            accountId:localStorage.getItem('userAccountId'),
            operatorTypeId : self.formData.operatorTypeId,
            name : self.formData.name,
            description : self.formData.description,
            tag : self.formData.tag,
            enable : self.formData.enable,
            operatorDetail : self.formData.operatorDetail
          };
          
          self.showLoadingOnElement("gridTable", 1, "radius");
          var onSuccess = function(response) {
            self.isListHidden = false,
            self.isInfoHidden = true;
            self.GetGrid();
            self.successNotify();
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
            self.cancelAdd();
          };
          self.$ajaxPost(
            self,
            "Operators",
            obj,
            onSuccess,
            onFinally
          );
        }
        else {
          self.FailedCustomNotify(self.$validator.errors.items[0].msg);
        }
      });
      self.$validator.reset();
    },
  
    updateGrid(data) {
      const self = this;
      self.$validator.reset();
      self.$validator.validateAll().then((result) => {
        if (result){
          self.showLoadingOnElement("gridTable", 1, "radius");
          var onSuccess = function(response) {
            self.GetGrid();
            self.successNotify();
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxPut(
            self,
            `Operators/${data.id}`,
            data,
            data.id,
            onSuccess,
            onFinally
          );
        }
        else {
          self.FailedCustomNotify(self.$validator.errors.items[0].msg);
          self.$vs.loading.close(self.$refs.saveButton.$el);
        }
      });
      self.$validator.reset();
      
    },
    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.GetGrid();
        self.successNotify();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
        "Operators/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        
        self.operatorData = response.data;
        self.originalOperatorData = response.data;        
        
        if(self.opr24Tag !=""){
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.tag.toLowerCase().indexOf(self.opr24Tag.toLowerCase()) > -1;
          });
        }
        else if(self.oprEmployee != ""){
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.operator.toLowerCase().indexOf(self.oprEmployee.toLowerCase()) > -1;
          });
        }
        else if(self.oprType){
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.operatorType.toLowerCase().indexOf(self.oprType.toLowerCase()) > -1;
          });
        }
        else if(self.oprDescription != ""){
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.description.toLowerCase().indexOf(self.oprDescription.toLowerCase()) > -1;
          });
        }
        
        self.successNotify();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Operators/GetOperator",
        onSuccess,
        onFinally
      );
    },
    GetDropdownOperatorType() { 
          const self = this;
          var onSuccess = function(response) {
              self.operatorTypeData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxGet(
            self,
            "OperatorTypes/GetOperatorTypedropdown",
            onSuccess,
            onFinally
          );    
        },
    toggleDataSidebar(val = false) {
      this.operatorSidebar = val;
    },
    moreDetail(){
      this.showMore = true;
    },
    lessDetail(){
      this.showMore = false;
    },
    
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
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