<template>
<transition appear="" name="slide">
    <music-list :songs="songs" :title="title" :baImage="baImage"></music-list>
</transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {getSingerDetail} from '../../api/singer.js'
import { createSong, isValidMusic, processSongsUrl } from '../../common/js/song.js'
import musicList from '../musci-list/music-list.vue'
// import {test} from '../../common/js/test.js'
export default {
    components:{musicList},
    computed:{
        // 映射vuex中getters
        ...mapGetters(['singer']),
        title(){
            return this.singer.name
        },
        baImage(){
            return this.singer.avator
        }
    },
    created(){
        this._getsingerdetail()
        // console.log(this.singer)
        
    },
    data(){
        return {
            songs:[]
        }
    },
    methods:{
        ...mapMutations({setsinger:'SET_SINGER'}),
        // 获取歌手的歌曲
        _getsingerdetail(){
            if(!this.singer.id){
                this.$router.push('/recommend')
                return
            }
            // 获取歌手的歌曲
            getSingerDetail(this.singer.id).then((res)=>{
                if(res.code===0){
                   processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
                        this.songs = songs
                        // console.log(this.songs,this.singer)
                    })
                }
            })
        },
        _normalizeSongs (list) {
            let ret = []
            list.forEach((item) => {
            let { musicData } = item
            if (isValidMusic(musicData)) {
                ret.push(createSong(musicData))
            }
            })
            return ret
      }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl';
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>