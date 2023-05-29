import React, { Fragment, useEffect } from "react";
import { useFormValidation } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { reset, register } from "../../../../features/auth/authSlice";
import styles from "../AuthenticationModal.module.scss";
import cx from "classnames";

import { Input, PasswordInput } from "../../../FormElements/FormElements";
import Button from "../../../Button/Button";

function Register({ closeModal, handleShowLogin, ...rest }) {
  const { onRequestClose } = rest;
  const dispatch = useDispatch();

  const { data, errors, handleSubmit, handleChange, setErrors } =
    useFormValidation({
      initialState: {
        email: "",
        username: "",
        password: "",
      },
      onSubmit: () => {
        const user = data;

        try {
          dispatch(register(user));

        } catch (error) {
          console.log(error.message);
        }
      },
      validations: {
        email: {
          required: {
            value: true,
            message: "Email is a required field.",
          },
        },
        username: {
          required: {
            value: true,
            message: "Username is a required field.",
          },
          pattern: {
            value: "^[a-zA-Z0-9]+$",
            message: "Username must only contain alphanumeric characters.",
          },
        },
        password: {
          required: {
            value: true,
            message: "Password is a required field.",
          },
          custom: {
            isValid: (value) => value.length >= 8,
            message: "Password must be atleast 8 characters.",
          },
        },
      },
    });

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
   if (isError) {
      setErrors({ server: message });
    } else if (isSuccess){
      onRequestClose()
    }

    return () => dispatch(reset());
  }, [user, isError, isSuccess, message, onRequestClose, setErrors, dispatch]);

  return (
    <Fragment>
      <Button
        className={styles.closeButton}
        variant="icon"
        leadingIcon="x"
        onClick={onRequestClose}
      />
      <h2 className={cx("h1", styles.heading)} id="heading">
        Sign up with email
      </h2>
      <p className={styles.modalCopy} id="description">
        Enter an email address, username, and password to associate with your
        account.
      </p>
      <form onSubmit={handleSubmit}>
        <p className={styles.serverError}>​{errors?.server}</p>
        <Input
          id="email"
          label="Your email"
          type="email"
          error={errors?.email}
          autoComplete="email"
          className={styles.formContainer}
          onChange={handleChange("email")}
        />
        <Input
          id="username"
          label="Your username"
          error={errors?.username}
          autoComplete="username"
          className={styles.formContainer}
          onChange={handleChange("username")}
        />
        <PasswordInput
          id="password"
          label="Your password"
          error={errors?.password}
          autoComplete="new-password"
          className={styles.formContainer}
          onChange={handleChange("password")}
        />
        <Button className={styles.modalButton}>Continue</Button>
        <p className={styles.redirectCopy}>Have an account?</p>
      <button className={styles.redirect} onClick={handleShowLogin}>
        Sign In
      </button>
      </form>
    </Fragment>
  );
}

export default Register;
