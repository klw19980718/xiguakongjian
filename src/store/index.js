import Vue from 'vue'
import Vuex from 'vuex'
import {playMode} from '../common/js/config.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    // 歌手信息
    singer:{},
    // 播放状态
    play:false,
    // 全屏
    fullscreen:false,
    // 播放列表
    playList:[],
    // 播放顺序列表
    sequenceList:[],
    // 播放模式 （顺序播放）
    mode:playMode.sequence,

    currentIndex:-1,
  },
  getters:{
    // 访问歌手
    singer(state){
      return state.singer
    },
    // 访问play
    play(state){
      return state.play
    },
    // 访问
    fullscreen(state){
      return state.fullscreen
    },
    playList(state){
      return state.playList
    },
    sequenceList(state){
      return state.sequenceList
    },
    mode(state){
      return state.mode
    },
    currentIndex(state){
      return state.currentIndex
    },
    currentSong(state){
      return state.playList[state.currentIndex] || {}
    }

  },
  mutations:{
    // 修改歌手
    SET_SINGER(state,singer){
      state.singer=singer
    },
    // 修改播放状态
    SET_PLAY(state,play){
      state.play=play
    },
    // 修改全屏
    SET_FULLSCREEN(state,screen){
      state.fullscreen=screen
    },
    // 修改播放列表
    SET_PLAYLIST(state,playList){
      state.playList=playList
    },
    // 修改 无序播放列表
    SET_SEQUENCELIST(state,sequenceList){
      state.sequenceList=sequenceList
    },
    // 设置播放模式
    SET_MODE(state,mode){
      state.mode=mode
    },
    // 设置歌曲的下表 在songs中的下表
    SET_CURRENTINDEX(state,currentIndex){
      state.currentIndex=currentIndex
    }
  },
  actions:{
    // 修改播放开始 
    selectPlay({commit},{songs,index}){
      // console.log(state,commit)
      // 提交修改状态 全平 歌曲下标 歌单 
      commit('SET_PLAY',true),
      commit('SET_FULLSCREEN',true)
      commit('SET_CURRENTINDEX',index)
      commit('SET_PLAYLIST',songs)
      commit('SET_SEQUENCELIST',songs)
    }
  },
  modules: {
  }
})
