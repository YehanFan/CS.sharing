import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.scss";

import { searchPosts, reset } from "../../features/posts/postsSlice";

import Icon from "../Icon/Icon";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(searchPosts(query));
    navigate(`/search?query=${query}`);
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <span className={styles.icon}>
        <Icon icon="search" className={styles.icon} />
      </span>
      <input
        type="search"
        placeholder="Search..."
        className={styles.searchBar}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default Search;
