<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base ">
        <vx-card class="pb-3"  title="FAMS Quick Balancing View" refresh-content-action @refresh="closeCardAnimationDemo" collapse-action>
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
                  name ="To Date" 
                  v-validate="'required'"
              ></datepicker>
              <span class="text-danger text-sm" v-show="errors.has('To Date')" >{{ errors.first('To Date') }}</span>
            </div>   
          </div>
          <br>
          <div class="vx-col w-full mb-base">
             <v-select ref="report" class="w-full" placeholder="Search / Select report"  :options="reportDropdown"  v-model="report" @search:blur="populateData"
                name ="Report" v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Report')" >{{ errors.first('Report') }}</span>
          </div>
          <div class="vx-col w-full mb-base">
                <v-select ref="Tank" v-show="isTankHidden" class="w-full" placeholder="Search / Select Tank"  :options="DropdownData" v-model="tank"
                  name ="tank" v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('Tank')" >{{ errors.first('Tank') }}</span>
          </div>
          <div class="vx-col w-full mb-base">
            <vs-button ref="submit" id="addInfo" class="rounded-lg w-full vs-con-loading__container" @click="loadFamsInformation">Submit</vs-button>
          </div> 
        </vx-card>  

         <div id="QBGrid">
              <div id="BalancingGrid" ref='grid'></div>  
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

