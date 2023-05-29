import React, { useState } from "react";
import styles from "./Comment.module.scss";

import { useSelector } from "react-redux";
import {
  likeComment,
  unlikeComment,
} from "../../features/comments/commentsService";
import { deleteComment } from "../../features/comments/commentsService";
import { formatRelativeDate } from "../../utils/dateUtils";
import Avatar from "react-avatar";
import Button from "../../components/Button/Button";
import MoreButton from "../../components/MoreButton/MoreButton";

function Comment({ comment, closeMenu }) {
  const { author, content, createdAt } = comment;
  const [commentState, setCommentState] = useState({
    isLiked: comment.isLiked,
    likeCount: comment.likeCount,
  });
  const { id, token } = useSelector((state) => state.auth.user);

  async function onClickLike() {
    if (id === author.id) {
      return;
    } else if (commentState.isLiked && token) {
      await unlikeComment(comment.id, token);
      setCommentState({
        isLiked: false,
        likeCount: commentState.likeCount - 1,
      });
    } else if (token) {
      await likeComment(comment.id, token);
      setCommentState({ 
        isLiked: true, 
        likeCount: commentState.likeCount + 1 });
    }
  }

  async function onClickDelete() {
    await deleteComment(comment.post, comment.id, token);
    closeMenu();
  }

  return (
    <article className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <Avatar
            name={author.username}
            size="28"
            textSizeRatio={1.45}
            src={author.avatar?.url}
            round
          />
          <div className={styles.details}>
            <p className={styles.author}>{author.username}</p>
            <time className={styles.date} dateTime={createdAt}>
              {formatRelativeDate(createdAt)}
            </time>
          </div>
        </div>
        <MoreButton listDirection="bottomLeft">
          <button onClick={onClickDelete} className={styles.deleteButton}>
            Delete
          </button>
        </MoreButton>
      </div>
      <p className={styles.content}>{content}</p>
        <span className={styles.buttonContainer}>
          <Button
            className={styles.button}
            variant="icon"
            leadingIcon={
              commentState.isLiked ? "thumbs-up-filled" : "thumbs-up"
            }
            onClick={onClickLike}
          />
          <span>{commentState.likeCount}</span>
        </span>
    </article>
  );
}

export default Comment;
