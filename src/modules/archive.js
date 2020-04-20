import request from '../utils/request'

const initState = {
  archive: [],
}

export default {
  namespace: 'archive',
  initState: { ...initState },
  reducer: {
    reset() {
      return ({ ...initState })
    },
    getArchive(state, { payload }) {
      return ({ ...state, archive: payload })
    },
  },
}

const n = (name) => `archive/${name}`

export const getArchive = (params) => request.get('/blog_fg/article/getArchive', n('getArchive'), params)