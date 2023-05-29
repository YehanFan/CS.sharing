import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOnClickOutside } from "../../hooks";
import styles from "./BookmarkButton.module.scss";

import {
  getReadingLists,
  reset,
} from "../../features/readingLists/readingListsSlice";

import Button from "../Button/Button";
import Bookmark from "./components/Bookmark";

function BookmarkButton({ post }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.readingLists);
  const user = useSelector((state) => state.auth.user);

  const ref = useRef();
  useOnClickOutside(ref, () => setMenuOpen(false), []);

  const [inList, setInList] = useState(false);

  useEffect(() => {
    dispatch(getReadingLists(user.username));

    return () => dispatch(reset());
  }, []);

  if (user?.token) {
    return (
      <div className={styles.container}>
        <Button
          variant="icon"
          onClick={() => setMenuOpen(true)}
          leadingIcon={inList ? "bookmark-filled" : "bookmark-add"}
          disabled={!user.token}
        />
        {menuOpen && (
          <div className={styles.listContainer} ref={ref}>
            {items.map((item) => (
              <Bookmark
                key={item._id}
                readingList={item}
                post={post}
                user={user}
                setMenuOpen={setMenuOpen}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default BookmarkButton;
