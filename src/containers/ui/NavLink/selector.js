import { createSelector } from 'reselect'
import { mergeAll } from 'ramda'
import { replaceUrlParams } from '../../../helpers/RestAPI'

import {
  configRoutesByName,
  linksRoutesByName,
  matchRouteParams
} from '../../../store/root-selectors'

const getRouteName = (state, props) => {
  return props.to
}

const getPropsRouteMatchParams = (state, props) => {
  return props.params || undefined
}

export const makeGetLink = () => {
  return createSelector(
    [
      configRoutesByName,
      linksRoutesByName,
      getRouteName,
      matchRouteParams,
      getPropsRouteMatchParams
    ],
    (configByName, linksByName, routeName, routerParams, customRouteParams) => {
      const routeConfig = configByName[routeName]
      const routeLink = linksByName[routeName] || routeName || ''

      if (customRouteParams) {
        return replaceUrlParams(
          routeConfig.path,
          mergeAll([{}, routerParams, customRouteParams])
        )
      }

      return routeLink
    }
  )
}
