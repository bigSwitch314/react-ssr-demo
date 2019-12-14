/**
 * @flow
 */

import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import BasicLayout from './containers/BasicLayout'

const routers = () => (
  <Router>
    <Switch>
      <Route path={'/'} component={BasicLayout} />
    </Switch>
  </Router>
)

export default routers
