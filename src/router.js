import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta:{
        isPublic: true
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/Register2.vue'),
      meta:{
        isPublic: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta:{
        isPublic: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login1.vue'),
      meta:{
        isPublic: true
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/Welcome.vue'),
      meta:{
        isPublic: true
      }
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect: '/message',
      children: [
        {
          path: '/message',
          name: 'message',
          component: () => import('@/components/message/Message.vue'),

          children: [
            {
              path: 'talking/:id',
              name:'talking',
              component: () => import('@/components/message/Talking.vue')
            }
          ]
        },
        {
          path: '/friends',
          name: 'friends',
          component: () => import('@/components/friends/Friends.vue'),
            children:[{
              path: 'detail/:id',
              name: 'friendDetail',
              component:()=> import('@/components/friends/right/FriendDetail.vue')
            },{
              path: 'addNewFriend',
              name: 'addNewFriend',
              component:()=> import('@/components/friends/right/AddNewFriend.vue')
            },{
              path: 'joinNewGroup',
              name: 'joinNewGroup',
              component:()=> import('@/components/friends/right/JoinNewGroup.vue')
            },{
              path: 'myNewFriends',
              name: 'myNewFriends',
              component:()=> import('@/components/friends/right/MyNewFriends.vue')
            },{
              path: 'createNewGroup',
              name: 'createNewGroup',
              component:()=> import('@/components/friends/right/CreateNewGroup.vue')
            },{
              path: 'someOneJoin',
              name: 'someOneJoin',
              component:()=> import('@/components/friends/right/SomeOneJoin.vue')
            },
            {
              path: 'reply',
              name: 'reply',
              component:()=> import('@/components/friends/right/ReplyMessage.vue')
            }

          ]
        }
      ]
    }
  ]
})
router.beforeEach(( to,from, next)=>{

  if(!to.meta.isPublic && !localStorage.token){
    
    next('/login')
  }
  next()
 
})

export default router;
