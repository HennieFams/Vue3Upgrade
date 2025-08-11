<template>
  <div class="vx-row">
    <div class="vx-col w-full">
      <vx-card ref="mainCard" style="height: 500px" class="pb-3 vs-con-loading__container" title="FAMS Export INI File">
        <div class="vx-row">
          <div class="vx-col w-full mb-base">
            <label>Store</label>
            <v-select
              class="w-full"
              placeholder="Search / Select Store"
              :options="storeData"
              v-model="storeDropDown"
              >
            </v-select>
          </div>
          <div class="vx-col w-full mb-base">
            <label>Export Type</label>
            <v-select
              class="w-full"
              placeholder="Search / Select Export Type"
              :options="typeData"
              v-model="typeDropDown">
            </v-select>
          </div>
        </div>
        <div class="mt-3 vx-col w-full mb-base">
          <vs-button
            ref="submit"
            class="rounded-lg pt-3 w-full vs-con-loading__container"
            @click="getINIFile"
            >Download INI File</vs-button
          >
        </div>
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
      storeData:[],
      storeDropDown:0,
      integrityData: [],
      typeData: [
        { value: 1, label: "EquipmentINI", fileName : "EQPN" },
        { value: 2, label: "OperatorINI", fileName: "TAGN" },
        { value: 3, label: "AllocationINI", fileName: "ALLOC" },
        { value: 4, label: "AllocationNewINI", fileName: "ALLOCN" },
        { value: 5, label: "AllocationNewINI1000", fileName: "ALLOCNF" },
        { value: 6, label: "Allocation", fileName: "ALLOCNF" },
        { value: 7, label: "Allocation Schedule 6", fileName: "EQPALLOC" },
      ],

      myFiles: "",
      rawData: "",
      tabIndex:0,
      itemsPerPage:10,

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
    this.getStore();
  },
  methods: {
    initValues() {
      this.storeData = [];
      this.storeDropDown = 0;
    },
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    getStore(){
      var self = this;
      self.showLoadingOnElement("mainCard", 1, "radius");
      var onSuccess = function(response) {
        self.storeData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function(){
        self.$vs.loading.close(self.$refs.mainCard.$el);
      };
      self.$ajaxGet(self,"Stores/GetStoreForManualEntry",onSuccess,onFinally);
    },
    getINIFile() {
      var self = this;
      var accountId = localStorage.getItem("userAccountId");
      if (!self.storeDropDown) {
        this.$vs.notify({
          title: "Attention",
          text: "Please select a store",
          color: "warning",
        });
      }else if (!self.typeDropDown) {
        this.$vs.notify({
          title: "Attention",
          text: "Please select a type",
          color: "warning",
        });
      } else {
        self.showLoadingOnElement("submit", 1, "radius");

        var onSuccess = function (response) {
          self.integrityData = response.data;
          var blob = new Blob([self.integrityData], {type: 'text/plain'});
          var anchor = document.createElement('a');

          anchor.download = self.typeDropDown.fileName + '_'+ self.storeDropDown.label+ (new Date()).getMilliseconds() + ".INI";
          anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
          anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
          anchor.click();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.submit.$el);
        };
        self.typeDropDown.value == 1 ?
        self.$ajaxGet(
          self,
          `Equipments/GetEquipmentINI?storeId=${self.storeDropDown.value}`,
          onSuccess,
          onFinally
        )
        : self.typeDropDown.value == 2 ? 
        self.$ajaxGet(
          self,
          `Operators/GetOperatorINI?storeId=${self.storeDropDown.value}`,
          onSuccess,
          onFinally
        )
        : self.typeDropDown.value == 3 ?
          self.$ajaxGet(
          self,
          `Allocations/GetAllocINI?storeId=${self.storeDropDown.value}`,
          onSuccess,
          onFinally
        )
        : self.typeDropDown.value == 4 ?
          self.$ajaxGet(
          self,
          `Allocations/GetAllocNewINI?storeId=${self.storeDropDown.value}`,
          onSuccess,
          onFinally
        )
         : self.typeDropDown.value == 5 ?
          self.$ajaxGet(
          self,
          `Allocations/GetAllocNewINI1000?storeId=${self.storeDropDown.value}`,
          onSuccess,
          onFinally
        )
         : self.typeDropDown.value == 7 ?
          self.$ajaxGet(
          self,
          `Allocations/GetSchedule6Alloc?accountId=${accountId}`,
          onSuccess,
          onFinally
        )
        :
          self.$ajaxGet(
          self,
          `Allocations/GetAllocIDdownload?storeId=${self.storeDropDown.value}`,
          onSuccess,
          onFinally
        )
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
