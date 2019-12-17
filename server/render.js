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

    // 样式写入单独文件
    const fs = require("fs")
    const rootPath = process.cwd()
    const cssStr = context.css.length ? context.css.join('\n') : ''
    fs.writeFile(`${rootPath}/public/index.css`, cssStr, () => {})

    // 响应请求内容 
    const result = `
      <html>
      <head>
        <title>hello</title>
        <link href="/index.css" type="text/css" rel="stylesheet"></style>
        <link rel="stylesheet" type="text/css" href="/iconfont/iconfont.css">
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