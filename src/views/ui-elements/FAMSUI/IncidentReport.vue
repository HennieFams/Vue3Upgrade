<!-- =========================================================================================
    File Name: Subscription.vue
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
    <vx-card v-show="!viewIncident">
      <vs-table  ref="incidentReportGrid" stripe class="vs-con-loading__container" single pagination :max-items="20" search :data="incidentReports">
        <template slot="header">
          <h3>
            Incidents Reported
          </h3>
        </template>
        <template slot="thead">
          <!-- <vs-th v-show="showAccountName">
            Account
          </vs-th> -->
          <vs-th>
            Title
          </vs-th>
          <vs-th>
            Description
          </vs-th>
          <vs-th>
            Created By
          </vs-th>
          <vs-th>
            Created On
          </vs-th>
          <vs-th>
          </vs-th>

        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <!-- <vs-td  v-if="showAccountName" :data="data[indextr].account.name">
                 {{data[indextr].account.name}}
            </vs-td> -->
            <vs-td :data="data[indextr].title">
              {{data[indextr].title}}
            </vs-td>

            <vs-td :data="data[indextr].description">
              {{data[indextr].description}}
            </vs-td>

            <vs-td :data="data[indextr].createdBy">
              {{data[indextr].createdBy}}
            </vs-td>

            <vs-td :data="data[indextr].createDate">
              {{data[indextr].createDate.replace("T"," ").split('.')[0]}}
            </vs-td>

            <vs-td>
              <vx-tooltip class="flex" text="View Attachments">
                <feather-icon icon="PaperclipIcon" @click="viewAttachments(data[indextr].incidentReportAttachment)" class="gridIcon"/>
              </vx-tooltip>
              
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    
    
    </vx-card>
    <vx-card v-show="viewIncident">
      <vs-table  ref="incidentReportGrid" stripe class="vs-con-loading__container" single pagination :max-items="20" search :data="attachments">
        <template slot="header">
          <h3>
            Incidents Attachments
          </h3>
        </template>
        <template slot="thead">
          
          <vs-th>
            Description
          </vs-th>
          <vs-th>
            created By
          </vs-th>
          <vs-th>
            Created On
          </vs-th>
          <vs-th>
            Url
          </vs-th>
          <vs-th>
          </vs-th>

        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            
            <vs-td :data="data[indextr].description">
              {{data[indextr].description}}
            </vs-td>
            <vs-td :data="data[indextr].createdBy">
              {{data[indextr].createdBy}}
            </vs-td>
            <vs-td :data="data[indextr].createdOn">
              {{data[indextr].createdOn.replace("T"," ").split('.')[0]}}
            </vs-td>
            <vs-td :data="data[indextr].attachmentUrl" style="width:100px">
              {{data[indextr].attachmentUrl}}
            </vs-td>
            <vs-td style="float:left">
              <vx-tooltip class="flex" text="View/Download Attachment">
              <feather-icon icon="EyeIcon"  @click="viewIncidentAttachment(data[indextr].attachmentUrl)" class="gridIcon"/>
              </vx-tooltip>
              
            </vs-td>
          </vs-tr>
            
        </template>
        
      </vs-table>
      <vs-button @click="cancelAttachments()" style="    border-radius: 11px;">Cancel</vs-button>
    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { color } from '@amcharts/amcharts4/core';
import FeatherIcon from '../../../components/FeatherIcon.vue';

export default {
  data() {
    return {
      viewIncident:false,
      showAccountName:false,
      incidentReports:[],
      attachments:[]
    };
  },
  
  components: {
    flatPickr,
    "v-select": vSelect,
    FeatherIcon,
  },
  computed: {
    
  },
  watch: {
    
  },

  methods: {
  cancelAttachments(){
    var self = this;
    self.viewIncident = false;
    self.attachments = null
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
    viewIncidentAttachment(url){
      self = this;
      window.open(url,"_blank")
    },

    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },

    viewAttachments(attachments){
      var self = this;
      self.attachments = attachments;
      self.viewIncident = true;
    },

    initValues(){
     
    },

    getIncidentsReported(){
      var self = this;
      self.showLoadingOnElement("incidentReportGrid",1,"corners");
      var onSuccess = function(response) {
        // if(response.data[0].account == null){
        //   self.showAccountName = false;
        // }
        // else{
        //   self.showAccountName = true
        // }
          self.incidentReports = response.data
      };
    
      var onFinally = response =>{
        if(self.$refs.incidentReportGrid){
          self.$vs.loading.close(self.$refs.incidentReportGrid.$el);
        }
      }
    
     self.$ajaxGet(
          self,
          "IncidentReport/viewAccountIncidentsReported",
          onSuccess,
          onFinally
        );
    },

   
  },
  mounted() {
    var self = this;
    self.getIncidentsReported();
  }
};

</script>
<style lang="scss">
#tableRow{
  border: 3px,black;
}
.gridIcon{
  cursor: pointer;
  :hover{
    color: orange;
  }
}
</style>