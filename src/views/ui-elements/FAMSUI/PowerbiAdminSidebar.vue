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
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-3">New Power Bi Analytics</vs-divider>

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
            <label>Analytics Name</label>
            <vs-input
              autocomplete="off"
              icon-no-border
              onClick="this.select();"
              v-validate="'required'"
              class="w-full"
              name="Name"
              icon-pack="feather"
              icon="icon-file-text"
              v-model="formData.name"
            />
            <span class="text-danger text-sm" v-show="errors.has('Name')">{{errors.first("Name")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Power Bi URL</label>
            <vs-input
              autocomplete="off"
              icon-no-border
              onClick="this.select();"
              v-validate="'required'"
              class="w-full"
              name="Url"
              icon-pack="feather"
              icon="icon-file-text"
              v-model="formData.url"
            />
            <span class="text-danger text-sm" v-show="errors.has('Url')">{{errors.first("Url")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Analytics Type</label>
            <v-select
              ref="reportDropDown"
              class="w-full"
              placeholder="Select a Type"
              :options="powerbiTypesData"
              v-model="powerbiTypesDropdown"
            ></v-select>
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
          @click="savePowerbi"
          >Save</vs-button
        >
        <vs-button
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
import { BFormTimepicker } from 'bootstrap-vue';

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
    // this.getPowerbiTypeDropDown();
    // this.isMounted = true;
  },
  data() {
    return {
      powerbiTypesData: [],
      powerbiTypesDropdown: null,
      enableCheck: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      formData: {
        name: "",
        id: 0,
        url: "",
        powerBiTypeId: 0,
        enable: false,
      },
      powerBiData: {
        datasetId: "",
        embedUrl: "",
        id: "",
        isOwnedByMe: false,
        name: "",
        reportType: "",
        webUrl: ""
      },
    };
  },
  watch: {
    isSidebarActive(val) {
      var self = this;
      if(val){
        self.getPowerbiTypeDropDown();
        self.isMounted = true;
        if (Object.entries(self.data).length === 0) {
          self.initValues();
          self.$validator.reset();
        } else{
          //self.getPowerbiTypeDropDown();
          self.formData.name = self.data.name;
          self.formData.url = self.data.url;
          self.enableCheck = self.data.enable == 1 ? true : false;
          self.formData.id = self.data.id;

          self.powerbiTypesDropdown = self.powerbiTypesData.filter(function (item) {
              return item.value == self.data.powerBiTypeId;
          })[0];
        }
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
    getPowerbiTypeDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.powerbiTypesData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "PowerBiTypes/GetPowerBiTypedropdown",
        onSuccess,
        onFinally
      );
    },
    initValues() {
      this.formData.name = "";
      this.formData.id = 0;
      this.formData.url = "";
      this.formData.powerBiTypeId = 0;
      this.formData.enable = false;
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
    successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
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
    savePowerbi() {
      var self = this;
      self.formData.userIds = [];
      self.showLoadingOnElement("saveButton", 0.65, "radius");
      self.$validator.validateAll().then((result) => {
        if (result) {
          if(!self.powerbiTypesDropdown){
            self.$vs.notify({
              title: "Warning",
              text: "Report Type not selected.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          else{
            if(self.powerbiTypesDropdown && self.powerbiTypesDropdown.value != null)
            {
              self.formData.powerBiTypeId = self.powerbiTypesDropdown.value;
            }
            self.enableCheck ? self.formData.enable = 1 : self.formData.enable = 0;
            
            var onSuccess = function () {
              self.closeSidebar();
            };
            var onFinally = function () {
              self.$vs.loading.close(self.$refs.saveButton.$el);
              self.successNotify();
            };
            self.$ajaxPost(self, "PowerBiAPI/", self.formData, onSuccess, onFinally);
          }
          
        } 
        else {
          self.FailedCustomNotify(self.$validator.errors.items[0].msg);
          self.$vs.loading.close(self.$refs.saveButton.$el);
        }
      });
    }
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
