import React, { useState, useEffect } from "react";
import styles from "./Bookmark.module.scss";

import {
  addReadingListItem,
  removeReadingListItem,
} from "../../../features/readingLists/readingListsService";

function Bookmark({ readingList, post, user }) {
  const relation = readingList.posts.filter(
    (postInList) => postInList.post === post._id
  )[0];
  const [checked, setChecked] = useState(Boolean(relation));
  const { token } = user;

  async function onChange() {
    const itemData = {
      readingListId: readingList._id,
      postId: post._id,
      itemId: relation?._id,
    };

    setChecked(!checked);

    if (checked) {
      await removeReadingListItem(itemData, token);
    } else {
      await addReadingListItem(itemData, token);
    }
  }

  return (
    <div className={styles.list} key={readingList._id}>
      <input
        id={`${readingList.name}`}
        onChange={onChange}
        checked={checked}
        type="checkbox"
      />
      <label htmlFor={`${readingList.name}`}>{readingList.name}</label>
    </div>
  );
}

export default Bookmark;
