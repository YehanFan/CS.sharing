import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks";
import styles from "./SideNavigation.module.scss";
import { ReactComponent as Logo } from "../../assets/logo-sm.svg";

import navigationRoutes from "../../constants/navigationRoutes";
import { logout } from "../../features/auth/authSlice";

import Button from "../Button/Button";
import NotificationButton from "../NotificationButton/NotificationButton";
import Icon from "../Icon/Icon";
import AvatarButton from "./components/AvatarButton";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";

function SideNavigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const pathname = location.pathname;
  const [authModalOpen, openAuthModal, closeAuthModal] = useModal();

  function renderNavigationButtons() {
    let paths = pathname.split("/");
    paths = paths.map((path) => (path === "" ? "/" : path));
    const activeRoute = paths[paths.length - 1];

    return navigationRoutes.map((route) => {
      const isActiveRoute = route.path === activeRoute;

      if (!user?.username) {
        return (
          <Button
            key={route.label}
            className={isActiveRoute ? styles.activeButton : styles.button}
            onClick={openAuthModal}
            variant="icon"
            leadingIcon={route.icon}
          ></Button>
        );
      } else if (route.path === "notifications") {
        return (
          <NotificationButton key={route.label} isActive={isActiveRoute} />
        );
      } else {
        return (
          <Link
            key={route.label}
            className={isActiveRoute ? styles.activeLink : styles.link}
            to={route.path}
          >
            <Icon icon={route.icon} />
          </Link>
        );
      }
    });
  }

  function onClickLogout() {
    dispatch(logout());
  }

  return (
    <Fragment>
      <header className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Logo aria-hidden={true} />
        </Link>
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>{renderNavigationButtons()}</ul>
        </nav>
        <div>
          {user?.token && (
            <AvatarButton
              name={user?.username}
              src={user?.avatar?.url}
              size={32}
              textSizeRatio={1.5}
              round={true}
            >
              <Link className={styles.listLink} to={`/${user.username}`}>
                My Profile
              </Link>
              <button onClick={onClickLogout} className={styles.logout}>
                Logout
              </button>
            </AvatarButton>
          )}
        </div>
      </header>
      {authModalOpen && (
        <AuthenticationModal
          shouldShowLogin={false}
          isOpen={authModalOpen}
          onRequestClose={closeAuthModal}
        />
      )}
    </Fragment>
  );
}

export default SideNavigation;
