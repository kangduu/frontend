import React, { Component } from "react";
import CreateUser from "./CreateUser";
import RoutingPrimissions from "./routingPermissions";

export default class AuthorityController extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <p>1. 尝试使用HOC控制按钮权限:</p>
        <CreateUser />

        <p>2. 路由权限控制</p>
        <RoutingPrimissions />
      </>
    );
  }
}
