import React, { Fragment, useState, useEffect } from "react";
import styles from "./Feed.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { getNewsfeed } from "../../features/newsfeed/newsfeedService";
import {
  reset,
  getSuggestedUsers,
} from "../../features/suggestedUsers/suggestedUsersSlice";

import PostItem from "../../components/PostItem/PostItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestedUsers from "../../components/Sidebar/components/SuggestedUsers";
import Loader from "../../components/Loader/Loader";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function getFeed() {
      setLoading(true);
      const newsFeed = await getNewsfeed(user?.token);
      setFeed(newsFeed);
      setLoading(false);
    }

    getFeed();
    dispatch(getSuggestedUsers());

    return () => {
      dispatch(reset());
    };
  }, []);

  function renderFeed() {
    if (loading && !feed.length) {
      return <Loader className={styles.loader} />;
    } else if (!feed.length) {
      return (
        <div className={styles.emptyFeed}>
          <h1>No posts available.</h1>
        </div>
      );
    } else {
      return feed.map((item) => (
        <PostItem key={item._id} post={item} username={item.author.username} />
      ));
    }
  }

  return (
    <Fragment>
      <main className={styles.wrapper}>
        <div className={styles.container}>{renderFeed()}</div>
      </main>

      <Sidebar>
        <SuggestedUsers />
      </Sidebar>
    </Fragment>
  );
}

export default Feed;
