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
    <vs-tabs
      v-model="activeTab"
      ref="grid"
      class="vs-con-loading__container"
      style="width: auto; min-height:auto"
    >
      <vs-tab label="Message Acconts" style="min-height: auto">
        <vx-card ref="MainCard">
          <div>
            <vs-table
              ref="gridTable"
              multiple
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="accountList"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <!-- ADD NEW -->
                <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetGrid()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                <!--<vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addVue"  icon-pack="feather" icon="icon-plus-square">Add New</vs-button>-->
                <!-- ITEMS PER PAGE -->
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ accountList.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : accountList.length }} of {{ accountList.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                <vs-th sort-key="name">Name</vs-th>
              </template>
              <!-- visible: false -->
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.name">{{tr.name}}</vs-td>

                </vs-tr>
              </template>
            </vs-table>
          </div>  
        </vx-card>
        <div>
          <quill-editor v-model="message" :options="editorOption" style="height: 30vh" />
        </div>
        <vs-button class="rounded-lg mr-2" ref="sendButton" color="success" type="filled" @click="SendMessage"  icon-pack="feather" icon="icon-send">Send Message</vs-button>
      </vs-tab>
      <vs-tab label="Message Users - Whatsapp" style="min-height: auto">
        <vx-card ref="MainCard">
          <div class="vx-row px-4 pb-3">
            <div class="vx-col w-full">
            <label>Contact Numbers: </label>
            <!-- <vs-chips id="emails" class="vx-col w-full pt-2" placeholder="Add Email" v-model="chips" v-validate="'required|email'" name="Email" style="justify"> -->
              <vs-chips id="numbers" class="vx-col w-full pt-2" placeholder="Add Number" v-model="chips" name="Numbers" style="justify">
              <vs-chip
                class="glow-effect_primary"
                :key="chip"
                @click="removeNumber(chip)"
                v-for="chip in chips"
                closable>
                {{ chip }}
              </vs-chip>
            </vs-chips>
          </div>
          </div>  
        </vx-card>
        <div>
          <quill-editor v-model="wMessage" :options="editorOption2" style="height: 30vh;" />
        </div>
        <vs-button class="rounded-lg mr-2" ref="sendButton" color="success" type="filled" @click="SendWMessage"  icon-pack="feather" icon="icon-send">Send Message</vs-button>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    return {
      accountList: [],
      itemsPerPage: 10,
      add: false,
      selected: [],
      isMounted: false,
      message: "",
      wMessage: "",
      accounts:[],
      chips: [],
      selectedAccount:{
        accountType: "",
        accountTypeId: 0,
        enable: false,
        id: 0,
        monthEndDate: 0,
        monthStartDate: 0,
        name: "",
        userIds: [],
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
          ]
        },
      },
      editorOption2: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'strike']
          ]
        },
      },
      activeTab: 0,
      
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    quillEditor,
  },
  watch:{
    activeTab: function(val){
      if(val == 0){
        // this.GetGrid();
        this.isMounted = true;
      }
    },
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
    // this.GetGrid();
    this.isMounted = true;
  },
  methods: {
  //********************* System related*/
  successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Message successfully send',
        color: 'success'
      })
    },
  FailedNotify(text) {
      this.$vs.notify({
        title: 'Not Successfull',
        text: text,
        color: 'danger'
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
    GetGrid() {
      var self = this;
      self.selected = [];
      self.showLoadingOnElement("grid", 1, "radius");
      var onSuccess = function(response) {
        self.accountList = response.data;
        self.dbMessage = "Accounts succesfully loaded"
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.grid.$el);
      };
      self.$ajaxGet(
        self,
        "Accounts/GetAccountList",
        onSuccess,
        onFinally
      );
    },
    SendMessage(){
      var self = this;
      if(self.message == ""){
        self.FailedNotify("Can't send an empty message");
      }
      else if(self.selected.length < 1 ){
        self.FailedNotify('Select at least one or more accounts');
      }
      else{
        var myobject={};
          myobject.Id = 0;
          myobject.Message = self.message;
          myobject.Accounts = self.selected;
        self.showLoadingOnElement("sendButton", 1, "radius");
          var onSuccess = function(response) {
            self.successNotify();
            self.message = "";
            self.GetGrid();
          };
          var onFinally = function() {
            self.$vs.loading.close(self.$refs.sendButton.$el);
          };
          self.$ajaxPost(
            self,
            "Notification/SendMessage",
            myobject,
            onSuccess,
            onFinally
          );
      }
      
    },
    removeNumber(chip){
      this.chips.splice(this.chips.indexOf(chip), 1)
    },
    SendWMessage(){
      var self = this;
      if(self.wMessage == ""){
        self.FailedNotify("Can't send an empty message");
      }
      else{
        var message = self.transformHtmlToWhatsApp(self.wMessage);
        
        var myobject={};
          myobject.Message = message;
          myobject.Numbers = self.chips;
          
        // self.showLoadingOnElement("sendButton", 1, "radius");
          var onSuccess = function(response) {
            console.log(response);
            
            self.successNotify();
            // self.message = "";
            // self.chips = [];
            // self.GetGrid();
          };
          var onFinally = function() {
            // self.$vs.loading.close(self.$refs.sendButton.$el);
          };
          self.$ajaxPost(
            self,
            "Whatsapp/SendTextMessage",
            myobject,
            onSuccess,
            onFinally
          );
          // axios.post('http://localhost:7014/api/WhatsAppBot', myobject)
          //   .then(response => {
          //       console.log(response.data);
          //       self.successNotify();
          //       self.message = "";
          //       self.chips = [];
          //       self.GetGrid();
          //   })
          //   .catch(error => {
          //       console.error(error);
          //   });
      }
    },
    transformHtmlToWhatsApp(text) {
      // Create a temporary DOM element to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;

      // Replace <strong> tags with *word*
      const boldReplaced = tempDiv.innerHTML.replace(/<strong>(.*?)<\/strong>/g, "*$1*");

      // Replace <em> tags with _word_
      const italicReplaced = boldReplaced.replace(/<em>(.*?)<\/em>/g, "_$1_");

      // Replace <s> tags with ~word~
      const strikethroughReplaced = italicReplaced.replace(/<s>(.*?)<\/s>/g, "~$1~");

      // Remove any remaining HTML tags
      const cleanText = strikethroughReplaced.replace(/<\/?[^>]+(>|$)/g, "");

      return cleanText;
    }
  }
};
</script>
