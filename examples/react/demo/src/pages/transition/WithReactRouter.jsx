import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Card } from "antd";
import "./styles.css";

const Home = () => (
  <div>
    <h3>Home</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet,
      purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula
      erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel
      porta turpis, ut iaculis justo.
    </p>
  </div>
);
const About = () => (
  <div>
    <h3>About</h3>
    <p>
      Donec sit amet augue at enim sollicitudin porta. Praesent finibus ex
      velit, quis faucibus libero congue et. Quisque convallis eu nisl et
      congue. Vivamus eget augue quis ante malesuada ullamcorper. Sed orci
      nulla, eleifend eget dui faucibus, facilisis aliquet ante. Suspendisse
      sollicitudin nibh lacus, ut bibendum risus elementum a.
    </p>
  </div>
);
const Contact = () => (
  <div>
    <h3>Contact</h3>
    <p>
      Aliquam iaculis a nisi sed ornare. Sed venenatis tellus vel consequat
      congue. In bibendum vestibulum orci et feugiat.
    </p>
  </div>
);

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About },
  { path: "/contact", name: "Contact", Component: Contact },
];

export default () => {
  return (
    <>
      <h2>With React Router</h2>
      <Router>
        <ul>
          {routes.map(({ path, name }) => {
            return (
              <li style={{ margin: "0 10px", display: "inline-block" }}>
                <NavLink key={path} to={path}>
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="container">
          {routes.map(({ path, Component }) => {
            return (
              <Route key={path} exact path={path}>
                {({ match }) => {
                  return (
                    <CSSTransition
                      in={match != null}
                      timeout={300}
                      classNames="page"
                      unmountOnExit
                    >
                      <div className="page">
                        <Component />
                      </div>
                    </CSSTransition>
                  );
                }}
              </Route>
            );
          })}
        </div>
      </Router>
    </>
  );
};
