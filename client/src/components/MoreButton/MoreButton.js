import React, { useState, useRef } from "react";
import styles from "./MoreButton.module.scss";
import { useOnClickOutside } from "../../hooks";

import Button from "../Button/Button";

function MoreButton({listDirection, children}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setMenuOpen(false), []);

  return (
    <div className={styles.container}>
      <Button
        variant="icon"
        onClick={() => setMenuOpen(true)}
        leadingIcon="more"
      />
      {menuOpen && <div className={listDirection === "bottomLeft" ? styles.listContainerBL: styles.listContainer} ref={ref}>{children}</div>}
    </div>
  );
}

export default MoreButton;
