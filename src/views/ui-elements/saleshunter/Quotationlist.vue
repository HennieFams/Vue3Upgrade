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
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @update="update"
    />

    <vx-card ref="MainCard" title>
      <vs-popup fullscreen title="Quotation Viewer" :active.sync="popupActive">
        <iframe
          :src="quoteselected"
          style="height: 100%; width: 100%;  min-height: 1000px;"
          frameborder="0"
          allowfullscreen="true"
        />
      </vs-popup>

      <div>
        <vs-table
          ref="quoteTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="quotations"
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
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ quotations.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : quotations.length }} of {{ quotations.length }}</span>
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
            <vs-th sort-key="quoteNr">Quote No.</vs-th>
            <vs-th sort-key="quoteRef">Reference</vs-th>
            <vs-th sort-key="customer">Customer</vs-th>
            <vs-th sort-key="quoteDate" style="width: 115px;">Created On</vs-th>
            <vs-th sort-key="quoteExpiryDate" style="width: 115px;">Expire On</vs-th>
            <vs-th sort-key="quoteTotal" style="width: 140px;">Total</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.quoteNr">{{tr.quoteNr}}</vs-td>
              <vs-td :data="tr.quoteRef">{{tr.quoteRef}}</vs-td>
              <vs-td :data="tr.customer">{{tr.customer}}</vs-td>
              <vs-td
                :data="tr.quoteDate"
              >{{formatDate(tr.quoteDate.replace("T", " ").split('.')[0])}}</vs-td>
              <vs-td
                :data="tr.quoteExpiryDate"
              >{{formatDate(tr.quoteExpiryDate.replace("T", " ").split('.')[0])}}</vs-td>
              <vs-td :data="tr.quoteTotal">{{ "R " + Number(tr.quoteTotal).toLocaleString('en') }}</vs-td>
              <vs-td class="whitespace-no-wrap">
                <feather-icon
                  icon="EyeIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click.stop="viewData(tr)"
                />
                <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  class="ml-2"
                  @click.stop="editData(tr)"
                />
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="deleteData(tr)"
                />
                <feather-icon
                  icon="FlagIcon"
                  svgClasses="w-5 h-5 hover:text-success stroke-current"
                  class="ml-2"
                  @click.stop="showStatusPrompt(tr)"
                />
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <vs-prompt
        ref="statusPrompt"
        title="Update Quote Status"
        acceptText="Update"
        cancelText="Cancel"
        @cancel="statusDropdown=0"
        @accept="updateStatus"
        :active.sync="statusPromptActive">
        <div class="con-exemple-prompt">
          <div>
            <label>Status</label>
            <v-select placeholder="Choose Status" :options="quoteStatusses" v-model="statusDropdown"></v-select>
          </div>
          <div>
            <label>Comment</label>
            <vs-textarea v-model="changeStatusData.comment" />
          </div>
        </div>
      </vs-prompt>

    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import CustomerSidebar from "./CustomerSidebar.vue";
import moment from "moment";
import vSelect from 'vue-select'
export default {
  data() {
    return {
      statusPromptActive: false,
      statusDropdown: 0,
      quoteStatusses: [],
      itemsPerPage: 10,
      quoteselected: "",
      selected: [],
      quotations: [],
      isMounted: false,
      popupActive: false,
      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},
      formData: {
        id: 0,
        accountID: 0,
        categorycustomerid: 0,
        currencyid: 0,
        customer: "",
        name: "",
        vatNumber: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        postcalCode: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactMobile: "",
        webAddress: "",
        enable: 1
      },
      changeStatusData: {
        quoteId: 0,
        statusId: 0,
        accountId: 1,
        comment: ""
      }
    };
  },
  components: {
    flatPickr,
    CustomerSidebar,
    'v-select': vSelect
  },
  mounted() {
    this.loadQuotation();
    this.isMounted = true;
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.quoteTable.currentx;
      }
      return 0;
    }
  },
  methods: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    showStatusPrompt(tr) {
      var self = this;
      self.changeStatusData = {
        quoteId: tr.qid,
        statusId: tr.quoteStatusID,
        accountId: 1,
        comment: ""
      };
      self.getStatusses(function () {
        self.statusDropdown = self.quoteStatusses.filter(function (item) { return item.value == self.changeStatusData.quoteStatusID; })[0];
      });
      self.statusPromptActive = true;
    },
    updateStatus() {
      var self = this;
      if(self.statusDropdown){
        self.changeStatusData.statusId = self.statusDropdown.value;

        //-----------Andre----- >>> do send the 'changeStatusData' object to backend here
      }
    },
    addNewData() {
      this.$router.push({ name: "quotationlayout" });
      // this.sidebarData = {}
      // this.toggleDataSidebar(true)
    },
    getStatusses(whenDone) {
      const self = this;
      // self.showLoadingOnElement("statusPrompt", 1, "radius");

      var onSuccess = function(response) {
        self.quoteStatusses = response.data.map((item) => {return {label: item.name, value: item.id} });
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.statusPrompt.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_QuotationStatus&parameters=1",
        onSuccess,
        onFinally
      );
    },
    viewData(data) {
      this.quoteselected = "";
      this.popupActive = true;
      // var str = "QUO0000017"
      // var res = data.quoteNr.replace("QUO", "");

      this.quoteselected =
        "http://localhost:62620/ReportViewer.aspx?quoteID=" +
        data.quoteNr.replace("QUO", ""); //res; //data.qid
      //http://localhost:62620/ReportViewer.aspx?quoteID=0000018
    },
    editData(data) {
      const self = this;
      self.$router.push({
        name: "quotationlayout",
        params: { quoteNr: data.qid }
      });
      // self.$router.push({ name: 'quotationcrud', params: { personId: self.formData.personId, leadVehicleInfo: self.formData } })
      // this.popupActive=true
      // this.sidebarData = data
      // this.toggleDataSidebar(true)
    },
    deleteData(data) {
      const self = this;
      self.showLoadingOnElement("quoteTable", 1, "radius");

      var onSuccess = function(response) {
        self.loadQuotation();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.quoteTable.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/RemoveQuotation?quotesId=" + data.qid,
        onSuccess,
        onFinally
      );
    },
    //  addcustomer(data) {

    //     const self = this;
    //     self.showLoadingOnElement("quoteTable", 1, "radius");

    //     var onSuccess = function(response) {
    //      self.loadQuotation();
    //     };
    //     var onFinally = function() {
    //       self.$vs.loading.close(self.$refs.quoteTable.$el);
    //     };
    //      self.$ajaxPost(self, "SalesSeeker/AddCustomer", data, onSuccess, onFinally);
    //   },
    update(data) {
      const self = this;
      self.showLoadingOnElement("quoteTable", 1, "radius");

      var onSuccess = function(response) {
        self.loadcustomer();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.quoteTable.$el);
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/UpdateCustomer",
        data,
        onSuccess,
        onFinally
      );
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },

    loadQuotation() {
      const self = this;
      self.showLoadingOnElement("quoteTable", 1, "radius");

      var onSuccess = function(response) {
        self.quotations = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.quoteTable.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/Quotationlist?accountid=1&salesrepid=1",
        onSuccess,
        onFinally
      );
    }
  }
};
</script>
