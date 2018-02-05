import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { DEVTOOLS_IS_ENABLED, DEVTOOLS_IS_VISIBLE } from '../config'

export default (DEVTOOLS_IS_ENABLED ? (
  createDevTools(
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
      defaultIsVisible={DEVTOOLS_IS_VISIBLE}
    >
      <LogMonitor />
    </DockMonitor>
  )
) : (
  <span />
))
