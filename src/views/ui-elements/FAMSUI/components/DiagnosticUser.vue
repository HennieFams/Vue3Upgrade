<template>
  <v-select
    placeholder="Select From User"
    :options="users"
    v-model="user"
    style="margin-top:5px;margin-bottom:5px;"
    @search:blur="selectedUser">
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
      users: [],
      user: 0,
    };
  },

  computed: {
    
  },
  mounted() {
    var self = this;
    self.getUser();
  },
  methods: {
    getUser(){
      var self = this;

      var onSuccess = function(response) {
        self.users = response.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      };
      var onFinally = function(){
      };
      self.$ajaxGet(self,"Users/GetUserdropdownAll", onSuccess, onFinally);
    },
    selectedUser(){
      var self = this;
      self.$emit("userPicked", self.user);
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
