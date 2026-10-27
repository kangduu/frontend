import React, { Fragment } from "react";
import styles from "./styles.module.less";
// import utilStyles from "src/styles/utils.module.less";

const DagreGraph = React.lazy(() => import("src/g6/dagreLayout"));

function Demo(props) {
  console.log(props);
  return (
    <section className={styles.container}>
      <DagreGraph />
    </section>
  );
}
export default Demo;
