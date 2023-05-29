import React, { useState, useRef } from "react";
import styles from "./AvatarButton.module.scss";
import { useOnClickOutside } from "../../../hooks";

import Avatar from "react-avatar";

export default function AvatarButton({ listDirection, children, ...rest }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setMenuOpen(false), []);

  return (
    <button className={styles.container} onClick={() => setMenuOpen(!menuOpen)}>
      <Avatar {...rest} />
      {menuOpen && (
        <div className={styles.listContainer} ref={ref}>
          {children}
        </div>
      )}
    </button>
  );
}
