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
    <masterequipment-sidebar
      :isSidebarActive="masterequipmentSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @update="updateGrid"
    />
       <vx-card ref="MainCard2" v-show="!isInfoHidden">
        <div class="mt-5">
          <div class="vx-row">
              <div class="vx-col md:w-1/6 w-full">
                    <vs-button  color="warning" type="border" class="rounded-lg mb-2"  @click="cancelAdd">Return</vs-button>
               </div>
                <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="initValues">Restart</vs-button>
               </div>
          </div>
           
            <form-wizard  ref="wizard" color="rgba(var(--vs-primary), 1)"  errorColor="rgba(var(--vs-danger), 1)" :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="formSubmitted">  
                <tab-content title="Step 1" class="mb-5" icon="feather icon-home" >
                    <!-- tab 1 content -->
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mt-5">
                              <vs-input label="Master Equipment Name"  v-model="formData.name" class="w-full" />
                        </div>
                         <div class="vx-col md:w-1/2 w-full mt-5">
                                  <label>Master Equipment Min</label>
                                  <vs-input-number class="num-input_transparent" :min="0" :max="5" v-model="formData.min"/>
                          </div>
                         <div class="vx-col md:w-1/2 w-full mt-5">
                                  <label>Master Equipment Max</label>
                                  <vs-input-number class="num-input_transparent" :min="1" :max="100000" v-model="formData.max"/>
                          </div>
                    </div>
                </tab-content>
            </form-wizard>
              
        </div> 
    </vx-card>
    <vx-card ref="MainCard"  v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="masterequipmentData"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addVue"  icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ masterequipmentData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : masterequipmentData.length }} of {{ masterequipmentData.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <vs-th sort-key="masterEqp">Master Equipment</vs-th>
            <vs-th sort-key="masterEqpMin">Master Equipment Min</vs-th>
            <vs-th sort-key="masterEqpMax">Master Equipment Max</vs-th>  
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.masterEqp">{{tr.masterEqp}}</vs-td>
              <vs-td :data="tr.masterEqpMin">{{tr.masterEqpMin}}</vs-td>
              <vs-td :data="tr.masterEqpMax">{{tr.masterEqpMax}}</vs-td> 
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Master Equipment">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editDataSidebar(tr)"
                />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Master Equipment">
                  <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="deleteGrid(tr)"
                />
                </vx-tooltip>
                
              </vs-td>
              <template class="expand-user" slot="expand" >
                <div class="con-expand-users w-full" >
                    <div>
                        <vs-table
                            ref="gridTable2"
                            v-model="selected"
                            :data="tr.eqpInfo"                           
                          >
                            <template slot="thead">
                              <vs-th>Action</vs-th>
                              <vs-th>Equipment</vs-th>
                              <vs-th>Description</vs-th>  
                              <vs-th>Eqp Tag</vs-th>   
                            </template>
                            <!-- visible: false -->
                            <template slot-scope="{data}">
                              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">   
                                <vs-td id="iconContainer" class="whitespace-no-wrap">
                                  <vx-tooltip class="flex" text="Unlink Equipment">
                                    <feather-icon
                                    icon="TrashIcon"
                                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                    class="ml-2"
                                    @click.stop="unlinkEqp(tr)"
                                  />
                                  </vx-tooltip>
                                </vs-td>                                    
                                <vs-td :data="tr.equipment">{{tr.equipment}}</vs-td>
                                <vs-td :data="tr.equipmentDesc">{{tr.equipmentDesc}}</vs-td>
                                <vs-td :data="tr.eqpTag">{{tr.eqpTag}}</vs-td>
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
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import masterequipmentSidebar from "./MasterSidebar.vue";
export default {
  data() {
    return {
      
      dbMessage:"",
      title:'FAMS - new Master Equipment Wizard!!',
      subtitle:'Please complete each tab to add new Master Equipment',

      isListHidden: false,   
      isInfoHidden: true,

      itemsPerPage: 10,
      masterequipmentSidebar: false,
      selected: [],
      masterequipmentData: [],
      sidebarData: {},
      isMounted: false,
      formData: {
          Id:0,
          accountId:localStorage.getItem('userAccountId'),
          name:"",
          min:0,
          max:100
        }   
    };
  },
  components: {
    flatPickr,
    masterequipmentSidebar,
    "v-select": vSelect,
     FormWizard,
     TabContent
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
    this.isMounted = true;
  },
  methods: {
  //********************* System related*/
  successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: this.dbMessage,
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

    editDataSidebar(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    //********************* Event functions *

     cancelAdd() {
        this.isListHidden = false,
        this.isInfoHidden = true;
        this.initValues();
        this.GetGrid();
    },
   addVue() {
        this.initValues();
        this.isInfoHidden = false;
        this.isListHidden = true
        // this.$refs.wizard.navigateToTab(0)

    },

     initValues() {
          var self = this;
          self.$refs.wizard.navigateToTab(0)         
          self.formData.Id=0,
          self.formData.accountId=localStorage.getItem('userAccountId'),
          self.formData.name="",
          self.formData.min=0,
          self.formData.max=100
     },
    //********************* SQL events */
    formSubmitted() {
          var self = this;
          var myobject={};
          var message = "";

          myobject.Id = 0,
          myobject.accountId = localStorage.getItem('userAccountId'),
          myobject.name=self.formData.name,
          myobject.min=self.formData.min,
          myobject.max =self.formData.max, 

          self.showLoadingOnElement("gridTable", 1, "radius");
              var onSuccess = function(response) {
                self.isListHidden = false,
                self.isInfoHidden = true;
                self.initValues();
                self.GetGrid();
                self.dbMessage = "Item succesfully added"
                 self.successNotify();
              };
              var onFinally = function() {
                self.$vs.loading.close(self.$refs.gridTable.$el);  
              };
             self.$ajaxPost(
                self,
                "EquipmentMasterGroups",
                myobject,
                onSuccess,
                onFinally
              ); 

    },

     updateGrid(data) {
       const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
         self.GetGrid();
         self.dbMessage = "Item succesfully updated"
         self.successNotify();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxPut(
        self,
        "EquipmentMasterGroups/" + data.Id,
        data,
        onSuccess,
        onFinally
      );
    },

    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetGrid();
        self.dbMessage = "Item succesfully removed"
        self.successNotify();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
        "EquipmentMasterGroups/" + data.masterEqpId,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.masterequipmentData = response.data;
        self.dbMessage = "Grid succesfully loaded"
        self.successNotify();           
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);  
        //self.dbMessage = 'Item successfully loaded'; 
      };
      self.$ajaxGet(
        self,
        "EquipmentMasterGroups/GetEquipmentMasterGroup",
        onSuccess,
        onFinally
      );
    },
   
    toggleDataSidebar(val = false) {
      this.masterequipmentSidebar = val;
    },
    unlinkEqp(data) {
      const self = this;

      var obj = {
        id: data.perEqpMasterId,
        equipmentMasterGroupId: data.equipmentMasterGroupId,
        equipmentId: data.equipmentId

      }
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxPut(
        self,
        "EquipmentMasterGroups/UnlinkEqp",
        obj,
        onSuccess,
        onFinally
      );
    },
  }
};
     
</script>
<style>

#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>
