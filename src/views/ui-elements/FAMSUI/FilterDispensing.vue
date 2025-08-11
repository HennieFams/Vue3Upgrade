<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card
        v-show="!isInfoHidden"
        class="pb-3"
        title="FAMS Filters - Dispensing"

      >
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Begin date</label>
            <datepicker
              class="w-full"
              id="FromDate"
              placeholder="From Date"
              v-model="formData.fromDate"
              format="yyyy-MM-dd"
              name="From Date"
              v-validate="'required'"
            ></datepicker>
            <span
              class="text-danger text-sm"
              v-show="errors.has('From Date')"
              >{{ errors.first("From Date") }}</span
            >
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>End date</label>
            <datepicker
              class="w-full"
              id="ToDate"
              placeholder="To Date"
              v-model="formData.toDate"
              format="yyyy-MM-dd"
              name="To Date"
              v-validate="'required'"
            ></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{
              errors.first("To Date")
            }}</span>
          </div>
        </div>
        <div class="mt-3 vx-col w-full mb-base">
          <vs-button
            ref="submit"
            class="rounded-lg pt-3 w-full vs-con-loading__container"
            @click="GetGrid"
            >Submit</vs-button>
        </div>
        <div>
          <vs-table
            ref="gridTable"
            v-show="isVisible"
            pagination
            :max-items="itemsPerPage"
            search
            :data="dispensingFilterData"
            class="vs-con-loading__container"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow"
            >
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div
                  class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                >
                  <span class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                    {{
                      dispensingFilterData.length - currentPage * itemsPerPage >
                      0
                        ? currentPage * itemsPerPage
                        : dispensingFilterData.length
                    }}
                    of {{ dispensingFilterData.length }}</span
                  >
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
              <vs-th sort-key="Store">Store</vs-th>
              <vs-th sort-key="Product">Product</vs-th>
              <vs-th sort-key="Equipment">Equipment</vs-th>
              <vs-th sort-key="Date">CreateDate</vs-th>
              <vs-th sort-key="Km">Km</vs-th>          
              <vs-th sort-key="Hour">Hour</vs-th>
              <vs-th sort-key="Volume">Volume</vs-th>
              <vs-th sort-key="Operator">Fuel Attandent</vs-th>
              <vs-th sort-key="Operator">Cost Centre</vs-th>
              <vs-th sort-key="Driver">Driver</vs-th>
              <vs-th sort-key="FuelPrice">Price</vs-th>
              <vs-th sort-key="Description">Description</vs-th>
              <vs-th sort-key="Km">OrignalKM</vs-th>
              <vs-th sort-key="Hour">OrignalHour</vs-th>
              <vs-th sort-key="Hour">Job Number</vs-th>
              <vs-th sort-key="Hour">Allocation 1</vs-th>
              <vs-th sort-key="Hour">Allocation 2</vs-th>
              <vs-th sort-key="Hour">Allocation 3</vs-th>
              <vs-th sort-key="Hour">Allocation 4</vs-th>
              <vs-th>Action</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr>
                <vs-td>
                  <vs-input
                    v-model="dStore"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dProduct"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dEquipment"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dCreateDate"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dKm"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dHour"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dVolume"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dFuelAttandent"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="costcenter"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dDriver"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dPrice"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dDescription"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dOrignalKM"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dOrignalHour"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="jobnumber"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dAllocation1"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dAllocation2"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dAllocation3"
                    class="w-full"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    v-model="dAllocation4"
                    class="w-full"
                  />
                </vs-td>
                <vs-td></vs-td>
              </vs-tr>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.storeName">{{ tr.storeName }}</vs-td>
                <vs-td :data="tr.productName">{{ tr.productName }}</vs-td>
                <vs-td :data="tr.equipmentName">{{ tr.equipmentName }}</vs-td>
                <vs-td :data="tr.createdate">{{   formatDate(tr.createdate.replace("T", " ").split('.')[0])}}</vs-td>
                <vs-td :data="tr.km">{{ tr.km }}</vs-td>          
                <vs-td :data="tr.hour">{{ tr.hour }}</vs-td>
                <vs-td :data="tr.volume">{{ tr.volume }}</vs-td>
                <vs-td :data="tr.operatorName">{{ tr.operatorName }}</vs-td>
                <vs-td :data="tr.costCentre">{{ tr.costCentre }}</vs-td>
                <vs-td :data="tr.driverName">{{ tr.driverName }}</vs-td>
                <vs-td :data="tr.fuelPrice">{{ tr.fuelPrice }}</vs-td>
                <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                <vs-td :data="tr.origKM">{{ tr.origKM }}</vs-td>
                <vs-td :data="tr.origHour">{{ tr.origHour }}</vs-td>
                <vs-td :data="tr.jobNumber">{{ tr.jobNumber }}</vs-td>
                <vs-td :data="tr.allocationName">{{ tr.allocationName }}</vs-td>
                <vs-td :data="tr.allocationName2">{{ tr.allocationName2 }}</vs-td>
                <vs-td :data="tr.allocationName3">{{ tr.allocationName3 }}</vs-td>
                <vs-td :data="tr.allocationName4">{{ tr.allocationName4 }}</vs-td>
                <vs-td class="whitespace-no-wrap" id="iconContainer" >
                  <vx-tooltip class="flex" text="Edit Dispensing">
                    <feather-icon
                      icon="EditIcon"
                      ref="edit"
                      svgClasses="w-5 h-5 hover:text-success stroke-current"
                      @click.stop="handelSelectedDispensing(tr)"
                    />
                  </vx-tooltip>
                  <vx-tooltip class="flex" text="Delete Dispensing">
                    <feather-icon
                      icon="TrashIcon"
                      svgClasses="w-5 h-5 hover:text-danger stroke-current"
                      class="ml-2"
                      @click.stop="deleteSelectedDispensing(tr)"
                    />
                  </vx-tooltip>                  
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vx-card>
      <vx-card
      ref="updateCard"
        v-show="!isUpdateCardHidden"
        class="pb-3 vs-con-loading__container"
        title="FAMS Filters - Dispensing Edit">    
      <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button ref="saveButton" class="rounded-lg vs-con-loading__container mr-2"  color="success" type="filled" @click="saveDispensingFilter">Save</vs-button>
            <vs-button ref="transferButton" color="#2d7ed9" type="filled" class="rounded-lg mr-2 vs-con-loading__container"  @click="activeTransferPopUp=true">Transfer</vs-button>
            <vs-button ref="deleteButton" color="danger" type="filled" class="rounded-lg mr-6 vs-con-loading__container"  @click="activePopUp=true">Delete</vs-button>
            <vs-button  color="warning" type="filled" class="rounded-lg " @click="cancelAddCard">Cancel</vs-button>
          </div>
        </div> 
      <div class="vx-row pb-3">
        <div class="vx-col md:w-1/2 w-full mt-2">
          <label>Date</label>
          <div id="datepick">
              <flat-pickr
              class="w-full"
                :config="configdateTimePicker"
                v-model="formData.date"
                :format="'YYYY-MM-DD HH:mm:ss'"
                placeholder="Select Date"
                name="Date"
              />
          </div>
        </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Equipment</label>
            <v-select
              ref="equipmentDropdown"
              class="w-full"
              placeholder="Search / Select Equipment"
              :options="equipmentData"
              v-model="equipmentDropDown"
            ></v-select>
          </div>  
      </div>
      
      <div class="vx-row pb-3">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Store</label>
            <v-select
              ref="storeDropdown"
              class="w-full"
              placeholder="Search / Select Store"
              :options="storeData"
              v-model="storeDropDown"
            ></v-select>
          </div>  
             <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Product</label>
            <v-select
              ref="productDropdown"
              class="w-full"
              placeholder="Search / Select Product"
              :options="productData"
              v-model="productDropDown"
            ></v-select>
        </div>
        </div>  

        <div class="vx-row pb-3">
         <div class="vx-col md:w-1/2 w-full mt-2">
            <label>CostCentre</label>
            <v-select
              ref="costCentreDropdown"
              class="w-full"
              placeholder="Search / Select CostCentre"
              :options="costCentreData"
              v-model="costCentreDropDown"
            ></v-select>
          </div>
         <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Description</label>
             <vs-input placeholder="Description" class="w-full" v-model="formData.description"  />
          </div>
        </div>
          <div class="vx-row pb-3">
          <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
            <label>Fuel Attendant</label>
            <v-select 
              ref="driver" 
              class="w-full"
              placeholder="Search / Select Operator"
              :options="operatorsData"
              v-model="operatorsDropDown">
            </v-select>
        </div>
          <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
            <label>Driver</label>
            <v-select 
              ref="driver" 
              class="w-full"
              placeholder="Search / Select Driver"
              :options="driversData"
              v-model="driversDropDown">
            </v-select>
          </div>
        </div>
        <div class="vx-row pb-3">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Authorization</label>
            <v-select
              ref="authorizationDropdown"
              class="w-full"
              placeholder="Search / Select Authorization"
              :options="authorizationData"
              v-model="authorizationDropDown"
            ></v-select>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>Job Number</label>
             <vs-input placeholder="Job Number" class="w-full" v-model="formData.jobNumber"  />
          </div>
        </div>
        <div class="vx-row pb-3">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Allocation Group 1</label>
            <v-select 
              ref="allocationGroup1" 
              class="w-full" 
              placeholder="Search / Select Allocation Group 1"
              
              :options="allocationGroup1Data"
              v-model="allocationGroup1DropDown">>>
            </v-select>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Allocation Group 2</label>
            <v-select 
              ref="allocationGroup2" 
              class="w-full" 
              placeholder="Search / Select Allocation Group 2"
              :options="allocationGroup2Data"
              v-model="allocationGroup2DropDown">>>
            </v-select>
          </div>
        </div>
        <div class="vx-row pb-3">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Allocation Group 3</label>
            <v-select 
              ref="allocationGroup3"
              class="w-full" 
              placeholder="Search / Select Allocation Group 3"
              :options="allocationGroup3Data"
              v-model="allocationGroup3DropDown">>>
            </v-select>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Allocation Group 4</label>
            <v-select ref="allocationGroup4"
              class="w-full" 
              placeholder="Search / Select Allocation Group 4"
              :options="allocationGroup4Data"
              v-model="allocationGroup4DropDown">>>
            </v-select>
          </div>
        </div>
        <div class="vx-row pb-3">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>KM</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="kmInput"
              onClick="this.select();"
              name="Kilometers"
              class="w-full"
              v-model="formData.km"
            />
            <span class="text-danger text-sm" v-show="errors.has('Kilometers')">{{ errors.first('Kilometers') }}</span>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Hour</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="hour"
              onClick="this.select();"
              name="Hour"
              class="w-full"
              v-model="formData.hour"
            />
            <span class="text-danger text-sm" v-show="errors.has('Hour')">{{ errors.first('Hour') }}</span>
          </div>
        </div>
        <div class="vx-row pb-3">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Volume</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="volInput"
              onClick="this.select();"
              name="Volume"
              class="w-full"
              v-model="formData.volume"
            />
            <span class="text-danger text-sm" v-show="errors.has('Volume')">{{ errors.first('Volume') }}</span>
          </div>
            <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
            <label>FuelPrice(R)</label>
            <vs-input
              v-validate="'decimal:2|required'"
              autocomplete="off"
              icon-no-border
              ref="fuelPriceInput"
              onClick="this.select();"
              name="FuelPrice"
              class="w-full"
              v-model="formData.fuelPrice"
            />
            <span class="text-danger text-sm" v-show="errors.has('FuelPrice')">{{ errors.first('FuelPrice') }}</span>
          </div>
        </div>
      </vx-card>
    </div>
    <template>
      <div class="demo-alignment">
        <vs-popup classContent="popup-example" title="Confirm" :active.sync="activePopUp">
          <p>Are you sure?</p>
          <vs-divider></vs-divider>
        <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button  color="success" class="rounded-lg mr-2" type="filled"  @click="deleteEntry">Yes</vs-button>
            <vs-button  color="warning" class="rounded-lg mr-2" type="filled"  @click="activePopUp=false">No</vs-button>
          </div>
        </div>
        </vs-popup>
      </div>
    </template>
    <template>
      <div class="demo-alignment">
        <vs-popup classContent="popup-example" title="Confirm" :active.sync="activeTransferPopUp">
          <p>Are you sure?</p>
          <vs-divider></vs-divider>
        <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button  color="success" class="rounded-lg mr-2" type="filled"  @click="transferDispensing">Yes</vs-button>
            <vs-button  color="warning" class="rounded-lg mr-2" type="filled"  @click="activeTransferPopUp=false">No</vs-button>
          </div>
        </div>
        </vs-popup>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import VxCard from "../../../components/vx-card/VxCard.vue";
