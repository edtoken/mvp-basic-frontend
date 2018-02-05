import React, { Component } from 'react'

export default class LayoutContainer extends Component {
  render() {
    return (
      <div>
        <h1>Layout</h1>
        {this.props.children}
      </div>
    )
  }
}
