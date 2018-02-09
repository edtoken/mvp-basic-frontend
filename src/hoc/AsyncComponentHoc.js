import React, { Component } from "react";

export default function asyncComponent(getComponentPromise) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { Cmp: null };
    }

    componentDidMount() {
      if (!this.state.Cmp) {
        console.log("will mount");
        getComponentPromise.then(Cmp => {
          // this.setState({ Cmp });
        });
      }
    }
    render() {
      const { Cmp } = this.state;
      if (Cmp) {
        // return <Cmp {...this.props} />;
        console.log(Cmp);
        return <span>ready</span>;
      }
      return <span>Loading...</span>;
    }
  }
  return AsyncComponent;
}
