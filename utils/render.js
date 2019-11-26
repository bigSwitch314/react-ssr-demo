import React from 'react'
import { renderToString} from 'react-dom/server'
// import { matchRoutes } from 'react-router-config'
import { StaticRouter, matchPath } from 'react-router-dom'
import {Route} from 'react-router-dom'
import routers from '../routes'
import { Provider } from 'react-redux'
import store from '../redux/store'

import axios from 'axios'
axios.get('http://39.108.60.163:443/blog/admin/get?page_no=1&page_size=5')
.then((res) => {
  const result = res.data.data
  console.log('44444--------------------', result.list)
}).catch(error => {
  console.log('error--------------------', error)
})

const render = (req, res) => {
  const matchRoutes = []
  const promises = []
  routers.some(route=> {
      matchPath(req.path, route) ? matchRoutes.push(route) : ''
  })
  matchRoutes.forEach( item=> {
      promises.push(item.loadData(store))
  })

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} >
          <div>
            {
              routers.map(route => (
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
        <script src="/index.js"></script>
      </body>
      </html>
    `
    res.send(result)
  })
}

export default render