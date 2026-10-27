import React, { Component } from "react";
import PropTypes from "prop-types";
import createUserHOC from "./createUserHOC";

class CreateUser extends Component {
  render() {
    const { auth, onClick } = this.props;
    return (
      <>
        <div>
          <p>控制显影</p>
          {auth ? (
            <button onClick={() => onClick()}>创建用户</button>
          ) : (
            "无权限，不显示按钮"
          )}
        </div>
        <div>
          <p>是否置灰</p>
          <button disabled={!auth}>创建用户</button>
        </div>
        <div>
          <p>事件处理中提示</p>
          <button onClick={() => onClick()}>创建用户</button>
        </div>
      </>
    );
  }
}

CreateUser.propTypes = {
  auth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default createUserHOC(CreateUser);

/* 常规写法 */
// class CreateUser extends Component {
//   constructor() {
//     super();
//     this.handleAuth = this.handleAuth.bind(this);
//   }
//   handleAuth() {
//     const { create } = auth;
//     if (create) {
//       alert("创建用户操作");
//     } else {
//       window.confirm("抱歉，你没有权限创建用户，是否前往授权？");
//     }
//   }
//   render() {
//     return (
//       <>
//         <div>
//           <p>需求：有权限则显示，否则 隐藏</p>
//           {auth.create ? (
//             <button type="button" onClick={this.handleAuth}>
//               创建用户
//             </button>
//           ) : null}
//         </div>
//         <div>
//           <p>需求：有权限则显示正常，否则 置灰</p>
//           <button
//             type="button"
//             disabled={!auth.create}
//             onClick={this.handleAuth}
//           >
//             创建用户
//           </button>
//         </div>
//         <div>
//           <p>需求：始终正常显示，但是无权限事需要提示授权</p>
//           <button type="button" onClick={this.handleAuth}>
//             创建用户
//           </button>
//         </div>
//       </>
//     );
//   }
// }
