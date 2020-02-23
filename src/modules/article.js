import request from '../utils/request'

export default {
  namespace: 'article',
  initState: {
    articleList: {},
    articleDetail: {},
  },
  reducer: {
    getArticleList(state, { payload }) {
      return ({ ...state, articleList: payload })
    },
    getArticleDetail(state, { payload }) {
      return ({ ...state, articleDetail: payload })
    },
  },
}

const n = (name) => `article/${name}`

export const getArticleList = (params) => request.get('/blog_fg/article/get', n('getArticleList'), params)
export const getArticleDetail = (params) => request.get('/blog_fg/article/get', n('getArticleDetail'), params)