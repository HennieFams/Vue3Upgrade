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
               <label>FAMS Store</label>
               <v-select
                      :options="dropdownStoreData"
                      placeholder="Search / Select Store"
                      v-model="dropdownStoreSelect"
                      @search:blur="populateStoreData"
                />
          </div>
        </div>
        <div class="vx-row px-4 pt-2 pb-3">
           <div class="vx-col flex-1">
               <label>FAMS Product</label>
               <v-select
                      :options="dropdownstoreProductData"
                      placeholder="Search / Select Product"
                      v-model="dropdownstoreProductSelect"
                      @search:blur="populateStoreProductData"
                />
          </div>
        </div>
         <div class="vx-row px-4 pt-2 pb-3">
           <div class="vx-col flex-1">
               <label>FAMS Sensor Type</label>
               <v-select
                      :options="dropdownSensorTypeData"
                      placeholder="Search / Select Sensor"
                      v-model="dropdownSensorTypeSelect"
                      @search:blur="populateSensorTypeData"
                />
          </div>
        </div>
       <div class="vx-row px-4 pt-2 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Tank Name</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Tank Name"
                  v-model="formData.tankName"
                  class="w-full"
                  name="Tank Name"

                />
          </div>

          <div class="vx-col md:w-1/2 w-1/2 mt-5" v-show="showSpares">
            <vs-input label="Spare 1 (UID)"  v-model="formData.spare1" class="w-full" />
          </div>
          <div class="vx-col md:w-1/2 w-1/2 mt-5" v-show="showSpares">
            <vs-input label="Spare 2 (IMEI)"  v-model="formData.spare2" class="w-full" />
          </div>

          <div class="vx-col md:w-1/2 w-full mt-5" v-show="showSpares">
            <label>Interval (Minutes)</label>
            <vs-input-number class="num-input_transparent" :min="0" v-model="formData.interval"/>
          </div>

           <div class="vx-col flex-1">
                  <label>Tank Nr/Index</label>
                  <vs-input-number class="num-input_transparent" :min="1" :max="16" v-model="formData.nr"/>
          </div>

        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Tank Calculations</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Tank Calculations"
                  v-model="formData.math"
                  class="w-full"
                  name="Tank Calculations"

                />
          </div>

           <div class="vx-col flex-1">
                  <label>Tank Capacity</label>
                  <vs-input-number class="num-input_transparent" :min="250" :max="9999999999" v-model="formData.capacity"/>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <vs-input label="Sensor Serial Number"  v-model="formData.sensorSn" class="w-full" />
            </div>

           <div class="vx-col flex-1">
                <div class="demo-alignment">
                  <span>Tank Active (No | Yes):</span>
                  <div class="flex">
                    <vs-switch class="rounded-pill" color="success" v-model="formData.enable"></vs-switch>
                  </div>
              </div>
          </div>
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

  },
  data() {
    return {
      dropdownSensorTypeData:[],
      dropdownSensorTypeSelect: {},

      dropdownstoreProductData:[],
      dropdownstoreProductSelect: {},
      dropdownStoreData:[],
      dropdownStoreSelect: {},
      formData: {
        accountId:0,
        capacity: 0,
        enable:true,
        math: "",
        nr: 0,
        product: "",
        productId: 0,
        tanksensortypeId :0,
        tanksensortype :"",
        sensorSn: "",
        store: "",
        storeId: "",
        tankId: 0,
        tankName: "",
        spare1: "",
        spare2: "",
        interval: 0,
        },
      showSpares: false,
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
        this.formData.accountId = this.data.accountId;
        this.formData.capacity = this.data.capacity;
        this.formData.enable = this.data.enable;
        this.formData.math = this.data.math;
        this.formData.nr = this.data.nr;
        this.formData.product = this.data.product;
        this.formData.productId = this.data.productId;
        this.formData.tanksensortypeId = this.data.tankSensorTypeId
        this.formData.tanksensortype = this.data.tankSensorType
        this.formData.sensorSn = this.data.sensorSn;
        this.formData.store = this.data.store;
        this.formData.storeId = this.data.storeId;
        this.formData.tankId = this.data.tankId;
        this.formData.tankName = this.data.tankName;
        this.dropdownStoreSelect = {value: this.data.storeId, label: this.data.store };
        this.dropdownstoreProductSelect = {value: this.data.productId, label: this.data.product };
        this.dropdownSensorTypeSelect = {value: this.data.tankSensorTypeId, label: this.data.tankSensorType };
        this.formData.spare1 = this.data.spare1;
        this.formData.spare2 = this.data.spare2;
        this.formData.interval = this.data.interval;
        this.GetStoreDropdown();
        this.GetStoreProductDropdown() ;
        this.GetSensorTypeDropdown();
        if(this.data.tankSensorTypeId == 6){
          this.showSpares = true;
        }
        else{
          this.showSpares = false;
        }
      }
    }
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
     populateStoreData() {
      var self = this;
      if (self.dropdownStoreSelect) {
          self.formData.storeId = self.dropdownStoreSelect.value;
          self.formData.store = self.dropdownStoreSelect.label;
        }
      },

     populateStoreProductData() {
      var self = this;
      if (self.dropdownstoreProductSelect) {
          self.formData.productId = self.dropdownstoreProductSelect.value;
          self.formData.product = self.dropdownstoreProductSelect.label;
        }
      },

     populateSensorTypeData() {
      var self = this;
      if (self.dropdownSensorTypeSelect) {
        self.formData.tanksensortypeId = self.dropdownSensorTypeSelect.value;
        self.formData.tanksensortype = self.dropdownSensorTypeSelect.label;
      }

      if(self.dropdownSensorTypeSelect.value == 6){
        self.showSpares = true;
      }
      else{
        self.showSpares = false;
      }
      },

   GetSensorTypeDropdown() {
        const self = this;
        var onSuccess = function(response) {
          self.dropdownSensorTypeData = response.data.map(function(item) {
            return { label: item.name, value: item.id};

          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "Products/GetTankSensorType",
          onSuccess,
          onFinally
        );
    },

    GetStoreProductDropdown() {
        const self = this;
        var onSuccess = function(response) {
          self.dropdownstoreProductData = response.data.map(function(item) {
            return { label: item.product.name, value: item.product.id };

          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "PerStoreProducts/GetPerProductStore?StoreId=" + self.formData.storeId,
          onSuccess,
          onFinally
        );
    },

     GetStoreDropdown() {
        const self = this;
        var onSuccess = function(response) {
          self.dropdownStoreData = response.data.map(function(item) {
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


    initValues() {
      if (this.data.id)  return;
        this.formData.accountId=0,
        this.formData.capacity= 0,
        this.formData.enable=true,
        this.formData.math= "",
        this.formData.nr= 0,
        this.formData.product= "",
        this.formData.productId= 0,
        this.formData.sensorSn= "",
        this.formData.store= "",
        this.formData.storeId= "",
        this.formData.tankId= 0,
        this.formData.tankName= ""
        this.dropdownStoreSelect = 0;
        this.tankSensorTypeId = 0;
        this.tankSensorType = "";
        this.dropdownSensorTypeSelect= null;

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
            Id: self.formData.tankId,
            accountId : self.formData.accountId,
            storeId: self.formData.storeId,
            productId: self.formData.productId,
            tankName:  self.formData.tankName,
            capacity:  self.formData.capacity,
            nr:  self.formData.nr,
            math:  self.formData.math,
            sensorSn:  self.formData.sensorSn,
            enable: self.formData.enable,
            tankSensorTypeId :self.formData.tanksensortypeId,
            spare1: self.formData.spare1,
            spare2: self.formData.spare2,
            interval: self.formData.interval,
          };

      if (self.formData.tankId !== null && self.formData.tankId != 0) {
        self.$emit("update", obj);
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
