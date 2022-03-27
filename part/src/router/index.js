import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import functions from '../components/functions.vue'
import login from '../components/login.vue'
import data_center from '../components/data_center.vue'
import inter_ann from '../components/inter_ann.vue'
import street_v_c from '../components/street_v_c.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import fs from 'fs'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(qs)
Vue.use(fs)
export default new Router({
  mode:"history",
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta:{
        title: '首页'
    }
    },
    {
      path: '/functions',
      name:'functions',
      component: functions,
      meta:{
        title: '街景分类'
    }
    },
    {
      path:'/login',
      name:'login',
      component: login,
      meta:{
        title: '登录'
    }
    },
    {
      path:'/data_center',
      name:'data_center',
      component: data_center,
      meta:{
        title: '数据中心'
    }
    },
    {
      path:'/inter_ann',
      name:'inter_ann',
      component: inter_ann,
      meta:{
        title: '交互式标注'
    }
    },
    {
      path:'/street_v_c',
      name:'street_v_c',
      component: street_v_c,
      meta:{
        title: '街景分类'
    }
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
