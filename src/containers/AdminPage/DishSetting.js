import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const DishSetting = () => {

  return (
    <div className="DishSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>단품 요리 설정 페이지</h3></div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default DishSetting;
