<template>
  <div>
    <h3 class="p-3">FAMS' GPS Filter Information Page</h3>
    <vs-tabs style="width: auto min-height:500px">
      <vs-tab label="Axxiss Information" style="min-height: 500px">
        <template>
          <vx-card
            class="pb-3"
            refresh-content-action
            @refresh="closeCardAnimationDemo"
            collapse-action
          >
            <div class="vx-row">
              <div class="vx-col w-full mb-base">
                <div class="vx-row">
                  <div class="vx-col md:w-1/2 w-full mt-2">
                    <label>From date</label>
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
                    <label>To date</label>
                    <datepicker
                      class="w-full"
                      id="ToDate"
                      placeholder="To Date"
                      v-model="formData.toDate"
                      format="yyyy-MM-dd"
                      name="To Date"
                      v-validate="'required'"
                    ></datepicker>
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('To Date')"
                      >{{ errors.first("To Date") }}</span
                    >
                  </div>
                </div>
                <br />

                <div class="vx-col w-full mb-base">
                  <vs-button
                    ref="submit"
                    id="addInfo"
                    class="rounded-lg w-full vs-con-loading__container"
                    color="primary"
                    @click="GetGrid()"
                    >Submit</vs-button
                  >
                </div>
              </div>
            </div>
            <vx-card ref="MainCardGrid" class="pb-3" v-show="!isMounted">
              <div class="vx-row">
                <div class="vx-col w-full mb-base">
                  <vs-table
                    ref="gridTable"
                    v-model="selected"
                    pagination
                    :max-items="itemsPerPage"
                    search
                    :data="GPSData"
                    class="vs-con-loading__container"
                  >

                    <div
                      slot="header"
                      class="flex flex-wrap-reverse items-center flex-grow"
                    >
                      <!-- ADD NEW -->
                      <!-- ITEMS PER PAGE -->
                      <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                        <div
                          class="
                            p-4
                            border border-solid border-grey-light
                            rounded-full
                            d-theme-dark-bg
                            cursor-pointer
                            flex
                            items-center
                            justify-between
                            font-medium
                          "
                        >
                        <span class="mr-2"
                          >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                          {{
                            GPSData.length - currentPage * itemsPerPage > 0
                              ? currentPage * itemsPerPage
                              : GPSData.length
                          }}
                          of {{ GPSData.length }}</span
                        >
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
                      <vs-th sort-key="EqpTag">EqpTag</vs-th>
                      <vs-th sort-key="Date">Date</vs-th>
                      <vs-th sort-key="odometer">Odometer</vs-th>
                      <vs-th sort-key="engineTime">EngineTime</vs-th>
                      <vs-th sort-key="volume">Volume</vs-th>
                      <vs-th sort-key="gpsImei">GPSImei</vs-th>
                      <vs-th sort-key="gpsUid">GPSUid</vs-th>
                      <vs-th>Action</vs-th>
                    </template>
                    <!-- visible: false -->
                    <template slot-scope="{ data }">
                      <vs-tr>
                        <vs-td></vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gRegistration"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gDescription"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gEqpTag"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gDate"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gOdometer"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gEngineTime"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gVolume"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gGPSImei"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td>
                          <vs-input
                            v-model="gGPSUid"
                            class="w-full"
                          />
                        </vs-td>
                        <vs-td></vs-td>
                      </vs-tr>
                      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="tr.eqp.registration">{{
                          tr.eqp.registration
                        }}</vs-td>
                        <vs-td :data="tr.eqp.description">{{
                          tr.eqp.description
                        }}</vs-td>
                        <vs-td :data="tr.eqp.tag">{{ tr.eqp.tag }}</vs-td>
                        <vs-td :data="tr.createdate">{{
                          formatDate(
                            tr.createdate.replace("T", " ").split(".")[0]
                          )
                        }}</vs-td>
                        <vs-td :data="tr.km">{{ tr.km }}</vs-td>
                        <vs-td :data="tr.hour">{{ tr.hour }}</vs-td>
                        <vs-td :data="tr.volume">{{ tr.volume }}</vs-td>
                        <vs-td :data="tr.eqpGPS.gpsImei">{{  tr.eqpGPS.gpsImei}}</vs-td>
                        <vs-td :data="tr.eqpGPS.gpsUid">{{tr.eqpGPS.gpsUid}}</vs-td>
                        <vs-td class="whitespace-no-wrap" id="iconContainer" >
                          <vx-tooltip class="flex" text="Show Location">
                            <feather-icon
                              icon="MapPinIcon"
                              svgClasses="w-5 h-5 hover:text-primary stroke-current"
                              @click.stop="viewLocation(tr)"
                            />
                          </vx-tooltip>
                          <vx-tooltip class="flex" text="Axxis | FAMS Update EQP">
                              <feather-icon
                              icon="SettingsIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                              @click.stop="showstatusPromptAxxis(tr)"
                            />
                          </vx-tooltip>
                        </vs-td>
                         <template class="expand-user" slot="expand">
                          <div class="con-expand-users w-full">
                            <vs-table
                              ref="gridTable2"
                              v-model="selected"
                              :data="tr.udTrack"
                            >
                              <template slot="thead">
                                <vs-th>name</vs-th>
                                <vs-th>uid</vs-th>
                                <vs-th>gpsTimeLocal</vs-th>
                                <vs-th>odometer</vs-th>
                                <vs-th>engineTime</vs-th>
                                <vs-th>engineStatus</vs-th>
                                <vs-th>speed</vs-th>
                                <vs-th>speedMeasure</vs-th>
                                <vs-th>address</vs-th>
                                <vs-th>heading</vs-th>
                                <vs-th>ignition</vs-th>
                                <vs-th>latitude</vs-th>
                                <vs-th>longitude</vs-th>
                              </template>
                              <!-- visible: false -->
                              <template slot-scope="{ data }">
                                <vs-tr
                                  :data="tr"
                                  :key="indextr"
                                  v-for="(tr, indextr) in data"
                                >
                                  <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                                  <vs-td :data="tr.uid">{{ tr.uid }}</vs-td>
                                  <vs-td :data="tr.gpsTimeLocal">{{
                                    tr.gpsTimeLocal
                                  }}</vs-td>
                                  <vs-td :data="tr.odometer">{{
                                    tr.odometer
                                  }}</vs-td>
                                  <vs-td :data="tr.engineTime">{{
                                    tr.engineTime
                                  }}</vs-td>
                                  <vs-td :data="tr.engineStatus">{{
                                    tr.engineStatus
                                  }}</vs-td>
                                  <vs-td :data="tr.speed">{{ tr.speed }}</vs-td>
                                  <vs-td :data="tr.speedMeasure">{{
                                    tr.speedMeasure
                                  }}</vs-td>
                                  <vs-td :data="tr.address">{{
                                    tr.address
                                  }}</vs-td>
                                  <vs-td :data="tr.heading">{{
                                    tr.heading
                                  }}</vs-td>
                                  <vs-td :data="tr.ignition">{{
                                    tr.ignition
                                  }}</vs-td>
                                  <vs-td :data="tr.latitude">{{
                                    tr.latitude
                                  }}</vs-td>
                                  <vs-td :data="tr.longitude">{{
                                    tr.longitude
                                  }}</vs-td>

                                    <template class="expand-user" slot="expand">
                                      <div class="con-expand-users w-full">
                                        <vs-table
                                          ref="gridTable3"
                                          v-model="selected"
                                          :data="tr.sensorInfo"
                                        >
                                          <template slot="thead">
                                            <vs-th>sensorDate</vs-th>
                                            <vs-th>sensorName</vs-th>
                                            <vs-th>sensorMeasurement</vs-th>
                                            <vs-th>sensorValue</vs-th>
                                          </template>
                                          <!-- visible: false -->
                                          <template slot-scope="{ data }">
                                            <vs-tr
                                              :data="tr"
                                              :key="indextr"
                                              v-for="(tr, indextr) in data"
                                            >
                                            <vs-td :data="tr.sensorDate">{{ tr.sensorDate }}</vs-td>
                                            <vs-td :data="tr.sensorName">{{ tr.sensorName }}</vs-td>
                                            <vs-td :data="tr.sensorMeasurement">{{ tr.sensorMeasurement }}</vs-td>
                                            <vs-td :data="tr.sensorValue">{{ tr.sensorValue}}</vs-td>
                                            </vs-tr>
                                          </template>
                                        </vs-table>
                                      </div>
                                    </template>
                                </vs-tr>
                              </template>
                            </vs-table>
                          </div>
                        </template> 
         
 
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </div>
            </vx-card>
          </vx-card>
          <vx-card>
            <vs-popup
              id="mapPop"
              title="Pick Location"
              fullscreen
              style="display: flex !important"
              :active.sync="popupActive"
              v-show="mapVisible"
            >
              <div id="app">
                <GmapMap
                  :center="center"
                  :zoom="5"
                  map-style-id="roadmap"
                  :options="mapOptions"
                  style="width: auto; height: 70vmin"
                  ref="mapRef"
                  id="mapID"
                >
                  <GmapMarker
                    :position="marker.position"
                    :clickable="true"
                    :draggable="false"
                    @click="panToMarker"
                  />
                </GmapMap>
              </div>
            </vs-popup>
          </vx-card>
        </template>
      </vs-tab>
    </vs-tabs>
    <vs-popup
      ref="statusPrompt"
      id="statusPrompt"
      title="Last Axxis Information"
      fullscreen
      style="display: flex !important"
      :active.sync="statusPromptActive"
      v-show="popupVisible"
    >
     <div class="vx-row w-full mb-3">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>registration</label>
          <vs-input v-model="Axxisdata.registration" class="w-full" disabled  name="Name"></vs-input>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>imei</label>
           <vs-input v-model="Axxisdata.imei" class="w-full"  disabled  name="Name"></vs-input>
        </div>

        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>uid</label>
           <vs-input v-model="Axxisdata.uid" class="w-full"  disabled  name="Name"></vs-input>
        </div>

      </div>


      <div class="vx-row w-full mb-3">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>currentDate</label>
          <vs-input v-model="Axxisdata.currentDate" class="w-full" disabled  name="Name"></vs-input>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>address</label>
           <vs-input v-model="Axxisdata.address" class="w-full"  disabled  name="Name"></vs-input>
        </div>

          <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>engineStatus</label>
           <vs-input v-model="Axxisdata.engineStatus" class="w-full"  disabled  name="Name"></vs-input>
        </div>
      </div>

      <div class="vx-row w-full mb-3">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>engineTime</label>
          <vs-input v-model="Axxisdata.engineTime" class="w-full" disabled  name="Name"></vs-input>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>engineTimeRaw</label>
           <vs-input v-model="Axxisdata.engineTimeRaw" class="w-full"  disabled  name="Name"></vs-input>
        </div>

          <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>gpstimeLocal</label>
           <vs-input v-model="Axxisdata.gpstimeLocal" class="w-full"  disabled  name="Name"></vs-input>
        </div>
      </div>


      <div class="vx-row w-full mb-3">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>heading</label>
          <vs-input v-model="Axxisdata.heading" class="w-full" disabled  name="Name"></vs-input>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>ignition</label>
           <vs-input v-model="Axxisdata.ignition" class="w-full"  disabled  name="Name"></vs-input>
        </div>

          <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>odometer</label>
           <vs-input v-model="Axxisdata.odometer" class="w-full"  disabled  name="Name"></vs-input>
        </div>
      </div>


      <div class="vx-row w-full mb-3">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>latitude</label>
          <vs-input v-model="Axxisdata.latitude" class="w-full" disabled  name="Name"></vs-input>
        </div>
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>longitude</label>
           <vs-input v-model="Axxisdata.longitude" class="w-full"  disabled  name="Name"></vs-input>
        </div>

          <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>speed</label>
           <vs-input v-model="Axxisdata.speed" class="w-full"  disabled  name="Name"></vs-input>
        </div>
      </div>

      <div class="vx-row w-full mb-3">
        <div
          class="vx-col w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-2"
        >
          <label>speedMeasure</label>
          <vs-input v-model="Axxisdata.speedMeasure" class="w-full" disabled  name="Name"></vs-input>
        </div>
     
      </div>

    </vs-popup>

    <vs-prompt
      ref="statusPromptAxxissUpdate"
      title="Update Transaction's Axxis Info"
      @accept="UpdateGPSData"
      acceptText="Yes"
      cancelText="No"
      :active.sync="statusPromptAxxis"
    >
    <div class="con-exemple-prompt">
        <div>
          <label>You are about to override/update the transaction's Axiss data. Are you Sure</label>
        </div>
      </div>
    </vs-prompt>

  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import GoogleMaps from "google-maps";
