import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Button from "../../components/Button/Button";

import { useSelector, useDispatch } from "react-redux";
import { uploadAvatar } from "../../features/auth/authSlice";
import { updateInfo } from "../../features/profile/profileService";
import { useFileHandler } from "../../hooks";

function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const { imageFile, onFileChange } = useFileHandler();

  const { username, token } = useSelector((state) => state.auth.user);

  async function onSubmitBio() {
    try {
      const info = {
        bio,
      };
      const response = await updateInfo(username, info, token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function onChangeBio(e) {
    setBio(e.target.value);
  }

  function onSubmitAvatar() {
    const formData = new FormData();
    formData.set("avatar", imageFile.file);
    dispatch(uploadAvatar({ username, formData }));
    navigate("/");
  }

  return (
    <Fragment>
      <main className={styles.wrapper}>
        <h1 className={styles.header}>About you</h1>
        <div className={styles.formGroup}>
          <label className={styles.label}>Short bio</label>
          <input className={styles.input} maxLength="160" onChange={onChangeBio} />
          <small className={styles.hint}>
            Your short bio appears on your Profile and next to your stories. Max
            160 characters.
          </small>
          <Button onClick={onSubmitBio}>Submit</Button>
        </div>
        <div>
          <p className={styles.label}>Profile Picture</p>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            id="avatar"
            name="avatar"
            hidden
          />
            <button className={imageFile?.file ? styles.imageInputReceived : styles.imageInput}>
            <label htmlFor="avatar">{imageFile?.file ? "Image uploaded" : "Upload an image"}          </label>
            </button>
        </div>
        <Button onClick={() => onSubmitAvatar()}>Submit avatar</Button>
      </main>
      <Sidebar />
    </Fragment>
  );
}

export default Settings;
