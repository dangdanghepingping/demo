import io from "socket.io-client";
import store from '../vuex/index'


function generateSocket(wxId) {
  window.socket = io('ws://127.0.0.1:9000');
  var socket = window.socket;
  //发送wxId
  socket.emit('postWxId', wxId)

  socket.on('login', data => {
    console.log(data);
  })
  //朋友申请
  socket.on('friendRequest', messageArr => {//这一步写在这里,而不是写在页面上,原因是在main页面,需要标注小红点,写在页面上的话,如果没有渲染出页面,这条消息就收不到
    // mapMutations('friend',[friendRequestMessage])

    store.commit('friend/addRequestMessage', messageArr)


  })
  socket.on('makeFriendMessage', messageArr => {// 从数据库获取所有我未处理的求交友信息
    store.commit('friend/friendRequestMessage', messageArr)

  })
  socket.on('addResponseMakeFriendRequest', (message) => {
    store.commit('friend/addReplyMessage', message)
  })
  socket.on('friendMessage', ({id, wxId, message, time, read }) => {//朋友那边发过来的信息

    store.commit('message/addSingleMessge', { id, title: wxId, wxId, message, time, read });
  })
  socket.on("lastId", ({ id, wxId, message }) => {//我自己发送返回的信息
    store.commit('message/addSingleMessge', {
      id,
      title: wxId,
      wxId: store.state.regist_login.currentSpeaker.wxId,
      message,
      read: 1,//自己发送后返回给自己的肯定是已读
      time: new Date()
    });
  });



}


export default generateSocket