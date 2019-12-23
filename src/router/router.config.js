

// import loadComponent from '../loadComponent'

import Home from '../pages/home/Home'
import Category from '../pages/category/Category'
import Label from '../pages/label/Label'
import Archive from '../pages/archive/Archive'
import Transshipment from '../pages/transshipment/Transshipment'
import OpenSource from '../pages/openSource/OpenSource'
import About from '../pages/about/About'
import ArticleDetail from '../pages/home/ArticleDetail'

export default [
  {
    name: '首页',
    path: 'home',
    component: Home,
    loadData: Home.loadData, // 服务端获取异步数据的函
    key: 'home',
  }, {
    name: '文章详情',
    path: 'articleDetail',
    component: ArticleDetail,
    loadData: ArticleDetail.loadData, // 服务端获取异步数据的函
    key: 'articleDetail',
  }, {
    name: '分类',
    path: 'category',
    component: Category,
    key: 'category',
  }, {
    name: '标签',
    path: 'label',
    component: Label,
    key: 'label',
  }, {
    name: '归档',
    path: 'archive',
    component: Archive,
    key: 'archive',
  }, {
    name: '转载',
    path: 'transshipment',
    component: Transshipment,
    key: 'transshipment',
  }, {
    name: '开源',
    path: 'openSource',
    component: OpenSource,
    key: 'openSource',
  }, {
    name: '关于',
    path: 'about',
    component: About,
    key: 'about',
  }, {
    name: '更多',
    path: 'more',
    children: [
      {
        name: '下载',
        path: 'down',
        component: Home,
        key: 'login',
      },
    ],
    key: 'more',
  },
]