/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// import './globals'
import Vue from 'vue'
import App from './App.vue'

import closeLoader from '../src/views/pages/login/LoginFirebase.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// axios
import axios from "./axios.js"
Vue.prototype.$http = axios

// API Calls
import "./http/requests"

// mock
import "./fake-db/index.js"

// Theme Configurations
import '../themeConfig.js'

// import { registerLicense } from '@syncfusion/ej2-base';

// import { PivotViewPlugin } from "@syncfusion/ej2-vue-pivotview";

// Vue.use(PivotViewPlugin);
// registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9cc3RQQ2JdVkVxVko=');

// Auth0 Plugin
import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);

import Element from 'element-ui'
Vue.use(Element);
// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'


// Vuexy Admin Filters
import './filters/filters'

// // V-Uploader
// import vUploader from 'v-uploader';

// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

import RouterTab from 'vue-router-tab'
import { RouterTabRoutes } from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'
Vue.use(RouterTab)
Vue.use(RouterTabRoutes)


// Tour
import VueTour from 'vue-tour'
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')


// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: 'AIzaSyCeneup5Ub45IQ2OQCMKGm8eu9n0aHocVU',
  },
  installComponents: true,
})

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


import LoadScript from 'vue-plugin-load-script';

Vue.use(LoadScript);

//****************************** */

import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.use(VueFriendlyIframe);
//******************************** */
// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
// Vue.prototype.$getSiteId = function() {
//     if(localStorage.getItem('userSiteInfo') != ""){
//       if(JSON.parse(localStorage.getItem('userSiteInfo')) instanceof Array)
//         return JSON.parse(localStorage.getItem('userSiteInfo'))[0].siteId;
//       else
//         return JSON.parse(localStorage.getItem('userSiteInfo')).siteId;
//     }
//     else
//       return 0;
//   }
Vue.prototype.$clearSession = function () {
  localStorage.setItem('permissions', '');
  localStorage.setItem('userInfo', '');
  localStorage.setItem('Current_User_Id', '');
  localStorage.setItem('uId', '');
  localStorage.setItem('uEmail', '');
  localStorage.setItem('UserAccounts', '');
  localStorage.setItem('userAccountSelected', '');
  localStorage.setItem('homeScreenMessage', '');


  return '';
}

Vue.prototype.$getAccessToken = function () {
  return sessionStorage.accessToken;
}
Vue.prototype.$VUE_APP_ROOT_API = process.env.VUE_APP_ROOT_API;

Vue.prototype.$VUE_APP_ROOT_API = process.env.VUE_APP_ROOT_API;

Vue.prototype.$buildUrl = function (path) {
  return this.$VUE_APP_ROOT_API + path;
}

Vue.prototype.$signIn = function (self, uid, email, password, success) {
  var onSuccess = response => {
    if (response.data.value[0].token) {
      success(response.data);
    }
  };
  var onFinally = function () {
    self.closeLoader();

  };
  this.$ajaxPostAny(

    self,
    "FAMSlegacy/Authenticate",
    { Username: email, Password: password },
    onSuccess,
    onFinally
  );
},

  Vue.prototype.$setPermissions = function (self, success) {
    var onSuccess = response => {
      localStorage.setItem("permissions", response.data);
      success();
    };
    this.$ajaxGet(self, "Role/GetPermissions", onSuccess);
  }

Vue.prototype.$getAccount = function (self, success) {
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo.length == 1) {

    localStorage.setItem("userAccountInfo", JSON.stringify(response.data[0]));
    success();
  } else {
    localStorage.setItem("userAccountInfo", JSON.stringify(response.data));
    success();
    //router.push(router.currentRoute.query.to || 'selectaccount');

  }

  // var onSuccess = response => {
  //   if(response.data.length == 1){
  //     localStorage.setItem("userAccountInfo", JSON.stringify(response.data[0]));
  //     success();
  //   } else {
  //
  //     localStorage.setItem("userAccountInfo", JSON.stringify(response.data));
  //     router.push('/selectaccount');
  //   }
  // };
  // this.$ajaxGet(self, "FAMSAPI/AccountInfo?username=csd", onSuccess);
}

