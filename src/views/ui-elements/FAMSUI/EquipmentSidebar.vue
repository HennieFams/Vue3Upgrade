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
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>
        {{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM
      </h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div v-if="!formData.showMore">
        <div>
          <div class="vx-row px-4 pt-2 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Type</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment Type"
                :options="equipmentTypeData"
                @search:blur="populateDataequipmentType"
                v-model="equipmentTypeSelect"
                name="Search / Select Equipment Type"
                v-validate="'required'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Search / Select Equipment Type')"
                >{{ errors.first("Search / Select Equipment Type") }}</span
              >
            </div>
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Measurement</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment Measurement"
                :options="EquipmentMeasurementData"
                @search:blur="populateDataEquipmentMeasurement"
                v-model="EquipmentMeasurementSelect"
                name="Search / Select Equipment Measurement"
                v-validate="'required'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Search / Select Equipment Measurement')"
                >{{
                  errors.first("Search / Select Equipment Measurement")
                }}</span
              >
            </div>
          </div>
          <div class="vx-row px-4 pt-2 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full" size="small">Equipment Rebate</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment Rebate"
                :options="equipmentRebateData"
                @search:blur="populateDataEquipmentRebate"
                v-model="equipmentRebateSelect"
                name="Search / Select Equipment Rebate"
                v-validate="'required'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Search / Select Equipment Rebate')"
                >{{ errors.first("Search / Select Equipment Rebate") }}</span
              >
            </div>
            <div class="vx-col flex-1">
              <label class="w-full">Asset - Link</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Asset To Link"
                :options="assetsData"
                @search:blur="populateAssetsData"
                v-model="assetsSelect"
                name="Search / Select Asset To Link"
                v-validate="'required'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Search / Select Asset To Link')"
                >{{ errors.first("Search / Select Asset To Link") }}</span
              >
            </div>
          </div>
          <div class="vx-row px-4 pt-2 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full">Cost Centre</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Cost Centre"
                :options="costcentreData"
                @search:blur="populateDataCostCentre"
                v-model="costcentreSelect"
                name="Search / Select Cost Centre"
                v-validate="'required'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Search / Select Cost Centre')"
                >{{ errors.first("Search / Select Cost Centre") }}</span
              >
            </div>
            <div class="vx-col flex-1">
              <label class="w-full">Master Equipment</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Master Equipment"
                :options="masterequipmentData"
                @search:blur="populateDataMasterEquipment"
                v-model="masterequipmentSelect"
                name="Search / Select Master Equipment"
                v-validate="'required'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Search / Select Master Equipment')"
                >{{ errors.first("Search / Select Master Equipment") }}</span
              >
            </div>
          </div>
          <div class="vx-row px-4 pt-2 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full">Equipment OEM</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment OEM"
                :options="equipmentOemData"
                @search:blur="populateDataEquipmentOem"
                v-model="equipmentOemSelect"
                name="Search / Select Equipment OEM"
              />
            </div>
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Location</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment Location"
                :options="equipmentLocationData"
                @search:blur="populateDataEquipmentLocation"
                v-model="equipmentLocationSelect"
                name="Search / Select Equipment Location"
              />
            </div>
          </div>
          <div class="vx-row px-4 pt-2 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Category</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment Category"
                :options="equipmentCategoryData"
                @search:blur="populateDataEquipmentCategory"
                v-model="equipmentCategorySelect"
                name="Search / Select Equipment Category"
              />
            </div>
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Model</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment Model"
                :options="equipmentModelData"
                @search:blur="populateDataEquipmentModel"
                v-model="equipmentModelSelect"
                name="Search / Select Equipment Model"
              />
            </div>
          </div>
          <div class="vx-row px-4 pt-2 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Owner</label>
              <v-select
                class="w-full"
                placeholder="Search / Select Equipment Owner"
                :options="equipmentOwnerData"
                @search:blur="populateDataEquipmentOwner"
                v-model="equipmentOwnerSelect"
                name="Search / Select Equipment Owner"
              />
            </div>
          </div>
          <br />
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <!-- ContactPhone -->
              <label>EquipmentRegistration</label>
              <vs-input
                icon-pack="feather"
                icon="icon-phone"
                placeholder="Equipment Registration"
                v-model="formData.registration"
                class="w-full"
                name="Equipment Registration"
                maxlength="18" 
                @keydown="nameKeydown($event)"
              />
            </div>
            <div class="vx-col flex-1">
              <!-- ContactPhone -->
              <label>Equipment tag (Press Enter to Confirm)</label>
              <v-select placeholder="Select or Enter Tag to assign" :options="tagDropdown" v-model="tagSelected"
                    class="w-full" taggable maxlength="20" @keypress.native="nameKeydown($event)"></v-select>
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <!-- ContactPhone -->
              <label>Equipment Description</label>
              <vs-input
                icon-pack="feather"
                icon="icon-phone"
                placeholder="Equipment Description"
                v-model="formData.name"
                class="w-full"
                name="Description"
              />
            </div>
          </div>

          <!-- <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Max litres</label>
              <vs-input-number
                v-model="formData.maxLitres"
                label="Capacity:"
                :step="5"
              />
            </div>
          </div> -->

          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label class="w-full">Equipment Consumption</label>
              <vs-input-number
                v-model="formData.consumption"
                label="Consumption:"
                :step="5"
              />
            </div>
          </div>
          <br />
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label>Equipment Active (Yes / No)</label>
              <vs-switch class="rounded-pill" v-model="formData.enable">
                <span slot="on">Yes</span>
                <span slot="off">No</span>
              </vs-switch>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Vin Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              placeholder="Vin Number"
              v-validate="'numeric'"
              type="numeric"
              name="Vin Number"
              v-model="formData.equipmentDetail.vin"
              class="w-full"
            />
          </div>
          <div class="vx-col flex-1">
            <label>Engine Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              placeholder="Engine Number"
              v-validate="'numeric'"
              type="numeric"
              name="Engine Number"
              v-model="formData.equipmentDetail.engineNumber"
              class="w-full"
            />
          </div>
          <div class="vx-col flex-1">
            <label>Series Name</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="Series Name"
              v-model="formData.equipmentDetail.seriesName"
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
              v-model="formData.equipmentDetail.serviceInterval"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Service Interval"
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>Service Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                icon-pack="feather"
                icon="icon-calendar"
                v-model="formData.equipmentDetail.serviceDate"
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
              v-model="formData.equipmentDetail.license"
              class="w-full"
              name="License"
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License</label>
            <v-select
              class="w-full"
              :options="licenseTypeData"
              v-model="licenseTypeSelect"
              placeholder="Search / Select License Type"
              name="Search / Select License Type"
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>License Expire Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="formData.equipmentDetail.licenseExpiryDate"
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
              v-model="formData.equipmentDetail.odometerReading"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Odometer Reading"
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>Odometer Reading Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="formData.equipmentDetail.odometerReadingDate"
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
              v-model="formData.equipmentDetail.owner"
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
              v-model="formData.equipmentDetail.assignedDriver"
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
              v-model="formData.equipmentDetail.burnRateHigh"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Burn Rate High"
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Burn Rate Low</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              v-model="formData.equipmentDetail.burnRateLow"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Burn Rate Low"
            />
          </div>
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button
        class="rounded-lg"
        color="success"
        ref="submit"
        type="gradient"
        @click="submitData"
        icon-pack="feather"
        icon="icon-check"
        >Submit</vs-button
      >
      <vs-button
        class="rounded-lg"
        color="danger"
        type="gradient"
        @click="isSidebarActiveLocal = false"
        icon-pack="feather"
        icon="icon-x-square"
        >Cancel</vs-button
      >
    </div>
  </vs-sidebar>
</template>

<script>
// import vUploader from 'v-uploader'
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
    flatPickr,
  },
  mounted() {
    this.GetDropdownLicenseType();
  },
  data() {
    return {
      dropdownValue: [],
      dropdownSelect: [],

      equipmentRebateSelect: { value: 0, label: "N/A" },
      equipmentRebateData: [],

      EquipmentMeasurementSelect: { value: 0, label: "N/A" },
      EquipmentMeasurementData: [],

      equipmentTypeSelect: {
        value: 0,
        label: "Search / Select Equipment Type",
      },
      equipmentTypeData: [],

      masterequipmentSelect: { value: 0, label: "N/A" },
      masterequipmentData: [],

      costcentreSelect: { value: 0, label: "N/A" },
      costcentreData: [],

      assetsSelect: { value: 0, label: "N/A" },
      assetsData: [],

      formData: {
        id: 0,
        accountId: localStorage.getItem("userAccountId"),
        consumption: 0,
        equipmentOemId: 0,
        equipmentLocationId: 0,
        equipmentCategoryId: 0,
        equipmentModelId: 0,
        equipmentOwnerId: 0,

        PerEquipmentCostCentre: {
          costCentreID: 0,
          costCentreName: "",
          equipmentID: 0,
          perCostCentreID: 2897,
        },
        PerEquipmentMasterGroup: {
          masterGroupID: 0,
          masterGroupName: "",
          equipmentID: 0,
          perMasterGroupID: 2897,
        },
        assetID: 0,
        assetName: "",
        enable: true,
        name: "",
        tag: "",
        equipmentMeasurementId: 0,
        equipmentMeasurementName: "",
        equipmentRebateId: 0,
        equipmentRebateName: "",
        equipmentTypeId: 0,
        equipmentTypeName: "",
        maxLitres: 1000,
        registration: "",
        equipmentDetail: {
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
      },
      licenseTypeData: [],
      licenseTypeSelect: 0,
      tagDropdown: [],
      tagSelected: 0,
      equipmentOemData: [],
      equipmentOemSelect: 0,
      equipmentLocationData: [],
      equipmentLocationSelect: 0,
      equipmentCategoryData: [],
      equipmentCategorySelect: 0,
      equipmentModelData: [],
      equipmentModelSelect: 0,
      equipmentOwnerData: [],
      equipmentOwnerSelect: 0,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },
  watch: {
    name(val) {
      this.name = val.replace(/\W/g, "");
    },
    async isSidebarActive(val) {
      var self = this;
      if (!val) return;
      if (Object.entries(self.data).length === 0) {
        self.initValues();
        self.$validator.reset();
      } else {
        self.GetDropdownLicenseType();
        self.GetDropdownCostCentre();
        self.GetDropdownAsset();
        self.GetDropdownMasterEquipment();
        self.GetDropdownEquipmentType();
        self.GetDropdownequipmentMeasurement();
        self.GetDropdownequipmentRebate();
        self.GetOEM();
        self.GetCategory();
        self.GetLocation();
        self.GetModel();
        self.GetOwner();
        self.GetTags();
        self.formData.showMore = self.data.showMore;
        self.formData.id = self.data.id;
        self.formData.accountId = localStorage.getItem("userAccountId");
        self.formData.consumption = self.data.consumption;
        self.formData.PerEquipmentCostCentre.costCentreID =
          self.data.ec.costCentreID;
        self.formData.PerEquipmentCostCentre.costCentreName =
          self.data.ec.costCentreName;
        self.formData.assetID = self.data.asset.assetID;
        self.formData.assetName = self.data.asset.assetName;
        self.formData.PerEquipmentCostCentre.equipmentID =
          self.data.ec.equipmentID;
        self.formData.PerEquipmentCostCentre.perCostCentreID =
          self.data.ec.perCostCentreID;
        self.costcentreSelect = {
          value: self.data.ec.costCentreID,
          label: self.data.ec.costCentreName,
        };
        self.formData.PerEquipmentMasterGroup.masterGroupID =
        self.data.em.masterGroupID;
        self.formData.PerEquipmentMasterGroup.masterGroupName =
        self.data.em.masterGroupName;
        self.formData.PerEquipmentMasterGroup.equipmentID =
          self.data.em.equipmentID;
        self.formData.PerEquipmentMasterGroup.perMasterGroupID =
          self.data.em.perMasterGroupID;
        self.masterequipmentSelect = {
          value: self.data.em.masterGroupID,
          label: self.data.em.masterGroupName,
        };
        self.formData.equipmentDetail.vin = self.data.ed.vin;
        self.formData.equipmentDetail.engineNumber = self.data.ed.engineNumber;
        self.formData.equipmentDetail.seriesName = self.data.ed.seriesName;
        self.formData.equipmentDetail.license = self.data.ed.license;
        self.formData.equipmentDetail.licenseExpiryDate =
          self.data.ed.licenseExpiryDate;
        self.formData.equipmentDetail.serviceInterval =
          self.data.ed.serviceInterval;
        self.formData.equipmentDetail.serviceDate = self.data.ed.serviceDate;
        self.formData.equipmentDetail.odometerReading =
          self.data.ed.odometerReading;
        self.formData.equipmentDetail.odometerReadingDate =
          self.data.ed.odometerReadingDate;
        self.formData.equipmentDetail.owner = self.data.ed.owner;
        self.formData.equipmentDetail.assignedDriver =
          self.data.ed.assignedDriver;
        self.formData.equipmentDetail.burnRateHigh = self.data.ed.burnRateHigh;
        self.formData.equipmentDetail.burnRateLow = self.data.ed.burnRateLow;

        self.formData.equipmentDetail.licenseTypeId = self.data.licenseTypeId;
        var temp = self.data.ed.licenseTypeId;
        self.licenseTypeSelect = self.licenseTypeData.filter(function (item) {
          return item.value == temp;
        })[0];
        
        self.formData.enable = self.data.enable;
        self.formData.name = self.data.name;
        self.formData.tag = self.data.tag;
        self.tagSelected = { value: 0, label: self.data.tag };
        self.formData.maxLitres = self.data.maxLitres;
        self.formData.registration = self.data.registration;
        
        self.formData.equipmentMeasurementId = self.data.equipmentMeasurementId;
        self.formData.equipmentMeasurementName =
        self.data.equipmentMeasurementName;
        self.EquipmentMeasurementSelect = {
          value: self.data.equipmentMeasurementId,
          label: self.data.equipmentMeasurementName,
        };
        self.assetsSelect = {
          label: self.data.asset.assetName,
          value: self.data.asset.assetId
        }
        
        self.formData.equipmentRebateId = self.data.equipmentRebateId;
        self.formData.equipmentRebateName = self.data.equipmentRebateName;
        self.equipmentRebateSelect = {
          value: self.data.equipmentRebateId,
          label: self.data.equipmentRebateName,
        };

        self.formData.equipmentTypeId = self.data.equipmentTypeId;
        self.formData.equipmentTypeName = self.data.equipmentTypeName;
        self.equipmentTypeSelect = {
          value: self.data.equipmentTypeId,
          label: self.data.equipmentTypeName,
        };
        
        self.formData.equipmentOemId = self.data.equipmentOEMID
        self.formData.equipmentLocationId = self.data.equipmentLocationID
        self.formData.equipmentCategoryId = self.data.equipmentCategoryID
        self.formData.equipmentModelId = self.data.equipmentModelID
        self.formData.equipmentOwnerId = self.data.equipmentOwnerID

          if(self.data.equipmentOEMID && self.data.equipmentOEMID != 0){
            self.equipmentOemSelect = {
              value: self.data.equipmentOEMID,
              label: self.data.oemLabel,
            }
          }
          else{
            self.equipmentOemSelect = 0;
          }
          
          if(self.data.equipmentLocationID && self.data.equipmentLocationID != 0){
            self.equipmentLocationSelect = {
              value: self.data.equipmentLocationId,
              label: self.data.locationLabel,
            }
          }
          else{
            self.equipmentLocationSelect = 0;
          }
          
          if(self.data.equipmentCategoryID && self.data.equipmentCategoryID != 0){
            self.equipmentCategorySelect = {
              value: self.data.equipmentCategoryId,
              label: self.data.categoryLabel,
            }
          }
          else{
            self.equipmentCategorySelect = 0;
          }
          
          if(self.data.equipmentModelID && self.data.equipmentModelID != 0){
            self.equipmentModelSelect = {
              value: self.data.equipmentModelId,
              label: self.data.modelLabel,
            }
          }
          else{
            self.equipmentModelSelect = 0;
          }
          
          if(self.data.equipmentOwnerID && self.data.equipmentOwnerID != 0){
            self.equipmentOwnerSelect = {
              value: self.data.equipmentOwnerId,
              label: self.data.ownerLabel,
            }
          }
          else{
            self.equipmentOwnerSelect = 0;
          }
        
        
      }
    },
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
      },
    },
    isFormValid() {
      return !this.errors.any();
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    GetTags() {
      const self = this;
      var type = "Equipment"
      var onSuccess = function (response) {
        self.tagDropdown = response.data.map((item) => {
          return { label: item.tag, value: item.id };
        });
      };
      var onFinally = function () {
      };
      self.$ajaxGet(self, `IntegrationFAMS/GetTagsForAccount?type=${type}`, onSuccess, onFinally);
    },
    nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        if(e.which === 32){}
        else e.preventDefault();
      }
    },
    LoadAllocationGroup() {
      const self = this;
      var onSuccess = function (response) {
        self.dropdownValue = response.data.map(function (item) {
          //return { text: item.customer, value: item.id };
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "AllocationTypes/GetAllocationTypedropdown",
        onSuccess,
        onFinally
      );
    },

    initValues() {
      this.formData.id = 0;
      (this.formData.accountId = localStorage.getItem("userAccountId")),
        (this.formData.consumption = 0),
        (this.formData.PerEquipmentCostCentre.costCentreID = 0),
        (this.formData.PerEquipmentCostCentre.costCentreName = ""),
        (this.formData.PerEquipmentCostCentre.equipmentID = 0),
        (this.formData.PerEquipmentCostCentre.perCostCentreID = 0);

      (this.formData.PerEquipmentMasterGroup.masterGroupID = 0),
        (this.formData.PerEquipmentMasterGroup.masterGroupName = ""),
        (this.formData.PerEquipmentMasterGroup.equipmentID = 0),
        (this.formData.PerEquipmentMasterGroup.perMasterGroupID = 0);

      (this.formData.enable = true),
        (this.formData.name = ""),
        (this.formData.tag = "0000000000"),
        (this.formData.equipmentMeasurementId = 0),
        (this.formData.equipmentMeasurementName = ""),
        (this.formData.equipmentRebateId = 0),
        (this.formData.equipmentRebateName = ""),
        (this.formData.equipmentTypeId = 0),
        (this.formData.equipmentTypeName = ""),
        (this.formData.maxLitres = 1000),
        (this.formData.registration = ""),
        (this.formData.equipmentDetail.vin = "");
      this.formData.equipmentDetail.engineNumber = "";
      this.formData.equipmentDetail.seriesName = "";
      this.formData.equipmentDetail.licenseTypeId = 0;
      this.formData.equipmentDetail.license = "";
      this.formData.equipmentDetail.serviceInterval = 0;
      this.formData.equipmentDetail.odometerReading = 0;
      this.formData.equipmentDetail.owner = "";
      this.formData.equipmentDetail.assignedDriver = "";
      this.formData.equipmentDetail.burnRateHigh = 0;
      this.formData.equipmentDetail.burnRateLow = 0;

      (this.equipmentRebateSelect = { value: 0, label: "N/A" }),
        (this.EquipmentMeasurementSelect = { value: 0, label: "N/A" }),
        (this.equipmentTypeSelect = {
          value: 0,
          label: "Search / Select Equipment Type",
        }),
        (this.masterequipmentSelect = { value: 0, label: "N/A" }),
        (this.costcentreSelect = { value: 0, label: "N/A" });
        (this.assetsSelect = { value: 0, label: "N/A" });

      var date = new Date();
      this.formData.equipmentDetail.licenseExpiryDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      this.formData.equipmentDetail.serviceDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      this.formData.equipmentDetail.odometerReadingDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      this.licenseTypeSelect = [];
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },

    populateDataequipmentType() {
      var self = this;
      if (self.equipmentTypeSelect) {
        self.formData.equipmentTypeId = self.equipmentTypeSelect.value;
        self.formData.equipmentTypeName = self.equipmentTypeSelect.label;
      }
    },

    populateDataEquipmentMeasurement() {
      var self = this;
      if (self.EquipmentMeasurementSelect) {
        self.formData.equipmentMeasurementId =
          self.EquipmentMeasurementSelect.value;
        self.formData.equipmentMeasurementName =
          self.EquipmentMeasurementSelect.label;
      }
    },

    populateDataEquipmentRebate() {
      var self = this;
      if (self.equipmentRebateSelect) {
        self.formData.equipmentRebateId = self.equipmentRebateSelect.value;
        self.formData.equipmentRebateName = self.equipmentRebateSelect.label;
      }
    },

    populateDataCostCentre() {
      var self = this;
      if (self.costcentreSelect) {
        self.formData.PerEquipmentCostCentre.costCentreID =
          self.costcentreSelect.value;
        self.formData.PerEquipmentCostCentre.costCentreName =
          self.costcentreSelect.label;
      }
    },
    populateAssetsData() {
      var self = this;
      if (self.assetsSelect) {
        self.formData.assetID =
          self.assetsSelect.value;
        self.formData.assetName =
          self.assetsSelect.label;
      }
    },

    populateDataMasterEquipment() {
      var self = this;
      if (self.masterequipmentSelect) {
        self.formData.PerEquipmentMasterGroup.masterGroupID =
          self.masterequipmentSelect.value;
        self.formData.PerEquipmentMasterGroup.masterGroupName =
          self.masterequipmentSelect.value;
      }
    },

    submitData() {
      var self = this;
      var date = new Date();

      const obj = {};
      if(self.tagSelected && self.tagSelected.label == undefined){
            self.formData.tag = self.tagSelected;
          }
          else if(self.tagSelected.label){
            self.formData.tag = self.tagSelected.label;
          }
          
      if (self.formData.showMore) {
        obj.equipmentId = self.formData.id;
        obj.showMore = self.formData.showMore;
        obj.vin = self.formData.equipmentDetail.vin;
        obj.engineNumber = self.formData.equipmentDetail.engineNumber;
        obj.seriesName = self.formData.equipmentDetail.seriesName;
        obj.licenseTypeId = self.licenseTypeSelect.value;
        obj.license = self.formData.equipmentDetail.license;
        obj.licenseExpiryDate = self.formData.equipmentDetail.licenseExpiryDate == "" ? null : self.formData.equipmentDetail.licenseExpiryDate;
        obj.serviceInterval = parseInt(self.formData.equipmentDetail.serviceInterval);
        obj.serviceDate = self.formData.equipmentDetail.serviceDate == "" ? null : self.formData.equipmentDetail.serviceDate;
        obj.odometerReading = parseInt(self.formData.equipmentDetail.odometerReading);
        obj.odometerReadingDate = self.formData.equipmentDetail.odometerReadingDate == "" ? null : self.formData.equipmentDetail.odometerReadingDate;
        obj.owner = self.formData.equipmentDetail.owner;
        obj.assignedDriver = self.formData.equipmentDetail.assignedDriver;
        obj.burnRateHigh = parseInt(self.formData.equipmentDetail.burnRateHigh);
        obj.burnRateLow = parseInt(self.formData.equipmentDetail.burnRateLow);
      } else {
        obj.id = self.formData.id;
        obj.accountId = self.formData.accountId;
        obj.name = self.formData.name;
        obj.registration = self.formData.registration;
        obj.tag = self.formData.tag;
        obj.maxLitres = self.formData.maxLitres;
        obj.enable = self.formData.enable;
        obj.consumption = self.formData.consumption;
        obj.equipmentTypeId = self.formData.equipmentTypeId;
        obj.equipmentMeasurementId = self.formData.equipmentMeasurementId;
        obj.equipmentRebateId = self.formData.equipmentRebateId;
        obj.perEquipmentCostCentreId = self.formData.PerEquipmentCostCentre.perCostCentreID;
        obj.equipmentCostCentreId = self.formData.PerEquipmentCostCentre.costCentreID;
        obj.equipmentAssetId = self.formData.assetID > 0 ? self.formData.assetID : self.assetsSelect && self.assetsSelect.value > 0 ? self.assetsSelect.value : 0;
        obj.perEquipmentMasterGroupId = self.formData.PerEquipmentMasterGroup.perMasterGroupID;
        obj.equipmentMasterGroupId = self.formData.PerEquipmentMasterGroup.masterGroupID;
        
        if(self.equipmentOemSelect && self.equipmentOemSelect.value > 0){
          obj.equipmentOEMID = self.formData.equipmentOemId;
        }
        else{
          obj.equipmentOEMID = 0;
        }

        if(self.equipmentLocationSelect && self.equipmentLocationSelect.value > 0){
          obj.equipmentLocationID = self.formData.equipmentLocationId;
        }
        else{
          obj.equipmentLocationID = 0;
        }

        if(self.equipmentCategorySelect && self.equipmentCategorySelect.value > 0){
          obj.equipmentCategoryID = self.formData.equipmentCategoryId;
        }
        else{
          obj.equipmentCategoryID = 0;
        }

        if(self.equipmentModelSelect && self.equipmentModelSelect.value > 0){
          obj.equipmentModelID = self.formData.equipmentModelId;
        }
        else{
          obj.equipmentModelID = 0;
        }

        if(self.equipmentOwnerSelect && self.equipmentOwnerSelect.value > 0){
          obj.equipmentOwnerID = self.formData.equipmentOwnerId;
        }
        else{
          obj.equipmentOwnerID = 0;
        }

      }

      if (self.formData.id !== null && self.formData.id != 0) {
        self.$emit("update", obj);
      } else {
        self.$emit("add", obj);
      }
      this.$emit("closeSidebar");
    },
    GetDropdownCostCentre() {
      const self = this;
      var onSuccess = function (response) {
        self.costcentreData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
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
      var onSuccess = function (response) {
        self.masterequipmentData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
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
      var onSuccess = function (response) {
        self.equipmentTypeData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentTypes/GetEquipmentTypedropdown",
        onSuccess,
        onFinally
      );
    },
    GetDropdownLicenseType() {
      const self = this;
      var onSuccess = function (response) {
        self.licenseTypeData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
      };
      self.$ajaxGet(
        self,
        "Equipments/GetLicenseTypeDropDown",
        onSuccess,
        onFinally
      );
    },
    GetDropdownequipmentMeasurement() {
      const self = this;
      var onSuccess = function (response) {
        self.EquipmentMeasurementData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
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
      var onSuccess = function (response) {
        self.equipmentRebateData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.submit.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentRebates/GetEquipmentRebatesdropdown",
        onSuccess,
        onFinally
      );
    },

    populateDataLicenseType() {
      var self = this;
      if (self.licenseTypeSelect) {
        self.formData.equipmentDetail.licenseTypeId =
          self.licenseTypeSelect.value;
      }
    },

    moreDetail() {
      this.showMore = true;
    },
    lessDetail() {
      this.showMore = false;
    },
    GetDropdownAsset() {
      const self = this;
      var onSuccess = function (response) {
        self.assetsData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentAssets/GetEquipmentAssetsdropdown",
        onSuccess,
        onFinally
      );
    },
    
    populateDataEquipmentOem(){
      var self = this;
      if (self.equipmentOemSelect) {
        self.formData.equipmentOemId = self.equipmentOemSelect.value;
      }
      else{
        self.formData.equipmentOemId = 0;
      }
    },
    populateDataEquipmentLocation(){
      var self = this;
      if (self.equipmentLocationSelect) {
        self.formData.equipmentLocationId = self.equipmentLocationSelect.value;
      }
      else{
        self.formData.equipmentLocationId = 0;
      }
    },
    populateDataEquipmentCategory(){
      var self = this;
      if (self.equipmentCategorySelect) {
        self.formData.equipmentCategoryId = self.equipmentCategorySelect.value;
      }
      else{
        self.formData.equipmentCategoryId = 0;
      }
    },
    populateDataEquipmentModel(){
      var self = this;
      if (self.equipmentModelSelect) {
        self.formData.equipmentModelId = self.equipmentModelSelect.value;
      }
      else{
        self.formData.equipmentModelId = 0;
      }
    },
    populateDataEquipmentOwner(){
      var self = this;
      if (self.equipmentOwnerSelect) {
        self.formData.equipmentOwnerId = self.equipmentOwnerSelect.value;
      }
      else{
        self.formData.equipmentOwnerId = 0;
      }
    },
    GetOEM() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.equipmentOemData = response.data.map(field => ({
          value: field.id,
          label: field.name,
        }));
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetOEMDropdown",
        onSuccess,
        onFinally
      );
    },
    GetCategory() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.equipmentCategoryData = response.data.map(field => ({
          value: field.id,
          label: field.name,
        }));
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetCategoryDropdown",
        onSuccess,
        onFinally
      );
    },
    GetLocation() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.equipmentLocationData = response.data.map(field => ({
          value: field.id,
          label: field.name,
        }));
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetLocationDropdown",
        onSuccess,
        onFinally
      );
    },
    GetModel() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.equipmentModelData = response.data.map(field => ({
          value: field.id,
          label: field.name,
        }));
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetModelDropdown",
        onSuccess,
        onFinally
      );
    },
    GetOwner() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.equipmentOwnerData = response.data.map(field => ({
          value: field.id,
          label: field.name,
        }));
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetOwnerDropdown",
        onSuccess,
        onFinally
      );
    },
  },
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
