<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base ">
        <vx-card class="pb-3"  title="FAMS Quick Dispensing View" refresh-content-action @refresh="closeCardAnimationDemo" collapse-action>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-2">
              <label>From date</label>
              <datepicker
                class="w-full"
                id="FromDate"
                placeholder="From Date"
                v-model="formData.fromDate"
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
                    v-model="formData.toDate"
                    format="yyyy-MM-dd"
                    name ="To Date" v-validate="'required'"
              ></datepicker>
              <span class="text-danger text-sm" v-show="errors.has('To Date')" >{{ errors.first('To Date') }}</span>
            </div>
          </div>
          <br>
          <div class="vx-col w-full mb-base">
            <v-select class="w-full" placeholder="Search / Select report"  :options="reportDropdown"  v-model="report" @search:blur="populateData"
                name ="Report" v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Report')" >{{ errors.first('Report') }}</span>
          </div>
          <div class="vx-col w-full mb-base">
            <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" color="primary" @click="loadFamsInformation">Submit</vs-button>
          </div>
        </vx-card>
          <div id="QDPGrid" ref='fgrid' class="vs-con-loading__container">
              <div id="Grid" ></div>
          </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import { GridPlugin, Grid,DetailRow ,Aggregate , ExcelExport, Page,RowDD, Selection, Group, Toolbar,Search,Reorder,Sort,Filter  } from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
