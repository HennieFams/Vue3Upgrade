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

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
      <div class="pl-6 pr-6 pb-6">
        <div class="pb-4" >
          <label>Category</label>
          <v-select ref="categoryDropdown" placeholder="Search / Select Category" :options="categories" v-model="categoryDropdown"></v-select>
          <span
            class="text-danger text-sm"
            v-show="errors.has('Category')"
          >{{ errors.first('Category') }}</span>
        </div>
        <div class="pb-4">
          <label>Product Code</label>
          <vs-input
            placeholder="Product Code"
            v-model="code"
            class="w-full"
            name="Product Code"
            v-validate="'required'"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('Product Code')"
          >{{ errors.first('Product Code') }}</span>
        </div>
        <div>
          <label>Description</label>
          <vs-textarea
            v-model="description"
            class="w-full"
          />
        </div>
        <div class="pb-4">
          <label>Cost Price (R)</label>
          <vs-input
            placeholder="Cost Price"
            v-model="costPrice"
            class="w-full"
            name="Cost Price"
            v-validate="'required'"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('Cost Price')"
          >{{ errors.first('Cost Price') }}</span>
        </div>
        <div class="pb-4">
          <label>Selling Price (R)</label>
          <vs-input
            placeholder="Selling Price"
            v-model="sellingPrice"
            class="w-full"
            name="Selling Price"
            v-validate="'required'"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('Selling Price')"
          >{{ errors.first('Selling Price') }}</span>
        </div>
      </div>
    </VuePerfectScrollbar>

    

    <div class="flex flex-wrap items-center justify-center pb-4 pt-1" slot="footer">
      <vs-button class="rounded-lg mr-3" color="success" @click="submitData">Submit</vs-button>
      <vs-button class="rounded-lg " type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from 'vue-select'
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
    'v-select': vSelect
  },
  mounted() {
    
  },
  data() {
    return {
      pid: 0,
      code: "",
      description: "",
      costPrice: "",
      sellingPrice: "",
      categoryDropdown: 0,
      categories: [],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  watch: {
    isSidebarActive(val) {
      var self = this;
      if (!val) return;
      if (Object.entries(self.data).length === 0) {
        self.initValues();
        self.loadCategories();
        self.$validator.reset();
      } else {
        self.loadCategories(function () {
          self.categoryDropdown = self.categories.filter(function (item) { return item.value == self.data.categoryProductID; })[0];
        });
        self.pid = self.data.pid;
        self.code = self.data.code;
        self.description = self.data.description;
        self.costPrice = self.data.costPrice;
        self.sellingPrice = self.data.sellingPrice;
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
          this.$validator.reset()
          this.initValues()
        }
      }
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
    initValues() {
      this.pid = null;
      this.categories = [];
      this.categoryDropdown = 0;
      this.code = "";
      this.description = "";
      this.costPrice = "";
      this.sellingPrice = "";
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    loadCategories(whenDone) {
      const self = this;
      self.showLoadingOnElement("categoryDropdown", 0.65, "radius");

      var onSuccess = function(response) {
        self.categories = response.data.map((item) => {return {label: item.name, value: item.id} });
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.categoryDropdown.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_CategoryProduct&parameters=1",
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
    width: 450px;
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
