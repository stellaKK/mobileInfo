<template>
  <div name="home" class="home">
    <img src="../assets/logo.png">
    <h1>{{ head }}</h1>
    <router-link class="explore_btn" to="/explore">Explore</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      head: 'Mobile Info.',
      sub_head: 'World of Mobile Devices'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import './main.css';
  @import './home.css';
</style>
