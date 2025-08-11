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
  <div id="equipment">
    <equipment-sidebar :isSidebarActive="equipmentSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData"
      @update="updateGrid" />
    <bulkEquipmentParameter-sidebar :isSidebarActive="bulkEquipmentParameterSidebar" @closeSidebar="closeBulk"
      :data="addPerEquipmentStoreData" @update="saveEquipmentParameters" @add="submitNewData" @bulk="bulkAddAllEqp" />
    <vx-card ref="MainCard3" v-show="!isInfoHiddenEquipmentparameters">
      <!-- <div class="vx-row">
              <div class="vx-col md:w-1/6 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelAdd">Return</vs-button>
               </div>
    </div> -->

      <div>
        <vs-table ref="gridTableBusiness" v-model="selected" pagination :max-items="itemsPerPage" search
          :data="famsdataBusinessRule" class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <vs-button class="rounded-lg mr-2" color="warning" @click="cancelAdd" icon-pack="feather"
              icon="icon-plus-square">Return</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openBusinessRule" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" @click="addVue" icon-pack="feather"
              icon="icon-plus-square">Add New</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" @click="bulkParameterUpdate" icon-pack="feather"
              icon="icon-edit">Bulk Update Parameter</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopup" icon-pack="feather"
              icon="icon-edit">Business Rule bulk assign</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="exportCSV" icon-pack="feather"
              icon="icon-edit">Export To CSV</vs-button>


            <!-- <vs-button class="rounded-lg mr-2" color="warning"  @click="cancelAdd"              icon-pack="feather" icon="icon-refresh-ccw">Return</vs-button> -->
            <!-- <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelAdd">Return</vs-button> -->

            <!-- <vs-button color="dark" type="gradient" @click="addDataSidebar"  icon-pack="feather" icon="icon-plus-square">Assign Cost Centre</vs-button>
            <vs-button color="primary" type="gradient" @click="addDataSidebar"  icon-pack="feather" icon="icon-plus-square">Assign Master Group</vs-button> -->
            <!-- ITEMS PER PAGE -->
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
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <vs-th sort-key="Dwn">Dwn</vs-th>
            <vs-th sort-key="Store">Store</vs-th>
            <vs-th sort-key="Registration">Registration</vs-th>
            <vs-th sort-key="Tag">Tag</vs-th>
            <vs-th sort-key="ReqDriver">ReqDriver</vs-th>
            <vs-th sort-key="ReqFuelAtt">ReqFuelAtt</vs-th>
            <vs-th sort-key="ReqAuth">ReqAuth</vs-th>
            <vs-th sort-key="ReqKM">ReqKM</vs-th>
            <vs-th sort-key="ReqHours">ReqHours</vs-th>
            <vs-th sort-key="ReqAlloc">ReqAlloc</vs-th>
            <vs-th sort-key="ReqManual">ReqManual</vs-th>
            <vs-th sort-key="ReqJobOrd">ReqJobOrd</vs-th>
            <vs-th sort-key="ReqJobOrd">ReqTankNoz</vs-th>
            <vs-th sort-key="product1">Product1</vs-th>
            <vs-th sort-key="maxlitres1">Maxlitres1</vs-th>
            <vs-th sort-key="product1">Product2</vs-th>
            <vs-th sort-key="maxlitres1">Maxlitres2</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{ data }">
            <vs-tr>
              <vs-td></vs-td>
              <vs-td>
                <vs-input v-model="queryDwn" class="w-full" id="boolSearch" placeholder="0/1 = false/true" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryStore" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryRegistration" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryTag" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryDriver" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryOperator" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryAuthentication" class="w-full" id="boolSearch" placeholder="0/1 = false/true" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryKM" class="w-full" id="boolSearch" placeholder="0/1 = false/true" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryHours" class="w-full" id="boolSearch" placeholder="0/1 = false/true" />
              </vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
              <vs-td></vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td :data="tr.allocationType.groupName">{{tr.allocationType.groupName}}</vs-td> -->
              <!-- <vs-td :data="tr.download">{{tr.download}}</vs-td> -->
              <vs-td class="whitespace-no-wrap" id="iconContainer">
                <vx-tooltip class="flex" text="Update Equipment Parameter">
                  <feather-icon icon="SaveIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="updatePerEquipmentStore(tr)" />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Equipment Parameter">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="DeletePerEquipmentStore(tr)" />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Copy To All">
                  <feather-icon icon="CopyIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="copyToAll(tr)" />
                </vx-tooltip>

              </vs-td>
              <vs-td :data="tr.download">
                <vs-switch class="rounded-pill" v-model="tr.download">
                  <span slot="on">Yes</span>
                  <span slot="off">No</span>
                </vs-switch>
              </vs-td>

              <vs-td :data="tr.storeName">{{ tr.storeName }}</vs-td>
              <vs-td :data="tr.equipment">{{ tr.equipment }}</vs-td>
              <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
              <vs-td :data="tr.requireDriverDesc">
                <vs-button class="rounded-lg" color="danger" size="small" v-model="selected"
                  @click="showStatusPromptDriver(tr)">{{ tr.requireDriverDesc }}</vs-button>
              </vs-td>

              <vs-td :data="tr.requireOperatorDesc">
                <vs-button class="rounded-lg" color="danger" size="small" v-model="selected"
                  @click="showStatusPromptFuelAttendant(tr)">{{ tr.requireOperatorDesc }}</vs-button>
              </vs-td>
              <!-- <vs-td :data="tr.requireAuthentication">{{tr.requireAuthentication}}</vs-td>     -->
              <vs-td :data="tr.requireAuthentication"><vs-checkbox v-model="tr.requireAuthentication" /></vs-td>
              <vs-td :data="tr.requireKM"><vs-checkbox v-model="tr.requireKM" /></vs-td>
              <vs-td :data="tr.requireHours"><vs-checkbox v-model="tr.requireHours" /></vs-td>

              <vs-td :data="tr.requireAllocationDesc">
                <vs-button class="rounded-lg" color="rgb(62, 201, 214)" size="small" v-model="selected"
                  @click="showStatusPromptAllocation(tr)">{{ tr.allocation }}</vs-button>
              </vs-td>
              <vs-td :data="tr.requireManualDesc">
                <vs-button class="rounded-lg" color="rgb(187, 138, 200)" size="small" v-model="selected"
                  @click="showStatusPromptManual(tr)">{{ tr.manual }}</vs-button>
              </vs-td>
              <vs-td :data="tr.requireJobOrder"><vs-checkbox v-model="tr.requireJobOrder" /></vs-td>
              <vs-td :data="tr.requireTankNozzle"><vs-checkbox v-model="tr.requireTankNozzle" /></vs-td>
              <vs-td :data="tr.product1"><vs-checkbox v-model="tr.product1" /></vs-td>
              <vs-td :data="tr.maxlitres1"><vs-input-number :disabled="!tr.product1" min="0" :is-disabled="!tr.product1"
                  v-model="tr.maxlitres1" /></vs-td>
              <vs-td :data="tr.product2"><vs-checkbox v-model="tr.product2" /></vs-td>
              <vs-td :data="tr.maxlitres2"><vs-input-number :disabled="!tr.product2" min="0" :is-disabled="!tr.product2"
                  v-model="tr.maxlitres2" /></vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vx-card ref="MainCard2" v-show="!isInfoHidden">
      <div class="mt-5">
        <div class="vx-row">
          <div class="vx-col md:w-1/6 w-full">
            <vs-button color="warning" type="border" class="rounded-lg mb-2" @click="cancelAdd">Return</vs-button>
          </div>
          <div class="vx-col md:w-1/8 w-full">
            <vs-button color="warning" type="border" class="rounded-lg mb-2" @click="initValues">Restart</vs-button>
          </div>
        </div>

        <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="title"
          :subtitle="subtitle" finishButtonText="Save entry" @on-complete="formSubmitted">
          <tab-content title="Step 1" class="mb-5" icon="feather icon-home" :before-change="validateStep1">
            <!-- tab 1 content -->
            <form data-vv-scope="step-1">
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <!-- <vs-input size="large" v-validate="'required|alpha'" placeholder="First Name" name="first_name" v-model="first_name" class="mt-5" /> -->
                  <vs-input label="Registration" v-model="formDataEqp.registration" class="w-full" name="first_name"
                    v-validate="'required'" maxlength="18" @keydown="nameKeydown($event)" />
                  <span class="text-danger text-sm" v-show="errors.has('first_name')">{{
                    errors.first("first_name") }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="Equipment Description" v-model="formDataEqp.name" class="w-full" />
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <label class="w-full" size="small">Equipment Tag(Press Enter to Confirm)</label>
                  <v-select placeholder="Select or Enter Tag to assign" :options="tagDropdown" v-model="tagSelected"
                    class="w-full" taggable maxlength="20" @keypress.native="nameKeydown($event)"></v-select>
                  <!-- <vs-input
                    label="Equipment Tag"
                    v-model="formDataEqp.tag"
                    class="w-full"
                    maxlength="20"
                    @keydown="nameKeydown($event)"
                  /> -->
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <label class="w-full" size="small">Equipment Rebate</label>
                  <v-select class="w-full" placeholder="Search / Select Equipment Rebate" :options="equipmentRebateData"
                    v-model="equipmentRebateSelect" @search:blur="populateDataEquipmentRebate"
                    name="Search / Select Equipment Rebate" v-validate="'required'" />
                  <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Rebate')">{{
                    errors.first("Search / Select Equipment Rebate")
                  }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full md:mt-8">
                  <div class="demo-alignment">
                    <span>Equipment Download (No | Yes):</span>
                    <div class="flex">
                      <vs-switch class="rounded-pill" color="success" v-model="pes.download"></vs-switch>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </tab-content>

          <!-- tab 2 content -->
          <tab-content title="Equipment - level 2" class="mb-5" icon="feather icon-briefcase">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Consumption</label>
                <br />
                <vs-input-number v-model="formDataEqp.consumption" label="Consumption:" :step="5" />
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Measurement</label>
                <br />
                <v-select class="w-full" placeholder="Search / Select Equipment Measurement"
                  :options="EquipmentMeasurementData" v-model="EquipmentMeasurementSelect"
                  @search:blur="populateDataEquipmentMeasurement" name="Search / Select Equipment Measurement"
                  v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Measurement')">{{
                  errors.first("Search / Select Equipment Measurement")
                }}</span>
              </div>
              <br />
              <br />
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Type</label>
                <br />
                <v-select class="w-full" placeholder="Search / Select Equipment Type" :options="equipmentTypeData"
                  v-model="equipmentTypeSelect" @search:blur="populateDataEquipmentType"
                  name="Search / Select Equipment Type" v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Type')">{{
                  errors.first("Search / Select Equipment Type") }}</span>
              </div>
            </div>
            <div>
              <vs-button v-show="!showMore" class="rounded-lg mr-2" color="warning" type="filled"
                style="left: 38%; top: 1rem" @click="moreDetail" icon-pack="feather" icon="icon-edit">More
                Detail</vs-button>
              <vs-button v-show="showMore" class="rounded-lg mr-2" color="warning" type="filled"
                style="left: 38%; top: 1rem" @click="lessDetail" icon-pack="feather" icon="icon-edit">Less
                Detail</vs-button>
            </div>
            <br />
            <div v-show="showMore">
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Vin Number</label>
                  <vs-input icon-pack="feather" icon="icon-hash" placeholder="Vin Number" name="Vin Number"
                    v-model="equipmentDetail.vin" class="w-full" />
                  <!-- <span class="text-danger text-sm" >{{ errors.first("Vin Number")}}</span> -->
                </div>
                <div class="vx-col flex-1">
                  <label>Engine Number</label>
                  <vs-input icon-pack="feather" icon="icon-hash" placeholder="Engine Number" name="Engine Number"
                    v-model="equipmentDetail.engineNumber" class="w-full"  />
                  <!-- <span class="text-danger text-sm" >{{ errors.first("Engine Number")}}</span> -->
                </div>
                <div class="vx-col flex-1">
                  <label>Series Name</label>
                  <vs-input icon-pack="feather" icon="icon-file-text" placeholder="Series Name"
                    v-model="equipmentDetail.seriesName" class="w-full" name="SeriesName" />
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Service Interval</label>
                  <vs-input icon-pack="feather" icon="icon-hash" v-model="equipmentDetail.serviceInterval" class="w-full"
                    v-validate="'numeric'" type="numeric" name="Service Interval" />
                  <span class="text-danger text-sm" v-show="errors.has('Service Interval')">{{ errors.first("Service Interval") }}</span>
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-2">
                  <label>Service Date</label>
                  <div id="datepick">
                    <flat-pickr class="w-full" icon-pack="feather" icon="icon-calendar"
                      v-model="equipmentDetail.serviceDate" :format="'YYYY-MM-DD'" placeholder="Select Service Date"
                      name="Service Date" />
                  </div>
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>License</label>
                  <vs-input icon-pack="feather" icon="icon-file-text" placeholder="License"
                    v-model="equipmentDetail.license" class="w-full" name="License" />
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>License</label>
                  <v-select class="w-full" placeholder="Search / Select License Type" :options="licenseTypeData"
                    v-model="licenseTypeSelect" @search:blur="populateDataLicenseType"
                    name="Search / Select License Type" />
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-2">
                  <label>License Expire Date</label>
                  <div id="datepick">
                    <flat-pickr class="w-full" v-model="equipmentDetail.licenseExpiryDate" :format="'YYYY-MM-DD'"
                      icon-pack="feather" icon="icon-calendar" placeholder="Select Expiration Date" name="License Date" />
                  </div>
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Odometer Reading</label>
                  <vs-input icon-pack="feather" icon="icon-file-text" v-model="equipmentDetail.odometerReading"
                    class="w-full" v-validate="'numeric'" type="numeric" name="Odometer Reading" />
                  <span class="text-danger text-sm" v-show="errors.has('Odometer Reading')">{{ errors.first("Odometer Reading") }}</span>
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-2">
                  <label>Odometer Reading Date</label>
                  <div id="datepick">
                    <flat-pickr class="w-full" v-model="equipmentDetail.odometerReadingDate" :format="'YYYY-MM-DD'"
                      placeholder="Select Reading Date" name="Reading Date" />
                  </div>
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Owner</label>
                  <vs-input icon-pack="feather" icon="icon-user" placeholder="Owner" v-model="equipmentDetail.owner"
                    class="w-full" name="Owner" />
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Assigned Driver</label>
                  <vs-input icon-pack="feather" icon="icon-user" placeholder="Driver"
                    v-model="equipmentDetail.assignedDriver" class="w-full" name="Driver" />
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Burn Rate High</label>
                  <vs-input icon-pack="feather" icon="icon-hash" v-model="equipmentDetail.burnRateHigh" class="w-full" v-validate="'numeric'" type="numeric" name="Burn Rate High" />
                  <span class="text-danger text-sm" v-show="errors.has('Burn Rate High')">{{ errors.first("Burn Rate High") }}</span>
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Burn Rate Low</label>
                  <vs-input icon-pack="feather" icon="icon-hash" v-model="equipmentDetail.burnRateLow" class="w-full" v-validate="'numeric'" type="numeric" name="Burn Rate Low" />
                  <span class="text-danger text-sm" v-show="errors.has('Burn Rate Low')">{{ errors.first("Burn Rate Low")}}</span>
                </div>
              </div>
            </div>
          </tab-content>

          <!-- tab 3 content -->
          <tab-content title="Equipment - Level 3 (Optional)" class="mb-5" icon="feather icon-image">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Cost Centre</label>
                <v-select class="w-full" placeholder="Search / Select Cost Centre" :options="costcentreData"
                  v-model="costcentreSelect" @search:blur="populateDataCostCentre" name="Search / Select Cost Centre"
                  v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Search / Select Cost Centre')">{{
                  errors.first("Search / Select Cost Centre") }}</span>
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Asset</label>
                <v-select class="w-full" placeholder="Search / Select Equipment Asset" :options="assetsData"
                  v-model="assetsSelect" @search:blur="populateAssetsData" name="Search / Select Equipment Asset"
                  v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Asset')">{{
                  errors.first("Search / Select Equipment Asset") }}</span>
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Master Equipment</label>
                <v-select class="w-full" placeholder="Search / Select Master Equipment" :options="masterequipmentData"
                  v-model="masterequipmentSelect" @search:blur="populateDataMasterEquipment"
                  name="Search / Select Master Equipment" v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Search / Select Master Equipment')">{{
                  errors.first("Search / Select Master Equipment") }}</span>
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment OEM</label>
                <v-select class="w-full" placeholder="Search / Select Equipment OEM" :options="equipmentOemData"
                  v-model="equipmentOemSelect" @search:blur="populateDataEquipmentOem"
                  name="Search / Select Equipment OEM" />
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Location</label>
                <v-select class="w-full" placeholder="Search / Select Equipment Location" :options="equipmentLocationData"
                  v-model="equipmentLocationSelect" @search:blur="populateDataEquipmentLocation"
                  name="Search / Select Equipment Location" />
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Category</label>
                <v-select class="w-full" placeholder="Search / Select Equipment Category" :options="equipmentCategoryData"
                  v-model="equipmentCategorySelect" @search:blur="populateDataEquipmentCategory"
                  name="Search / Select Equipment Category" />
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Model</label>
                <v-select class="w-full" placeholder="Search / Select Equipment Model" :options="equipmentModelData"
                  v-model="equipmentModelSelect" @search:blur="populateDataEquipmentModel"
                  name="Search / Select Equipment Model" />
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <label class="w-full">Equipment Owner</label>
                <v-select class="w-full" placeholder="Search / Select Equipment Owner" :options="equipmentOwnerData"
                  v-model="equipmentOwnerSelect" @search:blur="populateDataEquipmentOwner"
                  name="Search / Select Equipment Owner" />
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
                <!-- <vs-checkbox v-model="pes.requireDriver"  @input="populatedropdownDriver" color="#720ea8" /> -->
                <v-select style="font-size: 10px" placeholder="select type" :options="DropdownDataDriver"
                  v-model="dropdownSelectDriver" @input="populateDataClickDriver"></v-select>
              </div>
              <div class="vx-col">
                <span>Fuel Attendant</span>
                <!-- <vs-checkbox v-model="pes.requireOperator" color="#720ea8" /> -->
                <!-- <vs-checkbox v-model="pes.requireDriver"  @input="populatedropdownDriver" color="#720ea8" /> -->
                <v-select style="font-size: 10px" placeholder="select type" :options="DropdownDataFuelAttendant"
                  v-model="dropdownSelectFuelAttendant" @input="populateDataClickFuelAttendant"></v-select>
              </div>
              <div class="vx-col">
                <span>Authentication</span>
                <vs-checkbox v-model="pes.requireAuthentication" color="#720ea8" />
              </div>
              <div class="vx-col">
                <span>KM</span>
                <vs-checkbox v-model="pes.requireKM" color="#720ea8" />
              </div>
              <div class="vx-col">
                <span>Hours</span>
                <vs-checkbox v-model="pes.requireHours" color="#720ea8" />
              </div>
              <div class="vx-col">
                <span>Allocation</span>
                <v-select style="font-size: 10px" placeholder="select type" :options="allocationData"
                  v-model="allocationSelect" @input="populatedropdownAllocation"></v-select>
              </div>
              <div class="vx-col">
                <span>Manual</span>
                <v-select style="font-size: 10px" placeholder="select type" :options="DropdownData"
                  v-model="dropdownSelect" @input="populatedropdownManual"></v-select>
              </div>

              <div class="vx-col">
                <span>JobOrder</span>
                <vs-checkbox v-model="pes.requireJobOrder" color="#720ea8" />
              </div>

              <div class="vx-col">
                <span>Tank Nozzle</span>
                <vs-checkbox v-model="pes.requireTankNozzle" color="#720ea8" />
              </div>

              <div class="vx-col">
                <span>Product1</span>
                <vs-checkbox v-model="pes.product1" disabled="true" color="primary" />
              </div>
              <div class="vx-col">
                <span>Maxlitre1</span>
                <vs-input-number style="font-size: 12px" v-model="pes.maxlitres1" label="Litre:" :step="5"
                  color="success" />
              </div>
              <div class="vx-col">
                <span>Product2</span>
                <vs-checkbox v-model="pes.product2" color="primary" />
              </div>
              <div class="vx-col">
                <span>Maxlitre2</span>
                <vs-input-number style="font-size: 12px" v-model="pes.maxlitres2" label="Litre:" :step="5"
                  color="success" />
              </div>
            </div>
            <!-- </vx-card> -->
            <!-- <br>
                    <br>
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full">
                          <vs-button color="warning" type="border" class="mb-2"  @click="cancelAdd">Cancel the process and return to equipmen list</vs-button>
                        </div>
                    </div> -->
          </tab-content>
        </form-wizard>
      </div>
    </vx-card>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search :data="famsdata"
          class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->

            <vs-button class="rounded-lg mr-2" color="warning" @click="GetGrid()" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>

            <vs-button class="rounded-lg mr-2" color="success" @click="addVue" icon-pack="feather"
              icon="icon-plus-square">Add New</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" @click="bulkParameterUpdate" icon-pack="feather"
              icon="icon-edit">Bulk Update Parameter</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopup" icon-pack="feather"
              icon="icon-edit">Business Rule (Copy Equipment to Store)</vs-button>

            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopupEquipment"
              icon-pack="feather" icon="icon-edit">Business Rule (new Equipment to Store)</vs-button>

            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="bulkAddAllEqp()" icon-pack="feather"
              icon="icon-edit">Business Rule (Bulk Add New)</vs-button>

            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopupEquipmentDelete"
              icon-pack="feather" icon="icon-edit">Business Rule (Bulk Equipment Delete to Store)</vs-button>

            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="openBusinessRule" icon-pack="feather"
              icon="icon-edit">Business Rule View (Eqp Parameter)</vs-button>


            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="exportCSV" icon-pack="feather"
              icon="icon-edit">Export To CSV</vs-button>




            <!-- <vs-button color="dark" type="gradient" @click="addDataSidebar"  icon-pack="feather" icon="icon-plus-square">Assign Cost Centre</vs-button>
            <vs-button color="primary" type="gradient" @click="addDataSidebar"  icon-pack="feather" icon="icon-plus-square">Assign Master Group</vs-button> -->
            <!-- ITEMS PER PAGE -->
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
                    famsdata.length - currentPage * itemsPerPage > 0
                    ? currentPage * itemsPerPage
                    : famsdata.length
                  }}
                  of {{ famsdata.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <vs-th sort-key="Registration">Registration</vs-th>
            <vs-th sort-key="Description">Description</vs-th>
            <vs-th sort-key="tag">tag</vs-th>
            <vs-th sort-key="Measurement">Measurement</vs-th>
            <vs-th sort-key="Rebate">Rebate</vs-th>
            <!-- <vs-th sort-key="Capacity">max-Litres</vs-th> -->
            <vs-th sort-key="GPSImei">GPSImei</vs-th>
            <vs-th sort-key="CostCentre">CostCentre</vs-th>
            <vs-th sort-key="MasterGroup">MasterGroup</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{ data }">
            <vs-tr>
              <vs-td></vs-td>
              <vs-td>
                <vs-input v-model="eqpRegistration" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="eqpDescription" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="eqpTag" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="eqpMeasurement" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="eqpRebate" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="eqpGPSImei" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="eqpCostCentre" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="eqpMasterGroup" class="w-full" />
              </vs-td>
              <vs-td></vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td :data="tr.allocationType.groupName">{{tr.allocationType.groupName}}</vs-td> -->
              <vs-td :data="tr.registration">{{ tr.registration }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
              <vs-td :data="tr.equipmentMeasurementName">{{
                tr.equipmentMeasurementName
              }}</vs-td>
              <vs-td :data="tr.equipmentRebateName">{{
                tr.equipmentRebateName
              }}</vs-td>
              <!-- <vs-td :data="tr.maxLitres">{{ tr.maxLitres }}</vs-td> -->
              <vs-td :data="tr.int.integrationImei">{{
                tr.int.integrationImei
              }}</vs-td>
              <vs-td :data="tr.ec.costCentreName">{{
                tr.ec.costCentreName
              }}</vs-td>
              <vs-td :data="tr.em.masterGroupName">{{
                tr.em.masterGroupName
              }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap flex-right">
                <vx-tooltip text="Add New Parameter" style="display: flex;">
                  <feather-icon icon="FilePlusIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="newEquipmentPerStore(tr)" />
                </vx-tooltip>
                <vx-tooltip text="Complete Tracking Information" style="display: flex;">
                  <feather-icon icon="MapPinIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="showStatusPromptIntegration(tr)" />
                </vx-tooltip>
                <vx-tooltip text="Edit Equipment">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDataSidebar(tr)" />
                </vx-tooltip>
                <vx-tooltip text="Edit Equipment Detail">
                  <feather-icon icon="SettingsIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDataDetailSidebar(tr)" />
                </vx-tooltip>
                <vx-tooltip text="Delete Equipment">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    @click.stop="deleteGrid(tr)" />
                </vx-tooltip>
                <vx-tooltip text="Generate QR Code">
                  <feather-icon icon="GridIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    @click.stop="generateQR(tr)" />
                </vx-tooltip>

              </vs-td>

              <template class="expand-user" slot="expand">
                <div class="con-expand-users w-full">
                  <div>
                    <!-- Permissions -->
                    <vx-card class="mt-base" no-shadow card-border>
                      <div>
                        <vs-table ref="gridTable2" class="vs-con-loading__container" v-model="selected" search
                          :data="tr.eps">
                          <div slot="header" class="
                              flex flex-wrap-reverse
                              items-center
                              flex-grow
                              mb-2
                            ">
                            <vs-button class="rounded-lg mr-2" color="success" @click="newEquipmentPerStore(tr)"
                              icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
                          </div>
                          <template slot="thead">
                            <vs-th>Action</vs-th>
                            <vs-th>Dwn</vs-th>
                            <vs-th>store</vs-th>
                            <vs-th>Tag</vs-th>
                            <vs-th>ReqDriver</vs-th>
                            <vs-th>ReqFuelA</vs-th>
                            <vs-th>ReqAuth</vs-th>
                            <vs-th>ReqKM</vs-th>
                            <vs-th>ReqHrs</vs-th>
                            <vs-th>ReqAlloc</vs-th>
                            <vs-th>ReqManual</vs-th>
                            <vs-th>ReqJobOrd</vs-th>
                            <vs-th>ReqTankNoz</vs-th>
                            <vs-th>Prod1</vs-th>
                            <vs-th>Maxltr1</vs-th>
                            <vs-th>Prod2</vs-th>
                            <vs-th>Maxltr2</vs-th>
                          </template>
                          <!-- visible: false -->
                          <template slot-scope="{ data }">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                              <vs-td id="expandIconContainer" class="whitespace-no-wrap">
                                <vx-tooltip class="flex" text="Save Equipment parameter">
                                  <feather-icon icon="SaveIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                                    @click.stop="updatePerEquipmentStore(tr)" />
                                </vx-tooltip>
                                <vx-tooltip class="flex" text="Delete Equipment Parameter">
                                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                    class="ml-2" @click.stop="DeletePerEquipmentStore(tr)" />
                                </vx-tooltip>
                                <vx-tooltip class="flex" text="Copy Equipment Parameter">
                                  <feather-icon icon="CopyIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                    class="ml-2" @click.stop="copyToAll(tr)" />
                                </vx-tooltip>

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
                              <vs-td :data="tr.storeName">{{
                                tr.storeName
                              }}</vs-td>
                              <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>

                              <vs-td :data="tr.requireDriverDesc">
                                <vs-button class="rounded-lg" color="danger" size="small" v-model="selected"
                                  @click="showStatusPromptDriver(tr)">{{ tr.requireDriverDesc }}</vs-button>
                              </vs-td>

                              <vs-td :data="tr.requireOperatorDesc">
                                <vs-button class="rounded-lg" color="danger" size="small" v-model="selected"
                                  @click="showStatusPromptFuelAttendant(tr)">{{ tr.requireOperatorDesc }}</vs-button>
                              </vs-td>

                              <vs-td :data="tr.requireAuthentication"><vs-checkbox
                                  v-model="tr.requireAuthentication" /></vs-td>
                              <vs-td :data="tr.requireKM"><vs-checkbox v-model="tr.requireKM" /></vs-td>
                              <vs-td :data="tr.requireHours"><vs-checkbox v-model="tr.requireHours" /></vs-td>
                              <vs-td :data="tr.requireAllocation">
                                <vs-button class="rounded-lg" color="rgb(62, 201, 214)" size="small" v-model="selected"
                                  @click="showStatusPromptAllocation(tr)">{{ tr.allocation }}</vs-button>
                              </vs-td>
                              <vs-td :data="tr.requireManual">
                                <vs-button class="rounded-lg" color="rgb(187, 138, 200)" size="small" v-model="selected"
                                  @click="showStatusPromptManual(tr)">{{ tr.manual }}</vs-button>
                              </vs-td>

                              <vs-td :data="tr.requireJobOrder"><vs-checkbox v-model="tr.requireJobOrder" /></vs-td>
                              <vs-td :data="tr.requireTankNozzle"><vs-checkbox v-model="tr.requireTankNozzle" /></vs-td>
                              <vs-td :data="tr.product1"><vs-checkbox v-model="tr.product1" /></vs-td>
                              <vs-td>
                                <vs-input-number v-model="tr.maxlitres1" :step="5" /></vs-td>
                              <vs-td :data="tr.product2"><vs-checkbox v-model="tr.product2" /></vs-td>
                              <vs-td v-if="tr.product2">
                                <vs-input-number v-model="tr.maxlitres2" :step="5" /></vs-td>
                              <vs-td v-else :data="tr.maxlitres2">{{
                                tr.maxlitres2
                              }}</vs-td>

                              <vs-popup title="Confirm Delete" :active.sync="popupActive">
                                <div class="vx-col md:w-full w-full mt-5">
                                  <label class="w-full">Are you sure you want to delete current
                                    equipment from store</label>
                                  <vs-button ref="saveButton" class="
                                      rounded-lg
                                      mr-3
                                      vs-con-loading__container
                                    " color="success" type="border" @click="deleteEquipment()">Yes
                                  </vs-button>
                                  <vs-button class="rounded-lg mr-3" color="warning" type="border"
                                    @click="closePopup()">No
                                  </vs-button>
                                </div>
                              </vs-popup>
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
    <vs-prompt ref="statusPrompt" title="Select item" acceptText="Update Eqp" cancelText="Cancel"
      @cancel="dropdownSelect = 0" @accept="populateDataClickManual" :active.sync="statusPromptActive">
      <div class="con-exemple-prompt">
        <div>
          <label>Equipment Manual information</label>
          <v-select placeholder="select type" :options="DropdownData" v-model="dropdownSelect"></v-select>
        </div>
      </div>
    </vs-prompt>

    <vs-prompt ref="statusPrompt" title="Select item" acceptText="Submit" cancelText="Cancel"
      @cancel="dropdownSelectDriver = 0" @accept="populateDataClickDriver" :active.sync="statusPromptActiveDriver">
      <div class="con-exemple-prompt">
        <div>
          <label>Equipment Driver information</label>
          <v-select placeholder="select type" :options="DropdownDataDriver" v-model="dropdownSelectDriver"></v-select>
        </div>
      </div>
    </vs-prompt>

    <vs-prompt ref="statusPrompt" title="Select item" acceptText="Submit" cancelText="Cancel"
      @cancel="dropdownSelectFuelAttendant = 0" @accept="populateDataClickFuelAttendant"
      :active.sync="statusPromptActiveFuelAttendant">
      <div class="con-exemple-prompt">
        <div>
          <label>Equipment Fuel Attendant information</label>
          <v-select placeholder="select type" :options="DropdownDataFuelAttendant"
            v-model="dropdownSelectFuelAttendant"></v-select>
        </div>
      </div>
    </vs-prompt>

    <!-- This prompt is called to update expanding equipment allocation -->
    <vs-prompt ref="statusPrompt" title="Select/Update Allocation requirement" acceptText="Submit" cancelText="Cancel"
      @cancel="allocationSelect = 0" @accept="populateDataClickAllocation" :active.sync="statusPromptActiveAllocation">
      <div class="con-exemple-prompt">
        <div>
          <label>Equipment Allocation information</label>
          <v-select placeholder="select type" :options="allocationData" v-model="allocationSelect"></v-select>
        </div>
      </div>
    </vs-prompt>

    <vs-prompt ref="statusPromptTracking" title="Complete Tracking Information" acceptText="Submit" cancelText="Cancel"
      @cancel="int.perIntegrationAccountID = 0" @accept="AddUpdateIntegration"
      :active.sync="statusPromptActiveIntegration">
      <div class="con-exemple-prompt">
        <div>
          <label>Assign Equipment to Tracking device</label>
          <v-select placeholder="select type" :options="IntegrationDropdownData"
            v-model="int.perIntegrationAccountID"></v-select>
        </div>

        <div class="vx-col">
          <span>Device Description</span>
          <vs-input placeholder="Device Description" v-model="int.integrationName" class="w-full"
            name="IntegrationName" />
        </div>

        <div class="vx-col">
          <span>Tacking Device UID</span>
          <vs-input placeholder="Device UID" v-model="int.integrationUID" class="w-full" name="integrationUID" />
        </div>

        <div class="vx-col">
          <span>Tracking Device Imei</span>
          <vs-input placeholder="Device Imei" v-model="int.integrationImei" class="w-full" name="integrationImei" />
        </div>
        <br />
        <div class="vx-col">
          <span>GPS Odometer/ hours (No | Yes):</span>
          <vs-switch class="rounded-pill" color="success" v-model="int.integrationGpsinterface"></vs-switch>
        </div>

        <div class="vx-col">
          <span>Canbus Odometer/ hours (No | Yes):</span>
          <vs-switch class="rounded-pill" color="success" v-model="int.integrationCanbusInterface"></vs-switch>
        </div>

        <div class="vx-col">
          <span>Enable (No | Yes):</span>
          <vs-switch class="rounded-pill" color="success" v-model="int.integrationEnable"></vs-switch>
        </div>
      </div>
    </vs-prompt>
    <vs-popup title="Assign Equipment to Store (copy from existing store to store)" :active.sync="popupAssignStoreActive">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">From Store</label>
          <v-select placeholder="Select From Store" :options="storesFromData" v-model="fromStore"></v-select>
        </div>
        <div class="m-2">
          <label class="w-full">To Store</label>
          <v-select placeholder="Select To Store" :options="storesToData" v-model="toStore"></v-select>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="AssignEqpToStore()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>
    <vs-popup title="Assign Equipment to Store (new store)" :active.sync="popupAssignStoreActiveEquipment">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">Store</label>
          <v-select placeholder="Bulk assign equipment to Store (new)" :options="storesFromData"
            v-model="fromStore"></v-select>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="AssignEqpToStoreNew()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>

    <vs-popup title="Delete Business rules from store (Equipment Parameters)"
      :active.sync="popupAssignStoreActiveEquipmentDelete">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">Store</label>
          <v-select placeholder="Bulk delete equipment from Store" :options="storesFromData"
            v-model="fromStore"></v-select>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="DeleteEqpToStore()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>
    <vs-popup title="Equipment QR Code" :active.sync="popupGenerateQR">
      <div class="vx-col md:w-full w-full mb-5">
        <div id="qrCode" ref="qrCode" name="qrCode" class="m-1/2 md-full ml-3">
          <label class="w-full">Registration: {{ qrRegistration }}</label>
          <br/>
          <div class="vx-row px-4 pb-3">
            <qr-code :size="100" :text="eqpQR"></qr-code>
          </div>
          <div class="vx-row px-4 pb-3" style="flex-flow: column;">
            <p><a style="color: black;" href="https://shop.fams.co.za/" target="_blank" class="w-full mt-3 mr-3">https://shop.fams.co.za/</a></p>
            <span style="white-space: pre;"></span>
            <p><a style="color: black;" href="https://www.fams.co.za" target="_blank" class="w-full mt-3 mb-3 mr-3">https://www.fams.co.za/</a></p>
          </div>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="printQR()">Print QR
        </vs-button>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="saveQR()">Save QR
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeQRPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import equipmentSidebar from "./EquipmentSidebar.vue";
import bulkEquipmentParameterSidebar from "./BulkEquipmentParameterSidebar.vue";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { Validator } from "vee-validate"; // For custom error message
import { toArray } from "@amcharts/amcharts4/.internal/core/utils/Iterator";
import VueQRCodeComponent from 'vue-qrcode-component';
import html2canvas from 'html2canvas';

const dict = {
  custom: {
    first_name: {
      required: "First name is required",
      alpha: "First name may only contain alphabetic characters",
    },
  },
};

Validator.localize("en", dict);

export default {
  data() {
    return {
      title: "FAMS - new Equipment Wizard!!",
      subtitle: "Please complete each tab to add new equipment",
      equipmentRebateSelect: 0,
      equipmentRebateData: [],

      EquipmentMeasurementSelect: 0,
      EquipmentMeasurementData: [],

      equipmentTypeSelect: 0,
      equipmentTypeData: [],

      masterequipmentSelect: 0,
      masterequipmentData: [],

      costcentreSelect: 0,
      costcentreData: [],

      assetsSelect: 0,
      assetsData: [],

      isListHidden: false,
      isInfoHidden: true,
      isInfoHiddenEquipmentparameters: true,

      DropdownData: [],
      DropdownDataDriver: [],
      DropdownDataFuelAttendant: [],
      dropdownSelect: 0,
      dropdownSelectDriver: 0,
      dropdownSelectFuelAttendant: 0,
      selected: null,
      selectedDriver: null,

      storesFromData: [],
      storesToData: [],
      IntegrationDropdownData: [],
      Integrationselected: { value: 0, label: "Search / Select Integration" },
      int: {
        integrationID: 0,
        integrationEqpID: 0,
        integrationImei: "",
        integrationUID: "",
        integrationName: "",
        perIntegrationAccountID: 0,
        integrationEnable: 1,
        integrationGpsinterface: 1,
        integrationCanbusInterface: 0,
      },

      allocationSelect: { value: 0, label: "Search / Select Allocation" },
      allocationData: [],

      itemsPerPage: 10,
      equipmentSidebar: false,
      bulkEquipmentParameterSidebar: false,

      famsdata: [],
      famsdataBusinessRule: [],
      sidebarData: {},
      isMounted: false,
      formDataEqp: {
        Id: 0,
        accountId: 0,
        name: "",
        registration: "",
        equipmentMeasurementId: 1,
        equipmentMeasurement: "",
        tag: "0000000000",
        maxLitres: 1000,
        enable: 0,
        consumption: 0,
        equipmentRebateId: 0,
        equipmentRebate: "",
        CID: 0,
        CCName: "",
        assetId: 0,
        assetName: "",
        MEName: "",
        MEID: 0,
        equipmentTypeId: 0,
        equipmentType: "",
        consumption: 1,
        enable: true,
        equipmentOwnerID: 0,
        equipmentOEMID: 0,
        equipmentModelID: 0,
        equipmentLocationID: 0,
        equipmentCategoryID: 0,

      },

      pes: {
        id: 0,
        storeId: 0,
        storeEquipmentID: 0,
        storeName: "",
        equipment: "",
        tag: "0000000000",
        requireDriver: 0,
        requireDriverDesc: "",
        requireOperator: 0,
        requireOperatorDesc: "",
        requireAuthentication: false,
        requireKM: false,
        requireHours: false,
        requireAllocation: 0,
        requireManual: 0,
        requireJobOrder: false,
        product1: false,
        maxlitres1: 1000,
        product2: false,
        maxlitres2: 0,
        product3: false,
        maxlitres3: 0,
        product4: false,
        maxlitres4: 0,
        product5: false,
        maxlitres5: 0,
        product6: false,
        maxlitres6: 0,
        download: true,
        blacklist: false,
        requireTankNozzle: false,
        upload: false,
      },
      statusPromptActive: false,
      statusPromptActiveAllocation: false,
      statusPromptActiveIntegration: false,
      statusPromptActiveDriver: false,
      statusPromptActiveFuelAttendant: false,
      manaulselect: 0,
      showMore: false,

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
      licenseTypeData: [],
      licenseTypeSelect: { value: 0, label: "Search / Select License Type" },
      popupActive: false,
      equipmentToDeleteFromStore: {},
      bulkEdit: false,
      sidebarParameterData: {},
      popupAssignStoreActive: false,
      popupAssignStoreActiveEquipment: false,
      popupAssignStoreActiveEquipmentDelete: false,
      // fromStore: 0,
      fromStore: { value: 0, label: "Search / Select FROM Store" },
      toStore: { value: 0, label: "Search / Select TO Store" },
      //toStore: 0,
      addPerEquipmentStoreData: {},
      originalBusinessRules: [],
      originalList: [],
      queryStore: "",
      queryRegistration: "",
      queryTag: "",
      queryDriver: "",
      queryOperator: "",
      queryAuthentication: "",
      queryKM: "",
      queryHours: "",
      queryDwn: "",
      eqpRegistration: "",
      eqpDescription: "",
      eqpTag: "",
      eqpMeasurement: "",
      eqpRebate: "",
      eqpGPSImei: "",
      eqpCostCentre: "",
      eqpMasterGroup: "",
      tagDropdown: [],
      tagSelected: 0,
      popupGenerateQR: false,
      eqpQR: '',
      qrRegistration: '',
      equipmentOemData: [],
      equipmentCategoryData: [],
      equipmentLocationData: [],
      equipmentModelData: [],
      equipmentOwnerData: [],
      equipmentOemSelect: 0,
      equipmentLocationSelect: 0,
      equipmentCategorySelect: 0,
      equipmentModelSelect: 0,
      equipmentOwnerSelect: 0,

    };
  },
  components: {
    flatPickr,
    equipmentSidebar,
    bulkEquipmentParameterSidebar,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    qrCode: VueQRCodeComponent,
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
    queryRegistration(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.equipment.toLowerCase().indexOf(val.toLowerCase()) > -1;
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
          return item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryDriver(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.requireDriverDesc.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryOperator(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.requireOperatorDesc.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryAuthentication(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.requireAuthentication == parseInt(val);
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryKM(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.requireKM == parseInt(val);
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryHours(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.requireHours == parseInt(val);
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryDwn(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.download == parseInt(val);
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    eqpRegistration(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.registration.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
    eqpDescription(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
    eqpTag(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
    eqpMeasurement(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.equipmentMeasurementName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
    eqpRebate(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.equipmentRebateName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
    eqpGPSImei(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.int.integrationImei.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
    eqpCostCentre(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.ec.costCentreName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
    eqpMasterGroup(val) {
      var self = this;

      if (val != "") {
        self.famsdata = self.originalList.filter(item => {
          return item.em.masterGroupName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdata;
      }
      else {
        self.famsdata = self.originalList;
      }
    },
  },
  mounted() {
    this.GetGrid();
    this.GetGridPerEquipmentStoreManual();
    this.GetGridPerEquipmentStoreAllocation();
    this.GetDropdownLicenseType();
    this.GetDropdownIntegration();
    this.GeStoresDropdown();
    this.GetPerEquipmentStoreFuelAttendantTypedropdown();
    this.GetPerEquipmentStoreDriverTypedropdown();
    this.GetTags();
    this.GetOEM();
    this.GetCategory();
    this.GetLocation();
    this.GetModel();
    this.GetOwner();
    this.isMounted = true;
  },
  methods: {
    nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        if (e.which === 32) { }
        else e.preventDefault();
      }
    },
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-1").then((result) => {
          if (result) {
            resolve(true);
          } else {
            this.ValidateNotify();
            reject("correct all values");
          }
        });
      });
    },

    populateDataCostCentre() {
      var self = this;
      if (self.costcentreSelect) {
        self.formDataEqp.CID = self.costcentreSelect.value;
        self.formDataEqp.CCName = self.costcentreSelect.label;
      }
    },

    populateAssetsData() {
      var self = this;
      if (self.assetsSelect) {
        self.formDataEqp.assetId = self.assetsSelect.value;
        self.formDataEqp.assetName = self.assetsSelect.label;
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
        self.formDataEqp.equipmentMeasurementId =
          self.EquipmentMeasurementSelect.value;
        self.formDataEqp.equipmentMeasurement =
          self.EquipmentMeasurementSelect.label;

        if (self.EquipmentMeasurementSelect.label == "Hours") {
          self.pes.requireHours = true;
          self.pes.requireKM = false;
        } else if (self.EquipmentMeasurementSelect.label == "KM") {
          self.pes.requireHours = false;
          self.pes.requireKM = true;
        }
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
      self.$refs.wizard.navigateToTab(0);
      self.IntegrationID = 0;
      self.formDataEqp.Id = 0;
      self.formDataEqp.accountId = localStorage.getItem("userAccountId");
      self.formDataEqp.name = "";
      self.formDataEqp.registration = "";
      self.formDataEqp.equipmentMeasurementId = 1;
      self.formDataEqp.equipmentMeasurement = "";
      self.formDataEqp.tag = "0000000000";
      self.formDataEqp.maxLitres = 1000;
      self.formDataEqp.enable = 1;
      self.formDataEqp.consumption = 0;
      self.formDataEqp.equipmentRebateId = 0;
      self.formDataEqp.equipmentRebate = "";
      self.formDataEqp.CID = 0;
      self.formDataEqp.CCName = "";
      self.formDataEqp.assetId = 0;
      self.formDataEqp.assetName = "";
      self.formDataEqp.MEName = "";
      self.formDataEqp.MEID = 0;
      self.formDataEqp.equipmentTypeId = 0;
      self.formDataEqp.equipmentType = "";
      self.formDataEqp.consumption = 1;
      self.formDataEqp.enable = true;

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
      self.equipmentDetail.licenseExpiryDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.equipmentDetail.serviceDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.equipmentDetail.odometerReadingDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      self.EquipmentMeasurementSelect = 0;
      self.equipmentTypeSelect = 0;
      self.masterequipmentSelect = 0;
      self.costcentreSelect = 0;
      self.equipmentRebateSelect = 0;
      self.dropdownSelect = 0;
      self.dropdownSelectDriver = 0;
      self.dropdownSelectFuelAttendant = 0;
      self.allocationSelect = 0;
      self.selected = 0;
      self.selectedDriver = 0;
      self.pes.id = 0;
      self.pes.storeId = 0;
      self.pes.storeEquipmentID = 0;
      self.pes.requireDriver = 0;
      self.pes.requireDriverDesc = "";
      self.pes.requireOperator = 0;
      self.pes.requireOperatorDesc = "";
      self.pes.requireAuthentication = false;
      self.pes.requireKM = false;
      self.pes.requireHours = false;
      self.pes.requireAllocation = 0;
      self.pes.requireManual = 0;
      self.pes.requireJobOrder = false;
      self.pes.product1 = true;
      self.pes.maxlitres1 = 1000;
      self.pes.product2 = false;
      self.pes.maxlitres2 = 0;
      self.pes.product3 = false;
      self.pes.maxlitres3 = 0;
      self.pes.product4 = false;
      self.pes.maxlitres4 = 0;
      self.pes.product5 = false;
      self.pes.maxlitres5 = 0;
      self.pes.product6 = false;
      self.pes.maxlitres6 = 0;
      self.pes.download = true;
      self.pes.blacklist = false;
      self.pes.requireTankNozzle = false;
      self.pes.upload = false;

      self.int.perIntegrationAccountID = 0;
      self.int.integrationEqpID = 0;
      self.int.integrationImei = "";
      self.int.integrationUID = "";
      self.int.integrationName = "";
      self.int.integrationEnable = 1;

      self.int.integrationGpsinterface = 1;
      self.int.integrationCanbusInterface = 0;

      self.equipmentToDeleteFromStore = {};
      self.bulkEdit = false;
    },
    cancelAdd() {
      (this.isListHidden = false), (this.isInfoHidden = true);
      this.isInfoHiddenEquipmentparameters = true;
      this.initValues();
      this.GetGrid();
    },
    addVue() {
      this.initValues();
      this.GetDropdownCostCentre();
      this.GetDropdownAsset();
      this.GetDropdownMasterEquipment();
      this.GetDropdownEquipmentType();
      this.GetDropdownequipmentMeasurement();
      this.GetDropdownequipmentRebate();
      // this.GetOEM();
      // this.GetCategory();
      // this.GetLocation();
      // this.GetModel();
      // this.GetOwner();
      this.isInfoHidden = false;
      this.isListHidden = true;
      this.isInfoHiddenEquipmentparameters = true;
      // this.$refs.wizard.navigateToTab(0)
    },
    populatedropdownAllocation() {
      var self = this;
      if (self.allocationSelect) {
        self.pes.requireAllocation = self.allocationSelect.value;
      }
    },

    //This has to do with the wizard
    populatedropdownManual() {
      var self = this;
      if (self.dropdownSelect) {
        self.pes.requireManual = self.dropdownSelect.value;
      }
    },

    //This will fire once we have selected the prompt dropdown option
    populateDataClickDriver() {
      var self = this;
      if (self.dropdownSelectDriver) {
        self.selected.requireDriverDesc = self.dropdownSelectDriver.label;
        self.selected.requireDriver = self.dropdownSelectDriver.value;
        self.pes.requireDriver = self.dropdownSelectDriver.value;
      }
    },

    //This will fire once we have selected the prompt dropdown option
    populateDataClickFuelAttendant() {
      var self = this;
      if (self.dropdownSelectFuelAttendant) {
        self.selected.requireOperatorDesc =
          self.dropdownSelectFuelAttendant.label;
        self.selected.requireOperator = self.dropdownSelectFuelAttendant.value;
        self.pes.requireOperator = self.dropdownSelectFuelAttendant.value;
      }
    },

    // This function is called when the update allocation prompt update button is clicked
    populateDataClickAllocation() {
      var self = this;
      if (self.allocationSelect) {
        self.selected.requireAllocation = self.allocationSelect.value;
        self.selected.allocation = self.allocationSelect.label;
      }
    },
    //This function is called when equipment is expand and want to change allocation
    showStatusPromptAllocation(data) {
      var self = this;
      self.allocationSelect = self.allocationData.filter(function (item) {
        return item.value == data.requireAllocation;
      })[0];
      self.statusPromptActiveAllocation = true;
    },

    showStatusPromptIntegration(data) {
      var self = this;
      self.int.perIntegrationAccountID = self.IntegrationDropdownData.filter(
        function (item) {
          return item.value == data.int.perIntegrationAccountID;
        }
      )[0];
      self.int.integrationName = data.int.integrationName;
      self.int.integrationEqpID = data.id;
      self.int.integrationImei = data.int.integrationImei;
      self.int.integrationUID = data.int.integrationUID;
      self.int.integrationID = data.int.integrationID;

      if (data.int.integrationEnable == true) self.int.integrationEnable = 1;
      else self.int.integrationEnable = 0;

      if (data.int.integrationGpsinterface == true)
        self.int.integrationGpsinterface = 1;
      else self.int.integrationGpsinterface = 0;

      if (data.int.integrationCanbusInterface == true)
        self.int.integrationCanbusInterface = 1;
      else self.int.integrationCanbusInterface = 0;

      self.statusPromptActiveIntegration = true;
    },

    //this has to do with the editing
    populateDataClickManual() {
      var self = this;
      if (self.dropdownSelect) {
        self.selected.requireManual = self.dropdownSelect.value;
        self.selected.manual = self.dropdownSelect.label;
      }
    },
    showStatusPromptManual(data) {
      var self = this;
      self.dropdownSelect = self.DropdownData.filter(function (item) {
        return item.value == data.requireManual;
      })[0];
      self.statusPromptActive = true;
    },

    //This will show once we select the button popup the dropdown option
    showStatusPromptDriver(data) {
      var self = this;
      self.dropdownSelectDriver = self.DropdownDataDriver.filter(function (
        item
      ) {
        return item.value == data.requireDriver;
      })[0];
      self.statusPromptActiveDriver = true;
    },

    //This will show once we select the button popup the dropdown option
    showStatusPromptFuelAttendant(data) {
      var self = this;
      self.dropdownSelectFuelAttendant = self.DropdownDataFuelAttendant.filter(
        function (item) {
          return item.value == data.requireOperator;
        }
      )[0];
      self.statusPromptActiveFuelAttendant = true;
    },

    successNotifyLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully loaded",
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
    FailedNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Item not added",
        color: "danger",
      });
    },
    ValidateNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Please ensure all the fields are completed",
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
    addDataSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editDataSidebar(data) {
      var self = this;
      if(data.equipmentOEMID && data.equipmentOEMID > 0){
        data.oemLabel = self.equipmentOemData.filter(function (item) {
          return item.value == data.equipmentOEMID;
        })[0].label;
      }
      else{
        data.oemLabel = "";
      }

      if(data.equipmentLocationID && data.equipmentLocationID > 0){
        data.locationLabel = self.equipmentLocationData.filter(function (item) {
          return item.value == data.equipmentLocationID;
        })[0].label;
      }
      else{
        data.locationLabel = "";
      }

      if(data.equipmentCategoryID && data.equipmentCategoryID > 0){
        data.categoryLabel = self.equipmentCategoryData.filter(function (item) {
          return item.value == data.equipmentCategoryID;
        })[0].label;
      }
      else{
        data.categoryLabel = "";
      }

      if(data.equipmentModelID && data.equipmentModelID > 0){
        data.modelLabel = self.equipmentModelData.filter(function (item) {
          return item.value == data.equipmentModelID;
        })[0].label;
      }
      else{
        data.modelLabel = "";
      }

      if(data.equipmentOwnerID && data.equipmentOwnerID > 0){
        data.ownerLabel = self.equipmentOwnerData.filter(function (item) {
          return item.value == data.equipmentOwnerID;
        })[0].label;
      }
      else{
        data.ownerLabel = "";
      }

      self.sidebarData = data;
      self.sidebarData.showMore = false;
      self.toggleDataSidebar(true);
    },
    editDataDetailSidebar(data) {
      this.sidebarData = data;
      this.sidebarData.showMore = true;
      this.toggleDataSidebar(true);
    },

    //********************* SQL events */
    //update
    Bool2Int(data) {
      if (data == false) return 0;
      else if (data === true) return 1;
      else return data;
    },
    formSubmitted() {
      var self = this;
      var myobject = {};
      myobject.Id = 0;
      myobject.AccountId = self.formDataEqp.accountId;
      myobject.Name = self.formDataEqp.name;
      myobject.Registration = self.formDataEqp.registration;

      if (self.tagSelected && self.tagSelected.label == undefined) {
        self.formDataEqp.tag = self.tagSelected;
      }
      else if (self.tagSelected.label) {
        self.formDataEqp.tag = self.tagSelected.label;
      }

      myobject.Tag = self.formDataEqp.tag;
      myobject.MaxLitres = self.pes.maxlitres1;
      myobject.Enable = true;
      myobject.Consumption = self.formDataEqp.consumption;
      myobject.EquipmentTypeId = self.formDataEqp.equipmentTypeId;
      myobject.EquipmentMeasurementId = self.formDataEqp.equipmentMeasurementId;
      myobject.EquipmentRebateId = self.formDataEqp.equipmentRebateId;
      myobject.PerEquipmentStoreId = 0;
      if (self.formDataEqp.CID === undefined)
        myobject.PerEquipmentCostCentreId = "";
      else myobject.PerEquipmentCostCentreId = self.formDataEqp.CID;
      if (self.formDataEqp.assetId === undefined)
        myobject.EquipmentAssetId = "";
      else myobject.EquipmentAssetId = self.formDataEqp.assetId;
      if (self.formDataEqp.MEID === undefined)
        myobject.PerEquipmentMasterGroupId = "";
      else myobject.PerEquipmentMasterGroupId = self.formDataEqp.MEID;

      myobject.StoreId = 0;
      myobject.RequireDriver = self.dropdownSelectDriver.value;//self.pes.requireDriver;// == true ? 1 : 0;
      myobject.RequireOperator = self.dropdownSelectFuelAttendant.value;//self.pes.requireOperator;// == true ? 1 : 0;
      myobject.RequireAuthentication = self.pes.requireAuthentication == true ? 1 : 0;
      myobject.RequireKm = self.pes.requireKM == true ? 1 : 0;
      myobject.RequireHours = self.pes.requireHours == true ? 1 : 0;
      myobject.RequireAllocation = self.pes.requireAllocation;
      myobject.RequireManual = self.pes.requireManual;
      myobject.RequireTankNozzle = self.pes.requireTankNozzle == true ? 1 : 0;
      myobject.RequireJobOrder = self.pes.requireJobOrder == true ? 1 : 0;
      myobject.Blacklist = self.pes.blacklist == true ? 1 : 0;
      myobject.Product1 = self.pes.product1 == true ? 1 : 0;
      myobject.Maxlitres1 = self.pes.maxlitres1;
      myobject.Product2 = self.pes.product2 == true ? 1 : 0;
      myobject.Maxlitres2 = self.pes.maxlitres2;
      myobject.Download = self.pes.download == true ? 1 : 0;
      myobject.Product3 = self.pes.product3 == true ? 1 : 0;
      myobject.Maxlitres3 = 0;
      myobject.Product4 = self.pes.product4 == true ? 1 : 0;
      myobject.Maxlitres4 = 0;
      myobject.Product5 = self.pes.product5 == true ? 1 : 0;
      myobject.Maxlitres5 = 0;
      myobject.Product6 = self.pes.product6 == true ? 1 : 0;
      myobject.Maxlitres6 = 0;
      myobject.Upload = self.pes.upload == true ? 1 : 0;

      myobject.vin = self.equipmentDetail.vin;
      myobject.engineNumber = self.equipmentDetail.engineNumber;
      myobject.seriesName = self.equipmentDetail.seriesName;
      myobject.licenseTypeId = self.equipmentDetail.licenseTypeId;
      myobject.license = self.equipmentDetail.license;
debugger
      var date = new Date();
      myobject.licenseExpiryDate = self.equipmentDetail.licenseExpiryDate || new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );;
      myobject.serviceInterval = self.equipmentDetail.serviceInterval || 0;
      myobject.serviceDate = self.equipmentDetail.serviceDate || new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );;
      myobject.odometerReading = self.equipmentDetail.odometerReading || 0;
      myobject.odometerReadingDate = self.equipmentDetail.odometerReadingDate || new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );;
      myobject.owner = self.equipmentDetail.owner;
      myobject.assignedDriver = self.equipmentDetail.assignedDriver;
      myobject.burnRateHigh = self.equipmentDetail.burnRateHigh || 0;
      myobject.burnRateLow = self.equipmentDetail.burnRateLow || 0;

      myobject.equipmentOwnerID = self.formDataEqp.equipmentOwnerID;
      myobject.equipmentOEMID = self.formDataEqp.equipmentOEMID;
      myobject.equipmentModelID = self.formDataEqp.equipmentModelID;
      myobject.equipmentLocationID = self.formDataEqp.equipmentLocationID;
      myobject.equipmentCategoryID = self.formDataEqp.equipmentCategoryID;

      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        (self.isListHidden = false), (self.isInfoHidden = true);
        self.isInfoHiddenEquipmentparameters = true;
        self.initValues();
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxPost(self, "Equipments", myobject, onSuccess, onFinally);
    },
    deleteEquipment() {
      const self = this;
      var onSuccess = function (response) {
        self.initValues();
      };
      var onFinally = function () {
        self.GetGridBusinessRules();
        self.closePopup();
      };
      self.$ajaxDelete(
        self,
        "PerEquipmentStores/" + self.equipmentToDeleteFromStore.perId,
        onSuccess,
        onFinally
      );
    },
    DeletePerEquipmentStore(data) {
      this.equipmentToDeleteFromStore = data;
      this.popupActive = true;
    },

    AddUpdateIntegration() {
      const self = this;
      var myobject = {};
      (myobject.Id = self.int.integrationID),
        (myobject.AccountId = localStorage.getItem("userAccountId"));
      (myobject.Name = self.int.integrationName),
        (myobject.EquipmentId = self.int.integrationEqpID),
        (myobject.PerIntegrationAccountId =
          self.int.perIntegrationAccountID.value),
        (myobject.Uid = self.int.integrationUID),
        (myobject.Imei = self.int.integrationImei),
        (myobject.Enable = self.int.integrationEnable);
      myobject.Gpsinterface = self.int.integrationGpsinterface;
      myobject.CanbusInterface = self.int.integrationCanbusInterface;

      if (self.int.integrationID == 0) {
        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

          self.GetGrid();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.gridTable.$el);
        };
        self.$ajaxPost(
          self,
          "Integration3dtracking",
          myobject,
          onSuccess,
          onFinally
        );
      } else {
        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

          self.GetGrid();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.gridTable.$el);
        };
        self.$ajaxPut(
          self,
          "Integration3dtracking/" + myobject.Id,
          myobject,
          onSuccess,
          onFinally
        );
      }
    },

    updatePerEquipmentStore(data) {
      const self = this;
      var myobject = {};
      myobject.Id = data.perId;
      myobject.StoreId = data.perStoreId;
      myobject.EquipmentID = data.perStoreEquipmentID;
      // myobject.RequireDriver = self.Bool2Int(data.requireDriver);
      myobject.RequireDriver = data.requireDriver;
      myobject.RequireOperator = data.requireOperator;
      myobject.RequireAuthentication = self.Bool2Int(
        data.requireAuthentication
      );
      myobject.RequireKM = data.requireKM == null || data.requireKM == undefined ? 0 : self.Bool2Int(data.requireKM);
      myobject.RequireHours = data.requireHours == null || data.requireHours == undefined ? 0 : self.Bool2Int(data.requireHours);
      myobject.RequireAllocation = data.requireAllocation == null || data.requireAllocation == undefined ? 0 : self.Bool2Int(data.requireAllocation);
      myobject.RequireManual = data.requireManual == null || data.requireManual == undefined ? 0 : self.Bool2Int(data.requireManual);
      myobject.RequireJobOrder = data.requireJobOrder == null || data.requireJobOrder == undefined ? 0 : self.Bool2Int(data.requireJobOrder);
      myobject.Product1 = data.product1 == null || data.product1 == undefined ? 0 : self.Bool2Int(data.product1);
      myobject.Maxlitres1 = data.maxlitres1;
      myobject.Product2 = data.product2 == null || data.product2 == undefined ? 0 : self.Bool2Int(data.product2);
      myobject.Maxlitres2 = data.maxlitres2;
      myobject.Product3 = data.product3 == null || data.product3 == undefined ? 0 : self.Bool2Int(data.product3);
      myobject.Maxlitres3 = data.maxlitres3;
      myobject.Product4 = data.product4 == null || data.product4 == undefined ? 0 : self.Bool2Int(data.product4);
      myobject.Maxlitres4 = 0;
      myobject.Product5 = data.product5 == null || data.product5 == undefined ? 0 : self.Bool2Int(data.product5);
      myobject.Maxlitres5 = 0;
      myobject.Product6 = data.product6 == null || data.product6 == undefined ? 0 : self.Bool2Int(data.product6);
      myobject.Maxlitres6 = 0;
      myobject.Download = data.download == null || data.download == undefined ? 0 : self.Bool2Int(data.download);
      myobject.Blacklist = data.blacklist == null || data.blacklist == undefined ? 0 : self.Bool2Int(data.blacklist);
      myobject.Upload = data.upload == null || data.upload == undefined ? 0 : self.Bool2Int(data.upload);
      myobject.RequireTankNozzle = data.requireTankNozzle == null || data.requireTankNozzle == undefined ? 0 : self.Bool2Int(data.requireTankNozzle);

      if (!self.isInfoHiddenEquipmentparameters) {
        self.showLoadingOnElement("gridTableBusiness", 1, "radius");
      } else {
        self.showLoadingOnElement("gridTable2", 1, "radius");
      }

      //
      var onSuccess = function (response) {
        self.successNotify();
        if (!self.isInfoHiddenEquipmentparameters) {
          self.GetGridBusinessRules();
        }
        else self.GetGrid();
      };
      var onFinally = function () {
        if (!self.isInfoHiddenEquipmentparameters) {
          self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
        } else {
          self.$vs.loading.close(self.$refs.gridTable2.$el);
        }
        // self.GetGrid();
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

      if (data.showMore) {
        var onSuccess = function (response) {
          self.GetGrid();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.gridTable.$el);
        };
        self.$ajaxPut(
          self,
          "Equipments/UpdateEqpDetail",
          data,
          onSuccess,
          onFinally
        );
      } else {
        var onSuccess = function (response) {
          self.GetGrid();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.gridTable.$el);
        };
        self.$ajaxPut(
          self,
          "Equipments/" + data.Id,
          data,
          onSuccess,
          onFinally
        );
      }
    },

    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(self, "Equipments/" + data.id, onSuccess, onFinally);
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.famsdata = response.data;
        self.originalList = response.data;

        if (self.eqpRegistration != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.registration.toLowerCase().indexOf(self.eqpRegistration.toLowerCase()) > -1;
          });
        }
        else if (self.eqpDescription != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.name.toLowerCase().indexOf(self.eqpDescription.toLowerCase()) > -1;
          });
        }
        else if (self.eqpTag != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.tag.toLowerCase().indexOf(self.eqpTag.toLowerCase()) > -1;
          });
        }
        else if (self.eqpMeasurement != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.equipmentMeasurementName.toLowerCase().indexOf(self.eqpMeasurement.toLowerCase()) > -1;
          });
        }
        else if (self.eqpRebate != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.equipmentRebateName.toLowerCase().indexOf(self.eqpRebate.toLowerCase()) > -1;
          });
        }
        else if (self.eqpGPSImei != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.int.integrationImei.toLowerCase().indexOf(self.eqpGPSImei.toLowerCase()) > -1;
          });
        }
        else if (self.eqpCostCentre != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.ec.costCentreName.toLowerCase().indexOf(self.eqpCostCentre.toLowerCase()) > -1;
          });
        }
        else if (self.eqpMasterGroup != "") {
          self.famsdata = self.originalList.filter(item => {
            return item.em.masterGroupName.toLowerCase().indexOf(self.eqpMasterGroup.toLowerCase()) > -1;
          });
        }
        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "Equipments/GetEquipment", onSuccess, onFinally);
    },

    GetGridBusinessRules() {
      const self = this;
      self.showLoadingOnElement("gridTableBusiness", 1, "radius");
      var onSuccess = function (response) {
        self.famsdataBusinessRule = response.data;
        self.originalBusinessRules = response.data;
        self.famsdataBusinessRule.forEach((item, index) => {
          item.product1 = item.product1 == 1 ? true : false;
          item.product2 = item.product2 == 1 ? true : false;
        });
        if (self.queryStore != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.storeName.toLowerCase().indexOf(self.queryStore.toLowerCase()) > -1;
          });
        }
        else if (self.queryRegistration != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.equipment.toLowerCase().indexOf(self.queryRegistration.toLowerCase()) > -1;
          });
        }
        else if (self.queryTag != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.tag.toLowerCase().indexOf(self.queryTag.toLowerCase()) > -1;
          });
        }
        else if (self.queryDriver != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.requireDriverDesc.toLowerCase().indexOf(self.queryDriver.toLowerCase()) > -1;
          });
        }
        else if (self.queryOperator != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.requireOperatorDesc.toLowerCase().indexOf(self.queryOperator.toLowerCase()) > -1;
          });
        }
        else if (self.queryAuthentication != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.requireAuthentication == parseInt(self.queryAuthentication);
          });
        }
        else if (self.queryKM != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.requireKM == parseInt(self.queryKM);
          });
        }
        else if (self.queryHours != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.requireHours == parseInt(self.queryHours);
          });
        }
        else if (self.queryDwn != "") {
          self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
            return item.download == parseInt(self.queryDwn);
          });
        }
        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
      };
      self.$ajaxGet(
        self,
        "PerEquipmentStores/GetPerEquipmentBusinessRule",
        onSuccess,
        onFinally
      );
    },

    GetPerEquipmentStoreDriverTypedropdown(whenDone) {
      const self = this;
      var onSuccess = function (response) {
        self.DropdownDataDriver = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        if (whenDone && typeof whenDone == "function") whenDone();
      };
      var onFinally = function () { };
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
        self.DropdownDataFuelAttendant = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        if (whenDone && typeof whenDone == "function") whenDone();
      };
      var onFinally = function () { };
      self.$ajaxGet(
        self,
        "PerEquipmentStores/GetPerEquipmentStoreFuelAttendantTypedropdown",
        onSuccess,
        onFinally
      );
    },

    GetGridPerEquipmentStoreManual(whenDone) {
      const self = this;
      var onSuccess = function (response) {
        self.DropdownData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        if (whenDone && typeof whenDone == "function") whenDone();
      };
      var onFinally = function () { };
      self.$ajaxGet(
        self,
        "PerEquipmentStores/GetPerEquipmentStoreManualTypedropdown",
        onSuccess,
        onFinally
      );
    },
    GetGridPerEquipmentStoreAllocation(whenDone) {
      const self = this;
      var onSuccess = function (response) {
        if (response && response.data) {
          self.allocationData = response.data.map((item) => {
            return { label: item.name, value: item.id };
          });

          if (whenDone && typeof whenDone == "function") whenDone();
        }
      };
      var onFinally = function () { };
      self.$ajaxGet(
        self,
        "PerEquipmentStores/CRUD_PerEquipmentStoreAllocations_Get",
        onSuccess,
        onFinally
      );
    },

    GetDropdownIntegration() {
      var self = this;
      var onSuccess = function (response) {
        self.IntegrationDropdownData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      self.$ajaxGet(self, "Integrations/GetIntegrationAccount", onSuccess);
    },

    GetDropdownCostCentre() {
      const self = this;
      var onSuccess = function (response) {
        self.costcentreData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentCostCentres/GetEquipmentCostCentresdropdown",
        onSuccess,
        onFinally
      );
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

    GetDropdownMasterEquipment() {
      const self = this;
      var onSuccess = function (response) {
        self.masterequipmentData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
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
      var onSuccess = function (response) {
        self.equipmentTypeData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
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
      var onSuccess = function (response) {
        self.EquipmentMeasurementData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
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
      var onSuccess = function (response) {
        self.equipmentRebateData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentRebates/GetEquipmentRebatesdropdown",
        onSuccess,
        onFinally
      );
    },

    closePopup() {
      this.popupActive = false;

      this.initValues();
    },
    toggleDataSidebar(val = false) {
      this.equipmentSidebar = val;
    },
    GetDropdownLicenseType() {
      const self = this;
      var onSuccess = function (response) {
        self.licenseTypeData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () { };
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

    moreDetail() {
      this.showMore = true;
    },
    lessDetail() {
      this.showMore = false;
    },
    bulkParameterUpdate() {
      this.bulkEdit = true;
      this.addPerEquipmentStoreData = {};
      this.toggleParameterDataSidebar(true);
    },
    newEquipmentPerStore(data) {
      data.newPes = true;
      this.bulkEdit = true;
      this.addPerEquipmentStoreData = data;
      this.toggleParameterDataSidebar(true);
    },
    closeBulk() {
      this.toggleParameterDataSidebar(false);
    },
    toggleParameterDataSidebar(val = false) {
      this.bulkEquipmentParameterSidebar = val;
    },
    saveEquipmentParameters(data) {
      var self = this;
      // var onSuccess = function (response) { };
      // var onFinally = function () {
        self.showLoadingOnElement("gridTable", 1, "radius");
        self.$vs.notify({
          title: "Busy",
          text: "Item(s) Busy Saving/Updating",
          color: "warning",
        });
        // console.log(data)
        self.toggleParameterDataSidebar(false);
        self.processUpdate(data);
      // };
      // self.$ajaxPost(
      //   self,
      //   `StageTable/StageBulkData?accountId=${localStorage.getItem(
      //     "userAccountId"
      //   )}&userId=${JSON.parse(sessionStorage.roles).id
      //   }&dataImportTypeId=${3}&line=${data}`,
      //   data,
      //   onSuccess,
      //   onFinally
      // );
    },
    bulkAddAllEqp(data) {
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
        self.toggleParameterDataSidebar(false);
        // self.processUpdate();
      };

      self.$ajaxPost(
        self,
        `Equipments/BulkEquipmentParameterAddEFCore`,
        obj,
        onSuccess,
        onFinally
      );
    },
    processUpdate(data) {
      var self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var obj = {
        eqpId: data ? data : 0
      }

      var onSuccess = function (response) {
        // self.toggleParameterDataSidebar(false);
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.$vs.notify({
          title: "Done",
          text: "Saving/Updating Was Successful",
          color: "success",
        });
        self.GetGrid();
      };
      var onFinally = function () {
        self.toggleParameterDataSidebar(false);
      };

      self.$ajaxPost(
        self,
        `DataIntegrity/BulkUpdateEqpParam?accountId=${localStorage.getItem(
          "userAccountId"
        )}&myParameters=${data}`,
        data,
        onSuccess,
        onFinally
      );
    },
    openBusinessRule() {
      this.isInfoHidden = true;
      this.isListHidden = true;
      this.isInfoHiddenEquipmentparameters = false;
      this.GetGridBusinessRules();
    },

    openAssignPopup() {
      this.popupAssignStoreActive = true;
    },
    openAssignPopupEquipment() {
      this.popupAssignStoreActiveEquipment = true;
    },

    openAssignPopupEquipmentDelete() {
      this.popupAssignStoreActiveEquipmentDelete = true;
    },

    closeAssignPopup() {
      this.popupAssignStoreActive = false;
      this.popupAssignStoreActiveEquipment = false;
      this.popupAssignStoreActiveEquipmentDelete = false;
    },
    closeQRPopup() {
      this.popupGenerateQR = false;
    },
    AssignEqpToStore() {
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
          `PerEquipmentStores/AssignEqpToStore?fromStore=${self.fromStore.value}&toStore=${self.toStore.value}`,
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

    AssignEqpToStoreNew() {
      var self = this;

      if (self.fromStore.value > 0) {

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

        };
        var onFinally = function () {
          self.GetGrid();
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActiveEquipment = false;
        };
        self.$ajaxPost(
          self,
          `PerEquipmentStores/AssignEqpToStoreNew?Store=${self.fromStore.value}`,
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
    DeleteEqpToStore() {
      var self = this;

      if (self.fromStore.value > 0) {

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

        };
        var onFinally = function () {
          self.GetGrid();
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActiveEquipmentDelete = false;
        };
        self.$ajaxPost(
          self,
          `PerEquipmentStores/DeleteEqpToStoreNew?Store=${self.fromStore.value}`,
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
      var onFinally = function () { };
      self.$ajaxGet(self, "Stores/GetStoredropdown", onSuccess, onFinally);
    },
    submitNewData(data) {
      var self = this;

      var onSuccess = (response) => {
        self.toggleParameterDataSidebar(false);
        self.successNotify();
      };

      var onFinally = (response) => { };

      self.$ajaxPost(
        self,
        "PerEquipmentStores/AssignSingleEqpToStore",
        data,
        onSuccess,
        onFinally
      );
    },
    copyToAll(data) {
      var self = this;
      //xxxxxx
      data.download = data.download == true || data.download == 1 ? 1 : 0;
      data.product1 = data.product1 == true || data.product1 == 1 ? 1 : 0;
      data.product2 = data.product2 == true || data.product2 == 1 ? 1 : 0;
      data.product3 = data.product3 == true || data.product3 == 1 ? 1 : 0;
      data.requireAuthentication = data.requireAuthentication == true || data.requireAuthentication == 1 ? 1 : 0;
      data.requireDriver = data.requireDriver;
      data.requireHours = data.requireHours == true || data.requireHours == 1 ? 1 : 0;
      data.requireJobOrder = data.requireJobOrder == true || data.requireJobOrder == 1 ? 1 : 0;
      data.requireTankNozzle = data.requireTankNozzle == true || data.requireTankNozzle == 1 ? 1 : 0;
      data.requireKM = data.requireKM == true || data.requireKM == 1 ? 1 : 0;
      data.requireOperator = data.requireOperator;

      if (!self.isInfoHiddenEquipmentparameters) {
        self.showLoadingOnElement("gridTableBusiness", 1, "radius");
      } else {
        self.showLoadingOnElement("gridTable2", 1, "radius");
      }
      var onSuccess = function (response) {
        self.successNotify();
        if (!self.isInfoHiddenEquipmentparameters) {
          self.GetGridBusinessRules();
        } else {
          self.GetGrid();
        }
      };
      var onFinally = function () {
        if (!self.isInfoHiddenEquipmentparameters) {
          self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
        } else {
          self.$vs.loading.close(self.$refs.gridTable2.$el);
        }
      };
      self.$ajaxPut(
        self,
        "PerEquipmentStores/UpdateAllForStore",
        data,
        onSuccess,
        onFinally
      );
    },
    exportCSV() {
      var self = this;
      var obj;

      if (self.isInfoHiddenEquipmentparameters) {
        self.showLoadingOnElement("gridTable", 1, "radius");
        obj = {
          type: 1,
          exports: self.famsdata.map((item) => {
            return {
              accountId: item.accountId,
              consumption: item.consumption,
              enable: item.enable,
              equipmentMeasurementId: item.equipmentMeasurementId,
              equipmentMeasurementName: item.equipmentMeasurementName,
              equipmentRebateId: item.equipmentRebateId,
              equipmentRebateName: item.equipmentRebateName,
              equipmentTypeId: item.equipmentTypeId,
              equipmentTypeName: item.equipmentTypeName,
              id: item.id,
              maxLitres: item.maxLitres,
              name: item.name,
              registration: item.registration,
              tag: item.tag,
            };
          })
        }
      }
      else if (self.isListHidden) {
        self.showLoadingOnElement("gridTableBusiness", 1, "radius");
        obj = {
          type: 2,
          paramExports: self.famsdataBusinessRule.map((item) => {
            return {
              allocation: item.allocation,
              download: item.download,
              equipment: item.equipment,
              manual: item.manual,
              maxlitres1: item.maxlitres1,
              maxlitres2: item.maxlitres2,
              maxlitres3: item.maxlitres3,
              perId: item.perId,
              perStoreEquipmentID: item.perStoreEquipmentID,
              perStoreId: item.perStoreId,
              product1: item.product1,
              product2: item.product2,
              product3: item.product3,
              requireAllocation: item.requireAllocation,
              requireAllocationDesc: item.requireAllocationDesc,
              requireAuthentication: item.requireAuthentication,
              requireDriver: item.requireDriver,
              requireDriverDesc: item.requireDriverDesc,
              requireHours: item.requireHours,
              requireJobOrder: item.requireJobOrder,
              requireTankNozzle: item.requireTankNozzle,
              requireKM: item.requireKM,
              requireManual: item.requireManual,
              requireManualDesc: item.requireManualDesc,
              requireOperator: item.requireOperator,
              requireOperatorDesc: item.requireOperatorDesc,
              storeName: item.storeName,
              tag: item.tag
            };
          })
        }
      }
      var onSuccess = function (response) {
        self.dataString = response.data;
      }
      var onFinally = function () {
        if (self.isInfoHiddenEquipmentparameters) {
          self.downloadFile('Equipments', self.dataString);
          self.$vs.loading.close(self.$refs.gridTable.$el);
        }
        else if (self.isListHidden) {
          self.downloadFile('Equipment Parameters', self.dataString);
          self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
        }
      };
      self.$ajaxPost(
        self,
        "Equipments/ExportToCSV",
        obj,
        onSuccess,
        onFinally
      );
    },
    downloadFile(fileName, data) {
      var blob = new Blob([data], { type: 'text/plain' });
      var anchor = document.createElement('a');

      anchor.download = fileName + (new Date()).getMilliseconds() + ".CSV";
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
      anchor.click();
    },
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
    generateQR(data) {
      // console.log(data);
      var obj = {
        id: data.id,
        registration: data.registration,
        accountId: data.accountId,
        tag: data.tag,
        description: data.name
      }
      this.qrRegistration = data.registration;
      this.eqpQR = JSON.stringify(obj);
      this.eqpQR = this.eqpQR + `\n\nhttps://shop.fams.co.za/ \n\n https://www.fams.co.za/`
      this.popupGenerateQR = true;
    },
    async saveQR() {
      const qrCodeElement = this.$refs.qrCode;

      try {
        // Use html2canvas to render the HTML element as an image
        const canvas = await html2canvas(qrCodeElement);

        // Convert the canvas to a data URL
        const imageDataURL = canvas.toDataURL('image/png');

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'qrCode.png';

        // Simulate a click on the link element to trigger the download
        link.click();
      } catch (error) {
        console.error('Error saving image:', error);
      }
    },
    async printQR() {
      // Get HTML to print from element
      const prtHtml = document.getElementById('qrCode').innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = '';
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>

        </head>
        <body>
          <br/>
          ${prtHtml}
        </body>
      </html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      // WinPrint.close();
    },
    populateDataEquipmentOem(){
      var self = this;
      if (self.equipmentOemSelect) {
        self.formDataEqp.equipmentOEMID = self.equipmentOemSelect.value;
      }
    },
    populateDataEquipmentLocation(){
      var self = this;
      if (self.equipmentLocationSelect) {
        self.formDataEqp.equipmentLocationID = self.equipmentLocationSelect.value;
      }
    },
    populateDataEquipmentCategory(){
      var self = this;
      if (self.equipmentCategorySelect) {
        self.formDataEqp.equipmentCategoryID = self.equipmentCategorySelect.value;
      }
    },
    populateDataEquipmentModel(){
      var self = this;
      if (self.equipmentModelSelect) {
        self.formDataEqp.equipmentModelID = self.equipmentModelSelect.value;
      }
    },
    populateDataEquipmentOwner(){
      var self = this;
      if (self.equipmentOwnerSelect) {
        self.formDataEqp.equipmentOwnerID = self.equipmentOwnerSelect.value;
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
<style>
.v-select.v-input--is-dirty input {
  display: none;
}

.v-select__selection {
  max-width: none;
}

#equipment #iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#equipment #iconContainer span .con-vs-tooltip {
  padding: 0px 2px;
}

#equipment #expandIconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#equipment #expandIconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}

#boolSearch {
  width: 110px;
}</style>