import { GridPlugin, Grid,PdfExport , ExcelExport, Page,RowDD, Selection, Group, Toolbar,Search,Sort,Filter  } from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
Vue.use(GridPlugin);
Grid.Inject(Sort,Search, Page,Toolbar,PdfExport,ExcelExport);
export default {
  data() {
    return {
      tank: [],
      famsURL :'',
      _famsURL :'',
      DropdownData: [],
      toolbarOptions: ['PdfExport', 'ExcelExport', 'CsvExport'],
      //pageSettings: { pageCount: 10 },
      pageSettings:20,
      grid: "", 
      flag: true,
      isTankHidden: false,
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
      report: "",
      reportDropdown: [
          // { value: 0, label: 'Please select - Report' },
          { value: 1, label: 'ATG VS Consumption (All)'},
          { value: 2, label: 'ATG VS Consumption (Per Tank)' },
          { value: 3, label: 'Pivot - ATG (All)' },
          { value: 4, label: 'Pivot - ATG Open' },
          { value: 5, label: 'Pivot - ATG Close' },
          { value: 6, label: 'Pivot - Per Store' },
          { value: 7, label: 'Pivot - Per Store (Fix)' },
          { value: 8, label: 'Pivot - Per Store (Mobile)' },
          { value: 9, label: 'Pivot - Per Store Per Registration' },
          { value: 10, label: 'Pivot - Per Registration' },
          { value: 17, label: 'Pivot - Per Registration (Cost Centre & Master Group)' },
          { value: 11, label: 'Pivot - CostCentre' },
          { value: 12, label: 'Pivot - CostCentre (Detail)' },
          { value: 13, label: 'Pivot - Transfer' },
          { value: 14, label: 'Pivot - Transfer (Detail)' },
          { value: 15, label: 'Pivot - Receive (Manual Per Store)' },
          { value: 16, label: 'Pivot - Receive (Manual Per Tank)' }
        ],
      itemsPerPage: 10,
      componentKey:0,
      selected: [],
      famsDBData: [],
      famsHeaders:[],
      famsDBDataSelected: [],
      sidebarData: {},
      isMounted: false,
      isVisible: false,
      formData: {
        fromDate: '',
        toDate: '',
        report: ''
      },
      selectionOptions: { mode: 'Row' },

      localColforGrid:[],
      aggregateColumn : [],
      PivottableUsageDetailMasterCostReg: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "registration",
          headerText: "Registration",
          textAlign: "Left",
          width: 180,
          type: "string"
        },  
        // {
        //   field: "Equipment",
        //   headerText: "Equipment Description",
        //   textAlign: "Left",
        //   width: 180,
        //   type: "string"
        // },  
        {
          field: "costCentre",
          headerText: "costCentre",
          textAlign: "Left",
          width: 180,
          type: "string"
        },  
        {
          field: "masterEquipment",
          headerText: "masterEquipment",
          textAlign: "Left",
          width: 200,
          type: "string"
        },      
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],

      PivotReceiveManualPerTank: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "store Usages",
          headerText: "Store",
          textAlign: "Left",
          width: 180,
          type: "string"
        },  
        {
          field: "tankName",
          headerText: "Tank",
          textAlign: "Left",
          width: 180,
          type: "string"
        },      
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotReceiveManualPerStore: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "store Usages",
          headerText: "Store",
          textAlign: "Left",
          width: 180,
          type: "string"
        },          
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },

       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotTransferDetail: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "from Transfer",
          headerText: "Transfer From",
          textAlign: "Left",
          width: 180,
          type: "string"
        },   
         {
          field: "to Transfer",
          headerText: "To Transfer",
          textAlign: "Left",
          width: 180,
          type: "string"
        },          
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotTransfer: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "transfer from",
          headerText: "Transfer From",
          textAlign: "Left",
          width: 180,
          type: "string"
        },          
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotCostCentreDetail: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "costCentre",
          headerText: "CostCentre",
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
          field: "product",
          headerText: "Product",
          textAlign: "Left",
          width: 180,
          type: "string"
        },          
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotCostCentre: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "costCentre",
          headerText: "CostCentre",
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
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        }],
      PivotRegistration: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        }, 
        {
          field: "registration",
          headerText: "Registration",
          textAlign: "Left",
          width: 180,
          type: "string"
        },        
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        }],
      PivotStoreRegistration: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
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
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        }],
      PivotStoreMobile: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "store Usages",
          headerText: "Store",
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
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotStoreFix: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "store Usages",
          headerText: "Store",
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
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotStore: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "store Usages",
          headerText: "Store",
          textAlign: "Left",
          width: 180,
          type: "string"
        },     
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotATGClose: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "tank",
          headerText: "tank",
          textAlign: "Left",
          width: 180,
          type: "string"
        },          
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],
      PivotATGOpen: [{
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "tank",
          headerText: "tank",
          textAlign: "Left",
          width: 180,
          type: "string"
        },          
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
     
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },],

      PivotATGAll:[
        {
          field: "ordering",
          headerText: "ordering",
          textAlign: "Right",
          width: 120,
          visible:false,
          type: "number"
        },
          {
          field: "tank",
          headerText: "Tank",
          textAlign: "Left",
          width: 180,
          type: "string"
        },          
        {
          field: "1",
          headerText: "1",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "2",
          headerText: "2",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "3",
          headerText: "3",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "4",
          headerText: "4",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "5",
          headerText: "5",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "6",
          headerText: "6",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "7",
          headerText: "7",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "8",
          headerText: "8",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "9",
          headerText: "9",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "10",
          headerText: "10",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "11",
          headerText: "11",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "12",
          headerText: "12",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "13",
          headerText: "13",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "14",
          headerText: "14",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "15",
          headerText: "15",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "16",
          headerText: "16",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "17",
          headerText: "17",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
         {
          field: "18",
          headerText: "18",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      
       {
          field: "19",
          headerText: "19",
          textAlign: "Left",
          width: 100,
          type: "number"
        }, 
       {
          field: "20",
          headerText: "20",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "21",
          headerText: "21",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "22",
          headerText: "22",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "23",
          headerText: "23",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "24",
          headerText: "24",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "25",
          headerText: "25",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "26",
          headerText: "26",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
        {
          field: "27",
          headerText: "27",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "28",
          headerText: "28",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "29",
          headerText: "29",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
      {
          field: "30",
          headerText: "30",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
       {
          field: "31",
          headerText: "31",
          textAlign: "Left",
          width: 100,
          type: "number"
        },
    ],
      ATGVSConsumption:[
          {
            field: "tid",
            headerText: "tid",
            textAlign: "Right",
            width: 120,
            visible:false,
            type: "number"
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
            field: "tank",
            headerText: "Tank",
            textAlign: "Left",
            width: 180,
            type: "string"
          },
          {
            field: "o/S Date",
            headerText: "o/S Date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
            {
            field: "o/S",
            headerText: "o/S",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "consumption",
            headerText: "Consumption",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
            {
            field: "delivery",
            headerText: "Delivery",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "c/S Date",
            headerText: "c/S Date",
            textAlign: "Left",
            width: 180,
            format: 'yyyy-MM-dd HH:mm:ss',
            type: "date"
          },
            {
            field: "c/S",
            headerText: "c/S",
            textAlign: "Left",
            width: 120,
            type: "number"
          },  
            {
            field: "ullage",
            headerText: "Ullage",
            textAlign: "Left",
            width: 150,
            type: "number"
          },
            {
            field: "beforeDelivery",
            headerText: "BeforeDelivery",
            textAlign: "Left",
            width: 150,
            type: "number"
          },  
          {
            field: "afterDelivery",
            headerText: "AfterDelivery",
            textAlign: "Left",
            width: 120,
            type: "number"
          },
          {
            field: "capacity",
            headerText: "Capacity",
            textAlign: "Left",
            width: 120,
            type: "number"
          }           
      ]
      
    };
  },
    props: {
    
    },
  provide : {
    grid: [PdfExport, ExcelExport, Page, Group,Selection, Toolbar,Search,Sort ]
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
     this.GetDropdownTanks();
    this.clearFields();
    this.isMounted = true;
    var date = new Date();
    this.formData.fromDate =  new Date(date.getFullYear(), date.getMonth(), 1);
    this.formData.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },
  methods: {
 populateData() {
      var self = this;
      self.isGridHidden = false;
      if(self.report.label == 'ATG VS Consumption (Per Tank)') self.isTankHidden = true;
      else  self.isTankHidden = false;
      var self = this;
          self.flag = true 
          var element = document.getElementById('BalancingGrid');
          if(element) element.remove();

          var p = document.getElementById('QBGrid');
          var newElement = document.createElement('Div');
          newElement.setAttribute('id', 'BalancingGrid');
          // newElement.innerHTML = "ref='grid'";
          p.appendChild(newElement);
      },
   GetDropdownTanks(whenDone) {
      const self = this;
      var onSuccess = function(response) {
          self.DropdownData = response.data.map((item) => {return {label: item.name, value: item.id} });
        if (whenDone && typeof whenDone == "function")
          whenDone();
      };
      var onFinally = function() {
       
      };
      self.$ajaxGet(
        self,
         "Tanks/GetTankdropdown?AccountId=" + localStorage.getItem('userAccountId'),
        onSuccess,
        onFinally
      );    
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
      let _famsURL = '';
      if(!self.report){
          self.$vs.notify({
          title: "Attention",
          color: "warning",
          text: `Please select a report`,
          position: "top-right",
          iconPack: "feather",
          icon: "icon-x"
        });
      }else{
        if(self.isTankHidden && (!self.tank || self.tank.length == 0) ){
          self.$vs.notify({
              title: "Attention",
              color: "warning",
              text: `Please select a tank`,
              position: "top-right",
              iconPack: "feather",
              icon: "icon-x"
            });
        }else{
          if(self.report.label == 'ATG VS Consumption (All)')
          {
            self.localColforGrid = self.ATGVSConsumption;
          _famsURL = "GetATGStockReconciliation";
          }
          else if (self.report.label == 'ATG VS Consumption (Per Tank)')
          {
              self.localColforGrid = self.ATGVSConsumption;
            _famsURL = "GetATGStockReconciliationPerTank";
          }
          else if (self.report.label == 'Pivot - ATG (All)')
          {
              self.localColforGrid = self.PivotATGAll;
            _famsURL = "GetPivottableATGStock";
          }
          else if (self.report.label == 'Pivot - ATG Open')
          {
              self.localColforGrid = self.PivotATGOpen;
            _famsURL = "GetPivottableATGStockOnlyOpening";
          }
          else if (self.report.label == 'Pivot - ATG Close')
          {
              self.localColforGrid = self.PivotATGClose;
            _famsURL = "GetPivottableATGStockOnlyClosing";
          }
          else if (self.report.label == 'Pivot - Per Store')
          {
              self.localColforGrid = self.PivotStore;
            _famsURL = "GetPivottableUsage";
          }
          else if (self.report.label == 'Pivot - Per Store (Fix)')
          {
              self.localColforGrid = self.PivotStoreFix;
            _famsURL = "GetPivottableUsageFixOnly";
          }
          else if (self.report.label == 'Pivot - Per Store (Mobile)')
          {
              self.localColforGrid = self.PivotStoreMobile;
            _famsURL = "GetPivottableUsageMobileOnly";
          }
          else if (self.report.label == 'Pivot - Per Store Per Registration')
          {
              self.localColforGrid = self.PivotStoreRegistration;
            _famsURL = "GetPivottableUsageDetailPerstore";
          }
          else if (self.report.label == 'Pivot - Per Registration')
          {
              self.localColforGrid = self.PivotRegistration;
            _famsURL = "GetPivottableUsageDetail";
          }
          else if (self.report.label == 'Pivot - CostCentre')
          {
              self.localColforGrid = self.PivotCostCentre;
            _famsURL = "GetPivottableUsageDetailPerCostCentre";
          }
          else if (self.report.label == 'Pivot - CostCentre (Detail)')
          {
              self.localColforGrid = self.PivotCostCentreDetail;
            _famsURL = "GetPivottableUsageDetailPerCostCentreDetail";
          }
          else if (self.report.label == 'Pivot - Transfer')
          {
              self.localColforGrid = self.PivotTransfer;
            _famsURL = "GetPivottableTransferSummary";
          }
          else if (self.report.label == 'Pivot - Transfer (Detail)')
          {
              self.localColforGrid = self.PivotTransferDetail;
            _famsURL = "GetPivottableTransferDetail";
          }
          else if (self.report.label == 'Pivot - Receive (Manual Per Store)')
          {
              self.localColforGrid = self.PivotReceiveManualPerStore;
            _famsURL = "GetPivottableReceiveManual";
          } else if (self.report.label == 'Pivot - Receive (Manual Per Tank)')
          {
              self.localColforGrid = self.PivotReceiveManualPerTank;
            _famsURL = "GetPivottableReceiveManualPerTank";
          }
          else if (self.report.label == 'Pivot - Per Registration (Cost Centre & Master Group)')
          {
              self.localColforGrid = self.PivottableUsageDetailMasterCostReg;
            _famsURL = "GetPivottableUsageDetailMasterCostReg";
          }
          self.GetGrid(_famsURL) 
        }
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
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
    rowSelected(args) {
     
        //let selectedrowindex = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
        // alert(selectedrowindex); // To alert the selected row indexes.
        let selectedrecords = this.grid.getSelectedRecords();  // Get the selected records.
       // alert(JSON.stringify(selectedrecords[0]))  
        //alert(selectedrecords[0].pid + ',' + selectedrecords[0].product + ',' + selectedrecords[0].volume);
    },

      toolbarClick(args) {
        switch (args['item'].text) { 
            case 'PDF Export': 
                //this.grid.showSpinner();
                this.grid.pdfExport({fileName:"new.pdf"}); 
                break; 
            case 'Excel Export': 
                //this.grid.showSpinner();
                 this.grid.excelExport({fileName:"new.xlsx" }); 
                break; 
            case 'CSV Export': 
                //this.grid.showSpinner();
                 this.grid.csvExport({fileName:"new.csv"}); 
                break; 
        } 
    },
    GetGrid(_famsURL) {
      const self = this;
      self.isVisible = false;
      self.clearFields();

      var myobject={};
          myobject.ClientKey = localStorage.getItem('userKey')
          myobject.AccountKey = localStorage.getItem('userAccountKey')
          myobject.fromdate = self.formatDate(self.formData.fromDate);
          myobject.todate = self.formatDate(self.formData.toDate);
          myobject.id = 0;
      if(self.report.label == 'ATG VS Consumption (Per Tank)')  myobject.id = self.tank.value
        self.showLoadingOnElement("submit", 0.45, "radius");
        var onSuccess = function(response) {
          self.famsDBData = response.data;
          self.aggregateColumn =  [{ 
                columns: [ 
                  { 
                    type: 'Sum', 
                    field: '1', 
                    textAlign: "Left",
                    footerTemplate: 'Total Volume: ${Sum}' 
                } 
                ] 
            }, 
        ]; 

          if (self.flag) {
              //Grid.Inject(Page);
              self.grid = new Grid({
                excelExportComplete:'excelExportComplete'  ,
                pdfExportComplete:'pdfExportComplete' ,
                allowPaging: true,
                allowSorting:true,
                allowExcelExport:true,
                allowPdfExport:true,
                selectionSettings: self.selectionOptions,
                pageSettings:self.pageSettings,
                rowSelected:self.rowSelected,
                scrollSettings: { width: 886, height: 300 },
                // formatSettings: [{ name: 'date', format: 'yyyy-MM-dd HH:mm:ss', type: 'date' }],
                toolbar: ['ExcelExport','CsvExport','Print','Search'],
                toolbarClick:self.toolbarClick,
                dataSource: self.famsDBData,
                columns: self.localColforGrid,
               // aggregates:self.aggregateColumn,

            });
            self.flag = false;
            self.grid.appendTo("#BalancingGrid");
            self.grid.refresh()
            //this.grid.dataSource = this.famsDBData;
        } 
        else  self.grid.dataSource = self.famsDBData;
      };
      var onFinally = function() {
        self.$vs.loading.close(self.$refs.submit.$el);
        self.isVisible = true; 
      };
      self.$ajaxPost(
            self,
            'QuickViewBalancing/' + _famsURL ,
            myobject,
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
    /* @import './ejStyles/material.css'; */
    //@import "https://cdn.syncfusion.com/ej2/material.css";
</style>
<style>
    /* @import './ejStyles/material.css'; */
     @import "material.css";
</style>

