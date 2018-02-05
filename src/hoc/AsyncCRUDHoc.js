import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const AsyncHOC = (mapState, mapDispatch) => BaseComponent => {
  class Connector extends Component {
    /**
     * @memberOf hoc
     *
     * {Function} fetch - fetch(query)
     * {Function} update - update(id, data)
     * {Function} del - del(id)
     * {Function} create - del(data)
     *
     * @property {Boolean} data.isFetching - action in progress
     * @property {String} data.status - action status
     * @property {Object} data.payload - action result
     *
     * @returns {Component} - connected component
     */

    static propTypes = {
      fetch: PropTypes.func,
      update: PropTypes.func,
      del: PropTypes.func,
      create: PropTypes.func,
      data: PropTypes.object.isRequired
    }

    render() {
      const customProps = {
        ...this.props
      }

      return <BaseComponent {...customProps} />
    }
  }

  Connector.displayName = `Connector ${BaseComponent.displayName ||
    BaseComponent.name ||
    'Component'}`

  return connect(
    (state, props) => {
      return {
        ...{},
        ...mapState(state, props)
      }
    },
    (dispatch, getState) => {
      return {
        ...{},
        ...mapDispatch(dispatch, getState)
      }
    }
  )(Connector)
}
