<template>
  <div class="the-navbar__user-meta flex items-center" >

    <div class="text-right leading-tight hidden sm:block">
      <!-- <small>Available</small> -->
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer" >

      <div class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
        <feather-icon class="mr-2" icon="UserIcon" svgClasses="w-5 h-5" />
        <div v-if="windowWidth >= 800" >{{username}}</div>
        <feather-icon class="ml-1" icon="ChevronDownIcon" svgClasses="w-5 h-5" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <!-- <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="changeSite">
            <feather-icon icon="LayersIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Change Site</span>
          </li> -->

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>


export default {
  data() {
    return {
      username:'',
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
    windowWidth(){ return this.$store.state.windowWidth }
  },
  methods: {
    changeSite(){
      this.$router.push("/selectaccount");
    },
    getUsername(){
      this.username = sessionStorage.username
    },
    logout() {

        // if user is logged in via auth0
        if (this.$auth.profile) this.$auth.logOut();
        
        //FAMS logged in token removed
        if(localStorage.getItem("accessToken")) {
          localStorage.removeItem("accessToken")
        }

        // if user is logged in via firebase


        // If JWT login
        if(localStorage.getItem("accessToken")) {
          localStorage.removeItem("accessToken")
          this.$router.push('/pages/login').catch(() => {})
        }

        // Change role on logout. Same value as initialRole of acj.js
        this.$acl.change("user");
        localStorage.removeItem('userInfo')

        // This is just for demo Purpose. If user clicks on logout -> redirect
        this.$router.push('/pages/login').catch(() => {})
    },
  },
  mounted() {
    var self = this;
    self.getUsername();
  }

}
</script>
