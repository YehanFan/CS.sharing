import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./SuggestedUser.module.scss";

import {
  followUser,
  unfollowUser,
} from "../../../features/profile/profileService";

import Avatar from "react-avatar";
import Button from "../../Button/Button";

function SuggestedUser({ user }) {
  const [following, setFollowing] = useState(false);
  const { id, token } = useSelector((state) => state.auth.user);

  async function handleFollow() {
    if (token && following) {
      setFollowing(false);
      await unfollowUser(id, user._id, token);
    } else if (token && !following) {
      setFollowing(true);
      await followUser(id, user._id, token);
    }
  }

  return (
    <div className={styles.container} key={user._id}>
      <Link className={styles.link} to={`/${user.username}`}>
        <Avatar
          name={user.username}
          src={user.avatar?.url}
          size={40}
          textSizeRatio={1.5}
          round
        />

        <p className={styles.username}>{user.username}</p>
      </Link>
      <Button className={styles.button} variant={following ? "primary" : "outline"} onClick={() => handleFollow()}>
        {following ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}

export default SuggestedUser;
