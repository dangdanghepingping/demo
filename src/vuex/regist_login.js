
import http from '../utils/http';
import Vue from 'vue';
import router from '../router'
import generateSocket from "../utils/ws";

export default {
  namespaced: true,
  state: {
    currentSpeaker: {
      nickName: '',
      wxId: '',
      area: '',
      avatarUrl: '',
      gender: '',
      age: '',
    }
  },

  mutations: {

    setCurrentSpeaker(state, obj) { //设置当前用户
      state.currentSpeaker = Object.assign({}, state.currentSpeaker, obj);
    },
    setAvatar(state, url) { //设置头像
      state.currentSpeaker = Object.assign({}, state.currentSpeaker, { avatarUrl: url })
    }
  },

  actions: {
    async getCurrentSpeaker({ commit }) {

      const prof = await http.getCurrentSpeaker();

      commit('setCurrentSpeaker', prof.data.data);
      generateSocket( prof.data.data.wxId)//登录成功后, socket此时开始连接
    },

    async sendAvatar({ commit }, file) {
      var fd = new FormData();
      fd.append("file", file);
      const data = await http.postAvatar(fd);
      if (data.data.mes == "ok") {
        commit('setAvatar', '/getPic/' + data.data.filename)
      }
    },
    
  //   async login({ state, commit }, file) {
  //     const res = await http.login(file);//逻辑写错了,这块应该分开,登录在login页面写 返回值然后去触发mapstate里的setProfile
  //     const result = res.data;
  //     const data = result.data;
  //    //设置token 到localstorage
  //     localStorage.token = result.token;
  //     // 设置currentspeaker
  //     const  { age, area,gender} = data;
  //     let obj = {
  //       age,
  //       area,
  //       gender,
  //       nickName: data.u_name,
  //       wxId: data.wx_id
  //     };
  //     commit('setCurrentSpeaker', obj)
  //   }
  }


}