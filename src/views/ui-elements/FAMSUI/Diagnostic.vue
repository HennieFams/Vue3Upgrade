<template>
  <div id="simple-calendar-app">
    <vs-tabs
      v-model="activeDashTab"
      ref="sqlView"
      class="vs-con-loading__container"
      style="width: auto min-height:auto"
    >
      <vs-tab label="TempTable View" style="min-height: 500px">
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Current Unprocessed Entries: </label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              v-model="tempTableCounter"
              class="w-1/3"
              name="Unprocessed"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1 w-full">
            <vs-button class="rounded-lg mr-2 w-1/2" color="primary" type="filled" @click="getTempTableCount()"        icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1 w-full">
            <vs-button class="rounded-lg mr-2 w-full" color="success" type="filled" @click="processQuery()"        icon-pack="feather" icon="icon-cpu">Process Current</vs-button>
          </div>
        </div>
      </vs-tab>
      <vs-tab label="SQL Query View" style="min-height: 500px">
        <vx-card class="vx-card no-scroll-content" >
          <div class="ml-4 mr-4">
            <v-select
              class="vx-col w-3/5 mb-2"
              placeholder="Select Table"
              style="background-color: rgb(255 255 255)"
              :options="queryTables"
              v-model="query"
              @search:blur="showComponent">
            </v-select>
            <div v-show="storeView">
              <div class="vx-col w-full mb-2">
                <vs-checkbox class=" mb-2" style="width: fit-content" name="cbshowAllStores" v-model="showAllStores">
                  Show All Stores
                </vs-checkbox>
                <vs-checkbox class="" style="width: fit-content" name="cbSpecificStore" v-model="showSpecificStore">
                  Show Only Specific Store
                </vs-checkbox>
                <vs-checkbox class="" style="width: fit-content" name="cbshowAllAccStores" v-model="showAllAccStores">
                  Show All Accounts' Stores
                </vs-checkbox>
              </div>
              <diagnostic-store
                v-show="showSpecificStore"
                @storePicked="storeSelected">
              </diagnostic-store>
            </div>
            <div v-show="tankView">
              <div class="vx-col w-full mb-2">
                <vs-checkbox class=" mb-2" style="width: fit-content" name="cbshowAllTanks" v-model="showAllTanks">
                  Show All Tanks
                </vs-checkbox>
                <vs-checkbox class="" style="width: fit-content" name="cbSpecificTank" v-model="showSpecificTank">
                  Show Only Specific Tank
                </vs-checkbox>
              </div>
              <diagnostic-tank
                v-show="showSpecificTank"
                @tankPicked="tankSelected">
              </diagnostic-tank>
            </div>
            <div v-show="eqpView">
              <div class="vx-col w-full mb-2">
                <vs-checkbox class=" mb-2" style="width: fit-content" name="cbshowAllEquipments" v-model="showAllEquipments">
                  Show All Equipments
                </vs-checkbox>
                <vs-checkbox class="" style="width: fit-content" name="cbSpecificEquipment" v-model="showSpecificEquipment">
                  Show Only Specific Equipment
                </vs-checkbox>
              </div>
              <diagnostic-equipment
                v-show="showSpecificEquipment"
                @eqpPicked="equipmentSelected">
              </diagnostic-equipment>
            </div>
            <div v-show="oprView">
              <div class="vx-col w-full mb-2">
                <vs-checkbox class=" mb-2" style="width: fit-content" name="cbshowAllOperators" v-model="showAllOperators">
                  Show All Operators
                </vs-checkbox>
                <vs-checkbox class="" style="width: fit-content" name="cbSpecificOperator" v-model="showSpecificOperator">
                  Show Only Specific Operator
                </vs-checkbox>
              </div>
              <diagnostic-operator
                v-show="showSpecificOperator"
                @operatorPicked="operatorSelected">
              </diagnostic-operator>
            </div>
            <div v-show="accountView">
              <div class="vx-col w-full mb-2">
                <vs-checkbox class=" mb-2" style="width: fit-content" name="cbshowAllAccounts" v-model="showAllAccounts">
                  Show All Accounts
                </vs-checkbox>
                <vs-checkbox class="" style="width: fit-content" name="cbSpecificAccount" v-model="showSpecificAccount">
                  Show Only Specific Account
                </vs-checkbox>
              </div>
              <diagnostic-account
                v-show="showSpecificAccount"
                @accountPicked="accountSelected">
              </diagnostic-account>
            </div>
            <div v-show="userView">
              <div class="vx-col w-full mb-2">
                <vs-checkbox class=" mb-2" style="width: fit-content" name="cbshowAllUsers" v-model="showAllUsers">
                  Show All Users
                </vs-checkbox>
                <vs-checkbox class="" style="width: fit-content" name="cbSpecificUser" v-model="showSpecificUser">
                  Show Only Specific User
                </vs-checkbox>
              </div>
              <diagnostic-user
                v-show="showSpecificUser"
                @userPicked="userSelected">
              </diagnostic-user>
            </div>
            <div>
              <vs-button class="rounded-lg mr-2 w-full" color="success" type="filled" @click="processQuerySql()"        icon-pack="feather" icon="icon-cpu">Process Query</vs-button>
            </div>
          </div>
          <div v-if="storeView">
            <vs-table
              ref="gridTable2"
              id="gridTable2"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ gridData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : gridData.length }} of {{ gridData.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
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
                <vs-th sort-key="account">Account</vs-th>
                <vs-th sort-key="storeName">FAMS Store</vs-th>
                <vs-th sort-key="macaddress">MacAddress</vs-th>
                <vs-th sort-key="ipAddress">IP</vs-th>    
                <vs-th sort-key="cellNumber">CellNumber</vs-th>    
                <vs-th sort-key="lat">Lat</vs-th>    
                <vs-th sort-key="long">Long</vs-th>    
                <vs-th sort-key="enable">Active</vs-th>
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.account">{{tr.account}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.account" class="inputx" placeholder="account" disabled/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.name">{{tr.name}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.name" class="inputx" placeholder="Name"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.macaddress">{{tr.macaddress}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.macaddress" class="inputx" placeholder="Mac Address"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.ipAddress">{{tr.ipAddress}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.ipAddress" class="inputx" placeholder="IP Address"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.cellNumber">{{tr.cellNumber}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.cellNumber" class="inputx" placeholder="Cell Number"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.lat">{{tr.lat}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.lat" class="inputx" placeholder="Latitude"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.long">{{tr.long}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.long" class="inputx" placeholder="Longitude"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.enable">{{tr.enable}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Active" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td>
                    <vx-tooltip class="flex" text="Save Store">
                      <feather-icon
                        icon="SaveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="updateTable(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div v-if="tankView">
            <vs-table
              ref="gridTable2"
              id="gridTable2"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ gridData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : gridData.length }} of {{ gridData.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
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
                <vs-th sort-key="account">Account</vs-th>
                <vs-th sort-key="tankName">Tank Name</vs-th>
                <vs-th sort-key="capacity">Capacity</vs-th>
                <vs-th sort-key="nr">Nr</vs-th>    
                <vs-th sort-key="math">Math</vs-th>    
                <vs-th sort-key="sensorSn">SensorSN</vs-th>    
                <vs-th sort-key="spare1">Spare1</vs-th>    
                <vs-th sort-key="spare2">Spare2</vs-th>    
                <vs-th sort-key="interval">Interval</vs-th>    
                <vs-th sort-key="enable">Active</vs-th>
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.account">{{tr.account}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.account" class="inputx" placeholder="account" disabled/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.tankName">{{tr.tankName}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.tankName" class="inputx" placeholder="Name"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.capacity">{{tr.capacity}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.capacity" class="inputx" placeholder="Capacity"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.nr">{{tr.nr}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.nr" class="inputx" placeholder="NR"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.math">{{tr.math}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.math" class="inputx" placeholder="Math"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.sensorSN">{{tr.sensorSN}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.sensorSN" class="inputx" placeholder="SensorSn"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.spare1">{{tr.spare1}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.spare1" class="inputx" placeholder="Spare1"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.spare2">{{tr.spare2}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.spare2" class="inputx" placeholder="Spare2"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.interval">{{tr.interval}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.interval" class="inputx" placeholder="Interval"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.enable">{{tr.enable}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Active" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td>
                    <vx-tooltip class="flex" text="Save Store">
                      <feather-icon
                        icon="SaveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="updateTable(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div v-if="eqpView">
            <vs-table
              ref="gridTable2"
              id="gridTable2"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ gridData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : gridData.length }} of {{ gridData.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
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
                <vs-th sort-key="account">Account</vs-th>
                <vs-th sort-key="name">Equipment Name</vs-th>
                <vs-th sort-key="registration">Registration</vs-th>
                <vs-th sort-key="tag">Tag</vs-th>
                <vs-th sort-key="maxLitres">Max Litres</vs-th>
                <vs-th sort-key="consumption">Consumption</vs-th>
                <vs-th sort-key="enable">Active</vs-th>
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.account">{{tr.account}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.account" class="inputx" placeholder="account" disabled/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.name">{{tr.name}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.name" class="inputx" placeholder="Name"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.registration">{{tr.registration}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.registration" class="inputx" placeholder="Registration"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.tag">{{tr.tag}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.tag" class="inputx" placeholder="Tag"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.maxLitres">{{tr.maxLitres}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.maxLitres" class="inputx" placeholder="Max Litres"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.consumption">{{tr.consumption}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.consumption" class="inputx" placeholder="Consumption"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.enable">{{tr.enable}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Active" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td>
                    <vx-tooltip class="flex" text="Save Store">
                      <feather-icon
                        icon="SaveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="updateTable(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div v-if="oprView">
            <vs-table
              ref="gridTable2"
              id="gridTable2"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ gridData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : gridData.length }} of {{ gridData.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
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
                <vs-th sort-key="account">Account</vs-th>
                <vs-th sort-key="name">Operator Name</vs-th>
                <vs-th sort-key="description">Description</vs-th>
                <vs-th sort-key="tag">Tag</vs-th>
                <vs-th sort-key="enable">Active</vs-th>
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{data}">

                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.account">{{tr.account}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.account" class="inputx" placeholder="account" disabled/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.name">{{tr.name}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.name" class="inputx" placeholder="Name"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.description">{{tr.description}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.description" class="inputx" placeholder="Description"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.tag">{{tr.tag}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.tag" class="inputx" placeholder="Tag"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.enable">{{tr.enable}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Active" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td>
                    <vx-tooltip class="flex" text="Save Store">
                      <feather-icon
                        icon="SaveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="updateTable(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div v-if="accountView">
            <vs-table
              ref="gridTable2"
              id="gridTable2"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <!-- ADD NEW -->
                <!-- <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" type="filled" @click="openParamView" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button> -->
                <!-- ITEMS PER PAGE -->
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ gridData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : gridData.length }} of {{ gridData.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                <vs-th sort-key="name">Account Name</vs-th>
                <vs-th sort-key="monthStartDate">Month Start Date</vs-th>
                <vs-th sort-key="monthEndDate">Month End Date</vs-th>
                <vs-th sort-key="blocked">Blocked</vs-th>
                <vs-th sort-key="enable">Active</vs-th>
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{data}">

                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.name">{{tr.name}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.name" class="inputx" placeholder="Account Name"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.monthStartDate">{{tr.monthStartDate}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.monthStartDate" class="inputx" placeholder="Month Start Date"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.monthEndDate">{{tr.monthEndDate}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.monthEndDate" class="inputx" placeholder="Month End Date"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.blocked">{{tr.blocked}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Blocked" v-model="tr.blocked">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.enable">{{tr.enable}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Active" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td>
                    <vx-tooltip class="flex" text="Save Store">
                      <feather-icon
                        icon="SaveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="updateTable(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div v-if="userView">
            <vs-table
              ref="gridTable2"
              id="gridTable2"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="gridData"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <!-- ADD NEW -->
                <!-- <vs-button class="rounded-lg mr-2" color="rgb(62, 201, 214)" type="filled" @click="openParamView" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button> -->
                <!-- ITEMS PER PAGE -->
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ gridData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : gridData.length }} of {{ gridData.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                <vs-th sort-key="account">Account</vs-th>
                <vs-th sort-key="username">Username</vs-th>
                <vs-th sort-key="email">Email</vs-th>
                <vs-th sort-key="password">Password</vs-th>
                <vs-th sort-key="homeScreenMessage">Home Screen Message</vs-th>
                <vs-th sort-key="premiumAppSubscriber">Premium App Subscriber</vs-th>
                <vs-th sort-key="appSubscriber">App Subscriber</vs-th>
                <vs-th sort-key="enable">Active</vs-th>
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.account">{{tr.account}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.account" class="inputx" placeholder="account" disabled/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.username">{{tr.username}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.username" class="inputx" placeholder="Username"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.email">{{tr.email}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.email" class="inputx" placeholder="Email"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.password">{{tr.password}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-input v-model="tr.password" class="inputx" placeholder="Password"/>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.homeScreenMessage">{{tr.homeScreenMessage}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Home Screen Message" v-model="tr.homeScreenMessage">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.premiumAppSubscriber">{{tr.premiumAppSubscriber}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Premium App Subscriber" v-model="tr.premiumAppSubscriber">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.appSubscriber">{{tr.appSubscriber}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="App Subscriber" v-model="tr.appSubscriber">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td :data="tr.enable">{{tr.enable}}
                    <template slot="edit">
                      <div class="con-expand-edit w-full">
                        <vs-switch class="rounded-pill" label="Active" v-model="tr.enable">
                          <span slot="on">Yes</span>
                          <span slot="off">No</span>
                        </vs-switch>
                      </div>
                    </template>
                  </vs-td>
                  <vs-td>
                    <vx-tooltip class="flex" text="Save Store">
                      <feather-icon
                        icon="SaveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="updateTable(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </vs-tab>
      <vs-tab label="Unsubscriped Accounts" style="min-height: 500px">
        <div class="vx-card scroll-content" v-show="!isListHidden">
          <div>
            <vs-table
              ref="gridTable2"
              id="gridTable2"
              v-model="selected"
              pagination
              :max-items="itemsPerPage"
              search
              :data="subscriptions"
              class="vs-con-loading__container"
            >
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                <vs-button class="rounded-lg mr-2" color="primary" type="filled" @click="getSubs" icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                  <div
                    class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                  >
                    <span
                      class="mr-2"
                    >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ subscriptions.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : subscriptions.length }} of {{ subscriptions.length }}</span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
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
                <vs-th sort-key="accountName">Account Name</vs-th>
                <vs-th sort-key="store">Store</vs-th>    
                <vs-th sort-key="storeEnable">Store Enable</vs-th> 
                <vs-th>Action</vs-th>
              </template>
              <template slot-scope="{data}">

                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" style="border: solid white 1px;">
                  <vs-td :data="tr.accountName">{{tr.accountName}}</vs-td>
                  <vs-td :data="tr.store">{{tr.store}}</vs-td>
                  <vs-td :data="tr.storeEnable">{{tr.storeEnable}}</vs-td>
                  <vs-td>
                    <vx-tooltip class="flex" text="Add Subscription">
                      <feather-icon
                        icon="EditIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        @click.stop="openWiz(tr)"
                      />
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
        <vx-card ref="MainCard2" v-show="!isInfoHidden">
          <div class="mt-5 vs-con-loading__container" ref="wizardDiv">
            <div class="vx-row">
              <div class="vx-col md:w-1/6 w-full">
                <vs-button
                  color="warning"
                  type="border"
                  class="rounded-lg mb-2"
                  @click="cancelAdd"
                  >Return</vs-button
                >
              </div>
            </div>

            <form-wizard
              ref="wizard"
              color="rgba(var(--vs-primary), 1)"
              errorColor="rgba(var(--vs-danger), 1)"
              :title="title"
              :subtitle="subtitle"
              finishButtonText="Save entry"
              @on-complete="formSubmitted"
            >
              <tab-content
                title="Step 1"
                class="mb-5"
                icon="feather icon-home"
                :before-change="validateStep1"
              >
                <form data-vv-scope="step-1">
                  <div class="vx-row px-4 pb-3">
                    <div class="vx-col md:w-1/2 w-full mt-5">
                      <vs-input
                        label="Subscription Name"
                        v-model="formData.name"
                        class="w-full"
                        disabled
                      />
                      <label class="w-full" size="small">Account</label>
                      <v-select
                        class="w-full"
                        placeholder="Search / Select Account"
                        :options="accountList"
                        v-model="selectedAccountDD"
                        @search:blur="populateType"
                        name="Search / Select Account"
                        v-validate="'required'"
                        disabled
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Search / Select Account')"
                        >{{
                          errors.first("Search / Select Account")
                        }}</span
                      >
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-5">
                      <label class="w-full">Subscription Type</label>
                      <v-select
                        class="w-full"
                        placeholder="Search / Select Subscription Type"
                        :options="typeList"
                        v-model="selectedType"
                        @search:blur="populateType"
                        name="Search / Select Subscription Type"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Search / Select Equipment Rebate')"
                        >{{
                          errors.first("Search / Select Equipment Rebate")
                        }}</span
                      >
                      <label class="w-full" size="small">Subscription Interval</label>
                      <v-select
                        class="w-full"
                        placeholder="Search / Select Interval"
                        :options="intervalList"
                        v-model="selectedInterval"
                        @search:blur="populateType"
                        name="Search / Select Subscription Interval"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Search / Select Equipment Rebate')"
                        >{{
                          errors.first("Search / Select Equipment Rebate")
                        }}</span
                      >
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-5">
                      <vs-input
                        label="Custom Price(R)"
                        v-model="formData.customPrice"
                        class="w-full"
                        @input="customPriceDown()"
                      />
                    </div>
                    <div class="vx-col md:w-1/2 w-full mt-5">
                      <vs-input
                        label="Subscription Price(R)"
                        v-model="formData.viewPrice"
                        class="w-full"
                        disabled
                      />
                    </div>
                    <div v-show="showStores" class="vx-col md:w-1/2 w-full mt-5">
                      <label class="w-full" size="small">Store</label>
                      <v-select
                        class="w-full"
                        placeholder="Search / Select Store"
                        :options="stores"
                        v-model="selectedStoreDD"
                        @search:blur="populateName"
                        name="Search / Select Store"
                        disabled
                      />
                    </div>
                    <div class="vx-row md:w-full w-full mt-5" style="padding: 0 1rem">
                      <div class="vx-col flex-1">
                        <label>Created Date</label>
                        <div id="datepick">
                          <flat-pickr
                            class="w-full"
                            icon-pack="feather"
                            icon="icon-calendar"
                            v-model="formData.createdDate"
                            :format="'YYYY-MM-DD'"
                            placeholder="Select Created Date"
                            name="Created Date"
                        disabled
                          />
                        </div>
                      </div>
                      <div class="vx-col flex-1">
                        <label>Expiry Date</label>
                        <div id="datepick">
                          <flat-pickr
                            class="w-full"
                            icon-pack="feather"
                            icon="icon-calendar"
                            v-model="formData.expiryDate"
                            :format="'YYYY-MM-DD'"
                            placeholder="Select Expiry Date"
                            name="Expiry Date"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </tab-content>

            </form-wizard>
          </div>
        </vx-card>
      </vs-tab>
      <vs-tab label="Enter Raw Data" style="min-height: 500px">
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
      <!-- <vs-tab label="Expired Operator License" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          
        </div>
      </vs-tab>
      <vs-tab label="ATG vs Consumption (Per Tank)" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          
        </div>
      </vs-tab>
      <vs-tab label="ATG Stock Received" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          
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
import {FormWizard, TabContent} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import DiagnosticStore from "./components/DiagnosticStore.vue";
import DiagnosticTank from "./components/DiagnosticTank.vue";
import DiagnosticEquipment from "./components/DiagnosticEquipment.vue";
import DiagnosticOperator from "./components/DiagnosticOperator.vue";
import DiagnosticAccount from "./components/DiagnosticAccount.vue";
import DiagnosticUser from "./components/DiagnosticUser.vue";


export default {
  components: {
    flatPickr,
    "v-select": vSelect,
    DiagnosticStore,
    DiagnosticTank,
    DiagnosticEquipment,
    DiagnosticOperator,
    DiagnosticAccount,
    DiagnosticUser,
    FormWizard,
    TabContent,
  },
  data() {
    return {
      title: "FAMS - new Subscription  Wizard!!",
      subtitle: "Please complete form to add new subscription",
      
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
      },
      activeDashTab: 0,
      selected: [],
      tempTableCounter: 0,
      queryTables: [
        { value: 1, label: "Stores" },
        { value: 2, label: "Tanks" },
        { value: 3, label: "Equipments" },
        { value: 4, label: "Operators" },
        { value: 5, label: "Accounts" },
        { value: 6, label: "Users" },
      ],
      operators: [
        { value: 0, label: "N/A" },
        { value: 1, label: "AND" },
        { value: 2, label: "OR" },
      ],
      query: 0,
      dateToChange: "",
      storeView: false,
      tankView: false,
      eqpView: false,
      oprView: false,
      accountView: false,
      userView: false,
      showAllStores: true,
      showAllAccStores: false,
      showAllTanks: true,
      showAllEquipments: true,
      showAllOperators: true,
      showAllAccounts: true,
      showAllUsers: true,
      showSpecificStore: false,
      showSpecificTank: false,
      showSpecificEquipment: false,
      showSpecificOperator: false,
      showSpecificAccount: false,
      showSpecificUser: false,
      sqlData: [],
      selectedStore: {},
      selectedTank: {},
      selectedEquipment: {},
      selectedOperator: {},
      selectedAccount: {},
      selectedUser: {},
      itemsPerPage: 10,
      gridData: [],
      subscriptions: [],
      isInfoHidden: true,
      isListHidden: false,
      formData: {
        id: 0,
        accountId: 0,
        createdDate: "",
        subInterval: 0,
        store: 0,
        subType: 0,
        renewDate: "",
        expiryDate: "",
        name: "",
        customPrice: 0,
        viewPrice: 0,
      },
      stores: [],
      selectedStoreDD: 0,
      accountList: [],
      selectedAccountDD: 0,
      typeList: [],
      selectedType: 0,
      intervalList: [],
      selectedInterval: 0,
      showStores: false,
      rawData:"",
    };
  },
  watch: {
    activeDashTab: function (val) {
      var self = this;
      if (val == 0) {
        setTimeout(function () {
          self.getTempTableCount();
        }, 100);
      }
      //       else if (val == 1) {
      //         setTimeout(function(){
      //
      //         }, 100);
      //       }
      else if (val == 2) {
        setTimeout(function(){
          self.getSubs();
          self.getAccountList();
          self.getTypesList();
          self.getIntervalList();
        }, 100);
      }
      //       else if (val == 3) {
      //         setTimeout(function(){
      //
      //         }, 100);
      //       }
      //       else if (val == 4) {
      //         setTimeout(function(){
      //
      //         }, 100);
      //       }
      //       else if (val == 5) {
      //         setTimeout(function(){
      //
      //         }, 100);
      //       }
    },
    showAllStores: function (val) {
      var self = this;
      if(val){
        self.showSpecificStore = false;
        self.showAllAccStores = false;
        self.processQuerySql();
      }
    },
    showSpecificStore: function (val) {
      var self = this;
      if(val){
        self.showAllStores = false;
        self.showAllAccStores = false;
        // self.processQuerySql();
      }
    },
    showAllAccStores: function (val) {
      var self = this;
      if(val){
        self.showSpecificStore = false;
        self.showAllStores = false;
        self.processQuerySql();
      }
    },
    showAllTanks: function (val) {
      var self = this;
      self.showSpecificTank == val
        ? (self.showSpecificTank = !val)
        : (self.showAllTanks = val);
      self.processQuerySql();
    },
    showSpecificTank: function (val) {
      var self = this;
      self.showAllTanks == val
        ? (self.showAllTanks = !val)
        : (self.showSpecificTank = val);
    },
    showAllEquipments: function (val) {
      var self = this;
      self.showSpecificEquipment == val
        ? (self.showSpecificEquipment = !val)
        : (self.showAllEquipments = val);
      self.processQuerySql();
    },
    showSpecificEquipment: function (val) {
      var self = this;
      self.showAllEquipments == val
        ? (self.showAllEquipments = !val)
        : (self.showSpecificEquipment = val);
    },
    showAllOperators: function (val) {
      var self = this;
      self.showSpecificOperator == val
        ? (self.showSpecificOperator = !val)
        : (self.showAllOperators = val);
      self.processQuerySql();
    },
    showSpecificOperator: function (val) {
      var self = this;
      self.showAllOperators == val
        ? (self.showAllOperators = !val)
        : (self.showSpecificOperator = val);
    },
    showAllAccounts: function (val) {
      var self = this;
      self.showSpecificAccount == val
        ? (self.showSpecificAccount = !val)
        : (self.showAllAccounts = val);
      self.processQuerySql();
    },
    showSpecificAccount: function (val) {
      var self = this;
      self.showAllAccounts == val
        ? (self.showAllAccounts = !val)
        : (self.showSpecificAccount = val);
    },
    showAllUsers: function (val) {
      var self = this;
      self.showSpecificUser == val
        ? (self.showSpecificUser = !val)
        : (self.showAllUsers = val);
      self.processQuerySql();
    },
    showSpecificUser: function (val) {
      var self = this;
      self.showAllUsers == val
        ? (self.showAllUsers = !val)
        : (self.showSpecificUser = val);
    },
  },
  props: {},
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    },
  },
  mounted() {
    var self = this;
    setTimeout(function () {
      self.activeDashTab = 0;
      self.getTempTableCount();
    }, 200);
  },
  methods: {
    getTempTableCount() {
      const self = this;

      var onSuccess = function (response) {
        self.tempTableCounter = response.data;
        self.successNotifyDataLoad();
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Diagnostic", onSuccess, onFinally);
    },
    getSubs() {
      const self = this;

      var onSuccess = function (response) {
        self.subscriptions = response.data;
        self.successNotifyDataLoad();
      };
      var onFinally = function () {};
      self.$ajaxGet(self, "Diagnostic/GetUnsubscripedStore", onSuccess, onFinally);
    },
    processQuery() {
      var self = this;
      var onSuccess = (response) => {
        self.successNotifyDataLoad();
        self.self.getTempTableCount();
      };

      var onFinally = (response) => {};

      self.$ajaxPost(self, "Diagnostic", onSuccess, onFinally);
    },
    openWiz(data){
      var self = this;
      self.showLoadingOnElement("wizardDiv", 1, "radius");
      self.getStores(data.id);
      setTimeout(() => {

        self.formData.subInterval = 0;
        self.formData.store = 0;
        self.formData.subType = 0;
        self.formData.customPrice = 0;
        self.formData.viewPrice = 0;
        self.formData.name = "";

        self.selectedStoreDD = 0;
        self.selectedAccountDD = 0;
        self.selectedType = 0;
        self.selectedInterval = 0;

        var date = new Date();
        self.formData.createdDate = data.createdate;
        self.formData.expiryDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        self.formData.renewDate = self.formData.expiryDate;
        

        self.selectedAccountDD = self.accountList.filter(function (item) {
          return item.value == data.id;
        })[0];
        if(data.storeId != 0){
          self.selectedType = self.typeList.filter(function (item) {
            return item.label == "ATG";
          })[0];
        }
        self.selectedInterval = self.intervalList.filter(function (item) {
          return item.label == "Yearly";
        })[0];
        self.populateType();
        setTimeout(() => {
          self.selectedStoreDD = self.stores.filter(function (item) {
            return item.value == data.storeId;
          })[0];
          self.populateName();

        }, 300);

        this.isListHidden = true;
        this.isInfoHidden = false;
        self.$vs.loading.close(self.$refs.wizardDiv.$el);
      }, 500);
    },
    processQuerySql() {
      var self = this;

      var obj = {};
      obj.table = self.query.value;

      if (self.query.value == 1) {
        if (self.showAllStores) {
          obj.columnId = 0;
        } else if (self.showAllAccStores) {
          obj.columnId = -1;
        }
        else{
          obj.columnId = self.selectedStore.value;
        }
      } else if (self.query.value == 2) {
        if (self.showAllTanks) {
          obj.columnId = 0;
        } else {
          obj.columnId = self.selectedTank.value;
        }
      } else if (self.query.value == 3) {
        if (self.showAllEquipments) {
          obj.columnId = 0;
        } else {
          obj.columnId = self.selectedEquipment.value;
        }
      } else if (self.query.value == 4) {
        if (self.showAllOperators) {
          obj.columnId = 0;
        } else {
          obj.columnId = self.selectedOperator.value;
        }
      } else if (self.query.value == 5) {
        if (self.showAllAccounts) {
          obj.columnId = 0;
        } else {
          obj.columnId = self.selectedAccount.value;
        }
      } else if (self.query.value == 6) {
        if (self.showAllUsers) {
          obj.columnId = 0;
        } else {
          obj.columnId = self.selectedUser.value;
        }
      }

      var onSuccess = (response) => {
        self.gridData = response.data;
        self.successNotifyDataLoad();
      };

      var onFinally = (response) => {};

      self.$ajaxPost(
        self,
        "Diagnostic/ProcessSelect",
        obj,
        onSuccess,
        onFinally
      );
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    showComponent() {
      var self = this;
      if (self.query) {
        if (self.query.value == 1) {
          self.storeView = true;
          self.tankView = false;
          self.eqpView = false;
          self.oprView = false;
          self.accountView = false;
          self.userView = false;
          self.processQuerySql();
        } else if (self.query.value == 2) {
          self.storeView = false;
          self.tankView = true;
          self.eqpView = false;
          self.oprView = false;
          self.accountView = false;
          self.userView = false;
          self.processQuerySql();
        } else if (self.query.value == 3) {
          self.storeView = false;
          self.tankView = false;
          self.eqpView = true;
          self.oprView = false;
          self.accountView = false;
          self.userView = false;
          self.processQuerySql();
        } else if (self.query.value == 4) {
          self.storeView = false;
          self.tankView = false;
          self.eqpView = false;
          self.oprView = true;
          self.accountView = false;
          self.userView = false;
          self.processQuerySql();
        } else if (self.query.value == 5) {
          self.storeView = false;
          self.tankView = false;
          self.eqpView = false;
          self.oprView = false;
          self.accountView = true;
          self.userView = false;
          self.processQuerySql();
        } else if (self.query.value == 6) {
          self.storeView = false;
          self.tankView = false;
          self.eqpView = false;
          self.oprView = false;
          self.accountView = false;
          self.userView = true;
          self.processQuerySql();
        } else {
        }
      }
    },
    formatDateMoment: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    updateTable(data) {
      const self = this;

      if(self.query.value == 3){
        var onSuccess = function (response) {
          self.processQuerySql();
        };
        var onFinally = function () {};
        self.$ajaxPut(self, `${self.query.label}/UpdateEquipment/` + data.id, data, onSuccess, onFinally);
      }
      else if(self.query.value == 4){
        var onSuccess = function (response) {
          self.processQuerySql();
        };
        var onFinally = function () {};
        self.$ajaxPut(self, `${self.query.label}/UpdateOperator/` + data.id, data, onSuccess, onFinally);
      }
      else{
        var onSuccess = function (response) {
          self.processQuerySql();
        };
        var onFinally = function () {};
        self.$ajaxPut(self, `${self.query.label}/` + data.id, data, onSuccess, onFinally);
      }
      
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
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale,
      });
    },
    storeSelected(data) {
      var self = this;
      self.selectedStore = data;
    },
    tankSelected(data) {
      var self = this;
      self.selectedTank = data;
    },
    equipmentSelected(data) {
      var self = this;
      self.selectedEquipment = data;
    },
    operatorSelected(data) {
      var self = this;
      self.selectedOperator = data;
    },
    accountSelected(data) {
      var self = this;
      self.selectedAccount = data;
    },
    userSelected(data) {
      var self = this;
      self.selectedUser = data;
    },
    cancelAdd(){
      this.isListHidden = false;
      this.isInfoHidden = true;
      this.getSubs();
    },
    formSubmitted(){
      var self = this;

      self.formData.accountId = self.selectedAccountDD.value;
      self.formData.subInterval = self.selectedInterval.value;
      self.formData.subType = self.selectedType.value;
      self.formData.store = self.selectedStoreDD.value;

      const obj = {};

      obj.Name = self.formData.name;
      obj.Id = 0;
      obj.AccountId = self.formData.accountId;
      obj.SubscriptionIntervalId = self.formData.subInterval;
      obj.SubscriptionTypeId = self.formData.subType;
      obj.SubId = self.formData.store;
      obj.CreateDate = self.formData.createdDate;
      obj.ExpriryDate = self.formData.expiryDate;
      obj.RenewDate = self.formData.expiryDate;
      obj.customPrice = self.formData.customPrice;
      
      var onSuccess = response =>{
        self.isListHidden = false;
        self.isInfoHidden = true;
        self.getSubs();
      }
    
      var onFinally = response =>{
        
      }
    
      self.$ajaxPost(self, "Subscription/PostSubscription" , obj , onSuccess, onFinally);
    },
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-1").then((result) => {
          if (result) {
            resolve(true);
          } else {
            this.ValidateNotify();
            reject("correct all values");
          }
        });
      });
    },
    populateType(){
      const self = this;

      if(self.selectedType && self.selectedInterval.value == 1 && self.formData.customPrice == 0){
        self.formData.viewPrice = (self.selectedType.price * 12);
      }
      else if(self.selectedType && self.selectedInterval.value == 2 && self.formData.customPrice == 0){
        self.formData.viewPrice = self.selectedType.price;
      }
      else if(self.selectedType && self.selectedInterval.value == 3 && self.formData.customPrice == 0){
        self.formData.viewPrice = (self.selectedType.price * 4);
      }
      else if(self.selectedType && self.selectedInterval.value == 4 && self.formData.customPrice == 0){
        self.formData.viewPrice = (self.selectedType.price * 6);
      }
      else if(self.selectedType && self.selectedInterval.value == 1 && self.formData.customPrice > 0){
        self.formData.viewPrice = (self.formData.customPrice * 12);
      }
      else if(self.selectedType && self.selectedInterval.value == 2 && self.formData.customPrice > 0){
        self.formData.viewPrice = self.formData.customPrice;
      }
      else if(self.selectedType && self.selectedInterval.value == 3 && self.formData.customPrice > 0){
        self.formData.viewPrice = (self.formData.customPrice * 4);
      }
      else if(self.selectedType && self.selectedInterval.value == 4 && self.formData.customPrice > 0){
        self.formData.viewPrice = (self.formData.customPrice * 6);
      }

      if(self.selectedType && self.selectedAccountDD){
        if(self.selectedType.value == 1 || self.selectedType.value == 2){
          self.showStores = true;
          self.getStores(self.selectedAccountDD.value);
        }
        else{
          self.populateName();
          self.showStores = false;
        }
      }
    },
    populateName(){
      var self = this;
      if(self.selectedType && self.selectedAccountDD){
        if(self.selectedType.value == 1 || self.selectedType.value == 2 && self.selectedStoreDD){
          self.formData.name = self.selectedType.label + "_" + self.selectedStoreDD.label;
        }
        else{
          self.formData.name = self.selectedType.label + "_" + self.selectedAccountDD.label;
        }
      }
    },
    getAccountList(){
      var self = this;
      var onSuccess = response =>{
        self.accountList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
      var onFinally = response =>{
      }
      self.$ajaxGet(self, "Accounts/GetAccountdropdown" , onSuccess, onFinally);
    },
    getTypesList(){
      var self = this;
      var onSuccess = response =>{
        self.typeList = response.data.map((item) => {
          return { label: item.name, value: item.id, price: item.price };
        });
      }
      var onFinally = response =>{
      }
      self.$ajaxGet(self, "Subscription/GetSubscriptionTypes" , onSuccess, onFinally);
    },
    getIntervalList(){
      var self = this;
      var onSuccess = response =>{
        self.intervalList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
      var onFinally = response =>{
      }
    
      self.$ajaxGet(self, "Subscription/GetSubscriptionIntervals" , onSuccess, onFinally);
    },
    getStores(id) { 
      const self = this;
      var onSuccess = function(response) {
          self.stores = response.data.map((item) => {return {label: item.name, value: item.id} });
          self.selectedStoreDD = self.stores.filter(function (item) {
            return item.value == self.selectedStoreDD.value;
          })[0];
          self.populateName();
      };
      var onFinally = function() {
      };
      self.$ajaxGet(
        self,
        "Stores/GetStoredropdownForAccount/" + id,
        onSuccess,
        onFinally
      );    
    },
    uploadRawData(){
      var self = this;
      console.log(self.rawData);
      if(self.rawData == '') {
        alert("Import area cannot be empty")
        return;
      }
      // self.rawData = self.rawData.replace(/(?:\r\n|\r|\n)/g, "-");
      // debugger
      // if((self.rawData.length < 30) || !self.rawData.includes('-')) {
      //   alert("Import data is incorrect length or format")
      //   return;
      // }
      var obj = {
        rawData: self.rawData.replace(/(?:\r\n|\r|\n)/g, "-")
      };
      var onSuccess = (response) => {
        console.log(response);
        self.successNotifyDataLoad();
      };

      var onFinally = (response) => {};

      self.$ajaxPost(
        self,
        "Diagnostic/ProcessRawData",
        obj,
        onSuccess,
        onFinally
      );
    },
    customPriceDown(){
      var self = this;

      if(self.formData.customPrice > 0){
        if(self.selectedInterval.value == 1){
          self.formData.viewPrice = (self.formData.customPrice * 12);
        }
        else if(self.selectedInterval.value == 2){
          self.formData.viewPrice = self.formData.customPrice;
        }
        else if(self.selectedInterval.value == 3){
          self.formData.viewPrice = (self.formData.customPrice * 4);
        }
        else if(self.selectedInterval.value == 4){
          self.formData.viewPrice = (self.formData.customPrice * 6);
        }
      }
      else{
        if(self.selectedType && self.selectedInterval.value == 1){
          self.formData.viewPrice = (self.selectedType.price * 12);
        }
        else if(self.selectedType && self.selectedInterval.value == 2){
          self.formData.viewPrice = self.selectedType.price;
        }
        else if(self.selectedType && self.selectedInterval.value == 3){
          self.formData.viewPrice = (self.selectedType.price * 4);
        }
        else if(self.selectedType && self.selectedInterval.value == 4){
          self.formData.viewPrice = (self.selectedType.price * 6);
        }
        else{
          self.formData.viewPrice = self.selectedType.price;
				}

      }
    },
    
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
<style>
  @import "material.css";

  
.vs-textarea{
  height: 450px !important;
}
</style>
