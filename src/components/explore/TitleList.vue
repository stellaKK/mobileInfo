<template>
  <div class="title_list">

    <div class="info_block">
      <div class="sub_title">{{sub_title()}} {{search_key}}</div>
      <div class="block_elmt page_btn" v-on:click="prePage">&#9668;</div>
      <input v-model="page" class="block_elmt">
      <div class="block_elmt submit_btn" id="page_submit" v-on:click="changePage">Go</div>
      <div class="block_elmt page_btn" v-on:click="nextPage">&#9658;</div>
    </div>

    <div v-if="isLoading" class="loading">Loading...</div>
    <div class="failure_block" v-if="isFail">
      <div class="fail_sign">&times;</div>
      <div class="fail_text">No Matching Results Found.</div>
    </div>

    <div class="latest_filter">
      <div class="input_prop_f">Brand</div>
      <input v-model="filter_brand" class="input_field" id="filter_input" placeholder="example: samsung">
      <div class="submit_btn" v-on:click="handleFilter" id="filter_btn">Filter</div>
      <div class="submit_btn" v-on:click="clearText" id="clear_btn">Clear</div>
    </div>

    <div v-if="(!isLoading && !isFail)" class="title_block" v-for="title in render_titles" :key="title.index" v-on:click="getDetail(title.DeviceName)">
      <div class="device_img">{{ title.DeviceName[0].toUpperCase() }}</div>
      <div class="device_name">{{ title.DeviceName }}</div>
    </div>

  </div>
</template>

<script>
/* fonoapi set up */
var fonoapi = require('fonoapi-nodejs')
fonoapi.token = 'c43991b829e7cce167bd46f43dec067c5a56d8b1b821fada'

export default {
  name: 'TitleList',
  props: {
    renderList: Array
  },
  data () {
    return {
      deviceKey: this.renderList[0],
      brandKey: this.renderList[1],
      modeKey: this.renderList[2],
      titles: [], // complete results from api
      render_titles: [], // list of titles need to render per page
      limit: 10,
      details: '',
      page: 1,
      isLoading: true,
      max_page: 10,
      search_key: 'Latest',
      isFail: false,
      filter_device: '',
      filter_brand: ''
    }
  },

  watch: {
    renderList (newVal, oldVal) {
      // listen to props update
      this.deviceKey = newVal[0]
      this.brandKey = newVal[1]
      this.modeKey = newVal[2]
      this.getDevices()
    }
  },

  methods: {

    sub_title () {
      return (this.modeKey === 'latest') ? 'Latest Devices' : 'Search for'
    },

    getTitles (queryString, data) {
      /* display only 10 devices per page */
      this.search_key = queryString
      this.isLoading = false
      if (data.status === 'error') {
        this.isFail = true
      } else {
        this.max_page = Math.ceil(this.$data.titles.length / this.$data.limit)
        this.isFail = false
        this.titles = data
        this.render_titles = this.titles.slice((this.page - 1) * this.limit, this.page * this.limit)
      }
    },

    getDevices () {
      if (this.modeKey === 'latest') {
        fonoapi.getLatest(this.getTitles, null, this.filter_brand)
      } else {
        if (this.deviceKey === '' && this.brandKey === '') {
          // if users do not type anything but use search tool, return latest devices
          fonoapi.getLatest(this.getTitles)
        } else {
          fonoapi.getDevices(this.getTitles, this.deviceKey, this.brandKey)
        }
      }
    },

    handleFilter () {
      fonoapi.getLatest(this.getTitles, null, this.filter_brand)
    },

    clearText () {
      this.filter_brand = ''
      this.getDevices()
    },

    getDetail (name) {
      this.$emit('viewDevice', name)
    },

    prePage () {
      // only flip page if page number is valid
      if (!(this.$data.page < 2)) {
        this.$data.page = this.$data.page - 1
        this.$data.render_titles = this.$data.titles.slice((this.$data.page - 1) * this.$data.limit, this.$data.page * this.$data.limit)
      }
    },

    nextPage () {
      if ((this.$data.page + 1) <= this.max_page) {
        this.$data.page = this.$data.page + 1
        this.$data.render_titles = this.$data.titles.slice((this.$data.page - 1) * this.$data.limit, this.$data.page * this.$data.limit)
      }
    },

    changePage () {
      if (this.page <= this.max_page) {
        this.render_titles = this.titles.slice((this.page - 1) * this.limit, this.page * this.limit)
      }
    }
  },
  beforeMount () {
    this.getDevices()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import './TitleList.css';
  @import './DeviceList.css';
</style>
