<template>
    <div class="loading">
        <div class="icon"><img width="16" height="16" src="../common/image/loading.gif" alt=""></div>
        <div class="text">{{text}}</div>
    </div>
</template>
<script>
export default {
    props:{
        text:{
            type:String,
            default:'加载中···'
        }
    },
}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/variable.styl';
    .loading
        text-align center
        .icon
            width 100%
            margin-bottom 5px
        .text
            color $color-text-d
            font-size $font-size-medium
</style>


