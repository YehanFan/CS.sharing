import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks";
import styles from "./Lists.module.scss";
import {
  getReadingLists,
  reset,
} from "../../features/readingLists/readingListsSlice";

import Button from "../../components/Button/Button";
import ReadingListModal from "../../components/Modal/ReadingListModal/ReadingListModal";
import ListItem from "./ListItem/ListItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestedUsers from "../../components/Sidebar/components/SuggestedUsers";
import Loader from "../../components/Loader/Loader";

function Lists() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: readingLists, isLoading } = useSelector((state) => state.readingLists);
  const [modalOpen, openModal, closeModal] = useModal();

  useEffect(() => {
    try {
      dispatch(getReadingLists(username));
    } catch (error) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [username, navigate, dispatch]);

  function renderReadingLists(){
    if(isLoading){
      return <Loader className={styles.loader} />
    } else if(readingLists){
      return readingLists.map((item) => <ListItem key={item._id} item={item} />)
    }
  }

  return (
    <Fragment>
      <main className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <h1 className={styles.header}>Reading Lists</h1>
            <Button onClick={openModal} className={styles.button}>
              Add list
            </Button>
          </div>
          {renderReadingLists()}
        </div>
      </main>
      <Sidebar>
      <SuggestedUsers />
      </Sidebar>
      {modalOpen && (
        <ReadingListModal isOpen={modalOpen} onRequestClose={closeModal} />
      )}
    </Fragment>
  );
}

export default Lists;
