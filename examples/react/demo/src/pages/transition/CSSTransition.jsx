import { Button, Card } from "antd";
import React, { Fragment, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

export default () => {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [inProp, setInProp] = useState(false);
  return (
    <Fragment>
      <h2> CSSTransition </h2>
      <div>
        <CSSTransition in={inProp} timeout={1000} classNames="my-node">
          <div>{"I'll receive my-node-* classes"}</div>
        </CSSTransition>
        <Button onClick={() => setInProp(!inProp)}>
          Click to Enter（CSSTransition）
        </Button>
      </div>
      <div style={{ margin: 10, width: 600 }}>
        {showButton && (
          <Button type="primary" onClick={() => setShowMessage(true)}>
            Show Message
          </Button>
        )}
        <CSSTransition
          in={showMessage}
          timeout={300}
          classNames="alert"
          unmountOnExit
          onEnter={() => setShowButton(false)}
          onExited={() => setShowButton(true)}
        >
          <Card title="Animated alert message">
            <p>
              This alert message is being transitioned in and out of the DOM.
            </p>
            <Button type="ghost" onClick={() => setShowMessage(false)}>
              Close
            </Button>
          </Card>
        </CSSTransition>
      </div>
    </Fragment>
  );
};
