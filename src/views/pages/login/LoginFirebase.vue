<template>
  <div>
    <vs-input
      v-validate="'required|min:3'"
      data-vv-validate-on="blur"
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email address of Username"
      v-model="email"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>

    <!-- <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Email address of Username"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span> -->
    <br />
    <div style="display: flex">
      <vs-input
        id="passwordBox"
        autocomplete="off"
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        :type="showPassword"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Password"
        v-model="password"
        class="w-full mt-6"
      />
      <feather-icon
        @click="showHidePassword()"
        :icon="eye"
        class="cursor-pointer ml-3"
        style="top: 10px"
      ></feather-icon>
    </div>

    <span class="text-danger text-sm">{{ errors.first("password") }}</span>
    <div class="flex flex-wrap justify-between my-5">
      <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
        <router-link to="/pages/forgot-password">Forgot Password?</router-link> -->
    </div>
    <!-- <vs-button  type="border" @click="registerUser">Register</vs-button> -->
    <vs-button
      ref="login"
      class="rounded-lg w-full mt-6"
      :disabled="!(email && password)"
      @click="login"
      >Login</vs-button
    >

    <vs-divider>www.fams.co.za</vs-divider>
    <vs-popup
      title="Notice"
      class="w-full pl-20 pr-20 pt-4 pb-4"
      id="Popup"
      :active.sync="showPopup"
    >
      <div id="PMessage">
        <div id="MessagePopup" ref="popupMessage">
          <h5 style="text-align: left">
            <p>Dear FAMS client</p>
            <p>
              We trust you are well.<br />
              Thank you for the continuous support throughout 2021. We sincerely
              appreciate it.<br /><br />
            </p>
            <p>
              Please take note of the following arrangements:<br />
              &bull; Due to a recent influx of COVID-related afflictions
              affecting our staff, our direct operating times have become
              limited. All issues must be communicated by logging a ticket or
              emailing support@tecmo.freshdesk.com<br />
              &bull; Our offices will be closed from 15 Dec &ndash; 5 Jan<br />
              &bull; In case of emergency, use the system in override<br />
              &bull; The cloud server hosting the FAMS (Legacy) Reports is
              experiencing major connectivity issues due to constant
              loadshedding/ power outage/ covid-19 etc<br />
              &bull; We strongly recommend clients start using FAMS Report which
              became active in Jan 2021. Please note, Under the Custom/Scheduled
              Reports menu item, please select the FAMS Report menu item instead
              of the FAMS (Legacy) Reports<br />
              &bull; Please log a ticket if any legacy report is not available
              under FAMS Report or if the data is not updating<br />
            </p>
            <p>
              &bull; Please take note that support for the Syncfusion app has
              ended, download the all new FAMSxpress app:<br />
              &rdsh; Google Play<br />
              &rarrhk;
              https://play.google.com/store/apps/details?id=fams.company.app<br />
              &rdsh; Huawei App Gallery<br />
              &rarrhk; https://appgallery.huawei.com/app/C104807123<br />
              &rdsh; Apple App Store<br />
              &rarrhk; https://apps.apple.com/za/app/famsxpress/id1589019185
            </p>

            <p>
              Enjoy the festive season!<br />
              Kind regards,<br />
              The FAMS team.
            </p>
          </h5>
        </div>
      </div>
      <div>
        <vs-button
          class="rounded-lg mr-2"
          color="black"
          style="float: right"
          type="filled"
          @click="closePopup()"
        >
          Close
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
      showPassword: "password",
      eye: "EyeIcon",
      showPopup: false,
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email != "" && this.password != "";
    },
  },
  mounted() {
    var self = this;
    self.showPopupMessage();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("isUser", "false");
    localStorage.setItem("Current_User_Id", "");
    window.addEventListener(
      "keyup",
      function (event) {
        if (event.keyCode === 13 && self.email && self.password) self.login();
      },
      false
    );
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });

        return false;
      }
      return true;
    },
    login() {
      localStorage.setItem("userInfo", "");
      this.showLoadingOnButton();
      
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
        },
        notify: this.$vs.notify,
        self: this,
      };
      this.$vs.loading.close(this.$refs.login.$el);
      window.removeEventListener("keyup", this.eventListenerFunc, false);
      this.$store.dispatch("auth/loginAttempt", payload);
      // this.closeLoader();
    },
    closeLoader(){
      this.$vs.loading.close(this.$refs.login.$el);
    },
    notifyAlreadyLogedIn() {
      this.stopLoading();
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning",
      });
    },
    showLoadingOnButton() {
      var self = this;
      self.$vs.loading({
        type: "material",
        container: self.$refs.login.$el,
        scale: 0.45,
      });
    },
    showHidePassword() {
      if (this.showPassword == "password") {
        this.showPassword = "text";
        this.eye = "EyeOffIcon";
      } else {
        this.showPassword = "password";
        this.eye = "EyeIcon";
      }
    },
    showPopupMessage() {
      var self = this;
      self.showPopup = false;
    },
    closePopup() {
      var self = this;
      self.showPopup = false;
    },
  },
};
</script>


<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