import Vue from "vue";

export default {
  data() {
    return {
      statusPromptAxxis: false,
      statusPromptActive: false,
      selectedAxxis: [],
      formData: {
        fromDate: "",
        toDate: "",
        report: "",
      },
      Axxisdata: {
        accountId: 0,
        address: "N/A",
        currentDate: "N/A",
        driverCode: "N/A",
        driverFirstName: "N/A",
        driverLastName: "N/A",
        engineStatus: "N/A",
        engineTime: "N/A",
        engineTimeRaw: "N/A",
        gpstimeLocal: "N/A",
        heading: "N/A",
        id: "N/A",
        ignition: "N/A",
        imei: "N/A",
        infoStatus: "N/A",
        latitude: "N/A",
        longitude: "N/A",
        message: "N/A",
        name: "N/A",
        odometer: "N/A",
        perEquipmentIntegrationId: "N/A",
        registration: "N/A",
        speed: "N/A",
        speedMeasure: "N/A",
        title: "N/A",
        uid: "N/A",
        usageDispensingId: "N/A",
        userIdGuid: "N/A"
      },
      itemsPerPage: 10,
      itemsPerPageAxxis: 10,
      selected: [],
      GPSData: [],
      origGPSData: [],
      GPSAxxislatest: [],
      isMounted: true,
      toDelete: {},

      mapVisible: false,
      popupVisible: false,
      marker: { position: { lat: 0, lng: 0 } },
      defaultPosition: { lat: 0, lng: 0 },
      center: { lat: 0, lng: 0 },
      mapOptions: {
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      },
      popupActive: false,
      editPos: { lat: 0, lng: 0 },

      gRegistration: "",
      gDescription: "",
      gEqpTag: "",
      gDate: "",
      gOdometer: "",
      gEngineTime: "",
      gVolume: "",
      gGPSImei: "",
      gGPSUid: "",
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    GoogleMaps,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return 0;
      }
      return this.$refs.gridTable.currentx;
    },
  },
  watch:{
    gRegistration(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.eqp.registration.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gDescription(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.eqp.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gEqpTag(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.eqp.tag.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gDate(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.createdate.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gOdometer(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.km == parseInt(val);
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gEngineTime(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.hour == parseInt(val);
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gVolume(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.volume == parseInt(val);
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gGPSImei(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.eqpGPS.gpsImei.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
    gGPSUid(val){
      var self = this;
      
      if(val != ""){
        self.GPSData = self.origGPSData.filter(item => {
          return item.eqpGPS.gpsUid.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        return self.GPSData;
      }
      else{
        self.GPSData = self.origGPSData;
      }
    },
  },
  mounted() {
    var self = this;
    var date = new Date();
    self.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    self.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    self.mapVisible = false;
    self.popupVisible = false;
    self.popupActive = false;
    self.isMounted = true;
    self.statusPromptAxxis = false;
    self.statusPromptActive = false;
    // self.GetGrid();
  },
  methods: {

  FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
    },

 showstatusPromptAxxis(data) {
    var self = this;
   self.selectedAxxis = data
   self.statusPromptActive = false;
   self.statusPromptAxxis = true;
 },

  UpdateGPSData() {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
          if(response.status == 200)
            {
             
               self.successNotifyLoadCustom("Axxis Data succefully update/collected from Source");
               self.GetGrid();
            }  
            else
            {
            self.FailedCustomNotify("Oops - something went wrong. Please log a ticket");
            }      
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.statusPromptAxxis = false;
        self.statusPromptActive = false;
      };
      //(string accountID, string userID, int EquipmentID, long UsageDispensingID)
      self.$ajaxGet(
        self,
        "Integration3dtracking/Get3DTracking?accountID=" + self.selectedAxxis.accountId + "&userID=1" + "&EquipmentID=" + self.selectedAxxis.equipmentId + "&UsageDispensingID=" + self.selectedAxxis.id,
        onSuccess,
        onFinally
      );
     
    },


  // //This will show once we select the button popup the dropdown option
    showStatusPrompt(data) {
      var self = this;
      var temp = data.eqpGPS.gpsImei;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
          self.GPSAxxislatest = response.data;
          self.Axxisdata.accountId = response.data.accountId;
          self.Axxisdata.address= response.data.address;
          self.Axxisdata.currentDate= response.data.currentDate;
          self.Axxisdata.driverCode= response.data.driverCode;
          self.Axxisdata.driverFirstName= response.data.driverFirstName;
          self.Axxisdata.driverLastName= response.data.driverLastName;
          self.Axxisdata.engineStatus= response.data.engineStatus;
          self.Axxisdata.engineTime= response.data.engineTime;
          self.Axxisdata.engineTimeRaw= response.data.engineTimeRaw;
          self.Axxisdata.gpstimeLocal= response.data.gpstimeLocal;
          self.Axxisdata.heading= response.data.heading;
          self.Axxisdata.id= response.data.id;
          self.Axxisdata.ignition= response.data.ignition;
          self.Axxisdata.imei= response.data.imei;
          self.Axxisdata.infoStatus= response.data.infoStatus;
          self.Axxisdata.latitude= response.data.latitude;
          self.Axxisdata.longitude= response.data.longitude;
          self.Axxisdata.message= response.data.message;
          self.Axxisdata.name= response.data.name;
          self.Axxisdata.odometer= response.data.odometer;
          self.Axxisdata.perEquipmentIntegrationId= response.data.perEquipmentIntegrationId;
          self.Axxisdata.registration= response.data.registration;
          self.Axxisdata.speed= response.data.speed;
          self.Axxisdata.speedMeasure= response.data.speedMeasure;
          self.Axxisdata.title= response.data.title;
          self.Axxisdata.uid= response.data.uid;
          self.Axxisdata.usageDispensingId= response.data.usageDispensingId;
          self.Axxisdata.userIdGuid= response.data.userIdGuid;
          self.statusPromptAxxis = false;
          self.statusPromptActive = true;
          self.popupVisible = true;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Integration3dtracking/Get3DTrackingpsIMEUID?gpsIMEUID=" + data.eqpGPS.gpsImei + "&gpsUID=" + data.eqpGPS.gpsUid,
        onSuccess,
        onFinally
      );
     
    },



    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
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

    closeCardAnimationDemo(card) {
      var date = new Date();
      this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.formData.toDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );
      card.removeRefreshAnimation(3000);
    },

    //********************* System related*/
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully added | updated | removed",
        color: "success",
      });
    },
    successNotifyLoadCustom(msg) {
      this.$vs.notify({
        title: "Successfully",
        text: msg,
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

    GetGrid() {
      const self = this;
      self.isMounted = false;
      var famsURL = `fromdate=${self.dateFormat(
        self.formData.fromDate
      )}&todate=${self.dateFormat(self.formData.toDate)}`;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.GPSData = response.data;
        self.origGPSData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "Integration3dtracking/Get3DTrackDetailInformationFilter?" + famsURL,
        onSuccess,
        onFinally
      );
    },
    viewLocation(tr) {
      this.center = {
        lat: parseFloat(tr.udTrack[0].latitude),
        lng: parseFloat(tr.udTrack[0].longitude),
      };
      this.marker.position = {
        lat: parseFloat(tr.udTrack[0].latitude),
        lng: parseFloat(tr.udTrack[0].longitude),
      };

      /////Code to show marker info

      const map = new google.maps.Map(document.getElementById("mapID"), {
        zoom: 5,
        center: this.center,
      });
      const contentString =
        `<h6>Name: ${tr.udTrack[0].name}</h6>` +
        `<h6>UID: ${tr.udTrack[0].uid}</h6>` +
        `<h6>GPSTimeLocal: ${tr.udTrack[0].gpsTimeLocal}</h6>` +
        `<h6>Odometer: ${tr.udTrack[0].odometer}</h6>` +
        `<h6>EngineTime: ${tr.udTrack[0].engineTime}</h6>` +
        `<h6>EngineStatus: ${tr.udTrack[0].engineStatus}</h6>` +
        `<h6>Speed: ${tr.udTrack[0].speed}</h6>` +
        `<h6>SpeedMeasure: ${tr.udTrack[0].speedMeasure}</h6>` +
        `<h6>Address: ${tr.udTrack[0].address}</h6>` +
        `<h6>Heading: ${tr.udTrack[0].heading}</h6>` +
        `<h6>Ignition: ${tr.udTrack[0].ignition}</h6>` +
        `<h6>Latitude: ${tr.udTrack[0].latitude}</h6>` +
        `<h6>Longitude: ${tr.udTrack[0].longitude}</h6>`;
      
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new google.maps.Marker({
        position: this.marker.position,
        map,
        title: "Information",
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
      //////End marker info

      this.mapVisible = true;
      this.popupActive = true;
      this.panToMarker();
    },
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
    },
    doneView() {
      this.mapVisible = false;
      this.popupActive = false;
    },
  },
};
</script>
<style lang="scss">
#mapPop .vs-popup {
  width: 1000px;
  height: auto;
}
.v-select.v-input--is-dirty input {
  display: none;
}

.v-select__selection {
  max-width: none;
}

#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}
#iconContainer span .con-vs-tooltip{
  padding: 0px 2px;
}
// 
// #statusPrompt{
// 
// }
</style>
