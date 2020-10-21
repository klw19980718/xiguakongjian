<template>
    <div class="music-list">
        <div class="back">
            <i class="icon-back" @click="back"></i>
        </div>
        <h2 class="title">{{title}}</h2>
        <div class="ba-image" :style="bastyle" ref="baimg">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length" ref="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="balayer"></div>
        <scroll @scroll=scroll :data="songs" class="list" ref="list" :probeType="probeType" :listenscroll="listenscroll">
            <div class="song-list-wrapper">
                <song-list @select="selectItem" :songs="songs"></song-list>
            </div>
            <div class="loadding" v-show="!songs.length">
                <load-ing></load-ing>
            </div>
        </scroll>
    </div>
</template>
<script>
import songList from '../../base/songlist'
import scroll from '../../base/scroll'
import loadIng from '../../base/loading.vue'
import {mapActions} from 'vuex'
export default {
    components:{songList,scroll,loadIng},
    props:{
        baImage:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default(){
                return []
            }
        },
        title:{
            type:String,
            default:''
        }
    },
    created(){
        this.probeType=3
        this.listenscroll=true
    },
    mounted(){
        this.imgheight=this.$refs.baimg.clientHeight
        this.minTranslateY=-this.imgheight+40
        this.$refs.list.$el.style.top=`${this.imgheight}px`
    },
    data(){
        return {
            scrollY:0,
        }
    },
    methods:{
        // scroll 组件派发的组件
        scroll(pos){
            this.scrollY=pos.y
        },
        back(){
            this.$router.back()
        },
        selectItem(song,index){
            this.selectPlay({
                songs:this.songs,
                index:index
            })
        },
        ...mapActions({
            selectPlay:'selectPlay'
        })
    },
    watch:{
        scrollY(newY){
            let tranlateY=Math.max(this.minTranslateY,newY)
            let zIndex=0
            let scale=1
            this.$refs.balayer.style['transform']=`translate3d(0,${tranlateY}px,0)`
            const percent=Math.abs(newY/this.imgheight)
            if(newY>0){
                scale=1+percent
                zIndex=10
            }else{
                blur=Math.min(20*percent,20)
            }
            this.$refs.filter.style['backdrop-filter']=`blur(${blur}px)`
            if(newY<this.minTranslateY){
                zIndex=10
                this.$refs.baimg.style.paddingTop=0
                this.$refs.baimg.style.height=`40px`
                this.$refs.play.style.display='none'
            }else{
                this.$refs.baimg.style.paddingTop='70%'
                this.$refs.baimg.style.height=`0`
                 this.$refs.play.style.display=''
            }
            this.$refs.baimg.style.zIndex=zIndex
            this.$refs.baimg.style.transform=`scale(${scale})`
        }
    },
    computed:{
        bastyle(){
             return `background-image:url('${this.baImage}')`
        }
    },
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
@import '../../common/stylus/mixin.styl';
.music-list
    position fixed
    top 0
    bottom 0
    left  0
    right 0
    background $color-background
    z-index 50
    .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
            display block
            padding 10px
            font-size: $font-size-large-x
            color: $color-theme
    .title
        position: absolute
        top: 0
        left: 10%
        z-index: 40
        width: 80%
        no-wrap()
        text-align: center
        line-height: 40px
        font-size: $font-size-large
        color: $color-text
    .ba-image
        position: relative
        width: 100%
        height: 0
        padding-top: 70%
        transform-origin: top
        background-size: cover
        .play-wrapper
            position: absolute
            bottom: 20px
            z-index: 50
            width: 100%
            .play
                box-sizing: border-box
                width: 135px
                padding: 7px 0
                margin: 0 auto
                text-align: center
                border: 1px solid $color-theme
                color: $color-theme
                border-radius: 100px
                font-size: 0
                .icon-play
                    display: inline-block
                    vertical-align: middle
                    margin-right: 6px
                    font-size: $font-size-medium-x
                .text
                    display: inline-block
                    vertical-align: middle
                    font-size: $font-size-small
        .filter
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        background: $color-background
        .song-list-wrapper
            padding: 20px 30px
</style>