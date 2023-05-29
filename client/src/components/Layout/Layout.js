import React from "react";
import styles from "./Layout.module.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import SideNavigation from "../SideNavigation/SideNavigation";

function Layout({ children, ...rest }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  //if location matches / and user is not authenticated, show orange page
  if(location.pathname === "/" && !user?.id){
    return <div className={styles.home}>{children}</div>;
  } else {
    return (
      <div className={styles.layout} {...rest}>
        <SideNavigation />
        <div className={styles.content}>
        {children}
        </div>
      </div>
    );
  }
 
}

export default Layout;
