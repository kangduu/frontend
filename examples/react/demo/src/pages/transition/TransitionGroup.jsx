import React, { useState } from "react";
import { Card, List, Button } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as uuid from "uuid";

const uuid_v4 = uuid.v4;

export default () => {
  const [items, setItems] = useState([
    { id: uuid_v4(), text: "Buy eggs" },
    { id: uuid_v4(), text: "Pay bills" },
    { id: uuid_v4(), text: "Invite friends over" },
    { id: uuid_v4(), text: "Fix the TV" },
  ]);

  return (
    <>
      <h2>TransitionGroup</h2>
      <Card>
        <List>
          <TransitionGroup component={null}>
            {items.map(({ id, text }) => (
              <CSSTransition key={id} timeout={500} classNames="item">
                <List.Item key={id}>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      setItems((items) =>
                        items.filter((item) => item.id !== id)
                      )
                    }
                  >
                    &times;
                  </button>
                  {text}
                </List.Item>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </List>
        <br />
        <Button
          type="primary"
          onClick={() => {
            const text = prompt("Enter some text");
            if (text) {
              setItems((items) => [...items, { id: uuid_v4(), text }]);
            }
          }}
        >
          Add Item
        </Button>
      </Card>
    </>
  );
};
