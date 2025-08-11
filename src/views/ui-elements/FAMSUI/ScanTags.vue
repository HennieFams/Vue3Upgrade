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
  <div id="equipment">
    <vx-card ref="MainCard">
      <div>
        <vs-table
        ref="gridTableTags"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="tagsList"
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
              @click="GetGrid()"
              icon-pack="feather"
              icon="icon-refresh-ccw"
              >Reload</vs-button
            >

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
                    tagsList.length - currentPage * itemsPerPage > 0
                      ? currentPage * itemsPerPage
                      : tagsList.length
                  }}
                  of {{ tagsList.length }}</span
                >
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
            <vs-th sort-key="Tag">Tag</vs-th>
            <vs-th sort-key="type">Use Type</vs-th>
            <vs-th sort-key="description">Tag Type</vs-th>
            <vs-th class="whitespace-no-wrap flex-right">Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td :data="tr.allocationType.groupName">{{tr.allocationType.groupName}}</vs-td> -->
              <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap flex-right">
                <vx-tooltip text="Assign Tag" style="display: flex;">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"

                    @click.stop="assignTag(tr)"
                  />
                  <!-- <vs-button class="rounded-lg mr-2" color="warning" @click="assignTag(tr)" icon-pack="feather" icon="icon-refresh-ccw">Assign</vs-button> -->
                </vx-tooltip>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
    <vs-prompt
      ref="assignPrompt"
      title="Assign to Account"
      acceptText="Save"
      cancelText="Cancel"
      @cancel="cancelPrompt"
      @accept="tagAssigned"
      :active.sync="assignPromptActive"
      >
      <!-- :active.sync="statusPromptActive" -->
      <div class="con-exemple-prompt">
        <div>
          <label>Tag To Assign: {{ promptLabel }}</label>
        </div>
        <div>
          <label>Account</label>
          <v-select
            placeholder="Select Type"
            :options="accountData"
            v-model="accountSelected"
          ></v-select>
        </div>
        <div>
          <label>Tag Type</label>
          <v-select
            placeholder="Select Type"
            :options="dropdownAssign"
            v-model="dropdownSelectAssign"
          ></v-select>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { Validator } from "vee-validate"; // For custom error message
import { toArray } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

const dict = {
  custom: {
    first_name: {
      required: "First name is required",
      alpha: "First name may only contain alphabetic characters",
    },
  },
};

Validator.localize("en", dict);

export default {
  data() {
    return {
    dropdownSelectAssign: { value: 0, label: "Search / Select Type" },
    dropdownAssign: [
      { value: 0, label: "Search / Select Type" },
      { value: 1, label: "Equipment" },
      { value: 2, label: "Employee" }
    ],
    selected: null,
    formData: {
      id: 0,
      accountId: 0,
      storeId: 0,
      macaddress: "",
      tagNumber: "",
      description: "",
      type : "",
      tagTypeId: 0,
      useType: ''
    },
    accountData:[],
    accountSelected: { value: 0, label: "Search / Select Account" },
    promptLabel: "",
    itemsPerPage: 10,

    tagsList: [],
    isMounted: false,
    assignPromptActive: false,
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTableTags.currentx;
      }
      return 0;
    },
  },

  watch: {
    name(val) {
      this.name = val.replace(/\W/g, "");
    },
  },
  mounted() {
    this.GetGrid();
    this.GetAccountsDropdown();
    this.isMounted = true;
  },
  methods: {

    initValues() {
      var self = this;
      self.dropdownSelectAssign = { value: 0, label: "Search / Select Type" };
      self.accountSelected = { value: 0, label: "Search / Select Account" };
      self.formData.id = 0;
      self.formData.accountId = 0;
      self.formData.storeId = 0;
      self.formData.macaddress = "";
      self.formData.tagNumber = "";
      self.formData.description = "";
      self.formData.type = "";
    },
    cancelPrompt() {
      this.assignPromptActive = false;
      this.initValues();
      this.GetGrid();
    },
    // showStatusPromptAssign(data) {
    //   var self = this;
    //   self.promptLabel = data.tag;
    //   self.assignPromptActive = true;
    // },
    successNotifyLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully loaded",
        color: "success",
      });
    },
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Tag successfully assigned",
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
    ValidateNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Please ensure all the fields are completed",
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
    tagAssigned() {
      var self = this;
      self.formData.accountId = self.accountSelected.value;
      self.formData.useType = self.dropdownSelectAssign.label;
      self.showLoadingOnElement("gridTableTags", 1, "radius");
      var onSuccess = function (response) {
        self.assignPromptActive = false;
        self.initValues();
        self.GetGrid();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTableTags.$el);
      };
      self.$ajaxPost(self, "IntegrationFAMS/AssignedToAccount", self.formData, onSuccess, onFinally);
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTableTags", 1, "radius");
      var onSuccess = function (response) {
        self.tagsList = response.data;

        self.successNotifyLoad();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTableTags.$el);
      };
      self.$ajaxGet(self, "IntegrationFAMS/GetTags", onSuccess, onFinally);
    },
    GetAccountsDropdown() {
      const self = this;
      // self.showLoadingOnElement("gridTableBusiness", 1, "radius");
      var onSuccess = function (response) {
        self.accountData =response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTableBusiness.$el);
      };
      self.$ajaxGet(
        self,
        "Accounts/GetAccountdropdown",
        onSuccess,
        onFinally
      );
    },
    assignTag(data){
      var self = this;

      self.promptLabel = data.tag;
      self.formData.id = data.id;
      self.formData.accountId = data.accountId;
      self.formData.storeId = data.storeId;
      self.formData.macaddress = data.macaddress;
      self.formData.tagNumber = data.tag;
      self.formData.description = data.description;
      self.formData.useType = data.useType;
      self.formData.tagTypeId = data.tagTypeId;
      if(data.accountId > 0){
        self.accountSelected = self.accountData.filter(function (item) {
          return item.value == data.accountId;
        })[0];
      }
      else{
        self.accountSelected = { value: 0, label: "Search / Select Account" };
      }
      if(data.type != ""){
        self.dropdownSelectAssign = self.dropdownAssign.filter(function (item) {
          return item.label == data.type;
        })[0];
      }
      else{
        self.accountSelected = { value: 0, label: "Search / Select Type" };
      }
      self.assignPromptActive = true;
    },
  },
};
</script>
<style>
.v-select.v-input--is-dirty input {
  display: none;
}

.v-select__selection {
  max-width: none;
}

#equipment #iconContainer span{
  display: flex;
  justify-content: space-evenly;
}
#equipment #iconContainer span .con-vs-tooltip{
  padding: 0px 2px;
}
#equipment #expandIconContainer span{
  display: flex;
  justify-content: space-evenly;
}
#equipment #expandIconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
#boolSearch{
  width: 110px;
}
</style>

