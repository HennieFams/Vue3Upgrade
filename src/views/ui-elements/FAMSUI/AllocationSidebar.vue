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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div>
        <div class="vx-row px-4 pt-2 pb-3">

          <div class="vx-col flex-1">

            <label>Group</label>
            <v-select :options="dropdownValue" placeholder="Search / Select Group" v-model="dropdownSelect"
              @search:blur="populateData" />
          </div>

          <div class="vx-col flex-1">
            <label>Allocation Rebate</label>
            <v-select :options="allocationRebatedropdownValue" placeholder="Search / Select Rebate"
              v-model="allocationRebatedropdownSelect" @search:blur="populateDataAllocationRebate" />
          </div>
        </div>
        <!-- <div class="vx-row px-4 pb-3">
           <div class="vx-col flex-1">
            <label>Allocation Number</label>
              <div class="centerx">
                
                <vs-input-number size="large" class="inputx" color="success" min="1" max="12" v-model="formData.allocationNumber"/>
              </div>
          </div>
        </div> -->
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-4">
            <!-- ContactPhone -->
            <label>Allocation Code (To be displayed on FAMS Screen)</label>
            <vs-input icon-pack="feather" maxlength="20" icon="icon-phone" placeholder="Allocation Name" v-model="formData.name"
              class="w-full" name="Description" />
          </div>
          <div class="vx-col flex-4">
            <label>Allocation Active (Enable / Disable)</label>
            <vs-switch class="rounded-pill" v-model="formData.enable" />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Allocation Description</label>
            <vs-input icon-pack="feather" icon="icon-phone" placeholder="Allocation Description"
              v-model="formData.description" class="w-full" name="Description" />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Allocation FAMS Tag</label>
            <vs-input icon-pack="feather" icon="icon-phone" placeholder="Allocation tag" v-model="formData.allocationTag"
              class="w-full" name="Tag" />
          </div>
        </div>

      </div>
      <!-- Permissions  :checked="true" -->

      <vx-card class="mt-base" no-shadow card-border v-show="!isListHidden">
        <label>Assigned to store</label>
        <div class="vx-row px-4 pb-3">
          <table class="w-full">
            <tr>
              <th class="font-semibold text-base text-left px-3 py-2"
                v-for="heading in ['Store', 'Nr on screen/ To be Entered/ scan', 'Select']" :key="heading">{{ heading }}
              </th>
            </tr>

            <tr v-for="(store, indextr) in storeToAllocate" :key="indextr">
              <td class="px-3 py-2">{{ store.storeName }}</td>
              <td><vs-input-number v-model="store.num" :value="1" min="1" max="999" size="small" inputtable="false"
                  class="px-3 py-2" /> </td>
              <td><vs-checkbox v-model="store.checked" /> </td>
            </tr>
          </table>
        </div>
      </vx-card>
      <vx-card class="mt-base" no-shadow card-border v-show="!isListHiddenUpdate">
        <div class="vx-row px-4 pb-3">
          <table class="w-full">
            <tr>
              <th class="font-semibold text-base text-left px-3 py-2"
                v-for="heading in ['Store', 'Nr on screen/ To be Entered/ scan', 'Select']" :key="heading">{{ heading }}
              </th>
            </tr>

            <tr v-for="(store, indextr) in formData.perStore" :key="indextr">
              <td class="px-3 py-2">{{ store.storeName }}</td>
              <td><vs-input-number v-model="store.nr" :value="1" min="1" max="999" size="small" inputtable="false"
                  class="px-3 py-2" /> </td>
              <td><vs-checkbox v-model="store.checked" /> </td>
            </tr>
          </table>
        </div>
      </vx-card>
    </component>




    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button color="success" class="rounded-lg " type="gradient" @click="submitData" icon-pack="feather"
        icon="icon-check">Submit</vs-button>
      <vs-button color="danger" class="rounded-lg " type="gradient" @click="cancelData" icon-pack="feather"
        icon="icon-x-square">Cancel</vs-button>
    </div>

    <vs-prompt ref="statusPromptAdd" title="Add Store - Allocation" acceptText="Submit" cancelText="Cancel"
      @cancel="dropdownSelectStore = 0" @accept="AddPerAllocationToStore" :active.sync="statusPromptActiveAdd">
      <div class="vx-row">
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>Allocation for FAMS store</label>
          <v-select :options="storedropdownValue" placeholder="Search / Select Store" v-model="dropdownSelectStore"
            @search:blur="populateDataStore" />
        </div>
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <vs-input class="w-full" label-placeholder="Allocation Name" disabled v-model="formData.name"
            name="Allocation Name" />
        </div>
        <br>
        <div class="vx-col sm:w-1/8 w-full mb-2">
          <label>Allocation Nr</label>
          <vs-input-number class="num-input_transparent" :min="1" :max="999" v-model="StoreNr" />
        </div>
      </div>
    </vs-prompt>


  </vs-sidebar>
