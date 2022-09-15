import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const RoomSetting = () => {

  return (
    <div className="RoomSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>객실 설정 페이지</h3></div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default RoomSetting;
