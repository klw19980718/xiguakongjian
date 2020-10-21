<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import { setTimeout } from 'timers';
export default {
    props:{
        probeType:{
            type:Number,
            default:1,
        },
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default(){
                return []
            }
        },
        listenscroll:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        setTimeout(()=>{
            this._initscroll()
        },20)
    },
    methods:{
        _initscroll(){
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll=new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:this.click,
            })
            if(this.listenscroll){
                this.scroll.on('scroll', pos=>{
                    this.$emit('scroll',pos)
                })
            }
        },
        // 封装的一些scroll方法
        refresh(){
            // 当dom结构改变时候 重新计算高度 以及 宽度
            this.scroll&&this.scroll.refresh();
        },
        scrollTo(){
            this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        scrollToElement(){
            this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
        }
    },
    watch:{
        data(val){
            // 再刷新的时候一定要确保dom渲染完成 倒计时或者settimeout
            // console.log(val)
            if(this.scroll){
                setTimeout(()=>{
                    this.refresh()
                },20)
            }
        }
    }

}
</script>
<style lang="stylus" scoped>

</style>


