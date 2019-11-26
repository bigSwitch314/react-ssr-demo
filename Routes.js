import Home from './containers/Home'
import Login from './containers/Login'

export default [
  {
    path: "/",
    component: Home,
    exact: true,
    loadData: Home.loadData, // 服务端获取异步数据的函数
    key: 'home'
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  }
]