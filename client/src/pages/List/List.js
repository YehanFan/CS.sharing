import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./List.module.scss";
import { getReadingList } from "../../features/readingLists/readingListsService";
import { deleteReadingList } from "../../features/readingLists/readingListsSlice";
import { formatReadingList } from "../../utils/stringUtils";
import { formatRelativeDate } from "../../utils/dateUtils";

import Avatar from "react-avatar";
import PostItem from "../../components/PostItem/PostItem";
import MoreButton from "../../components/MoreButton/MoreButton";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarProfile from "../../components/Sidebar/components/SidebarProfile";
import Loader from "../../components/Loader/Loader";

function List() {
  const { username, listId } = useParams();
  const [loading, setLoading] = useState(false);
  const [readingList, setReadingList] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReadingList() {
      setLoading(true);
      const response = await getReadingList(listId);

      setReadingList(response);
      setLoading(false);
    }

    fetchReadingList();
  }, [username, listId]);

  function onClickDelete() {
    const userData = { username, readingListId: readingList._id };
    dispatch(deleteReadingList(userData));
    navigate("/");
  }

  if (loading) {
    return (
      <Fragment>
        <main className={styles.wrapper}>
          <div className={styles.container}>
            <Loader className={styles.loader} />
          </div>
        </main>
        <Sidebar>
          <SidebarProfile username={username} />
        </Sidebar>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <main className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.infoContainer}>
                <Link to={`/${readingList?.author?.username}`}>
                  <Avatar
                    name={readingList?.author?.username}
                    src={readingList?.author?.avatar?.url}
                    size="48"
                    textSizeRatio={1.5}
                    round
                  />
                </Link>
                <div className={styles.info}>
                  <Link
                    to={`/${readingList?.author?.username}`}
                    className={styles.author}
                  >
                    <p>{readingList?.author?.username}</p>
                  </Link>
                  <div className={styles.details}>
                    <p>
                      {readingList?.createdAt &&
                        formatRelativeDate(readingList?.createdAt)}
                    </p>
                    <p className={styles.bullet}>·</p>
                    <p>{formatReadingList(readingList?.items)}</p>
                  </div>
                </div>
              </div>
              {!readingList?.isPrimary && (
                <MoreButton>
                  <button
                    className={styles.deleteButton}
                    onClick={onClickDelete}
                  >
                    Delete list
                  </button>
                </MoreButton>
              )}
            </div>
            <div>
              <h1>{readingList?.name}</h1>
              <p className={styles.description}>{readingList?.description}</p>
              {readingList?.items?.map((post) => {
                return (
                  <PostItem key={post._id} post={post} username={username} />
                );
              })}
              {!readingList?.items?.length && (
                <p className={styles.noItems}>
                  Add your favorite stories to your list to have them show here.
                </p>
              )}
            </div>
          </div>
        </main>
        <Sidebar>
          <SidebarProfile username={username} />
        </Sidebar>
      </Fragment>
    );
  }
}

export default List;
