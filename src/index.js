import React from 'react'
import ReactDom from 'react-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/storeClient'
import getRoutesData from '../src/router/getRoutes'
const menuCodes = {
  首页: '001',
  登录: '002',
  更多: '003',
  下载: '00301',
}

const { routesData } = getRoutesData(menuCodes)
console.log('routesData--------', routesData)

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          {routesData.map(routes => routes.children.length > 0 ?
            routes.children.map(route => (
              <Route
                extra
                key={route.key}
                path={route.fullPath}
                component={route.component}
              />
            )) :
            <Route
              extra
              key={routes.key}
              path={routes.fullPath}
              component={routes.component}
            />,
          )}
          <Redirect to={routesData[0].fullPath} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)