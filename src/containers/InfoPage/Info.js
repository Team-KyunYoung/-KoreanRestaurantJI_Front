import React, { useState, useEffect  } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Info.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";

const Info = () => {
  const image1 = "https://picsum.photos/600/500";
  const image2 = "https://picsum.photos/600/500";
  const image3 = "https://picsum.photos/600/500";

  useEffect(() => {
    AOS.init();
  })

  return (
    <div className="InfoPage">
      <Header />
      <main>
        <div className={styles.content}>
          <header className={styles.title}>
            <h1>智 Information</h1>
          </header>
          <section className={styles.main}>
            <div className={styles.contents}>
              {/* <div data-aos="fade-left" className={styles.img}><img src={image1}></img></div> */}
              <div data-aos="fade-left" data-aos-offset="200" data-aos-duration="2500" className={styles.imgbox} id={styles.rightImg}></div>
              <div data-aos="zoom-in" data-aos-duration="1500" className={styles.text} id={styles.leftText}>
                <span>여기는 상세 설명이 담기는 부분입니다.</span><br></br>
                <span>뭐라고 써야할 지 몰라서 아무말이나 적어봅니다.</span><br></br>
                <span>핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳</span>
              </div>
            </div>
            <div className={styles.contents}>
              {/* <div data-aos="fade-left" className={styles.img}><img src={image1}></img></div> */}
              <div data-aos="fade-left" data-aos-duration="2500" className={styles.imgbox} id={styles.leftImg}></div>
              <div data-aos="zoom-in" data-aos-duration="1500" className={styles.text} id={styles.rightText}>
                <span>여기는 상세 설명이 담기는 부분입니다.</span><br></br>
                <span>뭐라고 써야할 지 몰라서 아무말이나 적어봅니다.</span><br></br>
                <span>핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳</span>
              </div>
            </div>
            <div className={styles.contents}>
              {/* <div data-aos="fade-left" className={styles.img}><img src={image1}></img></div> */}
              <div data-aos="fade-left" data-aos-duration="2500" className={styles.imgbox} id={styles.rightImg}></div>
              <div data-aos="zoom-in" data-aos-duration="1500" className={styles.text} id={styles.leftText}>
                <span>여기는 상세 설명이 담기는 부분입니다.</span><br></br>
                <span>뭐라고 써야할 지 몰라서 아무말이나 적어봅니다.</span><br></br>
                <span>핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳핳</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Info;
