import React, { memo, useEffect, useState } from "react";

const ExpensiveTree = () => {
  let now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }
  return <p>I am a very slow component tree.</p>;
};

// function ExpensiveTree() {
//   let now = performance.now();
//   while (performance.now() - now < 100) {
//     // Artificial delay -- do nothing for 100ms
//   }
//   return <p>I am a very slow component tree.</p>;
// }

// class ExpensiveTree extends React.PureComponent {
//   render() {
//     return <p>I am a very slow component tree.</p>;
//   }
// }

// 向下移动State
// function App() {
//   let [color, setSolor] = useState("red");
//   return (
//     <>
//       <input
//         type="color"
//         value={color}
//         onChange={(e) => setSolor(e.target.value)}
//         style={{ display: "inline-block", marginLeft: 600 }}
//       />
//       <p style={{ color }}>Hello, world!</p>
//     </>
//   );
// }

// 内容提升
function ColorPicker({ children }) {
  let [color, setSolor] = useState("red");
  return (
    <div style={{ color }}>
      <input
        type="color"
        value={color}
        onChange={(e) => setSolor(e.target.value)}
        style={{ display: "inline-block", marginLeft: 600 }}
      />
      <p>当前的字体颜色</p>
      {children}
    </div>
  );
}

const Demo = () => {
  return (
    <ColorPicker>
      <p>--父组件内容--</p>
      <ExpensiveTree />
    </ColorPicker>
  );
};

export default Demo;
