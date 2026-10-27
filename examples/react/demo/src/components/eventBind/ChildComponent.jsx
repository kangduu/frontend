import React, { Component } from "react";

export default class ChildComponent extends Component {
  componentDidUpdate(prevProps) {
    const { clickBtn } = this.props;
    console.log(
      "[ChildComponent updated] this.props.clickBtn === prevProps.clickBtn : ",
      clickBtn === prevProps.clickBtn
    );
  }
  render() {
    console.log("child com render");
    return <p>子组件：测试是否更新</p>;
  }
}
