<template>
  <div>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div>
        <vs-table
          ref="gridTable"
          pagination
          :max-items="itemsPerPage"
          search
          :data="accountData"
          class="vs-con-loading__container"
        >
          <div
            slot="header"
            class="flex flex-wrap-reverse items-center flex-grow"
          >
            <vs-button
              class="rounded-lg mr-2"
              color="warning"
              type="filled"
              @click="getAccountsList"
              icon-pack="feather"
              icon="icon-refresh-ccw"
              >Reload</vs-button
            >
            <vs-button
              class="rounded-lg mr-2"
              color="success"
              type="filled"
              @click="showAddCard"
              icon-pack="feather"
              icon="icon-plus-square"
              >Add New</vs-button
            >
            <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
              <div
                class="
                  p-4
                  border border-solid border-grey-light
                  rounded-full
                  d-theme-dark-bg
                  cursor-pointer
                  flex
                  items-center
                  justify-between
                  font-medium
                "
              >
                <span class="mr-2"
                  >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                  {{
                    accountData.length - currentPage * itemsPerPage > 0
                      ? currentPage * itemsPerPage
                      : accountData.length
                  }}
                  of {{ accountData.length }}</span
                >
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage = 10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 20">
                  <span>20</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 50">
                  <span>50</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 100">
                  <span>100</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <template slot="thead">
            <vs-th sort-key="Name">Name</vs-th>
            <vs-th sort-key="MonthStartDate">Month Start Date</vs-th>
            <vs-th sort-key="MonthEndDate">Month End Date</vs-th>
            <vs-th sort-key="AccountType">Account Type</vs-th>
            <vs-th sort-key="AccountType">All App Access</vs-th>
            <vs-th sort-key="Active">Active</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.monthStartDate">{{ tr.monthStartDate }}</vs-td>
              <vs-td :data="tr.monthEndDate">{{ tr.monthEndDate }}</vs-td>
              <vs-td :data="tr.accountType">{{ tr.accountType }}</vs-td>
              <vs-td class="whitespace-no-wrap">
                <div
                  class="vx-col w-2/5 mb-2"
                  style="display: inline-flex; align-items: center"
                >
                  <div class="checkbocContainerPremium">
                    <vs-checkbox
                      :class="
                        'float-left mr-10' +
                        (checkSomePremium(tr) ? ' partialselectPremium' : '')
                      "
                      style="width: fit-content; flex-direction: column-reverse"
                      name="cbAllPremium"
                      id="cbAllPremium"
                      @change.native="checkAllPremium(tr, tr.allPremium)"
                      v-model="tr.allPremium"
                      >All Premium
                    </vs-checkbox>
                  </div>
                  <div class="checkbocContainerBasic">
                    <vs-checkbox
                      :class="
                        'float-left mr-10' +
                        (checkSomeBasic(tr) ? ' partialselectBasic' : '')
                      "
                      style="width: fit-content; flex-direction: column-reverse"
                      name="cbAllBasic"
                      id="cbAllBasic"
                      @change.native="checkAllBasic(tr, tr.allBasic)"
                      v-model="tr.allBasic"
                      >All Basic
                    </vs-checkbox>
                  </div>
                </div>
              </vs-td>
              <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
              <vs-td id="iconContainer" class="whitespace-no-wrap">
                <vx-tooltip class="flex" text="Edit Account Information">
                  <feather-icon
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-success stroke-current"
                  @click.stop="handelSelectedAccount(tr)"
                />
                </vx-tooltip>
                <vx-tooltip class="flex" text="Delete Account">
                  <feather-icon
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="deleteAccount(tr.id)"
                />
                </vx-tooltip>
                
              </vs-td>
              <template class="expand-user" slot="expand">
                <div class="con-expand-users w-full">
                  <div>
                    <vs-table ref="gridTable2" :data="tr.userIds">
                      <template slot="thead">
                        <vs-th>Account's active users</vs-th>
                        <vs-th>User's last login</vs-th>
                        <vs-th>App Access</vs-th>
                        <vs-th>Device Serial</vs-th>
                        <vs-th>Unlink User App</vs-th>
                        <vs-th>Unlink User From Account</vs-th>
                      </template>
                      <!-- visible: false -->
                      <template slot-scope="{ data }">
                        <vs-tr
                          :data="tr"
                          :key="indextr"
                          v-for="(tr, indextr) in data"
                        >
                          <vs-td :data="tr.label">{{ tr.label }}</vs-td>
                          <vs-td :data="tr.lastDate">{{ tr.lastDate }}</vs-td>
                          <vs-td class="whitespace-no-wrap">
                            <div
                              class="vx-col w-2/5 mb-2"
                              style="display: inline-flex; align-items: center"
                            >
                              <vs-checkbox
                                class="float-left mr-10"
                                style="
                                  width: fit-content;
                                  flex-direction: column-reverse;
                                "
                                name="cbPremium"
                                id="cbPremium"
                                @change.native="checkPremium(tr)"
                                v-model="tr.premiumAccess"
                                >Premium
                              </vs-checkbox>
                              <vs-checkbox
                                class="float-left"
                                style="
                                  width: fit-content;
                                  flex-direction: column-reverse;
                                "
                                name="cbBasic"
                                id="cbBasic"
                                @change.native="checkBasic(tr)"
                                v-model="tr.basicAccess"
                                >Basic
                              </vs-checkbox>
                            </div>
                          </vs-td>
                          <vs-td>
                            <vs-td :data="tr.deviceSerial">{{
                              tr.deviceSerial
                            }}</vs-td>
                          </vs-td>
                          <vs-td>
                            <vx-tooltip class="flex" text="Unlink Device">
                              <feather-icon
                              icon="TrashIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                              @click.stop="unlinkDevice(tr.value)"
                            />
                            </vx-tooltip>
                            
                          </vs-td>
                          <vs-td>
                            <vx-tooltip class="flex" text="Unlink User">
                              <feather-icon
                              icon="TrashIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                              @click.stop="unlinkUser(tr)"
                            />
                            </vx-tooltip>
                            
                          </vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
              </template>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>

    <vx-card
      class="card-height"
      id="siteInfoCard"
      title="Add Account"
      v-show="!isInfoHidden"
    >
      <vs-divider>Account Detail</vs-divider>
      <div class="vx-row pb-3">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <label>Name</label>
          <vs-input
            autocomplete="off"
            icon-no-border
            onClick="this.select();"
            class="w-full"
            v-validate="'required'"
            name="Account Name"
            icon-pack="feather"
            icon="icon-briefcase"
            v-model="formData.name"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('Account Name')"
            >{{ errors.first("Account Name") }}</span
          >
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <label>Account Type</label>
          <v-select
            ref="accountTypeDropdown"
            class="w-full"
            placeholder="Select Account Type"
            :options="accountTypeData"
            v-model="accountTypeDropdown"
          ></v-select>
        </div>
      </div>
      <div class="vx-row pb-3 mb-6">
        <div class="vx-col w-1/2 mb-2">
          <label>Month Start Date</label>
          <vs-input-number
            class="num-input_transparent"
            :min="1"
            :max="31"
            v-model="formData.monthStartDate"
          />
        </div>
        <div class="vx-col w-1/2 mb-2">
          <label>Month End Date</label>
          <vs-input-number
            class="num-input_transparent"
            :min="1"
            :max="31"
            v-model="formData.monthEndDate"
          />
        </div>

        <div class="vx-col">
          <vs-checkbox v-model="formData.enable">Active</vs-checkbox>
        </div>
      </div>
      <div class="vx-row pb-3" v-show="canAddEditUser">
        <div class="vx-col w-full mb-2">
          <label>Add Users to Selected Account</label>
          <v-select
            @search:blur="addUser"
            ref="userDropdown"
            class="w-full"
            placeholder="Select User"
            :options="userData"
            v-model="userDropdown"
          ></v-select>
          <vs-table
            ref="selectedUsersTable"
            stripe
            single
            :max-items="10"
            pagination
            :data="selectedUsers"
          >
            <template slot="thead">
              <vs-th sort-key="user">User</vs-th>
              <vs-th sort-key="password">Password</vs-th>
              <vs-th></vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr
                :data="user"
                :key="userIndex"
                v-for="(user, userIndex) in data"
              >
                <vs-td :data="data[userIndex].label">
                  {{ user.label }}
                </vs-td>
                <vs-td :data="data[userIndex].password">
                  {{ user.password }}
                </vs-td>

                <vs-td>
                  <vs-button
                    class="rounded-lg"
                    color="danger"
                    type="flat"
                    icon-pack="feather"
                    icon="icon-x"
                    @click.stop.prevent="removeUser(userIndex)"
                  ></vs-button>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
      <div class="vx-row">
        <vs-spacer />
        <div class="vx-col">
          <vs-button
            ref="saveEditButton"
            class="rounded-lg mr-3"
            color="success"
            type="border"
            @click="saveEditAccount"
            >Save</vs-button
          >
          <vs-button
            color="warning"
            class="rounded-lg"
            type="border"
            @click="cancelAddCard"
            >Cancel</vs-button
          >
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Datepicker from "vuejs-datepicker";
import { dataLoader } from "@amcharts/amcharts4/core";
export default {
  data() {
    return {
      title: "FAMS - new Employee Wizard!!",
      subtitle:
        "Please complete each tab to add new Employee (operator/driver)",

      isListHidden: false,
      isInfoHidden: true,

      itemsPerPage: 10,
      accountData: [],
      accountTypeData: [],
      accountTypeDropdown: 0,
      userData: [],
      userDropdown: 0,
      isMounted: false,
      selectedUsers: [],
      canAddEditUser: false,

      formData: {
        id: 0,
        name: "",
        monthStartDate: 1,
        monthEndDate: 31,
        enable: true,
        accountType: "",
        accountTypeId: "",
        userIds: [],
      },
      premiumUsers: [],
      basicUsers: [],
      checkBoxBasicClass: "float-left mr-10",
      checkBoxPremiumClass: "float-left mr-10",
      isAllBasic: "",
      someBasic: false,
      somePremium: false,
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    Datepicker,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  methods: {
    initValues() {
      var self = this;
      self.formData.id = 0;
      self.formData.name = "";
      self.formData.monthStartDate = 1;
      self.formData.monthEndDate = 31;
      self.formData.enable = true;
      self.accountTypeDropdown = 0;
      self.selectedUsers = [];
      self.userDropdown = 0;
      self.canAddEditUser = false;
      self.premiumUsers = [];
      self.basicUsers = [];
      self.basicStyle = "";
      self.checkBoxBasicClass = "float-left mr-10";
      self.checkBoxPremiumClass = "float-left mr-10";
    },
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Item successfully added | updated | removed",
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
    handelSelectedAccount(tr) {
      self = this;
      this.formData.id = tr.id;
      this.formData.name = tr.name;
      this.formData.monthStartDate = tr.monthStartDate;
      this.formData.monthEndDate = tr.monthEndDate;
      this.formData.enable = tr.enable;
      this.accountTypeDropdown = this.accountTypeData.filter(function (item) {
        return item.value == tr.accountTypeId;
      })[0];
      this.canAddEditUser = true;
      this.showUpdateCard();
      this.getDropdownUserList(function () {
        self.selectedUsers = tr.userIds;
        for (var i = 0; i < self.selectedUsers.length; i++) {
          //Original code. Did not work.
          //self.selectedUsers = self.userData.filter(function(item) { return tr.userIds.includes(item.value)});
          self.userData = self.userData.filter(
            (x) => x.value !== self.selectedUsers[i].value
          );
        }
      });
    },
    showUpdateCard() {
      this.isInfoHidden = false;
      this.isListHidden = true;
    },
    cancelAddCard() {
      (this.isListHidden = false), (this.isInfoHidden = true);
      this.initValues();
      this.getAccountsList();
    },
    showAddCard() {
      this.initValues();
      this.isInfoHidden = false;
      this.isListHidden = true;
      this.errors.clear();
    },
    saveEditAccount() {
      var self = this;

      if (self.accountTypeDropdown) {
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.showLoadingOnElement("saveEditButton", 0.65, "radius");

            self.formData.accountTypeId = self.accountTypeDropdown
              ? parseInt(self.accountTypeDropdown.value)
              : null;
            self.formData.userIds = self.selectedUsers.map(function (item) {
              return item.value;
            });

            var onSuccess = (response) => {
              self.cancelAddCard();
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

            self.$ajaxPost(
              self,
              "Accounts",
              self.formData,
              onSuccess,
              onFinally
            );
          } else {
            self.$vs.notify({
              title: "Attention",
              color: "warning",
              text: self.$validator.errors.items[0].msg,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-info",
            });
          }
        });
      } else {
        self.$vs.notify({
          title: "Attention",
          color: "warning",
          text: `Please select an Account Type`,
          position: "top-right",
          iconPack: "feather",
          icon: "icon-x",
        });
      }
    },
    deleteAccount(id) {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.getAccountsList();
        self.successNotify();
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(self, "Accounts/" + id, onSuccess, onFinally);
    },
    getAccountsList() {
      var self = this;
      self.initValues();
      self.showLoadingOnElement("gridTable", 1, "radius");

      var onSuccess = function (response) {
        self.accountData = response.data;        
      };

      var onFinally = function () {
        self.$vs.loading.close(self.$refs.gridTable.$el);
      };

      self.$ajaxGet(self, "Accounts/GetAccountList", onSuccess, onFinally);
    },
    getDropdownAccountTypesList() {
      var self = this;
      var onSuccess = function (response) {
        self.accountTypeData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      self.$ajaxGet(self, "Accounts/GetAccountTypedropdown", onSuccess);
    },
    getDropdownUserList(whenDone) {
      var self = this;
      var onSuccess = function (response) {
        self.userData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        if (whenDone && typeof whenDone == "function") whenDone();
      };
      self.$ajaxGet(self, "Users/GetUserdropdown", onSuccess);
    },
    addUser() {
      var self = this;
      if (self.userDropdown) {
        self.selectedUsers.push(self.userDropdown);
        self.userDropdown = 0;
        self.userData = self.userData.filter(function (item) {
          return !self.selectedUsers.includes(item);
        });
      }
    },
    removeUser(index) {
      this.selectedUsers.splice(index, 1);
    },
    checkBasic(data) {
      var self = this;
      var obj = {
        id: data.value,
        Access: data.basicAccess,
      };

      var onSuccess = (response) => {
      };

      var onFinally = (response) => {};

      self.$ajaxPost(
        self,
        "Accounts/GiveBasicAccess",
        obj,
        onSuccess,
        onFinally
      );
    },
    checkPremium(data) {
      var self = this;

      var obj = {
        id: data.value,
        Access: data.premiumAccess,
      };

      var onSuccess = (response) => {};

      var onFinally = (response) => {};

      self.$ajaxPost(
        self,
        "Accounts/GivePremiumAccess",
        obj,
        onSuccess,
        onFinally
      );
    },
    checkAllBasic(data, val) {
      var self = this;
      var checkbox = document.getElementById("cbAllBasic");
      
      var valueForCheck = false; 

      var basics = data.userIds.filter(function (item) {
        return item.basicAccess == true;
      });

      if (basics) {
        if (basics.length == 0) {
          valueForCheck = true;
        } else if (basics.length == data.userIds.length) {
          valueForCheck = false;
        } else {
          valueForCheck = true;
        }
      }

      var obj = {
          id: data.id,
          Access: valueForCheck,
        };

        var onSuccess = (response) => {
          self.getAccountsList();
        };

        var onFinally = (response) => {};

        self.$ajaxPost(
          self,
          "Accounts/GiveAllBasicAccess",
          obj,
          onSuccess,
          onFinally
        );
      
    },
    checkAllPremium(data, val) {
      var self = this;
      self.showLoadingOnElement("gridTable", 1, "radius");

      var valueForCheck = false; 

      var premiums = data.userIds.filter(function (item) {
        return item.premiumAccess == true;
      });

      if (premiums) {
        if (premiums.length == 0) {
          valueForCheck = true;
        } else if (premiums.length == data.userIds.length) {
          valueForCheck = false;
        } else {
          valueForCheck = true;
        }
      }

      var obj = {
          id: data.id,
          Access: valueForCheck,
        };

        var onSuccess = (response) => {
          self.getAccountsList();
        };

        var onFinally = (response) => {};

        self.$ajaxPost(
          self,
          "Accounts/GiveAllPremiumAccess",
          obj,
          onSuccess,
          onFinally
        );
    },
    checkSomePremium(data) {
      var self = this;
      var premium = data.userIds.filter(function (item) {
        return item.premiumAccess == false;
      });

      if (premium) {
        if (premium.length == 0) {
          data.allPremium = data.allPremium == false ? true : true;
          self.somePremium = false;
          return false;
        } else if (premium.length == data.userIds.length) {
          data.allPremium = data.allPremium == true ? false : false;
          self.somePremium = false;
          return false;
        } else {
          data.allPremium = false;
          self.somePremium = true;
          return true;
        }
      }
    },
    checkSomeBasic(data) {
      var self = this;
      var basics = data.userIds.filter(function (item) {
        return item.basicAccess == false;
      });

      if (basics) {
        if (basics.length == 0) {
          data.allBasic = data.allBasic == false ? true : true;
          self.someBasic = false;
          return false;
        } else if (basics.length == data.userIds.length) {
          data.allBasic = data.allBasic == true ? false : false;
          self.someBasic = false;
          return false;
        } else {
          data.allBasic = false;
          self.someBasic = true;
          return true;
        }
      }
    },
    unlinkDevice(id) {
      var self = this;
      var onSuccess = (response) => {
        self.$vs.notify({
          title: "Successfully",
          text: "User device successfully unlinked",
          color: "success",
        });
      };

      var onFinally = (response) => {};

      self.$ajaxGet(self, "Accounts/UnlinkDevice/" + id, onSuccess, onFinally);
    },
    unlinkUser(data) {
      var self = this;
      var obj = {};
      obj.userId = data.value;
      obj.accountId = data.accountId;

      var onSuccess = (response) => {
        self.$vs.notify({
          title: "Successfully",
          text: "User device successfully unlinked",
          color: "success",
        });
      };

      var onFinally = (response) => {};

      self.$ajaxPost(self, "Accounts/UnlinkUser", obj, onSuccess, onFinally);
    },
  },
  mounted() {
    this.getAccountsList();
    this.getDropdownAccountTypesList();
    this.isMounted = true;
  },
};
</script>
<style lang="scss">
.num-input_transparent {
  background-color: transparent !important;
  width: 90px !important;
}

.card-height {
  height: 80vh;
}

.partialselectPremium .checkbox_x {
  background-color: #ffff00;
}
.partialselectBasic .checkbox_x {
  background-color: #ffff00;
}
.checkbocContainerPremium {
  display: flex;
  position: relative;
}
.partialTextPremium {
  align-self: flex-end;
  position: absolute;
  left: 60px;
}
.checkbocContainerBasic {
  display: flex;
  position: relative;
}
.partialTextBasic {
  align-self: flex-end;
  position: absolute;
  left: 60px;
}


#iconContainer span{
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip{
  padding: 0px 1px;
}
</style>