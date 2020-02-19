
import http from '../utils/http';
import { get } from 'https';

var a = 0
export default {
  namespaced: true,
  state: {
    style: 'blur',
 
    writeMessage: '',
    currentListener: null,
    singleMessage: [ //message右侧需要的数据
      // {
      //   title: 'eeee',
      //   messageArr: [{        
      //     wxId: 'eeee',
      //     words: '你好',
      //     id: arr[i].id,   (最好有,查看历史记录时候用,所以用promise来)           
      //     words: arr[i].message,
      //     read: arr[i].read, //为了表明消息的未读条数,需要加一属性read,累加read
      //     time: arr[i].time,
      //   }]
      // }
    ],
    lastSingleMessage: [],//最后一条信息的  message左侧栏需要的数据,
    //   [ { listenerWxId: 'gggg',
    //   avatarUrl: '/getPic/1f65acd65b9cdae256907c7a620df647',
    //   nickName: '是是',
    //   message:''
    //   time: utc } ]



  },
  getters: {
    lastSingleMessage(state, getters, rootState) {
      const { friendsList } = rootState.friend;
      const { singleMessage } = state;
  
      if (friendsList.length == 0) { //防止friendList 晚晴求出来会报错
        return []
      }
      var arr = [];
      for (let i = 0; i < singleMessage.length; i++) {
        const index = friendsList.findIndex(ele => ele.wxId == singleMessage[i].title);
       
        arr[i] = {
          listenerWxId: singleMessage[i].title,
          avatarUrl: friendsList[index].avatarUrl,
          nickName: friendsList[index].nickName,
          message: singleMessage[i].message[state.singleMessage[i].message.length - 1].words,
          time: singleMessage[i].message[state.singleMessage[i].message.length - 1].time
        }
        // const k = localMessageArr.findIndex(ele=>ele.listenerWxId == arr[i].listenerWxId)
        // if(k == -1){//没聊过天
        //   arr[i].historyMessageFlag = 1;
        // }else{
        //   arr[i].historyMessageFlag = localMessageArr[k].historyMessageFlag;
        // }
      }
      //获取localstorage里的值与最新的相结合
      const localMessageArr = JSON.parse(localStorage.getItem('lastMessageArr'));
      for (let j = 0; j < localMessageArr.length; j++) {
        const index = arr.findIndex(ele => ele.listenerWxId == localMessageArr[j].listenerWxId);
        if (index == -1) {
          arr.push(localMessageArr[j]);//把localstory的值赋值给arr
        }
      }
      localStorage.setItem('lastMessageArr', JSON.stringify(arr))
      return arr
    },
    unreadNumber(state) {//一上来就获得的message未读总条数和分别每个wxId的条数
      var obj = { totalUnread: 0 };
      for (let i = 0; i < state.singleMessage.length; i++) {
        const title = state.singleMessage[i].title
        for (let j = 0; j < state.singleMessage[i].message.length; j++) {
          if (state.singleMessage[i].message[j].read == 0) {
            obj[title] = obj[title] == undefined ? 1 : (obj[title] + 1);
            obj.totalUnread++;
          }
        }
      }
      return obj
    },
    unreadNumberIcon(state, getters) {//点击后改变currentListener,自动改变的值
      if (!state.currentListener) {
        return getters.unreadNumber;
      }
      const wxId = state.currentListener.wxId;
      const temp = getters.unreadNumber[wxId];
      if (!temp) {
        return getters.unreadNumber;
      }
      //将当前信息的read变成1
      var cuurentCoversition = state.singleMessage.find((ele)=>ele.title == wxId);
      for(let i = 0; i < cuurentCoversition.message.length; i++){
        if(cuurentCoversition.message[i].read == 0){
          cuurentCoversition.message[i].read = 1;
        }
      }
      //并在这里就发送后台请求, 告诉数据库将read变成1;
      http.setReadMessage(state.currentListener.wxId)
      return getters.unreadNumber
    },
    currentConversition(state) {
      console.log(2222);
      const { currentListener } = state;
      if(!currentListener){
        return []
      }
      // let  localMessageArr = JSON.parse(localStorage.getItem('lastMessageArr'));
      // const i = localMessageArr.findIndex(ele=>ele.listenerWxId == currentListener.wxId);
      // // localMessageArr[i].historyMessageFlag = localMessageArr[i].historyMessageFlag !== undefined ? localMessageArr[i].historyMessageFlag : 1;
      // localStorage.setItem('lastMessageArr',JSON.stringify(localMessageArr))
      if (currentListener == undefined) {
        return []
      }
      const title = currentListener.wxId;
      const index = state.singleMessage.findIndex(
        ele => ele.title == title
      );
      if (index == -1) {
        return [];
      }
      return state.singleMessage[index].message.sort((a, b) => a.id - b.id);
    }
  },

  mutations: {
  
    setStyle(state, str) {
      state.style = str
    },
    setWriteMessage(state, str) {
      state.writeMessage = str
    },
    setWriteHeight(state){

    },
    setCurrentListener(state, obj) {
      state.currentListener = obj
    },
    // setCurrentListenerHistoryMessageFlag(state,bool){
    //   const { currentListener } = state;
    //   let  localMessageArr = JSON.parse(localStorage.getItem('lastMessageArr'));
    //   const index = localMessageArr.findIndex(ele=>ele.listenerWxId == currentListener.wxId);
    //   localMessageArr[index].historyMessageFlag = bool;
    //   localStorage.setItem('lastMessageArr',JSON.stringify(localMessageArr))
    // },
    setSingleMessge(state, arr) {
      // {
      //   title: 'eeee',
      //   message: [{
      //     wxId: 'eeee',
      //     words: '你好',
      // read:


      // const { id, message, ctime } = obj;
      // var temp = { id, message };
      // temp.read = 0;
      // temp.time = obj.ctime;
      // temp.wxId = obj.from_wx_id;


      for (let i = 0; i < arr.length; i++) {
        const index = state.singleMessage.findIndex(ele => ele.title == arr[i].wxId);

        if (index == -1) {
          const temp = {
            title: arr[i].wxId,
            message: [{
              id: arr[i].id,
              words: arr[i].message,
              read: arr[i].read,
              time: arr[i].time,
              wxId: arr[i].wxId
            }]
          }
          state.singleMessage.push(temp);
        } else {
          const obj = {
            id: arr[i].id,
            words: arr[i].message,
            read: arr[i].read,
            time: arr[i].time,
            wxId: arr[i].wxId
          }
          state.singleMessage[index].message.push(obj)
        }
      }
    },
    addSingleMessge(state, { title, wxId, message, time, read, id }) {//增加一条message,
      //分为自己说的还是对方说的, 即为是recieve还是send的消息(title表示对方的wxId, wxId表示说话的人的wxId)
      // 这应该设置localstorage吧??????????
      const index = state.singleMessage.findIndex(ele => ele.title == title);
      if (index == -1) {
        const temp = {
          title: title,
          message: [{
            id,
            words: message,
            read: read,
            time: time,
            wxId: wxId
          }]
        }
        state.singleMessage.push(temp);
      } else {
        const obj = {
          id,
          words: message,
          read: read,
          time: time,
          wxId: wxId
        }
        //push的话获取历史记录就不太好了, 应该按照时间或者id来, 如果是id,那么前端往上加的没有id,就没办法排序了
        state.singleMessage[index].message.push(obj)
      }
    },

    changeUnreadSingleMessage(state, wxId) {
      const index = state.singleMessage.findIndex(ele => ele.title == wxId);
      for (let i = 0; i < state.singleMessage[index].message.length; i++) {
        state.singleMessage[index].message[i].read = 1
      }
    },
    addSingleMessageArr(state, arr) {
      const title = state.currentListener.wxId;
      const messageArr = [];

      for(let i = 0; i < arr.length; i++){
        const temp = {id: arr[i].id,words:arr[i].message,read:arr[i].hasRead,time:arr[i].ctime,wxId:arr[i].from_wx_id};
        messageArr.push(temp)
      }
      const index =  state.singleMessage.findIndex(ele=>ele.title == title);
      if(index == -1){
        state.singleMessage.push({title,message:messageArr})
      }else{
        state.singleMessage[index].message = [...state.singleMessage[index].message,...messageArr]
      }
      // id: 564
      // from_wx_id: "iiii"
      // to_wx_id: "dddd"
      // message: "撒旦法"
      // ctime: "2020-02-02T12:39:55.000Z"
      // sent: 1
      // hasRead: 1

      // {
      //   title: title,
      //   message: [{
      //     id,
      //     words: message,
      //     read: read,
      //     time: time,
      //     wxId: wxId
      //   }
    }


  },

  actions: {
    //这个不好, 应该从friendlist里获取, 这个为什么
    async getCurrentListener({ commit }, wxId) {
      const data = await http.getCurrentListener(wxId);
      commit('setCurrentListener', data.data);
    },

    async getUnreadSingleMessage({ commit }) {
      const data = await http.getUnreadSingleMessage();
      commit('setSingleMessge', data.data);
    },

    async getHistrySingleMessages({ state,commit,rootState  }, id) {
      const data = await http.getHistrySingleMessages(id,state.currentListener.wxId,rootState.regist_login.currentSpeaker.wxId);//需要处理下data,变成singleMessage格式{title,message:[id....]}obj
// console.log(data.data);
      commit('addSingleMessageArr', data.data)

    },
async sendMessage({ state,commit}, file){
const data = await http.postFile(file);


}






  }


}