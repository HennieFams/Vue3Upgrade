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
    <operator-sidebar :isSidebarActive="operatorSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData"
      @update="updateGrid" />
    <bulkAssignOperator-sidebar :isSidebarActive="bulkAssignOperatorSidebar" @closeSidebar="toggleAssignToStoreSidebar"
      :data="assignSidebarData" @update="assignOperators" @bulk="bulkAddAllOpr" />
    <vx-card ref="MainCard3" v-show="!isInfoHiddenOperatorparameters">
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
            <vs-button class="rounded-lg mr-2" color="danger" @click="openPerStoreOpr" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(125, 51, 255)" type="filled" @click="addVue" icon-pack="feather"
              icon="icon-plus-square">
              Add New
            </vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopup" icon-pack="feather"
              icon="icon-edit">Business Rule bulk assign
            </vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="assignToStores" icon-pack="feather"
              icon="icon-edit">
              Assign Employee to Store
            </vs-button>
            <!-- <  vs-button class="rounded-lg mr-2" color="warning"  @click="cancelAdd"              icon-pack="feather" icon="icon-refresh-ccw">Return</> -->
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
            <vs-th sort-key="Tag">Tag</vs-th>
            <vs-th sort-key="Employee">Employee</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{ data }">
            <vs-tr>
              <vs-td></vs-td>
              <vs-td>
                <vs-input v-model="queryDwn" class="w-full" id="boolSearch" placeholder="0/1 = false/true" /></vs-td>
              <vs-td>
                <vs-input v-model="queryStore" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryOprTag" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="queryOperatorName" class="w-full" />
              </vs-td>
            </vs-tr>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="whitespace-no-wrap" id="iconContainer">
                <vx-tooltip class="flex" text="Delete Employee Parameter">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deleteOperatorParameters(tr)" />
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
              <vs-td :data="tr.operatorTag">{{ tr.operatorTag }}</vs-td>
              <vs-td :data="tr.operatorName">{{ tr.operatorName }}</vs-td>

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
          <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
            <!-- tab 1 content -->
            <div class="vx-row">

              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input maxlength="18" label="Employee (Alfanumeric Only with Spaces and Underscores('_'))"
                  @keydown="nameKeydown($event)" v-model="formData.name" class="w-full" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Description" v-model="formData.description" class="w-full" />
              </div>

              <div class="vx-col md:w-1/2 w-full md:mt-8">
                <div class="demo-alignment">
                  <span>Employee Download (No | Yes):</span>
                  <div class="flex">
                    <vs-switch class="rounded-pill" color="success" v-model="formData.enable"></vs-switch>
                  </div>
                </div>
              </div>
            </div>
          </tab-content>


          <!-- tab 4 content -->
          <tab-content title="Step 2" class="mb-5" icon="feather icon-save">
            <!-- <vx-card class="mt-base" no-shadow card-border> -->
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-5">
                <label class="w-full" size="small">Employee's FAMS Tag</label>
                <v-select placeholder="Select or Enter Tag to assign" :options="tagDropdown" v-model="tagSelected"
                  class="w-full" taggable maxlength="20" @keypress.native="nameKeydown($event)"></v-select>
                <!-- <vs-input maxlength="20" label="Employee's FAMS Tag" v-model="formData.tag" @keydown="nameKeydown($event)" class="w-full" /> -->
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <label class="w-full" size="small">Employee Type </label>
                <v-select class="w-full" placeholder="Search / Select Employee Type" :options="operatorTypeData"
                  v-model="operatorTypeSelect" @search:blur="populateDataOperatorType"
                  name="Search / Select Employee Type" />
              </div>
            </div>
            <br>
            <div>
              <vs-button v-show="!showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:43%;"
                @click="moreDetail" icon-pack="feather" icon="icon-edit">More Detail</vs-button>
              <vs-button v-show="showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:43%;"
                @click="lessDetail" icon-pack="feather" icon="icon-edit">Less Detail</vs-button>
            </div>
            <br>
            <div v-show="showMore">
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Id Number</label>
                  <vs-input icon-pack="feather" icon="icon-phone" placeholder="Id Number" v-validate="'numeric'"
                    v-model="formData.operatorDetail.idNumber" class="w-full" name="IdNum" />
                </div>
                <div class="vx-col flex-1">
                  <label>Cellphone Number</label>
                  <vs-input icon-pack="feather" icon="icon-phone" v-validate="'digits:10'" type="numeric"
                    name="Cell Number" placeholder="Cellphone Number" v-model="formData.operatorDetail.cellphoneNr"
                    class="w-full" />
                </div>
                <div class="vx-col flex-4">
                  <label>Email Address</label>
                  <vs-input icon-pack="feather" icon="icon-at-sign" placeholder="Email Address"
                    v-model="formData.operatorDetail.email" class="w-full" v-validate="'email'" name="Email" />
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Residential Address</label>
                  <vs-input icon-pack="feather" icon="icon-map-pin" placeholder="Residential Address"
                    v-model="formData.operatorDetail.residentialAddress" class="w-full" name="ResidentAddress" />
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>Postal Address</label>
                  <vs-input icon-pack="feather" icon="icon-map-pin" placeholder="Postal Address"
                    v-model="formData.operatorDetail.postalAddress" :disabled="resandpostal" class="w-full"
                    name="PostalAddress" />
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
                    <flat-pickr class="w-full" v-model="formData.operatorDetail.PdpexpiryDate" :format="'YYYY-MM-DD'"
                      placeholder="Select Expiration Date" name="Date" />
                  </div>
                </div>
              </div>
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-1">
                  <label>License</label>
                  <vs-input icon-pack="feather" icon="icon-file-text" placeholder="License"
                    v-model="formData.operatorDetail.license" class="w-full" name="License" />
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
                    <flat-pickr class="w-full" v-model="formData.operatorDetail.licenseExpiryDate" :format="'YYYY-MM-DD'"
                      icon-pack="feather" icon="icon-calendar" placeholder="Select Expiration Date" name="License Date" />
                  </div>
                </div>
              </div>
            </div>
          </tab-content>
        </form-wizard>

      </div>
    </vx-card>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search :data="operatorData"
          class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addVue" icon-pack="feather"
              icon="icon-plus-square">Add New</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="assignToStores" icon-pack="feather"
              icon="icon-edit">Assign Employee to Store</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopup" icon-pack="feather"
              icon="icon-edit">Business Rule (Copy Employee to Store)</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(187, 138, 200)" @click="openPerStoreOpr" icon-pack="feather"
              icon="icon-edit">Business Rule View (Per Store Employee)</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopupOperator"
              icon-pack="feather" icon="icon-edit">Business Rule (new Empployee to Store)</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="bulkAddAllOpr()" icon-pack="feather"
              icon="icon-edit">Business Rule (Bulk Add New)</vs-button>
            <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" @click="openAssignPopupOperatorDelete"
              icon-pack="feather" icon="icon-edit">Business Rule (Bulk Empployee Delete to Store)</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ operatorData.length -
                  currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : operatorData.length }} of {{
    operatorData.length }}</span>
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
            <vs-th sort-key="Tag">Tag</vs-th>
            <vs-th sort-key="Employee">Employee</vs-th>
            <vs-th sort-key="Type">Type</vs-th>
            <vs-th sort-key="Description">Description</vs-th>
            <vs-th sort-key="Active">Active</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr>
              <vs-td></vs-td>
              <vs-td>
                <vs-input v-model="opr24Tag" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="oprEmployee" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="oprType" class="w-full" />
              </vs-td>
              <vs-td>
                <vs-input v-model="oprDescription" class="w-full" />
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
              <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
              <vs-td :data="tr.operator">{{ tr.operator }}</vs-td>
              <vs-td :data="tr.operatorType">{{ tr.operatorType }}</vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Employee Information">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDataSidebar(tr)" />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Employee">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deleteGrid(tr)" />
                </vx-tooltip>
                <vx-tooltip text="Generate QR Code">
                  <feather-icon icon="GridIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="generateQR(tr)" />
                </vx-tooltip>

              </vs-td>
              <template class="expand-user" slot="expand">
                <div class="con-expand-users w-full">
                  <div>
                    <vs-button class="rounded-lg mr-2" color="#720ea8" @click="PromptActiveOperatorToStore(tr)"
                      icon-pack="feather" icon="icon-plus-square">FAMS Store</vs-button>
                    <vs-table ref="gridTable2" v-model="selected" :data="tr.perStore">
                      <template slot="thead">
                        <vs-th>Action</vs-th>
                        <vs-th>Download</vs-th>
                        <vs-th>Store</vs-th>
                        <vs-th>Tag</vs-th>
                        <vs-th>Employee</vs-th>
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                          <vs-td id="iconContainer" class="whitespace-no-wrap">
                            <vx-tooltip class="flex" text="Save FAMS Store For Employee">
                              <feather-icon icon="SaveIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                                @click.stop="saveOperatorParameters(tr)" />
                            </vx-tooltip>
                            <vx-tooltip class="flex" text="Delete FAMS Store">
                              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                class="ml-2" @click.stop="deleteOperatorParameters(tr)" />
                            </vx-tooltip>
                            <vx-tooltip class="flex" text="Copy Employee Download">
                              <feather-icon icon="CopyIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                class="ml-2" @click.stop="copyToAll(tr)" />
                            </vx-tooltip>

                          </vs-td>
                          <vs-td :data="tr.download">
                            <vs-switch class="rounded-pill" v-model="tr.download">
                              <span slot="off">No</span>
                              <span slot="on">Yes</span>
                            </vs-switch>
                          </vs-td>
                          <vs-td :data="tr.storeName">{{ tr.storeName }}</vs-td>
                          <vs-td :data="tr.operatorTag">{{ tr.operatorTag }}</vs-td>
                          <vs-td :data="tr.operatorName">{{ tr.operatorName }}</vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
              </template>

            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vs-popup title="Assign Employee to Store" :active.sync="popupAssignStoreActive">
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
          @click="AssignOprToStore()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>
    <vs-prompt ref="statusPromptActive" title="Add Employee to FAMS Store" acceptText="Submit" cancelText="Cancel"
      @cancel="dropdownSelectStore = 0" @accept="addEmployeeStore" :active.sync="statusPromptActive">
      <div class="vx-row">
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <vs-input class="w-full" label-placeholder="Employee" disabled v-model="Employee" name="Employee" />
        </div>
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>FAMS Store</label>
          <v-select :options="storedropdownValue" placeholder="Search / Select Store" v-model="dropdownSelectStore"
            @search:blur="populateDataStore" />
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
    </vs-prompt>
    <!-- <vs-popup title="Assign Operator to Store (copy from existing store to store)" :active.sync="popupAssignStoreActive">
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
    </vs-popup> -->
    <vs-popup title="Assign Employee to Store (new store)" :active.sync="popupAssignStoreActiveOperator">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">Store</label>
          <v-select placeholder="Bulk assign Employee to Store (new)" :options="storesFromData"
            v-model="fromStore"></v-select>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="AssignOprToStoreNew()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>

    <vs-popup title="Delete Business rules from store (Employee Parameters)"
      :active.sync="popupAssignStoreActiveOperatorDelete">
      <div class="vx-col md:w-full w-full mb-5">
        <div class="m-2">
          <label class="w-full">Store</label>
          <v-select placeholder="Bulk delete employee from Store" :options="storesFromData"
            v-model="fromStore"></v-select>
        </div>
        <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
          @click="DeleteOprToStore()">Save
        </vs-button>
        <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeAssignPopup()">Cancel
        </vs-button>
      </div>
    </vs-popup>
    <vs-popup title="Employee QR Code" :active.sync="popupGenerateQR">
      <div class="vx-col md:w-full w-full mb-5">
        <div id="qrCodeEmployee" ref="qrCodeEmployee" name="qrCodeEmployee" class="m-1/2 md-full ml-3">
          <label class="w-full" style="font-size: 12px;">{{ typeOfOperator }}: {{ qrDescription }}</label>
          <br/>
          <div class="vx-row px-4 pb-3">
            <qr-code :size="100" :text="empQR"></qr-code>
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
import vSelect from "vue-select";
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import operatorSidebar from "./OperatorSidebar.vue";
import bulkAssignOperatorSidebar from "./BullkAssignOperatorSidebar.vue";
import VueQRCodeComponent from 'vue-qrcode-component';
import html2canvas from 'html2canvas';
export default {
  data() {
    return {

      title: 'FAMS - new Employee Wizard!!',
      subtitle: 'Please complete each tab to add new Employee (operator/driver)',

      statusPromptActive: false,
      dropdownSelectStore: [],
      storedropdownValue: [],
      storeId: 0,
      Storedownload: 0,
      Store: "",
      EmployeeId: 0,

      showMore: false,
      resandpostal: false,

      Employee: "",

      operatorTypeSelect: { value: 0, label: 'Search / Select Employee Type' },
      operatorTypeData: [],

      isListHidden: false,
      isInfoHidden: true,
      isInfoHiddenOperatorparameters: true,

      itemsPerPage: 10,
      operatorSidebar: false,
      bulkAssignOperatorSidebar: false,
      selected: [],
      operatorData: [],
      sidebarData: {},
      assignSidebarData: {},
      isMounted: false,
      formData: {
        id: 0,
        accountId: localStorage.getItem('userAccountId'),
        operatorTypeId: 0,
        operatorType: "",
        name: "",
        enable: true,
        description: "",
        account: "",
        tag: "0000000000",
        operatorDetail: {
          PdpexpiryDate: "",
          email: "",
          pdp: false,
          residentialAddress: "",
          idNumber: "",
          cellphoneNr: "",
          postalAddress: "",
          licence: "",
          licenceExpiryDate: "",
          licenseTypeId: 0,
          licenseType: "",
        }
      },
      licenseTypeData: [],
      licenseTypeDropdown: 0,
      licenseTypeSelect: 0,
      opr24Tag: "",
      oprEmployee: "",
      oprType: "",
      oprDescription: "",
      oprActive: "",
      originalOperatorData: [],
      famsdataBusinessRule: [],
      originalBusinessRules: [],
      queryDwn: "",
      queryStore: "",
      queryOprTag: "",
      queryOperatorName: "",
      storesFromData: [],
      storesToData: [],
      popupAssignStoreActive: false,
      fromStore: { value: 0, label: "Search / Select FROM Store" },
      toStore: { value: 0, label: "Search / Select TO Store" },
      tagDropdown: [],
      tagSelected: 0,
      popupAssignStoreActiveOperatorDelete: false,
      popupAssignStoreActiveOperator: false,
      popupGenerateQR: false,
      empQR: '',
      qrDescription: '',
      typeOfOperator: '',
    };
  },
  components: {
    flatPickr,
    operatorSidebar,
    bulkAssignOperatorSidebar,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    qrCode: VueQRCodeComponent,
  },
  watch: {
    name(val) {
      this.name = val.replace(/\W/g, "");
    },
    opr24Tag(val) {
      var self = this;

      if (val != "") {
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else {
        self.operatorData = self.originalOperatorData;
      }
    },
    oprEmployee(val) {
      var self = this;

      if (val != "") {
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.operator.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else {
        self.operatorData = self.originalOperatorData;
      }
    },
    oprType(val) {
      var self = this;

      if (val != "") {
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.operatorType.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else {
        self.operatorData = self.originalOperatorData;
      }
    },
    oprDescription(val) {
      var self = this;

      if (val != "") {
        self.operatorData = self.originalOperatorData.filter(item => {
          return item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.operatorData;
      }
      else {
        self.operatorData = self.originalOperatorData;
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
    queryOprTag(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.operatorTag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
      }
    },
    queryOperatorName(val) {
      var self = this;

      if (val != "") {
        self.famsdataBusinessRule = self.originalBusinessRules.filter(item => {
          return item.operatorName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.famsdataBusinessRule;
      }
      else {
        self.famsdataBusinessRule = self.originalBusinessRules;
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
    }
  },
  mounted() {
    this.GetGrid();
    this.LoadStoreDropdown();
    this.GetDropdownLicenseType();
    this.GeStoresDropdown();
    this.GetTags();
    this.isMounted = true;
  },
  methods: {
    GetTags() {
      const self = this;
      var type = "Employee"
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
        if (e.which === 32) { }
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
      data.accountId = localStorage.getItem('accountId');

      this.sidebarData = data;
      this.sidebarData.licenseType = this.licenseTypeData.filter(function (item) { return item.value == data.operatorDetail.licenseTypeId; })[0];;
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
    populateDataLicenseType() {
      var self = this;
      if (self.operatorTypeSelect) {
        self.formData.operatorDetail.licenseTypeId = self.licenseTypeSelect.value;
        self.formData.operatorDetail.licenseType = self.operatorTypeSelect.label;
      }
    },
    cancelAdd() {
      this.isListHidden = false,
        this.isInfoHidden = true;
      this.isInfoHiddenOperatorparameters = true;
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
      var onSuccess = function (response) {
        self.storedropdownValue = response.data.map(function (item) {
          //return { text: item.customer, value: item.id };
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetStoredropdown",
        onSuccess,
        onFinally
      );
    },


    addEmployeeStore() {
      var self = this;
      if (self.Storedownload == true) self.Storedownload = 1
      else if (self.Storedownload == false) self.Storedownload = 0

      const obj = {
        id: 0,
        StoreId: self.StoreId,
        OperatorId: self.EmployeeId,
        Download: self.Storedownload
      };
      //self.showLoadingOnElement("gridTable3", 1, "radius");
      var onSuccess = function (response) {
        self.statusPromptActive = false;
        self.GetGrid();
        self.successNotify();
      };
      var onFinally = function () {
        self.StoreId = 0
        self.Storedownload = 0;
        self.dropdownSelectStore = 0;
      };
      self.$ajaxPost(
        self,
        "PerOperatorStores",
        obj,
        onSuccess,
        onFinally
      );
    },

    saveOperatorParameters(data) {
      var self = this;
      if (data.download == true) self.Storedownload = 1
      else if (data.download == false) self.Storedownload = 0

      const obj = {
        id: data.perOperatorStoreId,
        StoreId: data.storeId,
        OperatorId: data.operatorId,
        Download: self.Storedownload
      };
      //self.showLoadingOnElement("gridTable3", 1, "radius");
      var onSuccess = function (response) {
        self.GetGrid();
        self.successNotify();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.StoreId = 0
        self.Storedownload = 0;
        self.dropdownSelectStore = 0;

      };
      self.$ajaxPut(
        self,
        "PerOperatorStores/" + data.perOperatorStoreId,
        obj,
        onSuccess,
        onFinally
      );
    },
    openAssignPopup() {
      this.popupAssignStoreActive = true;
    },
    closeAssignPopup() {
      this.popupAssignStoreActive = false;
      this.storesFromData = [];
      this.storesToData = [];
      this.popupAssignStoreActiveOperatorDelete = false;
      this.popupAssignStoreActiveOperator = false
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
    deleteOperatorParameters(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        if (!self.isInfoHiddenOperatorparameters) {
          self.GetPerStoreOpr();
        }
        else {
          self.GetGrid();
        }
        self.successNotify();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
        "PerOperatorStores/" + data.perOperatorStoreId,
        onSuccess,
        onFinally
      );
    },

    initValues() {
      var self = this;
      self.$refs.wizard.navigateToTab(0);
      self.formData.id = 0;
      self.formData.accountId = localStorage.getItem('userAccountId');
      self.formData.operatorTypeId = 0;
      self.formData.operatorType = "None";
      self.formData.name = "None";
      self.formData.enable = true;
      self.formData.description = "None";
      self.formData.tag = "0000000000";
      self.operatorTypeSelect = { value: 0, label: 'Search / Select Employee Type' };

      self.formData.operatorDetail.PdpexpiryDate = "";
      self.formData.operatorDetail.email = "";
      self.formData.operatorDetail.pdp = false;
      self.formData.operatorDetail.residentialAddress = "";
      self.formData.operatorDetail.idNumber = "";
      self.formData.operatorDetail.cellphoneNr = "";
      self.formData.operatorDetail.postalAddress = "";
      // self.licenseTypeData = [];
      // self.licenseTypeDropdown = {};
    },
    //********************* SQL events */
    formSubmitted() {
      const self = this;
      self.$validator.validateAll().then((result) => {
        if (result) {
          if (self.resandpostal) {
            self.formData.operatorDetail.postalAddress = self.formData.operatorDetail.residentialAddress;
          }
          if (self.tagSelected && self.tagSelected.label == undefined) {
            self.formData.tag = self.tagSelected;
          }
          else if (self.tagSelected.label) {
            self.formData.tag = self.tagSelected.label;
          }
          const obj = {
            id: 0,
            accountId: localStorage.getItem('userAccountId'),
            operatorTypeId: self.formData.operatorTypeId,
            name: self.formData.name,
            description: self.formData.description,
            tag: self.formData.tag,
            enable: self.formData.enable,
            operatorDetail: self.formData.operatorDetail
          };

          self.showLoadingOnElement("gridTable", 1, "radius");
          var onSuccess = function (response) {
            self.isListHidden = false,
              self.isInfoHidden = true;
            self.GetGrid();
            self.successNotify();
          };
          var onFinally = function () {
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
        if (result) {
          self.showLoadingOnElement("gridTable", 1, "radius");
          var onSuccess = function (response) {
            self.GetGrid();
            self.successNotify();
          };
          var onFinally = function () {
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

      var onSuccess = function (response) {
        self.GetGrid();
        self.successNotify();
      };
      var onFinally = function () {
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

      var onSuccess = function (response) {
        self.operatorData = response.data;
        self.originalOperatorData = response.data;
        self.GetDropdownLicenseType();

        if (self.opr24Tag != "") {
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.tag.toLowerCase().indexOf(self.opr24Tag.toLowerCase()) > -1;
          });
        }
        else if (self.oprEmployee != "") {
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.operator.toLowerCase().indexOf(self.oprEmployee.toLowerCase()) > -1;
          });
        }
        else if (self.oprType) {
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.operatorType.toLowerCase().indexOf(self.oprType.toLowerCase()) > -1;
          });
        }
        else if (self.oprDescription != "") {
          self.operatorData = self.originalOperatorData.filter(item => {
            return item.description.toLowerCase().indexOf(self.oprDescription.toLowerCase()) > -1;
          });
        }
        self.successNotify();
      };
      var onFinally = function () {
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
      var onSuccess = function (response) {
        self.operatorTypeData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
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
    toggleAssignToStoreSidebar(val = false) {
      this.bulkAssignOperatorSidebar = val;
    },
    assignToStores() {
      this.assignSidebarData = {};
      this.toggleAssignToStoreSidebar(true);
    },
    moreDetail() {
      this.showMore = true;
    },
    lessDetail() {
      this.showMore = false;
    },

    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
    },
    assignOperators(data) {
      var self = this;
      var onSuccess = function (response) {
        self.successNotify();
        self.toggleAssignToStoreSidebar(false);
        self.GetGrid();
      };
      var onFinally = function () {
        self.processUpdate();
      };
      self.$ajaxPost(
        self,
        `StageTable/StageBulkData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${1}&line=${data}`,
        data,
        onSuccess,
        onFinally
      );
    },
    processUpdate() {
      var self = this;
      var onSuccess = function (response) {
        self.GetGrid();
        self.toggleAssignToStoreSidebar(false);
        self.successNotify();

      };
      var onFinally = function () {
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/BulkAssignOperator?accountId=${localStorage.getItem('userAccountId')}&dataImportTypeId=${1}`,
        //myobject,
        onSuccess,
        onFinally
      );
    },
    copyToAll(data) {
      var self = this;

      var obj = {
        download: data.download == true || data.download == 1 ? 1 : 0,
        macaddress: data.macaddress,
        operatorId: data.operatorId,
        operatorName: data.operatorName,
        operatorTag: data.operatorTag,
        perOperatorStoreId: data.perOperatorStoreId,
        perstoreID: data.perstoreID,
        storeId: data.storeId,
        storeName: data.storeName,
      };
      if (!self.isInfoHiddenOperatorparameters) {
        self.showLoadingOnElement("gridTableBusiness", 1, "radius");
      } else {
        self.showLoadingOnElement("gridTable2", 1, "radius");
      }
      var onSuccess = function (response) {
        self.successNotify();
        if (!self.isInfoHiddenOperatorparameters) {
          self.GetPerStoreOpr();
        } else {
          self.GetGrid();
        }
      };
      var onFinally = function () {
        if (!self.isInfoHiddenOperatorparameters) {
          self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
        } else {
          self.$vs.loading.close(self.$refs.gridTable2.$el);
        }
      };
      self.$ajaxPut(
        self,
        "PerOperatorStores/UpdateAllForStore",
        obj,
        onSuccess,
        onFinally
      );
    },
    GetDropdownLicenseType() {
      const self = this;
      var onSuccess = function (response) {
        self.licenseTypeData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "Equipments/GetLicenseTypeDropDown",
        onSuccess,
        onFinally
      );
    },

    openPerStoreOpr() {
      this.isInfoHidden = true;
      this.isListHidden = true;
      this.isInfoHiddenOperatorparameters = false;
      this.GetPerStoreOpr();
    },
    GetPerStoreOpr() {
      const self = this;
      // self.showLoadingOnElement("gridTableBusiness", 1, "radius");
      var onSuccess = function (response) {
        self.famsdataBusinessRule = response.data;
        self.originalBusinessRules = response.data;
        self.successNotify();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
      };
      self.$ajaxGet(
        self,
        "PerOperatorStores/GetOperatorStore",
        onSuccess,
        onFinally
      );
    },
    // openAssignPopup() {
    //   this.popupAssignStoreActive = true;
    // },
    openAssignPopupOperator() {
      this.popupAssignStoreActiveOperator = true;
    },

    openAssignPopupOperatorDelete() {
      this.popupAssignStoreActiveOperatorDelete = true;
    },
    AssignOprToStore() {
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
          self.storesFromData = 0;
          self.storesToData = 0;
        };
        self.$ajaxPost(
          self,
          `PerOperatorStores/AssignOperatorToStore?fromStore=${self.fromStore.value}&toStore=${self.toStore.value}`,
          onSuccess,
          onFinally
        );
        self.storesFromData = 0;
        self.storesToData = 0;
      } else {
        this.$vs.notify({
          title: "Not Successfull",
          text: "Not Store(s) / Not all store(s) selected",
          color: "danger",
        });
      }
    },
    // AssignOprToStore() {
    //   var self = this;

    //   if (self.fromStore.value > 0 && self.toStore.value > 0) {
    //     if (self.fromStore.value == self.toStore.value) {
    //       this.$vs.notify({
    //         title: "Not Successfull",
    //         text: "Can not save to same store",
    //         color: "danger",
    //       });
    //       return;
    //     }

    //     self.showLoadingOnElement("gridTable", 1, "radius");
    //     var onSuccess = function (response) {
    //       self.successNotify();
    //       self.GetGrid();
    //       self.GeStoresDropdown();
    //     };
    //     var onFinally = function () {
    //       self.$vs.loading.close(self.$refs.gridTable.$el);
    //       self.popupAssignStoreActive = false;
    //       self.storesFromData = [];
    //       self.storesToData = [];
    //     };
    //     self.$ajaxPost(
    //       self,
    //       `PerOperatorStores/AssignOprToStore?fromStore=${self.fromStore.value}&toStore=${self.toStore.value}`,
    //       onSuccess,
    //       onFinally
    //     );
    //   } else {
    //     this.$vs.notify({
    //       title: "Not Successfull",
    //       text: "Not Store(s) / Not all store(s) selected",
    //       color: "danger",
    //     });
    //   }
    // },

    AssignOprToStoreNew() {
      var self = this;

      if (self.fromStore.value > 0) {

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

        };
        var onFinally = function () {
          self.GetGrid();
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActiveOperator = false;
        };
        self.$ajaxPost(
          self,
          `PerOperatorStores/AssignOprToStoreNew?Store=${self.fromStore.value}`,
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
    bulkAddAllOpr(data){
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
        // self.toggleParameterDataSidebar(false);
        self.processUpdate();
      };
      
      self.$ajaxPost(
        self,
        `Operators/BulkEmployeeParameterAddEFCore`,
        obj,
        onSuccess,
        onFinally
      );
    },
    DeleteOprToStore() {
      var self = this;

      if (self.fromStore.value > 0) {

        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.successNotify();

        };
        var onFinally = function () {
          self.GetGrid();
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.popupAssignStoreActiveOperatorDelete = false;
        };
        self.$ajaxPost(
          self,
          `PerOperatorStores/DeleteOprToStoreNew?Store=${self.fromStore.value}`,
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
    generateQR(data) {
      console.log(data);
      this.typeOfOperator = data.operatorType;
      var obj = {
        id: data.id,
        employee: data.operator,
        accountId: data.accountId,
        tag: data.tag,
        description: data.description
      }
      this.qrDescription = data.operator;
      this.empQR = JSON.stringify(obj);
      this.empQR = this.empQR + `\n\nhttps://shop.fams.co.za/ \n\n https://www.fams.co.za/`
      this.popupGenerateQR = true;
    },
    async saveQR() {
      const qrCodeElement = this.$refs.qrCodeEmployee;

      try {
        // Use html2canvas to render the HTML element as an image
        const canvas = await html2canvas(qrCodeElement);

        // Convert the canvas to a data URL
        const imageDataURL = canvas.toDataURL('image/png');

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'qrCodeEmployee.png';

        // Simulate a click on the link element to trigger the download
        link.click();
      } catch (error) {
        console.error('Error saving image:', error);
      }
    },
    async printQR() {
      // Get HTML to print from element
      const prtHtml = document.getElementById('qrCodeEmployee').innerHTML;

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
    closeQRPopup() {
      this.popupGenerateQR = false;
    },
  }
};
</script>
<style>
#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>