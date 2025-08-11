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
  <div class="vs-con-loading__container">
    <vs-tabs v-model="activeTab" style="width: auto; min-height:500px">
      <vs-tab label="Equipment OEM" style="min-height:500px">
        <template>
          <div>
            <vx-card ref="MainCard2" v-show="!isOemInfoHidden">
              <div class="mt-5">
                <div class="vx-row">
                  <div class="vx-col md:w-1/6 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="cancelAddOem">Return</vs-button>
                  </div>
                  <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="initValues">Restart</vs-button>
                  </div>
                </div>

                <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
                  :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="saveOem">
                  <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
                    <!-- tab 1 content -->
                    <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="OEM Name" v-model="formDataOem.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="OEM Description" v-model="formDataOem.description" class="w-full" />
                      </div>
                    </div>
                  </tab-content>
                </form-wizard>
              </div>
            </vx-card>
            <vx-card ref="MainCard" v-show="!isOemListHidden">
              <div>
                <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search :data="oemData"
                  class="vs-con-loading__container">
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <!-- ADD NEW -->
                    <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetOEM()"
                      icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addOemVue"
                      icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
                    <!-- ITEMS PER PAGE -->
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{
                          oemData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage :
                            oemData.length }} of {{ oemData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                    <vs-th sort-key="name">OEM</vs-th>
                    <vs-th sort-key="description">Description</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <!-- visible: false -->
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                      <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                      <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                      <vs-td id="iconContainer" class="whitespace-no-wrap">
                        <vx-tooltip class="flex" text="Edit OEM">
                          <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click.stop="openOemPopup(tr)" />
                        </vx-tooltip>
                        <vx-tooltip class="flex" text="Delete OEM">
                          <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"  
                          class="ml-2" @click.stop="deleteOem(tr)" />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </vx-card>
            <vs-popup title="Edit Equipment Oem" :active.sync="popupEquipmentOem">
              <div class="vx-col md:w-full w-full mb-5">
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="OEM Name" v-model="formDataOem.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="OEM Description" v-model="formDataOem.description" class="w-full" />
                      </div>
                    </div>
                <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
                  @click="saveOem()">Save
                </vs-button>
                <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeOemPopup()">Cancel
                </vs-button>
              </div>
            </vs-popup>
          </div>
        </template>
      </vs-tab>
      <vs-tab label="Equipment Category" style="min-height:500px">
        <template>
          <div>
            <vx-card ref="MainCard2" v-show="!isCategoryInfoHidden">
              <div class="mt-5">
                <div class="vx-row">
                  <div class="vx-col md:w-1/6 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="cancelAddCategory">Return</vs-button>
                  </div>
                  <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="initValues">Restart</vs-button>
                  </div>
                </div>

                <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
                  :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="saveCategory">
                  <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
                    <!-- tab 1 content -->
                    <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Category Name" v-model="formDataCategory.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Category Description" v-model="formDataCategory.description" class="w-full" />
                      </div>
                    </div>
                  </tab-content>
                </form-wizard>
              </div>
            </vx-card>
            <vx-card ref="MainCard" v-show="!isCategoryListHidden">
              <div>
                <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search
                  :data="categoryData" class="vs-con-loading__container">
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <!-- ADD NEW -->
                    <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetCategory()"
                      icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addCategoryVue"
                      icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
                    <!-- ITEMS PER PAGE -->
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{
                          categoryData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage :
                            categoryData.length }} of {{ categoryData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                    <vs-th sort-key="name">Category</vs-th>
                    <vs-th sort-key="description">Description</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <!-- visible: false -->
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                      <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                      <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                      <vs-td id="iconContainer" class="whitespace-no-wrap">
                        <vx-tooltip class="flex" text="Edit Category">
                          <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click.stop="openCategoryPopup(tr)" />
                        </vx-tooltip>
                        <vx-tooltip class="flex" text="Delete Category">
                          <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                            class="ml-2" @click.stop="deleteCategory(tr)" />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </vx-card>
            <vs-popup title="Edit Equipment Category" :active.sync="popupEquipmentCategory">
              <div class="vx-col md:w-full w-full mb-5">
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Category Name" v-model="formDataCategory.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Category Description" v-model="formDataCategory.description" class="w-full" />
                      </div>
                    </div>
                <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
                  @click="saveCategory()">Save
                </vs-button>
                <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeCategoryPopup()">Cancel
                </vs-button>
              </div>
            </vs-popup>
          </div>
        </template>
      </vs-tab>
      <vs-tab label="Equipment Location" style="min-height:500px">
        <template>
          <div>
            <vx-card ref="MainCard2" v-show="!isLocationInfoHidden">
              <div class="mt-5">
                <div class="vx-row">
                  <div class="vx-col md:w-1/6 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="cancelAddLocation">Return</vs-button>
                  </div>
                  <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="initValues">Restart</vs-button>
                  </div>
                </div>

                <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
                  :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="saveLocation">
                  <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
                    <!-- tab 1 content -->
                    <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Location Name" v-model="formDataLocation.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Location Description" v-model="formDataLocation.description" class="w-full" />
                      </div>
                    </div>
                  </tab-content>
                </form-wizard>
              </div>
            </vx-card>
            <vx-card ref="MainCard" v-show="!isLocationListHidden">
              <div>
                <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search
                  :data="locationData" class="vs-con-loading__container">
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <!-- ADD NEW -->
                    <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetLocation()"
                      icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addLocationVue"
                      icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
                    <!-- ITEMS PER PAGE -->
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{
                          locationData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage :
                            locationData.length }} of {{ locationData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                    <vs-th sort-key="name">Location</vs-th>
                    <vs-th sort-key="description">Description</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <!-- visible: false -->
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                      <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                      <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                      <vs-td id="iconContainer" class="whitespace-no-wrap">
                        <vx-tooltip class="flex" text="Edit Location">
                          <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click.stop="openLocationPopup(tr)" />
                        </vx-tooltip>
                        <vx-tooltip class="flex" text="Delete Location">
                          <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                          class="ml-2" @click.stop="deleteLocation(tr)" />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </vx-card>
            <vs-popup title="Edit Equipment Location" :active.sync="popupEquipmentLocation">
              <div class="vx-col md:w-full w-full mb-5">
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Location Name" v-model="formDataLocation.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Location Description" v-model="formDataLocation.description" class="w-full" />
                      </div>
                    </div>
                <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
                  @click="saveLocation()">Save
                </vs-button>
                <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeLocationPopup()">Cancel
                </vs-button>
              </div>
            </vs-popup>
          </div>
        </template>
      </vs-tab>
      <vs-tab label="Equipment Model" style="min-height:500px">
        <template>
          <div>
            <vx-card ref="MainCard2" v-show="!isModelInfoHidden">
              <div class="mt-5">
                <div class="vx-row">
                  <div class="vx-col md:w-1/6 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="cancelAddModel">Return</vs-button>
                  </div>
                  <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="initValues">Restart</vs-button>
                  </div>
                </div>

                <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
                  :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="saveModel">
                  <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
                    <!-- tab 1 content -->
                    <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Model Name" v-model="formDataModel.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Model Description" v-model="formDataModel.description" class="w-full" />
                      </div>
                    </div>
                  </tab-content>
                </form-wizard>
              </div>
            </vx-card>
            <vx-card ref="MainCard" v-show="!isModelListHidden">
              <div>
                <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search
                  :data="modelData" class="vs-con-loading__container">
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <!-- ADD NEW -->
                    <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetModel()"
                      icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addModelVue"
                      icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
                    <!-- ITEMS PER PAGE -->
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{
                          modelData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage :
                            modelData.length }} of {{ modelData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                    <vs-th sort-key="name">Model</vs-th>
                    <vs-th sort-key="description">Description</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <!-- visible: false -->
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                      <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                      <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                      <vs-td id="iconContainer" class="whitespace-no-wrap">
                        <vx-tooltip class="flex" text="Edit Model">
                          <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click.stop="openModelPopup(tr)" />
                        </vx-tooltip>
                        <vx-tooltip class="flex" text="Delete Model">
                          <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                          class="ml-2" @click.stop="deleteModel(tr)" />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </vx-card>
            <vs-popup title="Edit Equipment Model" :active.sync="popupEquipmentModel">
              <div class="vx-col md:w-full w-full mb-5">
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Model Name" v-model="formDataModel.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Model Description" v-model="formDataModel.description" class="w-full" />
                      </div>
                    </div>
                <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
                  @click="saveModel()">Save
                </vs-button>
                <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeModelPopup()">Cancel
                </vs-button>
              </div>
            </vs-popup>
          </div>
        </template>
      </vs-tab>
      <vs-tab label="Equipment Owner" style="min-height:500px">
        <template>
          <div>
            <vx-card ref="MainCard2" v-show="!isOwnerInfoHidden">
              <div class="mt-5">
                <div class="vx-row">
                  <div class="vx-col md:w-1/6 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="cancelAddOwner">Return</vs-button>
                  </div>
                  <div class="vx-col md:w-1/8 w-full">
                    <vs-button color="warning" type="border" class="rounded-lg mb-2"
                      @click="initValues">Restart</vs-button>
                  </div>
                </div>

                <form-wizard ref="wizard" color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)"
                  :title="title" :subtitle="subtitle" finishButtonText="Save entry" @on-complete="saveOwner">
                  <tab-content title="Step 1" class="mb-5" icon="feather icon-home">
                    <!-- tab 1 content -->
                    <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Owner Name" v-model="formDataOwner.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Owner Description" v-model="formDataOwner.description" class="w-full" />
                      </div>
                    </div>
                  </tab-content>
                </form-wizard>
              </div>
            </vx-card>
            <vx-card ref="MainCard" v-show="!isOwnerListHidden">
              <div>
                <vs-table ref="gridTable" v-model="selected" pagination :max-items="itemsPerPage" search
                  :data="ownerData" class="vs-con-loading__container">
                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
                    <!-- ADD NEW -->
                    <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="GetOwner()"
                      icon-pack="feather" icon="icon-refresh-ccw">Reload</vs-button>
                    <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="addOwnerVue"
                      icon-pack="feather" icon="icon-plus-square">Add New</vs-button>
                    <!-- ITEMS PER PAGE -->
                    <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
                      <div
                        class="p-4 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{
                          ownerData.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage :
                            ownerData.length }} of {{ ownerData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <!-- <vs-button class="rounded-lg btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                    <vs-th sort-key="name">Owner</vs-th>
                    <vs-th sort-key="description">Description</vs-th>
                    <vs-th>Action</vs-th>
                  </template>
                  <!-- visible: false -->
                  <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                      <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                      <vs-td :data="tr.description">{{ tr.description }}</vs-td>
                      <vs-td id="iconContainer" class="whitespace-no-wrap">
                        <vx-tooltip class="flex" text="Edit Owner">
                          <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click.stop="openOwnerPopup(tr)" />
                        </vx-tooltip>
                        <vx-tooltip class="flex" text="Delete Owner">
                          <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                          class="ml-2" @click.stop="deleteOwner(tr)" />
                        </vx-tooltip>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </vx-card>
            <vs-popup title="Edit Equipment Owner" :active.sync="popupEquipmentOwner">
              <div class="vx-col md:w-full w-full mb-5">
                <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Owner Name" v-model="formDataOwner.name" class="w-full" />
                      </div>
                      <div class="vx-col md:w-1/2 w-full mt-5">
                        <vs-input label="Owner Description" v-model="formDataOwner.description" class="w-full" />
                      </div>
                    </div>
                <vs-button ref="saveButton" class="rounded-lg mt-3 mr-3 vs-con-loading__container" color="success" type="border"
                  @click="saveOwner()">Save
                </vs-button>
                <vs-button class="rounded-lg mt-3 mr-3" color="warning" type="border" @click="closeOwnerPopup()">Cancel
                </vs-button>
              </div>
            </vs-popup>
          </div>
        </template>
      </vs-tab>
    </vs-tabs>

  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
export default {
  data() {
    return {

      title: 'FAMS - new Information Wizard!!',
      subtitle: 'Please complete each field to add new Information',
      activeTab: 0,

      itemsPerPage: 10,
      itemsPerPage2: 10,
      itemsPerPage3: 10,
      itemsPerPage4: 10,
      itemsPerPage5: 10,
      selected: [],
      isMounted: false,
      isOemListHidden: false,
      isOemInfoHidden: true,
      isCategoryListHidden: false,
      isCategoryInfoHidden: true,
      isLocationListHidden: false,
      isLocationInfoHidden: true,
      isOwnerListHidden: false,
      isOwnerInfoHidden: true,
      isModelListHidden: false,
      isModelInfoHidden: true,

      formDataOem: {
        id: 0,
        name: "",
        description: ""
      },
      formDataCategory: {
        id: 0,
        name: "",
        description: ""
      },
      formDataOwner: {
        id: 0,
        name: "",
        description: ""
      },
      formDataModel: {
        id: 0,
        name: "",
        description: ""
      },
      formDataLocation: {
        id: 0,
        name: "",
        description: ""
      },
      selected: [],
      oemData: [],
      locationData: [],
      ownerData: [],
      categoryData: [],
      modelData: [],
      popupEquipmentOem: false,
      popupEquipmentCategory: false,
      popupEquipmentLocation: false,
      popupEquipmentModel: false,
      popupEquipmentOwner: false,
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  watch: {
    activeTab: function (val) {
      if (val == 0) {
        setTimeout(() => {
          this.GetOEM();
        }, 1000);
        // this.isMounted = true;
      }
      else if (val == 1) {
        setTimeout(() => {
          this.GetCategory();
        }, 1000);
        // this.isMounted = false;
      }
      else if (val == 2) {
        setTimeout(() => {
          this.GetLocation();
        }, 1000);
        // this.isMounted = false;
      }
      else if (val == 3) {
        setTimeout(() => {
          this.GetModel();
        }, 1000);
        // this.isMounted = false;
      }
      else if (val == 4) {
        setTimeout(() => {
          this.GetOwner();
        }, 1000);
        // this.isMounted = false;
      }
    },
  },
  mounted() {
    this.GetOEM();
    this.isMounted = true;
    this.activeTab = 0;
  },
  methods: {
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
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    cancelAddOem() {
      this.isOemListHidden = false,
        this.isOemInfoHidden = true;
      this.initValues();
      this.GetOEM();
    },
    addOemVue() {
      this.initValues();
      this.isOemInfoHidden = false;
      this.isOemListHidden = true
      // this.$refs.wizard.navigateToTab(0)
    },
    cancelAddLocation() {
      this.isLocationListHidden = false,
        this.isLocationInfoHidden = true;
      this.initValues();
      this.GetLocation();
    },
    addLocationVue() {
      this.initValues();
      this.isLocationInfoHidden = false;
      this.isLocationListHidden = true
      // this.$refs.wizard.navigateToTab(0)
    },
    cancelAddCategory() {
      this.isCategoryListHidden = false,
        this.isCategoryInfoHidden = true;
      this.initValues();
      this.GetCategory();
    },
    addCategoryVue() {
      this.initValues();
      this.isCategoryInfoHidden = false;
      this.isCategoryListHidden = true
      // this.$refs.wizard.navigateToTab(0)
    },
    cancelAddOwner() {
      this.isOwnerListHidden = false,
        this.isOwnerInfoHidden = true;
      this.initValues();
      this.GetOwner();
    },
    addOwnerVue() {
      this.initValues();
      this.isOwnerInfoHidden = false;
      this.isOwnerListHidden = true
      // this.$refs.wizard.navigateToTab(0)
    },
    cancelAddModel() {
      this.isModelListHidden = false,
        this.isModelInfoHidden = true;
      this.initValues();
      this.GetModel();
    },
    addModelVue() {
      this.initValues();
      this.isModelInfoHidden = false;
      this.isModelListHidden = true
      // this.$refs.wizard.navigateToTab(0)
    },
    initValues() {
      var self = this;
      self.$refs.wizard.navigateToTab(0)
      self.formDataCategory.Id = 0;
      self.formDataLocation.Id = 0;
      self.formDataModel.Id = 0;
      self.formDataOem.Id = 0;
      self.formDataOwner.Id = 0;
      self.formDataCategory.name = "";
      self.formDataLocation.name = "";
      self.formDataModel.name = "";
      self.formDataOem.name = "";
      self.formDataOwner.name = "";
      self.formDataCategory.description = "";
      self.formDataLocation.description = "";
      self.formDataModel.description = "";
      self.formDataOem.description = "";
      self.formDataOwner.description = "";
    },
    GetOEM() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.oemData = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetOEM",
        onSuccess,
        onFinally
      );
    },
    GetCategory() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.categoryData = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetCategory",
        onSuccess,
        onFinally
      );
    },
    GetLocation() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.locationData = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetLocation",
        onSuccess,
        onFinally
      );
    },
    GetModel() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.modelData = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetModel",
        onSuccess,
        onFinally
      );
    },
    GetOwner() {
      const self = this;
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.ownerData = response.data;
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
        "EquipmentExtras/GetOwner",
        onSuccess,
        onFinally
      );
    },
    saveOem() {
      var self = this;
      var myobject = {};
      myobject.Id = self.formDataOem.id;
        myobject.name = self.formDataOem.name;
        myobject.description = self.formDataOem.description;

      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.OemisListHidden = false;
        self.isOemInfoHidden = true;
        if(self.popupEquipmentOem == true){
          self.popupEquipmentOem = false;
        }
        self.initValues();
        self.GetOEM();
        // self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "EquipmentExtras/PostOEM",
        myobject,
        onSuccess,
        onFinally
      );
    },
    saveCategory() {
      var self = this;
      var myobject = {};
      myobject.Id = self.formDataCategory.id;
        myobject.name = self.formDataCategory.name;
        myobject.description = self.formDataCategory.description;

      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.isLisCategorytHidden = false;
        self.isCategoryInfoHidden = true;
        if(self.popupEquipmentCategory == true){
          self.popupEquipmentCategory = false;
        }
        self.initValues();
        self.GetCategory();
        // self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "EquipmentExtras/PostCategory",
        myobject,
        onSuccess,
        onFinally
      );
    },
    saveLocation() {
      var self = this;
      var myobject = {};
      myobject.Id = self.formDataLocation.id;
        myobject.name = self.formDataLocation.name;
        myobject.description = self.formDataLocation.description;

      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.isLisLocationtHidden = false;
        self.isLocationInfoHidden = true;
        if(self.popupEquipmentLocation == true){
          self.popupEquipmentLocation = false;
        }
        self.initValues();
        self.GetLocation();
        // self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "EquipmentExtras/PostLocation",
        myobject,
        onSuccess,
        onFinally
      );
    },
    saveModel() {
      var self = this;
      var myobject = {};
      myobject.Id = self.formDataModel.id;
        myobject.name = self.formDataModel.name;
        myobject.description = self.formDataModel.description;

      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.isModelListHidden = false;
        self.isModelInfoHidden = true;
        if(self.popupEquipmentModel == true){
          self.popupEquipmentModel = false;
        }
        self.initValues();
        self.GetModel();
        // self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "EquipmentExtras/PostModel",
        myobject,
        onSuccess,
        onFinally
      );
    },
    saveOwner() {
      var self = this;
      var myobject = {};
      myobject.Id = self.formDataOwner.id;
        myobject.name = self.formDataOwner.name;
        myobject.description = self.formDataOwner.description;

      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function (response) {
        self.isOwnerListHidden = false;
        self.isOwnerInfoHidden = true;
        if(self.popupEquipmentOwner == true){
          self.popupEquipmentOwner = false;
        }
        self.initValues();
        self.GetOwner();
        // self.GetGrid();
        //self.GetGrid();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
        self.successNotify();
      };
      self.$ajaxPost(
        self,
        "EquipmentExtras/PostOwner",
        myobject,
        onSuccess,
        onFinally
      );
    },
    deleteOem(data){
      var self = this;
      
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetOEM();
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "EquipmentExtras/DeleteOEM/" + data.id,
        onSuccess,
        onFinally
      );
    },
    deleteCategory(data){
      var self = this;
      
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetCategory();
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "EquipmentExtras/DeleteCategory/" + data.id,
        onSuccess,
        onFinally
      );
    },
    deleteLocation(data){
      var self = this;
      
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetLocation();
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "EquipmentExtras/DeleteLocation/" + data.id,
        onSuccess,
        onFinally
      );
    },
    deleteModel(data){
      var self = this;
      
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetModel();
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "EquipmentExtras/DeleteModel/" + data.id,
        onSuccess,
        onFinally
      );
    },
    deleteOwner(data){
      var self = this;
      
      // self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.GetOwner();
      };
      var onFinally = function() {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
         self.successNotify();
      };
      self.$ajaxDelete(
        self,
        "EquipmentExtras/DeleteOwner/" + data.id,
        onSuccess,
        onFinally
      );
    },
    openOemPopup(data){
      var self = this;
      self.formDataOem.id = data.id;
      self.formDataOem.name = data.name;
      self.formDataOem.description = data.description;
      
      self.popupEquipmentOem = true;
    },
    closeOemPopup(){
      var self = this;
      self.popupEquipmentOem = false;
      self.initValues();
    },
    openCategoryPopup(data){
      var self = this;
      self.formDataCategory.id = data.id;
      self.formDataCategory.name = data.name;
      self.formDataCategory.description = data.description;
      
      self.popupEquipmentCategory = true;
    },
    closeCategoryPopup(){
      var self = this;
      self.popupEquipmentCategory = false;
      self.initValues();
    },
    openLocationPopup(data){
      var self = this;
      self.formDataLocation.id = data.id;
      self.formDataLocation.name = data.name;
      self.formDataLocation.description = data.description;
      
      self.popupEquipmentLocation = true;
    },
    closeLocationPopup(){
      var self = this;
      self.popupEquipmentLocation = false;
      self.initValues();
    },
    openModelPopup(data){
      var self = this;
      self.formDataModel.id = data.id;
      self.formDataModel.name = data.name;
      self.formDataModel.description = data.description;
      
      self.popupEquipmentModel = true;
    },
    closeModelPopup(){
      var self = this;
      self.popupEquipmentModel = false;
      self.initValues();
    },
    openOwnerPopup(data){
      var self = this;
      self.formDataOwner.id = data.id;
      self.formDataOwner.name = data.name;
      self.formDataOwner.description = data.description;
      
      self.popupEquipmentOwner = true;
    },
    closeOwnerPopup(){
      var self = this;
      self.popupEquipmentOwner = false;
      self.initValues();
    },
  }
};

</script>
<style>
#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>