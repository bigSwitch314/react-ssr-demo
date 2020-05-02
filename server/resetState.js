import store from '../src/redux/storeServer'

// 重置store状态
const resetState = () => {
  const context = require.context('../src/modules', false, /\/*\.js$/)

  const namespace = context.keys()
    .map(key => context(key).default)
    .filter(item => item)
    .map(key => key.namespace) || []

  namespace.push('loading')
  namespace.map(item => `${item}/reset`)
    .forEach(item => {
      store.dispatch({type: item})
    })

  console.log('namespace', namespace)
}

export default resetState