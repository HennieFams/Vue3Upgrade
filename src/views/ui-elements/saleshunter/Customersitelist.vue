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
  <div id="data-list-list-view" class="data-list-container">
    <customer-sidebar
      :isSidebarActive="customerSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @update="update"
      @add="add"
    />

    <vx-card ref="MainCard" title>
      <div>
        <vs-table
          ref="customerTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="customers"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <div
              ref="addNewData"
              class="p-3 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
              @click="addNewData"
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
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ customers.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : customers.length }} of {{ customers.length }}</span>
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
            <vs-th sort-key="Customer">Customer</vs-th>
            <vs-th sort-key="Site">Site</vs-th>
            <vs-th sort-key="ContactName">Contact Name</vs-th>
            <vs-th sort-key="ContactEmail">Contact Email</vs-th>
            <vs-th sort-key="ContactPhone">Contact Phone</vs-th>
            <vs-th sort-key="ContactMobile">Contact Mobile</vs-th>
            <vs-th sort-key="Description">Description</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.customer">{{tr.customer}}</vs-td>
              <vs-td :data="tr.site">{{tr.site}}</vs-td>
              <vs-td :data="tr.contactName">{{tr.contactName}}</vs-td>
              <vs-td :data="tr.contactEmail">{{tr.contactEmail}}</vs-td>
              <vs-td :data="tr.contactPhone">{{tr.contactPhone}}</vs-td>
              <vs-td :data="tr.contactMobile">{{tr.contactMobile}}</vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
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
                  @click.stop="deleteData(tr)"
                />
              </vs-td>
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
import customerSidebar from "./CustomersitelistSidebar.vue";
export default {
  data() {
    return {
      itemsPerPage: 10,
      selected: [],
      customers: [],
    
      customererror: [],
      isMounted: false,
      // Data Sidebar
      customerSidebar: false,
      sidebarData: {},
      formData: {
        siteID: 0,
        customerID: 0,
        accountID: 0,
        customer: "",
        site: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactMobile: "",
        description: "",
      }
    };
  },
  components: {
    flatPickr,
    customerSidebar
  },
  mounted() {
    this.loadcustomersite();
    this.isMounted = true;
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.customerTable.currentx;
      }
      return 0;
    }
  },
  methods: {
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    deleteData(data) {
      const self = this;
      self.showLoadingOnElement("customerTable", 1, "radius");

      var onSuccess = function(response) {
        self.loadcustomersite();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.customerTable.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/RemoveCustomerSite?siteId=" + data.siteID,
        onSuccess,
        onFinally
      );
    },
    editData(data) {
      //alert(data.vatNumber)
      // this.formData.id = data.id
      // this.formData.name = data.customer
     // alert(data.customerID)
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    add(data) {
       // alert("yes baby");
      const self = this;
      self.showLoadingOnElement("customerTable", 1, "radius");

      var onSuccess = function(response) {
        self.loadcustomersite();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.customerTable.$el);
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/AddCustomerSite",
        data,
        onSuccess,
        onFinally
      );
    },
    update(data) {
      const self = this;
      self.showLoadingOnElement("customerTable", 1, "radius");

      var onSuccess = function(response) {
        self.loadcustomersite();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.customerTable.$el);
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/UpdateCustomerSite",
        data,
        onSuccess,
        onFinally
      );
    },
    toggleDataSidebar(val = false) {
      this.customerSidebar = val;
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },

    loadcustomersite() {
      const self = this;
      self.showLoadingOnElement("customerTable", 1, "radius");

      var onSuccess = function(response) {
        self.customers = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.customerTable.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_CustomerSite_GetGrid&parameters=1",
        onSuccess,
        onFinally
      );
    }

  }
};
</script>
