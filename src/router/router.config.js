import loadComponent from '../loadComponent'

// const Home = import('../pages/Home')
// const Login = import('../pages/Login')
import Home from '../pages/Home'
import Login from '../pages/Login'
import More from '../pages/More'

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
    component: Login,
    key: 'login',
  }, {
    name:'更多',
    path: 'more',
    children:[
      {
        name:'下载',
        path: "down",
        component: More,
        key: 'login',
      }
    ],
    key: 'more',
  }
]