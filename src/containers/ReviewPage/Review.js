import React from "react";

import styles from "./Review.module.scss";
import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";

const image1 = "https://picsum.photos/600/600";
const image2 = "https://picsum.photos/300/600";
const image3 = "https://picsum.photos/600/300";
const image4 = "https://picsum.photos/300/300";

const Review = () => {
  return (
    <div id={styles.ReviewPage}>
      <Header />
      <main className={styles.container}>
        <div className={`${styles.review} ${styles.content1}`}>
          <div className={styles.imgBox}>
            <img src={image1}></img>
          </div>
          <div className={styles.contents}>
            <p>최고의 맛</p>
          </div>
        </div>
        <div className={`${styles.review} ${styles.content2}`}>
            <img src={image4}></img>
        </div>
        <div className={`${styles.review} ${styles.content3}`}>
            <img src={image3}></img>
        </div>
        <div className={`${styles.review} ${styles.content4}`}>
            <img src={image2}></img>
        </div>
        <div className={`${styles.review} ${styles.content5}`}>
            <img src={image1}></img>
        </div>
        <div className={`${styles.review} ${styles.content6}`}>
            <img src={image4}></img>
        </div>
        <div className={`${styles.review} ${styles.content7}`}>
            <img src={image4}></img>
        </div>
        <div className={`${styles.review} ${styles.content8}`}>
            <img src={image2}></img>
        </div>
        <div className={`${styles.review} ${styles.content9}`}>
            <img src={image1}></img>
        </div>
        <div className={`${styles.review} ${styles.content10}`}>
            <img src={image4}></img>
        </div>
        <div className={`${styles.review} ${styles.content11}`}>
            <img src={image3}></img>
        </div>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default Review;
