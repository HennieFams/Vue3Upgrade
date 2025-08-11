<!-- =========================================================================================
    File Name: Invoice.vue
    Description: Invoice Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template hhhhhhhhhhhhhhhhhh
      Author: Pixinvent   QuoteSidebar
    Author URL: http://www.themeforest.net/user/pixinvent  
========================================================================================== -->


<template>
  <div>
    <quote-sidebar
      :isSidebarActive="quoteSidebar"
      @closeSidebar="quoteSidebar = false"
      :formData="formData"
      @addItem="addItem"
      @editItem="editItem"
      :itemToEditIndex="itemToEditIndex"
    />
    <div id="invoice-page">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex items-center">
          <vs-button
            class="mb-base mr-3"
            type="border"
            icon-pack="feather"
            icon="icon-arrow-left"
            @click="$router.push({ name: 'quotationlist' })"
          >Back</vs-button>
          <!-- <vs-button
            class="mb-base mr-3"
            icon-pack="feather"
            icon="icon icon-file"
            @click="printInvoice"
          >Print</vs-button>-->
        </div>
      </div>
      <vx-card id="invoice-container">
        <!-- INVOICE METADATA -->
        <div class="vx-row leading-loose p-base">
          <div class="vx-col w-1/2 mt-base">
            <img src="@/assets/images/logo/FAMSTecmo2.png" alt="vuexy-logo" />
          </div>
          <div class="vx-col w-1/2 text-right">
            <h1>Quote</h1>

            <div class="invoice__invoice-detail mt-6" style="text-align: -webkit-right;">
              <h6>Number : {{ invoiceDetails.invoiceNo }}</h6>
              <h6 v-show="reference" class="mt-2">Reference : {{ reference }}</h6>
              <vs-input
                class="mt-2 w-1/2"
                v-model="reference"
                placeholder="Reference"
                id="referenceInput"
              />
              <h6 class="mt-2" v-show="fromdate">Quote Date : {{formatDate(fromdate)}}</h6>
              <datepicker
                class="mt-2 w-1/2"
                id="fromdatepick"
                placeholder="Quote Date"
                v-model="fromdate"
                format="yyyy-MM-dd"
              ></datepicker>
              <h6 class="mt-2" v-show="todate">Expiry Date : {{ formatDate(todate) }}</h6>
              <datepicker
                class="mt-2 w-1/2"
                id="todatepick"
                placeholder="Expiry Date"
                v-model="todate"
                format="yyyy-MM-dd"
              ></datepicker>
              <v-select
                class="mt-4 w-1/2"
                :options="paymenttypedata"
                placeholder="Search / Select Payment terms"
                v-model="paymenttype"
                @search:blur="populateDataPayment"
              />
            <h6 v-show="paymenttypeselect" class="my-2">Payment terms : {{ paymenttypeselect }}</h6>

              <v-select
                class="mt-4 w-1/2"
                :options="salesrepdata"
                placeholder="Search / Select Product"
                v-model="salesrep"
                @search:blur="populateData"
              />
              <h6 v-show="salesrepselect" class="my-2">Sales Rep : {{ salesrepselect }}</h6>
            </div>
          </div>
          <div class="vx-col w-1/2 mt-12">
            <h6>To:</h6>
            <div class="invoice__recipient-info">
              <!-- <select id="customerselectbox" name="option" @change="myFunction($event)">
                <option disabled value selected="selected">Please select one</option>
                <option
                  v-for="item in customerdata"
                  :value="item.text"
                  :key="item.id"
                >{{ item.text }}</option>
              </select>-->
              <v-select
                class="my-2 w-1/2"
                :options="customerdata"
                placeholder="Search / Select Customer"
                v-model="customerDropdown"
                @search:blur="populateCustomer"
              />

              <h3 class="mt-0">{{ customerselect }}</h3>
              <p>{{ recpcontact }}</p>
              <p>{{ recpaddressLine1 }}</p>
              <p>{{ recpaddressLine2 }}</p>
              <p>{{ recpzipcode }}</p>
            </div>
            <div v-show="customerDropdown" class="invoice__recipient-contact">
              <p class="flex items-center">
                <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{ recpemail }}</span>
              </p>
              <p class="flex items-center">
                <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{ recpcontactnr }} | {{ recpMobilecontactnr }}</span>
              </p>
            </div>
          </div>

          <div class="vx-col w-1/2 mt-base text-right mt-12">
            <h6>From:</h6>
            <h4>{{ companyDetails.name }}</h4>
            <h6>Vat No: {{ companyDetails.VAT }}</h6>
            <div class="invoice__company-info">
              <h6>{{ companyDetails.addressLine1 }}</h6>
              <h6>{{ companyDetails.addressLine2 }} {{ companyDetails.addressLine3 }}</h6>
              <h6>{{ companyDetails.Town }} , {{ companyDetails.zipcode }}</h6>
              <h6>{{ companyDetails.Province }}</h6>
              <h6>{{ companyDetails.mobile }}</h6>
              <h6>{{ companyDetails.website }}</h6>
            </div>
            <!-- <div class="invoice__company-contact"> customer
                        <p class="flex items-center justify-end">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ companyDetails.mailId }}</span>
                        </p>
                        <p class="flex items-center justify-end">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ companyDetails.mobile }}</span>
                        </p>
            </div>-->
          </div>
        </div>

        <!-- INVOICE CONTENT -->

        <div class="p-base">
          <vs-button class="rounded-lg " @click="addNewData" type="filled" color="success" id="AddItem">Add item</vs-button>

          <div class="mt-5">
            <vs-table
              ref="quotationTable"
              v-model="selected"
              :data="quoteItems"
              class="vs-con-loading__container"
            >
              <div
                slot="header"
                class="flex flex-wrap-reverse items-center flex-grow justify-between"
              ></div>

              <template slot="thead">
                <!-- <vs-th class="pointer-events-none">code</vs-th> -->
                <vs-th sort-key="code">Product</vs-th>
                <vs-th sort-key="description">Description</vs-th>
                <vs-th sort-key="qty">Quantity</vs-th>
                <vs-th sort-key="discount">Discount</vs-th>
                <vs-th sort-key="PriceExcl">Price (excl VAT)</vs-th>
                <vs-th sort-key="total">Total (excl VAT)</vs-th>

                <vs-th></vs-th>
              </template>

              <!-- visible: false -->
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="tr.code">{{tr.code}}</vs-td>
                  <vs-td :data="tr.description">{{tr.description}}</vs-td>
                  <vs-td :data="tr.qty">{{tr.qty}}</vs-td>
                  <vs-td :data="tr.discount">{{tr.discount}}%</vs-td>
                  <vs-td :data="tr.priceExcl">{{"R " + Number(tr.priceExcl).toLocaleString('en')}}</vs-td>
                  <vs-td :data="tr.total">{{"R " + Number(tr.total).toLocaleString('en')}}</vs-td>
                  <!-- <vs-td data-label="item">{{ index + 1 }}</vs-td> -->
                  <!-- <vs-td :data="data[indextr].dataId">{{ data[indextr].dataId }}</vs-td>
                  <vs-td :data="data[indextr].description">{{ data[indextr].description }}</vs-td>-->

                  <vs-td class="whitespace-no-wrap">
                    <feather-icon
                      icon="EditIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click.stop="editData(tr,indextr)"
                    />
                    <feather-icon
                      icon="TrashIcon"
                      svgClasses="w-5 h-5 hover:text-danger stroke-current"
                      class="ml-2"
                      @click.stop="removeDataItems(indextr,tr)"
                    />
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div class="vx-row">
            <vs-spacer></vs-spacer>
            <div class="vx-col">
              <vs-button
                class="mt-4"
                @click="saveData"
                type="border"
                color="success"
                id="Save"
                v-show="isSaveVisible"
              >Save</vs-button>
              <vs-button
                class="mt-4"
                @click="updateData"
                ref="updateDataRef"
                type="border"
                color="success"
                id="Update"
                v-show="isUpdateVisible"
              >Update</vs-button>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import "vue-select/dist/vue-select.css";
