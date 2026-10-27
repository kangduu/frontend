import { Button, Radio } from "antd";
import React, { useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./styles.css";

const modes = ["out-in", "in-out"];

export default function () {
  const [state, setState] = useState(false);
  const key = state ? "Goodbye, world!" : "Hello, world!";

  const [modeValue, setModeValue] = useState(modes[0]);
  const [stateMode, setStateMode] = useState(false);
  return (
    <div>
      <h2> SwitchTransition </h2>
      <div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={key}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
            classNames="fade"
          >
            <button onClick={setState.bind(void 0, !state)}>{key}</button>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div
        style={{
          border: "1px solid",
          padding: 10,
        }}
      >
        <br />
        <label htmlFor="">Mode：</label>
        <Radio.Group
          value={modeValue}
          onChange={(e) => setModeValue(e.target.value)}
        >
          {modes.map((mode) => (
            <Radio.Button key={mode} value={mode}>
              {mode}
            </Radio.Button>
          ))}
        </Radio.Group>

        <SwitchTransition mode={modeValue}>
          <CSSTransition
            key={stateMode}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade-mode"
          >
            <div className="button-container">
              <button
                className="btn"
                onClick={setStateMode.bind(void 0, !stateMode)}
              >
                {stateMode ? "Goodbye, world!" : "Hello, world!"}
              </button>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