import { DataManager, ODataAdaptor } from "@syncfusion/ej2-data";
Vue.use(GridPlugin);
Grid.Inject(Sort,Page,Toolbar,Aggregate ,ExcelExport,DetailRow,Search);
export default {
  data() {
    return {
      aggregateColumn : [],
      aggregate: null,
      toolbar: ['ExcelExport','CsvExport','Print','Search'],
      pageSettings: { pageCount: 20 },
      grid: "",
      flag: true,
      SimpleDetailGrid:0,
      queryString:"",
      pid:0,
      columns: [],
      columnsSelecteds: [],
      activePrompt: false,
      activePromptSubGrid: false,
      fileName: "",
      formats:["xlsx", "csv", "txt"] ,
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      headerTitle: ["Allocation", "Description", "Group"],
      headerVal: ["allocation", "description", "allocationGroupName"],
      report: [],
      reportDropdown: [
          { value: 1, label: 'General view' },
          { value: 14, label: 'General view - price' },
          { value: 2, label: 'Usage per Product' },
          { value: 3, label: 'Usage per Store' },
          { value: 4, label: 'Usage per Equipment' },
          { value: 5, label: 'Elig / Non Elig Equipment' },
          { value: 6, label: 'Usage per Allocations' },
          { value: 7, label: 'Elig / Non Elig Allocations' },
          { value: 8, label: 'Usage per Master Equipment' },
          { value: 9, label: 'Usage per CostCentres' },
          { value: 9, label: 'Usage per Driver' },
          { value: 9, label: 'Usage per Fuel Attendant' },
          { value: 10, label: 'Fuel Transfers' },
          { value: 11, label: 'KPI' },
          { value: 16, label: 'SARS/Logbook' },
          { value: 12, label: 'Stock Received (FAMS)' },
          { value: 13, label: 'Stock Received (MANUAL)' },
          { value: 15, label: 'Usage - Manual Added' }
        ],

      componentKey:0,
      selected: [],
      famsDBDataChild: [],
      famsDBData: [],
      isMounted: false,
      isVisible: false,
      formData: {
        fromDate: '',
        toDate: '',
        report: ''
      },
      selectionOptions: { mode: 'Row' },
      localColforGrid:[],
      localColforGridChild:[],
      DetialUsageReceiveFAMS:[
        {
          field: "pid",
          headerText: "pid",
          textAlign: "Left",
          width: 150,
          visible:false,
          type: "number"
        },
        {
          field: "eid",
          headerText: "eid",
          textAlign: "Left",
          width: 150,
          visible:false,
          type: "number"
        },
        {
          field: "store",
          headerText: "Store",
          textAlign: "Left",
          width: 180,
          type: "string"
        },
        {
          field: "registration",
          headerText: "Registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
              field: "measurement",
              headerText: "Measurement",
              textAlign: "Left",
              width: 180,
              type: "string"
            },
            {
              field: "kmHour",
              headerText: "KMHour",
              textAlign: "Left",
              width: 150,
              type: "number"
            },
            {
              field: "volume",
              headerText: "Volume",
              textAlign: "Left",
              width: 150,
              type: "number"
            },
          {
              field: "operator",
              headerText: "Operator",
              textAlign: "Left",
              width: 180,
              type: "string"
            },
          {
              field: "driver",
              headerText: "Driver",
              textAlign: "Left",
              width: 180,
              type: "string"
            },
          {
              field: "authorization",
              headerText: "Authorization",
              textAlign: "Left",
              width: 180,
              type: "string"
            },
          {
              field: "product",
              headerText: "Product",
              textAlign: "Left",
              width: 180,
              type: "string"
            },
      ],
      UsageReceiveFAMS:[
        {
            field: "eid",
            headerText: "eid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
        {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "product",
            headerText: "product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
              field: "volume",
              headerText: "volume",
              textAlign: "Left",
              width: 150,
              type: "number"
            },
          ],
      DetailFuelTransfer:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "eid",
            headerText: "eid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],
      DetailPerUsagePerFuelAttedant:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "fid",
            headerText: "fid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },

          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],
      DetailPerUsagePerDriver:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "did",
            headerText: "did",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],
      DetailPerCostCentre:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "cid",
            headerText: "cid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "costCentre",
            headerText: "costCentre",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],
      DetailPerMasterEquipment:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "mid",
            headerText: "mid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "masterEquip",
            headerText: "Master Equip",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],
      DetialElig_NonElgAllocations:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "arbid",
            headerText: "arbid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },

          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "rebate",
            headerText: "EligNonElig_All",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation1",
            headerText: "Allc1",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation2",
            headerText: "Allc2",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation3",
            headerText: "Allc3",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation4",
            headerText: "Allc4",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          },
      ],
      DetialUsagePerAllocations:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "eid",
            headerText: "eid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },

          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "rebate",
            headerText: "EligNonElig_All",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation1",
            headerText: "Allc1",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation2",
            headerText: "Allc2",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation3",
            headerText: "Allc3",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "allocation4",
            headerText: "Allc4",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          },
      ],
      DetialElig_NonEligEquipment:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "eneid",
            headerText: "eneid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "rebate",
            headerText: "EligNonElig_Equipment",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],
        DetialUsagePerEquipment:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "eid",
            headerText: "eid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          },
          {
            field: "rebate",
            headerText: "Rebate",
            textAlign: "Left",
            width: 120,
            type: "string"
          }
        ],
      DetialUsagePerStore:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
            {
            field: "sid",
            headerText: "sid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],
      DetialUsagePerProduct:[
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 150,
            visible:false,
            type: "number"
          },
          {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "driver",
            headerText: "Driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Left",
            width: 180,
            type: "number"
          }
        ],

      UsageManualAdd:[
          {
            field: "dataEntry",
            headerText: "DataEntry",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "store",
            headerText: "Store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "Registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
            {
            field: "operator",
            headerText: "FuelAttendant",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "driver",
            headerText: "driver",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "date",
            headerText: "Date",
            textAlign: "Left",
            width: 200,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "measurement",
            headerText: "Type",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "kmHour",
            headerText: "kmHour",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Left",
            width: 160,
            type: "number"
          }

      ],
      UsageReceiveManual: [
            {
            field: "storeID",
            headerText: "storeID",
            textAlign: "Left",
            width: 160,
            visible:false,
            type: "string"
          },
            {
            field: "productID",
            headerText: "productID",
            textAlign: "Left",
            width: 160,
            visible:false,
            type: "string"
          },
            {
            field: "tankID",
            headerText: "tankID",
            textAlign: "Left",
            width: 160,
            visible:false,
            type: "string"
          },
            {
            field: "storeName",
            headerText: "store",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
            {
            field: "productName",
            headerText: "Product",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
            {
            field: "tankName",
            headerText: "Tank",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "createDate",
            headerText: "Date",
            textAlign: "Left",
            width: 200,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
            {
            field: "fuelprice",
            headerText: "fuelprice",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
            {
            field: "volume",
            headerText: "Volume",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "description",
            headerText: "description",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "invoiceNr",
            headerText: "invoiceNr",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "deliveryNote",
            headerText: "deliveryNote",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "fuelSupplier",
            headerText: "fuelSupplier",
            textAlign: "Left",
            width: 160,
            type: "string"
          }
          ],

        GeneralViewPrice: [
            {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
            {
            field: "name",
            headerText: "name",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
              {
              field: "product",
            headerText: "product",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "operator",
            headerText: "FuelAttedant",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "driver",
            headerText: "driver",
            textAlign: "Left",
            width: 150,
            type: "string"
          },

            {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 200,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "measurement_Name",
            headerText: "Type",
            textAlign: "Left",
            width: 80,
            type: "string"
          },
            {
            field: "openingReading",
            headerText: "Opn",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "closingReading",
            headerText: "Close",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "totalReading",
            headerText: "Total",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
            {
            field: "kmPerLitre",
            headerText: "km/L",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "litrePerHour",
            headerText: "L/Hr",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "fuelPrice",
            headerText: "fuelPrice",
            textAlign: "Left",
            width: 150,
            type: "number"
          },
          {
            field: "costcentre",
            headerText: "costcentre",
            textAlign: "Left",
            width: 250,
            type: "string"
          },
          {
            field: "masterEquipment",
            headerText: "Master Eqp",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
  ],
  GeneralView: [
            {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 160,
            type: "string"
          },
            {
            field: "name",
            headerText: "name",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
              {
              field: "product",
            headerText: "product",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "operator",
            headerText: "FuelAttedant",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "driver",
            headerText: "driver",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 200,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "measurement_Name",
            headerText: "Type",
            textAlign: "Left",
            width: 80,
            type: "string"
          },
            {
            field: "openingReading",
            headerText: "Opn",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "closingReading",
            headerText: "Close",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "totalReading",
            headerText: "Total",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
            {
            field: "kmPerLitre",
            headerText: "km/L",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "litrePerHour",
            headerText: "L/Hr",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "costcentre",
            headerText: "costcentre",
            textAlign: "Left",
            width: 250,
            type: "string"
          },
          {
              field: "description",
              headerText: "description",
              textAlign: "Left",
              width: 200,
              type: "string"
          },
          {
            field: "eqpMax",
            headerText: "eqpMax",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "fuelPrice",
            headerText: "fuelPrice",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "masterEquipment",
            headerText: "Master Eqp",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "jobNumber",
            headerText: "Job Number",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "rebate",
            headerText: "Rebate",
            textAlign: "Left",
            width: 120,
            type: "string"
          },


  ],
  FuelTransfer: [
            {
              field: "eid",
              headerText: "eid",
              textAlign: "Left",
              width: 120,
              visible:false,
              type: "number"
          },
            {
              field: "pid",
              headerText: "pid",
              textAlign: "Left",
              width: 120,
              visible:false,
              type: "number"
          },
            {
            field: "product",
            headerText: "Product",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
            {
            field: "registration",
            headerText: "Registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
            {
            field: "volume",
            headerText: "Volume",
            textAlign: "Left",
            width: 180,
            type: "string"
          }
    ],
  SARSLogbook: [
            {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
              {
              field: "product",
            headerText: "product",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttedant",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "driver",
            headerText: "driver",
            textAlign: "Left",
            width: 150,
            type: "string"
          },

            {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 200,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "measurement_Name",
            headerText: "Type",
            textAlign: "Left",
            width: 80,
            type: "string"
          },
            {
            field: "openingReading",
            headerText: "Opn",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "closingReading",
            headerText: "Close",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "totalReading",
            headerText: "Total",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
            {
            field: "kmPerLitre",
            headerText: "km/L",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "litrePerHour",
            headerText: "L/Hr",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
              field: "rebate",
              headerText: "Eqp Rebate",
              textAlign: "Left",
              width: 120,
              type: "string"
          },

            {
              field: "allocation1",
              headerText: "All1",
              textAlign: "Left",
              width: 120,
              type: "string"
            },
            {
              field: "allocation2",
              headerText: "All2",
              textAlign: "Left",
              width: 120,
              type: "string"
            },
            {
              field: "allocation3",
              headerText: "All3",
              textAlign: "Left",
              width: 120,
              type: "string"
            },
            {
              field: "allocation4",
              headerText: "All4",
              textAlign: "Left",
              width: 120,
              type: "string"
            }
  ],
  KPI: [
      {
            field: "store",
            headerText: "store",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "registration",
            headerText: "registration",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
              {
              field: "product",
            headerText: "product",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "operator",
            headerText: "FuelAttedant",
            textAlign: "Left",
            width: 150,
            type: "string"
          },
          {
            field: "driver",
            headerText: "driver",
            textAlign: "Left",
            width: 150,
            type: "string"
          },

            {
            field: "date",
            headerText: "date",
            textAlign: "Left",
            width: 200,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
          {
            field: "measurement_Name",
            headerText: "Type",
            textAlign: "Left",
            width: 80,
            type: "string"
          },
            {
            field: "openingReading",
            headerText: "Opn",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "closingReading",
            headerText: "Close",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "totalReading",
            headerText: "Total",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
            {
            field: "kmPerLitre",
            headerText: "km/L",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "litrePerHour",
            headerText: "L/Hr",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
            {
            field: "costcentre",
            headerText: "costcentre",
            textAlign: "Left",
            width: 180,
            type: "string"
          }
  ],
  UsagePerDriver: [
          {
            field: "did",
            headerText: "did",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
          {
          field: "pid",
          headerText: "pid",
          textAlign: "Left",
          width: 120,
          visible:false,
          type: "number"
        },
        {
            field: "driver",
            width: 160,
            headerText: "Driver",
            type: "string"
        },
        {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
        },
          {
            field: "volume",
            headerText: "Volume",
            width: 120
          }
  ],
  UsagePerFuelAttedant: [
          {
            field: "fid",
            headerText: "fid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
          {
          field: "pid",
          headerText: "pid",
          textAlign: "Left",
          width: 120,
          visible:false,
          type: "number"
        },
        {
            field: "fuelAtt",
            width: 160,
            headerText: "Fuel Attendant",
            type: "string"
         },
        {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
         },
          {
            field: "volume",
            headerText: "Volume",
            width: 120
          }
  ],
  UsagePerCostCentre: [
          {
            field: "cid",
            headerText: "cid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "costCentre",
            headerText: "costCentre",
             textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            width: 120
          },

        ],
    UsagePerMasterEquipment: [
          {
            field: "mid",
            headerText: "mid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "masterEquip",
            headerText: "Master Equipment",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            width: 120
          },

        ],

  Elig_NonEligAllocations: [
          {
            field: "eneid",
            headerText: "eneid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "elig_NonElig_Allocation",
            headerText: "Elig | NonElig Allocation",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Right",
            width: 120
          },

        ],

  Elig_NonEligEquipment: [
          {
            field: "eneid",
            headerText: "eneid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "elig_NonElig_Equipment",
            headerText: "Elig_NonElig_Equipment",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Right",
            width: 120
          },

        ],
    UsagePerEquipment: [
          {
            field: "eid",
            headerText: "eid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "pid",
            headerText: "pid",
            textAlign: "Left",
            width: 120,
            visible:false,
            type: "number"
          },
            {
            field: "registration",
            headerText: "Registration",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            width: 120
          },

        ],
        usagePerAllocation: [
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Right",
            width: 120,
            visible:false,
            type: "number"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            textAlign: "Right",
            width: 120
          },

        ],

      UsagePerProduct: [
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Right",
            width: 120,
            visible:false,
            type: "number"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "Volume",
            width: 120
          },

        ],
    UsagePerStore: [
          {
            field: "pid",
            headerText: "pid",
            textAlign: "Right",
            width: 120,
            visible:false,
            type: "number"
          },
          {
            field: "sid",
            headerText: "sid",
            textAlign: "Right",
            width: 120,
            visible:false,
            type: "number"
          },
          {
            field: "store",
            headerText: "Store",
            textAlign: "Left",
            width: 120,
            type: "string"
          },
          {
            field: "product",
            width: 140,
            headerText: "Product",
            type: "string"
          },
          {
            field: "volume",
            headerText: "volume",
            textAlign: "Right",
            width: 120
          },

        ]
    };
  },
    props: {

    },
  provide : {
    grid: [DetailRow, ExcelExport, Page, Group,Selection, Toolbar,Search,Reorder,Sort ]
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker
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
    this.clearFields();
    this.isMounted = true;
    var date = new Date();
    this.formData.fromDate =  new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
 populateData() {
      var self = this;
          self.flag = true
          var element = document.getElementById('Grid');
          if(element) element.remove();

          var p = document.getElementById('QDPGrid');
          var newElement = document.createElement('Div');
          newElement.setAttribute('id', 'Grid');
          p.appendChild(newElement);
      },
    expanded () {
      alert(this.isActive);
    },
    formatDate(pad, dateTime)
    {
      if (typeof dateTime === 'undefined')
        return pad;

      return (pad + dateTime).slice(-pad.length);
    },
    dateFormat(date) {
      var month = '';
      var year = '';
      var day = '';

      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
      return [year, month, day].join('-');
    },

    forceRerender() {
      this.componentKey += 1;
    },
    loadFamsInformation(){
        const self = this;
        const empty = {};
        let famsURL ='';
        self.SimpleDetailGrid = 0;
        if(!self.report || self.report.length == 0){
          self.$vs.notify({
          title: "Attention",
          color: "warning",
          text: `Please select a report`,
          position: "top-right",
          iconPack: "feather",
          icon: "icon-x"
        });
        }else{
          let details = `&clientKey=${localStorage.getItem('userKey')}&accountkey=${localStorage.getItem('userAccountKey')}&fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`

          if(self.report.label == 'General view')
          {
            self.SimpleDetailGrid = 0;
            self.localColforGrid = self.GeneralView;
            famsURL = `Get_Reportinglogbook?${details}`;
          }
          else if(self.report.label == 'Usage per Product')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'pid';
            self.localColforGridChild =self.DetialUsagePerProduct;
            self.localColforGrid = self.UsagePerProduct;
            famsURL = `Get_Overview?${details}`;
          }
          else if(self.report.label == 'Usage per Store')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'sid';
            self.localColforGridChild =self.DetialUsagePerStore;
            self.localColforGrid = self.UsagePerStore;
            famsURL = `Get_UsagePerStore?${details}`;
          }
          else if(self.report.label == 'Usage per Equipment')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'eid';
            self.localColforGridChild =self.DetialUsagePerEquipment;
            self.localColforGrid = self.UsagePerEquipment;
            famsURL = `Get_UsagePerEquipment?${details}`;
          }

          else if(self.report.label == 'Usage per Allocations')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'pid';
            self.localColforGridChild =self.DetialUsagePerAllocations;
            self.localColforGrid = self.usagePerAllocation;
            famsURL = `Get_usagePerAllocation?${details}`;
          }
          else if(self.report.label == 'Usage per Master Equipment')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'mid';
            self.localColforGridChild = self.DetailPerMasterEquipment;
            self.localColforGrid = self.UsagePerMasterEquipment;
            famsURL = `Get_UsageMasterEquipment?${details}`;
          }
          else if(self.report.label == 'Usage per CostCentres')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'cid';
            self.localColforGridChild = self.DetailPerCostCentre;
            self.localColforGrid = self.UsagePerCostCentre;
            famsURL = `Get_UsageCostCentre?${details}`;
          }
          else if(self.report.label == 'Fuel Transfers')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'eid';
            self.localColforGridChild = self.DetailFuelTransfer;
            self.localColforGrid = self.FuelTransfer;
            famsURL = `Get_TransfersPerEquipment?${details}`;
          }
          else if(self.report.label == 'Usage per Driver')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'did';
            self.localColforGridChild = self.DetailPerUsagePerDriver
            self.localColforGrid = self.UsagePerDriver;
            famsURL = `Get_UsageDriver?${details}`;
          }
          else if(self.report.label == 'Usage per Fuel Attendant')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'fid';
            self.localColforGridChild = self.DetailPerUsagePerFuelAttedant
            self.localColforGrid = self.UsagePerFuelAttedant;
            famsURL = `Get_UsageFuelAttendant?${details}`;
          }
          else if(self.report.label == 'Elig / Non Elig Equipment')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'eneid';
            self.localColforGrid = self.Elig_NonEligEquipment;
            self.localColforGridChild =self.DetialElig_NonEligEquipment;
            famsURL = `Get_EligibleNonEligibleEquipment?${details}`;
          }
          else if(self.report.label == 'Elig / Non Elig Allocations')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'arbid';
            self.localColforGridChild =self.DetialElig_NonElgAllocations;
            self.localColforGrid = self.Elig_NonEligAllocations;
            famsURL = `Get_EligibleNonEligibleAllocation?${details}`;
          }
          else if(self.report.label == 'KPI')
          {
            self.SimpleDetailGrid = 0;
            self.localColforGrid = self.KPI
            famsURL = `Get_KPISARS?${details}`;
          }
          else if(self.report.label == 'SARS/Logbook')
          {
            self.SimpleDetailGrid = 0;
            self.localColforGrid = self.SARSLogbook
            famsURL = `Get_KPISARS?${details}`;
          }
          else if(self.report.label == 'Stock Received (FAMS)')
          {
            self.SimpleDetailGrid = 1;
            self.queryString = 'eid';
            self.localColforGridChild =self.DetialUsageReceiveFAMS;
            self.localColforGrid = self.UsageReceiveFAMS
            famsURL = `Get_RecievingPerEquipment?${details}`;
          }
          else if(self.report.label == 'Stock Received (MANUAL)')
          {
            self.SimpleDetailGrid = 0;
            self.localColforGrid = self.UsageReceiveManual
            famsURL = `Get_UsageRecievingManual?${details}`;
          }
          else if(self.report.label == 'General view - price')
          {
            self.SimpleDetailGrid = 0;
            self.localColforGrid = self.GeneralViewPrice
            famsURL = `Get_ReportinglogbookPrice?${details}`;
          }

          else if(self.report.label == 'Usage - Manual Added')
          {
            self.SimpleDetailGrid = 0;
            self.localColforGrid = self.UsageManualAdd
            famsURL = `Get_UsageManualAdded?${details}`;
          }
          if(self.SimpleDetailGrid == 0) self.GetGridSimple(famsURL)
          else if(self.SimpleDetailGrid == 1) self.GetGrid(famsURL)

      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }));
    },
    clearFields() {
      this.filename = "",
      this.cellAutoWidth = true,
      this.selectedFormat = "csv"
    },
    closeCardAnimationDemo(card) {
      this.clearFields();
      card.removeRefreshAnimation(3000);
    },
    pdfExportComplete(args) {
        this.grid.hideSpinner();
    },
    excelExportComplete(args) {
        this.grid.hideSpinner();
    },

      toolbarClick(args) {
        switch (args['item'].text) {
            case 'PDF Export':
                this.grid.pdfExport({fileName:"new.pdf"});
                break;
            case 'Excel Export':
                this.grid.excelExport({fileName:"new.xlsx" });
                break;
            case 'CSV Export':
                this.grid.csvExport({fileName:"new.csv"});
                break;
        }
    },
    sumTemplate: function () {
        return  { template : Vue.component('sumTemplate', {
            template: `<span>Sum: {{ self.famsDBData.volume }}</span>`,
            data () {return { data: {}};}
            })
        }},
    GetGridSimple(famsURL) {
      const self = this;
      self.isVisible = false;
      self.clearFields();

      self.showLoadingOnElement("submit", 0.45, "radius");
      var onSuccess = function(response) {
        self.famsDBData = response.data;
        self.aggregateColumn =  [{
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
              excelExportComplete:'excelExportComplete'  ,
              allowSorting:true,
              allowPaging: true,
              allowExcelExport:true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick:self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.localColforGrid,
              height: 500,
              PageSettings: 20,
              aggregates:self.aggregateColumn

            });
              self.flag = false;
              self.grid.appendTo("#Grid");
              self.grid.refresh()
        }
        else  self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.submit.$el);
      };
      self.$ajaxGet(
        self,
        'QuickViewDispensing/' + famsURL,
        onSuccess,
        onFinally
      );
    },

  onDetailDataBound(args) {
    const self = this;
    let _Id1 = 0;
    let _Id2 = 0;
    let famsURL ='';
    self.showLoadingOnElement("fgrid", 0.45, "radius");
    if(self.report.label == 'Usage per Product')
    {
      _Id1 = args.data.pid
        famsURL = `Get_OverviewDetail?clientKey=${localStorage.getItem('userKey')}
        &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}
        &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Usage per Store')
    {
      _Id1 = args.data.pid
      _Id2 = args.data.sid
      famsURL = `Get_UsagePerStoreDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Usage per Equipment')
    {
      _Id1 = args.data.pid
      _Id2 = args.data.eid
      famsURL = `Get_UsagePerEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Usage per Allocations')
    {
      _Id1 = args.data.pid
      _Id2 = 0
      famsURL = `Get_UsagePerAllocationDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Usage per Master Equipment')
    {
      _Id1 = args.data.pid
      _Id2 = args.data.mid
      famsURL = `Get_UsagePerMasterEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Usage per CostCentres')
    {
      _Id1 = args.data.pid
      _Id2 = args.data.cid
      famsURL = `Get_UsagePerCostCentreDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Fuel Transfers')
    {
      _Id1 = args.data.pid
      _Id2 = args.data.eid
      famsURL = `Get_TransfersPerEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Stock Received (FAMS)')
    {
      _Id1 = args.data.pid
      _Id2 = args.data.eid
      famsURL = `Get_RecievingPerEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Elig / Non Elig Equipment')
    {
      _Id1 = args.data.eneid
      _Id2 = args.data.pid
      famsURL = `Get_EligibleNonEligibleEquipmentDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Elig / Non Elig Allocations')
    {
      _Id1 = args.data.arbid
      _Id2 = args.data.pid
      famsURL = `Get_EligibleNonEligibleAllocationDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Usage per Driver')
    {
      _Id1 = args.data.did
      _Id2 = args.data.pid
      famsURL = `Get_UsagePerDriverDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }
    else if(self.report.label == 'Usage per Fuel Attendant')
    {
      _Id1 = args.data.fid
      _Id2 = args.data.pid
      famsURL = `Get_UsagePerFuelAttDetail?clientKey=${localStorage.getItem('userKey')}
      &accountkey=${localStorage.getItem('userAccountKey')}&ID=${_Id1}&ID2=${_Id2}
      &fromdate=${self.dateFormat(self.formData.fromDate)}&todate=${self.dateFormat(self.formData.toDate)}`;
    }



      var onSuccess = function(response) {
        self.famsDBDataChild = response.data;
        args.detailElement.querySelector('.e-grid').ej2_instances[0].dataSource = response.data;
      };
      var onFinally = function() {
          self.$vs.loading.close(self.$refs.fgrid.$el);

      };
      self.$ajaxGet(
        self,
        'QuickViewDispensing/' + famsURL,
        onSuccess,
        onFinally
      );
    },

    GetGrid(famsURL) {
      const self = this;
      self.isVisible = false;
      self.clearFields();
      self.aggregateColumn =  [{
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
      self.showLoadingOnElement("submit", 0.45, "radius");
      var onSuccess = function(response) {
        self.famsDBData = response.data;
        if (self.flag) {
            //Grid.Inject(Page);
            self.grid = new Grid({
              excelExportComplete:'excelExportComplete'  ,
              allowSorting:true,
              allowPaging: true,
              allowExcelExport:true,
              scrollSettings: { width: 886, height: 500 },
              toolbar: self.toolbar,
              toolbarClick:self.toolbarClick,
              dataSource: self.famsDBData,
              columns: self.localColforGrid,
              detailDataBound:self.onDetailDataBound,
              aggregates:self.aggregateColumn,
              childGrid: {
                  queryString: self.queryString,
                  columns: self.localColforGridChild  ,
                  allowSorting:true,
                  allowExcelExport:true,
                  scrollSettings: { width: 886, height: 500 },
                  toolbar: self.toolbar,
                  toolbarClick:self.toolbarClick,
                  aggregates:self.aggregateColumn
              },

            });
              self.flag = false;
              self.grid.appendTo("#Grid");
              self.grid.refresh()
        }
        else  self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.submit.$el);
        self.isVisible = true;
      };
      self.$ajaxGet(
        self,
        'QuickViewDispensing/' + famsURL,
        onSuccess,
        onFinally
      );
    },
    successNotifyGridExpanded() {
            this.$vs.notify({
              title: 'Grid - Successfully',
              text: 'Grid expanded / closed',
              color: 'warning'
            })
          },
    successNotifyDataLoad() {
            this.$vs.notify({
              title: 'Successfully',
              text: 'Information successfully loaded',
              color: 'success'
            })
          },
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
  }
}

</script>

<style lang="scss">

  #dispensing-card{
    .vx-card__collapsible-content {
      .vx-card__body{
        height: 100vh;
      }
    }
  }

</style>
<style>
    @import "material.css";

</style>

