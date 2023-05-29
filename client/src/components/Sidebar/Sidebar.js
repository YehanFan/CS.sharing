import React from "react";
import styles from "./Sidebar.module.scss";

import Search from "../SearchBar/SearchBar";

function Sidebar({ children }) {
  return (
    <aside className={styles.container}>
      <div className={styles.content}>
        <Search />
        {children}
      </div>
    </aside>
  );
}

export default Sidebar;
