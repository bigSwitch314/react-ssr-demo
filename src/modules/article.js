import request from '../utils/request'

export default {
  namespace: 'article',
  initState: {
    articleList: {},
    articleDetail: {},
    getAclStat: {},
  },
  reducer: {
    getArticleList(state, { payload }) {
      return ({ ...state, articleList: payload })
    },
    getArticleDetail(state, { payload }) {
      return ({ ...state, articleDetail: payload })
    },
    articleDirectory(state, { payload }) {
      return ({ ...state, articleDirectory: payload })
    },
    getAclStat(state, { payload }) {
      return ({ ...state, aclStat: payload })
    },
  },
}

const n = (name) => `article/${name}`

export const getArticleList = (params) => request.get('/blog_fg/article/get', n('getArticleList'), params)
export const getArticleDetail = (params) => request.get('/blog_fg/article/get', n('getArticleDetail'), params)
export const getAclStat = (params) => request.get('/blog_fg/article/getAclStat', n('getAclStat'), params)