import React, { useState } from "react";
import styles from "./FormElements.module.scss";
import Button from "../Button/Button";

import cx from "classnames";

export function Input({
  id,
  label,
  autoComplete,
  error,
  className,
  ...rest
}) {
  const errorId = id + "-error";

  const propClass = {
    [styles.error]: error,
  };

  return (
    <div className={className}>
      <label className={cx("text-small", cx(propClass, styles.formLabel))}>
        {label}
      </label>
      <input
        id={id}
        className={styles.formInput}
        autoComplete={autoComplete}
        aria-invalid={error !== undefined}
        aria-errormessage={errorId}
        {...rest}
      ></input>
      <span className={styles.error} id={errorId}>
        {error}
      </span>
    </div>
  );
}

export function InputWithCounter({
  id,
  label,
  autoComplete,
  error,
  className,
  maxLength = 60,
  onChange,
  ...rest
}) {
  const [text, setText] = useState("");

  const errorId = id + "-error";

  const propClass = {
    [styles.error]: error,
  };

  function handleChange(e) {
    setText(e.target.value);
    onChange(e.target.value)
  }

  return (
    <div className={className}>
      <label className={cx("text-small", cx(propClass, styles.formLabel))}>
        {label}
      </label>
      <input
        id={id}
        className={styles.formInput}
        autoComplete={autoComplete}
        aria-invalid={error !== undefined}
        aria-errormessage={errorId}
        onChange={handleChange}
        value={text}
        maxLength={maxLength}
        {...rest}
      ></input>
      <p className={styles.characterCounter}>{text.length}/<span className={styles.characterLimit}>{maxLength}</span></p>
      <span className={styles.error} id={errorId}>
        {error}
      </span>
    </div>
  );
}

export function PasswordInput({
  id,
  label,
  autoComplete,
  error,
  className,
  ...rest
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const errorId = id + "-error";
  const propClass = {
    [styles.error]: error,
  };

  function toggleVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className={className}>
      <div className={styles.formGroupContainer}>
        <Button
          className={cx(propClass, styles.passwordButton)}
          variant="icon"
          leadingIcon={passwordVisible ? "eye" : "eye-off"}
          onClick={toggleVisibility}
        />
        <label className={cx("text-small", cx(propClass, styles.formLabel))}>
          {label}
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          className={styles.formInput}
          autoComplete={autoComplete}
          aria-invalid={error !== undefined}
          aria-errormessage={errorId}
          {...rest}
        ></input>
      </div>
      <span className={styles.error} id={errorId}>
        {error}
      </span>
    </div>
  );
}

PasswordInput.defaultProps = {
  autoComplete: "password",
};
