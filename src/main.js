import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/index'
import './assets/iconfont/iconfont.css'
import './assets/css/preset.css';
import './assets/css/common.css'
import http  from './utils/http'

import Toast from './components/Toast'//自定义的提示框
Vue.use(Toast)

import MyAlertMessage from  './components/myAlertMessage';//自定义弹框2
Vue.prototype.$message = MyAlertMessage;

Vue.config.productionTip = false;
Vue.prototype.http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
