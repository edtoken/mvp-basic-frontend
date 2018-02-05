import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker'

import { makeRouter } from './routes'
import { makeStore } from './store/store'

import { NODE_ENV } from './config'

const MOUNT_NODE = document.getElementById('root')

const { store, history } = makeStore()

const renderApp = () => {
  render(
    <Provider store={store}>{makeRouter(store, history)}</Provider>,
    MOUNT_NODE
  )
}

if (NODE_ENV !== 'test') {
  renderApp()
  registerServiceWorker()
}
