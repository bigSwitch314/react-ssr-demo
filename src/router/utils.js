/**
 * @flow
 */


import React from 'react'
import { Menu, Icon } from 'antd'
import { matchPath } from 'react-router'
import { Link, Route, Switch } from 'react-router-dom'
import routerConfig from './router.config'


export function getParentKey(url, configs = routerConfig) {
  const urls = url.split('/')
  let parentKey = ''
  configs.forEach(routes => {
    const { path, children } = routes
    if (urls.indexOf(path) > -1) {
      parentKey = path
      // 子路由
      if (children) {
        children.forEach(item => {
          if (urls.indexOf(item.path) > -1) {
            parentKey = `${parentKey}/${item.path}`
          }
        })
      }
    }
  })
  return parentKey
}

export function getCurrentRoute(url, routes) {
  const routeKeys = Array.from(routes.keys())
  const currentKey = routeKeys.filter(path => matchPath(url, {
    path,
    exact: true,
  }))[0]
  return routes.get(currentKey) || {}
}

/**
 * 得到路由匹配的栈
 * @param {*} url
 * @param {*routes} 使用的路由
 */
export function getRouteStack(url, routes) {
  const routeStack = []
  const routeKeys = Array.from(routes.keys())
  const matchedKey = routeKeys.filter(path => matchPath(url, {
    path,
    exact: true,
  }))
  if (matchedKey.length === 0) return routeStack
  let currentRoute = routes.get(matchedKey[0])
  routeStack.push(currentRoute)
  while (currentRoute && currentRoute.parentPath) {
    currentRoute = routes.get(currentRoute.parentPath)
    routeStack.unshift(currentRoute)
  }
  return routeStack
}

/**
 * 获取菜单
 * @param {*} auths 授权访问的路由
 * @param {*} routes 路由配置
 */
export function getMenus(auths, routes=routerConfig) {
  // 生成新的路由配置
  let newRoutes = []
  const more = []
  Object.keys(auths).forEach((name, key) => {
    routes.forEach(item => {
      if (key <= 6 && (name === item.name)) {
        newRoutes.push(item)
      } else if (key > 6 && name === item.name) {
        more.push(item)
      }
    })
  })
  const hiddenRoutes = routes.filter(item => item.hidden)
  newRoutes = newRoutes.concat(hiddenRoutes)
  if (more.length) {
    newRoutes.push({
      name: '更多',
      path: 'more',
      children: more,
      key: 'more',
    })
  }

  const res = newRoutes.map(route => {
    if (!route.name || route.hidden) return null // 这里需要抛出警告
    if (!route.component) {
      return (
        route.children.length > 0 &&
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              {route.name}<Icon type="down" style={{ fontSize: 12, marginRight: 4 }}/>
            </span>}
          key={route.path}
        >
          {route.children.map(item => (
            <Menu.Item key={`${route.path}/${item.path}`}>
              <Link to={`/${route.path}/${item.path}`}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={route.path}>
        <Link to={`/${route.path}`}>{route.name}</Link>
      </Menu.Item>
    )
  })

  return {menusData: res, newRouterConfig: newRoutes }
}

/**
 * 获取路由
 *
 * @param {*} routerCon 路由配置
 * @param {*} auths 授权访问的路由
 */
export function getRoutes(auths={}, routerCon=routerConfig) {
  auths['更多'] = '999999'

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
    if (!auths[name] && !items.hidden) return routers
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
    route.children = children.filter(item => (
      auths[item.name] || item.hidden
    )).map(item => {
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
