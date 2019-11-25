import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {Routes}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)