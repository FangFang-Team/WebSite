import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Function from '@/components/Function.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Function',
      name:'Function',
      component: Function
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
