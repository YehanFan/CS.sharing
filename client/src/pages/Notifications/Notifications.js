import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getNotifications,
  readNotifications,
} from "../../features/notifications/notificationsService";
import styles from "./Notifications.module.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestedUsers from "../../components/Sidebar/components/SuggestedUsers";
import Notification from "./components/Notification";
import Loader from "../../components/Loader/Loader";

function Notifications() {
  const [loading, setLoading] = useState(false);
  const [notificationState, setNotificationState] = useState({});
  const { username, token } = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      await readNotifications(username, token);
      const response = await getNotifications(username, token);
      setNotificationState(response);
    }

    fetchNotifications();
    setLoading(false);
  }, []);

  function renderNotifications() {
    if (loading && !notificationState.notifications?.length) {
      return <Loader className={styles.loader} />;
    } else if (notificationState.notifications?.length > 0) {
      return notificationState.notifications?.map((notification) => (
        <Notification key={notification._id} notification={notification} />
      ));
    } else {
      return (
        <div className={styles.emptyContainer}>
          <p>No new notifications.</p>
        </div>
      );
    }
  }

  return (
    <Fragment>
      <main className={styles.wrapper}>
        <h1 className={styles.header}>Notifications</h1>
        <div>{renderNotifications()}</div>
      </main>
      <Sidebar>
        <SuggestedUsers />
      </Sidebar>
    </Fragment>
  );
}

export default Notifications;
