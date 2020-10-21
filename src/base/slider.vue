<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="slidergroup">
            <slot></slot>
        </div>
        <!-- 标点 -->
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :key="index" :class="{'active':currentPageIndex===index}"></span>
        </div>
    </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import {hasclass,addclass} from '../common/js/dom.js'
import { setTimeout, setInterval, clearTimeout } from 'timers';
BScroll.use(Slide)
export default {
    // 支持的功能
    data(){
        return {
            dots:[],
            currentPageIndex:0
        }
    },
    props:{
        // 循环轮播
        loop:{
            type:Boolean,
            default:true
        },
        // 自动
        autoPlay:{
            type:Boolean,
            default:true
        },
        interval:{
            type:Number,
            default:2000
        }
    },
    mounted(){
        // 初始化bscroll 
        // 可以使用this.$nexttick
        // 但是不推荐 
        this._setsliderwidth();
        setTimeout(()=>{
            // 在初始化better 之前计算dots的数量 因为 better 中loop会 克隆两个dom元素 这样就会多出两个
            this._initdots();
            this._initslider();
        },20)
        // 优化
        // 监听浏览器窗口大小变化的事件 当浏览器窗口变化时候
        // 重新计算宽度
        // 根据视口的大小来做出改变
        window.addEventListener('resize',()=>{
            // 如果slider 滚动没有被创建 直接返回
            if(!this.slider){
                return
            }
            // 重新计算 宽度 
            this._setsliderwidth(true);
            this.slider.refresh();
        })
        // 20ms
    },
    // destroyed(){
    //     clearTimeout(this.timer)
    // },
    methods:{
        // 计算宽度 初始化宽度 
        _setsliderwidth(isresize){
            // 拿到所有的子元素
            this.children=this.$refs.slidergroup.children
            // .children 打印出来是其所有子元素的元素节点 如果相同则为数组
            let width=0;
            // 总div的宽
            let sliderwidth=this.$refs.slider.clientWidth
            
            for(var i=0;i<this.children.length;i++){
                let child=this.children[i]
                // 在这里有个坑，因为recommend是获取的真实数据 异步请求，所以会存在延迟，此时我们已经在mounted中执行了，所以他获取不到
                // dom 所以要确保页面渲染完成后才执行    在slider 组件的父元素中加入v-if 确保整个dom已经渲染完成
                // 添加一个calss属性 引入dom中的文件
                addclass(child,'slider-item') 
                child.style.width=sliderwidth+"px"
                width+=sliderwidth
            }
            this.$refs.slidergroup.style.width=width+'px'
        },
        // 初始化bs
        _initslider(){
            // 初始化 滚动
            this.slider=new BScroll(this.$refs.slider,{
                    scrollX: true,
                    scrollY: false,
                    slide: {
                       loop:this.loop,
                       autoplay: this.autoPlay,
                       interval:this.interval
                    },
                    momentum: false,
                    bounce: false,
                    stopPropagation: true,
                    click:true
            })
            // 监听滚动事件 滑动的时候改变current
            this.slider.on('scrollEnd',()=>{
                // slider 实例的方法 返回滚动的位置
                let pageIndex=this.slider.getCurrentPage().pageX
                this.currentPageIndex=pageIndex
               
            })
        },
        // 设置dots 
        // dots的数量是轮播图的child的长度 然后遍历这个dots 
        // 监听滚动事件，当滑动的时候添加active 元素
        _initdots(){
            // 这个方法一定要在beterr-scroll初始化之前使用，因为初始化之后 dom长度就会变成多个 
            // 因为 better-scroll loop会克隆两个dom元素 做循环
            this.dots=new Array(this.children.length)
        },
    }

}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/variable.styl';
    .slider
        min-height 1px
        .slider-group
            position relative
            overflow hidden
            white-space nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display block
                    width 100%
                    // height 150px
                img  
                    display block
                    width 100%
        .dots
            position absolute
            right 0
            left 0
            bottom 10px
            text-align center
            font-size 0
            .dot
                display inline-block
                margin 0 4px
                width 8px
                height 8px
                border-radius 50%
                background $color-text-l
                &.active
                    width 20px
                    border-radius 5px
                    background $color-text-ll

</style>

