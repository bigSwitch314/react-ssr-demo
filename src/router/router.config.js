import Home from '../pages/home/Home'
import Category from '../pages/category/Category'
import Label from '../pages/label/Label'
import Archive from '../pages/archive/Archive'
import Transshipment from '../pages/transshipment/Transshipment'
import OpenSource from '../pages/openSource/OpenSource'
import About from '../pages/about/About'
import ArticleDetail from '../pages/home/ArticleDetail'
import ArticleQuery from '../pages/home/ArticleQuery'
import Suggestion from '../pages/suggestion/Suggestion'
import Tool from '../pages/tool/Tool'

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
    hidden: true, // 不在菜单上显示
  }, {
    name: '文章查询',
    path: 'articleQuery',
    component: ArticleQuery,
    loadData: ArticleQuery.loadData,
    key: 'articleQuery',
    hidden: true, // 不在菜单上显示
  }, {
    name: '分类',
    path: 'category',
    component: Category,
    loadData: Category.loadData, // 服务端获取异步数据的函数
    key: 'category',
  }, {
    name: '标签',
    path: 'label',
    component: Label,
    loadData: Label.loadData, // 服务端获取异步数据的函数
    key: 'label',
  }, {
    name: '归档',
    path: 'archive',
    component: Archive,
    loadData: Archive.loadData, // 服务端获取异步数据的函数
    key: 'archive',
  }, {
    name: '转载',
    path: 'transshipment',
    component: Transshipment,
    loadData: Transshipment.loadData,
    key: 'transshipment',
  }, {
    name: '开源',
    path: 'openSource',
    component: OpenSource,
    loadData: OpenSource.loadData,
    key: 'openSource',
  }, {
    name: '关于',
    path: 'about',
    component: About,
    loadData: About.loadData,
    key: 'about',
  }, {
    name: '建议',
    path: 'suggestion',
    component: Suggestion,
    loadData: Suggestion.loadData,
    key: 'suggestion',
  }, {
    name: '工具',
    path: 'tool',
    component: Tool,
    loadData: Tool.loadData,
    key: 'tool',
  }, {
    name: '更多',
    path: 'more',
    children: [],
    key: 'more',
  },
]