import React from 'react'

import { NavLink as RouterNavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { omit } from 'ramda'
import { makeGetLink } from './selector'

/**
 * NavLink component, make link to "routeName" or "/path/to"
 * wrapper over NavLink from react-router-dom
 *
 * @memberOf containers.ui
 * @param {Object} props - props of component, origin props of NavLink from react-router-dom
 * @param {String} props.to - route name (routes.json "name") or location path "/path/to"
 *
 * @returns {Component} - wrapped origin NavLink component
 *
 * @example
 * <NavLink to="RouteName" params={deal_id:5}>
 *  Go to index route path
 * </NavLink>
 */
const NavLink = props => {
  //   const params = props.params || {}

  props = omit(['dispatch'])(props)

  return <RouterNavLink {...props} />
}

export default connect((state, props) => {
  const getLink = makeGetLink()

  return {
    to: getLink(state, props)
  }
}, undefined)(NavLink)
