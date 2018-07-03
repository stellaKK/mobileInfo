<template>
  <div class="explore">
    <div class="title" v-on:click="backHome">Mobile Info.</div>

    <FilterBlock @searchKeys="handleKeys"></FilterBlock>
    <DeviceList :parentKeys="patchKeys"></DeviceList>

  </div>
</template>

<script>
import DeviceList from './DeviceList.vue'
import FilterBlock from './FilterBlock.vue'

export default {
  name: 'Explore',
  components: {DeviceList, FilterBlock},
  data () {
    return {
      patchKeys: ['', '', 'latest']
    }
  },
  methods: {
    handleKeys (value) {
      // value is a list: [device, brand, mode]
      this.patchKeys = value
    },

    backHome () {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import './explore.css';
</style>
