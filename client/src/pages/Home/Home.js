import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import { useModal } from "../../hooks";
import cx from "classnames";

import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";

function Home() {
  const [modalOpen, openModal, closeModal] = useModal();

  return (
    <Fragment>
      <main className={styles.hero}>
        <div className={styles.heroContentWrapper}>
          <div className={styles.heroContent}>
            <h1 className={cx("display", styles.heading)}>
              Welcome to CS Share!
            </h1>
            <h2 className={styles.subheading}>
              Learn, Share, and Grow with Us.
            </h2>
            <p className={styles.description}>
              Join our community of CS enthusiasts and professionals to
              collaborate, discuss, and learn from each other. Get access to high-quality articles, tutorials, 
              and discussions on various CS topics. 
            </p>
            <button onClick={openModal} className={styles.heroButton}>
              Get Started
            </button>
          </div>
        </div>
        <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            © 2023 CS Share. All rights reserved.
          </p>
        </div>
        </footer>
      </main>
      {modalOpen && (
        <AuthenticationModal
          shouldShowLogin={false}
          isOpen={modalOpen}
          onRequestClose={closeModal}
        />
      )}
    </Fragment>
  );
}

export default Home;

