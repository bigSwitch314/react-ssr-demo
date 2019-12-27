import React from 'react'
import { renderToString} from 'react-dom/server'
import { StaticRouter, Route, Switch } from 'react-router-dom'
import { matchRoutes } from 'react-router-config';
import router from '../src/router'
import { Provider } from 'react-redux'
import store from '../src/redux/storeServer'
import BasicLayout from '../src/containers/BasicLayout'

const url = require('url')
const querystring = require('querystring')


const render = (req, res) => {
  const { pathname: path, query } = url.parse(req.url)
  const param = querystring.parse(query)
  const pathname = path.substr(1)
  // console.log('pathname------', pathname)
  const promises = []
  const matchedRoutes = matchRoutes(router, pathname)
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store, param))
    }
  })

  // console.log('matchedRoutes----', matchedRoutes)
  // console.log('promises----', promises)

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
        <link href="/index.css" type="text/css" rel="stylesheet"></style>
        <link rel="stylesheet" type="text/css" href="/iconfont/iconfont.css">
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