import quoteSidebar from "./QuoteSidebar.vue";

export default {
  data() {
    return {
      itemToEditIndex: -1,
      customerDropdown: 0,
      selected: [],
      quoteItems: [],
      quoteSidebar: false,
      addNewDataSidebar: false,
      sidebarData: {},
      formData: {
        productId: 0,
        dataId: null,
        id: null,
        item: 0,
        product: "",
        description: "",
        qty: 1,
        discount: 0,
        priceExcl: 0,
        price: 0,
        total: 0,
        vat: 15,
        quotationPaymentTermsId: 1,
        comment: "N/A"
      },

      textarea:
        "Shipment outside RSA, destination clearance and delivery will be for the consignee‘s own expense. Client is responsible for Tecmo Flight, travel to site, accommodation arrangements unless otherwise specified in writing. This quotation is not a contract or a bill. It is our best guess at the total price for the service and goods described above. The customer will be billed after indicating acceptance of this quote. Payment will be due prior to the delivery of service and goods. Ex-works Tecmo office (Vanderbijlpark) (No shipment/transport).  Unless otherwise specified in writingPayment terms - 50% upon PO and 50% upon sign-off. Quotation Currency 	- ZAR. Electrical connection 	- Client to provide power within range of tank location. Excluding all/any Civil work",

      customerselect: "",
      customerselectid: "",
      customerdata: [],
      customerdataall: [],

      recpID: 0,
      recpcontact: "",
      recpaddressLine1: "",
      recpaddressLine2: "",
      recpzipcode: "",
      recpcontactnr: "",
      recpMobilecontactnr: "",
      recpemail: "",

      customermodel: "",
      fromdate: null,
      todate: "",
      reference: "",

      productselect: "",
      productselectid: "",
      productselectdescription: "",
      productserror: [],
      productdata: [],
      productdataall: [],

      mailTo: "",

      productDropdown: 0,
      salesrepselect: "",
      paymenttypeselect:"",
      salesrep: null,
      paymenttype:null,
      salesrepdata: [],
      paymenttypedata: [],
      quotationCompletedata: [],
      quotationserror: [],
      quoteNr: 0,
      quoteId: 0,
      quotationComplete: {
        quoteNr: "0",
        quoteRef: "",
        quoteDescription: "",
        quoteDate: "",
        quoteExpiryDate: "",
        salesRep: "",
        qliid: 0,
        productID: 0,
        description: "",
        comment: "",
        qty: 0,
        priceExcl: 0,
        discount: 0,
        total: 0,
        product: "",
        customer: "",
        vatNumber: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        postcalCode: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactMobile: "",
        webAddress: "",
        currency: "",
        account: "",
        quotationPaymenttermsID: 0,
        payment: ""
      },

      companyDetails: {
        name: "TECMO AUTOMATION PTY LTD",
        addressLine1: "CSDTecmo Building",
        addressLine2: "C/O Frikkie Meyer / Hertz &",
        addressLine3: "Kelvin Boulevard",
        zipcode: "1911",
        Town: "Vanderbijlpark",
        Province: "Gauteng",
        Country: "South Africa",
        mailId: "hello@pixinvent.net",
        mobile: "(016) 931 19 58",
        VAT: "4790117180",
        website: "www.fams.co.za"
      },
      recipientDetails: {
        fullName: "Tony Stark",
        addressLine1: "8577 West West Drive ",
        addressLine2: "Holbrook, NY",
        zipcode: "90001",
        mailId: "peter@mail.com",
        mobile: "+91 988 888 8888"
      },
      invoiceDetails: {
        invoiceNo: "QUO0000000",
        invoiceDate: "2020/01/30",
        invoiceExpiryDate: "2020/01/31",
        Reference: "Please complete",
        invoiceDescription: "please invoiceDescription",
        invoiceNote: "This is a note",
        invoiceFooter: "this is a footer",
        ROE: 15,
        currencyID: 1,
        currency: "ZAR"
      },

      subtotal: 114000,
      discountPercentage: 5,
      discountedAmount: 5700,
      total: 108300,
      options: [
        { id: "1", text: "One", value: "A" },
        { id: "2", text: "Two", value: "B" },
        { id: "3", text: "Three", value: "C" }
      ],
      selectedOptionId: 1,
      isSaveVisible: true,
      isUpdateVisible: false
    };
  },
  computed: {},
  mounted() {
    this.fetchProduct();
    this.fetchCustomers();
    this.fetchsalesrep();
    this.fetchpaymentype();

    if (this.$route.params.quoteNr) {
      this.isSaveVisible = false;
      this.isUpdateVisible = true;
      this.fetchquotationcomplete(this.$route.params.quoteNr);
    } else {
      // v-show="isNinja"
      this.isSaveVisible = true;
      this.isUpdateVisible = false;
      // alert("New baby");
    }

    this.$emit("setAppClasses", "invoice-page");
  },
  methods: {
    populateData() {
      var self = this;
      this.salesrepselect = this.salesrep.text;
    },
 populateDataPayment() {
      var self = this;
      this.paymenttypeselect = this.paymenttype.text;
    },

    
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },

    updateData() {
      const self = this;
      self.showLoadingOnElement("updateDataRef", 0.45, "radius");
      if (!self.customerDropdown) {
        self.$vs.notify({
          title: "Danger",
          text: "Customer not selected",
          color: "danger",
          time: 4000
        });
        return;
      }
      if (self.salesrep) {
         var my_object = {
          accountId: 1,
          id: self.quoteId,
          customerId: self.customerselectid, 
          currencyId: 1, //this.currencyID,
          salesRepId: self.salesrep.value,
          quoteRef: self.reference,
          quoteDescription: self.invoiceDetails.invoiceDescription,
          quoteDate: self.formatDate(this.fromdate),
          quoteExpiryDate: self.formatDate(this.todate),
          ROE: this.invoiceDetails.ROE,
          vat: self.vat,
          comment: self.comment,
          total: 0,
          quotationPaymentTermsId :self.paymenttype.value
        };
        //Get the customer id from list
        self.customerdata.forEach(item => {
          if (item.label == self.customerDropdown) {
            my_object.customerId = item.value;
          }
          return;
        });
       // alert(self.paymenttype.value)
       // Get the sale rep id from list
        self.salesrepdata.forEach(item => {
          if (item.label == self.salesrep) {
            my_object.salesRepId = item.value;
           return;
          }       
        });
        self.paymenttypedata.forEach(item => {
                if (item.label == self.paymenttype) {
                  my_object.quotationPaymentTermsId = item.value;
                  return;
                }
              });

        
        //this.customerDropdown.value
        // alert(this.quoteItems[0].description)

        var onSuccess = function(response) {
          self.updateDataItems(self.quoteId);
        };

        self.$ajaxPost(self, "SalesSeeker/EditQuotation", my_object, onSuccess);
      } else {
        self.$vs.notify({
          title: "Danger",
          text: "Lorem ipsum dolor sit amet, consectetur",
          color: "danger",
          time: 4000
        });
      }
    },

    saveData() {
      const self = this;

      if (!self.customerselectid) {
        self.$vs.notify({
          title: "Danger",
          text: "Customer not selected",
          color: "danger",
          time: 4000
        });
        return;
      }
      if (self.salesrep) {
        var my_object = {
          accountId: 1,
          quoteNr: self.quoteNr,
          customerId: self.customerselectid,
          currencyId: 1, //this.currencyID,
          salesRepId: self.salesrep.value,
          QuotationPaymentTermsID :self.paymenttype.value,
          quoteRef: self.reference,
          quoteDescription: self.invoiceDetails.invoiceDescription,
          quoteDate: self.formatDate(this.fromdate),
          quoteExpiryDate: self.formatDate(this.todate),
          ROE: this.invoiceDetails.ROE,
          vat: self.vat,
          comment: self.comment
        };

        // alert(this.quoteItems[0].description)
        self.showLoadingOnElement("quotationTable", 1, "radius");
        var onSuccess = function(response) {
          self.formData.id = response.data[0].id;
          self.invoiceDetails.invoiceNo = "QUO" + self.formData.id;
          self.savaDataItems(self.formData.id);
        };
        var onFinally = function() {
          self.$vs.loading.close(self.$refs.quotationTable.$el);
        };
        self.$ajaxPost(
          self,
          "SalesSeeker/AddQuotation",
          my_object,
          onSuccess,
          onFinally
        );
      } else {
        self.$vs.notify({
          title: "Nee man",
          text: "Lorem ipsum dolor sit amet, consectetur",
          color: "danger",
          time: 4000
        });
      }
    },

    removeDataItems(indextr, tr) {
      var self = this;
      self.quoteItems.splice(indextr, 1);
    },

    updateDataItems(id) {
      var self = this;
      self.quoteItems.forEach(item => {
        item.id = id;
        item.accountId = 1;
        item.QuotationId = id;
        item.Vat = 15;
      });
      //self.showLoadingOnElement("quotationTable", 1, "radius");
      // self.quoteItems.id = id;
      if (self.quoteItems.length > 0) {
        var onSuccess = function(response) {
          self.$vs.notify({
            title: "Quotation updated",
            text: "Completed",
            color: "success",
            time: 6000
          });
            self.$router.push({ name: 'quotationlist' })
        };
        var onFinally = function() {
          self.$vs.loading.close(self.$refs.updateDataRef.$el);
        };
        self.$ajaxPost(
          self,
          "SalesSeeker/EditQuoteItem",
          self.quoteItems,
          onSuccess,
          onFinally
        );
      }
    },

    savaDataItems(id) {
      var self = this;
      self.quoteItems.forEach(item => {
        item.id = id;
      });
      self.showLoadingOnElement("quotationTable", 1, "radius");
      // self.quoteItems.id = id;
      if (self.quoteItems.length > 0) {
        var onSuccess = function(response) {
            self.$vs.notify({
            title: "Quotation added",
            text: "Completed",
            color: "success",
            time: 4000,
          });
          self.$router.push({ name: 'quotationlist' })
        };
        var onFinally = function() {
          self.$vs.loading.close(self.$refs.quotationTable.$el);
        };
        self.$ajaxPost(
          self,
          "SalesSeeker/AddQuoteItem",
          self.quoteItems,
          onSuccess,
          onFinally
        );
      }
    },

    addItem(data) {
      var my_object = {
        id: null,
        dataId: this.quoteItems.length + 1,
        code: data.code,
        description: data.description,
        discount: data.discount,
        qty: data.qty,
        priceExcl: data.priceExcl,
        total: data.total,
        vat: this.vat,
        quotationPaymentTermsId: data.quotationPaymentTermsId,
        comment: data.comment
      };
      this.quoteItems.push(data);
      // this.quoteItems.push(my_object);
    },
    editItem(data, index) {
      var self = this;
      self.quoteItems[index].description = data.description;
      self.quoteItems[index].qty = data.qty;
      self.quoteItems[index].discount = data.discount;
      self.quoteItems[index].priceExcl = data.priceExcl;
      self.quoteItems[index].vat = data.vat;
      self.quoteItems[index].total = data.total;
      self.quoteItems[index].quotationPaymentTermsId = data.quotationPaymentTermsId;
      self.quoteItems[index].comment = data.comment;
      // dataId: self.selectedProduct.pid,
      // productID: self.selectedProduct.pid,
      // code: self.selectedProduct.code,
      // description: self.description,
      // qty: self.qty,
      // discount: self.discount,
      // priceExcl: self.sellingPrice,
      // vat: self.vat,
      // total: self.total,
      // quotationPaymentTermsId: self.quotationPaymentTermsId,
      // comment: self.comment
    },
    addNewData() {
      this.formData = {};
      // this.sidebarData = {};
      // this.toggleDataSidebar(true);
      this.quoteSidebar = true;
      // this.addNewDataSidebar = true;
    },
    editData(data, indextr) {
      this.formData = data;
      this.itemToEditIndex = indextr;
      // this.toggleDataSidebar(true);
      this.quoteSidebar = true;
      // this.addNewDataSidebar = true;
    },

    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },

    populateCustomer() {

      var self = this
       for (var prop in self.customerdataall) {
            if(self.customerdataall[prop].id == self.customerDropdown.value)
            {
                  self.customerselect = self.customerdataall[prop].name;
                  self.customerselectid = self.customerdataall[prop].id;
                  
                  self.recpcontact = self.customerdataall[prop].name;
                  self.recpaddressLine1 = self.customerdataall[prop].address1;
                  self.recpaddressLine2 = self.customerdataall[prop].address2;
                  self.recpzipcode = self.customerdataall[prop].postcalCode;
                  self.recpcontactnr = self.customerdataall[prop].contactPhone;
                  self.recpcontactn = self.customerdataall[prop].contactMobile;
                  self.recpMobilecontactnr = self.customerdataall[prop].contactMobile;
                  self.recpemail = self.customerdataall[prop].contactEmail;
                  return;
            }
          }

  // alert(this.customerDropdown.value)
  //       //   var self = this;
  //       // self.paymenttypedata.forEach(item => {
  //       //         if (item.label == self.paymenttype) {
  //       //           my_object.quotationPaymentTermsId = item.value;
  //       //           return;
  //       //         }
  //       //       });




          // this.customerselect = this.customerDropdown.value;
        // this.customerselectid = this.customerDropdown.value
       
        //   this.customerdataall.forEach(item => {
        //     if (item.id == this.customerDropdown.value) {
        //        alert(this.customerDropdown.value);
        //             alert(this.customerdataall[item].name)
        //        
        //         // this.customerselectid = this.customerdataall[item].id;
        //         // this.recpcontact = this.customerdataall[item].contactName;
        //         // this.recpaddressLine1 = this.customerdataall[item].address1;
        //         // this.recpaddressLine2 = this.customerdataall[item].address2;
        //         // this.recpzipcode = this.customerdataall[item].postcalCode;
        //         // this.recpcontactnr = this.customerdataall[item].contactPhone;
        //         // this.recpMobilecontactnr = this.customerdataall[item].contactMobile;
        //         // this.recpemail = this.customerdataall[item].contactEmail;
        //       return;
        //     }       
        // });
        // this.customerselect = this.customerDropdown.value;
       // this.customerselectid = this.customerDropdown.value;
        // this.customerselectid = this.customerdata[event.target.selectedIndex ].value;
        //alert(this.customerselectid);
        //alert(this.customerdataall[event.target.selectedIndex].id)

        // this.recpcontact = this.customerdataall[
        //   this.customerDropdown.value
        // ].contactName;

        // this.recpaddressLine1 = this.customerdataall[
        //   this.customerDropdown.value
        // ].address1;

        // this.recpaddressLine2 = this.customerdataall[
        //   this.customerDropdown.value
        // ].address2;

        // this.recpzipcode = this.customerdataall[
        //   this.customerDropdown.value
        // ].postcalCode;

        // this.recpcontactnr = this.customerdataall[
        //   this.customerDropdown.value
        // ].contactPhone;

        // this.recpMobilecontactnr = this.customerdataall[
        //   this.customerDropdown.value
        // ].contactMobile;

        // this.recpemail = this.customerdataall[
        //   this.customerDropdown.value
        // ].contactEmail;

    },

    onChange(event) {
      alert(this.value);
      //console.log(event.target.value);
    },
    //************************* */
    //Normal database call
    //************************* */
    fetchCustomers() {
      var self = this;

      axios
        .get(
          `https://localhost:44341/api/SalesSeeker/SP_JsonResult?storeproc=CRUD_Customer_Get&parameters=1`
        )
        .then(response => {
          self.customerdataall = response.data;
          self.customerdata = response.data.map(function(item) {
            return { label: item.customer, value: item.id };
          });
        })
        .catch(e => {
          self.productserror.push(e);
        })
        .finally(function() {
          // self.$vs.loading.close( self.$refs.MainCard.$el)
        });
    },
    //************************* */
    //Normal database call
    //************************* */

    fetchProduct() {
      var self = this;

      axios
        .get(
          `https://localhost:44341/api/SalesSeeker/SP_JsonResult?storeproc=CRUD_Product_Get&parameters=1`
        )
        .then(response => {
          // JSON responses are automatically parsed.
          // this.posts = response.data;
          self.productdataall = response.data;
          self.productdata = response.data.map(function(item) {
            return { text: item.code, value: item.pid };
          });
        })
        .catch(e => {
          self.productserror.push(e);
        })
        .finally(function() {
          // self.$vs.loading.close( self.$refs.MainCard.$el)
        });
    },

    //************************* */
    //Normal database call
    //************************* */
    fetchsalesrep() {
      var self = this;

      axios
        .get(
          `https://localhost:44341/api/SalesSeeker/SP_JsonResult?storeproc=CRUD_Salesrep_Get&parameters=1`
        )
        .then(response => {
          // JSON responses are automatically parsed.
          // this.posts = response.data;
          self.salesrepdata = response.data.map(function(item) {
            return { label: item.rep, value: item.id };
          });
          //   self.salesrepdata = response.data.map(function(item){
          //        return {label:item.rep ,value:item.id}
          //    });
        })
        .catch(e => {
          self.productserror.push(e);
        })
        .finally(function() {
          // self.$vs.loading.close( self.$refs.MainCard.$el)
        });
    },

     //************************* */
    //Normal database call
    //************************* */
    fetchpaymentype() {
      var self = this;

      axios
        .get(
          `https://localhost:44341/api/SalesSeeker/SP_JsonResult?storeproc=CRUD_QuotationPayment_Get`
        )
        .then(response => {
          // JSON responses are automatically parsed.
          // this.posts = response.data;
          self.paymenttypedata = response.data.map(function(item) {
            return { label: item.payment, value: item.id };
          });
          //   self.salesrepdata = response.data.map(function(item){
          //        return {label:item.rep ,value:item.id}
          //    });
        })
        .catch(e => {
          self.productserror.push(e);
        })
        .finally(function() {
          // self.$vs.loading.close( self.$refs.MainCard.$el)
        });
    },

    //************************************************************************ */
    //Get all the quotaiton informaiton
    //************************************************************************ */
    fetchquotationcomplete(_quoteNr) {
      var self = this;
      axios
        .get(
          "https://localhost:44341/api/SalesSeeker/QuotationGetComplete?quoteNr=" +
            _quoteNr
        )
        .then(response => {
          self.quotationCompletedata = response.data;
          for (var prop in self.quotationCompletedata) {
            self.quotationComplete[prop] = self.quotationCompletedata[prop];
            var my_object = {
              quotelineitem: self.quotationComplete[prop].qliid,
              dataId: self.quotationComplete[prop].productID,
              productID: self.quotationComplete[prop].productID,
              code: self.quotationComplete[prop].product,
              description: self.quotationComplete[prop].description,
              discount: self.quotationComplete[prop].discount,
              qty: self.quotationComplete[prop].qty,
              priceExcl: self.quotationComplete[prop].priceExcl,
              total: self.quotationComplete[prop].total,
              vat: self.quotationComplete[prop].vat,
              quotationPaymentTermsId:
                self.quotationComplete[prop].quotationPaymenttermsID,
              comment: self.quotationComplete[prop].comment,
              ROE: self.quotationComplete[prop].roe
            };
            this.quoteItems.push(my_object);
          }
        })
        .catch(e => {
          self.quotationserror.push(e);
        })
        .finally(function() {
          self.quoteId = _quoteNr;
          self.quoteNr = self.quotationComplete[0].quoteNr;
          self.reference = self.quotationComplete[0].quoteRef;
          self.salesrep = self.quotationComplete[0].salesRep;
          self.paymenttype = self.quotationComplete[0].payment;
          self.invoiceDetails.invoiceNo = self.quotationComplete[0].quoteNr;
          self.fromdate = self.quotationComplete[0].quoteDate;
          self.todate = self.quotationComplete[0].quoteExpiryDate;
          self.customerDropdown = self.quotationComplete[0].customer;
          self.customerselect = self.quotationComplete[0].customer;
          self.recpcontact = self.quotationComplete[0].contactMobile;
          self.recpaddressLine1 = self.quotationComplete[0].address1;
          self.recpaddressLine2 = self.quotationComplete[0].address2;
          self.recpzipcode = self.quotationComplete[0].postcalCode;
          self.recpemail = self.quotationComplete[0].contactEmail;
          self.recpcontactn = self.quotationComplete[0].contactMobile;
          // self.$vs.loading.close( self.$refs.MainCard.$el) quoteNr
        });
    },
    printInvoice() {
      window.print();
    },

    deleteItem: function(index) {
      // this.quoteData.tasks.splice(index, 1);
    }
  },
  components: {
    Datepicker,
    "v-select": vSelect,
    quoteSidebar
  }
};
</script>

<style lang="scss">
#referenceInput .input-span-placeholder.vs-input--placeholder.normal {
  text-align: left;
}

.section-spacer {
  margin: 1rem 0;
}

#selectRecp {
  max-width: 30em;
  margin: 1em auto;
}

@media print {
  .invoice-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    .vs-con-table {
      .vs-con-tbody {
        overflow: hidden !important;
      }
    }

    #selectdescriptionID {
      display: none;
    }
    #selectNameID {
      display: none;
    }
    #AddItem {
      display: none;
    }
    #RemoveItem {
      display: none;
    }
    #fromdatepick {
      display: none;
    }

    #referenceInput {
      display: none;
    }

    #todatepick {
      display: none;
    }

    #SalesInput {
      display: none;
    }
    #customerInput {
      display: none;
    }
    #customerselectbox {
      display: none;
    }

    #invoice-container,
    #invoice-container * {
      visibility: visible;
    }
    #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }
  }
}

@page {
  size: auto;
}

textarea.test {
  width: 100%;
  height: 100%;
  border-color: Transparent;
}
</style>
