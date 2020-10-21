<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(item,index)" v-for="(item,index) of songs" :key="index" class="item">
                <div class="content">
                    <h2 class="name">{{item.name}}</h2>
                    <p class="desc">{{getdesc(item)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        songs:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        selectItem(item,index){
            this.$emit('select',item,index)
        },
        getdesc(item){
            return `${item.singer}·${item.name}`
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/variable.styl';
@import '../common/stylus/mixin.styl';
    .song-list
        .item
            display flex
            align-items center
            box-sizing border-box
            height 64px
            font-size $font-size-medium
            .content
                flex 1
                line-height 20px
                overflow hidden
                .name
                    no-wrap()
                    color $color-text
                .desc
                    no-wrap()
                    margin-top: 4px
                    color: $color-text-d
</style>

