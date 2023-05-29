import React from "react";
import { Link } from "react-router-dom";
import styles from "./ListItem.module.scss";

import Button from "../../../components/Button/Button";

function ListItem({ item }) {
  const { author } = item;

  function renderNumberOfPosts() {
    if (item.posts?.length === 0) {
      return;
    } else if (item.posts?.length === 1) {
      return "1 post";
    } else {
      return `${item.posts?.length} posts`;
    }
  }

  return (
    <Link to={`/${author.username}/lists/${item._id}`} className={styles.link}>
      <article className={styles.container}>
        <h2 className={styles.title}>{item.name}</h2>
        <div className={styles.details}>
          <Button className={styles.button}>View list</Button>
          <span>{renderNumberOfPosts()}</span>
        </div>
      </article>
    </Link>
  );
}

export default ListItem;
