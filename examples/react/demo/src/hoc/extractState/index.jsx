import React from "react";
import HigherOrderComponent from "./vendor";

function ExtractStateHOC(props) {
  const [state, setState] = React.useState(undefined);
  const { value, changeValue } = props;
  return (
    <div>
      <div>hi,value is {value}</div>
      <label htmlFor="value">改变 value 值 ：</label>
      <input
        type="text"
        name="value"
        id="value"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <button onClick={() => changeValue(state)}>提交</button>
    </div>
  );
}

export default HigherOrderComponent(ExtractStateHOC);
