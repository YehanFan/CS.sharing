/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect, useRef } from "react";
import styles from "./NewPost.module.scss";
import { EditorState, convertToRaw } from "draft-js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFileHandler } from "../../hooks";
import { createPost } from "../../features/posts/postsService";

import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestedUsers from "../../components/Sidebar/components/SuggestedUsers";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";

function NewPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    photo: {},
  });
  const { imageFile, onFileChange } = useFileHandler();

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  useEffect(() => {
    setPost({
      ...post,
      content: convertToRaw(editorState.getCurrentContent()),
    });
  }, [editorState]);

  const { username, id, token } = useSelector((state) => state.auth.user);

  function onChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  async function submitPost(e) {
    try {
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );

      const formData = new FormData(); // for multer
      formData.set("title", post.title ? post.title : "No title");
      formData.set("content", content);
      formData.append("photo", imageFile?.file);

      setPost(formData);

      await createPost(formData, id, token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <main className={styles.wrapper}>
        <h1 className={styles.header}>Create a Post</h1>
        <form className={styles.container}>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            className={styles.title}
            placeholder="Title"
            id="title"
            name="title"
            onChange={onChange}
            minLength={1}
          />
          <input
            type="file"
            accept=".jpg,.png,.webp"
            onChange={onFileChange}
            id="avatar"
            hidden
          />
          <button
          type="button"
            className={
              imageFile ? styles.imageInputReceived : styles.imageInput
            }
          >
            <label htmlFor="avatar">
              {imageFile ? "Image uploaded" : "Upload an image"}
            </label>
          </button>
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
            setPost={setPost}
            editor={editor}
            readOnly={true}
          />
          <Button
            type="submit"
            className={styles.submitButton}
            onClick={submitPost}
          >
            Submit post
          </Button>
        </form>
      </main>
      <Sidebar>
        <SuggestedUsers />
      </Sidebar>
    </Fragment>
  );
}

export default NewPost;
