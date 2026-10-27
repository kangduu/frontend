import React from "react";
import { Translation } from "react-i18next";
import styles from "./styles.module.less";
import "@/styles/common.less";
import Language from "../language";

// 说明：每一项的 key 值，必须与 src/locales/xxx.json 文件中的  `translation.header` 的 key 值一致
// 若是子项，则父级的 key 值必须以 `.__self` 结尾，子项的 key 值必须以 `parentkey.` 开头
const NavData = [
  { key: "home", path: "/" },
  { key: "pp", path: "/pp" },
  { key: "fullz", path: "/fullz" },
  { key: "ent_message", path: "/ent" },
  { key: "other", path: "/other" },
  {
    key: "course.__self",
    path: "/course",
    children: [
      { key: "course.chrome", path: "/chrome" },
      { key: "course.firefox", path: "/firefox" },
    ],
  },
  { key: "support", path: "/support" },
];

const prefix = "header.";

function Header({ children }) {
  return (
    <header className={styles.header}>
      <div className={["container", styles.wrapper].join(" ")}>
        <ul className={styles.navbar}>
          {NavData.map(({ key, children, path }) => {
            if (Array.isArray(children) && children.length > 0) {
            }
            return (
              <Translation>
                {(t) => (
                  <li key={key} className={styles.item}>
                    {t(prefix + key)}
                  </li>
                )}
              </Translation>
            );
          })}
          <li style={{ marginLeft: "auto" }}>购物车</li>
        </ul>
        <div className={styles.feature}>{children}</div>
      </div>
      <div className={styles.discount}>
        <span>discount :</span>
        <Translation>{(t) => t("discount")}</Translation>
      </div>
    </header>
  );
}
export default Header;
