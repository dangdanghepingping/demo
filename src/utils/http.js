import http from './axios';

//好处是统一管理请求的地址和参数
const request = {
  postProfiles(obj) {
    return http.post('/api/rigist', obj)
  },
  postAvatar(fd) {
    return http.post('/api/avatar', fd)
  },

  checkWxIdIsRegisted(wxId) {
    return http.get('/api/isRegisted?wxId=' + wxId)
  },

  login(file) {
    return http.post('/api/login', file)
  },

  getCurrentSpeaker() {
    
    return http.get('/api/getCurrentSpeaker')
  },
  getFriendRequestMessage(){
    return http.get('/api/getFriendRequestMessage')
  },
  getReplyMessage(){
    return http.get('/api/getReplyMessage')
  },

  isFriend(wxId){
    return http.get('/api/isFriend?friendWxId=' + wxId)
  },
  getFriendList(){
    return http.get('/api/getFriendList')
  },
  getCurrentListener(wxId){
    return http.get('/api/getCurrentListener?wxId=' + wxId)

  },
  getLastSingleMessage(){
    return http.get('/api/getLastSingleMessage')
  },
  getUnreadSingleMessage(){
    return http.get('/api/getUnreadSingleMessage')
  },
  setReadMessage(wxId){
    return http.patch('/api/setReadMessage?fromWxId='+ wxId)
  },
  getHistrySingleMessages(id,wxId){
    return http.get('/api/getHistrySingleMessages?id=' + id + '&wxId=' + wxId)
  },
  postFile(file){
    return http.post('/api/postMessageFile',file)
  }
}

export default request;




