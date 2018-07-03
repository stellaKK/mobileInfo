<template>
  <div class="details">
    <div class="back"  v-on:click="backToList">&#9668; Back</div>
    <div class="loading" v-if="isLoading">Loading...</div>
    <div class="failure_block" v-if="isFail">
      <div class="fail_sign">&times;</div>
      <div class="fail_text">No Matching Results Found.</div>
    </div>

    <div class="device_img detail_img" v-if="(!isFail && !isLoading)">{{ device[0].toUpperCase() }}</div>
    <div v-for="(value, key) in text[0]" :key="key" class="list" v-if="(!isFail && !isLoading)">
      <div class="detail_block">
        <div class="info">{{key}} </div>
        <div class="description">{{value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* fonoapi set up */
var fonoapi = require('fonoapi-nodejs')
fonoapi.token = 'c43991b829e7cce167bd46f43dec067c5a56d8b1b821fada'

export default {
  name: 'Details',
  props: {
    device: String
  },
  data () {
    return {
      isLoading: true,
      isFail: false,
      text: {}
    }
  },
  methods: {

    load_details (queryString, data) {
      /* error message format:
      {status: "error", message: "No Matching Results Found.", innerException: null} */

      this.$data.isLoading = false
      if (data.status === 'error') {
        this.$data.isFail = true
      } else {
        this.$data.text = data
      }
    },

    getDetails () {
      fonoapi.getDevices(this.load_details, this.$props.device)
    },

    backToList () {
      // go back to titles page
      this.$emit('backToTitle', true)
    }
  },
  beforeMount () {
    this.getDetails()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import './Details.css';
</style>
