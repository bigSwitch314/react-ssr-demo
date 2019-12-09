import React from 'react'
import { renderToString} from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import router from '../src/router'
import { Provider } from 'react-redux'
import store from '../src/redux/storeServer'

import getRoutesData from '../src/router/getRoutes'
const menuCodes = {
  首页: '001',
  登录: '002',
  更多: '003',
  下载: '00301',
}

const { routesData } = getRoutesData(menuCodes)

const render = (req, res) => {
  const matchRoutes = []
  const promises = []
  router.some(route=> {
    matchPath(req.path, route) ? matchRoutes.push(route) : ''
  })
  matchRoutes.forEach( item=> {
    if (item.loadData) {
      promises.push(item.loadData(store))
    }
  })

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} >
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
        </StaticRouter>
      </Provider>
    )


    // 响应请求内容 
    const result = `
      <html>
      <head>
        <title>hello</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/client.js"></script>
        <script src="/socket.io.js"></script>
        <script>
          window.onload = function () {
            var socket = io.connect();
            socket.on('reload', function () {
              window.location.reload();
            })
          }
        </script>
        <textarea style="display:none" id="ssr-initialState">${JSON.stringify(store.getState())}</textarea>
      </body>
      </html>
    `
    res.send(result)
  })
}

export default render