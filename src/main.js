import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import VueLazyload from 'vue-lazyload'


import '../src/common/stylus/index.styl'
Vue.use(VueLazyload,{
  loading:require('../src/common/image/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
