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
            <label>Cost Centre's Name</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Cost Centre's Name"
                  v-model="formData.name"
                  class="w-full"                
                />
          </div>    
        </div>
        <div class="vx-row px-4 pt-2 pb-3">
           <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Cost Centre's Description</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Cost Centre's Description"
                  v-model="formData.description"
                  class="w-full"              
                />
          </div>
        </div>
       <div class="vx-row px-4 pt-2 pb-3">
           <div class="vx-col flex-1">
                  <label>Cost Centre Min</label>
                  <vs-input-number class="num-input_transparent" :min="0" :max="5" v-model="formData.min"/>
          </div>
          <div class="vx-col flex-1">
                  <label>Cost Centre Min</label>
                  <vs-input-number class="num-input_transparent" :min="1" :max="100000" v-model="formData.max"/>
          </div>
       </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
                <div class="demo-alignment">
                  <span>Cost Centre Active (No | Yes):</span>
                  <div class="flex">
                    <vs-switch class="rounded-pill" color="success" v-model="formData.enable"></vs-switch>
                  </div>
              </div>
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
   
  },
  data() {
    return {
       formData: {
          Id:0,
          accountId:localStorage.getItem('userAccountId'),
          name:"",
          description:"",
          min:0,
          max:0,
          enable:true,
        }   ,
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
        this.formData.Id = this.data.costCentreId;
        this.formData.accountId =  localStorage.getItem('userAccountId');
        this.formData.enable = this.data.enable;
        this.formData.name = this.data.costCentre;
        this.formData.description = this.data.description;
        this.formData.min = this.data.costCentreMin;
        this.formData.max = this.data.costCentreMax;
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
   
    initValues() {
      if (this.data.id)  return;
        this.formData.Id = 0;
        this.formData.accountId = localStorage.getItem('userAccountId'),
        this.formData.enable = true;
        this.formData.name = "";
        this.formData.description = "";
        this.formData.min = 0;
        this.formData.max = 100;
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
            Id: self.formData.Id,
            accountId : self.formData.accountId,
            name : self.formData.name,
            description : self.formData.description,
            min : self.formData.min,
            max : self.formData.max,
            enable: self.formData.enable
          };
      if (self.formData.Id !== null && self.formData.Id != 0) {
        self.$emit("update", obj);
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
