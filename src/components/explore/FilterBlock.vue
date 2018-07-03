<template>

    <div class="filter_block">
      <div class="input_prop">Device</div>
      <input v-model="device" class="input_field" placeholder="example: i9305, A8">
      <div class="input_prop">Brand</div>
      <input v-model="brand" class="input_field" placeholder="example: samsung">
      <div class="submit_btn" v-on:click="search">Search &#x1F50E;</div>

      <div class="latest_props">
        No idea Yet?
        <div class="submit_btn" v-on:click="toLatest" id="latest_btn">See the Latest Devices!</div>
      </div>
    </div>

</template>

<script>
export default {
  name: 'FilterBlock',
  data () {
    return {
      device: '',
      brand: '',
      mode: 'search'
    }
  },
  methods: {
    search () {
      this.$emit('searchKeys', [this.device, this.brand, 'search'])
    },

    toLatest () {
      this.$emit('searchKeys', ['', '', 'latest'])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import './DeviceList.css';
  @import './explore.css';
</style>
