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
              <div className={styles.settingContents}>
                <div className={styles.findAll}>
                  <h3>사용자 목록</h3>
                  <div className={styles.userList}>
                    <div>
                      <div>사용자명</div>
                      <div>권한</div>
                      <div>아메일</div>
                      <div>닉네임</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
