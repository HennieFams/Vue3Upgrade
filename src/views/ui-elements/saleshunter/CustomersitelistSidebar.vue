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
              <!-- CATEGORY -->
              <label>Customer</label>
              <v-select
                      :options="customerDropdown"
                      placeholder="Search / Select Customer"
                      v-model="customer"
                      @search:blur="populateData"   
                /> 
             
       
                
            </div>
          </div>
        <div class="vx-row px-4 pt-2 pb-3">
          <div class="vx-col flex-1">
            <!-- Customer -->
            <label>Site Name</label>
            <vs-input
              icon-pack="feather"
              icon="icon-user"
              placeholder="Site Name"
              v-model="sitename"
              class="w-full"
              name="Site Name"
  
            />
          
          </div>
         
        </div>

        <div class="vx-row px-4 pb-3">
           <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Contact Phone</label>
            <vs-input
            icon-pack="feather"
              icon="icon-phone"
              placeholder="Contact Phone"
              v-model="cuscontactphone"
              class="w-full"
              name="Contact Phone"
            
            />
           
          </div>
          <div class="vx-col flex-1">
            <!-- ContactName -->
            <label>Contact Name</label>
            <vs-input
            icon-pack="feather"
              icon="icon-user"
              placeholder="Contact Name"
              v-model="cuscontactname"
              class="w-full"
              name="Contact Name"
            
            />
       
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactEmail -->
            <label>Contact Email</label>
            <vs-input
            icon-pack="feather"
              icon="icon-at-sign"
              placeholder="Contact Email"
              v-model="cuscontactEmail"
              class="w-full"
              name="item-contactEmail"
             
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('item-contactEmail')"
            >{{ errors.first('item-contactEmail') }}</span>
          </div>
          <div class="vx-col flex-1">
            <!-- ContactMobile -->
            <label>Contact Mobile</label>
            <vs-input
            icon-pack="feather"
              icon="icon-smartphone"
              placeholder="Contact Mobile"
              v-model="cuscontactmobile"
              class="w-full"
              name="Contact Mobile"
           
            />
           
          </div>
        </div>
        <div class="vx-row px-4 pb-3">

          <div class="vx-col flex-1">
            <label>Site infrastructure</label>
            <vs-textarea
              v-model="cusdescription"
              class="w-full"        
            />
          </div>
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg mr-6" @click="submitData">Submit</vs-button>
      <vs-button class="rounded-lg " type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
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
    this.loadcustomer();
  },
  data() {
    return {
      customer:'',
      customerID:null,
      siteID:null,
      sitename:"",
      cuscontactphone:"",
      cuscontactname:"",
      cuscontactEmail:"",
      cuscontactmobile:"",
      cusdescription:"",
      customerDropdown: [],
      settings: {

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
        this.siteID = this.data.siteID;
        this.customerID = this.data.customerID;
        this.customer = this.data.customer
        this.sitename= this.data.site;
        this.cuscontactphone= this.data.contactPhone;
        this.cuscontactname= this.data.contactName;
        this.cuscontactEmail= this.data.contactEmail;
        this.cuscontactmobile= this.data.contactMobile;
        this.cusdescription= this.data.description;
        //this.siteID=1;
        //let { category, id, img, customer, order_status, price ,categorycustomerid} = JSON.parse(JSON.stringify(this.data))
        this.initValues();
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.siteID, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
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
    populateData() {
      var self = this;
      //self.statusDropdown.value;
      if (self.customer) {
          self.customerID = self.customer.value;
        }
      },
    initValues() {
      if ((this.data.siteID) && (this.data.customerID)) return;
      this.customer = '',
      this.customerID = null;
      this.siteID = null;
      this.cusselect = 0;
      this.sitename = "";
      this.cuscontactphone= "";
      this.cuscontactname= "";
      this.cuscontactEmail= "";
      this.cuscontactmobile= "";
      this.cusdescription= "";
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
            accountID: 1,
            id:this.siteID,
            customerID : this.customerID,
            sitename : this.sitename,
            ContactName: this.cuscontactname,
            ContactEmail: this.cuscontactEmail,
            ContactPhone: this.cuscontactphone,
            ContactMobile: this.cuscontactmobile,
            Description: this.cusdescription,
          };
          if (this.siteID !== null && this.siteID >= 0) {
            //this.$store.dispatch("dataList/updateItem", obj).catch(err => { console.error(err) })
            self.$emit("update", obj);
          } else {
            delete obj.id;
            obj.popularity = 0;
            self.$emit("add", obj);
            //this.$store.dispatch("dataList/addItem", obj).catch(err => { console.error(err) })
          }
          this.$emit("closeSidebar");
          this.initValues();
      // this.$validator.validateAll().then(result => {
      //   if (result) {
          
        
      //   }
      // });
    },
    loadcustomer() {
      const self = this;
      // self.showLoadingOnElement("customerTable", 1, "radius");
      var onSuccess = function(response) {
        self.customerDropdown = response.data.map(function(item) {
           return { label: item.customer, value: item.id };
         // return { text: item.customer, value: item.id };
        });
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_Customer_GetGrid&parameters=1",
        onSuccess,
        onFinally
      );
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
