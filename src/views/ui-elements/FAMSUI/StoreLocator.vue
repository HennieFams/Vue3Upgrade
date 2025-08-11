<template>
  <div>
    <storeLocator-sidebar
      :isSidebarActive="isStoreLocatorSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"

    />
      
    <div id="app">
      <vs-tabs v-model="activeTab" ref="mapDiv" class="vs-con-loading__container" style="width: auto min-height:auto">
        <vs-tab label="ATG" @click="getATG()" style="min-height:auto">
          <div id="mapDivATG">
            <GmapMap
              :center="center"
              :zoom="3"
              map-style-id="roadmap"
              :options="mapOptions"
              style="width: 100%; height: 63vh;"
              ref="mapRef"
              id="mapRef"
            
            >
            
              <GmapMarker
                v-for="(m, index) in markers"
                :key="index"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                :icon="m.icon"
                @click="viewSelectedStore(m)"
              />
            </GmapMap>
          </div>
        </vs-tab>
        <!--<vs-tab label="Exceptions" @click="getExceptions()" style="min-height:500px">
          <div id="mapDivExceptions" ref="mapDiv2" class="vs-con-loading__container">
            <GmapMap
              :center="center"
              :zoom="3"
              map-style-id="roadmap"
              :options="mapOptions"
              style="width: 100%; height: 73vh;"
              ref="mapRef2"
              id="mapRef2"
              class="vs-con-loading__container"
            >
            
              <GmapMarker
                v-for="(m, index) in markers"
                :key="index"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                :icon="m.icon"
                @click="viewSelectedStore(m)"
              />
            </GmapMap>
          </div>
        </vs-tab>-->
        <vs-tab label="Fuel Movement" @click="getFuelUsage()" style="min-height:auto">
          <div id="mapDivFM" ref="mapDiv3" class="vs-con-loading__container">
            <GmapMap
              :center="center"
              :zoom="3"
              map-style-id="roadmap"
              :options="mapOptions"
              style="width: 100%; height: 63vh;"
              ref="mapRef3"
              id="mapRef3"
              class="vs-con-loading__container"
            >
            
              <GmapMarker
                v-for="(m, index) in markers"
                :key="index"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                :icon="m.icon"
                @click="viewSelectedStore(m)"
              />
            </GmapMap>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import GoogleMaps from 'google-maps';
