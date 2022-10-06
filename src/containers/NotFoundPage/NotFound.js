import React from "react";

import styles from "./NotFound.module.scss";

const NotFound = () => {

  return (
    <div className={styles.NotFoundPage}>
        <section className={styles.error_container}>
            <span className={styles.four}><span className={styles.screen_reader_text}>4</span></span>
            <span className={styles.zero}><span className={styles.screen_reader_text}>0</span></span>
            <span className={styles.four}><span className={styles.screen_reader_text}>4</span></span>
        </section>
        <h3>죄송합니다. 해당 페이지를 찾을 수 없습니다.</h3>
        <p className={styles.zoom_area}>메인 페이지로 이동하여 이용해주세요.</p>
        <div className={styles.link_container}>
            <a href="/" className={styles.more_link}>메인 페이지로 돌아가기</a>
        </div>
        <div className={styles.Copyright}>Copyright(c) 2022.10 - Team.KY - https://codepen.io/ricardpriet/pen/qVZxNo</div>
    </div>
  );
};

export default NotFound;
