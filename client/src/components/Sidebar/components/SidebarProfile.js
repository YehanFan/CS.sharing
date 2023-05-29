import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import styles from "./SidebarProfile.module.scss";

import Avatar from "react-avatar";
import Button from "../../Button/Button";

import {
  followUser,
  unfollowUser,
  getProfile,
} from "../../../features/profile/profileService";
import { formatFollowers } from "../../../utils/stringUtils";

function SidebarProfile({
  username,
  openAuthModal,
  author,
  ...rest
}) {
  const [profile, setProfile] = useState(author ? author : null);
  const navigate = useNavigate();

  const {id, token} = useSelector(state => state.auth.user)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getProfile(username, token);
        setProfile(response);
      } catch (error) {
        navigate("/404");
      }
    }

    if (!author) {
      fetchUsers();
    }
  }, [profile?.username, profile, author, navigate, token]);

  function handleFollow() {
    if (token && profile?.isFollowing) {
      unfollowUser(id, profile._id, token);
      setProfile({
        ...profile,
        followerCount: profile?.followerCount - 1,
        isFollowing: false,
      });
    } else if (token && !profile?.isFollowing) {
      followUser(id, profile._id, token);
      setProfile({
        ...profile,
        followerCount: profile?.followerCount + 1,
        isFollowing: true,
      });
    } else {
      openAuthModal();
    }
  }
  

  return (
    <div className={styles.content}>
      <Link to={`/${profile?.username}`}>
        <Avatar
          name={profile?.username}
          src={profile?.avatar?.url}
          size={88}
          round={true}
          textSizeRatio={1.6}
        />
      </Link>
      <Link className={styles.link} to={`/${profile?.username}`}>
        <h2 className={styles.username}>{"@" + profile?.username}</h2>
      </Link>
      <p className={styles.followers}>
        {formatFollowers(profile?.followerCount)}
      </p>
      <p className={styles.bio}>{profile?.bio}</p>
      <div>
        {profile?._id === id ? <Link to="/settings" className={styles.link}>Edit profile</Link> : (
          <Button onClick={() => handleFollow()}>
            {!profile?.isFollowing ? "Follow" : "Unfollow"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SidebarProfile;
