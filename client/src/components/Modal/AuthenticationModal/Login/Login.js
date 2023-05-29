import React, { Fragment, useEffect } from "react";
import { useFormValidation } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { reset, login } from "../../../../features/auth/authSlice";
import styles from "../AuthenticationModal.module.scss";
import cx from "classnames";

import { Input, PasswordInput } from "../../../FormElements/FormElements";
import Button from "../../../Button/Button";

function Login({ handleShowLogin, ...rest }) {
  const { onRequestClose } = rest;
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  const { data, errors, handleSubmit, handleChange, setErrors } =
    useFormValidation({
      initialState: {
        email: "",
        password: "",
      },
      onSubmit: () => {
        const user = data;
        try {
          dispatch(login(user));
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
        password: {
          required: {
            value: true,
            message: "Password is a required field.",
          },
        },
      },
    });

  useEffect(() => {
    if (isError) {
      setErrors({ server: message });
    } else if (isSuccess){
      onRequestClose()
    }

    return () => dispatch(reset());
  }, [user, isError, isSuccess, message, onRequestClose, setErrors, dispatch]);

  function onClickGuest(){
    dispatch(login({
      email: "guest@example.com",
      password: "guest1234"
    }))
  }
  return (
    <Fragment>
      <Button
        className={styles.closeButton}
        variant="icon"
        leadingIcon="x"
        onClick={onRequestClose}
      />
      <h2 className={cx("h1", styles.heading)} id="heading">
        Sign in with email
      </h2>
      <p className={styles.modalCopy} id="description">
        Enter your email address and password to access your account.
      </p>
      <form onSubmit={handleSubmit}>
        <p className={styles.serverError}>​{errors?.server}</p>
        <Input
          id="email"
          type="email"
          label="Your email"
          autoComplete="email"
          error={errors?.email}
          className={styles.formContainer}
          onChange={handleChange("email")}
        />
        <PasswordInput
          id="password"
          label="Your password"
          autoComplete="password"
          error={errors?.password}
          className={styles.formContainer}
          onChange={handleChange("password")}
        />
        <button onClick={onClickGuest} className={styles.guestLogin}>Login as a guest</button>
        <Button className={styles.modalButton}>Continue</Button>
        <p className={styles.redirectCopy}>No account?</p>
        <button className={styles.redirect} onClick={handleShowLogin}>
          Create one
        </button>
      </form>
    </Fragment>
  );
}

export default Login;
