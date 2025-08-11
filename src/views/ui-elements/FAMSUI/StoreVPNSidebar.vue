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
      <!-- <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4> -->
        <!-- <h4>{{ data.VPNID == 0  ? "ADD NEW" : "UPDATE" }} ITEM</h4> -->
        <h4>ADD NEW : UPDATE ITEM</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
        <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <vs-input label="Store Name"  v-model="formData.storeName" class="w-full" disabled="disabled == 1" />
            </div>

            <div class="vx-col flex-1">
              <vs-input label="Store macAddress"  v-model="formData.macAddress" class="w-full" disabled="disabled == 1"  />
            </div>
        </div>


        <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <!-- ContactPhone -->
              <label>VPN Name</label>
              <vs-input
                  icon-pack="feather"
                    icon="icon-phone"
                    placeholder="VPN Name"
                    v-model="formData.vpnName"
                    class="w-full"
                    name="VPN Name"
                  
                  />
            </div>

            <div class="vx-col flex-1">
                <label>VPN IP Address</label>  
                <vs-input
                  icon-pack="feather"
                    icon="icon-phone"
                    placeholder="VPN IP Address"
                    v-model="formData.ipaddress"
                    class="w-full"
                    name="VPN IP Address"
                  
                  />     
            </div>
        </div>
        <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <!-- ContactPhone -->
              <label>allowed Ips</label>
              <vs-input
                  icon-pack="feather"
                    icon="icon-phone"
                    placeholder="allowedIps"
                    v-model="formData.allowedIps"
                    class="w-full"
                    name="allowedIps"
                    disabled="disabled == 1"
                  />
            </div>

            <div class="vx-col flex-1">
                <label>endpoint1</label>  
                <vs-input
                  icon-pack="feather"
                    icon="icon-phone"
                    placeholder="endpoint1"
                    v-model="formData.endpoint1"
                    class="w-full"
                    name="endpoint1"
                    disabled="disabled == 1"
                  />     
            </div>
        </div>
        <div class="vx-row px-4 pb-3">
            <div class="vx-col flex-1">
              <!-- ContactPhone -->
              <label>endpoint2</label>
              <vs-input
                  icon-pack="feather"
                    icon="icon-phone"
                    placeholder="endpoint2"
                    v-model="formData.endpoint2"
                    class="w-full"
                    name="endpoint2"
                    disabled="disabled == 1"
                  />
            </div>

            <div class="vx-col flex-1">
                <label>endpoint3</label>  
                <vs-input
                  icon-pack="feather"
                    icon="icon-phone"
                    placeholder="endpoint3"
                    v-model="formData.endpoint3"
                    class="w-full"
                    name="endpoint3"
                    disabled="disabled == 1"
                  />     
            </div>

            <div class="vx-col flex-1">
                <label>VPN Interface (1-Wifi;2-GSM)</label>  
                <vs-input
                  icon-pack="feather"
                    icon="icon-phone"
                    placeholder="VPN Interface"
                    v-model="formData.localIf"
                    class="w-full"
                    name="VPN Interface"
                  
                  />     
            </div>
        </div>
        
      <div>
        <div class="vx-row px-4 pt-2 pb-3">
           <div class="vx-col flex-1">
               <label>VPN privateKey</label>  
               <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="VPN privateKey"
                  v-model="formData.privateKey"
                  class="w-full"
                  name="VPN privateKey"
                
                />      
          </div>        
        </div>
         <div class="vx-row px-4 pt-2 pb-3">
           <div class="vx-col flex-1">
               <label>VPN publicKey</label>  
               <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="VPN publicKey"
                  v-model="formData.publicKey"
                  class="w-full"
                  name="VPN publicKey"
                
                />        
          </div>
        </div>
        <div class="vx-row px-4 pt-2 pb-3">
           <div class="vx-col flex-1">
               <label>VPN presharedKey</label>  
               <vs-input
                icon-pack="feather"
                  icon="icon-phone"
                  placeholder="VPN presharedKey"
                  v-model="formData.presharedKey"
                  class="w-full"
                  name="VPN presharedKey"
                />        
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
              :server='uploadVPNLocation'
              label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
              :instant-upload="true"
              :allow-image-preview="true"
              @processfile="processVPNFile"
              @removefile="fileRemoved"/>
          </div> 
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg " color="success" type="gradient" @click="submitData" icon-pack="feather" icon="icon-check">Submit</vs-button>
      <vs-button class="rounded-lg " color="danger"  type="gradient" @click="isSidebarActiveLocal = false"  icon-pack="feather" icon="icon-x-square">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
