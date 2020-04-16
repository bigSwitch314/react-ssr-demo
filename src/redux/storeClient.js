import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import monitorMiddleware from './middleware/monitor'
import rootReducer from './reducer'


// 创建store，并引入中间件thunk进行异步操作的管理 ssr-initialState
let initialState = document.getElementById('ssr-initialState').value || JSON.stringify({})
initialState = JSON.parse(initialState)

const devtools = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const enhancer = (devtools || compose)(
  applyMiddleware(monitorMiddleware, thunkMiddleware),
)

const store = createStore(rootReducer, initialState, enhancer)


export default store