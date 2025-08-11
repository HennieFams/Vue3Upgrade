
<template>

  <div>

    <div v-for="(line, index) in lines" :key="index" class="row">
       <div class="vx-col w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
            <vx-card
                title="Background Color"
                title-color="#fff"
                card-background="primary"
                content-color="#fff">
                <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
            </vx-card>
        </div>


      <div class="col-lg-6">
        <div class="row">
          <div class="col-10">
            <vs-input v-model="line.number" label="Phone Number"  placeholder="5551234567" type="tel" value="" />
             <vs-button round @click="removeLine(index)" icon="delete" />
             <vs-button round v-if="index + 1 === lines.length" @click="addLine"  icon="playlist-plus" />
          </div>
        </div>
      </div>
  
      <div class="col-lg-2">
        <div class="block float-right">
         
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import vSelect from "vue-select";
export default {
  name: 'PhoneNumberLine',
  data () {

    return {

      lines: [],
      blockRemoval: true,
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

    addLine () {

      // let checkEmptyLines = this.lines.filter(line => line.number === null)
      // if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
      //   return
      // }
      this.lines.push({
        number: null,     
      })

    },

    removeLine (lineId) {
      if (!this.blockRemoval) {
       this.lines.splice(lineId, 1)
      }

    }

  },

  mounted () {

    this.addLine()

  }

}

</script>