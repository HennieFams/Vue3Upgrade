<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
 <vx-card ref="MainCard" 
       :card-background="'url(' + card_bg_img_2 + ')'"
 >
    <div class="h-screen flex w-full bg-img">
      <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-2/5 mx-auto pt-2 self-center">
        <vx-card  
          card-background="rgba(255,159,67,.8)"
        >
          <!-- <div class="vx-card__title pb-4">
            <h2 class="text-center">Please choose a site</h2>
          </div> -->
          <div id="data-list-thumb-view" class="data-list-container">
            <vs-table ref="sitesTable" striped single v-model="selected" @selected="handleSelectedSite" pagination max-items="5" search :data="accountsList">
              <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                <div>
                  <h2 class="text-left pb-4">Please choose an Account</h2>
                </div>
              </div>
              <template slot-scope="{data}">
                <tbody>
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td class="img-container">
                      <img :src="tr.logoUrl" class="product-img" />
                    </vs-td>
                    <vs-td>
                      <p  class="product-name font-medium">{{ tr.accountName }}</p>
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
    </vx-card>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
export default {
  data() {
    return {
      card_bg_img_1: require('@/assets/images/pages/card-bg-image-demo-1.jpg'),
      card_bg_img_2: require('@/assets/images/pages/bg/3a.jpg'),
      selected: [],
      sites: [],
      accountsList: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    handleSelectedSite(tr) {
      var self = this;
      self.showLoadingOnTable();
      
      self.selected = [{
        accountKey: tr.accountKey,
        accountName: tr.accountName,
        accountId: tr.accountId,
        // logoUrl: tr.logoUrl,
        // theme: tr.theme,
        // themeColor: tr.themeColor,
        // navbarColor: tr.navbarColor,
        //navbarType: tr.navbarType
      }];
      if(self.selected.length < 1) self.$router.push("/pages/login");
      
      localStorage.setItem("userAccountSelected", JSON.stringify(self.selected));
      let temp = localStorage.getItem("userInfo").split(",");
      localStorage.setItem('userAccount',tr.accountName);
      localStorage.setItem('userAccountId',tr.accountId);
      localStorage.setItem('userAccountKey',tr.accountKey);
      localStorage.setItem('homeScreenMessage', tr.homeScreenMessage);
      sessionStorage.roles = JSON.stringify(tr.userRoles);
      var myRoles = JSON.parse(sessionStorage.roles).userRoles.map(x=> x.code)
            
      self.$acl.change(myRoles);
      localStorage.setItem('userAccountTypeId',tr.accountTypeId);
      localStorage.setItem('userAccountType',tr.accountType);
      self.$store.state.accountTypeId = tr.accountTypeId;
      self.$store.state.accountType = tr.accountType;

      self.$store.state.accountName = tr.accountName;
      self.$store.state.accountId = tr.accountId;
      self.$store.state.accountKey = tr.accountKey;
      self.$router.push("/");
      //self.$acl.change(localStorage.getItem("userInfo").split(","));
      // if(JSON.parse(localStorage.getItem('userAccountSelected')) instanceof Array){
      //     self.$vs.theme({ primary: JSON.parse(localStorage.getItem("userSiteInfo"))[0].themeColor });
      //     self.$store.dispatch("updateTheme", JSON.parse(localStorage.getItem("userSiteInfo"))[0].theme);
      //   }
     
      //  if (localStorage.getItem('permissions').includes("Student"))
      //     self.$router.push('/menu');
      //   else
          
      // self.$getProfilePicture(self, function () {
      //   var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      //   userInfo.photoURL = localStorage.getItem('pictureUrl') == null || localStorage.getItem('pictureUrl') == "null" ? "https://forty5degreesstorage.blob.core.windows.net/user/avatar_default.png" : localStorage.getItem('pictureUrl');
      //   localStorage.setItem('pictureUrl', '');
      //   localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // });

      // self.$setPermissions(self, function() {
      //   localStorage.removeItem("allUserSites");
      //   self.$acl.change(localStorage.getItem("permissions").split(","));
      //   if(JSON.parse(localStorage.getItem('userSiteInfo')) instanceof Array){
      //     self.$vs.theme({ primary: JSON.parse(localStorage.getItem("userSiteInfo"))[0].themeColor });
      //     self.$store.dispatch("updateTheme", JSON.parse(localStorage.getItem("userSiteInfo"))[0].theme);
      //   }
      //   else{ 
      //     self.$vs.theme({ primary: JSON.parse(localStorage.getItem("userSiteInfo")).themeColor });
      //     self.$store.dispatch("updateTheme", JSON.parse(localStorage.getItem("userSiteInfo")).theme);
      //   }

      //   if (localStorage.getItem('permissions').includes("Student"))
      //     self.$router.push('/menu');
      //   else
      //     self.$router.push("/");
        
      // });
    },
    loadData() {
      this.sites = JSON.parse(localStorage.getItem("userInfo"));
      this.$refs.sitesTable.searchx = "";
      var userId = localStorage.getItem("userId");
      if(userId == "1"){
        this.accountsList = this.sites.map((item) => {
          return{
            accountId: item.account.accountId,
            accountName: item.account.accountName,
            accountKey: item.account.accountKey,
            userRoles: item.userRoles,
            accountTypeId: item.account.accountTypeId,
            accountType: item.account.accountType,
            blocked: item.account.blocked,
            homeScreenMessage: item.homeScreenMessage
          };
        });
      }
      else{
        this.accountsList = this.sites.filter(x => x.account.blocked == false)
          .map((item) => {
            return{
              accountId: item.account.accountId,
              accountName: item.account.accountName,
              accountKey: item.account.accountKey,
              userRoles: item.userRoles,
              accountTypeId: item.account.accountTypeId,
              accountType: item.account.accountType,
              blocked: item.account.blocked,
              homeScreenMessage: item.homeScreenMessage
            };
        });
      }
    },
    showLoadingOnTable() {
      var self = this;
      self.$vs.loading({
        type: "corners",
        container: self.$refs.sitesTable.$el,
        scale: 1
      });
      setTimeout(() => {
        self.$vs.loading.close();
      }, 4000);
    }
  },
  created() {
    if(!localStorage.getItem("userInfo") && !localStorage.getItem("userName")) {
        window.location.replace("/login");
    }
  }
};
</script>
<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {
    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          &.img-container {
            height:100px;

            span {
              display: flex;
              justify-content: left;
            }

            .product-img {
                display: block;
                max-width: 100px;
                max-height: 100px;
                width: auto;
                height: auto;
            }
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
    
    .vs-con-tbody {
    max-height: 400px;
    }
  }
}
</style>
