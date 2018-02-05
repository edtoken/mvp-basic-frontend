import { merge } from 'ramda'

import { LOCATION_CHANGE } from 'react-router-redux'
import { CHANGE_ROUTE_TYPE } from './actionTypes'

const defaultState = {
  match: {},
  config: {},
  location: {}
}

const actionHandlers = {
  [LOCATION_CHANGE]: (state, action) => ({
    ...state,
    ...{ location: action.payload }
  }),
  [CHANGE_ROUTE_TYPE]: (state, action) => {
    const config = action.route.config
    const match = action.route.match
    const params = merge(state.match.params || {}, match.params)

    return {
      ...state,
      match: {
        ...match,
        params
      },
      config
    }
  }
}

export const reducer = { defaultState, actionHandlers }
