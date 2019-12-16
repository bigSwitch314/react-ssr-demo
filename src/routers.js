/**
 * @flow
 */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import BasicLayout from './containers/BasicLayout'

const routers = () => (
  <BrowserRouter>
    <Switch>
      <Route path={'/'} component={BasicLayout} />
    </Switch>
  </BrowserRouter>
)

export default routers
