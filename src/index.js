import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/storeClient'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Routers from './routers'
import './styles/index.less'

ReactDom.hydrate(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Routers />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)