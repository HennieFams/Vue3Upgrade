<template> 
  <div class="vx-row">
    <div class="vx-col w-full">
      <vx-card
        class="pb-3"
        title="FAMS Restore Deleted">
        <vs-tabs v-model="activeTab" style="width: auto; min-height:500px">
          <vs-tab label="Restore Deleted Equipment" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <div class="vx-col">
                  <vs-button @click="openPopup"  color="success"  icon-pack="feather"  icon="icon-upload">Upload file</vs-button>
                </div>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </vx-card>
    </div>
    <vs-popup title="Upload File" class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="uploadFilePopupActive">
      <div class="vx-row" style="min-height: 30% !important;">
        <div class="vx-col pt-2" style="width:100%">
          <div id="app">
            <div v-show="showValues" :data="tr" :key="indextr" v-for="(tr, indextr) in imageResult">
              <label>{{ tr }}</label>  
            </div>
              <file-pond
                id="filepond"
                ref="pond"
                :server='uploadServer'
                label-idle="Drop file here or <span class='filepond--label-action'>Browse</span>"
                :allow-multiple="true"
                :instant-upload="true"
                :allow-image-preview="true"
                @error = "handleFilePondError"
                @processfile="processFile"
                @removefile="fileRemoved"/>
            </div>
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
import vueFilePond from 'vue-filepond';import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
export default {name: 'app',
  data() {
    return {
      itemsPerPage: 10,
      isMounted: false,
      itemsPerPage2: 10,
      isMounted2: false,
      itemsPerPage3: 10,
      isMounted3: false,
      itemsPerPage4: 10,
      isMounted4: false,
      activeTab: 0,
      eqpData: [],
      empData: [],
      allocData: [],
      storesData: [],
      tanksData: [],
      usersData:[],
      selected: null,
      uploadFilePopupActive: false,
      imageResult: [],
      showValues: false,
      content:{
        id:0,
        folderId:0,
        contentUrl:''
      },
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
    uploadServer: {
      get() {
        var userKey = localStorage.getItem('userKey');
        var accountKey = localStorage.getItem('userAccountKey');
        return this.$buildUrl(`FAMSAI?accountKey=${accountKey}&userKey=${userKey}`);
      }
    },
  },
  mounted() {
    
  },
  watch:{
    activeTab: function (val) {
      var self = this;
      if(val == 0){
        
      }
      // else if(val == 1){
        
      // }
      // else if(val == 2){
        
      // }
      // else if(val == 3){
        
      // }
    },
  },
  methods: {
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
    openPopup(){
      this.imageResult = [];
      this.showValues = false;
      this.uploadFilePopupActive = true;
    },
    processFile(error, file){
      var self = this;
      var res = JSON.parse(file.serverId);
      var items = [];
      res.forEach(item => {
        if(item && item != ""){
          items.push(item);
          console.log("items");
          console.log(items);
        }
      });
      this.imageResult = items;
      this.fileRemoved();
      this.showValues = true;
      // if(response.url)
      //   this.content.contentUrl = response.url;
      // this.content.folderId = self.filePathTracking[self.filePathTrackerPointer];
      // console.log(response)
      // console.log(this.content)
      // console.log()
      // var onSuccess = function (response) {
      //   self.listFileContent(self.filePathTracking[self.filePathTrackerPointer])
      // };
      // var onFinally = function (response) {
      //   self.$refs.pond.removeFile();
      // };
      // self.$ajaxPost(
      //   self,
      //   `FolderContents`,
      //   self.content,
      //   onSuccess,
      //   onFinally
      // )
    },
    fileRemoved(){
      // this.imageResult = [];
      // this.showValues = false;
    },
    handleFilePondError(){

    },
  }, //before this
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
