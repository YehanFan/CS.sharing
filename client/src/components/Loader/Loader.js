import React from 'react'
import styles from "./Loader.module.scss"
import cx from "classnames";

function Loader({className}) {
  return (
    <div className={cx(styles.container, className)}>
    <div className={styles.loader}>Loading</div>
    </div>
  )
}

export default Loader