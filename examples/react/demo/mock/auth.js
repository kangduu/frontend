import Mockjs from "mockjs";

// 独立权限
const auth = Mockjs.mock({
  "create|1-2": true,
});

// 路有权限模拟
const getRouteAuth = function () {
  const navConfig = [
    { path: "/home", name: "Home", auth: "" },
    { path: "/about", name: "Abort", auth: "" },
    { path: "/users", name: "Users", auth: "" },
    { path: "/list", name: "Table", auth: "" },
  ];

  const users = ["admin", "manager", "user"];

  const { user } = Mockjs.mock({ "user|1": users });

  const routeAuth = navConfig.map((item) => {
    let { auth } = Mockjs.mock({ "auth|+1": users });
    return Object.assign({}, item, { auth });
  });

  return { user, routeAuth };
};

export { auth, getRouteAuth };
