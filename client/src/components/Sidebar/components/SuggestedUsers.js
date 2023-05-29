import React from "react";
import { useSelector } from "react-redux";
import styles from "./SuggestedUsers.module.scss";

import SuggestedUser from "./SuggestedUser";

function SuggestedUsers() {
  const {token} = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.suggestedUsers.users);
  

  if (users.length && token) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Suggested Users</h2>
        {users.map((user) => (
          <SuggestedUser key={user._id} user={user} />
        ))}
      </div>
    );
  }
}

export default SuggestedUsers;
