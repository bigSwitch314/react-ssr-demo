import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/storeClient'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Routers from './routers'

ReactDom.hydrate(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Routers />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)

// ReactDom.hydrate(
//   <Provider store={store}>
//     <BrowserRouter>
//       <div>
//         <Switch>
//           {routesData.map(routes => routes.children.length > 0 ?
//             routes.children.map(route => (
//               <Route
//                 extra
//                 key={route.key}
//                 path={route.fullPath}
//                 component={route.component}
//               />
//             )) :
//             <Route
//               extra
//               key={routes.key}
//               path={routes.fullPath}
//               component={routes.component}
//             />,
//           )}
//           <Redirect to={routesData[0].fullPath} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// )