<template>
    <div class="single">
        <list-view :data=singerList @select="selectsinger"></list-view>
        <router-view></router-view>
    </div>
</template>
<script>
import ListView from '../../base/listview'
import {getSingerList} from '../../api/singer.js'
import {Singer} from '../../common/js/singer.js'
import {getData} from '../../common/js/dom.js'
import singerDetail from '../singer-detail/singer-detail'
// 映射vuex中mutatons的方法
import {mapMutations} from 'vuex'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
    components:{ListView,singerDetail},
    data(){
        return {
            singerList:[]
        }
    },
    created(){
        this._getSingerList();
    },
    methods:{
        ...mapMutations({setsinger:'SET_SINGER'}),
        // 传过来的方法
        selectsinger(singer){
            // console.log(singer)
            // 跳转子路由 并且传递参数
            this.$router.push({
                path:`/singer/${singer.id}`
            })
            this.setsinger(singer)
        },
        _getSingerList(){
            getSingerList().then((res)=>{
                if(res.code === 0){
                    // console.log(res)
                    this.singerList=this._normalizeSinger(res.data.list)
                    // console.log(this.singerList)
                }
            })
        },
        // 修改数据为自己用的数据
        _normalizeSinger(list){
            let map={
                hot:{
                    title:HOT_NAME,
                    item:[]
                }
            }
            list.forEach((item,index) => {
                // 获得排前十的歌手
                if(index<HOT_SINGER_LEN){
                    map.hot.item.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }))
                }

                const key=item.Findex
                // 对象中. 不可以使用变量 但是括号可以 以后直接用括号
                if(!map[key]){
                    map[key]={
                        title:key,
                        item:[],
                    }
                }
                map[key].item.push(new Singer({
                    id:item.Fsinger_mid,
                    name:item.Fsinger_name
                }))
            });
            // 为了得到有序列表 处理map列表
            let hot=[]
            let ret=[]
            let reg = new RegExp(/[a-zA-Z]/)
            for (var key in map){
                let val=map[key]
                if(reg.test(val.title)){
                    ret.push(val)
                }else{
                    hot.push(val)
                }
            }
            let nine=hot.shift();
            hot[0].item.push(nine.item[0])
            ret.sort((a,b)=>{
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            }) 
            return hot.concat(ret)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .single
        position fixed
        top  88px
        bottom 0
        left 0
        width 100%
</style>

