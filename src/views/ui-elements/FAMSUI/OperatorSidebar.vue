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
              <label class="w-full" size="small">Operator Type </label>
              <v-select class="w-full"  placeholder="Search / Select Operator Type"  :options="operatorTypeData"  
              v-model="operatorTypeSelect"  @search:blur="populateDataOperatorType"   
              name ="Search / Select Operator Type" />
            </div>            
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-4">
            <!-- ContactPhone -->
            <label>Employee (To be displayed on FAMS Screen)</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Employee Name"
                  v-model="formData.name"
                  class="w-full"
                  name="Employee"
                  maxlength="18" 
                  @keydown="nameKeydown($event)"
                />
          </div>
          <div class="vx-col flex-4">
            <!-- ContactPhone -->
            <label>FAMS tag (number on tag)</label>
            <v-select
              placeholder="Select or Enter Tag to assign"
              :options="tagDropdown"
              v-model="tagSelected"
              class="w-full"
              taggable
              maxlength="20" 
              icon-pack="feather"
              icon="icon-phone"
              @keypress.native="nameKeydown($event)"
            ></v-select>
            <!-- <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="FAMS Tag"
                  v-model="formData.tag"
                  class="w-full"
                  name="FAMSTag"
                  maxlength="20" 
                  @keydown="nameKeydown($event)"
                /> -->
          </div>
        </div>

        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Employee Description</label>
            <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="Employee Description"
                  v-model="formData.description"
                  class="w-full"
                  name="Employee"
                
                />
          </div>
        </div>
        <br>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Employee Active (Enable / Disable)</label>
            <vs-switch class="rounded-pill" v-model="formData.enable" />
          </div>
        </div>
        <br>
        <div>
          <vs-button v-show="!showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:38%;" @click="moreDetail"  icon-pack="feather" icon="icon-edit">More Detail</vs-button>
          <vs-button v-show="showMore" class="rounded-lg mr-2" color="warning" type="filled" style="left:38%;" @click="lessDetail"  icon-pack="feather" icon="icon-edit">Less Detail</vs-button>
        </div>
        <br>
        <div v-show="showMore">
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label>Id Number</label>
              <vs-input
                icon-pack="feather"
                icon="icon-phone"
                placeholder="Id Number"
                v-validate="'numeric'"
                name="IdNum"
                v-model="formData.operatorDetail.idNumber"
                class="w-full"
              />
            </div>
            <div class="vx-col flex-1">
              <label>Cellphone Number</label>
              <vs-input
                icon-pack="feather"
                icon="icon-phone"
                placeholder="Cellphone Number"
                v-validate="'digits:10'" 
                type="numeric"
                name="Cell Number"
                v-model="formData.operatorDetail.cellphoneNr"
                class="w-full"
              />
            </div>
            <div class="vx-col flex-4">
              <label>Email Address</label>
              <vs-input
                icon-pack="feather"
                icon="icon-at-sign"
                placeholder="Email Address"
                v-model="formData.operatorDetail.email"
                class="w-full"
                v-validate="'email'"
                name="Email"
              />
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label>Residential Address</label>
              <vs-input
                icon-pack="feather"
                icon="icon-map-pin"
                placeholder="Residential Address"
                v-model="formData.operatorDetail.residentialAddress"
                class="w-full"
                name="ResidentAddress"
              />
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label>Postal Address</label>
              <vs-input
                icon-pack="feather"
                icon="icon-map-pin"
                placeholder="Postal Address"
                v-model="formData.operatorDetail.postalAddress"
                :disabled="resandpostal"
                class="w-full"
                name="PostalAddress"
              />
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-4">
              <label> Postal Address same as Residential Address? (Yes / No)</label>
              <vs-switch class="rounded-pill" v-model="resandpostal" />
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-4">
              <label>PDP (Yes / No)</label>
              <vs-switch class="rounded-pill" v-model="formData.operatorDetail.pdp" />
            </div>
            <div class="vx-col flex-4" v-show="formData.operatorDetail.pdp">
              <label>PDP Expire Date</label>
              <div id="datepick">
                <flat-pickr
                  class="w-full"
                  v-model="formData.operatorDetail.PdpexpiryDate"
                  :format="'YYYY-MM-DD'"
                  placeholder="Select Expiration Date"
                  name="Date"
                />
              </div>
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label>License</label>
              <vs-input
                icon-pack="feather"
                icon="icon-file-text"
                placeholder="License"
                v-model="formData.operatorDetail.license"
                class="w-full"
                name="License"
              />
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <label>License</label>
              <v-select class="w-full"  placeholder="Search / Select License Type"  :options="licenseTypeData"  
              v-model="licenseTypeSelect" 
              @search:blur="populateDataLicenseType"
              name ="Search / Select License Type" />
            </div>
          </div>
          <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-2">
              <label>License Expire Date</label>
              <div id="datepick">
                <flat-pickr
                  class="w-full"
                  v-model="formData.operatorDetail.licenseExpiryDate"
                  :format="'YYYY-MM-DD'"
                  icon-pack="feather"
                  icon="icon-calendar"
                  placeholder="Select Expiration Date"
                  name="License Date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </component>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg " color="success" type="gradient" @click="submitData" ref="submitButton"   icon-pack="feather" icon="icon-check">Submit</vs-button>
      <vs-button class="rounded-lg " color="danger"  type="gradient" @click="isSidebarActiveLocal = false"  icon-pack="feather" icon="icon-x-square">Cancel</vs-button>
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
      default: () => {}
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
      dropdownValue:[],
      dropdownSelect: [],
      showMore: false,
      operatorTypeSelect: { value: 0, label: 'Search / Select Operator Type' },
      operatorTypeData:[],
      resandpostal: false,
      formData: {
        id:0,
        accountId:localStorage.getItem('userAccountId'),
        operatorTypeId:0,
        operatorType: "None",
        name:"None",
        enable:true,
        description:"None",
        account:"",       
        tag  :"0000000000",
        operatorDetail: {
          PdpexpiryDate :"",
          email :"",
          pdp :false,
          residentialAddress :"",
          idNumber :"",
          cellphoneNr :"",
          postalAddress :"",
          license: "",
          licenseTypeId: 0,
          licenseExpiryDate: "",
          licenseType: "",
        }
      },
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      licenseTypeData: [],
      licenseTypeSelect: 0, 
      tagDropdown: [],
      tagSelected: 0,
    };
  },
  watch: {
    
    name(val) {
      this.name = val.replace(/\W/g, "");
    },
    isSidebarActive(val) {
      
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        this.GetDropdownOperatorType();
        this.GetTags();
        this.GetDropdownLicenseType();
        this.showMore = false;
        this.formData.id=this.data.id;
        this.formData.accountId=localStorage.getItem('userAccountId');
        this.formData.operatorTypeId=this.data.operatorTypeId;
        this.formData.operatorType= this.data.operatorType;
        this.formData.name=this.data.operator;
        this.formData.enable=this.data.enable;
        this.formData.description=this.data.description;
        this.formData.tag = this.data.tag;
        this.tagSelected = { value: 0, label: this.data.tag };
        this.operatorTypeSelect = this.data.operatorType;

        this.formData.operatorDetail.PdpexpiryDate = this.data.operatorDetail.PdpexpiryDate;
        this.formData.operatorDetail.email = this.data.operatorDetail.email;
        this.formData.operatorDetail.pdp = this.data.operatorDetail.pdp;
        this.formData.operatorDetail.residentialAddress = this.data.operatorDetail.residentialAddress;
        this.formData.operatorDetail.idNumber = this.data.operatorDetail.idNumber;
        this.formData.operatorDetail.cellphoneNr = this.data.operatorDetail.cellphoneNr;
        this.formData.operatorDetail.postalAddress = this.data.operatorDetail.postalAddress;
        this.formData.operatorDetail.PdpexpiryDate = this.data.operatorDetail.pdpExpireDate;
        
        this.licenseTypeSelect = this.data.licenseType;
        this.formData.operatorDetail.license = this.data.operatorDetail.license;
        this.formData.operatorDetail.licenseTypeId = this.data.operatorDetail.licenseTypeId;
        this.formData.operatorDetail.licenseExpiryDate = this.data.operatorDetail.licenseExpiryDate;
        
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
    GetTags() {
      const self = this;
      var type = "Employee"
      var onSuccess = function (response) {
        self.tagDropdown = response.data.map((item) => {
          return { label: item.tag, value: item.id };
        });
        
      };
      var onFinally = function () {
      };
      self.$ajaxGet(self, `IntegrationFAMS/GetTagsForAccount?type=${type}`, onSuccess, onFinally);
    },
    nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        if(e.which === 32){}
        else e.preventDefault();
      }
    },
      GetDropdownOperatorType() { 
        const self = this;
        var onSuccess = function(response) {
            self.operatorTypeData = response.data.map((item) => {return {label: item.name, value: item.id} });
        };
        var onFinally = function() {
          //self.$vs.loading.close(self.$refs.gridTable.$el);
        };
        self.$ajaxGet(
          self,
          "OperatorTypes/GetOperatorTypedropdown",
          onSuccess,
          onFinally
        );    
      },
    populateDataOperatorType() {
        var self = this;
        if (self.operatorTypeSelect) {
          self.formData.operatorTypeId = self.operatorTypeSelect.value;
          self.formData.operatorType = self.operatorTypeSelect.label;
        }
      },
    populateDataLicenseType() {
        var self = this;
        if (self.operatorTypeSelect) {
          self.formData.operatorDetail.licenseTypeId = self.licenseTypeSelect.value;
          self.formData.operatorDetail.licenseType = self.licenseTypeSelect.label;
        }
      },
  
    initValues() {
      var date = new Date();
      this.formData.PdpexpiryDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      if (this.data.id)  return;
        this.formData.id = 0;
        this.formData.name = "";
        this.formData.description = "";
        this.formData.allocationTypeId = 0
        this.formData.allocationType = "";
        this.formData.enable = false;
        this.dropdownSelect = 0;
        
        this.formData.operatorDetail.PdpexpiryDate = "";
        this.formData.operatorDetail.email = "";
        this.formData.operatorDetail.pdp = false;
        this.formData.operatorDetail.residentialAddress = "";
        this.formData.operatorDetail.idNumber = "";
        this.formData.operatorDetail.cellphoneNr = "";
        this.formData.operatorDetail.postalAddress = "";
        
        this.formData.operatorDetail.license = "";
        this.formData.operatorDetail.licenseTypeId = 0;
        this.formData.operatorDetail.licenseExpiryDate = "";
    },
    moreDetail(){
      this.showMore = true;
    },
    lessDetail(){
      this.showMore = false;
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
      self.$validator.validateAll().then((result) => {
        if (result){
          if(self.tagSelected && self.tagSelected.label == undefined){
            self.formData.tag = self.tagSelected;
          }
          else if(self.tagSelected.label){
            self.formData.tag = self.tagSelected.label;
          }
          if(self.resandpostal){
            self.formData.operatorDetail.postalAddress = self.formData.operatorDetail.residentialAddress;
          }
          
          const obj = {
            id: self.formData.id,
            accountId : localStorage.getItem('userAccountId'),
            operatorTypeId: self.formData.operatorTypeId,
            name: self.formData.name,
            description:  self.formData.description,
            tag:  self.formData.tag,
            enable: self.formData.enable,
            operatorDetail: self.formData.operatorDetail
          };

          if (self.formData.id !== null && self.formData.id != 0) {
            self.$emit("update", obj);
          } else {
            self.$emit("add", obj);
          }
          this.$emit("closeSidebar");
          this.initValues();
        }
        else {
          self.FailedCustomNotify(self.$validator.errors.items[0].msg);
        }
      });
      self.$validator.reset();
    },
    
    FailedCustomNotify(msg) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: msg,
        color: 'danger'
      })
    },
    GetDropdownLicenseType() { 
          const self = this;
          var onSuccess = function(response) {
              self.licenseTypeData = response.data.map((item) => {return {label: item.name, value: item.id} });
          };
          var onFinally = function() {
          };
          self.$ajaxGet(
            self,
            "Equipments/GetLicenseTypeDropDown",
            onSuccess,
            onFinally
          );    
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
