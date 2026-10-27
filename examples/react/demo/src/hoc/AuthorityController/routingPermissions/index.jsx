// 路由权限
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import { getRouteAuth } from "mock/auth";
const { user, routeAuth } = getRouteAuth();

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Table() {
  return <h2>Table</h2>;
}

function RoutingPrimissions() {
  // 获取当前用户的权限
  const matchRouteNav = routeAuth.filter((item) => item.auth === user);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {matchRouteNav.map(({ path, name }) => (
              <li key={path}>
                <NavLink
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                  to={path}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/list">
            <Table />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default RoutingPrimissions;
