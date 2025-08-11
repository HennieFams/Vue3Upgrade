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
    <vx-card ref="MainCard2" v-show="!isInfoHidden">
      <div class="mt-5">
        <div class="vx-row">
          <div class="vx-col md:w-1/6 w-full">
            <vs-button
              color="warning"
              type="border"
              class="rounded-lg mb-2"
              @click="cancelAdd"
              >Return</vs-button
            >
          </div>
          <div class="vx-col md:w-1/8 w-full">
            <vs-button
              color="warning"
              type="border"
              class="rounded-lg mb-2"
              @click="initValues"
              >Restart</vs-button
            >
          </div>
        </div>

        <form-wizard
          ref="wizard"
          color="rgba(var(--vs-primary), 1)"
          errorColor="rgba(var(--vs-danger), 1)"
          :title="title"
          :subtitle="subtitle"
          finishButtonText="Save entry"
          @on-complete="formSubmitted"
        >
          <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
            <!-- tab 1 content -->
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input
                  label="Integration Name"
                  v-model="formData.name"
                  class="w-full"
                />
              </div>
            </div>
          </tab-content>
        </form-wizard>
      </div>
    </vx-card>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="integrationData"
          class="vs-con-loading__container"
        >
          <div
            slot="header"
            class="flex flex-wrap-reverse items-center flex-grow"
          >
            <!-- ADD NEW -->
            <vs-button
              class="rounded-lg mr-2"
              color="warning"
              type="filled"
              @click="GetGrid()"
              icon-pack="feather"
              icon="icon-refresh-ccw"
              >Reload</vs-button
            >
            <vs-button
              class="rounded-lg mr-2"
              color="success"
              type="filled"
              @click="addVue"
              icon-pack="feather"
              icon="icon-plus-square"
              >Add New</vs-button
            >
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="
                  p-4
                  border border-solid border-grey-light
                  rounded-full
                  d-theme-dark-bg
                  cursor-pointer
                  flex
                  items-center
                  justify-between
                  font-medium
                "
              >
                <span class="mr-2"
                  >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                  {{
                    integrationData.length - currentPage * itemsPerPage > 0
                      ? currentPage * itemsPerPage
                      : integrationData.length
                  }}
                  of {{ integrationData.length }}</span
                >
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage = 10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 20">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 50">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 100">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <template slot="thead">
            <vs-th sort-key="integration">Integration Name</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Integration">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDataPopup(tr)"
                  />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Integration">
                  <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2"
                    @click.stop="deleteGrid(tr)"
                  />
                </vx-tooltip>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vs-popup
      class="editIntegrationName"
      title="Edit Integration Name"
      :active.sync="showPopup">
      <div id="popupMessage">
        <div class="vx-col">
          <label>New Name</label>
          <vs-input
            label="Integration Name"
            v-model="popupData.editName"
            class="w-full"
          />
        </div>
        <div class="vx-row flex flex-wrap items-center pt-4">
          <vs-button class="rounded-lg mr-2 ml-3" color="warning" type="filled" @click="closePopup"        icon-pack="feather" icon="icon-refresh-ccw">Cancel</vs-button>
          <vs-button class="rounded-lg mr-2 ml-2 vs-con-loading__container" ref="submitButon" color="success" type="filled" @click="updateGrid"         icon-pack="feather" icon="icon-plus-square">Submit</vs-button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import costcentreSidebar from "./CostSidebar.vue";
export default {
  data() {
    return {
      title: "FAMS - new Cost Centre Wizard!!",
      subtitle: "Please complete each tab to add new Cost Centre",

      isListHidden: false,
      isInfoHidden: true,

      itemsPerPage: 10,
      costcentreSidebar: false,
      selected: [],
      integrationData: [],
      sidebarData: {},
      isMounted: false,
      formData: {
        Id: 0,
        name: "",
      },
      showPopup: false,
      popupData: {
        editName: "",
        id: 0
      },
    };
  },
  components: {
    flatPickr,
    costcentreSidebar,
    "v-select": vSelect,
    FormWizard,
    TabContent,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  mounted() {
    this.GetGrid();
    this.isMounted = true;
  },
  methods: {
    //********************* System related*/
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully added | updated | removed",
        color: "success",
      });
    },
    FailedNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Item not added",
        color: "danger",
      });
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },

    editDataPopup(data) {
      this.popupData.id = data.id;
      this.popupData.editName = data.name;
      this.showPopup = true;
    },
    //********************* Event functions *

    cancelAdd() {
      (this.isListHidden = false), (this.isInfoHidden = true);
      this.initValues();
      this.GetGrid();
    },
    addVue() {
      this.initValues();
      this.isInfoHidden = false;
      this.isListHidden = true;
      // this.$refs.wizard.navigateToTab(0)
    },

    initValues() {
      var self = this;
      self.formData.name = "";
      self.showPopup = false;
      self.popupData.editName = "";
      self.popupData.id = 0;
    },
    //********************* SQL events */
    formSubmitted() {
      var self = this;
      var myobject = {
        id: 0,
        name: self.formData.name
      };
      
        self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        (self.isListHidden = false), (self.isInfoHidden = true);
        // self.initValues();
        self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "Integrations/PostIntegration",
        myobject,
        onSuccess,
        onFinally
      );
    },

    updateGrid() {
      const self = this;
      
      var myobject = {
        id: self.popupData.id,
        name: self.popupData.editName
      };
      //var myobject = self.popupData;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.closePopup();
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "Integrations/PostIntegration",
        myobject,
        onSuccess,
        onFinally
      );
    },

    closePopup(){
      var self = this;
      self.showPopup = false;
    },

    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "Integrations/" + data.id,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        
        self.integrationData = response.data;
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      var onFinally = function () {
      };
      self.$ajaxGet(self,"Integrations/", onSuccess);
    },
  },
};
</script>
<style>
#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>