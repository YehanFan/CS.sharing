import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReadingList } from "../../../features/readingLists/readingListsSlice";
import {
  getReadingLists,
  reset,
} from "../../../features/readingLists/readingListsSlice";
import styles from "./ReadingListModal.module.scss";
import cx from "classnames";

import Modal from "react-modal";
import { InputWithCounter } from "../../FormElements/FormElements";
import Button from "../../Button/Button";

function ReadingListModal({ ...rest }) {
  const { onRequestClose } = rest;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { username } = useSelector((state) => state.auth.user);

  useEffect(() => {
    return () => {
      dispatch(reset());
      onRequestClose();
    };
  }, [dispatch, onRequestClose]);

  function onClickCreate() {
    dispatch(createReadingList({ username, name, description }));
  }

  return (
    <Modal
      {...rest}
      aria={{
        labelledby: "heading",
        describedby: "description",
      }}
      className={cx("modal", styles.modal)}
      overlayClassName="modal-overlay"
    >
      <div className={cx("ReactModal__Container", styles.modalContainer)}>
        <div className={styles.innerContainer}>
          <h1 id="heading" className={styles.heading}>
            Create a new reading list
          </h1>
          <InputWithCounter
            label="List name"
            className={styles.input}
            minLength="1"
            placeholder="Give it a name"
            onChange={setName}
          />

          <InputWithCounter
            label="Description"
            className={styles.input}
            placeholder="Description"
            maxLength="280"
            onChange={setDescription}
          />
          <div className={styles.buttonContainer}>
            <Button onClick={onClickCreate}>Create</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReadingListModal;
