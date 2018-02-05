import React, { Component } from 'react'
export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    static Cmp = null
    state = { Cmp: AsyncComponent.Cmp }
    componentWillMount() {
      if (!this.state.Cmp) {
        getComponent().then(Cmp => {
          AsyncComponent.Cmp = Cmp
          this.setState({ Cmp })
        })
      }
    }
    render() {
      const { Cmp } = this.state
      if (Cmp) {
        return <Cmp {...this.props} />
      }
      return null
    }
  }
  return AsyncComponent
}
