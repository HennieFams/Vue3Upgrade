<template>
  <div  ref="folders" class="vs-con-loading__container p-6">
      <h4>Manage Documents</h4>
      <div class="vx-row">
        <div class="vx-col" v-if="$acl.check('ThebigBoss')">
          <vs-button @click="newFolderPopupActive = true" type="border"  icon-pack="feather"  icon="icon-folder-plus">New folder</vs-button>
        </div>
        <div class="vx-col" v-if="$acl.check('ThebigBoss')">
          <vs-button @click="uploadFilePopupActive = true"  color="success"  icon-pack="feather"  icon="icon-upload">Upload file</vs-button>
        </div>
        <vs-spacer></vs-spacer>
        <div class="vx-col" v-if="$acl.check('ThebigBoss')" v-show="selectedFolders.length == 1 && selectedFiles.length == 0">
          <vs-button @click="renameFolderPopupActive = true"  color="warning"  icon-pack="feather"  icon="icon-edit-2">Rename</vs-button>
        </div>
        <div class="vx-col" v-if="$acl.check('ThebigBoss')" v-show="selectedFolders.length > 0 || selectedFiles.length > 0">
          <vs-button ref="deletefolders" @click="deleteFolderContents()" class="vs-con-loading__container" color="danger"  icon-pack="feather"  icon="icon-x">Delete</vs-button>
        </div>
      </div>
      <div class="vx-row mt-6">
        <div class="vx-col">
          <div style="display:flex">
            <vs-button class="mr-2" @click="previousFolder" color="rgba(0, 0, 0, 0.3)"  icon-pack="feather"  icon="icon-arrow-left"></vs-button>
            <vs-button @click="nextFolder" color="rgba(0, 0, 0, 0.3)"  icon-pack="feather"  icon="icon-arrow-right"></vs-button>
          </div>
        </div>
      </div>
      <div class="vx-row mt-3 mb-2">
        <div class="vx-col" v-for="(folder, index) in folders" :key="index + 'A'">
          <div @click="goToFolder(folder.id)" class="folder-container">
            <div v-if="$acl.check('ThebigBoss')" @click.prevent.stop="selectFolder(folder.id, !folder.isSelected),folder.isSelected =!folder.isSelected" class="radio"><div v-show="folder.isSelected" class="radio--active"></div></div>
            <img src="../../../assets/images/file-icons/2.png" class="folder-container--image" alt="">
            <div class="folder-container--description"><span>{{folder.name}}</span></div>
          </div>
        </div>
        <div class="vx-col" v-for="(content, index) in contents" :key="index + 'B'">
          <div @click="preview(content)" class="folder-container">
            <div v-if="$acl.check('ThebigBoss')" @click.prevent.stop="selectFile(content.id, !content.isSelected),content.isSelected =!content.isSelected" class="radio"><div v-show="content.isSelected" class="radio--active"></div></div>
            <img :src="fileType(content.contentUrl)" style="height:70%; width:70%;margin-left:32px"  alt="">
            <div class="folder-container--description"><span>{{content.contentUrl.replace("https://incidentimagestorage.blob.core.windows.net/foldermanager/","")}}</span></div>
          </div>
        </div>
      </div>
    
    <vs-popup title="Add New Folder" class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="newFolderPopupActive">
      <div id="PMessage">
        <div class="vx-row">
          <div class="vx-col" style="width:100%">
          <div>
            <span>Viewer access</span>
            <v-select
              style="font-size: 10px"
              placeholder="select type"
              :options="uploadOptions"
              v-model="selectedOption"
              @input="opionSelected"
            ></v-select>  
          </div>
        </div>
          <div class="vx-col w-full">
            <label>Folder name</label>
            <vs-input class="w-full" v-model="folder.name"></vs-input>
          </div>
        </div>
        <div>
          <vs-button ref="newfolder" class="vs-con-loading__container rounded-lg mt-2" color="warning" style="float: right" type="filled" @click="addNewFolder()">
            Add
          </vs-button>
        </div>  
      </div>
    </vs-popup> 

    <vs-popup title="Rename Folder" class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="renameFolderPopupActive">
      <div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <label>New Folder Name</label>
            <vs-input class="w-full" v-model="folder.name"></vs-input>
          </div>
        </div>
        <div>
          <vs-button ref="rename" class="vs-con-loading__container rounded-lg mt-2" color="warning" style="float: right" type="filled" @click="renameFolder()">
            Rename
          </vs-button>
        </div>  
      </div>
    </vs-popup>
    
    <vs-popup title="Upload File" class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="uploadFilePopupActive">
      <div class="vx-row" style="min-height: 30% !important;">
        <div class="vx-col pt-2" style="width:100%">
          <div id="app">
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

    <vs-popup :fullscreen="isImageOrPdf(content)" title="Preview" class="w-full pl-20 pr-20 pt-4 pb-4" id="Popup" :active.sync="previewPopupActive">
      <div class="w-full" style="display:flex; justify-content:center;">
        <vs-button 
          icon-pack="feather"  
          icon="icon-download" 
          ref="newfolder" 
          class="vs-con-loading__container rounded-lg mt-2" 
          color="success" 
          style="float: right" 
          type="filled" 
          @click="download(content)">
          Download File
        </vs-button>
      </div>
      <div v-if="isImageOrPdf(content)" class="vx-row mt-2">
        <div class="vx-col w-full">
          <pdf  :src="content.contentUrl"></pdf>
        </div>
      </div>
      <div v-if="isImageOrPdf(content) == false" style="display:flex;width:100%; justify-content:center;" class="mt-2">
        <img class="preview-img" :src="content.contentUrl">
      </div>
    </vs-popup>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import vueFilePond from 'vue-filepond';import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { excelExportComplete } from '@syncfusion/ej2-grids';
