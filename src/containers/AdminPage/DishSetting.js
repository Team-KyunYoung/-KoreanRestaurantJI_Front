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
              <div className={styles.settingContents}>
                <div className={styles.create}>
                    <h3>단품 요리 등록하기</h3>
                    <div className={styles.createInput}>
                      <label>요리 이름 <input></input></label><br/>
                      <label>요리 사진 url <input></input></label><br/>
                      <label>요리 가격 <input></input></label><br/>
                      <label>요리 상세 설명 <input></input></label><br/>
                      <label>요리 분류 
                        <select>
                          <option>전식</option>
                          <option>중식</option>
                          <option>후식</option>
                        </select>
                      </label><br/>
                      <button>등록</button>
                    </div>
                </div>
                <hr/>
                <div className={styles.delete}>
                    <h3>단품 요리 삭제하기</h3>
                    <div className={styles.deleteSearch}>
                      <label>요리 이름 <input></input></label>
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

export default DishSetting;
