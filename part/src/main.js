// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Function from './components/Function.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

/* eslint-disable no-new */
const routes=[
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
const routers=new VueRouter({
  routes
});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
