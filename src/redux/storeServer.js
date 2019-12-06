import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import monitorMiddleware from './middleware/monitor'
import rootReducer from './reducer'


const initialState = {}

const enhancer = (compose)(
  applyMiddleware(monitorMiddleware, thunkMiddleware),
)

const store = createStore(rootReducer, initialState, enhancer)

export default store