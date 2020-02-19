import { isArray } from "util";

import http from '../utils/http';
// import Vue from 'vue';
// import router from '../router'
// import generateSocket from "../utils/ws";

export default {
  namespaced: true,
  state: {
    friendsList: [],
    friendRequestMessage: [],//requesterWxId, words,time
    replyMessage: []

  },

  mutations: {
    setFriendList(state, arr) {
      state.friendsList = arr
    },
    addReplyMessage(state, messge) {
      state.replyMessage.push(messge)
    },
    setReplyMessage(state, messageArr) {//异步
      state.replyMessage = messageArr

    },

    // setAvatar(state, url) { //设置头像
    //   state.currentSpeaker = Object.assign({}, state.currentSpeaker, { avatarUrl: url })
    // },
    setFriendRequestMessage(state, messageArr) {//添加 异步
      state.friendRequestMessage = messageArr
    },
    addRequestMessage(state, messageArr) {//好友想我发出申请申请
      const tempArr = state.friendRequestMessage;
      state.friendRequestMessage = [...tempArr, ...messageArr]
    },
    spliceFriendRequestMessage(state, index) {
      state.friendRequestMessage.splice(index, 1)

    },
    setReplyMessage(state, messageArr) {//添加 异步
      // console.log(messageArr);
      if (messageArr) {
        state.replyMessage = messageArr
      }
    },
    addCurrentReplyMessage(satae, messageObj) { //后端主动给返回的socket
      const replyMessage = state.replyMessage;
      state.replyMessage = [...replyMessage, messageObj];
      console.log(state.replyMessage);
    }
  },

  actions: {
    // async getFriendList({ commit }) {

    //   // const prof = await http.getCurrentSpeaker();

    //   // commit('setCurrentSpeaker', prof.data.data);
    //   // generateSocket( prof.data.data.wxId)//成功登录后也上线socket上线
    // },
    async getFriendRequestMessage({ commit }) {
      const data = await http.getFriendRequestMessage();
      commit('setFriendRequestMessage', data.data)
    },
    async getReplyMessage({ commit }) {
      const data = await http.getReplyMessage();
      commit('setReplyMessage', data.data)
    },
    async getFriendList({ commit }) {
      const data = await http.getFriendList();
     
      commit('setFriendList', data.data)
    }






  }


}