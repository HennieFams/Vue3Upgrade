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
    <product-sidebar
      :isSidebarActive="productSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @updateProduct="updateProduct"
      @addProduct="addProduct"
    />
    <vx-card ref="MainCard">
      <div>
        <vs-table
          ref="productTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="products"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <div
              ref="addNew"
              class="p-3 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
              @click="addProduct"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ products.length }}</span>
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
            <vs-th sort-key="Code">Code</vs-th>
            <vs-th sort-key="Description">Description</vs-th>
            <vs-th style="min-width: 110px;" sort-key="SellingPrice">Price</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.code">{{tr.code}}</vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
              <vs-td
                :data="tr.sellingPrice"
              >{{ "R " + Number(tr.sellingPrice).toLocaleString('en') }}</vs-td>
              <vs-td class="whitespace-no-wrap">
                <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="editData(tr)"
                />
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="deleteData(tr.id)"
                />
              </vs-td>
              <!-- <vs-td :data="tr.Createdate">
                        {{tr.Createdate.replace("T", " ").split('.')[0]}}
                           <template slot="edit">
                                  <flat-pickr :config="configdateTimePicker" v-model="tr.Createdate"/>
                            </template>

                              <template slot="edit">
                            <vs-select label="Category" v-model="tr.categoryproductid">
                                <vs-select-item :key="index" :value="item.ID" :text="item.name" v-for="(item,index) in categories" />
                            </vs-select> 
                        </template>         
              </vs-td>-->
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
import productSidebar from "./ProductSidebar.vue";
export default {
  data() {
    return {
      itemsPerPage: 10,
      productSidebar: false,
      selected: [],
      products: [],
      productserror: [],
      categorieserrors: [],
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y/m/d h:m"
      },
      date2: null,
      sidebarData: {},
      isMounted: false,
    };
  },
  components: {
    flatPickr,
    productSidebar
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.productTable.currentx;
      }
      return 0;
    }
  },
  mounted() {
    this.loadProducts();
    this.isMounted = true;
  },
  methods: {
    addProduct() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    updateProduct() {},
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    deleteData(id) {},
    editData(data) {
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    loadProducts() {
      const self = this;
      self.showLoadingOnElement("productTable", 1, "radius");

      var onSuccess = function(response) {
        self.products = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.productTable.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_Product_Get&parameters=1",
        onSuccess,
        onFinally
      );
    },
    toggleDataSidebar(val = false) {
      this.productSidebar = val;
    },
  }
};
</script>
