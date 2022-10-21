import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Info.module.scss";
import Header from "components/header/Header";
import Chat from "components/ChatBot/Chat";
import Footer from "components/footer/Footer";

const Info = () => {
  useEffect(() => {
    AOS.init();
  });
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
              <div
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-duration="2500"
                className={[styles.imgbox, styles.rightImg].join(" ")}
                id={styles.info1}
              ></div>
              <div
                data-aos="zoom-in"
                data-aos-duration="1500"
                className={styles.text}
                id={styles.leftText}
              >
                <span>한식당 智의 설명이 이곳에 담깁니다.</span>
                <br></br>
                <span>智의 역사와 전통에 대한 설명을 담을 수 있으며,</span>
                <br></br>
                <span>
                  智만이 가지는 한옥과 풍경 등의 장점을 설명할 수 있습니다.
                </span>
              </div>
            </div>
            <div className={styles.contents}>
              <div
                data-aos="fade-right"
                data-aos-duration="2500"
                className={[styles.imgbox, styles.leftImg].join(" ")}
                id={styles.info2}
              ></div>
              <div
                data-aos="zoom-in"
                data-aos-duration="1500"
                className={[styles.text]}
                id={styles.rightText}
              >
                <span>한식당 智의 설명이 이곳에 담깁니다.</span>
                <br></br>
                <span>智의 요리에 대한 설명을 담을 수 있으며,</span>
                <br></br>
                <span>
                  智 요리의 독창성과 전통성에 대해서도 설명할 수 있습니다.
                </span>
              </div>
            </div>
            <div className={styles.contents}>
              <div
                data-aos="fade-left"
                data-aos-duration="2500"
                className={[styles.imgbox, styles.rightImg].join(" ")}
                id={styles.info3}
              ></div>
              <div
                data-aos="zoom-in"
                data-aos-duration="1500"
                className={styles.text}
                id={styles.leftText}
              >
                <span>한식당 智의 설명이 이곳에 담깁니다.</span>
                <br></br>
                <span>智의 요리의 자부심에 대한 설명을 담을 수 있으며,</span>
                <br></br>
                <span>
                  智의 요리에 사용대한 재료에 대한 설명도 할 수 있습니다.
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default Info;
