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
               <div class="vx-col md:w-1/2 w-full mt-5">
                    <v-select class="w-full" placeholder="Search / Select Business developer"  :options="SalesRepDropdown"  
                     v-model="SalesRep"  @search:blur="populateDataSalesRep"
                     name ="Activity" v-validate="'required'" />
                     <span class="text-danger text-sm" v-show="errors.has('Activity')" >{{ errors.first('Activity') }}</span>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-5">
                    <datepicker
                      class="w-full"
                      id="createdate"
                      placeholder="Daily Report of Call Date"
                      v-model="formData.createDate"
                      format="yyyy-MM-dd"
                      name ="Report of Call Date" v-validate="'required'"
                    ></datepicker>
                    <span class="text-danger text-sm" v-show="errors.has('Report of Call Date')" >{{ errors.first('Report of Call Date') }}</span>
                </div>
              </div>
              <br>
              <div class="vx-row">
                <div class="vx-col md:w-1/3 w-full mt-2">
                    <v-select class="w-full" placeholder="Search / Select Activity Type"  :options="SalesRepActivityTypeDropdown"
                     v-model="SalesRepActivityType"  @search:blur="populateDataActivityType"
                     name ="Activity" v-validate="'required'" />
                     <span class="text-danger text-sm" v-show="errors.has('Activity')" >{{ errors.first('Activity') }}</span>
                </div>
                <div class="vx-col md:w-1/3 w-full mt-2">
                    <v-select class="w-full" placeholder="Search / Select customer segment"  :options="SalesRepCustomerSegmentDropdown"  
                     v-model="SalesRepCustomerSegment"  @search:blur="populateDataCustomerSegment"
                     name ="Segment" v-validate="'required'" />
                     <span class="text-danger text-sm" v-show="errors.has('Segment')" >{{ errors.first('Segment') }}</span>
                </div>  
                 <div class="vx-col md:w-1/3 w-full mt-2">
                    <v-select class="w-full" placeholder="Search / Select Province"  :options="provinceDropdown"  
                     v-model="province"  @search:blur="populateDataProvince"
                     name ="Province" v-validate="'required'" />
                     <span class="text-danger text-sm" v-show="errors.has('Province')" >{{ errors.first('Province') }}</span>
                </div>  
              </div>
              <br>
              <div class="vx-row">
                <div class="vx-col sm:w-1/3 w-full mb-2">
                  <vs-input class="w-full" placeholder="Customer's Information" v-model="formData.customer"  icon-pack="feather" icon="icon-user"
                    name ="Customer Information" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('Customer Information')" >{{ errors.first('Customer Information') }}</span>

                </div>
                <div class="vx-col sm:w-1/3 w-full mb-2">
                   <vs-input class="w-full" placeholder="Customer Contact information" v-model="formData.contact"  icon-pack="feather" icon="icon-smartphone"
                      name ="Customer Contact information" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('Customer Contact information')" >{{ errors.first('Customer Contact information') }}</span>
                </div>
                <div class="vx-col sm:w-1/3 w-full mb-2">
                   <vs-input class="w-full" placeholder="Customer Contact email address" v-model="formData.email"  icon-pack="feather" icon="icon-at-sign"
                      name ="Customer Contact email address" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('Customer Contact email address')" >{{ errors.first('Customer Contact email address') }}</span>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col sm:w-1/8 w-full mb-2">
                      <vs-textarea placeholder="Customer description" v-model="formData.description" icon-pack="feather"  icon="icon-hash" 
                       name ="description" v-validate="'required'"/>
                  <span class="text-danger text-sm" v-show="errors.has('description')" >{{ errors.first('description') }}</span>
                </div>
              </div>
               <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                     <flat-pickr :config="configdateTimePicker" v-model="formData.timeIn" placeholder="Choose Intime" class="w-full" />
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                     <flat-pickr :config="configdateTimePicker" v-model="formData.timeOut" placeholder="Choose Outime" class="w-full" />
                </div>
              </div>

               <div class="vx-row">
                  <div class="vx-col sm:w-1/8 w-full mb-2">
                        <vs-textarea placeholder="comment" v-model="formData.comment" name ="comment" v-validate="'required'"/>
                      <span class="text-danger text-sm" v-show="errors.has('comment')" >{{ errors.first('comment') }}</span>
                  </div>
              </div>

              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button id="addInfo" class="rounded-lg mr-3 mb-2" @click="SubmitData" v-show="!isAddHidden">Submit</vs-button>
                  <vs-button id="editInfo" class="rounded-lg mr-3 mb-2" @click="editData" v-show="!isUpdateHidden">Edit</vs-button>
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
          :data="dailyReportCall"
          class="vs-con-loading__container"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
            <!-- ADD NEW -->
            <div
              ref="addNew"
              class="p-3 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
              @click="addVue"
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
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ dailyReportCall.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : dailyReportCall.length }} of {{ dailyReportCall.length }}</span>
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
            <vs-th sort-key="salesRep">Business Developer</vs-th>
            <vs-th sort-key="createDate">Date</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <!-- visible: false -->
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.salesRep">{{tr.salesRep}}</vs-td>
              <vs-td :data="tr.createDate">{{formatDate(tr.createDate.replace("T", " ").split('.')[0])}}</vs-td>
            
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
                  @click.stop="editVue(tr)"
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
        id: 0,
        aID: 0,
        account: '',
        sID: 0,
        salesRep: '',
        createDate: '',
        tID: 0,
        type: '',
        segID: 0,
        segment: '',
        pID: 0,
        province: '',
        customer: '',
        contact: '',
        email: '',
        description:'',
        timeIn:'',
        timeOut:'',
        comment:'ssssssssss'
      },
      
        configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true
        },
      data:{},
      isAddHidden: false,
      isUpdateHidden: false,
      statusPromptActive: false,
      mydata:'',
      dailyReportCall: [],
      fromdate: null,
      isInfoHidden: true,
      isListHidden: false,    
      itemsPerPage: 10,
      selected: [],
      isMounted:null,

      SalesRepActivityTypeDropdown:[],
      SalesRepActivityType:'',
      SalesRepCustomerSegmentDropdown:[],
      SalesRepCustomerSegment:'',
      SalesRepDropdown:[],
      SalesRep:'',
      provinceDropdown:[],
      province:''

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
    this.loadData();
    this.loadSalesRepActivityType() ;
    this.loadSalesRepCustomerSegment();
    this.loadSalesRepInformation();
    this.loadProvince();
    this.isMounted = true;
  },
  methods: {
//**********************************System**************************************************** */
    populateDataActivityType() {
      var self = this;
      if (self.SalesRepActivityType) {
          self.formData.tID = self.SalesRepActivityType.value;
          self.formData.type = self.SalesRepActivityType.label;
        }
      },
  populateDataCustomerSegment() {
    var self = this;
    if (self.SalesRepCustomerSegment) { 
        self.formData.segID = self.SalesRepCustomerSegment.value;
        self.formData.segment = self.SalesRepCustomerSegment.label;
      }
  },
  populateDataSalesRep() {
    var self = this;
    if (self.SalesRep) {
        self.formData.sID = self.SalesRep.value;
        self.formData.salesRep = self.SalesRep.label;
      }
  },
 populateDataProvince() {
    var self = this;
    if (self.province) {
        self.formData.pid = self.province.value;
        self.formData.province = self.province.label;
      }
  },

  successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
 
  showStatusPrompt(data) {
       var self = this;
       self.mydata = "http://localhost:62620/ReportViewer.aspx?dailyreport=" + data.id
       self.statusPromptActive = true;
    },

    initValues() {
          var self = this;
          self.formData.id= 0;
          self.formData.aID= 1;
          self.formData.account='';
          self.formData.sID= 0;
          self.formData.salesRep='CSD';
          self.formData.createDate='';
          self.formData.tID= 0;
          self.formData.type='';
          self.formData.segID= 0;
          self.formData.segment='';
          self.formData.pID= 0;
          self.formData.province='';
          self.formData.customer='';
          self.formData.contact='';
          self.formData.email='';
          self.formData.description = '',
          self.formData.timeIn= '',
          self.formData.timeOut= '',
          self.formData.comment= '',
          self.isAddHidden = true,
          self.isUpdateHidden = true
      },
     cancelAdd() {
        this.initValues();
        this.isInfoHidden = true;
        this.isListHidden = false,
        this.loadData();
      },

    addVue() {
        this.initValues();
        this.isAddHidden = false;
        this.isUpdateHidden = true;
        this.isInfoHidden = false;
        this.isListHidden = true
    },
    editVue(data) {
      var self = this;
      self.isInfoHidden = false;
      self.isListHidden = true;
      self.isAddHidden = true;
      self.isUpdateHidden = false;

      self.formData.id= data.id;
      self.formData.aID=data.aID;
      self.formData.account=data.account;
      self.formData.sID= data.sID;
      self.formData.salesRep=data.salesRep;
      self.SalesRep=data.salesRep;

      self.formData.createDate=data.createDate;
      self.formData.tID= data.tID;
      self.formData.type=data.type;
      self.SalesRepActivityType=data.type;
      self.formData.segID= data.segID;
      self.formData.segment=data.segment;
      self.SalesRepCustomerSegment=data.segment;
      self.formData.pID= data.pID;
      self.formData.province=data.province;
      self.province=data.province;
      self.formData.customer=data.customer;
      self.formData.contact=data.contact;
      self.formData.email=data.email;
      self.formData.description = data.description;

      self.formData.comment = data.comment;
      self.formData.timeIn = data.timeIn;
      self.formData.timeOut = data.timeOut;
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

    deleteData(data) {
       var self = this; 
      self.showLoadingOnElement("dataTable", 1, "radius");
      var onSuccess = function(response) {
        self.isInfoHidden = true;
        self.isListHidden = false,
        self.initValues();
        self.loadData();
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.dataTable.$el);
        self.successNotify();   
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/RemoveSalesRepDailyReport",
        data,
        onSuccess,
        onFinally
      );
    },

  SubmitData() {
      this.$validator.validateAll().then(result => {
              if (result) {
                const self = this;
                  self.showLoadingOnElement("dataTable", 1, "radius");
                  var onSuccess = function(response) {
                    self.isInfoHidden = true;
                    self.isListHidden = false,
                    self.initValues();
                    self.loadData();
                  };
                  var onFinally = function() {
                    self.$vs.loading.close(self.$refs.dataTable.$el);
                    self.successNotify();
                
                  };
                  self.$ajaxPost(
                    self,
                    "SalesSeeker/AddSalesRepDailyReport",
                    self.formData,
                    onSuccess,
                    onFinally
                  );
              }
            });  
      },
    editData(){
         this.$validator.validateAll().then(result => {
              if (result) {
                const self = this;
                  self.showLoadingOnElement("dataTable", 1, "radius");
                  var onSuccess = function(response) {
                    self.isInfoHidden = true;
                    self.isListHidden = false,
                    self.initValues();
                    self.loadData();
                  };
                  var onFinally = function() {
                    self.$vs.loading.close(self.$refs.dataTable.$el);
                    self.successNotify();
                
                  };
                  self.$ajaxPost(
                    self,
                    "SalesSeeker/UpdateSalesRepDailyReport",
                    self.formData,
                    onSuccess,
                    onFinally
                  );
              }
            });  
    },

    loadData() {
      const self = this;
      self.data.aid = 1;
      self.showLoadingOnElement("dataTable", 1, "radius");
     var onSuccess = function(response) {
        self.dailyReportCall = response.data;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.dataTable.$el);
      };
      self.$ajaxPost(
        self,
        "SalesSeeker/GetSalesRepDailyReportGrid",
        self.data,
        onSuccess,
        onFinally
      );
    },
    loadSalesRepActivityType() {
          const self = this;
          // self.showLoadingOnElement("customerTable", 1, "radius");
          var onSuccess = function(response) {
            self.SalesRepActivityTypeDropdown = response.data.map(function(item) {
              //return { text: item.customer, value: item.id };
              return { label: item.description, value: item.id };
            });
          };
          var onFinally = function() {
            // self.$vs.loading.close(self.$refs.categorySelect.$el);
          };
          self.$ajaxGet(
            self,
            "SalesSeeker/SP_JsonResult?storeproc=CRUD_SalesRepActivityType_Get&parameters=1",
            onSuccess,
            onFinally
          );
        },
      loadSalesRepCustomerSegment() {
        const self = this;
        // self.showLoadingOnElement("customerTable", 1, "radius");
        var onSuccess = function(response) {
          self.SalesRepCustomerSegmentDropdown = response.data.map(function(item) {
            //return { text: item.customer, value: item.id };
            return { label: item.name, value: item.id };
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "SalesSeeker/SP_JsonResult?storeproc=CRUD_SalesRepCustomerSegment_Get&parameters=1",
          onSuccess,
          onFinally
        );
      },
      loadSalesRepInformation() {
        const self = this;
        // self.showLoadingOnElement("customerTable", 1, "radius");
        var onSuccess = function(response) {
          self.SalesRepDropdown = response.data.map(function(item) {
            //return { text: item.customer, value: item.id };
            return { label: item.rep, value: item.id };
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "SalesSeeker/SP_JsonResult?storeproc=CRUD_Salesrep_Get&parameters=1",
          onSuccess,
          onFinally
        );
      },
       loadProvince() {
        const self = this;
        // self.showLoadingOnElement("customerTable", 1, "radius");
        var onSuccess = function(response) {
          self.provinceDropdown = response.data.map(function(item) {
            //return { text: item.customer, value: item.id };
            return { label: item.name, value: item.id };
          });
        };
        var onFinally = function() {
          // self.$vs.loading.close(self.$refs.categorySelect.$el);
        };
        self.$ajaxGet(
          self,
          "SalesSeeker/SP_JsonResult?storeproc=CRUD_Province_Get&parameters=1",
          onSuccess,
          onFinally
        );
      },
    
  }
};
</script>
