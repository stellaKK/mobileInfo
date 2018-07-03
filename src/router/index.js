import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Explore from '@/components/explore/Explore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    }
  ],
  mode: 'history'
})
