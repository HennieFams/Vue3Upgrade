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
      <h4>
       <!-- {{ Object.entries(this.data).length === 0 ? "ADD" : "UPDATE" }} User -->
      </h4>
      <feather-icon icon="XIcon" @click="closeSidebar" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-3">General Information</vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Username</label>
            <vs-input
              autocomplete="off"
              icon-no-border
              onClick="this.select();"
              v-validate="'required'"
              class="w-full"
              name="username"
              icon-pack="feather"
              icon="icon-user"
              v-model="formData.username"
            />
            <span class="text-danger text-sm" v-show="errors.has('username')">{{errors.first("username")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col w-full">
            <label>Email</label>
            <vs-input
              autocomplete="off"
              icon-no-border
              ref="emailInput"
              onClick="this.select();"
              v-validate="'required|email'"
              name="email"
              class="w-full"
              icon-pack="feather"
              icon="icon-at-sign"
              v-model="formData.email"
            />
            <span class="text-danger text-sm" v-show="errors.has('email')">{{errors.first("email")}}</span>
          </div>
        </div>
        <div class="vx-row px-4 pb-6">
          <div class="vx-col">
            <vs-checkbox v-model="formData.enable">Active</vs-checkbox>
          </div>
        </div>
        <vs-divider class="mb-6 pt-0">Login Credentials</vs-divider>
        <div class="vx-row px-4 pb-3" v-show="!showPasswordCheckbox">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-checkbox v-model="showPasswordCheckbox">Change Password</vs-checkbox> 
          </div>
        </div>
        <div v-show="showPasswordCheckbox">
          <div class="vx-row px-4 pb-3">
            <div class="vx-col w-4/5">
              <label>Password</label>
              <vs-input
                v-if="showPasswordCheckbox"
                id="passBox"
                autocomplete="off"
                icon-no-border
                onClick="this.select();"
                type="password"
                v-validate="'required|min:8|max:100'"
                name="password"
                ref="password"
                class="w-full"
                icon-pack="feather"
                icon="icon-lock"
                v-model="formData.password"
              />
              <vs-input
                v-if="!showPasswordCheckbox"
                id="passBox"
                autocomplete="off"
                icon-no-border
                onClick="this.select();"
                type="password"
                name="password"
                ref="password"
                class="w-full"
                icon-pack="feather"
                icon="icon-lock"
                v-model="formData.password"
              />
              <span class="text-danger text-sm" v-show="errors.has('password')">{{errors.first("password")}}</span>
            </div>
            <feather-icon @mouseover="showPassword('passBox')" @mouseout="hidePassword('passBox')" icon="EyeIcon" class="cursor-pointer mt-5"></feather-icon>
            
          </div>
          
          <div class="vx-row px-4">
            <div class="vx-col w-4/5">
              <label>Confirm Password</label>
              <vs-input
                v-if="showPasswordCheckbox"
                id="confPassBox"
                autocomplete="off"
                icon-no-border
                onClick="this.select();"
                type="password"
                v-validate="'confirmed:password'"
                name="confirm_password"
                data-vv-as="password"
                class="w-full"
                icon-pack="feather"
                icon="icon-lock"
                v-model="formData.confirmPassword"
              />
              <vs-input
                v-if="!showPasswordCheckbox"
                id="confPassBox"
                autocomplete="off"
                icon-no-border
                onClick="this.select();"
                type="password"
                name="confirm_password"
                data-vv-as="password"
                class="w-full"
                icon-pack="feather"
                icon="icon-lock"
                v-model="formData.confirmPassword"
              />
              <span class="text-danger text-sm" v-show="errors.has('confirm_password')">{{ errors.first("confirm_password") }}</span>
            </div>
            <feather-icon @mouseover="showPassword('confPassBox')" @mouseout="hidePassword('confPassBox')" icon="EyeIcon" class="cursor-pointer mt-5" ></feather-icon>
          </div>
          
         
        
        </div> 
        <vs-divider class="mb-6 pt-0">Roles</vs-divider>
        <div class="vx-row px-4 pb-3" :key="index" v-for="(role,index) in formData.roles">
          <div class="vx-col mb-2">
            <vs-checkbox  v-model="role.isSelected" >{{role.name}}</vs-checkbox>
          </div>
        </div>

        <div v-show="formData.id" class="mb-base">
          <vs-divider>Accounts</vs-divider>
          <v-select @search:blur="addAccount" ref="accountDropdown" class="mx-4" placeholder="Select Account" :options="accountData" v-model="accountDropdown"></v-select>
          <vs-table ref="selectedAccountsTable" stripe single :max-items="10" pagination :data="selectedAccounts">
            <template slot="thead">
              <vs-th sort-key="accountName">Account</vs-th>
              <vs-th></vs-th>
            </template>

            <template slot-scope="{data}">

              <vs-tr :data="account" :key="accountIndex" v-for="(account, accountIndex) in data">

                <vs-td :data="data[accountIndex].label">
                  {{ account.label }}
                </vs-td>

                <vs-td>
                  <vs-button class="rounded-lg " color="danger" type="flat" icon-pack="feather" icon="icon-x" @click.stop.prevent="removeAccount(accountIndex)"></vs-button>
                </vs-td>

              </vs-tr>
            </template>
          </vs-table>

        </div>
      </div>
    </component>
    <div class="vx-row flex flex-wrap items-center">
      <vs-spacer />
      <div class="vx-col">
        <vs-button
          ref="saveEditButton"
          class="rounded-lg mr-3"
          color="success"
          type="border"
          @click="saveEditUser"
          >Save</vs-button
        >
        <vs-button
          class="rounded-lg mr-3"
          color="warning"
          type="border"
          @click="closeSidebar"
          >Cancel</vs-button
        >
      </div>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import vSelect from "vue-select";
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    canChangePassword: {
      type: Boolean,
      required: true,
    },
    data: {
      default: () => {},
    },
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
  },
  mounted() {},
  data() {
    return {
      isMatchingPassword: false,
      isNotMatchingConfirm: false,
      requireStore: 0,
      accountData:[],
      selectedAccounts:[],
      accountDropdown:0,
      
      isChangePasswordHidden: false,
      showPasswordCheckbox: false,
      formData: {
        id: 0,
        username: "",
        email: "",
        enable: true,
        password: "",
        confirmPassword:"",
        roles:[],
        accountIds:[]
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },
  watch: {
    isSidebarActive(val) {
      var self = this;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
        this.getRolesList();
      } else{
        this.formData.id = this.data.id;
        this.formData.username = this.data.username;
        this.formData.email = this.data.email;
        this.formData.enable = this.data.enable;
        this.formData.password = this.data.password;
        this.showPasswordCheckbox = this.canChangePassword;
        this.formData.roles = this.data.roles;

        this.getDropdownAccountList(function(){
          self.selectedAccounts = self.accountData.filter(function(item) { return self.data.accountIds.includes(item.value) });
        });

      }
    },
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
      },
    },
    isFormValid() {
      return !this.errors.any();
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    
    showPassword(elementId) {
      document.getElementById(elementId).removeAttribute("type");
    },
    hidePassword(elementId) {
      document.getElementById(elementId).setAttribute("type", "password");
    },
    closeSidebar() {
      this.initValues();
      this.isSidebarActiveLocal = false;
    },
    getRolesList() {
      var self = this;
      var onSuccess = function(response) {
        self.formData.roles = response.data;
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "Roles/GetRolesListAdmin",
        onSuccess,
        onFinally
      );
    },
    initValues() {
      this.formData.id = 0;
      this.formData.username = "";
      this.formData.email = "";
      this.formData.password = "";
      this.formData.enable = true;
      this.formData.confirmPassword = "";
      this.showPasswordCheckbox = true;
      this.roles = [];
      this.selectedAccounts = [];
      this.accountDropdown = 0;
      this.accountData = [];
      
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },

    saveEditUser() {
      var self = this;
    
      self.$validator.validateAll().then((result) => {
        if (result && ((self.formData.password == self.formData.confirmPassword && self.showPasswordCheckbox) || !self.showPasswordCheckbox) ) {
          self.showLoadingOnElement("saveEditButton", 0.65, "radius");

          self.formData.accountIds = self.selectedAccounts.map(function (item) { return item.value; });

          var onSuccess = (response) => {
            self.closeSidebar();
            self.$vs.notify({
              title: "Information",
              color: "success",
              text: `Saved`,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-save",
            });
          };
          var onFinally = function () {
            self.$vs.loading.close(self.$refs.saveEditButton.$el);
          };

          self.$ajaxPost(self, "Users", self.formData, onSuccess, onFinally);
        } else if ((self.formData.password == self.formData.confirmPassword && self.showPasswordCheckbox) || !self.showPasswordCheckbox){
          self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: self.$validator.errors.items[0].msg,
            position: "top-right",
            iconPack: "feather",
            icon: "icon-info",
          });
        } else {
            self.$vs.notify({
            title: "Attention",
            color: "warning",
            text: "Passwords do not match.",
            position: "top-right",
            iconPack: "feather",
            icon: "icon-info",
          });

        }
      });
    },
    getDropdownAccountList(whenDone) {
      var self = this;
      
      var onSuccess = function(response) {
        
        self.accountData = response.data.map((item) => {return {label: item.name, value: item.id} });
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      self.$ajaxGet(self,"Accounts/GetAccountDropdown",onSuccess);    
    },
    addAccount(){
      var self = this;
      if(self.accountDropdown){
        self.selectedAccounts.push(self.accountDropdown);
        self.accountDropdown = 0;
        self.accountData = self.accountData.filter(function(item) { return !self.selectedAccounts.includes(item) });
      }
    },
    removeAccount(index) {
      this.selectedAccounts.splice(index,1)
    },
    loadAccounts(index){
      self.accountDropdown = index;
      self.selectedAccounts.push(self.accountDropdown);
    }
  },
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
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
