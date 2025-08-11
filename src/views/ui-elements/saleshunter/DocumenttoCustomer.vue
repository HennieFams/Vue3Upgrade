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
   
    <vx-card ref="MainCard">
      <div>
        <div >
          <label>Customer Name</label>  
                <v-select  :options="customerDropdown" placeholder="Search / Select Customer"  v-model="customer"  @search:blur="populateData" />
              </div>
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
              <span class="ml-2 text-base text-primary">Assign System documents</span>
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
            <vs-th sort-key="customer">Customer</vs-th>
            <vs-th sort-key="Document">Document</vs-th>
            <vs-th sort-key="revision">Revision</vs-th>
           <vs-th sort-key="documentNr">Control Number</vs-th>
           <vs-th sort-key="createdate">Uploaded</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.customer">{{tr.customer}}</vs-td>
              <vs-td :data="tr.document">{{tr.document}}</vs-td>
              <vs-td :data="tr.revision">{{tr.revision}}</vs-td>
              <vs-td :data="tr.documentNr">{{tr.documentNr}}</vs-td>
              <vs-td :data="tr.createdate">{{formatDate(tr.createdate.replace("T", " ").split('.')[0])}}</vs-td>
              <vs-td class="whitespace-no-wrap">
                <feather-icon
                  icon="EyeIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"           
                  @click.stop="showStatusPrompt(tr)"
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
       <vs-prompt
        ref="statusPrompt"
        title="Documentation to customer"
        acceptText="Add Document"
        cancelText="Cancel"
        @cancel="documentDropdown=0"
        @accept="addDocumentDB"
        :active.sync="statusPromptActive">
        <div class="con-exemple-prompt">
          <div>
            <label>Document</label>
            <v-select placeholder="Choose file" :options="promptdata" v-model="documentDropdown"></v-select>
          </div>
        </div>
      </vs-prompt>

      <vs-prompt
        ref="statusPrompt"
        title="Viewer"
        acceptText="Close"
        :active.sync="statusPromptActiveViewer">
         <div>
            <iframe :src="myData" frameborder="0" > </iframe>
        </div>
      </vs-prompt>

    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import vSelect from "vue-select";
export default {
  data() {
    return {
      statusPromptActiveViewer: false,
      customerID:0,
      customer:0,
      documentID:0,
      documentDropdown: 0,

      accountID:0,
      statusPromptActive: false,
      promptdata: [],
      customerDropdown:[],

      itemsPerPage: 10,
    
      selected: [],
      document: [],
    
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
    flatPickr  ,
    "v-select": vSelect
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
    this.loadcustomer();
    this.isMounted = true;
  },
  methods: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },

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
     showStatusPrompt(data) {
       var self = this;
       self.mydata = data.myFile;
       self.myData = 'data:application/pdf;base64,' + data.myFile
       self.statusPromptActiveViewer = true;
    },

     populateData() {
      var self = this;
      //self.statusDropdown.value;
      if (self.customer) {
          self.customerID = self.customer.value;
          self.GetGrid();
        }
      },

     addNewData() {
      var self = this;
      self.getDocumentation(function () {
        self.documentDropdown = self.promptdata.filter(function (item) { return item.value == self.documentID2; })[0];
      });
      self.statusPromptActive = true;
    },

    addDocumentDB() {
      const self = this;
      if(self.documentDropdown){
        self.documentID = self.documentDropdown.value;
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
            "SalesSeeker/PerDocumentCustomerAdd?AccountID=1&CustomerID=" + self.customerID  + "&DocumentID=" + self.documentID ,
            onSuccess,
            onFinally
          );
        }
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
    getDocumentation(whenDone) {
      const self = this;
      // self.showLoadingOnElement("statusPrompt", 1, "radius");

      var onSuccess = function(response) {
        self.promptdata = response.data.map((item) => {return {label: item.name, value: item.id} });
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.statusPrompt.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_DocumentGeneric_Get&parameters=1",
        onSuccess,
        onFinally
      );
    },

    loadcustomer() {
      const self = this;
      // self.showLoadingOnElement("customerTable", 1, "radius");
      var onSuccess = function(response) {
        self.customerDropdown = response.data.map(function(item) {
          //return { text: item.customer, value: item.id };
          return { label: item.customer, value: item.id };
        });
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.categorySelect.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/SP_JsonResult?storeproc=CRUD_Customer_GetGrid&parameters=1",
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
        "SalesSeeker/PerDocumentCustomerRemove?AccountID=1&CustomerID=" + data.cid  + "&DocumentID=" + data.did ,
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
         "SalesSeeker/PerDocumentCustomerGet?AccountID=1&CustomerID=" + self.customerID ,
        onSuccess,
        onFinally
      );
    },

  }
};
</script>
<style lang="scss" scoped>
 
</style>
<style lang="stylus">
.con-exemple-prompt
  padding 10px;
  padding-bottom 0px;
  .vs-input
    width 100%
    margin-top 10px;
</style>
