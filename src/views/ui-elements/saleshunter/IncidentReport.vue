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
      <vx-card ref="MainCard2" v-show="!isInfoHidden">
      <div>
          <template>
              <div class="vx-row">

                 <div class="vx-col md:w-1/2 w-full mt-2">
                    <v-select class="w-full" placeholder="Search / Select Customer"  :options="customerDropdown"  v-model="customer"  @search:blur="populateData"
                     name ="Customer" v-validate="'required'" />
                     <span class="text-danger text-sm" v-show="errors.has('Customer')" >{{ errors.first('Customer') }}</span>
                </div>
              
                <div class="vx-col md:w-1/2 w-full mt-2">
                   <datepicker
                    class="w-full"
                    id="incidentdate"
                    placeholder="Incident / Cal-Out Date"
                    v-model="formData.createDate"
                    format="yyyy-MM-dd"
                     name ="Incident Date" v-validate="'required'"
                  ></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('Incident Date')" >{{ errors.first('Incident Date') }}</span>
                </div>
              </div>
              <br>

              <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mb-2">   
                  <vs-input class="w-full" label-placeholder="Client's Incident / call-out number" v-model="formData.customerCallOutNr" 
                  name ="customer Call-out number" v-validate="'required'"/>
                    <span class="text-danger text-sm" v-show="errors.has('customer Call-out number')" >{{ errors.first('customer Call-out number') }}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                  <vs-input class="w-full" label-placeholder="Customer Request" v-model="formData.customerRequest"
                  name ="customer Request" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('customer Request')" >{{ errors.first('customer Request') }}</span>
                </div>   
              </div>
              <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                  <vs-input class="w-full" label-placeholder="Customer's site" v-model="formData.site"
                    name ="customer site" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('customer site')" >{{ errors.first('customer site') }}</span>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-6">
                   <vs-input class="w-full" label-placeholder="Site Contact Person" v-model="formData.siteContactPerson"
                      name ="Site Contact person" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('Site Contact person')" >{{ errors.first('Site Contact person') }}</span>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col sm:w-1/8 w-full mb-2">
                      <vs-textarea label="Problem Statement" v-model="formData.problemStatement"
                       name ="Problem Statement" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('Problem Statement')" >{{ errors.first('Problem Statement') }}</span>
                </div>
              </div>
               <div class="vx-row">
                <div class="vx-col sm:w-1/8 w-full mb-2">
                      <vs-textarea label="Fault Description" v-model="formData.faultDescription" 
                       name ="Fault Description" v-validate="'required'"/>
                    <span class="text-danger text-sm" v-show="errors.has('Fault Description')" >{{ errors.first('Fault Description') }}</span>
                </div>
              </div>
                <div class="vx-row">
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                        <vs-textarea label="Solution Description" v-model="formData.solution"
                          name ="Solution Description" v-validate="'required'"/>
                      <span class="text-danger text-sm" v-show="errors.has('Solution Description')" >{{ errors.first('Solution Description') }}</span>
                  </div>
              </div>


               <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mb-2">   
                  <vs-input class="w-full" label-placeholder="Completed By" v-model="formData.completedby"
                    name ="Completed By" v-validate="'required'"/>
                      <span class="text-danger text-sm" v-show="errors.has('Completed By')" >{{ errors.first('Completed By') }}</span>
                </div>
               <div class="vx-col md:w-1/2 w-full mt-5">
                    <datepicker
                        class="w-full"
                        id="completedate"
                        placeholder="Completed Date"
                        v-model="formData.completedDate"
                        format="yyyy-MM-dd"
                        name ="Completed Date" v-validate="'required'"
                  ></datepicker>
                  <span class="text-danger text-sm" v-show="errors.has('Completed Date')" >{{ errors.first('Completed Date') }}</span>
                </div>   
                 <div class="vx-col sm:w-1/2 w-full mb-5">   
                  <vs-input class="w-full" label-placeholder="Cloud Support" v-model="formData.cloudSupport"
                    name ="Cloud Support" v-validate="'required'"/>
                      <span class="text-danger text-sm" v-show="errors.has('Cloud Support')" >{{ errors.first('Cloud Support') }}</span>
                </div>
              </div>
               <div class="vx-row">
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                        <vs-textarea label="Summary" v-model="formData.summary" 
                          name ="Summary" v-validate="'required'"/>
                      <span class="text-danger text-sm" v-show="errors.has('Summary')" >{{ errors.first('Summary') }}</span>
                  </div>
              </div>
              <div class="vx-row px-4 pb-3">
                    <div class="vx-col flex-1">
                        <label class="text-reader">
                          <input type="file" @change="loadTextFromFile">
                        </label>
                    </div>
              </div>

              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button id="addInfo" class="rounded-lg mr-3 mb-2" @click="SubmitIncident(formData)" v-show="!isAddHidden">Submit</vs-button>
                  <vs-button id="editInfo" class="rounded-lg mr-3 mb-2" @click="editIncident" v-show="!isUpdateHidden">Edit</vs-button>
                  <vs-button color="warning" type="border" class="rounded-lg mb-2"  @click="cancelAdd">Cancel</vs-button>
                </div>
              </div>
        </template>
      </div>  
    </vx-card>
    <br>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="dataTable"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="incidents"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <div
              ref="addNew"
              class="p-3 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
              @click="addIncident"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ incidents.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : incidents.length }} of {{ incidents.length }}</span>
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
            <vs-th sort-key="customer">customer</vs-th>
            <vs-th sort-key="Incident / Call-Out">Incident / Call-Out</vs-th>
            <vs-th sort-key="site">site</vs-th>

            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.customer">{{tr.customer}}</vs-td>
              <vs-td :data="tr.customerCallOutNr">{{tr.customerCallOutNr}}</vs-td>
              <vs-td :data="tr.site">{{tr.site}}</vs-td>
            
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
                <iframe :src="mydata" style="height: 100%; width: 100%;  min-height: 900px;  min-width: 900px;" frameborder=0 allowfullscreen="true" > </iframe>
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
import moment from "moment";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      formData: {
        aid: 0,
        account: '',
        cid: 0,
        customer: '',
        customerID: 0,
        id: 0,
        customerCallOutNr: '',
        customerRequest: '',
        createDate: '',
        site: '',
        siteContactPerson: '',
        problemStatement: '',
        faultDescription: '',
        solution: '',
        completedby: '',
        completedDate: '',
        cloudSupport: '',
        summary: '',
        status: '',
        myPicture: '',
      },
      isAddHidden: false,
      isUpdateHidden: false,
      myFile:'',
      statusPromptActive: false,
      mydata:'',
      incidents: [],
      customerDropdown:[],
      customer:0,
      customerID:0,
      incidentDate: null,
      fromdate: null,
      isInfoHidden: true,
      isListHidden: false,
     
      itemsPerPage: 10,
      selected: [],
      isMounted:null,
      categorieserrors: [],
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y/m/d h:m"
      },

    };
  },
  components: {
    flatPickr,
   "v-select": vSelect,
    Datepicker
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.dataTable.currentx;
      }
      return 0;
    }
  },
  mounted() {
    this.loadIncidents();
    this.loadcustomer();
    this.isMounted = true;
  },
  methods: {
//**********************************System**************************************************** */
  successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
  loadTextFromFile(ev) {
          var self = this;
          const file = ev.target.files[0];
          const reader = new FileReader();
          var bytes = '';
          var binary = '';
          reader.readAsArrayBuffer(file)
          reader.onload = e => {
                  bytes = new Uint8Array(e.target.result);
                  var len = bytes.byteLength;
                  for (var i = 0; i < len; i++) {
                      binary += String.fromCharCode(bytes[i]);
                  }
                   self.myFile = btoa(binary);
                   self.formData.myPicture = btoa(binary);
                   //self.formData.myPicture =  'data:application/pdf;base64,' + self.myFile;
              } 
    },
  showStatusPrompt(data) {
       var self = this;
       self.mydata = "http://localhost:62620/ReportViewer.aspx?incident=" + data.id
       self.statusPromptActive = true;
    },

    populateData() {
      var self = this;
      //self.statusDropdown.value;
      if (self.customer) {
          self.formData.cid = self.customer.value;
          self.formData.customerID = self.customer.value;
          self.formData.customer = self.customer.label;
        }
      },
    initValues() {
          var self = this;
          self.customer ='',
          self.customerID = 0;
          self.formData.id = 0,
          self.formData.aid = 1,
          self.formData.account = '',
          self.formData.cid = 0,
          self.formData.customer = null,
          self.formData.customerID = 0,
          self.formData.customerCallOutNr = '',
          self.formData.customerRequest = '',
          self.formData.createDate = '',
          self.formData.site = '',
          self.formData.siteContactPerson = '',
          self.formData.problemStatement = '',
          self.formData.faultDescription = '',
          self.formData.solution = '',
          self.formData.completedby = '',
          self.formData.completedDate = null,
          self.formData.cloudSupport = '',
          self.formData.summary = '',
          self.formData.status = 0,
          self.formData.myPicture = '',
          self.isAddHidden = true,
          self.isUpdateHidden = true
      },
     cancelAdd() {
        this.initValues();
        this.isInfoHidden = true;
        this.isListHidden = false,
        this.loadIncidents();
      },

    addIncident() {
        this.initValues();
        this.isAddHidden = false;
        this.isUpdateHidden = true;
        this.isInfoHidden = false;
        this.isListHidden = true
    },
    editData(data) {
      var self = this;
      self.isInfoHidden = false;
      self.isListHidden = true;
      self.isAddHidden = true;
      self.isUpdateHidden = false;

      self.formData.id = data.id,
      self.formData.aid = data.aid,
      self.formData.account = data.account,
      self.formData.cid = data.cid,
      self.formData.customerID = data.customerID,
      self.formData.customer = data.customer ,
      self.formData.customerCallOutNr = data.customerCallOutNr,
      self.formData.customerRequest = data.customerRequest,
      self.formData.createDate = data.createDate,
      self.formData.site = data.site,
      self.formData.siteContactPerson = data.siteContactPerson,
      self.formData.problemStatement = data.problemStatement,
      self.formData.faultDescription = data.faultDescription,
      self.formData.solution = data.solution,
      self.formData.completedby = data.completedby,
      self.formData.completedDate = data.completedDate,
      self.formData.cloudSupport = data.cloudSupport,
      self.formData.summary = data.summary,
      self.formData.status = data.status,
      self.formData.myPicture = data.myPicture
   
      self.customer = this.formData.customer 
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
//**********************************DB**************************************************** */


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
       var self = this; 
      self.showLoadingOnElement("dataTable", 1, "radius");
      var onSuccess = function(response) {
        self.isInfoHidden = true;
        self.isListHidden = false,
        self.initValues();
        self.loadIncidents();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.dataTable.$el);
        self.successNotify();   
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/RemoveIncidentCallOut",
        data,
        onSuccess,
        onFinally
      );
    },

  SubmitIncident(data) {
      this.$validator.validateAll().then(result => {
              if (result) {
                const self = this;
                  self.showLoadingOnElement("dataTable", 1, "radius");
                  var onSuccess = function(response) {
                    self.isInfoHidden = true;
                    self.isListHidden = false,
                    self.initValues();
                    self.loadIncidents();
                  };
                  var onFinally = function() {
                    self.$vs.loading.close(self.$refs.dataTable.$el);
                    self.successNotify();
                
                  };
                  self.$ajaxPost(
                    self,
                    "SalesSeeker/AddIncidentCallOut",
                    data,
                    onSuccess,
                    onFinally
                  );
              }
            });  
      },
    editIncident(){
         this.$validator.validateAll().then(result => {
              if (result) {
                const self = this;
                  self.showLoadingOnElement("dataTable", 1, "radius");
                  var onSuccess = function(response) {
                    self.isInfoHidden = true;
                    self.isListHidden = false,
                    self.initValues();
                    self.loadIncidents();
                  };
                  var onFinally = function() {
                    self.$vs.loading.close(self.$refs.dataTable.$el);
                    self.successNotify();
                
                  };
                  self.$ajaxPost(
                    self,
                    "SalesSeeker/UpdateIncidentCallOut",
                    self.formData,
                    onSuccess,
                    onFinally
                  );
              }
            });  
    },

    loadIncidents() {
      const self = this;
      self.showLoadingOnElement("dataTable", 1, "radius");

      var onSuccess = function(response) {
        self.incidents = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.dataTable.$el);
      };
      self.$ajaxGet(
        self,
        "SalesSeeker/GetIncidentCallOut?AccountID=1",
        onSuccess,
        onFinally
      );
    },
    
  }
};
</script>

   