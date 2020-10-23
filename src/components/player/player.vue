<template>
    <div class="player" v-show="playList.length>0">
        <div class="normalplay" v-show="fullscreen">
            <div class="background">
                <img src="" alt="" width="100%" height="100%">
            </div>
            <div class="top">
                <div class="back">
                    <i class="icon-back"></i>
                </div>
                <div class="title">asda</div>
                <div class="subtitle">dsadsa</div>
            </div>
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <div class="cd">
                            <img class="image" src="" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="operators">
                    <div class="icon i-left">
                        <i class="icon-sequence"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-prev"></i>
                    </div>
                    <div class="icon i-center">
                        <i class="icon-play"></i>
                    </div>
                    <div class="iocn i-right">
                        <i class="icon-next"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon icon-not-favorite"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="miniplay" v-show="!fullscreen"> 
            <div class="icon">
                <img width="40" height="40" src="" alt="">
            </div>
            <div class="text">
                <h2 class="name"></h2>
                <p class="desc"></p>
            </div>
            <div class="control"></div>
            <div class="control">
                <i class="icon-olaylist"></i>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        // 把vuex中的getters映射出来 是一个数组 
        ...mapGetters(['fullscreen','playList'])
    },

}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
@import '../../common/stylus/mixin.styl';
.player
    .normalplay
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 150
        background $color-background
        .background
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            z-index -1
            opacity 0.6
            filter blur(20px)
        .top
            position: relative
            margin-bottom: 25px
            .back
                position absolute
                top 0
                left 6px
                z-index 50
                .icon-back
                    display block
                    padding 6px
                    font-size $font-size-large-x
                    color $color-theme
                    transform rotate(-90deg)
            .title
                width 100%
                text-align center
                color $color-text
                font-size $font-size-large
                line-height 40px
            .subtitle
                text-align center
                font-size: $font-size-medium
                color: $color-text
                line-height: 20px
        .middle
            position fixed
            top 80px
            bottom 160px
            left 0
            width 100%
            .middle-l
                display: inline-block
                vertical-align: top
                position: relative
                width: 100%
                height: 0
                padding-top: 100%
            
    .miniplay
        display flex
        align-items center
        position fixed
        left 0
        bottom 0
        z-index 150
        width 100%
        height 60px
        background $color-highlight-background

</style>
