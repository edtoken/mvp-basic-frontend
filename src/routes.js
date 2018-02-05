import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { DEVTOOLS_IS_ENABLED } from './config'

import DevTools from './containers/DevTools'
import LayoutContainer from './containers/layout/LayoutContainer'
import asyncComponent from './hoc/AsyncComponentHoc'

export const routes = [
  {
    name: 'editor-index',
    path: 'edit',
    component: asyncComponent(
      import('./containers/modules/Editor/EditorPage').then(
        module => module.default
      )
    )
  },
  {
    name: 'tester-index',
    path: 'test',
    component: asyncComponent(
      import('./containers/modules/Tester/TesterPage').then(
        module => module.default
      )
    )
  },
  {
    name: 'deploy-index',
    path: 'deploy',
    component: asyncComponent(
      import('./containers/modules/Deploy/DeployPage').then(
        module => module.default
      )
    )
  }
]

const makeRoute = (parent, store, level) => route => {
  const RouteComponent = route.type === 'redirect' ? Redirect : Route
  const nextLevel = level + 1
  route.key = [level, parent, route.path].join()

  if (route.children) {
    route.children = makeRoutes(route.children, store, route.path, nextLevel)
  }

  return <RouteComponent {...route} />
}

const makeRoutes = (list, store, parent = '', level) => {
  return list.map(makeRoute(parent, store, level))
}

export const makeRouter = (store, history) => {
  return (
    <div>
      <ConnectedRouter history={history}>
        <LayoutContainer>
          {DEVTOOLS_IS_ENABLED && (
            <div>
              <DevTools />
            </div>
          )}
          <Switch>{makeRoutes(routes, store, '', 0)}</Switch>
        </LayoutContainer>
      </ConnectedRouter>
    </div>
  )
}
