<template> 
  <div class="vx-row">
    <div class="vx-col w-full">
      <vx-card
        class="pb-3"
        title="FAMS Data Imports">
        <vs-tabs v-model="activeTab" style="width: auto; min-height:500px">
          <vs-tab class="p-6" v-model="dataImportType.id" label="Import data file" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
              <label>Import Data File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="pond"
                    :server='uploadLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @processfile="processDataFile"
                    @removefile="fileRemoved"/>
                </div>
              </div>
            </div>        
          </vs-tab>
          <vs-tab label="Import raw data" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3">
              <label>Import Data File</label>
                <div>
                  <vs-textarea style="min-height:500px;background-color:white;" class="text-block" v-model="rawData"/>
                  <vs-button class="rounded-lg vs-con-loading__container" @click="uploadRawData" ref="importB">Upload</vs-button>
                </div>
              </div>
            </div>   
          </vs-tab>
          <vs-tab label="Import Equipment file" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <vs-button ref="eqpFile" @click="getEqpFile" class="rounded-lg mr-2 vs-con-loading__container">Download Existing Equipment</vs-button>
                <vs-button class="rounded-lg vs-con-loading__container" ref="eqptemp" @click="getEqpTemplateFile">Download Equipment Template</vs-button>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <vs-divider></vs-divider>   
              </div>
              <div class="vx-col w-full p-3 mt-3">
                <label>Import New Equipment</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="newEqpPond"
                    class="vs-con-loading__container"
                    :server='uploadNewEqpLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @processfile="processNewEqpData"
                    @removefile="fileRemoved"/>
                </div>
              </div>             
              <div class="vx-col w-full p-3 mt-3">
                <label>Import Existing Equipment</label>
                <file-pond
                  id="filepond"
                  ref="eqpPond"
                  class="vs-con-loading__container"
                  :server='uploadEqpLocation'
                  label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                  :allow-multiple="true"
                  :instant-upload="true"
                  :allow-image-preview="true"
                  @processfile="processEqpData"
                  @removefile="fileRemoved"/>
              </div> 
            </div>   
          </vs-tab>
          <vs-tab label="Import Equipment parameter file" style="min-height:500px">
            <div class="vx-row pb-3">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>Store</label>
                <v-select
                  ref="storeDropdown"
                  class="w-full"
                  placeholder="Search / Select Store"
                  :options="storeData"
                  v-model="storeDropDown"
                ></v-select>
              </div>  
            </div>  
            <vs-button class="rounded-lg vs-con-loading__container" ref="storeparam" @click="getEqpParameters">Download Store's Parameters</vs-button>
            <vs-divider></vs-divider>
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>Store</label>
                <v-select
                  ref="storeDropdown"
                  class="w-full"
                  placeholder="Search / Select Store"
                  :options="storeData2"
                  v-model="storeDropDown2"
                ></v-select>
              </div>
              <div class="vx-col w-full p-3 mt-3">
              <label>Import Data File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="pond"
                    :server='uploadEqpParamLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @error = "handleFilePondError"
                    @processfile="processEqpParameterData"
                    @removefile="fileRemoved"/>
                </div>
              </div>
            </div> 
          </vs-tab>
          <vs-tab label="Import Employee file" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <vs-button ref="extOperator" @click="getOperatorFile" class="rounded-lg mr-2 vs-con-loading__container">Download Existing Employees</vs-button>
                <vs-button class="rounded-lg vs-con-loading__container" ref="tempOperator" @click="getOperatorTemplateFile">Download Employee Template</vs-button>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <vs-divider></vs-divider>   
              </div>
              <div class="vx-col w-full p-3 mt-3">
              <label>Import New Employees File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="newPond"
                    class="vs-con-loading__container"
                    :server='uploadNewOperatorLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @processfile="processNewOperatorData"
                    @removefile="fileRemoved"/>
                </div>
              </div>
              <div class="vx-col w-full p-3 mt-3">
              <label>Import Update Employees File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="pond"
                    class="vs-con-loading__container"
                    :server='uploadOperatorLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @processfile="processOperatorData"
                    @removefile="fileRemoved"/>
                </div>
              </div>
            </div>   
          </vs-tab>
          <vs-tab label="Import Allocation file" style="min-height:500px">
            <vs-button class="rounded-lg vs-con-loading__container" ref="tempAllocation" @click="getAllocationTemplateFile">Download Allocation Template</vs-button>
            <div class="vx-row pb-3">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>Store</label>
                <v-select
                  ref="storeDropdown"
                  class="w-full"
                  placeholder="All"
                  :options="storeData3"
                  v-model="storeDropDown3"
                ></v-select>
              </div>  
            </div>  
            <vs-button class="rounded-lg vs-con-loading__container" ref="extAllocation" @click="getStoresAllocation">Download Store's Allocation(s)</vs-button>
            <vs-divider></vs-divider>
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>Store</label>
                <v-select
                  ref="storeDropdown"
                  class="w-full"
                  placeholder="All"
                  :options="storeData4"
                  v-model="storeDropDown4"
                ></v-select>
              </div>
              <div class="vx-col w-full p-3 mt-3">
              <label>Import New Alllocation File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="allocationNewPond"
                    :server='uploadNewAllocationLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @error = "handleFilePondError"
                    @processfile="processNewAllocationData"
                    @removefile="fileRemoved"/>
                </div>
              </div>
              <div class="vx-col w-full p-3 mt-3">
              <label>Import Update Allocation File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="allocationPond"
                    :server='uploadAllocationLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @error = "handleFilePondError"
                    @processfile="processAllocationData"
                    @removefile="fileRemoved"/>
                </div>
              </div>
            </div> 
          </vs-tab>
          <vs-tab label="Import Equipment Detail file" style="min-height:500px">
            <div class="vx-row pb-3 mt-4">
              <vs-button class="rounded-lg vs-con-loading__container" ref="eqpDetail" @click="getEqpDetails">Download Equipment's Details</vs-button>
            </div>  
            <vs-divider></vs-divider>
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
              <label>Import Data File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="pond"
                    :server='uploadEqpDetailLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @error = "handleFilePondError"
                    @processfile="processEqpDetailData"
                    @removefile="fileRemoved"/>
                </div>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Import Employee Detail file" style="min-height:500px">
            <div class="vx-row pb-3 mt-4">
              <vs-button class="rounded-lg vs-con-loading__container" ref="eqpDetail" @click="getOperatorDetails">Download Employee's Details</vs-button>
            </div>  
            <vs-divider></vs-divider>
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
              <label>Import Data File</label>
                <div id="app">
                  <file-pond
                    id="filepond"
                    ref="pond"
                    :server='uploadOperatorDetailLocation'
                    label-idle="Drop document here or <span class='filepond--label-action'>Browse</span>"
                    :allow-multiple="true"
                    :instant-upload="true"
                    :allow-image-preview="true"
                    @error = "handleFilePondError"
                    @processfile="processOperatorDetailData"
                    @removefile="fileRemoved"/>
                </div>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </vx-card>
    </div>  

        <vx-card title="AuditLog" class="mt-3 p-3">
          <div slot="no-body" class="mt-4">
            <vs-table 
              pagination
              max-items="5"
              :data="auditLog" 
              class="table-dark-inverted">
              <template slot="thead">
                <vs-th>Username</vs-th>
                <vs-th>Audit Type</vs-th>
                <vs-th>Table Name</vs-th>
                <vs-th>Column Name</vs-th>
                <vs-th>Old Value</vs-th>
                <vs-th>New Value</vs-th>
                <vs-th>Date</vs-th>
              </template>

              <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.username">{{ tr.username}}</vs-td>
                <vs-td :data="tr.auditType">{{ tr.auditType}}</vs-td>
                <vs-td :data="tr.tableName">{{ tr.tableName}}</vs-td>
                <vs-td :data="tr.columnName">{{ tr.columnName }}</vs-td>
                <vs-td :data="tr.oldValue">{{ tr.oldValue }}</vs-td>
                <vs-td :data="tr.newValue">{{ tr.newValue }}</vs-td>
                <vs-td :data="tr.date">{{   formatDate(tr.date.replace("T", " ").split('.')[0])}}</vs-td>
              </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
    <vs-popup
      id="uploadnotify"
      title="An error while Uploading"
      :active.sync="unProcessed"
      ref="datanotify">
      <vs-table
        ref="gridTable"
        pagination
        search
        :data="unProcessedData"
        class="vs-con-loading__container"
      >
            <template slot="thead">
              <vs-th sort-key="Line Number">Line Number</vs-th>
              <vs-th sort-key="Text">Text</vs-th>
              <vs-th sort-key="Exception">Exception</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" :state="tr.text ? 'danger' : null">
                <vs-td :data="tr.lineNumber">{{ tr.lineNumber}}</vs-td>
                <vs-td :data="tr.text">{{ tr.text}}</vs-td>
                <vs-td :data="tr.exceptionMessage">{{tr.exceptionMessage}}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <div class="vx-row">
          <vs-spacer/>
          <div class="vx-col">
            <vs-button class="rounded-lg " @click="downloadUnprocessed">Download Unprocessed</vs-button>
          </div>
        </div>
    </vs-popup>
  </div>
