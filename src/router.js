import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      component: () => import('./layouts/main/SimpleLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: { template: '<div>Home</div>' }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
/*
import { createRouter, createWebHistory } from 'vue-router'
import auth from "@/auth/authService";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('./views/FAMSDashboard.vue'),
          meta: {
            title: 'Dashboard',
            rule: 'everybody',
          },
        },
        {
          path: '/dashboard/ecommerce',
          name: 'dashboard-ecommerce',
          component: () => import('./views/DashboardECommerce.vue'),
          meta: {
            rule: 'admin'
          }
        },
        // =============================================================================
        // Application Routes
        // =============================================================================
        {
          path: '/apps/todo',
          redirect: '/apps/todo/all',
          name: 'todo',
        },
        {
          path: '/apps/todo/:filter',
          component: () => import('./views/apps/todo/Todo.vue'),
          meta: {
            rule: 'admin',
            parent: "todo",
            no_scroll: true,
          }
        },
        {
          path: '/apps/chat',
          name: 'chat',
          component: () => import('./views/apps/chat/Chat.vue'),
          meta: {
            rule: 'admin',
            no_scroll: true,
          }
        },
        {
          path: '/apps/email',
          redirect: '/apps/email/inbox',
          name: 'email',
        },
        {
          path: '/apps/email/:filter',
          component: () => import('./views/apps/email/Email.vue'),
          meta: {
            rule: 'admin',
            parent: 'email',
            no_scroll: true,
          }
        },
        {
          path: '/apps/calendar/vue-simple-calendar',
          name: 'calendar-simple-calendar',
          component: () => import('./views/apps/calendar/SimpleCalendar.vue'),
          meta: {
            rule: 'admin',
            no_scroll: true,
          }
        },
        {
          path: '/apps/eCommerce/shop',
          name: 'ecommerce-shop',
          component: () => import('./views/apps/eCommerce/ECommerceShop.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce' },
              { title: 'Shop', active: true },
            ],
            pageTitle: 'Shop',
            rule: 'admin'
          }
        },
        {
          path: '/apps/eCommerce/wish-list',
          name: 'ecommerce-wish-list',
          component: () => import('./views/apps/eCommerce/ECommerceWishList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce', url: '/apps/eCommerce/shop' },
              { title: 'Wish List', active: true },
            ],
            pageTitle: 'Wish List',
            rule: 'admin'
          }
        },
        {
          path: '/apps/eCommerce/checkout',
          name: 'ecommerce-checkout',
          component: () => import('./views/apps/eCommerce/ECommerceCheckout.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce', url: '/apps/eCommerce/shop' },
              { title: 'Checkout', active: true },
            ],
            pageTitle: 'Checkout',
            rule: 'admin'
          }
        },
        {
          path: '/apps/eCommerce/item/',
          redirect: '/apps/eCommerce/item/5546604',
        },
        {
          path: '/apps/eCommerce/item/:item_id',
          name: 'ecommerce-item-detail-view',
          component: () => import('./views/apps/eCommerce/ECommerceItemDetailView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'eCommerce' },
              { title: 'Shop', url: { name: 'ecommerce-shop' } },
              { title: 'Item Details', active: true },
            ],
            parent: "ecommerce-item-detail-view",
            pageTitle: 'Item Details',
            rule: 'admin'
          }
        },
        {
          path: '/apps/user/user-list',
          name: 'app-user-list',
          component: () => import('@/views/apps/user/user-list/UserList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'List', active: true },
            ],
            pageTitle: 'User List',
            rule: 'admin'
          },
        },
        {
          path: '/apps/user/user-view/:userId',
          name: 'app-user-view',
          component: () => import('@/views/apps/user/UserView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'View', active: true },
            ],
            pageTitle: 'User View',
            rule: 'admin'
          },
        },
        {
          path: '/apps/user/user-edit/:userId',
          name: 'app-user-edit',
          component: () => import('@/views/apps/user/user-edit/UserEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User' },
              { title: 'Edit', active: true },
            ],
            pageTitle: 'User Edit',
            rule: 'admin'
          },
        },
        // =============================================================================
        // UI ELEMENTS
        // =============================================================================
        {
          path: '/QuickDispense',
          name: 'QuickDispense',
          component: () => import('./views/ui-elements/FAMSUI/QuickDispense.vue'),
          meta: {
            title: 'QuickDispense',
            pageTitle: 'FAMS Quick Disepnse view',
            rule: 'famsAllBasic'
          },
        },
        {
          path: '/QuickDispense24',
          name: 'QuickDispense24',
          component: () => import('./views/ui-elements/FAMSUI/QuickDispense24.vue'),
          meta: {
            title: 'QuickDispense24',
            pageTitle: 'FAMS Quick Disepnse view',
            rule: 'fams24Basic'
          },
        },
        {
          path: '/QuickChartView',
          name: 'Charts',
          component: () => import('./views/ui-elements/FAMSUI/QuickChartView.vue'),
          meta: {
            title: 'Quick Chart View',
            pageTitle: 'FAMS Quick ATG view',
            rule: 'quickReportViewers'
          },
        },
        {
          path: '/TankLevels',
          name: 'TankCharts',
          component: () => import('./views/ui-elements/FAMSUI/QuickATG.vue'),
          meta: {
            title: 'Quick ATG',
            pageTitle: 'FAMS Quick ATG view',
            rule: 'atg'
          },
        },
        {
          path: '/QuickCalendarView',
          name: 'QuickCalendar',
          component: () => import('./views/ui-elements/FAMSUI/QuickCalendarView.vue'),
          meta: {
            title: 'Quick CalendarView',
            pageTitle: 'FAMS Quick Calendar View',
            rule: 'quickReportViewers'
          },
        },
        {
          path: '/QuickBalancing',
          name: 'QuickBalancing',
          component: () => import('./views/ui-elements/FAMSUI/QuickBalancing.vue'),
          meta: {
            title: 'QuickBalancing',
            pageTitle: 'FAMS Quick Balancing view',
            rule: 'quickReportViewers'
          },
        },
        {
          path: '/QuickViewGPSInformation',
          name: 'QuickViewGPSInformation',
          component: () => import('./views/ui-elements/FAMSUI/QuickViewGPSInformation.vue'),
          meta: {
            title: 'QuickViewGPSInformation',
            pageTitle: 'FAMS Quick GPS view',
            rule: 'editor'
          },
        },
        {
          path: '/Documents',
          name: 'Documents',
          component: () => import('./views/ui-elements/FAMSUI/Documents.vue'),
          meta: {
            title: 'Document',
            pageTitle: 'Documents',
            rule: 'everybody'
          },
        },
        {
          path: '/Store',
          name: 'Store',
          component: () => import('./views/ui-elements/FAMSUI/Store.vue'),
          meta: {
            title: 'Store Setup',
            pageTitle: 'FAMS Store Setup / Configuration',
            rule: 'admin'
          },
        },
        {
          path: '/Tank',
          name: 'Tank',
          component: () => import('./views/ui-elements/FAMSUI/Tank.vue'),
          meta: {
            title: 'Tank Setup',
            pageTitle: 'FAMS Tank Setup / Configuration',
            rule: 'admin'
          },
        },
        {
          path: '/CostCentre',
          name: 'CostCentre',
          component: () => import('./views/ui-elements/FAMSUI/CostCentre.vue'),
          meta: {
            title: 'CostCentre Setup',
            pageTitle: 'FAMS CostCentre Setup / Configuration',
            rule: 'editor'
          },
        },
        {
          path: '/EqpExtras',
          name: 'EqpExtras',
          component: () => import('./views/ui-elements/FAMSUI/EquipmentExtras.vue'),
          meta: {
            title: 'Eqpuipment Extras',
            pageTitle: 'FAMS Eqpuipment Extras',
            rule: 'editor'
          },
        },
        {
          path: '/MasterEquipment',
          name: 'MasterEquipment',
          component: () => import('./views/ui-elements/FAMSUI/MasterEquipment.vue'),
          meta: {
            title: 'MasterEquipment Setup',
            pageTitle: 'FAMS MasterEquipment Setup / Configuration',
            rule: 'editor'
          },
        },
        {
          path: '/EquipmentAssets',
          name: 'Asset',
          component: () => import('./views/ui-elements/FAMSUI/EquipmentAssets.vue'),
          meta: {
            title: 'Asset Setup',
            pageTitle: 'Asset Setup / Configuration',
            rule: 'editor'
          },
        },
        {
          path: '/AllocationAssets',
          name: 'Asset - Link',
          component: () => import('./views/ui-elements/FAMSUI/AllocationAssets.vue'),
          meta: {
            title: 'Asset - Link',
            pageTitle: 'Asset - Link',
            rule: 'editor'
          },
        },
        {
          path: '/FiltersDispensing',
          name: 'Filters - Dispensing',
          component: () => import('./views/ui-elements/FAMSUI/FilterDispensing.vue'),
          meta: {
            title: 'Filters - Dispensing',
            pageTitle: 'FAMS Filters - Dispensing',
            rule: 'editor'
          },
        },
        {
          path: '/FiltersReceived',
          name: 'Filters - Received',
          component: () => import('./views/ui-elements/FAMSUI/FilterReceived.vue'),
          meta: {
            title: 'Filters - Received',
            pageTitle: 'FAMS Filters - Received',
            rule: 'editor'
          },
        },
        {
          path: '/FiltersReceivedMan',
          name: 'Filters - Received Man',
          component: () => import('./views/ui-elements/FAMSUI/FilterReceivedMan.vue'),
          meta: {
            title: 'Filters - Received Man',
            pageTitle: 'FAMS Filters - Received Man',
            rule: 'editor'
          },
        },
        {
          path: '/FiltersTransfer',
          name: 'Filters - Transfer',
          component: () => import('./views/ui-elements/FAMSUI/FilterTransfer.vue'),
          meta: {
            title: 'Filters - Transfer',
            pageTitle: 'FAMS Filters - Transfer',
            rule: 'editor'
          },
        },
        {
          path: '/FiltersAllocation',
          name: 'Filters - Allocation',
          component: () => import('./views/ui-elements/FAMSUI/FilterAllocation.vue'),
          meta: {
            title: 'Filters - Allocation',
            pageTitle: 'FAMS Filters - Allocation',
            rule: 'editor'
          },
        },
        {
          path: '/FilterGPSInformation',
          name: 'FilterGPSInformation',
          component: () => import('./views/ui-elements/FAMSUI/FilterGPSInformation.vue'),
          meta: {
            title: 'FilterGPSInformation',
            pageTitle: 'FAMS Fitler GPS Info',
            rule: 'editor'
          },
        },
        {
          path: '/DataImports',
          name: 'Data Imports',
          component: () => import('./views/ui-elements/FAMSUI/DataImports.vue'),
          meta: {
            title: 'Data Imports',
            pageTitle: 'FAMS Data Imports',
            rule: 'editor'
          },
        },
        {
          path: '/DataIntergrityChecks',
          name: 'Data Intergrity Checks',
          component: () => import('./views/ui-elements/FAMSUI/DataIntergrityChecks.vue'),
          meta: {
            title: 'Data Intergrity Checks',
            pageTitle: 'FAMS Data Intergrity Checks',
            rule: 'editor'
          },
        },
        {
          path: '/ExportINIFile',
          name: 'Export INI File',
          component: () => import('./views/ui-elements/FAMSUI/ExportINIFile.vue'),
          meta: {
            title: 'Export INI File',
            pageTitle: 'FAMS Export INI File',
            rule: 'editor'
          },
        },
        {
          path: '/PBAnalytics',
          name: 'PBAnalytics',
          component: () => import('./views/ui-elements/FAMSUI/PBAnalytics.vue'),
          meta: {
            title: 'PBAnalytics',
            pageTitle: 'Analytics information - logged in user',
            rule: 'admin'
          },
        },
        {
          path: '/StandardReportListBold',
          name: 'StandardReportListBold',
          component: () => import('./views/ui-elements/FAMSUI/StandardReportListBold.vue'),
          meta: {
            title: 'Standard Reports',
            pageTitle: 'Standard Reports List page',
            rule: 'admin'
          },
        },
        {
          path: '/ReportList',
          name: 'ReportList',
          component: () => import('./views/ui-elements/FAMSUI/ReportList.vue'),
          meta: {
            title: 'FAMS Reports',
            pageTitle: 'Reports List page',
            rule: 'allFamsUserM'
          },
        },
        {
          path: '/Allocation',
          name: 'Allocation',
          component: () => import('./views/ui-elements/FAMSUI/Allocation.vue'),
          meta: {
          title: 'Allocation',
            pageTitle: 'Allocation',
            rule: 'famsManager'
          },
        },
        {
          path: '/Equipment',
          name: 'Equipment',
          component: () => import('./views/ui-elements/FAMSUI/Equipment.vue'),
          meta: {
            title: 'Equipment',
            pageTitle: 'Equipment Configuration page',
            rule: 'famsManager'
          },
        },
        {
          path: '/EquipmentFAMS24',
          name: 'EquipmentFAMS24',
          component: () => import('./views/ui-elements/FAMSUI/EquipmentFAMS24.vue'),
          meta: {
            title: 'F24Eqp',
            pageTitle: 'Equipment Cloud Configuration page',
            rule: 'fams24Manager'
          },
        },
        {
          path: '/Employee',
          name: 'Employee',
          component: () => import('./views/ui-elements/FAMSUI/Operator.vue'),
          meta: {
            title:'Employee',
            pageTitle: 'Employee Configuration page',
            rule: 'famsManager',
          },
        },
        {
          path: '/EmployeeFAMS24',
          name: 'EmployeeFAMS24',
          component: () => import('./views/ui-elements/FAMSUI/OperatorFAMS24.vue'),
          meta: {
            title:'F24Empl',
            pageTitle: 'Employee Configuration page',
            rule: 'fams24Manager',
          },
        },
        {
          path: '/F24BusinessRules',
          name: 'F24BusinessRules',
          component: () => import('./views/ui-elements/FAMSUI/F24BusinessRules.vue'),
          meta: {
          title: 'F24BusRule',
            pageTitle: 'F24BusinessRules',
            rule: 'fams24Manager'
          },
        },
        {
          path: '/Equipmentcopy',
          name: 'Equipmentcopy',
          component: () => import('./views/ui-elements/FAMSUI/Equipment copy.vue'),
          meta: {
            title: 'Equipmentcopy',
            pageTitle: 'Equipment Configuration page',
            rule: 'fams24Manager'
          },
        },
        {
          path: '/ReportSchedule',
          name: 'ReportSchedule',
          component: () => import('./views/ui-elements/FAMSUI/ReportSchedule.vue'),
          meta: {
          title: 'ReportSchedule',
            pageTitle: 'ReportSchedule',
            rule: 'admin'
          },
        },
        {
          path: '/ReportHistory',
          name: 'ReportHistory',
          component: () => import('./views/ui-elements/FAMSUI/ReportHistory.vue'),
          meta: {
          title: 'Report History',
            pageTitle: 'Report History',
            rule: 'admin'
          },
        },
        {
          path: '/Exceptions',
          name: 'Exceptions',
          component: () => import('./views/ui-elements/FAMSUI/Exceptions.vue'),
          meta: {
          title: 'Exceptions',
            pageTitle: 'Exceptions',
            rule: 'admin'
          },
        },
        {
          path: '/ExceptionHistory',
          name: 'ExceptionHistory',
          component: () => import('./views/ui-elements/FAMSUI/ExceptionHistory.vue'),
          meta: {
          title: 'Exception History',
            pageTitle: 'Exception History',
            rule: 'admin'
          },
        },
        {
          path: '/AuditLogs',
          name: 'AuditLogs',
          component: () => import('./views/ui-elements/FAMSUI/AuditLogs.vue'),
          meta: {
          title: 'Audit Logs',
            pageTitle: 'Audit Logs',
            rule: 'admin'
          },
        },
        {
          path: '/StoreLocator',
          name: 'StoreLocator',
          component: () => import('./views/ui-elements/FAMSUI/StoreLocator.vue'),
          meta: {
          title: 'Quick Map view',
            pageTitle: 'Quick Map view',
            rule: 'admin'
          },
        },
        {
          path: '/CustomReport',
          name: 'CustomReport',
          component: () => import('./views/ui-elements/FAMSUI/CustomReport.vue'),
          meta: {
          title: 'Custom Report',
            pageTitle: 'Custom Report',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/SystemReport',
          name: 'SystemReport',
          component: () => import('./views/ui-elements/FAMSUI/SystemReport.vue'),
          meta: {
          title: 'System Standard Report',
            pageTitle: 'System Standard Report',
            rule: 'ThebigBoss'
          },
        },
         {
          path: '/StandardReportAdminList',
          name: 'StandardReportAdminList',
          component: () => import('./views/ui-elements/FAMSUI/StandardReportAdminList.vue'),
          meta: {
            title: 'Standard Reports',
            pageTitle: 'Standard Reports List page',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/Account',
          name: 'Account',
          component: () => import('./views/ui-elements/FAMSUI/Account.vue'),
          meta: {
            title:'Account',
            pageTitle: 'Account Configuration page',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/StoreVPN',
          name: 'StoreVPN',
          component: () => import('./views/ui-elements/FAMSUI/StoreVPN.vue'),
          meta:. {
            title: 'StoreVPN Setup',
            pageTitle: 'FAMS Store StoreVPN Setup / Configuration',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/User',
          name: 'User',
          component: () => import('./views/ui-elements/FAMSUI/Users.vue'),
          meta: {
            title:'User',
            pageTitle: 'User Configuration page',
            rule: 'admin'
          },
        },
        {
          path: '/UsersAdmin',
          name: 'UsersAdmin',
          component: () => import('./views/ui-elements/FAMSUI/UsersAdmin.vue'),
          meta: {
            title:'User Admin',
            pageTitle: 'User Administrator Configuration page',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/PowerbiAdmin',
          name: 'PowerbiAdmin',
          component: () => import('./views/ui-elements/FAMSUI/PowerbiAdmin.vue'),
          meta: {
            title: 'Analytics Setup',
            pageTitle: 'Analytics information - The Bigboss only',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/accounts',
          name: 'accounts',
          component: () => import('./views/ui-elements/saleshunter/AccountList.vue'),
          meta: {
            title:'Account',
            pageTitle: 'Account',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/messageAccount',
          name: 'MessageAccount',
          component: () => import('./views/ui-elements/FAMSUI/MessageAccount.vue'),
          meta: {
            title:'Message Notification',
            pageTitle: 'MessageAccount',
            rule: 'ThebigBoss'
          },
        },
        ////Incidedent View
        {
          path: '/IncidentReport',
          name: 'IncidentReport',
          component: () => import('./views/ui-elements/FAMSUI/IncidentReport.vue'),
          meta: {
            title: 'Incident Report',
            pageTitle: 'Incident Report',
            rule: 'admin'
          },
        },
        {
          path: '/Subscription',
          name: 'Subscription',
          component: () => import('./views/ui-elements/FAMSUI/Subscription.vue'),
          meta: {
            title:'Subscription',
            pageTitle: 'Subscription',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/SubscriptionReport',
          name: 'SubscriptionReport',
          component: () => import('./views/ui-elements/FAMSUI/SubscriptionReport.vue'),
          meta: {
            title:'Subscription Report',
            pageTitle: 'Subscription Report',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/ManageSubscription',
          name: 'ManageSubscription',
          component: () => import('./views/ui-elements/FAMSUI/ManageSubscription.vue'),
          meta: {
            title:'Subscription',
            pageTitle: 'Subscription',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/ViewSubscription',
          name: 'ViewSubscription',
          component: () => import('./views/ui-elements/FAMSUI/ViewSubscription.vue'),
          meta: {
            title:'View Subscription',
            pageTitle: 'View Subscription',
            rule: 'admin'
          },
        },
        {
          path: '/IntegrationSetup',
          name: 'IntegrationSetup',
          component: () => import('./views/ui-elements/FAMSUI/IntegrationSetup.vue'),
          meta: {
            title:'Integration',
            pageTitle: 'Integration',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/Integration',
          name: 'Integration',
          component: () => import('./views/ui-elements/FAMSUI/Integration.vue'),
          meta: {
            title:'Integration',
            pageTitle: 'Integration',
            rule: 'admin'
          },
        },
        {
          path: '/FamsCommands',
          name: 'FamsCommands',
          component: () => import('./views/ui-elements/FAMSUI/FamsCommands.vue'),
          meta: {
            title:'Fams Commands',
            pageTitle: 'Fams Commands',
            rule: 'admin'
          },
        },
        {
          path: '/ManageIntegration',
          name: 'ManageIntegration',
          component: () => import('./views/ui-elements/FAMSUI/ManageIntegration.vue'),
          meta: {
            title:'Manage Integration',
            pageTitle: 'Manage Integration',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/Diagnostic',
          name: 'Diagnostic',
          component: () => import('./views/ui-elements/FAMSUI/Diagnostic.vue'),
          meta: {
            title:'Diagnostic',
            pageTitle: 'Diagnostic',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/SAP',
          name: 'SAP',
          component: () => import('./views/ui-elements/FAMSUI/SAPView.vue'),
          meta: {
            title:'SAP',
            pageTitle: 'SAP',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/ScanTags',
          name: 'ScanTags',
          component: () => import('./views/ui-elements/FAMSUI/ScanTags.vue'),
          meta: {
            title:'Scan Tags',
            pageTitle: 'Scan Tags',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/SumniConfig',
          name: 'SumniConfig',
          component: () => import('./views/ui-elements/FAMSUI/SumniConfig.vue'),
          meta: {
            title:'Sumni Config',
            pageTitle: 'Sumni Config',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/iotSetup',
          name: 'IOT Setup',
          component: () => import('./views/ui-elements/FAMSUI/IotSetup.vue'),
          meta: {
            title:'IOT Setup',
            pageTitle: 'IOT Setup',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/OTRDevices',
          name: 'OTRDevices',
          component: () => import('./views/ui-elements/FAMSUI/OtrDevices.vue'),
          meta: {
            title:'OTR Devices',
            pageTitle: 'OTR Devices',
            rule: 'admin'
          },
        },
        {
          path: '/RestoreDeleted',
          name: 'RestoreDeleted',
          component: () => import('./views/ui-elements/FAMSUI/RestoreDeleted.vue'),
          meta: {
            title:'Restore Deleted',
            pageTitle: 'Restore Deleted',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/MLUpload',
          name: 'MLUpload',
          component: () => import('./views/ui-elements/FAMSUI/TestAzML.vue'),
          meta: {
            title:'MLUpload',
            pageTitle: 'MLUpload',
            rule: 'ThebigBoss'
          },
        },
        {
          path: '/QuickPivot',
          name: 'QuickPivot',
          component: () => import('./views/ui-elements/FAMSUI/FamsPandas.vue'),
          meta: {
            title:'QuickPivot',
            pageTitle: 'QuickPivot',
            rule: 'famsAllBasic'
          },
        },
        {
          path: '/UserContactInformation',
          name: 'UserContactInformation',
          component: () => import('./views/ui-elements/FAMSUI/UserContactInfo.vue'),
          meta: {
            title:'UserContactInformation',
            pageTitle: 'UserContactInformation',
            rule: 'admin'
          },
        },
        {
          path: '/customAlloc',
          name: 'AllocationCustom',
          component: () => import('./views/ui-elements/FAMSUI/AllocationCustom.vue'),
          meta: {
            title:'AllocationCustom',
            pageTitle: 'AllocationCustom',
            rule: 'famsManager'
          },
        },
        {
          path: '/andrescratch',
          name: 'andrescratch',
          component: () => import('./views/ui-elements/saleshunter/andrescratch.vue'),
          meta: {
            pageTitle: 'andrescratch',
            rule: 'admin'
          },
        },
        {
          path: '/AccountSelect',
          name: 'AccountSelect',
          component: () => import('./views/ui-elements/saleshunter/AccountSelect.vue'),
          meta: {
            title:'AccountSelect',
            pageTitle: 'AccountSelect',
            rule: 'admin'
          },
        },
        {
          path: '/AccountCard',
          name: 'AccountCard',
          component: () => import('./views/ui-elements/saleshunter/AccountCard.vue'),
          meta: {
            pageTitle: 'AccountCard',
            rule: 'admin'
          },
        },
        {
          path: '/products',
          name: 'productlist',
          component: () => import('./views/ui-elements/saleshunter/ProductList.vue'),
          meta: {
            pageTitle: 'Products',
            rule: 'admin'
          },
        },
        {
          path: '/Documentlist',
          name: 'Documentlist',
          component: () => import('./views/ui-elements/saleshunter/Documentlist.vue'),
          meta: {
            pageTitle: 'System Documentation',
            rule: 'admin'
          },
        },
        {
          path: '/DocumenttoCustomer',
          name: 'DocumenttoCustomer',
          component: () => import('./views/ui-elements/saleshunter/DocumenttoCustomer.vue'),
          meta: {
            pageTitle: 'Assign System documents to customer',
            rule: 'admin'
          },
        },
        {
          path: '/DocumentCustomer',
          name: 'DocumentCustomer',
          component: () => import('./views/ui-elements/saleshunter/DocumentCustomer.vue'),
          meta: {
            pageTitle: 'Customer Documentation',
            rule: 'admin'
          },
        },
        {
          path: '/DailyReportofCall',
          name: 'DailyReportofCall',
          component: () => import('./views/ui-elements/saleshunter/DailyReportofCall.vue'),
          meta: {
            pageTitle: 'Daily Report of Call - Sales & Marketing developers',
            rule: 'admin'
          },
        },
        {
          path: '/customers',
          name: 'customerlist',
          component: () => import('./views/ui-elements/saleshunter/CustomerList.vue'),
          meta: {
            pageTitle: 'Customers',
            rule: 'admin'
          },
        },
        {
          path: '/Customersitelist',
          name: 'Customersitelist',
          component: () => import('./views/ui-elements/saleshunter/Customersitelist.vue'),
          meta: {
            pageTitle: 'Customer site information',
            rule: 'admin'
          },
        },
        {
          path: '/viewquotations',
          name: 'quotationviewer',
          component: () => import('./views/ui-elements/saleshunter/QuotationViewer.vue'),
          meta: {
            pageTitle: 'Quotation Viewer',
            rule: 'admin'
          },
        },
        {
          path: '/quotation',
          name: 'quotationlayout',
          component: () => import('./views/ui-elements/saleshunter/QuotationLayout.vue'),
          meta: {
            pageTitle: 'Quotation',
            rule: 'admin'
          },
        },
        {
          path: '/quotations',
          name: 'quotationlist',
          component: () => import('./views/ui-elements/saleshunter/Quotationlist.vue'),
          meta: {
            pageTitle: 'Quotations',
            rule: 'admin'
          },
        },
        {
          path: '/DispensingTransfers',
          name: 'Integrity - Manual Entry',
          component: () => import('./views/ui-elements/FAMSUI/DispensingTransfers.vue'),
          meta: {
            title:'Dispensing Transfers',
            pageTitle: 'Dispensing/Transfers page',
            rule: 'allFamsUser'
          },
        },
        {
          path: '/ui-elements/data-list/list-view',
          name: 'data-list-list-view',
          component: () => import('@/views/ui-elements/data-list/list-view/DataListListView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Data List' },
              { title: 'List View', active: true },
            ],
            pageTitle: 'List View',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/data-list/thumb-view',
          name: 'data-list-thumb-view',
          component: () => import('@/views/ui-elements/data-list/thumb-view/DataListThumbView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Data List' },
              { title: 'Thumb View', active: true },
            ],
            pageTitle: 'Thumb View',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/grid/vuesax',
          name: 'grid-vuesax',
          component: () => import('@/views/ui-elements/grid/vuesax/GridVuesax.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Grid' },
              { title: 'Vuesax', active: true },
            ],
            pageTitle: 'Grid',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/grid/tailwind',
          name: 'grid-tailwind',
          component: () => import('@/views/ui-elements/grid/tailwind/GridTailwind.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Grid' },
              { title: 'Tailwind', active: true },
            ],
            pageTitle: 'Tailwind Grid',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/colors',
          name: 'colors',
          component: () => import('./views/ui-elements/colors/Colors.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Colors', active: true },
            ],
            pageTitle: 'Colors',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/card/basic',
          name: 'basic-cards',
          component: () => import('./views/ui-elements/card/CardBasic.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Basic Cards', active: true },
            ],
            pageTitle: 'Basic Cards',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/card/statistics',
          name: 'statistics-cards',
          component: () => import('./views/ui-elements/card/CardStatistics.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Statistics Cards', active: true },
            ],
            pageTitle: 'Statistics Card',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/card/analytics',
          name: 'analytics-cards',
          component: () => import('./views/ui-elements/card/CardAnalytics.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Analytics Card', active: true },
            ],
            pageTitle: 'Analytics Card',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/card/card-actions',
          name: 'card-actions',
          component: () => import('./views/ui-elements/card/CardActions.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Card Actions', active: true },
            ],
            pageTitle: 'Card Actions',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/card/card-colors',
          name: 'card-colors',
          component: () => import('./views/ui-elements/card/CardColors.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Card' },
              { title: 'Card Colors', active: true },
            ],
            pageTitle: 'Card Colors',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/table',
          name: 'table',
          component: () => import('./views/ui-elements/table/Table.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Table', active: true },
            ],
            pageTitle: 'Table',
            rule: 'admin'
          },
        },
        {
          path: '/ui-elements/ag-grid-table',
          name: 'ag-grid-table',
          component: () => import('./views/ui-elements/ag-grid-table/AgGridTable.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'agGrid Table', active: true },
            ],
            pageTitle: 'agGrid Table',
            rule: 'admin'
          },
        },
        // =============================================================================
        // COMPONENT ROUTES
        // =============================================================================
        {
          path: '/components/alert',
          name: 'component-alert',
          component: () => import('@/views/components/vuesax/alert/Alert.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Alert', active: true },
            ],
            pageTitle: 'Alert',
            rule: 'admin'
          },
        },
        {
          path: '/components/avatar',
          name: 'component-avatar',
          component: () => import('@/views/components/vuesax/avatar/Avatar.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Avatar', active: true },
            ],
            pageTitle: 'Avatar',
            rule: 'admin'
          },
        },
        {
          path: '/components/breadcrumb',
          name: 'component-breadcrumb',
          component: () => import('@/views/components/vuesax/breadcrumb/Breadcrumb.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Breadcrumb', active: true },
            ],
            pageTitle: 'Breadcrumb',
            rule: 'admin'
          },
        },
        {
          path: '/components/button',
          name: 'component-button',
          component: () => import('@/views/components/vuesax/button/Button.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Button', active: true },
            ],
            pageTitle: 'Button',
            rule: 'admin'
          },
        },
        {
          path: '/components/button-group',
          name: 'component-button-group',
          component: () => import('@/views/components/vuesax/button-group/ButtonGroup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Button Group', active: true },
            ],
            pageTitle: 'Button Group',
            rule: 'admin'
          },
        },
        {
          path: '/components/chip',
          name: 'component-chip',
          component: () => import('@/views/components/vuesax/chip/Chip.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Chip', active: true },
            ],
            pageTitle: 'Chip',
            rule: 'admin'
          },
        },
        {
          path: '/components/collapse',
          name: 'component-collapse',
          component: () => import('@/views/components/vuesax/collapse/Collapse.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Collapse', active: true },
            ],
            pageTitle: 'Collapse',
            rule: 'admin'
          },
        },
        {
          path: '/components/dialogs',
          name: 'component-dialog',
          component: () => import('@/views/components/vuesax/dialogs/Dialogs.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Dialogs', active: true },
            ],
            pageTitle: 'Dialogs',
            rule: 'admin'
          },
        },
        {
          path: '/components/divider',
          name: 'component-divider',
          component: () => import('@/views/components/vuesax/divider/Divider.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Divider', active: true },
            ],
            pageTitle: 'Divider',
            rule: 'admin'
          },
        },
        {
          path: '/components/dropdown',
          name: 'component-drop-down',
          component: () => import('@/views/components/vuesax/dropdown/Dropdown.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Dropdown', active: true },
            ],
            pageTitle: 'Dropdown',
            rule: 'admin'
          },
        },
        {
          path: '/components/list',
          name: 'component-list',
          component: () => import('@/views/components/vuesax/list/List.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'List', active: true },
            ],
            pageTitle: 'List',
            rule: 'admin'
          },
        },
        {
          path: '/components/loading',
          name: 'component-loading',
          component: () => import('@/views/components/vuesax/loading/Loading.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Loading', active: true },
            ],
            pageTitle: 'Loading',
            rule: 'admin'
          },
        },
        {
          path: '/components/navbar',
          name: 'component-navbar',
          component: () => import('@/views/components/vuesax/navbar/Navbar.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Navbar', active: true },
            ],
            pageTitle: 'Navbar',
            rule: 'admin'
          },
        },
        {
          path: '/components/notifications',
          name: 'component-notifications',
          component: () => import('@/views/components/vuesax/notifications/Notifications.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Notifications', active: true },
            ],
            pageTitle: 'Notifications',
            rule: 'admin'
          },
        },
        {
          path: '/components/pagination',
          name: 'component-pagination',
          component: () => import('@/views/components/vuesax/pagination/Pagination.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Pagination', active: true },
            ],
            pageTitle: 'Pagination',
            rule: 'admin'
          },
        },
        {
          path: '/components/popup',
          name: 'component-popup',
          component: () => import('@/views/components/vuesax/popup/Popup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Popup', active: true },
            ],
            pageTitle: 'Popup',
            rule: 'admin'
          },
        },
        {
          path: '/components/progress',
          name: 'component-progress',
          component: () => import('@/views/components/vuesax/progress/Progress.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Progress', active: true },
            ],
            pageTitle: 'Progress',
            rule: 'admin'
          },
        },
        {
          path: '/components/sidebar',
          name: 'component-sidebar',
          component: () => import('@/views/components/vuesax/sidebar/Sidebar.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Sidebar', active: true },
            ],
            pageTitle: 'Sidebar',
            rule: 'admin'
          },
        },
        {
          path: '/components/slider',
          name: 'component-slider',
          component: () => import('@/views/components/vuesax/slider/Slider.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Slider', active: true },
            ],
            pageTitle: 'Slider',
            rule: 'admin'
          },
        },
        {
          path: '/components/tabs',
          name: 'component-tabs',
          component: () => import('@/views/components/vuesax/tabs/Tabs.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Tabs', active: true },
            ],
            pageTitle: 'Tabs',
            rule: 'admin'
          },
        },
        {
          path: '/components/tooltip',
          name: 'component-tooltip',
          component: () => import('@/views/components/vuesax/tooltip/Tooltip.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Tooltip', active: true },
            ],
            pageTitle: 'Tooltip',
            rule: 'admin'
          },
        },
        {
          path: '/components/upload',
          name: 'component-upload',
          component: () => import('@/views/components/vuesax/upload/Upload.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Components' },
              { title: 'Upload', active: true },
            ],
            pageTitle: 'Upload',
            rule: 'admin'
          },
        },
        // =============================================================================
        // FORMS
        // =============================================================================
        // =============================================================================
        // FORM ELEMENTS
        // =============================================================================
        {
          path: '/forms/form-elements/select',
          name: 'form-element-select',
          component: () => import('./views/forms/form-elements/select/Select.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Select', active: true },
            ],
            pageTitle: 'Select',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-elements/switch',
          name: 'form-element-switch',
          component: () => import('./views/forms/form-elements/switch/Switch.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Switch', active: true },
            ],
            pageTitle: 'Switch',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-elements/checkbox',
          name: 'form-element-checkbox',
          component: () => import('./views/forms/form-elements/checkbox/Checkbox.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Checkbox', active: true },
            ],
            pageTitle: 'Checkbox',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-elements/radio',
          name: 'form-element-radio',
          component: () => import('./views/forms/form-elements/radio/Radio.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Radio', active: true },
            ],
            pageTitle: 'Radio',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-elements/input',
          name: 'form-element-input',
          component: () => import('./views/forms/form-elements/input/Input.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Input', active: true },
            ],
            pageTitle: 'Input',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-elements/number-input',
          name: 'form-element-number-input',
          component: () => import('./views/forms/form-elements/number-input/NumberInput.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Number Input', active: true },
            ],
            pageTitle: 'Number Input',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-elements/textarea',
          name: 'form-element-textarea',
          component: () => import('./views/forms/form-elements/textarea/Textarea.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Form Elements' },
              { title: 'Textarea', active: true },
            ],
            pageTitle: 'Textarea',
            rule: 'admin'
          },
        },
        // -------------------------------------------------------------------------------------------------------------------------------------------
        {
          path: '/forms/form-layouts',
          name: 'forms-form-layouts',
          component: () => import('@/views/forms/FormLayouts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Forms' },
              { title: 'Form Layouts', active: true },
            ],
            pageTitle: 'Form Layouts',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-wizard',
          name: 'extra-component-form-wizard',
          component: () => import('@/views/forms/form-wizard/FormWizard.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Wizard', active: true },
            ],
            pageTitle: 'Form Wizard',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-validation',
          name: 'extra-component-form-validation',
          component: () => import('@/views/forms/form-validation/FormValidation.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Validation', active: true },
            ],
            pageTitle: 'Form Validation',
            rule: 'admin'
          },
        },
        {
          path: '/forms/form-input-group',
          name: 'extra-component-form-input-group',
          component: () => import('@/views/forms/form-input-group/FormInputGroup.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Form Input Group', active: true },
            ],
            pageTitle: 'Form Input Group',
            rule: 'admin'
          },
        },
        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true },
            ],
            pageTitle: 'Profile',
            rule: 'admin'
          },
        },
        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true },
            ],
            pageTitle: 'Settings',
            rule: 'admin'
          },
        },
        {
          path: '/pages/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'FAQ', active: true },
            ],
            pageTitle: 'FAQ',
            rule: 'admin'
          },
        },
        {
          path: '/pages/knowledge-base',
          name: 'page-knowledge-base',
          component: () => import('@/views/pages/KnowledgeBase.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', active: true },
            ],
            pageTitle: 'KnowledgeBase',
            rule: 'admin'
          },
        },
        {
          path: '/pages/knowledge-base/category',
          name: 'page-knowledge-base-category',
          component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', active: true },
            ],
            parent: 'page-knowledge-base',
            rule: 'admin'
          },
        },
        {
          path: '/pages/knowledge-base/category/question',
          name: 'page-knowledge-base-category-question',
          component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', url: '/pages/knowledge-base/category' },
              { title: 'Question', active: true },
            ],
            parent: 'page-knowledge-base',
            rule: 'admin'
          },
        },
        {
          path: '/pages/search',
          name: 'page-search',
          component: () => import('@/views/pages/Search.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Search', active: true },
            ],
            pageTitle: 'Search',
            rule: 'admin'
          },
        },
        {
          path: '/pages/invoice',
          name: 'page-invoice',
          component: () => import('@/views/pages/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Invoice', active: true },
            ],
            pageTitle: 'Invoice',
            rule: 'admin'
          },
        },
        // =============================================================================
        // CHARTS & MAPS
        // =============================================================================
        {
          path: '/charts-and-maps/charts/apex-charts',
          name: 'extra-component-charts-apex-charts',
          component: () => import('@/views/charts-and-maps/charts/apex-charts/ApexCharts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'Apex Charts', active: true },
            ],
            pageTitle: 'Apex Charts',
            rule: 'admin'
          },
        },
        {
          path: '/charts-and-maps/charts/chartjs',
          name: 'extra-component-charts-chartjs',
          component: () => import('@/views/charts-and-maps/charts/chartjs/Chartjs.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'chartjs', active: true },
            ],
            pageTitle: 'chartjs',
            rule: 'admin'
          },
        },
        {
          path: '/charts-and-maps/charts/echarts',
          name: 'extra-component-charts-echarts',
          component: () => import('@/views/charts-and-maps/charts/echarts/Echarts.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Charts & Maps' },
              { title: 'echarts', active: true },
            ],
            pageTitle: 'echarts',
            rule: 'admin'
          },
        },
        // =============================================================================
        // EXTENSIONS
        // =============================================================================
        {
          path: '/extensions/select',
          name: 'extra-component-select',
          component: () => import('@/views/components/extra-components/select/Select.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Select', active: true },
            ],
            pageTitle: 'Select',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/quill-editor',
          name: 'extra-component-quill-editor',
          component: () => import('@/views/components/extra-components/quill-editor/QuillEditor.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Quill Editor', active: true },
            ],
            pageTitle: 'Quill Editor',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/drag-and-drop',
          name: 'extra-component-drag-and-drop',
          component: () => import('@/views/components/extra-components/drag-and-drop/DragAndDrop.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Drag & Drop', active: true },
            ],
            pageTitle: 'Drag & Drop',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/datepicker',
          name: 'extra-component-datepicker',
          component: () => import('@/views/components/extra-components/datepicker/Datepicker.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Datepicker', active: true },
            ],
            pageTitle: 'Datepicker',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/datetime-picker',
          name: 'extra-component-datetime-picker',
          component: () => import('@/views/components/extra-components/datetime-picker/DatetimePicker.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extra Components' },
              { title: 'Datetime Picker', active: true },
            ],
            pageTitle: 'Datetime Picker',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/access-control',
          name: 'extra-component-access-control',
          component: () => import('@/views/components/extra-components/access-control/AccessControl.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Access Control', active: true },
            ],
            pageTitle: 'Access Control',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/i18n',
          name: 'extra-component-i18n',
          component: () => import('@/views/components/extra-components/I18n.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'I18n', active: true },
            ],
            pageTitle: 'I18n',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/carousel',
          name: 'extra-component-carousel',
          component: () => import('@/views/components/extra-components/carousel/Carousel.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Carousel', active: true },
            ],
            pageTitle: 'Carousel',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/clipboard',
          name: 'extra-component-clipboard',
          component: () => import('@/views/components/extra-components/clipboard/Clipboard.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Clipboard', active: true },
            ],
            pageTitle: 'Clipboard',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/context-menu',
          name: 'extra-component-context-menu',
          component: () => import('@/views/components/extra-components/context-menu/ContextMenu.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Context Menu', active: true },
            ],
            pageTitle: 'Context Menu',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/star-ratings',
          name: 'extra-component-star-ratings',
          component: () => import('@/views/components/extra-components/star-ratings/StarRatings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Star Ratings', active: true },
            ],
            pageTitle: 'Star Ratings',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/autocomplete',
          name: 'extra-component-autocomplete',
          component: () => import('@/views/components/extra-components/autocomplete/Autocomplete.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Autocomplete', active: true },
            ],
            pageTitle: 'Autocomplete',
            rule: 'admin'
          },
        },
        {
          path: '/extensions/tree',
          name: 'extra-component-tree',
          component: () => import('@/views/components/extra-components/tree/Tree.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Tree', active: true },
            ],
            pageTitle: 'Tree',
            rule: 'admin'
          },
        },
        {
          path: '/import-export/import',
          name: 'import-excel',
          component: () => import('@/views/components/extra-components/import-export/Import.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Import', active: true },
            ],
            pageTitle: 'Import Excel',
            rule: 'admin'
          },
        },
        {
          path: '/import-export/export',
          name: 'export-excel',
          component: () => import('@/views/components/extra-components/import-export/Export.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Export', active: true },
            ],
            pageTitle: 'Export Excel',
            rule: 'admin'
          },
        },
        {
          path: '/import-export/export-selected',
          name: 'export-excel-selected',
          component: () => import('@/views/components/extra-components/import-export/ExportSelected.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Extensions' },
              { title: 'Import/Export' },
              { title: 'Export Selected', active: true },
            ],
            pageTitle: 'Export Excel',
            rule: 'admin'
          },
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '/selectaccount',
      name: 'selectaccount',
      component: () => import('./views/ui-elements/FAMSUI/selectaccount.vue'),
      meta: {
        pageTitle: 'FAMS Account selection',
        rule: 'everybody'
      },
    },
    {
      path: '/fullpagedashboard',
      name: 'fullpagedashboard',
      component: () => import('./layouts/full-page/FullPageDashboard.vue'),
      meta: {
        pageTitle: 'FAMS Full PageDashboard',
        rule: 'allFamsUserL'
      },
    },
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'user'
          }
        },
        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'admin'
          }
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '/:pathMatch(.*)*',
      redirect: '/pages/error-404'
    }
  ],
})
router.onError(error => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    window.location.reload()
  }
})
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})
router.beforeEach((to, from, next) => {
  if (
    to.path === "/pages/login" ||
    to.path === "/pages/forgot-password" ||
    to.path === "/pages/error-404" ||
    to.path === "/pages/error-500" ||
    to.path === "/pages/register" ||
    to.path === "/callback" ||
    to.path === "/pages/comingsoon" ||
    to.path === "/dashboard/Test" ||
    (sessionStorage.accessToken)
  ) {
    return next();
  }
  router.push({ path: '/pages/login', query: { to: to.path } });
  return next();
});
export default router
*/
