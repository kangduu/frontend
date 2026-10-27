import React, { Component } from "react";
import RefsHOC from "./vendor";
import FancyButton from "./forwardRefsHOC";

const ref = React.createRef();

class AcquireRef extends Component {
  constructor() {
    super();
    this.incrementValueHandler = this.incrementValueHandler.bind(this);
    this.changeValueHandler = this.changeValueHandler.bind(this);
  }
  state = {
    value: 0,
  };
  incrementValueHandler() {
    this.setState((state) => ({ value: state.value++ }));
  }
  changeValueHandler(e) {
    this.setState({ value: e.target.value });
  }

  componentDidMount() {
    // ref.current.focus();
    console.log(ref.current);
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="请输入用户名"
          value={value}
          onChange={this.changeValueHandler}
        />
        <button onClick={this.incrementValueHandler}>+</button>

        <FancyButton label="Click Me" handleClick={() => {}} ref={ref} />
      </div>
    );
  }
}

export default RefsHOC(AcquireRef);

// function AcquireRef(props, ref) {
//   return (
//     <div>
//       <h5>Function Component</h5>
//       <p ref={ref}>refs转发</p>
//     </div>
//   );
// }

// export default RefsHOC(React.forwardRef(AcquireRef));
