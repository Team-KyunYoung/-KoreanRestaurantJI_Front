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
              <div className={styles.settingContents}>
                <div className={styles.create}>
                    <h3>객실 등록하기</h3>
                    <div className={styles.createInput}>
                      <label>객실 이름 <input></input></label><br/>
                      <label>객실 사진 url <input></input></label><br/>
                      <button>등록</button>
                    </div>
                </div>
                <hr/>
                <div className={styles.delete}>
                    <h3>객실 정보 삭제하기</h3>
                    <div className={styles.deleteSearch}>
                      <label>객실 이름 <input></input></label>
                      <button>검색</button>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default RoomSetting;
