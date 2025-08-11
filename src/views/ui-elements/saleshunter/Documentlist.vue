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
    <menu-sidebar
      :isSidebarActive="menuSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
      @update="update"
      @add="add"
    />
    <vx-card ref="MainCard">
      <div>
         <!-- <div class="container">
           <label class="text-reader">
            <input type="file" @change="loadTextFromFile">
          </label>

           <text-reader @load="text = $event"></text-reader>
        </div> -->
         <vs-table
          ref="gridTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="document"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
          
              <div
              ref="addNew"
              class="p-3 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
              @click="addNewData"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
            </div>
            <div
              ref="Refresh"
              class="p-3 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
              @click="ReloadData"
            >
              <feather-icon icon="refresh" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Refresh</span>
            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ document.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : document.length }} of {{ document.length }}</span>
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
            <vs-th sort-key="docName">Document Name</vs-th>
            <vs-th sort-key="revision">Revision</vs-th>
           <vs-th sort-key="documentNr">Control Number</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.docName">{{tr.docName}}</vs-td>
              <vs-td :data="tr.revision">{{tr.revision}}</vs-td>
              <vs-td :data="tr.documentNr">{{tr.documentNr}}</vs-td>
           
              <vs-td class="whitespace-no-wrap">
                 <feather-icon
                  icon="EyeIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"           
                  @click.stop="showStatusPrompt(tr)"
                />
                <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  class="ml-2"
                  @click.stop="editData(tr)"
                />
                <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="deleteData(tr)"
                />
              </vs-td>

            </vs-tr>
          </template>
        </vs-table>
      </div>
      <div>
         <vs-prompt
            ref="statusPrompt"
            title="Viewer"
            acceptText="Close"
            :active.sync="statusPromptActive">
            <div>
                <iframe :src="myData" frameborder="0" > </iframe>
            </div>
        </vs-prompt>
      </div>
     

    </vx-card>  
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import menuSidebar from "./DocumentSidebar.vue";

export default {
  data() {
    return {
      statusPromptActive: false,
      myData:null,
      text: '',
      itemsPerPage: 10,
      menuSidebar: false,
      selected: [],
      document: [],
      productserror: [],
      categorieserrors: [],
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y/m/d h:m"
      },
      date2: null,
      sidebarData: {},
      isMounted: false,
    };
  },
  components: {
    flatPickr,
    menuSidebar,
    FileReader
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  mounted() {
    this.GetGrid();
    this.isMounted = true;
  },
  methods: {
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

    //********************* Application events */
     addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    showStatusPrompt(data) {
       var self = this;
       self.mydata = data.myFile;
       self.myData = 'data:application/pdf;base64,' + data.myFile
       self.statusPromptActive = true;
    },
    editData(data) {
     
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    
    ReloadData() {
       const self = this;
       self.GetGrid();
    },

    toggleDataSidebar(val = false) {
      this.menuSidebar = val;
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    //********************* SQL events */
    add(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/AddDocumentation",
        data,
        onSuccess,
        onFinally
      );
    },
    update(data) {
       const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function(response) {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/UpdateDocumentation",
        data,
        onSuccess,
        onFinally
      );
    },
  
    deleteData(data) {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");
      
      var onSuccess = function(response) {
        self.GetGrid();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/RemoveDocumentation?DocumentID=" + data.id,
        onSuccess,
        onFinally
      );
    },
     
    GetGrid() {
      const self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function(response) {
        self.document = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
         "SalesSeeker/GetDocumentation?AccountID=1",
        onSuccess,
        onFinally
      );
    },

  }
};
</script>
<style lang="stylus">
.con-exemple-prompt
  padding 10px;
  padding-bottom 0px;
  .vs-input
    width 100%
    margin-top 10px;
</style>
