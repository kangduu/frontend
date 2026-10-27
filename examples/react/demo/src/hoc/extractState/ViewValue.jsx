import React from "react";
import HigherOrderComponent from "./vendor";

function ViewValue(props) {
  const { value } = props;
  return <div>ViewValue: {value}</div>;
}

export default HigherOrderComponent(ViewValue);
