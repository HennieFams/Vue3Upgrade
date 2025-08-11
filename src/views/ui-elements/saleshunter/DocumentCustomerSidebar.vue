<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} ITEM</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div>
        <div class="vx-row px-4 pt-2 pb-3">

           <!-- <div class="vx-col flex-1">
        
               <label>Customer Name</label>  
               <v-select
                      :options="customerDropdown"
                      placeholder="Search / Select Customer"
                      v-model="customer"
                      @search:blur="populateData"   
                />         
          </div> -->

          <div class="vx-col flex-1">
            <label>Document Name</label>
            <vs-input
              icon-pack="feather"
              icon="icon-user"
              placeholder="Document Name"
              v-model="docName"
              class="w-full"
              name="Site Name"
  
            />
          
          </div>
         
        </div>

        <div class="vx-row px-4 pb-3">
           <div class="vx-col flex-1">
            <!-- ContactPhone -->
            <label>Revision</label>
            <vs-input
            icon-pack="feather"
              icon="icon-phone"
              placeholder="Revision"
              v-model="revision"
              class="w-full"
              name="Contact Phone"
            
            />
           
          </div>
          <div class="vx-col flex-1">
            <!-- ContactName -->
            <label>Document Number</label>
            <vs-input
            icon-pack="feather"
              icon="icon-user"
              placeholder="Document Number"
              v-model="docNumber"
              class="w-full"
              name="Contact Name"
            
            />
       
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
              <label class="text-reader">
                <input type="file" @change="loadTextFromFile">
              </label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
           <iframe :src="myData" width="680" height="500" frameborder="0" > </iframe>
        </div>
          <!-- <vs-upload action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload"  /> -->
           <!-- <div class="flex vs-con-loading__container flex-wrap items-center justify-center pb-4">
            <v-uploader @done="successUpload" v-show="!myFile" ref="fileUpload" file-type-exts="pdf" button-text="Upload PDF" language="en" file-size-limit="50MB" :preview="false" ></v-uploader>
          </div> -->

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="rounded-lg mr-6" @click="submitData">Submit</vs-button>
      <vs-button class="rounded-lg " type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
// import vUploader from 'v-uploader'
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
     "v-select": vSelect
  },
  mounted() {
    this.loadcustomer();
  },
  data() {
    return {
      customerID:0,
      customer:0,
      customerDropdown:[],
      myData:null,
      documentID:0,
      accountID:0,
      docName:"",
      revision:"",
      docNumber:"",
      myFile:null,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        this.documentID = this.data.id;
        this.accountID = this.data.accountID;
        this.customerID = this.data.customerID;
        this.docName= this.data.docName;
        this.myFile ='';
        this.revision= this.data.revision;
        this.docNumber= this.data.documentNr;
        this.myData = 'data:application/pdf;base64,' + this.data.myFile
        //this.siteID=1;
        //let { category, id, img, customer, order_status, price ,categorycustomerid} = JSON.parse(JSON.stringify(this.data))
        this.initValues();
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.siteID, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      }
    },
    isFormValid() {
      return (
        !this.errors.any() 
      );
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },
  methods: {
     populateData() {
      var self = this;
      //self.statusDropdown.value;
      if (self.customer) {
          self.customerID = self.customer.value;
        }
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
                   this.myData =  'data:application/pdf;base64,' + self.myFile;
              }
    },

    initValues() {
      if (this.data.id)  return;
      this.documentID = 0,
      this.accountID  = 0,
      this.docName    = "",
      this.revision   = "",
      this.docNumber  = "",
      this.myFile     = "",
      this.customerID = 0,
      this.myData     = null
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
  
    submitData() {
      var self = this;
      const obj = {
            accountID: 1,
            ID:this.documentID,
            customerID : this.customerID,
            // AccountID : this.accountID,
            Name : this.docName,
            Revision: this.revision,
            DocumentNr: this.docNumber,
            MyFile: this.myFile
          };
          if (this.documentID !== null && this.documentID != 0) {
            //this.$store.dispatch("dataList/updateItem", obj).catch(err => { console.error(err) })
            self.$emit("update", obj);
          } else {
            delete obj.id;
            obj.popularity = 0;
            self.$emit("add", obj);
            //this.$store.dispatch("dataList/addItem", obj).catch(err => { console.error(err) })
          }
          this.$emit("closeSidebar");
          this.initValues();
      // this.$validator.validateAll().then(result => {
      //   if (result) {
          
        
      //   }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 700px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
