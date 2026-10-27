import React, { Component } from "react";

export default function (WrappedComponent) {
  class WithSubscription extends Component {
    constructor() {
      super();
      this.state = {
        value: 0,
      };
      this.changeValue = this.changeValue.bind(this);
    }

    changeValue(value) {
      this.setState({ value });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          changeValue={this.changeValue}
        />
      );
    }
  }

  WithSubscription.displayName = "ExtractState";

  return WithSubscription;
}
