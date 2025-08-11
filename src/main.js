import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

/*
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import i18n from './i18n/i18n'
import axios from "./axios.js"
import authService from './auth/authService';

// Plugins
import BootstrapVueNext from 'bootstrap-vue-next'
import ElementPlus from 'element-plus'
import VueApexCharts from "vue-apexcharts";
import VueChartjs from 'vue-chartjs'
import VueEcharts from 'vue-echarts'
import VueFeather from 'vue-feather';
import VueI18n from 'vue-i18n'
import VueInstantSearch from 'vue-instantsearch';
import VuePdfEmbed from 'vue-pdf-embed'
import vSelect from 'vue-select'
import { abilitiesPlugin } from '@casl/vue'
import ability from './acl/acl'
import { QuillEditor } from '@vueup/vue-quill'
import VueClipboard from 'vue-clipboard3'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'element-plus/dist/index.css'
import './assets/scss/main.scss'
import '@/assets/css/main.css'
import 'vue-select/dist/vue-select.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// mock
import "./fake-db/index.js"

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(BootstrapVueNext)
app.use(ElementPlus)
app.use(VueApexCharts)
app.use(VueChartjs)
app.use(VueEcharts)
app.use(VueI18n)
app.use(VueInstantSearch)
app.use(abilitiesPlugin, ability)
app.use(VueClipboard)

app.component('QuillEditor', QuillEditor)
app.component('v-select', vSelect)
app.component(VueFeather.name, VueFeather);

// Global properties
app.config.globalProperties.$http = axios
app.config.globalProperties.$acl = ability
app.config.globalProperties.$auth = authService;

app.config.globalProperties.$clearSession = function () {
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

app.config.globalProperties.$getAccessToken = function () {
  return sessionStorage.accessToken;
}

app.config.globalProperties.$VUE_APP_ROOT_API = import.meta.env.VITE_APP_ROOT_API;

app.config.globalProperties.$buildUrl = function (path) {
  return this.$VUE_APP_ROOT_API + path;
}

app.config.globalProperties.$signIn = function (self, uid, email, password, success) {
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
}

app.config.globalProperties.$setPermissions = function (self, success) {
  var onSuccess = response => {
    localStorage.setItem("permissions", response.data);
    success();
  };
  this.$ajaxGet(self, "Role/GetPermissions", onSuccess);
}

app.config.globalProperties.$getAccount = function (self, success) {
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo.length == 1) {
    localStorage.setItem("userAccountInfo", JSON.stringify(response.data[0]));
    success();
  } else {
    localStorage.setItem("userAccountInfo", JSON.stringify(response.data));
    success();
  }
}

app.config.globalProperties.$ajaxGet = function (self, myUrl, onSuccess, onFinally) {
  var mySelf = this;
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
      // self.$vs.notify({
      //   time: 5500,
      //   title: title,
      //   text: exception,
      //   color: colour,
      //   iconPack: 'feather',
      //   icon: 'icon-alert-circle'
      // });
      console.error(exception)
    })
    .finally(onFinally)
}

app.config.globalProperties.$ajaxDelete = function (self, myUrl, onSuccess, onFinally) {
    var mySelf = this;
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
        console.error(exception)
    })
    .finally(onFinally)
}

app.config.globalProperties.$ajaxPut = function (self, myUrl, formData, onSuccess, onFinally) {
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
        console.error(exception)
    })
    .finally(onFinally);
}

app.config.globalProperties.$ajaxPost = function (self, myUrl, formData, onSuccess, onFinally) {
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
        console.error(exception)
    })
    .finally(onFinally);
}

app.config.globalProperties.$ajaxPostAny = function (self, myUrl, formData, onSuccess, onFinally) {
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
        console.error(exception)
    })
    .finally(onFinally);
}

app.mount('#app')
*/
