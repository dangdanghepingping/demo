import ToastCom from './Toast.vue'

const Toast={
    install:function (Vue) {
        Vue.component('Toast',ToastCom)
    }
}
export default Toast