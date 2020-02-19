import Vue from 'vue';
import alert from './msg.vue';
let MyAlertConstructor = Vue.extend(alert);
let instance;
const MyAlertMessage = (option) => {
  // 创建实例并且过滤参数
  
  instance = new MyAlertConstructor({
    data: option 
  })
  // 挂载实例
  instance.$mount();
  document.body.appendChild(instance.$el);
  setTimeout(() => {
    document.body.removeChild(instance.$el);
  }, 1500);
  return instance;
}
export default MyAlertMessage;

