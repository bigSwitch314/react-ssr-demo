import React from 'react'
import { renderToString} from 'react-dom/server'
import { StaticRouter, Route, Switch } from 'react-router-dom'
import { matchRoutes } from 'react-router-config';
import router from '../src/router'
import { Provider } from 'react-redux'
import store from '../src/redux/storeServer'
import BasicLayout from '../src/containers/BasicLayout'
import resetState from './resetState'

const url = require('url')
const querystring = require('querystring')
const render = (req, res) => {
  // 重置store状态
  resetState()
  const { pathname: path, query } = url.parse(req.url)
  const param = querystring.parse(query)
  const pathname = path.substr(1)
  let promises = []
  const matchedRoutes = matchRoutes(router, pathname)
  matchedRoutes.forEach(item => {
    const func = item.route.loadData
    if (func && Array.isArray(func(store, param))) {
      promises = [...promises, ...func(store, param)]
    }
    // 二级路由
    if (item.route.children) {
      const matchedRoutesChildren = matchRoutes(item.route.children, pathname.split('/')[1])
      matchedRoutesChildren.forEach(itemChildren => {
        const funcChildren = itemChildren.route.loadData
        if (funcChildren && Array.isArray(funcChildren(store, param))) {
          promises = [...promises, ...funcChildren(store, param)]
        }
      })
    }
  })

  const context = { css: [] }
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
    const fs = require('fs')
    const rootPath = process.cwd()
    const cssStr = context.css.length ? context.css.join('\n') : ''
    fs.writeFile(`${rootPath}/public/index.css`, cssStr, () => {})

    // 响应请求内容
    const result = `
      <html>
      <head>
        <title>hello</title>
        <link rel="stylesheet" type="text/css" href="/iconfont/iconfont.css">
        <link href="/index.css" type="text/css" rel="stylesheet"></style>
      </head>
      <body>
        <div id="root">${content}</div>
        <textarea style="display:none" id="ssr-initialState">${JSON.stringify(store.getState())}</textarea>
        <script src="/socket.io.js"></script>
        <script>
          window.onload = function () {
            var socket = io.connect()
            socket.on('reload', function () {
              window.location.reload()
            })
          }
        </script>
        <script src="/client.js"></script>
      </body>
      </html>
    `
    res.send(result)
  })
}

export default render