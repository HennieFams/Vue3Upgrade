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
    <store-sidebar :isSidebarActive="storeSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData"
      @update="updateGrid" />
    <storeDetail-sidebar :isSidebarActive="storeDetailSidebar" @closeSidebar="toggleDataDetailSidebar"
      :data="sidebarDetailData" />


    <vx-card ref="MainCard2" v-show="!isInfoHidden">
      <div class="mt-5">
        <div class="vx-row">
          <div class="vx-col md:w-1/6 w-full">
            <vs-button color="warning" type="border" class="rounded-lg mb-2" @click="cancelAdd">Return</vs-button>
          </div>
          <div class="vx-col md:w-1/8 w-full">
            <vs-button color="warning" type="border" class="rounded-lg mb-2" @click="initValues">Restart</vs-button>
          </div>
          <!-- <div class="vx-col md:w-1/8 w-full">
            <vs-button id="saveLocation" style=" top: 10px;" class="rounded-lg mr-3 mb-2" v-show="!showSubscription"
              v-if="$acl.check('ThebigBoss') && !showSubscription" @click="showSubscriptionTab">Show Subscription Tab
            </vs-button>
            <vs-button id="saveLocation" style=" top: 10px;" class="rounded-lg mr-3 mb-2" v-show="showSubscription"
              v-if="$acl.check('ThebigBoss')  && showSubscription" @click="hideSubscriptionTab">Hide Subscription Tab
            </vs-button>
          </div> -->
        </div>

        <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
          :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="formSubmitted">
          <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
            <!-- tab 1 content -->
            <div class="vx-row">

              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Store Name" v-model="nameSearch" class="w-full" />
                <span class="text-danger text-sm" v-show="extName">Name Already Exist</span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Store Macaddres" v-model="macSearch" class="w-full" />
                <span class="text-danger text-sm" v-show="extMac">Mac Address Already Exist</span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="IP Address" v-model="formData.ipaddress" class="w-full" />
                <!-- <span class="text-danger text-sm" v-show="extIp">IP Address Already Exist</span> -->
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Cell Number" v-model="formData.cellNumber" class="w-full" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Latitude" v-model="formData.lat" class="w-full" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Longitude" v-model="formData.long" class="w-full" />
              </div>
              <div class="vx-col md:w-1/2 w-full mb-8">
                <div class="demo-alignment">
                  <span>Store Active (No | Yes):</span>
                  <div class="flex">
                    <vs-switch class="rounded-pill" color="success" v-model="formData.enable"></vs-switch>
                  </div>
                  <div class="vx-col md:w-1/2 w-full mt-5">
                    <vs-button class="rounded-lg mb-2" @click="showMap">Pick Location</vs-button>
                  </div>
                  <vs-popup id="mapPop" title="Pick Location" :active.sync="popupActive" v-show="mapVisible">
                    <div id="app">
                      <GmapMap :center="center" :zoom="5" map-style-id="roadmap" :options="mapOptions"
                        style="width: auto;height: 60vmin;" ref="mapRef" @click="handleMapClick">
                        <GmapMarker :position="marker.position" :clickable="true" :draggable="true"
                          @drag="handleMarkerDrag" @click="panToMarker" />
                      </GmapMap>
                      <div></div>
                      <vs-button id="saveLocation" style=" top: 10px;" class="rounded-lg mr-3 mb-2"
                        @click="saveLocation">Submit</vs-button>
                      <vx-tooltip class="flex" text="Use Current Location">
                        <feather-icon id="currentLocation" icon="MapPinIcon" style="top: 10px; float:right;"
                          svgClasses="w-10 h-10 hover:text-primary stroke-current" @click.stop="geolocate" />
                      </vx-tooltip>

                      <span style=" float:right; margin-right: 0.5rem; margin-top: 13px; ">Current Location:</span>
                    </div>
                  </vs-popup>
                </div>
              </div>
            </div>
          </tab-content>

          <!-- tab 4 content -->
          <tab-content title="Step 2" class="mb-5" icon="feather icon-save">
            <!-- <vx-card class="mt-base" no-shadow card-border> -->
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-5">
                <label class="w-full" size="small">Store Type </label>
                <v-select class="w-full" placeholder="Search / Select Store Type" :options="storeTypedropdownData"
                  v-model="storeTypeSelect" @search:blur="populateDataStoreType" name="Search / Select Store Type" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <label class="w-full" size="small">Hardware Type </label>
                <v-select class="w-full" placeholder="Search / Select Hardware Type" :options="hardwaredropdownData"
                  v-model="hardwareTypeSelect" @search:blur="populateDataHardwareType"
                  name="Search / Select Hardware Type" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <label class="w-full" size="small">TimeZone</label>
                <v-select class="w-full" placeholder="Search / Select TimeZone Type" :options="timeZonedropdownData"
                  v-model="timeZoneTypeSelect" @search:blur="populateDataTimeZoneType"
                  name="Search / Select TimeZone Type" />
              </div>
            </div>
          </tab-content>
          <tab-content title="Step 3" class="mb-5" icon="feather icon-home"
            v-if="$acl.check('ThebigBoss') && showSubscription">
            <form data-vv-scope="step-1">
              <div class="vx-row px-4 pb-3">
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="Subscription Name" v-model="subscriptionData.name" class="w-full" disabled />
                  <label class="w-full" size="small">Account</label>
                  <v-select class="w-full" placeholder="Search / Select Account" :options="accountList"
                    v-model="selectedAccountDD" @search:blur="populateType" name="Search / Select Account"
                    v-validate="'required'" disabled />
                  <span class="text-danger text-sm" v-show="errors.has('Search / Select Account')">{{
                  errors.first("Search / Select Account")
                  }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <label class="w-full">Subscription Type</label>
                  <v-select class="w-full" placeholder="Search / Select Subscription Type" :options="typeList"
                    v-model="selectedType" @search:blur="populateType" name="Search / Select Subscription Type"
                    v-validate="'required'" />
                  <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Rebate')">{{
                  errors.first("Search / Select Equipment Rebate")
                  }}</span>
                  <label class="w-full" size="small">Subscription Interval</label>
                  <v-select class="w-full" placeholder="Search / Select Interval" :options="intervalList"
                    v-model="selectedInterval" @search:blur="populateType" name="Search / Select Subscription Interval"
                    v-validate="'required'" />
                  <span class="text-danger text-sm" v-show="errors.has('Search / Select Equipment Rebate')">{{
                  errors.first("Search / Select Equipment Rebate")
                  }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="Custom Price(R)" v-model="subscriptionData.customPrice" class="w-full"
                    @input="customPriceDown()" />
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="Subscription Price(R)" v-model="subscriptionData.viewPrice" class="w-full"
                    disabled />
                </div>
                <div class="vx-row md:w-full w-full mt-5" style="padding: 0 1rem">
                  <div class="vx-col flex-1">
                    <label>Created Date</label>
                    <div id="datepick">
                      <flat-pickr class="w-full" icon-pack="feather" icon="icon-calendar"
                        v-model="subscriptionData.createdDate" :format="'YYYY-MM-DD'" placeholder="Select Created Date"
                        name="Created Date" disabled />
                    </div>
                  </div>
                  <div class="vx-col flex-1">
                    <label>Expiry Date</label>
                    <div id="datepick">
                      <flat-pickr class="w-full" icon-pack="feather" icon="icon-calendar"
                        v-model="subscriptionData.expiryDate" :format="'YYYY-MM-DD'" placeholder="Select Expiry Date"
                        name="Expiry Date" />
                    </div>
                  </div>
                  <div class="vx-col flex-1">
                    <label>Renew Date</label>
                    <div id="datepick">
                      <flat-pickr class="w-full" icon-pack="feather" icon="icon-calendar"
                        v-model="subscriptionData.expiryDate" :format="'YYYY-MM-DD'" placeholder="Select Renew Date"
                        name="Renew Date" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </tab-content>
        </form-wizard>

      </div>
    </vx-card>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-popup id="mapView" title="View Location" :active.sync="popupViewActive" v-show="mapViewVisible">
          <div id="app">
            <GmapMap :center="center" :zoom="5" map-style-id="roadmap" :options="mapOptions"
              style="width: auto;height: 60vmin;" ref="mapRef">
              <GmapMarker :position="marker.position" :clickable="false" :draggable="true" @drag="handleMarkerDrag"
                @click="panToMarker" />
            </GmapMap>
            <vs-button id="done" style=" top: 10px;" class="rounded-lg mr-3 mb-2" @click="doneView">Done</vs-button>
          </div>
        </vs-popup>
        <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search :data="storeData"
          class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addVue" icon-pack="feather"
              icon="icon-plus-square">Add New</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ storeData.length -
                currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : storeData.length }} of {{
                  storeData.length }}</span>
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
            <vs-th sort-key="storeName">FAMS Store</vs-th>
            <vs-th sort-key="macAddress">MacAddress</vs-th>
            <vs-th sort-key="ipAddress">IP</vs-th>
            <vs-th sort-key="createDate">Created</vs-th>
            <!-- <vs-th sort-key="subDate">RenewDate</vs-th> -->
            <vs-th sort-key="enable">Active</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.storeName">{{tr.storeName}}</vs-td>
              <vs-td :data="tr.macAddress">{{tr.macAddress}}</vs-td>
              <vs-td :data="tr.ipAddress">{{tr.ipAddress}}</vs-td>
              <vs-td :data="tr.createDate">{{tr.createDate}}</vs-td>
              <!-- <vs-td :data="tr.subDate">{{tr.subDate}}</vs-td> -->
              <vs-td :data="tr.enable">{{tr.enable}}</vs-td>

              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="View Location">
                  <feather-icon icon="MapPinIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="viewLocation(tr)" />
                </vx-tooltip>
                <vx-tooltip class="flex" text="View Tank Info">
                  <feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2"
                    @click.stop="editDetailDataSidebar(tr)" />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Edit Store">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2"
                    @click.stop="editDataSidebar(tr)" />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Store">
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
                    <vs-table ref="gridTable2" v-model="selected" :data="tr.storeInfo">
                      <template slot="thead">
                        <vs-th>StoreType </vs-th>
                        <vs-th>Hardware</vs-th>
                        <vs-th>TimeZone</vs-th>
                        <vs-th>CellNumber</vs-th>
                        <vs-th>Latitude</vs-th>
                        <vs-th>Longitude</vs-th>
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                          <vs-td :data="tr.storeType">{{tr.storeType}}</vs-td>
                          <vs-td :data="tr.hardware">{{tr.hardware}}</vs-td>
                          <vs-td :data="tr.timeZone">{{tr.timeZone}}</vs-td>
                          <vs-td :data="tr.cellNumber">{{tr.cellNumber}}</vs-td>
                          <vs-td :data="tr.lat">{{tr.lat}}</vs-td>
                          <vs-td :data="tr.long">{{tr.long}}</vs-td>
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
    <vx-card ref="MainCard3" v-show="!isInfoNewHidden">
      <div>
        <template>
          <div class="vx-row">

            <div class="vx-col md:w-1/3 w-full mt-5">
              <label class="w-full" size="small">Store Type </label>
              <v-select class="w-full" placeholder="Search / Select Store Type" :options="storeTypedropdownData"
                v-model="storeTypeSelectEdit" @search:blur="populateDataStoreType" name="Search / Select Store Type" />
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <label class="w-full" size="small">Hardware Type </label>
              <v-select class="w-full" placeholder="Search / Select Hardware Type" :options="hardwaredropdownData"
                v-model="hardwareTypeSelectEdit" @search:blur="populateDataHardwareType"
                name="Search / Select Hardware Type" />
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <label class="w-full" size="small">TimeZone</label>
              <v-select class="w-full" placeholder="Search / Select TimeZone Type" :options="timeZonedropdownData"
                v-model="timeZoneTypeSelectEdit" @search:blur="populateDataTimeZoneType"
                name="Search / Select TimeZone Type" />
            </div>
          </div>
          <br>

          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input class="w-full" label-placeholder="FAMS Store Name" v-model="storeEditData.storeName"
                name="FAMS Store Name" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('FAMS Store Name')">{{ errors.first('FAMS Store Name') }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input class="w-full" label-placeholder="FAMS Store Macaddress" v-model="storeEditData.macAddress"
                name="FAMS Store Macaddress" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('FAMS Store Macaddress')">{{ errors.first('FAMS Store Macaddress') }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input class="w-full" label-placeholder="FAMS Store IP Address" v-model="storeEditData.ipAddress"
                name="FAMS Store IP Address" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('FAMS Store IP Address')">{{ errors.first('FAMS Store IP Address') }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-6">
              <vs-input class="w-full" label-placeholder="Sim Card CellNumber" v-model="storeEditData.cellNumber"
                name="Sim Card CellNumber" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('Sim Card CellNumber')">{{ errors.first('Sim Card CellNumber') }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
              <vs-input class="w-full" label-placeholder="FAMS Store GPS (Lat)" v-model="storeEditData.lat"
                name="FAMS Store GPS (Lat)" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('FAMS Store GPS (Lat)')">{{ errors.first('FAMS Store GPS (Lat)') }}</span>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-6">
              <vs-input class="w-full" label-placeholder="FAMS Store GPS (Long)" v-model="storeEditData.long"
                name="FAMS Store GPS (Long)" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('FAMS Store GPS (Long)')">{{ errors.first('FAMS Store GPS (Long)') }}</span>
            </div>
          </div>
          <div class="vx-col md:w-1/2 w-full mb-8">
            <div class="demo-alignment">
              <span>Store Active (No | Yes):</span>
              <div class="flex">
                <vs-switch class="rounded-pill" color="success" v-model="storeEditData.enable"></vs-switch>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-button class="rounded-lg mb-2" @click="showMapEdit">Edit Location</vs-button>
              </div>
              <vs-popup id="mapEdit" title="Edit Location" :active.sync="popupEditActive" v-show="mapEditVisible">
                <div id="app">
                  <GmapMap :center="center" :zoom="5" map-style-id="roadmap" :options="mapOptions"
                    style="width: auto;height: 60vmin;" ref="mapRef" @click="handleMapClick">
                    <GmapMarker :position="marker.position" :clickable="true" :draggable="true" @drag="handleMarkerDrag"
                      @click="panToMarker" />
                  </GmapMap>
                  <div></div>
                  <vs-button id="saveLocation" style=" top: 10px;" class="rounded-lg mr-3 mb-2" @click="saveLocation">
                    Submit</vs-button>
                  <feather-icon id="currentLocation" icon="MapPinIcon" style="top: 10px; float:right;"
                    svgClasses="w-10 h-10 hover:text-primary stroke-current" @click.stop="geolocate" />
                  <span style=" float:right; margin-right: 0.5rem; margin-top: 13px; ">Current Location:</span>
                </div>
              </vs-popup>
            </div>
          </div>
          <br>
          <div class="vx-row">
            <div class="vx-col sm:w-1/8 w-full mb-2">
              <vx-card ref="MainCard4">
                <label>FAMS Product per Store</label>
                <br>
                <div class="vx-row px-4 pb-3">
                  <div class="flex flex-wrap">
                    <vs-button class="rounded-lg mr-2" color="warning" type="gradient" @click="GetGridStoreProduct"
                      icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-button class="rounded-lg mr-3" color="success" type="gradient"
                      @click="PromptActiveProductToStoreAdd" icon-pack="feather" icon="icon-plus-square">Add New
                    </vs-button>
                  </div>
                </div>
                <div>
                  <vs-table ref="gridTable3" pagination :max-items="itemsPerPage" search :data="storeProductData"
                    class="vs-con-loading__container">
                    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                      <!-- ITEMS PER PAGE -->
                      <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                        <div
                          class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                          <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ storeData.length
                          - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : storeData.length }} of {{
                            storeData.length }}</span>
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
                      <vs-th sort-key="Product">product</vs-th>
                      <vs-th sort-key="fuelPrice">FuelPrice</vs-th>
                      <vs-th sort-key="scaler">FMS scaler</vs-th>
                      <vs-th sort-key="nr">Product Nr/Nozzle</vs-th>
                      <vs-th>Action</vs-th>
                    </template>
                    <!-- visible: false -->
                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="tr.product.name">{{tr.product.name}}</vs-td>
                        <vs-td :data="tr.fuelPrice">{{tr.fuelPrice}}</vs-td>
                        <vs-td :data="tr.scalar">{{tr.scalar}}</vs-td>
                        <vs-td :data="tr.nr">{{tr.nr}}</vs-td>
                        <vs-td id="iconContainer" class="whitespace-no-wrap">
                          <vx-tooltip class="flex" text="Edit Product">
                            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                              @click.stop="PromptActiveProductToStore(tr)" />
                          </vx-tooltip>
                          <vx-tooltip class="flex" text="Delete Product">
                            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2" @click.stop="deletePerProductToStore(tr)" />
                          </vx-tooltip>

                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </vx-card>
              <vs-prompt ref="statusPromptAdd" title="Add New Product" acceptText="Submit" cancelText="Cancel"
                @cancel="dropdownSelectProduct=0" @accept="AddPerProductToStore" :active.sync="statusPromptActiveAdd">
                <div class="vx-row">
                  <div class="vx-col sm:w-1/8 w-full mb-2">

                    <label>Product for FAMS store</label>
                    <v-select :options="productdropdownData" placeholder="Search / Select Product"
                      v-model="dropdownSelectProduct" @search:blur="populateDataProduct" />

                  </div>
                  <br>
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                    <vs-input class="w-full" label-placeholder="Product Fuel price" v-model="PerSPData.fuelPrice"
                      name="Product Fuel price" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('Product Fuel price')">{{ errors.first('Product Fuel price') }}</span>
                  </div>
                  <br>
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                    <vs-input class="w-full" label-placeholder="Product Scalar" v-model="PerSPData.scalar"
                      name="Product Scalar" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('Product Scalar')">{{ errors.first('Product Scalar') }}</span>
                  </div>
                  <br>
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                    <label>Product Nr/Nozzle</label>
                    <vs-input-number class="num-input_transparent" :min="1" :max="10" v-model="PerSPData.nr" />
                  </div>
                </div>
              </vs-prompt>

              <vs-prompt ref="statusPrompt" title="Updated selected product" acceptText="Submit" cancelText="Cancel"
                @cancel="dropdownSelectProduct=0" @accept="UpdatePerProductStore" :active.sync="statusPromptActive">


                <div class="vx-row">
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                    <vs-input class="w-full" disabled placeholder="Disabled" v-model="PerSPData.product " />
                  </div>
                  <br>
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                    <vs-input class="w-full" label-placeholder="Product Fuel price" v-model="PerSPData.fuelPrice"
                      name="Product Fuel price" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('Product Fuel price')">{{ errors.first('Product Fuel price') }}</span>
                  </div>

                  <div class="vx-col sm:w-1/8 w-full mb-2">
                    <vs-input class="w-full" label-placeholder="Product Scalar" v-model="PerSPData.scalar"
                      name="Product Scalar" v-validate="'required'" />
                    <span class="text-danger text-sm" v-show="errors.has('Product Scalar')">{{ errors.first('Product Scalar') }}</span>
                  </div>
                  <br>
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                    <label>Product Nr/Nozzle</label>
                    <vs-input-number class="num-input_transparent" :min="1" :max="10" v-model="PerSPData.nr" />
                  </div>
                </div>
              </vs-prompt>

            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-button id="addInfo" class="rounded-lg mr-3 mb-2" @click="UpdateStore">Submit</vs-button>
              <vs-button color="warning" type="border" class="rounded-lg mb-2" @click="cancelAdd">Close</vs-button>
            </div>
          </div>
        </template>
      </div>
    </vx-card>

    <vs-popup title="Store QR Code" :active.sync="popupGenerateQR">
      <div class="vx-col md:w-full w-full mb-5">
        <div id="qrCodeStore" ref="qrCodeStore" name="qrCodeStore" class="m-1/2 md-full ml-3">
          <label class="w-full">Store: {{ qrStore }}</label>
          <br/>
          <div class="vx-row px-4 pb-3">
            <qr-code :text="storeQR"></qr-code>
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
import storeSidebar from "./StoreSidebar.vue";
import storeDetailSidebar from "./StoreDetailSidebar.vue";
import GoogleMaps from 'google-maps';
import VueQRCodeComponent from 'vue-qrcode-component';
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      popupActive: false,
      popupViewActive: false,
      popupEditActive: false,
      title: 'FAMS - new Store Wizard!!',
      subtitle: 'Please complete each tab to add new Store',
      statusPromptActive: false,
      statusPromptActiveAdd: false,

      storeTypeSelect: 0,
      storeTypeSelectEdit: 0,
      timeZoneTypeSelect: 0,
      timeZoneTypeSelectEdit: 0,
      hardwareTypeSelect: 0,
      hardwareTypeSelectEdit: 0,

      operatorTypeData: [],
      timeZonedropdownData: [],
      storeTypedropdownData: [],
      hardwaredropdownData: [],
      dropdownSelectProduct: [],

      isListHidden: false,
      isInfoHidden: true,
      isInfoNewHidden: true,

      itemsPerPage: 10,
      storeSidebar: false,
      storeDetailSidebar: false,
      selected: [],
      storeData: [],
      storeProductData: [],
      productdropdownData: [],

      sidebarData: {},
      sidebarDetailData: {},
      isMounted: false,
      scalar: 1,

      PerSPData: {
        fuelPrice: 0,
        id: 0,
        nr: 0,
        scalar: 0,
        product: "",
        productId: 0,
        storeId: 0,
      },
      storeEditData: {
        id: 0,
        accountId: 0,
        storeTypeId: 0,
        storeType: "",
        hardwareId: 0,
        hardware: "",
        storeName: "",
        macAddress: "",
        ipAddress: "",
        cellNumber: "",
        enable: true,
        lat: "",
        long: "",
        createDate: "",
        renewDate: "",
        timeZone: "",
        timeZoneId: 0,
        product: "",
        productId: 0
      },
      formData: {
        Id: 0,
        accountId: 0,
        storeTypeId: 0,
        storeTypeName: "",
        timeZoneId: 0,
        timeZoneName: "",
        hardwareId: 0,
        hardwareName: "",
        storeName: "",
        macaddress: "",
        ipaddress: "",
        cellNumber: "",
        enable: true,
        lat: "",
        long: "",
        createdate: "",
        renewDate: "",
      },
      mapVisible: false,
      mapEditVisible: false,
      mapViewVisible: false,
      marker: { position: { lat: -29, lng: 24 } },
      defaultPosition: { lat: -29, lng: 24 },
      center: { lat: -29, lng: 24 },
      mapOptions: {
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      popupActive: false,
      popupViewActive: false,
      popupEditActive: false,
      editPos: { lat: 0, lng: 0 },

      showSubscription: false,

      subscriptionData: {
        id: 0,
        accountId: 0,
        createdDate: "",
        subInterval: 0,
        store: 0,
        subType: 0,
        renewDate: "",
        expiryDate: "",
        name: "",
        customPrice: 0,
        viewPrice: 0,
      },
      selectedStoreDD: 0,
      accountList: [],
      selectedAccountDD: 0,
      typeList: [],
      selectedType: 0,
      intervalList: [],
      selectedInterval: 0,
      // isBigboss: false,

      macSearch: "",
      ipSearch: "",
      nameSearch: "",
      macList: [],
      namesList: [],
      ipList: [],
      origMacList: [],
      origNamesList: [],
      origIpList: [],
      extName: false,
      extMac: false,
      extIp: false,
      popupGenerateQR: false,
      storeQR: '',
      qrStore: '',
    };
  },

  components: {
    flatPickr,
    storeSidebar,
    storeDetailSidebar,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    GoogleMaps,
    qrCode: VueQRCodeComponent,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  watch: {
    nameSearch(val) {
      var self = this;

      if (val != "") {
        self.namesList = self.origNamesList.filter(item => {
          return item.storeName.toLowerCase() == val.toLowerCase();
        });

        if (self.namesList.length == 0) {
          self.formData.storeName = val;
          self.extName = false;
        }
        else {
          self.extName = true;
        }
      }
    },
    macSearch(val) {
      var self = this;

      if (val != "") {
        self.macList = self.origMacList.filter(item => {
          return item.mac.toLowerCase() == val.toLowerCase();
        });

        if (self.macList.length == 0) {
          self.formData.macaddress = val;
          self.extMac = false;
        }
        else {
          self.extMac = true;
        }
      }
    },
    ipSearch(val) {
      var self = this;

      if (val != "") {
        self.ipList = self.origIpList.filter(item => {
          return item.ip.toLowerCase() == val.toLowerCase();
        });

        if (self.ipList.length == 0) {
          self.formData.ipaddress = val;
          self.extIp = false;
        }
        else {
          self.extIp = true;
        }
      }
    },
  },
  async mounted() {
    await this.GetGrid();
    await this.GetExistingMac();
    await this.GetExistingNames();
    await this.GetExistingIps();
    await this.GetstoreTypedropdown();
    await this.GetTimeZonedropdown();
    await this.GetHardwaredropdown();
    // await this.GetGridStoreProduct();
    await this.GetProductdropdown()
    
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
    onFailedNotify(text) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: text,
        color: 'warning'
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
    PromptActiveProductToStore(data) {
      var self = this;

      self.PerSPData.id = data.id;
      self.PerSPData.fuelPrice = data.fuelPrice;
      self.PerSPData.nr = data.nr;
      self.PerSPData.scalar = data.scalar;
      self.PerSPData.storeId = self.storeEditData.id;
      self.PerSPData.productId = data.productId;
      self.PerSPData.product = data.product.name;
      self.statusPromptActive = true;
      self.statusPromptActiveAdd = false;

    },
    UpdatePerProductStore() {
      const self = this;
      var myobject = {};
      myobject.Id = self.PerSPData.id
      myobject.fuelPrice = self.PerSPData.fuelPrice
      myobject.nr = self.PerSPData.nr
      myobject.scalar = self.PerSPData.scalar
      myobject.storeId = self.PerSPData.storeId
      myobject.productId = self.PerSPData.productId

      self.showLoadingOnElement("gridTable3", 1, "radius");
      var onSuccess = function (response) {
        self.GetGridStoreProduct();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable3.$el);
        self.successNotify();
      };
      self.$ajaxPut(
        self,
        "PerStoreProducts/" + self.PerSPData.id,
        myobject,
        onSuccess,
        onFinally
      );
    },

    PromptActiveProductToStoreAdd() {
      var self = this;
      self.PerSPData.id = 0;
      self.PerSPData.fuelPrice = 1;
      self.PerSPData.nr = 1;
      self.PerSPData.scalar = 1;
      self.PerSPData.productId = 0;

      self.statusPromptActive = false;
      self.statusPromptActiveAdd = true;
    },

    AddPerProductToStore() {
      const self = this;
      var myobject = {};
      myobject.Id = 0;
      myobject.fuelPrice = self.PerSPData.fuelPrice
      myobject.nr = self.PerSPData.nr
      myobject.scalar = self.PerSPData.scalar
      myobject.storeId = self.storeEditData.id
      myobject.productId = self.formData.productId

      self.showLoadingOnElement("gridTable3", 1, "radius");
      var onSuccess = function (response) {
        self.GetGridStoreProduct();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable3.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "PerStoreProducts",
        myobject,
        onSuccess,
        onFinally
      );
    },
    deletePerProductToStore(data) {
      const self = this;
      self.showLoadingOnElement("gridTable3", 1, "radius");
      var onSuccess = function (response) {
        self.GetGridStoreProduct();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable3.$el);
        self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "PerStoreProducts/" + data.id,
        onSuccess,
        onFinally
      );
    },
    addDataSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    editDataSidebar(data) {
      var self = this;
      self.isInfoNewHidden = false;
      self.isListHidden = true;
      self.isInfoHidden = true;
      self.editPos = { lat: parseFloat(self.storeEditData.lat), lng: parseFloat(self.storeEditData.long) };
      self.center = { lat: parseFloat(self.storeEditData.lat), lng: parseFloat(self.storeEditData.long) },
      
      self.storeEditData.id = data.id;
      self.timeZoneTypeSelectEdit = data.storeInfo[0].timeZone;
      self.storeEditData.timeZone = data.storeInfo[0].timeZone;
      self.storeEditData.timeZoneId = data.storeInfo[0].timeZoneId;
      self.storeTypeSelectEdit = data.storeInfo[0].storeType;
      self.storeEditData.storeTypeId = data.storeInfo[0].storeTypeId;
      self.storeEditData.storeType = data.storeInfo[0].storeType;
      self.storeEditData.hardwareId = data.storeInfo[0].hardwareId;
      self.storeEditData.hardware = data.storeInfo[0].hardware;
      self.storeEditData.storeName = data.storeName;
      self.storeEditData.macAddress = data.macAddress;
      self.storeEditData.ipAddress = data.ipAddress;
      self.storeEditData.cellNumber = data.storeInfo[0].cellNumber;
      self.storeEditData.enable = data.enable;
      self.storeEditData.lat = data.storeInfo[0].lat;
      self.storeEditData.long = data.storeInfo[0].long;
      self.storeEditData.createDate = data.createDate;
      self.storeEditData.renewDate = data.renewDate;
      
      setTimeout(() => {
        self.timeZoneTypeSelectEdit = self.timeZonedropdownData.filter(function (item) {
          return item.value == data.storeInfo[0].timeZoneId;
        })[0];
        self.storeTypeSelectEdit = self.storeTypedropdownData.filter(function (item) {
          return item.value == data.storeInfo[0].storeTypeId;
        })[0];
        
        self.hardwareTypeSelectEdit = self.hardwaredropdownData.filter(function (item) {
          return item.value == data.storeInfo[0].hardwareId;
        })[0];
      }, 100);
      this.GetGridStoreProduct();

    },
    editDetailDataSidebar(data) {
      this.isInfoNewHidden = true;
      this.isListHidden = false;
      this.isInfoHidden = true;

      this.sidebarDetailData = data;
      this.toggleDataDetailSidebar(true);
    },

    //********************* Event functions */
    initValues() {
      var self = this;
      self.formData.Id = 0,
        self.formData.accountId = 0,
        self.formData.storeTypeId = 0,
        self.formData.storeTypeName = "",
        self.formData.timeZoneId = 0,
        self.formData.timeZoneName = "",
        self.formData.hardwareId = 0,
        self.formData.hardwareName = "",
        self.formData.storeName = "",
        self.formData.macaddress = "",
        self.formData.ipaddress = "",
        self.formData.cellNumber = "",
        self.formData.enable = true,
        self.formData.lat = "",
        self.formData.long = "",
        self.formData.createdate = "",
        self.formData.renewDate = ""

      self.storeEditData.id = 0,
        self.storeEditData.accountId = 0,
        self.storeEditData.storeTypeId = 0,
        self.storeEditData.storeType = "",
        self.storeEditData.hardwareId = 0,
        self.storeEditData.hardware = "",
        self.storeEditData.storeName = "",
        self.storeEditData.macAddress = "",
        self.storeEditData.ipAddress = "",
        self.storeEditData.cellNumber = "",
        self.storeEditData.enable = true,
        self.storeEditData.lat = "",
        self.storeEditData.long = "",
        self.storeEditData.createDate = "",
        self.storeEditData.renewDate = "",
        self.storeEditData.timeZone = "",
        self.storeEditData.timeZoneId = 0,
        self.storeEditData.product = "",
        self.storeEditData.productId = 0

      self.mapVisible = false;
      self.mapEditVisible = false;
      self.mapViewVisible = false;
      self.$refs.wizard.navigateToTab(0);
    },
    populateDataStoreType() {
      var self = this;
      if (self.storeTypeSelect) {
        self.formData.storeTypeId = self.storeTypeSelect.value;
        self.formData.storeTypeName = self.storeTypeSelect.label;

        self.storeEditData.storeTypeId = self.storeTypeSelect.value;
        self.storeEditData.storeType = self.storeTypeSelect.label;
      }
    },

    populateDataProduct() {
      var self = this;
      if (self.dropdownSelectProduct) {
        self.formData.productId = self.dropdownSelectProduct.value;
        self.formData.product = self.dropdownSelectProduct.label;
      }
    },

    populateDataHardwareType() {
      var self = this;
      if (self.hardwareTypeSelect) {
        self.formData.hardwareId = self.hardwareTypeSelect.value;
        self.formData.hardwareName = self.hardwareTypeSelect.label;
      }
    },

    populateDataTimeZoneType() {
      var self = this;
      if (self.timeZoneTypeSelect) {
        self.formData.timeZoneId = self.timeZoneTypeSelect.value;
        self.formData.timeZoneName = self.timeZoneTypeSelect.label;

        self.storeEditData.timeZoneId = self.storeTypeSelect.value;
        self.storeEditData.timeZone = self.storeTypeSelect.label;

      }
    },

    cancelAdd() {
      this.isListHidden = false,
        this.isInfoHidden = true;
      this.isInfoNewHidden = true;

      this.initValues();
      this.GetGrid();
    },
    addVue() {
      var self = this;
      self.initValues();
      self.isInfoHidden = false;
      self.isListHidden = true
      self.isInfoNewHidden = true;

      self.GetstoreTypedropdown();
      self.GetTimeZonedropdown();
      self.GetHardwaredropdown();

    },

    saveOperatorParameters(data) {
    },
    //  initValues() {
    //       var self = this;
    //       self.mapVisible = false;
    //       self.mapEditVisible = false;
    //       self.mapViewVisible = false;
    //       self.$refs.wizard.navigateToTab(0)
    //  },
    //********************* SQL events */
    formSubmitted() {
      var self = this;
      var myobject = {};
      if (self.extName) {
        self.onFailedNotify('Name Already Exist, Please Enter A New Name')
      }
      else if (self.extIp) {
        self.onFailedNotify('IP Address Already Exist, Please Enter A New IP Address')
      }
      else if (self.extMac) {
        self.onFailedNotify('Mac Address Already Exist, Please Enter A New Mac Address')
      }
      else {
        myobject.Id = 0;
        myobject.accountId = localStorage.getItem('userAccountId');
        myobject.storeTypeId = self.formData.storeTypeId;
        myobject.timeZoneId = self.formData.timeZoneId;
        myobject.hardwareId = self.formData.hardwareId;
        myobject.Name = self.formData.storeName;
        myobject.macaddress = self.formData.macaddress;
        myobject.ipaddress = self.formData.ipaddress;
        myobject.cellNumber = self.formData.cellNumber;
        myobject.enable = self.formData.enable;
        myobject.lat = self.formData.lat;
        myobject.long = self.formData.long;

        myobject.createdate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        const createDate = new Date(myobject.createdate);
        const renewDate = new Date(createDate);
        // renewDate.setFullYear(renewDate.getFullYear() + 1);
        renewDate.setMonth(renewDate.getMonth() + 1);

        myobject.renewDate = renewDate.toJSON().slice(0, 10).replace(/-/g, '/');

        self.subscriptionData.subInterval = self.selectedInterval.value;
        self.subscriptionData.subType = self.selectedType.value;
        const obj = {};
        obj.store = myobject;
        obj.Name = "FAMS/ATG_" + self.formData.storeName;
        obj.SubscriptionIntervalId = 2;
        obj.SubscriptionTypeId = 1;
        obj.CreateDate = myobject.createdate;
        obj.ExpriryDate = myobject.renewDate;
        obj.RenewDate = myobject.renewDate;
        obj.customPrice = 0;
        
        // var submit = {
        //   store: myobject,
        //   subscriptionItem: obj
        // };
        self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.isListHidden = false,
            self.isInfoHidden = true;
          self.isInfoNewHidden = true;
          self.initValues();
          self.GetGrid();
          //self.GetGrid();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.gridTable.$el);
          self.successNotify();
        };
        self.$ajaxPost(
          self,
          "Stores",
          obj,
          onSuccess,
          onFinally
        );
      }
    },
    UpdateStore() {
      var self = this;
      var myobject = {};
      myobject.Id = self.storeEditData.id;
      myobject.accountId = localStorage.getItem('userAccountId');
      myobject.storeTypeId = self.storeTypeSelectEdit.value;
      myobject.hardwareId = self.hardwareTypeSelectEdit ? self.hardwareTypeSelectEdit.value : self.storeEditData.hardwareId;
      myobject.timeZoneId = self.timeZoneTypeSelectEdit.value;
      myobject.Name = self.storeEditData.storeName;
      myobject.macAddress = self.storeEditData.macAddress;
      myobject.ipAddress = self.storeEditData.ipAddress;
      myobject.cellNumber = self.storeEditData.cellNumber;
      myobject.enable = self.storeEditData.enable;
      myobject.lat = self.storeEditData.lat;
      myobject.long = self.storeEditData.long;
      myobject.createDate = self.storeEditData.createDate;
      myobject.renewDate = self.storeEditData.renewDate;

      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.isListHidden = false,
          self.isInfoHidden = true;
        self.isInfoNewHidden = true;
        self.initValues();
        self.GetGrid();

      };
      var onFinally = function () {

        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPut(
        self,
        "Stores/" + self.storeEditData.id,
        myobject,
        onSuccess,
        onFinally
      );
    },
    updateGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPut(
        self,
        "Stores/" + data.id,
        data,
        onSuccess,
        onFinally
      );
    },
    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "Stores/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.storeData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetStore",
        onSuccess,
        onFinally
      );
    },
    GetGridStoreProduct() {
      const self = this;
      self.showLoadingOnElement("gridTable3", 1, "radius");
      var onSuccess = function (response) {
        self.storeProductData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable3.$el);
      };
      self.$ajaxGet(
        self,
        "PerStoreProducts/GetPerProductStore?StoreId=" + self.storeEditData.id,
        onSuccess,
        onFinally
      );
    },

    GetHardwaredropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.hardwaredropdownData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetHardwaredropdown",
        onSuccess,
        onFinally
      );
    },
    GetTimeZonedropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.timeZonedropdownData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetTimeZonedropdown",
        onSuccess,
        onFinally
      );
    },
    GetstoreTypedropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.storeTypedropdownData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetstoreTypedropdown",
        onSuccess,
        onFinally
      );
    },
    GetProductdropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.productdropdownData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Products",
        onSuccess,
        onFinally
      );
    },


    toggleDataSidebar(val = false) {
      this.storeSidebar = val;
    },
    toggleDataDetailSidebar(val = false) {
      this.storeDetailSidebar = val;
    },

    showMap() {
      this.mapVisible = true;
      this.popupActive = true;
      this.panToMarker();
    },

    showMapEdit() {

      this.center = { lat: parseFloat(this.storeEditData.lat), lng: parseFloat(this.storeEditData.long) };
      this.marker.position = { lat: parseFloat(this.storeEditData.lat), lng: parseFloat(this.storeEditData.long) };

      this.mapEditVisible = true;
      this.popupEditActive = true;
      this.panToMarker();
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.panToMarker();
      });
    },

    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.panToMarker();
      console.log(e);
    },

    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);

    },

    saveLocation(e) {
      if (!this.isInfoNewHidden) {
        this.storeEditData.lat = this.marker.position.lat;
        this.storeEditData.long = this.marker.position.lng;
        this.mapEditVisible = false;
      }
      else {
        this.formData.lat = this.marker.position.lat;
        this.formData.long = this.marker.position.lng;
        this.mapVisible = false;
      }

      if (this.formData.lat == "" && this.formData.long == "") {
        this.$refs.mapRef.panTo(this.center);
        this.marker.position = this.defaultPosition;
      }
    },
    viewLocation(tr) {
      this.center = { lat: parseFloat(tr.storeInfo[0].lat), lng: parseFloat(tr.storeInfo[0].long) };
      this.marker.position = { lat: parseFloat(tr.storeInfo[0].lat), lng: parseFloat(tr.storeInfo[0].long) };

      this.mapViewVisible = true;
      this.popupViewActive = true;
      this.panToMarker();
    },
    doneView() {
      this.mapViewVisible = false;
      this.popupViewActive = false;
    },
    showSubscriptionTab() {
      this.showSubscription = true;
      this.initSubscription();
    },
    hideSubscriptionTab() {
      this.showSubscription = false;
    },
    initSubscription() {
      var self = this;
      self.subscriptionData.subInterval = 0;
      self.subscriptionData.store = 0;
      self.subscriptionData.subType = 0;
      self.subscriptionData.customPrice = 0;
      self.subscriptionData.viewPrice = 0;
      self.subscriptionData.name = "";

      self.typeList = [];
      self.intervalList = [];
      self.accountList = [];
      self.selectedStore = 0;
      self.selectedAccount = 0;
      self.selectedType = 0;
      self.selectedInterval = 0;

      var date = new Date();
      self.subscriptionData.createdDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.subscriptionData.expiryDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      self.subscriptionData.renewDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      // self.GetGrid();
      self.getAccountList();
      self.getTypesList();
      self.getIntervalList();
    },
    populateType() {
      const self = this;
      if (self.selectedType && self.selectedInterval.value == 1 && self.subscriptionData.customPrice == 0) {
        self.subscriptionData.viewPrice = (self.selectedType.price * 12);
      }
      else if (self.selectedType && self.selectedInterval.value == 2 && self.subscriptionData.customPrice == 0) {
        self.subscriptionData.viewPrice = self.selectedType.price;
      }
      else if (self.selectedType && self.selectedInterval.value == 3 && self.subscriptionData.customPrice == 0) {
        self.subscriptionData.viewPrice = (self.selectedType.price * 4);
      }
      else if (self.selectedType && self.selectedInterval.value == 4 && self.subscriptionData.customPrice == 0) {
        self.subscriptionData.viewPrice = (self.selectedType.price * 6);
      }
      else if (self.selectedType && self.selectedInterval.value == 1 && self.subscriptionData.customPrice > 0) {
        self.subscriptionData.viewPrice = (self.subscriptionData.customPrice * 12);
      }
      else if (self.selectedType && self.selectedInterval.value == 2 && self.subscriptionData.customPrice > 0) {
        self.subscriptionData.viewPrice = self.subscriptionData.customPrice;
      }
      else if (self.selectedType && self.selectedInterval.value == 3 && self.subscriptionData.customPrice > 0) {
        self.subscriptionData.viewPrice = (self.subscriptionData.customPrice * 4);
      }
      else if (self.selectedType && self.selectedInterval.value == 4 && self.subscriptionData.customPrice > 0) {
        self.subscriptionData.viewPrice = (self.subscriptionData.customPrice * 6);
      }

      if (self.selectedType && self.selectedAccountDD) {
        if (self.selectedType.value == 1 || self.selectedType.value == 2) {
          self.populateName();
        }
        else {
          self.populateName();
        }
      }
    },
    populateName() {
      var self = this;
      if (self.selectedType && self.selectedAccountDD) {
        if (self.selectedType.value == 1 || self.selectedType.value == 2) {
          self.subscriptionData.name = self.selectedType.label + "_" + self.formData.storeName;
        }
        else {
          self.subscriptionData.name = self.selectedType.label + "_" + self.selectedAccountDD.label;
        }
      }
    },
    getAccountList() {
      var self = this;
      var onSuccess = response => {
        self.accountList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.selectedAccountDD = self.accountList.filter(function (item) {
          return item.value == localStorage.getItem("userAccountId");
        })[0];
      }
      var onFinally = response => {
      }
      self.$ajaxGet(self, "Accounts/GetAccountdropdown", onSuccess, onFinally);
    },
    getTypesList() {
      var self = this;
      var onSuccess = response => {
        self.typeList = response.data.map((item) => {
          return { label: item.name, value: item.id, price: item.price };
        });
      }
      var onFinally = response => {
      }
      self.$ajaxGet(self, "Subscription/GetSubscriptionTypes", onSuccess, onFinally);
    },
    getIntervalList() {
      var self = this;
      var onSuccess = response => {
        self.intervalList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
      var onFinally = response => {
      }

      self.$ajaxGet(self, "Subscription/GetSubscriptionIntervals", onSuccess, onFinally);
    },
    customPriceDown() {
      var self = this;

      if (self.formData.customPrice > 0) {
        if (self.selectedInterval.value == 1) {
          self.formData.viewPrice = (self.formData.customPrice * 12);
        }
        else if (self.selectedInterval.value == 2) {
          self.formData.viewPrice = self.formData.customPrice;
        }
        else if (self.selectedInterval.value == 3) {
          self.formData.viewPrice = (self.formData.customPrice * 4);
        }
        else if (self.selectedInterval.value == 4) {
          self.formData.viewPrice = (self.formData.customPrice * 6);
        }
      }
      else {
        if (self.selectedType && self.selectedInterval.value == 1) {
          self.formData.viewPrice = (self.selectedType.price * 12);
        }
        else if (self.selectedType && self.selectedInterval.value == 2) {
          self.formData.viewPrice = self.selectedType.price;
        }
        else if (self.selectedType && self.selectedInterval.value == 3) {
          self.formData.viewPrice = (self.selectedType.price * 4);
        }
        else if (self.selectedType && self.selectedInterval.value == 4) {
          self.formData.viewPrice = (self.selectedType.price * 6);
        }
        else {
          self.formData.viewPrice = self.selectedType.price;
        }

      }
    },
    GetExistingMac() {
      const self = this;
      var onSuccess = function (response) {
        self.origMacList = response.data;
        self.macList = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetExistingMac",
        onSuccess,
        onFinally
      );
    },
    GetExistingNames() {
      const self = this;
      var onSuccess = function (response) {
        self.origNamesList = response.data;
        self.namesList = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetExistingStoreName",
        onSuccess,
        onFinally
      );
    },
    GetExistingIps() {
      const self = this;
      var onSuccess = function (response) {
        self.origIpList = response.data;
        self.ipList = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetExistingIP",
        onSuccess,
        onFinally
      );
    },
    generateQR(data) {
      console.log(data);
      var obj = {
        id: data.id,
        store: data.storeName,
        accountId: data.accountId,
        ipAddress: data.ipAddress,
        macAddress: data.macAddress
      }
      this.qrStore = data.storeName;
      this.storeQR = JSON.stringify(obj);
      this.storeQR = this.storeQR + `\n\nhttps://shop.fams.co.za/ \n\n https://www.fams.co.za/`
      this.popupGenerateQR = true;
    },
    async saveQR() {
      const qrCodeElement = this.$refs.qrCodeStore;

      try {
        // Use html2canvas to render the HTML element as an image
        const canvas = await html2canvas(qrCodeElement);

        // Convert the canvas to a data URL
        const imageDataURL = canvas.toDataURL('image/png');

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'qrCodeStore.png';

        // Simulate a click on the link element to trigger the download
        link.click();
      } catch (error) {
        console.error('Error saving image:', error);
      }
    },
    async printQR() {
      // Get HTML to print from element
      const prtHtml = document.getElementById('qrCodeStore').innerHTML;

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
<style lang="scss">
#mapPop div.vs-popup {
  width: 1000px;
  height: auto;
}

#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>