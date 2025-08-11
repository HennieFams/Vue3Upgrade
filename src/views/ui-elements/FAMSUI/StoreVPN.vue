<!-- =========================================================================================
    File Name: LoadingDefault.vue
    Description: Add default loading to your application
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
    CRUD_Account_Get CRUD_Account_Get
    https://localhost:44341/api/FAMS/SP_JsonResult?storeproc=CRUD_Account_Get&parameters=1
========================================================================================== -->


<template>
  <div>
  
    <storeDetail-sidebar :isSidebarActive="storeDetailSidebar" @closeSidebar="toggleDataDetailSidebar"    :data="sidebarDetailData"   @update="updateGrid" />

    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
       
        <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search :data="storeData"
          class="vs-con-loading__container">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid" icon-pack="feather"
              icon="icon-refresh-ccw">Reload</vs-button>
            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ storeData.length -
                currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : storeData.length }} of {{
                  storeData.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage=10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=20">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=50">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=100">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <template slot="thead">
            <vs-th sort-key="name">FAMS Store</vs-th>
            <vs-th sort-key="macaddress">MacAddress</vs-th>
            <!-- <vs-th sort-key="subDate">RenewDate</vs-th> -->
            <vs-th sort-key="vpnName">VPN Name</vs-th>
            <vs-th sort-key="vpniPaddress">VPN iPaddress</vs-th>
            <vs-th sort-key="localIf">VPN Interface</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.macaddress">{{tr.macaddress}}</vs-td>
              <vs-td :data="tr.vpnName">{{tr.vpnName}}</vs-td>
              <vs-td :data="tr.vpniPaddress">{{tr.vpniPaddress}}</vs-td>
              <vs-td :data="tr.localIf">{{tr.localIf}}</vs-td>
              

              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit VPN Information">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editDetailDataSidebar(tr)" />
                </vx-tooltip>     
                <vx-tooltip class="flex" text="Delete VPN Information">
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2"
                    @click.stop="deleteGrid(tr)" />
                </vx-tooltip>
              </vs-td>

            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import storeSidebar from "./StoreSidebar.vue";
import storeDetailSidebar from "./StoreVPNSidebar.vue";
import GoogleMaps from 'google-maps';
import { Validator } from "vee-validate"; // For custom error message

export default {
  data() {
    return {


      isListHidden: false,
      isInfoHidden: true,
      isInfoNewHidden: true,

      itemsPerPage: 10,
      storeSidebar: false,
      storeDetailSidebar: false,
      selected: [],
      storeData: [],
      sidebarData: {},
      sidebarDetailData: {},
      isMounted: false,
      scalar: 1,

      formData: {
        PrivateKey: "",
        IPAddress: "",
        PublicKey: "",
        Endpoint1:  "20.164.32.243:51820",
        Endpoint2 : "20.164.32.243:54825",
        Endpoint3 : "20.164.32.243:58830",
        AllowedIPs : "10.55.0.0/16",
        PresharedKey: "",
        LocalIf:0

      }

    };
  },

  components: {
    flatPickr,
    storeSidebar,
    storeDetailSidebar,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    GoogleMaps
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  watch: {

  },
  mounted() {
    this.GetGrid();
    this.isMounted = true;
  },
  methods: {
    //********************* System related*/
    successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
    FailedNotify() {
      this.$vs.notify({
        title: 'Not Successfull',
        text: 'Item not added',
        color: 'danger'
      })
    },
    onFailedNotify(text) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: text,
        color: 'warning'
      })
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },

    ValidateNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Please ensure all the fields are completed",
        color: "danger",
      });
    },
    ValidateNotifyMess(val) {
      this.$vs.notify({
        title: "Not Successfull",
        text: val,
        color: "danger",
      });
    },

    editDetailDataSidebar(data) {
      this.sidebarDetailData = data;
      this.toggleDataDetailSidebar(true);
    },

    updateGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.successNotify();
        self.GetGrid(); 
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);     
      };
      self.$ajaxPost(
        self,
        "StoreVpns/PostStoreVpn",
        data,
        onSuccess,
        onFinally
      );
    },
    deleteGrid(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.GetGrid();
        self.successNotify();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(
        self,
        "StoreVpns/" + data.vpnid,
        onSuccess,
        onFinally
      );
    },
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
       // self.storeData = response.data.filter(item => {return item.storeVpns[0]  != null});
       self.storeData = response.data;
        //self.storeData = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "StoreVpns/GetStoreVPN",
        onSuccess,
        onFinally
      );
    },
    

    toggleDataDetailSidebar(val = false) {
      this.storeDetailSidebar = val;
    },
  }
};

</script>
<style lang="scss">
#mapPop div.vs-popup {
  width: 1000px;
  height: auto;
}

#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>