<template>
    <scroll class="listview" :data=data ref="listview" :listenscroll="listenscroll" @scroll="scroll" :probeType="probeType">
        <ul>
            <li class="list-group" v-for="(item,index) of data" :key="index" ref="listgroup">
                <h2 class="list-group-title">{{item.title}}</h2>
                <ul>
                    <li class="list-item" v-for="(singer,index) of item.item" :key="index" @click="selectitem(singer)">
                        <img v-lazy="singer.avator" alt="" class="item-img" width="50" height="50">
                        <span class="item-name">{{singer.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchmove">
            <ul>
                <li v-for="(item,index) of _shotcart" :key="index" class="item" :class="{'current':active===index}" :data-index="index">{{item}}</li>
            </ul>
        </div>
        <div class="last-title" v-show="title" ref=fixed>
            <h2 class="title">{{title}}</h2>
        </div>
        <div class="loadings" v-show="!data.length">
            <loadding></loadding>
        </div>
    </scroll>
</template>
<script>
import scroll from './scroll'
import { getData } from '../common/js/dom';
import { delay } from 'q';
import anymatch from 'anymatch';
import { setTimeout } from 'timers';
import loadding from './loading'
import singerDetail from '../components/singer-detail/singer-detail'
export default {
    components:{scroll,loadding,singerDetail},
    props:{
        data:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            // 右侧高亮显示
            active:0,
            // 左侧滚动多少
            scrollY:-1,
            probeType:3,
            diff:-1,
        }
    },
    created(){
        this.touch={},
        this.listenscroll=true
        this.listHeight=[]
        
    },
    methods:{
        selectitem(item){
            this.$emit('select',item)
        },
        onTouchStart(e){
            // 获取点击元素的每个自定义属性
            let anthorIndex=parseInt(getData(e.target,'index')) 
            // 调用scroll组件中滚动方法
            let firsttouch=e.touches[0]
            // 第一次点击的pagey
            this.touch.y1=firsttouch.pageY
            // 第一次点击的下标
            this.touch.anthorIndex=anthorIndex
            this._scrollTo(anthorIndex)
        },
        onTouchmove(e){
           let firsttouch=e.touches[0]
           this.touch.y2=firsttouch.pageY
           let delat=Math.floor((this.touch.y2 - this.touch.y1) / 18)
           let anthorIndex=this.touch.anthorIndex+delat
           this._scrollTo(anthorIndex)
        },
        // this.$emit 方法
        scroll(pos){
            // 监听滚动事件 把滚动了多少给scrollY
          this.scrollY=pos.y
        },
        _scrollTo(index){
            // 点击时候滚动 并且高亮
            // 如果点击的两端 则直接返回  0 也是false 所以也要
            if (!index && index!==0) {
                return
            }
            // console.log(this.listHeight)
            // 滑动到两端的优化
            if (index < 0) {
                index = 0
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2
            }
           
            this.scrollY=-this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0)
        },
        // 计算高度 右侧每一栏的高度
        _calheight(){
            this.listHeight=[];
            let listgroup=this.$refs.listgroup
            let height=0
            this.listHeight.push(height)
            for(let i=0;i<listgroup.length;i++){
                let item=listgroup[i]
                height+=item.clientHeight
                this.listHeight.push(height)
            }
        }
    },
    computed:{
        // 计算属性，得出右边的数据
        _shotcart(){
            // map  也相当于遍历
           return this.data.map((group)=>{
                return group.title.substr(0, 1)
            })
        },
        title(){
            // 由于active会随着滚动一直改变 所以计算属性也会一直改变
            if(this.scrollY>0){
                return ''
            }
            if(this.data.length>0){
                return this.data?this.data[this.active].title:''
            }
        }
    },
    watch:{
        data(val){
            setTimeout(()=>{
                this._calheight();
            },20)
        },
        scrollY(newY){
            newY=-newY
            let listHeight=this.listHeight
            // 滚动到顶部 超过顶部 
            if(newY<0){
                this.active=0
                return
            }
            // 滚动到中间部分 
            // console.log(this.listHeight)
            for (let i=0;i<listHeight.length-1;i++){
                let height1=listHeight[i]
                let height2=listHeight[i+1]
                if(newY>=height1 && newY< height2){
                    this.active=i
                    this.diff=height2-newY
                    return
                }
            }
            // 当滚动到底部后一直滚动
            if(newY>listHeight.slice(-1)){
                this.active=listHeight.length-1
            }
        },
        diff(newval){
            let fixtop = (newval>0&&newval<30)?newval-30:0
            if(this.fixtop===fixtop){
                return
            }
            this.fixtop=fixtop
            this.$refs.fixed.style.transform=`translate3d(0,${fixtop}px,0)`
        }
        
    }
    

}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/variable.styl';
    .listview
        width 100%
        height 100%
        overflow hidden
        background: $color-background
        position relative
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background 
            ul
                .list-item
                    display: flex
                    align-items: center
                    padding: 20px 0 0 30px
                .item-img
                    border-radius 50%
                .item-name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium 
        .list-shortcut
            position absolute
            z-index 30
            top 50%
            right 10px
            transform translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .last-title
            position absolute
            top -1px
            width 100%
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: $font-size-small
            color: $color-text-l
            background: $color-highlight-background 
            .title
                width 100%
        .loadings   
            width 100%
            position absolute
            top 50%
            transform translateY(-50%)
</style>


