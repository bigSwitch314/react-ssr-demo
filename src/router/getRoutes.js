/**
 * @flow
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routerConfig from './router.config'

function createRoutesData(routerCon, auths = {}) {
  const routeMap= new Map()
  const routesData = routerCon.reduce((routers, items) => {
    const { component: Component, children = [], name } = items
    const route = {
      ...items,
      key: items.path,
      path: items.path,
      fullPath: `/${items.path}`,
      component: Component,
      name: items.name,
      children: [],
    }
    if (!auths[name]) return routers
    routers.push(route)
    routeMap.set(route.fullPath, {
      ...route,
      isDeepChild: false,
    })

    if (Component) {
      route.component = props => (
        <Component {...props}>
          <Switch>
            {children.map(item => (
              <Route
                key={`/${items.path}/${item.path}`}
                path={`/${items.path}/${item.path}`}
                exact
                component={item.component}
              />))}
          </Switch>
        </Component>
      )
    }
    // console.log('name----', item.name)
    route.children = children.filter(item => auths[item.name]).map(item => {
      const childrenPath = `${items.path}/${item.path}`
      const childRoute = {
        key: childrenPath,
        path: childrenPath,
        fullPath: `/${childrenPath}`,
        Container: item.container,
        component: item.component || null,
        name: item.name,
        children: [],
      }
      // $FlowFixMe 这里会 认为item.path为空
      const routeStack = item.path.replace(/^\/|\/$/g).split('/')
      const length = routeStack.length
      const lastPath = routeStack.pop()
      routeMap.set(childRoute.fullPath, {
        ...childRoute,
        parentPath: childRoute.fullPath.replace(`/${lastPath}`, ''),
        isDeepChild: length > 1,
      })
      return childRoute
    })
    return routers
  }, ([]))
  return { routeMap, routesData }
}

const getRoutesData = (auths) => createRoutesData(routerConfig, auths)

export default getRoutesData
