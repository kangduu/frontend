import React, { Component } from "react";
import { auth } from "mock/auth";

export default function (WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.createUserHandler = this.createUserHandler.bind(this);
    }

    createUserHandler() {
      const { create } = auth;
      if (create) {
        alert("创建用户操作");
      } else {
        window.confirm("抱歉，你没有权限创建用户，是否前往授权？");
      }
    }

    render() {
      const authority = auth.create;

      return (
        <WrappedComponent
          {...this.props}
          auth={authority}
          onClick={this.createUserHandler}
        />
      );
    }
  };
}