import MarkerClusterer from "marker-clusterer-plus";
import StoreLocatorSidebar from './StoreLocatorSidebar.vue';
import { number } from '@amcharts/amcharts4/core';
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      center: { lat: 0, lng: 0 },
      activeTab: 0,
      mapOptions:{
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      formData: {
        lat: 0,
        long: 0,
        label: "",
        position: {lat: 0, lng: 0},
        icon: "",
        fromDate: "",
        toDate: ""
      },
      markers: [],
      isStoreLocatorSidebarActive: false,
      sidebarData: {},
      sidebarTankInfo: {},
      picked: 0,
      popupViewActive: false
    };
  },
  mounted() {
    this.geolocate();
    this.initValues();
    this.getATG();
    var date = new Date();
    this.formData.fromDate =  new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
},
  
  components: {
    GoogleMaps,
    StoreLocatorSidebar,
    Datepicker
  },
  computed: {
    
  },
  methods: {
    
  //********************* System related*/
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    clear(){
      this.initValues();
      switch(this.activeTab){
        case 0:
          this.getATG();
          break;
        case 2:
          this.getExceptions();
          break;
        case 1:
          this.getFuelUsage();
          break;
      }
    },
    initValues()
    {
      this.formData.lat = 0;
      this.formData.long = 0;
      this.formData.label = "";
      this.formData.position = {lat: 0, lng: 0};
      this.center = {lat: 0, lng: 0};
      this.zoomControl
      this.markers = [];
      this.sidebarTankInfo = {};
      this.popupViewActive = false;
    },
    getATG() {
      const self = this;
      self.initValues();
      self.showLoadingOnElement("mapDiv", 1, "radius");
      var onSuccess = function(response) {
        if(!response.data.length == 0){
          for(var i = 0; i < response.data.length; i++)
          {
            if(self.markers.filter(x=>x.storeID == response.data[i].storeID).length > 0) continue
            var allTanksForThisStore = response.data.filter(x=>x.storeID == response.data[i].storeID);
            
            self.markers.push({
              picked: self.activeTab,
              position: { lat: parseFloat(response.data[i].lat), lng: parseFloat(response.data[i].long) },
              title: response.data[i].tankName,
              icon: {
                url: self.getIcons(Math.min.apply(Math,allTanksForThisStore.map(x=>(x.volume / x.capacity)*100))),
                scaledSize:  new google.maps.Size(22,25)
              },
              tankData: allTanksForThisStore.map((item) => {
                return {
                  category: item.tankName,
                  value1: (item.volume / item.capacity) * 100,
                  value2: 100 - (item.volume / item.capacity) * 100,
                  max: item.capacity,
                  mm: item.mm,
                  volume: item.volume,
                  ullage: Math.round(item.capacity - item.volume),
                  lat: item.lat,
                  long: item.long,
                  tankID: item.tankID,
                  storeName: item.storeName,
                  storeID: item.storeID,
                };
              }),
              storeName: response.data[i].storeName,
              storeID: response.data[i].storeID,
              tankInfo: response.data
            });
          }
          self.center = self.markers[0].position;
          return self.markers;
        }
        else{
          self.FailedCustomNotify("No Valid Store Locations Found");
        }
        
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.mapDiv.$el);
      };
      self.$ajaxGet(
        self,
        "QuickViewATG/GetQuickViewATG",
        onSuccess,
        onFinally
      );
    },
    showMap(){
      this.mapVisible = true;
      this.popupActive = true;
    },
    getTab(id){
      self.popupActive = true;
      self.isInfoHidden = true;
      self.isInfoHiddenChart = true;
      
      if(this.activeTab == 0){
        this.getATG();
      }
      else if(this.activeTab == 2){
        this.getExceptions();
      }
      else if(this.activeTab == 1){
        this.getFuelUsage();
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

      });
    },    
		viewSelectedStore(data){
			this.sidebarData = data;
      
      this.toggleDataSidebar(true);
		},
    getIcons(value){
      try {
        if(value < 30){
          return "https://iconsplace.com/wp-content/uploads/_icons/ff6961/256/png/database-icon-256.png";
        }
        else if(value >= 30 && value <= 60){
          return "https://iconsplace.com/wp-content/uploads/_icons/ffc356/256/png/database-icon-256.png";
        }
        else{
          return "https://iconsplace.com/wp-content/uploads/_icons/87dd7a/256/png/database-icon-256.png";
        }
      } catch (e) {
        return null;
      }
    },
    getIcons2(value){
      try {
        if(value < 30){
          return "https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/bug-icon-256.png";
        }
        else if(value >= 30 && value <= 60){
          return "https://iconsplace.com/wp-content/uploads/_icons/ffc356/256/png/bug-icon-256.png";
        }
        else{
          return "https://iconsplace.com/wp-content/uploads/_icons/00ff00/256/png/bug-icon-256.png";
        }
      } catch (e) {
        return null;
      }
    },
    // getExceptions(){
    //   const self = this;
    //   self.initValues();
    //   self.showLoadingOnElement("mapRef2", 1, "radius");
    //   var onSuccess = function(response) {
    //     if(!response.data.length == 0){
    //       for(var i = 0; i < response.data.length; i++)
    //       {
    //         if(self.markers.filter(x=>x.storeID == response.data[i].storeID).length > 0) continue
    //         var allTanksForThisStore = response.data.filter(x=>x.storeID == response.data[i].storeID );
    //         self.markers.push({
    //           picked: self.activeTab,
    //           position: { lat: parseFloat(response.data[i].lat), lng: parseFloat(response.data[i].long) },
    //           title: response.data[i].tankName,
    //           icon: {
    //             url: "https://freesvg.org/img/Map-Warning-Icon.png",
    //             scaledSize:  new google.maps.Size(22,25)
    //           },
    //           tankData: allTanksForThisStore.map((item) => {
    //             return {
    //               exceptionId: item.exceptionId,
    //               exceptionName: item.exceptionName,
    //               exceptionType: item.exceptionType,
    //               lat: item.lat,
    //               long: item.long,
    //               tankID: item.tankID,
    //               storeName: item.storeName,
    //               storeID: item.storeID,
    //               tankName: item.tankName,
    //               timeIn: item.timeIn,
    //               trigger: item.trigger
    //             };
    //           }),
    //           storeName: response.data[i].store,
    //           storeID: response.data[i].storeID,
    //           tankInfo: response.data
    //         });
    //       }
    //       self.center = self.markers[0].position;
    //       return self.markers;
    //     }
    //     else{
    //       self.FailedCustomNotify("No Exceptions Found");
    //     }
        
    //   };
    //   var onFinally = function() {
    //     self.$vs.loading.close(self.$refs.mapRef2.$el);
    //   };
    //   self.$ajaxGet(
    //     self,
    //     `QuickMapView/GetTankExceptions?&fromDate=${self.dateFormat(
    //       self.formData.fromDate)}
    //       &toDate=${self.dateFormat(self.formData.toDate)}`,
    //     onSuccess,
    //     onFinally
    //   );
    // },
    toggleDataSidebar(val){
        if (val)
        this.isStoreLocatorSidebarActive = true;
        else{
          this.isStoreLocatorSidebarActive = false;
          this.clear();
        }
    },
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Warning',
        text: msg,
        color: 'warning'
      })
    },
    getFuelUsage(){
      const self = this;
      self.initValues();
      self.showLoadingOnElement("mapDiv", 1, "radius");
      let details = `&clientKey=${localStorage.getItem('userKey')}&accountkey=${localStorage.getItem('userAccountKey')}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`
      self.popupViewActive = false;
      var onSuccess = function(response) {
        if(!response.data.length == 0){
          for(var i = 0; i < response.data.length; i++)
          {
            if(self.markers.filter(x=>x.storeID == response.data[i].sid).length > 0) continue
            
            var allFuelUsageForThisStore = response.data.filter(x=>x.sid == response.data[i].sid);
            
            self.markers.push({
              picked: self.activeTab,
              position: { lat: parseFloat(response.data[i].lat), lng: parseFloat(response.data[i].long) },
              title: response.data[i].tankName,
              icon: {
                url: "https://icon-library.net/images/fuel-pump-icon/fuel-pump-icon-15.jpg",
                scaledSize:  new google.maps.Size(22,25)
              },
              tankData: allFuelUsageForThisStore.map((item) => {
                return {
                  pid: item.pid,
                  sid: item.sid,
                  product: item.product,
                  lat: item.lat,
                  long: item.long,
                  volume: item.volume,
                  storeName: item.store,
                  storeID: item.sid,
                  fromDate: item.fromDate,
                  toDate: item.toDate
                };
              }),
              storeName: response.data[i].store,
              storeID: response.data[i].sid,
              tankInfo: response.data
            });
          }
          self.center = self.markers[0].position;
          return self.markers;
        }
        else{
          self.FailedCustomNotify("No Fuel Dispensing Details Found");
        }
        
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.mapDiv.$el);
      };
      self.$ajaxGet(
        self,
        `QuickViewDispensing/Get_UsagePerStore?${details}`,
        onSuccess,
        onFinally
      );
    },
    dateFormat(date) {
      var month = '';
      var year = '';
      var day = '';

      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      return [year, month, day].join('-');
    },
  }
};

</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
  #mapPop div.vs-popup {
    width: 1000px;
    height: auto;
  }
  #radioButtonFloat{
    position: absolute;
    background: #eeeeee;
    right: 10px;
    padding: 5px;
    width: 10vw;    
    top: 10px;
    float: right;
    z-index: 20 !important;
  }
</style>