import React from "react";
import { useHistory } from "react-router-dom";
import "./nav.less";

const list = [
  {
    label: "React",
    key: "nav-react",
    path: "/react",
  },
  {
    label: "Demo",
    key: "nav-case",
    path: "/case",
  },
];

export default function () {
  const history = useHistory();

  const [order, setOrder] = React.useState(0);
  const handleClick = React.useCallback((e) => {
    const node = e.target;
    if (node.tagName.toLowerCase() === "li") {
      const { index, path } = node.dataset;
      setOrder(Number(index));
      history.push(path);
    }
  });

  // order改变完成渲染后
  const lineRef = React.useRef(null);
  const ulRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const { children } = ulRef.current || {};
    const line = lineRef.current;
    if (children && line) {
      const _children = Array.from(children).filter(
        (node) => node.tagName.toLowerCase() === "li"
      );
      const target = _children[order];
      line.style.left = target.offsetLeft + "px";
      line.style.width = target.offsetWidth + "px";
    }
  }, [order]);

  return (
    <>
      <ul ref={ulRef} id="nav" onClick={handleClick}>
        {list.map(({ label, key, path }, index) => (
          <li
            key={key}
            data-index={index}
            data-path={path}
            className={order === index ? "active" : ""}
          >
            {label}
          </li>
        ))}
        <div className="line" ref={lineRef} />
        <div className="profile">
          <span>Duk</span>
        </div>
      </ul>
    </>
  );
}
