import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const ReservationSetting = () => {

  return (
    <div className="ReservationSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>예약 설정 페이지</h3></div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationSetting;
