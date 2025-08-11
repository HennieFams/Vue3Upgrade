<template>
  <div class="vx-row">
    <div class="vx-col w-full">
      <vx-card class="pb-3" title="FAMS Quick Pivot View">
        <vs-tabs v-model="activeTab" style="width: auto; min-height:500px">
          <vs-tab class="p-6" label="Pivot Table" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>From date</label>
                <datepicker
                  class="w-full"
                  id="FromDate"
                  placeholder="From Date"
                  v-model="fromDate"
                  format="yyyy-MM-dd"
                  name ="From Date"
                ></datepicker>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>To date</label>
                  <datepicker
                      class="w-full"
                      id="ToDate"
                      placeholder="To Date"
                      v-model="toDate"
                      format="yyyy-MM-dd"
                      name ="To Date"
                ></datepicker>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <div class="vx-col">
                  <vs-button
                    ref="reloadb"
                    id="reloadbId"
                    class="rounded-lg w-full vs-con-loading__container"
                    @click="getAllData()"
                    >Submit
                  </vs-button>
                </div>
              </div>
            </div>
            <div
              class="vx-row w-full"
              style="width: 81.5vw !important; height: fit-content"
            >
              <div id="app" style="width: 80vw !important; overflow: scroll; height: max-content;" class="vx-col w-full p-3 mt-3" v-show="showPivot">
                <div class="export-buttons">
                  <vs-button class="rounded-lg mr-2 mb-2" color="rgb(187, 138, 200)" @click="exportToCSV">Export CSV</vs-button>
                  <vs-button class="rounded-lg mr-2 mb-2" color="rgb(62, 201, 214)" @click="exportToExcel">Export Excel</vs-button>
                  <vs-button class="rounded-lg mr-2 mb-2" color="success" @click="exportToPDF">Export PDF</vs-button>
                  <vs-button class="rounded-lg mr-2 mb-2" color="warning" @click="resetFilters">Reset</vs-button>
                </div>
                <vue-pivottable-ui
                  ref="pivotTable"
                  id="pivotTable"
                  :data="dataSourceSettings.dataSource"
                  :rows="rows"
                  :cols="columns"
                  :vals="['Volume']"
                  aggregator-name="Sum"
                  renderer-name="Table"
                  :hiddenAttributes="hiddenCols"
                  style="margin-left: 1%; margin-right: 1%;"
                  :disabledFromDragDrop="disabled"
                  >
                  <template v-slot:colGroup>
                    <colGroup width="250"></colGroup>
                    <colGroup></colGroup>
                  </template>
                </vue-pivottable-ui>
              </div>
            </div>
          </vs-tab>
          <vs-tab class="p-6" label="Flexmonster" style="min-height:500px">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-2">
                <label>From date</label>
                <datepicker
                  class="w-full"
                  id="FromDate"
                  placeholder="From Date"
                  v-model="fromDate"
                  format="yyyy-MM-dd"
                  name ="From Date"
                ></datepicker>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-2">
                  <label>To date</label>
                  <datepicker
                      class="w-full"
                      id="ToDate"
                      placeholder="To Date"
                      v-model="toDate"
                      format="yyyy-MM-dd"
                      name ="To Date"
                ></datepicker>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full p-3 mt-3">
                <div class="vx-col">
                  <vs-button
                    ref="reloadb"
                    id="reloadbId"
                    class="rounded-lg w-full vs-con-loading__container"
                    @click="getAllData()"
                    >Submit
                  </vs-button>
                </div>
              </div>
            </div>
            <div class="vx-row w-full" style="width: 81.5vw !important; height:fit-content">
              <div id="app" style="width: 80vw !important; overflow: scroll;">
                <div id="PivotTable">
                </div>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </vx-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import moment from "moment";
import VxCard from "../../../components/vx-card/VxCard.vue";
// import { PivotViewComponent, FieldList, PivotView  } from "@syncfusion/ej2-vue-pivotview";
import Pivot from "vue-flexmonster";

