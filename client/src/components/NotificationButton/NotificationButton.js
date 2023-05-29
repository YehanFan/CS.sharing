import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./NotificationButton.module.scss";
import socket from "../../config/socket";

import { getUnreadNotifications } from "../../features/notifications/notificationsService";

import Icon from "../Icon/Icon";

function NotificationButton({ isActive }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchNotifications() {
      if (user?.id) {
        const { username, token } = user;
        const unreadNotifications = await getUnreadNotifications(
          username,
          token
        );

        setUnreadCount(unreadNotifications.count);
      }
    }

    socket.on("notification", ({count}) => {

      setUnreadCount(count);
    });

    fetchNotifications()


    return () => {
      socket.emit("userDisconnect", user.id);
    };
  }, []);

  function onClick(){
    setUnreadCount(0)
  }

  return (
    <Link
      className={isActive ? styles.activeLink : styles.link}
      to="notifications"
      onClick={onClick}
    >
      <p className={styles.counter}>{unreadCount ? unreadCount: ""}</p>
      <Icon icon="notifications" />
    </Link>
  );
}

export default NotificationButton;
