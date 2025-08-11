<template>
  <div>
		<exception-sidebar
      :isSidebarActive="isExceptionSidebarActive"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table 
          ref="gridTable"
          pagination
          :max-items="itemsPerPage"
          search
          :data="exceptions"
          class="vs-con-loading_container"
        >
          <div
            slot="header"
            class="flex flex-wrap-reverse items-center flex-grow"
          >
            <vs-button
              class="rounded-lg mr-2"
              color="warning"
              type="filled"
              @click="getExceptions"
              icon-pack="feather"
              icon="icon-refresh-ccw">
              Reload
            </vs-button>
            <vs-button
              class="rounded-lg mr-2"
              color="success"
              type="filled"
              @click.stop="showSidebar"
              icon-pack="feather"
              icon="icon-plus-square">
              Add New
            </vs-button>
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
            <div
              class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                {{
                  exceptions.length - currentPage * itemsPerPage > 0
                    ? currentPage * itemsPerPage
                    : exceptions.length
                }}
                of {{ exceptions.length }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="totalRows(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="totalRows(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="totalRows(50)">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="totalRows(100)">
                <span>100</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
        <template slot="thead">
          <vs-th sort-key="Exception">Exception</vs-th>
          <vs-th sort-key="ExceptionLook">Exception Look</vs-th>
          <vs-th sort-key="ExceptionType">Exception Type</vs-th>
          <vs-th sort-key="Tank">Tank</vs-th>
          <vs-th sort-key="ExceptionTrigger">Exception Trigger</vs-th>
          <vs-th sort-key="Email">Email</vs-th>
          <vs-th sort-key="enable">enable</vs-th>
          <vs-th>Action</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.name">{{ tr.name }}</vs-td>
            <vs-td :data="tr.exceptionLookUpName">{{ tr.exceptionLookUpName }}</vs-td>
            <vs-td :data="tr.exceptionTypeName">{{ tr.exceptionTypeName}}</vs-td>
            <vs-td :data="tr.exceptionValueName">{{ tr.exceptionValueName }}</vs-td>
            <vs-td :data="tr.exceptionTrigger">{{ tr.exceptionTrigger }}</vs-td>
            <vs-td :data="tr.email">{{ tr.email.substring(0, 50)}}</vs-td>
            <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
            <vs-td id="iconContainer" class="whitespace-no-wrap flex">
              <vx-tooltip class="flex" text="Run Exception">
                <feather-icon
                icon="PlayCircleIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                @click.stop="RunExceptionNow(tr)"
              />
              </vx-tooltip>
                <vx-tooltip class="flex" text="Edit Exception Information">
                  <feather-icon
                icon="EditIcon"
                ref="edit"
                class="ml-2"
                svgClasses="w-5 h-5 hover:text-success stroke-current"
                @click.stop="handleSelectedException(tr)"
              />
                </vx-tooltip>
              <vx-tooltip class="flex" text="Delete Exception">
                <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click.stop="deleteException(tr)"
              />
              </vx-tooltip>
              
            </vs-td>
          </vs-tr>
        </template>
        </vs-table>
      </div>
    </vx-card>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import ExceptionSidebar from './ExceptionSidebar.vue';

export default {
  data(){
    return{
      itemsPerPage: 10,
      isVisible: false,
      isListHidden: false,
      isMounted: false,

			isListHidden: false,   
      isInfoHidden: true,
      isExceptionSidebarActive: false,
      sidebarData: {},

			exceptions: [],
      formData: {
        id: 0,
        accountId: 0,
        name: "",
        exceptionTypeId: 0,
        exceptionTypeName: "",
        exceptionLookUpId: 0,
        exceptionLookUpName: "",
        exceptionLookUpValue: 0,
        exceptionTrigger: "",
        exceptionTankId: 0,
        exceptionValueName: "",
        email: "",
        enable: false
			}
		};
	},
	components: {
		"v-select": vSelect,
    ExceptionSidebar
	},
	computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
	mounted() {
    this.getExceptions();
    this.isMounted = true;
  },
	methods: {
     //********************* System related*/
   successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },

     successNotifyExecute(msg,title) {
      this.$vs.notify({
        title: 'Successfully - ' + title,
        text: msg,
        color: 'success'
      })
    },


		initValues(){
				this.formData.id = 0,
        this.formData.accountId = 0,
        this.formData.name = "",
        this.formData.exceptionTypeId = 0,
        this.formData.exceptionTypeName = "",
        this.formData.exceptionLookUpId = 0,
        this.formData.exceptionLookUpName = "",
        this.formData.exceptionLookUpValue = 0,
        this.formData.exceptionTrigger = "",
        this.formData.exceptionTankId = 0,
        this.formData.exceptionValueName = "",
        this.formData.email = "",
        this.formData.enable = false
		},
    RunExceptionNow(tr){
      var self = this;
      self.showLoadingOnElement("gridTable", 0.65, "radius");
      var exceptionID = "&exceptionID=" + tr.id;
      var tankid = "&tankid=" + tr.exceptionLookUpValue;
      var trigger = "&trigger=" + tr.exceptionTrigger;
      var EmailAddress = "&EmailAddress=" + tr.email;
      var exceptionType = "&exceptionType=" + 'Manual trigger: ' +  tr.exceptionTypeName;
      var exceptionTypeName = "&exceptionTypeName=" + tr.exceptionValueName;


      var urlLink =exceptionID +  tankid + trigger + EmailAddress + exceptionType + exceptionTypeName;
      var onSuccess = function (msg) {
          var _title =  msg.data.title;
          var _message =  msg.data.message;
          self.successNotifyExecute(_message,_title);
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(self, "SendGrid/RunSendGridNowExceptionManually?" + urlLink, onSuccess, onFinally);
    },


    totalRows(rowCount){
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
		getExceptions(){
			var self = this;
			self.initValues();
			self.showLoadingOnElement("MainCard", 0.65, "radius");
			
			var onSuccess = function (response) {
        self.$refs.gridTable.currentx = 1;
        self.exceptions = response.data;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.MainCard.$el);
      };
      self.$ajaxGet(self, "Exception/GetExceptions", onSuccess, onFinally);
		},
		handleSelectedException(tr){
			this.sidebarData = tr;
      this.initValues();
      this.toggleDataSidebar(true);
		},
		showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    cancelSidebar() {
      this.isListHidden = false,
      this.isInfoHidden = true;
      this.initValues();
      this.getExceptions();
    },
    showSidebar() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val){
        if (val)
        this.isExceptionSidebarActive = true;
        else{
          this.isExceptionSidebarActive = false;
          this.getExceptions();
        }
        
    },
    deleteException(tr){
      var self = this;
      
      var onSuccess = function () {
        self.getExceptions();
      };
      var onFinally = function () {
      };
      
      self.$ajaxDelete(
        self,
        `Exception/${tr.id}`,
        onSuccess,
        onFinally
      );
    }
	}
}
</script>
<style>

#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>