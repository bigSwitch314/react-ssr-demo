import React from 'react'
//重要是要用到StaticRouter
import { StaticRouter } from 'react-router-dom'
import { renderToString} from 'react-dom/server'
import Routes from '../Routes'
import { Provider } from 'react-redux'
import store from '../redux/store'

const render = (req) => {
  //构建服务端的路由
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} >
        {Routes}
      </StaticRouter>
    </Provider>
  )

  return `
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
}

export default render