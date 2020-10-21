<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="disclist">
            <!-- 套一层子元素 -->
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="(item,index) of recommends" :key="index" class="test">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" alt="" @load="imageload">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热歌推荐</h1>
                    <ul>
                        <li class="item" v-for="(item,index) of disclist" :key="index">
                            <div class="icon">
                                <img v-lazy="item.imgurl" alt="" width="60" height="60">
                            </div>
                            <div class="text">
                                <h1 class="name">{{item.creator.name}}</h1>
                                <div class="desc">{{item.dissname}}</div>
                            </div>
                        </li>
                    </ul> 
                    <loading v-if="!disclist.length"></loading> 
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
import slider from '../../base/slider'
import {getRecommend,getDiscList,test} from '../../api/recommend.js'
import {ERR_OK} from '../../api/config.js'
import scroll from '../../base/scroll'
import { setTimeout } from 'timers';
import loading from '../../base/loading'
export default {
    components:{slider,scroll,loading},
    data(){
        return {
            recommends:[],
            disclist:[],
        }
    },
    created(){
        // 此时请求为异步 ，在主程序执行完之后 callback 执行
        this._getRecommend()
        // 获取歌单信息
        // 在scroll组件中 依靠 disclist的数据来进行计算高度 ，但是轮播图与歌单的都是异步 ，并不能
        // 确定哪一个返回的快 ，此时disclist返回的快，因此当scroll计算高度的时候不会吧轮播图的高度也会计算进去
        // 所以会造成一段空缺 
       
         this._getDiscList()
        
    },
    watch:{
        
    },
    methods:{
        // 轮播图 
        _getRecommend(){
            getRecommend().then((res)=>{
                if(res.code === ERR_OK){     
                    this.recommends=res.data.slider
                }
            })
        },
        _getDiscList(){
            getDiscList().then((res)=>{
                if(res.code===ERR_OK){
                    this.disclist=res.data.list
                }
                // console.log(this.disclist)
            })
        },
        imageload(){
            this.$refs.scroll.refresh();
        }
    }
    
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';

    .recommend
        position fixed
        width 100%
        top 88px
        bottom 0
        .recommend-content
            height 100%
            overflow hidden
            width 100%
            .slider-wrapper
                position relative
                width 100%
                overflow hidden    
            .recommend-list
                .list-title
                    height 65px
                    line-height 65px
                    text-align center
                    font-size $font-size-medium
                    color $color-theme
                .item
                    display flex
                    box-sizing border-box
                    align-items center
                    padding 0 20px 20px 20px
                    .icon
                        flex 0 0 60px
                        width 60px
                        padding-right 20px 
                    .text
                        display flex
                        flex 1
                        flex-direction column
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom 10px
                            color  $color-text
                        .desc
                            color: $color-text-d
                            font-size $font-size-medium
</style>

