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
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.formData).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>

      <feather-icon icon="XIcon" @click.stop="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="p-6">
        <!-- <vs-select v-model="product" label="Product" class="mt-5 w-full" name="item-product" v-validate="'required'" ref="productSelect" @change="myFunction($event)">
          <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in productDropdown" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('item-product')">{{ errors.first('item-product') }}</span>-->

        <v-select
          :options="products"
          placeholder="Search / Select Product"
          v-model="productDropdown"
          @search:blur="populateData"
          @input="clearFields"
        />

        <vs-input
          label="Description"
          v-model="description"
          class="mt-5 w-full"
          name="Description"
          v-validate="'required'"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('Description')"
        >{{ errors.first('Description') }}</span>

        <vs-input
          label="Selling Price"
          v-model="sellingPrice"
          class="mt-5 w-full"
          name="Selling Price"
          v-validate="'required'"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('Selling Price')"
        >{{ errors.first('Selling Price') }}</span>

        <vs-input
          label="Quantity"
          type="number"
          min="1"
          v-model="qty"
          class="mt-5 w-full"
          name="Quantity"
          v-validate="'required'"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('Quantity')"
        >{{ errors.first('Quantity') }}</span>

        <vs-input
          label="Discount"
          type="number"
          min="0"
          step="2"
          max="16"
          v-model="discount"
          class="mt-5 w-full"
        />

        <vs-input
          label="Total"
          v-model="total"
          class="mt-5 w-full"
          name="Total"
          v-validate="'required'"
        />
        <span class="text-danger text-sm" v-show="errors.has('Total')">{{ errors.first('Total') }}</span>
          <vs-input
          label="Comment"
          v-model="comment"
          class="mt-5 w-full"
          name="Comment"
          v-validate="'required'"
        />
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg mr-6" color="success" @click="submitData">Submit</vs-button>
      <!-- :disabled="!isFormValid" -->
      <vs-button class="rounded-lg " type="border" color="danger" @click="closeSidebar">Cancel</vs-button>
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
    formData: {
      type: Object,
      default: () => {}
    },
    itemToEditIndex: {
      type: Number,
      required: false
    }
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect
  },
  mounted() {
    this.loadProducts();
  },
  data() {
    return {
      priceExcl: 0,
      sellingPrice: 0,
      discount: 0,
      qty: 1,
      selectedProduct: {},
      productDropdown: 0,
      productData: {},
      products: [],
      product: "",
      pid: 0,
      dataId: null,
      description: "",
      total: 0,
      quotationPaymentTermsId: 1,
      comment: "N/A",

      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  watch: {
    isSidebarActive: function(val) {
      if (val) {
        var self = this;
        if(self.formData.dataId){
          self.productDropdown = self.products.filter(function(item) {
            return item.value == self.formData.productID;
          })[0];

          self.selectedProduct = self.productData.filter(function(item) {
            return item.pid == self.productDropdown.value;
          })[0];

          self.description = self.formData.description;
          self.dataId = self.formData.dataId;
          self.product = self.formData.code;
          self.qty = self.formData.qty;
          self.discount = self.formData.discount;
          self.sellingPrice = self.formData.priceExcl;
          // self.PriceExcl    = self.formData.PriceExcl
          self.vat = self.formData.vat;
          self.total = self.formData.total;
          self.quotationPaymentTermsId = self.formData.quotationPaymentTermsId;
          self.comment = self.formData.comment;
        }
        else{
          self.initValues();
          self.$validator.reset();
        }
      // }
      // if (Object.entries(this.formData).length === 0) {
      //   this.initValues();
      //   this.$validator.reset();
      }
    },
    qty: function() {
      var self = this;
      self.total = self.qty * self.selectedProduct.sellingPrice;
    },
    discount: function() {
      var self = this;
      var discAmt = self.selectedProduct.sellingPrice * (self.discount / 100);
      self.sellingPrice = (self.selectedProduct.sellingPrice - discAmt) * self.qty;
      self.total = self.sellingPrice;
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        
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
    populateData() {
      var self = this;
      if (self.productDropdown) {
        self.selectedProduct = self.productData.filter(function(item) {
          return item.pid == self.productDropdown.value;
        })[0];
        self.description = self.selectedProduct.description;
        self.code = self.selectedProduct.code;
        self.sellingPrice = self.selectedProduct.sellingPrice;
        self.vat = self.selectedProduct.vat;
        self.total = self.selectedProduct.sellingPrice * self.qty;
      }
    },
    clearFields() {
      this.initValues();
    },
    initValues() {
      //if (this.formData.id) return;
      // this.dataId = this.formData.dataId
      // this.product = this.formData.id
      // this.description = this.formData.description
      // this.code = this.formData.code
      // this.qty = this.formData.qty
      // this.sellingPrice = this.formData.PriceExcl
      // this.vat = this.formData.vat
      // this.total = this.formData.total
      // this.productDropdown = 0;
      this.dataId = 0;
      this.product = 0;
      this.description = "";
      this.code = "";
      this.qty = 1;
      this.sellingPrice = 0;
      this.vat = 15;
      this.total = 0;
      this.quotationPaymentTermsId = 1;
      this.comment = "N/A";
      // this.productDropdown = 0;
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    loadProducts() {
      const self = this;
      //self.showLoadingOnElement("productSelect", 1, "radius");

      var onSuccess = function(response) {
        self.productData = response.data;
        self.products = response.data.map(function(item) {
          return { label: item.code, value: item.pid };
        });
      };
      var onFinally = function() {
        //self.$vs.loading.close(self.$refs.productSelect.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_Product_Get&parameters=1",
        onSuccess,
        onFinally
      );
    },

    submitData() {
      var self = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            dataId: self.selectedProduct.pid,
            productID: self.selectedProduct.pid,
            code: self.selectedProduct.code,
            description: self.description,
            qty: self.qty,
            discount: self.discount,
            priceExcl: self.sellingPrice,
            vat: self.vat,
            total: self.total,
            quotationPaymentTermsId: self.quotationPaymentTermsId,
            comment: self.comment
          };
       
          if (self.dataId) {
          // if (this.dataId !== null && this.dataId !== 0) {
            // alert("update")
            self.$emit("editItem", obj, self.itemToEditIndex);
          } else {
            //  alert("add")
            // delete obj.id
            
            obj.popularity = 0;
            self.$emit("addItem", obj);
          }

          this.$emit("closeSidebar");
          // this.initValues()
        }
      });
    },
    closeSidebar(){
      this.$emit("closeSidebar")
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
    width: 400px;
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
