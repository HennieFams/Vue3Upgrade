<template>
  <div>
    <vx-card ref="AddCard" v-show="!isWizardHidden">
      <div class="vx-row w-full">
        <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="closeWiz()" icon-pack="feather"
          icon="icon-x-square">Cancel</vs-button>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <el-tree :data="newAlloc" node-key="id" class="treenode vs-con-loading__container" ref="newtree" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" :allow-drop="allowDrop" :allow-drag="allowDrag"
            highlight-current draggable>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <!-- <el-button style="margin-left: 1vw; padding: 5px" type="text" size="small"
                  @click="() => showChildSelector(node)">
                  Add New Child
                </el-button>
                <el-button style="margin-left: 1vw; padding: 5px" type="text" size="small"
                  @click="() => remove(node, data)">
                  Delete
                </el-button> -->
              </span>
              <div v-if="activeNode && activeNode.data.label === node.label" class="mt-2">
                <label class="w-full">{{activeNode.data.label}}</label>
                <label class="w-full">{{node.label}}</label>
                <!-- <v-select :options="allocData" v-model="selectedChildren" label="label"
                  :multiple="true" placeholder="Select children to add"
                  @input="() => addChildrenToNode(node, selectedChildren)" /> -->
              </div>
            </span>
          </el-tree>
        </div>
        <div class="vx-col w-1/2">
          <div class="vx-row">
            <div class="md:w-1/2 mt-5 mb-5" ref="addStore" v-show="showDropdown">
              <label class="w-full">Store</label>
              <v-select class="w-full" placeholder="Select Store To Add" :options="stores" @search:blur="populateAlloc1"
                v-model="selectedAlloc"></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="vx-row">
        <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="saveCustomAlloc()" icon-pack="feather"
          icon="icon-save">Save</vs-button>
      </div>
    </vx-card>
    <vx-card ref="MainCard" v-show="!isListHidden">
      <div class="vx-row flex flex-wrap-reverse items-center flex-grow">
        <!-- ADD NEW -->
        <vs-button class="rounded-lg mr-2" color="warning" type="filled" @click="loadAlloc1()" icon-pack="feather"
          icon="icon-refresh-ccw">Reload</vs-button>
        <vs-button class="rounded-lg mr-2" color="success" type="filled" @click="createNew()" icon-pack="feather"
          icon="icon-plus-square">Add New Store</vs-button>
      </div>
      <div class="vx-row">
        <div class="vx-col w-1/2">
          <el-tree :data="allocData1" node-key="id" class="treenode vs-con-loading__container" ref="maintree" @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd" @node-drop="handleDrop" :allow-drop="allowDrop" :allow-drag="allowDrag"
            highlight-current>
            <span class="custom-tree-node" slot-scope="{ node, data }" v-if="data.label">
              <span v-if="node.level >= 2">Level {{ node.level - 1 }} - {{ node.label }}</span>
              <span v-else>FAMS Store: {{ node.label }}</span>
              <span>
                <el-button style="margin-left: 1vw; padding: 5px" :class="getLevelClass(node.level)" type="text" size="small"
                  @click="() => showChildSelector(node)">
                  Add New Child
                </el-button>
                <el-button style="margin-left: 1vw; padding: 5px" type="text" size="small"
                  @click="() => remove(node, data)">
                  Delete
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </vx-card>
    <vs-prompt ref="statusPrompt" :title="`Select Allocations for level ${treelevel}`" class="vs-con-loading__container" acceptText="Submit" cancelText="Cancel"
      @cancel="selectedChildren = 0" @accept="addChildrenToNode(selectedChildren)" :active.sync="showPrompt">
      <div class="con-exemple-prompt">
        <div>
          <label>Select Group {{treelevel}} Allocation</label>
          <v-select :options="allocData" v-model="selectedChildren" label="label"
                  :multiple="true" placeholder="Select children to add" />
        </div>
      </div>
    </vs-prompt>


  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import Datepicker from 'vuejs-datepicker';
