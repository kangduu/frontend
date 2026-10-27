import React, { useEffect, useLayoutEffect } from "react";

export default function Test() {
  useEffect(() => {
    console.log("[Test] useEffect mount");
  }, []);
  useLayoutEffect(() => {
    console.log("[Test] useLayoutEffect mount");
  }, []);
  return <div>Test</div>;
}
