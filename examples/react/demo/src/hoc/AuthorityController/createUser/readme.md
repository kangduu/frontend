---
source: "front-end-web-developer/React/demo/src/hoc/AuthorityController/createUser/readme.md"
---

- 需求一：只有管理员可以创建用户，管理员才能看到

```jsx
class User extends React.Component {
  //   权限获取
  getAuthority() {
    return true;
  }

  render() {
    const isAdmin = getAuthority("userinfo");
    return <div>{isAdmin ? <button>创建用户</button> : null}</div>;
  }
}
```

上述需求只是一个简单的权限按钮控制，假如有一天，产品说没有权限时置灰即可。好，我们又改一改

- 需求二：只有管理员可以创建用户，管理员才能操作，否则置灰按钮

```jsx
class User extends React.Component {
  //   权限获取
  getAuthority() {
    return true;
  }

  render() {
    const isAdmin = getAuthority("userinfo");
    return (
      <div>
        <button disabled={!isAdmin}>创建用户</button>
      </div>
    );
  }
}
```

过了一段时间，需求又改了，不要置灰了，没有权限的时候提示去授权。好，继续改

- 需求三：只有管理员可以创建用户，否则需要提示去授权

```jsx
class User extends React.Component {
  //   权限获取
  getAuthority() {
    return true;
  }

  handleAuth() {
    const isAdmin = getAuthority("userinfo");
    if (isAdmin) {
    } else {
      // 提示授权操作
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAuth}>创建用户</button>
      </div>
    );
  }
}
```

总结一下：上述这种情况，在实际工作中肯定会有，如果只是简单的一两个权限组件按钮，那维护还能应付，如果整个系统都是权限按钮啦？所以，我们应该有所前瞻性，保证代码的可维护，可拓展等进行分析编码。

## 使用 HOC 实现

CreateUserHOC 高阶组件实现

```jsx
import React, { Component } from "react";
import { auth } from "../../../mock/auth";

export default function (WrapComponent) {
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
        <WrapComponent
          {...this.props}
          auth={authority}
          onClick={this.createUserHandler}
        />
      );
    }
  };
}
```

像上面这样，我们可以把对权限的逻辑操作封装起来，关于 UI 的部分，交由各种的 WrappedComponent 组件自己实现。
