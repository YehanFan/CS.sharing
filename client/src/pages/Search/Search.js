import React, { Fragment, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Search.module.scss";

import { searchPosts } from "../../features/posts/postsService";
import PostItem from "../../components/PostItem/PostItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestedUsers from "../../components/Sidebar/components/SuggestedUsers";
import Loader from "../../components/Loader/Loader";

function Search() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let query;
    for (const entry of searchParams.entries()) {
      query = entry[1];
    }

    async function fetchPosts() {
      setLoading(true);
      const results = await searchPosts(query);
      setPosts(results);
      setLoading(false);
    }

    fetchPosts();
  }, [searchParams]);

  function renderResults(){
    if(loading){
      return <Loader className={styles.loader} />
    } else if (posts.length){
      return posts.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          username={post.author.username}
        />
      ))
    } else {
      return <p>No search results found.</p>
    }
  }

  return (
    <Fragment>
      <main className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.header}>Search results</h1>
          {renderResults()}
        </div>
      </main>
      <Sidebar>
        <SuggestedUsers />
      </Sidebar>
    </Fragment>
  );
}

export default Search;
