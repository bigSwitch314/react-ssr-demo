import request from '../utils/request'

const initState = {
  articleList: {},
  articleDetail: {},
  aclStat: {},
}

export default {
  namespace: 'article',
  initState: { ... initState },
  reducer: {
    reset() {
      return ({ ... initState })
    },
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