import moment from "moment";
export default {
  data() {
    return {
      configdateTimePicker: {
      enableTime: true,
      enableSeconds: true,
      },

      getStoreDone:false,
      getProductsDone:false,
      getEquipmentsDone:false,
      getAllocationsDone:false,
      getOperatorsDone:false,
      getCostCenterDone:false,

      dispensingFilterData: [],
      origDispensingFilterData: [],
      columns: "",
      itemsPerPage: 10,
      isMounted: false,
      isVisible: false,
      isInfoHidden: false,
      isUpdateCardHidden: true,
      activePopUp:false,
      activeTransferPopUp:false,

      storeDropDown: 0,
      productDropDown: 0,
      equipmentDropDown: 0,
      allocationGroup1DropDown:0,
      allocationGroup2DropDown:0,
      allocationGroup3DropDown:0,
      allocationGroup4DropDown:0, 
      authorizationDropDown:0,
      operatorsDropDown:0,
      driversDropDown:0,
      costCentreDropDown:0,

      productData: [],
      storeData: [],
      equipmentData: [],
      operatorsData:[],
      driversData:[],
      authorizationData:[],
      costCentreData:[],
      allocationGroup1Data:[],
      allocationGroup2Data:[],
      allocationGroup3Data:[],
      allocationGroup4Data:[],

      formData: {
        fromDate: "",
        toDate: "",
        storeId: "",
        productId: "",
        operatorId: "",
        driverId: "",
        authorizationId: "",
        equipmentId:"",
        costCentreId:"",
        DispenseId:'',
        allocationGroupTypeId1:"",
        allocationGroupTypeId2:"",
        allocationGroupTypeId3:"",
        allocationGroupTypeId4:"",
        date:"",
        km:"",
        hour:"",
        fuelPrice:'',
        description: '',
        volume:'',
        jobNumber: '',
      },

      dStore: "",
      dProduct: "",
      dEquipment: "",
      dCreateDate: "",
      dKm: "",
      dHour: "",
      dVolume: "",
      dFuelAttandent: "",
      dDriver: "",
      dPrice: "",
      dDescription: "",
      dOrignalKM: "",
      dOrignalHour: "",
      dAllocation1: "",
      dAllocation2: "",
      dAllocation3: "",
      dAllocation4: "",
      jobnumber: "",
      costcenter: "",
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VxCard
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
    dStore(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.storeName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dProduct(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.productName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dEquipment(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.equipmentName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dCreateDate(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.createdate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dKm(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.km == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dHour(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.hour == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dVolume(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.volume == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dFuelAttandent(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.operatorName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dDriver(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.driverName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dPrice(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.fuelPrice == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dDescription(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dOrignalKM(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.origKM == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dOrignalHour(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.origHour == parseInt(val);
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dAllocation1(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocationName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dAllocation2(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocationName2.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dAllocation3(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocationName3.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    dAllocation4(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocationName4.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    jobnumber(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocationName4.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
    costcenter(val){
      var self = this;
      
      if(val != ""){
        self.dispensingFilterData = self.origDispensingFilterData.filter(item => {
          return item.allocationName4.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.dispensingFilterData;
      }
      else{
        self.dispensingFilterData = self.origDispensingFilterData;
      }
    },
  },
  mounted() {
    this.isMounted = true;
    var date = new Date();
    this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    initValues(){
      this.storeDropDown = 0;
      this.productDropDown = 0;
      this.equipmentDropDown = 0;
      this.allocationGroup1DropDown = 0;
      this.allocationGroup2DropDown = 0;
      this.allocationGroup3DropDown = 0;
      this.allocationGroup4DropDown = 0;
      this.authorizationDropDown = 0;
      this.operatorsDropDown = 0;
      this.driversDropDown = 0;
      this.costCentreDropDown = 0;

      this.formData.storeId = "";
      this.formData.productId = "";
      this.formData.operatorId = "";
      this.formData.driverId = "";
      this.formData.authorizationId = "";
      this.formData.equipmentId = "";
      this.formData.costCentreId = "";
      this.formData.DispenseId = '';
      this.formData.allocationGroupTypeId1 = "";
      this.formData.allocationGroupTypeId2 = "";
      this.formData.allocationGroupTypeId3 = "";
      this.formData.allocationGroupTypeId4 = "";
      this.formData.date = "";
      this.formData.km = "";
      this.formData.hour = "";
      this.formData.fuelPrice = '';
      this.formData.description = '';
      this.formData.volume = '';
      this.formData.jobNumber = '';

      this.productData = [];
      this.storeData = [];
      this.equipmentData = [];
      this.operatorsData = [];
      this.driversData = [];
      this.authorizationData = [];
      this.costCentreData = [];
      this.allocationGroup1Data = [];
      this.allocationGroup2Data = [];
      this.allocationGroup3Data = [];
      this.allocationGroup4Data = [];

      this.getStoreDone =false;
      this.getProductsDone = false;
      this.getEquipmentsDone = false;
      this.getAllocationsDone = false;
      this.getOperatorsDone = false;
      this.getCostCenterDone = false;
    },
    handelSelectedDispensing(tr) {
      this.formData.DispenseId = tr.id;
      this.getStore(tr.storeID);
      this.getProducts(tr.productID);
      this.getEquipments(tr.equipmentID);
      this.getAllocations(tr);
      this.getOperators(tr);
      this.getCostCenter(tr.costCentreID);
      this.formData.description = tr.description;
      this.formData.km = tr.km;
      this.formData.hour = tr.hour;
      // debugger
      this.formData.jobNumber = tr.jobNumber;
      this.formData.volume = tr.volume;
      this.formData.fuelPrice = tr.fuelPrice;
      this.formData.date = tr.createdate;
      this.showUpdateCard();
    },
    GetGrid() {
      var self = this;
      self.isVisible = false;
      self.showLoadingOnElement("submit", 1, "radius");
      var onSuccess = function (response) {
        // debugger
        self.dispensingFilterData = response.data;
        self.origDispensingFilterData = response.data;
        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
        self.isVisible = true;
      };
      self.$ajaxGet(
        self,
        `Dispensing/GetDispensingDataFilter?&fromDate=${self.dateFormat(
          self.formData.fromDate
        )}&toDate=${self.dateFormat(self.formData.toDate)}`,
        onSuccess,
        onFinally
      );
    },
    getStore(id){
      var self = this;
      var onSuccess = function(response) {
        self.storeData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.storeDropDown = self.storeData.filter((item) => {return item.value == id})[0];
      };      
      var onFinally = function(){
        self.getStoreDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Stores/GetStoreForManualEntry",onSuccess, onFinally);
    },
    getOperators(tr){
      var self =this;

      var onSuccess = function(response) {
        self.operatorsData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.operatorsDropDown = self.operatorsData.filter((item) => {return item.value == tr.operatorID})[0];        
        
        self.driversData = self.operatorsData;
        self.driversDropDown = self.driversData.filter((item) => {return item.value == tr.driverID})[0];

        self.authorizationData = self.operatorsData;
        self.authorizationDropDown = self.authorizationData.filter((item) => {return item.value == tr.authorizationID})[0];
      };      
      var onFinally = function(){
        self.getOperatorsDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Operators/GetOperatordropdown",onSuccess, onFinally);
    },
    getCostCenter(id){
      var self =this;

      var onSuccess = function(response) {
        self.costCentreData = response.data.map((item) => {return {label: item.name, value: item.id}})
        self.costCentreDropDown = self.costCentreData.filter((item) => {return item.value == id})[0];
      };      
      var onFinally = function(){
        self.getCostCenterDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"EquipmentCostCentres/GetEquipmentCostCentresdropdown",onSuccess, onFinally);
    },
    getEquipments(id){
      var self = this;
      var onSuccess = function(response) {
          self.equipmentData = response.data.map((item) => {return {label: item.registration, value: item.id}});
          self.equipmentDropDown = self.equipmentData.filter((item) => {return item.value == id})[0];

        };      
      var onFinally = function(){
        self.getEquipmentsDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Equipments/GetEquipmentDropDown", onSuccess, onFinally);
    }, 
    getProducts(id){
      var self = this;
      var onSuccess = function(response) {
        self.productData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.productDropDown = self.productData.filter((item) => {return item.value == id})[0];
      };      
      var onFinally = function(){
        self.getProductsDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Products/GetProductDropDownAll", onSuccess, onFinally);
    },
    getAllocations(tr){
      var self = this;
      var onSuccess = function(response) {
          self.allocationGroup1Data = response.data.filter((item) => { return item.allocationTypeId == 1; }).map((item) => {return {label: item.name, value: item.id}});
          self.allocationGroup2Data = response.data.filter((item) => { return item.allocationTypeId == 2; }).map((item) => {return {label: item.name, value: item.id}});
          self.allocationGroup3Data = response.data.filter((item) => { return item.allocationTypeId == 3; }).map((item) => {return {label: item.name, value: item.id}});
          self.allocationGroup4Data = response.data.filter((item) => { return item.allocationTypeId == 4; }).map((item) => {return {label: item.name, value: item.id}});
          
          self.allocationGroup1DropDown = self.allocationGroup1Data.filter((item) => {return item.value == tr.allocationID})[0];
          self.allocationGroup2DropDown = self.allocationGroup2Data.filter((item) => {return item.value == tr.allocationID2})[0];
          self.allocationGroup3DropDown = self.allocationGroup3Data.filter((item) => {return item.value == tr.allocationID3})[0];
          self.allocationGroup4DropDown = self.allocationGroup4Data.filter((item) => {return item.value == tr.allocationID4})[0];
        };
      var onFinally = function(){
        self.getAllocationsDone = true;
        self.checkLoadingDone();
      };
      self.$ajaxGet(self,"Allocations/GetAllocationdropdown", onSuccess, onFinally);
    },
    showUpdateCard(){
      this.isInfoHidden = true;
      this.isUpdateCardHidden = false;
      this.showLoadingOnElement("updateCard", 1, "radius");
    },
    cancelAddCard(){
      this.isInfoHidden = false;
      this.isUpdateCardHidden = true;
      this.initValues();
      this.GetGrid();
    },
    saveDispensingFilter(){
      var self = this;
      self.showLoadingOnElement("saveButton", 1, "radius");

      self.formData.storeId = self.storeDropDown == null ? 0 : self.storeDropDown ? parseFloat(self.storeDropDown.value) : 0;
      self.formData.productId = self.productDropDown == null ? 0 : self.productDropDown ? parseFloat(self.productDropDown.value) : 0;
      self.formData.operatorId = self.operatorsDropDown == null ? 0 : self.operatorsDropDown ? parseFloat(self.operatorsDropDown.value) : 0;
      self.formData.driverId = self.driversDropDown == null ? 0 : self.driversDropDown ? parseFloat(self.driversDropDown.value) : 0;
      self.formData.equipmentId = self.equipmentDropDown == null ? 0 : self.equipmentDropDown ? parseFloat(self.equipmentDropDown.value) : 0;
      self.formData.authorizationId = self.authorizationDropDown == null ? 0 : self.authorizationDropDown ? parseFloat(self.authorizationDropDown.value) : 0;
      self.formData.allocationGroupTypeId1 = self.allocationGroup1DropDown == null ? 0 : self.allocationGroup1DropDown ? parseFloat(self.allocationGroup1DropDown.value) : 0;
      self.formData.allocationGroupTypeId2 = self.allocationGroup2DropDown == null ? 0 : self.allocationGroup2DropDown ? parseFloat(self.allocationGroup2DropDown.value) : 0;
      self.formData.allocationGroupTypeId3 = self.allocationGroup3DropDown == null ? 0 : self.allocationGroup3DropDown ? parseFloat(self.allocationGroup3DropDown.value) : 0;
      self.formData.allocationGroupTypeId4 = self.allocationGroup4DropDown == null ? 0 : self.allocationGroup4DropDown ? parseFloat(self.allocationGroup4DropDown.value) : 0;
      self.formData.costCentreId = self.costCentreDropDown == null ? 0 : self.costCentreDropDown ? parseFloat(self.costCentreDropDown.value) : 0;

      var onSuccess = response => { 
        self.$vs.notify({
          title: "Information",
          color: "success",
          text: `Saved`,
          position: "top-right",
          iconPack: "feather",
          icon: "icon-save"
        });
      };
      var onFinally = function (){
        self.$vs.loading.close(self.$refs.saveButton.$el);
        self.cancelAddCard();
      };

      self.$ajaxPost(self, "Dispensing/DispensingFilterSaveEdit", self.formData, onSuccess, onFinally);   

    },
    deleteEntry(){
      var self =this;
      self.showLoadingOnElement("deleteButton", 1, "radius");
      self.activePopUp = false;

      var onSuccess = function(response) {
        self.cancelAddCard();
      };
      var onFinally = function(){
        self.$vs.loading.close(self.$refs.deleteButton.$el);
      };
      self.$ajaxDelete(self,`Dispensing/RemoveDispensingDataFilter?id=${self.formData.DispenseId}`,onSuccess,onFinally);
    },    
    transferDispensing(){
      var self =this;
      self.showLoadingOnElement("transferButton", 1, "radius");
      self.activeTransferPopUp = false;

      var onSuccess = function(response) {
        self.cancelAddCard();
      };
      var onFinally = function(){
        self.$vs.loading.close(self.$refs.transferButton.$el);
      };
      self.$ajaxDelete(self,`Dispensing/RemoveTransferDispensingDataFilter?id=${self.formData.DispenseId}`,onSuccess,onFinally);
    },
    checkLoadingDone(){
      var self = this;
      self.getStoreDone && self.getProductsDone && self.getEquipmentsDone && self.getAllocationsDone && self.getCostCenterDone ? self.$vs.loading.close(self.$refs.updateCard.$el) : null
    },
    formatDate(pad, dateTime) {
      if (typeof dateTime === "undefined") return pad;

      return (pad + dateTime).slice(-pad.length);
    },
    dateFormat(date) {
      var month = "";
      var year = "";
      var day = "";

      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    successNotifyGridExpanded() {
      this.$vs.notify({
        title: "Grid - Successfully",
        text: "Grid expanded / closed",
        color: "warning",
      });
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully added | updated | removed",
        color: "success",
      });
    },
    successNotifyLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
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
    deleteSelectedDispensing(tr){
      this.formData.DispenseId = tr.id;
      this.activePopUp=true;
    }
  },
};
</script>
<style lang="scss">
#datepick{
    .flatpickr-input.active
    {
      border: 1px solid #ff9f43 !important;
    }
    }


    
#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>