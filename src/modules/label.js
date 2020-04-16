import request from '../utils/request'

const initState = {
  labelStat: [],
}
export default {
  namespace: 'label',
  initState: { ...initState },
  reducer: {
    reset() {
      return ({ ...initState })
    },
    getLabelStat(state, { payload }) {
      return ({ ...state, labelStat: payload })
    },
  },
}

const n = (name) => `label/${name}`

export const getLabelStat = (params) => request.get('/blog_fg/label/getStat', n('getLabelStat'), params)