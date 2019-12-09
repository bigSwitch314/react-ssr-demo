import React from 'react'
import ReactDom from 'react-dom'
import {Route} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import store from './redux/storeClient'

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {
          router.map(route => (
            <Route {...route} />
          ))
        }
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)