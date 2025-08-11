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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div>
        <div class="vx-row px-4 pt-2 pb-3">

           <div class="vx-col flex-1">
               <label>Store Type</label>  
               <v-select
                      :options="storeTypedropdownData"
                      placeholder="Search / Select Store Type"
                      v-model="dropdownSelectStoreType"
                      @search:blur="populateDataStoreType"   
                />         
          </div>
          <div class="vx-col flex-1">
               <label>Timezone</label>  
               <v-select
                      :options="timeZonedropdownData"
                      placeholder="Search / Select TimeZone"
                      v-model="dropdownSelectTimeZone"
                      @search:blur="populateDataTimeZone"   
                />         
          </div>
        
        </div>
        <!-- <div class="vx-row px-4 pb-3">
           <div class="vx-col flex-1">
            <label>Allocation Number</label>
              <div class="centerx">
                
                <vs-input-number size="large" class="inputx" color="success" min="1" max="12" v-model="formData.allocationNumber"/>
              </div>
          </div>
        </div> -->
       <div class="vx-row px-4 pt-2 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>FAMS Store Name</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Store Name"
                  v-model="formData.name"
                  class="w-full"
                  name="Description"
                />
          </div>
            <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>FAMS Mac address</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Macc Address"
                  v-model="formData.name"
                  class="w-full"
                  name="Description"
                />
          </div>
        </div>
      <div class="vx-row px-4 pt-2 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>FAMS IP address</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="IP address"
                  v-model="formData.name"
                  class="w-full"
                  name="Description"
                />
          </div>
            <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Cell Number</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Cell Number"
                  v-model="formData.name"
                  class="w-full"
                  name="Description"
                />
          </div>
        </div>
      <div class="vx-row px-4 pt-2 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>FAMS Latitude</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Latitude"
                  v-model="formData.name"
                  class="w-full"
                  name="Description"
                />
          </div>
            <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>FAMS Longitude</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Longitude"
                  v-model="formData.name"
                  class="w-full"
                  name="Description"
                />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
             <div class="vx-col flex-1">
            <label>FAMS Store Active (Enable / Disable)</label>
            <vs-switch class="rounded-pill" v-model="formData.enable" />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <vx-card ref="MainCard">
                <div class="vx-row px-4 pb-3">
                    <div class="flex-1">
                                <label>Product</label>  
                                <v-select
                                        :options="productdropdownData"
                                        placeholder="Search / Select Product"
                                        v-model="dropdownSelectProduct"
                                        @search:blur="populateDataProduct"   
                                />   
                      </div>
                  </div>
                  <br>
                  <div class="vx-row px-4 pb-3">
                      <div class="flex flex-wrap">
                                  <vs-button class="rounded-lg mr-2" color="warning" type="gradient" @click="GetGrid"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                                  <vs-button class="rounded-lg mr-3" color="success" type="gradient" @click="popupActivo3=true"         icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
                      </div>
                  </div>
                <div>
                  <vs-table
                    ref="gridTable"
                    pagination
                    :max-items="itemsPerPage"
                    search
                    :data="storeData"
                    class="vs-con-loading__container"
                  >
                    <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                              <!-- ITEMS PER PAGE -->
                      <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                        <div
                          class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                        >
                          <span
                            class="mr-2"
                          >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ storeData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : storeData.length }} of {{ storeData.length }}</span>
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
                      <vs-th sort-key="Product">product</vs-th>
                      <vs-th sort-key="fuelPrice">FuelPrice</vs-th>    
                      <vs-th sort-key="scaler">FMS scaler</vs-th>
                       <vs-th>Action</vs-th>
                    </template>
                    <!-- visible: false -->
                    <template slot-scope="{data}">
                      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="tr.product.name">{{tr.product.name}}</vs-td>
                        <vs-td :data="tr.fuelPrice">{{tr.fuelPrice}}</vs-td>
                        <vs-td :data="tr.scalar">{{tr.scalar}}</vs-td>
                        <vs-td class="whitespace-no-wrap">
                          <feather-icon
                            icon="EditIcon"
                            svgClasses="w-5 h-5 hover:text-primary stroke-current"
                            @click.stop="editDataSidebar(tr)"
                          />
                          <feather-icon
                            icon="TrashIcon"
                            svgClasses="w-5 h-5 hover:text-danger stroke-current"
                            class="ml-2"
                            @click.stop="deleteGrid(tr)"
                          />
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </vx-card>
 <vs-popup classContent="popup-example"  title="Lorem ipsum dolor sit amet" :active.sync="popupActivo2">
      <vs-input class="inputx" placeholder="Placeholder" />
      <vs-input disabled class="inputx" placeholder="Disabled"/>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      </p>
      <vs-button class="rounded-lg " @click="popupActivo3=true" color="primary" type="filled">Open Inner Popup</vs-button>
      <vs-popup title="Inner popup" :active.sync="popupActivo3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br><br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <br><br>
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        </vs-popup>
    </vs-popup>

            <vs-prompt
              ref="statusPrompt"
              title="Select Product"
              acceptText="Add Product To Store"
              cancelText="Cancel"
              @cancel="dropdownSelectProduct=0"
              @accept="populateDataProduct"
              :active.sync="statusPromptActive">
              <div class="con-exemple-prompt">
                <div>
                  <label>Product information</label>
                  <v-select placeholder="Search / Select Product" :options="productdropdownData" 
                  v-model="dropdownSelectProduct"></v-select>
                </div>
              </div>
            </vs-prompt>
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg " color="success" type="gradient" @click="submitData"                    icon-pack="feather" icon="icon-check">Submit</vs-button>
      <vs-button class="rounded-lg " color="danger"  type="gradient" @click="isSidebarActiveLocal = false"  icon-pack="feather" icon="icon-x-square">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
