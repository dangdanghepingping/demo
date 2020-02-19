import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import http from '../utils/http'
import { stat } from 'fs';


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentSpeaker: { //我是谁
      name: '',
      wxId: undefined,
      area: '',
      avatarUrl: '',
      gender: '',
      age: 0
    },
    currentListenner: {// 在和谁聊天 (个人/群信息)
      // goupId: '',//如果有则表示是群聊,
      name: '小叶子',
      id: 1,
      avatar: require('@/assets/avatar.jpg')
    },
    currentInput: '',//当前我输入的内容


    currentConversition: [{//请求回来的
      speaker: '轻舞飞扬',
      listenner: '小叶子',
      listennerId: 1,
      speakerId: 2,
      content: '你知道新华书店怎么走吗你知道新华书店怎么走吗你知道新华书店怎么走吗你知道新华书店怎么走吗你知道新华书店怎么走吗你知道新华书店怎么走吗',
      time: '2019/10/1 10:11:11'
    }, {
      listennerId: 2,
      speakerId: 1,
      speaker: '小叶子',
      listenner: '轻舞飞扬',
      content: '知道, 就是不告诉你',
      time: '2019/10/1 10:11:11'
    }, {
      listennerId: 1,
      speakerId: 2,
      speaker: '轻舞飞扬',
      listenner: '小叶子',
      content: '你傻逼吗',
      time: '2019/10/1 10:11:11'
    }, {
      listennerId: 2,
      speakerId: 1,
      speaker: '小叶子',
      listenner: '轻舞飞扬',
      content: '放屁, 你滚远点',
      time: '2019/10/1 10:11:11'
    }],

    message: [{
      name: "a小明1a小明1a小明1a小明1a小明1a小明1a小明1a小明1",
      avatar: require("@/assets/avatar.jpg"),
      lastMessage: '我是最后一条消息我是最后一条消息我是最后一条消息',
      time: '10:30',
      userId: 2
    }],
    friends: [ //这块数据从store里来
      {
        title: "A",
        items: [
          {
            name: "a小明",
            avatar: require("@/assets/avatar.jpg"),
            intrud: '我一定想买一辆车',
            gender: 0,
            id: 1,
            area: '山东 泰安'
          },
          {
            name: "a小明2",
            avatar: require("@/assets/avatar.jpg"),
            intrud: '我一定想买一辆车',
            gender: 1,
            id: 2,
            area: '山东 泰安'
          },
          {
            name: "a小明3",
            avatar: require("@/assets/avatar.jpg"),
            intrud: '我一定想买一辆车',
            gender: 1,
            id: 3,
            area: '山东 泰安'
          },
          {
            name: "a小明4",
            avatar: require("@/assets/avatar.jpg"),
            intrud: '我一定想买一辆车',
            gender: 0,
            id: 4,
            area: '山东 泰安'
          }
        ]
      },
      {
        title: "B",
        items: [
          {
            name: "b小明",
            avatar: require("@/assets/avatar.jpg"),
            intrud: '我一定想买一辆车',
            id: 5,
            area: '山东 泰安'
          },
          {
            name: "b小明2",
            avatar: require("@/assets/avatar.jpg"),
            id: 6
          },
          {
            name: "b小明3",
            avatar: require("@/assets/avatar.jpg"),
            id: 7
          },
          {
            name: "b小明4",
            avatar: require("@/assets/avatar.jpg"),
            id: 8
          }
        ]
      }
    ]

  },
  mutations: {
    addCurrentConversition(state) {
      var obj = {
        content: state.myWords.conversition,
        id: state.currentSpeaker.id
      }
      state.currentConversition.push(obj)
    },
    setWxId(state, id) {
      state.wxId = id
    },
    setCurrentSpeaker(state, obj) {
      // const {name,area,age,gender,wxId,avatarUrl} = obj; 
      // state.currentSpeaker = { name, id:wxId,area,avatar:avatarUrl,gender,age };
      state.currentSpeaker = obj;
    },
    changeCurrentInput(state, words) {
      state.currentInput = words;
    },
    setAvatar(state, url) {
      state.currentSpeaker = Object.assign({},state.currentSpeaker,{avatarUrl:url})
    }
  },
  actions: {
    async getCurrentSpeaker({ commit }) {
      const prof = await http.getCurrentSpeaker();
      commit('setCurrentSpeaker', prof.data.data)
    },



    async sendAvatar({ commit }, file) {
      var fd= new FormData();
      fd.append("file", file);
      const data = await http.postAvatar(fd);
      if (data.data.mes == "ok") {
        commit('setAvatar','/getPic/'+ data.data.filename)
      }
    }




  }





})
