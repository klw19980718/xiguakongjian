<template>
  <div id="app">
      <!-- 头部 -->
      <m-header></m-header>
      <!-- tab页 -->
      <tab></tab>
      <!-- tab的出口 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <player></player>
  </div>
</template>
<script>
import mHeader from './components/m-header/MHeader.vue'
import tab from './components/tab/tab.vue'
import player from './components/player/player.vue'
// 引入的js文件 其文件中的变量可以直接使用，不需要加this 此时this已经指向vue
// import all from './common/js/test' 
import {getRecommend} from './api/recommend.js'
export default {
  components:{mHeader,tab,player},
  created(){
    
  }
}
</script>
<style lang="stylus" scoped>
  // 引入样式变量
  @import '../src/common/stylus/variable.styl';
  
</style>
