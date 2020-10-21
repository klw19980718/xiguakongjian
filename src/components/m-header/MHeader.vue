<template>
    <div class="mheader">
        <div class="headerwrap">
            <div class="icon"></div>
            <div class="title">Hellow-Music</div>
            <div class="mine"><i class="icon-mine"></i></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
@import '../../common/stylus/mixin.styl';
    .headerwrap
        position relative
        display flex
        justify-content center
        align-items center
        height 44px
        line-height 44px
        font-size $font-size-large
        color $color-theme
        .icon
            width 30px
            height 32px
            background-image url('logo@2x.png')
            background-size 100%
            @media (min-device-pixel-ratio: 3) {
                background-image url('logo@3x.png')
            }
            margin-right 5px 
        .mine
            position absolute
            right 0
            padding 10px
            .icon-mine
                color $color-theme
                font-size $font-size-large
</style>