// import vUploader from 'v-uploader'
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
import vueFilePond from 'vue-filepond';import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
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
          id:0,
          storeid:0,
          accountId:0,
          storeName: "",
          macAddress: "",
          vpnName: "",
          privateKey: "",
          ipaddress: "",
          publicKey :"",
          endpoint1: "20.164.32.243:51820",
          endpoint2:  "20.164.32.243:54825",
          endpoint3: "20.164.32.243:58830",
          allowedIps: "10.55.0.0/16",
          presharedKey: "",
          localIf:0
        },
      showSpares: false,
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
        this.formData.accountId = this.data.accountId;
        this.formData.id = this.data.storeVpns.id;
        this.formData.storeid = this.data.id;
        this.formData.storeName = this.data.name;
        this.formData.macAddress = this.data.macaddress;
        this.formData.vpnName = this.data.storeVpns.name;
        this.formData.privateKey = this.data.storeVpns.privateKey;
        this.formData.ipaddress = this.data.storeVpns.ipaddress;
        this.formData.publicKey = this.data.storeVpns.publicKey;
        this.formData.endpoint1 = this.data.storeVpns.endpoint1;
        this.formData.endpoint2 = this.data.storeVpns.endpoint2;
        this.formData.endpoint3 = this.data.storeVpns.endpoint3;
        this.formData.allowedIps = this.data.storeVpns.allowedIps;
        this.formData.presharedKey = this.data.storeVpns.presharedKey;
        this.formData.localIf = this.data.storeVpns.localIf;

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
    },
    uploadVPNLocation: {
      get(fieldName, file, metadata) {
        return this.$buildUrl("StoreVpns/ProcessConfigFile");
      }
    },
  },
  methods: {
    fileRemoved(){
      this.$refs.pond.removeFiles();
    },
    processVPNFile(error, file){
      var self = this;
      var response = JSON.parse(file.serverId);
     
      self.formData.privateKey = response.privateKey;
      self.formData.ipaddress = response.address;
      self.formData.publicKey = response.publicKey;
      self.formData.endpoint1 = response.endpoint1;
      self.formData.endpoint2 = response.endpoint2;
      self.formData.endpoint3 = response.endpoint3;
      self.formData.allowedIps = response.allowedIPs;
      self.formData.presharedKey = response.presharedKey;
      // alert (response.localIf !== null ? response.localIf : 0);

      // self.formData.localIf = response.localIf !== null ? response.localIf : 0;
    },
    
    initValues() {
      if (this.data.id)  return;
        this.formData.accountId = localStorage.getItem('userAccountId');
        this.formData.id = 0;
        this.formData.storeid = 0;
        this.formData.storeName = "Not Assign";
        this.formData.macAddress = "Not Assign";
        this.formData.vpnName = "Not Assign";
        this.formData.privateKey = "Not Assign";
        this.formData.ipaddress = "Not Assign";
        this.formData.publicKey = "Not Assign";
        this.formData.endpoint1 = "20.164.32.243:51820";
        this.formData.endpoint2 = "20.164.32.243:54825";
        this.formData.endpoint3 = "20.164.32.243:58830";
        this.formData.allowedIps = "10.55.0.0/16";
        this.formData.presharedKey = "Not Assign";
        this.formData.localIf = 0;

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
            accountId : localStorage.getItem('userAccountId'),
            id : self.formData.id,
            storeid : self.formData.storeid,
            name : self.formData.vpnName,
            privateKey : self.formData.privateKey,
            ipaddress : self.formData.ipaddress,
            publicKey : self.formData.publicKey,
            endpoint1 : self.formData.endpoint1,
            endpoint2 : self.formData.endpoint2,
            endpoint3 : self.formData.endpoint3,
            allowedIps : self.formData.allowedIps,
            presharedKey : self.formData.presharedKey,
            localIf : self.formData.localIf
          };
          self.$emit("update", obj);
    // debugger;
    //   if (self.formData.id !== null && self.formData.id != 0) {
    //     self.$emit("update", obj);
    //   } 
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
