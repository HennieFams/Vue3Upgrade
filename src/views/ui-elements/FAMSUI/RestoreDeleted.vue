<template> 
  <div class="vx-row">
    <div class="vx-col w-full">
      <vx-card
        class="pb-3"
        title="FAMS Restore Deleted">
        <vs-tabs v-model="activeTab" style="width: auto; min-height:500px">
          <vs-tab label="Restore Deleted Equipment" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <vs-table
                  ref="gridTable"
                  id="gridTable"
                  v-model="selected"
                  pagination
                  :max-items="itemsPerPage"
                  search
                  :data="eqpData"
                  class="vs-con-loading__container"
                >
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <vs-button class="rounded-lg mr-2" color="warning" @click="getDeletedEQP()" icon-pack="feather"
                      icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                      >
                        <span
                          class="mr-2"
                        >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ eqpData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : eqpData.length }} of {{ eqpData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
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
                    <vs-th sort-key="name">Equipment Name</vs-th>
                    <vs-th sort-key="registration">Registration</vs-th>
                    <vs-th sort-key="tag">Tag</vs-th>
                    <vs-th sort-key="enable">Active</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                      <vs-td :data="tr.name">{{tr.name}}</vs-td>
                      <vs-td :data="tr.registration">{{tr.registration}}</vs-td>
                      <vs-td :data="tr.tag">{{tr.tag}}</vs-td>
                      <vs-td :data="tr.enable">
                        <vs-switch class="rounded-pill" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </vs-td>
                      <vs-td>
                        <vx-tooltip class="flex" text="Save Equipment">
                          <feather-icon
                            icon="SaveIcon"
                            svgClasses="w-5 h-5 hover:text-primary stroke-current"
                            @click.stop="updateEQP(tr)"
                          />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Restore Deleted Employee" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <vs-table
                  ref="gridTable2"
                  id="gridTable2"
                  v-model="selected"
                  pagination
                  :max-items="itemsPerPage2"
                  search
                  :data="empData"
                  class="vs-con-loading__container"
                >
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <vs-button class="rounded-lg mr-2" color="warning" @click="getDeletedEMP()" icon-pack="feather"
                      icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                      >
                        <span
                          class="mr-2"
                        >{{ currentPage2 * itemsPerPage2 - (itemsPerPage2 - 1) }} - {{ empData.length - currentPage2 * itemsPerPage2 > 0 ? currentPage2 * itemsPerPage2 : empData.length }} of {{ empData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <vs-dropdown-menu>
                        <vs-dropdown-item @click="itemsPerPage2=10">
                          <span>10</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage2=20">
                          <span>20</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage2=50">
                          <span>50</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage2=100">
                          <span>100</span>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                  <template slot="thead">
                    <vs-th sort-key="name">Employee Name</vs-th>
                    <vs-th sort-key="description">Description</vs-th>
                    <vs-th sort-key="tag">Tag</vs-th>
                    <vs-th sort-key="enable">Active</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                      <vs-td :data="tr.name">{{tr.name}}</vs-td>
                      <vs-td :data="tr.description">{{tr.description}}</vs-td>
                      <vs-td :data="tr.tag">{{tr.tag}}</vs-td>
                      <vs-td :data="tr.enable">
                        <vs-switch class="rounded-pill" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </vs-td>
                      <vs-td>
                        <vx-tooltip class="flex" text="Save Employee">
                          <feather-icon
                            icon="SaveIcon"
                            svgClasses="w-5 h-5 hover:text-primary stroke-current"
                            @click.stop="updateEMP(tr)"
                          />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </div>  
          </vs-tab>
          <vs-tab label="Restore Deleted Allocatiom" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3">
                <vs-table
                  ref="gridTable3"
                  id="gridTable3"
                  v-model="selected"
                  pagination
                  :max-items="itemsPerPage3"
                  search
                  :data="allocData"
                  class="vs-con-loading__container"
                >
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <vs-button class="rounded-lg mr-2" color="warning" @click="getDeletedAlloc()" icon-pack="feather"
                      icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                      >
                        <span
                          class="mr-2"
                        >{{ currentPage3 * itemsPerPage3 - (itemsPerPage3 - 1) }} - {{ allocData.length - currentPage3 * itemsPerPage3 > 0 ? currentPage3 * itemsPerPage3 : allocData.length }} of {{ allocData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <vs-dropdown-menu>
                        <vs-dropdown-item @click="itemsPerPage3=10">
                          <span>10</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage3=20">
                          <span>20</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage3=50">
                          <span>50</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage3=100">
                          <span>100</span>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                  <template slot="thead">
                    <vs-th sort-key="name">Allocation Name</vs-th>
                    <vs-th sort-key="description">Description</vs-th>
                    <vs-th sort-key="enable">Active</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                      <vs-td :data="tr.name">{{tr.name}}</vs-td>
                      <vs-td :data="tr.description">{{tr.description}}</vs-td>
                      <vs-td :data="tr.enable">
                        <vs-switch class="rounded-pill" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </vs-td>
                      <vs-td>
                        <vx-tooltip class="flex" text="Save Allocation">
                          <feather-icon
                            icon="SaveIcon"
                            svgClasses="w-5 h-5 hover:text-primary stroke-current"
                            @click.stop="updateAlloc(tr)"
                          />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </div>   
          </vs-tab>
          <vs-tab label="Restore Deleted User" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
              <vs-table
                  ref="gridTable4"
                  id="gridTable4"
                  v-model="selected"
                  pagination
                  :max-items="itemsPerPage4"
                  search
                  :data="usersData"
                  class="vs-con-loading__container"
                >
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <vs-button class="rounded-lg mr-2" color="warning" @click="getDeletedUser()" icon-pack="feather"
                      icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                      >
                        <span
                          class="mr-2"
                        >{{ currentPage4 * itemsPerPage4 - (itemsPerPage4 - 1) }} - {{ usersData.length - currentPage4 * itemsPerPage4 > 0 ? currentPage4 * itemsPerPage4 : usersData.length }} of {{ usersData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <vs-dropdown-menu>
                        <vs-dropdown-item @click="itemsPerPage4=10">
                          <span>10</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage4=20">
                          <span>20</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage4=50">
                          <span>50</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage4=100">
                          <span>100</span>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                  <template slot="thead">
                    <vs-th sort-key="username">Username</vs-th>
                    <vs-th sort-key="email">Email</vs-th>
                    <vs-th sort-key="enable">Active</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                      <vs-td :data="tr.username">{{tr.username}}</vs-td>
                      <vs-td :data="tr.email">{{tr.email}}</vs-td>
                      <vs-td :data="tr.enable">
                        <vs-switch class="rounded-pill" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </vs-td>
                      <vs-td>
                        <vx-tooltip class="flex" text="Save User">
                          <feather-icon
                            icon="SaveIcon"
                            svgClasses="w-5 h-5 hover:text-primary stroke-current"
                            @click.stop="updateUser(tr)"
                          />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </div>
          </vs-tab>
          <!-- <vs-tab label="Restore Deleted Store" style="min-height:500px">
            <div class="vx-row pb-3">
              
            </div>
          </vs-tab>
          <vs-tab label="Restore Deleted Tank" style="min-height:500px">
            <div class="vx-row pb-3">
              <div class="vx-col md:w-1/2 w-full mt-2">
                
              </div>  
            </div>
          </vs-tab> -->
        </vs-tabs>
      </vx-card>
    </div>  

    <!-- <vs-popup
      id="uploadnotify"
      title="An error while Uploading"
      :active.sync="unProcessed"
      ref="datanotify">
      <vs-table
        ref="gridTable"
        pagination
        search
        :data="unProcessedData"
        class="vs-con-loading__container"
      >
            <template slot="thead">
              <vs-th sort-key="Line Number">Line Number</vs-th>
              <vs-th sort-key="Text">Text</vs-th>
              <vs-th sort-key="Exception">Exception</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :state="tr.text ? 'danger' : null">
                <vs-td :data="tr.lineNumber">{{ tr.lineNumber}}</vs-td>
                <vs-td :data="tr.text">{{ tr.text}}</vs-td>
                <vs-td :data="tr.exceptionMessage">{{tr.exceptionMessage}}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button class="rounded-lg " @click="downloadUnprocessed">Download Unprocessed</vs-button>
          </div>
        </div>
    </vs-popup> -->
  </div>
</template>
<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import moment from "moment";
import VxCard from "../../../components/vx-card/VxCard.vue";
export default {name: 'app',
  data() {
    return {
      itemsPerPage: 10,
      isMounted: false,
      itemsPerPage2: 10,
      isMounted2: false,
      itemsPerPage3: 10,
      isMounted3: false,
      itemsPerPage4: 10,
      isMounted4: false,
      activeTab: 0,
      eqpData: [],
      empData: [],
      allocData: [],
      storesData: [],
      tanksData: [],
      usersData:[],
      selected: null,
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VxCard,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
    currentPage2() {
      if (this.isMounted2) {
        return this.$refs.gridTable2.currentx;
      }
      return 0;
    },
    currentPage3() {
      if (this.isMounted3) {
        return this.$refs.gridTable3.currentx;
      }
      return 0;
    },
    currentPage4() {
      if (this.isMounted4) {
        return this.$refs.gridTable4.currentx;
      }
      return 0;
    },
  },
  mounted() {
    this.getDeletedEQP();
  },
  watch:{
    activeTab: function (val) {
      var self = this;
      if(val == 0){
        this.getDeletedEQP()
      }
      else if(val == 1){
        this.getDeletedEMP()
      }
      else if(val == 2){
        this.getDeletedAlloc()
      }
      else if(val == 3){
        this.getDeletedUser()
      }
    },
  },
  methods: {
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
        text: "Information successfully Uploaded",
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
    updateEQP(data){
      console.warn(data);
      const self = this;
      var obj = {
        id: data.id,
        enable: data.enable
      };
      console.warn(obj);
      
      // self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.getDeletedEQP();
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable.$el);
        };
        self.$ajaxPut(
          self,
          "Equipments/RestoreDeletedEQP",
          obj,
          onSuccess,
          onFinally
        );
    },
    getDeletedEQP(){
      var self = this;
        // self.showLoadingOnElement("gridTable", 1, "radius");
        var onSuccess = function (response) {
          self.eqpData = response.data;
          self.isMounted = true;
          self.$refs.gridTable.currentx = 1;
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable.$el);
        };
        self.$ajaxGet(
          self,
          `Equipments/GetDeletedEquipment`,
          onSuccess,
          onFinally
        );
    },
    updateEMP(data){
      console.warn(data);
      const self = this;
      var obj = {
        id: data.id,
        enable: data.enable
      };
      console.warn(obj);
      
      // self.showLoadingOnElement("gridTable2", 1, "radius");
        var onSuccess = function (response) {
          self.getDeletedEMP();
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable2.$el);
        };
        self.$ajaxPut(
          self,
          "Operators/RestoreDeletedEMP",
          obj,
          onSuccess,
          onFinally
        );
    },
    getDeletedEMP(){
      var self = this;
        // self.showLoadingOnElement("gridTable2", 1, "radius");
        var onSuccess = function (response) {
          self.empData = response.data;
          self.isMounted2 = true;
          self.$refs.gridTable2.currentx = 1;
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable2.$el);
        };
        self.$ajaxGet(
          self,
          `Operators/GetDeletedEmployee`,
          onSuccess,
          onFinally
        );
    },
    updateAlloc(data){
      console.warn(data);
      const self = this;
      var obj = {
        id: data.id,
        enable: data.enable
      };
      console.warn(obj);
      
      // self.showLoadingOnElement("gridTable3", 1, "radius");
        var onSuccess = function (response) {
          self.getDeletedAlloc();
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable3.$el);
        };
        self.$ajaxPut(
          self,
          "Allocations/RestoreDeletedAlloc",
          obj,
          onSuccess,
          onFinally
        );
    },
    getDeletedAlloc(){
      var self = this;
        // self.showLoadingOnElement("gridTable3", 1, "radius");
        var onSuccess = function (response) {
          self.allocData = response.data;
          self.isMounted3 = true;
          self.$refs.gridTable3.currentx = 1;
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable3.$el);
        };
        self.$ajaxGet(
          self,
          `Allocations/GetDeletedAllocation`,
          onSuccess,
          onFinally
        );
    },
    updateUser(data){
      console.warn(data);
      const self = this;
      var obj = {
        id: data.id,
        enable: data.enable
      };
      console.warn(obj);
      
      // self.showLoadingOnElement("gridTable4", 1, "radius");
        var onSuccess = function (response) {
          self.getDeletedUser();
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable4.$el);
        };
        self.$ajaxPut(
          self,
          "Users/RestoreDeletedUser",
          obj,
          onSuccess,
          onFinally
        );
    },
    getDeletedUser(){
      var self = this;
        // self.showLoadingOnElement("gridTable4", 1, "radius");
        var onSuccess = function (response) {
          self.usersData = response.data;
          self.isMounted4 = true;
          self.$refs.gridTable4.currentx = 1;
        };
        var onFinally = function () {
          // self.$vs.loading.close(self.$refs.gridTable4.$el);
        };
        self.$ajaxGet(
          self,
          `Users/GetDeletedUser`,
          onSuccess,
          onFinally
        );
    },
  },
};
</script>
<style lang="scss">
#background{
  .con-img-upload{
    background-color: #67676759 !important;
  }
}
#app{
  #filepond{
    .filepond--drop-label{
      background-color: #FF9F43 !important;
      border-radius: 10px !important;
      color: white !important;
      font-size: 15px
    }
  }
}

#uploadnotify div.vs-popup {
    width: 1100px !important;
  }

  .con-vs-tabs .con-ul-tabs {
    overflow-y: hidden;
    overflow-x: scroll;
  }
// 
// #text-block {
//     // white-space: pre; // or pre-line
//     
// }

.vs-textarea{
  height: 450px !important;
}
</style>
