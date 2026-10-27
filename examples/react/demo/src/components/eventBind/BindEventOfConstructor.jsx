import React, { Component } from "react";
import ChildComponent from "./ChildComponent";

export default class ConstructorBinding extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };

    // this.counter = this.counter.bind(this);
  }

  counter() {
    this.setState((state) => ({
      count: state.count++,
    }));
  }

  render() {
    console.log("parent com render");
    return (
      <div>
        <p> 在 constructor 中绑定事件</p>
        <button onClick={this.counter.bind(this)}>click</button>
        <ChildComponent clickBtn={this.counter} />
      </div>
    );
  }
}
