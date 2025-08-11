<template>
  <div>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          pagination
          :max-items="itemsPerPage"
          search
          :data="businessRules"
          class="vs-con-loading__container"
        >
          <div
            slot="header"
            class="flex flex-wrap-reverse items-center flex-grow"
          >
            <vs-button
              class=" rounded-lg mr-2"
              color="warning"
              type="filled"
              @click="getBusinessRules"
              icon-pack="feather"
              icon="icon-refresh-ccw"
              >Reload</vs-button
            >
            <vs-button
              class="rounded-lg mr-2"
              color="success"
              type="filled"
              @click="showAddCard"
              icon-pack="feather"
              icon="icon-plus-square"
              >Add New</vs-button
            >
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span class="mr-2"
                  >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                  {{
                    businessRules.length - currentPage * itemsPerPage > 0
                      ? currentPage * itemsPerPage
                      : businessRules.length
                  }}
                  of {{ businessRules.length }}</span
                >
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <vs-dropdown-menu>
                <vs-dropdown-item @click="totalRows(10)">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="totalRows(20)">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="totalRows(50)">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="totalRows(100)">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <template slot="thead">
            <vs-th sort-key="Name">Business Rule</vs-th>
            <vs-th sort-key="f24Type">Business Rls Verify/Type</vs-th>
            <vs-th sort-key="Tag">Tag</vs-th>
            <vs-th sort-key="Code">Code</vs-th>
            <vs-th sort-key="f24ControlType">Fuel Control</vs-th>
            
            <vs-th sort-key="maxLitres1">Fuel Limit</vs-th>
            <vs-th sort-key="Action">Action</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr>
              <vs-td>
                <vs-input
                  v-model="b24BusinessRule"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="b24BusinessRlsType"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="b24Tag"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="b24Code"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="b24FuelControl"
                  class="w-full"
                />
              </vs-td>
              <vs-td>
                <vs-input
                  v-model="b24FuelLimit"
                  class="w-full"
                />
              </vs-td>
              <vs-td></vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.f24Type">{{ tr.f24Type }}</vs-td>
              <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
              <vs-td :data="tr.code">{{ tr.code }}</vs-td>
              <vs-td :data="tr.f24ControlType">{{ tr.f24ControlType }}</vs-td>
              <vs-td :data="tr.maxLitres1">{{ tr.maxLitres1 }}</vs-td>
              <!-- <vs-td :data="tr.createdDate">{{
                formatDate(tr.createdDate)
              }}</vs-td> -->
                <vs-td class="whitespace-no-wrap" id="iconContainer" >
                  <vx-tooltip class="flex" text="Edit Business Rule">
                    <feather-icon
                      icon="EditIcon"
                      ref="edit"
                      svgClasses="w-5 h-5 hover:text-success stroke-current"
                      @click.stop="handelSelected(tr)"
                    />
                  </vx-tooltip>
                  <vx-tooltip class="flex" text="Delete Business Rule">
                    <feather-icon
                      icon="TrashIcon"
                      svgClasses="w-5 h-5 hover:text-danger stroke-current"
                      class="ml-2"
                      @click="deleteBusinessRule(tr)"
                    />
                  </vx-tooltip>
                  
                </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vx-card title="FAMS Business Rules Setup" v-show="isVisible">
       <vs-divider class="mb-6 pt-0"></vs-divider>
        <div class="vx-row">
          <vs-spacer></vs-spacer>

          <vs-button
            ref="saveButton"
            class="rounded-lg mr-2 vs-con-loading__container"
            color="success"
            type="filled"
            @click="saveBussinessRule"
            >Save</vs-button
          >
          <vs-button
            ref="cancelButton"
            class="rounded-lg mr-6 vs-con-loading__container"
            color="warning"
            type="filled"
            @click="hideAddCard"
            >Cancel</vs-button
          >

        </div>

      <div class="vx-row w-full mb-2">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Business Rule Name</label>
          <vs-input v-model="formData.name" class="w-full"  v-validate="'required'" name="Name"></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Name')">{{errors.first("Name")}}</span>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Business Rule Type / Activation</label>
          <v-select
            ref="f24types"
            class="w-full"
            placeholder="Select a Type"
            :options="f24TypesData"
            v-model="f24TypeDropDown"
            @search:blur="populateF24TypeData" 
          ></v-select>
          <!-- <label>Expiration Date</label>
          <div id="datepick">
            <flat-pickr
              class="w-full"
              :config="configdateTimePicker"
              v-model="formData.expiredate"
              :format="'YYYY-MM-DD HH:mm:ss'"
              placeholder="Select Expiration Date"
              name="Date"
            />
          </div> -->
        </div>
      </div>
      <div class="vx-row w-full mb-2">

       <div  v-show="!isInfoHiddenEmployee"
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
           <label>Employee</label>
          <v-select
            ref="employee"
            class="w-full"
            placeholder="Select an Employee"
            :options="operatorsData"
            v-model="operatorsDropDown"
            @search:blur="populateEmployeeData"  
          ></v-select>
        </div>

        <div  v-show="!isInfoHiddenEqp"
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
           <label>Equipment</label>
          <v-select
            ref="equipment"
            class="w-full"
            placeholder="Select an Equipment"
            :options="equipmentData"
            v-model="equipmentDropDown"
            @search:blur="populateEquipmentData"      
          ></v-select>
        </div>


        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Business rule - Tag (If applicable)</label>
          <vs-input v-model="formData.tag" class="w-full" v-validate="'required'" name="Tag"></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Tag')">{{errors.first("Tag")}}</span>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Business rule - ID/Code/Registration/Pin (If applicable)</label>
          <vs-input v-model="formData.code" class="w-full"  v-validate="'required'" name="Code"></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Code')">{{errors.first("Code")}}</span>
        </div>
      </div>
      <div class="vx-row w-full mb-2">
          <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Business Rule Control</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select Business Rule Control"
            :options="controlTypesData"
            v-model="controlTypeDropDown"
            @search:blur="populateFuelControlData" 
          ></v-select>
        </div>

         <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        
        >
          <label>Business Rule representation</label>
          <v-select
            ref="credittype"
            class="w-full"
            placeholder="Select a Business Rule representation"
            :options="creditTypesData"
            v-model="creditTypeDropDown"
          ></v-select>
        </div>
        <!-- <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>FAMS24 Type</label>
          <v-select
            ref="f24types"
            class="w-full"
            placeholder="Select a Type"
            :options="f24TypesData"
            v-model="f24TypeDropDown"
          ></v-select>
        </div> -->
      </div>
      <div class="vx-row w-full mb-2">


         <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
          v-show="!isInfoHiddenMaxLitre"
        >
            <label>Business Rule Amount (if applicable)</label>
            <vs-input v-model="formData.maxLitres1" class="w-full" v-validate="'numeric'" name="Max_Litres" autocomplete="off"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('Max_Litres')">{{errors.first("Max_Litres")}}</span>
        </div>

        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
           v-show="!isInfoHiddenIntegration"
        >
          <label>Require Integration</label>
          <v-select
            ref="Integration"
            class="w-full"
            placeholder="Select a Integration"
            :options="IntegrationData"
            v-model="integrationDropDown"
          ></v-select>
        </div>

        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Store (Not selected - Account wide else store specific)</label>
          <v-select
            ref="store"
            class="w-full"
            placeholder="Select a Store"
            :options="storesData"
            v-model="storeDropDown"
          ></v-select>
        </div>
        <!-- <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Account Credit Type</label>
          <v-select
            ref="credittype"
            class="w-full"
            placeholder="Select a Credit Type"
            :options="creditTypesData"
            v-model="creditTypeDropDown"
          ></v-select>
        </div> -->
      </div>


      <div class="vx-row w-full mb-2">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Registration</label>
          <v-select
            ref="registration"
            class="w-full"
            placeholder="Select a Registration"
            :options="requireTypeData"
            v-model="registrationDropDown"
          ></v-select>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Fuel Attendant</label>
          <v-select
            ref="driver"
            class="w-full"
            placeholder="Select a Fuel Attendant"
            :options="requireTypeData"
            v-model="operatorDropDown"
          ></v-select>
        </div>
      </div>
      <div class="vx-row w-full mb-2">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Driver</label>
          <v-select
            ref="attendant"
            class="w-full"
            placeholder="Select a Driver"
            :options="requireTypeData"
            v-model="driverDropDown"
          ></v-select>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Authentication</label>
          <v-select
            ref="authentication"
            class="w-full"
            placeholder="Select a Authentication"
            :options="requireTypeData"
            v-model="authenticationDropDown"
          ></v-select>
        </div>
      </div>
      <div class="vx-row w-full mb-2">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Allocation 1</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select a Require Allocation 1"
            :options="requireTypeData"
            v-model="allocation1DropDown"
          ></v-select>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Allocation 2</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select a Require Allocation 2"
            :options="requireTypeData"
            v-model="allocation2DropDown"
          ></v-select>
        </div>
      </div>
      <div class="vx-row w-full mb-2">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Allocation 3</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select a Require Allocation 3"
            :options="requireTypeData"
            v-model="allocation3DropDown"
          ></v-select>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Allocation 4</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select a Require Allocation 4"
            :options="requireTypeData"
            v-model="allocation4DropDown"
          ></v-select>
        </div>
      </div>
      <div class="vx-row w-full mb-2">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Description</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select a Require Description"
            :options="YesNoData"
            v-model="descriptionDropDown"
          ></v-select>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Km</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select a Require Km"
            :options="YesNoData"
            v-model="kmDropDown"
          ></v-select>
        </div>
      </div>
      <div class="vx-row w-full mb-2">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Require Hours</label>
          <v-select
            ref="controltype"
            class="w-full"
            placeholder="Select a Require Hours"
            :options="YesNoData"
            v-model="hoursDropDown"
          ></v-select>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Product (Pump Nr / Prd Nr)</label>
          <vs-input v-model="formData.product1" class="w-full" v-validate="'numeric'" name="Product" autocomplete="off"></vs-input>
          <span class="text-danger text-sm" v-show="errors.has('Product')">{{errors.first("Product")}}</span>
        </div>
      </div>
      <div class="vx-row w-full">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>Fillup Intervals - Not allowed (min)</label>
          <vs-input-number
            class="num-input_transparent"
            :min="0"
            v-model="formData.fillupIntervals"
          />
        </div>
      </div>
      <div class="vx-row pb-3 mb-2">
        <div class="vx-col">
          <vs-checkbox v-model="equipmentLicenseCheck">Equipment License  (Future)</vs-checkbox>
        </div>
      </div>      
      <div class="vx-row pb-3 mb-2">
        <div class="vx-col">
          <vs-checkbox class="mt-1 float-left" style="width: fit-content" v-model="driverLicenseCheck" >Driver License (Future)</vs-checkbox>
        </div>
      </div>
      <div class="vx-row">
        <vs-spacer />
        <div class="vx-col">
          <vs-button
            ref="saveButton"
            class="rounded-lg mr-2 vs-con-loading__container"
            color="success"
            type="filled"
            @click="saveBussinessRule"
            >Save</vs-button
          >
          <vs-button
            ref="cancelButton"
            class="rounded-lg mr-6 vs-con-loading__container"
            color="warning"
            type="filled"
            @click="hideAddCard"
            >Cancel</vs-button
          >
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Datepicker from "vuejs-datepicker";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import moment from "moment";
import { formatWithOptions } from 'util';
export default {
  data() {
    return {
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
      },
      isInfoHiddenIntegration : true,
      isInfoHiddenMaxLitre : true,
      isInfoHiddenEqp: true,
      isInfoHiddenEmployee:true,
      isInfoHiddenAccount:true,

      itemsPerPage: 10,

      isVisible: false,
      isListHidden: false,
      isMounted: false,
 
      driverLicenseCheck: false,
      equipmentLicenseCheck: false,

      
      businessRules: [],
      storesData: [],
      f24TypesData: [],
      controlTypesData: [],
      equipmentDataAll:[],
      equipmentData: [],
      operatorsData: [],
      operatorsDataAll: [],
      creditTypesData: [],
      requireTypeData: [],
      YesNoData: [],
      IntegrationData:[],
      authenticationDropDown: 0,
      storeDropDown: 0,
      f24TypeDropDown: 0,
      controlTypeDropDown: 0,
      // equipmentDropDown: 0,
      equipmentDropDown: { value: 0, label: "N/A" },
      operatorsDropDown: 0,
      creditTypeDropDown: 0,
      operatorDropDown: 0,
      driverDropDown: 0,
      perIntegrationAccountId :0,
      f24ValidationID:0,
      integrationDropDown:0,
      registrationDropDown: 0,
      allocation1DropDown: 0,
      allocation2DropDown: 0,
      allocation3DropDown: 0,
      allocation4DropDown: 0,
      allocation4DropDown: 0,
      allocation4DropDown: 0,
      allocation4DropDown: 0,
      allocation4DropDown: 0,
      hoursDropDown: 0,
      kmDropDown: 0,
      controlDropDown: 0,
      descriptionDropDown: 0,

      formData: {
        id: 0,
        accountId: 0,
        expiredate: "",
        f24key: "",
        storeId: "",
        name: "",
        tag: "N/A",
        code: "N/A",
        f24Id: "",
        f24controlTypeId: "",
        f24creditTypeId: 1,
        fillupIntervals: 0,
        driverLicense: 0,
        equipmentLicense: 0,
        requireReg: "",
        requireDriver: "",
        requireAttendant: "",
        requireAuthentication: "",
        requireDesc: "",
        requireKm: "",
        requireHours: "",
        requireAllocation1: "",
        requireAllocation2: "",
        requireAllocation3: "",
        requireAllocation4: "",
        product1: "1",
        maxLitres1: 0,
        interfaceId : 1,
        perIntegrationAccountId :0,
        f24ValidationID:0,
      },
      b24BusinessRule: "",
      b24BusinessRlsType: "",
      b24Tag: "",
      b24Code: "",
      b24FuelControl: "",
      b24FuelLimit: "",
      originalBusinessRules: [],
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    FormWizard,
  },
  watch:{
    b24BusinessRule(val){
      var self = this;
      
      if(val != ""){
        self.businessRules = self.originalBusinessRules.filter(item => {
          return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.businessRules;
      }
      else{
        self.businessRules = self.originalBusinessRules;
      }
    },
    b24BusinessRlsType(val){
      var self = this;
      
      if(val != ""){
        self.businessRules = self.originalBusinessRules.filter(item => {
          return item.f24Type.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.businessRules;
      }
      else{
        self.businessRules = self.originalBusinessRules;
      }
    },
    b24Tag(val){
      var self = this;
      
      if(val != ""){
        self.businessRules = self.originalBusinessRules.filter(item => {
          return item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.businessRules;
      }
      else{
        self.businessRules = self.originalBusinessRules;
      }
    },
    b24Code(val){
      var self = this;
      
      if(val != ""){
        self.businessRules = self.originalBusinessRules.filter(item => {
          return item.code.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.businessRules;
      }
      else{
        self.businessRules = self.originalBusinessRules;
      }
    },
    b24FuelControl(val){
      var self = this;
      
      if(val != ""){
        self.businessRules = self.originalBusinessRules.filter(item => {
          return item.f24ControlType.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.businessRules;
      }
      else{
        self.businessRules = self.originalBusinessRules;
      }
    },
    b24FuelLimit(val){
      var self = this;
      
      if(val != ""){
        self.businessRules = self.originalBusinessRules.filter(item => {
          return item.maxLitres1 == parseInt(val);
        });
        return self.businessRules;
      }
      else{
        self.businessRules = self.originalBusinessRules;
      }
    },
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
    this.getStore();
    this.getRequireType();
    this.getF24Type();
    this.getF24CreditType();
    this.getF24ControlType();
    this.getBusinessRules();
    this.getEquipment();
    this.getOperators();
    this.getYesNo();
    this.getIntegration();
    this.isMounted = true;
  },
  methods: {

 
    populateFuelControlData() {
        var self = this;
        if (self.controlTypeDropDown) {
           if(self.controlTypeDropDown.value == 0){
              self.isInfoHiddenMaxLitre = true;
              self.isInfoHiddenIntegration = true;
              self.f24creditTypeId = 0;           
           }
           else if(self.controlTypeDropDown.value == 1){
            self.isInfoHiddenMaxLitre = false;
            self.isInfoHiddenIntegration = true;         
           }
           else if(self.controlTypeDropDown.value == 2){
            self.isInfoHiddenMaxLitre = false;
            self.isInfoHiddenIntegration = true;         
           }
           else if(self.controlTypeDropDown.value == 3){
            self.isInfoHiddenMaxLitre = false;
            self.isInfoHiddenIntegration = true;        
           }
           else if(self.controlTypeDropDown.value == 4){
            self.isInfoHiddenMaxLitre = false;
            self.isInfoHiddenIntegration = true;
           }
           else if(self.controlTypeDropDown.value == 5){
            self.isInfoHiddenMaxLitre = true;
            self.isInfoHiddenIntegration = false;
           }
        }
        // self.isInfoHiddenIntegration = false;
    },

    populateF24TypeData() {
      var self = this;
        if(self.f24TypeDropDown.value == 1){
          self.isInfoHiddenEqp = false;
          self.isInfoHiddenEmployee = true;
          self.isInfoHiddenAccount = true;
        }
        else if(self.f24TypeDropDown.value == 4){
           self.isInfoHiddenEmployee = false;
           self.isInfoHiddenEqp = true;
           self.isInfoHiddenAccount = true;
        }
        else if(self.f24TypeDropDown.value == 2){ 
           self.isInfoHiddenAccount = false;
           self.isInfoHiddenEmployee = true;
           self.isInfoHiddenEqp = true;
        }
        else  {
           self.isInfoHiddenEmployee = true;
           self.isInfoHiddenEqp = true;
           self.isInfoHiddenAccount = true;
           self.formData.tag = "N/A";
           self.formData.code = "N/A";
        }
          //  v-model="f24TypeDropDown"
          //   @search:blur="populateF24TypeData" 
        //if(tr.f24TypeId == 1){
        // this.equipmentDropDown = this.equipmentData.filter(function (item) {
        // return item.value == tr.f24Id;

      },

  populateEquipmentData() {
      var self = this;
      var _eqp = "";
      if (self.equipmentDropDown) {
         _eqp = this.equipmentDataAll.filter(function (item) {
                   return item.registration == self.equipmentDropDown.label;
          }),
    
          self.formData.tag = _eqp[0].tag;
          self.formData.code = self.equipmentDropDown.label;
        }
      },
  populateEmployeeData() {
      var self = this;
       var _emp;
       if (self.operatorsDropDown) {
         _emp = self.operatorsDataAll.filter(function (item) {
           return item.operator == self.operatorsDropDown.label;
          }),

          self.formData.tag = _emp[0].tag;
          self.formData.code = self.operatorsDropDown.label;
        }
      },

    initValues() {
      var date = new Date();
      this.formData.expiredate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      
      this.$validator.reset();
      this.authenticationDropDown = 0;
      this.storeDropDown = 0;
      this.f24TypeDropDown = 0;
      this.controlTypeDropDown = 0;
      //this.equipmentDropDown = 0;
      this.equipmentDropDown = { value: 0, label: "N/A" };
      this.operatorsDropDown = 0;
      this.creditTypeDropDown = 0;
      this.operatorDropDown = 0;
      this.driverDropDown = 0;
      this.registrationDropDown = 0;
      this.integrationDropDown = 0;
      this.allocation1DropDown = 0;
      this.allocation2DropDown = 0;
      this.allocation3DropDown = 0;
      this.allocation4DropDown = 0;
      this.allocation4DropDown = 0;
      this.allocation4DropDown = 0;
      this.allocation4DropDown = 0;
      this.allocation4DropDown = 0;
      this.hoursDropDown = 0;
      this.kmDropDown = 0;
      this.controlDropDown = 0;
      this.descriptionDropDown = 0;

      this.formData.id = 0;
      this.formData.accountId = 0;
      this.formData.f24key = "";
      this.formData.storeId = "";
      this.formData.name = "";
      this.formData.tag = "N/A";
      this.formData.code = "N/A";
      this.formData.f24Id = 0;
      this.formData.f24controlTypeId = "";
      this.formData.f24creditTypeId = 1;
      this.formData.fillupIntervals = 0;
      this.formData.driverLicense = 0;
      this.formData.equipmentLicense = 0;
      this.formData.requireReg = "";
      this.formData.requireDriver = "";
      this.formData.requireAttendant = "";
      this.formData.requireAuthentication = "";
      this.formData.requireDesc = "";
      this.formData.requireKm = "";
      this.formData.requireHours = "";
      this.formData.requireAllocation1 = "";
      this.formData.requireAllocation2 = "";
      this.formData.requireAllocation3 = "";
      this.formData.maxLitres1 = 0;
      this.formData.requireAllocation4 = "";
      this.formData.product1 = "1";
      this.formData.interfaceId = 1;
      this.perIntegrationAccountId = 0;
      this.f24ValidationID= 0;
    },
    getBusinessRules() {
      var self = this;
      self.initValues();
      self.showLoadingOnElement("gridTable", 0.65, "radius");
      var onSuccess = function (response) {
        self.businessRules = response.data;
        self.originalBusinessRules = response.data;

        if(self.b24BusinessRule != ""){
          self.businessRules = self.originalBusinessRules.filter(item => {
            return item.name.toLowerCase().indexOf(self.b24BusinessRule.toLowerCase()) > -1;
          });
        }
        else if(self.b24BusinessRlsType != ""){
          self.businessRules = self.originalBusinessRules.filter(item => {
            return item.f24Type.toLowerCase().indexOf(self.b24BusinessRlsType.toLowerCase()) > -1;
          });
        }
        else if(self.b24Tag != ""){
          self.businessRules = self.originalBusinessRules.filter(item => {
            return item.tag.toLowerCase().indexOf(self.b24Tag.toLowerCase()) > -1;
          });
        }
        else if(self.b24Code != ""){
          self.businessRules = self.originalBusinessRules.filter(item => {
            return item.code.toLowerCase().indexOf(self.b24Code.toLowerCase()) > -1;
          });
        }
        else if(self.b24FuelControl != ""){
          self.businessRules = self.originalBusinessRules.filter(item => {
            return item.f24ControlType.toLowerCase().indexOf(self.b24FuelControl.toLowerCase()) > -1;
          });
        }
        else if(self.b24FuelLimit != ""){
          self.businessRules = self.originalBusinessRules.filter(item => {
            return item.maxLitres1.toLowerCase().indexOf(self.b24FuelLimit.toLowerCase()) > -1;
          });
        }
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "F24API/GetBusinessRules", onSuccess, onFinally);
    },
    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
    getStore() {
      var self = this;

      var onSuccess = function (response) {
        self.storesData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(
        self,
        "Stores/GetStoreForManualEntry",
        onSuccess,
        onFinally
      );
    },
    getRequireType() {
      var self = this;

      var onSuccess = function (response) {
        self.requireTypeData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "F24API/GetRequireType", onSuccess, onFinally);
    },
    getF24Type() {
      var self = this;

      var onSuccess = function (response) {
        self.f24TypesData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "F24API/GetF24Type", onSuccess, onFinally);
    },
    getF24ControlType() {
      var self = this;

      var onSuccess = function (response) {
        self.controlTypesData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        //if(self.controlTypeDropDown.value)
        
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "F24API/GetF24ControlType", onSuccess, onFinally);
    },
    getF24CreditType() {
      var self = this;

      var onSuccess = function (response) {
        self.creditTypesData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "F24API/GetF24CreditType", onSuccess, onFinally);
    },
    getEquipment() {
      var self = this;
      
      var onSuccess = function (response) {
        self.equipmentDataAll = response.data;
        self.equipmentData = response.data.map((item) => {
          return { label: item.registration, value: item.id };
        });
      };
      self.$ajaxGet(self,"Equipments/GetEquipment", onSuccess);
    },

  getYesNo(){
      var self = this;
      var onSuccess = function(response) {
          self.YesNoData = response.data.map((item) => {return {label: item.name, value: item.id}});
        };
      self.$ajaxGet(self,"F24yesNo/GetF24yesNo", onSuccess);
    },

   getIntegration(){
      var self = this;
      var onSuccess = function(response) {
          self.IntegrationData = response.data.map((item) => {return {label: item.name, value: item.id}});
        };
      self.$ajaxGet(self,"Integrations/GetIntegrationAccount", onSuccess);
    },

    getOperators(){
      var self = this;
      var onSuccess = function(response) {
          self.operatorsDataAll = response.data;
          self.operatorsData = response.data.map((item) => {return {label: item.operator, value: item.id}});
        };
        
        self.$ajaxGet(self,"Operators/GetOperator", onSuccess);
     // self.$ajaxGet(self,"Operators/GetOperatordropdown", onSuccess);
    },
    showAddCard() {
      this.isListHidden = true;
      this.isVisible = true;
    },
    hideAddCard() {
      this.isListHidden = false;
      this.isVisible = false;
      this.initValues();
    },
    handelSelected(tr) {
      this.formData.expiredate = tr.expireDate;
      this.formData.product1 = tr.product1;
      this.formData.name = tr.name;
      this.formData.tag = tr.tag;
      this.formData.code = tr.code;
      this.formData.id = tr.id;
      this.formData.accountId = tr.accountId;
      this.formData.maxLitres1 = tr.maxLitres1;
      this.formData.fillupIntervals = tr.fillupIntervals;
      this.perIntegrationAccountId = tr.perIntegrationAccountId;

      this.storeDropDown = this.storesData.filter(function (item) {
        return item.value == tr.storeId;
      })[0];
      this.f24TypeDropDown = this.f24TypesData.filter(function (item) {
        return item.value == tr.f24TypeId;
      })[0];
      this.controlTypeDropDown = this.controlTypesData.filter(function (item) {
        return item.value == tr.f24ControlTypeId;
      })[0];
      this.populateFuelControlData();

      this.integrationDropDown = this.IntegrationData.filter(function (item) {
        return item.value == tr.perIntegrationAccountId;
      })[0];

      this.creditTypeDropDown = this.creditTypesData.filter(function (item) {
        return item.value == tr.f24CreditTypeId;
      })[0];
      this.registrationDropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireReg;
      })[0];
      //xxxxx
      // this.integrationDropDown = this.IntegrationData.filter(function (item) {
      //   return item.value == tr.requireReg;
      // })[0];
      

      this.driverDropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireDriver;
      })[0];
      this.operatorDropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireAttendant;
      })[0];
      this.authenticationDropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireAuthentication;
      })[0];
      this.allocation1DropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireAllocation1;
      })[0];
      this.allocation2DropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireAllocation2;
      })[0];
      this.allocation3DropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireAllocation3;
      })[0];
      this.allocation4DropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireAllocation4;
      })[0];
      this.descriptionDropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireDesc;
      })[0];
      this.kmDropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireKm;
      })[0];
      this.hoursDropDown = this.requireTypeData.filter(function (item) {
        return item.value == tr.requireHours;
      })[0]; 
      if(tr.f24TypeId == 1){
        this.equipmentDropDown = this.equipmentData.filter(function (item) {
        return item.value == tr.f24Id;
      })[0];
      }else if(tr.f24TypeId == 4){
        this.operatorsDropDown = this.operatorsData.filter(function (item) {
        return item.value == tr.f24Id;
      })[0];
      }
      
      this.equipmentLicenseCheck = tr.equipmentLicense == 1 ? true : false;
      this.driverLicenseCheck = tr.driverLicense == 1 ? true : false;

      this.showAddCard();
    },
    saveBussinessRule() {
      var self = this;
      var tmp = self.controlTypeDropDown;
      //self.$validator.validateAll().then((result) => {
      //  if (result) {
          if(!self.f24TypeDropDown){
            this.$vs.notify({
              title: "Warning",
              text: "Fams24 Type not selected.",
              color: "warning",
            });
          }
          // else if(!self.equipmentDropDown && self.f24TypeDropDown.value == 1){
          //   this.$vs.notify({
          //     title: "Warning",
          //     text: "Equipment not selected.",
          //     color: "warning",
          //   });
          else if(!self.operatorsDropDown && self.f24TypeDropDown.value == 4){
            this.$vs.notify({
              title: "Warning",
              text: "Employee not selected.",
              color: "warning",
            });
          }else
          {
            self.showLoadingOnElement("saveButton", 0.65, "radius");
            self.formData.f24TypeId = self.f24TypeDropDown.value;
            if(self.f24TypeDropDown.value == 1)
            {
              if(self.equipmentDropDown && self.equipmentDropDown.value != null)
              {
                self.formData.f24Id = self.equipmentDropDown.value;
              } else
              {
                self.formData.f24Id = 0;
              }
              
            } else if(self.f24TypeDropDown.value == 4)
            {
              self.formData.f24Id = self.operatorsDropDown.value;
            }

            if(self.registrationDropDown && self.registrationDropDown.value != null)
            {
              self.formData.requireReg = self.registrationDropDown.value;
            } else
            {
              self.formData.requireReg = 0;
            }
            
            //xxxxx
            if(self.integrationDropDown && self.integrationDropDown.value != null)
            {
              if(self.controlTypeDropDown.value == 5){
                self.formData.perIntegrationAccountId = self.integrationDropDown.value;
              }
              else{
                self.formData.perIntegrationAccountId = 0
              }
            } else
            {
              self.formData.perIntegrationAccountId = 0;
            }

            if(self.driverDropDown && self.driverDropDown.value != null)
            {
              self.formData.requireDriver = self.driverDropDown.value;
            } else
            {
              self.formData.requireDriver = 0;
            }
            
            if(self.operatorDropDown && self.operatorDropDown.value != null)
            {
              self.formData.requireAttendant = self.operatorDropDown.value;
            } else
            {
              self.formData.requireAttendant = 0;
            }
            
            if(self.authenticationDropDown && self.authenticationDropDown.value != null)
            {
              self.formData.requireAuthentication = self.authenticationDropDown.value;
            } else
            {
              self.formData.requireAuthentication = 0;
            }
            
            if(self.descriptionDropDown && self.descriptionDropDown.value != null)
            {
              self.formData.requireDesc = self.descriptionDropDown.value;
            } else
            {
              self.formData.requireDesc = 0;
            }
            
            if(self.kmDropDown && self.kmDropDown.value != null)
            {
              self.formData.requireKm = self.kmDropDown.value;
            } else
            {
              self.formData.requireKm = 0;
            }
            
            if(self.hoursDropDown && self.hoursDropDown.value != null)
            {
              self.formData.requireHours = self.hoursDropDown.value;
            } else
            {
              self.formData.requireHours = 0;
            }
            
            if(self.allocation1DropDown && self.allocation1DropDown.value != null)
            {
              self.formData.requireAllocation1 = self.allocation1DropDown.value;
            } else
            {
              self.formData.requireAllocation1 = 0;
            }
            
            if(self.allocation2DropDown && self.allocation2DropDown.value != null)
            {
              self.formData.requireAllocation2 = self.allocation2DropDown.value;
            } else
            {
              self.formData.requireAllocation2 = 0;
            }
            
            if(self.allocation3DropDown && self.allocation3DropDown.value != null)
            {
              self.formData.requireAllocation3 = self.allocation3DropDown.value;
            } else
            {
              self.formData.requireAllocation3 = 0;
            }
            
            if(self.allocation4DropDown && self.allocation4DropDown.value != null)
            {
              self.formData.requireAllocation4 = self.allocation4DropDown.value;
            } else
            {
              self.formData.requireAllocation4 = 0;
            }
            
            if(self.storeDropDown && self.storeDropDown.value != null)
            {
              self.formData.storeId = self.storeDropDown.value;
            } else
            {
              self.formData.storeId = 0;
            }
            
            if(self.controlTypeDropDown && self.controlTypeDropDown.value != null)
            {
              self.formData.f24controlTypeId = self.controlTypeDropDown.value;
            } else
            {
              self.formData.f24controlTypeId = 0;
            }
            
            if(self.creditTypeDropDown && self.creditTypeDropDown.value != null)
            {
              self.formData.f24creditTypeId = self.creditTypeDropDown.value;
            } else
            {
              self.formData.f24creditTypeId = 0;
            }
          
            self.driverLicenseCheck ? self.formData.driverLicense = 1 : self.formData.driverLicense = 0;
            
            self.equipmentLicenseCheck ? self.formData.equipmentLicense = 1 : self.formData.equipmentLicense = 0;    
            var onSuccess = function () {
              self.getBusinessRules();
            };
            var onFinally = function () {
              self.successNotify();
              self.hideAddCard();
              self.$vs.loading.close(self.$refs.saveButton.$el);
            };

            self.$ajaxPost(self, "F24API/AddUpdateBusinessRules", self.formData, onSuccess, onFinally);
          }
        // } 
        // else {
        //   self.FailedCustomNotify(self.$validator.errors.items[0].msg);
        // }
     // });
    },
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
    },
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully added | updated | removed",
        color: "success",
      });
    },
    FailedNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Item not added",
        color: "danger",
      });
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    deleteBusinessRule(tr)
    {
      var self = this;
      
      if(self.isVisible == true && self.isListHidden == true)
      {
        self.showLoadingOnElement("deleteButton", 0.65, "radius");
      }else{
        self.showLoadingOnElement("gridTable", 0.65, "radius");
      }
      var onSuccess = function () {
        self.getBusinessRules();
      };
      var onFinally = function () {
        self.successNotify();
        
        if(self.isVisible == true && self.isListHidden == true)
        {
          self.$vs.loading.close(self.$refs.deleteButton.$el);
        }else{
          self.$vs.loading.close(self.$refs.gridTable.$el);
        }
      self.hideAddCard();
      
      };
      self.$ajaxDelete(
        self,
        `F24API/${tr.id}`,
        onSuccess,
        onFinally
      );
    },
    
  },
};
</script>
<style lang="scss" scoped>
#datepick {
  .flatpickr-input.active {
    border: 1px solid #ff9f43 !important;
  }
}
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
