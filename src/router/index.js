import Vue from 'vue'
import VueRouter from 'vue-router'
import rank from '../components/rank/rank'
import recommend from '../components/recommend/recommend'
import single from '../components/single/single'
import search from '../components/search/search'
import singerdetail from '../components/singer-detail/singer-detail'

Vue.use(VueRouter)

const routes = [
  
  // 设置默认加载的路由
  {
    path:'/',
    redirect:'/recommend'
  },
  {
    path:'/rank',
    component:rank
  },
  {
    path:'/recommend',
    component:recommend
  },
  {
    path:'/single',
    component:single,
    // 设置子路由
    children:[
      {
        path:'/singer/:id',
        component:singerdetail
      }
    ]
  },
  {
    path:'/search',
    component:search
  },
]

const router = new VueRouter({
  routes
})

export default router
