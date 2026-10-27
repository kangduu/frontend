import React, { useLayoutEffect, useState } from "react";
import { Transition } from "react-transition-group";

const duration = 1000;

const defaultStyles = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Fade = ({ in: inProp }) => (
  <Transition
    in={inProp}
    timeout={{
      appear: 1000,
    }}
    onEnter={console.log.bind(void 0, "enter")}
    onEntering={console.log.bind(null, "entering")}
    onEntered={console.log.bind(null, "entered")}
    onExit={console.log.bind(null, "exit")}
    onExiting={console.log.bind(null, "exiting")}
    onExited={console.log.bind(null, "exited")}
  >
    {(state) => (
      <div
        style={{
          ...defaultStyles,
          ...transitionStyles[state],
        }}
      >
        I'm a fade Transition!
      </div>
    )}
  </Transition>
);

export default () => {
  const [inProp, setInProp] = useState(false);

  return (
    <div>
      <h2> Transition </h2>
      <Fade in={inProp} />
      <button onClick={() => setInProp(!inProp)}>Click Me</button>
    </div>
  );
};
