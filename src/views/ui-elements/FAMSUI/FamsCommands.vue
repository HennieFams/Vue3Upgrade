<template>
  <div id="simple-calendar-app">
    <vs-tabs
      v-model="activeDashTab"
      ref="sqlView"
      class="vs-con-loading__container"
      style="width: auto min-height:auto"
    >
      <vs-tab label="Execute Command" style="min-height: 500px">
        <vx-card class="vx-card no-scroll-content">
          <div class="ml-4 mr-4">
            <v-select
              class="vx-col w-full mb-2"
              placeholder="Select Store"
              style="background-color: rgb(255 255 255)"
              :options="storesList"
              v-model="selectedStore"
            >
            </v-select>
            <v-select
              class="vx-col w-full mb-2"
              placeholder="Select Command"
              @search:blur="extraInfo"
              style="background-color: rgb(255 255 255)"
              :options="commandsList"
              v-model="selectedCommand"
            >
            </v-select>
            <div v-show="showEqp">
              <v-select
                class="vx-col w-full mb-2"
                placeholder="Select Equipment"
                style="background-color: rgb(255 255 255)"
                :options="eqpData"
                v-model="selectedEqp"
              >
              </v-select>
            </div>
            <div v-show="showEmp">
              <v-select
                class="vx-col w-full mb-2"
                placeholder="Select Equipment"
                style="background-color: rgb(255 255 255)"
                :options="empData"
                v-model="selectedEmp"
              >
              </v-select>
            </div>
            <div v-show="showFile">
              <vs-divider></vs-divider>
              <div class="vx-row">
                <div class="vx-col w-full p-3 mt-3">
                  <label>Import Data File</label>
                  <div id="app">
                    <file-pond
                      ref="pond"
                      name="file"
                      label-idle="Drag & Drop your file or <span class='filepond--label-action'>Browse</span>"
                      allow-multiple="false"
                      allow-file-encode="true"
                      :instant-upload="true"
                      :server="fakeServer"
                      @addfile="onFileAdded"
                      @processfile="onFileProcessed"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <vs-button
                class="rounded-lg mr-2 w-full vs-con-loading__container"
                ref="addCommand"
                id="addCommand"
                color="success"
                type="filled"
                @click="addCommand()"
                icon-pack="feather"
                icon="icon-cpu"
                >Execute Command</vs-button
              >
            </div>
          </div>
          <div v-show="!isUnfinishedHidden">
            <vs-table
              ref="gridTable"
              id="gridTable"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData2"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span class="mr-2"
                      >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                      {{
                        gridData2.length - currentPage * itemsPerPage > 0
                          ? currentPage * itemsPerPage
                          : gridData2.length
                      }}
                      of {{ gridData2.length }}</span
                    >
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
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
                <vs-th sort-key="transactionKey">Transaction Key</vs-th>
                <vs-th sort-key="famscommand">Fams Command</vs-th>
                <vs-th sort-key="store">Store</vs-th>
                <vs-th sort-key="macaddress">Macaddress</vs-th>
                <vs-th sort-key="status">Status</vs-th>
                <vs-th sort-key="message">Message</vs-th>
                <vs-th sort-key="description">Description</vs-th>
                <vs-th sort-key="createdate">Createdate</vs-th>
                <!-- <vs-th>Action</vs-th> -->
              </template>
              <template slot-scope="{ data }">
                <vs-tr
                  :data="tr"
                  :key="indextr"
                  v-for="(tr, indextr) in data"
                  style="border: solid white 1px"
                >
                  <vs-td :data="tr.transactionKey">{{ tr.transactionKey }}</vs-td>
                  <vs-td :data="tr.famscommand">{{ tr.famscommand }}</vs-td>
                  <vs-td :data="tr.store">{{ tr.store }}</vs-td>
                  <vs-td :data="tr.macaddress">{{ tr.macaddress }}</vs-td>
                  <vs-td :data="tr.status">{{ tr.status }}</vs-td>
                  <vs-td :data="tr.message">{{ tr.message }}</vs-td>
                  <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                  <vs-td :data="tr.createdate == null ? 'N/A' : tr.createdate">{{
                    tr.createdate == null
                      ? "N/A"
                      : formatDate(tr.createdate.replace("T", " ").split(".")[0])
                  }}</vs-td>
                  <!-- <vs-td>

