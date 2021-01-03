import Vue from 'vue'
import VueRouter from 'vue-router'
// @ 它是src的别名
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import Settings from '@/views/settings'

Vue.use(VueRouter);
// vue-router.esm.js?8c4f:2257 TypeError: Cannot read property '$createElement' of undefined
// 报错为 componet 写成 componests
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 空 默认匹配的路由
        name: 'home',
        component: Home
      },
      {
        path: '/article', // 空 默认匹配的路由
        name: 'article',
        component: Article
      },
      {
        path: '/publish', // 空 默认匹配的路由
        name: 'publish',
        component: Publish
      }
      ,
      {
        path: '/image', // 空 默认匹配的路由
        name: 'image',
        component: Image
      }
      ,
      {
        path: '/comment', // 空 默认匹配的路由
        name: 'comment',
        component: Comment
      }
      ,
      {
        path: '/settings', // 空 默认匹配的路由
        name: 'settings',
        component: Settings
      }
    ]
  }

];

const router = new VueRouter({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    // 不是去登录就检查
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 是去登录就放行
    next()
  }
})

export default router;
