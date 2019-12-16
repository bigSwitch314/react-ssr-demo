import loadComponent from '../loadComponent'

import Home from '../pages/home/Home'
import Category from '../pages/category/Category'

export default [
  {
    name:'首页',
    path: "home",
    component: Home,
    loadData: Home.loadData, // 服务端获取异步数据的函
    key: 'home',
  }, {
    name:'分类',
    path: "category",
    component: Category,
    key: 'category',
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