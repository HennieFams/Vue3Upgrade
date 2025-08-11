<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>
        <!-- {{ Object.entries(this.data).length === 0 ? "ADD" : "UPDATE" }} Exception -->
      </h4>
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-3">New Exception</vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
      suppressScrollX="true"
    >
      <div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Exception Name</label>
            <vs-input
              autocomplete="off"
              icon-no-border
              onClick="this.select();"
              v-validate="'required'"
              class="w-full"
              name="Name"
              v-model="formData.name"
            />
            <span class="text-danger text-sm" v-show="errors.has('Name')">{{errors.first("Name")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Exception</label>
            <v-select
            ref="exceptionDropDown"
            class="w-full"
            placeholder="Select a Exception"
            v-validate="'required'"
            name="Exception"
            @search:blur="clearDropDowns"
            :options="exceptionLookUpData"
            v-model="exceptionLookUpDropDown"
            ></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Exception Type</label>
            <v-select
              ref="exceptionDropDown"
              class="w-full"
              v-validate="'required'"
              name="Exception Type"
              placeholder="Select a Exception Type"
              :options="exceptionTypeData"
              v-model="exceptionTypeDropDown"
            ></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full" v-if="exceptionLookUpDropDown.value == 1">
            <label>Exception Tank</label>
            <v-select
              ref="exceptionDropDown"
              class="w-full"
              name="Exception Tank"
              placeholder="Select a Tank"
              :options="exceptionTankData"
              v-model="exceptionTankDropDown"
            ></v-select>
          </div>
          <div class="vx-col w-full" v-else-if="exceptionLookUpDropDown.value == 3">
            <label>Exception Equipment</label>
            <v-select
              ref="exceptionDropDown"
              class="w-full"
              name="Exception Equipment"
              placeholder="Select an Equipment"
              :options="exceptionEquipmentData"
              v-model="exceptionEquipmentDropDown"
            ></v-select>
          </div>
          <div class="vx-col w-full" v-else-if="exceptionLookUpDropDown.value == 2 && exceptionStoreData.length > 0">
            <label>Exception Store</label>
            <v-select
              ref="exceptionDropDown"
              class="w-full"
              name="Exception Store"
              placeholder="Select a Store"
              :options="exceptionStoreData"
              v-model="exceptionStoreDropDown"
            ></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Exception Trigger</label>
            <vs-input
              autocomplete="off"
              icon-no-border
              onClick="this.select();"
              v-validate="'required|numeric'"
              class="w-full"
              name="Trigger"
              v-model="formData.exceptionTrigger"
            />
            <span class="text-danger text-sm" v-show="errors.has('Trigger')">{{errors.first("Trigger")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col w-full">
            <label>Email</label>
            <vs-chips id="emails" class="vx-col w-full pt-2" placeholder="Add Email" v-model="chips" v-validate="'required'" name="Email" style="justify">
              <vs-chip
                class="glow-effect_primary"
                :key="chip"
                @click="removeEmail(chip)"
                v-for="chip in chips"
                closable>
                {{ chip }}
              </vs-chip>
            </vs-chips>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="enableCheck">Enable</vs-checkbox>
          </div>
        </div>
      </div>
    </component>
    <div class="vx-row flex flex-wrap items-center">
      <vs-spacer />
      <div class="vx-col">
        <vs-button
          ref="saveButton"
          class="rounded-lg mr-3 vs-con-loading__container"
          color="success"
          type="border"
          @click="saveException"
          >Save</vs-button
        >
        <vs-button
          ref="cancelButton"
          class="rounded-lg mr-3"
          color="warning"
          type="border"
          @click="closeSidebar"
          >Cancel</vs-button
        >
      </div>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import vSelect from "vue-select";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      default: () => {},
    },
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
  },
  mounted() {
    this.getExceptionLookUpDropDown();
    this.getExceptionTypeDropDown();
    this.getExceptionTankDropDown();
    this.getExceptionStoreDropDown();
    this.getExceptionEquipmentDropDown();
  },
  data() {
    return {

      chips : [],
      emailToAdd: "",
      exceptionLookUpDropDown: 0,
      exceptionTypeDropDown: 0,
      exceptionTankDropDown: 0,
      exceptionLookUpData: [],
      exceptionTypeData: [],
      exceptionTankData: [],
      storesData: [],
      enableCheck: true,
      exceptionStoreDropDown: 0,
      exceptionStoreData: [],
      exceptionEquipmentDropDown: 0,
      exceptionEquipmentData: [],
      
      formData: {
        id: 0,
        accountId: 0,
        name: "",
        exceptionTypeId: 0,
        exceptionTypeName: "",
        exceptionLookUpId: 0,
        exceptionLookUpName: "",
        exceptionLookUpValue: 0,
        exceptionTrigger: "",
        email: "",
        enable: true
			},
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },
  watch: {
    isSidebarActive(val) {
      var self = this;
      if (Object.entries(self.data).length === 0) {
        self.initValues();
        self.$validator.reset();
        self.getExceptionLookUpDropDown();
        self.getExceptionTypeDropDown();
        self.getExceptionStoreDropDown();
        self.getExceptionTankDropDown();
        self.getExceptionEquipmentDropDown();
      } else{
        self.formData.id = self.data.id;
        self.formData.accountId = self.data.accountId;
        self.enableCheck = self.data.enable == 1 ? true : false;
				self.formData.exceptionTrigger = self.data.exceptionTrigger;
				self.formData.name = self.data.name;
        
        self.exceptionTypeDropDown = self.exceptionTypeData.filter(function (item) {
          return item.value == self.data.exceptionTypeId;
        })[0];

        self.exceptionLookUpDropDown = self.exceptionLookUpData.filter(function (item) {
          return item.value == self.data.exceptionLookUpId;
        })[0];

        if(self.data.exceptionLookUpId == 1){
          self.exceptionTankDropDown = self.exceptionTankData.filter(function (item) {
            return item.value == self.data.exceptionLookUpValue;
          })[0];
        }
        else if(self.data.exceptionLookUpId == 2){
          self.exceptionStoreDropDown = self.exceptionStoreData.filter(function (item) {
            return item.value == self.data.exceptionLookUpValue;
          })[0];
        }
        else if(self.data.exceptionLookUpId == 3){
          self.exceptionEquipmentDropDown = self.exceptionEquipmentData.filter(function (item) {
            return item.value == self.data.exceptionLookUpValue;
          })[0];
        }  
        self.chips = self.data.email.split(';'); 
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
      },
    },
    isFormValid() {
      return !this.errors.any();
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    
    closeSidebar() {
      this.initValues();
      this.isSidebarActiveLocal = false;
    },
    getExceptionTypeDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.exceptionTypeData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "Exception/GetExceptionTypeDropDown",
        onSuccess,
        onFinally
      );
    },
    getExceptionLookUpDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.exceptionLookUpData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "Exception/GetExceptionLookupDropDown",
        onSuccess,
        onFinally
      );
    },
    initValues() {
      this.formData.id = 0,
      this.formData.accountId = 0,
      this.formData.name = "",
      this.formData.exceptionTypeId = 0,
      this.formData.exceptionTypeName = "",
      this.formData.exceptionLookUpId = 0,
      this.formData.exceptionLookUpName = "",
      this.formData.exceptionLookUpValue = 0,
      this.formData.exceptionTrigger = "",
      this.formData.email = "",
      this.formData.enable = true
      
      this.chips = [];
      this.exceptionLookUpDropDown = [];
      this.exceptionTypeDropDown = [];
      this.exceptionTankDropDown = [];
      this.exceptionStoreDropDown = [];
      this.exceptionEquipmentDropDown = [];
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    successNotifyLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
    },
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
    },
    clearDropDowns(){
      this.exceptionTankDropDown = [];
      this.exceptionStoreDropDown = [];
      this.exceptionEquipmentDropDown = [];
      this.$validator.reset();
    },
    saveException() {
      var self = this;
      self.showLoadingOnElement("saveButton", 0.65, "radius");
      self.$validator.validateAll().then((result) => {
        if (result) {
          if(!self.exceptionLookUpDropDown){
            this.$vs.notify({
              title: "Warning",
              text: "Exception not selected.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          else if(!self.getExceptionTypeDropDown){
            this.$vs.notify({
              title: "Warning",
              text: "Exception Type not selected.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          else if(!self.exceptionTankDropDown || self.exceptionTankDropDown == 0 && self.exceptionLookUpDropDown.value == 1){
            this.$vs.notify({
              title: "Warning",
              text: "Tank not selected.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          else if(!self.exceptionStoreDropDown || self.exceptionStoreDropDown == 0 && self.exceptionLookUpDropDown.value == 2){
            this.$vs.notify({
              title: "Warning",
              text: "Store not selected or available.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          else if(!self.exceptionEquipmentDropDown || self.exceptionEquipmentDropDown == 0 && self.exceptionLookUpDropDown.value ==3){
            this.$vs.notify({
              title: "Warning",
              text: "Equipment not selected.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          
          if(self.exceptionLookUpDropDown && self.exceptionLookUpDropDown.value != null)
          {
            self.formData.exceptionLookUpId = self.exceptionLookUpDropDown.value;
          } else
          {
            self.formData.exceptionLookUpId = 0;
          }
          
          if(self.exceptionTypeDropDown && self.exceptionTypeDropDown.value != null)
          {
            self.formData.exceptionTypeId = self.exceptionTypeDropDown.value;
          } else
          {
            self.formData.exceptionTypeId = 0;
          }
          
          if(self.formData.exceptionLookUpId == 1)
          {
            if(self.exceptionTankDropDown && self.exceptionTankDropDown.value != null)
            {
              self.formData.exceptionLookUpValue = self.exceptionTankDropDown.value;
            } else
            {
              self.formData.exceptionLookUpValue = 0;
            }
          }
          else if(self.formData.exceptionLookUpId == 2)
          {
            if(self.exceptionStoreDropDown && self.exceptionStoreDropDown.value != null)
            {
              self.formData.exceptionLookUpValue = self.exceptionStoreDropDown.value;
            } else
            {
              self.formData.exceptionLookUpValue = 0;
            }
          }
          else if(self.formData.exceptionLookUpId == 3)
          {
            if(self.exceptionEquipmentDropDown && self.exceptionEquipmentDropDown.value != null)
            {
              self.formData.exceptionLookUpValue = self.exceptionEquipmentDropDown.value;
            } else
            {
              self.formData.exceptionLookUpValue = 0;
            }
          }

          self.formData.email = self.chips.join(';');

          self.enableCheck ? self.formData.enable = 1 : self.formData.enable = 0;

          var onSuccess = function () {
            self.closeSidebar();
          };
          var onFinally = function () {
            self.$vs.loading.close(self.$refs.saveButton.$el);
          };
          self.$ajaxPost(self, "Exception/", self.formData, onSuccess, onFinally);
        } 
        else {
          self.FailedCustomNotify(self.$validator.errors.items[0].msg);
          self.$vs.loading.close(self.$refs.saveButton.$el);
        }
      });
    },
    getExceptionStoreDropDown() {
      var self = this;
      var onSuccess = function (response) {
        self.storesData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(
        self,
        "Stores/GetStoreForManualEntry",
        onSuccess,
        onFinally
      );
    },
    getExceptionEquipmentDropDown() {
      var self = this;
      
      var onSuccess = function (response) {
        self.exceptionEquipmentData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      self.$ajaxGet(self,"Equipments/GetEquipmentDropDown", onSuccess);
    },
    getExceptionTankDropDown() {
      var self = this;
      
      var onSuccess = function (response) {
        self.exceptionTankData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      self.$ajaxGet(self,"Tanks/GetTankdropdown", onSuccess);
    },
    removeEmail(chip) {
        this.chips.splice(this.chips.indexOf(chip), 1)
    },
  },
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 600px;
    max-width: 90vw;

    .ps__scrollbar-x-rail {
      display: none !important;
    }

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
    .con-chips{
        justify-content: unset;
      }
  }
}

.scroll-area--data-list-add-new {
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
