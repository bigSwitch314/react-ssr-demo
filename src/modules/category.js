import request from '../utils/request'

export default {
  namespace: 'category',
  initState: {
    categoryStat: [],
  },
  reducer: {
    getCategoryStat(state, { payload }) {
      return ({ ...state, categoryStat: payload })
    },
  },
}

const n = (name) => `category/${name}`

export const getCategoryStat = (params) => request.get('/blog_fg/category/getStat', n('getCategoryStat'), params)