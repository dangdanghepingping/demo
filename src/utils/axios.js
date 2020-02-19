import axios from 'axios';
import Vue from 'vue';



var http = axios.create({
  timeout: 3500
});
//添加请求拦截
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common['Authorization'] =  token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// 添加响应拦截器
http.interceptors.response.use(response => {
  const message = response.data.message;
  if (message) { //将要用$message弹出的信息数据,和后台衔接,都用data属性显示,否则不用data属性显示
    Vue.prototype.$message({
      message,
      type: "success",//这个可能后面有变化
    })
  }
  return response;
}, error => {
  console.log(error);
  const message = error.response.data.message;
  if (message) { //将要用$message弹出的信息数据,和后台衔接,都用data属性显示,否则不用data属性显示
    Vue.prototype.$message({
      message,
      type: "err",
    })
  } else {
    return Promise.reject(error);//将错误传下去,让具体的页面处理
  }
});




export default http;

