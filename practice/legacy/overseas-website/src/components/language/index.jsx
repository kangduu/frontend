import React, { Fragment } from "react";
import EnUS_ICON from "@/assets/locale/en-us.png";
import RU_ICON from "@/assets/locale/ru.png";
import styles from "./styles.module.less";
function Language(props) {
  return (
    <ul className={styles.lang_box}>
      <li>
        <img src={EnUS_ICON} alt="en-us" style={{ width: "36px" }} />
      </li>
      <li>
        <img src={RU_ICON} alt="ru" style={{ width: "36px" }} />
      </li>
    </ul>
  );
}
export default Language;