</template>
<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import moment from "moment";
import VxCard from "../../../components/vx-card/VxCard.vue";
import vueFilePond from 'vue-filepond';import 'filepond/dist/filepond.min.css';import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
export default {name: 'app',
  data() {
    return {
    myFiles:"",
    rawData:"",
    itemsPerPage: 10,
    isMounted: false,
    unProcessedData:[],
    unProcessed: false,
    dataProcessed:"",
    dataString:'',
    storeData: [],
    storeDropDown: 0,
    storeData2: [],
    storeDropDown2: 0,
    storeData3: [],
    storeDropDown3: 0,
    storeData4: [],
    storeDropDown4: 0,
    header: ["Line Number","Text","Exception"],
    auditLog:[],
    dataImportType: [],
    activeTab: 0
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VxCard,
    FilePond,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
    uploadLocation: {
      get() {
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 1}`);
      }
    },
    uploadEqpLocation: {
      get() {
        return this.$buildUrl(`StageTable/StageDataEqpUpload?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 1}`);
      }
    },
    uploadNewEqpLocation: {
      get() {
        return this.$buildUrl(`StageTable/StageDataEqp?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 10}`);
      }
      //xxxxxx
    },
    uploadEqpParamLocation: {
      
      get() { 
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 1}`);
      }
    },
    uploadOperatorLocation: {
      get() {
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 1}`);
      }
    },
    uploadNewOperatorLocation: {
      get() {
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 10}`);
      }
    },
    uploadAllocationLocation: {
      get() {
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 1}`);
      }
    },
    uploadNewAllocationLocation: {
      get() {
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 10}`);
      }
    },
    uploadEqpDetailLocation: {
      get() { 
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 1}`);
      }
    },
    uploadOperatorDetailLocation: {
      get() { 
        return this.$buildUrl(`StageTable/StageData?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${this.activeTab + 1}`);
      }
    },
  },
  mounted() {
    this.getStore();
    this.getAuditLog();
    this.getDataImportType();
  },
  watch:{
    // rawData(val) {
    //   this.rawData = val.replace(/(?:\r\n|\r|\n)/g, "<br>");
    // },
  },
  methods: {
    successLoadFuelMovement() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
    },
    handleFilePondError(){
    },
    processDataFile(){
      var self = this;
      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.pond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
      };
      self.$ajaxPost(
        self,
        `DataIntegrity?accountId=${localStorage.getItem('userAccountId')}&dataImportTypeId=${self.activeTab + 1}`,
        onSuccess,
        onFinally
      )
    },
    processEqpData(){
      var self = this;
      self.showLoadingOnElement("eqpPond", 1, "radius");
      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function (response) {
        self.$refs.eqpPond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
        self.$vs.loading.close(self.$refs.eqpPond.$el);
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadEqp?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${self.activeTab + 1}`,
        onSuccess,
        onFinally
      )
    },    
    processNewEqpData(){
      var self = this;
      self.showLoadingOnElement("newEqpPond", 1, "radius");
      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function (response) {
        self.$refs.newEqpPond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
        self.$vs.loading.close(self.$refs.newEqpPond.$el);
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadNewEqp?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${self.activeTab + 10}`,
        onSuccess,
        onFinally
      )
    },    
    processEqpParameterData(error, file){
      var self = this;
      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.pond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadEqpParam?accountId=${localStorage.getItem('userAccountId')}&storeId=${this.storeDropDown2.value > 0 ? this.storeDropDown2.value : 0}&dataImportTypeId=${self.activeTab + 1}`,
        onSuccess,
        onFinally
      )
    },
    processOperatorData(){
      var self = this;
      self.showLoadingOnElement("pond", 1, "radius");
      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.pond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
        self.$vs.loading.close(self.$refs.pond.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadOperator?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${self.activeTab + 1}`,
        onSuccess,
        onFinally
      )
    },
    processNewOperatorData(){
      var self = this;
      self.showLoadingOnElement("newPond", 1, "radius");
      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.newPond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
        self.$vs.loading.close(self.$refs.newPond.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadNewOperator?accountId=${localStorage.getItem('userAccountId')}&userId=${JSON.parse(sessionStorage.roles).id}&dataImportTypeId=${self.activeTab + 10}`,
        onSuccess,
        onFinally
      )
    },
    downloadUnprocessed(){
      var j = "";
      this.unProcessedData.forEach(myFunction);
      function myFunction(item, index) {
        j = j + item.text + "\n";
      }
      
      this.downloadFile('LinesNotProcessed', j)
    },
    uploadCompleteMessag(txt){
        this.$vs.notify({
        title: "Successfully",
        text: "Information successfully Uploaded. " + txt,
        color: "success",
      });
    },
    fileRemoved(){

    },
    uploadRawData(){
      var self =this;
      
      if(self.rawData == '') {
        alert("Import area cannot be empty")
        return;
      }
      self.rawData = self.rawData.replace(/(?:\r\n|\r|\n)/g, "-");

      if((self.rawData.replace(/(?:\r\n|\r|\n)/g, "-").length < 30) || !self.rawData.replace(/(?:\r\n|\r|\n)/g, "-").includes('-')) {
        alert("Import data is incorrect length or format")
        return;
      }

      var obj = {
        rawData: self.rawData.replace(/(?:\r\n|\r|\n)/g, "-")
      };
      
      self.showLoadingOnElement("importB", 1, "radius");
      var onSuccess = function(response) {
      };
      var onFinally = function(response){
        if(response.status == 200) 
        {
          self.uploadCompleteMessag(response.data.message);
          self.rawData = "";
        }
        self.$vs.loading.close(self.$refs.importB.$el);
      };
      self.$ajaxPost(self,`DataIntegrity/ImportRawData`, obj, onSuccess, onFinally);
      self.$vs.loading.close(self.$refs.importB.$el);
    },
    getEqpFile(){
      var self = this;
      self.showLoadingOnElement("eqpFile", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.eqpFile.$el);
        self.downloadFile('EQPExisting', self.dataString)
      };
      self.$ajaxGet(
        self,
        "DataIntegrity/GetEqpExt",
        onSuccess,
        onFinally
      )
    },
    getEqpTemplateFile(){
      var self = this;
      self.showLoadingOnElement("eqptemp", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.eqptemp.$el);
          self.downloadFile('EQPTemplate', self.dataString)
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetEqpTemplateFile`,
        onSuccess,
        onFinally
      )
    },
    getEqpParameters(){
      var self = this;
      self.showLoadingOnElement("storeparam", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.storeparam.$el);
        self.downloadFile('EQPParameters_' + self.storeDropDown.label, self.dataString)
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetPerEqpStore?storeId=${self.storeDropDown.value}`,
        onSuccess,
        onFinally
      )
    },
    getOperatorFile(){
      var self = this;
      self.showLoadingOnElement("extOperator", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.extOperator.$el);
        self.downloadFile('OperatorExisting', self.dataString)
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetOperatorFile`,
        onSuccess,
        onFinally
      )
    },
    getOperatorTemplateFile(){
      var self = this;
      self.showLoadingOnElement("tempOperator", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.tempOperator.$el);
        self.downloadFile('OperatorTemplate', self.dataString)
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetOperatorTemplateFile`,
        onSuccess,
        onFinally
      )
    },
    downloadFile(fileName, data){
      var blob = new Blob([data], {type: 'text/plain'});
      var anchor = document.createElement('a');

      anchor.download = fileName + (new Date()).getMilliseconds() + ".CSV";
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
      anchor.click();
    },
    getStore(){
      var self = this;
      //self.showLoadingOnElement("getstores", 1, "radius");
      var onSuccess = function(response) {
        self.storeData = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.storeData2 = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.storeData3 = response.data.map((item) => {return {label: item.name, value: item.id}});
        self.storeData4 = response.data.map((item) => {return {label: item.name, value: item.id}});
      };      
      var onFinally = function(){
        //self.$vs.loading.close(self.$refs.getstores.$el);
      };
      self.$ajaxGet(self,"Stores/GetStoreForManualEntry",onSuccess, onFinally);
    },
    getAuditLog(){
      var self = this;
      var onSuccess = function (response) {
        self.auditLog = response.data;
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetAuditLog`,
        onSuccess,
        onFinally
      );
    },
    getDataImportType(){
      var self = this;
      var onSuccess = function (response) {
        self.dataImportType = response.data;//.map((item) => {return {label: item.name, value: item.id}});
      };
      var onFinally = function () {
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetDataImortType`,
        onSuccess,
        onFinally
      );
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    successNotifyGridExpanded() {
      this.$vs.notify({
        title: "Grid - Successfully",
        text: "Grid expanded / closed",
        color: "warning",
      });
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully Uploaded",
        color: "success",
      });
    },
    FailedNotify() {
      this.$vs.notify({
        title: "Not Successfull",
        text: "Item not added",
        color: "danger",
      });
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    processNewAllocationData(error, file){
      var self = this;
      self.showLoadingOnElement("allocationNewPond", 1, "radius");
      
      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.allocationNewPond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
        self.$vs.loading.close(self.$refs.allocationNewPond.$el);
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadNewAllocation?&storeId=${this.storeDropDown4 ? this.storeDropDown4.value : 0}&dataImportTypeId=${self.activeTab + 10}`,
        onSuccess,
        onFinally
      )
    },
    processAllocationData(error, file){
      var self = this;
      self.showLoadingOnElement("allocationPond", 1, "radius");
      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.allocationPond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
        self.$vs.loading.close(self.$refs.allocationPond.$el);
      };
      
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadAllocation?&storeId=${this.storeDropDown4 ? this.storeDropDown4.value : 0}&dataImportTypeId=${self.activeTab + 1}`,
        onSuccess,
        onFinally
      )
    },
    getAllocationTemplateFile(){
      var self = this;
      self.showLoadingOnElement("tempAllocation", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.tempAllocation.$el);
        self.downloadFile('AllocationTemplate', self.dataString)
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetAllocationTemplateFile`,
        onSuccess,
        onFinally
      )
    },
    getStoresAllocation(){
      var self = this;
      self.showLoadingOnElement("extAllocation", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.extAllocation.$el);
        self.downloadFile('AllocationExisting', self.dataString)
      };
      
      self.$ajaxGet(
        self,
        `DataIntegrity/GetStoresAllocation?&storeId=${this.storeDropDown3 ? this.storeDropDown3.value : 0}`,
        onSuccess,
        onFinally
      )
    },    
    processEqpDetailData(error, file){
      var self = this;

      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.pond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadEqpDetail?accountId=${localStorage.getItem('userAccountId')}&dataImportTypeId=${self.activeTab + 1}`,
        onSuccess,
        onFinally
      )
    },
    getEqpDetails(){
      var self = this;
      // self.showLoadingOnElement("storeparam", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.storeparam.$el);
        self.downloadFile('EQPDetail', self.dataString)
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetEqpDetails`,
        onSuccess,
        onFinally
      )
    },
    getOperatorDetails(){
      var self = this;
      // self.showLoadingOnElement("storeparam", 1, "radius");

      var onSuccess = function (response) {
        self.dataString = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.storeparam.$el);
        self.downloadFile('OperatorDetail', self.dataString)
      };
      self.$ajaxGet(
        self,
        `DataIntegrity/GetOperatorDetails`,
        onSuccess,
        onFinally
      )
    },
    processOperatorDetailData(error, file){
      var self = this;

      var onSuccess = function (response) {
        self.unProcessedData = response.data;
      };
      var onFinally = function (response) {
        self.$refs.pond.removeFile();
        self.unProcessedData = response.data;
        self.unProcessedData != '' ? self.unProcessed = true : self.unProcessed = false;
      };
      self.$ajaxPost(
        self,
        `DataIntegrity/UploadOperatorDetail?accountId=${localStorage.getItem('userAccountId')}&dataImportTypeId=${self.activeTab + 1}`,
        onSuccess,
        onFinally
      )
    },
  },
};
</script>
<style lang="scss">
#background{
  .con-img-upload{
    background-color: #67676759 !important;
  }
}
#app{
  #filepond{
    .filepond--drop-label{
      background-color: #FF9F43 !important;
      border-radius: 10px !important;
      color: white !important;
      font-size: 15px
    }
  }
}

#uploadnotify div.vs-popup {
    width: 1100px !important;
  }

  .con-vs-tabs .con-ul-tabs {
    overflow-y: hidden;
    overflow-x: scroll;
  }
// 
// #text-block {
//     // white-space: pre; // or pre-line
//     
// }

.vs-textarea{
  height: 450px !important;
}
</style>
