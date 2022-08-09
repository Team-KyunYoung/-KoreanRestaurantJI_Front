import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Info.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";

const Info = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <div className="InfoPage">
      <Header />
      ``
      <main>
        <div className={styles.content}>
          <header className={styles.title}>

          </header>
          <section className={styles.main}>

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Info;
