import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
// import Demo from "../pages/case";
// import ReactPage from "../pages/react";
import ReactTransitionGroup from "../pages/transition";
import FormList from "../components/FormList";
export default class CaRouter extends Component {
  render() {
    return (
      <React.Suspense fallback={<Spin spinning={true} />}>
        <Routes>
          <Route path="/" element={<ReactTransitionGroup />}>
            <Route path="form" element={<FormList />} />
            {/* <Route
            path="/case"
            children={(params) => {
              const { match, ...rest } = params;
              if (match.isExact) return <Demo {...rest} />;
              return <Redirect to={match.url} />;
            }}
            />
            <Route exact path="/react">
            <ReactPage />
          </Route> */}
            <Route
              path="*"
              element={
                <main style={{ padding: 10 }}>
                  <p>Nothing!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </React.Suspense>
    );
  }
}
