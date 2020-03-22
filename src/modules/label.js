import request from '../utils/request'

export default {
  namespace: 'label',
  initState: {
    labelStat: [],
  },
  reducer: {
    getLabelStat(state, { payload }) {
      return ({ ...state, labelStat: payload })
    },
  },
}

const n = (name) => `label/${name}`

export const getLabelStat = (params) => request.get('/blog_fg/label/getStat', n('getLabelStat'), params)