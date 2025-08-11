<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div>
        <div class="vx-row px-4 pt-2 pb-3">

           <div class="vx-col flex-1">
        
               <label>Group</label>  
               <v-select
                      :options="dropdownValue"
                      placeholder="Search / Select Groupfffffffff"
                      v-model="dropdownSelect"
                      @search:blur="populateData"   
                />         
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
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Allocation Name"
                  v-model="formData.name"
                  class="w-full"
                  name="Description"
                
                />
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
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Allocation Description"
                  v-model="formData.description"
                  class="w-full"
                  name="Description"
                
                />
          </div>
        </div>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg " color="success" type="gradient" @click="submitData"                    icon-pack="feather" icon="icon-check">Submit</vs-button>
      <vs-button class="rounded-lg " color="danger"  type="gradient" @click="isSidebarActiveLocal = false"  icon-pack="feather" icon="icon-x-square">Cancel</vs-button>
    </div>
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
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
     "v-select": vSelect
  },
  mounted() {
    this.LoadAllocationGroup();
  },
  data() {
    return {
      dropdownValue:[],
      dropdownSelect: [],
      formData: {
         id:0,
         accountId:0,
         name:"None",
         enable:false,
         description:"None",
         groupId: 0,
         group:"None"
        },
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
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        this.formData.id = this.data.perId;
        this.formData.accountId =  localStorage.getItem('userAccountId');
        this.formData.name = this.data.name;
        this.formData.description = this.data.description;
        this.formData.groupId = this.data.allocationType.id;
        this.formData.group = this.data.allocationType.groupName;
        this.formData.enable = this.data.enable;
        this.dropdownSelect = this.formData.group ;
        this.initValues();
      }
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
     populateData() {
      var self = this;
      if (self.dropdownSelect) {
          self.formData.allocationTypeId = self.dropdownSelect.value;
          self.formData.allocationType = self.dropdownSelect.label;
        }
      },

     LoadAllocationGroup() {
        const self = this;
        var onSuccess = function(response) {
          self.dropdownValue = response.data.map(function(item) {
            //return { text: item.customer, value: item.id };
            return { label: item.name, value: item.id };
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "AllocationTypes/GetAllocationTypedropdown",
          onSuccess,
          onFinally
        );
    },

   
    initValues() {
      if (this.data.id)  return;
        this.formData.id = 0;
        this.formData.name = "";
        this.formData.description = "";
        this.formData.allocationTypeId = 0
        this.formData.allocationType = "";
        this.formData.enable = false;
        this.dropdownSelect = 0;
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
      const obj = {
            id: 0,
            accountId : localStorage.getItem('userAccountId'),
            name: self.formData.name,
            description: self.formData.description,
            allocationTypeId:  self.formData.allocationTypeId,
            enable: self.formData.enable
          };
      if (self.formData.id !== null && self.formData.id != 0) {
        self.$emit("update", self.formData);
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
