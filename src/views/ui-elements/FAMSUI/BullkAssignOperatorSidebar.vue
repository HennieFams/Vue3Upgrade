<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary"
    class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>ASSIGN OPERATOR TO STORE</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div>
        <!-- <div class="vx-row pt-3 ml-2">
          <div class="vx-col">
            <vs-button class="rounded-lg mr-2" color="warning" @click="bulkAddSpecEqp()" icon-pack="feather"
              icon="icon-edit">Bulk Add To All Stores</vs-button>
          </div>
        </div> -->
        <div class="vx-row pt-3 m-2">
          <div class="vx-col w-full">
            <span>Employee</span>
            <v-select placeholder="Select Employee" :options="operatorData" v-model="operatorSelect"></v-select>
          </div>
        </div>
        <div class="vx-row pt-3 ml-2">
          <div class="vx-col">
            <span>Assign To All Stores</span>
            <vs-switch class="rounded-pill" v-model="assignToAll" color="danger">
              <span slot="off">No</span>
              <span slot="on">Yes</span>
            </vs-switch>
          </div>
        </div>
        <div class="vx-row pt-3 m-2">
          <div class="vx-col w-full">
            <span>Store</span>
            <v-select placeholder="Select Store" :options="storesData" :disabled="assignToAll"
              v-model="storeSelect"></v-select>
          </div>
        </div>
        <div class="vx-row pt-3 ml-2">
          <div class="vx-col">
            <span>Download</span>
            <vs-switch class="rounded-pill" v-model="download" color="danger">
              <span slot="off">No</span>
              <span slot="on">Yes</span>
            </vs-switch>
          </div>
        </div>
      </div>
    </component>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg m-1" color="success" type="gradient" @click="submitData" ref="submitButton"
        icon-pack="feather" icon="icon-check">Submit</vs-button>
      <vs-button class="rounded-lg m-1" color="danger" type="gradient" @click="isSidebarActiveLocal = false"
        icon-pack="feather" icon="icon-x-square">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
// import vUploader from 'v-uploader'
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
    flatPickr
  },
  mounted() {

  },
  data() {
    return {
      operatorData: [],
      assignToAll: false,
      storesData: [],
      download: false,
      storeSelect: [],
      operatorSelect: [],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  watch: {
    isSidebarActive(val) {

      if (!val) return;
      this.GetOperatorDropdown();
      this.GeStoresDropdown();

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
        }
      }
    },
    isFormValid() {
      return (
        !this.errors.any()
      );
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {

    GetOperatorDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.operatorData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "Operators/GetOperatordropdown",
        onSuccess,
        onFinally
      );
    },
    GeStoresDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.storesData = response.data.map((item) => { return { label: item.name, value: item.id } });
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        "Stores/GetStoredropdown",
        onSuccess,
        onFinally
      );
    },
    initValues() {
      this.operatorData = [];
      // this.operatorSelect = { value: 0, label: 'Search / Select Employee' };
      this.assignToAll = false;
      this.storesData = [];
      // this.storeSelect = { value: 0, label: 'Search / Select Store' };
      this.download = false;
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },

    submitData() {
      var self = this;
      var line = "";

      if (self.assignToAll == true || self.storeSelect.value == 0 || self.storeSelect.value == null) { self.storeSelect.value = "0"; }

      line = self.operatorSelect.value + "," +
        self.assignToAll + "," +
        self.storeSelect.value + "," +
        self.download;

      self.$emit("update", line);

      self.initValues();
    },

    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
    },
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
    width: 700px;
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