Vue.prototype.$ajaxGet = function (self, myUrl, onSuccess, onFinally) {
  var mySelf = this;
  // var mySiteId = mySelf.$getSiteId();
  var myAccessToken = mySelf.$getAccessToken();
  return axios({
    method: 'get',
    url: mySelf.$buildUrl(myUrl),
    headers: {
      'Authorization': 'Bearer ' + myAccessToken, 'userId': JSON.parse(sessionStorage.roles).id,
      'accountId': localStorage.getItem('userAccountId'), 'accountKey': localStorage.getItem('userAccountKey'), 'userKey': localStorage.getItem('userKey')
    }
  })
    .then(response => {
      //axios.defaults.headers.common['Authorization'] ='Bearer ' + myAccessToken
      if (onSuccess && typeof onSuccess == "function")
        onSuccess(response);
    })
    .catch(function (error) {
      var exception = "";
      var title = "Error/Notification";
      var colour = "danger";
      if (error.response) {
        if (error.response.status == 401) {
          router.push('/pages/login');
          exception = error.response.data.message;
          title = error.response.data.title;
          colour = "warning";
        } else if (error.response.status == 404) {
          exception = error.response.data.message;
          title = error.response.data.title;
          colour = "warning";
        } else if (error.response.status == 405) {
          exception = error.response.data.message;
          title = error.response.data.title;
          colour = "warning";
        } else if (error.response.status == 498) {
          sessionStorage.setItem(Object.keys(sessionStorage).filter(function (item) { return item.includes("firebase"); })[0], "");
          router.push('/pages/login');
          exception = error.response.data.message;
          title = error.response.data.title;
          colour = "warning";
        } else if (error.response.status == 429) {
          exception = error.response.data.message;
          title = error.response.data.title;
          colour = "danger";
        }
      } else {
        exception = error.message;
        colour = "danger";
      }
      self.$vs.notify({
        time: 5500,
        title: title,
        text: exception,
        color: colour,
        iconPack: 'feather',
        icon: 'icon-alert-circle'
      });
    })
    .finally(onFinally)
}
Vue.prototype.$ajaxDelete = function (self, myUrl, onSuccess, onFinally) {
  var mySelf = this;
  // var mySiteId = mySelf.$getSiteId();
  var myAccessToken = mySelf.$getAccessToken();
  return axios({
    method: 'delete',
    url: mySelf.$buildUrl(myUrl),
    headers: {
      'Authorization': 'Bearer ' + myAccessToken,
      'userId': JSON.parse(sessionStorage.roles).id,
      'accountId': localStorage.getItem('userAccountId'), 'accountKey': localStorage.getItem('userAccountKey'), 'userKey': localStorage.getItem('userKey')
    }

  }).then(response => {
    if (onSuccess && typeof onSuccess == "function")
      onSuccess(response);
  })
    .catch(function (error) {
      var exception = "";
      var title = "Error/Notification";
      var colour = "danger";
      var title = "Error"
      if (error.response) {
        if (error.response.status == 401) {
          router.push('/pages/login');
          title = error.response.data.title;
          exception = error.response.data.message;
          colour = "warning";
        } else if (error.response.status == 404) {
          title = error.response.data.title;
          exception = error.response.data.message;
          colour = "warning";
        } else if (error.response.status == 405) {
          title = error.response.data.title;
          exception = error.response.data.message;
          colour = "warning";
        } else if (error.response.status == 498) {
          title = error.response.data.title;
          sessionStorage.setItem(Object.keys(sessionStorage).filter(function (item) { return item.includes("firebase"); })[0], "");
          router.push('/pages/login');
          exception = error.response.data.message;
          title = error.response.data.title;
          colour = "warning";
        }
      } else {
        exception = error.message;
        title = "Error";
        colour = "danger";
      }
      self.$vs.notify({
        time: 5500,
        title: title,
        text: exception,
        color: colour,
        iconPack: 'feather',
        icon: 'icon-alert-circle'
      });
    })
    .finally(onFinally)
}
Vue.prototype.$ajaxPut = function (self, myUrl, formData, onSuccess, onFinally) {
  var mySelf = this;
  var myAccessToken = mySelf.$getAccessToken();
  return axios({
    method: 'put',
    url: mySelf.$buildUrl(myUrl),
    headers: {
      'Authorization': 'Bearer ' + myAccessToken,
      'userId': JSON.parse(sessionStorage.roles).id,
      'accountId': localStorage.getItem('userAccountId'), 'accountKey': localStorage.getItem('userAccountKey'), 'userKey': localStorage.getItem('userKey')
    },
    data: formData,
  }).then(response => {
    if (onSuccess && typeof onSuccess == "function")
      onSuccess(response);
  })
    .catch(function (error) {
      var exception = "";
      var title = "Error/Notification";
      var colour = "danger";
      if (error.response) {
        if (error.response.status == 401) {
          exception = error.response.data.message;
          router.push('/pages/login');
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 404) {
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 405) {
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 498) {
          sessionStorage.setItem(Object.keys(sessionStorage).filter(function (item) { return item.includes("firebase"); })[0], "");
          router.push('/pages/login');
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        }
      } else {
        exception = error.message;
        colour = "danger";
      }
      self.$vs.notify({
        time: 5500,
        title: title,
        text: exception,
        color: colour,
        iconPack: 'feather',
        icon: 'icon-alert-circle'
      });
    })
    .finally(onFinally);
}

