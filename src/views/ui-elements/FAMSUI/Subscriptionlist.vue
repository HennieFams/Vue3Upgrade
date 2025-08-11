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
    <allocation-sidebar
      :isSidebarActive="allocationSidebar"
      @closeSidebar="toggleDataSidebarClose"
      :data="sidebarData"
      @update="updateGrid"
      @add="addGrid"
    />
    <vx-card ref="MainCard">
      <div>
        <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="allocations"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
            <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addDataSidebar"  icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ allocations.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : allocations.length }} of {{ allocations.length }}</span>
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
            <vs-th sort-key="sub">Subscription</vs-th>
            <vs-th sort-key="subscriptionName">Description</vs-th> 
            <vs-th sort-key="price">Price (R)</vs-th>     
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.sub">{{tr.sub}}</vs-td>
              <vs-td :data="tr.subscriptionName">{{tr.subscriptionName}}</vs-td>
              <vs-td :data="tr.price">{{tr.price}}</vs-td>             
                <!-- <vs-td :data="tr.allocationGroupName">{{tr.allocationGroupName}}</vs-td> -->
              <vs-td id="iconContainer" class="whitespace-no-wrap flex">
                <vx-tooltip text="Edit Subscription Information">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editDataSidebar(tr)"
                />
                </vx-tooltip>
                
                <vx-tooltip class="flex" text="Delete Subscription">
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
                        <vs-button class="rounded-lg mr-2" color="#720ea8"  @click="PromptActiveAllocationToStoreAdd(tr)"  icon-pack="feather" icon="icon-plus-square">Allocation to Store</vs-button> 
                    <vs-table
                          ref="gridTable2"
                          v-model="selected"
                          :data="tr.perStore"                         
                        >
                          <template slot="thead">
                            <vs-th>Remove</vs-th>
                            <vs-th>Store</vs-th> 
                             <vs-th>Nr (On FAMS Screen)</vs-th> 
                          </template>
                          <!-- visible: false -->
                          <template slot-scope="{data}">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                              <vs-td class="whitespace-no-wrap">
                                <vx-tooltip class="flex" text="Delete Allocation To Store">
                                  <feather-icon
                                  icon="TrashIcon"
                                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                  class="ml-2"
                                  @click.stop="deletePerStoreAllocation(tr)"
                                />
                                </vx-tooltip>
                                
                              </vs-td>
                              <vs-td :data="tr.storeName">{{tr.storeName}}</vs-td>
                               <vs-td :data="tr.nr">{{tr.nr}}</vs-td>
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
   <vs-prompt
    ref="statusPromptAdd"
    title="Add Store - Allocation"
    acceptText="Submit"
    cancelText="Cancel"
    @cancel="dropdownSelectStore=0"
    @accept="addAllocationStore"
    :active.sync="statusPromptActiveAdd">
    <div class="vx-row">
        <div class="vx-col sm:w-1/8 w-full mb-2">  
            <vs-input class="w-full" label-placeholder="Allocation Name" disabled  v-model="AllocationName"
            name ="Allocation Name" />
        </div> 
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">            
                        <label>Allocation for FAMS store</label>  
                        <v-select
                                :options="storedropdownValue"
                                placeholder="Search / Select Store"
                                v-model="dropdownSelectStore"
                                @search:blur="populateDataStore"   
                        />   
        </div>
      <br>
      <div class="vx-col sm:w-1/8 w-full mb-2"> 
              <label>Allocation Nr</label>
              <vs-input-number class="num-input_transparent" :min="1" :max="100" v-model="StoreNr"/>
      </div>
    </div>
  </vs-prompt>
  </div>
</template>

<script>
//import axios from "axios";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
// import productSidebar from "../saleshunter/ProductSidebar.vue";
import allocationSidebar from "./AllocationSidebar.vue";
export default {
  data() {
    return {
      itemsPerPage: 10,
      allocationSidebar: false,
      selected: [],
      allocations: [],
      sidebarData: {},
      isMounted: false,
      dropdownSelectStore: [],
      storeId:0,
      StoreNr:1,
      Store:"",
      AllocationName:"",
      AllocationId:0,
      storedropdownValue:[],
      statusPromptActiveAdd: false,
      toDelete: {},
      storeAllocations:[],
    };
  },
  components: {
    flatPickr,
    allocationSidebar,
    "v-select": vSelect
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
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
  populateDataStore() {
      var self = this;
       if (self.dropdownSelectStore) {
          self.StoreId = self.dropdownSelectStore.value;
          self.Store = self.dropdownSelectStore.label;
        }

      },

   PromptActiveAllocationToStoreAdd(data) {
   
        var self = this; 
        self.LoadStoreDropdown();
        self.AllocationId = data.id;
        self.AllocationName = data.allocation;
        self.statusPromptActiveAdd = true;   
    },

    addAllocationStore(){
        var self = this;
         const obj = {
            id: 0,
            StoreId : self.StoreId,
            AllocationId: self.AllocationId,
            Nr: self.StoreNr,
            Download:  0
          };
        //self.showLoadingOnElement("gridTable3", 1, "radius");
        var onSuccess = function() {
         
           self.statusPromptActiveAdd = false;  
           self.GetGrid();
           self.successNotify();
        };
        var onFinally = function() {
          self.StoreNr=1;
          self.AllocationId=1;
          self.dropdownSelectStore=0;
          
        };
        self.$ajaxPost(
          self,
          "PerAllocationStores",
          obj,
          onSuccess,
          onFinally
        );
    },
  

    //********************* SQL events */
    addGrid(data) {   
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function() {
     
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
       self.$ajaxPost(
        self,
         "Allocations",
        data,
        onSuccess,
        onFinally
      );
    },
     updateGrid(data) {
       const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      self.storeAllocations = data.perAllocationStore;
      for(var i = 0; i < self.storeAllocations.length; i++){
        var item = self.storeAllocations.filter(x => x.perstoreID == self.storeAllocations[i].perstoreID);
        if(item[0].checked == false){
          let c = self.storeAllocations.map(item => item.AllocationId).indexOf(item[0].perstoreID); // find index of your object
          self.storeAllocations.splice(c, 1);
          self.deletePerStoreAllocation(item[0]);
        }
      }
      var onSuccess = function() {
      
      self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxPut(
        self,
        "Allocations/" + data.id,
        data,
        onSuccess,
        onFinally
      );
    },
    deletePerStoreAllocation(data) {
      const self = this;

      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function() {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "PerAllocationStores/" + data.perstoreID ,
        onSuccess,
        onFinally
      );
    },
      deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function() {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "Allocations/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.allocations = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "Subscription/GetSubscriptionsSum",
        onSuccess,
        onFinally
      );
    },
    toggleDataSidebarClose(val = false) {
      this.allocationSidebar = val;
      this.GetGrid();
    },

    toggleDataSidebar(val = false) {
      this.allocationSidebar = val;
      //this.GetGrid();
    },

     LoadStoreDropdown() {
        const self = this;
        var onSuccess = function(response) {
          self.storedropdownValue = response.data.map(function(item) {
            //return { text: item.customer, value: item.id };
            return { label: item.name, value: item.id };
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "Stores/GetStoredropdown",
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