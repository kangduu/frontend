import React from "react";
import Transition from "./Transition";
import CSSTransition from "./CSSTransition";
import SwitchTransition from "./SwitchTransition";
import TransitionGroup from "./TransitionGroup";
import WithReactRouter from "./WithReactRouter";

export default function ReactTransitionGroup() {
  return (
    <div style={{ width: 800, margin: "50px auto" }}>
      <h1>React Transition Group</h1>
      <Transition />
      <CSSTransition />
      <SwitchTransition />
      <TransitionGroup />
      <WithReactRouter />
    </div>
  );
}
