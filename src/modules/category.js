import request from '../utils/request'

const initState = {
  categoryStat: [],
}

export default {
  namespace: 'category',
  initState: { ...initState },
  reducer: {
    reset() {
      return ({ ...initState })
    },
    getCategoryStat(state, { payload }) {
      return ({ ...state, categoryStat: payload })
    },
  },
}

const n = (name) => `category/${name}`

export const getCategoryStat = (params) => request.get('/blog_fg/category/getStat', n('getCategoryStat'), params)