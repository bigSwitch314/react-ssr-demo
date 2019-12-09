import loadComponent from '../loadComponent'

const Home = loadComponent(() => import('../pages/Home'))
const Login = loadComponent(() => import('../pages/Login'))

export default [
  {
    name:'首页',
    path: "/",
    component: Home,
    loadData: Home.loadData, // 服务端获取异步数据的函数
    key: 'home',
  }, {
    name:'登录',
    path: "/login",
    component: Home,
    key: 'login',
  // }, {
  //   name:'更多',
  //   path: null,
  //   children:[
  //     {
  //       name:'下载',
  //       path: "/down",
  //       component: Home,
  //       key: 'login',
  //     }
  //   ],
  //   key: 'more',
  }
]