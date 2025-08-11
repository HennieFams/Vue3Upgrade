<template>
  <v-select
    placeholder="Select From Account"
    :options="accounts"
    v-model="account"
    style="margin-top:5px;margin-bottom:5px;"
    @search:blur="selectedAccount">
  </v-select>
</template>

<script>

import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      accounts: [],
      account: 0,
    };
  },

  computed: {
    
  },
  mounted() {
    var self = this;
    self.getAccount();
  },
  methods: {
    getAccount(){
      var self = this;

      var onSuccess = function(response) {
        self.accounts = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function(){
      };
      self.$ajaxGet(self,"Accounts/GetAccountdropdownAll", onSuccess, onFinally);
    },
    selectedAccount(){
      var self = this;
      self.$emit("accountPicked", self.account);
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
<style>
@import "material.css";
</style>