// import vUploader from 'v-uploader'
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
     "v-select": vSelect
  },
  mounted() {
    var self = this;
    self.isMounted = true;
  },
  data() {
    return {
      popupActivo3 : false,
      popupActivo2 : false,
      //  active: false,
      //   email: '',
      //   password: '',
      //   remember: false,
      statusPromptActive: false,
      isMounted: false,
      itemsPerPage: 10,
      storeTypedropdownData: [],
      timeZonedropdownData: [],
      storeData: [],
      productdropdownData: [],
      dropdownSelectStoreType: [],
      dropdownSelectTimeZone: [],
      dropdownSelectProduct: [],
      dropdownSelect: [],
      formData: {
          id :0,
          accountId :0,
          storeTypeId:0,
          storeType:"",
          hardwareId:0,
          hardware:"",
          storeName :"", 
          macAddress :"", 
          ipAddress :"", 
          cellNumber :"", 
          enable :true,
          lat :"", 
          long :"", 
          createDate :"", 
          renewDate :"", 
          timeZone:"",
          timeZoneId:0,
          product:"",
          productId:0
        },
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        this.formData.id = this.data.id;
        this.formData.accountId = this.data.accountId;
        this.formData.storeTypeId= this.data.storeInfo[0].storeTypeId;
        this.formData.storeType= this.data.storeInfo[0].storeType;
        this.dropdownSelectStoreType = this.data.storeInfo[0].storeType;

        this.formData.timeZoneId= this.data.storeInfo[0].timeZoneId;
        this.formData.timeZone= this.data.storeInfo[0].timeZone;
        this.dropdownSelectTimeZone = this.data.storeInfo[0].timeZone;

        this.formData.hardwareId= this.data.storeInfo[0].hardwareId;
        this.formData.hardware= this.data.storeInfo[0].hardware;
        this.formData.storeName = this.data.storeName;
        this.formData.macAddress = this.data.macAddress; 
        this.formData.ipAddress = this.data.ipAddress;
        this.formData.cellNumber = this.data.storeInfo[0].cellNumber;
        this.formData.enable = this.data.enable;
        this.formData.lat = this.data.storeInfo[0].lat;
        this.formData.long = this.data.storeInfo[0].long;
        this.GetGrid();
        this.GetstoreTypedropdown() ;
        this.GetTimeZonedropdown();
        this.GetProductdropdown();
        //this.initValues();
      }
    }
  },
  computed: {
     currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      }
    },
    isFormValid() {
      return (
        !this.errors.any() 
      );
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
     populateDataStoreType() {
      var self = this;
      if (self.dropdownSelectStoreType) {
          self.formData.storeTypeId = self.dropdownSelectStoreType.value;
          self.formData.storeType = self.dropdownSelectStoreType.label;
        }
      },
    populateDataTimeZone() {
      var self = this;
      if (self.dropdownSelectTimeZone) {
          self.formData.timeZoneId = self.dropdownSelectTimeZone.value;
          self.formData.timeZone = self.dropdownSelectTimeZone.label;
        }
      },

    populateDataProduct() {
      var self = this;
      if (self.dropdownSelectProduct) {
          self.formData.productId = self.dropdownSelectProduct.value;
          self.formData.product = self.dropdownSelectProduct.label;
        }
      },


      GetTimeZonedropdown() {  
        const self = this;
        var onSuccess = function(response) {
            self.timeZonedropdownData = response.data.map((item) => {return {label: item.name, value: item.id} });
        };
        var onFinally = function() {
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
          var onSuccess = function(response) {
              self.storeTypedropdownData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
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
          var onSuccess = function(response) {
              self.productdropdownData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.gridTable.$el);
          };
          self.$ajaxGet(
            self,
            "Products",
            onSuccess,
            onFinally
          );    
        },

    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.storeData = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "PerStoreProducts/GetPerProductStore?StoreId=" + self.formData.id,
        onSuccess,
        onFinally
      );
    },
    
    addProductToStore() {
        var self = this;
        self.statusPromptActive = true;
    },

    initValues() {
      if (this.data.id)  return;
        this.formData.id = 0;

        this.formData.accountId =0,
        this.formData.storeTypeId=0,
        this.formData.storeType="",
        this.formData.hardwareId=0,
        this.formData.hardware="",
        this.formData.storeName ="", 
        this.formData.macAddress ="", 
        this.formData.ipAddress ="", 
        this.formData.cellNumber ="", 
        this.formData.enable =true,
        this.formData.lat ="", 
        this.formData.long ="", 
        this.formData.createDate ="", 
        this.formData.renewDate ="", 
        this.formData.timeZone="",
        this.formData.timeZoneId=0
        this.formData.productId =0;
        this.formData.product = "";
        
        this.dropdownSelect = 0;
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
  
    submitData() {
      var self = this;
      const obj = {
            id: 0,
            accountId : 12,
            name: self.formData.name,
            description: self.formData.description,
            allocationTypeId:  self.formData.allocationTypeId,
            enable: self.formData.enable
          };
      if (self.formData.id !== null && self.formData.id != 0) {
        self.$emit("update", self.formData);
      } else {
        self.$emit("add", obj);
      }
      this.$emit("closeSidebar");
      this.initValues();
    }
  }
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
