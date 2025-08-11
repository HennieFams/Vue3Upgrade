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
            <!-- Customer -->
            <label>Customer</label>
            <vs-input
              icon-pack="feather"
              icon="icon-user"
              placeholder="Customer Name"
              v-model="cusname"
              class="w-full"
              name="Customer Name"
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Customer Name')"
            >{{ errors.first('Customer Name') }}</span>
          </div>
          <div class="vx-col flex-1">
            <!-- CATEGORY -->
            <label>Category</label>
            <vs-select
            placeholder="Select Category"
              v-model="cuscategorycustomer"
              class="w-full"
              v-validate="'required'"
              ref="categorySelect"
              @change="myFunction($event)"
            >
              <vs-select-item
                :key="item.value"
                :value="item.value"
                :text="item.text"
                v-for="item in categoryDropdown"
              />
            </vs-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('Category')"
            >{{ errors.first('Category') }}</span>
          </div>
        </div>

        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <!-- VatNumber -->
            <label>VAT Number</label>
            <vs-input
            icon-pack="feather"  icon="icon-hash"
              placeholder="VAT Number"
              v-model="cusvatnumber"
              class="w-full"
              name="VAT Number"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('VAT Number')"
            >{{ errors.first('VAT Number') }}</span>
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
              v-validate="'required'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Contact Name')"
            >{{ errors.first('Contact Name') }}</span>
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
              v-validate="'required|email'"
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
              v-validate="'digits:10'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Contact Mobile')"
            >{{ errors.first('Contact Mobile') }}</span>
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
              v-validate="'digits:10'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Contact Phone')"
            >{{ errors.first('Contact Phone') }}</span>
          </div>
          <div class="vx-col flex-1">
            <!-- WebAddress -->
            <label>Web Address</label>
            <vs-input
            icon-pack="feather"
              icon="icon-globe"
              placeholder="Web Address"
              v-model="cuswebaddress"
              class="w-full"
              name="Web Address"
              v-validate="'url:require_protocol'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Web Address')"
            >{{ errors.first('Web Address') }}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <!-- Address1 -->
            <label>Address 1</label>
            <vs-input
            icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Address 1"
              v-model="cusaddress1"
              class="w-full"
              name="item-address1"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('item-address1')"
            >{{ errors.first('item-address1') }}</span>
          </div>
          <div class="vx-col flex-1">
            <!-- Address2 -->
            <label>Address 2</label>
            <vs-input
            icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Address 2"
              v-model="cusaddress2"
              class="w-full"
              name="item-address2"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('item-address2')"
            >{{ errors.first('item-address2') }}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <!-- Address3 -->
            <label>Address 3</label>
            <vs-input
            icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Address 3"
              v-model="cusaddress3"
              class="w-full"
              name="item-address3"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('item-address3')"
            >{{ errors.first('item-address3') }}</span>
          </div>
          <div class="vx-col flex-1">
            <!-- Address4 -->
            <label>Address 4</label>
            <vs-input
            icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Address 4"
              v-model="cusaddress4"
              class="w-full"
              name="item-address4"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('item-address4')"
            >{{ errors.first('item-address4') }}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col w-1/2">
            <!-- PostcalCode -->
            <label>Postal Code</label>
            <vs-input
            icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Postal Code"
              v-model="cuspostcalcode"
              class="w-full"
              name="Postal Code"
              v-validate="'numeric'"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('Postal Code')"
            >{{ errors.first('Postal Code') }}</span>
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
    VuePerfectScrollbar
  },
  mounted() {
    this.loadcategories();
  },
  data() {
    return {
      dataId: null,
      cusid: 0,
      cusaccountID: 0,
      cuscategorycustomer: "",
      cuscategorycustomerid: 0,
      cuscurrencyid: 1,
      cusname: "",
      cusvatnumber: "",
      cusaddress1: "",
      cusaddress2: "",
      cusaddress3: "",
      cusaddress4: "",
      cuspostcalcode: "",
      cuscontactname: "",
      cuscontactphone: "",
      cuscontactEmail: "",
      cuscontactmobile: "",
      cuswebaddress: "",
      cusenable: 0,
      categoryDropdown: [],
      category: [],

      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) {this.initValues()};
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        //let { category, id, img, customer, order_status, price ,categorycustomerid} = JSON.parse(JSON.stringify(this.data))
        this.dataId = this.data.id;
        this.cusid = this.data.id;
        this.cuscategorycustomer = this.data.categoryCustomerID;
        this.cuscategorycustomerid = this.data.categoryCustomerID;
        this.cusaccountID = this.data.accountID;
        this.cuscurrencyid = this.data.currencyid;
        this.cusname = this.data.customer;
        this.cusvatnumber = this.data.vatNumber;
        this.cusaddress1 = this.data.address1;
        this.cusaddress2 = this.data.address2;
        this.cusaddress3 = this.data.address3;
        this.cusaddress4 = this.data.address4;
        this.cuspostcalcode = this.data.postcalCode;
        this.cuscontactname = this.data.contactName;
        this.cuscontactphone = this.data.contactPhone;
        this.cuscontactEmail = this.data.contactEmail;
        this.cuscontactmobile = this.data.contactMobile;
        this.cuswebaddress = this.data.contactMobile;

        // this.dataCategory = category

        //this.dataOrder_status = order_status
        //this.dataPrice = price
        this.initValues();
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
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
          // this.$validator.reset()
          this.initValues()
        }
      }
    },
    isFormValid() {
      return (
        !this.errors.any() &&
        this.cusname &&
        this.cuscategorycustomerid &&
        this.dataPrice > 0
      );
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
    myFunction(value) {
      // alert(this.cuscategorycustomer);
      // //alert(this.customerselectid);
      // alert(this.category[this.cuscategorycustomer - 1].name)
    },
    initValues() {
      if (this.data.id) return;
      // this.category = response.data;
      this.categoryDropdown = 0;
      this.dataId = null;
      this.dataName = "";
      this.cusaccountID = 0
      this.dataCategory = null;
      this.dataOrder_status = "pending";
      this.dataPrice = 0;
      this.cusid = null;
      this.cusaccountID = 0;
      this.cuscategorycustomerid = 0;
      this.cuscurrencyid = 0;
      this.cusname = "";
      this.cusvatnumber = "";
      this.cusaddress1 = "";
      this.cusaddress2 = "";
      this.cusaddress3 = "";
      this.cusaddress4 = "";
      this.cuscontactname = "";
      this.cuscontactphone = "";
      this.cuscontactmobile = "";
      this.cuswebaddress = "";
      this.cusenable = 0;
      this.cuspostcalcode = "";
      this.cuscontactEmail = "";
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    loadcategories() {
      const self = this;
      self.showLoadingOnElement("categorySelect", 1, "radius");

      var onSuccess = function(response) {
        self.category = response.data;
        self.categoryDropdown = response.data.map(function(item) {
          return { text: item.name, value: item.id };
        });
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_CategoryCustomer",
        onSuccess,
        onFinally
      );
    },
    submitData() {
      var self = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            categorycustomerid: this.cuscategorycustomer,
            currencyid: 1,
            accountID: 1,
            customer: this.cusname,
            name: this.cusname,
            vatnumber: this.cusvatnumber,
            address1: this.cusaddress1,
            address2: this.cusaddress2,
            address3: this.cusaddress3,
            address4: this.cusaddress4,
            postcalCode: this.cuspostcalcode,
            contactName: this.cuscontactname,
            contactEmail: this.cuscontactEmail,
            contactPhone: this.cuscontactphone,
            contactMobile: this.cuscontactmobile,
            webAddress: this.cuswebaddress,
            enable: 1
          };

          if (this.dataId !== null && this.dataId >= 0) {
            //this.$store.dispatch("dataList/updateItem", obj).catch(err => { console.error(err) })
            self.$emit("update", obj);
          } else {
            delete obj.id;
            obj.popularity = 0;
            self.$emit("addcustomer", obj);
            //this.$store.dispatch("dataList/addItem", obj).catch(err => { console.error(err) })
          }

          this.$emit("closeSidebar");
          this.initValues();
        }
      });
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
