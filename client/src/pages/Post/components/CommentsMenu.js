import { Fragment, useState, useEffect } from "react";
import styles from "./CommentsMenu.module.scss";

import {
  commentOnPost,
  getComments,
  likeComment,
  unlikeComment
} from "../../../features/comments/commentsService";

import Button from "../../../components/Button/Button";
import Comment from "../../../components/Comment/Comment";

function CommentsMenu({ postId, token, setCommentsMenuOpen, ...rest }) {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({
    content: "",
  });

  useEffect(() => {
    async function fetchComments() {
      const response = await getComments(postId, token);
      setComments(response);
    }

    fetchComments();
  }, [postId, newComment.content, setComments]);

  function onChange(e) {
    setNewComment({ content: e.target.value });
  }
  function closeMenu() {
    setCommentsMenuOpen(false);
  }

  async function submitComment() {
    try {
      await commentOnPost(postId, newComment, token);
      setNewComment({content: ""})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <div className={styles.container}>
        <section className={styles.header}>
          <h2 id="heading" className={styles.heading}>Comments ({comments.length || 0})</h2>
          <Button
            variant="icon"
            leadingIcon="x"
            className={styles.closeButton}
            onClick={() => setCommentsMenuOpen(false)}
          />
          <textarea
            className={styles.textArea}
            onChange={onChange}
            resize="false"
            value={newComment.content}
            placeholder="What do you think?"
          />
          <Button onClick={submitComment}>Submit</Button>
        </section>
        <section className={styles.content}>
          {comments.length &&
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} closeMenu={closeMenu} />
            ))}
        </section>
      </div>
      <div className={styles.overlay} onClick={closeMenu}></div>
    </Fragment>
  );
}

export default CommentsMenu;
