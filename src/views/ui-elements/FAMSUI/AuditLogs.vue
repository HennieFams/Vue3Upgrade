<template>
  <div>
    <vs-tabs style="width: auto; min-height:500px" v-model="activeTab">
      <vs-tab label="Sign In Logs" style="min-height:500px" @click="getSignInLog()">
        <div class="vx-col w-full mb-base">
          <div>
            <vs-table ref="signinGrid" pagination :max-items="itemsPerPage2" search :data="signInData"
              class="vs-con-loading__container">
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">{{ currentPage2 * itemsPerPage2 - (itemsPerPage2 - 1) }}
                      -
                      {{
                        signInData.length - currentPage2 * itemsPerPage2 > 0
                          ? currentPage2 * itemsPerPage2
                          : signInData.length
                      }}
                      of {{ signInData.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu>
                    <vs-dropdown-item @click="totalRows2(10)">
                      <span>10</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="totalRows2(20)">
                      <span>20</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="totalRows2(50)">
                      <span>50</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="totalRows2(100)">
                      <span>100</span>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
              <template slot="thead">
                <vs-th sort-key="user">Username</vs-th>
                <vs-th sort-key="loginTime">Login Time</vs-th>
                <vs-th sort-key="accountName">Account Name</vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.user.name">{{ tr.user.name }}</vs-td>
                  <vs-td :data="tr.loginTime">{{ formatDate(tr.loginTime.replace("T", " ").split('.')[0]) }}</vs-td>
                  <vs-td :data="tr.accountName.name">{{ tr.accountName.name }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div>
            <h2>Total Logins For this month: {{ totalLogins }}</h2>
          </div>
        </div>
      </vs-tab>
      <vs-tab label="Equipment Audit Trail" style="min-height:500px" @click="getEqpAuditLog()">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
            <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="startDate" format="yyyy-MM-dd"
              name="From Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>To date</label>
            <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="endDate" format="yyyy-MM-dd"
              name="To Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
          </div>
        </div>
        <div class="vx-col w-full mb-base">
          <label class="w-full" size="small">Filter By User</label>
          <v-select class="w-full" placeholder="All" :options="eqpUsersData" v-model="eqpUsersDropDown" name="Report"
            v-validate="'required'" />
        </div>
        <div class="vx-col w-full mb-base">
          <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary"
            @click="getEqpAuditLog()">Submit</vs-button>
        </div>
        <div>
          <!-- hier nommer 1 -->
          <div id="EqpGrid" ref='eqpgrid' class="vs-con-loading__container">
            <div id="Grid"></div>
          </div>
          <!-- <vs-table
              ref="gridTable"
              pagination
              :max-items="itemsPerPage"
              search
              :data="eqpAuditLog"
              class="vs-con-loading__container"
            >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow"
            >
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2"
                  >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }}
                          -
                          {{
                            eqpAuditLog.length - currentPage * itemsPerPage > 0
                              ? currentPage * itemsPerPage
                              : eqpAuditLog.length
                          }}
                          of {{ eqpAuditLog.length }}</span>
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
              <vs-th sort-key="user">User</vs-th>
              <vs-th sort-key="auditType">Type</vs-th>
              <vs-th sort-key="auditActionType">Action</vs-th>
              <vs-th sort-key="registration">Registration</vs-th>
              <vs-th sort-key="name">Description</vs-th>
              <vs-th sort-key="tag">Tag</vs-th>
              <vs-th sort-key="createdate">Create Date</vs-th>
              <vs-th sort-key="consumption">Consumption</vs-th>
              <vs-th sort-key="equipmentMeasurement">Measurement</vs-th>
              <vs-th sort-key="equipmentRebate">Rebate</vs-th>
              <vs-th sort-key="equipmentType">Equipment Type</vs-th>
              <vs-th sort-key="maxLitres">maxLitres</vs-th>
              <vs-th sort-key="enable">enable</vs-th>
              <vs-th sort-key="reason">Reason</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.user">{{ tr.user }}</vs-td>
                <vs-td :data="tr.auditActionType">{{ tr.auditActionType }}</vs-td>
                <vs-td :data="tr.auditType">{{ tr.auditType }}</vs-td>
                <vs-td :data="tr.registration">{{ tr.registration }}</vs-td>
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
                <vs-td :data="tr.createdate">{{ formatDate(tr.createdate.replace("T", " ").split('.')[0]) }}</vs-td>
                <vs-td :data="tr.consumption">{{ tr.consumption }}</vs-td>
                <vs-td :data="tr.equipmentMeasurement">{{ tr.equipmentMeasurement }}</vs-td>
                <vs-td :data="tr.equipmentRebate">{{ tr.equipmentRebate }}</vs-td>
                <vs-td :data="tr.equipmentType">{{ tr.equipmentType }}</vs-td>
                <vs-td :data="tr.maxLitres">{{ tr.maxLitres }}</vs-td>
                <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
                <vs-td :data="tr.reason">{{ tr.reason }}</vs-td>
              </vs-tr>
            </template>
          </vs-table> -->
        </div>
      </vs-tab>
      <vs-tab label="Employee Audit Trail" style="min-height:500px" @click="getEmpAuditLog()">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
            <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="startDate2" format="yyyy-MM-dd"
              name="From Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>To date</label>
            <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="endDate2" format="yyyy-MM-dd"
              name="To Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
          </div>
        </div>
        <div class="vx-col w-full mb-base">
          <label class="w-full" size="small">Filter By User</label>
          <v-select class="w-full" placeholder="All" :options="empUsersData" v-model="empUsersDropDown" name="Report"
            v-validate="'required'" />
        </div>
        <div class="vx-col w-full mb-base">
          <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary"
            @click="getEmpAuditLog()">Submit</vs-button>
        </div>
        <div>
          <div id="EmpGrid" ref='empgrid' class="vs-con-loading__container">
            <div id="Grid"></div>
          </div>
          <!-- <vs-table
              ref="gridTable2"
              pagination
              :max-items="itemsPerPage3"
              search
              :data="empAuditLog"
              class="vs-con-loading__container"
            >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow"
            >
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2"
                  >{{ currentPage3 * itemsPerPage3 - (itemsPerPage3 - 1) }}
                          -
                          {{
                            empAuditLog.length - currentPage3 * itemsPerPage3 > 0
                              ? currentPage3 * itemsPerPage3
                              : empAuditLog.length
                          }}
                          of {{ empAuditLog.length }}</span>
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
              <vs-th sort-key="createDate">Audit Date</vs-th>
              <vs-th sort-key="employee">Employee</vs-th>
              <vs-th sort-key="desc">Description</vs-th>
              <vs-th sort-key="user">Changed By</vs-th>
              <vs-th sort-key="reason">Reason</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.createDate">{{ formatDate(tr.createDate.replace("T", " ").split('.')[0]) }}</vs-td>
                <vs-td :data="tr.employee">{{ tr.employee }}</vs-td>
                <vs-td :data="tr.desc">{{ tr.desc }}</vs-td>
                <vs-td :data="tr.user">{{ tr.user }}</vs-td>
                <vs-td :data="tr.reason">{{ tr.reason }}</vs-td>
              </vs-tr>
            </template>
          </vs-table> -->
        </div>
      </vs-tab>
      <vs-tab label="Equipment Parameters Audit Trail" style="min-height:500px" @click="getEqpParamAuditLog()">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
            <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="startDate3" format="yyyy-MM-dd"
              name="From Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>To date</label>
            <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="endDate3" format="yyyy-MM-dd"
              name="To Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
          </div>
        </div>
        <div class="vx-col w-full mb-base">
          <label class="w-full" size="small">Filter By User</label>
          <v-select class="w-full" placeholder="All" :options="eqpParamsUsersData" v-model="eqpParamsUsersDropDown"
            name="Report" v-validate="'required'" />
        </div>
        <div class="vx-col w-full mb-base">
          <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary"
            @click="getEqpParamAuditLog()">Submit</vs-button>
        </div>
        <div>
          <div id="EqpParamGrid" ref='eqpparamgrid' class="vs-con-loading__container">
            <div id="Grid"></div>
          </div>
          <!-- <vs-table
              ref="gridTable3"
              pagination
              :max-items="itemsPerPage4"
              search
              :data="eqpParamsAuditLog"
              class="vs-con-loading__container"
            >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow"
            >
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2"
                  >{{ currentPage4 * itemsPerPage4 - (itemsPerPage4 - 1) }}
                          -
                          {{
                            eqpParamsAuditLog.length - currentPage4 * itemsPerPage4 > 0
                              ? currentPage4 * itemsPerPage4
                              : eqpParamsAuditLog.length
                          }}
                          of {{ eqpParamsAuditLog.length }}</span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item @click="totalRows4(10)">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="totalRows4(20)">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="totalRows4(50)">
                    <span>50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="totalRows4(100)">
                    <span>100</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <template slot="thead">
              <vs-th sort-key="createdate">Audit Date</vs-th>
              <vs-th sort-key="store">Store</vs-th>
              <vs-th sort-key="equipmentReg">EquipmentReg</vs-th>
              <vs-th sort-key="equipmentTag">EquipmentTag</vs-th>
              <vs-th sort-key="equipmentDesc">EquipmentDesc</vs-th>
              <vs-th sort-key="equipmentLitres">EquipmentLitres</vs-th>
              <vs-th sort-key="auditType">Audit Type</vs-th>
              <vs-th sort-key="auditActionType">Audit Action Type</vs-th>
              <vs-th sort-key="requireDriver">Require Driver</vs-th>
              <vs-th sort-key="requireOperator">Require Operator</vs-th>
              <vs-th sort-key="requireAuthentication">Require Authentication</vs-th>
              <vs-th sort-key="requireKm">Require Km</vs-th>
              <vs-th sort-key="requireHours">Require Hours</vs-th>
              <vs-th sort-key="requireAllocation">Require Allocation</vs-th>
              <vs-th sort-key="requireJobOrder">Require JobOrder</vs-th>
              <vs-th sort-key="product1">Product 1</vs-th>
              <vs-th sort-key="maxlitres1">Maxlitres 1</vs-th>
              <vs-th sort-key="product2">Product 2</vs-th>
              <vs-th sort-key="maxlitres2">Maxlitres 2</vs-th>
              <vs-th sort-key="download">Download</vs-th>
              <vs-th sort-key="user">User</vs-th>
              <vs-th sort-key="reason">Reason</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.createdate">{{ formatDate(tr.createdate.replace("T", " ").split('.')[0]) }}</vs-td>
                <vs-td :data="tr.store">{{ tr.store }}</vs-td>
                <vs-td :data="tr.equipmentReg">{{ tr.equipmentReg }}</vs-td>
                <vs-td :data="tr.equipmentTag">{{ tr.equipmentTag }}</vs-td>
                <vs-td :data="tr.equipmentDesc">{{ tr.equipmentDesc }}</vs-td>
                <vs-td :data="tr.equipmentLitres">{{ tr.equipmentLitres }}</vs-td>
                <vs-td :data="tr.auditType">{{ tr.auditType }}</vs-td>
                <vs-td :data="tr.auditActionType">{{ tr.auditActionType }}</vs-td>
                <vs-td :data="tr.requireDriver">{{ tr.requireDriver }}</vs-td>
                <vs-td :data="tr.requireOperator">{{ tr.requireOperator }}</vs-td>
                <vs-td :data="tr.requireAuthentication">{{ tr.requireAuthentication }}</vs-td>
                <vs-td :data="tr.requireKm">{{ tr.requireKm }}</vs-td>
                <vs-td :data="tr.requireHours">{{ tr.requireHours }}</vs-td>
                <vs-td :data="tr.requireAllocation">{{ tr.requireAllocation }}</vs-td>
                <vs-td :data="tr.requireJobOrder">{{ tr.requireJobOrder }}</vs-td>
                <vs-td :data="tr.product1">{{ tr.product1 }}</vs-td>
                <vs-td :data="tr.maxlitres1">{{ tr.maxlitres1 }}</vs-td>
                <vs-td :data="tr.product2">{{ tr.product2 }}</vs-td>
                <vs-td :data="tr.maxlitres2">{{ tr.maxlitres2 }}</vs-td>
                <vs-td :data="tr.download">{{ tr.download }}</vs-td>
                <vs-td :data="tr.user">{{ tr.user }}</vs-td>
                <vs-td :data="tr.reason">{{ tr.reason }}</vs-td>
              </vs-tr>
            </template>
          </vs-table> -->
        </div>
      </vs-tab>
      <vs-tab label="Usage Dispensing Audit Trail" style="min-height:500px" @click="getUDAuditLog()">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
            <datepicker class="w-full" id="FromDate" placeholder="From Date" v-model="startDate" format="yyyy-MM-dd"
              name="From Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('From Date')">{{ errors.first('From Date') }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>To date</label>
            <datepicker class="w-full" id="ToDate" placeholder="To Date" v-model="endDate" format="yyyy-MM-dd"
              name="To Date" v-validate="'required'"></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')">{{ errors.first('To Date') }}</span>
          </div>
        </div>
        <div class="vx-col w-full mb-base">
          <!-- <label class="w-full" size="small">Filter By User</label>
          <v-select class="w-full" placeholder="All" :options="eqpUsersData"  v-model="eqpUsersDropDown"
            name ="Report" v-validate="'required'" /> -->
        </div>
        <div class="vx-col w-full mb-base">
          <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary"
            @click="getUDAuditLog()">Submit</vs-button>
        </div>
        <div>
          <!-- hier nommer 1 -->
          <div id="UDGrid" ref='udgrid' class="vs-con-loading__container">
            <div id="Grid"></div>
          </div>
        </div>
      </vs-tab>
      <!-- <vs-tab label="Allocation Audit Trail" style="min-height:500px" @click="getAllocAuditLog()">
        <div class="vx-row">
          <div class="vx-col md:w-1/2 w-full mt-2">
            <label>From date</label>
            <datepicker
              class="w-full"
              id="FromDate"
              placeholder="From Date"
              v-model="startDate"
              format="yyyy-MM-dd"
              name ="From Date" v-validate="'required'"
            ></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('From Date')" >{{ errors.first('From Date') }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full mt-2">
              <label>To date</label>
              <datepicker
                  class="w-full"
                  id="ToDate"
                  placeholder="To Date"
                  v-model="endDate"
                  format="yyyy-MM-dd"
                  name ="To Date" v-validate="'required'"
            ></datepicker>
            <span class="text-danger text-sm" v-show="errors.has('To Date')" >{{ errors.first('To Date') }}</span>
          </div>
        </div>
        <div class="vx-col w-full mb-base">
          <label class="w-full" size="small">Filter By Table</label>
          <v-select class="w-full" placeholder="All" :options="allocUsersData"  v-model="allocUsersDropDown"
            name ="Report" v-validate="'required'" />
          </div>
          <div class="vx-col w-full mb-base">
            <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary" @click="getAllocAuditLog()">Submit</vs-button>
          </div>
          <div>
            <vs-table
              ref="gridTable"
              pagination
              :max-items="itemsPerPage5"
              search
              :data="allocAuditLog"
              class="vs-con-loading__container"
            >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow"
            >
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                <div class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2"
                  >{{ currentPage5 * itemsPerPage5 - (itemsPerPage5 - 1) }}
                          -
                          {{
                            empAuditLog.length - currentPage5 * itemsPerPage5 > 0
                              ? currentPage5 * itemsPerPage5
                              : empAuditLog.length
                          }}
                          of {{ empAuditLog.length }}</span>
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
              <vs-th sort-key="user">User</vs-th>
              <vs-th sort-key="auditType">Type</vs-th>
              <vs-th sort-key="auditActionType">Action</vs-th>
              <vs-th sort-key="registration">Registration</vs-th>
              <vs-th sort-key="name">Description</vs-th>
              <vs-th sort-key="tag">Tag</vs-th>
              <vs-th sort-key="createdate">Create Date</vs-th>
              <vs-th sort-key="consumption">Consumption</vs-th>
              <vs-th sort-key="equipmentMeasurement">Measurement</vs-th>
              <vs-th sort-key="equipmentRebate">Rebate</vs-th>
              <vs-th sort-key="equipmentType">Equipment Type</vs-th>
              <vs-th sort-key="maxLitres">maxLitres</vs-th>
              <vs-th sort-key="enable">enable</vs-th>
              <vs-th sort-key="reason">Reason</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.user">{{ tr.user }}</vs-td>
                <vs-td :data="tr.auditActionType">{{ tr.auditActionType }}</vs-td>
                <vs-td :data="tr.auditType">{{ tr.auditType }}</vs-td>
                <vs-td :data="tr.registration">{{ tr.registration }}</vs-td>
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                <vs-td :data="tr.tag">{{ tr.tag }}</vs-td>
                <vs-td :data="tr.createdate">{{ formatDate(tr.createdate.replace("T", " ").split('.')[0]) }}</vs-td>
                <vs-td :data="tr.consumption">{{ tr.consumption }}</vs-td>
                <vs-td :data="tr.equipmentMeasurement">{{ tr.equipmentMeasurement }}</vs-td>
                <vs-td :data="tr.equipmentRebate">{{ tr.equipmentRebate }}</vs-td>
                <vs-td :data="tr.equipmentType">{{ tr.equipmentType }}</vs-td>
                <vs-td :data="tr.maxLitres">{{ tr.maxLitres }}</vs-td>
                <vs-td :data="tr.enable">{{ tr.enable }}</vs-td>
                <vs-td :data="tr.reason">{{ tr.reason }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vs-tab> -->
    </vs-tabs>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import VxCard from "../../../components/vx-card/VxCard.vue";
import moment from "moment";
import { GridPlugin, Grid, DetailRow, Aggregate, ExcelExport, Page, RowDD, Selection, Group, Toolbar, Search, Reorder, Sort, Filter, setFormatter } from "@syncfusion/ej2-vue-grids";
Vue.use(GridPlugin);
Grid.Inject(Sort, Page, Toolbar, Aggregate, ExcelExport, DetailRow, Search);
export default {
  data() {
    return {
      isVisible: false,
      exceptionQueueData: [],
      exceptionDropDown: 0,
      itemsPerPage: 10,
      itemsPerPage2: 10,
      itemsPerPage3: 10,
      itemsPerPage4: 10,
      itemsPerPage5: 10,
      isMounted: false,
      isMounted2: false,
      isMounted3: false,
      isMounted4: false,
      isMounted5: false,
      exceptionData: [],

      eqpAuditLog: [],
      empAuditLog: [],
      eqpParamsAuditLog: [],
      allocAuditLog: [],
      udAuditLog: [],
      eqpUsersData: [],
      eqpUsersDropDown: { value: 0, label: "All" },
      eqpParamsUsersData: [],
      eqpParamsUsersDropDown: { value: 0, label: "All" },
      empUsersData: [],
      empUsersDropDown: { value: 0, label: "All" },
      allocUsersData: [],
      allocUsersDropDown: { value: 0, label: "All" },
      auditData: [],
      signInData: [],
      totalLogins: 0,
      startDate: "",
      endDate: "",
      startDate2: "",
      endDate2: "",
      startDate3: "",
      endDate3: "",
      startDate4: "",
      endDate4: "",
      eqpAuditColumns: [
        {
          field: "user",
          headerText: "User",
          textAlign: "Left",
          width: 160,
          type: "string"
        },
        {
          field: "auditActionType",
          headerText: "Type",
          textAlign: "Left",
          width: 150,
          type: "string"
        },
        {
          field: "auditType",
          headerText: "Action",
          textAlign: "Left",
          width: 150,
          type: "string"
        },
        {
          field: "registration",
          headerText: "Registration",
          textAlign: "Left",
          width: 160,
          type: "string"
        },
        {
          field: "name",
          headerText: "Description",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "tag",
          headerText: "Tag",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
        {
          field: "createdate",
          headerText: "Create Date",
          textAlign: "Left",
          width: 200,
          format: 'yyyy-MM-dd HH:mm:ss',
          type: "date"
        },
        {
          field: "consumption",
          headerText: "Consumption",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "equipmentMeasurement",
          headerText: "Measurement",
          textAlign: "Left",
          width: 80,
          type: "string"
        },
        {
          field: "equipmentRebate",
          headerText: "Rebate",
          textAlign: "Left",
          width: 150,
          type: "string"
        },
        {
          field: "equipmentType",
          headerText: "Equipment Type",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
        {
          field: "maxLitres",
          headerText: "Max Litres",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "enable",
          headerText: "enable",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
        {
          field: "reason",
          headerText: "reason",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
      ],
      empAuditColumns: [
        {
          field: "createDate",
          headerText: "Audit Date",
          textAlign: "Left",
          width: 200,
          format: 'yyyy-MM-dd HH:mm:ss',
          type: "date"
        },
        {
          field: "employee",
          headerText: "Employee",
          textAlign: "Left",
          width: 160,
          type: "string"
        },
        {
          field: "desc",
          headerText: "Description",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "user",
          headerText: "Changed By",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "reason",
          headerText: "reason",
          textAlign: "Left",
          width: 120,
          type: "string"
        }
      ],
      eqpParamAuditColumns: [
        {
          field: "createdate",
          headerText: "Audit Date",
          textAlign: "Left",
          width: 200,
          format: 'yyyy-MM-dd HH:mm:ss',
          type: "date"
        },
        {
          field: "store",
          headerText: "Store",
          textAlign: "Left",
          width: 160,
          type: "string"
        },
        {
          field: "equipmentReg",
          headerText: "EQP Registration",
          textAlign: "Left",
          width: 150,
          type: "string"
        },
        {
          field: "equipmentTag",
          headerText: "Tag",
          textAlign: "Left",
          width: 150,
          type: "string"
        },
        {
          field: "equipmentDesc",
          headerText: "EQP Description",
          textAlign: "Left",
          width: 160,
          type: "string"
        },
        {
          field: "equipmentLitres",
          headerText: "Equipment Litres",
          textAlign: "Left",
          width: 180,
          type: "number"
        },
        {
          field: "auditType",
          headerText: "Audit Type",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
        {
          field: "auditActionType",
          headerText: "Audit Action Type",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
        {
          field: "requireDriver",
          headerText: "Require Driver",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "requireOperator",
          headerText: "Require Fuel Att",
          textAlign: "Left",
          width: 80,
          type: "number"
        },
        {
          field: "requireAuthentication",
          headerText: "Require Auth",
          textAlign: "Left",
          width: 150,
          type: "number"
        },
        {
          field: "requireKm",
          headerText: "Require KM",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "requireHours",
          headerText: "Require Hours",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "requireAllocation",
          headerText: "Require Allocation",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "requireJobOrder",
          headerText: "Require Job Order",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "product1",
          headerText: "Product 1",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "maxlitres1",
          headerText: "Max Litres 1",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "product2",
          headerText: "Product 2",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "maxlitres2",
          headerText: "Max Litres 2",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "download",
          headerText: "Download",
          textAlign: "Left",
          width: 120,
          type: "number"
        },
        {
          field: "user",
          headerText: "User",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
        {
          field: "reason",
          headerText: "reason",
          textAlign: "Left",
          width: 120,
          type: "string"
        },
      ],
      udAuditColumns: [
        {
          field: "username", headerText: "User", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "store", headerText: "Store", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "equipment", headerText: "Equipment", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "product", headerText: "Product", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "fuelAtt", headerText: "Fuel Attendant", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "driver", headerText: "Driver", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "authorization", headerText: "Authorization", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "allocation", headerText: "Allocation 1", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "allocation2", headerText: "Allocation 2", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "allocation3", headerText: "Allocation 3", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "allocation4", headerText: "Allocation 4", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "km", headerText: "KM", textAlign: "Left", width: 100, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "hour", headerText: "Hour", textAlign: "Left", width: 100, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "createdate", headerText: "Create Date", textAlign: "Left", width: 180,
          format: 'yyyy-MM-dd HH:mm:ss', type: "date", filter: { type: 'FilterBar' }
        },
        {
          field: "startTime", headerText: "Start Time", textAlign: "Left", width: 120, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "endTime", headerText: "End Time", textAlign: "Left", width: 120, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "duration", headerText: "Duration (min)", textAlign: "Left", width: 130, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "volume", headerText: "Volume (L)", textAlign: "Left", width: 130, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "fuelPrice", headerText: "Fuel Price", textAlign: "Left", width: 120, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "jobNumber", headerText: "Job Number", textAlign: "Left", width: 160, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "description", headerText: "Description", textAlign: "Left", width: 180, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "auditType", headerText: "Audit Type", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "auditActionType", headerText: "Audit Action", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "recordType", headerText: "Record Type", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "informationReg", headerText: "Reg Info", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "informationOpr", headerText: "Operator Info", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "informationAth", headerText: "Auth Info", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "informationDrv", headerText: "Driver Info", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "informationAllocation", headerText: "Allocation Info", textAlign: "Left", width: 150, type: "string",
          filter: { type: 'FilterBar' }
        },
        {
          field: "origKM", headerText: "Original KM", textAlign: "Left", width: 130, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "origHour", headerText: "Original Hour", textAlign: "Left", width: 130, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "origVolume", headerText: "Original Volume", textAlign: "Left", width: 130, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "totalizer", headerText: "Totalizer Start", textAlign: "Left", width: 130, type: "number",
          filter: { type: 'FilterBar' }
        },
        {
          field: "totalizerEnd", headerText: "Totalizer End", textAlign: "Left", width: 130, type: "number",
          filter: { type: 'FilterBar' }
        }
      ],

      toolbar: ['ExcelExport', 'CsvExport', 'Print', 'Search'],
      famsDBData: [],
      aggregateColumn: [],
      flag: true,
      flag2: true,
      flag3: true,
      grid: '',
      activeTab: 0,
    };
  },
  components: {
    Datepicker,
    "v-select": vSelect,
    flatPickr,
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
    currentPage2() {
      if (this.isMounted2) {
        return this.$refs.signinGrid.currentx;
      }
      return 0;
    },
    currentPage3() {
      if (this.isMounted3) {
        return this.$refs.gridTable2.currentx;
      }
      return 0;
    },
    currentPage4() {
      if (this.isMounted4) {
        return this.$refs.gridTable3.currentx;
      }
      return 0;
    },
    currentPage5() {
      if (this.isMounted5) {
        return this.$refs.gridTable4.currentx;
      }
      return 0;
    },
  },
  watch: {
    activeDashTab: function (val) {
      var self = this;
      if (val == 1) {
        setTimeout(function () {
          var date = new Date();
          self.startDate2 = new Date(date.getFullYear(), date.getMonth(), 1);
          self.endDate2 = new Date(date.getFullYear(), date.getMonth() + 1, 1);
          // self.flag = true;
        }, 100);
      } else if (val == 2) {
        setTimeout(function () {
          var date = new Date();
          self.startDate3 = new Date(date.getFullYear(), date.getMonth(), 1);
          self.endDate3 = new Date(date.getFullYear(), date.getMonth() + 1, 1);
          // self.flag = true;
        }, 100);
      } else if (val == 3) {
        setTimeout(function () {
          var date = new Date();
          self.startDate4 = new Date(date.getFullYear(), date.getMonth(), 1);
          self.endDate4 = new Date(date.getFullYear(), date.getMonth() + 1, 1);
          // self.flag = true;
        }, 100);
      }
    },
  },
  mounted() {
    var date = new Date();
    this.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.startDate2 = new Date(date.getFullYear(), date.getMonth(), 1);
    this.endDate2 = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.startDate3 = new Date(date.getFullYear(), date.getMonth(), 1);
    this.endDate3 = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.startDate4 = new Date(date.getFullYear(), date.getMonth(), 1);
    this.endDate4 = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.GetUsers();
    this.getSignInLog();
    //this.totalLoginsForMonth();
  },
  methods: {
    toolbarClick(args) {
      switch (args['item'].text) {
        case 'PDF Export':
          this.grid.pdfExport({ fileName: "AuditExport.pdf" });
          break;
        case 'Excel Export':
          this.grid.excelExport({ fileName: "AuditExport.xlsx" });
          break;
        case 'CSV Export':
          this.grid.csvExport({ fileName: "AuditExport.csv" });
          break;
      }
    },
    initValues() {
      this.empUsersDropDown = { value: 0, label: "All" };
      this.eqpUsersDropDown = { value: 0, label: "All" };
      this.eqpParamsUsersDropDown = { value: 0, label: "All" };
      this.allocUsersDropDown = { value: 0, label: "All" };
      this.empUsersData = [];
      this.eqpParamsUsersData = [];
      this.eqpUsersData = [];
      this.allocUsersData = [];
      this.auditData = [];
      this.eqpAuditLog = [];
      this.empAuditLog = [];
      this.eqpParamsAuditLog = [];
      this.allocAuditLog = [];

      this.startDate = "";
      this.startDate2 = "";
      this.startDate3 = "";
      this.startDate4 = "";
      this.endDate = "";
      this.endDate2 = "";
      this.endDate3 = "";
      this.endDate4 = "";

      var date = new Date();
      this.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.startDate2 = new Date(date.getFullYear(), date.getMonth(), 1);
      this.startDate3 = new Date(date.getFullYear(), date.getMonth(), 1);
      this.startDate4 = new Date(date.getFullYear(), date.getMonth(), 1);
      this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.endDate2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.endDate3 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.endDate4 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:MM");
      }
    },
    totalRows(rowCount) {
      this.itemsPerPage = rowCount;
      this.$refs.gridTable.currentx = 1;
    },
    totalRows2(rowCount) {
      this.itemsPerPage2 = rowCount;
      this.$refs.signinGrid.currentx = 1;
    },
    totalRows3(rowCount) {
      this.itemsPerPage3 = rowCount;
      this.$refs.gridTable2.currentx = 1;
    },
    totalRows4(rowCount) {
      this.itemsPerPage4 = rowCount;
      this.$refs.gridTable3.currentx = 1;
    },
    totalRows5(rowCount) {
      this.itemsPerPage5 = rowCount;
      this.$refs.gridTable4.currentx = 1;
    },
    getEqpAuditLog() {
      var self = this;
      var userId = self.eqpUsersDropDown ? self.eqpUsersDropDown.value : 0;
      setTimeout(function () {
        self.showLoadingOnElement("eqpgrid", 1, "radius");
        var onSuccess = function (response) {
          self.eqpAuditLog = response.data;//.slice(0,500);
          // self.tableData = Array.from(new Set(response.data.map(x=> x.username)));
          //self.isMounted = true;
          //self.$refs.gridTable.currentx = 1;

          self.famsDBData = response.data;
          self.aggregateColumn = [{
            columns: [
              {
                type: 'Sum',
                field: 'volume',
                textAlign: "Left",
                footerTemplate: 'Total Volume: ${Sum}'
              }
            ]
          },
          ];

          if (self.flag) {
            self.grid = new Grid({
              excelExportComplete: 'excelExportComplete',
              allowSorting: true,
              allowPaging: true,
              allowExcelExport: true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick: self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.eqpAuditColumns,
              height: 500,
              PageSettings: 20,
              aggregates: self.aggregateColumn

            });
            self.flag = false;
            self.grid.appendTo("#EqpGrid");
            self.grid.refresh()
          }
          else {
            self.grid.dataSource = self.famsDBData;
            self.grid.refresh();
          }
        };

        var onFinally = function () {
          self.$vs.loading.close(self.$refs.eqpgrid.$el);
        };

        self.$ajaxGet(
          self,
          `DataIntegrity/GetEquipmentAudit?&fromdate=${self.dateFormat(self.startDate)}&todate=${self.dateFormat(self.endDate)}&userId=${userId}`,
          onSuccess,
          onFinally
        );
      }, 500);
    },
    getEmpAuditLog() {
      var self = this;
      var userId = self.empUsersDropDown ? self.empUsersDropDown.value : 0;
      setTimeout(function () {
        self.showLoadingOnElement("empgrid", 1, "radius");
        var onSuccess = function (response) {
          self.empAuditLog = response.data;//.slice(0,500);
          // self.tableData = Array.from(new Set(response.data.map(x=> x.username)));
          // self.isMounted3 = true;
          // self.$refs.gridTable2.currentx = 1;

          self.famsDBData = response.data;
          self.aggregateColumn = [{
            columns: [
              {
                type: 'Sum',
                field: 'volume',
                textAlign: "Left",
                footerTemplate: 'Total Volume: ${Sum}'
              }
            ]
          },
          ];

          if (self.flag2) {
            self.grid = new Grid({
              excelExportComplete: 'excelExportComplete',
              allowSorting: true,
              allowPaging: true,
              allowExcelExport: true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick: self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.empAuditColumns,
              height: 500,
              PageSettings: 20,
              aggregates: self.aggregateColumn

            });
            self.flag2 = false;
            self.grid.appendTo("#EmpGrid");
            self.grid.refresh()
          }
          else {
            self.grid.dataSource = self.famsDBData;
            self.grid.refresh();
          }

        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.empgrid.$el);
        };
        self.$ajaxGet(
          self,
          `DataIntegrity/GetEmployeeAudit?&fromdate=${self.dateFormat(self.startDate2)}&todate=${self.dateFormat(self.endDate2)}&userId=${userId}`,
          onSuccess,
          onFinally
        );
      }, 500);
    },
    getEqpParamAuditLog() {
      var self = this;
      var userId = self.eqpParamsUsersDropDown ? self.eqpParamsUsersDropDown.value : 0;
      setTimeout(function () {
        self.showLoadingOnElement("eqpparamgrid", 1, "radius");
        var onSuccess = function (response) {
          self.eqpParamsAuditLog = response.data;//.slice(0,500);
          // self.tableData = Array.from(new Set(response.data.map(x=> x.username)));
          // self.isMounted4 = true;
          // self.$refs.gridTable3.currentx = 1;

          self.famsDBData = response.data;
          self.aggregateColumn = [{
            columns: [
              {
                type: 'Sum',
                field: 'volume',
                textAlign: "Left",
                footerTemplate: 'Total Volume: ${Sum}'
              }
            ]
          },
          ];


          if (self.flag3) {
            self.grid = new Grid({
              excelExportComplete: 'excelExportComplete',
              allowSorting: true,
              allowPaging: true,
              allowExcelExport: true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick: self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.eqpParamAuditColumns,
              height: 500,
              PageSettings: 20,
              aggregates: self.aggregateColumn

            });
            self.flag3 = false;
            self.grid.appendTo("#EqpParamGrid");
            self.grid.refresh()
          }
          else {
            self.grid.dataSource = self.famsDBData;
            self.grid.refresh();
          }
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.eqpparamgrid.$el);
        };
        self.$ajaxGet(
          self,
          `DataIntegrity/GetEquipmentParamAudit?&fromdate=${self.dateFormat(self.startDate3)}&todate=${self.dateFormat(self.endDate3)}&userId=${userId}`,
          onSuccess,
          onFinally
        );
      }, 500);
    },
    getSignInLog() {
      var self = this;
      setTimeout(function () {
        self.showLoadingOnElement("signinGrid", 1, "radius");
        var onSuccess = function (response) {
          self.isMounted2 = true;
          self.signInData = response.data;
          self.$refs.signinGrid.currentx = 1
          self.totalLoginsForMonth();
        };
        var onFinally = function () {
          self.$vs.loading.close(self.$refs.signinGrid.$el);
        };
        self.$ajaxGet(
          self,
          `DataIntegrity/GetSignInLog`,
          onSuccess,
          onFinally
        );
      }, 500);
    },
    totalLoginsForMonth() {
      const self = this;
      self.totalLogins = self.signInData.filter(x => self.formatDate(x.loginTime.replace("T", " ").split('.')[0]) >= self.formatDate(self.startDate) && self.formatDate(x.loginTime.replace("T", " ").split('.')[0]) <= self.formatDate(self.endDate)).length;
    },
    successNotifyLoad() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully loaded',
        color: 'success'
      })
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    dateFormat(date) {
      var month = "";
      var year = "";
      var day = "";

      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    GetUsers() {
      const self = this;
      self.eqpUsersData = [];
      self.eqpParamsUsersData = [];
      self.allocUsersData = [];
      self.empUsersData = [];
      var onSuccess = function (response) {
        self.eqpUsersData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.eqpParamsUsersData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.allocUsersData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        self.empUsersData = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () { };
      self.$ajaxGet(
        self,
        "Users/GetAccountUserdropdown",
        onSuccess,
        onFinally
      );
    },
    getUDAuditLog() {
      var self = this;
      var userId = self.eqpUsersDropDown ? self.eqpUsersDropDown.value : 0;
      setTimeout(function () {
        self.showLoadingOnElement("udgrid", 1, "radius");
        var onSuccess = function (response) {
          self.udAuditLog = response.data;//.slice(0,500);
          // self.tableData = Array.from(new Set(response.data.map(x=> x.username)));
          //self.isMounted = true;
          //self.$refs.gridTable.currentx = 1;

          self.famsDBData = response.data;
          self.aggregateColumn = [{
            columns: [
              {
                type: 'Sum',
                field: 'volume',
                textAlign: "Left",
                footerTemplate: 'Total Volume: ${Sum}'
              }
            ]
          },
          ];

          if (self.flag) {
            self.grid = new Grid({
              excelExportComplete: 'excelExportComplete',
              allowSorting: true,
              allowPaging: true,
              allowExcelExport: true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick: self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.udAuditColumns,
              height: 500,
              PageSettings: 20,
              aggregates: self.aggregateColumn,
              allowFiltering: true,
              filterSettings: { type: 'FilterBar', showFilterBarStatus: true, showFilterBarOperator: true, showClearButton: true, mode: 'Immediate', operators: { stringOperator: { equal: 'Equal', notEqual: 'Not Equal', contains: 'Contains', doesNotContain: 'Does Not Contain', startsWith: 'Starts With', endsWith: 'Ends With' } },  },

            });
            self.flag = false;
            self.grid.appendTo("#UDGrid");
            self.grid.refresh()
          }
          else {
            self.grid.dataSource = self.famsDBData;
            self.grid.refresh();
          }
        };

        var onFinally = function () {
          self.$vs.loading.close(self.$refs.udgrid.$el);
        };

        self.$ajaxGet(
          self,
          // `DataIntegrity/GetAuditUsageDispensing?&fromdate=${self.dateFormat(self.startDate)}&todate=${self.dateFormat(self.endDate)}&userId=${userId}`,
          `DataIntegrity/GetAuditUsageDispensing?&fromdate=${self.dateFormat(self.startDate)}&todate=${self.dateFormat(self.endDate)}`,
          onSuccess,
          onFinally
        );
      }, 500);
    },
  },
};
</script>
<style lang="scss"></style>
<style>
@import "material.css";
</style>