{{   formatDate(tr.createdate.replace("T", " ").split('.')[0])}}

                    <vx-tooltip class="flex" text="Save Store">
                      <feather-icon
                        icon="SaveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="updateTable(tr)"
                      />
                    </vx-tooltip>
                  </vs-td> -->
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </vs-tab>
      <vs-tab label="Commands Queue" style="min-height: 500px">
        <div class="vx-card scroll-content">
          <vx-card class="pb-3" title="FAMS Command Queue">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>From date</label>
                <datepicker
                  class="w-full"
                  id="FromDate"
                  placeholder="From Date"
                  v-model="fromDate"
                  format="yyyy-MM-dd"
                  name="From Date"
                ></datepicker>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>To date</label>
                <datepicker
                  class="w-full"
                  id="ToDate"
                  placeholder="To Date"
                  v-model="toDate"
                  format="yyyy-MM-dd"
                  name="To Date"
                ></datepicker>
              </div>
            </div>
            <br />

            <div class="vx-col w-full mb-base">
              <vs-button
                class="rounded-lg w-full vs-con-loading__container"
                ref="showCommand"
                id="showCommand"
                color="primary"
                @click="getQueueHistory()"
                >Submit</vs-button
              >
            </div>
          </vx-card>
          <div v-show="!isListHidden">
            <vs-table
              ref="gridTable"
              id="gridTable"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span class="mr-2"
                      >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                      {{
                        gridData.length - currentPage * itemsPerPage > 0
                          ? currentPage * itemsPerPage
                          : gridData.length
                      }}
                      of {{ gridData.length }}</span
                    >
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
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
                <vs-th sort-key="transactionKey">Transaction Key</vs-th>
                <vs-th sort-key="famscommand">Fams Command</vs-th>
                <vs-th sort-key="store">Store</vs-th>
                <vs-th sort-key="macaddress">Macaddress</vs-th>
                <vs-th sort-key="status">Status</vs-th>
                <vs-th sort-key="message">Message</vs-th>
                <vs-th sort-key="description">Description</vs-th>
                <vs-th sort-key="createdate">Createdate</vs-th>
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr
                  :data="tr"
                  :key="indextr"
                  v-for="(tr, indextr) in data"
                  style="border: solid white 1px"
                >
                  <vs-td :data="tr.transactionKey">{{ tr.transactionKey }}</vs-td>
                  <vs-td :data="tr.famscommand">{{ tr.famscommand }}</vs-td>
                  <vs-td :data="tr.store">{{ tr.store }}</vs-td>
                  <vs-td :data="tr.macaddress">{{ tr.macaddress }}</vs-td>
                  <vs-td :data="tr.status">{{ tr.status }}</vs-td>
                  <vs-td :data="tr.message">{{ tr.message }}</vs-td>
                  <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                  <vs-td :data="tr.createdate">{{
                    formatDate(tr.createdate.replace("T", " ").split(".")[0])
                  }}</vs-td>
                  <vs-td id="iconContainer" class="whitespace-no-wrap flex-right">
                    <vx-tooltip class="flex" style="display: flex" text="Edit Item">
                      <feather-icon
                        icon="EditIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="editQueue(tr)"
                      />
                    </vx-tooltip>
                    <vx-tooltip class="flex" style="display: flex" text="Delete Item">
                      <feather-icon
                        icon="TrashIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="deleteCommand(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <vs-popup
            id="mapPop"
            title="Edit Fams Command"
            :active.sync="popupActive"
            v-show="editView"
          >
            <div id="app">
              <div class="vx-row px-4 pb-3">
                <div class="vx-col flex-2">
                  <label>Status</label>
                  <div>
                    <vs-switch class="rounded-pill" v-model="commandToUpdate.status">
                      <span slot="on">Yes</span>
                      <span slot="off">No</span>
                    </vs-switch>
                  </div>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button
                    id="submit"
                    ref="submit"
                    class="rounded-lg mr-3 mb-2 vs-con-loading__container"
                    @click="saveEditCommand"
                    >Submit</vs-button
                  >
                  <vs-button
                    color="warning"
                    type="border"
                    class="rounded-lg mb-2"
                    @click="cancelEdit"
                    >Close</vs-button
                  >
                </div>
              </div>
            </div>
          </vs-popup>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import DiagnosticStore from "./components/DiagnosticStore.vue";
import DiagnosticTank from "./components/DiagnosticTank.vue";
import DiagnosticEquipment from "./components/DiagnosticEquipment.vue";
import DiagnosticOperator from "./components/DiagnosticOperator.vue";
import DiagnosticAccount from "./components/DiagnosticAccount.vue";
import DiagnosticUser from "./components/DiagnosticUser.vue";
import Datepicker from "vuejs-datepicker";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  // FilePondPluginFileEncode,
  FilePondPluginImagePreview
);

