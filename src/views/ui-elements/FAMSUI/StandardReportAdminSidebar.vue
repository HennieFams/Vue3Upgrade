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
    <vs-divider class="mb-3">Standard Report Window</vs-divider>

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
            <label>Report Name</label>
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
            <span class="text-warning text-sm" v-show="errors.has('name')">{{errors.first("name")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Report Type</label>
            <v-select
              ref="reportDropDown"
              class="w-full"
              v-validate="'required'"
              name="Report Type"
              placeholder="Select a Type"
              :options="reportTypeData"
              v-model="reportTypeDropDown"
            ></v-select>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <vs-divider></vs-divider>   
          </div>
          <div class="vx-col w-full">
            <label>Import Data File</label>
            <file-pond
              id="filepond"
              ref="pond"
              :server='uploadReportLocation'
              label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
              :allow-multiple="true"
              :instant-upload="true"
              :allow-image-preview="true"
              :accepted-file-types="types"
              @processfile="processReportData"
              @removefile="fileRemoved"/>
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
          @click="saveReport"
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
import vueFilePond from 'vue-filepond';import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

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
    BFormTimepicker,
    FilePond
  },
  mounted() {
    this.getReportTypeDropDown();
  },
  data() {
    return {
      reportTypeData:[],
      reportTypeDropDown:0,      
      formData: {
        id: 0,
				name: "",
				reportTypeId: 3,
        report: "",
        enable: 1
			},
      types: [
        "application/rdl"
      ],
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
        self.getReportTypeDropDown();
      } else{
        self.reportTypeDropDown = self.reportTypeData.filter(function (item) {
          return item.value == self.data.reportTypeID;
        })[0];
        
        self.formData.id = self.data.id;
				self.formData.name = self.data.name;
        self.formData.report = self.data.report;
        self.formData.enable= 1;
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
    uploadReportLocation: {
      get() {
        return this.$buildUrl(`ReportStandards/GetReportString`);
        }
    },
  },
  methods: {
    fileRemoved(){
      this.$refs.pond.removeFiles();
    },
    closeSidebar() {
      this.initValues();
      this.fileRemoved();
      this.isSidebarActiveLocal = false;
    },
    initValues() {
      this.formData.id = 0;
      this.formData.name = "";
      this.formData.reportTypeId = 0;
      this.formData.report = 0;
      this.formData.enable = 1;
      this.reportTypeDropDown = [];
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
     successNotifyLoadCustom(msg) {
      this.$vs.notify({
        title: 'Successfully',
        // text: 'Item successfully loaded',
        text : msg,
        color: 'success'
      })
    },
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'warning'
      })
    },
    processReportData(error, file, a, b){
      var self = this;
      
      self.formData.report = file.serverId;
    },
    saveReport(){
      var self = this;
      
      self.showLoadingOnElement("saveButton", 0.65, "radius");
      self.$validator.validateAll().then((result) => {
        if (result) {
          if(!self.getReportTypeDropDown){
            this.$vs.notify({
              title: "Warning",
              text: "Report Type not selected.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          else if(self.formData.report == ""){
            self.$vs.notify({
              title: "Warning",
              text: "Report not uploaded.",
              color: "warning",
            });
            this.$vs.loading.close(self.$refs.saveButton.$el);
          }
          else{
          
            if(self.reportTypeDropDown && self.reportTypeDropDown.value != null)
            {
              self.formData.reportTypeId = self.reportTypeDropDown.value;
            }
          
            var onSuccess = function (response) {
               var tmp = response.data;
               self.closeSidebar();
               self.successNotifyLoadCustom(tmp.message);
            };
            var onFinally = function (response) {
              self.$vs.loading.close(self.$refs.saveButton.$el);
            };
            self.$ajaxPost(self, "ReportStandards/", self.formData, onSuccess, onFinally);
          }
          
        }
        else{
          self.FailedCustomNotify(self.$validator.errors.items[0].msg);
          self.$vs.loading.close(self.$refs.saveButton.$el);
        }
      });
    },
    getReportTypeDropDown() {
      var self = this;
      var onSuccess = function(response) {
        self.reportTypeData = response.data.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "ReportStandards/GetReportTypeDropDown",
        onSuccess,
        onFinally
      );
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
