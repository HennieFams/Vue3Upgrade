<template>
  <div id="simple-calendar-app">
    <vs-tabs
      v-model="activeDashTab"
      ref="calendarView"
      class="vs-con-loading__container"
      style="width: auto; min-height: auto"
    >
      <vs-tab label="Calendar View" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          <calendar-view
            ref="calendar"
            :displayPeriodUom="calendarView"
            :show-date="showDate"
            :events="myEvents"
            :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
            eventBorderHeight="0px"
            eventContentHeight="1.65rem"
            class="theme-default vs-con-loading__container"
            @click-event="getViewCalendarDetail"
          >
            <div slot="header" class="mb-4">
              <h3 class="mb-3">FAMS Quick Calendar View - Fuel Movement</h3>
              <div class="vx-row mt-3">
                <div class="vx-col">
                  <div class="flex items-center">
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                      @click="updateMonth(-1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />

                    <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                      showDate | month
                    }}</span>

                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                      @click="updateMonth(1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </calendar-view>
        </div>
      </vs-tab>
      <vs-tab label="Expired EQP License" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          <calendar-view
            ref="calendar1"
            :displayPeriodUom="calendarView"
            :show-date="showDate"
            :events="myLicense"
            :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
            eventBorderHeight="0px"
            eventContentHeight="1.65rem"
            class="theme-default vs-con-loading__container"
            @click-event="getViewLicenseExpireDetail"
          >
            <div slot="header" class="mb-4">
              <h3 class="mb-3">FAMS Quick Calendar View - License Expire</h3>
              <div class="vx-row mt-3">
                <div class="vx-col">
                  <div class="flex items-center">
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                      @click="updateMonth(-1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />

                    <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                      showDate | month
                    }}</span>

                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                      @click="updateMonth(1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </calendar-view>
        </div>
      </vs-tab>
      <vs-tab label="Service Dates" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          <calendar-view
            ref="calendar2"
            :displayPeriodUom="calendarView"
            :show-date="showDate"
            :events="serviceDates"
            :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
            eventBorderHeight="0px"
            eventContentHeight="1.65rem"
            class="theme-default vs-con-loading__container"
            @click-event="getViewLicenseExpireDetail"
          >
            <div slot="header" class="mb-4">
              <h3 class="mb-3">FAMS Quick Calendar View - Service Dates</h3>
              <div class="vx-row mt-3">
                <div class="vx-col">
                  <div class="flex items-center">
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                      @click="updateMonth(-1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />

                    <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                      showDate | month
                    }}</span>

                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                      @click="updateMonth(1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </calendar-view>
        </div>
      </vs-tab>
      <vs-tab label="Expired Employee License" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          <calendar-view
            ref="calendar3"
            :displayPeriodUom="calendarView"
            :show-date="showDate"
            :events="myLicense"
            :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
            eventBorderHeight="0px"
            eventContentHeight="1.65rem"
            class="theme-default vs-con-loading__container"
            @click-event="getViewOperatorLicenseExpireDetail"
          >
            <div slot="header" class="mb-4">
              <h3 class="mb-3">FAMS Quick Calendar View - License Expire</h3>
              <div class="vx-row mt-3">
                <div class="vx-col">
                  <div class="flex items-center">
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                      @click="updateMonth(-1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />

                    <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                      showDate | month
                    }}</span>

                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                      @click="updateMonth(1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </calendar-view>
        </div>
      </vs-tab>
      <vs-tab label="Expired Employee PDP License" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          <calendar-view
            ref="calendar4"
            :displayPeriodUom="calendarView"
            :show-date="showDate"
            :events="myLicense"
            :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
            eventBorderHeight="0px"
            eventContentHeight="1.65rem"
            class="theme-default vs-con-loading__container"
            @click-event="getViewOperatorLicenseExpireDetail"
          >
            <div slot="header" class="mb-4">
              <h3 class="mb-3">FAMS Quick Calendar View - PDP License Expire</h3>
              <div class="vx-row mt-3">
                <div class="vx-col">
                  <div class="flex items-center">
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                      @click="updateMonth(-1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />

                    <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                      showDate | month
                    }}</span>

                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                      @click="updateMonth(1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </calendar-view>
        </div>
      </vs-tab>
      <vs-tab label="ATG vs Consumption (Per Tank)" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          <calendar-view
            ref="calendar5"
            :displayPeriodUom="calendarView"
            :show-date="showDate"
            :events="readingDates"
            :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
            eventBorderHeight="0px"
            eventContentHeight="1.65rem"
            class="theme-default vs-con-loading__container"
            @click-event="showATGDetail"
          >
            <div slot="header" class="mb-4">
              <h3 class="mb-3">
                FAMS Quick Calendar View - ATG vs Consumption (Per Tank)
              </h3>
              <div class="vx-row mt-3">
                <div class="vx-col w-full">
                  <div class="flex items-center">
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                      @click="updateMonth(-1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />

                    <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                      showDate | month
                    }}</span>

                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                      @click="updateMonth(1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />
                    <v-select
                      ref="Tank"
                      class="w-1/3"
                      placeholder="Search / Select Tank"
                      style="padding-left: 30px"
                      :options="tanksList"
                      v-model="tank"
                      @search:blur="getViewATGVsConsumption"
                      name="tank"
                    />
                  </div>
                </div>
              </div>
            </div>
          </calendar-view>
        </div>
      </vs-tab>
      <vs-tab label="ATG Stock Received" style="min-height: 500px">
        <div class="vx-card no-scroll-content">
          <calendar-view
            ref="calendar6"
            :displayPeriodUom="calendarView"
            :show-date="showDate"
            :events="readingDates2"
            :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
            eventBorderHeight="0px"
            eventContentHeight="1.65rem"
            class="theme-default vs-con-loading__container"
            @click-event="showATGStockReceived"
          >
            <div slot="header" class="mb-4">
              <h3 class="mb-3">FAMS Quick Calendar View - ATG Stock Received</h3>
              <div class="vx-row mt-3">
                <div class="vx-col w-full">
                  <div class="flex items-center">
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                      @click="updateMonth(-1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />

                    <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                      showDate | month
                    }}</span>

                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                      @click="updateMonth(1)"
                      svgClasses="w-5 h-5 m-1"
                      class="cursor-pointer bg-primary text-white rounded-full"
                    />
                    <v-select
                      ref="Tank"
                      class="w-1/3"
                      placeholder="Search / Select Tank"
                      style="padding-left: 30px"
                      :options="tanksList"
                      v-model="tank2"
                      @search:blur="getViewATGStockReceived"
                      name="tank2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </calendar-view>
        </div>
      </vs-tab>
    </vs-tabs>

    <vs-popup
      fullscreen
      class="calendar-event-dialog"
      title="Dispensing Grid"
      :active.sync="activePromptAddEvent"
    >
      <div id="CPGrid">
        <div id="Grid" ref="grid"></div>
      </div>
    </vs-popup>
    <vs-popup
      class="calendar-event-dialog"
      title="ATG Tank Details"
      :active.sync="tankPopup"
    >
      <div id="ATGDetail">
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>Date: {{ atgData.date }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Before Delivery: {{ atgData.beforeDelivery }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>After Delivery: {{ atgData.afterDelivery }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Capacity: {{ atgData.capacity }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Opening Stock Date: {{ atgData.openingStockDate }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Opening Stock: {{ atgData.openingStock }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Closing Stock Date: {{ atgData.closingStockDate }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Closing Stock: {{ atgData.closingStock }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Consumption: {{ atgData.consumption }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Delivery: {{ atgData.delivery }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Tank: {{ atgData.tank }}</label>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Ullage: {{ atgData.ullage }}</label>
          </div>
        </div>
      </div>
    </vs-popup>
    <vs-popup
      fullscreen
      class="calendar-event-dialog"
      title="Equipment Detail"
      :active.sync="activeEqpDetail"
    >
      <div id="EqpDetail">
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Registration</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="Registration"
              v-model="formData.registration"
              class="w-full"
              name="Registration"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Description</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="Description"
              v-model="formData.name"
              class="w-full"
              name="Description"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Vin Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              placeholder="Vin Number"
              v-validate="'numeric'"
              type="numeric"
              name="Vin Number"
              v-model="formData.vin"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Engine Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              placeholder="Engine Number"
              v-validate="'numeric'"
              type="numeric"
              name="Engine Number"
              v-model="formData.engineNumber"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Series Name</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="Series Name"
              v-model="formData.seriesName"
              class="w-full"
              name="SeriesName"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Service Interval</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              v-model="formData.serviceInterval"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Service Interval"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>Service Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                icon-pack="feather"
                icon="icon-calendar"
                v-model="formData.serviceDate"
                :format="'YYYY-MM-DD'"
                placeholder="Select Service Date"
                name="Service Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License"
              v-model="formData.license"
              class="w-full"
              name="License"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License Type</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License Type"
              v-model="formData.licenseType"
              class="w-full"
              name="License Type"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2 pb-2" style="background: rgba(var(--vs-primary), 1)">
            <label>License Expire Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="formData.licenseExpiryDate"
                :format="'YYYY-MM-DD'"
                icon-pack="feather"
                icon="icon-calendar"
                placeholder="Select Expiration Date"
                name="License Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Odometer Reading</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              v-model="formData.odometerReading"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Odometer Reading"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>Odometer Reading Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="formData.odometerReadingDate"
                :format="'YYYY-MM-DD'"
                placeholder="Select Reading Date"
                name="Reading Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Owner</label>
            <vs-input
              icon-pack="feather"
              icon="icon-user"
              placeholder="Owner"
              v-model="formData.owner"
              class="w-full"
              name="Owner"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Assigned Driver</label>
            <vs-input
              icon-pack="feather"
              icon="icon-user"
              placeholder="Driver"
              v-model="formData.assignedDriver"
              class="w-full"
              name="Driver"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Burn Rate High</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              v-model="formData.burnRateHigh"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Burn Rate High"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Burn Rate Low</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              v-model="formData.burnRateLow"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Burn Rate Low"
              disabled
            />
          </div>
        </div>
      </div>
    </vs-popup>
    <vs-popup
      fullscreen
      class="calendar-event-dialog"
      title="Equipment Detail"
      :active.sync="activeEqpDetail2"
    >
      <div id="EqpDetail">
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Registration</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="Registration"
              v-model="formData.registration"
              class="w-full"
              name="Registration"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Description</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="Description"
              v-model="formData.name"
              class="w-full"
              name="Description"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Vin Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              placeholder="Vin Number"
              v-validate="'numeric'"
              type="numeric"
              name="Vin Number"
              v-model="formData.vin"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Engine Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              placeholder="Engine Number"
              v-validate="'numeric'"
              type="numeric"
              name="Engine Number"
              v-model="formData.engineNumber"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Series Name</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="Series Name"
              v-model="formData.seriesName"
              class="w-full"
              name="SeriesName"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Service Interval</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              v-model="formData.serviceInterval"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Service Interval"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2" style="background: rgba(var(--vs-primary), 1)">
            <label>Service Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                icon-pack="feather"
                icon="icon-calendar"
                v-model="formData.serviceDate"
                :format="'YYYY-MM-DD'"
                placeholder="Select Service Date"
                name="Service Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License"
              v-model="formData.license"
              class="w-full"
              name="License"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License Type</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License Type"
              v-model="formData.licenseType"
              class="w-full"
              name="License Type"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2 pb-2">
            <label>License Expire Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="formData.licenseExpiryDate"
                :format="'YYYY-MM-DD'"
                icon-pack="feather"
                icon="icon-calendar"
                placeholder="Select Expiration Date"
                name="License Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Odometer Reading</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              v-model="formData.odometerReading"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Odometer Reading"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>Odometer Reading Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="formData.odometerReadingDate"
                :format="'YYYY-MM-DD'"
                placeholder="Select Reading Date"
                name="Reading Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Owner</label>
            <vs-input
              icon-pack="feather"
              icon="icon-user"
              placeholder="Owner"
              v-model="formData.owner"
              class="w-full"
              name="Owner"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Assigned Driver</label>
            <vs-input
              icon-pack="feather"
              icon="icon-user"
              placeholder="Driver"
              v-model="formData.assignedDriver"
              class="w-full"
              name="Driver"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Burn Rate High</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              v-model="formData.burnRateHigh"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Burn Rate High"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Burn Rate Low</label>
            <vs-input
              icon-pack="feather"
              icon="icon-hash"
              v-model="formData.burnRateLow"
              class="w-full"
              v-validate="'numeric'"
              type="numeric"
              name="Burn Rate Low"
              disabled
            />
          </div>
        </div>
      </div>
    </vs-popup>
    <vs-popup
      fullscreen
      class="calendar-event-dialog"
      title="Equipment Detail"
      :active.sync="activeOperatorDetail"
    >
      <div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Employee Name</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Id Number"
              v-validate="'numeric'"
              name="IdNum"
              v-model="operatorDetail.name"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Employee Tag</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Cellphone Number"
              v-validate="'digits:10'"
              type="numeric"
              name="Cell Number"
              v-model="operatorDetail.tag"
              class="w-full"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Id Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Id Number"
              v-validate="'numeric'"
              name="IdNum"
              v-model="operatorDetail.idNumber"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Cellphone Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Cellphone Number"
              v-validate="'digits:10'"
              type="numeric"
              name="Cell Number"
              v-model="operatorDetail.cellphoneNr"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-4">
            <label>Email Address</label>
            <vs-input
              icon-pack="feather"
              icon="icon-at-sign"
              placeholder="Email Address"
              v-model="operatorDetail.email"
              class="w-full"
              v-validate="'email'"
              name="Email"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Residential Address</label>
            <vs-input
              icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Residential Address"
              v-model="operatorDetail.residentialAddress"
              class="w-full"
              name="ResidentAddress"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Postal Address</label>
            <vs-input
              icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Postal Address"
              v-model="operatorDetail.postalAddress"
              class="w-full"
              name="PostalAddress"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-4">
            <label>PDP Expire Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="operatorDetail.pdpexpiryDate"
                :format="'YYYY-MM-DD'"
                placeholder="Select Expiration Date"
                name="Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License"
              v-model="operatorDetail.license"
              class="w-full"
              name="License"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License Type</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License Type"
              v-model="operatorDetail.licenseType"
              class="w-full"
              name="License Type"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2" style="background: rgba(var(--vs-primary), 1)">
            <label>License Expire Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="operatorDetail.licenseExpiryDate"
                :format="'YYYY-MM-DD'"
                icon-pack="feather"
                icon="icon-calendar"
                placeholder="Select Expiration Date"
                name="License Date"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
    <vs-popup
      fullscreen
      class="calendar-event-dialog"
      title="Equipment Detail"
      :active.sync="activeOperatorDetail1"
    >
      <div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Employee Name</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Id Number"
              v-validate="'numeric'"
              name="IdNum"
              v-model="operatorDetail.name"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Employee Tag</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Cellphone Number"
              v-validate="'digits:10'"
              type="numeric"
              name="Cell Number"
              v-model="operatorDetail.tag"
              class="w-full"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Id Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Id Number"
              v-validate="'numeric'"
              name="IdNum"
              v-model="operatorDetail.idNumber"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-1">
            <label>Cellphone Number</label>
            <vs-input
              icon-pack="feather"
              icon="icon-phone"
              placeholder="Cellphone Number"
              v-validate="'digits:10'"
              type="numeric"
              name="Cell Number"
              v-model="operatorDetail.cellphoneNr"
              class="w-full"
              disabled
            />
          </div>
          <div class="vx-col flex-4">
            <label>Email Address</label>
            <vs-input
              icon-pack="feather"
              icon="icon-at-sign"
              placeholder="Email Address"
              v-model="operatorDetail.email"
              class="w-full"
              v-validate="'email'"
              name="Email"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Residential Address</label>
            <vs-input
              icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Residential Address"
              v-model="operatorDetail.residentialAddress"
              class="w-full"
              name="ResidentAddress"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>Postal Address</label>
            <vs-input
              icon-pack="feather"
              icon="icon-map-pin"
              placeholder="Postal Address"
              v-model="operatorDetail.postalAddress"
              class="w-full"
              name="PostalAddress"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-4" style="background: rgba(var(--vs-primary), 1)">
            <label>PDP Expire Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="operatorDetail.pdpexpiryDate"
                :format="'YYYY-MM-DD'"
                placeholder="Select Expiration Date"
                name="Date"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License"
              v-model="operatorDetail.license"
              class="w-full"
              name="License"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-1">
            <label>License Type</label>
            <vs-input
              icon-pack="feather"
              icon="icon-file-text"
              placeholder="License Type"
              v-model="operatorDetail.licenseType"
              class="w-full"
              name="License Type"
              disabled
            />
          </div>
        </div>
        <div class="vx-row px-4 pb-3">
          <div class="vx-col flex-2">
            <label>License Expire Date</label>
            <div id="datepick">
              <flat-pickr
                class="w-full"
                v-model="operatorDetail.licenseExpiryDate"
                :format="'YYYY-MM-DD'"
                icon-pack="feather"
                icon="icon-calendar"
                placeholder="Select Expiration Date"
                name="License Date"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import moduleCalendar from "@/store/calendar/moduleCalendar.js";
require("vue-simple-calendar/static/css/default.css");

import Datepicker from "vuejs-datepicker";
import { en, he } from "vuejs-datepicker/src/locale";
import moment from "moment";
import {
  GridPlugin,
  Grid,
  PdfExport,
  Aggregate,
  ExcelExport,
  Page,
  RowDD,
  Selection,
  Group,
  Toolbar,
  Search,
  Sort,
  Filter,
} from "@syncfusion/ej2-vue-grids";
import { ClickEventArgs } from "@syncfusion/ej2-vue-navigations";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
//Vue.use(GridPlugin);
Grid.Inject(Sort, Search, Aggregate, Page, Toolbar, PdfExport, ExcelExport);

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker,
    flatPickr,
    "v-select": vSelect,
  },
  data() {
    return {
      flag: true,
      pageSettings: { pageCount: 20 },
      aggregateColumn: [],
      aggregate: null,
      textToShow: "",
      toolbar: ["ExcelExport", "CsvExport", "Print", "Search"],
      localColforGrid: [
        {
          field: "accountID",
          headerText: "accountID",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number",
        },
        {
          field: "day",
          headerText: "day",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number",
        },
        {
          field: "month",
          headerText: "month",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number",
        },
        {
          field: "year",
          headerText: "year",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "number",
        },
        {
          field: "eqpTag",
          headerText: "eqpTag",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string",
        },
        {
          field: "dateOnly",
          headerText: "dateOnly",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string",
        },
        {
          field: "allocation1",
          headerText: "allocation1",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string",
        },
        {
          field: "allocation2",
          headerText: "allocation2",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string",
        },
        {
          field: "allocation3",
          headerText: "allocation3",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string",
        },
        {
          field: "allocation4",
          headerText: "allocation4",
          textAlign: "Left",
          width: 150,
          visible: false,
          type: "string",
        },
        {
          field: "date",
          headerText: "Date",

          width: 180,
          format: "yyyy-MM-dd hh:mm:ss",
          type: "date",
        },
        {
          field: "store",
          headerText: "Store",

          width: 180,
          type: "string",
        },
        {
          field: "registration",
          headerText: "Registration",

          width: 180,
          type: "string",
        },
        {
          field: "product",
          headerText: "Product",

          width: 180,
          type: "string",
        },
        {
          field: "volume",
          headerText: "Volume",

          width: 180,
          type: "number",
        },
        {
          field: "driver",
          headerText: "Driver",

          width: 180,
          type: "string",
        },
        {
          field: "fuelAttendant",
          headerText: "FuelAttendant",

          width: 180,
          type: "string",
        },
        {
          field: "measurement",
          headerText: "Type",

          width: 120,
          type: "string",
        },
        {
          field: "hour",
          headerText: "hour",

          width: 120,
          type: "number",
        },
        {
          field: "km",
          headerText: "Km",

          width: 120,
          type: "number",
        },
        {
          field: "rebate",
          headerText: "Eqp Rebate",

          width: 180,
          type: "number",
        },
        {
          field: "costCentre",
          headerText: "CostCentre",
          width: 180,
          type: "string",
        },
        {
          field: "masterEquipment",
          headerText: "Mst Eqp",
          width: 180,
          type: "string",
        },
      ],

      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: "",
      startDate: "",
      endDate: "",
      labelLocal: "none",
      dispensingData: [],

      url: "",
      calendarView: "month",
      myEvents: [],
      myLicense: [],
      serviceDates: [],
      operators: [],
      readingDates: [],
      processedDates: [],
      readingDates2: [],
      processedDates2: [],
      colour: "",

      activePromptAddEvent: false,
      activePrompt3EditEvent: false,
      activeEqpDetail: false,
      activeEqpDetail2: false,
      activeOperatorDetail: false,
      activeOperatorDetail1: false,
      formData: {
        registration: "",
        name: "",
        vin: "",
        engineNumber: "",
        seriesName: "",
        licenseType: "",
        license: "",
        licenseExpiryDate: "",
        serviceInterval: "",
        serviceDate: "",
        odometerReading: "",
        odometerReadingDate: "",
        owner: "",
        assignedDriver: "",
        burnRateHigh: "",
        burnRateLow: "",
      },
      activeDashTab: 0,
      tanksList: [],
      tank: 0,
      tank2: 0,
      tankPopup: false,
      afterDelivery: 0,
      atgData: {},

      operatorDetail: {
        pdpexpiryDate: "",
        email: "",
        pdp: false,
        residentialAddress: "",
        idNumber: "",
        cellphoneNr: "",
        postalAddress: "",
        license: "",
        licenseExpiryDate: "",
        licenseType: "",
        name: "",
        tag: "",
      },
    };
  },
  provide: {
    grid: [PdfExport, ExcelExport, Page, Group, Selection, Toolbar, Search, Sort],
  },
  watch: {
    showDate: function (val) {
      var self = this;

      if (self.activeDashTab == 0) {
        setTimeout(function () {
          self.getViewCalendar(val);
        }, 100);
      } else if (self.activeDashTab == 1) {
        setTimeout(function () {
          self.getViewLicenseExpire(val);
        }, 100);
      } else if (self.activeDashTab == 2) {
        setTimeout(function () {
          self.getViewServiceDates(val);
        }, 100);
      } else if (self.activeDashTab == 3) {
        setTimeout(function () {
          self.getViewOperatorLicenseExpire(val);
        }, 100);
      } else if (self.activeDashTab == 4) {
        setTimeout(function () {
          self.getViewOperatorPdpLicenseExpire(val);
        }, 100);
      } else if (self.activeDashTab == 5) {
        setTimeout(function () {
          self.readingDates = [];
          self.processedDates = [];
          self.GetDropdownTanks();
        }, 100);
      } else if (self.activeDashTab == 6) {
        setTimeout(function () {
          self.readingDates2 = [];
          self.processedDates2 = [];
          self.GetDropdownTanks();
        }, 100);
      }
    },
    activeDashTab: function (val) {
      var self = this;
      if (val == 0) {
        setTimeout(function () {
          var date = new Date();
          var d = new Date(date.getFullYear(), date.getMonth(), 1);
          var j = self.dateFormat(d);
          self.getViewCalendar(j);
        }, 100);
      } else if (val == 1) {
        setTimeout(function () {
          var date = new Date();
          var d = new Date(date.getFullYear(), date.getMonth(), 1);
          var j = self.dateFormat(d);
          self.getViewLicenseExpire(j);
        }, 100);
      } else if (val == 2) {
        setTimeout(function () {
          var date = new Date();
          var d = new Date(date.getFullYear(), date.getMonth(), 1);
          var j = self.dateFormat(d);
          self.getViewServiceDates(j);
        }, 100);
      } else if (val == 3) {
        setTimeout(function () {
          var date = new Date();
          var d = new Date(date.getFullYear(), date.getMonth(), 1);
          var j = self.dateFormat(d);
          self.getViewOperatorLicenseExpire(j);
        }, 100);
      } else if (val == 4) {
        setTimeout(function () {
          var date = new Date();
          var d = new Date(date.getFullYear(), date.getMonth(), 1);
          var j = self.dateFormat(d);
          self.getViewOperatorPdpLicenseExpire(j);
        }, 100);
      } else if (val == 5) {
        setTimeout(function () {
          self.tank = 0;
          self.readingDates = [];
          self.processedDates = [];
          var date = new Date();
          var d = new Date(date.getFullYear(), date.getMonth(), 1);
          var j = self.dateFormat(d);
          self.GetDropdownTanks();
        }, 100);
      } else if (val == 6) {
        setTimeout(function () {
          self.tank2 = 0;
          self.readingDates2 = [];
          self.processedDates2 = [];
          var date = new Date();
          var d = new Date(date.getFullYear(), date.getMonth(), 1);
          var j = self.dateFormat(d);
          self.GetDropdownTanks();
        }, 100);
      }
    },
  },
  props: {
    events: { type: Array, default: () => [] },
  },

  computed: {
    validForm() {
      return (
        this.title !== "" &&
        this.startDate !== "" &&
        this.endDate !== "" &&
        Date.parse(this.endDate) - Date.parse(this.startDate) >= 0 &&
        !this.errors.has("event-url")
      );
    },
    disabledDatesTo() {
      return { to: new Date(this.startDate) };
    },
    disabledDatesFrom() {
      return { from: new Date(this.endDate) };
    },
    calendarLabels() {
      return this.$store.state.calendar.eventLabels;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  mounted() {
    var self = this;
    setTimeout(function () {
      self.activeDashTab = 0;
      var date = new Date();
      var d = new Date(date.getFullYear(), date.getMonth(), 1);
      var j = self.dateFormat(d);
      self.getViewCalendar(j);
    }, 200);
  },
  methods: {
    updateMonth(val) {
      var self = this;

      self.populateData();
      if (self.activeDashTab == 0) {
        setTimeout(function () {
          self.showDate = self.$refs.calendar.getIncrementedPeriod(val);
          self.getViewCalendar(self.showDate);
        }, 100);
      } else if (self.activeDashTab == 1) {
        setTimeout(function () {
          self.showDate = self.$refs.calendar1.getIncrementedPeriod(val);
          self.getViewLicenseExpire(self.showDate);
        }, 100);
      } else if (self.activeDashTab == 2) {
        setTimeout(function () {
          self.showDate = self.$refs.calendar2.getIncrementedPeriod(val);
          self.getViewServiceDates(self.showDate);
        }, 100);
      } else if (self.activeDashTab == 3) {
        setTimeout(function () {
          self.showDate = self.$refs.calendar3.getIncrementedPeriod(val);
          self.getViewOperatorLicenseExpire(self.showDate);
        }, 100);
      } else if (self.activeDashTab == 4) {
        setTimeout(function () {
          self.showDate = self.$refs.calendar4.getIncrementedPeriod(val);
          self.getViewOperatorPdpLicenseExpire(self.showDate);
        }, 100);
      } else if (self.activeDashTab == 5) {
        setTimeout(function () {
          self.showDate = self.$refs.calendar5.getIncrementedPeriod(val);
          self.getViewATGVsConsumption();
        }, 100);
      } else if (self.activeDashTab == 6) {
        setTimeout(function () {
          self.showDate = self.$refs.calendar6.getIncrementedPeriod(val);
          self.getViewATGStockReceived();
        }, 100);
      }
    },
    clearFields() {
      this.title = this.endDate = this.url = "";
      this.id = 0;
      this.labelLocal = "none";
    },
    promptAddNewEvent(date) {
      this.disabledFrom = false;
      this.addNewEventDialog(date);
    },
    addNewEventDialog(date) {
      this.clearFields();
      this.startDate = date;
      this.endDate = date;
      this.activePromptAddEvent = true;
      this.populateData();
    },
    openAddNewEvent(date) {
      this.disabledFrom = true;
      this.addNewEventDialog(date);
    },
    openEditEvent(event) {
      const e = this.$store.getters["calendar/getEvent"](event.id);
      this.id = e.id;
      this.title = e.title;
      this.startDate = e.startDate;
      this.endDate = e.endDate;
      this.url = e.url;
      this.labelLocal = e.label;
      this.activePromptEditEvent = true;
    },
    removeEvent() {
      this.$store.dispatch("calendar/removeEvent", this.id);
    },
    getViewCalendar(date) {
      var self = this;
      self.myEvents = [];
      self.showLoadingOnElement("calendar", 1, "radius");
      var onSuccess = function (response) {
        self.myEvents = response.data.map(function (item) {
          return {
            id: item.day,
            startDate: item.dateOnly,
            endDate: item.dateOnly,
            title: item.volume + "L",
            style:
              "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;",
          };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar.$el);
      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewCalendar?&date=${self.dateFormat(date)}`,
        onSuccess,
        onFinally
      );
    },
    populateData() {
      var self = this;
      self.flag = true;
      var element = document.getElementById("Grid");
      if (element) element.remove();

      var p = document.getElementById("CPGrid");
      var newElement = document.createElement("Div");
      newElement.setAttribute("id", "Grid");
      p.appendChild(newElement);
    },
    toolbarClick(args) {
      switch (args["item"].text) {
        case "PDF Export":
          this.grid.pdfExport({ fileName: "new.pdf" });
          break;
        case "Excel Export":
          this.grid.excelExport({ fileName: "new.xlsx" });
          break;
        case "CSV Export":
          this.grid.csvExport({ fileName: "new.csv" });
          break;
      }
    },
    getViewCalendarDetail(date) {
      var self = this;
      var d = new Date(date.startDate);
      var day = "" + d.getDate();

      self.showLoadingOnElement("calendar", 1, "radius");
      var onSuccess = function (response) {
        self.dispensingData = response.data;

        self.aggregateColumn = [
          {
            columns: [
              {
                type: "Sum",
                field: "volume",
                textAlign: "Left",
                footerTemplate: "Total Volume: ${Sum}",
              },
            ],
          },
        ];

        if (self.flag) {
          self.grid = new Grid({
            excelExportComplete: "excelExportComplete",
            allowSorting: true,
            allowPaging: true,
            allowExcelExport: true,
            scrollSettings: { width: 886, height: 500 },
            toolbar: self.toolbar,
            toolbarClick: self.toolbarClick,
            dataSource: self.dispensingData,
            columns: self.localColforGrid,
            height: 500,
            PageSettings: 20,
            aggregates: self.aggregateColumn,
          });
          self.flag = false;
          self.grid.appendTo("#Grid");
          self.grid.refresh();
        } else self.grid.dataSource = self.dispensingData;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar.$el);
        if (!self.isMounted) self.activePromptAddEvent = true;
      };
      self.$ajaxGet(
        self,
        `QuickViewCalendar/GetQuickViewCalendarDetail?&date=${self.formatDateMoment(
          date.startDate
        )}&day=${day}`,
        onSuccess,
        onFinally
      );
    },

    getViewLicenseExpire(date) {
      var self = this;
      self.myLicense = [];
      self.showLoadingOnElement("calendar1", 1, "radius");
      var onSuccess = function (response) {
        self.myLicense = response.data.map(function (item) {
          return {
            id: item.day,
            startDate: item.expiryDate,
            endDate: item.expiryDate,
            title: item.registration,
            style:
              "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;",
          };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar1.$el);
      };
      self.$ajaxGet(
        self,
        `QuickViewLicenseExpire/GetQuickViewLicenseExpire?&date=${self.dateFormat(date)}`,
        onSuccess,
        onFinally
      );
    },
    getViewOperatorLicenseExpire(date) {
      var self = this;
      self.myLicense = [];
      if (self.activeDashTab == 3) {
        self.showLoadingOnElement("calendar3", 1, "radius");
      } else if (self.activeDashTab == 4) {
        self.showLoadingOnElement("calendar4", 1, "radius");
      }
      var onSuccess = function (response) {
        self.myLicense = response.data.map(function (item) {
          return {
            id: item.day,
            startDate: item.expiryDate,
            endDate: item.expiryDate,
            title: item.tag,
            style:
              "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;",
          };
        });
      };
      var onFinally = function () {
        if (self.activeDashTab == 3) {
          self.$vs.loading.close(self.$refs.calendar3.$el);
        } else if (self.activeDashTab == 4) {
          self.$vs.loading.close(self.$refs.calendar4.$el);
        }
      };
      self.$ajaxGet(
        self,
        `QuickViewLicenseExpire/GetQuickViewOperatorLicenseExpire?&date=${self.dateFormat(
          date
        )}`,
        onSuccess,
        onFinally
      );
    },
    getViewOperatorPdpLicenseExpire(date) {
      var self = this;
      self.myLicense = [];
      // if (self.activeDashTab == 3) {
      //   self.showLoadingOnElement("calendar3", 1, "radius");
      // } else if (self.activeDashTab == 4) {
      self.showLoadingOnElement("calendar4", 1, "radius");
      // }
      var onSuccess = function (response) {
        self.myLicense = response.data.map(function (item) {
          return {
            id: item.day,
            startDate: item.pdpExpiryDate,
            endDate: item.pdpExpiryDate,
            title: item.tag,
            style:
              "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;",
          };
        });
      };
      var onFinally = function () {
        // if (self.activeDashTab == 3) {
        // self.$vs.loading.close(self.$refs.calendar3.$el);
        // } else if (self.activeDashTab == 4) {
        self.$vs.loading.close(self.$refs.calendar4.$el);
        // }
      };
      self.$ajaxGet(
        self,
        `QuickViewLicenseExpire/GetQuickViewOperatorPdpLicenseExpire?&date=${self.dateFormat(
          date
        )}`,
        onSuccess,
        onFinally
      );
    },

    GetDropdownTanks() {
      const self = this;
      var aId = localStorage.getItem("userAccountId");

      var onSuccess = function (response) {
        self.tanksList = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function () {};
      self.$ajaxGet(
        self,
        "Tanks/GetTankdropdown?AccountId=" + localStorage.getItem("userAccountId"),
        onSuccess,
        onFinally
      );
    },
    getViewATGVsConsumption() {
      var self = this;
      var date = self.showDate;

      var d = new Date(date.getFullYear(), date.getMonth(), 1);
      var j = this.dateFormat(d);
      self.readingDates = [];
      self.processedDates = [];
      var obj = {};
      obj.fromDate = j;
      obj.tankId = self.tank.value;

      self.showLoadingOnElement("calendar5", 1, "radius");
      var onSuccess = function (response) {
        self.processedDates = response.data;
        self.processedDates.forEach((item) => {
          if (item.openingStock < item.closingStock) {
            item.style =
              "background-color: #FB8B8B;width:12%;margin-left: 1%; text-align: center;font-size: 130%;";
          } else if (item.openingStock > item.closingStock) {
            item.style =
              "background-color: #70FF70;color: black;width:12%;margin-left: 1%; text-align: center;font-size: 130%;";
          } else {
            item.style =
              "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;";
          }
        });

        var closingDates = self.processedDates.map(function (item) {
          if (item.closingStockDate != "") {
            return {
              id: item.id + 22,
              startDate: item.date,
              endDate: item.date,
              title: "c/S - " + item.closingStock,
              style: item.style,
            };
          }
        });
        var openingDates = self.processedDates.map(function (item) {
          if (item.openingStockDate != "") {
            return {
              id: item.id,
              startDate: item.date,
              endDate: item.date,
              title: "o/S - " + item.openingStock,
              style:
                "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;",
            };
          }
        });

        for (var i = 0; i < closingDates.length; i++) {
          openingDates.push(closingDates[i]);
        }
        self.readingDates = openingDates;
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar5.$el);
      };
      self.$ajaxPost(
        self,
        "QuickViewCalendar/GetATGConsumption",
        obj,
        onSuccess,
        onFinally
      );
    },
    getViewATGStockReceived() {
      var self = this;
      var date = self.showDate;
      var d = new Date(date.getFullYear(), date.getMonth(), 1);
      var j = this.dateFormat(d);
      self.readingDates2 = [];
      self.processedDates2 = [];
      var obj = {};
      obj.fromDate = j;
      obj.tankId = self.tank2.value;

      self.showLoadingOnElement("calendar6", 1, "radius");
      var onSuccess = function (response) {
        self.processedDates2 = response.data;
        self.readingDates2 = self.processedDates2.map(function (item) {
          return {
            id: item.id,
            startDate: item.date,
            endDate: item.date,
            title: item.delivery == 0 ? "0" : item.delivery,
            style:
              "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;",
          };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar6.$el);
      };
      self.$ajaxPost(
        self,
        "QuickViewCalendar/GetATGConsumption",
        obj,
        onSuccess,
        onFinally
      );
    },

    getViewServiceDates(date) {
      var self = this;
      self.myLicense = [];
      self.showLoadingOnElement("calendar2", 1, "radius");
      var onSuccess = function (response) {
        self.serviceDates = response.data.map(function (item) {
          return {
            id: item.day,
            startDate: item.serviceDate,
            endDate: item.serviceDate,
            title: item.registration,
            style:
              "background-color: #FF9F43;width:12%;margin-left: 1%; text-align: center;font-size: 130%;",
          };
        });
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.calendar2.$el);
      };
      self.$ajaxGet(
        self,
        `QuickViewLicenseExpire/GetQuickViewServiceDates?&date=${self.dateFormat(date)}`,
        onSuccess,
        onFinally
      );
    },
    getViewLicenseExpireDetail(date) {
      var self = this;

      if (self.activeDashTab == 1) {
        self.showLoadingOnElement("calendar1", 1, "radius");
      } else if (self.activeDashTab == 2) {
        self.showLoadingOnElement("calendar2", 1, "radius");
      }

      var onSuccess = function (response) {
        self.formData.registration = response.data.registration;
        self.formData.name = response.data.name;
        self.formData.vin = response.data.vin;
        self.formData.engineNumber = response.data.engineNumber;
        self.formData.seriesName = response.data.seriesName;
        self.formData.licenseType = response.data.licenseType;
        self.formData.license = response.data.license;
        self.formData.licenseExpiryDate = response.data.licenseExpiryDate;
        self.formData.serviceInterval = response.data.serviceInterval;
        self.formData.serviceDate = response.data.serviceDate;
        self.formData.odometerReading = response.data.odometerReading;
        self.formData.odometerReadingDate = response.data.odometerReadingDate;
        self.formData.owner = response.data.owner;
        self.formData.assignedDriver = response.data.assignedDriver;
        self.formData.burnRateHigh = response.data.burnRateHigh;
        self.formData.burnRateLow = response.data.burnRateLow;
      };
      var onFinally = function () {
        if (self.activeDashTab == 1) {
          self.$vs.loading.close(self.$refs.calendar1.$el);
          self.activeEqpDetail = true;
        } else if (self.activeDashTab == 2) {
          self.$vs.loading.close(self.$refs.calendar2.$el);
          self.activeEqpDetail2 = true;
        }
      };
      self.$ajaxGet(
        self,
        `QuickViewLicenseExpire/GetQuickViewLicenseExpireDetail?&name=${date.title}`,
        onSuccess,
        onFinally
      );
    },
    getViewOperatorLicenseExpireDetail(date) {
      var self = this;
      if (self.activeDashTab == 3) {
        self.showLoadingOnElement("calendar3", 1, "radius");
      } else if (self.activeDashTab == 4) {
        self.showLoadingOnElement("calendar4", 1, "radius");
      }
      // self.showLoadingOnElement("calendar3", 1, "radius");
      var onSuccess = function (response) {
        self.operatorDetail.pdpexpiryDate = response.data.pdpexpiryDate;
        self.operatorDetail.email = response.data.email;
        self.operatorDetail.pdp = response.data.pdp;
        self.operatorDetail.residentialAddress = response.data.residentialAddress;
        self.operatorDetail.idNumber = response.data.idNumber;
        self.operatorDetail.cellphoneNr = response.data.cellphoneNr;
        self.operatorDetail.postalAddress = response.data.postalAddress;
        self.operatorDetail.license = response.data.license;
        self.operatorDetail.licenseExpiryDate = response.data.licenseExpiryDate;
        self.operatorDetail.licenseType = response.data.licenseType;
        self.operatorDetail.name = response.data.name;
        self.operatorDetail.tag = response.data.tag;
      };
      var onFinally = function () {
        if (self.activeDashTab == 3) {
          self.$vs.loading.close(self.$refs.calendar3.$el);
          self.activeOperatorDetail = true;
        } else if (self.activeDashTab == 4) {
          self.$vs.loading.close(self.$refs.calendar4.$el);
          self.activeOperatorDetail1 = true;
        }
      };
      self.$ajaxGet(
        self,
        `QuickViewLicenseExpire/GetQuickViewOperatorLicenseExpireDetail?&tag=${date.title}`,
        onSuccess,
        onFinally
      );
    },
    showATGDetail(date) {
      var self = this;
      var infoToShow = "";
      self.atgData = {};

      if (date.title.substring(0, 3) == "o/S") {
        infoToShow = self.processedDates.filter(function (item) {
          return item.id == date.id;
        })[0];
      } else if (date.title.substring(0, 3) == "c/S") {
        infoToShow = self.processedDates.filter(function (item) {
          return item.id == date.id - 22;
        })[0];
      }

      self.atgData = infoToShow;
      self.atgData.date = self.atgData.date.replace("T", " ").split(".")[0];
      self.atgData.openingStockDate = self.atgData.openingStockDate
        .replace("T", " ")
        .split(".")[0];
      self.atgData.closingStockDate = self.atgData.closingStockDate
        .replace("T", " ")
        .split(".")[0];
      self.tankPopup = true;
    },
    showATGStockReceived(date) {
      var self = this;
      var infoToShow = "";
      self.atgData = {};

      infoToShow = self.processedDates2.filter(function (item) {
        return item.id == date.id;
      })[0];
      if (infoToShow.delivery == 0) {
        self.atgData.delivery = "0";
      }
      self.atgData = infoToShow;
      self.atgData.date = self.atgData.date.replace("T", " ").split(".")[0];
      self.atgData.openingStockDate = self.atgData.openingStockDate
        .replace("T", " ")
        .split(".")[0];
      self.atgData.closingStockDate = self.atgData.closingStockDate
        .replace("T", " ")
        .split(".")[0];
      self.tankPopup = true;
    },
    successNotifyDataLoad() {
      this.$vs.notify({
        title: "Successfully",
        text: "Information successfully loaded",
        color: "success",
      });
    },

    formatDateMoment: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
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
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
<style>
@import "material.css";
</style>