import ConfigSidebar from './SunmiConfigSidebar.vue';
import VxCard from '../../../components/vx-card/VxCard.vue';
export default {
  data() {
    return {
      title: 'FAMS - new Employee Wizard!!',
      subtitle: 'Please complete each tab to add new Employee (operator/driver)',

      isListHidden: false,
      isWizardHidden: true,
      isInfoHidden: false,
      isConfigSidebarActive: false,
      canChangePassword: false,
      sidebarData: {},


      itemsPerPage: 10,
      configData: [],
      isMounted: false,
      treelevel: 0,
      allocs: [],
      // formData: {
      //    id:0,
      //    configname: "",
      //   //  email:"",
      //   //  enable:true,
      //   //  password:"",
      //   }
      id: 0,
      selectedChildren: [],
      activeNode: null,
      showPrompt: false,
      data: [{
        id: 0,
        storeId: 0,
        allocationId: 0,
        allocationTypeId: 0,
        description: "",
        children: [{
          id: 0,
          storeId: 0,
          allocationId: 0,
          allocationTypeId: 0,
          description: "",
          children: [{
            id: 0,
            storeId: 0,
            allocationId: 0,
            allocationTypeId: 0,
            description: "",
          }, {
            id: 0,
            storeId: 0,
            allocationId: 0,
            allocationTypeId: 0,
            description: "",
          }]
        }]
      }, {
        id: 0,
        storeId: 0,
        allocationId: 0,
        allocationTypeId: 0,
        description: "",
        children: [{
          id: 0,
          storeId: 0,
          allocationId: 0,
          allocationTypeId: 0,
          description: "",
        }, {
          id: 0,
          storeId: 0,
          allocationId: 0,
          allocationTypeId: 0,
          description: "",
        }]
      }, {
        id: 0,
        storeId: 0,
        allocationId: 0,
        allocationTypeId: 0,
        description: "",
        children: [{
          id: 0,
          storeId: 0,
          allocationId: 0,
          allocationTypeId: 0,
          description: "",
        }, {
          id: 0,
          storeId: 0,
          allocationId: 0,
          allocationTypeId: 0,
          description: "",
          children: [{
            id: 0,
            storeId: 0,
            allocationId: 0,
            allocationTypeId: 0,
            description: "",
          }, {
            id: 0,
            storeId: 0,
            allocationId: 0,
            allocationTypeId: 0,
            description: "",
            children: [{
              id: 0,
              storeId: 0,
              allocationId: 0,
              allocationTypeId: 0,
              description: "",
            }, {
              id: 0,
              storeId: 0,
              allocationId: 0,
              allocationTypeId: 0,
              description: "",
            }]
          }]
        }]
      }],
      showDropdown: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedAlloc: {},
      allocations: [
        {
          label: "Dummy 1",
          value: 1
        },
        {
          label: "Dummy 2",
          value: 2
        },
        {
          label: "Dummy 3",
          value: 3
        },
      ],
      newAlloc: [],
      allocData: [],
      allocData1: [],
      allocData2: [],
      allocData3: [],
      allocData4: [],
      newParent: [],
      stores: [],
      formData: {
        id: 0,
        storeId: 0,
        allocationId: 0,
        allocationTypeId: 0,
        description: "",
        store: "",
        name: "",
        children: [],
      },
    };
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    FormWizard,
    TabContent,
    Datepicker,
    ConfigSidebar,
    VxCard
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.gridTable.currentx;
      }
      return 0;
    }
  },
  mounted() {
    this.loadAlloc1();
    // this.isMounted = true;
  },
  methods: {
    getLevelClass(level) {
    switch (level) {
      case 1: return 'btn-level-1';
      case 2: return 'btn-level-2';
      case 3: return 'btn-level-3';
      case 4: return 'btn-level-4';
      default: return 'btn-default';
    }
  },
    initValues() {
      var self = this;
      // this.formData.id = 0;
      // this.formData.configname = "";



      // this.formData.email = "";
      // this.formData.enable = true;
      // this.formData.password = "";
    },
    createNew(){
      this.newAlloc = [];
      this.loadStores();

      this.showDropdown = true;
      this.isListHidden = true;
      this.isWizardHidden = false;
    },
    closeWiz(){
      this.isListHidden = false;
      this.isWizardHidden = true;
    },
    showChildSelector(node) {
      var level = node.level;
      this.activeNode = node;
      console.log(node)
      console.log(node.level)
      this.treelevel = node.level;
      // debugger

      if(this.activeNode.level == 1){
        this.loadAlloc2(1);
      }
      if(this.activeNode.level == 2){
        this.loadAlloc2(2);
      }
      if(this.activeNode.level == 3){
        this.loadAlloc2(3);
      }
      if(this.activeNode.level == 4){
        this.loadAlloc2(4);
      }

      this.showPrompt = true;
      this.selectedChildren = [];
    },
    async populateAlloc1(){
      // if (!this.selectedAlloc) return;

      // debugger
      console.log(this.selectedAlloc);
      if(this.selectedAlloc && this.selectedAlloc.value){
        var exists = await this.getChildren(this.selectedAlloc.value);
        // const exists = this.newAlloc.some(item => item.id === this.selectedAlloc.value);
        // debugger
        // this.showDropdown = false;
        // const children = await this.getChildren(this.selectedAlloc.value);

        if (exists && exists[0].id != 0) {
          // Has children, set newParent
          // debugger
          this.formData.id = exists[0].id;
          this.formData.allocationId = exists[0].allocationId;
          this.formData.allocationTypeId = exists[0].allocationTypeId;
          this.formData.storeId = exists[0].storeId;
          this.formData.description = exists[0].description;
          this.formData.store = exists[0].store;
          this.formData.name = exists[0].name;
          this.formData.parentAllocationId = exists[0].parentAllocationId;
          this.formData.children = exists[0].children || [];
          // debugger
          this.newAlloc = exists;
        } else {
          // No children, push only the parent
          var newSave = {
            id: 0,
            label: this.selectedAlloc.label,
            storeId: this.selectedAlloc.value,
            allocationId: 0,
            allocationTypeId: 0,
            parentAllocationId: 0,
            description: '',
            store: '',
            name: '',
            children: []
          };
          this.newAlloc = [newSave]
        }
        // const exists = this.newParent;
        // debugger
        this.selectedAlloc = null;
      }
      else{
        this.$vs.notify({
          title: 'Error',
          text: 'Please select a store to add',
          color: 'warning'
        });
      }

    },
    getChildren(id) {
      return new Promise((resolve, reject) => {
        var self = this;

        var onSuccess = function (response) {
          // debugger
          if(response.data.length > 0){
            function mapTree(node) {
              return {
                id: node.id,
                label: node.name,
                storeId: node.storeId,
                allocationId: node.allocationId,
                parentAllocationId: node.parentAllocationId,
                allocationTypeId: node.allocationTypeId,
                description: node.description,
                store: node.store,
                name: node.name,
                children: node.children ? node.children.map(mapTree) : []
              };
            }

            var childList = response.data.map(mapTree);
            self.newParent = [child];
          }
          else{
            // debugger
            var child = {
              id: 0,
              label: self.selectedAlloc.label,
              storeId: self.selectedAlloc.value,
              parentAllocationId: 0,
              allocationId: 0,
              allocationTypeId: 0,
              description: '',
              store: '',
              name: '',
              children: []
            }
          }
            resolve([child]);
        };

        var onFinally = function () {
          // do nothing
        };

        self.$ajaxGet(
          self,
          `PerAllocationStoresCustom/PerAllocationStoresSpecific?storeId=${id}`,
          onSuccess,
          onFinally
        );
      });
    },
    getAvailableChildren(parentNode) {
      const existingIds = new Set(
        (parentNode.children || []).map(child => child.id)
      );
      return this.allocations.filter(item => !existingIds.has(item.id));
    },
    successNotify() {
      this.$vs.notify({
        title: 'Successfully',
        text: 'Item successfully added | updated | removed',
        color: 'success'
      })
    },
    FailedNotify() {
      this.$vs.notify({
        title: 'Not Successfull',
        text: 'Item not added',
        color: 'danger'
      })
    },
    showLoadingOnElement(element, scale, type) {
      var self = this;
      self.$vs.loading({
        type: type,
        container: self.$refs[element].$el,
        scale: scale
      });
    },
    append(data) {
      // debugger
      //data.data.id
      //data.data.label
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      var self = this;
      // debugger
      var level = node.level;
      var deleteString = '';
      var deleteId = 0;
      if (level === 1) {
        deleteString = `storeId=${data.storeId}`;
        deleteId = data.storeId;
      }
      else{
        deleteString = `nodeId=${data.id}`;
        deleteId = data.id;
      }
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);

      var onSuccess = function (response) {
        self.loadAlloc1();
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.gridTable.$el);
      };
      self.$ajaxDelete(self, `PerAllocationStoresCustom/${deleteId}?` + deleteString, onSuccess, onFinally);
    },
    handleDragStart(node, ev) {
      console.log('drag start', node);
      // debugger
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === 'Level two 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('Level three 3-1-1') === -1;
    },
    loadAlloc1() {
      var self = this;
      var id = 1;
      self.showLoadingOnElement('maintree', 1, 'radius');
      var onSuccess = function (response) {
      // debugger
        function mapTree(node) {
          return {
            id: node.id,
            label: node.name, // This will show the store name for root nodes
            storeId: node.storeId,
            allocationId: node.allocationId,
            allocationTypeId: node.allocationTypeId,
            description: node.description,
            parentAllocationId: node.parentAllocationId,
            store: node.store,
            name: node.name,
            children: node.children ? node.children.map(mapTree) : []
          };
        }

        // Since each root node is now a store with children being allocations,
        // we map each root node (store) and its children allocation tree
        self.allocData1 = response.data.map(mapTree);
      };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.maintree.$el);
      };
      self.$ajaxGet(
        self,
        `PerAllocationStoresCustom`,
        onSuccess,
        onFinally
      );
    },
    loadAlloc2(Level) {
      var self = this;
var currLevel = Level;
// self.showLoadingOnElement('statusPrompt', 1, 'radius');
      // debugger
      var onSuccess = function (response) {
        // debugger
        // if(currLevel == 1){
          // self.allocations = response.data.map((item) => {
            // return { label: item.name, value: item.id };
          // });
        // }
        // else{
          self.allocData = response.data.map((item) => {
              return { label: item.name, value: item.id };
            });
        // }
        // self.allocData1 = response.data.map((item) => {
        //       return {
        //         id: item.id,
        //         label: item.name,
        //         children: item.children
        //       };
        //     });
      };
      var onFinally = function () {
        // self.$vs.loading.close(self.$refs.statusPrompt.$el);
      };
      self.$ajaxGet(
        self,
        `Allocations/GetAllocationDrop?allocationTypeId=${Level}`,
        onSuccess,
        onFinally
      );
    },
    addChildrenToNode(children) {
      // debugger
      if (!children || !children.length) {
        this.$vs.notify({
          title: 'Error',
          text: 'Please select at least one allocation to add',
          color: 'warning'
        });
        // return;
      }
      else{
        // debugger
        this.activeNode.data.children = this.activeNode.data.children || [];
        children.forEach(child => {
          this.activeNode.data.children.push({
            id: 0,
            label: child.label,
            storeId: this.activeNode.data.storeId,
            allocationId: child.value,
            allocationTypeId: this.activeNode.level,
            description: this.activeNode.data.description,
            store: this.activeNode.data.store,
            parentAllocationId: this.activeNode.data.id,
            name: child.label,
            children: []
           });
        });
        // debugger
        this.newAlloc = [this.activeNode.data];
        this.activeNode = null;
        this.selectedChildren = [];
        // debugger
        this.saveCustomAlloc();
      }
    },
    saveCustomAlloc() {
      const self = this;
      const buildPayload = (node, parentId = 0) => {
        return {
          Id: node.id || 0,
          StoreId: node.storeId,
          AllocationId: node.allocationId,
          AllocationTypeId: node.allocationTypeId,
          Description: node.description,
          ParentAllocationId: parentId,
          Children: node.children
          ? node.children.map(child => buildPayload(child, node.id || parentId))
          : []
        };
      };

      const root = self.newAlloc[0]; // just the updated branch
      // debugger
      const payload = buildPayload(root, root.id || 0); // keep parent info intact

      const onSuccess = function () {
        self.closeWiz();
        self.loadAlloc1();
      };

      self.$ajaxPost(
        self,
        `PerAllocationStoresCustom`,
        payload,
        onSuccess,
        () => {}
      );
    },
    loadStores() {
      var self = this;
      self.showLoadingOnElement('newtree', 1, 'radius');
      var onSuccess = function (response) {
        self.stores = response.data.map((item) => {
            return { label: item.name, value: item.id };
          });
        };
      var onFinally = function () {
        self.$vs.loading.close(self.$refs.newtree.$el);
      };
      self.$ajaxGet(self, "Stores/GetStoredropdown", onSuccess, onFinally);
    },
  },
};

</script>
<style>
.treenode .el-tree__empty-block {
  color: white;
}

.treenode .el-tree-node .el-tree-node__content {
  margin-top: 10px !important;
  margin-bottom: 5px !important;
  border-bottom: gray 1px solid;
  margin-left: 8px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<style lang="scss">
.num-input_transparent {
  background-color: transparent !important;
  width: 90px !important;
}

#iconContainer span {
  display: flex;
  justify-content: space-evenly;
}

#iconContainer span .con-vs-tooltip {
  padding: 0px 1px;
}
</style>
<style scoped>
.btn-level-1 {
  background-color: #0000ff; /* blue */
  color: white;
}
.btn-level-2 {
  background-color: #00FF00; /* green */
  color: black;
}
.btn-level-3 {
  background-color: #FF8000; /* orange */
  color: white;
}
.btn-level-4 {
  background-color: #E200FF; /* purple */
  color: white;
}
.btn-default {
  background-color: #FF0000; /* red */
  color: white;
}
</style>
