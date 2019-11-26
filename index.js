import React from 'react'
import ReactDom from 'react-dom'
import {Route} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import routers from './routes'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {
          routers.map(route => (
            <Route {...route} />
          ))
        }
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)