Vue.prototype.$ajaxPost = function (self, myUrl, formData, onSuccess, onFinally) {
  var mySelf = this;
  var myAccessToken = mySelf.$getAccessToken();
  return axios({
    method: 'post',
    url: mySelf.$buildUrl(myUrl),
    headers: {
      'Authorization': 'Bearer ' + myAccessToken,
      'userId': JSON.parse(sessionStorage.roles).id,
      'accountId': localStorage.getItem('userAccountId'),
      'accountKey': localStorage.getItem('userAccountKey'),
      'userKey': localStorage.getItem('userKey')
    },
    data: formData,
  }).then(response => {
    if (onSuccess && typeof onSuccess == "function")
      onSuccess(response);
  })
    .catch(function (error) {
      var exception = "";
      var title = "Error/Notification";
      var colour = "danger";
      if (error.response) {
        if (error.response.status == 401) {
          router.push('/pages/login');
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 404) {
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 405) {
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 498) {
          sessionStorage.setItem(Object.keys(sessionStorage).filter(function (item) { return item.includes("firebase"); })[0], "");
          router.push('/pages/login');
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        }
      } else {
        exception = error.message;
        colour = "danger";
      }
      self.$vs.notify({
        time: 5500,
        title: title,
        text: exception,
        color: colour,
        iconPack: 'feather',
        icon: 'icon-alert-circle'
      });
    })
    .finally(onFinally);

}

Vue.prototype.$ajaxPostAny = function (self, myUrl, formData, onSuccess, onFinally) {
  var mySelf = this;

  return axios({
    method: 'post',
    url: mySelf.$buildUrl(myUrl),
    data: formData,
  }).then(response => {
    if (onSuccess && typeof onSuccess == "function")
      onSuccess(response);
  })
    .catch(function (error) {
      var exception = "";
      var title = "Error/Notification";
      var colour = "danger";
      if (error.response) {
        if (error.response.status == 401) {
          exception = error.response.data.message;
          router.push('/pages/login');
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 404) {
          exception = error.response.data.message;
          colour = "danger";
          title = error.response.data.title;
        } else if (error.response.status == 405) {
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        } else if (error.response.status == 498) {
          router.push('/pages/login');
          exception = error.response.data.message;
          colour = "warning";
          title = error.response.data.title;
        }
      } else {
        exception = error.message;
        colour = "danger";
      }
      self.$vs.notify({
        time: 5500,
        title: title,
        text: exception,
        color: colour,
        iconPack: 'feather',
        icon: 'icon-alert-circle'
      });
    })
    .finally(onFinally);

}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount('#app')