import "flexmonster/flexmonster.css";
// import Pivot from "vue-flexmonster";
// import "flexmonster/flexmonster.css";
import { VuePivottableUi } from 'vue-pivottable'
import 'vue-pivottable/dist/vue-pivottable.css'
import * as XLSX from "xlsx";
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'


export default {
  name: "app",
  data() {
    return {
      activeTab: 0,
      pivotObj: null,
      fromDate: '',
      toDate: '',
      activeTab: 0,
      dataSourceSettings: {
        dataSource: [],
        expandAll: false,
        columns: [{ name: "Day", caption: "Day of Month" }],
        values: [{ name: "Volume", caption: "Total Volume" }],
        rows: [
          { name: "Equipment", caption: "Equipment" },
          { name: "Store", caption: "Store" },
        ],
        filters: [],
        height: "30px",
      },
      // dummyData: [
      //   {
      //     ID: 3418139,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1549,
      //     Store: "TEST COM G2",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 22.7900009155,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "NONE",
      //     InformationDrv: "NONE",
      //     InformationAth: "NONE",
      //     InformationAllocation: "0",
      //     InformationMac: "68B6B33F0700",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "10:01:00",
      //     DateOnly: "2025/03/12",
      //     Date: 1741773660000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 1,
      //     Description: "0000",
      //     FuelPrice: 20.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "NONE",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "45726",
      //     Totalizer: 1378.4000244141,
      //     TotalizerEnd: 1401.1999511719,
      //     UnqTrID: "68B6B33F070067D13F53",
      //   },
      //   {
      //     ID: 3418290,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 13.6899995804,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:14:09",
      //     DateOnly: "2025/03/12",
      //     Date: 1741778049000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "B61q5GbVfeDw",
      //   },
      //   {
      //     ID: 3418297,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 22.6499996185,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:16:05",
      //     DateOnly: "2025/03/12",
      //     Date: 1741778165000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "qCn1XPcBmGMd",
      //   },
      //   {
      //     ID: 3418301,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 22.6499996185,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:16:33",
      //     DateOnly: "2025/03/12",
      //     Date: 1741778193000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "qCn1XPcBmGMd",
      //   },
      //   {
      //     ID: 3418317,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 0.0,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:20:48",
      //     DateOnly: "2025/03/12",
      //     Date: 1741778448000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "q4a3n0SiuoOt",
      //   },
      //   {
      //     ID: 3418318,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 0.0,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:20:57",
      //     DateOnly: "2025/03/12",
      //     Date: 1741778457000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "q4a3n0SiuoOt",
      //   },
      //   {
      //     ID: 3418321,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 0.0,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:21:18",
      //     DateOnly: "2025/03/12",
      //     Date: 1741778478000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "q4a3n0SiuoOt",
      //   },
      //   {
      //     ID: 3418365,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 33.3499984741,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:39:57",
      //     DateOnly: "2025/03/12",
      //     Date: 1741779597000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "0tPB1OzVWUZ2",
      //   },
      //   {
      //     ID: 3418366,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 33.3499984741,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 12,
      //     Time: "11:40:00",
      //     DateOnly: "2025/03/12",
      //     Date: 1741779600000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250312",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "0tPB1OzVWUZ2",
      //   },
      //   {
      //     ID: 3421921,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 25.7199993134,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 13,
      //     Time: "13:35:49",
      //     DateOnly: "2025/03/13",
      //     Date: 1741872949000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250313",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "BomP7a1eNXJY",
      //   },
      //   {
      //     ID: 3421926,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 14.6099996567,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 13,
      //     Time: "13:37:52",
      //     DateOnly: "2025/03/13",
      //     Date: 1741873072000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250313",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "0wgGAXCPHL9I",
      //   },
      //   {
      //     ID: 3422094,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 24.8099994659,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "undefined",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 13,
      //     Time: "14:24:56",
      //     DateOnly: "2025/03/13",
      //     Date: 1741875896000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250313",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "tatJ36lGYuHu",
      //   },
      //   {
      //     ID: 3422107,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1862,
      //     Store: "DEV DEMO SET 3A",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 27.9400005341,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "0",
      //     InformationDrv: "",
      //     InformationAth: "0",
      //     InformationAllocation: "0",
      //     InformationMac: "V305231C20153",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 13,
      //     Time: "14:41:54",
      //     DateOnly: "2025/03/13",
      //     Date: 1741876914000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 4,
      //     Description: "0000",
      //     FuelPrice: 1.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "0000",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "20250313",
      //     Totalizer: 0.0,
      //     TotalizerEnd: 0.0,
      //     UnqTrID: "udiFE8lpOk6G",
      //   },
      //   {
      //     ID: 3422162,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1549,
      //     Store: "TEST COM G2",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 40.5499992371,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "NONE",
      //     InformationDrv: "NONE",
      //     InformationAth: "NONE",
      //     InformationAllocation: "0",
      //     InformationMac: "68B6B33F0700",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 13,
      //     Time: "14:51:00",
      //     DateOnly: "2025/03/13",
      //     Date: 1741877460000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 1,
      //     Description: "0000",
      //     FuelPrice: 20.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "NONE",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "45728",
      //     Totalizer: 2850.8999023438,
      //     TotalizerEnd: 2891.5,
      //     UnqTrID: "68B6B33F070067D2D4C9",
      //   },
      //   {
      //     ID: 3422163,
      //     AccountID: 12,
      //     Account: "Demo",
      //     RecordTypeID: 1,
      //     StoreID: 1549,
      //     Store: "TEST COM G2",
      //     EID: 12932,
      //     Registration: "HK30MKGP",
      //     EqpTag: "0452450520",
      //     ProductID: 1,
      //     Product: "Diesel",
      //     OperatorID: 0,
      //     DriverID: 0,
      //     AuthorizationID: 0,
      //     AllocationID: 0,
      //     Allocation: null,
      //     AllocationID2: 0,
      //     Allocation2: null,
      //     AllocationID3: 0,
      //     Allocation3: null,
      //     AllocationID4: 0,
      //     Allocation4: null,
      //     KM: 0.0,
      //     Hour: 0.0,
      //     Volume: 209.2299957275,
      //     EquipmentTagfromField: "0452450520",
      //     InformationReg: "HK30MKGP",
      //     InformationOpr: "NONE",
      //     InformationDrv: "NONE",
      //     InformationAth: "NONE",
      //     InformationAllocation: "0",
      //     InformationMac: "68B6B33F0700",
      //     Year: 2025,
      //     Month: 3,
      //     Day: 13,
      //     Time: "14:52:00",
      //     DateOnly: "2025/03/13",
      //     Date: 1741877520000,
      //     CID: 1470.0,
      //     CostCentre: "Tecmo",
      //     MID: 120.0,
      //     MasterEquipment: "VOERTUIE",
      //     Operator: null,
      //     Driver: null,
      //     MeasurementID: 3,
      //     Measurement: "KM",
      //     Consumption: 1.0,
      //     Auth: null,
      //     StoreTypeID: 1,
      //     Description: "0000",
      //     FuelPrice: 20.0,
      //     ERID: 0,
      //     Rebate: "N/A",
      //     JobNumber: "NONE",
      //     CostCentreDesc: "Tecmo Automation",
      //     Equipment: "Toyota Etios Silver Hatch ",
      //     Recnumber: "45728",
      //     Totalizer: 2891.5,
      //     TotalizerEnd: 3100.6999511719,
      //     UnqTrID: "68B6B33F070067D2D522",
      //   },
      // ],
      showPivot: false,
      hiddenCols: [
        "ID",
        "AccountID",
        "Account",
        "RecordTypeID",
        "StoreID",
        // "Store",
        "EID",
        // "Registration",
        // "EqpTag",
        "ProductID",
        // "Product",
        "OperatorID",
        "DriverID",
        "AuthorizationID",
        "AllocationID",
        // "Allocation",
        "AllocationID2",
        // "Allocation2",
        "AllocationID3",
        // "Allocation3",
        "AllocationID4",
        // "Allocation4",
        // "KM",
        // "Hour",
        // "Volume",
        "EquipmentTagfromField",
        "InformationReg",
        "InformationOpr",
        "InformationDrv",
        "InformationAth",
        "InformationAllocation",
        "InformationMac",
        // "Year",
        // "Month",
        // "Day",
        // "Time",
        // "DateOnly",
        // "Date",
        "CID",
        // "CostCentre",
        "MID",
        // "MasterEquipment",
        // "FuelAttendant",
        // "Driver",
        "MeasurementID",
        // "Measurement",
        // "Consumption",
        // "Authorization ",
        "StoreTypeID",
        // "Description",
        // "FuelPrice",
        "ERID",
        // "Rebate",
        // "JobNumber",
        // "CostCentreDesc",
        // "Equipment",
        "Recnumber",
        // "Totalizer",
        // "TotalizerEnd",
        "UnqTrID"
      ],
      disabled: [
        "ID",
        "AccountID",
        "Account",
        "RecordTypeID",
        "StoreID",
        // "Store",
        "EID",
        // "Registration",
        // "EqpTag",
        "ProductID",
        // "Product",
        "OperatorID",
        "DriverID",
        "AuthorizationID",
        "AllocationID",
        // "Allocation",
        "AllocationID2",
        // "Allocation2",
        "AllocationID3",
        // "Allocation3",
        "AllocationID4",
        // "Allocation4",
        // "KM",
        // "Hour",
        // "Volume",
        "EquipmentTagfromField",
        "InformationReg",
        "InformationOpr",
        "InformationDrv",
        "InformationAth",
        "InformationAllocation",
        "InformationMac",
        // "Year",
        // "Month",
        // "Day",
        // "Time",
        // "DateOnly",
        // "Date",
        "CID",
        // "CostCentre",
        "MID",
        // "MasterEquipment",
        // "FuelAttendant",
        // "Driver",
        "MeasurementID",
        // "Measurement",
        // "Consumption",
        // "Authorization",
        "StoreTypeID",
        // "Description",
        // "FuelPrice",
        "ERID",
        // "Rebate",
        // "JobNumber",
        // "CostCentreDesc",
        // "Equipment",
        "Recnumber",
        // "Totalizer",
        // "TotalizerEnd",
        "UnqTrID"
      ],
      rows: ['Store', 'Equipment'],
      columns: ['Year', 'Month', 'Day']
    };
  },
  provide: {
    // pivotview: [FieldList]
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Datepicker,
    VxCard,
    Pivot,
    VuePivottableUi
    // 'ejs-pivotview': PivotViewComponent
  },
  computed: {
    uploadServer: {
      get() {
        var userKey = localStorage.getItem("userKey");
        var accountKey = localStorage.getItem("userAccountKey");
      },
    },
  },
  mounted() {
    var date = new Date();
    var from =  new Date(date.getFullYear(), date.getMonth(), 1);
    this.fromDate =  this.dateFormat(from);
    var to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.toDate = this.dateFormat(to);
    this.getAllData();
  },
  watch: {
    activeTab: function (val) {
      var self = this;
      if (val == 0) {
        var date = new Date();
        var from =  new Date(date.getFullYear(), date.getMonth(), 1);
        self.fromDate =  self.dateFormat(from);
        var to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        self.toDate = self.dateFormat(to);
        self.getAllData();
      }
      else if(val = 1){
        var date = new Date();
        var from =  new Date(date.getFullYear(), date.getMonth(), 1);
        self.fromDate =  self.dateFormat(from);
        var to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        self.toDate = self.dateFormat(to);
        self.getAllData();
      }
    },
  },
  methods: {
    successNotifyGridExpanded() {
      this.$vs.notify({
        title: "Grid - Successfully",
        text: "Grid expanded / closed",
        color: "warning",
      });
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },
    successNotify() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully Uploaded",
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
    getAllData() {
      var mySelf = this;
      mySelf.showPivot = false;
      mySelf.showLoadingOnElement("reloadb", 0.45, "radius");
      let accountID = {
        accountId: parseInt(localStorage.getItem("userAccountId")),
        fromDate: mySelf.dateFormat(mySelf.fromDate),
        toDate: mySelf.dateFormat(mySelf.toDate)
       };

      axios
        .post("https://famspythonfunctions.azurewebsites.net/api/famspivot", accountID)
        .then((response) => {
          console.log(response.data);

          mySelf.dataSourceSettings.dataSource = response.data.map((field) => ({
            Account: field.Account,
            AccountID: field.AccountID,
            Allocation: field.Allocation,
            Allocation2: field.Allocation2,
            Allocation3: field.Allocation3,
            Allocation4: field.Allocation4,
            AllocationID: field.AllocationID,
            AllocationID2: field.AllocationID2,
            AllocationID3: field.AllocationID3,
            AllocationID4: field.AllocationID4,
            Authorization: field.Auth,
            AuthorizationID: field.AuthorizationID,
            CID: field.CID,
            Consumption: field.Consumption,
            CostCentre: field.CostCentre,
            CostCentreDesc: field.CostCentreDesc,
            Date: field.Date,
            DateOnly: field.DateOnly,
            Day: field.Day,
            Description: field.Description,
            Driver: field.Driver,
            DriverID: field.DriverID,
            EID: field.EID,
            ERID: field.ERID,
            EqpTag: field.EqpTag,
            Equipment: field.Equipment,
            EquipmentTagfromField: field.EquipmentTagfromField,
            FuelPrice: field.FuelPrice,
            Hour: field.Hour,
            ID: field.ID,
            InformationAllocation: field.InformationAllocation,
            InformationAth: field.InformationAth,
            InformationDrv: field.InformationDrv,
            InformationMac: field.InformationMac,
            InformationOpr: field.InformationOpr,
            InformationReg: field.InformationReg,
            JobNumber: field.JobNumber,
            KM: field.KM,
            MID: field.MID,
            MasterEquipment: field.MasterEquipment,
            Measurement: field.Measurement,
            MeasurementID: field.MeasurementID,
            Month: field.Month,
            FuelAttendant: field.Operator,
            OperatorID: field.OperatorID,
            Product: field.Product,
            ProductID: field.ProductID,
            Rebate: field.Rebate,
            Recnumber: field.Recnumber,
            RecordTypeID: field.RecordTypeID,
            Registration: field.Registration,
            Store: field.Store,
            StoreID: field.StoreID,
            StoreTypeID: field.StoreTypeID,
            Time: field.Time,
            Volume: field.Volume > 0 ? field.Volume : 0,
            Year: field.Year,
          }));

          if(mySelf.activeTab == 1){
            mySelf.createPivotTable();
          }
          mySelf.$vs.loading.close(mySelf.$refs.reloadb.$el);
          mySelf.showPivot = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setTimeout(() => {
            // mySelf.$vs.loading.close(self.$refs.reloadb.$el);
          }, 100);
        });
    },
    createPivotTable() {
      this.pivotObj = new Flexmonster({
        container: "PivotTable", // The HTML container ID where Flexmonster will render
        width: "100%",
        height: "100vw",
        toolbar: true, // Enable toolbar if needed
        licenseKey: 'Z7RO-XJIH26-230H35-3V2B0V-115P6T-1V1842-5C504N-6O383N-5D452R-111M5F-3C3K6Q-6B',
        report: {
          dataSource: {
            type: "api", // Specifies that the data is in JSON format
            data: this.dataSourceSettings.dataSource, // Your massive data array
          },
          slice: {
            rows: [
              {
                uniqueName: "Store",
              },
              {
                uniqueName: "Equipment",
              },
            ],
            columns: [
              {
                uniqueName: "Year",
                //month
              },
              {
                uniqueName: "Month",
                //month
              },
              {
                uniqueName: "Day",
                //day
              },
            ],
            measures: [
              {
                uniqueName: "Volume",
              },
            ],
          },
        },
      });
    },
    updateRows(selectedRows) {
      this.dataSourceSettings.rows = selectedRows.map((row) => ({ name: row }));
      if (this.pivotObj) {
        this.pivotObj.dataSourceSettings = this.dataSourceSettings;
      }
    },
    // 📌 Export Pivot Table as CSV
    exportToCSV() {
      const tableElement = document.querySelector(".pvtTable"); // Locate pivot table
      if (!tableElement) {
        console.error("Pivot table not found!");
        return;
      }

      let csvContent = "data:text/csv;charset=utf-8,";
      const rows = tableElement.querySelectorAll("tr");

      rows.forEach((row) => {
        const cols = row.querySelectorAll("th, td");
        let rowData = [];
        cols.forEach((col) => rowData.push(`"${col.innerText}"`)); // Ensure proper CSV format
        csvContent += rowData.join(",") + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "pivot_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    // 📌 Export Pivot Table as Excel (.xlsx)
    exportToExcel() {
      const tableElement = document.querySelector(".pvtTable"); // Locate pivot table
      if (!tableElement) {
        console.error("Pivot table not found!");
        return;
      }

      const ws = XLSX.utils.table_to_sheet(tableElement); // Convert table to sheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Pivot Data");
      XLSX.writeFile(wb, "pivot_data.xlsx");
    },
    // 📌 Export JSON data to PDF
    exportToPDF() {
      const doc = new jsPDF();
      doc.text("Pivot Table Data", 14, 10);

      // Select the table inside the pivot component using class name
      const tableElement = document.querySelector(".pvtTable"); // Default class name for Vue PivotTable tables

      if (tableElement) {
        autoTable(doc, { html: tableElement }); // Capture only the table
        doc.save("pivot_data.pdf");
      } else {
        console.error("Pivot table not found!");
      }
    },
    resetFilters(){
      this.rows = ['Store', 'Equipment'];
      this.columns = ['Year', 'Month', 'Day'];
    },
  }, //before this
};
</script>
<style>
/* @import url("../../../../node_modules/@syncfusion/ej2-pivotview/styles/material.css");/ */

.custom-header .e-gridheader,
.custom-header .e-droppable {
  /* height: 30px !important; */
  line-height: 30px !important;
  vertical-align: bottom !important;
  text-align: center !important;
}

.custom-header .e-headercelldiv {
  position: relative !important;
  text-align: center !important;
  bottom: 0 !important;
  top: 35px !important;
}

.custom-header
  .e-headercell
  .e-leftalign
  .e-columnsheader
  .e-unfreeze
  .e-headercell
  .e-headercelldiv {
  height: 60px !important;
}

.custom-header .e-rhandler,
.custom-header .e-rcursor {
  height: 60px !important;
  line-height: 70px !important;
  vertical-align: bottom !important;
  text-align: center !important;
}
/* .custom-header .e-gridheader,
  .custom-header .e-droppable {
    height: 30% !important;
    line-height: 30px !important;
    vertical-align: top !important;
    text-align: center !important;
  }

  .custom-header .e-headercelldiv{
    position: relative !important;
    text-align: center !important;
    bottom: 200px !important;
  }

  .custom-header .e-headercell .e-leftalign .e-columnsheader .e-unfreeze .e-headercell .e-headercelldiv{
    height: 70px !important;
  } */
</style>
