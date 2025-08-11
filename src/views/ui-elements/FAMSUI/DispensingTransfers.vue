<template>
  <div>
    <vx-card ref="MainCard" class="vs-con-loading__container">
      <div class="mt-5">
        <h3>Manual Entries</h3>
        <vs-tabs alignment="left" :position="tabPosition">
          <vs-tab
            @click="initValues(), getStoreForManualEntry()"
            label="Dispensing/Transfers"
          >
            <div>
              <vx-card ref="Dispensing" class="vs-con-loading__container">
                <label>Date</label>
                <div class="vx-row pb-3">
                  <div
                    id="datepick"
                    class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                  >
                    <div>
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
                </div>
                <div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Store</label>
                      <v-select
                        ref="storeDropDown"
                        class="w-full"
                        placeholder="Select Store"
                        :options="storeDropDownData"
                        @search:blur="onSelectStore"
                        v-model="storeDropDown"
                      >
                      </v-select>
                    </div>
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
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Allocation Group 1</label>
                      <v-select
                        ref="allocationGroup1"
                        :disabled="isDisabled"
                        class="w-full"
                        placeholder="Select Allocation Group 1"
                        :options="allocationGroup1Data"
                        v-model="allocationGroup1DropDown"
                        >
                      </v-select>
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Allocation Group 2</label>
                      <v-select
                        ref="allocationGroup2"
                        class="w-full"
                        placeholder="Select Allocation Group 2"
                        :disabled="isDisabled"
                        :options="allocationGroup2Data"
                        v-model="allocationGroup2DropDown"
                        >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Allocation Group 3</label>
                      <v-select
                        ref="allocationGroup3"
                        class="w-full"
                        placeholder="Select Allocation Group 3"
                        :disabled="isDisabled"
                        :options="allocationGroup3Data"
                        v-model="allocationGroup3DropDown"
                        >
                      </v-select>
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Allocation Group 4</label>
                      <v-select
                        ref="allocationGroup4"
                        class="w-full"
                        placeholder="Select Allocation Group 4"
                        :disabled="isDisabled"
                        :options="allocationGroup4Data"
                        v-model="allocationGroup4DropDown"
                        >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col w-full mb-2">
                      <label>Description</label>
                      <vs-textarea
                        v-model="formData.description"
                        :disabled="isDisabled"
                        placeholder="N/A"
                      />
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Equipment Registration</label>
                      <v-select
                        ref="equipment"
                        class="w-full h-1/2"
                        placeholder="Select Equipment"      
                        :options="equipmentsData"
                        v-model="equipmentsDropDown"
                        >
                      </v-select>
                    </div>
                    <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
                      <label>Equipment Discription</label>
                      <vs-input
                        ref="eqpDisc"
                        class="w-full"
                        disabled="true"
                        v-model="equipmentsDropDown.registration"
                      />
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Driver</label>
                      <v-select
                        ref="driver"
                        class="w-full"
                        placeholder="Select Driver"
                        :options="driverData"
                        v-model="driverDropDown"
                      >
                      </v-select>
                    </div>
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Fuel Attendant</label>
                      <v-select
                        ref="driver"
                        class="w-full"
                        placeholder="Select Fuel Attendant"
                        :options="operatorsData"
                        v-model="fuelAttendantDropDown"
                      >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Authentication</label>
                      <v-select
                        ref="driver"
                        class="w-full"
                        placeholder="Select Authentication"
                        :options="authorizationData"
                        v-model="authorizationDropDown"
                      >
                      </v-select>
                    </div>
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Product</label>
                      <v-select
                        ref="product"
                        class="w-full"
                        placeholder="Select Product"
                        :options="productsData"
                        v-model="productsDropDown"
                        ></v-select
                      >
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
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Kilometers')"
                        >{{ errors.first("Kilometers") }}</span
                      >
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Hr</label>
                      <vs-input
                        v-validate="'decimal:2|required'"
                        autocomplete="off"
                        icon-no-border
                        ref="kmInput"
                        onClick="this.select();"
                        name="Kilometers"
                        class="w-full"
                        v-model="formData.hour"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Kilometers')"
                        >{{ errors.first("Kilometers") }}</span
                      >
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
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
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('FuelPrice')"
                        >{{ errors.first("FuelPrice") }}</span
                      >
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-2">
                      <label>Job Number</label>
                      <vs-input placeholder="Job Number" class="w-full" v-model="formData.jobNumber"  />
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Liters</label>
                      <vs-input
                        v-validate="'decimal:2|required'"
                        autocomplete="off"
                        icon-no-border
                        ref="litersInput"
                        onClick="this.select();"
                        name="Liters"
                        aria-placeholder="0"
                        class="w-full"
                        v-model="formData.volume"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Liters')"
                        >{{ errors.first("Liters") }}</span
                      >
                    </div>
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Transaction Type</label>
                      <v-select
                        ref="product"
                        v-validate="'required'"
                        id="transactionType"
                        class="w-full style-chooser vx-navbar-dropdown"
                        placeholder="Select Transaction Type"
                        :options="transactionTypesData"
                        v-model="transactionTypesDropDown"
                        >
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Transaction Type')"
                        >{{ errors.first("Transaction Type") }}</span
                      >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row">
                    <vs-spacer />
                    <div class="vx-col">
                      <vs-button
                        ref="saveDispensingButton"
                        class="rounded-lg mr-3 vs-con-loading__container"
                        color="success"
                        type="border"
                        @click="saveDispensing"
                        >Save</vs-button
                      >
                    </div>
                  </div>
                </div>
              </vx-card>
            </div>
          </vs-tab>

          <vs-tab
            @click="initValues(), getStoreForManualEntry()"
            label="Tank Stock Reading"
          >
            <div>
              <vx-card ref="Dispensing" class="vs-con-loading__container">
                <div>
                  <label>Date</label>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <flat-pickr
                        class="w-full"
                        :format="'YYYY-MM-DD HH:mm:ss'"
                        :config="configdateTimePicker"
                        v-model="formData.date"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Store</label>
                      <v-select
                        ref="storeDropDown"
                        class="w-full"
                        placeholder="Select Store"
                        :options="storeDropDownData"
                        @search:blur="onSelectStoreStockRecieved()"
                        v-model="storeDropDown"
                      >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Tank</label>
                      <v-select
                        class="w-full"
                        placeholder="Select Tank"
                        :disabled="isDisabled"
                        :options="tanksData"
                        v-model="tanksDropDown"
                        >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Product</label>
                      <v-select
                        class="w-full"
                        placeholder="Select Product"
                        :options="productsData"
                        v-model="productsDropDown"
                        >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Dip(Liters)</label>
                      <vs-input
                        autocomplete="off"
                        :disabled="isDisabled"
                        icon-no-border
                        ref="dipLitersInput"
                        onClick="this.select();"
                        name="Dip Liters"
                        class="w-full"
                        v-model="formData.dipLiters"
                        v-validate="'decimal:2|required'"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Dip Liters')"
                        >{{ errors.first("Dip Liters") }}</span
                      >
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Dip(mm)</label>
                      <vs-input
                        :disabled="isDisabled"
                        autocomplete="off"
                        icon-no-border
                        ref="dipmmInput"
                        onClick="this.select();"
                        name="Dip(mm)"
                        class="w-full"
                        v-model="formData.dipMM"
                        v-validate="'decimal:2|required'"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Dip(mm)')"
                        >{{ errors.first("Dip(mm)") }}</span
                      >
                    </div>
                  </div>
                  <div class="vx-row">
                    <vs-spacer />
                    <div class="vx-col">
                      <vs-button
                        ref="saveTankStockReading"
                        class="rounded-lg mr-3 vs-con-loading__container"
                        color="success"
                        type="border"
                        @click="saveTankStockReading"
                        >Save</vs-button
                      >
                    </div>
                  </div>
                </div>
              </vx-card>
            </div>
          </vs-tab>
          <vs-tab @click="initValues()" label="Stock Recieved Manual">
            <div>
              <vx-card ref="Dispensing" class="vs-con-loading__container">
                <!-- <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"> -->
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Date</label>
                      <flat-pickr
                        class="w-full"
                        :format="'YYYY-MM-DD HH:mm:ss'"
                        :config="configdateTimePicker"
                        v-model="formData.date"
                        placeholder="Select Date"
                      />
                    </div>
                    <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
                      <label>Invoice Number</label>
                      <vs-input
                        icon-no-border
                        name="invoiceNr"
                        class="w-full"
                        v-model="formData.invoiceNr"
                      />
                      <!-- <span
                        class="text-danger text-sm"
                        v-show="errors.has('invoiceNr')"
                        >{{ errors.first("invoiceNr") }}</span
                      > -->
                    </div>
                  </div>
                <!-- </div> -->
                <div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Store</label>
                      <v-select
                        ref="storeDropDown"
                        class="w-full"
                        placeholder="Select Store"
                        :options="storeDropDownData"
                        v-model="storeDropDown"
                        @search:blur="onSelectStoreStockRecieved()"
                      >
                      </v-select>
                    </div>
                    <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
                      <label>Delivery Note Number</label>
                      <vs-input
                        icon-no-border
                        name="deliveryNote"
                        class="w-full"
                        v-model="formData.deliveryNote"
                      />
                      <!-- <span
                        class="text-danger text-sm"
                        v-show="errors.has('deliveryNote')"
                        >{{ errors.first("deliveryNote") }}</span
                      > -->
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Tank</label>
                      <v-select
                        ref="tank"
                        class="w-full"
                        placeholder="Select Tank"
                        :disabled="isDisabled"
                        :options="tanksData"
                        v-model="tanksDropDown"
                        >
                      </v-select>
                    </div>
                    <div class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2">
                      <label>Supplier</label>
                      <vs-input
                        icon-no-border
                        name="fuelSupplier"
                        class="w-full"
                        v-model="formData.fuelSupplier"
                      />
                      <!-- <span/ -->
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                      <label>Product</label>
                      <v-select
                        ref="allocationGroup3"
                        class="w-full"
                        placeholder="Select Product"
                        :disabled="isDisabled"
                        :options="productsData"
                        v-model="productsDropDown"
                        >
                      </v-select>
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Description</label>
                      <vs-textarea
                        v-model="formData.description"
                        :disabled="isDisabled"
                        placeholder="N/A"
                      />
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>Liters</label>
                      <vs-input
                        v-validate="'decimal:2|required'"
                        autocomplete="off"
                        :disabled="isDisabled"
                        icon-no-border
                        onClick="this.select();"
                        name="Liters"
                        class="w-full"
                        v-model="formData.volume"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Liters')"
                        >{{ errors.first("Liters") }}</span
                      >
                    </div>
                  </div>
                  <div class="vx-row pb-3">
                    <div
                      class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
                    >
                      <label>FuelPrice(R)</label>
                      <vs-input
                        v-validate="'decimal:2|required'"
                        autocomplete="off"
                        :disabled="isDisabled"
                        icon-no-border
                        ref="fuelPriceInput"
                        onClick="this.select();"
                        name="FuelPrice"
                        class="w-full"
                        v-model="formData.fuelPrice"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('FuelPrice')"
                        >{{ errors.first("FuelPrice") }}</span
                      >
                    </div>
                  </div>
                  <div class="vx-row">
                    <vs-spacer />
                    <div class="vx-col">
                      <vs-button
                        ref="saveButton"
                        class="rounded-lg mr-3 vs-con-loading__container"
                        color="success"
                        type="border"
                        @click="saveStockRecieved"
                        >Save</vs-button
                      >
                    </div>
                  </div>
                </div>
              </vx-card>
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      title: "FAMS - Manual Entries",
      subtitle: "Manual Entries for FAMS",

      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
      },

      month: "",
      day: "",
      year: "",
      hour: "",
      min: "",
      sec: "",

      isDisabled: true,

      tankStockReadingData: [],
      storeData: [],
      storeDropDownData: [],
      productsData: [],
      operatorsData: [],
      driverData: [],
      authorizationData: [],
      equipmentsData: [],
      transactionTypesData: [],

      allocationGroup1Data: [],
      allocationGroup2Data: [],
      allocationGroup3Data: [],
      allocationGroup4Data: [],

      allocationGroup1DropDown: 0,
      allocationGroup2DropDown: 0,
      allocationGroup3DropDown: 0,
      allocationGroup4DropDown: 0,

      transactionTypesDropDown: { value: 0, label: 'Search / Select Transactio Type' },
      equipmentsDropDown: 0,
      authorizationDropDown: 0,
      fuelAttendantDropDown: 0,
      driverDropDown: 0,
      storeDropDown: 0,
      productsDropDown: 0,
      
      tanksData: [],
      tanksDropDown: 0,
      
      formData: {
        storeId: 0,
        productId: 0,
        operatorId: 0,
        driverId: 0,
        authorizationId: 0,
        equipmentId: 0,
        allocationGroupTypeId1: 0,
        allocationGroupTypeId2: 0,
        allocationGroupTypeId3: 0,
        allocationGroupTypeId4: 0,
        date: "",
        km: 0.0,
        hour: 0.0,
        fuelPrice: 0.0,
        description: "n/a",
        volume: 0.0,
        tankId: 0,
        dipLiters: 0.0,
        dipMM: 0.0,
        transactionTypes:0,
        jobNumber: '',
        invoiceNr: '',
        deliveryNote: '',
        fuelSupplier: '',
      },
      tabPosition: "top",
      
      costCentreDropDown:0,
      costCentreData:[],
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    Datepicker,
  },
  // computed: {
  //   windowWidth() {
  //     return this.$store.state.windowWidth
  //   }
  // },
  // watch: {
  //   windowWidth: function(val) {
  //     if (val < 1000) {
  //       this.tabPosition = "left";
  //     }else{
  //       this.tabPosition = "top";
  //     }
  //   }
  // },
  methods: {
    initValues() {
      self = this;
      self.getProducts();
      self.getTransactionTypes();
      self.getStoreForManualEntry();
      self.getOperators();
      self.getEquipments();
      self.getCostCenter();
      var date = new Date();
      this.formData.date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      self.transactionTypesDropDown= { value: 0, label: 'Search / Select Transactio Type' };
      self.storeDropDown = 0;
      
      self.allocationGroup1DropDown = 0;
      self.allocationGroup2DropDown = 0;
      self.allocationGroup3DropDown = 0;
      self.allocationGroup4DropDown = 0;
      self.description = "n/a";
      self.equipmentsDropDown = 0;
      self.authorizationDropDown = 0;
      self.fuelAttendantDropDown = 0;
      self.driverDropDown = 0;
      self.productsDropDown = 0;
      self.tanksDropDown = 0;

      self.formData.storeId = 0;
      self.formData.productId = 0;
      self.formData.operatorId = 0;
      self.formData.equipmentId = 0;
      self.formData.allocationGroupTypeId1 = 0;
      self.formData.allocationGroupTypeId2 = 0;
      self.formData.allocationGroupTypeId3 = 0;
      self.formData.allocationGroupTypeId4 = 0;
      self.formData.km = 0.0;
      self.formData.hour = 0.0;
      self.formData.fuelPrice = 0.0;
      self.formData.description = "n/a";
      self.formData.invoiceNr = 'N/A';
      self.formData.deliveryNote = 'N/A';
      self.formData.fuelSupplier = 'N/A';
      self.formData.volume = 0.0;
      self.formData.tankId = 0;
      self.formData.transactionTypes = 0;
      self.formData.jobNumber = '';

      self.productsData = [];
      self.equipmentsData = [];
      self.transactionTypesData = [];
      self.allocationGroup1Data = [];
      self.allocationGroup2Data = [];
      self.allocationGroup3Data = [];
      self.allocationGroup4Data = [];

      self.costCentreDropDown = 0;
      self.costCentreData = [];

      self.tanksData = [];
      self.errors.clear();

      var date = new Date();
      this.formData.date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      self.isDisabled = true;
    },
    getStoreForManualEntry() {
      var self = this;
      self.showLoadingOnElement("MainCard", 1, "radius");

      var onSuccess = function (response) {
        self.storeData = response.data;
        self.storeDropDownData = response.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
            accountId: item.accountId,
            mac: item.macAddress,
          };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.MainCard.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetStoreForManualEntry",
        onSuccess,
        onFinally
      );
    },

    onSelectStore() {
      var self = this;
      if (self.storeDropDown) {
        self.getAllocations();
        self.isDisabled = false;
      }
    },
    onSelectStoreStockRecieved() {
      var self = this;
      if (self.storeDropDown) {
        self.getTanksByStore();
        self.isDisabled = false;
      }
    },
    getOperators() {
      var self = this;
      var onSuccess = function (response) {
        self.driverData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.authorizationData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.operatorsData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      self.$ajaxGet(self, "Operators/GetOperatordropdown", onSuccess);
    },
    getEquipments() {
      var self = this;
      var onSuccess = function (response) {
        self.equipmentsData = response.data.map((item) => {
          return { label: item.registration, value: item.id, registration: item.name };
        });
      };
      self.$ajaxGet(self, "Equipments/GetEquipmentDropDown", onSuccess);
    },
    getProducts() {
   
     var self = this;
      var onSuccess = function (response) {
        self.productsData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      self.$ajaxGet(self, "Products", onSuccess);
    },
      // var self = this;
      // var onSuccess = function (response) {
      //   self.productsData = [];
      //   var tempTypes = response.data.map((item) => {
      //     return { label: item.name, value: item.id };
      //   });
      //   tempTypes.forEach((_type) => {
      //     if (
      //       self.productsData.filter(function (item) {
      //         return _type.value == item.value;
      //       }).length == 0 &&
      //       _type.value != null
      //     )
      //       self.productsData.push(_type);
      //   });
      // };
      // self.$ajaxGet(
      //   self,
      //   "Products/GetProductDropDown?storeId=" + self.storeDropDown.value,
      //   onSuccess
      // );
    
    getAllocations() {
      var self = this;
      var onSuccess = function (response) {
        self.allocationGroup1Data = response.data
          .filter(function (item) {
            return item.allocationTypeId == 1;
          })
          .map((item) => {
            return { label: item.name, value: item.id };
          });
        self.allocationGroup2Data = response.data
          .filter(function (item) {
            return item.allocationTypeId == 2;
          })
          .map((item) => {
            return { label: item.name, value: item.id };
          });
        self.allocationGroup3Data = response.data
          .filter(function (item) {
            return item.allocationTypeId == 3;
          })
          .map((item) => {
            return { label: item.name, value: item.id };
          });
        self.allocationGroup4Data = response.data
          .filter(function (item) {
            return item.allocationTypeId == 4;
          })
          .map((item) => {
            return { label: item.name, value: item.id };
          });
      };
      self.$ajaxGet(self, "Allocations/GetAllocationdropdown", onSuccess);
    },
    getTransactionTypes() {
      var self = this;
      
      var onSuccess = function(response) {
          //  self.auditLog = response.data.filter(x=> x.tableName == self.tableDropDown).slice(0,500);
            self.transactionTypesData = response.data.filter(x=> x.id < 3).map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
             //self.transactionTypesData = 0;
            //self.$vs.loading.close(self.$refs.gridTable.$el);
            //api/RecordTypes/GetRecordTypedropdown/
            //"Stores/GetstoreTypedropdown",
          };
          self.$ajaxGet(
            self,
            "RecordTypes/GetRecordTypedropdown",
            onSuccess,
            onFinally
          );
    },
    getTanksByStore() {
      var self = this;
      var onSuccess = function (response) {
        self.tanksData = response.data.map((item) => {
          return { label: item.name, value: item.id, nr: item.number };
        });
      };
      self.$ajaxGet(
        self,
        "Tanks/GetTankByStoreDropDown/" + self.storeDropDown.value,
        onSuccess
      );
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    saveDispensing() {
      var self = this;
      if (
        self.storeDropDown &&
        self.equipmentsDropDown &&
        self.productsDropDown &&
        self.transactionTypesDropDown &&
        self.formData.date
      ) {
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.showLoadingOnElement("saveDispensingButton", 0.65, "radius");

            self.formData.storeId = self.storeDropDown == null ? 0 : self.storeDropDown ? parseInt(self.storeDropDown.value) : 0;
            self.formData.productId = self.productsDropDown == null ? 0 : self.productsDropDown ? parseInt(self.productsDropDown.value) : 0;
            self.formData.operatorId = self.fuelAttendantDropDown == null ? 0 : self.fuelAttendantDropDown ? parseInt(self.fuelAttendantDropDown.value) : 0;
            self.formData.driverId = self.driverDropDown == null ? 0 : self.driverDropDown ? parseInt(self.driverDropDown.value) : 0;
            self.formData.authorizationId = self.authorizationDropDown == null ? 0 : self.authorizationDropDown ? parseInt(self.authorizationDropDown.value) : 0;
            self.formData.equipmentId = self.equipmentsDropDown == null ? 0 : self.equipmentsDropDown ? parseInt(self.equipmentsDropDown.value) : 0;
            self.formData.allocationGroupTypeId1 = self.allocationGroup1DropDown == null ? 0 : self.allocationGroup1DropDown ? parseInt(self.allocationGroup1DropDown.value) : 0;
            self.formData.allocationGroupTypeId2 = self.allocationGroup2DropDown == null ? 0 : self.allocationGroup2DropDown ? parseInt(self.allocationGroup2DropDown.value) : 0;
            self.formData.allocationGroupTypeId3 = self.allocationGroup3DropDown == null ? 0 : self.allocationGroup3DropDown ? parseInt(self.allocationGroup3DropDown.value) : 0;
            self.formData.allocationGroupTypeId4 = self.allocationGroup4DropDown == null ? 0 : self.allocationGroup4DropDown ? parseInt(self.allocationGroup4DropDown.value) : 0;
            self.formData.transactionTypes = self.transactionTypesDropDown == null ? 0 : self.transactionTypesDropDown ? parseInt(self.transactionTypesDropDown.value) : 0;
            self.formData.costCentreId = self.costCentreDropDown == null ? 0 : self.costCentreDropDown ? parseFloat(self.costCentreDropDown.value) : 0;
            var onSuccess = (response) => {
            };
            var onFinally = function () {
              self.$vs.notify({
                title: "Information",
                color: "success",
                text: `Saved`,
                position: "top-right",
                iconPack: "feather",
                icon: "icon-save",
              });
              self.$vs.loading.close(self.$refs.saveDispensingButton.$el);
              self.initValues();
            };

            self.$ajaxPost(
              self,
              "Dispensing",
              self.formData,
              onSuccess,
              onFinally
            );
          } else {
            self.$vs.notify({
              title: "Attention",
              color: "warning",
              text: self.$validator.errors.items[0].msg,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-info",
            });
          }
        });
      } else {
        if (!self.storeDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a store`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.equipmentsDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a equipement`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.productsDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a product`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (self.transactionTypesDropDown && self.transactionTypesDropDown.value == 0) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a transaction type`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.formData.date) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a Date`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
      }
    },
    saveStockRecieved() {
      var self = this;
      if (self.storeDropDown && self.productsDropDown && self.formData.date) {
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.showLoadingOnElement("saveButton", 0.65, "radius");

            self.formData.storeId = self.storeDropDown
              ? parseInt(self.storeDropDown.value)
              : 0;
            self.formData.productId = self.productsDropDown
              ? parseInt(self.productsDropDown.value)
              : 0;
            self.formData.tankId = self.tanksDropDown
              ? parseInt(self.tanksDropDown.value)
              : 0;

            var onSuccess = (response) => {
            };
            var onFinally = function () {
              self.$vs.notify({
                title: "Information",
                color: "success",
                text: `Saved`,
                position: "top-right",
                iconPack: "feather",
                icon: "icon-save",
              });
              self.$vs.loading.close(self.$refs.saveButton.$el);
              self.initValues();
            };

            self.$ajaxPost(
              self,
              "Dispensing/StockRecievedManual",
              self.formData,
              onSuccess,
              onFinally
            );
          } else {
            self.$vs.notify({
              title: "Attention",
              color: "warning",
              text: self.$validator.errors.items[0].msg,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-info",
            });
          }
        });
      } else {
        if (!self.date) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a Date`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.storeDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a store`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.productsDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a product`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.TankDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a tank`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
      }
    },
    formatDate(pad, dateTime) {
      if (typeof dateTime === "undefined") return pad;

      return (pad + dateTime).slice(-pad.length);
    },
    saveTankStockReading() {
      var self = this;
      if (self.storeDropDown && self.formData.date) {
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.showLoadingOnElement("saveTankStockReading", 0.65, "radius");

            self.formData.storeId = self.storeDropDown
              ? parseInt(self.storeDropDown.value)
              : 0;
            self.formData.productId = self.productsDropDown
              ? parseInt(self.productsDropDown.value)
              : 0;
            self.formData.tankId = self.tanksDropDown
              ? parseInt(self.tanksDropDown.nr)
              : 0;

            var d = new Date(self.formData.date);
            (self.month = "" + (d.getMonth() + 1)),
              (self.day = "" + d.getDate()),
              (self.year = d.getFullYear()),
              (self.hour = d.getHours()),
              (self.min = d.getMinutes()),
              (self.sec = d.getSeconds());
            if (self.month < 10) self.month = self.formatDate("00", self.month);
            if (self.day < 10) self.day = self.formatDate("00", self.day);
            if (self.hour < 10) self.hour = self.formatDate("00", self.hour);
            if (self.min < 10) self.min = self.formatDate("00", self.min);
            if (self.sec < 10) self.sec = self.formatDate("00", self.sec);

            var info = [
              self.storeDropDown.mac,
              4,
              self.year,
              self.month,
              self.day,
              self.hour,
              self.min,
              self.sec,
              self.formData.tankId,
              self.formData.productId,
              "0.0",
              self.formData.dipMM,
              self.formData.dipLiters,
              "0.0",
              "0.0",
              "0.0",
            ].join("-");
            var onSuccess = (response) => {
              self.$vs.notify({
                title: "Information",
                color: "success",
                text: `Saved`,
                position: "top-right",
                iconPack: "feather",
                icon: "icon-save",
              });
            };
            var onFinally = function () {
              self.$vs.notify({
                title: "Information",
                color: "success",
                text: `Saved`,
                position: "top-right",
                iconPack: "feather",
                icon: "icon-save",
              });
              self.$vs.loading.close(self.$refs.saveTankStockReading.$el);
              self.initValues();
            };

            self.$ajaxPost(
              self,
              "Dispensing/TankStockReading/" + info,
              onSuccess,
              onFinally
            );
          } else {
            self.$vs.notify({
              title: "Attention",
              color: "warning",
              text: self.$validator.errors.items[0].msg,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-info",
            });
          }
        });
      } else {
        if (!self.storeDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a store`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.storeDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a store`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.productsDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a product`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
        if (!self.TankDropDown) {
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: `Please select a tank`,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-x",
          });
        }
      }
    },
    getCostCenter(){
      var self =this;

      var onSuccess = function(response) {
        self.costCentreData = response.data.map((item) => {return {label: item.name, value: item.id}})
      };      
      var onFinally = function(){
      };
      self.$ajaxGet(self,"EquipmentCostCentres/GetEquipmentCostCentresdropdown",onSuccess, onFinally);
    },
  },
  mounted() {
    this.getProducts();
    this.getTransactionTypes();
    this.getStoreForManualEntry();
    this.getOperators();
    this.getEquipments();
    this.getCostCenter();
    var date = new Date();
    this.formData.date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    
  },
};
</script>
<style lang="scss">
#datepick {
  .flatpickr-input.active {
    border: 1px solid #ff9f43 !important;
  }
}

#transactionType{
  .vs__selected {
    min-width: 50px;
    //color: black;
  }
  .vs__search, .vs__search:focus {
    min-width: 50px;
    color: white;
    border-width: 2px;
    border: 1px;
  }
  .vs__dropdown-toggle {
    padding: 0 0 4px 0;
    //border: 1px solid;
    border-radius: 4px;
  }
  .vs10__listbox, .vs__dropdown-menu{
    max-height: 80px;
  }
}
</style>
