import React from "react";
import AutomaticBatching from "../../components/AutomaticBatching";

const HookUseLayoutEffect = React.lazy(() =>
  import("src/hooks/useLayoutEffect")
);
const MemoDemo = React.lazy(() => import("@components/MemoDemo"));

export default function ReactPage() {
  return (
    <>
      {/* <HookUseLayoutEffect />

      <h3>【性能优化】使用memo或PureComponent前的思考</h3>
      <MemoDemo />

      <h3>Automatic Batching</h3>
      <AutomaticBatching /> */}
    </>
  );
}
