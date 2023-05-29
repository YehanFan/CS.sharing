import React, { Fragment, useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../hooks";
import {
  followUser,
  unfollowUser,
  getProfile,
} from "../../features/profile/profileService";
import { formatFollowers } from "../../utils/stringUtils";

import Avatar from "react-avatar";
import Button from "../../components/Button/Button";
import PostItem from "../../components/PostItem/PostItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarProfile from "../../components/Sidebar/components/SidebarProfile";
import Loader from "../../components/Loader/Loader";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";

function Profile() {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState();
  const { username } = useParams();
  const navigate = useNavigate();
  const [authModalOpen, openAuthModal, closeAuthModal] = useModal();

  const { id, token } = useSelector((state) => state.auth.user);

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

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await getProfile(username, token);
        setProfile(response);
        setLoading(false);
      } catch (error) {
        navigate("/404");
      }
    }

    fetchUsers();
  }, [
    username,
    navigate,
    token,
    setProfile,
  ]);

  function renderPosts() {
    if (profile?.posts?.length > 0) {
      return profile?.posts.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          username={username}
          avatar={profile?.avatar?.url}
        />
      ));
    } else {
      return (
        <div>
          <p>{profile?.username} hasn't written any posts yet.</p>
        </div>
      );
    }
  }

  if (loading) {
    return <Loader className={styles.loader} />;
  } else {
    return (
      <Fragment>
        <main className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.headerInfoContainer}>
                <Avatar
                  name={username}
                  size="60"
                  textSizeRatio={1.375}
                  round
                  src={profile?.avatar?.url}
                  className={styles.headerAvatar}
                />
                <div className={styles.headerInfo}>
                  <h1 className={styles.headerName}>{username}</h1>
                  <p className={styles.headerFollowers}>
                    {formatFollowers(profile?.followerCount)}
                  </p>
                </div>
              </div>
              <div>
                {!profile?.isOwnProfile && (
                  <Button
                    className={styles.headerButton}
                    onClick={() => handleFollow()}
                  >
                    {!profile?.isFollowing ? "Follow" : "Unfollow"}
                  </Button>
                )}
              </div>
            </div>
            <div>{renderPosts()}</div>
          </div>
        </main>
        <Sidebar>
          {profile?.username && (
            <SidebarProfile
              username={profile.username}
              setProfile={setProfile}
              openAuthModal={openAuthModal}
            />
          )}
        </Sidebar>
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
}

export default Profile;
