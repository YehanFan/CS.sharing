import React from "react";
import { Link } from "react-router-dom";
import styles from "./Notification.module.scss";

import { formatDate } from "../../../utils/dateUtils";

import Avatar from "react-avatar";

function Notification({ notification }) {
  const { actor, link } = notification;

  function renderNotificationText() {
    switch (notification.type) {
      case "comment":
        return ` commented on your post`;
      case "follow":
        return ` has followed you`;
      case "like":
        return ` liked your post`;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <Link to={`/${actor.username}`}>
        <Avatar
          name={actor.username}
          src={actor.avatar?.url}
          imageProps={{ resizeMode: "cover" }}
          size={32}
          textSizeRatio={1.5}
          round
        />
      </Link>
      <div>
      <Link className={styles.notificationLink} to={`/${link}`}>
          <span className={styles.actor}>{actor.username}</span>
            {renderNotificationText()}
        
          <p className={styles.details}>{formatDate(notification.createdAt)}</p> 
           </Link>
      </div>
    </div>
  );
}

export default Notification;