export default {
  components: {
    flatPickr,
    "v-select": vSelect,
    DiagnosticStore,
    DiagnosticTank,
    DiagnosticEquipment,
    DiagnosticOperator,
    DiagnosticAccount,
    DiagnosticUser,
    FormWizard,
    TabContent,
    Datepicker,
    FilePond,
  },
  data() {
    return {
      title: "FAMS - new Subscription  Wizard!!",
      subtitle: "Please complete form to add new subscription",
      isMounted: false,
      activeDashTab: 0,
      selected: [],
      tempTableCounter: 0,

      itemsPerPage: 10,
      gridData: [],
      gridData2: [],
      gridIncomplete: [],
      gridAll: [],

      isUnfinishedHidden: true,
      isListHidden: true,

      storesList: [],
      commandsList: [],
      commandsArray: [],
      selectedStore: 0,
      selectedCommand: 0,
      commandToUpdate: {
        id: 0,
        status: false,
      },

      fromDate: "",
      toDate: "",
      popupActive: false,
      editView: false,
      eqpData: [],
      selectedEqp: { label: "N/A", value: 0 },
      showEqp: false,
      empData: [],
      selectedEmp: { label: "N/A", value: 0 },
      showEmp: false,
      showFile: false,
      base64File: null,
      fakeServer: {
        process: (fieldName, file, metadata, load) => {
          // fake async processing
          setTimeout(() => load(), 100);
        },
        revert: (uniqueFileId, load) => load(),
      },
    };
  },
  watch: {
    activeDashTab: function (val) {
      var self = this;
      if (val == 0) {
        setTimeout(function () {
          // self.showLoadingOnElement("addCommand", 1, "radius");
          self.getUnfinishedQueue();
          self.getStores();
          self.getEquipments();
          self.getEmployees();
          self.getCommands();
          self.gridData2 = self.gridIncomplete;
          self.isUnfinishedHidden = true;
          self.isListHidden = true;
          // self.$vs.loading.close(self.$refs.addCommand.$el);
        }, 100);
      } else if (val == 1) {
        var date = new Date();
        self.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
        self.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        setTimeout(function () {
          // self.showLoadingOnElement("showAll", 1, "radius");
          self.getQueueHistory();
          self.gridData = self.gridAll;
          self.isUnfinishedHidden = true;
          self.isListHidden = true;
          // self.$vs.loading.close(self.$refs.showAll.$el);
        }, 100);
      }
    },
  },
  props: {},
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  mounted() {
    var self = this;
    setTimeout(function () {
      self.activeDashTab = 0;
      self.getStores();
      self.getEquipments();
      self.getEmployees();
      self.getCommands();
      // self.getQueueHistory();
      self.getUnfinishedQueue();
      // self.isMounted = true;
      var date = new Date();
      this.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }, 200);
  },
  methods: {
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
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
    getStores() {
      const self = this;
      var onSuccess = function (response) {
        self.storesList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.selectedStore = self.storesList.reduce((minStore, currentStore) => {
          return minStore.value < currentStore.value ? minStore : currentStore;
        }, self.storesList[0]);
        // self.selectedStoreDD = self.stores.filter(function (item) {
        //   return item.value == self.selectedStoreDD.value;
        // })[0];
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Stores/GetStoredropdown", onSuccess, onFinally);
    },
    getCommands() {
      const self = this;
      var onSuccess = function (response) {
        // debugger
        self.commandsList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.commandsArray = response.data;
        self.selectedCommand = self.commandsList.reduce((minCommand, currentCommand) => {
          return minCommand.value < currentCommand.value ? minCommand : currentCommand;
        }, self.commandsList[0]);
        // self.selectedStoreDD = self.stores.filter(function (item) {
        //   return item.value == self.selectedStoreDD.value;
        // })[0];
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "FamsCommands/GetFamsCommands", onSuccess, onFinally);
    },
    getUnfinishedQueue() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.gridIncomplete = response.data;
        self.gridData2 = response.data;
        // self.selectedStoreDD = self.stores.filter(function (item) {
        //   return item.value == self.selectedStoreDD.value;
        // })[0];
      };
      var onFinally = function () {
        self.isMounted = true;
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "FamsCommands/GetFAMSCommandQueue", onSuccess, onFinally);
    },
    dateFormat(date) {
      var month = "";
      var year = "";
      var day = "";

      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    getQueueHistory() {
      const self = this;
      var from, to;
      if (self.fromDate == "") {
        var tempFromDate = new Date();
        tempFromDate.setDate(tempFromDate.getDate() - 7);
        from = self.dateFormat(tempFromDate);
      } else {
        from = self.dateFormat(self.fromDate);
      }

      if (self.toDate == "") {
        var tempToDate = new Date();
        to = self.dateFormat(tempToDate);
      } else {
        to = self.dateFormat(self.toDate);
      }

      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.gridAll = response.data;
        if (self.activeDashTab == 1) {
          self.gridData = self.gridAll;
        }
        self.isListHidden = false;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        `FamsCommands/GetQueueAll?fromdate=${from}&todate=${to}`,
        onSuccess,
        onFinally
      );
    },
    async addCommand() {
      var self = this;
      debugger;
      var obj;
      if (self.selectedCommand.value == 33) {
        if (!self.base64File) {
          alert("Please upload a file first.");
          return;
        }

        obj = {
          storeId: self.selectedStore.value,
          commandId: self.selectedCommand.value,
          empId: self.selectedEmp.value,
          eqpId: self.selectedEqp.value,
          parameterVal: JSON.stringify(self.base64File),
        };
      } else {
        obj = {
          storeId: self.selectedStore.value,
          commandId: self.selectedCommand.value,
          empId: self.selectedEmp.value,
          eqpId: self.selectedEqp.value,
          // parameterVal
        };
      }
      var onSuccess = (response) => {
        self.successNotifyDataLoad();
        self.getUnfinishedQueue();
      };

      var onFinally = (response) => {
        self.isUnfinishedHidden = false;
      };

      self.$ajaxPost(self, "FamsCommands/PostCommand", obj, onSuccess, onFinally);
    },
    deleteCommand(tr) {
      var self = this;
      var id = tr.id;
      var onSuccess = (response) => {
        self.successNotifyDataLoad();
        self.getQueueHistory();
      };

      var onFinally = (response) => {
        self.isUnfinishedHidden = false;
      };

      self.$ajaxDelete(self, `FamsCommands/${id}`, onSuccess, onFinally);
    },
    editQueue(tr) {
      this.commandToUpdate.id = tr.id;
      this.commandToUpdate.status = tr.status;
      this.editView = true;
      this.popupActive = true;
    },
    cancelEdit() {
      this.commandToUpdate.id = 0;
      this.commandToUpdate.status = false;
      this.editView = false;
      this.popupActive = false;
    },
    saveEditCommand() {
      var self = this;

      var onSuccess = (response) => {
        self.commandToUpdate.id = 0;
        self.commandToUpdate.status = false;
        self.editView = false;
        self.popupActive = false;
        self.getQueueHistory();
      };

      var onFinally = (response) => {
        self.isUnfinishedHidden = false;
      };

      self.$ajaxPut(
        self,
        "FamsCommands/PutCommand",
        this.commandToUpdate,
        onSuccess,
        onFinally
      );
    },
    extraInfo() {
      var self = this;
      console.log(self.selectedCommand.label);
      if (self.selectedCommand.label == "Equipment Sycnh New") {
        self.showEqp = true;
        self.showEmp = false;
        self.showFile = false;
      } else if (self.selectedCommand.label == "Employee Sycnh New") {
        self.showEqp = false;
        self.showEmp = true;
        self.showFile = false;
      } else if (self.selectedCommand.value == 33) {
        self.showEqp = false;
        self.showEmp = false;
        self.showFile = true;
      } else {
        self.showEmp = false;
        self.showEqp = false;
        self.showFile = false;
      }
    },
    formatDate(pad, dateTime) {
      if (typeof dateTime === "undefined") return pad;

      return (pad + dateTime).slice(-pad.length);
    },
    getEquipments() {
      const self = this;
      var onSuccess = function (response) {
        self.eqpData = response.data.map((item) => {
          return { label: item.registration, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Equipments/GetEquipmentDropDown", onSuccess, onFinally);
    },
    getEmployees() {
      const self = this;
      var onSuccess = function (response) {
        self.empData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Operators/GetOperatordropdown", onSuccess, onFinally);
    },
    onFileAdded(error, fileItem) {
      if (error) {
        console.error("Error adding file", error);
        return;
      }
      // debugger;

      // Get full FilePond file wrapper
      const pondFiles = this.$refs.pond.getFiles();
      // if (pondFiles.length > 0) {
      //   const encoded = pondFiles[0].getFileEncodeBase64String(); // ✅ This is correct
      //   const fileName = pondFiles[0].file.name;

      //   this.base64File = {
      //     fileName,
      //     contentBase64: encoded,
      //   };

      //   console.log("Base64 result:", this.base64File);
      // }

      // if (error) {
      //   console.error("Error adding file", error);
      //   return;
      // }

      // const pondFiles = this.$refs.pond.getFiles();

      // debugger;
      if (pondFiles.length > 0) {
        const file = pondFiles[0].file; // Native File object
        const reader = new FileReader();
        // debugger;
        reader.onload = () => {
          var string = reader.result;
          const base64String = reader.result.split(",")[1]; // remove data mime prefix
          const fileName = file.name;

          // var decodedString = atob(base64String);
          debugger;
          this.base64File = {
            fileName,
            contentBase64: base64String,
          };

          console.log("Base64 result:", this.base64File);
        };

        reader.onerror = (e) => {
          console.error("File reading error:", e);
        };

        reader.readAsDataURL(file); // triggers reader.onload
      }
    },
    onFileProcessed(error, fileItem) {
      // if (error) {
      //   console.error("Error processing file:", error);
      //   return;
      // }
      // const encoded = fileItem.getMetadata("base64");
      // const fileName = fileItem.file.name;
      // this.base64File = {
      //   fileName,
      //   contentBase64: encoded,
      // };
      // console.log("Base64 file ready:", this.base64File);
    },
    async sendFile() {
      if (!this.base64File) {
        alert("Please upload a file first.");
        return;
      }

      try {
        // Replace with your actual .NET 7 API endpoint
        const response = await fetch("https://your-api-url/api/iot/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.base64File),
        });

        const result = await response.json();
        alert("File sent: " + result.status);
      } catch (error) {
        console.error("Error sending file:", error);
        alert("Error sending file");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
<style>
@import "material.css";
#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}
#iconContainer span .con-vs-tooltip {
  padding: 0px 2px;
}
</style>
