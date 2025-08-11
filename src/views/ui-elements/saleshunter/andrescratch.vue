<template>

<vs-table :data="users"
v-model="selected"
@selected="handleSelected"

>      

      <template slot="thead">
        <vs-th> Email</vs-th>
        <vs-th> Name  </vs-th>
        <vs-th> Website </vs-th>
        <vs-th> Nro  </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="tr.email">
            {{tr.email}}
          </vs-td>

          <vs-td :data="tr.username">
            {{tr.name}}
          </vs-td>

          <vs-td :data="tr.website">
            {{tr.website}}
          </vs-td>

          <vs-td :data="tr.id">
            {{tr.id}}
          </vs-td>

          <template slot="expand">
                <vs-table
                      ref="gridTable"
                      v-model="selected2"
                      :data="users2"
                      class="vs-con-loading__container"
                    >
                      <template slot="thead">
                        <vs-th sort-key="name">name</vs-th>
                        <vs-th sort-key="description">description</vs-th>
                        <vs-th sort-key="enable">enable</vs-th>            
                      </template>
                      <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                          <vs-td :data="tr.name">{{tr.name}}</vs-td>
                          <vs-td :data="tr.description">{{tr.description}}</vs-td>
                          <vs-td :data="tr.enable">{{tr.enable}}</vs-td>
                        </vs-tr>
                      </template>
               </vs-table>
          
          </template>
        </vs-tr>
      </template>
    </vs-table>
</template>



<script>
import vSelect from "vue-select";
import axios from "axios";
export default {
  name: 'PhoneNumberLine',
  data () {

    return {
       blockRemoval: true,
       selected:[],
       selected2:null,
       users2:[],
       users:[
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "website": "hildegard.org",
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "website": "anastasia.net",
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "website": "ramiro.info",
      },
    ],
      
    }
  },

  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
 components: {
   "v-select": vSelect,
  },
  
  methods: {
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    handleSelected(selected) {
       const self = this;
       self.GetGrid(selected);
      },
    GetGrid(tr) {
      const self = this;
    //  self.showLoadingOnElement("gridTable", 1, "radius");
      var onSuccess = function(response) {
        self.users2 = response.data;
      };
      var onFinally = function() {
       // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxGet(
        self,
          "Allocations/GetAllocationTest?id="+ tr.id +"&AccountId=1",
        onSuccess,
        onFinally
      );
    },

  },

  mounted () {

  }

}

</script>