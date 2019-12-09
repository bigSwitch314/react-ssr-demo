import React from 'react'
import { renderToString} from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import {Route} from 'react-router-dom'
import router from '../src/router'
import { Provider } from 'react-redux'
import store from '../src/redux/storeServer'

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
            {
              router.map(route => (
                <Route {...route} />
              ))
            }
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