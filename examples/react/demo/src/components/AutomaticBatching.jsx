import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

const Increment = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count value:", count);
  });

  const incermentHandler = () => {
    setTimeout(() => {
      ReactDOM.flushSync(() => {
        setCount((c) => c + 1);
        setCount((c) => c + 1);
        setCount((c) => c + 1);
      });
    }, 300);
  };

  return <button onClick={incermentHandler}>点击</button>;
};

export default Increment;

// const Increment = () => {
//   const [count, setCount] = useState(0);
//   const [flag, setFlag] = useState(false);

//   useEffect(() => {
//     console.log("[Incerment Component] Updated of useEffect:", count, flag);
//   });

//   const incermentHandler = function () {
//     new Promise((resolve, reject) => {
//       setCount((c) => c + 1);
//       setTimeout(() => {
//         resolve(void 0);
//       }, 800);
//     }).then(() => {
//       ReactDOM.flushSync(() => {
//         setCount((c) => c + 1);
//         setFlag((f) => !f);
//       });
//     });
//   };

//   return (
//     <>
//       <button onClick={incermentHandler}>+</button>
//     </>
//   );
// };
// export default Increment;

// import { Component } from "react";

// class AutomaticBatching extends Component {
//   constructor() {
//     super();
//     this.state = {
//       count: 1,
//       flag: false,
//     };
//     this.handleClickBtn = this.handleClickBtn.bind(this);
//   }
//   handleClickBtn() {
//     setTimeout(() => {
//       ReactDOM.flushSync(() => {
//         this.setState((state) => ({ count: state.count + 1 }));
//         this.setState((state) => ({ flag: !state.flag }));
//       });
//     }, 800);
//   }

//   componentDidUpdate() {
//     console.log(
//       "[AutomaticBatching] Updated ：",
//       this.state.count,
//       this.state.flag
//     );
//   }
//   render() {
//     return <button onClick={this.handleClickBtn}>点击按钮，查看log</button>;
//   }
// }

// export default AutomaticBatching;
