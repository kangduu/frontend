import React, { Component } from "react";
import Test from "./Test";

export default class HookUseLayoutEffect extends Component {
  componentDidMount() {
    console.log("[HookUseLayoutEffect] componentDidMount");
  }
  render() {
    return <Test></Test>;
  }
}
