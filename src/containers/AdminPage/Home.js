import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const AdminHome = () => {

  return (
    <div className="AdminHomePage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>Korean Restaurant Ji 관리자 페이지</h3></div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
