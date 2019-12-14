import React from 'react'
import { renderToString} from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import router from '../src/router'
import { Provider } from 'react-redux'
import store from '../src/redux/storeServer'
import Routers from '../src/routers'

import BasicLayout from '../src/containers/BasicLayout'

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

  let context = { css: [] }
  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <div>
            <Switch>
              <Route path={'/'} component={BasicLayout} />
            </Switch>
          </div>
        </StaticRouter>
      </Provider>
    )

    const cssStr = context.css.length ? context.css.join('\n') : ''

    // 响应请求内容 
    const result = `
      <html>
      <head>
        <title>hello</title>
        <style>${cssStr}</style>
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