<template>
    <div class="play" v-show="playList.length>0">
        <div class="normalplay" v-show="fullscreen">
            <div></div>
        </div>
        <div class="miniplay" v-show="!fullscreen">
            <div>

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
    }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
@import '../../common/stylus/mixin.styl';
.play
    .normalplay
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 150
        background $color-background
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
