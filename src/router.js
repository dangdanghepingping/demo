import Vue from 'vue'
import Router from 'vue-router'
import Message from './views/Message.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'message',
      component: Message
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('./views/Friends.vue')
    }
  ]
})
