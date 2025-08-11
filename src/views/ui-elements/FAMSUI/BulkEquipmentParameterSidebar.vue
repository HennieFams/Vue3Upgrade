<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div v-if="newPes">
      <div class="mt-6 flex items-center justify-between px-6">
        <h4>ADD EQUIPMENT TO STORE</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
      </div>
      <vs-divider class="mb-0"></vs-divider>

      <component
        :is="scrollbarTag"
        class="scroll-area--data-list-add-new"
        :settings="settings"
        :key="$vs.rtl"
      >
        <div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Download</span>
              <vs-switch class="rounded-pill" v-model="downloadCheck" color="danger">
                <span slot="off">No</span>
                <span slot="on">Yes</span>
              </vs-switch>
            </div>
            <div class="vx-col">
              <vs-button class="rounded-lg mr-2" color="warning" @click="bulkAddSpecEqp()"
              icon-pack="feather" icon="icon-edit">Bulk Add To All Stores</vs-button>  
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Driver</span>
              <vs-checkbox
              name="cbRequireDriver"
                v-model="requireDriverCheck"
                >
              </vs-checkbox>
            </div>
            <div class="vx-col">
              <span>Fuel Attendant</span>
              <vs-checkbox
                name="cbOperator"
                v-model="requireOperatorCheck"
                >
              </vs-checkbox>
            </div>
            <div class="vx-col">
              <span>Authentication</span>
              <vs-checkbox
                name="cbAuthentication"
                v-model="requireAuthenticationCheck"
                >
              </vs-checkbox>
            </div>
            <div class="vx-col">
              <span>KM</span>
              <vs-checkbox
                name="cbKM"
                v-model="requireKmCheck"
                >
              </vs-checkbox>
            </div>
            <div class="vx-col">
              <span>Hours</span>
              <vs-checkbox
                name="cbHours"
                v-model="requireHoursCheck"
                >
              </vs-checkbox>
            </div>
          </div>
          <div class="vx-row pt-3 m-2">
            <div class="vx-col w-full">
              <span>Store</span>
              <v-select placeholder="Select Store" :clearable="false" :options="storesData" v-model="storeSelect"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 m-2">
            <div class="vx-col w-full">
              <span>Allocation</span>
              <v-select placeholder="Select Allocation" :clearable="false" :options="allocationData" v-model="allocationSelect"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 m-2">
            <div class="vx-col w-full">
              <span>Manual</span>
              <v-select placeholder="Select Manual Type" :clearable="false" :options="dropdownData" v-model="dropdownSelect"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>JobOrder</span>
              <vs-checkbox v-model="jobOrderCheck" color="#720ea8" />
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Tank Nozzle</span>
              <vs-checkbox v-model="tankNozzleCheck" color="#720ea8" />
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product1</span>
              <vs-checkbox v-model="product1Check" color="primary" />
            </div>
            <div class="vx-col">
              <span>Maxlitre1</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres1" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product2</span>
              <vs-checkbox v-model="product2Check" color="primary"/>
            </div>
            <div class="vx-col">
              <span>Maxlitre2</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres2" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product3</span>
              <vs-checkbox v-model="product3Check" color="primary"/>
            </div>
            <div class="vx-col">
              <span>Maxlitre3</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres3" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product4</span>
              <vs-checkbox v-model="product4Check" color="primary"/>
            </div>
            <div class="vx-col">
              <span>Maxlitre4</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres4" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product5</span>
              <vs-checkbox v-model="product5Check" color="primary"/>
            </div>
            <div class="vx-col">
              <span>Maxlitre5</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres5" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product6</span>
              <vs-checkbox v-model="product6Check" color="primary"/>
            </div>
            <div class="vx-col">
              <span>Maxlitre6</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres6" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
        </div>
      </component>

      
      <div class="flex flex-wrap items-center p-6" slot="footer">
        <vs-button class="vs-con-loading__container rounded-lg m-1" color="success" type="gradient" @click="submitNewData" id="saveMeAdd" ref="saveMeAdd" icon-pack="feather" icon="icon-check">Submit</vs-button>
        <vs-button class="rounded-lg m-1" color="danger"  type="gradient" @click="isSidebarActiveLocal = false"  icon-pack="feather" icon="icon-x-square">Cancel</vs-button>
      </div>
    </div>

    <div v-else>
      <div class="mt-6 flex items-center justify-between px-6">
        <h4>BULK UPDATE EQUIPMENT PARAMETERS</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
      </div>
      <vs-divider class="mb-0"></vs-divider>

      <component
        :is="scrollbarTag"
        class="scroll-area--data-list-add-new"
        :settings="settings"
        :key="$vs.rtl"
      >
        <div>
          <div class="vx-row pt-3 m-2">
            <div class="vx-col w-3/4">
              <span>Store</span>
              <v-select
                ref="storeDropdown"
                class="w-full"
                placeholder="Search / Select Store"
                :options="storeData2"
                v-model="storeDropDown2"
              ></v-select>
            </div>
            <div class="vx-col">
              <span>All Stores</span>
              <vs-switch class="rounded-pill" v-model="storesCheck" color="danger">
                <span slot="off">No</span>
                <span slot="on">Yes</span>
              </vs-switch>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Download</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="downloadDropdown" v-model="formData.download"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Driver</span>
              <v-select  style='font-size:10px; width:6rem;' :clearable="false" placeholder="N/A" :options="requireDriverDropdown" v-model="formData.requireDriver"></v-select>
            </div>
            <div class="vx-col">
              <span>Fuel Attendant</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="requireOperatorDropdown" v-model="formData.requireOperator"></v-select>
            </div>
            <div class="vx-col">
              <span>Authentication</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="requireAuthenticationDropdown" v-model="formData.requireAuthentication"></v-select>
            </div>
            <div class="vx-col">
              <span>KM</span>
              <v-select  style='font-size:10px; width:6rem;' :clearable="false" placeholder="N/A" :options="requireKmDropdown" v-model="formData.requireKm"></v-select>
            </div>
            <div class="vx-col">
              <span>Hours</span>
              <v-select  style='font-size:10px; width:6rem;' :clearable="false" placeholder="N/A" :options="requireHoursDropdown" v-model="formData.requireHours"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 m-2">
            <div class="vx-col w-full">
              <span>Allocation</span>
              <v-select placeholder="Select Allocation" :clearable="false" :options="allocationData" v-model="formData.requireAllocation"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 m-2">
            <div class="vx-col w-full">
              <span>Manual</span>
              <v-select placeholder="Select Manual Type" :clearable="false" :options="dropdownData" v-model="formData.requireManual"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Job Order</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="jobOrderDropdown" v-model="formData.jobOrder"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Tank Nozzle</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="tankNozzleDropdown" v-model="formData.tankNozzle"></v-select>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product 1</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="product1Dropdown" v-model="formData.product1"></v-select>
            </div>
            <div class="vx-col">
              <span>Maxlitre1</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres1" min="0" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product 2</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="product2Dropdown" v-model="formData.product2"></v-select>
            </div>
            <div class="vx-col">
              <span>Maxlitre2</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres2" min="0" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product 3</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="product3Dropdown" v-model="formData.product3"></v-select>
            </div>
            <div class="vx-col">
              <span>Maxlitre3</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres3" min="0" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <!-- <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product 4</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="product4Dropdown" v-model="formData.product4"></v-select>
            </div>
            <div class="vx-col">
              <span>Maxlitre4</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres4" min="0" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product 5</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="product5Dropdown" v-model="formData.product5"></v-select>
            </div>
            <div class="vx-col">
              <span>Maxlitre5</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres5" min="0" label="Litre:" :step="5" color="success"/>
            </div>
          </div>
          <div class="vx-row pt-3 ml-2">
            <div class="vx-col">
              <span>Product 6</span>
              <v-select  style='font-size:10px' :clearable="false" placeholder="N/A" :options="product6Dropdown" v-model="formData.product6"></v-select>
            </div>
            <div class="vx-col">
              <span>Maxlitre6</span>
              <vs-input-number style='font-size:12px' v-model="formData.maxlitres6" min="0" label="Litre:" :step="5" color="success"/>
            </div>
          </div> -->
        </div>
      </component>

      
      <div class="flex flex-wrap items-center p-6" slot="footer">
        <vs-button class="vs-con-loading__container rounded-lg m-1" color="success" type="gradient" @click="submitData" id="saveMeBulk" ref="saveMeBulk" icon-pack="feather" icon="icon-check">Submit</vs-button>
        <vs-button class="rounded-lg m-1" color="danger"  type="gradient" @click="isSidebarActiveLocal = false"  icon-pack="feather" icon="icon-x-square">Cancel</vs-button>
      </div>
    </div>
  </vs-sidebar>
  
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
import { CheckBoxFilterBase } from '@syncfusion/ej2-grids';
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
     "v-select": vSelect
  },
  mounted() {
  },
  data() {
    return {
      dropdownValue:[],
      dropdownSelect: [],
      
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      allocationData: [],
      dropdownData: [],
      
      requireDriverDropdown: [],
      requireOperatorDropdown: [],
      requireAuthenticationDropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      requireKmDropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      requireHoursDropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      jobOrderDropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      tankNozzleDropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      product1Dropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      product2Dropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      product3Dropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      product4Dropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      product5Dropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      product6Dropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],
      downloadDropdown: [{value: 0, label: "N/A" },{value: 1, label: "Yes" },{value: 2, label: "No" } ],

      formData: {
        id: 0,
        requireDriver: {value: 0, label: "N/A" },
        requireOperator: {value: 0, label: "N/A" },
        requireAuthentication: {value: 0, label: "N/A" },
        requireKm: {value: 0, label: "N/A" },
        requireHours: {value: 0, label: "N/A" },
        jobOrder: {value: 0, label: "N/A" },
        tankNozzle: {value: 0, label: "N/A" },
        product1: {value: 1, label: "Yes" },
        product2: {value: 0, label: "N/A" },
        product3: {value: 0, label: "N/A" },
        product4: {value: 0, label: "N/A" },
        product5: {value: 0, label: "N/A" },
        product6: {value: 0, label: "N/A" },
        download: {value: 0, label: "N/A" },
        requireAllocation: {value: 0, label: "N/A" },
        requireManual: {value: 0, label: "N/A" },
        maxlitres1: 0,
        maxlitres2: 0,
        maxlitres3: 0,
        maxlitres4: 0,
        maxlitres5: 0,
        maxlitres6: 0,
        storeId: 0,
        equipmentId: 0,
      },
      currentEquipmentId: 0,
      newPes: false,
      storesData: [],
      storeSelect: 0,

      allocationSelect: 0,
      dropdownSelect: 0,
      requireDriverCheck: false,
      requireOperatorCheck: false,
      requireAuthenticationCheck: false,
      requireKmCheck: false,
      requireHoursCheck: false,
      jobOrderCheck: false,
      tankNozzleCheck: false,
      product1Check: true,
      product2Check: false,
      product3Check: false,
      product4Check: false,
      product5Check: false,
      product6Check: false,
      downloadCheck: true,

      storeData2: [],
      storeDropDown2: 0,
      storesCheck: false,
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) {
        if(this.newPes == true){
          this.$vs.loading.close(this.$refs.saveMeAdd.$el);
        }
        else{
          this.$vs.loading.close(this.$refs.saveMeBulk.$el);
        }
        return;
      }
      this.GetGridPerEquipmentStoreAllocation();
      this.GetGridPerEquipmentStoreManual();
      this.GetPerEquipmentStoreFuelAttendantTypedropdown();
      this.GetPerEquipmentStoreDriverTypedropdown();
      
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
        this.newPes = false;
        this.getStores();
        
      } else {
        
        this.initValues();
        this.$validator.reset();
        this.formData.equipmentId = this.data.id;
        this.formData.requireDriver = {value: 0, label: "N/A" };
        this.formData.requireOperator = {value: 0, label: "N/A" };
        this.formData.requireAuthentication = {value: 0, label: "N/A" };
        this.formData.requireKm = {value: 0, label: "N/A" };
        this.formData.requireHours = {value: 0, label: "N/A" };
        this.formData.jobOrder = {value: 0, label: "N/A" };
        this.formData.tankNozzle = {value: 0, label: "N/A" };
        this.formData.product1 = {value: 0, label: "N/A" };
        this.formData.product2 = {value: 0, label: "N/A" };
        this.formData.product3 = {value: 0, label: "N/A" };
        this.formData.product4 = {value: 0, label: "N/A" };
        this.formData.product5 = {value: 0, label: "N/A" };
        this.formData.product6 = {value: 0, label: "N/A" };
        this.formData.download = {value: 0, label: "N/A" };
        this.allocationSelect = 0;
        this.dropdownSelect = 0;
        this.formData.maxlitres1 = 0;
        this.formData.maxlitres2 = 0;
        this.formData.maxlitres3 = 0;
        this.formData.maxlitres4 = 0;
        this.formData.maxlitres5 = 0;
        this.formData.maxlitres6 = 0;
        this.formData.storeId = 0,
        this.newPes = this.data.newPes;
        this.requireDriverCheck = false;
        this.requireOperatorCheck = false;
        this.requireAuthenticationCheck = false;
        this.requireKmCheck = false;
        this.requireHoursCheck = false;
        this.jobOrderCheck = false;
        this.tankNozzleCheck = false;
        this.product1Check = true;
        this.product2Check = false;
        this.product3Check = false;
        this.product4Check = false;
        this.product5Check = false;
        this.product6Check = false;
        this.downloadCheck = true;
        this.getStores();
      }
    }
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
      }
    },
    isFormValid() {
      return (
        !this.errors.any() 
      );
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
    initValues() {
      this.formData.requireDriver = {value: 0, label: "N/A" };
      this.formData.requireOperator = {value: 0, label: "N/A" };
      this.formData.requireAuthentication = {value: 0, label: "N/A" };
      this.formData.requireKm = {value: 0, label: "N/A" };
      this.formData.requireHours = {value: 0, label: "N/A" };
      this.formData.jobOrder = {value: 0, label: "N/A" };
      this.formData.tankNozzle = {value: 0, label: "N/A" };
      this.formData.product1 = {value: 0, label: "N/A" };
      this.formData.product2 = {value: 0, label: "N/A" };
      this.formData.product3 = {value: 0, label: "N/A" };
      this.formData.product4 = {value: 0, label: "N/A" };
      this.formData.product5 = {value: 0, label: "N/A" };
      this.formData.product6 = {value: 0, label: "N/A" };
      this.formData.download = {value: 0, label: "N/A" };
      this.allocationSelect = 0;
      this.dropdownSelect = 0;
      this.formData.maxlitres1 = 0;
      this.formData.maxlitres2 = 0;
      this.formData.maxlitres3 = 0;
      this.formData.maxlitres4 = 0;
      this.formData.maxlitres5 = 0;
      this.formData.maxlitres6 = 0;
      this.currentEquipmentId = 0;
      this.requireDriverCheck = false;
      this.requireOperatorCheck = false;
      this.requireAuthenticationCheck = false;
      this.requireKmCheck = false;
      this.requireHoursCheck = false;
      this.jobOrderCheck = false;
      this.tankNozzleCheck = false;
      this.product1Check = true;
      this.product2Check = false;
      this.product3Check = false;
      this.product4Check = false;
      this.product5Check = false;
      this.product6Check = false;
      this.downloadCheck = true;
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
  
    bulkAddSpecEqp(){
      var self = this;
      var eqpId = self.formData.equipmentId;
      self.$emit("bulk", eqpId);
    },
    submitData() {
      var self = this;
      var line = "";
      
      if(self.storeDropDown2 && self.storeDropDown2.value > 0)
      {
        // self.showLoadingOnElement("saveMeBulk",1,"radius");
        line = (self.storeDropDown2.value)  + "," + (self.formData.requireDriver.label == 'N/A' ? -1 : self.formData.requireDriver.value )  + "," + (self.formData.requireOperator.label == 'N/A' ? -1 : self.formData.requireOperator.value )  + "," +  
        (self.formData.requireAuthentication.label == 'N/A' ? -1 : self.formData.requireAuthentication.label == "Yes" ? 1 : 0 )  + "," +  (self.formData.requireKm.label == 'N/A' ? -1 : self.formData.requireKm.label == "Yes" ? 1 : 0 )  + "," +  (self.formData.requireHours.label == 'N/A' ? -1 : self.formData.requireHours.label == "Yes" ? 1 : 0 )  + "," +  
        (self.formData.requireAllocation ? self.formData.requireAllocation.label == 'N/A' ? -1 : self.formData.requireAllocation.value : 0) + "," + (self.formData.jobOrder.label == 'N/A' ? -1 : self.formData.jobOrder.label == "Yes" ? 1 : 0)  + "," + 
        (self.formData.product1.label == 'N/A' ? -1 : self.formData.product1.label == "Yes" ? 1 : 0)  + "," + (self.formData.product1.label == "Yes" ? self.formData.maxlitres1 : 0) + "," + 
        (self.formData.product2.label == 'N/A' ? -1 : self.formData.product2.label == "Yes" ? 1 : 0)  + "," + (self.formData.product2.label == "Yes" ? self.formData.maxlitres2 : 0) + "," + 
        (self.formData.product3.label == 'N/A' ? -1 : self.formData.product3.label == "Yes" ? 1 : 0)  + "," + (self.formData.product3.label == "Yes" ? self.formData.maxlitres3 : 0) + "," + 
        (self.formData.download.label == 'N/A' ? -1 : self.formData.download.label == "Yes" ? 1 : 0) + "," + (self.formData.requireManual ? self.formData.requireManual.label == 'N/A' ? -1 : self.formData.requireManual.value : 0) + "," + (self.formData.tankNozzle.label == 'N/A' ? -1 : self.formData.tankNozzle.label == "Yes" ? 1 : 0);

        self.initValues();
        self.$emit("update", line);
      }
      else if(self.storesCheck){
        // self.showLoadingOnElement("saveMeBulk",1,"radius");
        line = "0"  + "," + (self.formData.requireDriver.label == 'N/A' ? -1 : self.formData.requireDriver.value )  + "," + (self.formData.requireOperator.label == 'N/A' ? -1 : self.formData.requireOperator.value )  + "," +  
        (self.formData.requireAuthentication.label == 'N/A' ? -1 : self.formData.requireAuthentication.label == "Yes" ? 1 : 0 )  + "," +  (self.formData.requireKm.label == 'N/A' ? -1 : self.formData.requireKm.label == "Yes" ? 1 : 0 )  + "," +  (self.formData.requireHours.label == 'N/A' ? -1 : self.formData.requireHours.label == "Yes" ? 1 : 0 )  + "," +  
        (self.formData.requireAllocation ? self.formData.requireAllocation.label == 'N/A' ? -1 : self.formData.requireAllocation.value : 0) + "," + (self.formData.jobOrder.label == 'N/A' ? -1 : self.formData.jobOrder.label == "Yes" ? 1 : 0)  + "," + 
        (self.formData.product1.label == 'N/A' ? -1 : self.formData.product1.label == "Yes" ? 1 : 0)  + "," + (self.formData.product1.label == "Yes" ? self.formData.maxlitres1 : 0) + "," + 
        (self.formData.product2.label == 'N/A' ? -1 : self.formData.product2.label == "Yes" ? 1 : 0)  + "," + (self.formData.product2.label == "Yes" ? self.formData.maxlitres2 : 0) + "," + 
        (self.formData.product3.label == 'N/A' ? -1 : self.formData.product3.label == "Yes" ? 1 : 0)  + "," + (self.formData.product3.label == "Yes" ? self.formData.maxlitres3 : 0)+ "," + 
        (self.formData.download.label == 'N/A' ? -1 : self.formData.download.label == "Yes" ? 1 : 0) + "," + (self.formData.requireManual ? self.formData.requireManual.label == 'N/A' ? -1 : self.formData.requireManual.value : 0) + "," + (self.formData.tankNozzle.label == 'N/A' ? -1 : self.formData.tankNozzle.label == "Yes" ? 1 : 0);

        self.initValues();
        self.$emit("update", line);
      }
      else{
        // self.$vs.loading.close(self.$refs.saveMeBulk.$el);
        self.failedNotify('Please select a store or all stores');
      }
    },
    submitNewData(){
      var self = this;
      self.showLoadingOnElement("saveMeAdd",1,"radius");
      self.formData.requireAllocation = self.allocationSelect.value;
      self.formData.requireManual = self.dropdownSelect.value;
      self.formData.storeId = self.storeSelect.value;
      self.formData.requireDriver = self.requireDCheckriver == true ? 1 : 0;
      self.formData.requireOperator = self.requireOCheckperator == true ? 1 : 0;
      self.formData.requireAuthentication = self.requireACheckuthentication == true ? 1 : 0;
      self.formData.requireKm = self.requireKCheckm == true ? 1 : 0;
      self.formData.requireHours = self.requireHCheckours == true ? 1 : 0;
      self.formData.jobOrder = self.jobOrderCheck == true ? 1 : 0;
      self.formData.tankNozzle = self.tankNozzleCheck == true ? 1 : 0;
      self.formData.product1 = self.product1Check == true ? 1 : 0;
      self.formData.product2 = self.product2Check == true ? 1 : 0;
      self.formData.product3 = self.product3Check == true ? 1 : 0;
      self.formData.product4 = self.product4Check == true ? 1 : 0;
      self.formData.product5 = self.product5Check == true ? 1 : 0;
      self.formData.product6 = self.product6Check == true ? 1 : 0;
      self.formData.download = self.downloadCheck == true ? 1 : 0;
      
      self.$emit("add", self.formData);
    },
    GetGridPerEquipmentStoreManual(whenDone) {
      const self = this;
      var onSuccess = function(response) {
          self.dropdownData = response.data.map((item) => {return {label: item.name, value: item.id} });
          self.dropdownSelect = self.dropdownData[0];
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
         "PerEquipmentStores/GetPerEquipmentStoreManualTypedropdown",
        onSuccess,
        onFinally
      );    
    },
    successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
    failedNotify(failedMessage) {
      this.$vs.notify({
        title: 'Warning',
        text: failedMessage,
        color: 'warning'
      })
    },
    GetGridPerEquipmentStoreAllocation(whenDone) {
      const self = this;
      var onSuccess = function(response) {
          self.allocationData = response.data.map((item) => {return {label: item.name, value: item.id} });
          self.allocationSelect = self.allocationData[0];
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {      
      };
      self.$ajaxGet(
        self,
         "PerEquipmentStores/CRUD_PerEquipmentStoreAllocations_Get",
        onSuccess,
        onFinally
      );
    },
    getStores() { 
        const self = this;
        var onSuccess = function(response) {
            self.storesData = response.data.map((item) => {return {label: item.name, value: item.id} });
            self.storeData2 = response.data.map((item) => {return {label: item.name, value: item.id} });
        };
        var onFinally = function() {
        };
        self.$ajaxGet(
          self,
          "Stores/GetStoredropdown",
          onSuccess,
          onFinally
        );    
      },
      GetPerEquipmentStoreDriverTypedropdown(whenDone) {
      const self = this;
      var onSuccess = function (response) {
        self.requireDriverDropdown = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        if (whenDone && typeof whenDone == "function") whenDone();
      };
      var onFinally = function () {};
      self.$ajaxGet(
        self,
        "PerEquipmentStores/GetPerEquipmentStoreDriverTypedropdown",
        onSuccess,
        onFinally
      );
    },
    GetPerEquipmentStoreFuelAttendantTypedropdown(whenDone) {
      const self = this;
      var onSuccess = function (response) {
        self.requireOperatorDropdown = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        if (whenDone && typeof whenDone == "function") whenDone();
      };
      var onFinally = function () {};
      self.$ajaxGet(
        self,
        "PerEquipmentStores/GetPerEquipmentStoreFuelAttendantTypedropdown",
        onSuccess,
        onFinally
      );
    },
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 700px;
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