import vSelect from "vue-select";

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
export default {
  data() {
    return {
      jkl: false,
      vo: false,
      folder:{
        id:0,
        name: '',
        parentId:0
      },
      content:{
        id:0,
        folderId:0,
        contentUrl:''
      },
      uploadOptions: [{
        label: 'General',
        value: 0
      },
      {
        label: 'Account Specific',
        value: 1
      },],
      selectedOption: {},
      contents:[],
      newFolderPopupActive: false,
      uploadFilePopupActive: false,
      renameFolderPopupActive:false,
      previewPopupActive: false,
      folders: [],
      currentParentFolderId:0,
      previousParentFolderId:0,
      nextParentFolderId:0,
      filePathTracking:[0],
      filePathTrackerPointer:0,
      selectedFolders:[],
      selectedFiles:[],
      pondVisible: false,
    };
  },
  watch:{
    newFolderPopupActive(val){
      if(!val){
        this.folder.id = 0;
        this.folder.name = '';
        this.folder.parentId = 0;
      }
    },
    renameFolderPopupActive(val){
      if(!val){
        this.folder.id = 0;
        this.folder.name = '';
        this.folder.parentId = 0;
      }
    },
    previewPopupActive(val){
      if(!val){
        this.content.id = 0;
        this.content.folderId = 0;
        this.content.contentUrl = '';
      }
    }
  },
  components: {
    FilePond,
    pdf,
    "v-select": vSelect,
  },
  computed: {
    uploadServer: {
      get() {
        var userKey = localStorage.getItem('userKey');
        var accountKey = localStorage.getItem('userAccountKey');
        return this.$buildUrl(`TempUpload/Folders?accountKey=${accountKey}&userKey=${userKey}`);
      }
    },
  },
  mounted() {
    this.ListFolders();
  },
  methods: {
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    selectFolder(id, selected){
      if(selected){
        this.selectedFolders.push(id);
      }else{
        this.selectedFolders.splice(this.selectedFolders.indexOf(id),1);
      }
    },
    selectFile(id, selected){
      if(selected){
        this.selectedFiles.push(id);
      }else{
        this.selectedFiles.splice(this.selectedFiles.indexOf(id),1);
      }
    },
    deleteFolderContents(){
      if(this.selectedFiles.length > 0)
      {
        this.selectedFiles.forEach(element => {
          this.deleteContent(element);
        });
        this.selectedFiles = [];
      }
      if(this.selectedFolders.length > 0)
      {
        this.selectedFolders.forEach(element => {
          this.deleteFolder(element);
        });
        this.selectedFolders = [];
      }
    },
    deleteFolder(id){
      const self = this;
      self.showLoadingOnElement("deletefolders", 1, "radius");
      var onSuccess = response =>{
        self.navToFolder(self.filePathTracking[self.filePathTrackerPointer]);
      };
      var onFinally = response =>{
        if(self.$refs.deletefolders){
          self.$vs.loading.close(self.$refs.deletefolders.$el);
        }
      };
      self.$ajaxDelete(
        self,
        `Folders?id=${id}`,
        onSuccess,
        onFinally
      );
    },
    deleteContent(id){
      const self = this;
      self.showLoadingOnElement("deletefolders", 1, "radius");
      var onSuccess = response =>{
        self.navToFolder(self.filePathTracking[self.filePathTrackerPointer]);
      };
      var onFinally = response =>{
        if(self.$refs.deletefolders){
          self.$vs.loading.close(self.$refs.deletefolders.$el);
        }
      };
      self.$ajaxDelete(
        self,
        `FolderContents?id=${id}`,
        onSuccess,
        onFinally
      );
    },
    renameFolder(){
      const self = this;
      self.showLoadingOnElement("rename", 1, "radius");
      self.folder.id = self.selectedFolders[0];
      var onSuccess = response =>{
        self.renameFolderPopupActive = false;
        self.navToFolder(self.filePathTracking[self.filePathTrackerPointer]);
        self.selectedFolders = [];
      };
      var onFinally = response =>{
        if(self.$refs.rename){
          self.$vs.loading.close(self.$refs.rename.$el);
        }
      };
      self.$ajaxPut(
        self,
        `Folders`,
        self.folder,
        onSuccess,
        onFinally
      );
    },
    download(content){
      window.open(content.contentUrl);
    },
    opionSelected() {
      var self = this;
      
    },
    preview(content){
      this.content =  JSON.parse(JSON.stringify(content));
      this.previewPopupActive = true;
    },
    fileType(url){
      var fileName = url.replace("https://incidentimagestorage.blob.core.windows.net/foldermanager/","");
      
      if(fileName.includes(".png")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/png.png"
      }else if(fileName.includes(".jpeg") || fileName.includes(".jpg")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/jpeg.png"
      }else if(fileName.includes(".doc") || fileName.includes(".docx")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/doc.png"
      }else if(fileName.includes(".csv")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/csv.png"
      }else if(fileName.includes(".pdf")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/pdf.png"
      }else if(fileName.includes(".txt")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/txt.png"
      }else if(fileName.includes(".xls")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/xls.png"
      }else if(fileName.includes(".pptx") || fileName.includes(".ppt")){
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/ppt.png"
      }else{
        return "https://incidentimagestorage.blob.core.windows.net/foldermanager/unknown.png"
      }
    },
    handleFilePondError(){

    },
    fileRemoved(){

    },
    processFile(error, file){
      var self = this;
      var response = JSON.parse(file.serverId);
      if(response.url)
        this.content.contentUrl = response.url;
      this.content.folderId = self.filePathTracking[self.filePathTrackerPointer];
      var onSuccess = function (response) {
        self.listFileContent(self.filePathTracking[self.filePathTrackerPointer])
      };
      var onFinally = function (response) {
        self.$refs.pond.removeFile();
      };
      self.$ajaxPost(
        self,
        `FolderContents`,
        self.content,
        onSuccess,
        onFinally
      )
    },
    listFileContent(id){
      const self = this;
      self.showLoadingOnElement("folders", 1, "radius");
      var onSuccess = response =>{
        self.contents = self.addIsSelected(response.data);
      };
      var onFinally = response =>{
        if(self.$refs.folders){
          self.$vs.loading.close(self.$refs.folders.$el);
        }
      };
      self.$ajaxGet(
        self,
        `FolderContents?folderId=${id}`,
        onSuccess,
        onFinally
      );
    },
    ListFolders() {
      const self = this;
      self.showLoadingOnElement("folders", 1, "radius");
      var onSuccess = response =>{
        self.folders = self.addIsSelected(response.data);
        self.contents = [];
        self.listFileContent(0);
      };
      var onFinally = response =>{
        if(self.$refs.folders){
          self.$vs.loading.close(self.$refs.folders.$el);
        }
      };
      self.$ajaxGet(
        self,
        `Folders?parentId=0`,
        onSuccess,
        onFinally
      );
    },
    addNewFolder(){
      const self = this;
      
      self.showLoadingOnElement("newfolder", 1, "radius");
      var accountId = localStorage.getItem('userAccountId');
      
      if(self.selectedOption.value == 1){
        self.folder.accountId = accountId;
      }
      else{
        self.folder.accountId = 0;
      }
      self.folder.parentId = self.filePathTracking[self.filePathTracking.length - 1];
      
      var onSuccess = response =>{
        self.folders = self.addIsSelected(response.data);
        self.newFolderPopupActive = false;
      };
      var onFinally = response =>{
        if(self.$refs.newfolder){
          self.$vs.loading.close(self.$refs.newfolder.$el);
        }
      };
      self.$ajaxPost(
        self,
        `Folders`,
        self.folder,
        onSuccess,
        onFinally
      );
    },
    addIsSelected(arr){
      arr.forEach(obj => {
        obj.isSelected = false;
      });
      return arr;
    },
    previousFolder(){
      if(!(this.filePathTrackerPointer - 1 < 0))
        this.filePathTrackerPointer = this.filePathTrackerPointer - 1;
      this.navToFolder(this.filePathTracking[this.filePathTrackerPointer]);
    },
    nextFolder(){
       if(this.filePathTrackerPointer + 1 != this.filePathTracking.length)
        this.filePathTrackerPointer = this.filePathTrackerPointer + 1;  
      this.navToFolder(this.filePathTracking[this.filePathTrackerPointer]);
    },
    filePathTrackingDelete(){
      this.filePathTracking.splice(this.filePathTrackerPointer + 1,this.filePathTracking.length - 1);
    },
    clearFolderContents(){
      this.folders = [];
      this.contents = [];
      this.selectedFolders = [];
      this.selectedFiles = [];
    },
    goToFolder(id){
      const self = this;
      self.showLoadingOnElement("folders", 1, "radius");
      self.clearFolderContents();
      var onSuccess = response =>{
        self.folders = self.addIsSelected(response.data);
        self.filePathTrackingDelete();

        if(self.folders.length > 0)
          self.filePathTracker(self.folders[0].parentId);
        else
          self.filePathTracker(id);

        self.contents = [];  
        self.listFileContent(id);
      };
      var onFinally = response =>{
        if(self.$refs.folders){
          self.$vs.loading.close(self.$refs.folders.$el);
        }
      };
      self.$ajaxGet(
        self,
        `Folders?parentId=${id}`,
        onSuccess,
        onFinally
      );
    },
    navToFolder(id){
      const self = this;
      self.showLoadingOnElement("folders", 1, "radius");
      self.clearFolderContents();
      var onSuccess = response =>{
        self.folders = self.addIsSelected(response.data);
        
        self.listFileContent(id);
      };
      var onFinally = response =>{
        if(self.$refs.folders){
          self.$vs.loading.close(self.$refs.folders.$el);
        }
      };
      self.$ajaxGet(
        self,
        `Folders?parentId=${id}`,
        onSuccess,
        onFinally
      );
    },
    filePathTracker(id){
      this.filePathTracking.push(id);
      this.filePathTrackerPointer = this.filePathTracking.length - 1;
    },
    isImageOrPdf(content){
      var extention = content.contentUrl.replace("https://incidentimagestorage.blob.core.windows.net/foldermanager/","");
      extention = extention.substring(extention.indexOf('.') + 1).toLowerCase();
      switch(extention)
      {
        case 'pdf' : return true;
        case 'jpeg' : return true;
        case 'png' : return true;
        case 'gif' : return true;
        case 'jpg' : return true;
        case 'tiff' : return false;
        case 'bmp' : return false;
        default: return null;
      }
    }
  }
}

</script>

<style lang="scss">
.folder-container{
  height: 220px;
  width: 220px;
  display: block;
  border-radius: 10px;
  position: relative;
  margin-bottom: 20px;
  padding: 5px;
  cursor: pointer;
  // box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  box-shadow: rgba(17, 17, 26, 0.3) 0px 0px 16px;
}
.folder-container--image{
  height: 70%;
  margin-left: 32px;
  background-size: contains !important;
}
.folder-container--description{
  width: 100%;
  height: 30%;
  text-align: center;
  display: flex;
  justify-content: center;
  word-break: break-all;
  box-shadow: 0px -3px 0px 0px rgba(50, 50, 50, 0.2);
}
  
.radio{
  position: absolute;
  right: 3px;
  top: 3px;
  border: 2px solid rgb(201, 201, 201);
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.radio--active{
  background: rgba(var(--vs-primary), 1);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 1px;
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
.preview-img{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  height: 100%;
  background-size: contain;
  border-radius: 20px;
}
</style>

