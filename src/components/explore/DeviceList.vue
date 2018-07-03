<template>
  <div class="device_list">
    <TitleList v-if="isTitles" v-on:viewDevice="loadDeviceDetail" :renderList="parentKeys"></TitleList>
    <Details v-if="!isTitles" :device="device_name" v-on:backToTitle="loadTitles"></Details>
  </div>
</template>

<script>
import TitleList from './TitleList.vue'
import Details from './Details.vue'

export default {
  name: 'DeviceList',
  components: {TitleList, Details},
  props: {
    parentKeys: Array
  },
  data () {
    return {
      isTitles: true, // true = render titles list; false = render details of devices
      device_name: ''
    }
  },
  methods: {
    loadDeviceDetail (value) {
      // value is device name
      this.$data.device_name = value
      this.$data.isTitles = false
    },

    loadTitles (value) {
      // value is bool
      this.$data.isTitles = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import './DeviceList.css';
  @import './explore.css';
</style>