</template>

<script>
// import vUploader from 'v-uploader'
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
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
    "v-select": vSelect
  },
  mounted() {
  },
  data() {
    return {
      nr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      store: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      checked: false,
      isListHidden: false,
      isListHiddenUpdate: false,
      statusPromptActiveAdd: false,
      isInfoHidden: true,
      perAllocationStore: [],
      dropdownValue: [],
      dropdownSelect: [],
      dropdownSelectStore: [],
      storeId: 0,
      Store: "",
      StoreNr: 1,
      storedropdownValue: [],
      storedropdownValue2: [],
      allocationRebatedropdownValue: [],
      allocationRebatedropdownSelect: [],
      requireStore: 0,
      formData: {
        id: 0,
        accountId: localStorage.getItem('userAccountId'),
        name: "None",
        enable: true,
        description: "None",
        allocationTypeId: 0,
        allocationGroupName: "None",
        perStore: [],
        allocationRebateId: 0,
        allocationRebate: "",
        nr: 1,
        allocationTag: "0000"
      },

      temp: null,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      storeToAllocate: [],
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      this.LoadAllocationGroup();
      this.LoadStoreDropdown();
      this.LoadAllocationRebateDropdown();
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        this.dropdownSelectStore = [],
          this.storeId = 0,
          this.StoreNr = 1,
          this.Store = "",
          this.formData.id = this.data.id;
        this.formData.accountId = localStorage.getItem('userAccountId'),
          this.formData.name = this.data.allocation;
        this.formData.description = this.data.description;
        this.formData.groupId = this.data.allocationTypeId;
        this.formData.allocationTypeId = this.data.allocationTypeId;
        this.formData.enable = this.data.enable;
        this.formData.perStore = this.data.perStore;
        this.dropdownSelect = this.data.allocationGroupName;
        this.formData.allocationRebateId = this.data.allocationRebateId;
        this.formData.allocationRebate = this.data.allocationRebate;
        this.allocationRebatedropdownSelect = this.data.allocationRebate;
        this.isListHidden = true;
        this.isListHiddenUpdate = false;
        this.perAllocationStore = this.data.perStore;
        this.temp = null;
        this.formData.allocationTag = this.data.allocationTag;
      }
    },

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
    PromptActiveAllocationToStoreAdd() {
      var self = this;
      self.statusPromptActiveAdd = true;
    },
    Allocationselected(data) {
      var self = this;

      for (var i = 0; i < data.length; i++) {
        const obj = {
          Id: 0,
          AllocationId: 0,
          storeId: data[i].storeId,
          download: 1,
          nr: data[i].num,
          selected: data[i].checked,
        };
        if (obj.selected) {
          self.perAllocationStore.push(obj);
        }
      }

    },
    AddPerAllocationToStore() {
      var self = this;
      const obj = {
        id: 0,
        StoreId: self.StoreId,
        AllocationId: self.formData.id,
        Nr: self.StoreNr,
        Download: 0
      };
      var onSuccess = function (response) {
        self.initValues();
        self.isSidebarActiveLocal = false
      };
      var onFinally = function () {
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "PerAllocationStores",
        obj,
        onSuccess,
        onFinally
      );
    },

    populateDataStore() {
      var self = this;
      if (self.dropdownSelectStore) {
        self.StoreId = self.dropdownSelectStore.value;
        self.Store = self.dropdownSelectStore.label;
      }

    },

    populateData() {
      var self = this;
      if (self.dropdownSelect) {
        self.formData.allocationTypeId = self.dropdownSelect.value;
        self.formData.allocationType = self.dropdownSelect.label;
      }

      if (this.formData.id == 0) {
        self.LoadStoreDropdownAfterGroup(self.dropdownSelect.value);
      }
    },
    populateDataAllocationRebate() {
      var self = this;
      if (self.allocationRebatedropdownSelect) {
        self.formData.allocationRebateId = self.allocationRebatedropdownSelect.value;
        self.formData.allocationRebate = self.allocationRebatedropdownSelect.label;
      }
    },
    LoadAllocationGroup() {
      const self = this;
      var onSuccess = function (response) {
        self.dropdownValue = response.data.map(function (item) {
          //return { text: item.customer, value: item.id };
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "AllocationTypes/GetAllocationTypedropdown",
        onSuccess,
        onFinally
      );
    },
    LoadStoreDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.storedropdownValue2 = response.data;
        self.storedropdownValue = response.data.map(function (item) {
          //return { text: item.customer, value: item.id };
          return { label: item.name, value: item.id };
        });
        
        if (self.perAllocationStore && self.perAllocationStore.length == 0) {
          self.storeToAllocate = response.data.map(function (item) {
            return {
              checked: false,
              storeName: item.name,
              storeId: item.id,
              accountId: item.accountId,
              mac: item.mac,
              num: item.number + 1
            };
          });
        }
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetStoredropdown",
        onSuccess,
        onFinally
      );
    },
    LoadStoreDropdownAfterGroup(groupId) {
      const self = this;
      
      var onSuccess = function (response) {
        if (response.data && response.data.length > 0) {
          self.storedropdownValue2 = response.data;
          self.storedropdownValue = response.data.map(function (item) {
            //return { text: item.customer, value: item.id };
            return { label: item.name, value: item.id };
          });
          if (self.perAllocationStore && self.perAllocationStore.length == 0) {
            self.storeToAllocate = response.data.map(function (item) {
              return {
                checked: false,
                storeName: item.name,
                storeId: item.id,
                accountId: item.accountId,
                mac: item.mac,
                num: item.number
              };
            });
          }
        }
        else{
          if (self.perAllocationStore && self.perAllocationStore.length == 0) {
            self.storeToAllocate = self.storedropdownValue2.map(function (item) {
              return {
                checked: false,
                storeName: item.name,
                storeId: item.id,
                accountId: item.accountId,
                mac: item.mac,
                num: 1
              };
            });
          }
        }
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "Stores/GetAllocationStoredropdown/" + groupId,
        onSuccess,
        onFinally
      );
    },
    LoadAllocationRebateDropdown() {
      const self = this;
      var onSuccess = function (response) {
        self.allocationRebatedropdownValue = response.data.map(function (item) {
          //return { text: item.customer, value: item.id };
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "Allocations/GetAllocationRebatedropdown",
        onSuccess,
        onFinally
      );
    },

    initValues() {
      if (this.data.id) return;
      this.perAllocationStore = [],
        this.nr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        this.store = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        this.checked = false,
        this.formData.id = 0;
      this.formData.accountId = localStorage.getItem('userAccountId'),
        this.formData.name = "";
      this.formData.description = "";
      this.formData.allocationTag = "0000";
      this.formData.allocationTypeId = 0
      this.formData.allocationType = "";
      this.formData.enable = true;
      this.dropdownSelect = 0;
      this.isListHidden = false;
      this.isListHiddenUpdate = true;
      this.allocationRebatedropdownSelect = 0;
      this.formData.allocationRebateId = 0;
      this.formData.allocationRebate = "";
      this.dropdownSelectStore = [],
        this.storeId = 0,
        this.StoreNr = 1,
        this.Store = ""
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    cancelData() {
      var self = this;
      self.initValues();
      self.isSidebarActiveLocal = false
    },
    async submitData() {
      var self = this;
      const obj = {
        id: this.formData.id,
        accountId: localStorage.getItem('userAccountId'),
        name: self.formData.name,
        description: self.formData.description,
        allocationTag: self.formData.allocationTag,
        allocationTypeId: self.formData.allocationTypeId,
        enable: self.formData.enable,
        perAllocationStore: self.perAllocationStore,
        allocationRebateId: self.formData.allocationRebateId
      };

      await self.Allocationselected(self.storeToAllocate);
      // this.formData.allocationRebateId =  this.data.allocationRebateId;
      // this.formData.allocationRebate =  this.data.allocationRebate;
      if (self.formData.id !== null && self.formData.id != 0) {
        obj.perAllocationStore = self.formData.perStore;
        self.$emit("update", obj);
      } else {
        self.$emit("add", obj);
      }
      this.$emit("closeSidebar");
      this.initValues();
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
