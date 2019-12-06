import request from '../utils/request'

export default {
  namespace: 'home',
  initState: {
    homeList: {},
  },
  reducer: {
    getHomeList(state, { payload }) {
      return ({ ...state, homeList: payload })
    },
    addHome(state) {
      return ({ ...state })
    },
  },
}

const n = (name) => `home/${name}`

export const getHomeList = (params) => request.get('/blog/admin/get', n('getHomeList'), params)
export const addHome = (params) => request.post('/blog/admin/add', n('addHome'), params)