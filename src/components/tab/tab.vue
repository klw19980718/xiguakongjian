<template>
    <div class="tab">
        <router-link to="/recommend" tag="div" class="tab-item">
            <span class="link">推荐</span>
        </router-link>
        <router-link to="/single" tag="div" class="tab-item">
            <span class="link">歌手</span>
        </router-link>
        <router-link to="/rank" tag="div" class="tab-item">
            <span class="link">排行</span>
        </router-link>
        <router-link to="/search" tag="div" class="tab-item">
            <span class="link">搜索</span>
        </router-link>
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
    .tab
        display flex
        height 44px
        line-height 44px
        text-align center
        .tab-item
            flex 1
            color $color-text-d
        .router-link-active
            color $color-theme
            .link
                padding-bottom 5px
                border-bottom 2px solid $color-theme
</style>

