/**
 * Common system selectors
 **/

import { createSelector } from 'reselect'

// ROUTER selectors
export const activeRouteConfig = createSelector(
  [state => state.route.config],
  config => config
)

export const activeRouteName = createSelector(
  [activeRouteConfig],
  config => config.name
)

export const configRoutesByName = createSelector(
  [state => state.route.configByName || {}],
  configByName => configByName
)

export const linksRoutesByName = createSelector(
  [state => state.route.linksByName || {}],
  linksByName => linksByName
)

export const matchRouteParams = createSelector(
  [state => state.route.match.params || {}],
  params => params
)
