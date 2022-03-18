import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import functions from '../components/functions.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(qs)
export default new Router({
  mode:"history",
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/functions',
      name:'functions',
      component: functions
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
