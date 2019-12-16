import loadComponent from '../loadComponent'

import Home from '../pages/home/Home'

export default [
  {
    name:'首页',
    path: "home",
    component: Home,
    loadData: Home.loadData, // 服务端获取异步数据的函数
    key: 'home',
  }, {
    name:'登录',
    path: "login",
    component: Home,
    key: 'login',
  }, {
    name:'更多',
    path: 'more',
    children:[
      {
        name:'下载',
        path: "down",
        component: Home,
        key: 'login',
      }
    ],
    key: 'more',
  }
]