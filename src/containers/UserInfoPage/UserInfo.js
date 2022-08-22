import React from "react";
import { useParams } from "react-router-dom";
import MediaQuery from "react-responsive";
import styles from "./UserInfo.module.scss";

import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import EditProfile from "./EditProfile";

const image1 = "https://picsum.photos/800/600";
const UserInfo = () => {
  const param = useParams();
  const remoteController = (
    <ul>
      <li>
        <a href="#appetizer">Appetizer</a>
      </li>
      <li>
        <a href="#entree">Entree</a>
      </li>
      <li>
        <a href="#dessert">Dessert</a>
      </li>
    </ul>
  );
  return (
    <div className="UserInfo Page">
      <Header />
      <main>
        <div>
          <header className={styles.title}></header>
          <section className={styles.main}>
            <div className={styles.banner}>
              <img src={image1} alt="user's information page" />
              <h1>My page</h1>
            </div>
            <div className={styles.contents}>
              {/* 모니터ver */}
              <MediaQuery minWidth={993}>
                <div className={[styles.fixedBox, styles.rightside].join(" ")}>
                  {remoteController}
                </div>
              </MediaQuery>

              {/* 태블리 + 모바일ver */}
              <MediaQuery maxWidth={992}>
                <div className={[styles.fixedBox, styles.upside].join(" ")}>
                  {remoteController}
                </div>
              </MediaQuery>
              {param.location === "editprofile" ? <EditProfile /> : "loading"}
              {param.location === "reservation" ? "reservationpage" : "loading"}
              {param.location === "orderlist" ? "orderlistpage" : "loading"}
              {/*  */}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserInfo;
