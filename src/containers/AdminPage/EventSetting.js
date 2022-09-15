import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const EventSetting = () => {

  return (
    <div className="EventSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>이벤트 설정 페이지</h3></div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default EventSetting;
