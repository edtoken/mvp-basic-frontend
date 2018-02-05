/**
 * @namespace store
 *
 */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { LOCATION_CHANGE, routerMiddleware } from 'react-router-redux'

import DevTools from '../containers/DevTools'
import thunkMiddleware from 'redux-thunk'

import { DEVTOOLS_IS_ENABLED } from '../config'

const createReducer = (initialState, actionHandlers) => {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type]
    if (!reduceFn) return state
    return {
      ...state,
      ...reduceFn(state, action)
    }
  }
}

const reducers = [
  ['route', require('./router-reducer').reducer],
  ['editor', require('../containers/modules/Editor/reducer').reducer],
  ['tester', require('../containers/modules/Tester/reducer').reducer],
  ['deploy', require('../containers/modules/Deploy/reducer').reducer]
].reduce((memo, item) => {
  return {
    ...memo,
    [item[0]]: createReducer(item[1].defaultState, item[1].actionHandlers)
  }
}, {})

const middlewares = [
  require('./transition-middleware').middleware,
  require('../containers/modules/Editor/middleware').middleware,
  require('../containers/modules/Tester/middleware').middleware,
  require('../containers/modules/Deploy/middleware').middleware
]

export const makeStore = (initialState = {}) => {
  const history = createHistory()

  const enhancers = [
    applyMiddleware(
      ...[...[thunkMiddleware, routerMiddleware(history)], ...middlewares]
    ),
    DEVTOOLS_IS_ENABLED ? DevTools.instrument() : f => f
  ]

  const rootReducer = {
    ...reducers
  }

  const store = createStore(
    combineReducers(rootReducer),
    initialState,
    compose(...enhancers)
  )
  return { store, history }
}
