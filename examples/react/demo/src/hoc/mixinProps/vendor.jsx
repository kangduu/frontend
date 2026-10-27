import React from "react";

export default function (WrappedComponent) {
  class WithSubscription extends React.Component {
    state = {
      uuid: "123",
    };
    componentDidMount() {
      console.log("HigherOrderComponent Mount");
    }
    render() {
      const newProps = { type: "HOC" };
      return <WrappedComponent {...this.props} {...newProps} {...this.state} />;
    }
  }

  WithSubscription.displayName = `MixinsHOC`;

  return WithSubscription;
}
