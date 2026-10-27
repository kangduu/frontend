import React, { Component } from "react";

export default function (WrappedComponent) {
  class WithSubscription extends Component {
    constructor() {
      super();
      this.refTarget = React.createRef();
    }

    componentDidMount() {
      // 1. 类组件，则是组件实例
      // 2. 函数组件，则为null，可以使用React.forwardRef转发某个dom元素：function AcquireRef(props, ref) {}
      //
      const ref = this.refTarget.current;

      if (ref) {
        // 如何区分是dom元素还是组件实例啦？
        // if (React.isValidElement(ref)) {
        // } else {
        //   ref.style.color = "red";
        // }
      }
    }

    render() {
      return <WrappedComponent {...this.props} ref={this.refTarget} />;
    }
  }

  WithSubscription.displayName = "refs";

  return WithSubscription;
}
