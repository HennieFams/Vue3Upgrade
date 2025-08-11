<template>
  <div class="vx-row">
    <div class="vx-col w-full">
      <vx-card class="pb-3" title="FAMS Data Integrity Check">
        <vs-tabs style="width: auto min-height:500px">
          <vs-tab
            @click="initValues"
            class="p-6"
            label="Data Integrity - Equipmment"
            style="min-height: 500px"
          >
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>Begin date</label>
                <datepicker
                  class="w-full"
                  id="FromDate"
                  placeholder="From Date"
                  v-model="formData.fromDate"
                  format="yyyy-MM-dd"
                  name="From Date"
                ></datepicker>
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('From Date')"
                  >{{ errors.first("From Date") }}</span
                >
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>End date</label>
                <datepicker
                  class="w-full"
                  id="ToDate"
                  placeholder="To Date"
                  v-model="formData.toDate"
                  format="yyyy-MM-dd"
                  name="To Date"
                ></datepicker>
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('To Date')"
                  >{{ errors.first("To Date") }}</span
                >
              </div>
            </div>
            <div class="mt-3 vx-col w-full mb-base">
              <vs-button
                ref="submitEqp"
                class="rounded-lg pt-3 w-full vs-con-loading__container"
                @click="getIntegrityCheckEquipment"
                >Submit</vs-button
              >
            </div>
            <vs-table
              ref="gridTable"
              pagination
              v-show="eqpVisible"
              max-items=10
              search
              :data="integrityData"
              class="vs-con-loading__container"
            >
              <template slot="thead">
                <vs-th sort-key="Store">Store</vs-th>
                <vs-th sort-key="Registration">Registration</vs-th>
                <vs-th sort-key="Date">Date</vs-th>
                <vs-th sort-key="Volume">Volume</vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                  <vs-td :data="tr.informationReg">{{
                    tr.informationReg
                  }}</vs-td>
                  <vs-td :data="tr.createdate">{{
                    formatDate(tr.createdate.replace("T", " ").split(".")[0])
                  }}</vs-td>
                  <vs-td :data="tr.volume">{{ tr.volume }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </vs-tab>
          <vs-tab
            @click="initValues"
            label="Data Integrity - Employees"
            style="min-height: 500px"
          >
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>Begin date</label>
                <datepicker
                  class="w-full"
                  id="FromDate"
                  placeholder="From Date"
                  v-model="formData.fromDate"
                  format="yyyy-MM-dd"
                  name="From Date"
                ></datepicker>
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('From Date')"
                  >{{ errors.first("From Date") }}</span
                >
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>End date</label>
                <datepicker
                  class="w-full"
                  id="ToDate"
                  placeholder="To Date"
                  v-model="formData.toDate"
                  format="yyyy-MM-dd"
                  name="To Date"
                ></datepicker>
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('To Date')"
                  >{{ errors.first("To Date") }}</span
                >
              </div>
              <br />
              <div class="vx-col w-full mb-base">
                <label>Type</label>
                <v-select
                  class="w-full"
                  placeholder="Search / Select Type"
                  :options="typeData"
                  v-model="typeDropDown"
                  >>>
                </v-select>
              </div>
            </div>
            <div class="mt-3 vx-col w-full mb-base">
              <vs-button
                ref="submitEmp"
                class="rounded-lg pt-3 w-full vs-con-loading__container"
                @click="getIntegrityCheckEmployees"
                >Submit</vs-button
              >
            </div>
            <vs-table
              ref="gridEmp"
              pagination
              v-show="empVisible"
              max-items=10
              search
              :data="integrityData"
              class="vs-con-loading__container"
            >
              <template slot="thead">
                <vs-th sort-key="Store">Store</vs-th>
                <vs-th sort-key="Operator">{{ typeDropDown.label }}</vs-th>
                <vs-th sort-key="Registration">Registration</vs-th>
                <vs-th sort-key="Date">Date</vs-th>
                <vs-th sort-key="Volume">Volume</vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                  <vs-td
                    v-if="typeDropDown.value == 1"
                    :data="tr.informationOpr"
                    >{{ tr.informationOpr }}</vs-td
                  >
                  <vs-td
                    v-if="typeDropDown.value == 2"
                    :data="tr.informationDrv"
                    >{{ tr.informationDrv }}</vs-td
                  >
                  <vs-td
                    v-if="typeDropDown.value == 3"
                    :data="tr.informationAth"
                    >{{ tr.informationAth }}</vs-td
                  >
                  <vs-td :data="tr.informationReg">{{
                    tr.informationReg
                  }}</vs-td>
                  <vs-td :data="tr.createdate">{{
                    formatDate(tr.createdate.replace("T", " ").split(".")[0])
                  }}</vs-td>
                  <vs-td :data="tr.volume">{{ tr.volume }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </vs-tab>
        </vs-tabs>
      </vx-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import VxCard from "../../../components/vx-card/VxCard.vue";
import moment from "moment";
export default {
  name: "app",
  data() {
    return {
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
      },
      myFiles: "",
      rawData: "",
      tabIndex:0,
      itemsPerPage:10,
      integrityData: [],
      typeData: [
        { value: 1, label: "Employee" },
        { value: 2, label: "Driver" },
        { value: 3, label: "Authorization" },
      ],
      typeDropDown: 0,
      empVisible: false,
      eqpVisible: false,
      formData: {
        fromDate: "",
        toDate: "",
      },
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VxCard,
  },
  mounted() {
    var date = new Date();
    this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
    initValues() {
      this.eqpVisible = false;
      this.empVisible = false;

      var date = new Date();
      this.formData.fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.formData.toDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );

      this.integrityData = [];
      this.typeDropDown = 0;
    },
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    getIntegrityCheckEmployees() {
      var self = this;
      if (!self.typeDropDown) {
        this.$vs.notify({
          title: "Attention",
          text: "Please select a type",
          color: "warning",
        });
      } else {
        self.showLoadingOnElement("submitEmp", 1, "radius");

        var onSuccess = function (response) {
          self.integrityData = response.data;
        };
        var onFinally = function () {
          self.empVisible = true;
          self.$vs.loading.close(self.$refs.submitEmp.$el);
        };
        self.$ajaxGet(
          self,
          `Operators/GetOperatorIDZero?fromDate=${self.formatDate(
            self.formData.fromDate
          )}&toDate=${self.formatDate(self.formData.toDate)}&type=${self.typeDropDown.value}`,
          onSuccess,
          onFinally
        );
      }
    },
    getIntegrityCheckEquipment() {
      var self = this;

      self.showLoadingOnElement("submitEqp", 1, "radius");

      var onSuccess = function (response) {
        self.integrityData = response.data;
      };
      var onFinally = function () {
        self.eqpVisible = true;
        self.$vs.loading.close(self.$refs.submitEqp.$el);
      };
      self.$ajaxGet(
        self,
        `Equipments/GetEquipmentIDZero?fromDate=${self.formatDate(
          self.formData.fromDate
        )}&toDate=${self.formatDate(self.formData.toDate)}`,
        onSuccess,
        onFinally
      );
    },
    successNotifyGridExpanded() {
      this.$vs.notify({
        title: "Grid - Successfully",
        text: "Grid expanded / closed",
        color: "warning",
      });
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
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
  },
};
</script>
<style lang="scss">
#background {
  .con-img-upload {
    background-color: #67676759 !important;
  }
}
#app {
  #filepond {
    .filepond--drop-label {
      background-color: #ff9f43 !important;
      border-radius: 10px !important;
      color: white !important;
      font-size: 15px;
    }
  }
}
</style>
