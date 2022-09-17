import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const CourseSetting = () => {

  return (
    <div className="CourseSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>코스 설정 페이지</h3></div>
              <div className={styles.settingContents}>
                <div className={styles.create}>
                    <h3>코스 등록하기</h3>
                    <div className={styles.createInput}>
                      <label>코스 이름 <input></input></label><br/>
                      <label>코스 가격 <input></input></label><br/>
                      <label>전식 선택 
                        <select>
                          <option>전식 데이터 불러오기</option>
                        </select>
                      </label><br/>
                      <label>중식1 선택 
                        <select>
                          <option>중식 데이터 불러오기</option>
                        </select>
                      </label><br/>
                      <label>중식2 선택 
                        <select>
                          <option>중식 데이터 불러오기</option>
                        </select>
                      </label><br/>
                      <label>중식3 선택 
                        <select>
                          <option>중식 데이터 불러오기</option>
                        </select>
                      </label><br/>
                      <label>후식 선택 
                        <select>
                          <option>후식 데이터 불러오기</option>
                        </select>
                      </label><br/>
                      <button>등록</button>
                    </div>
                </div>
                <hr/>
                <div className={styles.delete}>
                    <h3>코스 삭제하기</h3>
                    <div className={styles.deleteSearch}>
                      <label>코스 이름 <input></input></label>
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

export default CourseSetting;
